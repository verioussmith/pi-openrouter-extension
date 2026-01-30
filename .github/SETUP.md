# GitHub Actions Setup

This repository uses GitHub Actions to automatically publish to npm when you create a release.

## One-Time Setup

### 1. Create npm Access Token

1. Go to https://www.npmjs.com/settings/verioussmith/tokens
2. Click "Generate New Token"
3. Select **"Automation"** token type
4. Set permissions: **"Read and write"**
5. Set expiration: **90 days** (or longer if available)
6. Copy the token (starts with `npm_`)

### 2. Add npm Token to GitHub Secrets

1. Go to your GitHub repo: https://github.com/verioussmith/pi-openrouter-extension
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **"Add secret"**

### 3. Enable GitHub Actions

1. Go to **Actions** tab in your repo
2. If prompted, click **"I understand my workflows, go ahead and enable them"**

## Usage

### Method 1: Automatic (Create GitHub Release)

```bash
# 1. Update version in package.json
npm version patch  # or: minor, major

# 2. Commit and push
git add package.json
git commit -m "chore: bump version to $(node -p 'require(\"./package.json\").version')"
git push

# 3. GitHub Actions will detect version change and:
#    - Create a GitHub Release
#    - Publish to npm automatically
```

### Method 2: Manual (Create Release via GitHub UI)

1. Go to https://github.com/verioussmith/pi-openrouter-extension/releases
2. Click **"Draft a new release"**
3. Click **"Choose a tag"** → Type `v1.0.2` (new version) → **"Create new tag"**
4. Release title: `Release v1.0.2`
5. Click **"Publish release"**
6. GitHub Actions will automatically publish to npm

### Method 3: Manual (via CLI with gh)

```bash
# Update version
npm version patch

# Push changes
git push

# Create release (triggers npm publish)
gh release create v$(node -p 'require("./package.json").version') \
  --title "Release v$(node -p 'require("./package.json").version')" \
  --notes "See commits for details"
```

## Workflows

### `npm-publish.yml`
- **Trigger:** When a GitHub release is published
- **Actions:**
  - Checkout code
  - Setup Node.js
  - Publish to npm with provenance
- **Secrets required:** `NPM_TOKEN`

### `auto-version.yml`
- **Trigger:** Push to main/master (when openrouter.ts or package.json changes)
- **Actions:**
  - Check if version in package.json changed
  - If changed, create GitHub Release
  - Release triggers `npm-publish.yml`

## Troubleshooting

### npm Token Expired
1. Generate new token at https://www.npmjs.com/settings/verioussmith/tokens
2. Update `NPM_TOKEN` secret in GitHub

### Publish Failed - OTP Required
The token should be set as "Automation" type which bypasses OTP. If you used "Granular Access Token", make sure it has:
- **Packages and scopes:** Read and write for `@verioussmith/pi-openrouter`
- **Organizations:** None (unless publishing to org)

### No Release Created
Check that:
1. Version in package.json is different from last git tag
2. Commit includes changes to `openrouter.ts` or `package.json`
3. Pushed to `main` or `master` branch

## Benefits

✅ **One command publish:** Just `npm version patch && git push`  
✅ **No OTP needed:** Automation token bypasses 2FA  
✅ **Auto GitHub Releases:** Version changes create releases  
✅ **Provenance:** npm shows verified GitHub source  
✅ **Audit trail:** All publishes tracked in Actions tab
