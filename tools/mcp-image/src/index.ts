import "dotenv/config";

import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";

import { createServer } from "./server.js";

const server = createServer();
const transport = new StdioServerTransport();

async function shutdown(signal: string): Promise<void> {
  console.error(`[menezesdev-image-pipeline] closing on ${signal}`);
  await server.close();
  process.exit(0);
}

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

try {
  await server.connect(transport);
  console.error("[menezesdev-image-pipeline] MCP STDIO server ready");
} catch (error) {
  console.error("[menezesdev-image-pipeline] fatal startup error", error);
  process.exitCode = 1;
}
