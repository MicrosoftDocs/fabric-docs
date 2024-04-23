---
title: Configure Google BigQuery in a copy activity
description: This article explains how to copy data using Google BigQuery.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 03/20/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Google BigQuery in a copy activity

This article outlines how to use the copy activity in data pipeline to copy data from Google BigQuery.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for Google BigQuery under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-google-bigquery/google-bigquery-source.png" alt-text="Screenshot showing source tab.":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select a Google BigQuery connection from the connection list. If no connection exists, then create a new Google BigQuery connection by selecting **New**.
- **Use query**: Select from **Table** or **Google SQL**.
    - If you select **Table**:
      - **Table**: Specify the name of the Google BigQuery table. Select the table from the drop-down list or select **Edit** to manually enter it.

        :::image type="content" source="./media/connector-google-bigquery/use-query-table.png" alt-text="Screenshot showing Use query - Table." :::

    - If you select **Google SQL**:
      - **Google SQL**: Use the custom SQL query to read data. An example is `SELECT * FROM MyTable`. For more information, go to [Query syntax](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax).

        :::image type="content" source="./media/connector-google-bigquery/use-query-query.png" alt-text="Screenshot showing Use query - Google SQL." :::

Under **Advanced**, you can specify the following fields:

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). 

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Google BigQuery.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External** |Yes|/|
|**Connection** |Your connection to the source data store.|\<your Google BigQuery connection> |Yes|connection|
|**Connection type** | Your connection type. Select **Google BigQuery**.|**Google BigQuery**|Yes |/|
|**Use query** |The way to read data. Apply **Table** to read data from the specified table or apply **Google SQL** to read data using SQL queries.|• **Table** <br>• **Google SQL** |Yes |/|
| *For **Table*** |  |  |  |  |
| **schema name** | Name of the Google BigQuery dataset. |< your dataset name >  | No (if **Google SQL** is specified) | dataset |
| **table name** | 	Name of the table. | < your table name > | No (if **Google SQL** is specified) |table |
| *For **Google SQL*** |  |  |  |  |
| **Google SQL** | Use the custom SQL query to read data. An example is `SELECT * FROM MyTable`. For more information, go to [Query syntax](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax). |  < Google SQL query > |No (if **Table** is specified) | query|
|  |  |  |  |  |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [Google BigQuery overview](connector-google-bigquery-overview.md)
