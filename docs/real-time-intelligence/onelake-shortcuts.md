---
title: Create OneLake shortcuts in a KQL database
description: Learn how to create a OneLake shortcut in a KQL database to query data from internal and external sources.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 11/19/2024
---

# Create OneLake shortcuts in a KQL database

OneLake is a single, unified, logical data lake for Microsoft Fabric to store lakehouses, warehouses, KQL databases, and other items. Shortcuts are embedded references within OneLake that point to other files' store locations without moving the original data. The embedded reference makes it appear as though the files and folders are stored locally but in reality; they exist in another storage location. Shortcuts can be updated or removed from your items, but these changes don't affect the original data and its source.

In this article, you learn how to create a OneLake shortcut in a KQL database that points to internal Fabric or external sources. This kind of shortcut is later accessed for query in KQL querysets by using the [`external_table()` function](/azure/data-explorer/kusto/query/externaltablefunction?context=/fabric/context/context). Shortcuts created in a KQL database can't be renamed, and only one shortcut can be created at a time.

In addition to creating shortcuts from a KQL database, shortcuts can also be created from other Fabric items. These shortcuts also point to data stored in internal Fabric or external sources, but have different limitations and are accessed differently. For more information, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

> [!NOTE]
> To accelerate queries over OneLake shortcuts, see [Accelerate queries over OneLake shortcuts](query-acceleration.md).

Select the tab that corresponds to the shortcut you'd like to create:

## [OneLake shortcut](#tab/onelake-shortcut)

[!INCLUDE [onelake-shortcut-prerequisites](includes/onelake-shortcut-prerequisites.md)]

> [!NOTE]
> The following flow shows how to create a shortcut that points to data in a Lakehouse in Fabric. Similarly, you can create shortcuts that point to Data Warehouses or other KQL databases. 

[!INCLUDE [one-lake-shortcut](includes/one-lake-shortcut.md)]

> [!NOTE]
> To enable query acceleration on a new shortcut, toggle the **Accelerate** button to **On**. For more information, see [Accelerate queries over OneLake shortcuts](query-acceleration.md). 

:::image type="content" source="media/onelake-shortcuts/onelake-shortcut/create-shortcut.png" alt-text="Screenshot of the New shortcut window showing the data in the LakeHouse. The subfolder titled StrmSC and the Create button are highlighted."  lightbox="media/onelake-shortcuts/onelake-shortcut/create-shortcut.png":::

5. Select **Create**.

> [!NOTE]
> You can only connect to one subfolder or table per shortcut. To connect to more data, repeat these steps and create additional shortcuts.

## [Azure Data Lake Storage Gen2](#tab/adlsgen2)

[!INCLUDE [adlsgen2-prerequisites](includes/adlsgen2-prerequisites.md)]

1. Browse to an existing KQL database.
1. Select **New** > **OneLake shortcut**.

    :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/home-tab.png" alt-text="Screenshot of the Home tab showing the dropdown of the New button. The option titled OneLake shortcut is highlighted.":::

[!INCLUDE [adls-gen2-shortcut](../includes/adls-gen2-shortcut.md)]

## [Amazon S3](#tab/amazon-s3)

[!INCLUDE [amazons3-prerequisites](includes/amazons3-prerequisites.md)]

1. Browse to an existing KQL database.
1. Select **New** > **OneLake shortcut**.

    :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/home-tab.png" alt-text="Screenshot of the Home tab showing the dropdown of the New button. The option titled OneLake shortcut is highlighted.":::

[!INCLUDE [amazon-s3-shortcut](../includes/amazon-s3-shortcut.md)]

---

The database refreshes automatically. The shortcut appears under **Shortcuts** in the **Explorer** pane.

:::image type="content" source="media/onelake-shortcuts/adls-gen2-shortcut/data-tree.png" alt-text="Screenshot of the Explorer pane showing the new shortcut.":::

The OneLake shortcut has been created. You can now query this data.

## Query data

To query data from the OneLake shortcut, use the [`external_table()` function](/azure/data-explorer/kusto/query/externaltablefunction?context=/fabric/context/context).

1. On the rightmost side of your database, select **Explore your data**. The window opens with a few example queries you can run to get an initial look at your data.
1. Replace the table name placeholder with `external_table('`*Shortcut name*`')`.
1. Select **Run** or press **Shift + Enter** to run a selected query.

:::image type="content" source="media/onelake-shortcuts/amazon-s3-shortcut/query-shortcut.png" alt-text="Screenshot of the Explore your data window showing the results of an example query."  lightbox="media/onelake-shortcuts/amazon-s3-shortcut/query-shortcut.png":::

## Data types mapping

### Delta parquet to Eventhouse data types mapping

 Delta primitive data types are mapped to Eventhouse scalar data types using the following rules. For more information on Eventhouse data types, see [Scalar data types](/azure/data-explorer/kusto/query/scalar-data-types/index?context=/fabric/context/context-rta&pivots=fabric).

| Delta Type | Eventhouse Scalar Data Type 
| --------------- | ----------------- 
| `string`     | `string` 
| `long` | `long` 
| `integer`  | `int` 
| `short` | `int`
| `byte` | `real`
| `float` | `real`
| `double` | `real`
| `decimal` | `decimal` 
| `boolean` | `bool`
| `binary` | `string`
| `date` | `datetime`
| `timestamp_ntz` (without time zone)| `datetime` 
| `struct` | `dynamic`
| `array` | `dynamic`
| `map` | `dynamic`

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [`external_table()` function](/azure/data-explorer/kusto/query/externaltablefunction?context=/fabric/context/context)
* [Accelerate queries over OneLake shortcuts](query-acceleration.md)
