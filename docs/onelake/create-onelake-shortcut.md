---
title: Create a OneLake shortcut
description: Learn how to create OneLake shortcuts.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom: build-2023
ms.date: 07/16/2023
---

# Create a OneLake shortcut

In this article, you learn how to create a OneLake shortcut inside a Fabric Lakehouse. You can use Lakehouse, Data Warehouse or KQL Database as the source for your shortcut. For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md).

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisite

Create a lakehouse by following these steps: [Creating a lakehouse with OneLake](create-lakehouse-onelake.md).

## Create a shortcut

1. Open a lakehouse.

1. Right click on a directory within the **Lake view** of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="Screenshot showing where to select New shortcut from the Lake view." lightbox="media\create-onelake-shortcut\new-shortcut-lake-view.png":::

[!INCLUDE [onelake-shortcut](../includes/onelake-shortcut.md)]

The lakehouse automatically refreshes. The shortcut appears under **Files** in the **Explorer** pane.

   :::image type="content" source="media\create-onelake-shortcut\folder-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of folders that display the shortcut symbol." lightbox="media\create-onelake-shortcut\folder-shortcut-symbol.png":::

## Next steps

* [Create an Azure Data Lake Storage Gen2 shortcut](create-adls-shortcut.md)
* [Create an Amazon S3 shortcut](create-s3-shortcut.md)
