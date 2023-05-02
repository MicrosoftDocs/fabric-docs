---
title: How to configure Lakehouse in copy activity
description: This article explains how to copy data using Lakehouse.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# How to configure Lakehouse in copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to Trident Lakehouse.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning)]

## Supported format

Trident Lakehouse supports the following file formats. Refer to each article for format-based settings.

- Avro format
- [Binary format](format-binary.md)
- [Delimited text format](format-delimited-text.md)
- [Excel format](format-excel.md)
- JSON format
- ORC format
- Parquet format
- XML format

## Supported configuration

For the configuration of each tab under copy activity, see the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Settings](#settings)

### General

For **General** tab configuration, go to General.

### Source

The following properties are supported for Lakehouse under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-lakehouse/source.png" alt-text="Screenshot showing source tab and the list of properties.":::

The following properties are **required**:

- **Data store type**: Select **Workspace**.
- **Workspace data store type**: Select **Lakehouse** from the data store type list.
- **Lakehouse**: Select an existing Lakehouse from the workspace. If not exist, then create a new Lakehouse by clicking on **New**.
- **Root folder**: Select **Tables** or **Files** which indicates the virtual view of the managed or unmanaged area in your lake. For more information, refer to [Lakehouse introduction](/trident-docs-private-preview/synapse-data-engineering/concepts-lakehouse?branch=main).
    - If select **Tables**,
        - (placeholder, not supported yet)
    - If select **Files**:
        - **File path**: Select **Browse** to choose the file that you want to copy or fill in the path manually.
        - **File settings**: Click on **File settings** to configure the file format, etc.
            - **Filter by last modified**: Files are filtered based on the last modified dates. This property doesn’t apply when you configure your file path type as **List of files**.
                - **Start time**: The files will be selected if their last modified time is greater than or equal to the configured time.
                - **End time**: The files will be selected if their last modified time is less than the configured time.

Under **Advanced**, you can specify the following fields:

- **File path type**: You can choose ‘File path’, ‘Wildcard file path’ or ‘List of files’ as your file path type. See the configuration of each setting below：

    :::image type="content" source="./media/connector-lakehouse/file-path.png" alt-text="Screenshot showing file path.":::

    - **File path**: If you choose this type, the data can be copied from the given container or folder/file path specified previously.
        - **Wildcard file path**: Specify the folder or file path with wildcard characters under your given Lakehouse unmanaged area (under Files) to filter your source folders or files. Allowed wildcards are: `*` (matches zero or more characters) and `?` (matches zero or single character). Use `^` to escape if your folder or file name has wildcard or this escape character inside.
            - **Wildcard folder path**: The path to the folder under the given container. If you want to use a wildcard to filter the folder, skip this setting and specify that in activity source settings.
            - **Wildcard file name**: The file name under the given Lakehouse unmanaged area (under Files) and folder path.

                :::image type="content" source="./media/connector-lakehouse/wildcard-paths.png" alt-text="Screenshot showing wildcard file path.":::

    - **List of files**: Indicates to copy a given file set.
        - **Path to file list**: Point to a text file that includes a list of files you want to copy, one file per line, which is the relative path to the file path configured.

        :::image type="content" source="./media/connector-lakehouse/list-of-files.png" alt-text="Screenshot showing path to file list.":::

- **Recursively**:  Indicates whether the data is read recursively from the subfolders or only from the specified folder. If enabled, all files in the input folder and its subfolders will be processed recursively.
- **Enable partition discovery**: For files that are partitioned, specify whether to parse the partitions from the file path and add them as additional source columns.
    - **Partition root path**: When partition discovery is enabled, specify the absolute root path in order to read partitioned folders as data columns.
    - **Max concurrent connections**: Indicates the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.
    `Below properties apply only when a certain format is configured:`
- When File format is **Binary**:
    - **Delete files after completion**: This property is only valid in binary files copy scenario. Indicates whether the binary files will be deleted from source store after successfully moving to the destination store. The file deletion is per file, so when copy activity fails, you will see some files have already been copied to the destination and deleted from source, while others are still remaining on source store.
-  When File format is **Delimited Text**:
    - **Skip line count**: Indicates the number of non-empty rows to skip when reading data from input files.

## Destination

The following properties are supported for Lakehouse under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-lakehouse/destination.png" alt-text="Screenshot showing destination tab.":::

The following properties are **required**:

- **Data store type**: Select **Workspace**.
- **Workspace data store type**: Select **Lakehouse** from the data store type list.
- **Lakehouse**: Select an existing Lakehouse from the workspace. If not exist, then create a new Lakehouse by clicking on **New**.
- **Root folder**: Select **Tables** or **Files** which indicates the virtual view of the managed or unmanaged area in your lake. For more information, refer to [Lakehouse introduction](/trident-docs-private-preview/synapse-data-engineering/concepts-lakehouse?branch=main).
    - If select **Tables**, specify the **Table name**.
    
    :::image type="content" source="./media/connector-lakehouse/table-name.png" alt-text="Screenshot showing table name.":::

    - If select **Files**:
        - **File path**: Select **Browse** to choose the file that you want to copy or fill in the path manually.

    :::image type="content" source="./media/connector-lakehouse/files-path.png" alt-text="Screenshot showing file path in destination.":::

Under **Advanced**, you can specify the following fields:
- **Copy behavior**:  Defines the copy behavior when the source is files from a file-based data store. You can choose Add Dynamic content, none, Flatten hierarchy or Preserve hierarchy as your copy behavior. See the configuration of each setting below：
    - **Add dynamic content**: To specify an expression for a property value, select Add dynamic content. This opens the expression builder where you can build expressions from supported system variables, activity output, functions, and user-specified variables or parameters. For information about the expression language, go to [Expressions and functions](/azure/data-factory/control-flow-expression-language-functions).
    - **None**: (placeholder)
    - **Flatten hierarchy**: All files from the source folder are in the first level of the destination folder. The destination files have autogenerated names.
    - **Preserve hierarchy**: Preserves the file hierarchy in the target folder. The relative path of source file to source folder is identical to the relative path of target file to target folder.

    :::image type="content" source="./media/connector-lakehouse/copy-behavior.png" alt-text="Screenshot showing copy behavior.":::

- **Max concurrent connections**:  The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.
- **Block size (MB)**: Specify the block size, in megabytes, used to write data to block Lakehouse. The allowed value is between 4 MB and 100 MB.
- **Metadata**:  Set custom metadata when copy to destination data store. Each object under the `metadata` array represents an extra column. The `name` defines the metadata key name, and the `value` indicates the data value of that key. If [preserve attributes feature](/azure/data-factory/copy-activity-preserve-metadata#preserve-metadata) is used, the specified metadata will union/overwrite with the source file metadata. The allowed data values are:
    - `$$LASTMODIFIED`: a reserved variable indicates to store the source files' last modified time. Apply to file-based source with binary format only.
    - Expression
    - Static value

    :::image type="content" source="./media/connector-lakehouse/metadata.png" alt-text="Screenshot showing metadata.":::

- **Max rows per file**: Specify the max rows per file when writing data into Lakehouse.
- **File name prefix**: Specify the file name prefix when writing data to multiple files, resulted in this pattern: `<fileNamePrefix>`_00000.`<fileExtension>`. If not specified, prefix will be auto generated. Not applicable when source is file-based store or source has partition option enabled.

### Settings

For **Settings** tab configuration, see Settings

## Table summary

To learn more information about copy activity in Lakehouse, see the following table.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**Workspace**|Yes|/|
|**Workspace data store type** |Select **Lakehouse** from the data store type list.|**Lakehouse**|Yes|/|
|**Lakehouse** | Select an existing Lakehouse from the workspace. If not exist, then create a new Lakehouse by clicking on **New**.|\<your Lakehouse>|Yes |/|
|**Root folder** |Select **Tables** or **Files** which indicates the virtual view of the managed or unmanaged area in your lake. For more information, refer to [Lakehouse introduction](/trident-docs-private-preview/synapse-data-engineering/concepts-lakehouse?branch=main).| •**Tables**<br>  •**Files** |No|rootFolder|
|**Table name** |Specify your table name.|\<your table name> |Yes when you select **Tables** in **Root folder** | folderPath|
|**File path** |Select **Browse** to choose the file that you want to copy or fill in the path manually.|\<file path> |No | •folderPath<br>•fileName|
|**File path type** |You can choose **File path**, **Wildcard file path** or **List of files** as your file path type. | •**File path**<br> •**Wildcard file path**<br> •**List of files** |No |**Wildcard file path**<br>•wildcardFolderPath<br>•wildcardFileName<br>**List of files**<br>•fileListPath |
|**Recursively** |Indicates whether the data is read recursively from the subfolders or only from the specified folder. If enabled, all files in the input folder and its subfolders will be processed recursively.| select or unselect |No | recursive<br>true or false|
|**Delete files after completion** |The files on source data store will be deleted right after being moved to the destination store. The file deletion is per file, so when copy activity fails, you will see some files have already been copied to the destination and deleted from source while others are still on source store.| select or unselect|No|enablePartitionDiscovery<br>true or false|
|**Max concurrent connections**|The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.| < upper limit of concurrent connections ><br>(integer)|No |maxConcurrentConnections|

### Destination information

|Name |Description |Value |Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**Workspace**|Yes|/|
|**Workspace data store type** |Select **Lakehouse** from the data store type list.|**Lakehouse**|Yes|/|
|**Lakehouse** | Select an existing Lakehouse from the workspace. If not exist, then create a new Lakehouse by clicking on **New**.|\<your Lakehouse>|Yes |/|
|**Root folder** |Select **Tables** or **Files** which indicates the virtual view of the managed or unmanaged area in your lake. For more information, refer to [Lakehouse introduction](/trident-docs-private-preview/synapse-data-engineering/concepts-lakehouse?branch=main).| •**Tables**<br>  •**Files** |Yes | rootFolder|
|**Table name** |Specify your table name.|\<your table name> |Yes when you select **Tables** in **Root folder** | folderPath|
|**Copy behavior** |Defines the copy behavior when the source is files from a file-based data store. You can choose Add Dynamic content, none, Flatten hierarchy or Preserve hierarchy as your copy behavior.| • **Add dynamic content**<br>• **None**<br>• **Flatten hierarchy**<br>• **Preserve hierarchy**|No |copyBehavior:<br><br><br>FlattenHierarchy<br>PreserveHierarchy|
|**Max concurrent connections**|The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.| < upper limit of concurrent connections ><br>(integer)|No |maxConcurrentConnections|
|**Block size (MB)** |Specify the block size in MB when writing data to Lakehouse. Allowed value is between 4 and 100 MB.|\<block size\>|No|blockSizeInMB|
|**Metadata** |Set custom metadata when copy to sink.|• `$$LASTMODIFIED`<br>• Expression<br>• Static value|No |metadata|
|**Max rows per file** |When writing data into a folder, you can choose to write to multiple files and specify the max rows per file.|\<max rows per flie> |No |maxRowsPerFile|
|**File name prefix** |Specify the file name prefix when writing data to multiple files, resulted in this pattern: `<fileNamePrefix>`_00000.`<fileExtension>`. If not specified, prefix will be auto generated. Not applicable when source is file-based store or source has partition option enabled.| \<flie name prefix> |No |fileNamePrefix|