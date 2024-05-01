---
title: Get data from Azure storage
description: Learn how to get data from Azure storage in a KQL database in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/21/2024
ms.search.form: Get data in a KQL Database
---

# Get data from Azure storage

In this article, you learn how to get data from Azure storage (ADLS Gen2 container, blob container, or individual blobs) into either a new or existing table.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions
* A [storage account](/azure/storage/common/storage-quickstart-create-account?tabs=azure-portal)

## Source

1. On the lower ribbon of your KQL database, select **Get Data**.

    In the **Get data** window, the **Source** tab is selected.

1. Select the data source from the available list. In this example, you're ingesting data from **Azure storage**.

    :::image type="content" source="media/get-data-azure-storage/select-data-source.png" alt-text="Screenshot of get data window with source tab selected." lightbox="media/get-data-azure-storage/select-data-source.png":::

## Configure

1. Select a target table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. To add your data source, paste your storage connection string in the **URI** field, and then select **+**. The following table lists the supported authentication methods and the permissions needed for ingesting data from Azure storage.

    |Authentication method| Individual blob| Blob container | Azure Data Lake Storage Gen2|
    |----|----|----|----|
    | [Shared Access (SAS) token](/azure/data-explorer/kusto/api/connection-strings/storage-connection-strings?context=/fabric/context/context) |Read and Write| Read and List | Read and List|
    | [Storage account access key](/azure/data-explorer/kusto/api/connection-strings/storage-connection-strings#storage-account-access-key?context=/fabric/context/context) | | | |

    > [!NOTE]
    >
    > * You can either add up to 10 individual blobs, or ingest up to 5000 blobs from a single container. You can't ingest both at the same time.
    > * Each blob can be a max of 1 GB uncompressed.

    1. If you pasted a connection string for a blob container or an Azure Data Lake Storage Gen2, you can then add the following optional filters:

        :::image type="content" source="media/get-data-azure-storage/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and one sample data file selected." lightbox="media/get-data-azure-storage/configure-tab.png":::

        | **Setting**  | **Field description** |
        |-----|-----|
        | **File filters (optional)**| |
        | Folder path| Filters data to ingest files with a specific folder path. |
        | File extension| Filters data to ingest files with a specific file extension only.|

1. Select **Next**

## Inspect

The **Inspect** tab opens with a preview of the data.

To complete the ingestion process, select **Finish**.

:::image type="content" source="media/get-data-azure-storage/inspect-data.png" alt-text="Screenshot of the inspect tab." lightbox="media/get-data-azure-storage/inspect-data.png":::

Optionally:

* Select **Command viewer** to view and copy the automatic commands generated from your inputs.
* Use the **Schema definition file** dropdown to change the file that the schema is inferred from.
* Change the automatically inferred data format by selecting the desired format from the dropdown. For more information, see [Data formats supported by Real-Time Intelligence](ingestion-supported-formats.md).
* [Edit columns](#edit-columns).
* Explore [Advanced options based on data type](#advanced-options-based-on-data-type).

[!INCLUDE [get-data-edit-columns](includes/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-azure-storage/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-azure-storage/edit-columns.png":::

[!INCLUDE [mapping-transformations](includes/mapping-transformations.md)]

### Advanced options based on data type

**Tabular (CSV, TSV, PSV)**:

* If you're ingesting tabular formats in an *existing table*, you can select **Advanced** > **Keep table schema**. Tabular data doesn't necessarily include the column names that are used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.
* To use the first row as column names, select  **Advanced** > **First row is column header**.

    :::image type="content" source="media/get-data-azure-storage/advanced-csv.png" alt-text="Screenshot of advanced CSV options.":::

**JSON**:

* To determine column division of JSON data, select **Advanced** > **Nested levels**, from 1 to 100.
* If you select **Advanced** > **Skip JSON lines with errors**, the data is ingested in JSON format. If you leave this check box unselected, the data is ingested in multijson format.

    :::image type="content" source="media/get-data-azure-storage/advanced-json.png" alt-text="Screenshot of advanced JSON options.":::

## Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to query, drop the ingested data, or see a dashboard of your ingestion summary.

:::image type="content" source="media/get-data-azure-storage/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-azure-storage/summary.png":::

## Related content

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
