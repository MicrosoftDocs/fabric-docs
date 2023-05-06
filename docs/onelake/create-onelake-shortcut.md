---
title: Create a OneLake shortcut
description: Learn how to create two types of shortcuts, a OneLake shortcut and an Azure Data Lake Storage (ADLS) shortcut.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 03/24/2023
---

# How-to: Create a OneLake shortcut

[!INCLUDE [preview-note](../includes/preview-note.md)]
For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md).

Prerequisite: Create a lakehouse by following these steps: [Creating a lakehouse with OneLake](create-lakehouse-onelake.md).

## How to create a OneLake shortcut

To create a OneLake shortcut:

1. Open a lakehouse.

1. Right click on a directory within the **Lake view** of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="Screenshot showing where to select New shortcut from the Lake view." lightbox="media\create-onelake-shortcut\new-shortcut-lake-view.png":::

1. Select the **Microsoft OneLake** tile.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-tile-options-v2.png" alt-text="Screenshot of the tile options in the New shortcut screen." lightbox="media\create-onelake-shortcut\new-shortcut-tile-options.png":::

1. Choose a Fabric item for the shortcut to point to.  This can be a Lakehouse, Data Warehouse or KQL Database. Then select **Next**.

   :::image type="content" source="media\create-onelake-shortcut\select-data-source.png" alt-text="Screenshot of the Select a data source type screen." lightbox="media\create-onelake-shortcut\select-data-source.png":::

1. Select a folder, then select **Create**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-create-button.png" alt-text="Screenshot showing where to select the Create button in the New shortcut screen." lightbox="media\create-onelake-shortcut\new-shortcut-create-button.png":::

1. See the folder icon with shortcut symbol in the explorer.

   :::image type="content" source="media\create-onelake-shortcut\folder-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of folders that display the shortcut symbol." lightbox="media\create-onelake-shortcut\folder-shortcut-symbol.png":::

## Next steps

- [How-to: Create an ADLS Gen2 shortcut](create-adls-shortcut.md)
- [How-to: Create an Amazon S3 shortcut](create-s3-shortcut.md)
