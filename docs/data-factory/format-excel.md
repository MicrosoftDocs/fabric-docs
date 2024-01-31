---
title: How to configure Excel format in the data pipeline of Data Factory in Microsoft Fabric
description: This article explains how to configure Excel format in the data pipeline of Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Excel format in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] 

This article outlines how to configure Excel format in the data pipeline of Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

## Supported capabilities

Excel format is supported for the following activities and connectors as source.

| Category | Connector/Activity | 
|---|---|
| **Supported connector** | [Amazon S3](connector-amazon-s3-copy-activity.md)|
|  | [Azure Blob Storage](connector-azure-blob-storage-copy-activity.md) |
|  | [Azure Data Lake Storage Gen1](connector-azure-data-lake-storage-gen1-copy-activity.md) |
|  | [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-copy-activity.md)|
|  | [Google Cloud Storage](connector-google-cloud-storage-copy-activity.md) | 
|  | [HTTP](connector-http-copy-activity.md)| 
| **Supported activity** | [Copy activity](copy-data-activity.md) |
|  | [Lookup activity](lookup-activity.md) |
|  | [GetMetadata activity](get-metadata-activity.md) |
|  | [Delete activity](delete-data-activity.md) | 

## Excel format in copy activity

To configure Excel format, choose your connection in the source of data pipeline copy activity, and then select **Excel** in the drop-down list of **File format**. Select **Settings** for further configuration of this format.

:::image type="content" source="./media/format-common/file-settings.png" alt-text="Screenshot showing file format settings.":::

### Excel as source 

After choosing Excel format, following properties are shown up.

- **Worksheet mode**: Select the worksheet mode that you want to use to read Excel data. Choose **Name** or **Index**.

    - **Name**: When you choose **Name**, in **Sheet name** section, select the Excel worksheet name to read data, or select **Edit** to specify the worksheet name manually. If you point to a folder or multiple files, make sure this particular worksheet exists in all those files.
    
        :::image type="content" source="./media/format-excel/worksheet-mode-name.png" alt-text="Screenshot showing selecting Name under Worksheet mode.":::

    - **Index**: When you choose **Index**, in **Sheet index** section, select the Excel worksheet index to read data, or select **Edit** to specify the worksheet name manually. The data read start from 0. If there is worksheet added or deleted from excel file, the index of existed worksheets will change automatically.
    
        :::image type="content" source="./media/format-excel/worksheet-mode-index.png" alt-text="Screenshot showing selecting Index under Worksheet mode.":::

After selecting **Settings** in **File format** section, following properties are shown up in the pop-up **File format settings** dialog box.

:::image type="content" source="./media/format-excel/source-file-format-settings.png" alt-text="Screenshot showing selecting file format.":::

- **Compression type**: The compression codec used to read Excel files.
You can choose from **None**, **bzip2**, **gzip**, **deflate**, **ZipDeflate**, **TarGzip** or **tar** type in the drop-down list.

- **Compression level**: Specify the compression ratio when you select a compression type. You can choose from **Optimal** or **Fastest**.

    - **Fastest**: The compression operation should complete as quickly as possible, even if the resulting file is not optimally compressed.
    - **Optimal**: The compression operation should be optimally compressed, even if the operation takes a longer time to complete. For more information, see [Compression Level topic](/dotnet/api/system.io.compression.compressionlevel).

- **Range**: The cell range in the given worksheet to locate the selective data, e.g.:
    - Not specified: reads the whole worksheet as a table from the first non-empty row and column.
    - `A3`: reads a table starting from the given cell, dynamically detects all the rows below and all the columns to the right.
    - `A3:H5`: reads this fixed range as a table.
    - `A3:A3`: reads this single cell.

- **Null value**: Specifies the string representation of null value. The default value is empty string.

- **First row as header**: Specifies whether to treat the first row in the given worksheet/range as a header line with names of columns. Unselected by default.


## Table summary

### Excel as source

The following properties are supported in the copy activity **Source** section when using Excel format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **File format**|The file format that you want to use.| **Excel**|Yes|type (*under `datasetSettings`*):<br>Excel|
|**Worksheet mode** |The worksheet mode that you want to use to read Excel data. | - **Name**<br> - **Index**|Yes | - sheetName<br>- sheetIndex|
|**Compression type**|The compression codec used to read Excel files.|Choose from:<br>**None**<br>**bzip2** <br>**gzip**<br>**deflate**<br>**ZipDeflate**<br>**TarGzip** <br>**tar**|No|type (*under `compression`*):  <br><br>bzip2<br>gzip<br>deflate<br>ZipDeflate<br>TarGzip <br>tar|
|**Compression level** |The compression ratio. Allowed values are Optimal or Fastest.|**Optimal** or **Fastest**|No |level (*under `compression`*): <br>Fastest<br>Optimal |
|**Range**|The cell range in the given worksheet to locate the selective data.| \<your cell range\> |No | range|
|**Null value**|The string representation of null value.| \<your null value\> <br> empty string (by default) |No | nullValue|
|**First row as header**|Specifies whether to treat the first row in the given worksheet/range as a header line with names of columns.| Selected or unselected |No| firstRowAsHeader: <br> true or false (default)|

## Related content

- [Connectors overview](connector-overview.md)
