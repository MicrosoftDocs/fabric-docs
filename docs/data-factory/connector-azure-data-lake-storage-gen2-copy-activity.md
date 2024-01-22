---
title: Configure Azure Data Lake Storage Gen2 in a copy activity
description: This article explains how to copy data using Azure Data Lake Storage Gen2.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Azure Data Lake Storage Gen2 in a copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to Azure Data Lake Storage Gen2.

## Supported format

Azure Data Lake Storage Gen2 supports the following file formats. Refer to each article for format-based settings.

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

The following properties are supported for Azure Data Lake Storage Gen2 under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-azure-data-lake-storage-gen2/source.png" alt-text="Screenshot showing source tab." lightbox="./media/connector-azure-data-lake-storage-gen2/source.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an Azure Data Lake Storage Gen2 connection from the connection list. If no connection exists, then create a new Azure Data Lake Storage Gen2 connection by selecting **New**.
- **Connection type**: Select **Azure Data Lake Storage Gen2**.
- **File path type**: You can choose **File path**, **Wildcard file path**, or **List of files** as your file path type. The configuration of each of these settings is：

  - **File path**: If you choose this type, the data can be copied from the specified file system or folder/file path specified previously.
  - **Wildcard file path**: If you choose this type, specify the File system and Wildcard paths.
  
    - **File system**: The Azure Data Lake Storage Gen2 file system name.
  
    - **Wildcard paths**: Specify the folder or file path with wildcard characters under the specified file system to filter source folders or files.

        Allowed wildcards are: `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder name has wildcard or this escape character inside. For more examples, go to [Folder and file filter examples](/azure/data-factory/connector-azure-data-lake-storage#folder-and-file-filter-examples).
    
        :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/wildcard-file-path.png" alt-text="Screenshot showing wildcard file path.":::  
    
        - *Wildcard folder path*: Specify the folder path with wildcard characters under your specified file system to filter source folders.
    
        - *Wildcard file name*: Specify the file name with wildcard characters under your specified file system + folder path (or wildcard folder path) to filter source files.

  - **List of files**: Indicates you want to copy a given file set. Specify **Folder path** and **Path to file list** to point to a text file that includes a list of files you want to copy, one file per line, which is the relative path to the path. For more examples, go to [File list examples](/azure/data-factory/connector-azure-data-lake-storage#file-list-examples).

    :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/path-to-file-list.png" alt-text="Screenshot showing path to file list.":::
    - **Folder path**: Specify the path to a folder under the specified file system. It is required.

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

  :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/partition-discovery.png" alt-text="Screenshot showing partition discovery.":::

- **Max concurrent connections**: This property indicates the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

## Destination

The following properties are supported for Azure Data Lake Storage Gen2 under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-azure-data-lake-storage-gen2/destination.png" alt-text="Screenshot showing destination tab." lightbox="./media/connector-azure-data-lake-storage-gen2/destination.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an Azure Data Lake Storage Gen2 connection from the connection list. If no connection exists, then create a new Azure Data Lake Storage Gen2 connection by selecting **New**.
- **Connection type**: Select **Azure Data Lake Storage Gen2**.
- **File path**: Select **Browse** to choose the file that you want to copy or fill in the path manually.
- **File format**: Select the file format applied from the drop-down list. Select **Settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **Copy behavior**: Defines the copy behavior when the source is files from a file-based data store. You can choose a behavior from the drop-down list.

  :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/copy-behavior.png" alt-text="Screenshot showing copy behavior.":::

  - **Flatten hierarchy**: All files from the source folder are in the first level of the destination folder. The destination files have autogenerated names.
  - **Merge files**: Merges all files from the source folder to one file. If the file name is specified, the merged file name is the specified name. Otherwise, it's an auto-generated file name.
  - **Preserve hierarchy**: Preserves the file hierarchy in the target folder. The relative path of source file to source folder is identical to the relative path of target file to target folder.

- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Block size (MB)**: Specify the block size in MB used to write data to Azure Data Lake Storage Gen2. For more information, see [Block Blobs](/rest/api/storageservices/understanding-block-blobs--append-blobs--and-page-blobs#about-block-blobs). Allowed value is between 4 MB and 100 MB.

    By default, the block size is automatically determined based on your source store type and data. For non-binary copy into Azure Data Lake Storage Gen2, the default block size is 100 MB so as to fit in at most approximately 4.75-TB data. It may be not optimal when your data is not large. You can explicitly specify a block size, while ensure **Block size (MB)**\*50000 is big enough to store the data, otherwise copy activity run will fail.

- **Metadata**: Set custom metadata when copying to a destination. Each object under the `metadata` array represents an extra column. The `name` defines the metadata key name, and the `value` indicates the data value of that key. If the [preserve attributes feature](/azure/data-factory/copy-activity-preserve-metadata#preserve-metadata) is used, the specified metadata will union/overwrite with the source file metadata.

  Allowed data values are:

  - `$$LASTMODIFIED`: A reserved variable indicates to store the source files' last modified time. Apply to a file-based source with a binary format only.
  - **Expression**
  - **Static value**

  :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/metadata.png" alt-text="Screenshot showing metadata." lightbox="./media/connector-azure-blob-storage/metadata.png":::

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). If you choose Binary as your file format, mapping isn't supported.

### Settings

For the **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Azure Data Lake Storage Gen2.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External** |Yes|/|
|**Connection** |Your connection to the source data store.|\<your Azure Data Lake Storage Gen2 connection> |Yes|connection|
|**Connection type** | Your connection type. Select **Azure Data Lake Storage Gen2**.|**Azure Data Lake Storage Gen2**|Yes |/|
|**File path type** |The file path type that you want to use.|• File path<br>• Wildcard folder path, Wildcard file name<br>•List of files|Yes |• folderPath, fileName, fileSystem<br>• wildcardFolderPath, wildcardFileName, fileSystem<br>• folderPath, fileName, fileListPath|
|**Recursively** |Indicates whether the data is read recursively from the subfolders or only from the specified folder. Note that when **Recursively** is selected and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination. This property doesn't apply when you configure **Path to file list**.|selected (default) or unselect|No |recursive|
| **Filter by last modified** | The files with last modified time in the range [Start time, End time) will be filtered for further processing. The time will be applied to UTC time zone in the format of `yyyy-mm-ddThh:mm:ss.fffZ`. These properties can be skipped which means no file attribute filter will be applied. This property doesn't apply when you configure your file path type as List of files.| datetime | No | modifiedDatetimeStart<br>modifiedDatetimeEnd |
| **Enable partition discovery** | Indicates whether to parse the partitions from the file path and add them as additional source columns. | selected or unselected (default) | No | enablePartitionDiscovery:<br>true or false (default) |
| **Partition root path** | When partition discovery is enabled, specify the absolute root path in order to read partitioned folders as data columns. | < your partition root path > | No | partitionRootPath |
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.| \<max concurrent connections\>|No |maxConcurrentConnections|
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

### Destination information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External** |Yes|/|
|**Connection** |Your connection to the destination data store.|\<your Azure Data Lake Storage Gen2 connection>|Yes|connection|
|**Connection type** | Your connection type. Select **Azure Data Lake Storage Gen2**.|**Azure Data Lake Storage Gen2**|Yes |/|
|**File path**|The file path of your destination data.|< your file path > |Yes |folderPath, fileName, fileSystem|
|**Copy behavior** |Defines the copy behavior when the destination is files from a file-based data store.|• Flatten hierarchy<br>• Merge files<br>• Preserve hierarchy<br>|No |copyBehavior:<br>• FlattenHierarchy<br>• MergeFiles<br>• PreserveHierarchy|
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections>|No |maxConcurrentConnections|
|**Block size (MB)** |Specify the block size in MB when writing data to Azure Data Lake Storage Gen2. Allowed value is between 4 MB and 100 MB.|\<block size\>|No |blockSizeInMB|
|**Metadata**|Set custom metadata when copy to destination.| • `$$LASTMODIFIED`<br>• Expression<br>• Static value|No |metadata|

## Related content

- [Set up your Azure Data Lake Storage Gen2 connection](connector-azure-data-lake-storage-gen2.md)
