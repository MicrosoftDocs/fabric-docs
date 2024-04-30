---
title: Configure Azure Synapse Analytics in a copy activity
description: This article explains how to copy data using Azure Synapse Analytics.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Azure Synapse Analytics in a copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to Azure Synapse Analytics.

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

The following properties are supported for Azure Synapse Analytics under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-azure-synapse-analytics/source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-azure-synapse-analytics/source.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an Azure Synapse Analytics connection from the connection list. If the connection doesn't exist, then create a new Azure Synapse Analytics connection by selecting **New**.
- **Connection type**: Select **Azure Synapse Analytics**.
- **Use query**: You can choose **Table**, **Query**, or **Stored procedure** to read your source data. The following list describes the configuration of each setting：

  - **Table**: Read data from the table you specified in **Table** if you select this button. Select your table from the drop-down list or select **Edit** to enter the schema and table name manually.

    :::image type="content" source="./media/connector-azure-synapse-analytics/table.png" alt-text="Screenshot showing table.":::

  - **Query**: Specify the custom SQL query to read data. An example is `select * from MyTable`. Or select the pencil icon to edit in code editor.

    :::image type="content" source="./media/connector-azure-synapse-analytics/query.png" alt-text="Screenshot showing choosing query.":::

  - **Stored procedure**: Use the stored procedure that reads data from the source table. The last SQL statement must be a SELECT statement in the stored procedure.
  
    :::image type="content" source="./media/connector-azure-synapse-analytics/stored-procedure.png" alt-text="Screenshot showing stored procedure settings." lightbox="./media/connector-azure-synapse-analytics/stored-procedure.png":::

    - **Stored procedure name**: Select the stored procedure or specify the stored procedure name manually when select **Edit**.
    - **Stored procedure parameters**: Select **Import parameters** to import the parameter in your specified stored procedure, or add parameters for the stored procedure by selecting **+ New**. Allowed values are name or value pairs. Names and casing of parameters must match the names and casing of the stored procedure parameters.
    

Under **Advanced**, you can specify the following fields:

- **Query timeout (minutes)**: Specify the timeout for query command execution, default is 120 minutes. If a parameter is set for this property, allowed values are timespan, such as "02:00:00" (120 minutes).

- **Isolation level**: Specifies the transaction locking behavior for the SQL source. The allowed values are: **None**, **Read committed**, **Read uncommitted**, **Repeatable read**, **Serializable**, or **Snapshot**. If not specified, **None** isolation level is used. Refer to [IsolationLevel Enum](/dotnet/api/system.data.isolationlevel) for more details.

    :::image type="content" source="./media/connector-azure-synapse-analytics/isolation-level.png" alt-text="Screenshot showing Isolation level settings.":::

