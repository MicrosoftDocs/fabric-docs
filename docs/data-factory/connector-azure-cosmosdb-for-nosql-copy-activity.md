---
title: Configure Azure Cosmos DB for NoSQL in a copy activity
description: This article explains how to copy data using Azure Cosmos DB for NoSQL.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Azure Cosmos DB for NoSQL in a copy activity

This article outlines how to use the copy activity in a data pipeline to copy data from and to Azure Cosmos DB for NoSQL.

## Supported configuration

For the configuration of each tab under the copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for Azure Cosmos DB for NoSQL under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-cosmosdbnosql/source.png" alt-text="Screenshot showing source tab." lightbox="./media/connector-cosmosdbnosql/source.png":::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an Azure Cosmos DB for NoSQL connection from the connection list. If no connection exists, then create a new Azure Cosmos DB for NoSQL connection by selecting **New**.
- **Container**: Select the container that you want to use. Select **Edit** to enter the container name manually.

Under **Advanced**, you can specify the following fields:

- **Use query**: You can choose either **Table** or **Query** as your use query. The following list describes the configuration of each setting.
  - **Table**: Reads data from the table you specified in **Table**.
  - **Query**: Specifies the Azure Cosmos DB query to read data.

    :::image type="content" source="./media/connector-cosmosdbnosql/query.png" alt-text="Screenshot showing query.":::

- **Page size**: The number of documents per page of the query result. Default is "-1", which means to use the service side dynamic page size up to 1000.
- **Detect datetime**: Whether to detect datetime from the string values in the documents. Allowed values are: true (default), false.
- **Preferred regions**: The preferred list of regions to connect to when retrieving data from Azure Cosmos DB. Select one preferred region from the drop-down list after selecting **New**.

    :::image type="content" source="./media/connector-cosmosdbnosql/preferredregions.png" alt-text="Screenshot showing preferred regions.":::

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. For more information, go to [Add additional columns during copy](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy).

    :::image type="content" source="./media/connector-cosmosdbnosql/additional-columns.png" alt-text="Screenshot showing additional columns." lightbox="./media/connector-cosmosdbnosql/additional-columns.png":::

## Destination

The following properties are supported for Azure Cosmos DB for NoSQL under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-cosmosdbnosql/destination.png" alt-text="Screenshot showing destination tab." lightbox="./media/connector-cosmosdbnosql/destination.png":::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an Azure Cosmos DB for NoSQL connection from the connection list.
- **Container**: Select **Browse** to choose the file that you want to copy, or fill in the path manually.

Under **Advanced**, you can specify the following fields:

- **Write behavior**: Defines the write behavior when the destination is files from a file-based data store. You can choose **Add dynamic content**, **Insert**, or **Upsert** from the drop-down list.

  - **Add dynamic content**: Open the **Add dynamic content** pane. This opens the expression builder where you can build expressions from supported system variables, activity output, functions, and user-specified variables or parameters. For information about the expression language, go to [Expressions and functions](/azure/data-factory/control-flow-expression-language-functions).
  - **Insert**: Choose this option if your source data has inserts.
  - **Upsert**: The behavior of upsert is to replace the document if a document with the same ID already exists; otherwise, insert the document.

    :::image type="content" source="./media/connector-cosmosdbnosql/write-behavior.png" alt-text="Screenshot showing write behavior.":::

- **Write batch timeout**: Wait time for the batch insert operation to complete before it times out.
Allowed values are `Timespan`. An example is 00:30:00 (30 minutes).

- **Write batch size**: Specify the number of rows to insert into the SQL table per batch. The allowed value is an integer (number of rows). By default, the service dynamically determines the appropriate batch size based on the row size.

- **Max concurrent connections**:  The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Disable performance metrics analytics**: This setting controls the collection of metrics, such as DTU, DWU, RU, and so on for copy performance optimization and recommendations. If you're concerned with this behavior, turn off this feature.

### Mapping

For the **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).


### Settings

For the **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Azure Cosmos DB for NoSQL.

### Source table

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your connection\> |Yes|connection|
|**Container** | The container of your source data.|\<container of your source\>|Yes |container <br> fileName|
|**Use query** |You can choose **Table** or **Query** as your use query.|• **Table** <br>• **Query**|No |type|
|**Page size** |The number of documents per page of the query result. Default is "-1", which means to use the service side dynamic page size up to 1000.|\<your Page size\>|No |pageSize|
|**Delete datetime** |The files on source data store will be deleted right after being moved to the destination store. The file deletion is per file, so when copy activity fails, you'll note that some files have already been copied to the destination and deleted from source while others are still on source store.|Selected or unselect|No |detectDatetime|
|**Preferred regions** |The preferred list of regions to connect to when retrieving data from Azure Cosmos DB. Select one preferred region from the drop-down list after selecting **New**.| \<your preferred regions\>|No |preferredRegions|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. For more information, go to [Add additional columns during copy](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy).| \<max concurrent connections\>|No |additionalColumns|

### Destination table

|Name |Description |Value |Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External** |Yes|/|
|**Connection** |Your connection to the destination data store.|\<your connection\>|Yes|connection|
|**Container**|The container of your destination data.|\<container of source\> |Yes |container <br> fileName|
|**Write behavior** |Describes how to write data to Azure Cosmos DB. Allowed values: insert and upsert. The behavior of upsert is to replace the document if a document with the same ID already exists; otherwise, insert the document.|• **Add dynamic content**<br>• **Insert**<br>• **Upsert**|No |writeBehavior|
|**Write batch timeout** |Wait time for the batch insert operation to complete before it times out. Allowed values are Timespan. An example is 00:30:00 (30 minutes).| timespan |No |writeBatchTimeout|
|**Write batch size**|The number of rows to insert into the SQL table per batch. The allowed value is integer (number of rows). By default, the service dynamically determines the appropriate batch size based on the row size.|\<number of rows \><br>(integer) |No |writeBatchSize|
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\>|No |maxConcurrentConnections|
|**Disable performance metrics analytics**|This setting controls collection of metrics such as DTU, DWU, RU, and so on for copy performance optimization and recommendations. If you're concerned with this behavior, turn off this feature.|Selected or unselect|No |disableMetricsCollection|

## Related content

- [Set up your Azure Cosmos DB for NoSQL connection](connector-azure-cosmosdb-for-nosql.md)
