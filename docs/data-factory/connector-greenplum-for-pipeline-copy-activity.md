---
title: Configure Greenplum for Pipeline in a copy activity
description: This article explains how to copy data using Greenplum for Pipeline.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 05/18/2025
ms.custom:
  - template-how-to
---

# Configure Greenplum for Pipeline in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to Greenplum for Pipeline.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for Greenplum for Pipeline under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-greenplum-for-pipeline/source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-greenplum-for-pipeline/source.png":::

The following properties are **required**:

- **Connection**:  Select a Greenplum for Pipeline connection from the connection list. If no connection exists, then create a new Greenplum for Pipeline connection.
- **Use query**: Select from **Table** or **Query**.
    - If you select **Table**:
      - **Table**: Specify the name of the table in the Greenplum for Pipeline to read data. Select the table from the drop-down list or select **Enter manually** to enter the schema and table name.

        :::image type="content" source="./media/connector-greenplum-for-pipeline/use-query-table.png" alt-text="Screenshot showing Use query - Table." :::

    - If you select **Query**:
      - **Query**: Specify the custom SQL query to read data. For example: `SELECT * FROM MyTable`.

        :::image type="content" source="./media/connector-greenplum-for-pipeline/use-query-query.png" alt-text="Screenshot showing Use query - Query." :::

Under **Advanced**, you can specify the following fields:

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, see [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Greenplum for Pipeline.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your Greenplum for Pipeline connection> |Yes|connection|
|**Use query** |The way to read data from Greenplum for Pipeline. Apply **Table** to read data from the specified table or apply **Query** to read data using SQL queries.|• **Table** <br>• **Query** |Yes |/|
| *For **Table*** |  |  |  |  |
| **schema name** | Name of the schema. |< your schema name >  | No | schema |
| **table name** | Name of the table. | < your table name > | No | table |
| *For **Query*** |  |  |  |  |
| **Query** | Use the custom SQL query to read data. An example is `SELECT * FROM MyTable`. |  < SQL queries > |No | query |
|  |  |  |  |  |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [Greenplum for Pipeline overview](connector-greenplum-for-pipeline-overview.md)
