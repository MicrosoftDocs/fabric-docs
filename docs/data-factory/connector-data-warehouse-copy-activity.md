---
title: How to configure Data Warehouse in copy activity in Data Factory in Microsoft Fabric
description: This article explains how to copy data using Data Warehouse.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/20/2023
ms.custom: template-how-to 
---

# How to configure in Copy data in Data Warehouse

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article outlines how to use the copy activity in data pipeline to copy data from and to Data Warehouse.

## Supported configuration

For the configuration of each tab under copy activity, see the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for Data Warehouse as **Source** in a copy activity.

:::image type="content" source="./media/connector-data-warehouse/source.png" alt-text="Screenshot showing source tab and the list of properties.":::

The following some properties are **required**:

- **Data store type**: Select **Workspace**.
- **Workspace data store type**:  Select **Data Warehouse** connection from the data store list.
- **Data Warehouse**: Select an existing **Data Warehouse** from the workspace. If not exist, then create a new Data Warehouse by clicking on **New**.
- **Use query**: Select **Table**, **Query** or **Stored procedure**.

  - If select **Table**, choose an existing table from the table list or specify table name as source.

    :::image type="content" source="./media/connector-data-warehouse/table.png" alt-text="Screenshot showing use query of table.":::

  - If select **Query**, use the custom SQL query to read data.

    :::image type="content" source="./media/connector-data-warehouse/query.png" alt-text="Screenshot showing use query of query.":::

  - If select **Stored procedure**, choose an existing one from the Stored procedure specify list or specify Stored procedure name as source.

    :::image type="content" source="./media/connector-data-warehouse/stored-procedure.png" alt-text="Screenshot showing use query of stored procedure.":::

Under **Advanced**, you can specify the following fields:

- **Query timeout (minutes)**: Set the timeout for query command execution.
- **Isolation level**: Specifies the transaction locking behavior for source.
- **Partition option**: Select **None** or **Dynamic range**.
  If you select **Dynamic range**: When using query with parallel enabled, range partition parameter(`?AdfDynamicRangePartitionCondition`) is needed. Sample query: `SELECT * FROM <TableName> WHERE ?AdfDynamicRangePartitionCondition`.

  :::image type="content" source="./media/connector-data-warehouse/dynamic-range.png" alt-text="Screenshot showing dynamic range.":::

    - **Partition column name**: Specifies partition column name.
    - **Partition upper bound**: The maximum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result will be partitioned and copied.
    - **Partition lower bound**: The minimum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result will be partitioned and copied.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

    :::image type="content" source="./media/connector-data-warehouse/additional-columns.png" alt-text="Screenshot showing additional columns.":::

### Destination

The following properties are supported for Data Warehouse as **Destination** in a copy activity.

:::image type="content" source="./media/connector-data-warehouse/destination.png" alt-text="Screenshot showing destination tab and the list of properties.":::

- **Data store type**: Select **Workspace**.
- **Workspace data store type**:  Select **Data Warehouse** connection from the data store list.
- **Data Warehouse**: Select an existing **Data Warehouse** from the workspace. If not exist, then create a new Data Warehouse by clicking on **New**.
- **Table**: Choose an existing table from the table list or specify a table name as destination.

Under **Advanced**, you can specify the following fields:

- **Copy command settings**: Specify the copy command properties.

:::image type="content" source="./media/connector-data-warehouse/default-values.png" alt-text="Screenshot showing default values of copy command settings.":::

- **Table options**: Specifies whether to automatically create the destination table if not exists based on the source schema.
- **Pre-copy script**: Specify a SQL query to run before writing data into Data Warehouse in each run. Use this property to clean up the preloaded data.
- **Write batch timeout**: Specify the wait time for the batch insert operation to finish before it times out.  
- **Disable performance metrics analytics**: The service collects metrics for copy performance optimization and recommendations, which introduce additional master DB access.

If your source data is in **Azure Blob Storage** or **Azure Data Lake Storage Gen2**, and the format is COPY statement compatible, copy activity directly invokes COPY command to let Data Warehouse to pull the data from source.

