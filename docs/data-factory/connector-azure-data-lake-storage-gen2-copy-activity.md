---
title: How to configure Azure Data Lake Storage Gen2 in copy activity
description: This article explains how to copy data using Azure Data Lake Storage Gen2.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 12/27/2022
ms.custom: template-how-to 
---

# How to configure Azure Data Lake Storage Gen2 in copy activity

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This article outlines how to use the copy activity in data pipeline to copy data from and to Azure Data Lake Storage Gen2.

## Supported format

Azure Data Lake Storage Gen2 supports the following file formats. Refer to each article for format-based settings.

- Avro format
- Binary format
- Delimited text format
- Excel format
- JSON format
- ORC format
- Parquet format
- XML format

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for Azure Data Lake Storage Gen2 under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-azure-data-lake-storage-gen2/source.png" alt-text="Screenshot showing source tab." lightbox="./media/connector-azure-data-lake-storage-gen2/source.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an Azure Data Lake Storage Gen2 connection from the connection list.
- **File path**: Select **Browse** to choose the file that you want to copy, or fill in the path manually.
- **File settings**: Select **File settings** to configure the file format. For settings of different file formats, refer to [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **File path type**: You can choose **File path**, **Wildcard file path**, or **List of files** as your file path type. The configuration of each of these settings is：

    - **File path**: If you choose this type, the data can be copied from the given container or folder/file path specified previously.

    - **Wildcard file path**: Specify the folder or file path with wildcard characters under your given blob container to filter your source folders or files.

        Allowed wildcards are: `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder name has wildcard or this escape character inside. For more examples, got to [Folder and file filter examples](/azure/data-factory/connector-azure-blob-storage?tabs=data-factory#folder-and-file-filter-examples).

        :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/wildcard-file-path.png" alt-text="Screenshot showing wildcard file path." lightbox="./media/connector-azure-data-lake-storage-gen2/wildcard-file-path.png":::

        *Wildcard folder path*: Specify the folder path with wildcard characters under your given container to filter source folders.

        *Wildcard file name*: Specify the file name with wildcard characters under your given container and folder path (or wildcard folder path) to filter source files.

    - **List of files**: Indicates you want to copy a given file set. In **Path to file list**, point to a text file that includes a list of files you want to copy, one file per line, which is the relative path to the path.

       When you're using this option, don't specify a file name. For more examples, go to [File list examples](/azure/data-factory/connector-azure-blob-storage?tabs=data-factory#file-list-examples).

        :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/path-to-file-list.png" alt-text="Screenshot showing path to file list.":::
        
- **Recursively**:  If this checkbox is selected, all files in the input folder and its subfolders will be processed recursively. If you unselect the checkbox, just the ones in the selected folder will be processed. This setting is disabled when a single file is selected.

- **Delete files after completion**:  If this checkbox is selected, binary files will be deleted from the source store after successfully moving to the destination store. The file deletion is per file, so when copy activity fails, you'll see some files have already been copied to the destination and deleted from source, while others are still remaining in the source store.

    > [!NOTE]
    > This property is only valid in a binary files copy scenario.

- **Max concurrent connections**: This property indicates the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

## Destination

The following properties are supported for Azure Data Lake Storage Gen2 under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-azure-data-lake-storage-gen2/destination.png" alt-text="Screenshot showing destination tab." lightbox="./media/connector-azure-data-lake-storage-gen2/destination.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an Azure Data Lake Storage Gen2 connection from the connection list.
- **File path**: Select **Browse** to choose the file that you want to copy or fill in the path manually.
- **File settings**: Select **File settings** to configure the file format. For settings of different file formats, refer to [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **Copy behavior**: Defines the copy behavior when the source is files from a file-based data store. You can choose **Add dynamic content**, **None**, **Flatten hierarchy**, or **Preserve hierarchy** from the drop-down list.

    :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/copy-behavior.png" alt-text="Screenshot showing copy behavior.":::

    - **Add dynamic content**: Open the **Add dynamic content** pane. This opens the expression builder where you can build expressions from supported system variables, activity output, functions, and user-specified variables or parameters. For information about the expression language, go to [Expressions and functions](/azure/data-factory/control-flow-expression-language-functions).
    - **None**: Choose this option to not use any copy behavior.
    - **Flatten hierarchy**: All files from the source folder are in the first level of the destination folder. The destination files have autogenerated names.
    - **Preserve hierarchy**: Preserves the file hierarchy in the target folder. The relative path of source file to source folder is identical to the relative path of target file to target folder.

- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Block size (MB)**: Specify the block size, in megabytes, used to write data to block blobs. More information: [Block Blobs](/rest/api/storageservices/understanding-block-blobs--append-blobs--and-page-blobs#about-block-blobs)

- **Metadata**: Set custom metadata when copying to a destination. Each object under the `metadata` array represents an extra column. The `name` defines the metadata key name, and the `value` indicates the data value of that key. If the [preserve attributes feature](/azure/data-factory/copy-activity-preserve-metadata#preserve-metadata) is used, the specified metadata will union/overwrite with the source file metadata.

    Allowed data values are:
    
    * `$$LASTMODIFIED`: A reserved variable indicates to store the source files' last modified time. Apply to a file-based source with a binary format only.
    * **Expression**
    * **Static value**

    :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/metadata.png" alt-text="Screenshot showing metadata." lightbox="./media/connector-azure-blob-storage/metadata.png":::

### Settings

For the **Settings** tab configuration, go to Settings.

## Table summary

The following tables contain more information about the copy activity in Azure Data Lake Storage Gen2.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External** |Yes|type|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**File path** | The file path of your source data.|\<file path of your source >|Yes |container <br> fileName|
|**File path type** |The file path type that you want to use.|• File path <br>• Prefix<br>• Wildcard folder path, Wildcard file name<br>•List of files|No |<br>• prefix<br>• wildcardFolderPath, wildcardFileName<br>• fileListPath|
|**Recursively** |Process all files in the input folder and its subfolders recursively or just the ones in the selected folder. This setting is disabled when a single file is selected.|Selected or unselect|No |recursive|
|**Delete files after completion** |The files on source data store will be deleted right after being moved to the destination store. The file deletion is per file, so when copy activity fails, you'll see some files have already been copied to the destination and deleted from the source, while others are still in the source store.|Selected or unselect|No |deleteFilesAfterCompletion|
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.| \<max concurrent connections\>|No |maxConcurrentConnections|

### Destination

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External** |Yes|type|
|**Connection** |Your connection to the destination data store.|\<your connection>|Yes|connection|
|**File path**|The file path of your destination data.|File path of source |Yes |container <br> fileName|
|**Copy behavior** |Defines the copy behavior when the source is files from a file-based data store.|• None<br>• Add dynamic content<br>• Flatten hierarchy<br>• Preserve hierarchy|No |copyBehavior|
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\>|No |maxConcurrentConnections|
|**Block size (MB)** |Specify the block size in MB when writing data to Azure Data Lake Storage Gen2. Allowed value is between 4 MB and 100 MB.|\<block size\>|No |blockSizeInMB|
|**Metadata**|Set custom metadata when copy to sink.| • `$$LASTMODIFIED`<br>• Expression<br>• Static value|No |metadata|

## Next steps

[How to create Azure Data Lake Storage Gen2 connection](connector-azure-data-lake-storage-gen2.md)
