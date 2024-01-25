---
title: Configure Google Cloud Storage in a copy activity
description: This article explains how to copy data using Google Cloud Storage in Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 01/24/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Google Cloud Storage in a copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to Google Cloud Storage.

## Prerequisites

The following setup is required on your Google Cloud Storage account:

1. Enable interoperability for your Google Cloud Storage account.
2. Set the default project that contains the data you want to copy from the target Google Cloud Storage bucket.
3. Create a service account and define the right levels of permissions by using Cloud IAM on GCP.
4. Generate the access keys for this service account.

   :::image type="content" source="media/connector-google-cloud/google-storage-cloud-settings.png" alt-text="Screenshot showing the access key for Google Cloud Storage.":::

## Required permissions

To copy data from Google Cloud Storage, make sure you've been granted the following permissions for object operations: `storage.objects.get` and `storage.objects.list`.

In addition, `storage.buckets.list` permission is required for operations like testing connection and browsing from root.

For the full list of Google Cloud Storage roles and associated permissions, go to [IAM roles for Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-roles) on the Google Cloud site.

## Supported format

Google Cloud Storage supports the following file formats. Refer to each article for format-based settings.

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

The following properties are supported for Google Cloud Storage under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-google-cloud/source.png" alt-text="Screenshot showing source tab and the list of properties.":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select a **Google Cloud Storage** connection from the connection list. If no connection exists, then create a new Google Cloud Storage connection by selecting **New**.
- **File path type**: You can choose **File path**, **Prefix**, **Wildcard file path**, or **List of files** as your file path type. The configuration of each of these settings is：

    - **File path**: If you choose this type, the data can be copied from the given bucket or folder/file path specified in **File path**.

    - **Prefix**: If you choose this type, specify the **Bucket** and **Prefix**.
        - **Bucket**: Specify the Google Cloud Storage bucket name. It is required.
        - **Prefix**: Prefix for the Google Cloud Storage key name under the specified bucket to filter source Google Cloud Storage files. Google Cloud Storage keys whose names start with `given_bucket/this_prefix` are selected. It utilizes Google Cloud Storage's service-side filter, which provides better performance than a wildcard filter.
    
            :::image type="content" source="./media/connector-google-cloud/prefix.png" alt-text="Screenshot showing prefix.":::
    
    - **Wildcard file path**: If you choose this type, specify the **Bucket** and **Wildcard paths**.
        - **Bucket**: Specify the Google Cloud Storage bucket name. It is required.
        - **Wildcard paths**: Specify the folder or file path with wildcard characters under your given bucket to filter your source folders or files.
    
          Allowed wildcards are: `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder name has wildcard or this escape character inside. For more examples, go to [Folder and file filter examples](/azure/data-factory/connector-google-cloud-storage?tabs=data-factory#folder-and-file-filter-examples).

          :::image type="content" source="./media/connector-google-cloud/wildcard-paths.png" alt-text="Screenshot showing wildcard file path.":::

            - *Wildcard folder path*: Specify the folder path with wildcard characters under the given bucket to filter source folders.
    
            - *Wildcard file name*: Specify the file name with wildcard characters under the given bucket and folder path (or wildcard folder path) to filter source files.

    - **List of files**: If you choose this type, specify the **Folder path** and **Path to file list** to indicates to copy a given file set. Point to a text file that includes a list of files you want to copy, one file per line, which is the relative path to the path configured. For more examples, go to [File list examples](/azure/data-factory/connector-azure-blob-storage?tabs=data-factory#file-list-examples).

       :::image type="content" source="./media/connector-google-cloud/list-of-files.png" alt-text="Screenshot showing list of files.":::

        - **Folder path**: Specify the path to the folder under given bucket. It is required.
        - **Path to file list**: Specify the path of the text file that includes a list of files you want to copy.

- **Recursively**: Indicates whether the data is read recursively from the subfolders or only from the specified folder. Note that when this checkbox is selected, and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination.
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

    :::image type="content" source="./media/connector-google-cloud/enable-partition-discovery.png" alt-text="Screenshot showing Enable partition discovery.":::

- **Max concurrent connection**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Destination

The following properties are supported for Google Cloud Storage under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-google-cloud/destination.png" alt-text="Screenshot showing destination tab and the list of properties.":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an Google Cloud Storage connection from the connection list. If no connection exists, then create a new Google Cloud Storage connection by selecting **New**.
- **File path**: The data can be copied to the given bucket or the given bucket and folder path specified.
- **File format**: Select the file format applied from the drop-down list. Select **Settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **Copy behavior**: Defines the copy behavior when the source is files from a file-based data store. You can choose a behavior from the drop-down list.

  - **Flatten hierarchy**: All files from the source folder are in the first level of the destination folder. The destination files have autogenerated names.
  - **Merge files**: Merges all files from the source folder to one file. If the file name is specified, the merged file name is the specified name. Otherwise, it's an auto-generated file name.
  - **Preserve hierarchy**: Preserves the file hierarchy in the target folder. The relative path of source file to source folder is identical to the relative path of target file to target folder.

- **Max concurrent connections**: This property indicates the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). If you choose Binary as your file format, mapping will not be supported.

### Settings

For the **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Google Cloud Storage.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your Google Cloud Storage connection> |Yes|connection|
| **File path type** | The file path type used to get source data. | • **File path**<br>• **Prefix**<br>• **Wildcard file path**<br>• **List of files**| Yes |/ |
|*For **File path*** |||||
| **Bucket** | The Google Cloud Storage bucket name. | \<your bucket name> |Yes|bucketName|
| **Directory** |The path to the folder under the specified bucket. | \<your folder name> |No|folderpath|
| **File name** |The file name under the specified bucket and folder path. | \<your file name> |No|fileName|
|*For **Prefix*** |||||
| **Bucket** | The Google Cloud Storage bucket name. | \<your bucket name> |Yes|bucketName|
| **Prefix** | The prefix for the Google Cloud Storage key name under the given bucket to filter source Google Cloud Storage files. | \<your prefix> |No|prefix|
|*For **Wildcard file path*** |||||
| **Bucket** | The Google Cloud Storage bucket name. | \<your bucket name> |Yes|bucketName|
| **Wildcard Folder Path** | The folder path with wildcard characters under the specified bucket to filter source folders. | \<your folder path with wildcard characters> |No|wildcardFolderPath |
| **Wildcard Filename** | The file name with wildcard characters under the specified bucket and folder path (or wildcard folder path) to filter source files. | \<your file name with wildcard characters> |Yes|wildcardFileName |
|*For **List of files*** |||||
| **Bucket** | The Google Cloud Storage bucket name. | \<your bucket name> |Yes|bucketName|
| **Directory** |The path to the folder under the specified bucket. | \<your folder name> |No|folderpath|
| **Path to file list** | Indicates to copy a given file set. Point to a text file that includes a list of files you want to copy, one file per line. | < file list path > | No | fileListPath |
||||||
| **File format** | The file format for your source data. For the information of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.  | / | Yes | / |
|**Recursively** |Indicates whether the data is read recursively from the subfolders or only from the specified folder. Note that when this checkbox is selected, and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination.| Selected or unselect |No |recursive|
| **Filter by last modified** | The files with last modified time in the range [Start time, End time) will be filtered for further processing. The time will be applied to UTC time zone in the format of `yyyy-mm-ddThh:mm:ss.fffZ`. These properties can be skipped which means no file attribute filter will be applied. This property doesn't apply when you configure your file path type as List of files.| datetime | No | modifiedDatetimeStart<br>modifiedDatetimeEnd |
| **Enable partition discovery** | Indicates whether to parse the partitions from the file path and add them as additional source columns. | selected or unselected (default) | No | enablePartitionDiscovery:<br>true or false (default) |
| **Partition root path** | When partition discovery is enabled, specify the absolute root path in order to read partitioned folders as data columns. | < your partition root path > | No | partitionRootPath |
|**Max concurrent connection** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\>|No |maxConcurrentConnections|

### Destination information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **Data store type** |Your data store type.| **External**|Yes|/|
| **Connection** |Your connection to the destination data store.|\<your Google Cloud Storage connection> |Yes|connection|
| **File path** | The folder/file path to the destination file. | < folder/file path> | Yes |/ |
| **Bucket** | The Google Cloud Storage bucket name. | \<your bucket name> |Yes|bucketName|
| **Directory** |The path to the folder under the specified bucket. | \<your folder name> |No|folderpath|
| **File name** |The file name under the specified bucket and folder path. | \<your file name> |No|fileName|
|**Copy behavior** |Defines the copy behavior when the source is files from a file-based data store.|• Flatten hierarchy<br>• Merge files<br>• Preserve hierarchy<br>|No |copyBehavior:<br>• FlattenHierarchy<br>• MergeFiles<br>• PreserveHierarchy|
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\>|No |maxConcurrentConnections|

## Next steps

- [Set up your Google Cloud Storage connection](connector-google-cloud-storage.md)
