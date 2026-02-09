---
title: Workload Manifest
description: Learn more about the Workload Manifest and the usage.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.custom:
ms.date: 12/15/2025
---

# Workload manifest in Extensibility Toolkit

The workload manifest (WorkloadManifest.xml) is the workload-level configuration for your workload. It tells Fabric who your workload is and how to reach your front end so the host can bootstrap it securely. It complements, but doesn't replace, the product and item definitions:

- Product metadata (for discovery and publishing) lives in Product.json.
- Item types and their behaviors live in the item manifests and JSON files.

## What the workload manifest defines

- Workload identity: `WorkloadName` ([Organization].[WorkloadId]) and `Version` (semantic version)
- Hosting model: `HostingType` (use `FERemote`)
- Front-end Microsoft Entra app: `AADFEApp` > `AppId`
- Front-end endpoints: `ServiceEndpoint` entries with `Name` (for example, `Frontend`), `Url` (localhost in dev; production domain must be a subdomain of your verified Entra domain), and `IsEndpointResolutionService`. See [General Publishing Requirements](publishing-requirements-general.md#domain-configuration) for domain restrictions.
- Optional sandbox relaxation: `EnableSandboxRelaxation` only when special iFrame capabilities are required (for example, initiating file downloads)

## Best practices

- Keep versions consistent across your app and manifest
- Declare the minimum permissions needed (principle of least privilege)
- Validate the manifest as part of CI

## Structure

Key elements in the Manifest and what they mean:

- Root element with a schema version (for example, `SchemaVersion="2.0.0"`).
- `Workload` node with attributes such as:
	- `WorkloadName` — unique identifier in the form `[Organization].[WorkloadId]` (for example, `Org.MyWorkload`). If you don’t intend to publish to other tenants, you can use `Org.[WorkloadId]`. For publishing across tenants, register a full WorkloadName with Fabric.
	- `HostingType` — indicates workload hosting; use `FERemote`.
- `Version` node — semantic version of your workload package.
- `RemoteServiceConfiguration` > `CloudServiceConfiguration` containing:
	- `Cloud` (for example, `Public`).
	- `AADFEApp` > `AppId` — contains the frontend Microsoft Entra application ID.
	- `EnableSandboxRelaxation` — set it to `true` if you require special iFrame capabilities (for example, initiating file downloads). Keep `false` by default for security.
	- `Endpoints` > `ServiceEndpoint` entries with:
		- `Name` (for example, `Frontend`).
		- `Url` — where the frontend is hosted. Use `https://localhost:port` for development. In production, the domain must be a subdomain of your verified Entra domain. See [General Publishing Requirements](publishing-requirements-general.md#domain-configuration) for complete domain restrictions.
		- `IsEndpointResolutionService`.

## Build output and placeholders

In the Starter-Kit, populates the placeholders every time the Manifest is created based on the configuration in the environment file. The final finalized manifest is created in the `build/Manifest` directory. Using placeholders and populating them from the environments allows you to build different environments without changing the files or the scripts. The build output is used by:

- DevGateway: Register your local development instance with Fabric so your app can load inside the Fabric portal during development.
- DevServer: Which is providing the information to the Fabric 
- Admin Portal: for test and production, upload the manifest package through the Fabric Admin Portal as part of publishing. See [Publish your workload](publishing-overview.md).

## Learn more

- [Architecture](architecture.md)

## Related content

- [Getting started guide](get-started.md)
- [Setup guide](setup-guide.md)
- [Fabric Public REST APIs](/rest/api/fabric/articles/)
