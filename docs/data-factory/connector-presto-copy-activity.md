---
title: Configure Presto in a copy activity
description: This article explains how to copy data using Presto.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 08/26/2025
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure Presto in a copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to Presto.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for Presto under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-presto/source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-presto/source.png":::

The following properties are **required**:

- **Connection**:  Select a Presto connection from the connection list. If no connection exists, then create a new Presto connection.

- **Use query**: Select **Table** or **Query**.

  - If you select **Table**:

    - **Table**: Select the table from the drop-down list or select **Enter manually** to manually enter it to read data.

  - If you select **Query**:

    - **Query**: Specify the custom SQL query to read data. For example: `SELECT * FROM MyTable`.

      :::image type="content" source="./media/connector-presto/query.png" alt-text="Screenshot showing query." lightbox="./media/connector-presto/query.png":::

Under **Advanced**, you can specify the following fields:

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, see [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Presto.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your Presto connection> |Yes|connection|
|**Use query** |The way to read data from Presto. Apply **Table** to read data from the specified table or apply **Query** to read data using queries.| • **Table**<br>  • **Query** |No| / |
| For ***Table*** | | | | |
|**schema name** |Name of the schema.|< your schema name >| No |schema|
|**table name** |Name of the table.|< your table name >| No |table|
| For ***Query*** | | | | |
| **Query** | Use the custom SQL query to read data. | < SQL queries > | No | query |
| | | | | |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [Presto overview](connector-presto-overview.md)
