---
title: Get data from Azure storage
description: Learn how to get data from Azure storage in a KQL database in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: how-to
ms.custom:
ms.date: 04/03/2025
ms.search.form: Get data in a KQL Database
---

# Get data from Azure storage

In this article, you learn how to get data from Azure storage (ADLS Gen2 container, blob container, or individual blobs) into either a new or existing table.

You can get data into your table in three ways:

* **Non-continuous ingestion**. Use this method to retrieve the existing data from an Azure blob storage. Non-continuous ingestion from an Azure storage account is a one-time operation.

* **Continuous ingestion**. Continuous data ingestion involves setting up an ingestion pipeline to ingest blob files that arrive to the Azure blob storage.

    * An eventstream monitors for new and updated events in the Azure storage.

    * When you configure a new connection, the storage data file mappings are ingested.

    * Data that previously existed in the Azure blob storage isn't included.

* **Connect to an existing continuous ingestion**. Connect to an Azure blob storage that is already set up for continuous ingestion.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions
* A [storage account](/azure/storage/common/storage-quickstart-create-account?tabs=azure-portal)

For continuous ingestion you also require:

* A [Workspace identity](../security/workspace-identity.md) for the Azure storage account to connect to.

  Ensure the identity is for a workspace that isn't *My Workspace*. If necessary, [Create a new Workspace](../fundamentals/create-workspaces.md).

* A data file is required when the storage blob is new or empty of data files.  

  The file is uploaded to the storage account for connection to ingest the file's data schema. The file can be empty of data, but the schema needs to be defined. Use any format supported by KQL databases. For more information, see [Data formats supported by Real-Time Intelligence](ingestion-supported-formats.md)

## Configure Azure storage for continuous ingestion

To add the workspace identity to the storage account:

1. Copy your workspace identity ID from the Workspace Settings in Fabric.

1. Open the Azure portal, browse to your Azure storage account, and select **Access Control (IAM)**.

1. Select **Add** > **Add role assignment**.

1. Select **Storage Account Contributor**.

1. In the *Add role assignment* dialogue, select **+Select members**.

1. Paste in the workspace identity ID, select **Application**, and then **Select**.

    :::image type="content" source="media/get-data-azure-storage/configure-add-role-assignment.png" alt-text="Screenshot of Azure portal open to the Add Role Assignment window." lightbox="media/get-data-azure-storage/configure-add-role-assignment.png":::

1. Select **Review + assign** to move to the Review + assign tab.

1. Select **Review + assign** again.

To add a data file to an empty storage account:

1. In the storage account, select **Containers**.

1. Select **+ Container**, enter a name for the container and **Save**.

1. Enter the container, select **upload**, and upload the data file prepared earlier.

## Source

Set the source to get data.

1. On the lower ribbon of your KQL database, select **Get Data**.

    In the **Get data** window, the **Source** tab is selected.

1. Select the data source from the available list. In this example, you're ingesting data from **Azure storage**.

    [!INCLUDE [get-data-kql](includes/get-data-kql.md)]

## Configure

## [Continuous ingestion](#tab/continuous-ingestion)

1. Select a destination table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Turn on **Continuous ingestion**. It's turned on by default.

1. Select **Connect to an account**. It's selected by default.

1. Configure the **Azure blob storage account**:

    :::image type="content" source="media/get-data-azure-storage/configure-tab-continuous.png" alt-text="Screenshot of configure tab with Continuous ingestion and connect to an account selected." lightbox="media/get-data-azure-storage/configure-tab-continuous.png":::

        | **Setting**                | **Field description**  |
        |--------------------------|----------|
        | Subscription               | The subscription ID where the storage account is located.     |
        | Blob storage account      | The name that identifies your storage account.    |
        | Container                  | The storage container you want to ingest.   |
        | **File filters (optional)**       | |
        | Folder path| Filters data to ingest files with a specific folder path. |
        | File extension| Filters data to ingest files with a specific file extension only.|

1. In the **Connection** field, open the drop-down and select **+ New connection**. The connection settings are prepopulated.

    :::image type="content" source="media/get-data-azure-storage/configure-connection.png" alt-text="Screenshot of connection dialog with the settings prepopulated." lightbox="media/get-data-azure-storage/configure-connection.png":::

1. Select **Save**, and then **Close**.

1. Select **Next** to preview the data.

1. To verify the connection, upload a new data file to the Azure storage account.

## [Existing continuous ingestion](#tab/exist-continuous-ingestion)

This option is enabled when you have at least one continuous ingestion connection already turned on.

1. Select a destination table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. 

1. 

1. 

## [Non-continuous ingestion](#tab/one-time-ingestion)

1. Select a destination table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Turn off **Continuous ingestion**.

1. Select **Use a SAS URL to ingest from a storage account**.

    :::image type="content" source="media/get-data-azure-storage/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and one sample data file selected." lightbox="media/get-data-azure-storage/configure-tab.png":::

1. Paste your storage connection string in the **Enter SAS Url** field, and then select **+**.

    The string consists of a blob URI with a SAS token or account key. The following table lists the supported authentication methods and the permissions needed for ingesting data from Azure storage.

    |Authentication method| Individual blob| Blob container | Azure Data Lake Storage Gen2|
    |----|----|----|----|
    | [Shared Access (SAS) token](/azure/data-explorer/kusto/api/connection-strings/storage-connection-strings?context=/fabric/context/context) |Read and Write| Read and List | Read and List|
    | [Storage account access key](/azure/data-explorer/kusto/api/connection-strings/storage-connection-strings#storage-account-access-key?context=/fabric/context/context) | | | |

    > [!NOTE]
    >
    > * You can either add up to 10 individual blobs, or ingest up to 5000 blobs from a single container. You can't ingest both at the same time.
    > * Each blob can be a max of 1 GB uncompressed.

1. If you pasted a connection string for a blob container or an Azure Data Lake Storage Gen2, you can then add the following optional filters:

    | **Setting**  | **Field description** |
    |-----|-----|
    | **File filters (optional)**| |
    | Folder path| Filters data to ingest files with a specific folder path. |
    | File extension| Filters data to ingest files with a specific file extension only.|

1. Select **Next** to preview the data.

---

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
