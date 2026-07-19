---
title: Create OneLake shortcuts in a KQL database
description: Learn how to create a OneLake shortcut in a KQL database to query data from internal and external sources.
author: spelluru
ms.author: spelluru
ms.reviewer: tzgitlin
ms.topic: how-to
ms.subservice: rti-eventhouse
ms.date: 06/14/2026
ai-usage: ai-assisted
---

# Create OneLake shortcuts in a KQL database

OneLake shortcuts in a KQL database let you query data in internal Fabric items and external storage without moving the data. In a KQL database, each shortcut appears under **Shortcuts** and is queried as an external table in a [KQL queryset](kusto-query-set.md) by using the [`external_table()` function](/kusto/query/external-table-function?view=microsoft-fabric&preserve-view=true).

In this article, you learn how to create a OneLake shortcut in a KQL database that points to internal Fabric or external sources. You can't rename shortcuts created in a KQL database, and you can create only one shortcut at a time.

For general information about shortcut types, source-specific instructions, and broader limitations, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

> [!NOTE]
> To improve query performance over supported shortcuts, see [Query acceleration over OneLake shortcuts](query-acceleration.md).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A [KQL database](create-database.md) with edit permissions.
* A [lakehouse](../data-engineering/create-lakehouse.md).

To access the data in your KQL database in other [!INCLUDE [product-name](../includes/product-name.md)] experiences, see [One logical copy](data-management.md#one-logical-copy).

## Create a shortcut

1. Browse to an existing KQL database.
1. Select **+** > **New** > **OneLake shortcut**.

    :::image type="content" source="./media/onelake-shortcuts/new-shortcut.png" alt-text="Screenshot of the Home tab showing the dropdown of the New button. The option titled OneLake shortcut is highlighted.":::

## Select a source

KQL databases support shortcuts to internal OneLake resources, such as KQL databases, lakehouses, and warehouses, and to external resources, such as Azure Data Lake Storage, Amazon S3, and Google Cloud Storage. For a full list of supported shortcut types and source-specific configuration guidance, see [Types of shortcuts](../onelake/onelake-shortcuts.md#types-of-shortcuts).

1. In the **New shortcut** window, choose the source type that you want to connect to.
1. Complete the required connection details for the source, and then select the folder or table that you want to expose in the KQL database.
1. Optional: To enable query acceleration on the new shortcut, set **Accelerate** to **On**.
1. Select **Create**.

For supported scenarios and limitations, see [Query acceleration for OneLake shortcuts - overview](query-acceleration-overview.md).

:::image type="content" source="media/onelake-shortcuts/accelerate.png" alt-text="Screenshot of the New shortcut window showing the shortcut details. The Accelerate toggle is highlighted."  lightbox="media/onelake-shortcuts/accelerate.png":::

> [!NOTE]
> 1. You can only connect to one subfolder or table per shortcut. To connect to more data, create additional shortcuts.
> 1. You can't create a shortcut over a table that has an asterisk (`*`) in any column name. Rename the columns before you create the shortcut.

After you create the shortcut, the database refreshes automatically. The shortcut appears under **Shortcuts** in the **Explorer** pane. You can now query the data.

:::image type="content" source="media/onelake-shortcuts/data-tree.png" alt-text="Screenshot of the Explorer pane showing the new shortcut.":::

### Organize shortcuts with folders

To create a subfolder or move to an existing folder:

1. In the explorer pane, either:
    * Right-click on the shortcut and select **Move to folder** > **+ New folder**.    
    :::image type="content" source="media/onelake-shortcuts/create-shortcut-folder.png" alt-text="Screenshot of the pop-up menu showing the option to create a new folder for the shortcut.":::    
    * Or, select the ellipsis (...) next to the specific shortcut and select **Move to folder** > **+ New folder** or choose an existing folder.    
    :::image type="content" source="media/onelake-shortcuts/create-specific-shortcut-folder.png" alt-text="Screenshot of the pop-up menu showing the option to move the shortcut to an existing folder or create a new one.":::    
1. To create a folder, enter a name for the folder and select **Create**. The shortcut is moved to the new folder.    
    :::image type="content" source="media/onelake-shortcuts/shortcuts-folder-pop-up.png" alt-text="Screenshot of the new folder being created.":::    
1. To move more than one shortcut, either enter another folder name or select the dropdown menu and check the boxes next to the shortcuts you want to move to the same folder.    
    :::image type="content" source="media/onelake-shortcuts/shortcuts-list.png" alt-text="Screenshot of the pop-up menu showing the option to move multiple shortcuts to the same folder.":::    
1. You can also move shortcuts to an existing folder. To do so, select **Move to folder** and then select the folder you want to move the shortcut to, or drag and drop the shortcut into the folder.

> [!NOTE]
>
> * If you delete a subfolder, the shortcuts within the folder aren't deleted but are moved back to the parent folder.
> * A subfolder is automatically deleted when there are no shortcuts within the folder.
> * Folders can be created per asset type and the name must be unique per asset type. For example, you can have a table folder and a shortcuts folder with the same name, but you can't have two shortcuts folders with the same name.

## Query data

To query data from the OneLake shortcut, use the [`external_table()` function](/kusto/query/external-table-function?view=microsoft-fabric&preserve-view=true).

1. On the right side of your database, select **Explore your data**. The window opens with a few example queries you can run to get an initial look at your data.
1. Replace the table name placeholder with `external_table('<shortcut-name>')`.
1. Select **Run** or press **Shift + Enter** to run a selected query.

:::image type="content" source="media/onelake-shortcuts/query-shortcut.png" alt-text="Screenshot of the Explore your data window showing the results of an example query."  lightbox="media/onelake-shortcuts/query-shortcut.png":::

## Data type mapping

### Delta Parquet to Eventhouse data type mapping

Delta primitive data types map to Eventhouse scalar data types as shown in the following table. For more information, see [Scalar data types](/kusto/query/scalar-data-types/?view=microsoft-fabric&preserve-view=true).

| Delta type | Eventhouse scalar data type |
| --- | --- |
| `string` | `string` |
| `long` | `long` |
| `integer` | `int` |
| `short` | `int` |
| `byte` | `real` |
| `float` | `real` |
| `double` | `real` |
| `decimal` | `decimal` |
| `boolean` | `bool` |
| `binary` | `string` |
| `date` | `datetime` |
| `timestamp_ntz` (without time zone) | `datetime` |
| `struct` | `dynamic` |
| `array` | `dynamic` |
| `map` | `dynamic` |

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [`external_table()` function](/kusto/query/external-table-function?view=microsoft-fabric&preserve-view=true)
* [Query acceleration over OneLake shortcuts](query-acceleration.md)
