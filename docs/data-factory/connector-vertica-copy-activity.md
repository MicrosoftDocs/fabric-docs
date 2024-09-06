---
title: Configure Vertica in a copy activity
description: This article explains how to copy data using Vertica.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 09/06/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Vertica in a copy activity

This article outlines how to use the copy activity in a data pipeline to copy data from Vertica.

## Supported configuration

For the configuration of each tab under the copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for Vertica under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-vertica/vertica-source.png" alt-text="Screenshot showing source tab.":::

The following three properties are **required**:

- **Connection**: Select a Vertica connection from the connection list. If no connection exists, then create a new Vertica connection by selecting **New**.
- ***Use query**: Select from **Table** or **Query**.
    - If you select **Table**:
      - **Table**: Specify the name of the Vertica table to read data. Select the table from the drop-down list or select **Enter manually** to enter the schema and table name.

        :::image type="content" source="./media/connector-vertica/use-query-table.png" alt-text="Screenshot showing Use query - Table." :::

    - If you select **Query**:
      - **Query**: Specify the custom SQL query to read data. For example: `SELECT * FROM MyTable`.

        :::image type="content" source="./media/connector-vertica/use-query-query.png" alt-text="Screenshot showing Use query - Query." :::

Under **Advanced**, you can specify the following fields:

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For the **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For the **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following table contains more information about the copy activity in Vertica.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your connection\> |Yes|connection|
|**Use query** |The way to read data. Apply **Table** to read data from the specified table or apply **Query** to read data using SQL queries.|• **Table** <br>• **Query**| Yes | / |
| *For **Table*** |  |  |  |  |
| **schema name** | Name of the schema. |< your schema name >  | No | schema |
| **table name** | Name of the table. | < your table name > | No |table |
| *For **Query*** |  |  |  |  |
| **Query** | Specify the custom SQL query to read data. For example: `SELECT * FROM MyTable`. |  < SQL queries > |No | query|
|  |  |  |  |  |
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|- Name<br>- Value|No |additionalColumns:<br>- name<br>- value|

## Related content

- [Set up your Vertica connection](connector-vertica-overview.md)
