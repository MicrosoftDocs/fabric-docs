---
title: How to configure Data Warehouse in copy activity in Data Factory in Microsoft Fabric
description: This article explains how to copy data using Data Warehouse.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# How to configure the Data Warehouse connector for the copy activity in Data Factory in Microsoft Fabric

This article outlines how to use the copy activity in data pipeline to copy data from and to a Data Warehouse.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For the **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for Data Warehouse as **Source** in a copy activity.

:::image type="content" source="./media/connector-data-warehouse/source.png" alt-text="Screenshot showing source tab and the list of properties." lightbox="./media/connector-data-warehouse/source.png":::

The following properties are **required**:

- **Data store type**: Select **Workspace**.
- **Workspace data store type**: Select **Data Warehouse** from the data store type list.
- **Data Warehouse**: Select an existing **Data Warehouse** from the workspace.
- **Use query**: Select **Table**, **Query**, or **Stored procedure**.

  - If you select **Table**, choose an existing table from the table list, or specify a table name manually by selecting the **Edit** box.

    :::image type="content" source="./media/connector-data-warehouse/table.png" alt-text="Screenshot showing use query of table." lightbox="./media/connector-data-warehouse/table.png":::

  - If you select **Query**, use the custom SQL query editor to write a SQL query that retrieves the source data.

    :::image type="content" source="./media/connector-data-warehouse/query.png" alt-text="Screenshot showing use query of query." lightbox="./media/connector-data-warehouse/query.png":::

  - If you select **Stored procedure**, choose an existing stored procedure from the drop-down list, or specify a stored procedure name as the source by selecting the **Edit** box.

    :::image type="content" source="./media/connector-data-warehouse/stored-procedure.png" alt-text="Screenshot showing use query of stored procedure."lightbox="./media/connector-data-warehouse/stored-procedure.png":::

Under **Advanced**, you can specify the following fields:

- **Query timeout (minutes)**: Timeout for query command execution, with a default of 120 minutes. If this property is set, the allowed values are in the format of a timespan, such as "02:00:00" (120 minutes).
- **Isolation level**: Specify the transaction locking behavior for the SQL source.
- **Partition option**: Specify the data partitioning options used to load data from Data Warehouse. You can select **None** or **Dynamic range**.

  If you select **Dynamic range**, the range partition parameter(`?AdfDynamicRangePartitionCondition`) is needed when using query with parallel enabled. Sample query: `SELECT * FROM <TableName> WHERE ?AdfDynamicRangePartitionCondition`.

  :::image type="content" source="./media/connector-data-warehouse/dynamic-range.png" alt-text="Screenshot showing dynamic range."lightbox="./media/connector-data-warehouse/dynamic-range.png":::

  - **Partition column name**: Specify the name of the source column **in integer or date/datetime type** (`int`, `smallint`, `bigint`, `date`, `smalldatetime`, `datetime`, `datetime2`, or `datetimeoffset`) that is used by range partitioning for parallel copy. If not specified, the index or the primary key of the table is detected automatically and used as the partition column.
  - **Partition upper bound**: The maximum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result are partitioned and copied.
  - **Partition lower bound**: The minimum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result are partitioned and copied.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

    :::image type="content" source="./media/connector-data-warehouse/additional-columns.png" alt-text="Screenshot showing additional columns." lightbox="./media/connector-data-warehouse/additional-columns.png":::

### Destination

The following properties are supported for Data Warehouse as **Destination** in a copy activity.

:::image type="content" source="./media/connector-data-warehouse/destination.png" alt-text="Screenshot showing destination tab and the list of properties." lightbox="./media/connector-data-warehouse/destination.png":::

The following properties are **required**:

- **Data store type**: Select **Workspace**.
- **Workspace data store type**: Select **Data Warehouse** from the data store type list.
- **Data Warehouse**: Select an existing **Data Warehouse** from the workspace.
- **Table**: Choose an existing table from the table list or specify a table name as destination.

Under **Advanced**, you can specify the following fields:

- **Copy command settings**: Specify copy command properties.

    :::image type="content" source="./media/connector-data-warehouse/default-values.png" alt-text="Screenshot showing default values of copy command settings." lightbox="./media/connector-data-warehouse/default-values.png":::

- **Table options**: Specify whether to automatically create the destination table if none exists based on the source schema. You can select **None** or **Auto create table**.
- **Pre-copy script**: Specify a SQL query to run before writing data into Data Warehouse in each run. Use this property to clean up the preloaded data.
- **Write batch timeout**: The wait time for the batch insert operation to finish before it times out. The allowed values are in the format of a timespan. The default value is "00:30:00" (30 minutes).
- **Disable performance metrics analytics**: The service collects metrics for copy performance optimization and recommendations. If you're concerned with this behavior, turn off this feature.

If your source data is in **Azure Blob Storage** or **Azure Data Lake Storage Gen2**, and the format is COPY statement compatible, copy activity directly invokes the COPY command to let Data Warehouse pull the data from the source.

