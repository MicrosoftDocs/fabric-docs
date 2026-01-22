---
title: Manifest overview
description: Describes the Manifest and its purpose.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.custom:
ms.date: 12/15/2025
---

# Manifest overview

A NuGet-style package is used to defined Fabric Workloads. This manifest is the contract between your workload and Fabric—it tells the host what your workload is, which capabilities it exposes, how and where to load it, and what items it contributes.

## What’s in the manifest package

The manifest package is composed of several parts that work together:

- Workload manifest: Declares identity, routes, entry points, permissions, and capabilities. See [Workload manifest](manifest-workload.md).
- Product JSON: Provides product-level metadata used for discovery and publishing. See [Product manifest](manifest-product.md).
- Item manifests and JSON files: Define each item type your workload contributes, including creation, editing, viewing, and behaviors. See [Items](manifest-item.md).

## Why the manifest matters

- Development: The manifest enables local registration and host bootstrapping so you can run and debug your workload inside Fabric.
- Publishing: The same manifest package is used to validate, certify, and publish your workload to the Workload Hub or tenant environments.

## Scripts and automation in the Starter-Kit

The [Starter-Kit](https://aka.ms/fabric-extensibility-starter-kit) repository includes scripts that automatically build the manifest package for you during setup and development. It reduces manual steps and keeps the contract in sync with your code.

## How it’s used in dev and production

- DevGateway: Uses the manifest to register your local development instance with Fabric so your app loads in an iFrame during development. See [DevGateway](tools-register-local-workload.md).
- Admin Portal: For testing and production, upload the manifest package through the Fabric Admin Portal as part of your publishing flow. See [Publish your workload](publishing-overview.md).

## Related content

- [Workload manifest](manifest-workload.md)
- [Product manifest](manifest-product.md)
- [Items](manifest-item.md)
- [Getting started guide](get-started.md)
