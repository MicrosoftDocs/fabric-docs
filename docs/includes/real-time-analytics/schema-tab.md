---
title: Include file for the schema tab in Real-Time Analytics
description: Include file for the schema tab in Real-Time Analytics
author: YaelSchuster
ms.author: yaschust
ms.topic: include
ms.custom: build-2023
ms.date: 08/03/2023
---

Your data format and compression are automatically identified in the left-hand pane. If incorrectly identified, use the **Data format** drop-down menu to select the correct format.

* If your data format is JSON, you must also select JSON levels, from 1 to 10. The levels determine the table column data division.
* If your data format is CSV, select the check box **Ignore the first record** to ignore the heading row of the file.

For more information on data formats, see [Data formats supported  for ingestion](/azure/data-explorer/ingestion-supported-formats?context=/fabric/context/context&pivots=fabric).

1. In the **Mapping name** field, enter a mapping name. You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.

    :::image type="content" source="../../real-time-analytics/media/get-data-blob/azure-blob-schema.png" alt-text="Screenshot showing the Azure blob schema."  lightbox="../../real-time-analytics/media/get-data-blob/azure-blob-schema.png":::

    >[!NOTE]
    >
    > The tool automatically infers the schema based on your data. If you want to change the schema to add and edit columns, you can do so under [Partial data preview](#partial-data-preview).
    >
    > You can optionally use the [Command viewer](#command-viewer) to view and copy the automatic commands generated from your inputs.

1. Select **Next: Summary**. To skip to the summary pane explanation, select [Complete data ingestion](#complete-data-ingestion).

#### Command viewer

The command viewer shows the commands for creating tables, mapping, and ingesting data in tables.

To open the command viewer, select the **v** button on the right side of the command viewer. In the command viewer, you can view and copy the automatic commands generated from your inputs.

:::image type="content" source="../../real-time-analytics/media/get-data-blob/command-viewer.png" alt-text="Screenshot of command editor."  lightbox="../../real-time-analytics/media/get-data-blob/command-viewer.png":::

#### Partial data preview

The partial data preview is automatically inferred based on your data. You can change the data preview by editing and adding new columns.

To add a new column, select the **+** button on the right-hand column under **Partial data preview**.

:::image type="content" source="../../real-time-analytics/media/get-data-blob/partial-data-preview.png" alt-text="Screenshot of Partial data preview pane."  lightbox="../../real-time-analytics/media/get-data-blob/partial-data-preview.png":::

* The column name should start with a letter, and may contain numbers, periods, hyphens, or underscores.
* The default column type is `string` but can be altered in the drop-down menu of the Column type field.
* Source: for table formats (CSV, TSV, etc.), each column can be linked to only one source column. For other formats (such as JSON, Parquet, etc.), multiple columns can use the same source.

:::image type="content" source="../../real-time-analytics/media/get-data-blob/azure-blob-new-column.png" alt-text="Screenshot of new column pane in schema window."  lightbox="../../real-time-analytics/media/get-data-blob/azure-blob-new-column.png":::

Select **Next: Summary** to create a table and mapping and to begin data ingestion.

### Complete data ingestion

In the **Data ingestion completed** window, all three steps will be marked with green check marks when data ingestion finishes successfully.

:::image type="content" source="../../real-time-analytics/media/get-data-blob/azure-blob-summary-pane.png" alt-text="Screenshot of ingested complete dialog box with data preview."  lightbox="../../real-time-analytics/media/get-data-blob/azure-blob-summary-pane.png":::

## Check your data

To verify that you have ingested data into your database, select **Check your data** on the right-hand side of the database landing page. You can then save your query as a KQL Queryset by selecting **Save as KQL QuerySet**.

:::image type="content" source="../../real-time-analytics/media/get-data-blob/quick-query.png" alt-text="Screenshot of the Check your data button.":::

For more information on KQL Queryset, see [Query data in a KQL Queryset](../../real-time-analytics/kusto-query-set.md).
