---
title: Configure MariaDB in copy activity
description: This article explains how to copy data using MariaDB.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 09/29/2024
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure MariaDB in copy activity

This article outlines how to use the copy activity in data pipeline to copy data from MariaDB.

This connector supports MariaDB version 10.x, 11.x.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for MariaDB under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-mariadb/mariadb-source.png" alt-text="Screenshot showing source tab.":::

The following properties are **required**:

- **Connection**:  Select a MariaDB for Pipeline connection from the connection list. If no connection exists, then create a new MariaDB for Pipeline connection by selecting **New**.
- **Use query**: Select from **Table** or **Query**.
    - If you select **Table**:
      - **Table**: Specify the name of the table in the MariaDB to read data. Select the table from the drop-down list.

    - If you select **Query**:
      - **Query**: Specify the custom SQL query to read data. For example: `SELECT * FROM MyTable`.

        :::image type="content" source="./media/connector-mariadb/use-query-query.png" alt-text="Screenshot showing Use query - Query." :::

Under **Advanced**, you can specify the following fields:

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in MariaDB.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your MariaDB for Pipeline connection> |Yes|connection|
|**Use query** |The way to read data from MariaDB. Apply **Table** to read data from the specified table or apply **Query** to read data using SQL queries.|• **Table** <br>• **Query** |Yes |/|
| **Table** | Name of the table in the MariaDB. | < table name > | No | tableName |
| **Query** | Use the custom SQL query to read data. For example: `SELECT * FROM MyTable`. | < SQL queries > | No | query |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [MariaDB overview](connector-mariadb-overview.md)
