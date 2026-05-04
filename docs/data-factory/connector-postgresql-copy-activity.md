---
title: Configure PostgreSQL in a copy activity
description: This article explains how to copy data using PostgreSQL.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 04/22/2026
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure PostgreSQL in a copy activity

This article outlines how to use the copy activity in pipelines to copy data from and to PostgreSQL.


## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination (Preview)](#destination-preview)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

Go to **Source** tab to configure your copy activity source. See the following content for the detailed configuration.

:::image type="content" source="./media/connector-postgresql/source.png" alt-text="Screenshot showing source tab and the list of properties." :::

The following three properties are **required**:

- **Connection**: Select a PostgreSQL connection from the connection list. If no connection exists, then create a new PostgreSQL connection.
- **Connection type**: Select **PostgreSQL**.
- **Use query**: Select from **Table** or **Query**.
    - If you select **Table**:
      - **Table**: Specify the name of the table to read data. Select the table from the drop-down list or select **Enter manually** to enter it.

        :::image type="content" source="./media/connector-postgresql/use-query-table.png" alt-text="Screenshot showing Use query - Table." :::

    - If you select **Query**:
      - **Query**: Specify the custom SQL query to read data.

        :::image type="content" source="./media/connector-postgresql/use-query-query.png" alt-text="Screenshot showing Use query - Query." :::

        > [!Note]
        > Schema and table names are case-sensitive. Enclose them in "" (double quotes) in the query.
    
Under **Advanced**, you can specify the following fields:

- **Query timeout (minutes)**: Specify the wait time before terminating the attempt to execute a command and generating an error, default is 120 minutes. If parameter is set for this property, allowed values are timespan, such as "02:00:00" (120 minutes). For more information, see [CommandTimeout](https://www.npgsql.org/doc/api/Npgsql.NpgsqlCommand.html#Npgsql_NpgsqlCommand_CommandTimeout).
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Destination (Preview)

The following properties are supported for PostgreSQL under the Destination tab of a copy activity.

The following properties are **required**:

- **Connection**: Select a PostgreSQL connection from the connection list.
- **Connection type**: Select **PostgreSQL (Preview)**.
- **Table**: Specify the name of the table to write data. Select the table from the drop-down list or select **Enter manually** to enter the schema and table name.

Under **Advanced**, you can specify the following fields:

- **Pre-copy script**: Specify a SQL query for the copy activity to execute before writing data into PostgreSQL in each run. You can use this property to clean up the preloaded data.
- **Write batch timeout**: Specify the wait time for the batch insert operation to complete before it times out. The allowed value is timespan. The default value is `00:02:00`.
- **Write batch size**: Specify the number of rows to insert into the PostgreSQL table per batch. The allowed value is integer (number of rows). A new batche will be created when the current batch reaches the write batch size. The default value is `50000`.
- **Max concurrent connections**: Specify the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections. The allowed value is integer.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). 

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Data type mapping for PostgreSQL

When copying data from PostgreSQL, the following mappings are used from PostgreSQL data types to interim data types used by the service internally.

| PostgreSQL data type | Interim service data type |
|:--- |:--- |
|smallint|Int16|
|integer|Int32|
|bigint|Int64|
|decimal (precision <= 28)|Decimal|
|decimal (precision > 28)|Unsupported |
|numeric|Decimal|
|real|Single|
|double|Double|
|smallserial|Int16|
|serial|Int32|
|bigserial|Int64|
|money|Decimal|
|char(n)|String|
|varchar(n)|String|
|text|String|
|bytea|Byte[]|
|timestamp|DateTime|
|timestamp with time zone|DateTime|
|date|DateTime|
|time|TimeSpan|
|time with time zone|DateTimeOffset|
|interval|TimeSpan|
|boolean|Boolean|
|point|String|
|line|String|
|lseg|String|
|box|String|
|path|String|
|polygon|String|
|circle|String|
|cidr|String|
|inet|String|
|macaddr|String|
|macaddr8|String|
|tsvector|String|
|tsquery|String|
|uuid|Guid|
|json|String|
|jsonb|String|
|array|String|
|bit|Byte[]|
|bit varying|Byte[]|
|xml|String|
|integer[]|String|
|text[]|String|
|numeric[]|String|
|date[]|String|
|range|String|
|bpchar|String|

When copying data to PostgreSQL, the following mappings are used from interim data types used by the service internally to PostgreSQL data types.

| Interim data type | PostgreSQL data type |
|:---|:---|
| Int16 | smallint |
| Int32 | integer |
| Int64 | bigint |
| Single | real |
| Double | double precision |
| Decimal | numeric, money |
| Boolean | boolean |
| String | text, char(n), varchar(n), name, citext, json,jsonb, xml, inet, cidr, macaddr, tsvector, tsquery, point, line, lseg, box, path, polygon, circle, int4range, int8range, numrange, daterange, tsrange, tstzrange, integer[] |
| Byte array | bytea, bit(n), varbit |
| Date | date |
| TimeSpan | time, interval |
| DateTimeOffset | timetz, timestamptz |
| DateTime | timestamp |
| GUID | uuid |

## Table summary

The following table contains more information about the copy activity in PostgreSQL.

### Source information

|Name|Description|Value|Required|JSON script property|
|:---|:---|:---|:---|:---|
|**Connection**|Your connection to the source data store.|< your PostgreSQL connection >|Yes|connection|
|**Connection type** |Your source connection type. |**PostgreSQL** |Yes|/|
|**Use query** |The way to read data. Apply **Table** to read data from the specified table or apply **Query** to read data using SQL queries.|• **Table** <br>• **Query** |Yes |• typeProperties (under *`typeProperties`* -> *`source`*)<br>&nbsp; - schema<br>&nbsp; - table<br>• query|
|**Query timeout (minutes)** | The wait time before terminating the attempt to execute a command and generating an error, default is 120 minutes. If parameter is set for this property, allowed values are timespan, such as "02:00:00" (120 minutes). For more information, see [CommandTimeout](https://www.npgsql.org/doc/api/Npgsql.NpgsqlCommand.html#Npgsql_NpgsqlCommand_CommandTimeout). |timespan |No |queryTimeout|
|**Additional columns**|Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|• Name<br>• Value|No|additionalColumns:<br>• name<br>• value|

### Destination information (Preview)

| Name | Description | Value | Required | JSON script property |
|---|---|---|---|---|
| **Connection** | Your connection to the destination data store. | < your PostgreSQL connection > | Yes | connection |
| **Table** | The name of the table to write data. Select the table from the drop-down list or select **Enter manually** to enter the schema and table name. | < table name > | Yes | typeProperties:<br> • schema <br>• table |
| **Pre-copy script** | A SQL query for the copy activity to execute before writing data into PostgreSQL in each run. You can use this property to clean up the preloaded data. | < your pre-copy script > | No | preCopyScript |
| **Write behavior** | Defines the write behavior. | insert (default) | No | writeBehavior |
| **Write batch size** | The number of rows to insert into the PostgreSQL table per batch. The allowed value is integer (number of rows). | < integer ><br>`50000` (default) | No | writeBatchSize |
| **Write batch timeout** | The wait time for the batch insert operation to finish before it times out. The allowed value is timespan. | < timespan ><br>`00:02:00` (default) | No | writeBatchTimeout |
| **Max concurrent connections** | The upper limit of concurrent connections established to the data store during the activity run. The allowed value is integer. | < integer > | No | maxConcurrentConnections |

## Related content

- [PostgreSQL connector overview](connector-postgresql-overview.md)
