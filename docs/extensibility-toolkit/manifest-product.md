---
title: Product Manifest
description: Learn more about the Product Manifest.
ms.reviewer: gesaur
ms.topic: concept-article
ms.date: 12/15/2025
ai-usage: ai-assisted
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

## Frontend folder and Product.json limits

The frontend (`FE`) folder has the following constraints:

- Can contain a maximum of 10 item files plus one `product.json` file.
- The `product.json` file must not exceed 50 KB in size.
- The `Assets` subfolder must reside under the `FE` folder and can contain up to 15 files.
- Each file in the `Assets` folder must be no larger than 1.5 MB.
- Only `.jpeg`, `.jpg`, and `.png` file types are permitted in the `Assets` subfolder.
- Each asset within the `Assets` folder must be referenced within the item files. Any asset referenced from an item file that is missing in the `Assets` folder will result in an upload error.

See [Manifest overview](manifest-overview.md#package-limits) for complete package limits.

## How it fits with other manifests

- Workload manifest (WorkloadManifest.xml): runtime configuration for identity, hosting, endpoints. See [Workload manifest](manifest-workload.md).
- Item manifests and JSON files: per-item definitions and behaviors. See [Items](manifest-item.md).

## Related content

- [Manifest overview](manifest-overview.md)
- [Workload manifest](manifest-workload.md)
- [Items](manifest-item.md)
