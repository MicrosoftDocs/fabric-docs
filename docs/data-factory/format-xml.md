---
title: How to configure XML format in the data pipeline of Data Factory in Microsoft Fabric
description: This article explains how to configure XML format in the data pipeline of Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# XML format in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] 

This article outlines how to configure XML format in the data pipeline of Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

## Supported capabilities

XML format is supported for the following activities and connectors as source.

| Category | Connector/Activity | 
|---|---|
| **Supported connector** | [Amazon S3](connector-amazon-s3-copy-activity.md)|
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

## XML format in copy activity

To configure XML format, choose your connection in the source of data pipeline copy activity, and then select **XML** in the drop-down list of **File format**. Select **Settings** for further configuration of this format.

:::image type="content" source="./media/format-common/file-settings.png" alt-text="Screenshot showing file format settings.":::

### XML as source 

After you select **Settings** in the **File format** section, the following properties are shown in the pop-up **File format settings** dialog box.

:::image type="content" source="./media/format-xml/source-file-format-settings.png" alt-text="Screenshot showing selecting file format.":::

- **Compression type**: The compression codec used to read XML files.
You can choose from **None**, **bzip2**, **gzip**, **deflate**, **ZipDeflate**, **TarGZip** or **tar** type in the drop-down list.

  If you select **ZipDeflate** as the compression type, **Preserve zip file name as folder** is displayed under the **Advanced** settings in the **Source** tab.

  - **Preserve zip file name as folder**: Indicates whether to preserve the source zip file name as a folder structure during copy.
    - If this box is checked (default), the service writes unzipped files to `<specified file path>/<folder named as source zip file>/`.
    - If this box is unchecked, the service writes unzipped files directly to `<specified file path>`. Make sure you don't have duplicated file names in different source zip files to avoid racing or unexpected behavior.

  If you select **TarGZip/tar** as the compression type, **Preserve compression file name as folder** is displayed under the **Advanced** settings in the **Source** tab.

  - **Preserve compression file name as folder**: Indicates whether to preserve the source compressed file name as a folder structure during copy.
    - If this box is checked (default), the service writes decompressed files to `<specified file path>/<folder named as source compressed file>/`.
    - If this box is unchecked, the service writes decompressed files directly to `<specified file path>`. Make sure you don't have duplicated file names in different source files to avoid racing or unexpected behavior.

- **Compression level**: Specify the compression ratio when you select a compression type. You can choose from **Fastest** or **Optimal**.

    - **Fastest**: The compression operation should complete as quickly as possible, even if the resulting file is not optimally compressed.
    - **Optimal**: The compression operation should be optimally compressed, even if the operation takes a longer time to complete. For more information, see [Compression Level topic](/dotnet/api/system.io.compression.compressionlevel).

- **Encoding**: Specify the encoding type used to write test files. Select one type from the drop-down list. The default value is **UTF-8**.

- **Null value**: Specifies the string representation of null value. The default value is empty string.

Under **Advanced** settings in the **Source** tab, the following XML format related properties are displayed.

- **Validation mode**: Specifies whether to validate the XML schema. Select one mode from the drop-down list.

    - **None**: Select this to not use validation mode.
    - **xsd**: Select this to validate the XML schema using XSD.
    - **dtd**: Select this to validate the XML schema using DTD.
    
    :::image type="content" source="./media/format-xml/validation-mode.png" alt-text="Screenshot showing validation modes. ":::

- **Namespaces**: Specify whether to enable namespace when parsing the XML files. It is selected by default.
- **Namespace prefix pairs**: If the **Namespaces** is enabled, selecting **+ New** and specify the **URL** and **Prefix**. You can add more pairs by selecting **+ New**. <br> Namespace URI to prefix mapping is used to name fields when parsing the XML file.
If an XML file has namespace and namespace is enabled, by default, the field name is the same as it is in the XML document.
If there is an item defined for the namespace URI in this map, the field name is `prefix:fieldName`.

    :::image type="content" source="./media/format-xml/namespace-prefix-pairs.png" alt-text="Screenshot showing namespace prefix pairs. ":::

