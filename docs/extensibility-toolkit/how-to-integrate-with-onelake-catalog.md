---
title: How to integrate with OneLake Catalog
description: Learn how to configure your Fabric items to appear in OneLake Catalog with proper categorization and DataHub L1 support.
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 11/20/2025
---

# How-To: Integrate with OneLake Catalog

Configure your Fabric items to appear in OneLake Catalog with proper categorization and DataHub support.

## Configuration

Configure in your item's `Item.json`:

```json
{
  "name": "MyDataItem",
  "displayName": "My Data Item", 
  "oneLakeCatalogCategory": ["Data", "Process"],
  "supportedInDatahubL1": true
}
```

## Categories

Each item can have up to **2 categories** from:

- **`Data`**: Data storage and management
- **`Insight`**: Analytics and reporting
- **`Process`**: Data processing and transformation
- **`Solution`**: Complete applications
- **`Configuration`**: Setup and configuration
- **`Other`**: Items that don't fit other categories

```json
{
  "oneLakeCatalogCategory": ["Data"]
}
```

```json
{
  "oneLakeCatalogCategory": ["Process", "Insight"]
}
```

## DataHub support

Enable DataHub L1 filtering:

```json
{
  "supportedInDatahubL1": true
}
```

## Important notes

- **No category specified**: Items won't appear in OneLake Catalog
- **Category limit**: Maximum 2 categories per item
- **DataHub integration**: Enable `supportedInDatahubL1` for data-related items

## Next steps

- [Configure item jobs](how-to-add-jobs-to-be-done.md)