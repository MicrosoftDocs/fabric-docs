---
title: Configure Amazon RDS For Oracle in a copy activity
description: This article explains how to copy data using Amazon RDS For Oracle.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 10/14/2025
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure Amazon RDS For Oracle in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from Amazon RDS For Oracle.

Specifically, this Amazon RDS For Oracle connector supports:

- The following versions of an Amazon RDS For Oracle database:
    - Amazon RDS For Oracle 19c and higher
    - Amazon RDS For Oracle 18c and higher
    - Amazon RDS For Oracle 12c and higher
    - Amazon RDS For Oracle 11g and higher
- Parallel copying from an Amazon RDS For Oracle source. See the [Parallel copy from Amazon RDS For Oracle](#parallel-copy-from-amazon-rds-for-oracle) section for details.

> [!Note]
> Amazon RDS For Oracle proxy server isn't supported.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for Amazon RDS For Oracle under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-amazon-rds-for-oracle/source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-amazon-rds-for-oracle/source.png":::

The following properties are **required**:

- **Connection**:  Select an Amazon RDS For Oracle connection from the connection list. If no connection exists, then create a new Amazon RDS For Oracle connection.

- **Use query**: Select **Table** or **Query**.

  - If you select **Table**:

    - **Table**: Select the table from the drop-down list or select **Enter manually** to manually enter it to read data.

  - If you select **Query**:

    - **Query**: Specify the custom SQL query to read data. For example: `SELECT * FROM MyTable`. Note that the query should not end with a semicolon (;).
    
      When you enable partitioned load, you need to hook any corresponding built-in partition parameters in your query. For examples, see the [Parallel copy from Amazon RDS For Oracle](#parallel-copy-from-amazon-rds-for-oracle) section.

      :::image type="content" source="./media/connector-amazon-rds-for-oracle/query.png" alt-text="Screenshot showing query." lightbox="./media/connector-amazon-rds-for-oracle/query.png":::

Under **Advanced**, you can specify the following fields:

- **Partition option**: Specifies the data partitioning options used to load data from Amazon RDS For Oracle. Allowed values are: **None** (default), **PhysicalPartitionsOfTable**, and **DynamicRange**. When a partition option is enabled (that is, not **None**), the degree of parallelism to concurrently load data from an Amazon RDS For Oracle database is controlled by the **Degree of copy parallelism** in the copy activity settings tab.

    If you select **None**, you choose not to use partition.

    If you select **Physical partitions of table**:
    - **Partition names**: Specify the list of physical partitions that needs to be copied. 
    
        If you use a query to retrieve the source data, hook `?AdfTabularPartitionName` in the WHERE clause. For an example, see the [Parallel copy from Amazon RDS For Oracle](#parallel-copy-from-amazon-rds-for-oracle) section.
    
        :::image type="content" source="./media/connector-amazon-rds-for-oracle/physical-partitions-of-table.png" alt-text="Screenshot showing the configuration when you select Physical partitions of table.":::
    
    If you select **Dynamic range**:
    - **Partition column name**: Specify the name of the source column **in integer type** that will be used by range partitioning for parallel copy. If not specified, the primary key of the table is auto-detected and used as the partition column.

      If you use a query to retrieve the source data, hook `?AdfRangePartitionColumnName` in the WHERE clause. For an example, see the [Parallel copy from Amazon RDS For Oracle](#parallel-copy-from-amazon-rds-for-oracle) section.

    - **Partition upper bound**: Specify the maximum value of the partition column to copy data out.

      If you use a query to retrieve the source data, hook `?AdfRangePartitionUpbound` in the WHERE clause. For an example, see the [Parallel copy from Amazon RDS For Oracle](#parallel-copy-from-amazon-rds-for-oracle) section.

    - **Partition lower bound**: Specify the minimum value of the partition column to copy data out.
    
      If you use a query to retrieve the source data, hook `?AdfRangePartitionLowbound` in the WHERE clause. For an example, see the [Parallel copy from Amazon RDS For Oracle](#parallel-copy-from-amazon-rds-for-oracle) section.

      :::image type="content" source="./media/connector-amazon-rds-for-oracle/dynamic-range.png" alt-text="Screenshot showing the configuration when you select Dynamic range.":::

- **Query timeout (minutes)**: Specify the timeout for query command execution, default is 120 minutes. If a parameter is set for this property, allowed values are timespan, such as "02:00:00" (120 minutes).

- **NUMBER settings**: Specify the precision and scale for NUMBER. This applies only to NUMBER types that do not have precision and scale explicitly defined in the Amazon RDS For Oracle database.

  - **Precision**: Specify the maximum number of significant decimal digits. Allowed values range from 1 to 256. Defaults to 256 if not specified.

  - **Scale**: Specify the number of digits after the decimal point. Allowed values range from 0 to 130 and must be less than or equal to the precision. Defaults to 130 if not specified.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

#### Data type mapping for Amazon RDS For Oracle

When copying data from Amazon RDS For Oracle, the following mappings are used from Amazon RDS For Oracle data types to interim data types used by the service internally.

| Amazon RDS For Oracle data type     | Interim service data type   |
|:--- |:--- |
| BFILE |Byte[] |
| BINARY_FLOAT | Single |
| BINARY_DOUBLE | Double |
| BLOB |Byte[] |
| CHAR |String |
| CLOB |String |
| DATE |DateTime |
| FLOAT (P < 16)  | Double |
| FLOAT (P >= 16)  | Decimal |
| INTERVAL YEAR TO MONTH |Int64 |
| INTERVAL DAY TO SECOND |TimeSpan |
| LONG |String |
| LONG RAW |Byte[] |
| NCHAR |String |
| NCLOB |String |
| NUMBER (p,s) |Int16, Int32, Int64, Double, Single, Decimal |
| NUMBER without precision and scale | Decimal |
| NVARCHAR2 |String |
| RAW |Byte[] |
| TIMESTAMP |DateTime |
| TIMESTAMP WITH LOCAL TIME ZONE |DateTime |
| TIMESTAMP WITH TIME ZONE |DateTimeOffset |
| VARCHAR2 |String |
| XMLTYPE |String |

> [!NOTE]
> NUMBER(p,s) is mapped to the appropriate interim service data type depending on the precision (p) and scale (s).

### Settings

For **Settings** tab configuration, see [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Parallel copy from Amazon RDS For Oracle

The Amazon RDS For Oracle connector in copy activity provides built-in data partitioning to copy data in parallel. You can find data partitioning options on the **Source** tab of the copy activity.

When you enable partitioned copy, copy activity runs parallel queries against your Amazon RDS For Oracle source to load data by partitions. The parallel degree is controlled by the **Degree of copy parallelism** in the copy activity settings tab. For example, if you set **Degree of copy parallelism** to four, the service concurrently generates and runs four queries based on your specified partition option and settings, and each query retrieves a portion of data from your Amazon RDS For Oracle.

You are suggested to enable parallel copy with data partitioning especially when you load large amount of data from your Amazon RDS For Oracle. The following are suggested configurations for different scenarios. When copying data into file-based data store, it's recommended to write to a folder as multiple files (only specify folder name), in which case the performance is better than writing to a single file.

| Scenario                                                     | Suggested settings                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Full load from large table, with physical partitions.        | **Partition option**: Physical partitions of table. <br><br/>During execution, the service automatically detects the physical partitions, and copies data by partitions. |
| Full load from large table, without physical partitions, while with an integer column for data partitioning. | **Partition options**: Dynamic range.<br>**Partition column**: Specify the column used to partition data. If not specified, the primary key column is used. |
| Load a large amount of data by using a custom query, with physical partitions. | **Partition option**: Physical partitions of table.<br>**Query**: `SELECT * FROM <TABLENAME> PARTITION("?AdfTabularPartitionName") WHERE <your_additional_where_clause>`.<br>**Partition name**: Specify the partition name(s) to copy data from. If not specified, the service automatically detects the physical partitions on the table you specified in the Amazon RDS For Oracle dataset.<br><br>During execution, the service replaces `?AdfTabularPartitionName` with the actual partition name, and sends to Amazon RDS For Oracle. |
| Load a large amount of data by using a custom query, without physical partitions, while with an integer column for data partitioning. | **Partition options**: Dynamic range.<br>**Query**: `SELECT * FROM <TABLENAME> WHERE ?AdfRangePartitionColumnName <= ?AdfRangePartitionUpbound AND ?AdfRangePartitionColumnName >= ?AdfRangePartitionLowbound AND <your_additional_where_clause>`.<br>**Partition column**: Specify the column used to partition data. You can partition against the column with integer data type.<br>**Partition upper bound** and **Partition lower bound**: Specify if you want to filter against partition column to retrieve data only between the lower and upper range.<br><br>During execution, the service replaces `?AdfRangePartitionColumnName`, `?AdfRangePartitionUpbound`, and `?AdfRangePartitionLowbound` with the actual column name and value ranges for each partition, and sends to Amazon RDS For Oracle. <br>For example, if your partition column "ID" is set with the lower bound as 1 and the upper bound as 80, with parallel copy set as 4, the service retrieves data by 4 partitions. Their IDs are between [1,20], [21, 40], [41, 60], and [61, 80], respectively. |

> [!TIP]
> When copying data from a non-partitioned table, you can use "Dynamic range" partition option to partition against an integer column. If your source data doesn't have such type of column, you can leverage [ORA_HASH]( https://docs.oracle.com/database/121/SQLRF/functions136.htm) function in source query to generate a column and use it as partition column.


## Table summary

The following tables contain more information about the copy activity in Amazon RDS For Oracle.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your Amazon RDS For Oracle connection> |Yes|connection|
|**Use query** |The way to read data from Amazon RDS For Oracle. Apply **Table** to read data from the specified table or apply **Query** to read data using queries.| • **Table**<br>  • **Query** |No| / |
| For ***Table*** | | | | |
|**schema name** |Name of the schema.|< your schema name >| No |schema|
|**table name** |Name of the table.|< your table name >| No |table|
| For ***Query*** | | | | |
| **Query** | Use the custom SQL query to read data. An example is `SELECT * FROM MyTable`. Note that the query should not end with a semicolon (;). <br>When you enable partitioned load, you need to hook any corresponding built-in partition parameters in your query. For examples, see the [Parallel copy from Amazon RDS For Oracle](#parallel-copy-from-amazon-rds-for-oracle) section.| < SQL queries > | No | oracleReaderQuery |
| | | | | |
| **Partition names** | The list of physical partitions that needs to be copied. If you use a query to retrieve the source data, hook `?AdfTabularPartitionName` in the WHERE clause.  | < your partition names > | No | partitionNames | 
| **Partition column name** | The name of the source column **in integer type** that will be used by range partitioning for parallel copy. If not specified, the primary key of the table is auto-detected and used as the partition column. | < your partition column names > | No | partitionColumnName | 
| **Partition upper bound** | The maximum value of the partition column to copy data out. If you use a query to retrieve the source data, hook `?AdfRangePartitionUpbound` in the WHERE clause. | < your partition upper bound > | No | partitionUpperBound | 
| **Partition lower bound** | The minimum value of the partition column to copy data out. If you use a query to retrieve the source data, hook `?AdfRangePartitionLowbound` in the WHERE clause. | < your partition lower bound > | No | partitionLowerBound |
|**Query timeout (minutes)** | The timeout for query command execution, default is 120 minutes. |timespan |No |queryTimeout|
| **Precision** | The maximum number of significant decimal digits. Allowed values range from 1 to 256. Defaults to 256 if not specified. | < your precision > | No | numberPrecision |
| **Scale** | The number of digits after the decimal point. Allowed values range from 0 to 130 and must be less than or equal to the precision. Defaults to 130 if not specified. | < your scale > | No | numberScale |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [Amazon RDS For Oracle overview](connector-amazon-rds-for-oracle-overview.md)
