---
title: How to configure ORC format in the data pipeline of Data Factory in Microsoft Fabric
description: This article explains how to configure ORC format in the data pipeline of Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# ORC format in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]

This article outlines how to configure ORC format in the data pipeline of Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

## Supported capabilities

ORC format is supported for the following activities and connectors as a source and destination.

| Category | Connector/Activity |
|---|---|
| **Supported connector** | [Amazon S3](connector-amazon-s3-copy-activity.md) |
|  | [Azure Blob Storage](connector-azure-blob-storage-copy-activity.md) |
|  | [Azure Data Lake Storage Gen1](connector-azure-data-lake-storage-gen1-copy-activity.md) |
|  | [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-copy-activity.md)|
|  | [FTP](connector-ftp-copy-activity.md) |
|  | [Google Cloud Storage](connector-google-cloud-storage-copy-activity.md) |
|  | [HTTP](connector-http-copy-activity.md)|
|  | [SFTP](connector-sftp-copy-activity.md)|
| **Supported activity** | [Copy activity](copy-data-activity.md) |
|  | [Lookup activity](lookup-activity.md) |
|  | [GetMetadata activity](get-metadata-activity.md) |
|  | [Delete data activity](delete-data-activity.md) |

## ORC format in copy activity

To configure ORC format, choose your connection in the source or destination of data pipeline copy activity, and then select **ORC** in the drop-down list of **File format**. Select **Settings** for further configuration of this format.

:::image type="content" source="./media/format-common/file-settings.png" alt-text="Screenshot showing file format settings.":::

### ORC format as source

After you select **Settings** in the **File format** section, the following properties are shown in the pop-up **File format settings** dialog box.

:::image type="content" source="./media/format-orc/file-settings.png" alt-text="Screenshot showing ORC file format source.":::

- **Compression type**: Choose the compression codec used to read ORC files in the drop-down list. You can choose from **None**, **zlib** or **snappy**.

### ORC format as destination

After you select **Settings**, the following properties are shown in the pop-up **File format settings** dialog box.

:::image type="content" source="./media/format-orc/file-settings.png" alt-text="Screenshot showing ORC file format destination.":::

- **Compression type**: Choose the compression codec used to write ORC files in the drop-down list. You can choose from **None**, **zlib** or **snappy**.

Under **Advanced** settings in the **Destination** tab, the following ORC format related properties are displayed.

- **Max rows per file**: When writing data into a folder, you can choose to write to multiple files and specify the maximum rows per file. Specify the maximum rows that you want to write per file.
- **File name prefix**: Applicable when **Max rows per file** is configured. Specify the file name prefix when writing data to multiple files, resulted in this pattern: `<fileNamePrefix>_00000.<fileExtension>`. If not specified, the file name prefix is auto generated. This property doesn't apply when the source is a file based store or a partition option enabled data store.

## Table summary

### ORC as source

The following properties are supported in the copy activity **Source** section when using ORC format.

|Name|Description|Value|Required|JSON script property|
|:---|:---|:---|:---|:---|
|**File format**|The file format that you want to use.|**ORC**|Yes|type *(under `datasetSettings`)*:<br>Orc|
|**Compression type**|The compression codec used to read ORC files.|**None**<br>**zlib**<br>**snappy**|No|orcCompressionCodec:<br>none<br>zlib<br>snappy|

### ORC as destination

The following properties are supported in the copy activity **Destination** section when using the ORC format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**File format**|The file format that you want to use.|**ORC**|Yes|type *(under `datasetSettings`)*:<br>Orc|
|**Compression type**|The compression codec used to write ORC files.|**None**<br>**zlib**<br>**snappy**|No|orcCompressionCodec:<br>none<br>zlib<br>snappy|
|**Max rows per file**| When writing data into a folder, you can choose to write to multiple files and specify the maximum rows per file. Specify the maximum rows that you want to write per file.|\<your max rows per file> | No| maxRowsPerFile |
|**File name prefix**| Applicable when **Max rows per file** is configured. Specify the file name prefix when writing data to multiple files, resulted in this pattern: `<fileNamePrefix>_00000.<fileExtension>`. If not specified, the file name prefix is auto generated. This property doesn't apply when the source is a file based store or a partition option enabled data store.|\<your file name prefix> |No| fileNamePrefix|

## Related content

- [Connectors overview](connector-overview.md)
