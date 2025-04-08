---
title: Get data from Azure Storage
description: Learn how to get data from Azure Storage in a KQL database in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: how-to
ms.custom:
ms.date: 04/07/2025
ms.search.form: Get data in a KQL Database
---

# Get data from Azure Storage

In this article, you learn how to get data from Azure Storage (ADLS Gen2 container, blob container, or individual blobs). You can ingest data into your table continuously or as a one-time ingestion. Once ingested, the data becomes available for query.

**One-time ingestion**

Use this method to retrieve existing data from Azure Storage as a one-time operation.

**Continuous ingestion**

Continuous ingestion involves setting up an ingestion pipeline that allows the Fabric workspace to listen to Azure Storage events. The pipeline notifies the workspace to pull information when subscribed events occur. The events include when a storage blob is created or renamed. 

The table schema is created by reading the Azure Storage data file structure. See the [supported formats](ingestion-supported-formats) and [supported compressions](ingestion-supported-formats#supported-data-compression-formats).

> [!NOTE]
>
> Data that exists in the Azure Storage up to the time that continuous ingestion is configured, isn't ingested. Use one-time ingestion to ingest the existing data.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions
* A [storage account](/azure/storage/common/storage-quickstart-create-account?tabs=azure-portal)

For continuous ingestion you also require:

* A [Workspace identity](../security/workspace-identity.md). *My Workspace* isn't supported. If necessary, [Create a new Workspace](../fundamentals/create-workspaces.md).
* A storage account with:
    * [Hierarchical namespace](/azure/storage/blobs/create-data-lake-storage-account.md) must be enabled in the storage account for ingestion to be continuous
    * Access Control role permissions assigned to the workspace identity.
    * A [container](/azure/storage/blobs/blob-containers-portal) to hold the data files.
    * A data file uploaded to the container. The data file structure is used to define the table schema. For more information, see [Data formats supported by Real-Time Intelligence](ingestion-supported-formats.md).

### Add the workspace identity to the storage account

1. From the Workspace settings in Fabric, copy your workspace identity ID.

1. In the Azure portal, browse to your Azure Storage account, and select **Access Control (IAM)** > **Add** > **Add role assignment**.

1. Select **Storage Account Contributor**.

1. In the *Add role assignment* dialogue, select **+Select members**.

1. Paste in the workspace identity ID, select **Application**, and then **Select**.

    :::image type="content" source="media/get-data-azure-storage/configure-add-role-assignment.png" alt-text="Screenshot of Azure portal open to the Add Role Assignment window." lightbox="media/get-data-azure-storage/configure-add-role-assignment.png":::

1. Select **Review + assign**.

### Create a container with data file

1. In the storage account, select **Containers**.

1. Select **+ Container**, enter a name for the container and select **Save**.

1. Enter the container, select **upload**, and upload the data file prepared earlier.

## Source

Set the source to get data.

1. On the KQL database ribbon, select **Get Data**.

1. Select the data source from the available list. In this example, you're ingesting data from **Azure storage**.

    [!INCLUDE [get-data-kql](includes/get-data-kql.md)]

## Configure

## [Continuous ingestion](#tab/continuous-ingestion)

1. Select a destination table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Ensure that **Continuous ingestion** is turned on. It's turned on by default.

1. Select one of the two options:

    * To create a new connection, select **Connect to an account**, and continue to the next step.

    * To use an existing connection, select **Select an account from the Real-Time hub**, then **Select the account already in use in Fabric** > **Save** > **Close** > **Next**

1. Configure the **Azure blob storage account**.

    :::image type="content" source="media/get-data-azure-storage/configure-tab-continuous.png" alt-text="Screenshot of configure tab with Continuous ingestion and connect to an account selected." lightbox="media/get-data-azure-storage/configure-tab-continuous.png":::

    | **Setting** | **Field description** |
    |--|--|
    | Subscription | The subscription ID where the storage account is located. |
    | Blob storage account | The name that identifies your storage account. </br>If the account is renamed in Azure, you need to update the connection by selecting the new name. |
    | Container | The storage container containing the file you want to ingest. |
    | Connection | Open the drop-down and select **+ New connection**. The connection settings are prepopulated.|
    | **File filters (optional)** |  |
    | Folder path | Filters data to ingest files with a specific folder path. |
    | File extension | Filters data to ingest files with a specific file extension only. | 

    :::image type="content" source="media/get-data-azure-storage/configure-connection.png" alt-text="Screenshot of connection dialog with the settings prepopulated." lightbox="media/get-data-azure-storage/configure-connection.png":::

1. Select **Save** > **Close**.

1. In the Eventstream settings area, you can configure **Advanced settings**. By default, **Blob created** is selected. You can also select **Blob renamed**.

1. Select **Next** to preview the data.

1. To verify the connection, upload a new data file to the Azure Storage account.

## [One-time ingestion](#tab/one-time-ingestion)

1. Select a destination table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Turn off **Continuous ingestion**.

1. Select **Use a SAS URL to ingest from a storage account**.

    :::image type="content" source="media/get-data-azure-storage/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and one sample data file selected." lightbox="media/get-data-azure-storage/configure-tab.png":::

1. Paste your storage connection string in the **Enter SAS Url** field, and then select **+**.

    The string consists of a blob URI with a SAS token or account key. The following table lists the supported authentication methods and the permissions needed for ingesting data from Azure Storage.

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

* Use the schema definition file drop-down to change the file that the schema is inferred from.

* Use the file type drop-down to explore [Advanced options based on data type](#advanced-options-based-on-data-type).

* Use the **Table_mapping** drop-down to define a new mapping.

* Select **</>** to open the command viewer to view and copy the automatic commands generated from your inputs. You can also open the commands in a Queryset

* Select the pencil icon to [Edit columns](#edit-columns).

[!INCLUDE [get-data-edit-columns](includes/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-azure-storage/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-azure-storage/edit-columns.png":::

[!INCLUDE [mapping-transformations](includes/mapping-transformations.md)]

### Advanced options based on data type

**Tabular (CSV, TSV, PSV)**:

* If you're ingesting tabular formats in an *existing table*, you can select **Table_mapping** > **Use existing schema**. Tabular data doesn't necessarily include the column names that are used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.
* To use the first row as column names, select  **Advanced** > **First row is column header**.

    :::image type="content" source="media/get-data-azure-storage/advanced-csv.png" alt-text="Screenshot of advanced CSV options.":::

**JSON**:

* To determine column division of JSON data, select **Nested levels**, from 1 to 100.

    :::image type="content" source="media/get-data-azure-storage/advanced-json.png" alt-text="Screenshot of advanced JSON options.":::

## Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to explore the data, delete the ingested data, or create a dashboard with key metrics.

:::image type="content" source="media/get-data-azure-storage/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-azure-storage/summary.png":::

## Related content

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
