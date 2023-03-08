---
title: How to configure Binary format in Data Factory
description: This article explains how to configure Binary format in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 03/07/2023
ms.custom: template-how-to 
---

# Binary format in Data Factory

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here

## Supported capabilities

Binary format is supported for the following connectors and activities.

|**Supported connector**|
|:---|
|Amazon S3|
|[Azure Blob Storage](connector-azure-blob-storage-copy-activity.md)|
|[Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-copy-activity.md)|
|Google Cloud Storage|
|[HTTP](connector-http-copy-activity.md)|
|REST|
|**Supported activity**|
|Copy activity|
|GetMetadata activity|
|Delete activity|

## Binary format in copy activity

You can find the file format settings by selecting **File settings** in source or destination in data pipeline copy activity.

:::image type="content" source="./media/format-common/file-settings.png" alt-text="Screenshot showing file settings button.":::

>[!Note]
> When using Binary format in copy activity, source and destination should both use Binary format.

### Binary as source 

After selecting **File settings** under **Source** tab, you can see the following properties:

:::image type="content" source="./media/format-binary/select-file-format.png" alt-text="Screenshot showing selecting file format.":::


- **File format**: Select **Binary** from the drop-down list. 
- **Compression type**: The compression codec used to read/write binary files.
You can choose from **None**, **bzip2**, **gzip**, **deflate**, **ZipDeflate**, **TarGzip** or **tar** type in the drop-down list.

    :::image type="content" source="./media/format-binary/select-compression-type.png" alt-text="Screenshot showing selecting compression type.":::

- **Compression level**: The compression ratio. Apply when you are using Copy activity destination. You can choose from **Optimal** or **Fastest**.

    - **Fastest**: The compression operation should complete as quickly as possible, even if the resulting file is not optimally compressed.
    - **Optimal**: The compression operation should be optimally compressed, even if the operation takes a longer time to complete. For more information, see [Compression Level topic](/dotnet/api/system.io.compression.compressionlevel).

    :::image type="content" source="./media/format-binary/select-compression-level.png" alt-text="Screenshot showing selecting compression level.":::

**Delete files after completion**: Indicates whether the binary files will be deleted from source store after successfully moving to the destination store. The file deletion is per file, so when copy activity fails, you will see some files have already been copied to the destination and deleted from source, while others are still remaining on source store.


**Preserve zip file name as folder**: Applies when you select **ZipDeflate** compression. Indicates whether to preserve the source zip file name as folder structure during copy.
- If this box is checked (default), the service writes unzipped files to `<specified file path>/<folder named as source zip file>/`.
- If this box is unchecked, the service writes unzipped files directly to `<specified file path>`. Make sure you don't have duplicated file names in different source zip files to avoid racing or unexpected behavior.

**Preserve compression file name as folder**: Applies when you select  **TarGzip/tar** compression. Indicates whether to preserve the source compressed file name as folder structure during copy.
- If this box is checked (default), the service writes decompressed files to `<specified file path>/<folder named as source compressed file>/`.
- If this box is unchecked, the service writes decompressed files directly to `<specified file path>`. Make sure you don't have duplicated file names in different source zip files to avoid racing or unexpected behavior.


### Binary as destination

After selecting **File settings** under **Destination** tab, you can see the following properties when using Binary format.

:::image type="content" source="./media/format-binary/select-file-format.png" alt-text="Screenshot showing selecting file format.":::

- **File format**: Select **Binary** from the drop-down list. 
- **Compression type**: The compression codec used to read/write binary files.
You can choose from **None**, **bzip2**, **gzip**, **deflate**, **ZipDeflate**, **TarGzip** or **tar** type in the drop-down list.

    :::image type="content" source="./media/format-binary/select-compression-type.png" alt-text="Screenshot showing selecting compression type.":::

- **Compression level**: The compression ratio. Apply when you are using Copy activity destination. You can choose from **Optimal** or **Fastest**.

    - **Fastest**: The compression operation should complete as quickly as possible, even if the resulting file is not optimally compressed.
    - **Optimal**: The compression operation should be optimally compressed, even if the operation takes a longer time to complete. For more information, see [Compression Level topic](/dotnet/api/system.io.compression.compressionlevel).

    :::image type="content" source="./media/format-binary/select-compression-level.png" alt-text="Screenshot showing selecting compression level.":::


## Table summary

### Binary as source

The following properties are supported in the copy activity **Source** section when using Binary format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **File format**|The file format that you want to use.| **Binary**|Yes|type (*under `formatSettings`*):<br>BinaryReadSettings|
|**Compression type**|The compression codec used to read/write binary files.|Choose from:<br>**None**<br>**bzip2** <br>**gzip**<br>**deflate**<br>**ZipDeflate**<br>**TarGzip** <br>**tar**|No|type (*under `compression`*):  <br><br>bzip2<br>gzip<br>deflate<br>ZipDeflate<br>TarGzip <br>tar|
|**Compression level** |The compression ratio. Apply when dataset is used in Copy activity sink. Allowed values are Optimal or Fastest.|**Optimal** or **Fastest**|No |level (*under `compression`*): <br>Fastest<br>Optimal |
|**Delete files after completion** |Indicates whether the binary files will be deleted from source store after successfully moving to the destination store. | Selected or unselect|No | deleteFilesAfterCompletion: <br>true or false|
|**Preserve zip file name as folder**|Indicates whether to preserve the source zip file name as folder structure during copy.| Selected or unselect|No |preserveZipFileNameAsFolder <br> (*under `compressionProperties`->`type` as `ZipDeflateReadSettings`*)|
|**Preserve compression file name as folder**|Indicates whether to preserve the source compressed file name as folder structure during copy.| Selected or unselect|No|preserveCompressionFileNameAsFolder  <br> (*under `compressionProperties`->`type` as `TarGZipReadSettings` or `TarReadSettings`*)|


### Binary as destination

The following properties are supported in the copy activity **Destination** section when using Binary format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **File format**|The file format that you want to use.| **Binary**|Yes|type (*under `formatSettings`*):<br>BinaryReadSettings|
|**Compression type**|The compression codec used to read/write binary files.|Choose from:<br>**None**<br>**bzip2** <br>**gzip**<br>**deflate**<br>**ZipDeflate**<br>**TarGzip** <br>**tar**|No|type (*under `compression`*):  <br><br>bzip2<br>gzip<br>deflate<br>ZipDeflate<br>TarGzip <br>tar|
|**Compression level** |The compression ratio. Apply when dataset is used in Copy activity sink. Allowed values are Optimal or Fastest.|**Optimal** or **Fastest**|No |level (*under `compression`*): <br>Fastest<br>Optimal |

