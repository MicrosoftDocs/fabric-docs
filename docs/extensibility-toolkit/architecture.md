---
title: Extensibility Toolkit Architecture
description: Learn more about the Architecture of the Extensibility Toolkit.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.custom:
ms.date: 12/15/2025
---

# Extensibility Toolkit architecture

This article describes the architecture of the Microsoft Fabric Extensibility Toolkit and how custom workloads integrate with the Fabric platform. It explains the runtime components, flows between the Fabric frontend, your workload, and Fabric services, and how the manifest and item model make workloads feel native in Fabric.

:::image type="content" source="media/architecture/high-level-architecture.png" alt-text="High-level architecture diagram of the Extensibility Toolkit." lightbox="media/architecture/high-level-architecture.png":::

## Architectural components

### Fabric frontend (host)

The Fabric frontend is the host environment. It renders your workload as an iFrame and exposes a secure host API to the iFrame so the workload can interact with Fabric while remaining isolated. The host is responsible for bootstrapping the workload according to its manifest (entry points, routes, and capabilities), managing authentication tokens via Microsoft Entra ID, and mediating calls from the workload to Fabric public APIs and platform services.

### Workload web application

Your workload is a web application (for example, React or Angular) that you host in your cloud. Fabric loads it in an iFrame and provides host APIs to integrate with the platform. The app implements the routes and UI surfaces declared in its manifest, uses Microsoft Entra ID tokens (provided by the host) to call Fabric public APIs and, if needed, your own back-end services, and follows Fabric UX guidance so it looks and behaves like a native experience.

### Fabric service and public APIs

The Fabric service exposes public APIs for reading and writing metadata and content, managing items, and integrating with platform capabilities. Workloads call these APIs using scoped tokens issued through Microsoft Entra ID—for example, to perform item CRUD operations and lifecycle actions, access data and content stored in [OneLake](../onelake/onelake-overview.md), and participate in workspace features such as search and discovery. For endpoints, scopes, and identity guidance, see the [Fabric Public REST APIs](/rest/api/fabric/articles/).

### Microsoft Entra (authentication)

Authentication and authorization are handled by Microsoft Entra ID. The workload’s manifest declares the permissions it needs; the Fabric host obtains the appropriate tokens and enforces consent and access according to those declarations.

## Workload model and manifest

Workloads are defined by a manifest that describes their identity, capabilities, routes, UI entry points, and required permissions. The manifest is the contract between your web app and Fabric. For the schema, examples, and validation guidance, see [Manifest Overview](manifest-overview.md).

## Items and native participation

Workloads typically contribute one or more item types. Items created by your workload appear in workspaces and behave like native Fabric items. They participate in collaboration and sharing, are discoverable in search, follow lifecycle operations and governance, and store data via OneLake while using Fabric public APIs for CRUD.

## End-to-end flow

1. A user opens a workspace and navigates to an item or entry point provided by your workload.
2. The Fabric frontend loads your web application in an iFrame based on the manifest.
3. The host acquires Microsoft Entra tokens with the scopes your workload requires and exposes a host API to the iFrame.
4. The workload calls Fabric public APIs (and, if applicable, your own services) using these tokens.
5. Item data is stored in OneLake and item metadata is managed through Fabric APIs so it behaves like any other Fabric item.

## Next steps

To develop locally and publish your workload, see [Publish your workload](publishing-overview.md). For manifest schema and local development guidance, see [Manifest overview](manifest-overview.md), [DevServer](tools-register-local-web-server.md), and [DevGateway](tools-register-local-workload.md). For API endpoints, scopes, and identity guidance, see the [Fabric Public REST APIs](/rest/api/fabric/articles/).

## Related content

* [Microsoft Entra ID](/entra/)
* [OneLake overview](../onelake/onelake-overview.md)
* [Fabric Client SDK](https://go.microsoft.com/fwlink/?linkid=2271989)
