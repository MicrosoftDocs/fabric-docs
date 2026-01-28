---
title: Get data from file
description: Learn how to get data from a local file in a KQL database in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.subservice: rti-eventhouse
ms.date: 01/21/2026
ms.search.form: Get data in a KQL Database
---

# Get data from file

In this article, you learn how to get data from a local file into either a new or existing table.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Source

1. On the lower ribbon of your KQL database, select **Get Data**.

    In the **Get data** window, the **Source** tab is selected.

1. Select the data source from the available list. In this example, you're ingesting data from **Local file**.

    :::image type="content" source="media/get-data-file/get-data-file-tile.png" alt-text="Screenshot of the get data tiles with the Local file option highlighted.":::
    

## Configure

1. Select a target table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.
1. Either drag files into the window, or select **Browse for files**.

    > [!NOTE]
    > You can add up to 1,000 files. Each file can be a max of 1 GB uncompressed.

    :::image type="content" source="media/get-data-file/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and one sample data file selected." lightbox="media/get-data-file/configure-tab.png":::

1. Select **Next**

## Inspect

The **Inspect** tab opens with a preview of the data.

To complete the ingestion process, select **Finish**.

:::image type="content" source="media/get-data-file/inspect-data.png" alt-text="Screenshot of the inspect tab." lightbox="media/get-data-file/inspect-data.png":::
[!INCLUDE [get-data-inspect](includes/get-data-inspect.md)]

[!INCLUDE [get-data-edit-columns](includes/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-file/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-file/edit-columns.png":::

[!INCLUDE [mapping-transformations](includes/mapping-transformations.md)]

[!INCLUDE [get-data-process-event-advanced-options-data-type](includes/get-data-process-event-advanced-options-data-type.md)]

## Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to query, drop the ingested data, or see a dashboard of your ingestion summary.

:::image type="content" source="media/get-data-file/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-file/summary.png":::

## Related content

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
