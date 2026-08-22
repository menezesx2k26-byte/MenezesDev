import { McpServer } from "@modelcontextprotocol/server";

import { registerEditImageAsset } from "./tools/editImageAsset.js";
import { registerGenerateHeroImage } from "./tools/generateHeroImage.js";

const INSTRUCTIONS = [
  "MenezesDev image pipeline. Read project briefs through the tool inputs; never pass raw ungrounded prompts.",
  "Call paid tools with dry_run=true first. Outputs are limited to the project's public/assets directory.",
  "Do not generate SVG logos, readable UI copy, fabricated business claims, addresses, ratings, or contact data.",
  "Approved and in-use assets are protected from overwrite.",
].join(" ");

export function createServer(): McpServer {
  const server = new McpServer(
    { name: "menezesdev-image-pipeline", version: "0.1.0" },
    { instructions: INSTRUCTIONS },
  );
  registerGenerateHeroImage(server);
  registerEditImageAsset(server);
  return server;
}
