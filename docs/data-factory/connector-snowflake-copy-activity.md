---
title: Configure Snowflake in a copy activity
description: This article explains how to copy data using Snowflake.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Snowflake in a copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to Snowflake.

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
    - **Query**: Specify the SQL query to read data from Snowflake. If the names of the schema, table and columns contain lower case, quote the object identifier in query e.g. `select * from "schema"."myTable"`.

Under **Advanced**, you can specify the following fields:

- **Additional Snowflake copy options**: Specify additional Snowflake copy options which will be used in Snowflake COPY statement to load data. Additional copy options are provided as a dictionary of key-value pairs. Examples: MAX_FILE_SIZE, OVERWRITE. For more information, see [Snowflake Copy Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location#copy-options-copyoptions).

  :::image type="content" source="./media/connector-snowflake/copy-options-source.png" alt-text="Screenshot showing additional snowflake copy options for source.":::

- **Additional Snowflake format options**: Specify additional Snowflake format options, which will be used in Snowflake COPY statement to load data. Additional file format options provided to the COPY command are provided as a dictionary of key-value pairs. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Snowflake Format Type Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location#format-type-options-formattypeoptions).

  :::image type="content" source="./media/connector-snowflake/format-options-source.png" alt-text="Screenshot showing additional snowflake format options for source.":::

#### Direct copy from Snowflake

If your destination data store and format meet the criteria described in this section, you can use the Copy activity to directly copy from Snowflake to destination. The service checks the settings and fails the Copy activity run if the following criteria is not met:

  - The **destination connection** is **Azure Blob storage** with **shared access signature** authentication. If you want to directly copy data to Azure Data Lake Storage Gen2 in the following supported format, you can create an Azure Blob connection with SAS authentication against your ADLS Gen2 account.

  - The **destination data format** is of **Parquet**, **DelimitedText**, or **JSON** with the following configurations:

    - For **Parquet** format, the compression codec is **None**, **Snappy**, or **Lzo**.
    - For **DelimitedText** format:
        - **Row delimiter** is **\r\n**, or any single character.
        - **Compression type** can be **None**, **gzip**, **bzip2**, or **deflate**.
        - **Encoding** is left as default or set to **UTF-8**.
        - **Quote character** is **Double quote**, **Single quote**, or **No quote character**.
    - For **JSON** format, direct copy only supports the case that source Snowflake table or query result only has single column and the data type of this column is **VARIANT**, **OBJECT**, or **ARRAY**.
        - **Compression type** can be **None**, **gzip**, **bzip2**, or **deflate**.
        - **Encoding** is left as default or set to **UTF-8**.
        - **File pattern** in copy activity destination is left as default or set to **Set of objects**.
  - In copy activity source, **Additional columns** is not specified.
  - Column mapping is not specified.

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

- **Additional Snowflake copy options**: Specify additional Snowflake copy options, which will be used in Snowflake COPY statement to load data. Additional copy options are provided as a dictionary of key-value pairs. Examples: ON_ERROR, FORCE, LOAD_UNCERTAIN_FILES. For more information, see [Snowflake Copy Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#copy-options-copyoptions).

  :::image type="content" source="./media/connector-snowflake/copy-options-destination.png" alt-text="Screenshot showing additional snowflake copy options for destination.":::

- **Additional Snowflake format options**: Specify additional Snowflake format options, which will be used in Snowflake COPY statement to load data. Additional file format options provided to the COPY command are provided as a dictionary of key-value pairs. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Snowflake Format Type Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#format-type-options-formattypeoptions).

  :::image type="content" source="./media/connector-snowflake/format-options-destination.png" alt-text="Screenshot showing additional snowflake format options for destination.":::

#### Direct copy to Snowflake

If your source data store and format meet the criteria described in this section, you can use the Copy activity to directly copy from source to Snowflake. The service checks the settings and fails the Copy activity run if the following criteria is not met:

- The **source connection** is **Azure Blob storage** with **shared access signature** authentication. If you want to directly copy data from Azure Data Lake Storage Gen2 in the following supported format, you can create an Azure Blob connection with SAS authentication against your ADLS Gen2 account.

- The **source data format** is **Parquet**, **DelimitedText**, or **JSON** with the following configurations:

    - For **Parquet** format, the compression codec is **None**, or **Snappy**.

    - For **DelimitedText** format:
        - **Row delimiter** is **\r\n**, or any single character. If row delimiter is not “\r\n”, **First row as header** is unselected, and **Skip line count** is not specified.
        - **Compression type** can be **None**, **gzip**, **bzip2**, or **deflate**.
        - **Encoding** is left as default or set to "UTF-8", "UTF-16", "UTF-16BE", "UTF-32", "UTF-32BE", "BIG5", "EUC-JP", "EUC-KR", "GB18030", "ISO-2022-JP", "ISO-2022-KR", "ISO-8859-1", "ISO-8859-2", "ISO-8859-5", "ISO-8859-6", "ISO-8859-7", "ISO-8859-8", "ISO-8859-9", "WINDOWS-1250", "WINDOWS-1251", "WINDOWS-1252", "WINDOWS-1253", "WINDOWS-1254", "WINDOWS-1255".
        - **Quote character** is **Double quote**, **Single quote**, or **No quote character**.

    - For **JSON** format, direct copy only supports the case that destination Snowflake table only has single column and the data type of this column is **VARIANT**, **OBJECT**, or **ARRAY**.
        - **Compression type** can be **None**, **gzip**, **bzip2**, or **deflate**.
        - **Encoding** is left as default or set to **UTF-8**.
        - Column mapping is not specified.

- In the Copy activity source: 

   - **Additional columns** is not specified.
   - If your source is a folder, **Recursively** is selected.
   - **Prefix**, **Start time (UTC)** and **End time (UTC)** in **Filter by last modified** and **Enable partition discovery** are not specified.

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
|**Database** |Your database that you use as source.|< your database > |Yes|database|
|**Use query** |The way to read data from Snowflake.|• Table <br> • Query |No |• table<br>• query|
|**Table** | The name of the table to read data. |< name of your source table>|Yes |schema <br> table|
|**Query**| The SQL query to read data from Snowflake. |< name of your source query>|Yes|query|
|**Additional Snowflake copy options** |Additional copy options, provided as a dictionary of key-value pairs. Examples: MAX_FILE_SIZE, OVERWRITE. For more information, see [Snowflake Copy Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location#copy-options-copyoptions).|• Name<br>• Value|No |additionalCopyOptions|
|**Additional Snowflake format options** |Additional file format options that are provided to COPY command as a dictionary of key-value pairs. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Snowflake Format Type Options](https://docs.snowflake.com/sql-reference/sql/copy-into-location#format-type-options-formattypeoptions).|• Name<br>• Value|No |additionalFormatOptions|

### Destination

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External** |Yes|/|
|**Connection** |Your connection to the destination data store.|< your connection > |Yes|connection|
|**Database** |Your database that you use as destination.|< your database> |Yes|/|
|**Table** | Your destination data table. |< name of your destination table>|Yes |• schema <br> • table|
|**Pre-copy script**|A SQL query for the Copy activity to run before writing data into Snowflake in each run. Use this property to clean up the preloaded data.	|< your pre-copy script>|NO|preCopyScript|
|**Additional Snowflake copy options** |Additional copy options, provided as a dictionary of key-value pairs. Examples: ON_ERROR, FORCE, LOAD_UNCERTAIN_FILES. For more information, see [Snowflake Copy Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#copy-options-copyoptions).|• Name<br>• Value|No |additionalCopyOptions|
|**Additional Snowflake format options** |Additional file format options provided to the COPY command, provided as a dictionary of key-value pairs. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Snowflake Format Type Options](https://docs.snowflake.com/sql-reference/sql/copy-into-table#format-type-options-formattypeoptions).|• Name<br>• Value|No |additionalFormatOptions|

## Related content

- [Snowflake connector overview](connector-snowflake-overview.md)
