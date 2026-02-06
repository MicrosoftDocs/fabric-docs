---
title: Configure Oracle Cloud Storage in a copy activity
description: This article explains how to copy data by using Oracle Cloud Storage in Data Factory in Microsoft Fabric.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 03/18/2024
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure Oracle Cloud Storage in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from Oracle Cloud Storage.

## Prerequisites

To copy data from Oracle Cloud Storage, see [Object Storage Amazon S3 Compatibility API](https://docs.oracle.com/iaas/Content/Object/Tasks/s3compatibleapi.htm) for the prerequisites and required permission.

## Supported format

Oracle Cloud Storage supports the following file formats. Refer to each article for format-based settings.

- [Avro format](format-avro.md)
- [Binary format](format-binary.md)
- [Delimited text format](format-delimited-text.md)
- [Excel format](format-excel.md)
- [JSON format](format-json.md)
- [ORC format](format-orc.md)
- [Parquet format](format-parquet.md)
- [XML format](format-xml.md)

## Supported configuration

For the configuration of each tab on a copy activity, go to the following sections:

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for Oracle Cloud Storage on the **Source** tab of a copy activity.

The following properties are *required*:

- **Connection**: Select an **Oracle Cloud Storage** connection from the connection list. If no connection exists, create a new Oracle Cloud Storage connection by selecting **New**.
- **File path type**: You can choose **File path**, **Prefix**, **Wildcard file path**, or **List of files** as your file path type. The configuration of each of these settings is：

    - **File path**: The data can be copied from the specified bucket or folder/file path specified in **File path**.
    - **Prefix**: Specify the **Bucket** and **Prefix**.
        - **Bucket**: Specify the Oracle Cloud Storage bucket name. It's required.
        - **Prefix**: Prefix for the Oracle Cloud Storage key name under the specified bucket to filter source Oracle Cloud Storage files. Oracle Cloud Storage keys whose names start with `given_bucket/this_prefix` are selected. It utilizes Oracle Cloud Storage's service-side filter, which provides better performance than a wildcard filter.
    
            :::image type="content" source="./media/connector-oracle-cloud-storage/prefix.png" alt-text="Screenshot that shows how to configure Prefix file path type.":::
    
    - **Wildcard file path**: Specify the **Bucket** and **Wildcard paths**.
        - **Bucket**: Specify the Oracle Cloud Storage bucket name. It's required.
        - **Wildcard paths**: Specify the folder or file path with wildcard characters under your specified bucket to filter your source folders or files.
    
          **Allowed wildcards are**: `*` (matches zero or more characters) and `?` (matches zero or a single character). Use `^` to escape if your folder name has a wildcard or this escape character inside. For more examples, go to [Folder and file filter examples](/azure/data-factory/connector-oracle-cloud-storage?tabs=data-factory#folder-and-file-filter-examples).

          :::image type="content" source="./media/connector-oracle-cloud-storage/wildcard-paths.png" alt-text="Screenshot that shows how to configure Wildcard file path.":::

            - **Wildcard folder path**: Specify the folder path with wildcard characters under the specified bucket to filter source folders.
            - **Wildcard file name**: Specify the file name with wildcard characters under the specified bucket and folder path (or wildcard folder path) to filter source files.

    - **List of files**: Specify the **Folder path** and **Path to file list** to indicate to copy a specified file set. Point to a text file that includes a list of files you want to copy, one file per line, which is the relative path to the path configured. For more examples, go to [File list examples](/azure/data-factory/connector-oracle-cloud-storage?tabs=data-factory#file-list-examples).

       :::image type="content" source="./media/connector-oracle-cloud-storage/list-of-files.png" alt-text="Screenshot that shows how to configure List of files.":::

        - **Folder path**: Specify the path to the folder under the specified bucket. It's required.
        - **Path to file list**: Specify the path of the text file that includes a list of files you want to copy.

- **Recursively**: Indicates whether the data is read recursively from the subfolders or only from the specified folder. When this checkbox is selected, and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination.
- **File format**: Select the file format applied from the dropdown list. Select **Settings** to configure the file format. For settings of different file formats, refer to the articles in [Supported format](#supported-format).

Under **Advanced**, you can specify the following fields:

- **Filter by last modified**: Files are filtered based on the last modified dates that you specified. This property doesn't apply when you configure your file path type as **List of files**.
  - **Start time (UTC)**: The files are selected if their last modified time is greater than or equal to the configured time.
  - **End time (UTC)**: The files are selected if their last modified time is less than the configured time.

  When **Start time (UTC)** has a datetime value but **End time (UTC)** is NULL, it means the files whose last modified attribute is greater than or equal to the datetime value are selected. When **End time (UTC)** has a datetime value but **Start time (UTC)** is NULL, it means the files whose last modified attribute is less than the datetime value are selected. The properties can be NULL, which means no file attribute filter is applied to the data.

- **Enable partitions discovery**: Specify whether to parse the partitions from the file path and add them as other source columns. It's not selected by default and not supported when you use binary file format.

  - **Partitions root path**: When partition discovery is enabled, specify the absolute root path to read partitioned folders as data columns.

    If it's not specified, by default:
    - When you use a file path or list of files on source, the partition root path is the path that you configured.
    - When you use a wildcard folder filter, the partition root path is the subpath before the first wildcard.
    - When you use a prefix, the partition root path is the subpath before the last "/".

    For example, assuming that you configure the path as `root/folder/year=2020/month=08/day=27`:

    - If you specify the partition root path as `root/folder/year=2020`, the copy activity generates two more columns, month and day. These columns have the values "08" and "27" respectively, in addition to the columns inside the files.
    - If the partition root path isn't specified, no extra column is generated.

    :::image type="content" source="./media/connector-oracle-cloud-storage/enable-partition-discovery.png" alt-text="Screenshot that shows Enable partitions discovery.":::

- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.
- **Additional columns**: Add more data columns to store the source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under the Mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). If you choose **Binary** as your file format, mapping won't be supported.

### Settings

For **Settings** tab configuration, see [Configure your other settings under the Settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following table contains more information about the copy activity in Oracle Cloud Storage.

### Source information

|**Name** |**Description** |**Value**|**Required** |**JSON script property** |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your Oracle Cloud Storage connection> |Yes|connection|
| **File path type** | The file path type used to get source data. | • **File path**<br>• **Prefix**<br>• **Wildcard file path**<br>• **List of files**| Yes |/ |
|*For **File path*** |||||
| **Bucket** | The Oracle Cloud Storage bucket name. | \<your bucket name> |Yes|bucketName|
| **Directory** |The path to the folder under the specified bucket. | \<your folder name> |No|folderpath|
| **File name** |The file name under the specified bucket and folder path. | \<your file name> |No|fileName|
|*For **Prefix*** |||||
| **Bucket** | The Oracle Cloud Storage bucket name. | \<your bucket name> |Yes|bucketName|
| **Prefix** | The prefix for the Oracle Cloud Storage key name under the specified bucket to filter source Oracle Cloud Storage files. | \<your prefix> |No|prefix|
|*For **Wildcard file path*** |||||
| **Bucket** | The Oracle Cloud Storage bucket name. | \<your bucket name> |Yes|bucketName|
| **Wildcard folder path** | The folder path with wildcard characters under the specified bucket to filter source folders. | \<your folder path with wildcard characters> |No|wildcardFolderPath |
| **Wildcard file name** | The file name with wildcard characters under the specified bucket and folder path (or wildcard folder path) to filter source files. | \<your file name with wildcard characters> |Yes|wildcardFileName |
|*For **List of files*** |||||
| **Bucket** | The Oracle Cloud Storage bucket name. | \<your bucket name> |Yes|bucketName|
| **Directory** |The path to the folder under the specified bucket. | \<your folder name> |No|folderpath|
| **Path to file list** | Indicates to copy a specified file set. Point to a text file that includes a list of files you want to copy, one file per line. | < file list path > | No | fileListPath |
||||||
| **File format** | The file format for your source data. For information on different file formats, refer to articles in [Supported format](#supported-format).  | / | Yes | / |
|**Recursively** |Indicates whether the data is read recursively from the subfolders or only from the specified folder. When this checkbox is selected, and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination.| selected (default) or unselect |No |recursive|
| **Filter by last modified** | The files with the last modified time in the range [**Start time**, **End time**) are filtered for further processing. The time is applied to the UTC time zone in the format of `yyyy-mm-ddThh:mm:ss.fffZ`. These properties can be skipped, which means no file attribute filter is applied. This property doesn't apply when you configure your file path type as **List of files**.| datetime | No | modifiedDatetimeStart<br>modifiedDatetimeEnd |
| **Enable partitions discovery** | Indicates whether to parse the partitions from the file path and add them as other source columns. | selected or unselected (default) | No | enablePartitionDiscovery:<br>true or false (default) |
| **Partitions root path** | When partition discovery is enabled, specify the absolute root path to read partitioned folders as data columns. | < your partition root path > | No | partitionRootPath |
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\>|No |maxConcurrentConnections|
| **Additional columns** | Add other data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [Oracle Cloud Storage connector overview](connector-oracle-cloud-storage-overview.md)
