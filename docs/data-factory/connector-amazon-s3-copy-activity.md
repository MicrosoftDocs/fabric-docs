---
title: Configure Amazon S3 in a copy activity
description: This article explains how to copy data using Amazon S3.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/24/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Amazon S3 in a copy activity

This article outlines how to use the copy activity in a data pipeline to copy data from and to Amazon S3.

## Required permissions

To copy data from Amazon S3, make sure you've been granted the following permissions for Amazon S3 object operations: `s3:GetObject` and `s3:GetObjectVersion`.

In addition, `s3:ListAllMyBuckets` and `s3:ListBucket`/`s3:GetBucketLocation` permissions are required for operations like testing connection and browsing from root.

For the full list of Amazon S3 permissions, go to [Specifying Permissions in a Policy on the AWS site](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-with-s3-actions.html).

## Supported format

Amazon S3 supports the following file formats. Refer to each article for format-based settings.

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

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for Amazon S3 under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-amazon-s3/source.png" alt-text="Screenshot showing source tab and the list of properties." lightbox="./media/connector-amazon-s3/source.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an Amazon S3 connection from the connection list. If no connection exists, then create a new Amazon connection by selecting **New**.
- **Connection type**: Select **Amazon S3** for your connection type.
- **File path type**: You can choose **File path**, **Prefix**, **Wildcard file path**, or **List of files** as your file path type. The configuration for each setting is:

  - **File path**: If you choose this type, the data can be copied from the given bucket or the given bucket and folder path specified.

  - **Prefix**: If you choose this type, specify the **Bucket** and **Prefix**.
    - **Bucket**: Specify the S3 bucket name. It is required.
    - **Prefix**: Specify the configured prefix for the S3 key name under the given bucket to filter source S3 files. S3 keys whose names start with `bucket/this_prefix` are selected. It utilizes S3's service-side filter, which provides better performance than a wildcard filter.
  
      When you use prefix and choose to copy to file-based destination with preserving hierarchy, note the sub-path after the last "/" in prefix will be preserved. For example, you have source `bucket/folder/subfolder/file.txt`, and configure prefix as `folder/sub`, then the preserved file path is `subfolder/file.txt`.

    :::image type="content" source="./media/connector-amazon-s3/prefix.png" alt-text="Screenshot showing prefix.":::

  - **Wildcard file path**: If you choose this type, specify the **Bucket** and **Wildcard paths**.
    - **Bucket**: Specify the S3 bucket name. It is required.
    - **Wildcard paths**: Specify the folder or file path with wildcard characters under your given bucket to filter your source folders or files.

        Allowed wildcards are: `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder name has wildcard or this escape character inside. See more examples in [Folder and file filter examples](/azure/data-factory/connector-amazon-simple-storage-service#folder-and-file-filter-examples).
    :::image type="content" source="./media/connector-amazon-s3/wildcard-folder-path.png" alt-text="Screenshot showing wildcard file path.":::
      *Wildcard folder path*: The folder path with wildcard characters under the given bucket to filter source folders.

      *Wildcard file name*: The file name with wildcard characters under the given bucket and folder path (or wildcard folder path) to filter source files.

  - **List of files**: If you choose this type, specify the **Folder path** and **Path to file list** to indicates to copy a given file set. Point to a text file that includes a list of files you want to copy, one file per line, which is the relative path to the path configured. For more examples, go to [File list examples](/azure/data-factory/connector-amazon-simple-storage-service#file-list-examples).

      :::image type="content" source="./media/connector-amazon-s3/path-to-file-list.png" alt-text="Screenshot showing list of files.":::
    - **Folder path**: Specify the path to the folder under given bucket. It is required.
    - **Path to file list**: Specify the path of the text file that includes a list of files you want to copy.

- **Recursively**: Specify whether the data is read recursively from the subfolders or only from the specified folder. When **Recursively** is selected and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination. This property is selected by default and doesn't apply when you configure **Path to file list**.

- **File format**: Select the file format applied from the drop-down list. Select **Settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **Filter by last modified**: Files are filtered based on the last modified dates that you specified. This property doesn't apply when you configure your file path type as **List of files**.
  - **Start time (UTC)**: The files are selected if their last modified time is greater than or equal to the configured time.
  - **End time (UTC)**: The files are selected if their last modified time is less than the configured time.

  When **Start time (UTC)** has datetime value but **End time (UTC)** is NULL, it means the files whose last modified attribute is greater than or equal with the datetime value will be selected. When **End time (UTC)** has datetime value but **Start time (UTC)** is NULL, it means the files whose last modified attribute is less than the datetime value will be selected. The properties can be NULL, which means no file attribute filter will be applied to the data.

- **Enable partition discovery**: Specify whether to parse the partitions from the file path and add them as additional source columns. It is unselected by default and not supported when you use binary file format.

  - **Partition root path**: When partition discovery is enabled, specify the absolute root path in order to read partitioned folders as data columns.

    If it is not specified, by default,
    - When you use file path or list of files on source, partition root path is the path that you configured.
    - When you use wildcard folder filter, partition root path is the sub-path before the first wildcard.
    - When you use prefix, partition root path is sub-path before the last "/".

    For example, assuming you configure the path as `root/folder/year=2020/month=08/day=27`:

    - If you specify partition root path as `root/folder/year=2020`, copy activity will generate two more columns month and day with value "08" and "27" respectively, in addition to the columns inside the files.
    - If partition root path is not specified, no extra column will be generated.

    :::image type="content" source="./media/connector-amazon-s3/enable-partition-discovery.png" alt-text="Screenshot showing Enable partition discovery.":::

- **Max concurrent connection**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). If you choose Binary as your file format, mapping will not be supported.

### Settings

For the **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Amazon S3.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **Data store type** |Your data store type.| **External**|Yes|/|
| **Connection** |Your connection to the source data store.|\<your Amazon S3 connection> |Yes|connection|
| **Connection type** |Select a type for your connection.|**Amazon S3**|Yes|/|
| **File path type** | The file path type used to get source data. | • **File path**<br>• **Prefix**<br>• **Wildcard file path**<br>• **List of files**| Yes |• folderPath，fileName<br>• prefix<br>• wildcardFolderPath, wildcardFileName<br>• fileListPath |
| **File path** | The folder/file path to the source file. | < file path> | Yes for **File path**| bucketName<br>fileName<br>folderpath |
| **Bucket** | The S3 bucket name. | \<your bucket name> |Yes|bucketName|
| **Prefix** | The configured prefix for the S3 key name under the given bucket to filter source S3 files. | \<your prefix> |No|prefix|
| **Wildcard paths** | The folder/file path with wildcard characters under the configured bucket to filter source folders/files. | < your wildcard file path > | Yes for **Wildcard file name** | wildcardFolderPath<br>wildcardFileName |
| **Path to file list** | Indicates to copy a given file set. Point to a text file that includes a list of files you want to copy, one file per line. | < file list path > | No | fileListPath |
| **File format** | The file format for your source data. For the information of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.  | / | Yes | / |
| **Recursively** |Indicates whether the data is read recursively from the subfolders or only from the specified folder. Note that when **Recursively** is selected and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination. This property doesn't apply when you configure **Path to file list**.| selected (default) or unselect |No |recursive|
| **Filter by last modified** | The files with last modified time in the range [Start time, End time) will be filtered for further processing. The time will be applied to UTC time zone in the format of `yyyy-mm-ddThh:mm:ss.fffZ`. These properties can be skipped which means no file attribute filter will be applied. This property doesn't apply when you configure your file path type as List of files.| datetime | No | modifiedDatetimeStart<br>modifiedDatetimeEnd |
| **Enable partition discovery** | Indicates whether to parse the partitions from the file path and add them as additional source columns. | selected or unselected (default) | No | enablePartitionDiscovery:<br>true or false (default) |
|**Max concurrent connection** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections>|No |maxConcurrentConnections|
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [Set up your Amazon S3 connection](connector-amazon-s3.md)