- **Partition option**: Specify the data partitioning options used to load data from Azure Synapse Analytics. Allowed values are: **None** (default), **Physical partitions of table**, and **Dynamic range**. When a partition option is enabled (that is, not **None**), the degree of parallelism to concurrently load data from an Azure Synapse Analytics is controlled by the [parallel copy](/azure/data-factory/copy-activity-performance-features#parallel-copy) setting on the copy activity.

  - **None**: Choose this setting to not use a partition.
  - **Physical partitions of table**: Choose this setting if you want to use a physical partition. The partition column and mechanism are automatically determined based on your physical table definition.
  - **Dynamic range**: Choose this setting if you want to use dynamic range partition. When using query with parallel enabled, the range partition parameter(`?DfDynamicRangePartitionCondition`) is needed. Sample query: `SELECT * FROM <TableName> WHERE ?DfDynamicRangePartitionCondition`.

      :::image type="content" source="./media/connector-azure-synapse-analytics/dynamic-range.png" alt-text="Screenshot showing Dynamic range settings.":::

    - **Partition column name**: Specify the name of the source column in **integer or date/datetime** type (`int`, `smallint`, `bigint`, `date`, `smalldatetime`, `datetime`, `datetime2`, or `datetimeoffset`) that's used by range partitioning for parallel copy. If not specified, the index or the primary key of the table is autodetected and used as the partition column.
    - **Partition upper bound**: Specify the maximum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result are partitioned and copied.
    - **Partition lower bound**: Specify the minimum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result are partitioned and copied.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. For more information, go to [Add additional columns during copy](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy).

### Destination

The following properties are supported for Azure Synapse Analytics under the **Destination** tab of a copy activity.

  :::image type="content" source="./media/connector-azure-synapse-analytics/destination.png" alt-text="Screenshot showing Destination tab.":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an Azure Synapse Analytics connection from the connection list. If the connection doesn't exist, then create a new Azure Synapse Analytics connection by selecting **New**.
- **Connection type**: Select **Azure Synapse Analytics**.
- **Table option**: You can choose **Use existing**, **Auto create table**. The following list describes the configuration of each setting：
  - **Use existing**: Select the table in your database from the drop-down list. Or check **Edit** to enter your schema and table name manually.
  - **Auto create table**: It automatically creates the table (if nonexistent) in source schema.

Under **Advanced**, you can specify the following fields:

- **Copy method** Choose the method that you want to use to copy data. You can choose **Copy command**, **PolyBase**, **Bulk insert** or **Upsert**. The following list describes the configuration of each setting：

    - **Copy command**: Use COPY statement to load data from Azure storage into Azure Synapse Analytics or SQL Pool.

      :::image type="content" source="./media/connector-azure-synapse-analytics/copy-command.png" alt-text="Screenshot showing copy command settings.":::

      - **Allow copy command**: It is mandatory to be selected when you choose **Copy command**.
      - **Default values**: Specify the default values for each target column in Azure Synapse Analytics. The default values in the property overwrite the DEFAULT constraint set in the data warehouse, and identity column cannot have a default value.
      - **Additional options**: Additional options that will be passed to an Azure Synapse Analytics COPY statement directly in "With" clause in [COPY statement](/sql/t-sql/statements/copy-into-transact-sql). Quote the value as needed to align with the COPY statement requirements.

    - **PolyBase**: PolyBase is a high-throughput mechanism. Use it to load large amounts of data into Azure Synapse Analytics or SQL Pool.

      :::image type="content" source="./media/connector-azure-synapse-analytics/polybase.png" alt-text="Screenshot showing PolyBase settings.":::

      - **Allow PolyBase**: It is mandatory to be selected when you choose **PolyBase**.
      - **Reject type**: Specify whether the **rejectValue** option is a literal value or a percentage. Allowed values are **Value** (default) and **Percentage**.
      - **Reject value**: Specify the number or percentage of rows that can be rejected before the query fails. Learn more about PolyBase's reject options in the Arguments section of [CREATE EXTERNAL TABLE (Transact-SQL)](/sql/t-sql/statements/create-external-table-transact-sql). Allowed values are 0 (default), 1, 2, etc.
      - **Reject sample value**: Determines the number of rows to retrieve before PolyBase recalculates the percentage of rejected rows. Allowed values are 1, 2, etc. If you choose **Percentage** as your reject type, this property is required.
      - **Use type default**: Specify how to handle missing values in delimited text files when PolyBase retrieves data from the text file. Learn more about this property from the Arguments section in [CREATE EXTERNAL FILE FORMAT (Transact-SQL)](/sql/t-sql/statements/create-external-file-format-transact-sql). Allowed values are selected (default) or unselected.

    - **Bulk insert**: Use **Bulk insert** to insert data to destination in bulk.

      :::image type="content" source="./media/connector-azure-synapse-analytics/bulk-insert.png" alt-text="Screenshot showing Bulk insert settings.":::

      - **Bulk insert table lock**: Use this to improve copy performance during bulk insert operation on table with no index from multiple clients. Learn more from [BULK INSERT (Transact-SQL)](/sql/t-sql/statements/bulk-insert-transact-sql).

    - **Upsert**: Specify the group of the settings for write behavior when you want to upsert data to your destination.
    
      :::image type="content" source="./media/connector-azure-synapse-analytics/upsert.png" alt-text="Screenshot showing Upsert settings.":::

      - **Key columns**: Choose which column is used to determine if a row from the source matches a row from the destination.

      - **Bulk insert table lock**: Use this to improve copy performance during bulk insert operation on table with no index from multiple clients. Learn more from [BULK INSERT (Transact-SQL)](/sql/t-sql/statements/bulk-insert-transact-sql).

- **Pre-copy script**: Specify a script for Copy Activity to execute before writing data into a destination table in each run. You can use this property to clean up the pre-loaded data.

- **Write batch timeout**: Specify the wait time for the batch insert operation to finish before it times out. The allowed value is timespan. The default value is "00:30:00" (30 minutes).

- **Write batch size**: Specify the number of rows to insert into the SQL table per batch. The allowed value is integer (number of rows). By default, the service dynamically determines the appropriate batch size based on the row size.

- **Max concurrent connections**: Specify the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Disable performance metrics analytics**: This setting is used to collect metrics, such as DTU, DWU, RU, and so on, for copy performance optimization and recommendations. If you're concerned with this behavior, select this checkbox. It is unselected by default.

#### Direct copy by using COPY command

Azure Synapse Analytics COPY command directly supports **Azure Blob Storage** and **Azure Data Lake Storage Gen2** as source data stores. If your source data meets the criteria described in this section, use COPY command to copy directly from the source data store to Azure Synapse Analytics. 

1. The source data and format contain the following types and authentication methods:

    |**Supported source data store type** |**Supported format** |**Supported source authentication type**|
    |:---|:---|:---|
    |Azure Blob Storage |Delimited text<br> Parquet|Anonymous authentication<br> Account key authentication<br> Shared access signature authentication|
    |Azure Data Lake Storage Gen2 |Delimited text<br> Parquet|Account key authentication<br> Shared access signature authentication |

1. The following Format settings can be set:<br>
   1. For **Parquet**: **Compression type** can be **None**, **snappy**, or **gzip**.
   1. For **DelimitedText**:
      1. **Row delimiter**: When copying delimited text to Azure Synapse Analytics via direct COPY command, specify the row delimiter explicitly (\r; \n; or \r\n). Only when the row delimiter of the source file is \r\n, the default value (\r, \n, or \r\n) works. Otherwise, enable staging for your scenario. 
      1. **Null value** is left as default or set to **empty string ("")**.
      1. **Encoding** is left as default or set to **UTF-8** or **UTF-16**.
      1. **Skip line count** is left as default or set to 0.
      1. **Compression type** can be **None** or **gzip**.

1. If your source is a folder, you must select **Recursively** checkbox.
1. **Start time (UTC)** and **End time (UTC)** in **Filter by last modified**, **Prefix**, **Enable partition discovery**, and **Additional columns** aren't specified.

To learn how to ingest data into your Azure Synapse Analytics using the COPY command, see this [article](../data-warehouse/ingest-data-copy.md).

If your source data store and format isn't originally supported by a COPY command, use the Staged copy by using the COPY command feature instead. It automatically converts the data into a COPY command compatible format, then calls a COPY command to load data into Azure Synapse Analytics.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Parallel copy from Azure Synapse Analytics

The Azure Synapse Analytics connector in copy activity provides built-in data partitioning to copy data in parallel. You can find data partitioning options on the **Source** tab of the copy activity.

When you enable partitioned copy, copy activity runs parallel queries against your Azure Synapse Analytics source to load data by partitions. The parallel degree is controlled by the **Degree of copy parallelism** in the copy activity settings tab. For example, if you set **Degree of copy parallelism** to four, the service concurrently generates and runs four queries based on your specified partition option and settings, and each query retrieves a portion of data from your Azure Synapse Analytics.

You are suggested to enable parallel copy with data partitioning especially when you load large amount of data from your Azure Synapse Analytics. The following are suggested configurations for different scenarios. When copying data into file-based data store, it's recommended to write to a folder as multiple files (only specify folder name), in which case the performance is better than writing to a single file.

| Scenario                                                     | Suggested settings                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Full load from large table, with physical partitions.        | **Partition option**: Physical partitions of table. <br><br/>During execution, the service automatically detects the physical partitions, and copies data by partitions. <br><br/>To check if your table has physical partition or not, you can refer to [this query](#sample-query-to-check-physical-partition). |
| Full load from large table, without physical partitions, while with an integer or datetime column for data partitioning. | **Partition options**: Dynamic range partition.<br>**Partition column** (optional): Specify the column used to partition data. If not specified, the index or primary key column is used.<br/>**Partition upper bound** and **partition lower bound** (optional): Specify if you want to determine the partition stride. This is not for filtering the rows in table, all rows in the table will be partitioned and copied. If not specified, the copy activity auto detects the values. <br><br>For example, if your partition column "ID" has values range from 1 to 100, and you set the lower bound as 20 and the upper bound as 80, with parallel copy as 4, the service retrieves data by 4 partitions - IDs in range <=20, [21, 50], [51, 80], and >=81, respectively. |
| Load a large amount of data by using a custom query, without physical partitions, while with an integer or date/datetime column for data partitioning. | **Partition options**: Dynamic range partition.<br>**Query**: `SELECT * FROM <TableName> WHERE ?DfDynamicRangePartitionCondition AND <your_additional_where_clause>`.<br>**Partition column**: Specify the column used to partition data.<br>**Partition upper bound** and **partition lower bound** (optional): Specify if you want to determine the partition stride. This is not for filtering the rows in table, all rows in the query result will be partitioned and copied. If not specified, copy activity auto detect the value.<br><br>For example, if your partition column "ID" has values range from 1 to 100, and you set the lower bound as 20 and the upper bound as 80, with parallel copy as 4, the service retrieves data by 4 partitions- IDs in range <=20, [21, 50], [51, 80], and >=81, respectively. <br><br>Here are more sample queries for different scenarios:<br> • Query the whole table: <br>`SELECT * FROM <TableName> WHERE ?DfDynamicRangePartitionCondition`<br> • Query from a table with column selection and additional where-clause filters: <br>`SELECT <column_list> FROM <TableName> WHERE ?DfDynamicRangePartitionCondition AND <your_additional_where_clause>`<br> • Query with subqueries: <br>`SELECT <column_list> FROM (<your_sub_query>) AS T WHERE ?DfDynamicRangePartitionCondition AND <your_additional_where_clause>`<br> • Query with partition in subquery: <br>`SELECT <column_list> FROM (SELECT <your_sub_query_column_list> FROM <TableName> WHERE ?DfDynamicRangePartitionCondition) AS T`
|

Best practices to load data with partition option:

- Choose distinctive column as partition column (like primary key or unique key) to avoid data skew.
- If the table has built-in partition, use partition option **Physical partitions of table** to get better performance.
- Azure Synapse Analytics can execute a maximum of 32 queries at a moment, setting **Degree of copy parallelism** too large may cause a Synapse throttling issue.

### Sample query to check physical partition

```sql
SELECT DISTINCT s.name AS SchemaName, t.name AS TableName, c.name AS ColumnName, CASE WHEN c.name IS NULL THEN 'no' ELSE 'yes' END AS HasPartition
FROM sys.tables AS t
LEFT JOIN sys.objects AS o ON t.object_id = o.object_id
LEFT JOIN sys.schemas AS s ON o.schema_id = s.schema_id
LEFT JOIN sys.indexes AS i ON t.object_id = i.object_id
LEFT JOIN sys.index_columns AS ic ON ic.partition_ordinal > 0 AND ic.index_id = i.index_id AND ic.object_id = t.object_id
LEFT JOIN sys.columns AS c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
LEFT JOIN sys.types AS y ON c.system_type_id = y.system_type_id
WHERE s.name='[your schema]' AND t.name = '[your table name]'
```

If the table has physical partition, you would see "HasPartition" as "yes".

## Table summary

The following tables contain more information about the copy activity in Azure Synapse Analytics.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External** |Yes|/|
|**Connection** |Your connection to the source data store.|< your connection > |Yes|connection|
|**Connection type** |Your source connection type. |**Azure Synapse Analytics** |Yes|/|
|**Use query** |The way to read data.|• Table <br>• Query<br>• Stored procedure |Yes |• typeProperties (under *`typeProperties`* -> *`source`*)<br>&nbsp; - schema<br>&nbsp; - table<br>• sqlReaderQuery <br>• sqlReaderStoredProcedureName<br>&nbsp;  storedProcedureParameters<br>&nbsp; - name<br>&nbsp;  - value<br>|
|**Query timeout** |The timeout for query command execution, default is 120 minutes. |timespan |No |queryTimeout|
|**Isolation level** |The transaction locking behavior for the SQL source.|• None<br>• Read committed<br>• Read uncommitted<br>• Repeatable read<br>• Serializable<br>• Snapshot|No |isolationLevel: <br> &nbsp;<br>• ReadCommitted<br>• ReadUncommitted<br>• RepeatableRead<br>• Serializable<br>• Snapshot|
|**Partition option** |The data partitioning options used to load data from Azure SQL Database. |• None<br>• Physical partitions of table<br>• Dynamic range<br>&nbsp; - Partition column name<br>&nbsp;- Partition upper bound<br>&nbsp;- Partition lower bound |No |partitionOption:<br>&nbsp;<br>• PhysicalPartitionsOfTable<br>• DynamicRange<br>&nbsp;  partitionSettings:<br>&nbsp; - partitionColumnName<br>&nbsp; - partitionUpperBound<br>&nbsp; - partitionLowerBound|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|• Name<br>• Value|No |additionalColumns:<br>• name<br>• value |

### Destination

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection** |Your connection to the destination data store.|< your connection >|Yes|connection|
|**Connection type** |Your destination connection type.|**Azure Synapse Analytics** |Yes|/|
|**Table option**|Your destination data table option.|• Use existing<br> • Auto create table|Yes|• typeProperties (under *`typeProperties`* -> *`sink`*)<br>&nbsp;  - schema<br>&nbsp;  - table<br>• tableOption:<br>&nbsp; - autoCreate<br>&nbsp; typeProperties (under *`typeProperties`* -> *`sink`*)<br>&nbsp;  - schema<br>&nbsp;  - table|
|**Copy method** |The method used to copy data.|• Copy command<br> • PolyBase<br> • Bulk insert<br> • Upsert|No | /  |
| When selecting **Copy command** | Use COPY statement to load data from Azure storage into Azure Synapse Analytics or SQL Pool. | / | No.<br>Apply when using COPY. | allowCopyCommand: true<br>copyCommandSettings | 
| **Default values** | Specify the default values for each target column in Azure Synapse Analytics. The default values in the property overwrite the DEFAULT constraint set in the data warehouse, and identity column cannot have a default value. | < default values > | No | defaultValues:<br>&nbsp; - columnName<br>&nbsp; - defaultValue | 
| **Additional options** | Additional options that will be passed to an Azure Synapse Analytics COPY statement directly in "With" clause in [COPY statement](/sql/t-sql/statements/copy-into-transact-sql). Quote the value as needed to align with the COPY statement requirements. | < additional options > | No | additionalOptions:<br>- \<property name\> : \<value\> | 
| When selecting **PolyBase** | PolyBase is a high-throughput mechanism. Use it to load large amounts of data into Azure Synapse Analytics or SQL Pool. | / | No.<br>Apply when using PolyBase. |  allowPolyBase: true <br>polyBaseSettings | 
| **Reject type** | The type of the reject value. | •  Value<br>•  Percentage | No | rejectType: <br> - value<br>- percentage | 
| **Reject value** | The number or percentage of rows that can be rejected before the query fails. | 0 (default), 1, 2, etc. | No |  rejectValue |
| **Reject sample value** | Determines the number of rows to retrieve before PolyBase recalculates the percentage of rejected rows.| 1, 2, etc. | Yes when you specify **Percentage** as your reject type |  rejectSampleValue | 
| **Use type default** | Specify how to handle missing values in delimited text files when PolyBase retrieves data from the text file. Learn more about this property from the Arguments section in [CREATE EXTERNAL FILE FORMAT (Transact-SQL)](/sql/t-sql/statements/create-external-file-format-transact-sql) | selected (default) or unselected. | No | useTypeDefault:<br>true (default) or false | 
| When selecting **Bulk insert** | Insert data to destination in bulk. | / | No | writeBehavior: Insert | 
| **Bulk insert table lock** | Use this to improve copy performance during bulk insert operation on table with no index from multiple clients. Learn more from [BULK INSERT (Transact-SQL)](/sql/t-sql/statements/bulk-insert-transact-sql). |  selected  or unselected (default) | No | sqlWriterUseTableLock: <br>  true or false (default) | 
| When selecting **Upsert** | Specify the group of the settings for write behavior when you want to upsert data to your destination. | / | No |  writeBehavior: Upsert | 
| **Key columns** | Indicates which column is used to determine if a row from the source matches a row from the destination. | < column name> | No | upsertSettings:<br>&nbsp; - keys: \< column name \><br>&nbsp; - interimSchemaName | 
| **Bulk insert table lock** | Use this to improve copy performance during bulk insert operation on table with no index from multiple clients. Learn more from [BULK INSERT (Transact-SQL)](/sql/t-sql/statements/bulk-insert-transact-sql). |  selected  or unselected (default) | No | sqlWriterUseTableLock: <br> true or false (default) |  
|**Pre-copy script**|A script for Copy Activity to execute before writing data into a destination table in each run. You can use this property to clean up the pre-loaded data.| < pre-copy script ><br>(string)|No |preCopyScript|
|**Write batch timeout**|The wait time for the batch insert operation to finish before it times out. The allowed value is timespan. The default value is "00:30:00" (30 minutes).|timespan |No |writeBatchTimeout|
|**Write batch size**|The number of rows to insert into the SQL table per batch. By default, the service dynamically determines the appropriate batch size based on the row size.|< number of rows ><br>(integer) |No |writeBatchSize|
|**Max concurrent connections**|The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.| < upper limit of concurrent connections ><br>(integer)|No |maxConcurrentConnections|
|**Disable performance metrics analytics**|This setting is used to collect metrics, such as DTU, DWU, RU, and so on, for copy performance optimization and recommendations. If you're concerned with this behavior, select this checkbox.| select or unselect (default) |No |disableMetricsCollection：<br> true or false (default)|

## Related content

- [Azure Synapse Analytics connector overview](connector-azure-synapse-analytics-overview.md)
