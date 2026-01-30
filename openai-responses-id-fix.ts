import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { promises as fs } from "node:fs";

const TARGETS = [
  "/opt/cpanel/ea-nodejs20/lib/node_modules/@mariozechner/pi-coding-agent/node_modules/@mariozechner/pi-ai/dist/providers/openai-responses-shared.js",
  "/opt/cpanel/ea-nodejs20/lib/node_modules/@mariozechner/pi-coding-agent/node_modules/@mariozechner/pi-ai/dist/providers/transform-messages.js",
];

const CALL_ID_BEFORE = "const sanitizedCallId = callId.replace(/[^a-zA-Z0-9_-]/g, \"_\");";
const CALL_ID_AFTER =
  "const sanitizedCallId = callId.replace(/[^a-zA-Z0-9_-]/g, \"_\").toLowerCase();";
const ITEM_ID_BEFORE = "let sanitizedItemId = itemId.replace(/[^a-zA-Z0-9_-]/g, \"_\");";
const ITEM_ID_AFTER =
  "let sanitizedItemId = itemId.replace(/[^a-zA-Z0-9_-]/g, \"_\").toLowerCase();";

const NORMALIZE_BEFORE =
  "                    if (!isSameModel && normalizeToolCallId) {\n                        const normalizedId = normalizeToolCallId(toolCall.id, model, assistantMsg);\n                        if (normalizedId !== toolCall.id) {\n                            toolCallIdMap.set(toolCall.id, normalizedId);\n                            normalizedToolCall = { ...normalizedToolCall, id: normalizedId };\n                        }\n                    }\n";
const NORMALIZE_AFTER =
  "                    if (normalizeToolCallId) {\n                        const normalizedId = normalizeToolCallId(toolCall.id, model, assistantMsg);\n                        if (normalizedId !== toolCall.id) {\n                            toolCallIdMap.set(toolCall.id, normalizedId);\n                            normalizedToolCall = { ...normalizedToolCall, id: normalizedId };\n                        }\n                    }\n";

async function patchFile(path: string): Promise<boolean> {
  try {
    const data = await fs.readFile(path, "utf8");
    let next = data;
    if (next.includes(CALL_ID_BEFORE)) {
      next = next.replace(CALL_ID_BEFORE, CALL_ID_AFTER);
    }
    if (next.includes(ITEM_ID_BEFORE)) {
      next = next.replace(ITEM_ID_BEFORE, ITEM_ID_AFTER);
    }
    if (next.includes(NORMALIZE_BEFORE)) {
      next = next.replace(NORMALIZE_BEFORE, NORMALIZE_AFTER);
    }
    if (next === data) {
      return false;
    }
    await fs.writeFile(path, next, "utf8");
    return true;
  } catch {
    return false;
  }
}

export default function (pi: ExtensionAPI) {
  pi.on("session_start", async (_event, ctx) => {
    let patched = 0;
    for (const target of TARGETS) {
      const didPatch = await patchFile(target);
      if (didPatch) patched += 1;
    }
    if (patched > 0) {
      ctx.ui.notify(
        `Patched OpenAI Responses tool call ID sanitizer (lowercase) in ${patched} file(s).`,
        "info",
      );
    }
  });
}
