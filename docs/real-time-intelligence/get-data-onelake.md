---
title: Get data from OneLake
description: Learn how to get data from OneLake into a KQL database in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/28/2023
ms.search.form: Get data in a KQL Database
---

# Get data from OneLake

In this article, you learn how to get data from OneLake into either a new or existing table.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [Lakehouse](../data-engineering/create-lakehouse.md)
* A [KQL database](create-database.md) with editing permissions

## Copy file path from Lakehouse

1. In the experience switcher, choose **Data Engineering**.
1. Select the Lakehouse environment containing the data source you want to use.

1. Place your cursor over the desired file and select the **More** menu, then select **Properties**.

    > [!IMPORTANT]
    >
    > * Folder paths aren't supported.
    > * Wildcards (*) aren't supported.

    :::image type="content" source="media/get-data-onelake/lakehouse-file-menu.png" alt-text="Screenshot of a Lakehouse file's dropdown menu. The option titled Properties is highlighted."  lightbox="media/get-data-onelake/lakehouse-file-menu.png":::

1. Under **URL**, select the **Copy to clipboard** icon and save it somewhere to retrieve in a later step.

    :::image type="content" source="media/get-data-onelake/lakehouse-file-properties.png" alt-text="Screenshot of a Lakehouse file's Properties pane. The copy icon to the right of the file's URL is highlighted." lightbox="media/get-data-onelake/lakehouse-file-properties.png":::

1. Return to your workspace and select a KQL database.

## Source

1. On the lower ribbon of your KQL database, select **Get Data**.

    In the **Get data** window, the **Source** tab is selected.

1. Select the data source from the available list. In this example, you're ingesting data from **OneLake**.

    :::image type="content" source="media/get-data-onelake/select-data-source.png" alt-text="Screenshot of get data window with source tab selected." lightbox="media/get-data-onelake/select-data-source.png":::

## Configure

1. Select a target table. If you want to ingest data into a new table, select **+New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. In **OneLake file**, paste the file path of the Lakehouse you copied in [Copy file path from Lakehouse](#copy-file-path-from-lakehouse).

    > [!NOTE]
    > You can add up to 10 items of up to 1-GB uncompressed size each.

    :::image type="content" source="media/get-data-onelake/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and a OneLake file path added." lightbox="media/get-data-onelake/configure-tab.png":::

1. Select **Next**.

## Inspect

The **Inspect** tab opens with a preview of the data.

To complete the ingestion process, select **Finish**.

:::image type="content" source="media/get-data-onelake/inspect-data.png" alt-text="Screenshot of the inspect tab." lightbox="media/get-data-onelake/inspect-data.png":::

Optionally:

* Select **Command viewer** to view and copy the automatic commands generated from your inputs.
* Use the **Schema definition file** dropdown to change the file that the schema is inferred from.
* Change the automatically inferred data format by selecting the desired format from the dropdown. For more information, see [Data formats supported by Real-Time Analytics](ingestion-supported-formats.md).
* [Edit columns](#edit-columns).
* Explore [Advanced options based on data type](#advanced-options-based-on-data-type).

[!INCLUDE [get-data-edit-columns](includes/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-onelake/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-onelake/edit-columns.png":::

[!INCLUDE [mapping-transformations](includes/mapping-transformations.md)]

### Advanced options based on data type

**Tabular (CSV, TSV, PSV)**:

* If you're ingesting tabular formats in an *existing table*, you can select **Advanced** > **Keep table schema**. Tabular data doesn't necessarily include the column names that are used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.
* To use the first row as column names, select  **Advanced** > **First row is column header**.

    :::image type="content" source="media/get-data-onelake/advanced-csv.png" alt-text="Screenshot of advanced CSV options.":::

**JSON**:

* To determine column division of JSON data, select **Advanced** > **Nested levels**, from 1 to 100.
* If you select **Advanced** > **Skip JSON lines with errors**, the data is ingested in JSON format. If you leave this check box unselected, the data is ingested in multijson format.

    :::image type="content" source="media/get-data-onelake/advanced-json.png" alt-text="Screenshot of advanced JSON options.":::

## Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to query, drop the ingested data, or see a dashboard of your ingestion summary.

:::image type="content" source="media/get-data-onelake/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-onelake/summary.png":::

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Visualize data in a Power BI report](create-powerbi-report.md)
