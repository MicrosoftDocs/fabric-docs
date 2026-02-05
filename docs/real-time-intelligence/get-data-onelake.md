---
title: Get data from OneLake
description: Learn how to get data from OneLake into a KQL database in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.subservice: rti-eventhouse
ms.date: 05/12/2025
ms.search.form: Get data in a KQL Database
---

# Get data from OneLake

In this article, you learn how to get data from OneLake into either a new or existing table.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [Lakehouse](../data-engineering/create-lakehouse.md)
* A [KQL database](create-database.md) with editing permissions

## Step 1: Source

Select OneLake as your data source, as follows:

1. On the lower ribbon of your KQL database, select **Get Data** to open the **Source** tab of the *Get data* window.

1. Select the data source. In this example, you're ingesting data from **OneLake** or from the list in the embedded **OneLake catalog**.

    :::image type="content" source="media/get-data-onelake/get-data-onelake-tile.png" alt-text="Screenshot of the Select a data source window with both the Onelake tile and the embedded Onelake catalog options highlighted." lightbox="media/get-data-onelake/get-data-onelake-tile.png":::

    >[!NOTE]
    >
    > When you select a source from the list in the embedded OneLake catalog, you can use the category buttons or filter by keyword to search for a specific source.

## Step 2: Configure

Pick a destination table and configure the source, as follows:

1. Select a target table. If you want to ingest data into a new table, select **+New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1,024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Select a OneLake file to ingest:

    * When you select **OneLake** as your source, you must specify the **Workspace**, **Lakehouse**, and **File** from the dropdowns.

    * When you select the embedded **OneLake catalog** as your source, the **Workspace** and **Lakehouse** are automatically populated. You must specify the **File** to ingest.

    :::image type="content" source="media/get-data-onelake/configure-tab.png" alt-text="Screenshot of configure tab with Workspace, Lakehouse, and File dropdowns." lightbox="media/get-data-onelake/configure-tab.png":::

1. Select **Next**.

## Step 3: Inspect

The **Inspect** tab opens with a preview of the data.

To complete the ingestion process, select **Finish**.

:::image type="content" source="media/get-data-onelake/inspect-data.png" alt-text="Screenshot of the inspect tab." lightbox="media/get-data-onelake/inspect-data.png":::

[!INCLUDE [get-data-inspect](includes/get-data-inspect.md)]

[!INCLUDE [get-data-edit-columns](includes/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-onelake/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-onelake/edit-columns.png":::

[!INCLUDE [mapping-transformations](includes/mapping-transformations.md)]

[!INCLUDE [get-data-process-event-advanced-options-data-type](includes/get-data-process-event-advanced-options-data-type.md)]

## Step 4: Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to query, drop the ingested data, or see a dashboard of your ingestion summary.

:::image type="content" source="media/get-data-onelake/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-onelake/summary.png":::

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Visualize data in a Power BI report](create-powerbi-report.md)
