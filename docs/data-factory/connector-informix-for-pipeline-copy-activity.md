---
title: Configure Informix For Pipeline in a copy activity
description: This article explains how to copy data using Informix For Pipeline.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 08/21/2025
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure Informix For Pipeline in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to Informix For Pipeline.

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

The following properties are supported for Informix For Pipeline under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-informix-for-pipeline/source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-informix-for-pipeline/source.png":::

The following properties are **required**:

- **Connection**:  Select an Informix For Pipeline connection from the connection list. If no connection exists, then create a new Informix For Pipeline connection.

- **Use query**: Select **Table** or **Query**.

  - If you select **Table**:

    - **Table**: Specify the name of the table in the Informix For Pipeline to read data.

  - If you select **Query**:

    - **Query**: Specify the custom SQL query to read data.

      :::image type="content" source="./media/connector-informix-for-pipeline/query.png" alt-text="Screenshot showing query." lightbox="./media/connector-informix-for-pipeline/query.png":::

Under **Advanced**, you can specify the following fields:

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Destination

The following properties are supported for Informix For Pipeline under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-informix-for-pipeline/destination.png" alt-text="Screenshot showing destination tab.":::

The following properties are **required**:

- **Connection**: Select an Informix For Pipeline connection from the connection list. If no connection exists, then create a new Informix For Pipeline connection.

- **Table**: Specify the name of the table in the Informix For Pipeline to write data.

Under **Advanced**, you can specify the following fields:

- **Pre-copy script**: Specify a SQL query for Copy Activity to execute before writing data into data store in each run. You can use this property to clean up the pre-loaded data.

- **Write batch timeout**: Specify the wait time for the batch insert operation to finish before it times out. The allowed value is timespan. The default value is "00:30:00" (30 minutes).

- **Write batch size**: Inserts data into the SQL table when the buffer size reaches writeBatchSize. The allowed value is integer (number of rows). The default value is 0 - auto detected.

- **Max concurrent connections**: Specify the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, see [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Informix For Pipeline.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your Informix For Pipeline connection> |Yes|connection|
|**Use query** |The way to read data from Teradata. Apply **Table** to read data from the specified table or apply **Query** to read data using queries.| • **Table**<br>  • **Query** |No| / |
| For ***Table*** | | | | |
|**Table** | Your source data table to read data. |< your table name >| No | tableName |
| For ***Query*** | | | | |
| **Query** | Use the custom SQL query to read data. | < SQL queries > | No | query |
| | | | | |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

### Destination information

|Name |Description |Value |Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** | Your connection to the destination data store. |< your Teradata connection >|Yes| connection |
|**Table** | Your destination data table to write data. |< your table name >|Yes| tableName |
|**Pre-copy script**|Specify a SQL query for Copy Activity to execute before writing data into data store in each run. You can use this property to clean up the pre-loaded data.| < your pre-copy script >|No |preCopyScript|
|**Write batch timeout**|The wait time for the batch insert operation to finish before it times out. |timespan<br>(the default is **00:30:00** - 30 minutes) |No |writeBatchTimeout|
|**Write batch size**|Inserts data into the SQL table when the buffer size reaches writeBatchSize.|\<number of rows><br>(integer) |No |writeBatchSize|
|**Max concurrent connections**|The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.| \<upper limit of concurrent connections><br>(integer)|No |maxConcurrentConnections|

## Related content

- [Informix For Pipeline overview](connector-informix-for-pipeline-overview.md)
