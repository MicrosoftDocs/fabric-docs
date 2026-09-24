---
title: Configure Fabric SSO authentication for your Fabric app
description: Configure Fabric SSO authentication for your Fabric app by using Microsoft Entra ID and the Fabric portal handoff flow.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 06/02/2026
ai-usage: ai-assisted
ms.search.form: Enabling Fabric authentication
---

# Configure Fabric SSO authentication for your Fabric app

Set up Fabric single sign-on (SSO) for a Fabric app so users can sign in with Microsoft Entra ID through the Fabric portal. This article explains the handoff flow and shows how to enable the required configuration and SDK integration for deployed apps.

## Prerequisites

- A Fabric Apps project with authentication enabled. See [Configure authentication](authentication.md).
- A deployed Fabric Apps item. See [Deploy to Fabric](deploy-app.md).

## How Fabric SSO works

Fabric single sign-on (SSO) uses a secure `postMessage`-based handoff between your application and the Fabric portal. There's no redirect or callback page:

1. Your app opens the Fabric portal in a popup and registers a `postMessage` listener.
1. The user authenticates through Microsoft Entra ID inside the Fabric portal.
1. The Fabric extension sends the handoff code back to your app through `window.opener.postMessage()`.
1. The SDK exchanges the handoff code for Rayfin session tokens and creates a session.
1. The Fabric popup closes automatically.

The flow is secured with PKCE (Proof Key for Code Exchange), state nonces, and `postMessage` origin validation to prevent authorization code interception and cross-site request forgery.

## Enable Fabric authentication

Add the Fabric authentication configuration to your `rayfin/rayfin.yml` file:

```yaml
services:
  auth:
    enabled: true
    allowedRedirectUris:
      - http://localhost:5173
    fabric:
      enabled: true
```
For deployed applications, redeploy to push the updated settings:

```bash
npx rayfin up
```

For deployed apps, `npx rayfin up` adds your deployed app callback URL to `allowedRedirectUris`.

## Install the Fabric auth provider (optional)

Projects scaffolded with `npm create @microsoft/rayfin@latest` already include `@microsoft/rayfin-auth-provider-fabric`. Install it manually only if you're adding Fabric authentication to a project that doesn't already have the package:

```bash
npm install @microsoft/rayfin-auth-provider-fabric
```

## Add sign-in and sign-up to your app

Fabric SSO uses a single API for both sign-in and sign-up: `ensureSignedInWithFabric()`. When a user signs in for the first time, Fabric provisions a Rayfin session for them automatically based on their Microsoft Entra ID identity—there's no separate sign-up call. The same code path handles returning users.

You can add this code by hand or generate it with GitHub Copilot in VS Code.

### Add sign-in manually

Call `ensureSignedInWithFabric()` from a user-gesture handler (for example, a button select):

```typescript
import { RayfinClient } from '@microsoft/rayfin-client';
import { ensureSignedInWithFabric } from '@microsoft/rayfin-auth-provider-fabric';

const client = new RayfinClient({
  baseUrl: import.meta.env.VITE_RAYFIN_API_URL,
  publishableKey: import.meta.env.VITE_RAYFIN_PUBLISHABLE_KEY,
});

const fabricOptions = {
  workspaceId: import.meta.env.VITE_FABRIC_WORKSPACE_ID,
  projectId: import.meta.env.VITE_FABRIC_ITEM_ID,
  fabricPortalUrl: import.meta.env.VITE_FABRIC_PORTAL_URL,
  returnOrigin: window.location.origin,
};

async function handleSignIn() {
  // Signs in existing users and provisions new users on first sign-in.
  const session = await ensureSignedInWithFabric(client.auth, fabricOptions);
  if (session.isAuthenticated && session.user) {
    console.log('Signed in as:', session.user.email);
  }
}
```

The function must be called from a synchronous user-gesture handler to avoid popup blockers. Calling it on page load or inside an asynchronous chain before user interaction triggers browser popup protection.

`returnOrigin` must be a bare origin (scheme and host, no path)—for example, `https://app.contoso.com`. The SDK uses it to validate incoming `postMessage` events.

