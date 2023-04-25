---
title: Get Workspace and OneLake path
description: Follow steps to get the workspace and OneLake path in Microsoft Fabric.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: how-to
---

# Get workspace and OneLake path

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this tutorial, you learn how to find a [OneLake](../onelake/onelake-overview.md) file path from the [Lakehouse](../data-engineering/lakehouse-overview.md) experience. To maintain a single copy of data, Lakehouses and transactional Warehouses store data in OneLake.

## Known limitations

Currently, the OneLake path is displayed only in the Lakehouse experience. When you are using the SQL Endpoint or connect to a transactional warehouse, OneLake path isn't displayed in the product experience.

## How to get a workspace and OneLake path

Prerequisites:

- A workspace should be created.
- A lakehouse should exist in the workspace.

### Get workspace ID

The following steps detail how to get the workspace ID from a URL:

1. When you open a [!INCLUDE [product-name](../includes/product-name.md)] workspace, the URL shows GUID information of the workspace. The highlighted string in the following image is your workspace ID.

   :::image type="content" source="media\get-workspace-onelake-path\id-in-url.png" alt-text="Screenshot showing which section of the URL is the workspace ID." lightbox="media\get-workspace-onelake-path\id-in-url.png":::

### Get OneLake path

The following steps detail how to get the OneLake path from a Lakehouse:

1. Open Lakehouse in your [!INCLUDE [product-name](../includes/product-name.md)] workspace.

1. In Object Explorer, you find context menus in the **Tables and Files** section. Select the **Properties** menu.

   :::image type="content" source="media\get-workspace-onelake-path\select-properties.png" alt-text="Screenshot showing where to find the Properties option in the Tables and Files screen." lightbox="media\get-workspace-onelake-path\select-properties.png":::

1. On selection, the right-side pane shows the following information:
   1. Name
   1. Type
   1. URL
   1. Relative path
   1. ABFS path ([Learn more](/azure/storage/blobs/data-lake-storage-introduction-abfs-uri))
   1. Last modified

   :::image type="content" source="media\get-workspace-onelake-path\properties-details.png" alt-text="Screenshot of the Properties pane." lightbox="media\get-workspace-onelake-path\properties-details.png":::

1. To get the location of a selected file, select the **Properties** menu on the file.

   :::image type="content" source="media\get-workspace-onelake-path\properties-of-file.png" alt-text="Screenshot showing where to select the Properties option." lightbox="media\get-workspace-onelake-path\properties-of-file.png":::

1. After selecting the **Properties** menu on a selected file, the right-side pane will display the metadata information and location of the selected file.

   :::image type="content" source="media\get-workspace-onelake-path\properties-file-location.png" alt-text="Screenshot showing where to find metadata and file location in the Properties screen." lightbox="media\get-workspace-onelake-path\properties-file-location.png":::

## Next steps

- [Workspace roles](workspace-roles.md)
- [OneLake overview](../onelake/onelake-overview.md)
- [OneLake File Explorer](../onelake/onelake-file-explorer.md)
- [Delta Lake logs in Synapse Data Warehouse in Microsoft Fabric](query-delta-lake-logs.md)