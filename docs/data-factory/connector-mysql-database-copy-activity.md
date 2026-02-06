---
title: Configure MySQL in a copy activity
description: This article explains how to copy data using MySQL.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 01/22/2026
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure MySQL in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from MySQL.

This connector supports MySQL version 5.5, 5.6, 5.7, 8.0, 8.1 and 8.2.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for MySQL under the **Source** tab of a copy activity.

The following properties are **required**:

- **Connection**:  Select a MySQL connection from the connection list. If no connection exists, then create a new MySQL connection by selecting **New**.
- **Use query**: Select from **Table** or **Query**.
    - If you select **Table**:
      - **Table**: Specify the name of the table in the MySQL database to read data. Select the table from the drop-down list.

        :::image type="content" source="./media/connector-mysql-database/use-query-table.png" alt-text="Screenshot showing Use query - Table." :::

    - If you select **Query**:
      - **Query**: Specify the custom SQL query to read data. For example: `SELECT * FROM MyTable`.

        :::image type="content" source="./media/connector-mysql-database/use-query-query.png" alt-text="Screenshot showing Use query - Query." :::

Under **Advanced**, you can specify the following fields:

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). 

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Data type mapping for MySQL

When copying data from MySQL, the following mappings are used from MySQL data types to interim data types used by the service internally.

| MySQL data type | Interim service data type |
|:--- |:--- |
| BIGINT | Int64 |
| BIGINT UNSIGNED | UInt64 |
| BIT(1) | UInt64 |
| BIT(M), M>1 | UInt64 |
| BLOB |Byte[] |
| BOOL |Boolean <br/>(If TreatTinyAsBoolean=false, it is mapped as SByte. TreatTinyAsBoolean is true by default) |
| CHAR | String  |
| DATE | Datetime  |
| DATETIME | Datetime  |
| DECIMAL | Decimal |
| DOUBLE | Double  |
| DOUBLE PRECISION | Double  |
| ENUM | String  |
| FLOAT | Single  |
| INT | Int32  |
| INT UNSIGNED | Int64 |
| INTEGER | Int32  |
| INTEGER UNSIGNED | UInt32 |
| JSON |String |
| LONG VARBINARY | Byte[] |
| LONG VARCHAR | String |
| LONGBLOB |Byte[] |
| LONGTEXT |String |
| MEDIUMBLOB |Byte[] |
| MEDIUMINT |Int32 |
| MEDIUMINT UNSIGNED |UInt32 |
| MEDIUMTEXT |String |
| NUMERIC |Decimal |
| REAL |Double |
| SET |String |
| SMALLINT |Int16 |
| SMALLINT UNSIGNED | UInt16 |
| TEXT |String |
| TIME |TimeSpan |
| TIMESTAMP |Datetime |
| TINYBLOB |Byte[] |
| TINYINT |SByte |
| TINYINT unsigned |Int16 |
| TINYTEXT | String |
| VARCHAR | String |
| YEAR | Int |

## Table summary

The following tables contain more information about the copy activity in MySQL.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your MySQL connection> |Yes|connection|
|**Use query** |The way to read data from MySQL. Apply **Table** to read data from the specified table or apply **Query** to read data using SQL queries.|• **Table** <br>• **Query** |Yes |/|
| **Table** | Name of the table in the MySQL database. | < table name > | No | tableName |
| **Query** | Use the custom SQL query to read data. For example: `SELECT * FROM MyTable`. | < SQL queries > | No | query |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [MySQL overview](connector-mysql-database-overview.md)
