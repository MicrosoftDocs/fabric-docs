---
title: DevServer for Microsoft Fabric
description: This article describes what the DevServer does during local development—hosting your frontend (loaded in an iFrame) and exposing local endpoints Microsoft Fabric uses to read your manifests.
ms.reviewer: gesaur
ms.topic: concept-article
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

## Remote endpoint stubs for local development

The DevServer includes built-in stub implementations for remote endpoints, allowing you to test jobs and lifecycle notifications locally without deploying to Azure or other cloud services. These stubs intercept calls that would normally go to your production remote endpoints and handle them on your local machine.

### What are remote endpoint stubs?

Remote endpoint stubs are local implementations of the remote endpoint contract that:

- Receive job execution requests and lifecycle notifications from Fabric
- Log request details to your console for immediate visibility
- Provide sample implementations showing how to interact with OneLake and other Fabric services
- Demonstrate token handling and authentication patterns
- Enable rapid iteration without cloud deployment

### Features supported by stubs

The DevServer stubs support:

**Job execution**
- On-demand and scheduled job triggers
- Job lifecycle management (start, status, cancel)
- Sample implementations showing data processing patterns
- OneLake integration examples

**Lifecycle notifications**
- Item creation notifications
- Item update notifications
- Item deletion and soft delete notifications
- Sample infrastructure provisioning patterns

### How it works

When you run the DevServer with remote endpoints configured:

1. **Automatic redirection** - All remote endpoint calls defined in your item manifest are automatically redirected to your local machine
2. **Console logging** - Request details, tokens, and payloads appear in your DevServer console
3. **Sample execution** - Stub implementations execute showing best practices
4. **Token access** - You receive actual Fabric tokens that can be used to call Fabric APIs and access OneLake

### Using remote endpoint stubs

To use the remote endpoint stubs for local testing:

1. **Configure your item manifest** - Define jobs or lifecycle notifications as you would for production (see [Enable Remote Jobs](how-to-enable-remote-jobs.md) and [Enable Item Lifecycle Notifications](how-to-enable-remote-item-lifecycle.md))

2. **Start your DevServer** - Launch the development server following the [quickstart guide](get-started.md)

3. **Register your local workload** - Use the DevGateway to register your workload with Fabric

4. **Trigger operations in Fabric** - Perform actions that trigger jobs or lifecycle notifications:
   - Create, update, or delete items for lifecycle notifications
   - Trigger jobs manually or via schedules

5. **Observe stub execution** - Watch your DevServer console for:
   - Incoming request details
   - Authentication token information
   - OneLake access examples
   - Job execution patterns

### Example console output

When a job is triggered, you see output like:

```
🔔 Job execution request received
   Job Type: MyWorkload.DataProcessor.RefreshData
   Instance ID: abc123-def456
   Workspace ID: 11111111-2222-3333-4444-555555555555
   Item ID: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee

🔑 Authentication tokens received
   Subject Token: eyJ0eXAiOiJKV1QiLCJhbGc...
   App Token: eyJ0eXAiOiJKV1QiLCJhbGc...
   Tenant ID: bbbbcccc-1111-dddd-2222-eeee3333ffff

📦 OneLake access example
   Getting OneLake token for scope: https://storage.azure.com/.default
   Reading from: /workspaces/{workspaceId}/items/{itemId}/files/

✅ Job execution completed
```

### Benefits of local stub testing

- **No Azure deployment required** - Test remote endpoint logic without cloud resources
- **Fast iteration** - See results immediately in your console
- **Token handling examples** - Learn authentication patterns with real tokens
- **OneLake integration** - Test data access patterns safely
- **Sample code** - See working implementations to guide your production code

### Moving to production

The stub implementations provide sample code you can adapt for production:

1. Review the stub implementation in your DevServer codebase
2. Implement production endpoints using the patterns demonstrated
3. Deploy endpoints to Azure Functions, Container Instances, or other hosting
4. Update manifest configuration to point to production endpoints (see [Enable Remote Endpoints](how-to-enable-remote-endpoint.md))

The stubs use the same authentication patterns and API contracts as production, making the transition straightforward.

## See also

- [DevGateway](./tools-register-local-workload.md)
- [Enable Remote Endpoints](how-to-enable-remote-endpoint.md)
- [Enable Remote Jobs](how-to-enable-remote-jobs.md)
- [Enable Item Lifecycle Notifications](how-to-enable-remote-item-lifecycle.md)
- [Authenticate Remote Endpoints](authentication-remote.md)
- [Workload manifest](./manifest-workload.md)
- [Product manifest](./manifest-product.md)
- [Item manifest](./manifest-item.md)
- [Manifest overview](./manifest-overview.md)
