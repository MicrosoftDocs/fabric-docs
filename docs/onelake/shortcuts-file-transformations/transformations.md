---
# Required metadata
# For more information, see https://learn.microsoft.com/help/platform/learn-editor-add-metadata
# For valid values of ms.service, ms.prod, and ms.topic, see https://learn.microsoft.com/help/platform/metadata-taxonomies

title:       Shortcuts file transformations
description: Shortcut transformations convert raw files into Delta tables that stay always in sync with the source data.  
author:      miquelladeboer # GitHub alias
ms.author:   mideboer # Microsoft alias
ms.reviewer: kgremban
ms.topic:    how-to
ms.date:     11/10/2025
ai-usage:    ai-assisted
---

# Shortcuts file transformations

Shortcut transformations convert raw files (CSV, Parquet, and JSON) into **Delta tables** that stay _always in sync_ with the source data. The transformation is executed by **Fabric Spark compute**, which copies the data referenced by a OneLake shortcut into a managed Delta table so you don't have to build and orchestrate traditional ETL pipelines yourself. With automatic schema handling, deep flattening capabilities, and support for multiple compression formats, shortcut transformations eliminate the complexity of building and maintaining ETL pipelines.

> [!NOTE]  
> Shortcut transformations are currently in **public preview** and are subject to change.

## Why use shortcut transformations?

* **No manual pipelines** – Fabric automatically copies and converts the source files to Delta format; you don’t have to orchestrate incremental loads.  
* **Frequent refresh** – Fabric checks the shortcut every **2 minutes** and synchronizes any changes almost immediately.  
* **Open & analytics-ready** – Output is a Delta Lake table that any Apache Spark–compatible engine can query.  
* **Unified governance** – The shortcut inherits OneLake lineage, permissions, and Microsoft Purview policies.
* **Spark based** – Transforms build for scale. 

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Microsoft Fabric SKU | Capacity or Trial that supports **Lakehouse** workloads. |
| OneLake shortcut | A shortcut targeting a folder that contains CSV, Parquet, or JSON files. The files in the folder should have consistent schema. |
| Workspace role | **Contributor** or higher. |

## Supported sources and destinations

Shortcut transformations support CSV, Parquet, and JSON file formats. You can include multiple file formats in the same shortcut folder. The transformation intelligently handles each format and consolidates them into a single Delta table based on schema compatibility.

### CSV files

* **Extensions**: `.csv`
* **Encoding**: UTF-8
* **Delimiters**: Comma, semicolon, pipe, tab (configurable)
* **Headers**: Configurable first-row header support
* **Destination**: Delta Lake table in the **Lakehouse / Tables** folder

### Parquet files

* **Extensions**: `.parquet`
* **Compression**: Snappy, LZ4, Gzip, Brotli, Zstandard (all supported automatically)
* **Schema**: Automatic schema inference and alignment to Delta tables
* **Nested structures**: Up to 5 levels of structs and arrays automatically flattened
* **Destination**: Delta Lake table in the **Lakehouse / Tables** folder (output uses Snappy compression)

### JSON files

* **Extensions**: `.json`, `.jsonl`, `.ndjson` (all three formats supported, can be mixed in a single transformation)
* **Nested structures**: Up to 5 levels deep, including:
  * Structs (up to 5 levels)
  * Arrays of structs (up to 5 levels)
  * Arrays of arrays of structs (flattened one level deep)
* **Schema handling**: Automatic inference with case-insensitive column matching
* **Destination**: Delta Lake table in the **Lakehouse / Tables** folder

## Set up a shortcut transformation

1. In your lakehouse, right-click the **Tables** folder and select **New shortcut**.  
2. **Choose shortcut** – Browse to an existing OneLake shortcut that points to the folder with your source files (CSV, Parquet, JSON, or a mix).  
3. **Configure transformation**:  
   * *Table name* – Provide a friendly name; Fabric creates it under **/Tables**.  
   * *File format* – Select CSV, Parquet, or JSON based on your source files.
   * For CSV files:
     * *Delimiter* – Select the character used to separate columns (comma, semicolon, pipe, tab).  
     * *First row as headers* – Indicate whether the first row contains column names.
   * For Parquet files:
     * Schema is automatically inferred; nested structures are flattened automatically.
   * For JSON files:
     * Schema is automatically inferred; nested structures up to 5 levels deep are flattened automatically.
     * Supports .json, .jsonl, and .ndjson formats (can be mixed).
4. Review the schema preview (if available) to verify column mapping.
5. Select **Create**.

Fabric Spark compute copies the data into a Delta table and shows progress in the **Manage shortcuts** pane. The initial load processes all existing files, then continuous sync monitors for changes every 2 minutes.

## How synchronization works

After the initial load, Fabric Spark compute:

* Polls the shortcut target **every 2 minutes**.  
* Detects **new or modified files** and appends or overwrites rows accordingly.  
* Detects **deleted files** and removes corresponding rows.  

## Monitor and troubleshoot

Shortcut transformations include monitoring and error handling to help you track ingestion status and diagnose issues.

### Monitoring view

1. Open the lakehouse and right-click the shortcut that feeds your transformation.  
1. Select **Manage shortcut**.
1. In the details pane, you can view:  
   * **Status** – Last scan result and current sync state.  
   * **Activity log** – Chronological list of sync operations with row counts and any error details.  

From this tab you can also **Pause** or **Delete** the transformation if needed.

## Limitations (preview)

Current limitations of shortcut transformations:

* **Flattening depth**: Nested structures are flattened up to 5 levels deep. Deeper nesting requires preprocessing.
* **Write operations**: Transformations are _read-optimized_; direct **MERGE INTO** or **DELETE** statements on the transformation target table aren't supported.
* **Workspace availability**: Available only in **Lakehouse** items (not Data Warehouses or KQL databases).  
* **File schema consistency**: Files must share an identical schema.

## Clean up

To stop synchronization, delete the shortcut transformation from the lakehouse UI.  
Deleting the transformation doesn’t remove the underlying files.