1. The source data and format contain the following types and authentication methods:

    |**Supported source data store type** |**Supported format** |**Supported source authentication type**|
    |:---|:---|:---|
    |Azure Blob Storage |Delimited text<br> Parquet|Anonymous authentication<br> Shared access signature authentication|
    |Azure Data Lake Storage Gen2 |Delimited text<br> Parquet|Shared access signature authentication |

1. The following Format settings can be set:<br>
   1. For **Parquet**: compression can be no compression, Snappy, or GZip.<br>
   1. For **Delimited text**:<br>
      1. `rowDelimiter` is explicitly set as **single character** or "**\r\n**", the default value isn't supported.<br>
      1. `nullValue` is left as default or set to **empty string ("")**.<br>
      1. `encodingName` is left as default or set to **utf-8 or utf-16**.<br>
      1. `skipLineCount` is left as default or set to 0.<br>
      1. compression can be **no compression** or **GZip**.

1. If your source is a folder, `recursive` in a copy activity must be set to true.
1. `modifiedDateTimeStart`, `modifiedDateTimeEnd`, `prefix`, `enablePartitionDiscovery`, and `additionalColumns` aren't specified.<br>

If your source data store and format isn't originally supported by a COPY statement, use the Staged copy by using the COPY statement feature instead. The staged copy feature also provides you with better throughput. It automatically converts the data into a COPY statement compatible format, then calls a COPY statement to load data into Data Warehouse.

### Mapping

For the **Mapping** tab configuration, go to [Mapping](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For the **Settings** tab configuration, go to [Settings](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

To following tables contain more information about a copy activity in Data Warehouse.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**Workspace**|Yes|/|
|**Workspace data store type**|The section to select your workspace data store type.|**Data Warehouse** |Yes|type|
|**Data Warehouse** |The Data Warehouse that you want to use.|\<your data warehouse>|Yes|endpoint<br>artifactId|
|**Use query** |The way to read data from Data Warehouse. |• Tables<br>• Query<br>• Stored procedure|No|*(under `typeProperties` -> `source`)*<br>• typeProperties:<br>&emsp;schema<br>&emsp;table<br>• sqlReaderQuery<br>• sqlReaderStoredProcedureName|
|**Query timeout (minutes)**|Timeout for query command execution, with a default of 120 minutes. If this property is set, the allowed values are in the format of a timespan, such as "02:00:00" (120 minutes).|timespan |No |queryTimeout|
|**Isolation level** |The transaction locking behavior for source. |• None<br>• Snapshot|No |isolationLevel|
|**Partition option**|The data partitioning options used to load data from Data Warehouse.|• None<br>• Dynamic range|No|partitionOption|
|**Partition column name**|The name of the source column **in integer or date/datetime type** (`int`, `smallint`, `bigint`, `date`, `smalldatetime`, `datetime`, `datetime2`, or `datetimeoffset`) that is used by range partitioning for parallel copy. If not specified, the index or the primary key of the table is detected automatically and used as the partition column.|\<partition column name>|No|partitionColumnName|
|**Partition upper bound**|The maximum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result are partitioned and copied.|\<partition upper bound>|No|partitionUpperBound|
|**Partition lower bound**|The minimum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result are partitioned and copied.|\<partition lower bound>|No|partitionLowerBound|
|**Additional columns** |Add additional data columns to store source files' relative path or static value.| • Name<br>• Value|No |additionalColumns:<br>• name<br>• value|

### Destination information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**Workspace**|Yes|/|
|**Workspace data store type**|The section to select your workspace data store type.|**Data Warehouse**  |Yes|type|
|**Data Warehouse** |The Data Warehouse that you want to use.|\<your data warehouse>|Yes|endpoint<br>artifactId|
|**Table** |The destination table to write data.|\<name of your destination table>|Yes|schema <br> table|
|**Copy command settings**|The copy command property settings. Contains the default value settings.|Default value:<br>• Column<br> • Value|No |copyCommandSettings:<br>defaultValues:<br>• columnName<br>• defaultValue|
|**Table option**|Whether to automatically create the destination table if none exists based on the source schema.|• None<br>• Auto create table|No|tableOption:<br><br>• autoCreate|
|**Pre-copy script** |A SQL query to run before writing data into Data Warehouse in each run. Use this property to clean up the preloaded data.|\<pre-copy script>|No|preCopyScript|
|**Write batch timeout** |The wait time for the batch insert operation to finish before it times out. The allowed values are in the format of a timespan. The default value is "00:30:00" (30 minutes).| timespan |No |writeBatchTimeout|
|**Disable performance metrics analytics**|The service collects metrics for copy performance optimization and recommendations, which introduce additional master DB access.|select or unselect|No|disableMetricsCollection:<br> true or false|

## Next steps

- [Data Warehouse connector overview](connector-data-warehouse-overview.md)
