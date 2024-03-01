---
title: How to configure Binary format in the data pipeline of Data Factory in Microsoft Fabric
description: This article explains how to configure Binary format in the data pipeline of Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Binary format for Data Factory in Microsoft Fabric

This article outlines how to configure Binary format in Data Factory.

## Supported capabilities

Binary format is supported for the following activities and connectors as source and destination.

| Category | Connector/Activity |
|---|---|
| **Supported connector** | [Amazon S3](connector-amazon-s3-copy-activity.md) |
|  | [Azure Blob Storage](connector-azure-blob-storage-copy-activity.md) |
|  | [Azure Data Lake Storage Gen1](connector-azure-data-lake-storage-gen1-copy-activity.md) |
|  | [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-copy-activity.md) |
|  | [Google Cloud Storage](connector-google-cloud-storage-copy-activity.md) |
|  | [HTTP](connector-http-copy-activity.md)|
| **Supported activity** | [Copy activity](copy-data-activity.md) |
|  | [GetMetadata activity](get-metadata-activity.md) |
|  | [Delete activity](delete-data-activity.md) |

## Binary format in copy activity

To configure Binary format, choose your connection in the source or destination of the data pipeline copy activity, and then select **Binary** in the drop-down list of **File format**. Select **Settings** for further configuration of this format.

:::image type="content" source="./media/format-common/file-settings.png" alt-text="Screenshot showing file settings button.":::

>[!Note]
> When using Binary format in a copy activity, source and destination should both use Binary format.

### Binary as source

After you select **Settings** in the **File format** section under the **Source** tab, the following properties are displayed in the pop-up **File format settings** dialog box.

:::image type="content" source="./media/format-binary/file-format-settings.png" alt-text="Screenshot showing file format settings.":::

- **Compression type**: The compression codec used to read binary files.
You can choose from the **None**, **bzip2**, **gzip**, **deflate**, **ZipDeflate**, **TarGzip**, or **tar** type in the drop-down list.

  If you select **ZipDeflate** as the compression type, **Preserve zip file name as folder** is displayed under the **Advanced** settings in the **Source** tab.

  - **Preserve zip file name as folder**: Indicates whether to preserve the source zip file name as a folder structure during copy.
    - If this box is checked (default), the service writes unzipped files to `<specified file path>/<folder named as source zip file>/`.
    - If this box is unchecked, the service writes unzipped files directly to `<specified file path>`. Make sure you don't have duplicated file names in different source zip files to avoid racing or unexpected behavior.

  If you select **TarGzip/tar** as the compression type, **Preserve compression file name as folder** is displayed under the **Advanced** settings in the **Source** tab.

  - **Preserve compression file name as folder**: Indicates whether to preserve the source compressed file name as a folder structure during copy.
    - If this box is checked (default), the service writes decompressed files to `<specified file path>/<folder named as source compressed file>/`.
    - If this box is unchecked, the service writes decompressed files directly to `<specified file path>`. Make sure you don't have duplicated file names in different source zip files to avoid racing or unexpected behavior.

- **Compression level**: The compression ratio. You can choose from **Optimal** or **Fastest**.

  - **Fastest**: The compression operation should complete as quickly as possible, even if the resulting file isn't optimally compressed.
  - **Optimal**: The compression operation should be optimally compressed, even if the operation takes a longer time to complete. For more information, go to the[Compression Level](/dotnet/api/system.io.compression.compressionlevel) article.

Under **Advanced** settings in the **Source** tab, further Binary format related property are displayed.

- **Delete files after completion**: Indicates whether the binary files are deleted from the source store after successfully moving to the destination store. The file deletion is per file. So when a copy activity fails, some files have already been copied to the destination and deleted from the source, while others still remain on the source store.

### Binary as destination

After you select **Settings** in the **File format** section under the **Destination** tab, following properties are displayed in the pop-up **File format settings** dialog box.

:::image type="content" source="./media/format-binary/file-format-settings.png" alt-text="Screenshot showing selecting file format.":::

- **Compression type**: The compression codec used to write binary files.
You can choose from the **None**, **bzip2**, **gzip**, **deflate**, **ZipDeflate**, **TarGzip** or **tar** type in the drop-down list.

- **Compression level**: The compression ratio. You can choose from **Optimal** or **Fastest**.

  - **Fastest**: The compression operation should complete as quickly as possible, even if the resulting file isn't optimally compressed.
  - **Optimal**: The compression operation should be optimally compressed, even if the operation takes a longer time to complete. For more information, go to the [Compression Level](/dotnet/api/system.io.compression.compressionlevel) article.

## Table summary

### Binary as source

The following properties are supported in the copy activity **Source** section when using Binary format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **File format**|The file format that you want to use.| **Binary**|Yes|type (*under `datasetSettings`*):<br>Binary|
|**Compression type**|The compression codec used to read binary files.|Choose from:<br>**None**<br>**bzip2** <br>**gzip**<br>**deflate**<br>**ZipDeflate**<br>**TarGzip** <br>**tar**|No|type (*under `compression`*):  <br><br>bzip2<br>gzip<br>deflate<br>ZipDeflate<br>TarGzip <br>tar|
|**Compression level** |The compression ratio. Allowed values are Optimal or Fastest.|**Optimal** or **Fastest**|No |level (*under `compression`*): <br>Fastest<br>Optimal |
|**Preserve zip file name as folder**|Indicates whether to preserve the source zip file name as a folder structure during copy.| Selected or unselect|No |preserveZipFileNameAsFolder <br> (*under `compressionProperties`->`type` as `ZipDeflateReadSettings`*)|
|**Preserve compression file name as folder**|Indicates whether to preserve the source compressed file name as a folder structure during copy.| Selected or unselect|No|preserveCompressionFileNameAsFolder  <br> (*under `compressionProperties`->`type` as `TarGZipReadSettings` or `TarReadSettings`*)|
|**Delete files after completion** |Indicates whether the binary files are deleted from the source store after successfully moving to the destination store. | Selected or unselect|No | deleteFilesAfterCompletion: <br>true or false|

### Binary as destination

The following properties are supported in the copy activity **Destination** section when using Binary format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **File format**|The file format that you want to use.| **Binary**|Yes|type (*under `datasetSettings`*):<br>Binary |
|**Compression type**|The compression codec used to write binary files.|Choose from:<br>**None**<br>**bzip2** <br>**gzip**<br>**deflate**<br>**ZipDeflate**<br>**TarGzip** <br>**tar**|No|type (*under `compression`*):  <br><br>bzip2<br>gzip<br>deflate<br>ZipDeflate<br>TarGzip <br>tar|
|**Compression level** |The compression ratio. Allowed values are Optimal or Fastest.|**Optimal** or **Fastest**|No |level (*under `compression`*): <br>Fastest<br>Optimal |

## Related content

- [Connectors overview](connector-overview.md)
- [Connect to Binary format in dataflows](connector-binary-dataflows.md)
