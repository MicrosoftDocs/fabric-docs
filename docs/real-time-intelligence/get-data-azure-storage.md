---
title: Get data from Azure Storage
description: Learn how to get data from Azure Storage in a KQL database in Real-Time Intelligence.
ms.reviewer: aksdi
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.subservice: rti-eventhouse
ms.date: 11/25/2025
ms.search.form: Get data in a KQL Database
---

# Get data from Azure Storage

In this article, you learn how to get data from Azure Storage (ADLS Gen2 container, blob container, or individual blobs). You can ingest data into your table continuously or as a one-time ingestion. Once ingested, the data becomes available for query.

* **Continuous ingestion** (Preview): Continuous ingestion involves setting up an ingestion pipeline that allows an eventhouse to listen to Azure Storage events. The pipeline notifies the eventhouse to pull information when subscribed events occur. The events are **BlobCreated** and **BlobRenamed**.

    [!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

* **One-time ingestion**: Use this method to retrieve data from Azure Storage as a one-time operation.

    > [!NOTE]
    >
    > * A continuous ingestion stream can affect your billing. For more information, see [Eventhouse and KQL Database consumption](real-time-intelligence-consumption.md).

> [!WARNING]
>
> Ingestion from an Azure Storage account (continuous and one-time) using a [private link](/azure/private-link/private-link-overview) isn't supported.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A [KQL database](create-database.md) with editing permissions.
* An Azure [storage account](/azure/storage/common/storage-quickstart-create-account?tabs=azure-portal).

### Prerequisites for continuous ingestion

* A Fabric [workspace identity](../security/workspace-identity.md). *My Workspace* isn't supported. If necessary, [Create a new Workspace](../fundamentals/create-workspaces.md).

In Azure:

* [Register the Event Grid resource provider](/azure/event-grid/subscribe-to-partner-events) with your Azure subscription.
* Assign [Storage Blob Data Reader](/azure/role-based-access-control/built-in-roles) role permissions to the workspace identity.
* Assign permissions to the user configuring the continuous ingestion, or to an AD group with the user who is configuring the continuous ingestion:
    * [Storage Account Contributor](/azure/role-based-access-control/built-in-roles/storage?branch=main#storage-account-contributor).
    * [Event Grid Contributor permission](/azure/role-based-access-control/built-in-roles/integration#eventgrid-contributor).
* [Create](#create-a-container-with-data-file) a [blob container](/azure/storage/blobs/blob-containers-portal) to hold the data files.
    * Upload a data file. The data file structure is used to define the table schema. For more information, see [Data formats supported by Real-Time Intelligence](ingestion-supported-formats.md).

        > [!NOTE]
        > You must upload a data file:
        > * Before the [configuration](#configure) to define the table schema during set-up.
        > * After the configuration to trigger the continuous ingestion, to preview data, and to verify the connection.

### Add the workspace identity role assignment to the storage account

1. From the Workspace settings in Fabric, copy your workspace identity ID.

    :::image type="content" source="media/get-data-azure-storage/workspace-id.png" alt-text="Screenshot of the workspace setting, with the workspace ID highlighted.":::

1. In the Azure portal, browse to your Azure Storage account, and select **Access Control (IAM)** > **Add** > **Add role assignment**.

1. Select **Storage Blob Data Reader**.

1. In the *Add role assignment* dialog, select **+ Select members**.

1. Paste in the workspace identity ID, select the application, and then **Select** > **Review + assign**.

### Create a container with data file

1. In the storage account, select **Containers**.

1. Select **+ Container**, enter a name for the container and select **Save**.

1. Enter the container, select **upload**, and upload the data file prepared earlier.

    For more information, see [supported formats](./ingestion-supported-formats.md) and [supported compressions](./ingestion-supported-formats.md#supported-data-compression-formats).

1. From the context menu, **[...]**, select **Container properties**, and copy the URL to input during the configuration.

    :::image type="content" source="media/get-data-azure-storage/container-properties.png" alt-text="Screenshot showing the list of containers with the context menu open with container properties highlighted.":::

## Source

Set the source to get data.

1. From your Workspace, open the eventhouse, and select the database.

1. On the KQL database ribbon, select **Get Data**.

1. Select the data source from the available list. In this example, you're ingesting data from **Azure storage**.

    :::image type="content" source="media/get-data-azure-storage/get-data-azure-storage-tile.png" alt-text="Screenshot of the get data tiles with the Azure storage option highlighted.":::

## Configure

### [Continuous ingestion](#tab/continuous-ingestion)

1. Select a destination table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1,024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. In the **Configure Azure Blob Storage connection**, ensure that **Continuous ingestion** is turned on. It's turned on by default.

1. Configure the connection by creating a new connection, or by using an existing connection.

    To create a new connection:

    1. Select **Connect to a storage account**.  

        :::image type="content" source="media/get-data-azure-storage/configure-tab-continuous.png" alt-text="Screenshot of configure tab with Continuous ingestion and connect to an account selected." lightbox="media/get-data-azure-storage/configure-tab-continuous.png":::

    1. Use the following descriptions to help fill in the fields.

        | **Setting** | **Field description** |
        |--|--|
        | Subscription | The storage account subscription. |
        | Blob storage account | Storage account name. |
        | Container | The storage container containing the file you want to ingest. |

        > [!NOTE] 
        >
        > Using a [private link](/azure/private-link/private-link-overview) isn't supported.

    1. In the **Connection** field, open the dropdown and select **+ New connection**, then **Save** > **Close**. The connection settings are prepopulated.

    > [!NOTE]
    >
    > Creating a new connection results in a new Eventstream. The name is defined as *<storate_account_name>_eventstream*.
    > Make sure you don't remove the continuous ingestion eventstream from the workspace.

    To use an existing connection:

    1. Select **Select an existing storage account**.

       :::image type="content" source="media/get-data-azure-storage/configure-tab-continuous-rth.png" alt-text="Screenshot of configure tab with Continuous ingestion and connect to an existing account selected." lightbox="media/get-data-azure-storage/configure-tab-continuous-rth.png":::

    1. Use the following descriptions to help fill in the fields.

        | **Setting** | **Field description** |
        |--|--|
        | RTAStorageAccount | An eventstream connected to your storage account from Fabric. |
        | Container | The storage container containing the file you want to ingest. |
        | Connection | This is prepopulated with the connection string |

    1. In the **Connection** field, open the dropdown and select the existing connection string from the list. Then select **Save** > **Close**.

1. Optionally, expand **File filters** and specify the following filters:

    | **Setting** | **Field description** |
    |--|--|
    | Folder path | Filters data to ingest files with a specific folder path. |
    | File extension | Filters data to ingest files with a specific file extension only. |

1. In the **Eventstearm settings** section, you can select the events to monitor in **Advanced settings** > **Event type(s)**. By default, **Blob created** is selected. You can also select **Blob renamed**.

    :::image type="content" source="media/get-data-azure-storage/configure-tab-advanced-settings.png" alt-text="Screenshot of Advanced settings with the Event type(s) dropdown expanded.":::

1. Select **Next** to preview the data.

### [One-time ingestion](#tab/one-time-ingestion)

1. Select a destination table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1,024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. In the **Configure Azure Blob Storage connection**, ensure that **Continuous ingestion** is turned off. It's turned on by default.

1. To create a new connection, create a new connection, or use an existing connection.

    To create a new connection:

    1. Select **Connect to a storage account**.  

        :::image type="content" source="media/get-data-azure-storage/configure-one-time-select-account.png" alt-text="Screenshot of configure tab with continuous ingestion turned off, and connect to an account selected.":::

    1. Use the following descriptions to help fill in the fields.

    | **Setting** | **Field description** |
    |--|--|
    | Subscription | The subscription name where the storage account is located. |
    | Blob storage account | The name that identifies your storage account. </br>If the account is renamed in Azure, you need to update the connection by selecting the new name. |
    | Container | The storage container containing the file you want to ingest. |

    To connect an existing account:

    1. To create a connection using a SAS URL, select **Use a SAS URL to ingest from a storage account**.

        :::image type="content" source="media/get-data-azure-storage/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and one sample data file selected." lightbox="media/get-data-azure-storage/configure-tab.png":::

    1. Paste your storage connection string in the **Enter SAS Url** field, and then select **+**.

        The string consists of a blob URI with a SAS token or account key. The following table lists the supported authentication methods and the permissions needed for ingesting data from Azure Storage.

        |Authentication method| Individual blob| Blob container | Azure Data Lake Storage Gen2|
        |----|----|----|----|
        | [Shared Access (SAS) token](/azure/data-explorer/kusto/api/connection-strings/storage-connection-strings?context=/fabric/context/context#shared-access-sas-token) |Read and Write| Read and List | Read and List|
        | [Storage account access key](/azure/data-explorer/kusto/api/connection-strings/storage-connection-strings#storage-account-access-key?context=/fabric/   context/context#storage-account-access-key) | | | |

    > [!NOTE]
    >
    > * You can either add up to 10 individual blobs, or ingest up to 5,000 blobs from a single container. You can't ingest both at the same time.
    > * Each blob can be a max of 1 GB uncompressed.

1. Optionally, expand **File filters** and specify the following filters:

    | **Setting**  | **Field description** |
    |-----|-----|
    | Folder path| Filters data to ingest files with a specific folder path. |
    | File extension| Filters data to ingest files with a specific file extension only.|

1. Select **Next** to preview the data.

---

## Inspect

The **Inspect** tab opens with a preview of the data.

To complete the ingestion process, select **Finish**.

:::image type="content" source="media/get-data-azure-storage/inspect-data.png" alt-text="Screenshot of the inspect tab." lightbox="media/get-data-azure-storage/inspect-data.png":::

> [!NOTE]
>
> To evoke continuous ingestion and preview data, ensure you uploaded a new storage blob after the configuration.

Optionally:

* Use the schema definition file dropdown to change the file that the schema is inferred from.

* Use the file type dropdown to explore [Advanced options based on data type](#advanced-options-based-on-data-type).

* Use the **Table_mapping** dropdown to define a new mapping.

* Select **</>** to open the command viewer to view and copy the automatic commands generated from your inputs. You can also open the commands in a Queryset

* Select the pencil icon to [Edit columns](#edit-columns).

[!INCLUDE [get-data-edit-columns](includes/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-azure-storage/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-azure-storage/edit-columns.png":::

[!INCLUDE [mapping-transformations](includes/mapping-transformations.md)]

[!INCLUDE [get-data-process-event-advanced-options-data-type](includes/get-data-process-event-advanced-options-data-type.md)]

**Tabular (CSV, TSV, PSV)**:

* If you're ingesting tabular formats in an *existing table*, you can select **Table_mapping** > **Use existing schema**. Tabular data doesn't necessarily include the column names that are used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.
* To use the first row as column names, select  **First row header**.

  :::image type="content" source="media/get-data-azure-storage/advanced-csv.png" alt-text="Screenshot of advanced CSV options.":::

**JSON**:

* To determine column division of JSON data, select **Nested levels**, from 1 to 100.

  :::image type="content" source="media/get-data-azure-storage/advanced-json.png" alt-text="Screenshot of advanced JSON options.":::

## Summary

In the **Summary** window, all the steps are marked with green check marks when data ingestion finishes successfully. You can select a card to explore the data, delete the ingested data, or create a dashboard with key metrics.

### [Continuous ingestion](#tab/continuous-ingestion)

:::image type="content" source="media/get-data-azure-storage/summary-continuous.png" alt-text="Screenshot of summary page for continuous ingestion with successful ingestion completed." lightbox="media/get-data-azure-storage/summary-continuous.png":::

When you close the window, you can see the connection in the Explorer tab, under **Data streams**. From here, you can filter the data streams and delete a data stream.

:::image type="content" source="media/get-data-azure-storage/datastream-continuous-ingestion.png" alt-text="Screenshot of the KQL database explorer with Data streams highlighted." lightbox="media/get-data-azure-storage/datastream-continuous-ingestion.png":::

## [One-time ingestion](#tab/one-time-ingestion)

:::image type="content" source="media/get-data-azure-storage/summary.png" alt-text="Screenshot of summary page for one-time ingestion with successful ingestion completed." lightbox="media/get-data-azure-storage/summary.png":::

---

## Related content

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
