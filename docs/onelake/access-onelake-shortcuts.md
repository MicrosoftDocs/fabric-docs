---
title: Accessing shortcuts
description: Follow steps to access shortcuts as folders or tables.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.topic: how-to
ms.date: 03/24/2023
---

# Accessing shortcuts

[!INCLUDE [preview-note](../includes/preview-note.md)]

For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md).

## How to access shortcuts as folders in a Spark notebook

Shortcuts appear as folders in OneLake, and Spark can read from them just like any other folder in OneLake.

To access a shortcut as a folder:

1. From a lakehouse containing shortcuts, select the **Open notebook** menu and then select **New notebook**.

   :::image type="content" source="media\access-onelake-shortcuts\open-notebook-ribbon.png" alt-text="Screenshot showing where to find the Open notebook option on the ribbon." lightbox="media\access-onelake-shortcuts\open-notebook-ribbon.png":::

1. Select a shortcut and right click on a file from the shortcut.

1. In the right-click menu, select **Load data** and then select **Spark**.

   :::image type="content" source="media\access-onelake-shortcuts\load-data-spark-menu.png" alt-text="Screenshot showing where to find the Load data and Spark option in the right-click menu." lightbox="media\access-onelake-shortcuts\load-data-spark-menu.png":::

1. Run the automatically generated code cell.

   :::image type="content" source="media\access-onelake-shortcuts\auto-code-cell.png" alt-text="Screenshot showing the automatically generated code cell." lightbox="media\access-onelake-shortcuts\auto-code-cell.png":::

## How to access shortcuts as tables in a Spark notebook

Fabric automatically recognizes shortcuts in the **Tables** section of the lakehouse that have data in the delta\parquet format as tables. You can reference these tables directly from a Spark notebook.

To access a shortcut as a table:

1. From a Lakehouse containing shortcuts, select the **Open notebook** menu and then select **New notebook.**

   :::image type="content" source="media\access-onelake-shortcuts\open-notebook-ribbon.png" alt-text="The same screenshot displayed previously, showing where to find the Open notebook option on the ribbon." lightbox="media\access-onelake-shortcuts\open-notebook-ribbon.png":::

1. Select the **Table view** in the notebook.

   :::image type="content" source="media\access-onelake-shortcuts\lakehouse-table-view.png" alt-text="Screenshot showing where to select Table view." lightbox="media\access-onelake-shortcuts\lakehouse-table-view.png":::

1. Right click on the table, then select **Load data** and **Spark**.

   :::image type="content" source="media\access-onelake-shortcuts\table-load-data-menu.png" alt-text="Screenshot showing the table right-click menu." lightbox="media\access-onelake-shortcuts\table-load-data-menu.png":::

1. Run the automatically generated code cell.

   :::image type="content" source="media\access-onelake-shortcuts\table-auto-code-cell.png" alt-text="Screenshot of the automatically generated code cell from Table view." lightbox="media\access-onelake-shortcuts\table-auto-code-cell.png":::

## How to access HTTPS and ABFS paths of a shortcut

You can also access shortcuts through the Azure Blob Filesystem (ABFS) driver or REST endpoint directly. Copy these paths from the lakehouse.

1. Open a Lakehouse containing shortcuts.

1. Right click on a shortcut and select **Properties**.

   :::image type="content" source="media\access-onelake-shortcuts\shortcut-right-click-menu.png" alt-text="Screenshot showing where to select Properties on the shortcut right-click menu." lightbox="media\access-onelake-shortcuts\shortcut-right-click-menu.png":::

1. Select the copy icon next to the **ABFS path** or **URL** in the **Properties** screen.

## Next steps

- [OneLake access and APIs](onelake-access-api.md)
