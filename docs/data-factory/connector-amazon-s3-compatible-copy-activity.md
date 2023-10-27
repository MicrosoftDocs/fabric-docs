---
title: Configure in a data pipeline copy activity
description: This article explains how to copy data using Amazon S3 Compatible.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 10/27/2023
ms.custom: template-how-to, build-2023
---

# How to configure Amazon S3 Compatible in copy activity

This article outlines how to use the copy activity in a data pipeline to copy data from and to Amazon S3 Compatible.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Required permissions

To copy data from Amazon S3 Compatible, make sure you've been granted the following permissions for Amazon S3 Compatible object operations: `s3:GetObject` and `s3:GetObjectVersion`.

In addition, `s3:ListAllMyBuckets` and `s3:ListBucket`/`s3:GetBucketLocation` permissions are required for operations like testing connection and browsing from root.

For the full list of Amazon S3 Compatible permissions, go to [Specifying Permissions in a Policy on the AWS site](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-with-s3-actions.html).

## Supported format

Amazon S3 Compatible supports the following file formats. Refer to each article for format-based settings.

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
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for Amazon S3 Compatible under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-amazon-s3-compatible/source.png" alt-text="Screenshot showing source tab and the list of properties." lightbox="./media/connector-amazon-s3/source.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an **Amazon S3 Compatible** connection from the connection list. If no connection exists, then create a new Amazon S3 Compatible connection by selecting **New**.
- **Connection type**: Select **Amazon S3 Compatible** for your connection type.
- **File path type**: You can choose **File path**, **Prefix**, **Wildcard file path**, or **List of files** as your file path type. The configuration of each of these settings is:

  - **File path**: If you choose this type, the data can be copied from the given container or folder/file path specified previously.

  - **Prefix**: Prefix for the S3 key name under the given bucket configured to filter source S3 files. S3 keys whose names start with `bucket/this_prefix` are selected. It utilizes S3's service-side filter, which provides better performance than a wildcard filter.

      :::image type="content" source="./media/connector-amazon-s3-compatible/prefix.png" alt-text="Screenshot showing prefix." lightbox="./media/connector-amazon-s3/prefix.png":::

  - **Wildcard file path**: Specify the folder or file path with wildcard characters under your given blob container to filter your source folders or files.

    Allowed wildcards are: `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder name has wildcard or this escape character inside.

    - Wildcard folder path: The folder path with wildcard characters under the given bucket configured to filter source folders.

      :::image type="content" source="./media/connector-amazon-s3-compatible/wildcard-folder-path.png" alt-text="Screenshot showing wildcard file path." lightbox="./media/connector-amazon-s3/wildcard-folder-path.png":::

    - Wildcard file name: The file name with wildcard characters under the given bucket and folder path (or wildcard folder path) to filter source files.

  - **List of files**: Indicates to copy a given file set. Point to a text file that includes a list of files you want to copy, one file per line, which is the relative path to the path configured.

      :::image type="content" source="./media/connector-amazon-s3-compatible/path-to-file-list.png" alt-text="Screenshot showing list of files." lightbox="./media/connector-amazon-s3/path-to-file-list.png":::

- **File path**: Select **Browse** to choose the file that you want to copy, or fill in the path manually.
- **Recursively**: Indicates whether the data is read recursively from the subfolders or only from the specified folder. Note that when **recursive** is set to **true** and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination. Allowed values are **true** (default) and **false**. This property doesn't apply when you configure `fileListPath`.

Under **Advanced**, you can specify the following fields:

- **Filter by last modified**: Files are filtered based on the last modified dates that you specified. This property doesn't apply when you configure your file path type as **List of files**.
  - **Start time (UTC)**: The files are selected if their last modified time is greater than or equal to the configured time.
  - **End time (UTC)**: The files are selected if their last modified time is less than the configured time.

  When **Start time (UTC)** has datetime value but **End time (UTC)** is NULL, it means the files whose last modified attribute is greater than or equal with the datetime value will be selected. When **End time (UTC)** has datetime value but **Start time (UTC)** is NULL, it means the files whose last modified attribute is less than the datetime value will be selected. The properties can be NULL, which means no file attribute filter will be applied to the data.

- **Enable partition discovery**: Specify whether to parse the partitions from the file path and add them as additional source columns. It is unselected by default and not supported when you use binary file format.

  - **Partition root path**: When partition discovery is enabled, specify the absolute root path in order to read partitioned folders as data columns.<br>
     If it is not specified, by default,
    - When you use file path or list of files on source, partition root path is the path that you configured.
    - When you use wildcard folder filter, partition root path is the sub-path before the first wildcard.

    For example, assuming you configure the path as `root/folder/year=2020/month=08/day=27`:

    - If you specify partition root path as `root/folder/year=2020`, copy activity will generate two more columns month and day with value "08" and "27" respectively, in addition to the columns inside the files.
    - If partition root path is not specified, no extra column will be generated.

    :::image type="content" source="./media/connector-amazon-s3-compatible/enable-partition-discovery.png" alt-text="Screenshot showing Enable partition discovery.":::

- **Max concurrent connection**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). If you choose Binary as your file format, mapping will not be supported.

### Settings

For the **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Amazon S3 Compatible.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**Connection type**|Select a type for your connection.|Yes|Yes|✓|
|**File path type** |The file path type that you want to use.|• File path <br>• Prefix<br>• Wildcard folder path<br>•List of files|No |<br>• prefix<br>• wildcardFolderPath, wildcardFileName<br>• path to file list|
|**File path** | The file path of your source data.|\<file path of your source >|Yes |container <br> fileName|
|**Recursively** |Indicates whether the data is read recursively from the subfolders or only from the specified folder. Note that when **recursive** is set to **true** and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination. This property doesn't apply when you configure `fileListPath`.| Selected (default) or unselect |No |recursive|
| **Filter by last modified** | The files with last modified time in the range [Start time, End time) will be filtered for further processing. The time will be applied to UTC time zone in the format of `yyyy-mm-ddThh:mm:ss.fffZ`. These properties can be skipped which means no file attribute filter will be applied. This property doesn't apply when you configure your file path type as List of files.| datetime | No | modifiedDatetimeStart<br>modifiedDatetimeEnd |
| **Enable partition discovery** | Indicates whether to parse the partitions from the file path and add them as additional source columns. | selected or unselected (default) | No | enablePartitionDiscovery:<br>true or false (default) | 
|**Max concurrent connection** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\>|No |maxConcurrentConnections|
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |
