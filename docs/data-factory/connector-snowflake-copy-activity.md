---
title: How to configure Snowflake in copy activity
description: This article explains how to copy data using Snowflake.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 06/25/2023
ms.custom: template-how-to, build-2023
---

# How to configure Snowflake in copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to Snowflake.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

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

The following properties are supported for Snowflake under the **Source** tab of a copy activity.

  :::image type="content" source="./media/connector-snowflake/source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-snowflake/source.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select a Snowflake connection from the connection list. If the connection doesn't exist, then create a new Snowflake connection by selecting **New**.
- **Database**: The default database to use once connected. It should be an existing database for which the specified role has privileges.
- **Use query**: You can choose either **Table** or **Query** as your use query. The following list describes the configuration of each setting.
    - **Table**: Select the table in your database from the drop-down list. Or check **Edit** to enter your table name manually.
    - **Query**: Specify the SQL query to read data from Snowflake. If the names of the schema, table and columns contain lower case, quote the object identifier in query e.g. select * from "schema"."myTable".

Under **Advanced**, you can specify the following fields:

- **Additional Snowflake copy options**: Specify additional Snowflake copy options which will be used in Snowflake COPY statement to load data.

  :::image type="content" source="./media/connector-snowflake/copy-options-source.png" alt-text="Screenshot showing additional snowflake copy options for source.":::

- **Additional Snowflake format options**: Specify additional Snowflake format options which will be used in Snowflake COPY statement to load data.

  :::image type="content" source="./media/connector-snowflake/format-options-source.png" alt-text="Screenshot showing additional snowflake format options for source.":::

### Destination

The following properties are supported for Snowflake under the **Destination** tab of a copy activity.

  :::image type="content" source="./media/connector-snowflake/destination.png" alt-text="Screenshot showing Destination tab.":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select a Snowflake connection from the connection list. If the connection doesn't exist, then create a new Snowflake connection by selecting **New**.
- **Database**: The default database to use once connected. It should be an existing database for which the specified role has privileges.
- **Table**: Select the table in your database from the drop-down list. Or check **Edit** to enter your table name manually.

Under **Advanced**, you can specify the following fields:

- **Pre-copy script**: Specify a script for Copy Activity to execute before writing data into destination table in each run. You can use this property to clean up the pre-loaded data.

- **Additional Snowflake copy options**: Specify additional Snowflake copy options which will be used in Snowflake COPY statement to load data.

  :::image type="content" source="./media/connector-snowflake/copy-options-destination.png" alt-text="Screenshot showing additional snowflake copy options for destination.":::

- **Additional Snowflake format options**: Specify additional Snowflake format options which will be used in Snowflake COPY statement to load data.

  :::image type="content" source="./media/connector-snowflake/format-options-destination.png" alt-text="Screenshot showing additional snowflake format options for destination.":::

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Snowflake.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External** |Yes|/|
|**Connection** |Your connection to the source data store.|< your connection > |Yes|connection|
|**Database** |Your database that you use as source.|< your databse > |Yes|database|
|**Use query** |The way to read data from Snowflake.|• Table <br> • Query |No |• table<br>• query|
|**Table** | The name of the table to read data. |< name of your source table>|Yes |schema <br> table|
|**Query**| The SQL query to read data from Snowflake. |< name of your source query>|Yes|query|
|**Additional Snowflake copy options** |Additional copy options, provided as a dictionary of key-value pairs. Examples: MAX_FILE_SIZE, OVERWRITE. For more information, see [Snowflake Copy Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location#copy-options-copyoptions).|• Name<br>• Value|No |additionalCopyOptions:<br>• name<br>• value|
|**Additional Snowflake format options** |Additional file format options that are provided to COPY command as a dictionary of key-value pairs. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Snowflake Format Type Options](https://docs.snowflake.com/sql-reference/sql/copy-into-location#format-type-options-formattypeoptions).|• Name<br>• Value|No |additionalFormatOptions:<br>• name<br>• value |

### Destination

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External** |Yes|/|
|**Connection** |Your connection to the source data store.|< your connection > |Yes|connection|
|**Database** |Your database that you use as destination.|< your database> |Yes|/|
|**Table** | Your destination data table. |< name of your destination table>|Yes |• schema <br> • table|
|**Pre-copy script**|A SQL query for the Copy activity to run before writing data into Snowflake in each run. Use this property to clean up the preloaded data.	|< your pre-copy script>|NO|preCopyScript|
|**Additional Snowflake copy options** |Additional copy options, provided as a dictionary of key-value pairs. Examples: ON_ERROR, FORCE, LOAD_UNCERTAIN_FILES. For more information, see [Snowflake Copy Options](https://docs.snowflake.com/sql-reference/sql/copy-into-table#format-type-options-formattypeoptions).|• Name<br>• Value|No |additionalCopyOptions:<br>• name<br>• value|
|**Additional Snowflake format options** |Additional file format options provided to the COPY command, provided as a dictionary of key-value pairs. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Snowflake Format Type Options](https://docs.snowflake.com/sql-reference/sql/copy-into-table#format-type-options-formattypeoptions).|• Name<br>• Value|No |additionalFormatOptions:<br>• name<br>• value |

## Next steps
