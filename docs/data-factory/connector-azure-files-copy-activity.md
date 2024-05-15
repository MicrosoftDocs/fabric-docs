---
title: Configure Azure Files in a copy activity
description: This article explains how to copy data using Azure Files.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/09/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Azure Files in a copy activity

This article outlines how to use the copy activity in Data pipeline to copy data from and to Azure Files.

## Supported format

Azure Files supports the following file formats. Refer to each article for format-based settings.

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

The following properties are supported for Azure Files under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-azure-files/source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-azure-files/source.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an Azure Files connection from the connection list. If no connection exists, then create a new Azure Files connection by selecting **New**.
- **File path type**: You can choose **File path**, **Prefix**, **Wildcard file path**, **List of files** as your file path type. The configuration of each setting is:

  - **File path**: If you choose this type, the data can be copied from the folder/file path specified.

  - **Prefix**: Prefix for the file name under the specified file share to filter source files. Files with name starting with `fileshare_in_connection/this_prefix` are selected. It utilizes the service-side filter for Azure Files, which provides better performance than a wildcard filter.

    :::image type="content" source="./media/connector-azure-files/prefix.png" alt-text="Screenshot showing prefix file path type.":::

  - **Wildcard file path**: Specify the folder or file path with wildcard characters to filter source folders or files.

    Allowed wildcards are `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder name has a wildcard or this escape character inside. For more examples, go to [Folder and file filter examples](/azure/data-factory/connector-azure-file-storage?tabs=data-factory#folder-and-file-filter-examples).

    :::image type="content" source="./media/connector-azure-files/wildcard-file-path.png" alt-text="Screenshot showing wildcard file path.":::

    *Wildcard folder path*: Specify the folder path with wildcard characters to filter source folders.

    *Wildcard file name*: Specify the file name with wildcard characters under the configured folder/wildcard folder path to filter source files.

  - **List of files**: Indicates a given file set to copy to. In **Path to file list**, enter or browse to a text file that includes a list of files you want to copy, one file per line, which is the relative path to to each file.

    When you're using this option, don't specify a file name. For more examples, go to [File list examples](/azure/data-factory/connector-azure-file-storage?tabs=data-factory#file-list-examples).

    :::image type="content" source="./media/connector-azure-files/path-to-file-list.png" alt-text="Screenshot showing path to file list.":::

    - **Folder path**: Specify the path to a folder. It is required.

    - **Path to file list**: Specify the path of the text file that includes a list of files you want to copy.

- **Recursively**: Specify whether the data is read recursively from the subfolders or only from the specified folder. Note that when **Recursively** is selected and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination. This property is selected by default and doesn't apply when you configure **Path to file list**.

- **File format**: Select the file format applied from the drop-down list. Select **Settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **Filter by last modified**: Files are filtered based on the last modified dates. This property doesn't apply when you configure your file path type as List of files.

  - **Start time (UTC)**: The files are selected if their last modified time is greater than or equal to the configured time.
  - **End time (UTC)**: The files are selected if their last modified time is less than the configured time.

    When **Start time (UTC)** has datetime value but **End time (UTC)** is NULL, it means the files whose last modified attribute is greater than or equal with the datetime value will be selected. When **End time (UTC)** has datetime value but **Start time (UTC)** is NULL, it means the files whose last modified attribute is less than the datetime value will be selected. The properties can be NULL, which means no file attribute filter will be applied to the data.
- **Enable partition discovery**: Specify whether to parse the partitions from the file path and add them as additional source columns. It is unselected by default and not supported when you use binary file format.

  - **Partition root path**: When partition discovery is enabled, specify the absolute root path in order to read partitioned folders as data columns.

    If it is not specified, by default,
    - When you use file path or list of files on source, partition root path is the path that you configured.
    - When you use wildcard folder filter, partition root path is the sub-path before the first wildcard.

    For example, assuming you configure the path as `root/folder/year=2020/month=08/day=27`:

    - If you specify partition root path as `root/folder/year=2020`, copy activity will generate two more columns month and day with value "08" and "27" respectively, in addition to the columns inside the files.
    - If partition root path is not specified, no extra column will be generated.

  :::image type="content" source="./media/connector-azure-files/partition-discovery.png" alt-text="Screenshot showing partition discovery.":::

- **Max concurrent connections**: This property indicates the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Destination

The following properties are supported for Azure Files under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-azure-files/destination.png" alt-text="Screenshot showing destination tab." lightbox="./media/connector-azure-files/destination.png":::

The following properties are **required**:

- **Data store type:** Select **External**.
- **Connection:** Select an Azure Files connection from the connection list. If the connection doesn't exist, then create a new Azure Files connection by selecting **New**.
- **File path**: Select **Browse** to choose the file that you want to copy or fill in the path manually.
- **File format**: Select the file format applied from the drop-down list. Select **Settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **Copy behavior**: Defines the copy behavior when the source is files from a file-based data store. You can choose a behavior from the drop-down list.

    :::image type="content" source="./media/connector-azure-files/copy-behavior.png" alt-text="Screenshot showing copy behavior.":::
  
  - **Flatten hierarchy**: All files from the source folder are in the first level of the destination folder. The destination files have autogenerated names.
  - **Merge files**: Merges all files from the source folder to one file. If the file name is specified, the merged file name is the specified name. Otherwise, it's an auto-generated file name.
  - **Preserve hierarchy**: Preserves the file hierarchy in the target folder. The relative path of source file to source folder is identical to the relative path of target file to target folder.

- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Max rows per file**: When writing data into a folder, you can choose to write to multiple files and specify the maximum rows per file. Specify the maximum rows that you want to write per file.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). If you choose Binary as your file format, mapping won't be supported.

### Settings

For **Settings** tab configuration, see [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Azure Files.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|  **External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your Azure Files connection> |Yes|connection|
|**File path type** |The file path type used to get source data.|• File path <br>• Prefix<br>• Wildcard file path<br>• List of files|Yes |/|
|*For **File path*** |||||
| **Directory** |The path to the folder. | \<your folder name> |No|folderPath|
| **File name** |The file name under the specified folder path. | \<your file name> |No|fileName|
|*For **Prefix*** |||||
| **Prefix** | The prefix for the file name under the specified file share to filter source files. | \<your prefix> |No|prefix|
|*For **Wildcard file path*** |||||
| **Wildcard folder path** | The folder path with wildcard characters to filter source folders. | \<your folder path with wildcard characters> |No|wildcardFolderPath |
| **Wildcard file name** | The file name with wildcard characters under the specified folder/wildcard folder path to filter source files. | \<your file name with wildcard characters> |Yes|wildcardFileName |
|*For **List of files*** |||||
| **Folder path** |The path to the folder. | \<your folder name> |No|folderpath|
| **Path to file list** | Indicates to copy a given file set. Point to a text file that includes a list of files you want to copy, one file per line. | < file list path > | No | fileListPath |
||||||
|**Recursively** |Process all files in the input folder and its subfolders recursively or just the ones in the selected folder. This setting is disabled when a single file is selected.|Selected or unselect|No |recursive|
| **File format** | The file format for your source data. For the information of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.  | / | Yes | / |
| **Filter by last modified** | The files with last modified time in the range [Start time, End time) will be filtered for further processing. The time will be applied to UTC time zone in the format of `yyyy-mm-ddThh:mm:ss.fffZ`. These properties can be skipped which means no file attribute filter will be applied. This property doesn't apply when you configure your file path type as List of files.| datetime | No | modifiedDatetimeStart<br>modifiedDatetimeEnd |
| **Enable partition discovery** | Indicates whether to parse the partitions from the file path and add them as additional source columns. | selected or unselected (default) | No | enablePartitionDiscovery:<br>true or false (default) |
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.| \<max concurrent connections\>|No |maxConcurrentConnections|
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

### Destination information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External** |Yes|/|
|**Connection** |Your connection to the destination data store.|\<your connection>|Yes|connection|
|**File path**|The folder/file path to the destination file.|< folder/file path > |Yes |/|
| **Directory** |The path to the folder under the specified bucket. | \<your folder name> |No|folderpath|
| **File name** |The file name under the specified bucket and folder path. | \<your file name> |No|fileName|
|**Copy behavior** |Defines the copy behavior when the source is files from a file-based data store.|• Flatten hierarchy<br>• Merge files<br>• Preserve hierarchy|No |copyBehavior:<br>• FlattenHierarchy<br>• MergeFiles<br>• PreserveHierarchy|
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\>|No |maxConcurrentConnections|
|**Max rows per file**|When writing data into a folder, you can choose to write to multiple files and specify the maximum rows per file. Specify the maximum rows that you want to write per file.|< your max rows per file >|No|maxRowsPerFile|

## Related content

- [Azure Files overview](connector-azure-files-overview.md)
