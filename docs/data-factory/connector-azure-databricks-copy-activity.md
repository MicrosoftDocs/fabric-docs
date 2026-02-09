---
title: Configure Azure Databricks in a copy activity
description: This article explains how to copy data using Azure Databricks.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 05/21/2025
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure Azure Databricks in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to Azure Databricks.

## Prerequisites

To use this Azure Databricks connector, you need to set up a cluster in Azure Databricks.

- To copy data to Azure Databricks, Copy activity invokes Azure Databricks cluster to read data from an Azure Storage, which is either your original source or a staging area to where the service firstly writes the source data via built-in staged copy. Learn more from [Azure Databricks as the destination](connector-azure-databricks-copy-activity.md#destination).
- Similarly, to copy data from Azure Databricks, Copy activity invokes Azure Databricks cluster to write data to an Azure Storage, which is either your original destination or a staging area from where the service continues to write data to final destination via built-in staged copy. Learn more from [Azure Databricks as the source](connector-azure-databricks-copy-activity.md#source).

The Databricks cluster needs to have access to Azure Blob or Azure Data Lake Storage Gen2 account, both the storage container/file system used for source/destination/staging and the container/file system where you want to write the Azure Databricks tables.

- To use **Azure Data Lake Storage Gen2**, you can configure a **service principal** on the Databricks cluster as part of the Apache Spark configuration. Follow the steps in [Access directly with service principal](/azure/databricks/data/data-sources/azure/azure-datalake-gen2#--access-directly-with-service-principal-and-oauth-20).

- To use **Azure Blob storage**, you can configure a **storage account access key** or **SAS token** on the Databricks cluster as part of the Apache Spark configuration. Follow the steps in [Access Azure Blob storage using the RDD API](/azure/databricks/data/data-sources/azure/azure-storage#access-azure-blob-storage-using-the-rdd-api).

During copy activity execution, if the cluster you configured has been terminated, the service automatically starts it. If you author pipeline using authoring UI, for operations like data preview, you need to have a live cluster, the service won't start the cluster on your behalf.

### Specify the cluster configuration

1. In the **Cluster Mode** drop-down, select **Standard**.

2. In the **Databricks Runtime Version** drop-down, select a Databricks runtime version.

3. Turn on [Auto Optimize](/azure/databricks/optimizations/auto-optimize) by adding the following properties to your [Spark configuration](/azure/databricks/clusters/configure#spark-config):

   ```
   spark.databricks.delta.optimizeWrite.enabled true
   spark.databricks.delta.autoCompact.enabled true
   ```

4. Configure your cluster depending on your integration and scaling needs.

For cluster configuration details, see [Configure clusters](/azure/databricks/clusters/configure).

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

    - **Database**: Select your database from the drop-down list or type the database.

    - **Table**: Specify the name of the table to read data. Select the table from the drop-down list or type the table name.

  - If you select **Query**:

    - **Query**: Specify the SQL query to read data. For the time travel control, follow the below pattern:<br>
      - `SELECT * FROM events TIMESTAMP AS OF timestamp_expression`
      - `SELECT * FROM events VERSION AS OF version`

    :::image type="content" source="./media/connector-azure-databricks/query.png" alt-text="Screenshot showing query." lightbox="./media/connector-azure-databricks/query.png":::

Under **Advanced**, you can specify the following fields:

- **Date format**: Format date type to string with a date format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd`.

- **Timestamp format**: Format timestamp type to string with a timestamp format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd'T'HH:mm:ss[.SSS][XXX]`.

#### Direct copy from Azure Databricks

If your destination data store and format meet the criteria described in this section, you can use the Copy activity to directly copy from Azure Databricks to destination. The service checks the settings and fails the Copy activity run if the following criteria is not met:

- The **destination connection** is [Azure Blob storage](connector-azure-blob-storage.md) or [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2.md). The account credential should be pre-configured in Azure Databricks cluster configuration, learn more from [Prerequisites](#prerequisites).

- The **destination data format** is of **Parquet**, **DelimitedText**, or **Avro** with the following configurations, and points to a folder instead of file.

    - For **Parquet** format, the compression codec is **None**, **snappy**, or **gzip**.
    - For **DelimitedText** format:
        - `rowDelimiter` is any single character.
        - `compression` can be **None**, **bzip2**, **gzip**.
        - `encodingName` UTF-7 is not supported.
    - For **Avro** format, the compression codec is **None**, **deflate**, or **snappy**.

- If copying data to DelimitedText, in copy activity sink, `fileExtension` need to be ".csv".
- In the Copy activity mapping, type conversion is not enabled.

#### Staged copy from Azure Databricks

When your sink data store or format does not match the direct copy criteria, as mentioned in the last section, enable the built-in staged copy using an interim Azure storage instance. The staged copy feature also provides you with better throughput. The service exports data from Azure Databricks into staging storage, then copies the data to sink, and finally cleans up your temporary data from the staging storage.

To use this feature, create an [Azure Blob storage](connector-azure-blob-storage.md) or [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2.md) that refers to the storage account as the interim staging. Then specify the `enableStaging` and `stagingSettings` properties in the Copy activity.

>[!NOTE]
>The staging storage account credential should be pre-configured in Azure Databricks cluster configuration, learn more from [Prerequisites](#prerequisites).

### Destination

The following properties are supported for Azure Databricks under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-azure-databricks/destination.png" alt-text="Screenshot showing destination tab.":::

The following properties are **required**:

- **Connection**: Select an Azure Databricks connection from the connection list. If no connection exists, then create a new Azure Databricks connection.

- **Catalog**: A catalog serves as the highest-level container within the Unity Catalog framework, it allows you to organize your data into databases and tables.

- **Database**: Select your database from the drop-down list or type the database.

- **Table**: Specify the name of the table to write data. Select the table from the drop-down list or type the table name.

Under **Advanced**, you can specify the following fields:

- **Pre-copy script**:  Specify a script for Copy Activity to execute before writing data into destination table in each run. You can use this property to clean up the pre-loaded data.

- **Timestamp format**: Format timestamp type to string with a timestamp format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd'T'HH:mm:ss[.SSS][XXX]`.

#### Direct copy to Azure Databricks

If your source data store and format meet the criteria described in this section, you can use the Copy activity to directly copy from source to Azure Databricks. The service checks the settings and fails the Copy activity run if the following criteria is not met:

- The **source connection** is [Azure Blob storage](connector-azure-blob-storage.md) or [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2.md). The account credential should be pre-configured in Azure Databricks cluster configuration, learn more from [Prerequisites](#prerequisites).

- The **source data format** is of **Parquet**, **DelimitedText**, or **Avro** with the following configurations, and points to a folder instead of file.

    - For **Parquet** format, the compression codec is **None**, **snappy**, or **gzip**.
    - For **DelimitedText** format:
        - `rowDelimiter` is default, or any single character.
        - `compression` can be **None**, **bzip2**, **gzip**.
        - `encodingName` UTF-7 is not supported.
    - For **Avro** format, the compression codec is **None**, **deflate**, or **snappy**.

- In the Copy activity source: 

    - `wildcardFileName` only contains wildcard `*` but not `?`, and `wildcardFolderName` is not specified.
    - `prefix`, `modifiedDateTimeStart`, `modifiedDateTimeEnd`, and `enablePartitionDiscovery` are not specified.

- In the Copy activity mapping, type conversion is not enabled.

#### Staged copy to Azure Databricks

When your source data store or format does not match the direct copy criteria, as mentioned in the last section, enable the built-in staged copy using an interim Azure storage instance. The staged copy feature also provides you with better throughput. The service automatically converts the data to meet the data format requirements into staging storage, then load data into Azure Databricks from there. Finally, it cleans up your temporary data from the storage.

To use this feature, create an [Azure Blob storage](connector-azure-blob-storage.md) or [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2.md) that refers to the storage account as the interim staging. Then specify the `enableStaging` and `stagingSettings` properties in the Copy activity.

>[!NOTE]
>The staging storage account credential should be pre-configured in Azure Databricks cluster configuration, learn more from [Prerequisites](#prerequisites).

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
|**Use query** |The way to read data. Apply **Table** to read data from the specified table or apply **Query** to read data using queries.| • **Table**<br>  • **Query** |No| / |
| For **Table** | | | | |
| **Catalog** | A catalog serves as the highest-level container within the Unity Catalog framework, it allows you to organize your data into databases and tables. | < your catalog > | No (choose default catalog if it’s null) | catalog |
|**Database** | Your database that you use as source.|< your database >| No |database|
|**Table** |Your source data table to read data.|< your table name >| No |table|
| For **Query** | | | | |
| **Query** | Specify the SQL query to read data. For the time travel control, follow the below pattern:<br>- `SELECT * FROM events TIMESTAMP AS OF timestamp_expression`<br>- `SELECT * FROM events VERSION AS OF version`| < your query > | No | query |
| | | | | |
|**Date format** |Format string to date type with a date format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd`. | < your date format > |No| dateFormat |
|**Timestamp format** |Format string to timestamp type with a timestamp format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd'T'HH:mm:ss[.SSS][XXX]`.| < your timestamp format > |No| timestampFormat |

### Destination information

|Name |Description |Value |Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the destination data store.|< your Azure Databricks connection >|Yes|connection|
| **Catalog** | A catalog serves as the highest-level container within the Unity Catalog framework, it allows you to organize your data into databases and tables. | < your catalog > | No (choose default catalog if it’s null) | catalog |
|**Database** | Your database that you use as destination.|< your database >|Yes |database|
|**Table** |Your destination data table to write data.|< your table name >|Yes|table|
|**Pre-copy script** |  Specify a script for Copy Activity to execute before writing data into destination table in each run. You can use this property to clean up the pre-loaded data. | < your pre-copy script> |No| preCopyScript |
|**Timestamp format** |Format string to timestamp type with a timestamp format. Custom date formats follow the formats at [datetime pattern](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html). If not specified, it uses the default value `yyyy-MM-dd'T'HH:mm:ss[.SSS][XXX]`.| < your timestamp format > |No| timestampFormat |

## Related content

- [Azure Databricks connector overview](connector-azure-databricks-overview.md)