1. The source data and format are with the following types and authentication methods:

    |**Supported source data store type** |**Supported format**  |**Supported source authentication type**|
    |:---|:---|:---|
    |Azure Blob Storage |Delimited text Parquet|Anonymous authentication Shared access signature authentication|
    |Azure Data Lake Storage Gen2 |Delimited text Parquet|Shared access signature authentication |

1. Format settings are with the following:<br>
    a. For **Parquet**: compression can be no compression, Snappy, or GZip.<br>
    b. For **Delimited text**:<br>
            i. `rowDelimiter` is explicitly set as **single character** or "**\r\n**", the default value is not supported.<br>
            ii. `nullValue` is left as default or set to **empty string** ("").<br>
            iii. `encodingName` is left as default or set to **utf-8 or utf-16**.<br>
            iv. escpae char requirement is no longer needed.<br>
            v. compression can be **no compression** or GZip.

1. `wildcardFilename` requirement is no longer needed. If source is a folder, customer can either use File path mode, set path in File path, and left file name as empty, or use Wildcard file path mode, set path in wildcard file path.
1. `modifiedDateTimeStart`, `modifiedDateTimeEnd`, prefix, `enablePartitionDiscovery` and `additionalColumns` are not specified.<br>

    If your source data store and format isn't originally supported by COPY statement, use the Staged copy by using COPY statement feature instead. The staged copy feature also provides you with better throughput. It automatically converts the data into COPY statement compatible format, then calls COPY statement to load data into Data Warehouse.<br>
    `wildardFolderPath` can be supported, `wildcardFilename` requirement is no longer needed.

### Mapping

For **Mapping** tab configuration, see Mapping.

### Settings

For **Settings** tab configuration, see Settings.

## Table summary

To learn more information about copy activity in Data Warehouse, see the following table.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**Workspace**|Yes|/|
|**Workspace data store type**|Select **Data Warehouse** from the data store type list.|\<your workspace data store type> |Yes|type|
|**Data Warehouse** |Select an existing **Data Warehouse** from the workspace. If not exist, then create a new Data Warehouse by clicking on **New**.|\<your data warehouse>|Yes|name|
|**Use query** |Select **Tables**, **Query** or **Stored procedure**. |**Tables**<br>**Query**<br>**Stored procedure**|No|typeProperties|
|**Query timeout (minutes)**|Set the timeout for query command execution.|timespan |No |queryTimeout|
|**Isolation level** |Specifies the transaction locking behavior for source. |•None<br>•Snapshot|No |isolationLevel|
|**Partition option**|Select **None** or **Dynamic range**.|•None<br>•Dynamic range|No|partitionOption|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.| •Name<br>•Value|No |additionalColumns:<br>- name<br>- value|

### Destination information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**Workspace**|Yes|/|
|**Workspace data store type**|Select **Data Warehouse** from the data store type list.|\<your workspace data store type> |Yes|type|
|**Data Warehouse** |Select an existing **Data Warehouse** from the workspace. If not exist, then create a new Data Warehouse by clicking on **New**.|\<your data warehouse>|Yes|name|
|**Table** |Choose an existing table from the table list or specify a table name as destination.|\<name of your destination table>|Yes|schema <br> table|
|**Copy command settings**|Specify the copy command properties.|\<default values> |No |copyCommandSettings:<br>defaultValues:<br>columnName<br>defaultValue|
|**Table option**|Specifies whether to automatically create the destination table if not exists based on the source schema.|•None<br>•Auto create table|No|tableOption|
|**Pre-copy script** |Specify a SQL query to run before writing data into Data Warehouse in each run. Use this property to clean up the preloaded data.|\<pre-copy script>|No|preCopyScript|
|**Write batch timeout** |Specify the wait time for the batch insert operation to finish before it times out. |\<write batch timeout>|No |writeBatchTimeout|
|**Disable performance metrics analytics**|The service collects metrics for copy performance optimization and recommendations, which introduce additional master DB access.|select or unselect|No|disableMetricsCollection|

## Next Steps

[Data Warehouse connector overview](connector-data-warehouse-overview.md)