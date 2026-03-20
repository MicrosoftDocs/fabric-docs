---
title: Configure SAP HANA in a copy activity
description: This article explains how to copy data using SAP HANA.
ms.topic: how-to
ms.date: 02/28/2026
ms.custom:
  - template-how-to
  - connectors
---

# Configure SAP HANA in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from SAP HANA.

## Prerequisites

To use the SAP HANA connector, you need to:

- Set up an on-premises data gateway. For more information, see [How to access on-premises data sources in Data Factory](how-to-access-on-premises-data.md).
- Install the SAP HANA ODBC driver on the gateway machine. You can download the SAP HANA ODBC driver from the [SAP Software Download Center](https://support.sap.com/swdc). Search with the keyword **SAP HANA CLIENT for Windows**.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for SAP HANA under the **Source** tab of a copy activity.

The following properties are **required**:

- **Connection**: Select an SAP HANA connection from the connection list. If the connection doesn't exist, then create a new SAP HANA connection.

- **Use query**: You can choose either **Table** or **Query** as your use query. The following list describes the configuration of each setting.
    - **Table**: Select the table in your database from the drop-down list. Or select **Enter manually** to enter your schema and table name manually.
    - **Query**: Specify the SQL query to read data from the SAP HANA instance. 

Under **Advanced**, you can specify the following fields:

- **Partition option**: Specifies the data partitioning options used to load data from SAP HANA. When a partition option is enabled (that is, not **None**), the degree of parallelism to concurrently load data from SAP HANA is controlled by the **Degree of copy parallelism** setting on the copy activity. The allowed values are:
    - **None** (default): No partitioning.
    - **Physical partitions of table**: The service automatically detects the physical partition type of the specified SAP HANA table and chooses the corresponding partition strategy. For more information, go to [Parallel copy from SAP HANA](#parallel-copy-from-sap-hana) section. This option is not avaliable when you use query to read table.
    - **Dynamic range**: When using a query to retrieve the source data, hook `?AdfHanaDynamicRangePartitionCondition` in the WHERE clause. For more information, see the [Parallel copy from SAP HANA](#parallel-copy-from-sap-hana) section.
        - **Partition column name**: Specify the name of the source column that is used by partition for parallel copy. If not specified, the index or the primary key of the table is detected automatically and used as the partition column.

- **Packet size (KB)**: Specifies the network packet size in kilobytes to split data to multiple blocks. If you have large amount of data to copy, increasing the packet size can increase reading speed from SAP HANA in most cases.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Parallel copy from SAP HANA

The SAP HANA connector provides built-in data partitioning to copy data from SAP HANA in parallel. You can find data partitioning options on the **Source** tab of the copy activity.

When you enable partitioned copy, the service runs parallel queries against your SAP HANA source to retrieve data by partitions. The parallel degree is controlled by the **Degree of copy parallelism** setting on the copy activity. For example, if you set the degree of copy parallelism to four, the service concurrently generates and runs four queries based on your specified partition option and settings, and each query retrieves a portion of data from your SAP HANA.

You are suggested to enable parallel copy with data partitioning especially when you ingest large amount of data from your SAP HANA. The following are suggested configurations for different scenarios. When copying data into file-based data store, it's recommended to write to a folder as multiple files (only specify folder name), in which case the performance is better than writing to a single file.

| Scenario | Suggested configuration |
|:---|:---|
| Full load from large table. | **Partition option**: Physical partitions of table. <br><br>During execution, the service automatically detects the physical partition type of the specified SAP HANA table, and chooses the corresponding partition strategy:<br>- **Range Partitioning**: Get the partition column and partition ranges defined for the table, then copy the data by range.<br>- **Hash Partitioning**: Use hash partition key as partition column, then partition and copy the data based on ranges calculated by the service.<br>- **Round-Robin Partitioning or No Partition**: Use primary key as partition column, then partition and copy the data based on ranges calculated by the service. |
| Load large amount of data by using a custom query. | **Partition option**: Dynamic range partition.<br>**Query**: `SELECT * FROM <TABLENAME> WHERE (?AdfHanaDynamicRangePartitionCondition) AND <your_additional_where_clause>>`.<br>**Partition column**: Specify the column used to apply dynamic range partition.<br><br>During execution, the service first calculates the value ranges of the specified partition column, by evenly distributing the rows in a number of buckets according to the number of distinct partition column values and the parallel copy setting, then replaces `?AdfHanaDynamicRangePartitionCondition` with filtering the partition column value range for each partition, and sends to SAP HANA.<br><br>If you want to use multiple columns as partition column, you can concatenate the values of each column as one column in the query and specify it as the partition column, like `SELECT * FROM (SELECT *, CONCAT(<KeyColumn1>, <KeyColumn2>) AS PARTITIONCOLUMN FROM <TABLENAME>) WHERE (?AdfHanaDynamicRangePartitionCondition)`. |

## Data type mapping for SAP HANA

When copying data from SAP HANA, the following mappings are used from SAP HANA data types to interim data types used by the service internally.

| SAP HANA data type | Interim data type |
|:---|:---|
| ALPHANUM | String |
| BIGINT | Int64 |
| BINARY | Byte array|
| BINTEXT | String |
| BLOB | Byte array |
| BOOL | Byte |
| CLOB | String |
| DATE | DateTime |
| DECIMAL | Decimal |
| DOUBLE | Double |
| FLOAT | Double |
| INTEGER | Int32 |
| NCLOB | String |
| NVARCHAR | String |
| REAL | Single |
| SECONDDATE | DateTime |
| SHORTTEXT | String |
| SMALLDECIMAL | Decimal |
| SMALLINT | Int16 |
| STGEOMETRYTYPE | Byte array |
| STPOINTTYPE | Byte array |
| TEXT | String |
| TIME | TimeSpan |
| TINYINT | Byte |
| VARCHAR | String |
| TIMESTAMP | DateTime |
| VARBINARY | Byte array|

## Table summary

The following table contains more information about the copy activity in SAP HANA.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|< your SAP HANA connection > |Yes|connection|
|**Use query** |The way to read data from SAP HANA.|/ |Yes |/|
|**Table** | The name of the table to read data. |< name of your source table>|Yes (if **Use query** is **Table**) |typeProperties (under *`typeProperties`* -> *`source`*)<br>&nbsp; - schema<br>&nbsp; - table|
|**Query**| The SQL query to read data from SAP HANA. |< your SQL query>|Yes (if **Use query** is **Query**)|query|
|**Partition option**|The data partitioning options used to load data from SAP HANA. |• None<br>• PhysicalPartitionsOfTable<br>• SapHanaDynamicRange|No|partitionOption|
|**Partition column name**|The name of the source column used by partition for parallel copy.|< your partition column >|Yes (when using Dynamic range partition)|partitionColumnName (under *`partitionSettings`*)|
|**Packet size (KB)** |The network packet size (in kilobytes) to split data to multiple blocks.|< packet size >|No|packetSize|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|• Name<br>• Value|No |additionalColumns:<br>• name<br>• value|

## Related content

- [SAP HANA connector overview](connector-sap-hana-overview.md)
- [Set up your SAP HANA database connection](connector-sap-hana-database.md)
