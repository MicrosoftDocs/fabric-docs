---
title: Configure Oracle database in a copy activity
description: This article explains how to copy data using Oracle database.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 10/14/2025
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure Oracle database in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to Oracle database.

Specifically, this Oracle database connector supports:

- The following versions of an Oracle database:
    - Oracle database 19c and higher
    - Oracle database 18c and higher
    - Oracle database 12c and higher
    - Oracle database 11g and higher

- Parallel copying from an Oracle database source. See the [Parallel copy from Oracle database](#parallel-copy-from-oracle-database) section for details.

> [!Note]
> Oracle proxy server isn't supported.

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

The following properties are supported for Oracle database under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-oracle-database/oracle-source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-oracle-database/oracle-source.png":::

The following properties are **required**:

- **Connection**:  Select an Oracle database connection from the connection list. If no connection exists, then create a new Oracle database connection by selecting **More** at the bottom of the connection list.
- **Use query**: Select from **Table** or **Query**.
    - If you select **Table**:
      - **Table**: Specify the name of the table in the Oracle database to read data. Select the table from the drop-down list or select **Enter manually** to enter the schema and table name.

        :::image type="content" source="./media/connector-oracle-database/use-query-table.png" alt-text="Screenshot showing Use query - Table." :::

    - If you select **Query**:
      - **Query**: Specify the custom SQL query to read data. For example: `SELECT * FROM MyTable`. Note that the query should not end with a semicolon (;).
        
        When you enable partitioned load, you need to hook any corresponding built-in partition parameters in your query. For examples, see the [Parallel copy from Oracle database](#parallel-copy-from-oracle-database) section.

        :::image type="content" source="./media/connector-oracle-database/use-query-query.png" alt-text="Screenshot showing Use query - Query." :::

Under **Advanced**, you can specify the following fields:

- **Partition option**: Specifies the data partitioning options used to load data from Oracle database. When a partition option is enabled (that is, not **None**), the degree of parallelism to concurrently load data from an Oracle database is controlled by **Degree of copy parallelism** in copy activity settings tab.

    If you select **None**, you choose not to use partition.

    If you select **Physical partitions of table**:
    - **Partition names**: Specify the list of physical partitions that needs to be copied.

        If you use a query to retrieve the source data, hook `?DfTabularPartitionName` in the WHERE clause. For an example, see the [Parallel copy from Oracle database](#parallel-copy-from-oracle-database) section.

        :::image type="content" source="./media/connector-oracle-database/physical-partitions-of-table.png" alt-text="Screenshot showing the configuration when you select Physical partitions of table." lightbox="./media/connector-oracle-database/physical-partitions-of-table.png":::

    If you select **Dynamic range**:
    - **Partition column name**: Specify the name of the source column in **integer type** that will be used by range partitioning for parallel copy. If not specified, the primary key of the table is auto-detected and used as the partition column.

      If you use a query to retrieve the source data, hook `?DfRangePartitionColumnName` in the WHERE clause. For an example, see the [Parallel copy from Oracle database](#parallel-copy-from-oracle-database) section.

    - **Partition upper bound**: Specify maximum value of the partition column to copy data out.

      If you use a query to retrieve the source data, hook `?DfRangePartitionUpbound` in the WHERE clause. For an example, see the Parallel copy from [Parallel copy from Oracle database](#parallel-copy-from-oracle-database) section.

    - **Partition lower bound**: Specify the minimum value of the partition column to copy data out.
  
      If you use a query to retrieve the source data, hook `?DfRangePartitionLowbound` in the WHERE clause. For an example, see the Parallel copy from [Parallel copy from Oracle database](#parallel-copy-from-oracle-database) section.

      :::image type="content" source="./media/connector-oracle-database/dynamic-range.png" alt-text="Screenshot showing the configuration when you select Dynamic range." lightbox="./media/connector-oracle-database/dynamic-range.png":::

- **Query timeout (minutes)**: Specify the timeout for query command execution, default is 120 minutes. If a parameter is set for this property, allowed values are timespan, such as "02:00:00" (120 minutes).

- **NUMBER settings**: Specify the precision and scale for NUMBER. This applies only to NUMBER types that do not have precision and scale explicitly defined in the Oracle database.

  - **Precision**: Specify the maximum number of significant decimal digits. Allowed values range from 1 to 256. Defaults to 256 if not specified.

  - **Scale**: Specify the number of digits after the decimal point. Allowed values range from 0 to 130 and must be less than or equal to the precision. Defaults to 130 if not specified.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Destination

The following properties are supported for Oracle database under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-oracle-database/oracle-destination.png" alt-text="Screenshot showing destination tab." lightbox="./media/connector-oracle-database/oracle-destination.png":::

The following properties are **required**:

- **Connection:** Select an Oracle database connection from the connection list. If the connection doesn't exist, then create a new Oracle database connection by selecting **More** at the bottom of the connection list.
- **Table**: Select the table in your database from the drop-down list. Or check **Enter manually** to enter the schema and table name.

Under **Advanced**, you can specify the following fields:

- **Pre-copy script**: Specify a SQL query for the copy activity to execute before you write data into Oracle database in each run. You can use this property to clean up the preloaded data.
- **Write batch timeout**: The wait time for the batch insert operation to complete before it times out. The allowed value is timespan. An example is 00:30:00 (30 minutes).
- **Write batch size**: Specify the number of rows to insert into the Oracle database table per batch. The allowed value is integer (number of rows). The default value is 10,000.
- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, see [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Parallel copy from Oracle database

The Oracle database connector provides built-in data partitioning to copy data from Oracle database in parallel. You can find data partitioning options on the **Source** tab of the copy activity.

When you enable partitioned copy, the service runs parallel queries against your Oracle database source to load data by partitions. The parallel degree is controlled by the **Degree of copy parallelism** setting in the copy activity settings tab. For example, if you set **Degree of copy parallelism** to four, the service concurrently generates and runs four queries based on your specified partition option and settings, and each query retrieves a portion of data from your Oracle database.

You are suggested to enable parallel copy with data partitioning especially when you load large amount of data from your Oracle database. The following are suggested configurations for different scenarios. When copying data into file-based data store, it's recommended to write to a folder as multiple files (only specify folder name), in which case the performance is better than writing to a single file.

| Scenario                                                     | Suggested settings                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Full load from large table, with physical partitions.        | **Partition option**: Physical partitions of table. <br><br/>During execution, the service automatically detects the physical partitions, and copies data by partitions. |
| Full load from large table, without physical partitions, while with an integer column for data partitioning. | **Partition options**: Dynamic range partition.<br>**Partition column**: Specify the column used to partition data. If not specified, the primary key column is used.|
|Load a large amount of data by using a custom query, with physical partitions. | **Partition options**: Physical partitions of table.<br>**Query**: `SELECT * FROM <TABLENAME> PARTITION("?DfTabularPartitionName") WHERE <your_additional_where_clause>`. <br><br>**Partition name**: Specify the partition name(s) to copy data from. If not specified, the service automatically detects the physical partitions on the table you specified in the Oracle database data. <br>During execution, the service replaces `?DfTabularPartitionName` with the actual partition name, and sends to Oracle database.|
| Load a large amount of data by using a custom query, without physical partitions, while with an integer column for data partitioning. | **Partition options**: Dynamic range partition.<br>**Query**: `SELECT * FROM <TABLENAME> WHERE ?DfRangePartitionColumnName <= ?DfRangePartitionUpbound AND ?DfRangePartitionColumnName >= ?DfRangePartitionLowbound AND <your_additional_where_clause>`.<br>**Partition column**: Specify the column used to partition data. You can partition against the column with integer data type.<br>**Partition upper bound** and **partition lower bound**: Specify if you want to filter against partition column to retrieve data only between the lower and upper range.<br><br>During execution, the service replaces `?DfRangePartitionColumnName`, `?DfRangePartitionUpbound`, and `?DfRangePartitionLowbound` with the actual column name and value ranges for each partition, and sends to Oracle database. <br>For example, if your partition column "ID" is set with the lower bound as 1 and the upper bound as 80, with parallel copy set as 4, the service retrieves data by 4 partitions. Their IDs are between [1,20], [21, 40], [41, 60], and [61, 80], respectively.`|

> [!TIP]
> When copying data from a non-partitioned table, you can use "Dynamic range" partition option to partition against an integer column. If your source data doesn't have such type of column, you can leverage [ORA_HASH]( https://docs.oracle.com/database/121/SQLRF/functions136.htm) function in source query to generate a column and use it as partition column.

## Table summary

The following tables contain more information about the copy activity in Oracle database.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your Oracle database connection> |Yes|connection|
|**Use query** |The way to read data from Oracle database. Apply **Table** to read data from the specified table or apply **Query** to read data using SQL queries.|• **Table** <br>• **Query** |Yes |/|
| *For **Table*** |  |  |  |  |
| **schema name** | Name of the schema. |< your schema name >  | No | schema |
| **table name** | Name of the table. | < your table name > | No |table |
| *For **Query*** |  |  |  |  |
| **Query** | Use the custom SQL query to read data. An example is `SELECT * FROM MyTable`. Note that the query should not end with a semicolon (;). <br>When you enable partitioned load, you need to hook any corresponding built-in partition parameters in your query. For examples, see the [Parallel copy from Oracle database](#parallel-copy-from-oracle-database) section. |  < SQL queries > |No | oracleReaderQuery|
|  |  |  |  |  |
|**Partition option** |The data partitioning options used to load data from Oracle database. |• **None** (default)<br>• **Physical partitions of table**<br>• **Dynamic range** |No |/|
| *For **Physical partitions of table*** |  |  |  |  |
| **Partition names** | The list of physical partitions that needs to be copied. If you use a query to retrieve the source data, hook `?DfTabularPartitionName` in the WHERE clause.  | < your partition names > | No | partitionNames |
|  |  |  |  |  |
| *For **Dynamic range*** |  |  |  |  |
| **Partition column name** | Specify the name of the source column in **integer type** that will be used by range partitioning for parallel copy. If not specified, the primary key of the table is auto-detected and used as the partition column.<br>If you use a query to retrieve the source data, hook `?DfRangePartitionColumnName` in the WHERE clause. For an example, see the [Parallel copy from Oracle database](#parallel-copy-from-oracle-database) section. | < your partition column names > | No | partitionColumnName |
| **Partition upper bound** | Specify maximum value of the partition column to copy data out. If you use a query to retrieve the source data, hook `?DfRangePartitionUpbound` in the WHERE clause. For an example, see the Parallel copy from [Parallel copy from Oracle database](#parallel-copy-from-oracle-database) section. | < your partition upper bound > | No | partitionUpperBound |
| **Partition lower bound** | Specify the minimum value of the partition column to copy data out. If you use a query to retrieve the source data, hook `?DfRangePartitionLowbound` in the WHERE clause. For an example, see the Parallel copy from [Parallel copy from Oracle database](#parallel-copy-from-oracle-database) section. | < your partition lower bound > | No | partitionLowerBound |
|  |  |  |  |  |
|**Query timeout** |The timeout for query command execution, default is 120 minutes. |timespan |No |queryTimeout|
| **Precision** | The maximum number of significant decimal digits. Allowed values range from 1 to 256. Defaults to 256 if not specified. | < your precision > | No | numberPrecision |
| **Scale** | The number of digits after the decimal point. Allowed values range from 0 to 130 and must be less than or equal to the precision. Defaults to 130 if not specified. | < your scale > | No | numberScale |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

### Destination information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **Connection** |Your connection to the destination data store.|\<your Oracle database connection>|Yes|connection|
| **Table** |Your destination data table.| \<name of your destination table\> |Yes |/|
| **schema name** | Name of the schema. |< your schema name >  | Yes | schema |
| **table name** | Name of the table. | < your table name > | Yes |table |
| **Pre-copy script** | A SQL query for the copy activity to execute before you write data into Oracle database in each run. You can use this property to clean up the preloaded data. | < your pre-copy script > | No | preCopyScript |
| **Write batch timeout** | The wait time for the batch insert operation to complete before it times out. | timespan | No | writeBatchTimeout |
| **Write batch size** | The number of rows to insert into the SQL table per batch. | integer<br>(the default is 10,000) | No | writeBatchSize |
| **Max concurrent connections** | The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections. | < max concurrent connections > |No | maxConcurrentConnections |

## Related content

- [Oracle database overview](connector-oracle-database-overview.md)
