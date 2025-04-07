---
title: Configure Azure Databricks in a copy activity
description: This article explains how to copy data using Azure Databricks.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/03/2025
ms.custom:
  - template-how-to
---

# Configure Azure Databricks in a copy activity

This article outlines how to use the copy activity in a data pipeline to copy data from and to Azure Databricks.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for Azure Databricks under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-azure-databricks/source.png" alt-text="Screenshot showing source tab and the list of properties." lightbox="./media/connector-azure-databricks/source.png":::

The following properties are **required**:

- **Connection**: Select an Azure Databricks connection from the connection list. If no connection exists, then create a new Azure Databricks connection.

- **Use query**: Select **Table** or **Query**.

  - If you select **Table**:

    - **Catalog**: A catalog serves as the highest-level container within the Unity Catalog framework, it allows you to organize your data into databases and tables.

    - **Database**: Select your database from the drop-down list.

    - **Table**: Specify the name of the table to read data. Select the table from the drop-down list or type the table name.

  - If you select **Query**:

    - **Query**: Specify the SQL query to read data. For the time travel control, follow the below pattern:<br>
      - `SELECT * FROM events TIMESTAMP AS OF timestamp_expression`
      - `SELECT * FROM events VERSION AS OF version`

    :::image type="content" source="./media/connector-azure-databricks/query.png" alt-text="Screenshot showing query." lightbox="./media/connector-azure-databricks/query.png":::

Under **Advanced**, you can specify the following fields:

- **Date format**: Format date type to string with a date format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd`.

- **Timestamp format**: Format timestamp type to string with a timestamp format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd'T'HH:mm:ss[.SSS][XXX]`.

## Destination

The following properties are supported for Azure Databricks under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-azure-databricks/destination.png" alt-text="Screenshot showing destination tab.":::

The following properties are **required**:

- **Connection**: Select an Azure Databricks connection from the connection list. If no connection exists, then create a new Azure Databricks connection.

- **Catalog**: A catalog serves as the highest-level container within the Unity Catalog framework, it allows you to organize your data into databases and tables.

- **Database**: Select your database from the drop-down list.

- **Table**: Select a table from the drop-down list or select **Edit** to manually enter it to write data.

Under **Advanced**, you can specify the following fields:

- **Pre-copy script**:  Specify a script for Copy Activity to execute before writing data into destination table in each run. You can use this property to clean up the pre-loaded data.

- **Timestamp format**: Format timestamp type to string with a timestamp format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd'T'HH:mm:ss[.SSS][XXX]`.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about a copy activity in an Azure Databricks.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|< your Azure Databricks connection >|Yes|connection|
|**Use query** |The way to read data. Apply **Table** to read data from the specified table or apply **Query** to read data using queries.| • **Table**<br>  • **Query** |No| table<br> query|
| For **Table** | | | | |
| **Catalog** | A catalog serves as the highest-level container within the Unity Catalog framework, it allows you to organize your data into databases and tables. | < your catalog > | No (will choose default catalog if it’s null) | catalog |
|**Database** | Your database that you use as source.|< your database >| No |database|
|**Table** |Your source data table to read data.|< your table name >| No |table|
| For **Query** | | | | |
| **Query** | Specify the SQL query to read data. For the time travel control, follow the below pattern:<br>- `SELECT * FROM events TIMESTAMP AS OF timestamp_expression`<br>- `SELECT * FROM events VERSION AS OF version`| < your query > | No | query |
| | | | | |
|**Date format** |Format string to date type with a date format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd`. | |No| dateFormat |
|**Timestamp format** |Format string to timestamp type with a timestamp format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd'T'HH:mm:ss[.SSS][XXX]`.| |No| timestampFormat |

### Destination information

|Name |Description |Value |Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the destination data store.|< your Azure Databricks connection >|Yes|connection|
| **Catalog** | A catalog serves as the highest-level container within the Unity Catalog framework, it allows you to organize your data into databases and tables. | < your catalog > | No (will choose default catalog if it’s null) | catalog |
|**Database** | Your database that you use as destination.|< your database >|Yes |database|
|**Table** |Your destination data table to write data.|< your table name >|Yes|table|
|**Pre-copy script** |  Specify a script for Copy Activity to execute before writing data into destination table in each run. You can use this property to clean up the pre-loaded data. | < your pre-copy script> |No| preCopyScript |
|**Timestamp format** |Format string to timestamp type with a timestamp format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd'T'HH:mm:ss[.SSS][XXX]`.| |No| timestampFormat |

## Related content

- [Azure Databricks connector overview](connector-azure-databricks-overview.md)
