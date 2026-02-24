---
title: Configure Google BigQuery in a copy activity
description: This article explains how to copy data using Google BigQuery.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 02/14/2026
ms.custom:
  - pipelines
  - template-how-to
  - connectors
---

# Configure Google BigQuery in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to Google BigQuery.

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

The following properties are supported for Google BigQuery under the **Source** tab of a copy activity.

The following properties are **required**:

- **Connection**:  Select a Google BigQuery connection from the connection list. If no connection exists, then create a new Google BigQuery connection.

- **Use query**: Select from **Table** or **GoogleSQL**.
    - If you select **Table**:
      - **Table**: Specify the name of the Google BigQuery table. Select the table from the drop-down list or select **Edit** to manually enter it.

        :::image type="content" source="./media/connector-google-bigquery/use-query-table.png" alt-text="Screenshot showing Use query - Table." :::

    - If you select **GoogleSQL**:
      - **GoogleSQL**: Use the custom SQL query to read data. An example is `SELECT * FROM MyTable`. For more information, go to [Query syntax](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax).

        :::image type="content" source="./media/connector-google-bigquery/use-query-query.png" alt-text="Screenshot showing Use query - Google SQL." :::

Under **Advanced**, you can specify the following fields:

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Destination

The following properties are supported for Google BigQuery under the Destination tab of a copy activity.

The following properties are **required**:

- **Connection**: Select a Google BigQuery connection from the connection list. If no connection exists, then create a new Google BigQuery connection.

- **Table**: Specify the name of the Google BigQuery table. Select the table from the drop-down list or select **Edit** to manually enter it.

Under **Advanced**, you can specify the following fields:

- **Pre-copy script**: Specify a script using GoogleSQL for copy activity to execute before writing data into destination table in each run. You can use this to clean up the pre-loaded data.

- **Write batch timeout**: Specify the wait time for the batch insert operation to finish before it times out. The allowed value is timespan. The default value is `00:30:00` (30 minutes).

- **Write batch size**: Specify the number of rows to insert into the Google BigQuery table per batch. The allowed value is integer (number of rows). The default value is `10000`.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). 

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Data type mapping for Google BigQuery

When copying data from Google BigQuery, the following mappings are used from Google BigQuery data types to interim data types used by the service internally.

| Google BigQuery data type | Interim data type |
|---------------------------|-----------------------------|
| JSON                      | String                      |
| STRING                    | String                      |
| BYTES                     | Byte array                  |
| INTEGER                   | Int64                       |
| FLOAT                     | Double                      |
| NUMERIC                   | Decimal                     |
| BIGNUMERIC                | String                      |
| BOOLEAN                   | Boolean                     |
| TIMESTAMP                 | DateTimeOffset              |
| DATE                      | DateTime                    |
| TIME                      | TimeSpan                    |
| DATETIME                  | DateTimeOffset              |
| GEOGRAPHY                 | String                      |
| RECORD/STRUCT             | String                      |
| ARRAY                     | String                      |

## Table summary

The following tables contain more information about the copy activity in Google BigQuery.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|< your Google BigQuery connection > |Yes|connection|
|**Connection type** | Your connection type. Select **Google BigQuery**.|**Google BigQuery**|Yes |/|
|**Use query** |The way to read data. Apply **Table** to read data from the specified table or apply **GoogleSQL** to read data using SQL queries.|• **Table** <br>• **GoogleSQL** |Yes |/|
| *For **Table*** |  |  |  |  |
| **dataset name** | Name of the Google BigQuery dataset. |< your dataset name >  | No (if **GoogleSQL** is specified) | dataset |
| **table name** | 	Name of the table. | < your table name > | No (if **Google SQL** is specified) |table |
| *For **GoogleSQL*** |  |  |  |  |
| **GoogleSQL** | Use the custom SQL query to read data. An example is `SELECT * FROM MyTable`. For more information, go to [Query syntax](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax). |  < GoogleSQL query > |No (if **Table** is specified) | query|
|  |  |  |  |  |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

### Destination information

| Name | Description | Value | Required | JSON script property |
|---|---|---|---|---|
| **Connection** | Your connection to the destination data store. | < your Google BigQuery connection > | Yes | connection |
| **dataset name** | Name of the Google BigQuery dataset. |< your dataset name >  | Yes | dataset |
| **table name** | 	Name of the table. | < your table name > | Yes |table |
| **Pre-copy script** | A GoogleSQL for copy activity to execute before writing data into destination table in each run. You can use this to clean up the pre-loaded data. | < GoogleSQL query > | No | preCopyScript |
| **Write behavior** | The write behavior for copy activity to load data into Google BigQuery.  | insert (default) | No | writeBehavior |
| **Write batch timeout** | Wait time for the batch insert operation to complete before it times out. Allowed values are Timespan.  | < timespan ><br>`00:30:00` (default). | No | writeBatchTimeout |
| **Write batch size** | The number of rows to insert into the Google BigQuery table per batch. The allowed value is integer (number of rows).   | < integer ><br>`10000` (default) | No | writeBatchSize |

## Related content

- [Google BigQuery overview](connector-google-bigquery-overview.md)
