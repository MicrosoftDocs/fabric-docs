---
title: Manifest overview
description: Describes the Manifest and its purpose.
ms.reviewer: gesaur
ms.topic: concept-article
ms.date: 12/15/2025
ai-usage: ai-assisted
---

# Manifest overview

A NuGet-style package is used to defined Fabric Workloads. This manifest is the contract between your workload and Fabric—it tells the host what your workload is, which capabilities it exposes, how and where to load it, and what items it contributes.

## What’s in the manifest package

The manifest package is composed of several parts that work together:

- Workload manifest: Declares identity, routes, entry points, permissions, and capabilities. See [Workload manifest](manifest-workload.md).
- Product JSON: Provides product-level metadata used for discovery and publishing. See [Product manifest](manifest-product.md).
- Item manifests and JSON files: Define each item type your workload contributes, including creation, editing, viewing, and behaviors. See [Items](manifest-item.md).

## Package structure

The workload is packaged as a NuGet package, combining backend and frontend components. The structure adheres to specific naming conventions and is enforced by Fabric for consistency across upload scenarios.

### Backend structure

The backend segment is in the `BE` folder and comprises .xml files that define the workload and its associated items:

- `WorkloadManifest.xml` - The workload configuration file, required to have this exact name for Fabric's verification.
- `Item1.xml`, `Item2.xml`, `...` - Manifests for individual items with flexible naming, following the XML format.

### Frontend structure

The frontend section is in the `FE` folder and contains .json files detailing the product and items for the frontend, along with an `assets` directory for icons:

- `Product.json` - The main manifest for your product's frontend, which must be named precisely for Fabric's verification.
- `Item1.json`, `Item2.json`, `...` - Manifests for individual items with flexible naming, following the JSON format. Each json corresponds to a backend manifest (for example, Item1.json to Item1.xml).
- `assets` folder - Stores all icons and localized resources used by the frontend.

## Package limits

The following limits apply to all types of NuGet packages, both in development mode and cloud mode:

- Only `BE` and `FE` subfolders are permitted. Any other subfolders or files located outside these folders result in an upload error.
- The `BE` folder accepts only `.xml` files. Any other file type result in an upload error.
- A maximum of 10 item files is allowed, meaning the `BE` folder can contain one `WorkloadManifest.xml` and up to 10 `Item.xml` files. Having more than 10 item files in the folder result in an upload error.
- The `Assets` subfolder must reside under the `FE` folder. It can contain up to 15 files, with each file being no larger than 1.5 MB.
- Only the following file types are permitted in the `Assets` subfolder: `.jpeg`, `.jpg`, `.png`.
- The `FE` folder can contain a maximum of 10 item files plus one `product.json` file.
- The size of the `product.json` must not exceed 50 KB.
- Each asset within the `Assets` folder must be referenced within the item files. Any asset referenced from an item file that is missing in the `Assets` folder will result in an upload error.
- Filenames for items must be unique. Duplicate filenames result in an upload error.
- Filenames must contain alphanumeric (English) characters or hyphens only and cannot exceed a length of 32 characters. Using other characters or exceeding this length result in an upload error.
- The total package size must not exceed 20 MB.

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
