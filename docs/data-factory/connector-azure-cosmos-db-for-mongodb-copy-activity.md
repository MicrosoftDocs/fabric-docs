---
title: Configure Azure Cosmos DB for MongoDB in a copy activity
description: This article explains how to copy data using Azure Cosmos DB for MongoDB.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 05/07/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Azure Cosmos DB for MongoDB in a copy activity

This article outlines how to use the copy activity in data pipelines to copy data from and to Azure Cosmos DB for MongoDB.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

Go to **Source** tab to configure your copy activity source. See the following content for the detailed configuration.

:::image type="content" source="./media/connector-azure-cosmos-db-for-mongodb/azure-cosmos-db-for-mongodb-source.png" alt-text="Screenshot showing source tab and the list of properties." :::

The following properties are **required**:

- **Connection**: Select an Azure Cosmos DB for MongoDB connection from the connection list. If no connection exists, then create a new Azure Cosmos DB for MongoDB connection by selecting **More** at the bottom of the connection list.
- **Database**: Select your database from the drop-down list.
- **Collection name**: Specify the name of the Azure Cosmos DB collection. You can select the collection from the drop-down list. 

Under **Advanced**, you can specify the following fields:

- **Filter**: Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
- **Cursor methods**: Select **+ New** to specify the way that the underlying query is executed. The ways to execute query are:
    - **project**: Specifies the fields to return in the documents for projection. To return all fields in the matching documents, omit this parameter.
    - **sort**: Specifies the order in which the query returns matching documents. Go to [cursor.sort()](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#cursor.sort) for more information.
    - **limit**: Specifies the maximum number of documents the server returns. Go to [cursor.limit()](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/#cursor.limit) for more information.
    - **skip**: Specifies the number of documents to skip and from where MongoDB begins to return results. Go to [cursor.skip()](https://www.mongodb.com/docs/manual/reference/method/cursor.skip/#cursor.skip) for more information.
- **Batch size**: Specifies the number of documents to return in each batch of the response from MongoDB instance. In most cases, modifying the batch size will not affect the user or the application. Azure Cosmos DB limits each batch cannot exceed 40MB in size, which is the sum of the **Batch size** number of documents' size, so decrease this value if your document size being large. The default value is 100.
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Destination

Go to **Destination** tab to configure your copy activity destination. See the following content for the detailed configuration.

:::image type="content" source="./media/connector-azure-cosmos-db-for-mongodb/azure-cosmos-db-for-mongodb-destination.png" alt-text="Screenshot showing destination tab and the list of properties.":::

The following properties are **required**:

- **Connection**: Select an Azure Cosmos DB for MongoDB connection from the connection list. If no connection exists, then create a new Azure Cosmos DB for MongoDB connection by selecting **More** at the bottom of the connection list.
- **Database**: Select your database from the drop-down list.
- **Collection name**: Specify the name of the Azure Cosmos DB collection. You can select the collection from the drop-down list. 

Under **Advanced**, you can specify the following fields:

- **Write behavior**: Describes how to write data to Azure Cosmos DB for MongoDB. Allowed values: **Insert** and **Upsert**.

    The behavior of **Upsert** is to replace the document if a document with the same `_id` already exists; otherwise, insert the document.
    
    > [!Note]
    > The service automatically generates an `_id` for a document if an `_id` isn't specified either in the original document or by column mapping. This means that you must ensure that, for **Upsert** to work as expected, your document has an ID.

- **Write batch timeout**: Specify the wait time for the batch insert operation to finish before it times out. The allowed value is timespan and the default value is 00:30:00 (30 minutes).

- **Write batch size**: This property controls the size of documents to write in each batch. You can try increasing the value to improve performance and decreasing the value if your document size being large. The default value is 10,000.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). Mapping is not supported when both source and destination are hierarchical data.

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following table contains more information about the copy activity in Azure Cosmos DB for MongoDB.

### Source information

|Name|Description|Value|Required|JSON script property|
|:---|:---|:---|:---|:---|
|**Connection**|Your connection to the source data store.|< your Azure Cosmos DB for MongoDB connection >|Yes|connection|
|**Database**|Your database that you use as source.|< your database >|Yes|database|
|**Collection name**|The name of the Azure Cosmos DB collection.|< your collection >|Yes|collection|
|**Filter**|The selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).|< your selection filter >|No|filter|
|**Cursor methods**|The way that the underlying query is executed.|• **project**<br>• **sort**<br>• **limit**<br>• **skip**|No|cursorMethods:<br>• project<br>• sort<br>• limit<br>• skip|
|**Batch size**|The number of documents to return in each batch of the response from MongoDB instance. In most cases, modifying the batch size will not affect the user or the application. Azure Cosmos DB limits each batch cannot exceed 40MB in size, which is the sum of the **Batch size** number of documents' size, so decrease this value if your document size being large.|< your write batch size ><br>(the default is 100)|No|batchSize|
|**Additional columns**|Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|• Name<br>• Value|No|additionalColumns:<br>• name<br>• value|

### Destination information

|Name|Description|Value|Required|JSON script property|
|:---|:---|:---|:---|:---|
|**Connection**|Your connection to the destination data store.|< your Azure Cosmos DB for MongoDB connection >|Yes|connection|
|**Database**|Your database that you use as destination.|< your database >|Yes|database|
|**Collection name**|The name of the Azure Cosmos DB collection.|< your collection >|Yes|collection|
|**Write behavior**|Describes how to write data to Azure Cosmos DB for MongoDB. Allowed values: **Insert** and **Upsert**.<br><br>The behavior of **Upsert** is to replace the document if a document with the same `_id` already exists; otherwise, insert the document.<br><br>Note: The service automatically generates an `_id` for a document if an `_id` isn't specified either in the original document or by column mapping. This means that you must ensure that, for **Upsert** to work as expected, your document has an ID.|• **Insert** (default)<br>• **Upsert**<br>|No|writeBehavior:<br>• insert<br>• upsert|
|**Write batch timeout**|The wait time for the batch insert operation to finish before it times out.|timespan<br>(the default is **00:30:00** - 30 minutes)|No|writeBatchTimeout|
|**Write batch size**| Controls the size of documents to write in each batch. You can try increasing this value to improve performance and decreasing the value if your document size being large.|< your write batch size ><br>(the default is **10,000**)|No|writeBatchSize|

## Related content

- [Azure Cosmos DB for MongoDB overview](connector-azure-cosmos-db-for-mongodb-overview.md)
