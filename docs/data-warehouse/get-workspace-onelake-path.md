---
title: Getting Workspace and OneLake path
description: Follow steps to get the workspace and OneLake path.
ms.reviewer: wiassaf
ms.author: prlangad
author: prlangad
ms.topic: how-to
ms.date: 03/15/2023
---

# Getting Workspace and OneLake path

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Applies to:** Warehouse and SQL Endpoint

To maintain a single copy of data, Lakehouses and transactional Warehouses store data in OneLake.

In this tutorial, you learn how to find a OneLake file path from the Lakehouse experience.

## Known limitations

Currently, the OneLake path is displayed only in the Lakehouse experience. When you are in default warehouse or transactional warehouse, OneLake path isn't displayed in the product experience.

## How to get a Workspace and OneLake path

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

- Workspace roles
