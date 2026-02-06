---
title: Product Manifest
description: Learn more about the Product Manifest.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.custom:
ms.date: 12/15/2025
---

# Product manifest

The Product.json describes the front-end behavior and product metadata for your workload. Fabric uses it to render the workload information in the portal and to surface information such as display names, descriptions, icons, documentation links, and attestation.


## What Product.json defines

- Front-end behavior hints for your workload in the Fabric portal
- Product metadata for discovery and presentation (names, descriptions, categories)
- Links to your documentation support, and attestation pages
- Icons and other visual assets referenced by the product
- Internationalized strings resolved from the `assets` folder

## Internationalization and assets

Use the `assets` folder to store localized string resources and images that Product.json references. Strings are resolved via the internationalization model defined in the repository, so you can present localized names and descriptions across the Fabric portal.

## How it fits with other manifests

- Workload manifest (WorkloadManifest.xml): runtime configuration for identity, hosting, endpoints. See [Workload manifest](manifest-workload.md).
- Item manifests and JSON files: per-item definitions and behaviors. See [Items](manifest-item.md).

## Related content

- [Manifest overview](manifest-overview.md)
- [Workload manifest](manifest-workload.md)
- [Items](manifest-item.md)
