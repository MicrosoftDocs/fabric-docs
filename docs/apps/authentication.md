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

Fabric Apps supports two authentication methods. The method you use depends on where the app runs:

| Environment | Supported method | When to use it |
| --- | --- | --- |
| Local development | Email and password | Iterate quickly without depending on the Fabric portal. |
| Deployed to Fabric | Fabric SSO (Microsoft Entra ID) | Production sign-in for any user with access to your Fabric workspace. |

Key concepts:

- **Fabric SSO** signs the user in through the Fabric portal by using their existing Microsoft Entra ID identity. It only works when the app is opened from Fabric, so you can't use it during local development.
- **Email and password** is intended for local development only. It doesn't function after deployment.
- **First-time sign-in provisions the user.** With Fabric SSO, there's no separate sign-up step—users are created automatically the first time they sign in.
- **Authentication is required for Fabric deployments.** Setting `services.auth.enabled` to `false` causes `npx rayfin up` to fail.

## Sessions and identity

After a user signs in, the SDK creates a *session* that represents the signed-in user. Sessions are opaque—your app shouldn't inspect the underlying tokens. Instead, your app reads a small set of high-level properties:

- Whether a session is currently authenticated.
- The user's `id` and `email`.
- Custom claims that you configured in `rayfin.yml`.

The same client instance that signs the user in automatically attaches their identity to every data and storage call. You don't pass tokens around manually.

Sessions also raise change events, so your UI can react when a user signs in or signs out without reloading the page.

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
    password:
      enabled: true  # Local development only
```

What each setting controls:

- `services.auth.enabled` – Turns the authentication service on. Required for any Fabric deployment.
- `allowedRedirectUris` – The origins that are allowed to receive the user after sign-in. Add your local dev URL here. `npx rayfin up` adds the deployed app origin automatically.
- `fabric.enabled` – Enables Fabric SSO. Required for deployed apps.
- `password.enabled` – Enables email and password sign-in for local development.

> [!IMPORTANT]
> Fabric deployments require authentication to be enabled. `npx rayfin up` fails when `services.auth.enabled` is set to `false`.

After editing `rayfin.yml`, restart the local backend or run `npx rayfin up` to apply the change.

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
- **Sign-out** to end the current session.
- **Session reads and subscriptions** so your UI stays in sync with the user's authentication state.

For the code that wires these into a real app, see [Configure Fabric SSO authentication for your Fabric app](fabric-authentication.md).

## Related content

- [Configure Fabric SSO authentication for your Fabric app](fabric-authentication.md)
- [Define data permissions](data-permissions.md)
- [Deploy your Fabric Apps project](deploy-app.md)