- **Detect data type**: Specify whether to detect integer, double, and Boolean data types. It is selected by default.


## Table summary

### XML as source

The following properties are supported in the copy activity **Source** section when using XML format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**File format**|The file format that you want to use.| **XML**|Yes|type (*under `datasetSettings`*):<br>Xml|
|**Compression type**|The compression codec used to read XML files.|**None**<br>**bzip2** <br>**gzip**<br>**deflate**<br>**ZipDeflate**<br>**TarGZip** <br>**tar**|No|type (*under `compression`*):  <br><br>bzip2<br>gzip<br>deflate<br>ZipDeflate<br>TarGZip <br>tar|
|**Compression level** |The compression ratio. |**Fastest**<br>**Optimal** |No |level (*under `compression`*): <br>Fastest<br>Optimal |
|**Encoding**|The encoding type used to read test files.|"UTF-8" (by default),"UTF-8 without BOM", "UTF-16LE", "UTF-16BE", "UTF-32LE", "UTF-32BE", "US-ASCII", "UTF-7", "BIG5", "EUC-JP", "EUC-KR", "GB2312", "GB18030", "JOHAB", "SHIFT-JIS", "CP875", "CP866", "IBM00858", "IBM037", "IBM273", "IBM437", "IBM500", "IBM737", "IBM775", "IBM850", "IBM852", "IBM855", "IBM857", "IBM860", "IBM861", "IBM863", "IBM864", "IBM865", "IBM869", "IBM870", "IBM01140", "IBM01141", "IBM01142", "IBM01143", "IBM01144", "IBM01145", "IBM01146", "IBM01147", "IBM01148", "IBM01149", "ISO-2022-JP", "ISO-2022-KR", "ISO-8859-1", "ISO-8859-2", "ISO-8859-3", "ISO-8859-4", "ISO-8859-5", "ISO-8859-6", "ISO-8859-7", "ISO-8859-8", "ISO-8859-9", "ISO-8859-13", "ISO-8859-15", "WINDOWS-874", "WINDOWS-1250", "WINDOWS-1251", "WINDOWS-1252", "WINDOWS-1253", "WINDOWS-1254", "WINDOWS-1255", "WINDOWS-1256", "WINDOWS-1257", "WINDOWS-1258" |No |encodingName |
|**Preserve zip file name as folder**|Indicates whether to preserve the source zip file name as a folder structure during copy.|Selected (default) or unselect|No|preserveZipFileNameAsFolder<br>(*under `compressionProperties`->`type` as `ZipDeflateReadSettings`*):<br>true (default) or false|
|**Preserve compression file name as folder**|Indicates whether to preserve the source compressed file name as a folder structure during copy.|Selected (default) or unselect|No|preserveCompressionFileNameAsFolder<br>(*under `compressionProperties`->`type` as `TarGZipReadSettings` or `TarReadSettings`*):<br>true (default) or false|
|**Null value**|The string representation of null value.| \<your null value\> <br> empty string (by default) |No | nullValue|
| **Validation mode** | Whether to validate the XML schema. |  **None**<br>**xsd**<br> **dtd**<br> | No | validationMode:<br><br>xsd<br>dtd | 
| **Namespaces** | Whether to enable namespace when parsing the XML files. | Selected  (default) or unselected | No | namespaces:<br>true (default)  or false | 
| **Namespace prefix pairs** | Namespace URI to prefix mapping, which is used to name fields when parsing the XML file.<br>If an XML file has namespace and namespace is enabled, by default, the field name is the same as it is in the XML document.<br>If there is an item defined for the namespace URI in this map, the field name is `prefix:fieldName`. | < url >:< prefix > | No | namespacePrefixes:<br>< url >:< prefix > | 
| **Detect data type** | Whether to detect integer, double, and Boolean data types. | Selected  (default) or unselected | No | detectDataType:<br>true (default)  or false | 

## Related content

- [Connectors overview](connector-overview.md)
