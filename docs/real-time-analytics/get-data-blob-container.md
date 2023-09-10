---
title: Get data from a blob container in Real-Time Analytics
description: Learn how to get data from a blob container in a KQL database in Real-Time Analytics
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 05/23/2023
ms.search.form: product-kusto, Get data
---
# Get data from a blob container

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this article, you'll learn how to get data from an Azure blob or blob container into an existing database. A blob container organizes a set of blobs, similar to a directory in a file system. A storage account can include an unlimited number of containers, and a container can store an unlimited number of blobs. For more information on blob containers, see [Manage blob containers using Azure portal](/azure/storage/blobs/blob-containers-portal).

To get data from a blob, see [Get data from a blob](get-data-blob.md).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md)
* A blob container with data

## Get data

1. On the lower ribbon, select **Get Data** > **Blob container**.

    :::image type="content" source="media/get-data-blob-container/get-data-blob-container.png" alt-text="Screenshot of get data with blob container selected in Real-Time Analytics.":::

    > [!NOTE]
    > Table names can be up to 1024 characters including alphanumeric, hyphens, and underscores. Special characters aren't supported.

### Source tab

1. In **Source type**, select Blob container.
1. In **Link to source** field, add a blob URL with an Account Key/SAS URI.

    To add a blob URI, you need to generate an Account Key/ SAS token with both List and Read permissions. To generate an Account Key/SAS token, see [Generate a SAS token](/azure/data-explorer/kusto/api/connection-strings/generate-sas-token?context=/fabric/context/context&pivots=fabric).

    :::image type="content" source="media/get-data-blob-container/ingest-new-data-blob-container.png" alt-text="Screenshot of data ingestion pane for blob containers."  lightbox="media/get-data-blob-container/ingest-new-data-blob-container.png":::

1. Optionally, you can filter data to be ingested with **File filters**. You can filter by file extension, folder path, or both.

    **Filter by file extension**: for example, filter for all files with a CSV extension.

    **Filter by folder path**: you can either enter a full or partial folder path, or folder name.

    :::image type="content" source="media/get-data-blob/file-filters-blob-container.png" alt-text="Screenshot of file filters for blob container."  lightbox="media/get-data-blob/file-filters-blob-container.png":::

1. Select **Next: Schema** to view and edit your table column configuration.

### Schema tab

[!INCLUDE [schema-tab](../includes/real-time-analytics/schema-tab.md)]

## Next steps

* To create an empty table, see [Create an empty table](create-empty-table.md)
* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
