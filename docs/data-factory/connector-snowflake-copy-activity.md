---
title: Configure Snowflake in a copy activity
description: This article explains how to copy data using Snowflake.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 01/22/2026
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

  :::image type="content" source="./media/connector-snowflake/source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-snowflake/source.png":::

The following properties are **required**:

- **Connection**:  Select a Snowflake connection from the connection list. If the connection doesn't exist, then create a new Snowflake connection.
    - **Additional connection properties**: Specify additional connection properties which will be used in Snowflake connection to set advanced options. Additional connection properties are provided as a dictionary of key-value pairs, for example, Role. For more information, see this [article](https://docs.snowflake.com/en/user-guide/security-access-control-overview#roles).
    
      :::image type="content" source="./media/connector-snowflake/additional-connection-properties.png" alt-text="Screenshot showing additional connection properties for source.":::

- **Database**: The default database to use once connected. It should be an existing database for which the specified role has privileges.
- **Use query**: You can choose either **Table** or **Query** as your use query. The following list describes the configuration of each setting.
    - **Table**: Select the table in your database from the drop-down list. Or check **Edit** to enter your table name manually.
    - **Query**: Specify the SQL query to read data from Snowflake. If the names of the schema, table and columns contain lower case, quote the object identifier in query e.g. `select * from "schema"."myTable"`.

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

    1. Create an [**Azure Blob Storage**](connector-azure-blob-storage.md) connection for the destination Azure Blob Storage with any supported authentication types.

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

  :::image type="content" source="./media/connector-snowflake/destination.png" alt-text="Screenshot showing Destination tab.":::

The following properties are **required**:

- **Connection**:  Select a Snowflake connection from the connection list. If the connection doesn't exist, then create a new Snowflake connection.
    - **Additional connection properties**: Specify additional connection properties which will be used in Snowflake connection to set advanced options. Additional connection properties are provided as a dictionary of key-value pairs, for example, Role. For more information, see this [article](https://docs.snowflake.com/en/user-guide/security-access-control-overview#roles).

      :::image type="content" source="./media/connector-snowflake/additional-connection-properties.png" alt-text="Screenshot showing additional connection properties for destination.":::

- **Database**: The default database to use once connected. It should be an existing database for which the specified role has privileges.
- **Table**: Select the table in your database from the drop-down list. Or check **Edit** to enter your table name manually.

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

    1. Create an [**Azure Blob Storage**](connector-azure-blob-storage.md) connection for the source Azure Blob Storage with any supported authentication types.

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

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Data type mapping for Snowflake

When copying data from Snowflake, the following mappings are used from Snowflake data types to interim data types used by the service internally.

| Snowflake data type | Interim service data type |
|--------------------|---------------------------------------------|
| NUMBER (p,0)       | Decimal                                     |
| NUMBER (p,s where s>0) | Decimal                                 |
| FLOAT              | Double                                      |
| VARCHAR            | String                                      |
| CHAR               | String                                      |
| BINARY             | Byte[]                                      |
| BOOLEAN            | Boolean                                     |
| DATE               | DateTime                                    |
| TIME               | TimeSpan                                    |
| TIMESTAMP_LTZ      | DateTimeOffset                              |
| TIMESTAMP_NTZ      | DateTimeOffset                              |
| TIMESTAMP_TZ       | DateTimeOffset                              |
| VARIANT            | String                                      |
| OBJECT             | String                                      |
| ARRAY              | String                                      |

## Table summary

The following tables contain more information about the copy activity in Snowflake.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|< your connection > |Yes|connection|
|**Additional connection properties** |Additional connection properties, provided as a dictionary of key-value pairs, for example, Role. For more information, see this [article](https://docs.snowflake.com/en/user-guide/security-access-control-overview#roles).|• Name<br>• Value|No |connectionProperties|
|**Database** |Your database that you use as source.|< your database > |Yes|database|
|**Use query** |The way to read data from Snowflake.|• Table <br> • Query |No |• table<br>• query|
|**Table** | The name of the table to read data. |< name of your source table>|Yes |schema <br> table|
|**Query**| The SQL query to read data from Snowflake. |< name of your source query>|Yes|query|
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
|**Database** |Your database that you use as destination.|< your database> |Yes|/|
|**Table** | Your destination data table. |< name of your destination table>|Yes |• schema <br> • table|
|**Pre-copy script**|A SQL query for the Copy activity to run before writing data into Snowflake in each run. Use this property to clean up the preloaded data.	|< your pre-copy script>|NO|preCopyScript|
|**Storage integration**| Specify the name of your storage integration that you created in the Snowflake. For the prerequisite steps of using the storage integration, see [Configuring a Snowflake storage integration](https://docs.snowflake.com/en/user-guide/data-load-azure-config#option-1-configuring-a-snowflake-storage-integration).| < your storage integration > |No|storageIntegration|
|**Additional Snowflake copy options** |Additional copy options, provided as a dictionary of key-value pairs. Examples: ON_ERROR, FORCE, LOAD_UNCERTAIN_FILES. For more information, see [Snowflake Copy Options](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table#copy-options-copyoptions).|• Name<br>• Value|No |additionalCopyOptions|
|**Additional Snowflake format options** |Additional file format options provided to the COPY command, provided as a dictionary of key-value pairs. Examples: DATE_FORMAT, TIME_FORMAT, TIMESTAMP_FORMAT. For more information, see [Snowflake Format Type Options](https://docs.snowflake.com/sql-reference/sql/copy-into-table#format-type-options-formattypeoptions).|• Name<br>• Value|No |additionalFormatOptions|

## Related content

- [Snowflake connector overview](connector-snowflake-overview.md)
