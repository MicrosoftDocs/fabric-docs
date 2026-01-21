---
title: Extensibility Toolkit overview
description: Basic overview of the Extensibility Toolkit and its functionality.
author: gsaurer
ms.author: billmath
ms.topic: overview
ms.custom:
ms.date: 12/15/2025
---

# Extensibility Toolkit overview

The Microsoft Fabric Extensibility Toolkit lets you build workloads that feel native in Fabric. Workloads are web applications you host that are loaded by the Fabric frontend in an iFrame. With a manifest, you declare everything Fabric needs to show the workload. This includes entry points, item types and resources so your experience can participate in Fabric workspaces just like built-in items.

## What is a workload?

A workload is a partner- or customer-built web app that integrates into the Fabric portal. The Fabric host boots your app according to its manifest, provides authentication tokens via Microsoft Entra ID, and exposes a host API to enable navigation, theming, notifications, and other platform interactions.

Key traits:

- Hosted by you, rendered in Fabric via iFrame
- Manifest-driven entry points, capabilities, and permissions
- Auth with Microsoft Entra ID; scoped tokens to access resources in an outside fabric
- Uses Fabric Public REST APIs for platform operations

## Items and the native model

Workloads can contribute one or more item types. Items appear in workspaces and participate in collaboration, sharing, search, lineage, and lifecycle operations. Data is stored in [OneLake](../onelake/onelake-overview.md) and metadata is managed via Fabric public APIs, so items behave like any other Fabric artifact.

Examples of native participation:

- Create, read, update, and delete items (CRUD) in Fabric portal and over API
- Workspace ACLs and tenant governance apply
- Discoverable via search and integrated in navigation
- Data storage in OneLake
- CICD support

## When to use the Extensibility Toolkit

Use the toolkit when you want to bring a custom experience to Fabric while leveraging its identity, governance, storage, and APIs. Typical scenarios include domain-specific authoring experiences, governance tooling, and integrations that manage Fabric content.

## Learn more

- [Architecture](architecture.md)
- [Manifest overview](manifest-overview.md)
- [Getting started guide](get-started.md)
- [Publish your workload](publishing-overview.md)
- [Fabric Public REST APIs](/rest/api/fabric/articles/)
