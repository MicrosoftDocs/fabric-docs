---
title: Configure authentication redirect URIs for Fabric Apps
description: Learn how to configure allowed redirect URIs for authentication callbacks and the Fabric SSO handoff in a Fabric app.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 08/24/2026
ai-usage: ai-generated
---

# Configure authentication redirect URIs for Fabric Apps

Configure `allowedRedirectUris` in `rayfin/rayfin.yml` for authentication callbacks and the Fabric single sign-on (SSO) handoff. This setting is an allow list of origins and URLs that Rayfin can redirect to after an authentication flow.

The setting supports two scenarios:

- The Fabric SSO `postMessage` handoff.
- Standard authentication callbacks.

Configure the setting for both a local development app and a deployed Fabric app.

## Configure `allowedRedirectUris`

Add `allowedRedirectUris` under `services.auth` in `rayfin/rayfin.yml`:

```yaml
services:
  auth:
    enabled: true
    allowedRedirectUris:
      - http://localhost:5173
```

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `allowedRedirectUris` | `string[]` | `["http://localhost:5173"]` | Allowed redirect URIs for authentication callbacks and the Fabric SSO handoff. Include the bare origin for Fabric authentication. |

## Understand how Fabric SSO uses the origin

The Fabric SSO popup flow uses your app's bare origin as the target origin for its `postMessage` handoff. A bare origin includes the scheme, host, and optional port, but no path. For example:

```text
http://localhost:5173
```

The value must match the `returnOrigin` passed to the Fabric authentication provider. For the complete sign-in flow, see [Configure Fabric SSO authentication](fabric-authentication.md).

Add each origin where your app is served. In most projects, this list includes the local development server and one or more deployed hosting origins.

## Understand what `rayfin up` adds

When you enable static hosting, `npx rayfin up` automatically adds the hosting URL's bare origin to `allowedRedirectUris` during every deployment. You don't need to add the deployed origin manually.

The deployed origin is required for the Fabric SSO `postMessage` handoff, including when you disable interactive Fabric authentication.

For example, if the deployed hosting URL is `https://bold-river-a3f1bc9d02-westus2.webapp.example.com`, the configuration contains both the local and deployed origins after deployment:

```yaml
services:
  auth:
    allowedRedirectUris:
      - http://localhost:5173
      - https://bold-river-a3f1bc9d02-westus2.webapp.example.com
```

The deployment command updates `rayfin.yml` and sends the configuration to the backend. As a result, `rayfin.yml` typically gains a Fabric-hosted entry after the first deployment.

## Keep the allow list tightly scoped

Treat `allowedRedirectUris` as a security boundary. Every listed origin can receive a Fabric SSO handoff or complete an authentication callback for your app.

- Add only origins where you serve your app.
- Don't add wildcard or third-party origins.
- Review the list after you copy `rayfin.yml` between projects or environments.
- Remove stale deployment origins after you confirm that the app no longer uses them.

A stale origin from another project or deployment can become an unintended redirect target.

## Apply configuration changes

After you change `allowedRedirectUris`, deploy the updated configuration:

```bash
npx rayfin up
```

The new redirect URIs aren't available to the deployed authentication service until you apply the configuration.

## Troubleshoot redirect URIs

### Fabric SSO reports an origin mismatch

Confirm that:

- `returnOrigin` is a bare origin with no path.
- `returnOrigin` exactly matches an entry in `allowedRedirectUris`.
- The deployed hosting origin is present after `npx rayfin up`.
- The scheme, host, and port match, including the local development port.

For additional SSO diagnostics, see [Troubleshoot authentication issues](fabric-authentication.md#troubleshoot-authentication-issues).

### Configuration changes don't take effect

Run `npx rayfin up` to send the updated `rayfin.yml` configuration to the backend. Then retry the authentication flow.

### The list contains an unfamiliar origin

Determine whether the origin belongs to a current local development server or deployed Fabric app. If it doesn't, remove it from the configuration, run `npx rayfin up`, and verify authentication from each expected environment.

## Use an AI prompt

Copy the following prompt into GitHub Copilot or another coding agent that has access to your project:

```text
Look at services.auth.allowedRedirectUris in my Rayfin project's rayfin/rayfin.yml.

List every origin currently in it and tell me, for each one, whether it looks like my local
development server, a Fabric-hosted deployment origin that rayfin up added automatically,
or something else that shouldn't be there. Flag anything that isn't clearly one of my own
app's origins, and propose a trimmed list. Do not remove entries without showing me the
before-and-after diff first.
```

## Related content

- [Authentication for Fabric Apps](authentication.md)
- [Configure Fabric SSO authentication](fabric-authentication.md)
- [Configure static content hosting](hosting.md)
- [Deploy a Fabric app to Fabric](deploy-app.md)
