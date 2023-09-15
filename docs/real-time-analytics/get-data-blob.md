---
title: Get data from a blob in Real-Time Analytics
description: Learn how to get data from a blob in a KQL database in Real-Time Analytics
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 05/23/2023
ms.search.form: product-kusto, CreateDB
---
# Get data from a blob

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this article, you'll learn you how to get data from an Azure blob into an existing database. Azure Blob Storage is optimized for storing massive amounts of unstructured data. Unstructured data is data that doesn't adhere to a particular data model or definition, such as text or binary data. For more information on Azure blob storage, see [Introduction to Azure Blob Storage](/azure/storage/blobs/storage-blobs-introduction).

To get data from a blob container, see [Get data from a blob container](get-data-blob-container.md).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md)
* An Azure blob with data

## Get data

1. On the lower ribbon, select **Get Data** > **Blob**.

    :::image type="content" source="media/get-data-blob/get-data-blob.png" alt-text="Screenshot of get data- blob in Real-Time Analytics.":::

1. On the **Home** tab, select **Get Data** > **Get data from blob**.
1. Enter a name for your table. By default, **New table** is selected.

    > [!NOTE]
    > Table names can be up to 1024 characters including alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Select **Next: Source**.

## Source tab

1. In **Source type** select Azure blob.
1. In the **Link to source** field, add a blob URL with an Account Key/SAS URI.

    To add a blob URI, you need to generate an Account Key/ SAS token with both Read and Write permissions. To generate an Account Key/SAS token, see [Generate a SAS token](/azure/data-explorer/kusto/api/connection-strings/generate-sas-token?context=/fabric/context/context&pivots=fabric).

    The blob you add will be the basis for the schema tab. You can add up to 10 items of up to 1-GB uncompressed size each. If you upload more than one item, you can change the schema-defining blob by selecting the star icon on the right side of the source link field.
1. Select **Next: Schema** to view and edit your table column configuration.

### Schema tab

[!INCLUDE [schema-tab](../includes/real-time-analytics/schema-tab.md)]

## Next steps

* To create an empty table, see [Create an empty table](create-empty-table.md)
* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
