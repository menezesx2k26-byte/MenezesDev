import { readFile } from "node:fs/promises";

import type { ImageInfo, OutputFormat } from "../types/index.js";
import { PipelineError } from "./errors.js";

function uint24LE(buffer: Buffer, offset: number): number {
  return buffer[offset]! | (buffer[offset + 1]! << 8) | (buffer[offset + 2]! << 16);
}

function inspectPng(buffer: Buffer): ImageInfo | undefined {
  const signature = "89504e470d0a1a0a";
  if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== signature) return undefined;
  return { format: "png", height: buffer.readUInt32BE(20), width: buffer.readUInt32BE(16) };
}

function inspectJpeg(buffer: Buffer): ImageInfo | undefined {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return undefined;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1]!;
    offset += 2;
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker >= 0xd0 && marker <= 0xd7) continue;
    if (offset + 2 > buffer.length) break;
    const length = buffer.readUInt16BE(offset);
    if (length < 2 || offset + length > buffer.length) break;
    if (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    ) {
      return { format: "jpeg", height: buffer.readUInt16BE(offset + 3), width: buffer.readUInt16BE(offset + 5) };
    }
    offset += length;
  }
  return undefined;
}

function inspectWebp(buffer: Buffer): ImageInfo | undefined {
  if (
    buffer.length < 30 ||
    buffer.subarray(0, 4).toString("ascii") !== "RIFF" ||
    buffer.subarray(8, 12).toString("ascii") !== "WEBP"
  ) {
    return undefined;
  }
  const chunk = buffer.subarray(12, 16).toString("ascii");
  if (chunk === "VP8X") {
    return { format: "webp", height: uint24LE(buffer, 27) + 1, width: uint24LE(buffer, 24) + 1 };
  }
  if (chunk === "VP8 " && buffer.length >= 30) {
    return {
      format: "webp",
      height: buffer.readUInt16LE(28) & 0x3fff,
      width: buffer.readUInt16LE(26) & 0x3fff,
    };
  }
  if (chunk === "VP8L" && buffer.length >= 25 && buffer[20] === 0x2f) {
    const b1 = buffer[21]!;
    const b2 = buffer[22]!;
    const b3 = buffer[23]!;
    const b4 = buffer[24]!;
    return {
      format: "webp",
      height: 1 + ((b2 >> 6) | (b3 << 2) | ((b4 & 0x0f) << 10)),
      width: 1 + (b1 | ((b2 & 0x3f) << 8)),
    };
  }
  return undefined;
}

export function inspectImage(buffer: Buffer): ImageInfo {
  const info = inspectPng(buffer) ?? inspectJpeg(buffer) ?? inspectWebp(buffer);
  if (!info || info.width < 1 || info.height < 1) {
    throw new PipelineError("INVALID_IMAGE", "Image bytes are not a supported PNG, JPEG, or WebP file.");
  }
  return info;
}

export async function inspectImageFile(filePath: string): Promise<ImageInfo> {
  return inspectImage(await readFile(filePath));
}

export function assertImageMatches(
  info: ImageInfo,
  expected: { format: OutputFormat; size: string },
): void {
  const [width, height] = expected.size.split("x").map(Number);
  if (info.format !== expected.format) {
    throw new PipelineError(
      "INVALID_IMAGE",
      `Generated format '${info.format}' does not match requested '${expected.format}'.`,
    );
  }
  if (expected.size !== "auto" && (info.width !== width || info.height !== height)) {
    throw new PipelineError(
      "INVALID_IMAGE",
      `Generated dimensions ${info.width}x${info.height} do not match requested ${expected.size}.`,
    );
  }
}
