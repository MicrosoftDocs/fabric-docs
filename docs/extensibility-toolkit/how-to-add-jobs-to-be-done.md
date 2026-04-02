---
title: How to add jobs-to-be-done
description: Learn how to configure Item Task Flow Categories in your Fabric workloads using the Product.json manifest.
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# How-To: Add jobs to be done to the item

Fabric workloads can define Item Task Flow Categories that integrate with the Fabric Task Flow Framework. This article explains how to configure these categories in your workload using the Product.json manifest.

## Overview

Item Task Flow Categories enable:

- **Task integration**: Connect your items with Fabric's task flow framework
- **Workflow organization**: Categorize items by their primary purpose
- **User guidance**: Help users understand what your items can do
- **Framework integration**: Leverage Fabric's built-in task orchestration

## Configuring Item Task Flow Categories in Product.json

Item Task Flow Categories are configured in the `itemJobTypes` array in your Product.json manifest file. Only **3 categories are currently supported**. If no categories are specified, items will appear in the "other" section:

```json
{
  "name": "Product",
  "version": "1.100",
  "displayName": "My Custom Workload",
  
  "itemJobTypes": [
    "getData",
    "storeData"
  ],
  
  "compatibleItemTypes": ["Lakehouse"]
}
```

## Available Item Task Flow Categories

Fabric currently supports **3 predefined categories** that you can include in your `itemJobTypes` array:

### Data acquisition

- **`getData`** - Items that retrieve, import, or acquire data from various sources

### Data storage

- **`storeData`** - Items that persist, save, or store data in various formats and locations

### Custom operations

- **`others`** - Items that perform specialized operations not covered by the other categories

> [!NOTE]
> If you don't specify any `itemJobTypes` categories, your items will automatically appear in the "other" section of the Task Flow Framework.

## Example configurations

### Data acquisition workload

```json
{
  "name": "DataAcquisitionWorkload", 
  "itemJobTypes": [
    "getData"
  ]
}
```

### Data storage workload

```json
{
  "name": "DataStorageWorkload",
  "itemJobTypes": [
    "storeData"
  ]
}
```

### Data pipeline workload

```json
{
  "name": "DataPipelineWorkload",
  "itemJobTypes": [
    "getData",
    "storeData"
  ]
}
```

### Custom workload

```json
{
  "name": "CustomWorkload",
  "itemJobTypes": [
    "others"
  ]
}
```

### Workload without categories

```json
{
  "name": "GeneralWorkload",
  "itemJobTypes": []
}
```

> [!NOTE]
> The above workload will appear in the "other" section since no categories are specified.

## Category behavior

### Task Flow Integration

When you include Item Task Flow Categories, Fabric automatically:

- Places your items in the appropriate sections of the Task Flow Framework
- Provides relevant task suggestions based on categories
- Enables workflow organization and discovery
- Connects with related Fabric services and features

### Category limitations

Important constraints to consider:

- **Only 3 categories supported**: `getData`, `storeData`, and `others`
- **Default behavior**: Items without categories appear in the "other" section
- **Case sensitive**: Category names must match exactly as specified
- **No custom names**: Only the 3 predefined categories are supported

## Best practices

### Choosing categories

- **Be specific**: Select the category that best represents your item's primary purpose
- **Consider workflows**: Think about how your item fits into data acquisition or storage workflows
- **Use 'others' sparingly**: Only use `others` when your item doesn't clearly fit data acquisition or storage

### Configuration guidelines

- **Match functionality**: Use `getData` for items that acquire/import data, `storeData` for items that persist data
- **Default to none**: If unsure, omit categories to let items appear in the "other" section
- **Test placement**: Verify your items appear in the expected Task Flow Framework sections

### Category selection guide

1. **`getData`**: Choose if your item primarily acquires, imports, or retrieves data
2. **`storeData`**: Choose if your item primarily saves, persists, or stores data  
3. **`others`**: Choose for specialized functionality not covered by data acquisition/storage
4. **No category**: Let items appear in "other" section for general-purpose functionality

## Related configuration

### Compatible item types

Categories work with specific Fabric item types:

```json
{
  "itemJobTypes": ["getData", "storeData"],
  "compatibleItemTypes": ["Lakehouse", "Dataset", "Dataflow"]
}
```

### Category combinations

Since only 3 categories are supported, your options are:

```json
// Data acquisition only
"itemJobTypes": ["getData"]

// Data storage only  
"itemJobTypes": ["storeData"]

// Custom operations
"itemJobTypes": ["others"]

// Combined data operations
"itemJobTypes": ["getData", "storeData"]

// No categories (appears in "other" section)
"itemJobTypes": []
```

## Next steps

After configuring Item Task Flow Categories in Product.json:

- **Test integration** - Verify your item appears correctly in Task Flow Framework
- **Validate workflows** - Ensure categories enable appropriate workflow suggestions
- **User testing** - Confirm users can discover and use your item effectively
- **Monitor usage** - Track how categories affect item adoption and usage patterns

## Related topics

- [Workload Manifest](manifest-workload.md) - Complete manifest configuration
- [Product Manifest](manifest-product.md) - Product.json specification
- [Concept: Fabric Item Overview](concept-item-overview.md) - Understanding Fabric item structure

For more information about Fabric's Task Flow Framework, see the [Fabric Task Flow documentation](../fundamentals/task-flow-overview.md).
