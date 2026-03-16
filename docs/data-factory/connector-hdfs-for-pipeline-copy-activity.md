---
title: Configure Hdfs for Pipeline in a copy activity
description: This article explains how to copy data using Hdfs for Pipeline.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 06/04/2025
ms.custom:
  - template-how-to
---

# Configure Hdfs for Pipeline in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to Hdfs for Pipeline.

## Supported format

Hdfs for Pipeline supports the following file formats. Refer to each article for format-based settings.

- [Avro format](format-avro.md)
- [Binary format](format-binary.md)
- [Delimited text format](format-delimited-text.md)
- [Excel format](format-excel.md)
- [Iceberg format](format-iceberg.md)
- [JSON format](format-json.md)
- [ORC format](format-orc.md)
- [Parquet format](format-parquet.md)
- [XML format](format-xml.md)

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for Hdfs for Pipeline under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-Hdfs-for-pipeline/source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-Hdfs-for-pipeline/source.png":::

The following properties are **required**:

- **Connection**:  Select a Hdfs for Pipeline connection from the connection list. If no connection exists, then create a new Hdfs for Pipeline connection.

- **File path type**: You can choose **File path**, **Wildcard file path**, or **List of files** as your file path type. The configuration of each of these settings is:

  - **File path**: If you choose this type, the data can be copied from the folder/file path specified.
  - **Wildcard file path**: Specify the folder path with wildcard characters to filter source folders. Allowed wildcards are: `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder or file name has wildcard or this escape character inside. For more examples, go to [Folder and file filter examples](/azure/data-factory/connector-hdfs?tabs=data-factory#folder-and-file-filter-examples).
  
    - **Wildcard folder path**: Specify the folder path with wildcard characters to filter source folders.
    - **Wildcard file name**: Specify the file name with wildcard characters under the configured folder/wildcard folder path to filter source files.

      :::image type="content" source="./media/connector-hdfs-for-pipeline/wildcard-paths.png" alt-text="Screenshot showing wildcard file path.":::

  - **List of files**: Indicates to copy a specified file set. Point to a text file that includes a list of files you want to copy (one file per line, with the relative path to the path configured in the dataset).<br>When you use this option, do not specify file name in the dataset. For more examples, see [File list examples](/azure/data-factory/connector-hdfs?tabs=data-factory#file-list-examples).
    - **Folder path**: Specify the path to a folder. It is required.
    - **Path to file list**: Specify the path of the text file that includes a list of files you want to copy.

        :::image type="content" source="./media/connector-hdfs-for-pipeline/list-of-files.png" alt-text="Screenshot showing path to file list.":::

- **Recursively**: Specify whether the data is read recursively from the subfolders or only from the specified folder. Note that when **Recursively** is selected and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination. This property is selected by default and doesn't apply when you configure **Path to file list**.

- **File format**: Select the file format applied from the drop-down list. Select **Settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **Filter by last modified**: Files are filtered based on the last modified dates. This property doesn't apply when you configure your file path type as **List of files**.

  - **Start time (UTC)**: The files are selected if their last modified time is greater than or equal to the configured time.
  
  - **End time (UTC)**: The files are selected if their last modified time is less than the configured time.

- **Enable partition discovery**: For files that are partitioned, specify whether to parse the partitions from the file path and add them as extra source columns.

  - **Partition root path**: When partition discovery is enabled, specify the absolute root path in order to read partitioned folders as data columns.

- **Max concurrent connections**: This property indicates the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Use HDFS DistCp**: Specify whether to enable use HDFS DistCp property group.

  - **ResourceManager endpoint**: The YARN (Yet Another Resource Negotiator) endpoint.

  - **Temp script path**: A folder path that's used to store the temp DistCp command script. The script file is generated and will be removed after the Copy job is finished.

  - **DistCp options**: Additional options provided to DistCp command.

  :::image type="content" source="./media/connector-hdfs-for-pipeline/use-hdfs-distcp.png" alt-text="Screenshot showing hdfs distcp settings.":::

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, see [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Hdfs for Pipeline.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your Hdfs for Pipeline connection> |Yes|connection|
|**File path type** |The type of the file path that you use. |• **File path**<br>• **Wildcard file path**<br> • **List of files** |Yes|/ |
|**File path** |Copy from the path to a folder/file under source data store.| \<file path>|Yes|• folderPath<br>• fileName |
|**Wildcard paths** |The folder path with wildcard characters under the source data store configured to filter source folders.| \<wildcard paths> |Yes|• wildcardFolderPath<br>• wildcardFileName |
|**Folder path** |Points to a folder that includes files you want to copy. |\<folder path> |No|folderPath |
|**Path to file list** |Indicates to copy a given file set. Point to a text file that includes a list of files you want to copy, one file per line, which is the relative path to the path configured.|\<path to file list> |No| fileListPath|
|**Recursively** |Indicates whether the data is read recursively from the subfolders or only from the specified folder. Note that when **Recursively** is selected and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination. This property doesn't apply when you configure **Path to file list**.|selected (default) or unselect|No |recursive|
| **File format** | The file format for your source data. For the information of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.  | / | Yes | / |
|**Filter by last modified**|The files with last modified time in the range [Start time, End time) will be filtered for further processing.<br><br> The time is applied to UTC time zone in the format of `yyyy-mm-ddThh:mm:ss.fffZ`.<br><br>This property can be skipped which means no file attribute filter is applied. This property doesn't apply when you configure your file path type as **List of files**.|• **Start time**<br>• **End time** |No |modifiedDatetimeStart<br>modifiedDatetimeEnd|
|**Enable partition discovery**|Whether to parse the partitions from the file path and add them as extra source columns.| Selected or unselected (default) |No| enablePartitionDiscovery: <br> true or false (default)|
|**Partition root path**|The absolute partition root path to read partitioned folders as data columns.| \<your partition root path\> |No| partitionRootPath|
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.| \<max concurrent connections\>|No |maxConcurrentConnections|
| **Use HDFS DistCp** | Specify whether to enable use HDFS DistCp property group. | selected or unselect (default) | No | / |
| **ResourceManager endpoint** | The YARN (Yet Another Resource Negotiator) endpoint. | < your resourceManager endpoint > | Yes, if using DistCp | resourceManagerEndpoint |
| **Temp script path** | A folder path that's used to store the temp DistCp command script. The script file is generated and will be removed after the Copy job is finished. |  < your temp script path > | Yes, if using DistCp | tempScriptPath |
| **DistCp options** | Additional options provided to DistCp command. |  < your distCp options > | No | distcpOptions |
|  |  |  |  |  |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [Hdfs for Pipeline overview](connector-hdfs-for-pipeline-overview.md)
