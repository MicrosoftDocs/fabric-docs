---
# Required metadata
# For more information, see https://learn.microsoft.com/help/platform/learn-editor-add-metadata
# For valid values of ms.service, ms.prod, and ms.topic, see https://learn.microsoft.com/help/platform/metadata-taxonomies

title:       Shortcuts file transformations
description: Shortcut transformations convert raw files into Delta tables that stay always in sync with the source data.  
author:      miquelladeboer # GitHub alias
ms.author:   mideboer # Microsoft alias
# ms.service:  Shortcuts
# ms.prod:   # To use ms.prod, uncomment it and delete ms.service
ms.topic:    how-to
ms.date:     07/09/2025
---

# Shortcuts file transformations

Shortcut transformations convert raw files into **Delta tables** that stay _always in sync_ with the source data.  
The transformation is executed by **Fabric Spark compute**, which **copies** the data referenced by a OneLake shortcut into a managed Delta table so you don’t have to build and orchestrate traditional ETL pipelines yourself.

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
| OneLake shortcut | A shortcut targeting a folder that contains _homogeneous_ CSV files. |
| Workspace role | **Contributor** or higher. |


## Supported sources, formats and destinations

All data sources supported in OneLake are supported. 

| Source file format | Destination | Supported Extensions | Supported Compression types | Notes |
|--------------------|-------------|----------------------|-----------------------------|-------|
| CSV (UTF-8, UTF-16) | Delta Lake table in the **Lakehouse / Tables** folder | .csv, .txt (delimiter) , .tsv (tab-separated), .psv (pipe-separated), |  .csv.gz, .csv.bz2 | .csv.zip, .csv.snappy are not supported as of date  |
| Parquet | Delta Lake table in the **Lakehouse / Tables** folder | .parquet | .parquet.snappy, .parquet.gzip, .parquet.lz4, .parquet.brotli, .parquet.zstd |    |
| JSON | Delta Lake table in the **Lakehouse / Tables** folder | .json, .jsonl, .ndjson | .json.gz, .json.bz2, .jsonl.gz, .ndjson.gz, .jsonl.bz2, .ndjson.bz2 | .json.zip, .json.snappy are not supported as of date  |

* Excel file support is part of roadmap
* AI Transformations available to support unstructured file formats (.txt, .doc, .docx) with Text Analytics use case live with more enhancements upcoming
  

## Set up a shortcut transformation

1. In your lakehouse, select **+ Table Shortcut in Tables section which is Shortcut transformation (preview)** and choose your source (e.g., Azure Data Lake, Azure Blob Storage, Dataverse, Amazon S3, GCP, SharePoint, OneDrive etc.).

   <img width="1216" height="334" alt="Tableshortcut" src="https://github.com/user-attachments/assets/f80624eb-b7dc-4d77-8327-58f4998fa79e" />

3. **Choose file, Configure transformation & create shortcut** – Browse to an existing OneLake shortcut that points to the folder with your CSV files, configure parameters and initiate creation. 
   - *Delimiter* in case of CSV files – Select the character used to separate columns (comma, semicolon, pipe, tab).  
   - *First row as headers* – Indicate whether the first row contains column names.
   - *Table Shortcut name* – Provide a friendly name; Fabric creates it under **/Tables**.
4. Track refreshes and view logs for transparency in **Manage Shortcut monitoring hub**.

Fabric Spark compute copies the data into a Delta table and shows progress in the **Manage shortcut** pane.

## How synchronization works

After the initial load, Fabric Spark compute:

* Polls the shortcut target **every 2 minutes**.  
* Detects **new or modified files** and appends or overwrites rows accordingly.  
* Detects **deleted files** and removes corresponding rows.  

## Monitor and troubleshoot

1. Open the lakehouse and select **Shortcuts** in the left pane.  
2. Choose the shortcut that feeds your transformation.  
3. In the details pane, select the **Manage shortcut** tab to view:  
   * **Status** – Last scan result and current sync state.  
   * **Refresh history** – Chronological list of sync operations with row counts and any error details.
   
  <img width="605" height="527" alt="Monitor" src="https://github.com/user-attachments/assets/b807b713-4630-4689-a64f-da2fc71bae7e" />

4. View more details in logs to troubleshoot

   <img width="605" height="452" alt="Logfiles" src="https://github.com/user-attachments/assets/72279c26-b09f-4e1f-9343-3f289859190a" />

Note: **Pause** or **Delete** the transformation from this tab is an upcoming feature part of roadmap

## Limitations (preview)

* Only **CSV, Parquet, JSON** file formats are supported.  
* Files must share an identical schema; schema drift isn’t yet supported.  
* Transformations are _read-optimized_; **MERGE INTO** or **DELETE** statements directly on the table are blocked.  
* Available only in **Lakehouse** items (not Warehouses or KQL databases).
* **Unsupported datatypes for CSV:** Mixed data type columns, Timestamp_Nanos, Complex logical types - MAP/LIST/STRUCT, Raw binary
* **Unsupported datatype for Parquet:** Timestamp_nanos, Decimal with INT32/INT64, INT96, Unassigned integer types - UINT_8/UINT_16/UINT_64, Complex logical types - MAP/LIST/STRUCT)
* **Unsupported datatypes for JSON:** Mixed data types in an array, Raw binary blobs inside JSON, Timestamp_Nanos
* **Flattening of Array data type in JSON:** Array data type shall be retained in delta table and data accessible with Spark SQL & Pyspark where for further transformations Fabric Materialized Lake Views could be leveraged for silver layer

Note: Adding support for some of the above and reducing limitations is part of our roadmap. Please track our release communications for further updates.

## Clean up

To stop synchronization, delete the shortcut transformation from the lakehouse UI.  
Deleting the transformation doesn’t remove the underlying files.
