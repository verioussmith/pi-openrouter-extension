# Quick Publish Guide

## One-Time Setup (Do Once)

1. **Create npm Automation Token:**
   - Go to: https://www.npmjs.com/settings/verioussmith/tokens
   - Click "Generate New Token" → "Automation"
   - Permissions: Read and write
   - Copy the token

2. **Add to GitHub Secrets:**
   - Go to: https://github.com/verioussmith/pi-openrouter-extension/settings/secrets/actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click "Add secret"

## Publish New Version (Every Time)

```bash
# 1. Make your changes to openrouter.ts
vim openrouter.ts

# 2. Bump version and commit
npm version patch   # or: minor, major
git push

# 3. Done! GitHub Actions will:
#    - Create GitHub Release
#    - Publish to npm automatically
#    - No OTP needed!
```

## That's It!

- ✅ **No OTP:** Automation token bypasses 2FA
- ✅ **One push:** Everything auto-publishes
- ✅ **Trackable:** See all publishes in Actions tab

## Manual Release (Alternative)

```bash
# Update version
npm version patch

# Push
git push

# Create release via CLI
gh release create v$(node -p 'require("./package.json").version') \
  --title "Release v$(node -p 'require("./package.json").version')" \
  --generate-notes

# Or use GitHub UI:
# https://github.com/verioussmith/pi-openrouter-extension/releases/new
```

## Verify

After pushing, check:
- **Actions:** https://github.com/verioussmith/pi-openrouter-extension/actions
- **npm:** https://www.npmjs.com/package/@verioussmith/pi-openrouter

Takes ~2-3 minutes from push to live on npm! 🚀
