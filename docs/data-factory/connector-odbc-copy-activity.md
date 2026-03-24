---
title: Configure ODBC in a copy activity
description: This article explains how to copy data using the ODBC connector.
ms.topic: how-to
ms.date: 03/03/2026
ms.custom:
  - pipelines
  - connectors
ai-usage: ai-assisted
---

# Configure ODBC in a copy activity

This article outlines how to use the copy activity in a data pipeline to copy data from an ODBC data source.

## Prerequisites

To use this connector, set up an on-premises data gateway. For more information, see [How to access on-premises data sources in Data Factory](how-to-access-on-premises-data.md).

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

The following properties are supported for ODBC under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-odbc/odbc-source.png" alt-text="Screenshot showing the Source tab configuration for ODBC.":::

The following properties are **required**:

- **Connection**: Select an ODBC connection from the connection list. If the connection doesn't exist, then create a new ODBC connection.
- **Use query**: You can choose either **Table** or **Query** as your use query. The following list describes the configuration of each setting.
    - **Table**: Select the table in your database from the drop-down list. Or check **Edit** to enter your table name manually.
    - **Query**: Specify the custom SQL query to read data. For example: `SELECT * FROM MyTable`.

Under **Advanced**, you can specify the following fields:

- **Query timeout (minutes)**: Specify the timeout for query execution, default is 120 minutes. If a parameter is set for this property, allowed values are logic, for example `02:00:00` (120 minutes).

- **Additional columns**: Add additional data columns to store source file's relative path or static value. Expression is supported for the latter.

### Destination

The following properties are supported for ODBC under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-odbc/odbc-destination.png" alt-text="Screenshot showing the Destination tab configuration for ODBC.":::

The following properties are **required**:

- **Connection**: Select an ODBC connection from the connection list. If no connection exists, then create a new ODBC connection.

- **Table**: Select the name of the table in the ODBC data source. 

Under **Advanced**, you can specify the following fields:

- **Pre-copy script**: Specify a SQL query for the copy activity to execute before writing data into destination table in each run. You can use this property to clean up the preloaded data.

- **Write batch timeout**: Specify the wait time for the batch insert operation to complete before it times out. The allowed value is timespan. For example, "00:30:00" (30 minutes).

- **Write batch size**: Specify the number of rows to insert into the SQL table per batch. The allowed value is integer (number of rows). A new batch will be created when the current batch reaches the write batch size. The default value is `0` (auto-detected).

- **Max concurrent connections**: Specify the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections. The allowed value is integer.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, see [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in ODBC.

### Source information

| Name | Description | Value | Required | JSON script property |
| --- | --- | --- | :---: | --- |
| **Connection** | Your connection to the source data store. | < your ODBC connection > | Yes | connection |
| **Use query** | The way to read data from ODBC. Apply **Table** to read data from the specified table or apply **Query** to read data using SQL queries. |/ | Yes | / |
| **Table** | Name of the table in the ODBC data source. | < table name > | No | tableName |
| **Query** | Use the custom SQL query to read data. For example: `SELECT * FROM MyTable`. | < SQL queries > | No | query |
| **Query timeout (minutes)** | The wait time before the query attempt times out. | < timespan > | No | queryTimeout |
| **Additional columns** | Add additional data columns to store source file's relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

### Destination information

| Name | Description | Value | Required | JSON script property |
| --- | --- | --- | :---: | --- |
| **Connection** | Your connection to the destination data store. | < your ODBC connection > | Yes | connection |
| **Table** | Name of the table in the ODBC data source. | < table name > | Yes | tableName |
| **Pre-copy script** | A SQL query for the copy activity to execute before writing data into destination table in each run. You can use this property to clean up the pre-loaded data. | < your pre-copy script > | No | preCopyScript |
| **Write batch timeout** | The wait time for the batch insert operation to finish before it times out. The allowed value is timespan. | < timespan > | No | writeBatchTimeout |
| **Write batch size** | The number of rows to insert into the SQL table per batch. The allowed value is integer (number of rows). | < integer ><br>0 (default) | No | writeBatchSize |
| **Max concurrent connections** | The upper limit of concurrent connections established to the data store during the activity run. The allowed value is integer. | < integer > | No | maxConcurrentConnections |

## Related content

- [Odbc connector overview](connector-odbc-overview.md)
- [Set up your Odbc connection](connector-odbc.md).
