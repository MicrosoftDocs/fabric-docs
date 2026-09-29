---
title: Manage function secrets
description: Learn how to store, list, and access function secrets securely during local development and in Microsoft Fabric.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 08/11/2026
ai-usage: ai-generated
---

# Manage function secrets

Use secrets to provide sensitive configuration, such as personal access tokens and API keys, to your functions. Never hard-code secret values in source code or expose them to the frontend. Read them at runtime by calling `ctx.getSecret()`.

## Prerequisites

- A Fabric app with functions initialized. For setup instructions, see [Use Functions in Fabric Apps](functions.md).
- The app deployed at least once with `npx rayfin up`. `rayfin secret set` and `rayfin secret list` target the active deployed item and fail when no remote endpoint exists.
- A secret value required by your function.

## Set a secret

From the app root, enable the functions feature and set the secret:

```powershell
npx rayfin secret set GITHUB_PAT
```

The command prompts for the value and masks your input. To update an existing secret, run the same command again. The new value replaces the existing value.

> [!IMPORTANT]
> Don't include a secret value in the command or commit it to source control.

## List secrets

List the configured secret names:

```powershell
npx rayfin secret list
```

The command displays secret names and timestamps, but never displays secret values.

## Access a secret from a function

Call `ctx.getSecret('NAME')` to retrieve a secret for the current invocation. The method returns `undefined` when the secret isn't configured, so handle optional secrets explicitly or provide an appropriate nonsecret default.

The following function gets a file from a GitHub repository. Public repositories don't require a personal access token (PAT). For private repositories, the function adds the `GITHUB_PAT` secret to the request:

```typescript
import {
  UserDataFunctions,
  type RayfinContext,
} from '@microsoft/fabric-user-data-functions';

const udf = new UserDataFunctions();

udf.func(
  'getGitHubFile',
  async (
    owner: string,
    repo: string,
    path: string,
    ref: string,
    ctx: RayfinContext,
  ): Promise<string> => {
    const pat = ctx.getSecret('GITHUB_PAT');
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.raw+json',
      'User-Agent': 'rayfin-app',
    };

    if (pat) {
      headers.Authorization = `Bearer ${pat}`;
    }

    const encodedPath = path
      .split('/')
      .map(encodeURIComponent)
      .join('/');
    const url =
      `https://api.github.com/repos/${encodeURIComponent(owner)}/` +
      `${encodeURIComponent(repo)}/contents/${encodedPath}` +
      `?ref=${encodeURIComponent(ref || 'main')}`;

    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub ${response.status}: ${await response.text()}`);
    }

    return response.text();
  },
  [],
);
```

The empty connections array indicates that the function doesn't request a delegated token. A PAT is a secret, not a connection.

## Configure secrets by environment

Provide secret values in the environment where the function runs:

- **Local development:** Add secret values to the `Values` section of `rayfin/functions/local.settings.json`. The local Functions host reads function environment values from this file; `rayfin/.env` is used for CLI configuration interpolation.
- **Fabric:** Configure secrets for the deployed item in the Fabric portal.

Use the same secret name in each environment. For example, configure `GITHUB_PAT` locally and in Fabric, then read it with `ctx.getSecret('GITHUB_PAT')` in both environments.

> [!IMPORTANT]
> Don't commit secret values in `rayfin/functions/local.settings.json` or any other file to source control. Store only nonsecret examples or placeholders in files that you commit.

## Related content

- [Use Functions in Fabric Apps](functions.md)
- [Programming model overview](programming-model.md)
- [Deploy a Fabric app to Fabric](deploy-app.md)