### Add sign-out manually

Call `client.auth.signOut()` to end the session and clear cached tokens:

```typescript
async function handleSignOut() {
  await client.auth.signOut();
  console.log('Signed out');
}
```

Subscribe to session changes to update your UI when sign-in or sign-out completes:

```typescript
client.auth.onSessionChange((session) => {
  console.log('Session changed:', session?.isAuthenticated ? 'signed in' : 'signed out');
});
```

### Generate sign-in and sign-up with GitHub Copilot

If you use [GitHub Copilot in VS Code](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot), open Copilot Chat in your Fabric Apps project and use prompts like these to scaffold the auth code. Copilot follows the patterns in the Rayfin skill bundled with the Fabric VS Code extension.

| Goal | Example Copilot prompt |
| --- | --- |
| Add a sign-in button | `Add a Sign in with Fabric button to my React app using ensureSignedInWithFabric from @microsoft/rayfin-auth-provider-fabric. Read workspaceId, projectId, and fabricPortalUrl from VITE_* env vars and set returnOrigin to window.location.origin.` |
| Add a sign-out button | `Add a Sign out button that calls client.auth.signOut() and updates the UI when the session ends.` |
| Add an auth-aware React hook | `Create a useFabricAuth React hook that exposes session, signIn, signOut, and isAuthenticated, using ensureSignedInWithFabric and client.auth.onSessionChange.` |
| Support embedded mode | `Update my app's entry point to call initEmbeddedAuth on page load so users signed in through the Fabric portal don't have to click Sign in again.` |
| Gate a route | `Wrap the /dashboard route so it calls ensureSignedInWithFabric before rendering and redirects unauthenticated users to a sign-in page.` |

After Copilot generates code, review the edits and make sure:

- The `ensureSignedInWithFabric()` call runs inside a user-gesture handler (for example, `onClick`)—not on page load.
- `returnOrigin` is a bare origin and matches one of the entries in `allowedRedirectUris` in `rayfin/rayfin.yml`.
- Imports come from `@microsoft/rayfin-auth-provider-fabric` (not the deprecated callback helpers).

## Use embedded mode inside a Fabric iframe

When your app loads inside a Fabric iframe (for example, when a user opens it from the Fabric portal), use embedded mode instead of the popup flow:

- Embedded mode acquires the session through `postMessage` to the parent frame.
- It doesn't open a popup and doesn't require a user gesture, so it's safe to call on page load.
- The SDK auto-detects embedded mode from `?fabricEmbedded=true` in the URL. You can also force it by setting `fabricEmbedded: true` in the options.

Call `initEmbeddedAuth()` early in app startup:

```typescript
import { initEmbeddedAuth } from '@microsoft/rayfin-auth-provider-fabric';
import { client } from './lib/rayfin';

const session = await initEmbeddedAuth(client.auth, {
  workspaceId: import.meta.env.VITE_FABRIC_WORKSPACE_ID,
  projectId: import.meta.env.VITE_FABRIC_ITEM_ID,
  fabricPortalUrl: import.meta.env.VITE_FABRIC_PORTAL_URL,
  returnOrigin: window.location.origin,
});

if (session) {
  console.log('Signed in via embedded mode:', session.user?.email);
}
```

`initEmbeddedAuth()` returns `null` when the app isn't running in embedded mode, so it's safe to call unconditionally. `ensureSignedInWithFabric()` also attempts embedded mode automatically before falling back to the popup flow.

## Use Fabric authentication in React

Create a custom hook that integrates sign-in, sign-up, and sign-out:

```typescript
import { useState, useEffect, useCallback } from 'react';
import { ensureSignedInWithFabric } from '@microsoft/rayfin-auth-provider-fabric';
import { client } from './lib/rayfin';

const fabricOptions = {
  workspaceId: import.meta.env.VITE_FABRIC_WORKSPACE_ID,
  projectId: import.meta.env.VITE_FABRIC_ITEM_ID,
  fabricPortalUrl: import.meta.env.VITE_FABRIC_PORTAL_URL,
  returnOrigin: window.location.origin,
};

export function useFabricAuth() {
  const [session, setSession] = useState(client.auth.getSession());

  useEffect(() => client.auth.onSessionChange(setSession), []);

  // Signs in existing users and provisions new users on first sign-in.
  const signIn = useCallback(async () => {
    const result = await ensureSignedInWithFabric(client.auth, fabricOptions);
    setSession(result);
    return result;
  }, []);

  const signOut = useCallback(async () => {
    await client.auth.signOut();
  }, []);

  return {
    session,
    signIn,
    signOut,
    isAuthenticated: session?.isAuthenticated ?? false,
  };
}
```

Use the hook in your components:

```typescript
function App() {
  const { isAuthenticated, signIn, signOut } = useFabricAuth();

  if (!isAuthenticated) {
    return <button onClick={signIn}>Sign in with Fabric</button>;
  }

  return (
    <>
      <Dashboard />
      <button onClick={signOut}>Sign out</button>
    </>
  );
}
```

## API reference

### ensureSignedInWithFabric

```typescript
function ensureSignedInWithFabric(
  auth: Auth,
  options: FabricAuthOptions
): Promise<OpaqueSession>;
```

Implements a four-step authentication waterfall:

1. Returns the existing session if already authenticated.
1. Attempts a silent refresh through the refresh token.
1. Embedded mode—if running inside a Fabric iframe, acquires the session through `postMessage` to the parent frame.
1. Opens the Fabric portal in a popup (popup flow) and waits for the `postMessage` handoff.

Steps 1 through 3 are safe to call on page load. Step 4 opens a popup and must run inside a user-gesture handler.

### FabricAuthOptions

| Property | Type | Description |
| ---------- | ------ | ------------- |
| `workspaceId` | `string` | The Fabric workspace ID. |
| `projectId` | `string` | The Fabric app item ID. |
| `fabricPortalUrl` | `string` | The Fabric portal base URL (for example, `https://app.fabric.microsoft.com`). |
| `returnOrigin` | `string` | Your app's origin for `postMessage` delivery (for example, `window.location.origin`). Must be a bare origin (scheme and host, no path). |
| `fabricEmbedded` | `boolean` (optional) | Force embedded mode. Auto-detected from `?fabricEmbedded=true` in the URL. |

### Helper functions

| Function | Description |
| ---------- | ------------- |
| `initEmbeddedAuth(auth, options)` | Page-load-safe embedded auth. Returns the session if running inside a Fabric iframe, or `null` otherwise. |
| `initiateFabricLogin(auth, options)` | Low-level popup flow. Opens the Fabric portal in a popup with PKCE parameters and listens for the `postMessage` handoff. |
| `isEmbeddedMode(options)` | Returns `true` if the app is running in embedded mode (Fabric iframe). |

## Security features

- **PKCE S256** – Every flow generates a cryptographic code verifier and challenge to prevent authorization code interception.
- **State nonce** – A random nonce ties the handoff response to the originating tab, preventing cross-site request forgery.
- **`postMessage` origin validation** – The SDK validates `event.origin` on incoming messages and rejects messages from unexpected origins.
- **Automatic cleanup** – PKCE state expires after 5 minutes and is garbage-collected on the next flow.
- **Flow timeout** – The popup flow times out after 5 minutes if no handoff message is received.

## Troubleshoot authentication issues

### Popup blocked

The browser blocked the Fabric portal window. Ensure `ensureSignedInWithFabric()` is called from a synchronous user-gesture handler (for example, button `onClick`). Don't call it on page load or inside an asynchronous chain before user interaction.

### Session not persisting

Confirm the `RayfinClient` is configured with the correct `baseUrl` and `publishableKey`. The callback tab and the original tab must share the same origin for `BroadcastChannel` and `localStorage` to work.

### Authentication fails after a long delay

The sign-in flow expires after 5 minutes. If you start the sign-in process but don't complete it within that time, the flow fails. Close the popup and select the sign-in button again to start a new flow.

## Related content

- [Configure authentication](authentication.md)
- [Deploy to Fabric](deploy-app.md)
- [Define data models](data-models.md)
