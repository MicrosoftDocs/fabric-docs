---
title: How to configure JSON format in the data pipeline of Data Factory in Microsoft Fabric
description: This article explains how to configure JSON format in the data pipeline of Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# JSON format in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]

This article outlines how to configure JSON format in the data pipeline of Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

## Supported capabilities

JSON format is supported for the following activities and connectors as a source and destination.

| Category | Connector/Activity |
|---|---|
| **Supported connector** | [Amazon S3](connector-amazon-s3-copy-activity.md) |
|  | [Azure Blob Storage](connector-azure-blob-storage-copy-activity.md) |
|  | [Azure Data Lake Storage Gen1](connector-azure-data-lake-storage-gen1-copy-activity.md) |
|  | [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-copy-activity.md)|
|  | [FTP](connector-ftp-copy-activity.md) |
|  | [Google Cloud Storage](connector-google-cloud-storage-copy-activity.md) |
|  | [HTTP](connector-http-copy-activity.md)|
|  | [SFTP](connector-sftp-copy-activity.md) |
| **Supported activity** | [Copy activity](copy-data-activity.md) |
|  | [Lookup activity](lookup-activity.md) |
|  | [GetMetadata activity](get-metadata-activity.md) |
|  | [Delete activity](delete-data-activity.md) |


## JSON format in copy activity

To configure JSON format, choose your connection in the source or destination of data pipeline copy activity, and then select **JSON** in the drop-down list of **File format**. Select **Settings** for further configuration of this format.

:::image type="content" source="./media/format-common/file-settings.png" alt-text="Screenshot showing file format settings.":::

### JSON format as source

After you select **Settings** in the **File format** section, the following properties are shown in the pop-up **File format settings** dialog box.

:::image type="content" source="./media/format-json/file-format-settings.png" alt-text="Screenshot showing JSON file format source.":::

- **Compression type**: Choose the compression codec used to read JSON files in the drop-down list. You can choose from **None**, **bzip2**, **gzip**, **deflate**, **ZipDeflate**, **TarGzip**, or **tar**.

  If you select **ZipDeflate** as the compression type, **Preserve zip file name as folder** is displayed under the **Advanced** settings in the **Source** tab.

  - **Preserve zip file name as folder**: Indicates whether to preserve the source zip file name as a folder structure during copy.
    - If this box is checked (default), the service writes unzipped files to `<specified file path>/<folder named as source zip file>/`.
    - If this box is unchecked, the service writes unzipped files directly to `<specified file path>`. Make sure you don't have duplicated file names in different source zip files to avoid racing or unexpected behavior.

  If you select **TarGzip/tar** as the compression type, **Preserve compression file name as folder** is displayed under the **Advanced** settings in the **Source** tab.

  - **Preserve compression file name as folder**: Indicates whether to preserve the source compressed file name as a folder structure during copy.
    - If this box is checked (default), the service writes decompressed files to `<specified file path>/<folder named as source compressed file>/`.
    - If this box is unchecked, the service writes decompressed files directly to `<specified file path>`. Make sure you don't have duplicated file names in different source files to avoid racing or unexpected behavior.

- **Compression level**: The compression ratio. You can choose from **Fastest** or **Optimal**.

  - **Fastest**: The compression operation should complete as quickly as possible, even if the resulting file isn't optimally compressed.

  - **Optimal**: The compression operation should be optimally compressed, even if the operation takes a longer time to complete. For more information, go to the [Compression Level](/dotnet/api/system.io.compression.compressionlevel) article.

- **Encoding**: Specify the encoding type used to read test files. Select one type from the drop-down list. The default value is **UTF-8**.

### JSON format as destination

After you select **Settings**, the following properties are shown in the pop-up **File format settings** dialog box.

:::image type="content" source="./media/format-json/file-format-settings.png" alt-text="Screenshot showing JSON file format destination.":::

- **Compression type**: Choose the compression codec used to write JSON files in the drop-down list. You can choose from **None**, **bzip2**, **gzip**, **deflate**, **ZipDeflate**, **TarGzip**, or **tar**.

- **Compression level**: The compression ratio. You can choose from **Optimal** or **Fastest**.
  - **Fastest**: The compression operation should complete as quickly as possible, even if the resulting file isn't optimally compressed.

  - **Optimal**: The compression operation should be optimally compressed, even if the operation takes a longer time to complete. For more information, go to the [Compression Level](/dotnet/api/system.io.compression.compressionlevel) article.

