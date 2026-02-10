---
title: Configure SQL database in a copy activity (Preview)
description: This article explains how to copy data using SQL database.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 11/14/2024
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure SQL database in a copy activity (Preview)

This article outlines how to use the copy activity in a pipeline to copy data from and to SQL database.

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

The following properties are supported for SQL database under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-sql-database/sql-database-source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-sql-database/sql-database-source.png":::

The following properties are **required**:

- **Connection**: Select an existing **SQL database** referring to the step in this [article](connector-sql-database.md).

- **Use query**: You can choose **Table**, **Query**, or **Stored procedure**. The following list describes the configuration of each setting:

  - **Table**: Specify the name of the SQL database to read data. Choose an existing table from the drop-down list or select **Enter manually** to enter the schema and table name.

  - **Query**: Specify the custom SQL query to read data. An example is `select * from MyTable`. Or select the pencil icon to edit in code editor.

    :::image type="content" source="./media/connector-sql-database/query.png" lightbox="./media/connector-sql-database/query.png" alt-text="Screenshot showing choosing query.":::

  - **Stored procedure**: Select the stored procedure from the drop-down list.

Under **Advanced**, you can specify the following fields:

- **Query timeout (minutes)**: Specify the timeout for query command execution, default is 120 minutes. If parameter is set for this property, allowed values are timespan, such as "02:00:00" (120 minutes).

    :::image type="content" source="./media/connector-sql-database/query-timeout.png" lightbox="./media/connector-sql-database/query-timeout.png" alt-text="Screenshot showing Query timeout settings.":::

- **Isolation level**: Specifies the transaction locking behavior for the SQL source. The allowed values are: **Read committed**, **Read uncommitted**, **Repeatable read**, **Serializable**, or **Snapshot**. Refer to [IsolationLevel Enum](/dotnet/api/system.data.isolationlevel) for more details.

    :::image type="content" source="./media/connector-sql-database/isolation-level.png" alt-text="Screenshot showing Isolation level settings." lightbox="./media/connector-sql-database/isolation-level.png":::

