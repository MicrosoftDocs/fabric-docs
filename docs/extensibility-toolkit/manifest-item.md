---
title: Item Manifest
description: What is the item manifest and how does it work.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.custom:
ms.date: 12/15/2025
---

# Item manifest

Each item contributed by your workload is defined by two files that work together and align with the workload and product manifests:

- `{ItemName}.xml` — Defines the item type itself and core parameters.
- `{ItemName}.json` — Defines front-end behavior (where items can be created, display names, icons, and UI hints).


## What the XML defines

Use the XML file to declare the item type and important parameters that Fabric needs to recognize and manage the item. This includes identity and behaviors that align with your workload configuration.

## What the JSON defines

Use the JSON file to describe front-end behavior and presentation, such as:

- Where items can be created in the Fabric experience
- Display names, descriptions, and icons for the item
- Other UI hints that the Fabric portal uses when rendering your item

## Naming and generation

> [!IMPORTANT]
> Item names must be unique within a single workload. Choose distinct names to avoid collisions across your item manifests.

In the [Starter-Kit](https://aka.ms/fabric-extensibility-starter-kit), PowerShell scripts read values from the environment file and populate placeholders in newly created item XML files and during manifest builds. This keeps item identifiers and metadata consistent across XML/JSON and the workload/product manifests.

## How item manifests fit with other manifests

- Workload: runtime configuration for identity, hosting, and endpoints. See [Workload manifest](manifest-workload.md).
- Product: portal-facing metadata and links. See [Product manifest](manifest-product.md).
