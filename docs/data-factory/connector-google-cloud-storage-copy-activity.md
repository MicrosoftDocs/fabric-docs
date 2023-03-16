---
title: How to configure Google Cloud Storage in copy activity
description: This article explains how to copy data using Google Cloud Storage.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 02/20/2023
ms.custom: template-how-to 
---

# How to configure Google Cloud Storage in copy activity

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article outlines how to use the copy activity in data pipeline to copy data from and to Google Cloud Storage.

## Supported format

Google Cloud Storage supports the following file formats. Refer to each article for format-based settings.

- Avro format
- Binary format
- Delimited text format
- Excel format
- JSON format
- ORC format
- Parquet format
- XML format

## Supported configuration

For the configuration of each tab under copy activity, see the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Settings](#settings)

### General

For **General** tab configuration, go to General.

### Source

The following properties are supported for Google Cloud Storage under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-google-cloud/source.png" alt-text="Screenshot showing source tab and the list of properties.":::

The following some properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an **Google Cloud Storage** connection from the connection list. If no connection exists, then create a new Google Cloud Storage connection by selecting **New**.
- **File path**: Select **Browse** to choose the file that you want to copy, or fill in the path manually.
- **File settings**: Select **File settings** to configure the file format. For settings of different file formats, refer to [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **File path type**: You can choose **File path**, **Prefix**, **Wildcard file path**, or **List of files** as your file path type. The configuration of each of these settings is：

    - **File path**: If you choose this type, the data can be copied from the given container or folder/file path specified previously.

    - **Prefix**: Prefix for the GCS key name under the given bucket configured in the dataset to filter source GCS files. GCS keys whose names start with `bucket_in_dataset/this_prefix` are selected. It utilizes GCS's service-side filter, which provides better performance than a wildcard filter.

    :::image type="content" source="./media/connector-google-cloud/prefix.png" alt-text="Screenshot showing prefix.":::

    - **Wildcard file path**: Specify the folder or file path with wildcard characters under your given blob container to filter your source folders or files.

      Allowed wildcards are: `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder name has wildcard or this escape character inside. For more examples, got to [Folder and file filter examples](/azure/data-factory/connector-azure-blob-storage?tabs=data-factory#folder-and-file-filter-examples).

        * Wildcard folder path: Specify the folder path with wildcard characters under your given container to filter source folders.

        :::image type="content" source="./media/connector-google-cloud/wildcard-folder-path.png" alt-text="Screenshot showing wildcard file path.":::

        * Wildcard file name: Specify the file name with wildcard characters under your given container and folder path (or wildcard folder path) to filter source files.

    - **List of files**: Point to a text file that lists each file (relative path to the path configured in the dataset) that you want to copy.

       When you're using this option, don't specify a file name. For more examples, go to [File list examples](/azure/data-factory/connector-azure-blob-storage?tabs=data-factory#file-list-examples).

    :::image type="content" source="./media/connector-google-cloud/path-to-file-list.png" alt-text="Screenshot showing list of files.":::

- **Recursively**: Process all files in the input folder and its subfolders recursively or just the ones in the selected folder. This setting is disabled when a single file is selected.

- **Delete files after completion**：The files on source data store will be deleted right after being moved to the destination store. The file deletion is per file, so when copy activity fails, you will see some files have already been copied to the destination and deleted from source while others are still on source store.

- **Max concurrent connection**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Settings

For **Settings** tab configuration, see Settings

## Table summary

The following tables contain more information about the copy activity in Google Cloud Storage.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**File path** | The file path of your source data.|\<file path of your source >|Yes |container <br> fileName|
|**File path type** |The file path type that you want to use.|• File path <br>• Prefix<br>• Wildcard folder path<br>•List of files|No |<br>• prefix<br>• wildcardFolderPath, wildcardFileName<br>• path to file list|
|**Recursively** |Process all files in the input folder and its subfolders recursively or just the ones in the selected folder. This setting is disabled when a single file is selected.| Selected or unselect |No |recursive|
|**Delete files after completion** |The files on source data store will be deleted right after being moved to the destination store. The file deletion is per file, so when copy activity fails, you'll see some files have already been copied to the destination and deleted from the source, while others are still in the source store.|Selected or unselect|No |deleteFilesAfterCompletion|
|**Max concurrent connection** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\>|No |maxConcurrentConnections|

## Next Steps

[How to create Google Cloud Storage connection](connector-google-cloud-storage.md)