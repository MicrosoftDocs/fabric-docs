---
title: Static content hosting for Fabric Apps
description: Learn how to configure and deploy static frontend applications alongside your Fabric Apps backend using the built-in static hosting service.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 06/02/2026
ai-usage: ai-generated
---

# Static content hosting for Fabric Apps

Fabric Apps includes a static content hosting service that builds, packages, and serves your frontend application alongside your backend APIs. When static hosting is enabled, the CLI deploys your built assets to Fabric and provides a public URL where users can access your application.

## Prerequisites

- A Fabric Apps project with a frontend application (for example, React, Vue, or vanilla TypeScript).
- A build command that produces static output (for example, `npm run build`).

## How static hosting works

When you deploy with static hosting enabled, the CLI performs these steps:

1. Runs your configured build command (for example, `npm run build`).
1. Validates that the output folder exists and contains files.
1. Packages all files into a compressed ZIP archive (maximum 100 MB).
1. Uploads the archive to the Fabric Apps host.
1. Returns a public hosting URL where your application is accessible.

## Configure static hosting

Add a `staticHosting` section under `services` in your `rayfin/rayfin.yml` file:

```yaml
services:
  staticHosting:
    enabled: true
    folder: dist
    buildCommand: npm run build
    indexDocument: index.html
```

### Configuration options

| Option | Required | Default | Description |
| -------- | ---------- | --------- | ------------- |
| `enabled` | Yes | — | Set to `true` to enable static hosting. |
| `folder` | Yes | — | Output folder containing built static files, relative to `root`. |
| `root` | No | Project root | Root directory of the frontend project, relative to the project root. |
| `buildCommand` | No | — | Shell command to run before packaging (for example, `npm run build`). |
| `indexDocument` | No | — | Default document to serve for directory requests (for example, `index.html`). |

### Example with a separate frontend directory

If your frontend code lives in a subdirectory:

```yaml
services:
  staticHosting:
    enabled: true
    root: frontend
    folder: dist
    buildCommand: npm run build
    indexDocument: index.html
```

This configuration resolves the output path to `<project-root>/frontend/dist`.

## Deploy static content

### Full deployment

When you run `npx rayfin up`, static content deploys automatically as part of the full stack deployment:

```bash
npx rayfin up
```

The CLI builds your frontend, packages the output, and uploads it alongside your backend configuration. After deployment, the CLI prints the hosting URL and writes it to your `.env.fabric-*` file as `VITE_RAYFIN_HOSTING_URL`.

### Standalone static deployment

Use the `staticapp deploy` subcommand to redeploy only your static content without rerunning the full deployment:

```bash
npx rayfin up staticapp deploy
```

This command is useful when you only changed the frontend code and want a faster iteration cycle.

#### Skip the build step

If you already built your frontend and want to deploy the existing output without rebuilding:

```bash
npx rayfin up staticapp deploy --skip-build
```

#### Enable verbose logging

Show detailed output during deployment:

```bash
npx rayfin up staticapp deploy --verbose
```

## Authentication callback configuration

When both static hosting and authentication are enabled, the Rayfin CLI automatically registers an authentication callback URI based on your hosting URL.

For example, if your hosting URL is `https://example.webapp.com`, the CLI adds this callback URI:

```yaml
services:
  auth:
    allowedRedirectUris:
      - http://localhost:5173
      - http://localhost:5173/auth/callback
      - https://example.webapp.com/auth/callback
```

You don't need to configure the authentication callback URI manually—the CLI updates the configuration and pushes it during deployment.

## Deployment size limits

- The compressed ZIP archive must not exceed **100 MB**.
- The CLI uses maximum compression to minimize upload size.
- If your build output exceeds the limit, optimize your assets by:
  - Excluding source maps from production builds.
  - Compressing or removing large images and videos.
  - Moving binary files to Fabric Apps storage instead of bundling them.

## Complete example

A full `rayfin.yml` configuration with static hosting, authentication, and data services enabled:

```yaml
id: my-app
name: my-app
version: 1.0.0
services:
  auth:
    enabled: true
    allowedRedirectUris:
      - http://localhost:5173
      - http://localhost:5173/auth/callback
    fabric:
      enabled: true
  data:
    enabled: true
    dialect: mssql
  staticHosting:
    enabled: true
    folder: dist
    buildCommand: npm run build
    indexDocument: index.html
```

## Test locally

Before deploying, verify your static build works locally:

1. Build your frontend:

   ```bash
   npm run build
   ```

1. Check that the output folder contains the expected files:

   ```bash
   ls dist
   ```

1. Serve the built files with a local static server:

   ```bash
   npx serve dist
   ```

1. Open the URL printed by the server and verify your application loads correctly.

## Troubleshoot deployment issues

### Static folder not found

If the CLI reports that the static folder doesn't exist:

- Verify the `folder` path in `rayfin.yml` is correct and relative to `root` (or the project root if `root` isn't set).
- Ensure your build command ran successfully and produced output in the expected directory.

### Empty static folder

An empty output folder usually means the build command failed or didn't produce output. Run the build command manually to check for errors:

```bash
npm run build
```

### Deployment exceeds size limit

If the ZIP exceeds 100 MB:

- Review your build output for unnecessary files (source maps, development assets).
- Configure your bundler to exclude source maps in production builds.
- Move large binary files to Fabric Apps storage.

### No remote endpoint is configured

The `npx rayfin up staticapp deploy` command requires an existing remote deployment. Run `npx rayfin up` first to configure the remote endpoint, then use `staticapp deploy` for subsequent updates.

## Related content

- [Deploy to Fabric](deploy-app.md)
- [Configure authentication](authentication.md)
- [Create your first project](create-app.md)
