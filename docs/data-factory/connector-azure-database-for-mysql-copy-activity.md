---
title: Configure Azure Database for MySQL in a copy activity
description: This article explains how to copy data using Azure Database for MySQL.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 06/11/2024
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure Azure Database for MySQL in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to Azure Database for MySQL.

This connector is specialized for

- [Azure Database for MySQL Single Server](/azure/mysql/single-server/single-server-overview)
- [Azure Database for MySQL Flexible Server](/azure/mysql/flexible-server/overview)

To copy data from generic MySQL database located on-premises or in the cloud, use [MySQL connector](connector-mysql-database-overview.md).

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

The following properties are supported for Azure Database for MySQL under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-azure-database-for-mysql/azure-database-for-mysql-source.png" alt-text="Screenshot showing source tab.":::

The following properties are **required**:

- **Connection**: Select an Azure Database for MySQL connection from the connection list. If no connection exists, then create a new Azure Database for MySQL connection by selecting **More**.
- **Use query**: Select from **Table** or **Query**.
    - If you select **Table**:
      - **Table**: Specify the name of the table in the Azure Database for MySQL database to read data. Select the table from the drop-down list or type the table name.

    - If you select **Query**:
      - **Query**: Specify the custom SQL query to read data. For example: `SELECT * FROM MyTable`.

        :::image type="content" source="./media/connector-azure-database-for-mysql/use-query-query.png" alt-text="Screenshot showing Use query - Query." :::

Under **Advanced**, you can specify the following fields:

- **Query timeout (minutes)**: Specify the wait time before the query request times out. Default is 120 minutes (02:00:00).

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Destination

The following properties are supported for Azure Database for MySQL under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-azure-database-for-mysql/azure-database-for-mysql-destination.png" alt-text="Screenshot showing destination tab.":::

- **Connection**:  Select an Azure Database for MySQL connection from the connection list. If no connection exists, then create a new Azure Database for MySQL connection by selecting **More**.
- **Table**: Specify the name of the table in the Azure Database for MySQL database to write data. Select the table from the drop-down list or type the table name.

Under **Advanced**, you can specify the following fields:

- **Pre-copy script**: Specify a SQL query for the copy activity to execute before writing data into Azure Database for MySQL in each run. You can use this property to clean up the preloaded data.
- **Write batch timeout**: Specify the wait time for the batch insert operation to complete before it times out. The allowed values are Timespan, and an example is 00:30:00 (30 minutes).
- **Write batch size**: Insert data into the Azure Database for MySQL table when the buffer size reaches the specified write batch size. The allowed value is integer representing number of rows, and the default value is 10,000.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). 

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Azure Database for MySQL.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your Azure Database for MySQL connection> |Yes|connection|
|**Use query** |The way to read data from Azure Database for MySQL. Apply **Table** to read data from the specified table or apply **Query** to read data using SQL queries.|• **Table** <br>• **Query** |Yes |/|
| **Table** | Name of the table in the Azure Database for MySQL. | < table name > | Yes if you select **Table** in **Use query**| tableName |
| **Query** | Use the custom SQL query to read data. For example: `SELECT * FROM MyTable`. | < SQL queries > | Yes if you select **Query** in **Use query** | query |
| **Query timeout (minutes)** | Timeout for query command execution.| < query timeout ><br> (the default is 120 minutes) | No | queryTimeout |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

### Destination information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the destination data store.|\<your Azure Database for MySQL connection> |Yes|connection|
| **Table** | Name of the table in the Azure Database for MySQL. | < table name > | Yes | tableName |
| **Pre-copy script** | A SQL query for the copy activity to execute before writing data into Azure Database for MySQL in each run. You can use this property to clean up the preloaded data. | < your pre-copy script >| No | preCopyScript |
| **Write batch timeout** | The wait time for the batch insert operation to complete before it times out. |  timespan (the default is 00:00:30)  |No | writeBatchTimeout|
| **Write batch size** |Insert data into the Azure Database for MySQL table when the buffer size reaches the specified write batch size. | integer<br>(the default is 10,000) | No | writeBatchSize |

## Related content

- [Azure Database for MySQL overview](connector-azure-database-for-mysql-overview.md)
