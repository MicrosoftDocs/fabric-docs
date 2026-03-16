---
title: How to integrate with OneLake catalog
description: Learn how to configure your Fabric items to appear in OneLake catalog with proper categorization and DataHub L1 support.
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# Integrate with OneLake catalog

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
