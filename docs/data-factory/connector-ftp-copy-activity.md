---
title: How to configure FTP in a copy activity
description: This article explains how to copy data using FTP.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 08/18/2023
ms.custom: template-how-to, build-2023
---

# How to configure FTP in a copy activity

This article outlines how to use the copy activity in data pipeline to copy data from FTP.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Supported format

FTP supports the following file formats. Refer to each article for format-based settings.

- Avro format
- [Binary format](format-binary.md)
- [Delimited text format](format-delimited-text.md)
- [Excel format](format-excel.md)
- JSON format
- ORC format
- [Parquet format](format-parquet.md)
- XML format

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

Go to **Source** tab to configure your copy activity source. See the following content for the detailed configuration.

:::image type="content" source="./media/connector-ftp/source.png" alt-text="Screenshot showing source tab and the list of properties." lightbox="./media/connector-http/source.png":::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an FTP connection from the connection list. If no connection exists, then create a new FTP connection by selecting **New**.
- **File path type**: Select from **File path**, **Wildcard file path** and **List of files** based on your source data.
    - **File path**: If you choose this type, specify your source file path. You can select **Browse** to select your source files or enter your file path manually.
    - **Wild file path**: If you choose this type, specify the **Wildcard paths** to filter your source folders or files.

        Allowed wildcards are `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder name has a wildcard or this escape character inside. For more examples, go to [Folder and file filter examples](/azure/data-factory/connector-ftp#folder-and-file-filter-examples).

        :::image type="content" source="./media/connector-ftp/wildcard-file-path.png" alt-text="Screenshot showing wildcard file path.":::
        
        **Wildcard folder path**: Specify the folder path with wildcard characters to filter source folders.

        **Wildcard file name**: Specify the file name with wildcard characters under the given folderPath/wildcard folder path to filter source files.

    - **List of files**: If you select this type, you can specify the **Folder path** and  **Path to file list** to indicates to copy a given file set. Point to a text file that includes a list of files you want to copy, one file per line. For more examples, go to [File list examples](/azure/data-factory/connector-ftp#file-list-examples).
    
      **Folder path**: Specify your common home folder for paths in the text file specified in **Path to file list** if it has.<br>
      **Path to file list**: Specify the path of the text file that includes a list of files you want to copy. 
        
        :::image type="content" source="./media/connector-ftp/list-of-files.png" alt-text="Screenshot showing list of files.":::
       
- **File format**: Select the file format applied from the drop-down list. Select **Settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.
 
Under **Advanced**, you can specify the following fields:

- **Disable chunking**: When copying data from FTP, the service tries to get the file length first, then divide the file into multiple parts and read them in parallel. Specify whether your FTP server supports getting file length or seeking to read from a certain offset. It is unselected by default. 

- **Enable partition discovery**: Specify whether to parse the partitions from the file path and add them as additional source columns. It is unselected by default and not supported when you use binary file format.

  - **Partition root path**: When partition discovery is enabled, specify the absolute root path in order to read partitioned folders as data columns.<br>
     If it is not specified, by default,
    - When you use file path or list of files on source, partition root path is the path that you configured.
    - When you use wildcard folder filter, partition root path is the sub-path before the first wildcard.
    
    For example, assuming you configure the path as `root/folder/year=2020/month=08/day=27`:

    - If you specify partition root path as `root/folder/year=2020`, copy activity will generate two more columns month and day with value "08" and "27" respectively, in addition to the columns inside the files.
    - If partition root path is not specified, no extra column will be generated. 
        
    :::image type="content" source="./media/connector-ftp/partition-discovery.png" alt-text="Screenshot showing list of files.":::

- **Use binary transfer**: Specify whether to use the binary transfer mode. Select it to use binary mode (default) or unselect it to use ASCII.

- **Max concurrent connections**: This property indicates the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. For more information, go to [Add additional columns during copy](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy).


### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). If you choose Binary as your file format, mapping will not be supported.

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following table contains more information about the copy activity in FTP.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **Data store type** | Your data store type. | **External** | Yes | / | 
| **Connection** | Your FTP connection to the source data store. | < your FTP connection > | Yes | connection | 
| **File path type** | The file path type used to get source data. | File path<br>Wildcard file path<br>List of files | Yes | / | 
| **File path** | The path to the source file. | < file path> | Yes when you select **File path** | fileName<br>folderpath | 
| **Wildcard paths** | The wildcard path to the source file. | < your wildcard file path > | Yes for **Wildcard file name** when you select **Wildcard file name** | wildcardFolderPath<br>wildcardFileName | 
| **Folder path** | The common home folder for paths in the file specified in **Path to file list** if it has.| < your folder path> | No | folderPath | 
| **Path to file list** | Indicates to copy a given file set. Point to a text file that includes a list of files you want to copy, one file per line. | < file list path > |  Yes when you select **List of files** | fileListPath | 
| **File format** | The file format for your source data. For the information of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.  | / | Yes | / | 
| **Disable chunking** | When copying data from FTP, the service tries to get the file length first, then divide the file into multiple parts and read them in parallel. Specify whether your FTP server supports getting file length or seeking to read from a certain offset. | selected or unselected (default) |No  | disableChunking:<br>true or false (default)| 
| **Enable partition discovery** | Indicates whether to parse the partitions from the file path and add them as additional source columns. | selected or unselected (default) | No | enablePartitionDiscovery:<br>true or false (default) | 
| **Partition root path** | The absolute partition root path in order to read partitioned folders as data columns. Specify it when partition discovery is enabled.| < partition root path >  | No | partitionRootPath | 
| **Use binary transfer** | Indicates whether to use the binary transfer mode. The values are true for binary mode (default), and false for ASCII. | selected (default) or unselected | No | useBinaryTransfer:<br>true (default) or false | 
| **Max concurrent connections** | The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections. | < upper limit of concurrent connections ><br>(integer) | No | maxConcurrentConnections | 
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. For more information, go to [Add additional columns during copy](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy) | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Next steps

- [FTP connector overview](connector-ftp-overview.md)
