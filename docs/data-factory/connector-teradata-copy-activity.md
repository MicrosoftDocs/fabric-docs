---
title: Configure Teradata in a copy activity
description: This article explains how to copy data using Teradata.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 01/22/2026
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure Teradata in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to Teradata.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

> [!TIP]
> To load data from Teradata efficiently by using data partitioning, learn more from [Parallel copy from Teradata](#parallel-copy-from-teradata) section.

The following properties are supported for Teradata under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-teradata/source.png" alt-text="Screenshot showing source tab and the list of properties." lightbox="./media/connector-teradata/source.png":::

The following properties are **required**:

- **Connection**: Select a Teradata connection from the connection list. If no connection exists, then create a new Teradata connection.

- **Use query**: Select **Table** or **Query**.

  - If you select **Table**:

    - **Table**: Specify the name of the table in the Teradata to read data. Select the table from the drop-down list or select **Enter manually** to enter the schema and table name.

  - If you select **Query**:

    - **Query**: Specify the custom SQL query to read data.

      :::image type="content" source="./media/connector-teradata/query.png" alt-text="Screenshot showing query." lightbox="./media/connector-teradata/query.png":::

Under **Advanced**, you can specify the following fields:

- **Partition option**: Specifies the data partitioning options used to load data from Teradata. Allow values are: **None** (default), **DynamicRange** and **Hash**. When a partition option is enabled (that is, not `None`), the degree of parallelism to concurrently load data from Teradata is controlled by the **Degree of copy parallelism** in the copy activity settings tab.

  - **None**: Choose this setting to not use a partition.

  - **Dynamic range**: When you use a query with parallel enabled, the range partition parameter(`?DfDynamicRangePartitionCondition`) is needed. Sample query: `SELECT * FROM <TableName> WHERE ?DfDynamicRangePartitionCondition`.

    - **Partition column name**: Specify the name of the source column in **integer or date/datetime** type (`int`, `smallint`, `bigint`, `date`, `smalldatetime`, `datetime`, `datetime2`, or `datetimeoffset`) that's used by range partitioning for parallel copy. If not specified, the index or the primary key of the table is autodetected and used as the partition column.
    - **Partition upper bound**: Specify the maximum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result are partitioned and copied.
    - **Partition lower bound**: Specify the minimum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result are partitioned and copied.

        :::image type="content" source="./media/connector-teradata/dynamic-range.png" alt-text="Screenshot showing dynamic range." lightbox="./media/connector-teradata/dynamic-range.png":::

  - **Hash**: When using query with parallel enabled, hash partition parameter (`?AdfHashPartitionCondition`) are needed. Sample query: `select * from <TableName> where ?AdfHashPartitionCondition`.
    - **Partition column name**: Specify the name of the source column in **integer or date/datetime** type (`int`, `smallint`, `bigint`, `date`, `smalldatetime`, `datetime`, `datetime2`, or `datetimeoffset`) that's used by range partitioning for parallel copy. If not specified, the index or the primary key of the table is autodetected and used as the partition column.

        :::image type="content" source="./media/connector-teradata/hash.png" alt-text="Screenshot showing hash." lightbox="./media/connector-teradata/hash.png":::

- **Additional columns**: Add more data columns to store source files' relative path or static value. Expression is supported for the latter.

## Destination

The following properties are supported for Teradata under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-teradata/destination.png" alt-text="Screenshot showing destination tab.":::

The following properties are **required**:

- **Connection**: Select a Teradata connection from the connection list. If no connection exists, then create a new Teradata connection.

- **Table**: Specify the name of the table in the Teradata to write data. Select the table from the drop-down list or select **Enter manually** to enter the schema and table name.

Under **Advanced**, you can specify the following fields:

- **Additional Teradata format options**: Specify additional format options which will be used in COPY statement to load data. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Teradata DATE Format](https://www.teradatapoint.com/teradata/teradata-date-format.htm). This property only works for direct copy from DelimitedText format source to Teradata.

#### Direct copy to Teradata

If your source data store and format meet the criteria described in this section, you can use the Copy activity to directly copy from source to Teradata. The service checks the settings and fails the Copy activity run if the following criteria isn't met:

- The **source connection** is [**Azure Blob storage**](connector-azure-blob-storage.md) and [**Azure Data Lake Storage Gen2**](connector-azure-data-lake-storage-gen2.md) with **account key** and **shared access signature** authentication.

- The **source data format** is **Parquet** and **DelimitedText** with the following configurations:

    - For **Parquet** format, the compression codec is **None** or **Snappy**.

    - For **DelimitedText** format:
        - `rowDelimiter` is **\n**.
        - `compression` can be **no compression** or **gzip**. If **gzip** compression is selected, the file must end with extension *.gz*.
        - `encodingName` is left as default or set to **UTF-8**.
        - `quoteChar` is **double quote** `"` or **empty string**.
        - `escapeChar` is **double quote** `"` or **empty string**.
        - `nullValue` is **Null** or **empty string**.

- In the Copy activity source: 

   - Only static path is allowed when using Azure Data Lake Storage Gen2.
   - Only static path and `prefix` is allowed when using Azure Blob Storage.

   Static paths will serve as prefixes when copied to Teradata.

#### Staged copy to Teradata

When your source data store or format isn't natively compatible with the Teradata COPY command, as mentioned in the last section, enable the built-in staged copy using an interim Azure Blob storage instance. The staged copy feature also provides you with better throughput. The service automatically converts the data to meet the data format requirements of Teradata. It then invokes the COPY command to load data into Teradata. Finally, it cleans up your temporary data from the blob storage. 

To use this feature, create an [Azure Blob storage connection](connector-azure-blob-storage.md) that refers to the Azure storage account as the interim staging. Then specify the `enableStaging` and `stagingSettings` properties in the Copy activity.

> [!NOTE]
> The staging Azure Blob Storage connection need to use **account key** or **shared access signature** authentication as required by the Teradata COPY command.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Data type mapping for Teradata

When copying data from Teradata, the following mappings are used from Teradata data types to interim data types used by the service internally.

| Teradata data type | Interim service data type |
|:--- |:--- |
| BigInt | Int64 |
| Blob | Byte[] |
| Byte | Byte[] |
| ByteInt | Int16 |
| Char | String |
| Clob | String |
| Date | Date |
| Decimal | Decimal   |
| Double | Double |
| Graphic | String |
| Integer | Int32 |
| Interval Day  | TimeSpan |
| Interval Day To Hour | TimeSpan |
| Interval Day To Minute | TimeSpan |
| Interval Day To Second | TimeSpan |
| Interval Hour | TimeSpan |
| Interval Hour To Minute | TimeSpan |
| Interval Hour To Second | TimeSpan |
| Interval Minute | TimeSpan |
| Interval Minute To Second | TimeSpan |
| Interval Month | String |
| Interval Second | TimeSpan |
| Interval Year | String |
| Interval Year To Month | String |
| Number | Double |
| Period (Date) | String |
| Period (Time) | String |
| Period (Time With Time Zone) | String |
| Period (Timestamp) | String |
| Period (Timestamp With Time Zone) | String |
| SmallInt | Int16 |
| Time | Time |
| Time With Time Zone | String   |
| Timestamp | DateTime |
| Timestamp With Time Zone | DateTimeOffset |
| VarByte | Byte[] |
| VarChar | String |
| VarGraphic | String |
| Xml | String |

## Parallel copy from Teradata

The Teradata connector provides built-in data partitioning to copy data from Teradata in parallel. You can find data partitioning options on the **Source** table of the copy activity.

When you enable partitioned copy, the service runs parallel queries against your Teradata source to load data by partitions. The parallel degree is controlled by the **Degree of copy parallelism** in the copy activity settings tab. For example, if you set **Degree of copy parallelism** to four, the service concurrently generates and runs four queries based on your specified partition option and settings, and each query retrieves a portion of data from your Teradata.

You are suggested to enable parallel copy with data partitioning especially when you load large amount of data from your Teradata. The following are suggested configurations for different scenarios. When copying data into file-based data store, it's recommended to write to a folder as multiple files (only specify folder name), in which case the performance is better than writing to a single file.

| Scenario                                                     | Suggested settings                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Full load from large table.                                   | **Partition option**: Hash. <br><br/>During execution, the service automatically detects the primary index column, applies a hash against it, and copies data by partitions. |
| Load large amount of data by using a custom query.                 | **Partition option**: Hash.<br>**Query**: `SELECT * FROM <TABLENAME> WHERE ?AdfHashPartitionCondition AND <your_additional_where_clause>`.<br>**Partition column**: Specify the column used for apply hash partition. If not specified, the service automatically detects the PK column of the table you specified in the Teradata data.<br><br>During execution, the service replaces `?AdfHashPartitionCondition` with the hash partition logic, and sends to Teradata. |
| Load large amount of data by using a custom query, having an integer column with evenly distributed value for range partitioning. | **Partition options**: Dynamic range partition.<br>**Query**: `SELECT * FROM <TABLENAME> WHERE ?AdfRangePartitionColumnName <= ?AdfRangePartitionUpbound AND ?AdfRangePartitionColumnName >= ?AdfRangePartitionLowbound AND <your_additional_where_clause>`.<br>**Partition column**: Specify the column used to partition data. You can partition against the column with integer data type.<br>**Partition upper bound** and **partition lower bound**: Specify if you want to filter against the partition column to retrieve data only between the lower and upper range.<br><br>During execution, the service replaces `?AdfRangePartitionColumnName`, `?AdfRangePartitionUpbound`, and `?AdfRangePartitionLowbound` with the actual column name and value ranges for each partition, and sends to Teradata. <br>For example, if your partition column "ID" set with the lower bound as 1 and the upper bound as 80, with parallel copy set as 4, the service retrieves data by 4 partitions. Their IDs are between [1,20], [21, 40], [41, 60], and [61, 80], respectively. |

**Example: query with hash partition**

```json
"source": {
    "type": "TeradataSource",
    "query": "SELECT * FROM <TABLENAME> WHERE ?AdfHashPartitionCondition AND <your_additional_where_clause>",
    "partitionOption": "Hash",
    "partitionSettings": {
        "partitionColumnName": "<hash_partition_column_name>"
    }
}
```

**Example: query with dynamic range partition**

```json
"source": {
    "type": "TeradataSource",
    "query": "SELECT * FROM <TABLENAME> WHERE ?AdfRangePartitionColumnName <= ?AdfRangePartitionUpbound AND ?AdfRangePartitionColumnName >= ?AdfRangePartitionLowbound AND <your_additional_where_clause>",
    "partitionOption": "DynamicRange",
    "partitionSettings": {
        "partitionColumnName": "<dynamic_range_partition_column_name>",
        "partitionUpperBound": "<upper_value_of_partition_column>",
        "partitionLowerBound": "<lower_value_of_partition_column>"
    }
}
```

## Table summary

The following tables contain more information about a copy activity in a Teradata.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|< your Teradata connection >|Yes|connection|
|**Use query** |The way to read data from Teradata. Apply **Table** to read data from the specified table or apply **Query** to read data using queries.| • **Table**<br>  • **Query** |No| / |
| For ***Table*** | | | | |
|**schema name** |Name of the schema.|< your schema name >| No |schema|
|**table name** |Name of the table.|< your table name >| No |table|
| For ***Query*** | | | | |
| **Query** | Use the custom SQL query to read data. | < SQL queries > | No | query |
| | | | | |
| **Partition option** | The data partitioning options used to load data from Teradata. |• **None** <br>• **Dynamic range** <br>• **Hash** | No | / |
| For ***Dynamic range*** | | | | |
| **Partition column name** | Specify the name of the source column in **integer or date/datetime** type (`int`, `smallint`, `bigint`, `date`, `smalldatetime`, `datetime`, `datetime2`, or `datetimeoffset`) that's used by range partitioning for parallel copy.<br> If not specified, the index or the primary key of the table is autodetected and used as the partition column. | < your partition column names > | No | partitionColumnName |
| **Partition upper bound** | Specify the maximum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result are partitioned and copied. | < your partition upper bound > | No | partitionUpperBound |
| **Partition lower bound** | Specify the minimum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result are partitioned and copied. | < your partition lower bound > | No | partitionLowerBound |
| For ***Hash*** | | | | |
| **Partition column name** | Specify the name of the source column in **integer or date/datetime** type (`int`, `smallint`, `bigint`, `date`, `smalldatetime`, `datetime`, `datetime2`, or `datetimeoffset`) that's used by range partitioning for parallel copy.<br> If not specified, the index or the primary key of the table is autodetected and used as the partition column. | < your partition column names > | No | partitionColumnName |
| | | | | |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. |• Name <br>• Value | No | additionalColumns:<br> • name<br>• value|

### Destination information

|Name |Description |Value |Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the destination data store.|< your Teradata connection >|Yes|connection|
|**Table** |Your destination data table to write data.|< your table name >|Yes|/|
|**schema name** |Name of the schema.|< your schema name >| No |schema|
|**table name** |Name of the table.|< your table name >| No |table|
| **Additional Teradata format options** | Specify additional format options which will be used in COPY statement to load data. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Teradata DATE Format](https://www.teradatapoint.com/teradata/teradata-date-format.htm). This property only works for direct copy from DelimitedText format source to Teradata. | • DATE_FORMAT<br>• TIME_FORMAT<br>• TIMESTAMP_FORMAT| No | additionalFormatOptions: <br>• DATE_FORMAT<br>• TIME_FORMAT <br>• TIMESTAMP_FORMAT |

## Related content

- [Teradata connector overview](connector-teradata-database-overview.md)
