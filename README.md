# Pi OpenRouter Extension

OpenRouter provider extension for [Pi Coding Agent](https://github.com/badlogic/pi-mono).

## Features

- Access 20+ LLM models through OpenRouter's unified API
- OpenAI-compatible streaming
- Supports Claude, GPT-4, Gemini, Llama, Mistral, DeepSeek, and more
- Free models available (Gemini 2.0 Flash)

## Installation

### Global (All Projects)

```bash
# Copy to global extensions directory
cp openrouter.ts ~/.pi/agent/extensions/

# Or symlink for development
ln -s $(pwd)/openrouter.ts ~/.pi/agent/extensions/openrouter.ts
```

### Project-Specific

```bash
# Copy to project's extensions directory
cp openrouter.ts /path/to/project/.pi/extensions/
```

## Configuration

Set your OpenRouter API key in `~/.zshrc` or environment:

```bash
export OPENROUTER_API_KEY="sk-or-v1-YOUR_KEY_HERE"
```

Get your key at: https://openrouter.ai/settings/keys

## Usage

```bash
# Start pi
pi

# List available models
/model

# Select an OpenRouter model
/model openrouter/google/gemini-2.0-flash-exp:free

# Or any other model
/model openrouter/anthropic/claude-3.5-sonnet
/model openrouter/openai/gpt-4o
/model openrouter/deepseek/deepseek-r1
```

## Available Models

### Free Tier
- `google/gemini-2.0-flash-exp:free` - Gemini 2.0 Flash Experimental
- `google/gemini-2.0-flash-thinking-exp:free` - Gemini 2.0 Flash with reasoning

### Anthropic
- `anthropic/claude-3.5-sonnet` - Claude 3.5 Sonnet
- `anthropic/claude-3-opus` - Claude 3 Opus
- `anthropic/claude-3-haiku` - Claude 3 Haiku

### OpenAI
- `openai/gpt-4o` - GPT-4o
- `openai/gpt-4o-mini` - GPT-4o Mini
- `openai/o1` - O1 (reasoning model)
- `openai/o1-mini` - O1 Mini

### Google
- `google/gemini-pro-1.5` - Gemini Pro 1.5

### Meta
- `meta-llama/llama-3.3-70b-instruct` - Llama 3.3 70B
- `meta-llama/llama-3.1-405b-instruct` - Llama 3.1 405B

### Mistral
- `mistralai/mistral-large` - Mistral Large
- `mistralai/mistral-small` - Mistral Small

### DeepSeek
- `deepseek/deepseek-chat` - DeepSeek Chat
- `deepseek/deepseek-r1` - DeepSeek R1 (reasoning)

### Perplexity
- `perplexity/sonar-pro` - Sonar Pro

See all models: https://openrouter.ai/models

## Adding More Models

Edit `openrouter.ts` and add to the `models` array:

```typescript
{
  id: "provider/model-name",
  name: "Display Name (OpenRouter)",
  reasoning: false, // true for reasoning models
  input: ["text", "image"], // or just ["text"]
  cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
  contextWindow: 128000,
  maxTokens: 4096,
}
```

Costs are in $/million tokens. Check https://openrouter.ai/models for pricing.

## Development

```bash
# Clone
git clone https://github.com/philoveracity/pi-openrouter-extension.git
cd pi-openrouter-extension

# Install in Pi
ln -s $(pwd)/openrouter.ts ~/.pi/agent/extensions/openrouter.ts

# Test
pi
/model openrouter/google/gemini-2.0-flash-exp:free
```

## References

- [Pi Coding Agent](https://github.com/badlogic/pi-mono)
- [Pi Custom Provider Docs](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/custom-provider.md)
- [OpenRouter API](https://openrouter.ai/docs)
- [OpenRouter Models](https://openrouter.ai/models)

## License

MIT
