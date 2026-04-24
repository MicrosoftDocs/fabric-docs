---
title: Configure MySQL in a copy activity
description: This article explains how to copy data using MySQL.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 04/23/2026
ai-usage: ai-assisted
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure MySQL in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to MySQL.

This connector supports MySQL version 5.5, 5.6, 5.7, 8.0, 8.1 and 8.2.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination (Preview)](#destination)
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

### <a name="destination"></a> Destination (Preview)

The following properties are supported for MySQL under the Destination tab of a copy activity.

The following properties are **required**:

- **Connection**: Select a MySQL connection from the connection list. If no connection exists, then create a new MySQL connection.

- **Table**: Select the name of the table in the MySQL database.

Under **Advanced**, you can specify the following fields:

- **Pre-copy script**: Specify a SQL query for the copy activity to execute before writing data into MySQL in each run. You can use this property to clean up the preloaded data.

- **Write batch timeout**: Specify the wait time for the batch insert operation to complete before it times out. The allowed value is timespan. The default value is `00:00:30`.

- **Write batch size**: Specify the number of rows to insert into the MySQL table per batch. The allowed value is integer (number of rows). A new batche will be created when the current batch reaches the write batch size. The default value is `10000`.

- **Max concurrent connections**: Specify the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections. The allowed value is integer.

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
| BLOB | Byte array |
| BOOL |Boolean <br/>(If TreatTinyAsBoolean=false, it is mapped as SByte. TreatTinyAsBoolean is true by default) |
| CHAR | String  |
| DATE | DateTime  |
| DATETIME | DateTime  |
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
| LONG VARBINARY | Byte array |
| LONG VARCHAR | String |
| LONGBLOB | Byte array |
| LONGTEXT |String |
| MEDIUMBLOB | Byte array |
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
| TIMESTAMP | DateTime |
| TINYBLOB | Byte array |
| TINYINT |SByte |
| TINYINT unsigned |Int16 |
| TINYTEXT | String |
| VARCHAR | String |
| YEAR | Integer |

When copying data to MySQL, the following mappings are used from interim data types used by the service internally to MySQL data types.

| Interim service data type | MySQL data type |
| --- | --- |
| Boolean | BOOL, BOOLEAN |
| Byte | TINYINT |
| Int16 | SMALLINT, YEAR |
| UInt16 | SMALLINT UNSIGNED |
| Int32 | MEDIUMINT, INT, INTEGER |
| UInt32 | INT UNSIGNED, MEDIUMINT UNSIGNED |
| Int64 | BIGINT |
| UInt64 | BIGINT UNSIGNED |
| Decimal | DECIMAL |
| Single | FLOAT |
| Double | DOUBLE |
| String | VARCHAR, CHAR, VARSTRING, TEXT, TINYTEXT, MEDIUMTEXT, LONGTEXT, ENUM, SET, JSON |
| Byte array | BINARY, VARBINARY, BLOB, TINYBLOB, MEDIUMBLOB, LONGBLOB, BIT, GEOMETRY |
| Date | DATE |
| DateTime | DATETIME, TIMESTAMP |
| TimeSpan | TIME |
| GUID | GUID, UUID |

## Table summary

The following tables contain more information about the copy activity in MySQL.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|< your MySQL connection > |Yes|connection|
|**Use query** |The way to read data from MySQL. Apply **Table** to read data from the specified table or apply **Query** to read data using SQL queries.|• **Table** <br>• **Query** |Yes |/|
| **Table** | Name of the table in the MySQL database. | < table name > | No | tableName |
| **Query** | Use the custom SQL query to read data. For example: `SELECT * FROM MyTable`. | < SQL queries > | No | query |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

### <a name="destination-information"></a>Destination information (Preview)

| Name | Description | Value | Required | JSON script property |
|---|---|---|---|---|
| **Connection** | Your connection to the destination data store. | < your MySQL connection > | Yes | connection |
| **Table** | Name of the table in the MySQL database. | < table name > | Yes | tableName |
| **Pre-copy script** | A SQL query for the copy activity to execute before writing data into MySQL in each run. You can use this property to clean up the preloaded data. | < your pre-copy script > | No | preCopyScript |
| **Write behavior** | Defines the write behavior. | insert (default)| No | writeBehavior |
| **Write batch size** | The number of rows to insert into the MySQL table per batch. The allowed value is integer (number of rows). | < integer ><br>`10000` (default)| No | writeBatchSize |
| **Write batch timeout** | The wait time for the batch insert operation to finish before it times out. The allowed value is timespan. | < timespan ><br>`00:00:30` (default) | No | writeBatchTimeout |
| **Max concurrent connections** | The upper limit of concurrent connections established to the data store during the activity run. The allowed value is integer. | < integer > | No | maxConcurrentConnections |

## Related content

- [MySQL overview](connector-mysql-database-overview.md)
