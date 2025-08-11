---
title: Configure PostgreSQL in a copy activity
description: This article explains how to copy data using PostgreSQL.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/19/2023
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure PostgreSQL in a copy activity

This article outlines how to use the copy activity in data pipelines to copy data from PostgreSQL.


## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
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

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). 

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

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

## Related content

- [PostgreSQL connector overview](connector-postgresql-overview.md)
