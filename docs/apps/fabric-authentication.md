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

Set up Microsoft Entra sign-in for a Fabric app through the Fabric portal, a direct delegated token exchange, or a trusted external parent portal. These authentication paths use Microsoft Entra, and they don't support arbitrary identity providers.

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

For deployed apps, `npx rayfin up` adds your deployed app origin to `allowedRedirectUris`. For configuration and security guidance, see [Configure authentication redirect URIs](configure-authentication-redirect-uris.md).

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

## Sign in with an existing Microsoft Entra token

Use `signInWithEntraToken()` when your browser or Node.js application already obtains a delegated Microsoft Entra access token. It establishes a Rayfin session on your existing `client.auth` without a popup, iframe, redirect, or handoff code.

### Enable external Entra exchange

Set the following options in the target app's `rayfin/rayfin.yml` file, and redeploy with `npx rayfin up`:

```yaml
services:
  auth:
    enabled: true
    fabric:
      enabled: true
      externalEntraExchange: true
```

The target Fabric environment must support external exchange. The supplied token must:

- Be a delegated user access token, not an app-only service principal token.
- Target the Fabric or Power BI resource accepted by the deployment.
- Include the delegated `Item.Execute.All` scope.
- Be issued in the target item's owning tenant.

The user must also have **Execute** permission on the app item. For production Power BI, request `https://analysis.windows.net/powerbi/api/Item.Execute.All` through your identity library. The SDK doesn't acquire the Entra token or handle consent.

### Browser usage

Use the same trusted HTTPS backend URL and publishable key as your data client:

```typescript
import { signInWithEntraToken } from '@microsoft/rayfin-auth-provider-fabric';
import { client } from './lib/rayfin';

async function signInWithDelegatedToken(entraToken: string) {
  const session = await signInWithEntraToken(client.auth, { entraToken });
  return session;
}
```

Pass the raw access token without a `Bearer` prefix. The helper uses the client's backend base URL, preserving its deployment path, and appends `/api/auth/v1/brokered/token`. The base URL must be absolute HTTPS with no credentials, query, or fragment. Don't use the static-hosting URL, a relative proxy URL, or an endpoint supplied by an untrusted caller.

The same client's data and function calls use the exchanged Rayfin session automatically. Browser exchange also requires the service's CORS policy to permit your origin and the authorization header.

Handle rejected sign-ins in your UI and display the error before permitting actions for the requested account. A failed exchange can leave an older unexpired session in memory; don't treat it as successful authentication of the newly selected user.

### Node.js usage and session isolation

You can import and use the helper without `window`, `document`, or `localStorage`. For a standalone SDK integration, construct `Auth` and attach it to the API client:

```typescript
import { Auth } from '@microsoft/rayfin-auth';
import { ApiClient } from '@microsoft/rayfin-lib';
import { signInWithEntraToken } from '@microsoft/rayfin-auth-provider-fabric';

async function authenticateUser(
  rayfinEndpoint: string,
  publishableKey: string,
  entraToken: string,
) {
  const apiClient = new ApiClient({ baseUrl: rayfinEndpoint, publishableKey });
  const auth = new Auth(apiClient, { storage: false });
  auth.attachToClient(apiClient);

  try {
    const session = await signInWithEntraToken(auth, { entraToken });
    // Perform this user's SDK operations with apiClient inside this scope.
    return session.isAuthenticated;
  } finally {
    auth.destroy();
  }
}
```

Use a trusted configured `rayfinEndpoint`, not a caller-controlled URL. Create separate instances per user or request, keep sessions in memory, and destroy them when no longer needed. Never share a mutable signed-in client between users. With `RayfinClient`, use `authStorage: false` for the same memory-only behavior. `RayfinServerClient` doesn't expose `auth` and can't be passed directly to this helper.

The SDK doesn't persist the supplied Entra token. Normal session refresh uses the Rayfin refresh token; if refresh is no longer possible, acquire a new Entra token and exchange it explicitly.

## Embed in an external parent portal

Use `@microsoft/rayfin-embed-host` when a portal outside Fabric embeds your app and already has a delegated Entra identity. The parent brokers authentication; the iframe receives only a single-use handoff code, not the parent's Entra token.

Enable `externalEntraExchange` and satisfy the delegated token, tenant, scope, and item **Execute** prerequisites described earlier. Granting access to a parent page doesn't grant access to the Fabric app.

Install the host package in the parent portal:

```bash
npm install @microsoft/rayfin-embed-host
```

Register the host **before** mounting the iframe because the iframe sends its readiness signal only once:

```typescript
import { createEmbedHost } from '@microsoft/rayfin-embed-host';

function mountFabricApp(getAccessToken: () => Promise<string>) {
  const appUrl = 'https://my-fabric-app.example.com';
  const host = createEmbedHost({
    allowedOrigins: [new URL(appUrl).origin],
    getAccessToken,
  });

  const iframe = document.createElement('iframe');
  iframe.src = appUrl;
  document.body.append(iframe);

  return () => {
    iframe.remove();
    host.dispose();
  };
}
```

Supply a token acquisition function for the current parent user. In the embedded app, call and await `initEmbeddedAuth()` before restoring a stored session or rendering authenticated content, even when `getSession()` already reports a user. The stored user might differ from the parent's current user. The host acknowledgement detects external embedding; no `fabricEmbedded` query flag is required for this path.

Use exact trusted origins, including scheme, host, and port, in `allowedOrigins`. The host validates both the browser-attested iframe message origin and the requested return origin before making the authorization call. Don't accept an arbitrary caller-supplied allow list. Keep the Entra token in the parent authorization path, never send it through `postMessage`, and call `host.dispose()` when removing the embed.

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
| `initEmbeddedAuth(auth, options)` | Page-load-safe auth for Fabric or an acknowledged external parent host. Returns the session on success, or `null` when embedded auth isn't available. |
| `initiateFabricLogin(auth, options)` | Low-level popup flow. Opens the Fabric portal in a popup with PKCE parameters and listens for the `postMessage` handoff. |
| `isEmbeddedMode(options)` | Returns `true` if the app is running in embedded mode (Fabric iframe). |
| `signInWithEntraToken(auth, { entraToken })` | Exchanges a delegated Entra token and establishes a session in a browser or Node.js. Doesn't require `FabricAuthOptions`. |

## Security features

- **PKCE S256** – Handoff flows generate a cryptographic code verifier and challenge to prevent authorization code interception. Direct Entra token exchange doesn't use PKCE.
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
- [Configure authentication redirect URIs](configure-authentication-redirect-uris.md)
- [Deploy to Fabric](deploy-app.md)
- [Define data models](data-models.md)
