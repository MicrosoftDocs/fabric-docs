---
title: DevServer for Microsoft Fabric
description: This article describes what the DevServer does during local development—hosting your frontend (loaded in an iFrame) and exposing local endpoints Microsoft Fabric uses to read your manifests.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.custom:
ms.date: 12/15/2025
---

# DevServer with Microsoft Fabric

The DevServer is the local web server you run while developing a Fabric workload. It serves your frontend (SPA) on localhost and provides a small set of HTTP endpoints that Fabric calls during development to retrieve your Product and Item manifests. When combined with the DevGateway, Fabric can load your workload UI in an iFrame and read your manifest data without publishing anything to your tenant.

## What the DevServer does

- Hosts your workload frontend over HTTP on localhost (for example, [http://localhost:60006](http://localhost:60006)) so Fabric can load it in an iFrame.
- Serves static assets referenced by your manifests (icons, localized strings, images).
- Exposes local JSON endpoints Fabric uses to read your manifests during development.
- Enables rapid edit-refresh cycles with hot reload in most setups.

> [!IMPORTANT]
> The DevServer works together with the [DevGateway](./tools-register-local-workload.md). The DevGateway registers your local workload instance with Fabric so the service knows to talk to your DevServer endpoints while you develop.

## Where Fabric calls the DevServer

When you enable development mode and start both your DevGateway and DevServer:

- Fabric navigates to your frontend via the frontend endpoint defined by your workload manifest (see [Workload manifest](./manifest-workload.md)). In development, this usually points to a localhost URL exposed by the DevServer.
- Fabric queries the DevServer for your product-facing metadata so it can render navigation, tiles, and other UX for your workload. This allows you to iterate on `Product.json` and item manifests without rebuilding and uploading a package.

## Local endpoints the DevServer provides

Exact routes can vary by template, but the sample repository exposes a small set of predictable endpoints:

- GET / — returns your web app (the UI Fabric loads into an iFrame).
- GET /manifests — returns a JSON payload that aggregates your Product manifest and Item manifests used by the frontend. This mirrors the structure Fabric expects at publish time (see [Product manifest](./manifest-product.md) and [Item manifest](./manifest-item.md)).
- GET /assets/... — serves icons, images, and localized strings referenced by your manifests.

>[!NOTE]
>
>- CORS and headers are preconfigured in the sample DevServer so the app can be embedded and communicate with the host.
>- The route names above follow the current sample; consult your template's README if your project uses a different path for the manifests endpoint.

## Typical development flow

1. Start the DevServer from the sample repository to host your frontend on localhost.
2. Start the DevGateway to register your local workload with Fabric.
3. Open your Fabric workspace and launch the workload entry point; Fabric loads your app in an iFrame and calls your DevServer endpoints to read manifest data.
4. Edit UI or manifest files and refresh; changes take effect immediately without repackaging.

For how to start each process, see the [Getting Started tutorial](./get-started.md) and the [Setup guide](./setup-guide.md).

## Relationship to published manifests

In production, your workload's manifests are packaged and uploaded as part of your workload's NuGet package (see [Manifest overview](./manifest-overview.md)). During development, the DevServer's local endpoints act as a lightweight stand‑in for those packaged files so you can iterate quickly:

- Schema and rules are the same as for published manifests.
- The DevServer only affects local development; it doesn't change how publishing works.

## Troubleshooting tips

- If the iFrame shows a blank page, confirm the DevServer is running and the frontend endpoint in your manifest points to the correct localhost URL.
- If icons or strings are missing, check the `assets` paths and that the DevServer is serving those files under `/assets`.
- If Fabric can't find your manifests, verify the `/manifests` route exists in your template and returns valid JSON.

## See also

- [DevGateway](./tools-register-local-workload.md)
- [Workload manifest](./manifest-workload.md)
- [Product manifest](./manifest-product.md)
- [Item manifest](./manifest-item.md)
- [Manifest overview](./manifest-overview.md)
