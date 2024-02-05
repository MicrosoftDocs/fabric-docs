---
title: Configure Google Cloud Storage in a copy activity
description: This article explains how to copy data using Google Cloud Storage in Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
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
2. Set the default project that contains the data you want to copy from the target GCS bucket.
3. Create a service account and define the right levels of permissions by using Cloud IAM on GCP.
4. Generate the access keys for this service account.

   :::image type="content" source="media/connector-google-cloud/google-storage-cloud-settings.png" alt-text="Screenshot showing the access key for Google Cloud Storage." lightbox="media/connector-google-cloud/google-storage-cloud-settings.png":::

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

:::image type="content" source="./media/connector-google-cloud/source.png" alt-text="Screenshot showing source tab and the list of properties." lightbox="./media/connector-google-cloud/source.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select a **Google Cloud Storage** connection from the connection list. If no connection exists, then create a new Google Cloud Storage connection by selecting **New**.
- **File path**: Select **Browse** to choose the file that you want to copy, or fill in the path manually.
- **File settings**: Select **File settings** to configure the file format. For settings of different file formats, refer to [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **File path type**: You can choose **File path**, **Prefix**, **Wildcard file path**, or **List of files** as your file path type. The configuration of each of these settings is：

    - **File path**: If you choose this type, the data can be copied from the given bucket or folder/file path specified in **File path**.

    - **Prefix**: Prefix for the GCS key name under the given bucket configured to filter source GCS files. GCS keys whose names start with `given_bucket/this_prefix` are selected. It utilizes GCS's service-side filter, which provides better performance than a wildcard filter.

       :::image type="content" source="./media/connector-google-cloud/prefix.png" alt-text="Screenshot showing prefix." lightbox="./media/connector-google-cloud/prefix.png":::

    - **Wildcard file path**: Specify the folder or file path with wildcard characters under your given bucket to filter your source folders or files.

      Allowed wildcards are: `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder name has wildcard or this escape character inside. For more examples, go to [Folder and file filter examples](/azure/data-factory/connector-google-cloud-storage?tabs=data-factory#folder-and-file-filter-examples).

        - Wildcard folder path: Specify the folder path with wildcard characters under the given bucket to filter source folders.

           :::image type="content" source="./media/connector-google-cloud/wildcard-folder-path.png" alt-text="Screenshot showing wildcard file path." lightbox="./media/connector-google-cloud/wildcard-folder-path.png":::

        - Wildcard file name: Specify the file name with wildcard characters under the given bucket and folder path (or wildcard folder path) to filter source files.

    - **List of files**: Indicates to copy a given file set. Point to a text file that includes a list of files you want to copy, one file per line, which is the relative path to the path configured in **File path**.

       When you're using this option, don't specify a file name. For more examples, go to [File list examples](/azure/data-factory/connector-azure-blob-storage?tabs=data-factory#file-list-examples).

       :::image type="content" source="./media/connector-google-cloud/path-to-file-list.png" alt-text="Screenshot showing list of files." lightbox="./media/connector-google-cloud/path-to-file-list.png":::

- **Recursively**: Indicates whether the data is read recursively from the subfolders or only from the specified folder. Note that when this checkbox is selected, and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination.

- **Delete files after completion**：Indicates whether the binary files are deleted from the source store after successfully moving to the destination store. The file deletion is per file, so when a copy activity fails, you'll note that some files have already been copied to the destination and deleted from the source, while others are still remaining on source store.
This property is only valid in the binary files copy scenario.

- **Max concurrent connection**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

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
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**File path** | If you choose this type, the data can be copied from the given bucket or folder/file path specified in **File path**.|Yes |container <br> fileName|
|**File path type** |The file path type that you want to use.|• File path <br>• Prefix<br>• Wildcard folder path<br>•List of files|No |<br>• prefix<br>• wildcardFolderPath, wildcardFileName<br>• path to file list|
|**Recursively** |Indicates whether the data is read recursively from the subfolders or only from the specified folder. Note that when this checkbox is selected, and the destination is a file-based store, an empty folder or subfolder isn't copied or created at the destination.| Selected or unselect |No |recursive|
|**Delete files after completion** |Indicates whether the binary files will be deleted from the source store after successfully moving to the destination store. The file deletion is per file, so when copy activity fails, you'll note some files have already been copied to the destination and deleted from the source, while others are still remaining on the source store. This property is only valid in binary files copy scenario.|Selected or unselect|No |deleteFilesAfterCompletion|
|**Max concurrent connection** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\>|No |maxConcurrentConnections|

## Related content

- [Set up your Google Cloud Storage connection](connector-google-cloud-storage.md)
