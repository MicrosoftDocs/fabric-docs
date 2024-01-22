---
title: Configure Azure Blob Storage in a copy activity
description: This article explains how to copy data using Azure Blob Storage.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Azure Blob Storage in a copy activity

This article outlines how to use the copy activity in a data pipeline to copy data from and to Azure Blob Storage.

## Supported format

Azure Blob Storage supports the following file formats. Refer to each article for format-based settings.

- [Avro format](format-avro.md)
- [Binary format](format-binary.md)
- [Delimited text format](format-delimited-text.md)
- [Excel format](format-excel.md)
- [JSON format](format-json.md)
- [ORC format](format-orc.md)
- [Parquet format](format-parquet.md)
- [XML format](format-xml.md)

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

The following properties are supported for Azure Blob Storage under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-azure-blob-storage/source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-azure-blob-storage/source.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an Azure Blob Storage connection from the connection list. If no connection exists, then create a new Azure Blob Storage connection by selecting **New**.
- **File path**: Select **Browse** to choose the file that you want to copy, or fill in the path manually.
- **File settings**: Select **File settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **File path type**: You can choose **File path**, **Prefix**, **Wildcard file path**, **List of files** as your file path type. The configuration of each setting is：

  - **File path**: If you choose this type, the data can be copied from the given container or folder/file path specified previously.

  - **Prefix**: Prefix for the blob name under the given container configured to filter source blobs. Blobs whose names start with `container/this_prefix` are selected. It utilizes the service-side filter for blob storage.

    When you use **Prefix** and choose to copy to a file-based destination with preserving hierarchy, the subpath after the last "/" in the prefix is preserved. For example, you have a source `container/folder/subfolder/file.txt`, and configure the prefix as `folder/sub`, then the preserved file path is `subfolder/file.txt`.

    :::image type="content" source="./media/connector-azure-blob-storage/prefix.png" alt-text="Screenshot showing prefix file path type.":::

  - **Wildcard file path**: Specify the folder or file path with wildcard characters under your given blob container to filter your source folders or files.

    Allowed wildcards are `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder name has a wildcard or this escape character inside. For more examples, go to [Folder and file filter examples](/azure/data-factory/connector-azure-blob-storage?tabs=data-factory#folder-and-file-filter-examples).

    :::image type="content" source="./media/connector-azure-blob-storage/wildcard-file-path.png" alt-text="Screenshot showing wildcard file path.":::

    **Wildcard folder path**: Specify the folder path with wildcard characters under your given container to filter source folders.

    **Wildcard file name**: Specify the file name with wildcard characters under your given container and folder path (or wildcard folder path) to filter source files.

  - **List of files**: Indicates a given file set to copy to. In **Path to file list**, enter or browse to a text file that includes a list of files you want to copy, one file per line, which is the relative path to to each file.

    When you're using this option, don't specify a file name. For more examples, go to [File list examples](/azure/data-factory/connector-azure-blob-storage?tabs=data-factory#file-list-examples).

    :::image type="content" source="./media/connector-azure-blob-storage/path-to-file-list.png" alt-text="Screenshot showing path to file list.":::

- **Recursively**: If this checkbox is selected, all files in the input folder and its subfolders are processed recursively. If you unselect the checkbox, just the ones in the selected folder are processed. This setting is disabled when a single file is selected.

- **Delete files after completion**: If this checkbox is selected, the binary files are deleted from source store after successfully moving to the destination store. The file deletion is per file, so when copy activity fails, you'll notice that some files have already been copied to the destination and deleted from the source, while others are still remaining in the source store.

    > [!NOTE]
    >This property is only valid in a binary files copy scenario.

- **Max concurrent connections**: This property indicates the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Destination

The following properties are supported for Azure Blob Storage under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-azure-blob-storage/destination.png" alt-text="Screenshot showing destination tab." lightbox="./media/connector-azure-blob-storage/destination.png":::

The following properties are **required**:

- **Data store type:** Select **External**.
- **Connection:** Select an Azure Blob Storage connection from the connection list. If the connection doesn't exist, then create a new Azure Blob Storage connection by selecting **New**.
- **File path:** Select **Browse** to choose the file that you want to copy or fill in the path manually.
- **File settings**: Select **File settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **Copy behavior**: Defines the copy behavior when the source is files from a file-based data store. You can choose **Add dynamic content**, **None**, **FlattenHierarchy**, or **Preserve hierarchy** from the drop-down list.

  - **Add dynamic content**: To specify an expression for a property value, select **Add dynamic content**. This selection opens the expression builder where you can build expressions from supported system variables, activity output, functions, and user-specified variables or parameters. For information about the expression language, go to [Expressions and functions](/azure/data-factory/control-flow-expression-language-functions).
  - **None**: Choose this selection to not use any copy behavior.
  - **Flatten hierarchy**: All files from the source folder are in the first level of the destination folder. The destination files have autogenerated names.
  - **Preserve hierarchy**: Preserves the file hierarchy in the target folder. The relative path of source file to source folder is identical to the relative path of target file to target folder.

    :::image type="content" source="./media/connector-azure-blob-storage/copy-behavior.png" alt-text="Screenshot showing copy behavior.":::

- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Block size (MB)**: Specify the block size, in megabytes, used to write data to block blobs. For more information, go to [About block blobs](/rest/api/storageservices/understanding-block-blobs--append-blobs--and-page-blobs#about-block-blobs).

- **Metadata**: Set custom metadata when copying to a destination. Each object under the `metadata` array represents an extra column. The `name` defines the metadata key name, and the `value` indicates the data value of that key. If the[preserve attributes feature](/azure/data-factory/copy-activity-preserve-metadata#preserve-metadata) is used, the specified metadata will union/overwrite with the source file metadata.

  Allowed data values are:

  - `$$LASTMODIFIED`: a reserved variable indicates to store the source files' last modified time. Apply to file-based source with binary format only.
  - **Expression**
  - **Static value**

    :::image type="content" source="./media/connector-azure-blob-storage/metadata.png" alt-text="Screenshot showing metadata.":::

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). If you choose Binary as your file format, mapping won't be supported.

### Settings

For **Settings** tab configuration, see [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Azure Blob Storage.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|  **External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**File path** | The file path of your source data.|\<file path of your source>|Yes |container <br> fileName|
|**File path type** |The file path type that you want to use.|• File path <br>• Prefix<br>• Wildcard folder path, Wildcard file name<br>• List of files|No |<br>• prefix<br>• wildcardFolderPath, wildcardFileName<br>• fileListPath|
|**Recursively** |Process all files in the input folder and its subfolders recursively or just the ones in the selected folder. This setting is disabled when a single file is selected.|Selected or unselect|No |recursive|
|**Delete files after completion** |The files in the source data store will be deleted right after being moved to the destination store. The file deletion is per file, so when a copy activity fails, you can tell that some files have already been copied to the destination and deleted from source, while others are still in the source store.|Selected or unselect|No |deleteFilesAfterCompletion|
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.| \<max concurrent connections\>|No |maxConcurrentConnections|

### Destination information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External** |Yes|/|
|**Connection** |Your connection to the destination data store.|\<your connection>|Yes|connection|
|**File path**|The file path of your destination data.|File path of the source |Yes |container <br> fileName|
|**Copy behavior** |Defines the behavior when copying files from one file system, like storage, to the other (for example, from one blob storage to another).|• None<br>• Add dynamic content<br>• Flatten hierarchy<br>• Preserve hierarchy|No |copyBehavior|
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\>|No |maxConcurrentConnections|
|**Block size (MB)** |Specify the block size in MB when writing data to Azure Blob Storage. Allowed value is between 4 MB and 100 MB.|\<block size\>|No |blockSizeInMB|
|**Metadata**|Set the custom metadata when copy to destination.| • `$$LASTMODIFIED`<br>• Expression<br>• Static value|No |metadata|

## Related content

- [Set up your Azure Blob Storage connection](connector-azure-blob-storage.md)