- **Encoding**: Specify the encoding type used to write test files. Select one type from the drop-down list. The default value is **UTF-8**.

Under **Advanced** settings in the **Destination** tab, the following JSON format related properties are displayed.

- **File pattern**: Specify the pattern of data stored in each JSON file. Allowed values are: **Set of objects** (JSON Lines) and **Array of objects**. The default value is **Set of objects**. See [JSON file patterns](#json-file-patterns) section for details about these patterns.

### JSON file patterns

When copying data from JSON files, copy activity can automatically detect and parse the following patterns of JSON files. When writing data to JSON files, you can configure the file pattern on copy activity destination.

- **Type I: setOfObjects**

    Each file contains single object, JSON lines, or concatenated objects.

    * **single object JSON example**

        ```json
        {
            "time": "2015-04-29T07:12:20.9100000Z",
            "callingimsi": "466920403025604",
            "callingnum1": "678948008",
            "callingnum2": "567834760",
            "switch1": "China",
            "switch2": "Germany"
        }
        ```

    * **JSON Lines (default for destination)**
    
        ```json
        {"time":"2015-04-29T07:12:20.9100000Z","callingimsi":"466920403025604","callingnum1":"678948008","callingnum2":"567834760","switch1":"China","switch2":"Germany"}
        {"time":"2015-04-29T07:13:21.0220000Z","callingimsi":"466922202613463","callingnum1":"123436380","callingnum2":"789037573","switch1":"US","switch2":"UK"}
        {"time":"2015-04-29T07:13:21.4370000Z","callingimsi":"466923101048691","callingnum1":"678901578","callingnum2":"345626404","switch1":"Germany","switch2":"UK"}
        ```

    * **concatenated JSON example**

        ```json
        {
            "time": "2015-04-29T07:12:20.9100000Z",
            "callingimsi": "466920403025604",
            "callingnum1": "678948008",
            "callingnum2": "567834760",
            "switch1": "China",
            "switch2": "Germany"
        }
        {
            "time": "2015-04-29T07:13:21.0220000Z",
            "callingimsi": "466922202613463",
            "callingnum1": "123436380",
            "callingnum2": "789037573",
            "switch1": "US",
            "switch2": "UK"
        }
        {
            "time": "2015-04-29T07:13:21.4370000Z",
            "callingimsi": "466923101048691",
            "callingnum1": "678901578",
            "callingnum2": "345626404",
            "switch1": "Germany",
            "switch2": "UK"
        }
        ```

- **Type II: arrayOfObjects**

    Each file contains an array of objects.

    ```json
    [
        {
            "time": "2015-04-29T07:12:20.9100000Z",
            "callingimsi": "466920403025604",
            "callingnum1": "678948008",
            "callingnum2": "567834760",
            "switch1": "China",
            "switch2": "Germany"
        },
        {
            "time": "2015-04-29T07:13:21.0220000Z",
            "callingimsi": "466922202613463",
            "callingnum1": "123436380",
            "callingnum2": "789037573",
            "switch1": "US",
            "switch2": "UK"
        },
        {
            "time": "2015-04-29T07:13:21.4370000Z",
            "callingimsi": "466923101048691",
            "callingnum1": "678901578",
            "callingnum2": "345626404",
            "switch1": "Germany",
            "switch2": "UK"
        }
    ]
    ```

## Table summary

### JSON as source

The following properties are supported in the copy activity **Source** section when using the JSON format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **File format**|The file format that you want to use.| **JSON**|Yes|type (*under `datasetSettings`*):<br>Json|
|**Compression type**|The compression codec used to read JSON files.|Choose from:<br>**None**<br>**bzip2** <br>**gzip**<br>**deflate**<br>**ZipDeflate**<br>**TarGzip** <br>**tar**|No|type (*under `compression`*):  <br><br>bzip2<br>gzip<br>deflate<br>ZipDeflate<br>TarGzip <br>tar|
|**Compression level** |The compression ratio.| **Fastest**<br>**Optimal**|No |level (*under `compression`*): <br>Fastest<br>Optimal |
|**Encoding**|The encoding type used to read test files.|"UTF-8" (by default),"UTF-8 without BOM", "UTF-16LE", "UTF-16BE", "UTF-32LE", "UTF-32BE", "US-ASCII", "UTF-7", "BIG5", "EUC-JP", "EUC-KR", "GB2312", "GB18030", "JOHAB", "SHIFT-JIS", "CP875", "CP866", "IBM00858", "IBM037", "IBM273", "IBM437", "IBM500", "IBM737", "IBM775", "IBM850", "IBM852", "IBM855", "IBM857", "IBM860", "IBM861", "IBM863", "IBM864", "IBM865", "IBM869", "IBM870", "IBM01140", "IBM01141", "IBM01142", "IBM01143", "IBM01144", "IBM01145", "IBM01146", "IBM01147", "IBM01148", "IBM01149", "ISO-2022-JP", "ISO-2022-KR", "ISO-8859-1", "ISO-8859-2", "ISO-8859-3", "ISO-8859-4", "ISO-8859-5", "ISO-8859-6", "ISO-8859-7", "ISO-8859-8", "ISO-8859-9", "ISO-8859-13", "ISO-8859-15", "WINDOWS-874", "WINDOWS-1250", "WINDOWS-1251", "WINDOWS-1252", "WINDOWS-1253", "WINDOWS-1254", "WINDOWS-1255", "WINDOWS-1256", "WINDOWS-1257", "WINDOWS-1258" |No |encodingName |
|**Preserve zip file name as folder**|Indicates whether to preserve the source zip file name as a folder structure during copy.|Selected (default) or unselect|No|preserveZipFileNameAsFolder<br>(*under `compressionProperties`->`type` as `ZipDeflateReadSettings`*):<br>true (default) or false|
|**Preserve compression file name as folder**|Indicates whether to preserve the source compressed file name as a folder structure during copy.|Selected (default) or unselect|No|preserveCompressionFileNameAsFolder<br>(*under `compressionProperties`->`type` as `TarGZipReadSettings` or `TarReadSettings`*):<br>true (default) or false|

### JSON as destination

The following properties are supported in the copy activity **Destination** section when using the JSON format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **File format**|The file format that you want to use.| **JSON**|Yes|type (*under `datasetSettings`*):<br>Json|
|**Compression type**|The compression codec used to write JSON files.|Choose from:<br>**None**<br>**bzip2** <br>**gzip**<br>**deflate**<br>**ZipDeflate**<br>**TarGzip** <br>**tar**|No|type (*under `compression`*):  <br><br>bzip2<br>gzip<br>deflate<br>ZipDeflate<br>TarGzip <br>tar|
|**Compression level** |The compression ratio. | **Fastest**<br>**Optimal**|No |level (*under `compression`*): <br>Fastest<br>Optimal |
|**Encoding**|The encoding type used to write test files.|"UTF-8" (by default),"UTF-8 without BOM", "UTF-16LE", "UTF-16BE", "UTF-32LE", "UTF-32BE", "US-ASCII", "UTF-7", "BIG5", "EUC-JP", "EUC-KR", "GB2312", "GB18030", "JOHAB", "SHIFT-JIS", "CP875", "CP866", "IBM00858", "IBM037", "IBM273", "IBM437", "IBM500", "IBM737", "IBM775", "IBM850", "IBM852", "IBM855", "IBM857", "IBM860", "IBM861", "IBM863", "IBM864", "IBM865", "IBM869", "IBM870", "IBM01140", "IBM01141", "IBM01142", "IBM01143", "IBM01144", "IBM01145", "IBM01146", "IBM01147", "IBM01148", "IBM01149", "ISO-2022-JP", "ISO-2022-KR", "ISO-8859-1", "ISO-8859-2", "ISO-8859-3", "ISO-8859-4", "ISO-8859-5", "ISO-8859-6", "ISO-8859-7", "ISO-8859-8", "ISO-8859-9", "ISO-8859-13", "ISO-8859-15", "WINDOWS-874", "WINDOWS-1250", "WINDOWS-1251", "WINDOWS-1252", "WINDOWS-1253", "WINDOWS-1254", "WINDOWS-1255", "WINDOWS-1256", "WINDOWS-1257", "WINDOWS-1258" |No |encodingName |
|**File pattern**|Indicate the pattern of data stored in each JSON file.|**Set of objects**<br>**Array of objects**| No | filePattern:<br> setOfObjects<br>arrayOfObjects |

## Related content

- [Connectors overview](connector-overview.md)
