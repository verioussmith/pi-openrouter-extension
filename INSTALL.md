# Installation Guide

## Quick Install (Recommended)

```bash
npm install -g @verioussmith/pi-openrouter
```

The extension will automatically install to `~/.pi/agent/extensions/openrouter.ts` via postinstall script.

## Alternative Methods

### Method 1: Direct Download
```bash
curl -o ~/.pi/agent/extensions/openrouter.ts \
  https://raw.githubusercontent.com/verioussmith/pi-openrouter-extension/master/openrouter.ts
```

### Method 2: Git Clone
```bash
git clone https://github.com/verioussmith/pi-openrouter-extension.git
ln -s $(pwd)/pi-openrouter-extension/openrouter.ts ~/.pi/agent/extensions/
```

### Method 3: Manual Copy
```bash
# Download
wget https://raw.githubusercontent.com/verioussmith/pi-openrouter-extension/master/openrouter.ts

# Copy to extensions directory
mkdir -p ~/.pi/agent/extensions
cp openrouter.ts ~/.pi/agent/extensions/
```

## Verify Installation

```bash
# Check if file exists
ls -lh ~/.pi/agent/extensions/openrouter.ts

# Start pi and check for OpenRouter models
pi
/model
# Look for "openrouter/" models in the list
```

## Configuration

Add your OpenRouter API key to environment:

```bash
# In ~/.zshrc or ~/.bashrc
export OPENROUTER_API_KEY="sk-or-v1-YOUR_KEY_HERE"

# Reload shell
source ~/.zshrc
```

Get your API key at: https://openrouter.ai/settings/keys

## First Use

```bash
pi
/model openrouter/google/gemini-2.0-flash-exp:free
# Ask any question - you're now using OpenRouter!
```

## Troubleshooting

**Extension not loading?**
```bash
# Check file exists
cat ~/.pi/agent/extensions/openrouter.ts

# Check permissions
chmod 644 ~/.pi/agent/extensions/openrouter.ts
```

**Models not showing?**
```bash
# Verify API key is set
echo $OPENROUTER_API_KEY

# Should output: sk-or-v1-...
```

**Permission denied during install?**
```bash
# Try with sudo (global install)
sudo npm install -g @verioussmith/pi-openrouter

# Or install locally
npm install @verioussmith/pi-openrouter
cp node_modules/@verioussmith/pi-openrouter/openrouter.ts ~/.pi/agent/extensions/
```
