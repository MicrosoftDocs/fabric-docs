---
title: Configure Snowflake in a copy activity
description: This article explains how to copy data using Snowflake.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 03/04/2026
ms.custom:
  - pipelines
  - template-how-to
  - connectors
---

# Configure Snowflake in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to Snowflake.

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

  :::image type="content" source="./media/connector-snowflake/snowflake-source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-snowflake/source.png":::

The following properties are **required**:

- **Connection**:  Select a Snowflake connection from the connection list. If the connection doesn't exist, then create a new Snowflake connection.
    - **Additional connection properties**: Specify additional connection properties which will be used in Snowflake connection to set advanced options. Additional connection properties are provided as a dictionary of key-value pairs.
      - **Role**: The default security role used for the session after connecting. For more information, see this [article](https://docs.snowflake.com/en/user-guide/security-access-control-overview#roles).
    
        :::image type="content" source="./media/connector-snowflake/additional-connection-properties.png" alt-text="Screenshot showing additional connection properties for source.":::

- **Database**: The default database to use once connected. It should be an existing database for which the specified role has privileges.

- **Use query**: You can choose either **Table** or **Query** as your use query. The following list describes the configuration of each setting.
    - **Table**: Select the table in your database from the drop-down list. Or check **Edit** to enter your table name manually.
    - **Query**: Specify the SQL query to read data from Snowflake. If the names of the schema, table and columns contain lower case, quote the object identifier in query e.g. `select * from "schema"."myTable"`.

- **Version**: Specify the version. Recommend upgrading to the latest version to take advantage of the newest enhancements. To learn the difference between various versions, go to this [section](#differences-between-snowflake-versions).

Under **Advanced**, you can specify the following fields:

- **Storage integration**: Specify the name of your storage integration that you created in the Snowflake. For the prerequisite steps of using the storage integration, see [Configuring a Snowflake storage integration](https://docs.snowflake.com/en/user-guide/data-load-azure-config#option-1-configuring-a-snowflake-storage-integration).

- **Additional Snowflake copy options**: Specify additional Snowflake copy options which will be used in Snowflake COPY statement to load data. Additional copy options are provided as a dictionary of key-value pairs. Examples: MAX_FILE_SIZE, OVERWRITE. For more information, see [Snowflake Copy Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location#copy-options-copyoptions).

  :::image type="content" source="./media/connector-snowflake/copy-options-source.png" alt-text="Screenshot showing additional snowflake copy options for source.":::

- **Additional Snowflake format options**: Specify additional Snowflake format options, which will be used in Snowflake COPY statement to load data. Additional file format options provided to the COPY command are provided as a dictionary of key-value pairs. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Snowflake Format Type Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location#format-type-options-formattypeoptions).

  :::image type="content" source="./media/connector-snowflake/format-options-source.png" alt-text="Screenshot showing additional snowflake format options for source.":::

#### Direct copy from Snowflake

If your destination data store and format meet the criteria described in this section, you can use the Copy activity to directly copy from Snowflake to destination. The service checks the settings and fails the Copy activity run if the following criteria is not met:

  - When you specify **Storage integration** in the source:
    The destination data store is the Azure Blob Storage that you referred in the external stage in Snowflake. You need to complete the following steps before copying data:

    1. Create an [**Azure Blob Storage**](connector-azure-blob-storage.md) connection for the destination Azure Blob Storage using any supported authentication type, except the organizational account authentication.

    2. Grant at least **Storage Blob Data Contributor** role to the Snowflake service principal in the destination Azure Blob Storage **Access Control (IAM)**.

  - When you don't specify **Storage integration** in the source:

    The **destination connection** is [**Azure Blob storage**](connector-azure-blob-storage.md) with **shared access signature** authentication. If you want to directly copy data to Azure Data Lake Storage Gen2 in the following supported format, you can create an Azure Blob Storage connection with SAS authentication against your Azure Data Lake Storage Gen2 account, to avoid using [staged copy from Snowflake](#staged-copy-from-snowflake).

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

#### Staged copy from Snowflake

When your destination data store or format isn't natively compatible with the Snowflake COPY command, as mentioned in the last section, enable the built-in staged copy using an interim Azure Blob storage instance. The staged copy feature also provides you with better throughput. The service exports data from Snowflake into staging storage, then copies the data to destination, and finally cleans up your temporary data from the staging storage.

To use this feature, create an [Azure Blob storage connection](connector-azure-blob-storage.md#set-up-your-connection-for-a-pipeline) that refers to the Azure storage account as the interim staging. Then go to **Settings** tab to configure your staging settings. You need to select **External** to configure the Azure Blob Storage staging connection.

- When you specify **Storage integration** in the source, the interim staging Azure Blob Storage should be the one that you referred in the external stage in Snowflake. Ensure that you create an [Azure Blob Storage](connector-azure-blob-storage.md) connection for it with any supported authentication, and grant at least **Storage Blob Data Contributor** role to the Snowflake service principal in the staging Azure Blob Storage **Access Control (IAM)**. The **Storage path** under **Staging settings** in **Settings** tab is required.

- When you don't specify **Storage integration** in the source, the staging Azure Blob Storage connection must use shared access signature authentication, as required by the Snowflake COPY command. Make sure you grant proper access permission to Snowflake in the staging Azure Blob Storage. To learn more about this, see this [article](https://docs.snowflake.com/en/user-guide/data-load-azure-config#option-2-generating-a-sas-token).

### Destination

The following properties are supported for Snowflake under the **Destination** tab of a copy activity.

  :::image type="content" source="./media/connector-snowflake/snowflake-destination.png" alt-text="Screenshot showing Destination tab.":::

The following properties are **required**:

- **Connection**:  Select a Snowflake connection from the connection list. If the connection doesn't exist, then create a new Snowflake connection.
    - **Additional connection properties**: Specify additional connection properties which will be used in Snowflake connection to set advanced options. Additional connection properties are provided as a dictionary of key-value pairs, for example, Role. For more information, see this [article](https://docs.snowflake.com/en/user-guide/security-access-control-overview#roles).

      :::image type="content" source="./media/connector-snowflake/additional-connection-properties.png" alt-text="Screenshot showing additional connection properties for destination.":::

- **Database**: The default database to use once connected. It should be an existing database for which the specified role has privileges. 

- **Table**: Select the table in your database from the drop-down list. Or check **Edit** to enter your table name manually. If the destination table doesn't exist, it is automatically created based on the source data. Automatic table creation is supported in version 1.1 or above. For more details about the mapping for auto-created tables, go to [Edit destination data types](#edit-destination-data-types) and [Default data type mapping for Snowflake auto-created table](#default-data-type-mapping-for-snowflake-auto-created-table).

- **Version**: Specify the version. Recommend upgrading to the latest version to take advantage of the newest enhancements. To learn the difference between various versions, go to this [section](#differences-between-snowflake-versions).

- **Write behavior**: Describes how to write data to Snowflake. It is only available in version 1.1 or above. Allowed values are **Insert** (default) and **Upsert**. 
    - **Insert**: Choose this option if your source data has inserts.
    - **Upsert**: Insert new values to existing table and update existing values.
        - **Key columns**: Choose which column is used to determine if a row from the source matches a row from the destination. You can specify one or more columns to be treated as key columns. If the key column is not specified, the primary key of the destination table is used as the key column.

Under **Advanced**, you can specify the following fields:

- **Pre-copy script**: Specify a script for Copy Activity to execute before writing data into destination table in each run. You can use this property to clean up the pre-loaded data.

- **Storage integration**: Specify the name of your storage integration that you created in the Snowflake. For the prerequisite steps of using the storage integration, see [Configuring a Snowflake storage integration](https://docs.snowflake.com/en/user-guide/data-load-azure-config#option-1-configuring-a-snowflake-storage-integration).

- **Additional Snowflake copy options**: Specify additional Snowflake copy options, which will be used in Snowflake COPY statement to load data. Additional copy options are provided as a dictionary of key-value pairs. Examples: ON_ERROR, FORCE, LOAD_UNCERTAIN_FILES. For more information, see [Snowflake Copy Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#copy-options-copyoptions).

  :::image type="content" source="./media/connector-snowflake/copy-options-destination.png" alt-text="Screenshot showing additional snowflake copy options for destination.":::

- **Additional Snowflake format options**: Specify additional Snowflake format options, which will be used in Snowflake COPY statement to load data. Additional file format options provided to the COPY command are provided as a dictionary of key-value pairs. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Snowflake Format Type Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#format-type-options-formattypeoptions).

  :::image type="content" source="./media/connector-snowflake/format-options-destination.png" alt-text="Screenshot showing additional snowflake format options for destination.":::

#### Direct copy to Snowflake

If your source data store and format meet the criteria described in this section, you can use the Copy activity to directly copy from source to Snowflake. The service checks the settings and fails the Copy activity run if the following criteria is not met:

- When you specify **Storage integration** in the destination:
  
  The source data store is the Azure Blob Storage that you referred in the external stage in Snowflake. You need to complete the following steps before copying data:

    1. Create an [**Azure Blob Storage**](connector-azure-blob-storage.md) connection for the source Azure Blob Storage using any supported authentication type, except the organizational account authentication.

    2. Grant at least **Storage Blob Data Reader** role to the Snowflake service principal in the source Azure Blob Storage **Access Control (IAM)**.

- When you don't specify **Storage integration** in the destination:

  The **source connection** is [**Azure Blob storage**](connector-azure-blob-storage.md) with **shared access signature** authentication. If you want to directly copy data from Azure Data Lake Storage Gen2 in the following supported format, you can create an Azure Blob Storage connection with SAS authentication against your Azure Data Lake Storage Gen2 account, to avoid using [staged copy to Snowflake](#staged-copy-to-snowflake).

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

#### Staged copy to Snowflake

When your source data store or format isn't natively compatible with the Snowflake COPY command, as mentioned in the last section, enable the built-in staged copy using an interim Azure Blob storage instance. The staged copy feature also provides you with better throughput. The service automatically converts the data to meet the data format requirements of Snowflake. It then invokes the COPY command to load data into Snowflake. Finally, it cleans up your temporary data from the blob storage.

To use this feature, create an [Azure Blob storage connection](connector-azure-blob-storage.md#set-up-your-connection-for-a-pipeline) that refers to the Azure storage account as the interim staging. Then go to **Settings** tab to configure your staging settings. You need to select **External** to configure the Azure Blob Storage staging connection.

- When you specify **Storage integration** in the destination, the interim staging Azure Blob Storage should be the one that you referred in the external stage in Snowflake. Ensure that you create an [Azure Blob Storage](connector-azure-blob-storage.md) connection for it with any supported authentication, and grant at least **Storage Blob Data Reader** role to the Snowflake service principal in the staging Azure Blob Storage **Access Control (IAM)**. The **Storage path** under **Staging settings** in **Settings** tab is required.

- When you don't specify **Storage integration** in the destination, the staging Azure Blob Storage connection need to use shared access signature authentication as required by the Snowflake COPY command.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

#### Edit destination data types

For the **Mapping** tab configuration, when Snowflake is used as the destination  and the destination table is auto-created, except the configuration in [Mapping](copy-data-activity.md#configure-your-mappings-under-mapping-tab), you can edit the type for your destination columns. After selecting **Import schemas**, you can specify the column type in your destination. For more information about the mapping rules, go to [Data type mapping for Snowflake](#data-type-mapping-for-snowflake).

For example, you can set the type of the *decimal* column to NUMBER and adjust its precision and scale as needed when mapping it to the destination.

:::image type="content" source="media/connector-snowflake/configure-mapping-destination-type.png" alt-text="Screenshot of mapping destination column type.":::

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Data type mapping for Snowflake

When copying data from Snowflake, the following mappings are used from Snowflake data types to interim data types used by the service internally.

| Snowflake data type | Interim data type |
|:--- |:--- |
| NUMBER(p,0)       | Decimal                                     |
| NUMBER(p,s where s>0) | Decimal                                 |
| FLOAT              | Double                                      |
| VARCHAR            | String                                      |
| CHAR               | String                                      |
| BINARY             | Byte array                                  |
| BOOLEAN            | Boolean                                     |
| DATE               | DateTime                                    |
| TIME               | TimeSpan                                    |
| TIMESTAMP_LTZ      | DateTimeOffset                              |
| TIMESTAMP_NTZ      | DateTimeOffset                              |
| TIMESTAMP_TZ       | DateTimeOffset                              |
| VARIANT            | String                                      |
| OBJECT             | String                                      |
| ARRAY              | String                                      |

When copying data to Snowflake, the following mappings are used from interim data types used by the service internally to Snowflake data types.

| Interim data type | Snowflake data type |
|:--- |:--- |
| Decimal | NUMBER <br> (0 < s < p < 38) |
| Byte, SByte, Int16, UInt16, Int32, UInt32, Int64, UInt64 | NUMBER <br> ( S = 0, 0 < p < 38) |
| Double, Single | FLOAT |
| String, GUID | VARCHAR <br> ( 0 < Length <= 16777216) |
| Byte array | BINARY <br> (0 < Length <= 8388608) |
| Boolean | BOOLEAN |
| Date | DATE |
| Time | TIME |
| DateTime | TIMESTAMP_NTZ |
| DateTimeOffset | TIMESTAMP_TZ, TIMESTAMP_LTZ <br> (0 <= p <= 9) |

To learn about how the copy activity maps the source schema and data type to the destination, see [Schema and data type mappings](data-type-mapping-data-movement.md).

### Default data type mapping for Snowflake auto-created table

The following table describes the default mappings from interim data types used internally by the service to Snowflake data types when the destination table is created automatically.

| Interim data type | Snowflake data type |
|:--- |:--- |
| String, GUID | VARCHAR(16777216) |
| Byte, SByte, Int16, UInt16, Int32, UInt32, Int64, UInt64 | NUMBER(38,0) |
| Decimal | NUMBER(38,18) |
| Single, Double | FLOAT |
| Boolean | BOOLEAN |
| Date | DATE |
| Time | TIME |
| DateTime | TIMESTAMP_NTZ |
| DateTimeOffset | TIMESTAMP_TZ(9) |
| Byte array | BINARY(8388608) |

## Differences between Snowflake versions

The table below shows the feature differences between various versions.

| Version 1.1 | Version 1.0 |
|-------------|-------------|
| Support **Write behavior**. | **Write behavior** is not supported. |
| Support automatic table creation when the destination table doesn't exist. | Automatic table creation is not supported. |

## Table summary

The following tables contain more information about the copy activity in Snowflake.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|< your connection > |Yes|connection|
|**Additional connection properties** |Additional connection properties, provided as a dictionary of key-value pairs, for example, Role. For more information, see this [article](https://docs.snowflake.com/en/user-guide/security-access-control-overview#roles).|• Name<br>• Value|No |connectionProperties|
|**Database** |Your database that you use as source.|< your database > |Yes|typeProperties (under *`typeProperties`* -> *`source`*)<br>&nbsp; - database|
|**Use query** |The way to read data from Snowflake.|/ |Yes |/ |
|**Table** | The name of the table to read data. |< name of your source table>|Yes |typeProperties (under *`typeProperties`* -> *`source`*)<br>&nbsp; - schema<br>&nbsp; - table|
|**Query**| The SQL query to read data from Snowflake. |< name of your source query>|Yes|query|
|**Version** |The version that you specify. Recommend upgrading to the latest version to take advantage of the newest enhancements.| • 1.1<br>• 1.0 |No |version|
|**Storage integration**| Specify the name of your storage integration that you created in the Snowflake. For the prerequisite steps of using the storage integration, see [Configuring a Snowflake storage integration](https://docs.snowflake.com/en/user-guide/data-load-azure-config#option-1-configuring-a-snowflake-storage-integration).| < your storage integration > |No|storageIntegration|
|**Additional Snowflake copy options** |Additional copy options, provided as a dictionary of key-value pairs. Examples: MAX_FILE_SIZE, OVERWRITE. For more information, see [Snowflake Copy Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location#copy-options-copyoptions).|• Name<br>• Value|No |additionalCopyOptions|
|**Additional Snowflake format options** |Additional file format options that are provided to COPY command as a dictionary of key-value pairs. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Snowflake Format Type Options](https://docs.snowflake.com/sql-reference/sql/copy-into-location#format-type-options-formattypeoptions).|• Name<br>• Value|No |additionalFormatOptions|

### Destination

> [!NOTE]
> While non-Azure Snowflake instances are supported for source, only Azure Snowflake instances are currently supported for [Snowflake destinations](/azure/data-factory/connector-snowflake#direct-copy-from-snowflake) (also referred to as sinks in Azure Data Factory).

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the destination data store.|< your connection > |Yes|connection|
|**Additional connection properties** |Additional connection properties, provided as a dictionary of key-value pairs, for example, Role. For more information, see this [article](https://docs.snowflake.com/en/user-guide/security-access-control-overview#roles).|• Name<br>• Value|No |connectionProperties|
|**Database** |Your database that you use as destination.|< your database> |Yes|typeProperties (under *`typeProperties`* -> *`sink`*)<br>&nbsp;- database |
|**Table** | Your destination data table. |< name of your destination table>|Yes |typeProperties (under *`typeProperties`* -> *`sink`*)<br>&nbsp; - schema<br>&nbsp; - table|
|**Version** |The version that you specify. Recommend upgrading to the latest version to take advantage of the newest enhancements.| • 1.1<br>• 1.0 |No |version|
|**Write behavior** |Describes how to write data to Snowflake (only available in version 1.1 or above).| • insert (default)<br>• upsert|No |writeBehavior|
|**Key columns** |The column is used to determine if a row from the source matches a row from the destination. You can specify one or more columns to be treated as key columns. If the key column is not specified, the primary key of the destination table is used as the key column.|< key columns > |No |keys (under *`upsertSettings`*)|
|**Pre-copy script**|A SQL query for the Copy activity to run before writing data into Snowflake in each run. Use this property to clean up the preloaded data.	|< your pre-copy script>|NO|preCopyScript|
|**Storage integration**| Specify the name of your storage integration that you created in the Snowflake. For the prerequisite steps of using the storage integration, see [Configuring a Snowflake storage integration](https://docs.snowflake.com/en/user-guide/data-load-azure-config#option-1-configuring-a-snowflake-storage-integration).| < your storage integration > |No|storageIntegration|
|**Additional Snowflake copy options** |Additional copy options, provided as a dictionary of key-value pairs. Examples: ON_ERROR, FORCE, LOAD_UNCERTAIN_FILES. For more information, see [Snowflake Copy Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#copy-options-copyoptions).|• Name<br>• Value|No |additionalCopyOptions|
|**Additional Snowflake format options** |Additional file format options provided to the COPY command, provided as a dictionary of key-value pairs. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Snowflake Format Type Options](https://docs.snowflake.com/sql-reference/sql/copy-into-table#format-type-options-formattypeoptions).|• Name<br>• Value|No |additionalFormatOptions|

## Related content

- [Snowflake connector overview](connector-snowflake-overview.md)
