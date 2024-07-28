---
title: Configure Azure Table Storage in a copy activity
description: This article explains how to copy data using Azure Table Storage.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Azure Table Storage in a copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to Azure Table Storage.


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

:::image type="content" source="./media/connector-azure-table-storage/source.png" alt-text="Screenshot showing source tab and the list of properties." :::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an Azure Table Storage connection from the connection list. If no connection exists, then create a new Azure Table Storage connection by selecting **New**.
- **Use query**: Specify way to read data. Select **Table** to read data from the specified table or select **Query** to read data using queries.

    If you select **Table**: 

    :::image type="content" source="./media/connector-azure-table-storage/source-table.png" alt-text="Screenshot showing Use query when selecting Table." :::

    - **Table**: Specify the name of the table in the Azure Table Storage database instance. Select the table from the drop-down list or enter the name manually by selecting **Edit**.

    If you select **Query**:

    :::image type="content" source="./media/connector-azure-table-storage/source-query.png" alt-text="Screenshot showing Use query when selecting Query." :::

    - **Table**: Specify the name of the table in the Azure Table Storage database instance. Select the table from the drop-down list or enter the name manually by selecting **Edit**.
    - **Query**: Specify the custom Table storage query to read data. The source query is a direct map from the `$filter` query option supported by Azure Table Storage, learn more about the syntax from this [article](/rest/api/storageservices/querying-tables-and-entities#supported-query-options).

        > [!Note]
        > Azure Table query operation times out in 30 seconds as [enforced by Azure Table service](/rest/api/storageservices/setting-timeouts-for-table-service-operations). Learn how to optimize the query from [Design for querying](/azure/storage/tables/table-storage-design-for-query) article.


Under **Advanced**, you can specify the following fields:

- **Ignore table not found**: Specifies whether to allow the exception of the table to not exist. It is unselected by default.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. 


### Destination

Go to **Destination** tab to configure your copy activity destination. See the following content for the detailed configuration. 

:::image type="content" source="./media/connector-azure-table-storage/destination.png" alt-text="Screenshot showing destination tab and the list of properties.":::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an Azure Table Storage connection from the connection list. If no connection exists, then create a new Azure Table Storage connection by selecting **New**.
- **Table**: Specify the name of the table in the Azure Table Storage database instance. Select the table from the drop-down list or enter the name manually by selecting **Edit**.

Under **Advanced**, you can specify the following fields:

- **Insert type**: Select the mode to insert data into Azure Table. The modes are **Merge** and **Replace**. This property controls whether existing rows in the output table with matching partition and row keys have their values replaced or merged. This setting applies at the row level not the table level. Neither option deletes rows in the output table that don't exist in the input. To learn about how the merge and replace settings work, see [Insert or merge entity](/rest/api/storageservices/Insert-Or-Merge-Entity) and [Insert or replace entity](/rest/api/storageservices/Insert-Or-Replace-Entity).

- **Partition key value selection**: Select from **Specify partition value** or **Use destination column**. Partition key value can be a fixed value or it can take value from a destination column.

    If you select **Specify partition value**: 

    - **Default partition value**: Specify the default partition key value that can be used by the destination.

    If you select **Use destination column**: 
    
    - **Partition key column**: Select the name of the column whose column values are used as the partition key. If not specified, "AzureTableDefaultPartitionKeyValue" is used as the partition key.
        

- **Row key value selection**: Select from **Unique identifier** or **Use destination column**. Row key value can be an auto generated unique identifier or it can take value from a destination column.

    If you select **Use destination column**:
    - **Row key column**: Select the name of the column whose column values are used as the row key. If not specified, use a GUID for each row.

- **Write batch size**: Inserts data into Azure Table when the specified write batch size is hit. Allowed values are integer (number of rows). The default value is 10,000.

- **Write batch timeout**: Inserts data into Azure Table when the specified write batch timeout is hit. The allowed value is timespan.

- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). 

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following table contains more information about the copy activity in Azure Table Storage.

### Source information

|Name|Description|Value|Required|JSON script property|
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection**|Your connection to the source data store.|< your Azure Table Storage connection >|Yes|connection|
| **Use query** |The way to read data. Apply **Table** to read data from the specified table or apply **Query** to read data using queries. | • Table<br>• Query | Yes | / | 
| **Table** | The name of the table in the Azure Table Storage database instance. | < your table name > | Yes | tableName | 
| **Query** | Specify the custom Table storage query to read data. The source query is a direct map from the `$filter` query option supported by Azure Table Storage, learn more about the syntax from this [article](/rest/api/storageservices/querying-tables-and-entities#supported-query-options). | < your query > | No | azureTableSourceQuery | 
| **Ignore table not found** | Indicates whether to allow the exception of the table to not exist. | selected or unselected (default) | No | azureTableSourceIgnoreTableNotFound:<br>true or false (default) | 
|**Additional columns**|Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|• Name<br>• Value|No|additionalColumns:<br>• name<br>• value|

### Destination information

|Name|Description|Value|Required|JSON script property|
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection**|Your connection to the destination data store.|< your Azure Table Storage connection >|Yes|connection|
| **Table** | The name of the table in the Azure Table Storage database instance. | < your table name > | Yes | tableName | 
| **Insert type** | The mode to insert data into Azure Table. This property controls whether existing rows in the output table with matching partition and row keys have their values replaced or merged. | • **Merge**<br>• **Replace** | No |azureTableInsertType:<br>• merge<br>• replace | 
| **Partition key value selection** | Partition key value can be a fixed value or it can take value from a destination column. | • **Specify partition value**<br>• **Use destination column** | No | / | 
| **Default partition value** | The default partition key value that can be used by the destination | < your default partition value > | No | azureTableDefaultPartitionKeyValue | 
| **Partition key column** | The name of the column whose values are used as partition keys. If not specified, "AzureTableDefaultPartitionKeyValue" is used as the partition key. | < your partition key column > | No | azureTablePartitionKeyName | 
| **Row key value selection** | Row key value can be an auto generated unique identifier or it can take value from a destination column. | • **Unique identifier**<br>• **Use destination column** | No | / | 
| **Row key column** | The name of the column whose column values are used as the row key. If not specified, use a GUID for each row. | < your row key column  > | No | azureTableRowKeyName |
|**Write batch size**| Inserts data into Azure Table when the write batch size is hit.|integer <br> (default is 10,000)|No|writeBatchSize|
|**Write batch timeout**|Inserts data into Azure Table when the write batch timeout is hit | timespan |No|writeBatchTimeout|
|**Max concurrent connections**|The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|< your max concurrent connections >|No| maxConcurrentConnections |

## Related content

- [Azure Table Storage connector overview](connector-azure-table-storage-overview.md)
