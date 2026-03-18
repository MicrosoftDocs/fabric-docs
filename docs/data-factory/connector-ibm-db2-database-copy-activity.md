---
title: Configure IBM Db2 database in a copy activity
description: This article explains how to copy data using IBM Db2 database.
ms.topic: how-to
ms.date: 08/12/2025
ms.custom:
  - template-how-to
  - connectors
---

# Configure IBM Db2 database in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from IBM Db2 database.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for IBM Db2 database under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-ibm-db2-database/source.png" alt-text="Screenshot showing source tab and the list of properties." lightbox="./media/connector-ibm-db2-database/source.png":::

The following properties are **required**:

- **Connection**: Select an IBM Db2 database connection from the connection list. If the connection doesn't exist, then create a new IBM Db2 database connection.
    - **Additional connection properties**: Specify additional connection properties which will be used in IBM Db2 database connection to set advanced options. Additional connection properties are provided as a dictionary of key-value pairs, for example, Package collection. For more information, see this [article](https://www.ibm.com/docs/en/db2-for-zos/12.0.0?topic=plan-specifying-package-collection).

      :::image type="content" source="./media/connector-ibm-db2-database/additional-connection-properties.png" alt-text="Screenshot showing additional connection properties for source.":::

- **Use query**: Select **Table** or **Query**.

  - If you select **Table**:

    - **Table**: Specify the name of the table in the IBM Db2 database to read data. Select the table from the drop-down list or select **Enter manually** to enter the schema and table name.

  - If you select **Query**:

    - **Query**: Specify the custom SQL query to read data.

      :::image type="content" source="./media/connector-ibm-db2-database/query.png" alt-text="Screenshot showing query." lightbox="./media/connector-ibm-db2-database/query.png":::

Under **Advanced**, you can specify the following fields:

- **Additional columns**: Add more data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about a copy activity in an IBM Db2 database.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|< your IBM Db2 database connection >|Yes|connection|
|**Additional connection properties** |Additional connection properties, provided as a dictionary of key-value pairs, for example, Package collection. For more information, see this [article](https://www.ibm.com/docs/en/db2-for-zos/12.0.0?topic=plan-specifying-package-collection).|• Name<br>• Value|No |connectionProperties|
|**Use query** |The way to read data from IBM Db2 database. Apply **Table** to read data from the specified table or apply **Query** to read data using queries.| • **Table**<br>  • **Query** |No| / |
| For ***Table*** | | | | |
|**schema name** |Name of the schema.|< your schema name >| No |schema|
|**table name** |Name of the table.|< your table name >| No |table|
| For ***Query*** | | | | |
| **Query** | Use the custom SQL query to read data. | < SQL queries > | No | query |
| | | | | |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. |• Name <br>• Value | No | additionalColumns:<br> • name<br>• value|

## Related content

- [IBM Db2 database connector overview](connector-ibm-db2-database-overview.md)
