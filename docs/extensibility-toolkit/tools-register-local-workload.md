---
title: DevGateway for Microsoft Fabric
description: This article describes how the DevGateway registers your local development instance with Microsoft Fabric and routes host calls to your DevServer using your manifests.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.custom:
ms.date: 12/15/2025
---

# DevGateway with Microsoft Fabric

The DevGateway is a small helper you run during development to register your local workload instance with Fabric. It tells the Fabric service where your frontend is hosted (your DevServer on localhost) and which items are available, based on your manifests. With the DevGateway running, Fabric can load your UI in an iFrame and call your local DevServer to read product and item metadata—without publishing a package to your tenant.

## What the DevGateway does

- Registers a local workload instance in a specific workspace for the current signed-in developer.
- Informs Fabric about your workload identity and entry point using your manifests.
- Routes Fabric host calls to your local environment so the platform can load your frontend and discover items while you iterate.
- Works hand-in-hand with the [DevServer](./tools-register-local-web-server.md), which actually hosts your frontend and exposes manifest endpoints.

> [!NOTE]
> The DevGateway doesn't serve your web app or manifests itself. Instead, it registers your local instance and points Fabric to your DevServer and manifests.

## How it uses manifests in development

Your workload is manifest-driven in both development and production. During development:

- The DevGateway uses your local configuration to advertise the workload's identity and entry points (as defined in the [Workload manifest](./manifest-workload.md)).
- Fabric then calls your [DevServer](./tools-register-local-web-server.md) to fetch the [Product manifest](./manifest-product.md) and [Item manifests](./manifest-item.md) via local endpoints (for example, the template's `/manifests` route), so the service can render navigation, tiles, and creation experiences.

This mirrors what happens at publish time, but everything stays local for fast iteration.

## Typical development flow

1. Start your DevServer to host the frontend on localhost.
2. Start the DevGateway and sign in with a user who is an admin of the target workspace.
3. Open your Fabric workspace and use the workload entry point; Fabric loads your UI in an iFrame and discovers items via your manifests.
4. Edit UI and manifest files, refresh to see changes immediately.

See the [Getting Started tutorial](./get-started.md) for step-by-step setup and start instructions.

## Configuration inputs

Depending on your template, the DevGateway reads a local config that includes:

- Target workspace for registration
- Local frontend endpoint (your DevServer URL)
- Paths or references to your manifest files/assets used during development

Your repository's setup/build scripts generate or update this config automatically so the DevGateway and DevServer stay in sync.

## Troubleshooting tips

- If the UI doesn't open in Fabric, ensure you started both the DevGateway and the DevServer, and that you're signed in to a workspace where you have the required permissions.
- If Fabric can't discover items, confirm your DevServer's manifests endpoint returns valid JSON and your DevGateway is pointing the service to the correct localhost URL.
- If icons or strings are missing, verify the assets paths in your manifests and that your DevServer serves them.

## See also

- [DevServer](./tools-register-local-web-server.md)
- [Manifest overview](./manifest-overview.md)
- [Workload manifest](./manifest-workload.md)
- [Product manifest](./manifest-product.md)
- [Item manifest](./manifest-item.md)
