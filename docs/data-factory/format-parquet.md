---
title: How to configure Parquet format in the data pipeline of Data Factory in Microsoft Fabric
description: This article explains how to configure Parquet format in the data pipeline of Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/23/2023
ms.custom: template-how-to 
---

# Parquet format in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This article outlines how to configure Parquet format in the data pipeline of Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

## Supported capabilities

Parquet format is supported for the following activities and connectors as source and destination.

| Category | Connector/Activity | 
|---|---|
| **Supported connector** | [Amazon S3](connector-amazon-s3-copy-activity.md) |
|  | [Azure Blob Storage](connector-azure-blob-storage-copy-activity.md) |
|  | Azure Data Lake Storage Gen1 |
|  | [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-copy-activity.md)|
|  | [Google Cloud Storage](connector-google-cloud-storage-copy-activity.md) | 
|  | [HTTP](connector-http-copy-activity.md)| 
| **Supported activity** | [Copy activity](copy-data-activity.md) |
|  | [Lookup activity](lookup-activity.md) |
|  | GetMetadata activity |
|  | Delete activity | 

## Parquet format in copy activity

To configure parquet format, choose your connection in the source or destination of data pipeline copy activity, and then select **Parquet** in the drop-down list of **File format**. Select **Settings** for further configuration of this format.

:::image type="content" source="./media/format-common/file-settings.png" alt-text="Screenshot showing file format settings.":::

### Parquet format as source 

After selecting **Settings** in **File format** section, following properties are shown up in the pop-up **File format settings** dialog box.

:::image type="content" source="./media/format-parquet/source-file-settings.png" alt-text="Screenshot showing parquet file format source.":::

- **Compression type**: Choose the compression codec used to read Parquet files in the drop-down list. You can choose from **None**, **gzip (.gz)**, **snappy**, **lzo**, **Brotli (.br)**, **Zstandard**, **lz4**, **lz4frame**, **bzip2 (.bz2)**, **lz4hadoop**.

### Parquet format as destination

After selecting **Settings**, following properties are shown up in the pop-up **File format settings** dialog box.

:::image type="content" source="./media/format-parquet/destination-file-settings.png" alt-text="Screenshot showing parquet file format destination.":::

- **Enable Verti-Parquet**: Select this checkbox to optimize with Verti-Parquet technology.
- **Compression type**: Choose the compression codec used to write Parquet files in the drop-down list. You can choose from **None**, **gzip (.gz)**, **snappy**, **lzo**, **Brotli (.br)**, **Zstandard**, **lz4**, **lz4frame**, **bzip2 (.bz2)**, **lz4hadoop**.

Under **Advanced** settings in **Destination** tab, further parquet format related property are shown up.

- **Max rows per file**: When writing data into a folder, you can choose to write to multiple files and specify the max rows per file. Specify the max rows that you want to write per file.
- **File name prefix**: Applicable when **Max rows per file** is configured. Specify the file name prefix when writing data to multiple files, resulted in this pattern: `<fileNamePrefix>_00000.<fileExtension>`. If not specified, file name prefix will be auto generated. This property does not apply when source is file based store or partition option enabled data store.

## Table summary

### Parquet as source

The following properties are supported in the copy activity **Source** section when using Parquet format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **File format**|The file format that you want to use.| **Parquet**|Yes|type (*under `datasetSettings`*):<br>Parquet|
|**Compression type**|The compression codec used to read Parquet files.|Choose from: <br>**None** <br>**gzip (.gz)**<br>**snappy**<br>**lzo**<br>**Brotli (.br)**<br>**Zstandard**<br>**lz4**<br>**lz4frame**<br>**bzip2 (.bz2)**<br>**lz4hadoop** |No|compressionCodec: <br><br>gzip<br>snappy<br>lzo<br>brotli<br>zstd<br>lz4<br>lz4frame<br>bz2<br>lz4hadoop|


### Parquet as destination

The following properties are supported in the copy activity **Destination** section when using Parquet format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **File format**|The file format that you want to use.| **Parquet**|Yes|type (*under `datasetSettings`*):<br>Parquet|
|**Compression type**|The compression codec used to write Parquet files.|Choose from: <br>**None** <br>**gzip (.gz)**<br>**snappy**<br>**lzo**<br>**Brotli (.br)**<br>**Zstandard**<br>**lz4**<br>**lz4frame**<br>**bzip2 (.bz2)**<br>**lz4hadoop** |No|compressionCodec: <br><br>gzip<br>snappy<br>lzo<br>brotli<br>zstd<br>lz4<br>lz4frame<br>bz2<br>lz4hadoop|
|**Max rows per file**| When writing data into a folder, you can choose to write to multiple files and specify the max rows per file. Specify the max rows that you want to write per file.|< your max rows per file > | No| maxRowsPerFile |
|**File name prefix**| Applicable when **Max rows per file** is configured. Specify the file name prefix when writing data to multiple files, resulted in this pattern: `<fileNamePrefix>_00000.<fileExtension>`. If not specified, file name prefix will be auto generated. This property does not apply when source is file based store or partition option enabled data store.|< your file name prefix > |No| fileNamePrefix|