- **Partition option**: Specify the data partitioning options used to load data from SQL database. Allowed values are: **None** (default), **Physical partitions of table**, and **Dynamic range**. When a partition option is enabled (that is, not **None**), the degree of parallelism to concurrently load data from an SQL database is controlled by **Degree of copy parallelism** in copy activity settings tab.

  - **None**: Choose this setting to not use a partition.
  - **Physical partitions of table**: When using a physical partition, the partition column and mechanism are automatically determined based on your physical table definition.
  - **Dynamic range**: When using query with parallel enabled, the range partition parameter(`?DfDynamicRangePartitionCondition`) is needed. Sample query: `SELECT * FROM <TableName> WHERE ?DfDynamicRangePartitionCondition`.

    - **Partition column name**: Specify the name of the source column in **integer or date/datetime** type (`int`, `smallint`, `bigint`, `date`, `smalldatetime`, `datetime`, `datetime2`, or `datetimeoffset`) that's used by range partitioning for parallel copy. If not specified, the index or the primary key of the table is auto-detected and used as the partition column. 
    
         If you use a query to retrieve the source data, hook `?DfDynamicRangePartitionCondition` in the WHERE clause. For an example, see the [Parallel copy from SQL database](#parallel-copy-from-sql-database) section.

    - **Partition upper bound**: Specify the maximum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result will be partitioned and copied. If not specified, copy activity auto detect the value. For an example, see the [Parallel copy from SQL database](#parallel-copy-from-sql-database) section.
    - **Partition lower bound**: Specify the minimum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result will be partitioned and copied. If not specified, copy activity auto detect the value. For an example, see the [Parallel copy from SQL database](#parallel-copy-from-sql-database) section.

- **Additional columns**: Add more data columns to store source files' relative path or static value. Expression is supported for the latter. For more information, go to [Add additional columns during copy](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy).

### Destination

The following properties are supported for SQL database under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-sql-database/sql-database-destination.png" alt-text="Screenshot showing Destination tab." lightbox="./media/connector-sql-database/sql-database-destination.png":::

The following properties are **required**:

- **Connection**: Select an existing **SQL database** referring to the step in this [article](connector-sql-database.md).

- **Table option**: Select from **Use existing** or **Auto create table**.

  - If you select **Use existing**:
    - **Table**: Specify the name of the SQL database to write data. Choose an existing table from the drop-down list or select **Enter manually** to enter the schema and table name.

  - If you select **Auto create table**:
    - **Table**: It automatically creates the table (if nonexistent) in source schema, which is not supported when stored procedure is used as write behavior.

Under **Advanced**, you can specify the following fields:

- **Write behavior**: Defines the write behavior when the source is files from a file-based data store. You can choose **Insert**, **Upsert** or **Stored procedure**.

    :::image type="content" source="./media/connector-sql-database/writer-behavior.png" lightbox="./media/connector-sql-database/writer-behavior.png" alt-text="Screenshot of write behavior tab.":::

  - **Insert**: Choose this option if your source data has inserts.

  - **Upsert**: Choose this option if your source data has both inserts and updates.

    - **Use TempDB**: Specify whether to use a global temporary table or physical table as the interim table for upsert. By default, the service uses global temporary table as the interim table and this checkbox is selected.
    <br>If you write large amount of data into SQL database, uncheck this and specify a schema name under which Data Factory will create a staging table to load upstream data and auto clean up upon completion. Make sure the user has create table permission in the database and alter permission on the schema. If not specified, a global temp table is used as staging.

      :::image type="content" source="./media/connector-sql-database/use-tempdb.png" lightbox="./media/connector-sql-database/use-tempdb.png" alt-text="Screenshot showing select Use TempDB.":::

    - **Select user DB schema**: When the **Use TempDB** isn't selected, specify a schema name under which Data Factory will create a staging table to load upstream data and automatically clean them up upon completion. Make sure you have create table permission in the database and alter permission on the schema.

      >[!Note]
      > You must have the permission for creating and deleting tables. By default, an interim table will share the same schema as a destination table.

      :::image type="content" source="./media/connector-sql-database/not-use-tempdb.png" alt-text="Screenshot showing not select Use TempDB.":::

    - **Key columns**: Choose which column is used to determine if a row from the source matches a row from the destination.

  - **Stored procedure name**: Select the stored procedure from the drop-down list.

- **Bulk insert table lock**: Choose **Yes** or **No**. Use this setting to improve copy performance during a bulk insert operation on a table with no index from multiple clients. For more information, go to [BULK INSERT (Transact-SQL)](/sql/t-sql/statements/bulk-insert-transact-sql)

- **Pre-copy script**: Specify a script for the copy activity to execute before writing data into a destination table in each run. You can use this property to clean up the preloaded data.

- **Write batch timeout**: Specify the wait time for the batch insert operation to finish before it times out. The allowed value is timespan. The default value is "00:30:00" (30 minutes).

- **Write batch size**: Specify the number of rows to insert into the SQL table per batch. The allowed value is integer (number of rows). By default, the service dynamically determines the appropriate batch size based on the row size.

- **Max concurrent connections**: Specify the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Mapping

For the **Mapping** tab configuration, if you don't apply SQL database with auto create table as your destination, go to [Mapping](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

If you apply SQL database with auto create table as your destination, except the configuration in [Mapping](copy-data-activity.md#configure-your-mappings-under-mapping-tab), you can edit the type for your destination columns. After selecting **Import schemas**, you can specify the column type in your destination.

For example, the type for *ID* column in source is int, and you can change it to float type when mapping to the destination column.

:::image type="content" source="media/connector-sql-database/configure-mapping-destination-type.png" lightbox="media/connector-sql-database/configure-mapping-destination-type.png" alt-text="Screenshot of mapping destination column type.":::

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Parallel copy from SQL database

The SQL database connector in copy activity provides built-in data partitioning to copy data in parallel. You can find data partitioning options on the **Source** tab of the copy activity.

When you enable partitioned copy, copy activity runs parallel queries against your SQL database source to load data by partitions. The parallel degree is controlled by the **Degree of copy parallelism** in the copy activity settings tab. For example, if you set **Degree of copy parallelism** to four, the service concurrently generates and runs four queries based on your specified partition option and settings, and each query retrieves a portion of data from your SQL database.

You are suggested to enable parallel copy with data partitioning especially when you load large amount of data from your SQL database. The following are suggested configurations for different scenarios. When copying data into file-based data store, it's recommended to write to a folder as multiple files (only specify folder name), in which case the performance is better than writing to a single file.

| Scenario                                                     | Suggested settings                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Full load from large table, with physical partitions.        | **Partition option**: Physical partitions of table. <br><br/>During execution, the service automatically detects the physical partitions, and copies data by partitions. <br><br/>To check if your table has physical partition or not, you can refer to [this query](#sample-query-to-check-physical-partition). |
| Full load from large table, without physical partitions, while with an integer or datetime column for data partitioning. | **Partition options**: Dynamic range partition.<br>**Partition column** (optional): Specify the column used to partition data. If not specified, the index or primary key column is used.<br/>**Partition upper bound** and **partition lower bound** (optional): Specify if you want to determine the partition stride. This is not for filtering the rows in table, all rows in the table will be partitioned and copied. If not specified, copy activity auto detects the values and it can take long time depending on MIN and MAX values. It is recommended to provide upper bound and lower bound. <br><br>For example, if your partition column "ID" has values range from 1 to 100, and you set the lower bound as 20 and the upper bound as 80, with parallel copy as 4, the service retrieves data by 4 partitions - IDs in range <=20, [21, 50], [51, 80], and >=81, respectively. |
| Load a large amount of data by using a custom query, without physical partitions, while with an integer or date/datetime column for data partitioning. | **Partition options**: Dynamic range partition.<br>**Query**: `SELECT * FROM <TableName> WHERE ?DfDynamicRangePartitionCondition AND <your_additional_where_clause>`.<br>**Partition column**: Specify the column used to partition data.<br>**Partition upper bound** and **partition lower bound** (optional): Specify if you want to determine the partition stride. This is not for filtering the rows in table, all rows in the query result will be partitioned and copied. If not specified, copy activity auto detect the value.<br><br>For example, if your partition column "ID" has values range from 1 to 100, and you set the lower bound as 20 and the upper bound as 80, with parallel copy as 4, the service retrieves data by 4 partitions- IDs in range <=20, [21, 50], [51, 80], and >=81, respectively. <br><br>Here are more sample queries for different scenarios:<br> •  Query the whole table: <br>`SELECT * FROM <TableName> WHERE ?DfDynamicRangePartitionCondition`<br> • Query from a table with column selection and additional where-clause filters: <br>`SELECT <column_list> FROM <TableName> WHERE ?DfDynamicRangePartitionCondition AND <your_additional_where_clause>`<br> • Query with subqueries: <br>`SELECT <column_list> FROM (<your_sub_query>) AS T WHERE ?DfDynamicRangePartitionCondition AND <your_additional_where_clause>`<br> • Query with partition in subquery: <br>`SELECT <column_list> FROM (SELECT <your_sub_query_column_list> FROM <TableName> WHERE ?DfDynamicRangePartitionCondition) AS T`
|

Best practices to load data with partition option:

- Choose distinctive column as partition column (like primary key or unique key) to avoid data skew.
- If the table has built-in partition, use partition option **Physical partitions of table** to get better performance.

### Sample query to check physical partition

```sql
SELECT DISTINCT s.name AS SchemaName, t.name AS TableName, pf.name AS PartitionFunctionName, c.name AS ColumnName, iif(pf.name is null, 'no', 'yes') AS HasPartition
FROM sys.tables AS t
LEFT JOIN sys.objects AS o ON t.object_id = o.object_id
LEFT JOIN sys.schemas AS s ON o.schema_id = s.schema_id
LEFT JOIN sys.indexes AS i ON t.object_id = i.object_id 
LEFT JOIN sys.index_columns AS ic ON ic.partition_ordinal > 0 AND ic.index_id = i.index_id AND ic.object_id = t.object_id 
LEFT JOIN sys.columns AS c ON c.object_id = ic.object_id AND c.column_id = ic.column_id 
LEFT JOIN sys.partition_schemes ps ON i.data_space_id = ps.data_space_id 
LEFT JOIN sys.partition_functions pf ON pf.function_id = ps.function_id 
WHERE s.name='[your schema]' AND t.name = '[your table name]'
```

If the table has physical partition, you would see "HasPartition" as "yes" like the following.

:::image type="content" source="./media/connector-sql-database/sql-query-result.png" lightbox="./media/connector-sql-database/sql-query-result.png" alt-text="Screenshot of a SQL query result.":::

## Table summary

The following tables contain more information about the copy activity in SQL database.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**Use query** |The way to read data. Apply **Table** to read data from the specified table or apply **Query** to read data using SQL queries.|• **Table** <br>• **Query**<br>• **Stored procedure**| Yes | / |
| *For **Table*** |  |  |  |  |
| **schema name** | Name of the schema. |< your schema name >  | No | schema |
| **table name** | Name of the table. | < your table name > | No |table |
| *For **Query*** |  |  |  |  |
| **Query** | Specify the custom SQL query to read data. For example: `SELECT * FROM MyTable`. |  < SQL queries > |No | sqlReaderQuery|
| *For **Stored procedure*** |  |  |  |  |
| **Stored procedure name** | Name of the stored procedure. | < your stored procedure name > | No |sqlReaderStoredProcedureName |
|  |  |  |  |  |
|**Query timeout (minutes)** |The timeout for query command execution, default is 120 minutes. If parameter is set for this property, allowed values are timespan, such as "02:00:00" (120 minutes).|timespan |No |queryTimeout|
|**Isolation level** |Specifies the transaction locking behavior for the SQL source.|• Read committed<br>• Read uncommitted<br>• Repeatable read<br>• Serializable<br>• Snapshot|No |isolationLevel:<br>• ReadCommitted<br>• ReadUncommitted<br>• RepeatableRead<br>• Serializable<br>• Snapshot|
|**Partition option** |The data partitioning options used to load data from SQL database. |• None<br>• Physical partitions of table<br>• Dynamic range |No |partitionOption:<br>• PhysicalPartitionsOfTable<br>• DynamicRange|
| *For **Dynamic range*** |  |  |  |  |
| **Partition column name** | The name of the source column in **integer or date/datetime** type (`int`, `smallint`, `bigint`, `date`, `smalldatetime`, `datetime`, `datetime2`, or `datetimeoffset`) that's used by range partitioning for parallel copy. If not specified, the index or the primary key of the table is auto-detected and used as the partition column. If you use a query to retrieve the source data, hook `?DfDynamicRangePartitionCondition` in the WHERE clause.  | < your partition column names > | No | partitionColumnName | 
| **Partition upper bound** | The maximum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result will be partitioned and copied. If not specified, copy activity auto detect the value. | < your partition upper bound > | No | partitionUpperBound | 
| **Partition lower bound** |The minimum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result will be partitioned and copied. If not specified, copy activity auto detect the value. | < your partition lower bound > | No | partitionLowerBound |
|  |  |  |  |  |
|**Additional columns** |Add more data columns to store source files' relative path or static value. Expression is supported for the latter.|• Name<br>• Value|No |additionalColumns:<br>• name<br>• value |

### Destination

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the destination data store.|\<your connection >|Yes|connection|
|**Table option**|Your destination data table. Select from **Use existing** or **Auto create table**.| • Use existing<br>• Auto create table | Yes |schema <br> table|
|**Write behavior** |Defines the write behavior when the source is files from a file-based data store.|• Insert<br>• Upsert<br>• Stored procedure|No |writeBehavior:<br>• insert<br>• upsert<br>• sqlWriterStoredProcedureName|
|**Bulk insert table lock** | Use this setting to improve copy performance during a bulk insert operation on a table with no index from multiple clients.|Yes or No (default) |No |sqlWriterUseTableLock:<br>true or false (default)|
| *For **Upsert*** |  |  |  |  |
| **Use TempDB** | Whether to use a global temporary table or physical table as the interim table for upsert. |selected (default) or unselected  |No |useTempDB:<br>true (default) or false |
| **Key columns** | Choose which column is used to determine if a row from the source matches a row from the destination. | < your key column> |No |keys|
| *For **Stored procedure*** |  |  |  |  |
| **Stored procedure name** | This property is the name of the stored procedure that reads data from the source table. The last SQL statement must be a SELECT statement in the stored procedure.|< stored procedure name > |No |sqlWriterStoredProcedureName|
|  |  |  |  |  |
|**Pre-copy script**|A script for Copy Activity to execute before writing data into a destination table in each run. You can use this property to clean up the preloaded data.| \<pre-copy script><br>(string)|No |preCopyScript|
|**Write batch timeout**|The wait time for the batch insert operation to finish before it times out. The allowed value is timespan. The default value is "00:30:00" (30 minutes).|timespan |No |writeBatchTimeout|
|**Write batch size**|The number of rows to insert into the SQL table per batch. By default, the service dynamically determines the appropriate batch size based on the row size.|\<number of rows><br>(integer) |No |writeBatchSize|
|**Max concurrent connections**|The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.| \<upper limit of concurrent connections><br>(integer)|No |maxConcurrentConnections|

## Related content

- [SQL database overview](connector-sql-database-overview.md)
