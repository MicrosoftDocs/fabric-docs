---
title: Configure MongoDB Atlas in a copy activity
description: This article explains how to copy data using MongoDB Atlas.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 09/08/2025
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure MongoDB Atlas in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to MongoDB Atlas.


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

:::image type="content" source="./media/connector-mongodb-atlas/source.png" alt-text="Screenshot showing source tab and the list of properties." :::

The following properties are **required**:

- **Connection**: Select a MongoDB Atlas connection from the connection list. If no connection exists, then create a new MongoDB Atlas connection.
- **Database**: Select your database from the drop-down list.
- **Collection name**: Specify the name of the collection in MongoDB Atlas database. You can select the collection from the drop-down list or select **Edit** to enter it manually. 
- **Version**: The version that you specify. Recommend upgrading to the latest version to take advantage of the newest enhancements. To learn the difference between various versions, go to this [section](#differences-between-mongodb-atlas-versions).

Under **Advanced**, you can specify the following fields:

- **Filter**: Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).

- **Cursor methods**: Select **+ New** to specify the way that the underlying query is executed. The ways to execute query are:
    - **project**: Specifies the fields to return in the documents for projection. To return all fields in the matching documents, omit this parameter.
    - **sort**: Specifies the order in which the query returns matching documents. Refer to [cursor.sort()](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#cursor.sort).
    - **limit**: Specifies the maximum number of documents the server returns. Refer to [cursor.limit()](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/#cursor.limit).
    - **skip**: Specifies the number of documents to skip and from where MongoDB Atlas begins to return results. Refer to [cursor.skip()](https://www.mongodb.com/docs/manual/reference/method/cursor.skip/#cursor.skip).
- **Batch size**: Specifies the number of documents to return in each batch of the response from MongoDB Atlas instance. In most cases, modifying the batch size will not affect the user or the application.
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. 

### Destination

Go to **Destination** tab to configure your copy activity destination. See the following content for the detailed configuration.

:::image type="content" source="./media/connector-mongodb-atlas/destination.png" alt-text="Screenshot showing destination tab and the list of properties.":::

The following properties are **required**:

- **Connection**: Select a MongoDB Atlas connection from the connection list. If no connection exists, then create a new MongoDB Atlas connection.
- **Database**: Select your database from the drop-down list.
- **Collection name**: Specify the name of the collection in MongoDB Atlas database. You can select the collection from the drop-down list or select **Edit** to enter it manually. 

Under **Advanced**, you can specify the following fields:

- **Write behavior**: Describes how to write data to MongoDB Atlas. Allowed values: **Insert** and **Upsert**.

    The behavior of **Upsert** is to replace the document if a document with the same `_id` already exists; otherwise, insert the document.
    
    > [!Note]
    > The service automatically generates an `_id` for a document if an `_id` isn't specified either in the original document or by column mapping. This means that you must ensure that, for **Upsert** to work as expected, your document has an ID.

- **Write batch timeout**: Specify the wait time for the batch insert operation to finish before it times out. The allowed value is timespan.

- **Write batch size**: This property controls the size of documents to write in each batch. You can try increasing the value to improve performance and decreasing the value if your document size being large.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). Mapping is not supported when both source and destination are hierarchical data.

#### Data type mapping for MongoDB Atlas

When copying data from MongoDB Atlas, the following mappings are used from MongoDB Atlas data types to interim data types used by the service internally. 

| MongoDB Atlas data type | Interim service data type (for version 1.1)                                   | Interim service data type (for version 1.0)                                   |
|------------------------|--------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| Date                   | DateTime                                                                       | String                                                                        |
| ObjectId               | String                                                                         | String                                                                        |
| Decimal128             | String                                                                         | String                                                                        |
| TimeStamp              | The most significant 32 bits -> DateTime<br>The least significant 32 bits -> Int32 | The most significant 32 bits -> Int64<br>The least significant 32 bits -> Int64 |
| String                 | String                                                                         | String                                                                        |
| Double                 | Double                                                                         | String                                                                        |
| Int32                  | Int32                                                                          | String                                                                        |
| Int64                  | Int64                                                                          | String                                                                        |
| Boolean                | Boolean                                                                        | Boolean                                                                       |
| Null                   | Null                                                                           | Null                                                                          |
| JavaScript             | String                                                                         | String                                                                        |
| Regular Expression     | String                                                                         | String                                                                        |
| Min key                | String                                                                         | Int64                                                                         |
| Max key                | String                                                                         | Int64                                                                         |
| Binary                 | GUID (when SubType is "04" )<br>String                                         | String                                                                        |

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

### Differences between MongoDB Atlas versions

The table below shows the feature differences between various versions.

| Version 1.1 | Version 1.0 |
|-------------|-------------|
| The following mappings are used from MongoDB Atlas data types to interim service data types.<br><br>Date -> DateTime<br>TimeStamp (the most significant 32 bits) -> DateTime<br>TimeStamp (the least significant 32 bits) -> Int32<br>Double -> Double<br>Int32 -> Int32<br>Int64 -> Int64<br>Min key -> String<br>Max key -> String<br>Binary -> GUID (when SubType is "04") / String | The following mappings are used from MongoDB Atlas data types to interim service data types.<br><br>Date -> String<br>TimeStamp (the most significant 32 bits) -> Int64<br>TimeStamp (the least significant 32 bits) -> Int64<br>Double -> String<br>Int32 -> String<br>Int64 -> String<br>Min key -> Int64<br>Max key -> Int64<br>Binary -> String |

## Table summary

The following table contains more information about the copy activity in MongoDB Atlas.

### Source information

|Name|Description|Value|Required|JSON script property|
|:---|:---|:---|:---|:---|
|**Connection**|Your connection to the source data store.|< your MongoDB Atlas connection >|Yes|connection|
|**Database**|Your database that you use as source.|< your database >|Yes|database|
|**Collection name**|Name of the collection in MongoDB Atlas database.|< your collection >|Yes|collection|
|**Version**|The version that you specify.|• 1.1<br>• 1.0|Yes|version:<br>• 1.1<br>• 1.0|
|**Filter**|The selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).|< your selection filter >|No|filter|
|**Cursor methods**|The way that the underlying query is executed.|• **project**<br>• **sort**<br>• **limit**<br>• **skip**|No|cursorMethods:<br>• project<br>• sort<br>• limit<br>• skip|
|**Batch size**|The number of documents to return in each batch of the response from MongoDB Atlas instance.|< your write batch size ><br>(the default is 100)|No|batchSize|
|**Additional columns**|Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|• Name<br>• Value|No|additionalColumns:<br>• name<br>• value|

### Destination information

|Name|Description|Value|Required|JSON script property|
|:---|:---|:---|:---|:---|
|**Connection**|Your connection to the destination data store.|< your MongoDB Atlas connection >|Yes|connection|
|**Database**|Your database that you use as destination.|< your database >|Yes|database|
|**Collection name**|Name of the collection in MongoDB Atlas database.|< your collection >|Yes|collection|
|**Write behavior**|Describes how to write data to MongoDB Atlas. Allowed values: **Insert** and **Upsert**.<br><br>The behavior of **Upsert** is to replace the document if a document with the same `_id` already exists; otherwise, insert the document.<br><br>Note: The service automatically generates an `_id` for a document if an `_id` isn't specified either in the original document or by column mapping. This means that you must ensure that, for **Upsert** to work as expected, your document has an ID.|• **Insert** (default)<br>• **Upsert**<br>|No|writeBehavior:<br>• insert<br>• upsert|
|**Write batch timeout**|The wait time for the batch insert operation to finish before it times out.|timespan<br>(the default is **00:30:00** - 30 minutes)|No|writeBatchTimeout|
|**Write batch size**| Controls the size of documents to write in each batch. You can try increasing this value to improve performance and decreasing the value if your document size being large.|< your write batch size >|No|writeBatchSize|

## Related content

- [MongoDB Atlas connector overview](connector-mongodb-atlas-overview.md)
