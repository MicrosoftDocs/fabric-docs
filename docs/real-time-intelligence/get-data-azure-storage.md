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

In this article, you learn how to get data from Azure storage (ADLS Gen2 container, blob container, or individual blobs). You can get data into your table coninuously or non-continuoiusly:

**Non-continuous ingestion**

 Use this method to retrieve the existing data from an Azure storage. Non-continuous ingestion from an Azure storage account is a one-time operation.

**Continuous ingestion**

Continuous data ingestion involves setting up an ingestion pipeline to ingest new data files from the Azure storage. You can also connect a table to an Azure storage that is already set up for continuous ingestion.

This eventstream monitors incoming events. When new or updated event files are available in storage, The KQL database receives a notification to fetch the data.

> [!NOTE]
>
> Data that previously existed in the Azure storage isn't ingested. Use non-continuous ingestion to ingest the existing data.
> Historical namespace must be enabled in the storage account for ingestion to be continuous.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions
* A [storage account](/azure/storage/common/storage-quickstart-create-account?tabs=azure-portal)

For continuous ingestion you also require:

* A [Workspace identity](../security/workspace-identity.md). *My Workspace* is not supported. If necessary, [Create a new Workspace](../fundamentals/create-workspaces.md).
* A storage account with:
    * The storage account with [Hierarchical namespace](/azure/storage/blobs/create-data-lake-storage-account?branch=main) enabled
    * A [container](/azure/storage/blobs/blob-containers-portal?branch=main) added to the storage account
    * Access Control role permissions assigned to the Workspace Identity. For instructions, see [Add the workspace identity to the storage account ###](#add-the-workspace-identity-to-the-storage-account-)
    * An initial sample [data file uploaded to the container](#add-a-data-file-to-an-empty-storage-account-). The file is used to define the data schema.  Use any format supported by KQL databases. For more information, see [Data formats supported by Real-Time Intelligence](ingestion-supported-formats.md)

### Add the workspace identity to the storage account ###

1. Copy your workspace identity ID from the Workspace Settings in Fabric.

1. Open the Azure portal, browse to your Azure storage account, and select **Access Control (IAM)**.

1. Select **Add** > **Add role assignment**.

1. Select **Storage Account Contributor**.

1. In the *Add role assignment* dialogue, select **+Select members**.

1. Paste in the workspace identity ID, select **Application**, and then **Select**.

    :::image type="content" source="media/get-data-azure-storage/configure-add-role-assignment.png" alt-text="Screenshot of Azure portal open to the Add Role Assignment window." lightbox="media/get-data-azure-storage/configure-add-role-assignment.png":::

1. Select **Review + assign** to move to the Review + assign tab.

1. Select **Review + assign** again.

### Add a data file to an empty storage account ###

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

1. To use an existing conenction, select **Select an account from the Real-Time hub**, then select the account already in use in Fabric.

1. To create a new connection, select **Connect to an account**.

1. Configure the **Azure blob storage account**:

    :::image type="content" source="media/get-data-azure-storage/configure-tab-continuous.png" alt-text="Screenshot of configure tab with Continuous ingestion and connect to an account selected." lightbox="media/get-data-azure-storage/configure-tab-continuous.png":::

    |  | **Setting** | **Field description** |
    |--|--|--|
    |  | Subscription | The subscription ID where the storage account is located. |
    |  | Blob storage account | The name that identifies your storage account. </br>If the account is renamed in Azure, you need to update the connection by selecting the new name. |
    |  | Container | The storage container you want to ingest. |
    |  | **File filters (optional)** |  |
    |  | Folder path | Filters data to ingest files with a specific folder path. |
    |  | File extension | Filters data to ingest files with a specific file extension only. |

1. In the **Connection** field, open the drop-down and select **+ New connection**. The connection settings are prepopulated.

    :::image type="content" source="media/get-data-azure-storage/configure-connection.png" alt-text="Screenshot of connection dialog with the settings prepopulated." lightbox="media/get-data-azure-storage/configure-connection.png":::

1. Select **Save**, and then **Close**.

1. Select **Next** to preview the data.

1. To verify the connection, upload a new data file to the Azure storage account.

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
