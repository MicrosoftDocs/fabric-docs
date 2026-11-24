---
title: Authentication for Fabric Apps
description: Understand authentication concepts for Microsoft Fabric Apps, including the available sign-in methods, where each one applies, and how to enable them in your project.
ms.reviewer: mksuni
ms.topic: concept-article
ms.date: 06/02/2026
ai-usage: ai-generated
---

# Authentication for Fabric Apps

Fabric Apps includes a built-in authentication service that signs users in, manages their sessions, and attaches their identity to every data and storage call your app makes. This article explains the concepts you need to understand before configuring authentication for your project.

For implementation details, see:

- [Configure Fabric SSO authentication for your Fabric app](fabric-authentication.md) – sign-in and sign-up code for deployed apps.
- [Define data permissions](data-permissions.md) – use the signed-in user's identity to control data access.

## Authentication modes

Deployed Fabric apps authenticate with Microsoft Entra ID. Choose the integration path based on where the app runs and who acquires the Entra token:

| Environment | Supported method | When to use it |
| --- | --- | --- |
| Browser app using the Fabric portal | Fabric SSO popup or embedded handoff | Let Fabric perform interactive sign-in, or sign in an app embedded inside Fabric. |
| Browser or Node.js app that already has a delegated Entra token | `signInWithEntraToken()` | Exchange the supplied token for a Rayfin session without a popup or redirect. |
| App embedded in an external parent portal | `createEmbedHost()` in the parent and `initEmbeddedAuth()` in the iframe | Let a trusted Entra-authenticated parent broker a handoff without sending its token to the iframe. |
| Local development with a local backend | Email and password | Test against a local backend; this method doesn't work on a deployed Fabric backend. |

Key concepts:

- **Fabric SSO** uses the Fabric portal to authenticate a browser user. The app can run inside Fabric or use a popup from a standalone page, including a local frontend targeting a deployed backend.
- **Direct Entra exchange and external-parent-host handoff** are additional Microsoft Entra paths, not support for arbitrary identity providers or app-only service principal sign-in.
- **Email and password** is intended for local development only. It doesn't function after deployment.
- **First-time sign-in provisions the user.** With Fabric SSO, there's no separate sign-up step—users are created automatically the first time they sign in.
- **Authentication is required for Fabric deployments.** Setting `services.auth.enabled` to `false` causes `npx rayfin up` to fail.

For token requirements and implementation examples, see [Direct Entra token sign-in](fabric-authentication.md#sign-in-with-an-existing-microsoft-entra-token) and [Embed in an external parent portal](fabric-authentication.md#embed-in-an-external-parent-portal).

## Sessions and identity

After a user signs in, the SDK creates a *session* that represents the signed-in user. Sessions are opaque—your app shouldn't inspect the underlying tokens. Instead, your app reads a small set of high-level properties:

- Whether a session is currently authenticated.
- The user's `id` and `email`.
- Custom claims that you configured in `rayfin.yml`.

The same client instance that signs the user in automatically attaches their identity to every data and storage call. You don't pass tokens around manually.

Sessions also raise change events, so your UI can react when a user signs in or signs out without reloading the page.

For server-side integrations, use a separate client and memory-only `Auth` session per user (`authStorage: false` on `RayfinClient`, or `{ storage: false }` on `Auth`). Never share a mutable signed-in client across users. Destroy the auth instance when its request or user-specific scope ends.

## Enable authentication in your project

Authentication is configured in `rayfin/rayfin.yml`. The following example enables both Fabric SSO (for deployed apps) and email/password sign-in (for local development):

```yaml
services:
  auth:
    enabled: true
    allowedRedirectUris:
      - http://localhost:5173
    fabric:
      enabled: true
      externalEntraExchange: true
    password:
      enabled: true  # Local development only
```

What each setting controls:

- `services.auth.enabled` – Turns the authentication service on. Required for any Fabric deployment.
- `allowedRedirectUris` – The origins that are allowed to receive the user after sign-in. Add your local dev URL here. `npx rayfin up` adds the deployed app origin automatically.
- `fabric.enabled` – Enables Fabric SSO. Required for deployed apps.
- `fabric.externalEntraExchange` – Enables direct delegated Entra token exchange and external-parent-host handoff. The target Fabric environment must also support the exchange.
- `password.enabled` – Enables email and password sign-in for local development.

> [!IMPORTANT]
> Fabric deployments require authentication to be enabled. `npx rayfin up` fails when `services.auth.enabled` is set to `false`.

After editing `rayfin.yml`, restart the local backend or run `npx rayfin up` to apply the change.

### Prerequisites for externally acquired Entra tokens

Direct exchange and external-parent-host authentication require a delegated user token for the Fabric/Power BI audience accepted by the target deployment, with `Item.Execute.All`, issued in the item's owning tenant. The user must also have **Execute** permission on the app item. App-only tokens aren't supported by these sign-in paths.

Your identity library acquires the token and handles consent. The Rayfin SDK exchanges it for a Rayfin session; it doesn't acquire the Entra token. Browser callers also need the service's CORS policy to permit the origin and authorization header.

## Custom claims

Custom claims let you attach application-specific metadata to every session—for example, a tenant name, a feature flag, or an app version. They're useful for role-based access control and feature gating without changing your data model.

```yaml
services:
  auth:
    enabled: true
    customClaims:
      tenant: default
      app_version: 1.0.0
```

Custom claims appear inside the session object and can be referenced from your data permission rules.

## What the SDK provides

When you use the `RayfinClient`, the authentication service is available on `client.auth`. At a conceptual level, it provides:

- **Sign-up and sign-in with email and password** during local development.
- **Sign-in and sign-up through Fabric SSO** for deployed apps. The same call handles both new and returning users.
- **Direct delegated Entra token exchange** in browser or Node.js code, plus a trusted external-parent-host handoff for embedded apps.
- **Sign-out** to end the current session.
- **Session reads and subscriptions** so your UI stays in sync with the user's authentication state.

For the code that wires these features into a real app, see [Configure Fabric SSO authentication for your Fabric app](fabric-authentication.md). For callback and handoff allow list guidance, see [Configure authentication redirect URIs](configure-authentication-redirect-uris.md).

## Related content

- [Configure Fabric SSO authentication for your Fabric app](fabric-authentication.md)
- [Configure authentication redirect URIs](configure-authentication-redirect-uris.md)
- [Define data permissions](data-permissions.md)
- [Deploy your Fabric Apps project](deploy-app.md)
