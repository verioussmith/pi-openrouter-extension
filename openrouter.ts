/**
 * OpenRouter Provider Extension
 *
 * Provides access to OpenRouter's unified LLM API.
 * Uses OpenAI-compatible streaming API.
 *
 * Usage:
 *   1. Set OPENROUTER_API_KEY in ~/.zshrc (already done)
 *   2. Start pi: pi
 *   3. Select model: /model openrouter/anthropic/claude-3.5-sonnet
 *
 * Models from: https://openrouter.ai/models
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
	pi.registerProvider("openrouter", {
		baseUrl: "https://openrouter.ai/api/v1",
		apiKey: "OPENROUTER_API_KEY",
		authHeader: true, // Adds Authorization: Bearer header
		api: "openai-completions",

		models: [
			// Anthropic Models
			{
				id: "anthropic/claude-3.5-sonnet",
				name: "Claude 3.5 Sonnet (OpenRouter)",
				reasoning: false,
				input: ["text", "image"],
				cost: { input: 3, output: 15, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 200000,
				maxTokens: 8192,
			},
			{
				id: "anthropic/claude-3-opus",
				name: "Claude 3 Opus (OpenRouter)",
				reasoning: false,
				input: ["text", "image"],
				cost: { input: 15, output: 75, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 200000,
				maxTokens: 4096,
			},
			{
				id: "anthropic/claude-3-haiku",
				name: "Claude 3 Haiku (OpenRouter)",
				reasoning: false,
				input: ["text", "image"],
				cost: { input: 0.25, output: 1.25, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 200000,
				maxTokens: 4096,
			},

			// OpenAI Models
			{
				id: "openai/gpt-4o",
				name: "GPT-4o (OpenRouter)",
				reasoning: false,
				input: ["text", "image"],
				cost: { input: 2.5, output: 10, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 128000,
				maxTokens: 16384,
			},
			{
				id: "openai/gpt-4o-mini",
				name: "GPT-4o Mini (OpenRouter)",
				reasoning: false,
				input: ["text", "image"],
				cost: { input: 0.15, output: 0.6, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 128000,
				maxTokens: 16384,
			},
			{
				id: "openai/o1",
				name: "O1 (OpenRouter)",
				reasoning: true,
				input: ["text", "image"],
				cost: { input: 15, output: 60, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 200000,
				maxTokens: 100000,
			},
			{
				id: "openai/o1-mini",
				name: "O1 Mini (OpenRouter)",
				reasoning: true,
				input: ["text", "image"],
				cost: { input: 3, output: 12, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 128000,
				maxTokens: 65536,
			},

			// Google Models
			{
				id: "google/gemini-2.0-flash-exp:free",
				name: "Gemini 2.0 Flash Exp (Free)",
				reasoning: false,
				input: ["text", "image"],
				cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 1000000,
				maxTokens: 8192,
			},
			{
				id: "google/gemini-2.0-flash-thinking-exp:free",
				name: "Gemini 2.0 Flash Thinking (Free)",
				reasoning: true,
				input: ["text", "image"],
				cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 32768,
				maxTokens: 8192,
			},
			{
				id: "google/gemini-pro-1.5",
				name: "Gemini Pro 1.5 (OpenRouter)",
				reasoning: false,
				input: ["text", "image"],
				cost: { input: 1.25, output: 5, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 2000000,
				maxTokens: 8192,
			},

			// Meta Models
			{
				id: "meta-llama/llama-3.3-70b-instruct",
				name: "Llama 3.3 70B (OpenRouter)",
				reasoning: false,
				input: ["text"],
				cost: { input: 0.35, output: 0.4, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 128000,
				maxTokens: 32768,
			},
			{
				id: "meta-llama/llama-3.1-405b-instruct",
				name: "Llama 3.1 405B (OpenRouter)",
				reasoning: false,
				input: ["text"],
				cost: { input: 2.7, output: 2.7, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 131072,
				maxTokens: 16384,
			},

			// Mistral Models
			{
				id: "mistralai/mistral-large",
				name: "Mistral Large (OpenRouter)",
				reasoning: false,
				input: ["text"],
				cost: { input: 2, output: 6, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 128000,
				maxTokens: 32000,
			},
			{
				id: "mistralai/mistral-small",
				name: "Mistral Small (OpenRouter)",
				reasoning: false,
				input: ["text"],
				cost: { input: 0.2, output: 0.6, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 32000,
				maxTokens: 16384,
			},

			// DeepSeek Models
			{
				id: "deepseek/deepseek-chat",
				name: "DeepSeek Chat (OpenRouter)",
				reasoning: false,
				input: ["text"],
				cost: { input: 0.14, output: 0.28, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 64000,
				maxTokens: 8000,
			},
			{
				id: "deepseek/deepseek-r1",
				name: "DeepSeek R1 (OpenRouter)",
				reasoning: true,
				input: ["text"],
				cost: { input: 0.55, output: 2.19, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 64000,
				maxTokens: 8192,
			},

			// Perplexity Models
			{
				id: "perplexity/sonar-pro",
				name: "Sonar Pro (OpenRouter)",
				reasoning: false,
				input: ["text"],
				cost: { input: 3, output: 15, cacheRead: 0, cacheWrite: 0 },
				contextWindow: 200000,
				maxTokens: 8192,
			},
		],
	});
}
