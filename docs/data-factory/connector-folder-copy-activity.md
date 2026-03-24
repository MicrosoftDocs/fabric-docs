---
title: Configure Folder in a copy activity
description: This article explains how to configure Folder in a copy activity.
author: jianleishen
ms.author: jianleishen
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 03/20/2026
ai-usage: ai-assisted
ms.custom:
  - template-how-to
  - connectors
---

# Configure Folder in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to Folder.

## Prerequisites

To copy data from Folder, you need to set up an on-premises data gateway. For more information, see [How to access on-premises data sources in Data Factory](how-to-access-on-premises-data.md).

## Supported format

The Folder connector supports the following file formats. Refer to each article for format-based settings.

**Source supported formats**
- [Avro format](format-avro.md)
- [Binary format](format-binary.md)
- [Delimited text format](format-delimited-text.md)
- [Excel](format-excel.md)
- [JSON format](format-json.md)
- [ORC format](format-orc.md)
- [Parquet format](format-parquet.md)
- [XML format](format-xml.md)

**Destination supported formats**
- [Avro format](format-avro.md)
- [Binary format](format-binary.md)
- [Delimited text format](format-delimited-text.md)
- [JSON format](format-json.md)
- [ORC format](format-orc.md)
- [Parquet format](format-parquet.md)

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)
- [Source](#source)
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the **General** settings guidance to configure the **General** settings tab.

### Source

The following properties are supported for Folder under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-folder/folder-source.png" alt-text="Screenshot showing the Source tab configuration for Folder.":::

The following properties are **required**:

- **Connection**: Select a Folder connection from the connection list. If no connection exists, then create a new Folder connection.
- **File path type**: You can choose **File path**, **File filter**, **Wildcard file path**, or **List of files** as your file path type. The configuration for each setting is:

  - **File path**: Select **Browse** to choose the file that you want to copy, or fill in the path manually.

  - **File filter**: File server side native filter, which provides better performance than wildcard filter.

    - **Folder path**: Specify the path to the folder.
    - **File filter**: Use `*` to match zero or more characters and `?` to match zero or single character. Learn more about the syntax and notes from the **Remarks** under this [section](/dotnet/api/system.io.directory.getfiles#system-io-directory-getfiles(system-string-system-string-system-io-searchoption)).

  - **Wildcard file path**: Specify the Wildcard paths.

    - **Wildcard paths**: Specify the folder or file path with wildcard characters to filter source folders or files.

      Allowed wildcards are: `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder name has wildcards or this escape character inside.

      - *Wildcard folder path*: Specify the folder path with wildcard characters to filter source folders.

      - *Wildcard file name*: Specify the file name with wildcard characters under your specified folder path (or wildcard folder path) to filter source files.

  - **List of files**: Indicates you want to copy a given file set.
  
    - **Folder path**: Specify the path to the folder.
    - **Path to file list**: Points to a text file that includes a list of files you want to copy, one file per line, which is the relative path to the file path configured.

- **File format**: Select the file format applied from the drop-down list. Select **Settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format).

The following properties are **optional**:

- **Recursively**: Specify whether the data is read recursively from the subfolders or only from the specified folder. This property is selected by default and doesn't apply when you configure **List of files**.
- **Delete files after completion**: Indicates whether the binary files are deleted from source store after successfully moving to the destination store. The file deletion is per file. This property is only valid in binary files copy scenario.

Under **Advanced**, you can specify the following fields:

- **Filter by last modified**: Files are filtered based on the last modified dates. This property doesn't apply when you configure your file path type as List of files.

  - **Start time (UTC)**: The files are selected if their last modified time is greater than or equal to the configured time.

  - **End time (UTC)**: The files are selected if their last modified time is less than the configured time.

  When **Start time (UTC)** has a datetime value but **End time (UTC)** is NULL, it means the files whose last modified attribute is greater than or equal to the datetime value will be selected. When **End time (UTC)** has a datetime value but **Start time (UTC)** is NULL, it means the files whose last modified attribute is less than the datetime value will be selected. The properties can be NULL, which means no file attribute filter will be applied to the data.

- **Enable partition discovery**: Specify whether to parse the partitions from the file path and add them as additional source columns. It is unselected by default and not supported when you use binary file format.

  - **Partition root path**: When partition discovery is enabled, specify the absolute root path in order to read partitioned folders as data columns.

    If it is not specified, by default,
    - When you use file path or list of files on source, partition root path is the path that you configured.
    - When you use wildcard folder filter, partition root path is the sub-path before the first wildcard.

- **Max concurrent connections**: This property indicates the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Destination

The following properties are supported for Folder under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-folder/folder-destination.png" alt-text="Screenshot showing the Destination tab configuration for Folder.":::

The following properties are **required**:

- **Connection**: Select a Folder connection from the connection list. If no connection exists, then create a new Folder connection.

- **File path**: Select **Browse** to choose the file that you want to copy or fill in the path manually.

- **File format**: Select the file format applied from the drop-down list. Select **Settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format).

The following properties are **optional**:

Under **Advanced**, you can specify the following fields:

- **Copy behavior**: Defines the copy behavior when the source is files from a file-based data store. You can choose a behavior from the drop-down list.

  - **Flatten hierarchy**: All files from the source folder are in the first level of the destination folder. The destination files have autogenerated names.
  - **Merge files**: Merges all files from the source folder to one file. If the file name is specified, the merged file name is the specified name. Otherwise, it's an auto-generated file name.
  - **Preserve hierarchy** (default): Preserves the file hierarchy in the target folder. The relative path of source file to source folder is identical to the relative path of target file to target folder.

- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Folder.

### Source information

| Name | Description | Value | Required | JSON script property |
|---|---|---|---|---|
| **Connection** | Your connection to the source data store. | \<your Folder connection\> | Yes | connection |
| **File path type** | The file path type used to get source data. | / | Yes | / |
| *For **File path***|  |  |  |  |
| **File path** | The folder or file path where files are read from. | \<your folder or file path\> | No | folderPath<br>fileName |
| *For **File filter*** |  |  |  |  |
| **Folder path** | Specify the path to the folder. | \<your folder path\> | No | folderPath |
| **File filter** | File server side native filter. | \<your file filter\> | No | fileFilter |
| *For **Wildcard file path*** |  |  |  |  |
| **Wildcard folder path** | Wildcard folder path used to filter source folders. | \<your folder path with wildcard characters\> | No | wildcardFolderPath |
| **Wildcard file name** | Wildcard file name pattern used to filter source files. | \<your file name with wildcard characters\> | No | wildcardFileName |
| *For **List of files*** |  |  |  |  |
| **Folder path** | Specify the path to the folder. | \<your folder path\> | No | folderPath |
| **Path to file list** | Path to a text file listing files to copy (relative to the configured path). | \<file list path\> | No | fileListPath |
| **File format** | The file format for your source data. For information about different file formats, refer to articles in [Supported format](#supported-format). | / | Yes | / |
| **Recursively** | Indicates whether the data is read recursively from the subfolders or only from the specified folder. This property doesn't apply when you configure **List of files**.| true/false | No | recursive |
| **Delete files after completion** | Indicates whether the binary files are deleted from source store after successfully moving to the destination store. | true/false | No | deleteFilesAfterCompletion |
| **Filter by last modified** | The files with last modified time in the range [Start time, End time) will be filtered for further processing. The time will be applied to UTC time zone in the format of `YYYY-MM-DDTHH:mm:ssZ`. These properties can be skipped which means no file attribute filter will be applied. This property doesn't apply when you configure your file path type as List of files.| \<datetime\> | No | modifiedDatetimeStart<br>modifiedDatetimeEnd |
| **Enable partition discovery** | Indicates whether to parse the partitions from the file path and add them as additional source columns. |true/false | No | enablePartitionDiscovery |
| **Partition root path** | When partition discovery is enabled, specify the absolute root path in order to read partitioned folders as data columns. | \<your partition root path\> | No | partitionRootPath |
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<integer\>  |No |maxConcurrentConnections|

### Destination information

| Name                         | Description                                                                 | Value                                    | Required | JSON script property      |
|------------------------------|-----------------------------------------------------------------------------|------------------------------------------|----------|---------------------------|
| **Connection**                   | Your connection to the destination data store.                               | \<your Folder connection\> | Yes      | connection                |
| **File path**                    | The folder path where files are written to.              | \<your folder path\>                      | Yes      | folderPath<br>fileName                |
| **File format**                  | The file format for your destination data. For the information of different file formats, refer to articles in [Supported format](#supported-format). | / | Yes | / |
| **Copy behavior**                | Defines how files are written to the destination.                            | FlattenHierarchy<br>MergeFiles<br>PreserveHierarchy (default)    | No       | copyBehavior              |
| **Max concurrent connections**   | Maximum number of concurrent connections to the data store.                 | \<integer\>                                | No       | maxConcurrentConnections  |

## Related content

- [Folder connector overview](connector-folder-overview.md)
