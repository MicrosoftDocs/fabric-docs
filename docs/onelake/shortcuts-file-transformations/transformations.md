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


## Supported sources and destinations

| Source file format | Destination | Notes |
|--------------------|-------------|-------|
| CSV (UTF-8, UTF-16) , Parquet, JSON | Delta Lake table in the **Lakehouse / Tables** folder | Formats such .csv, .txt (when delimited) supported for CSV, .parquet and all types of compressed parquet types supported, .json, .jsonl. .ndjson & all types of compressed .json.<compress type> supported for JSON files |

- Shortcut Transformations flatten struct of array (five levels), array of struct (five levels), array of array of structs (one level)
- Excel file support with multi-tab recognition is under development

## Set up a shortcut transformation

1. In your lakehouse, select **+ New > Table Shortcut** , connect to your source (e.g., Azure Data Lake, Azure Blob Storage, Dataverse, Amazon S3, GCP, SharePoint, OneDrive etc.) and select your source file folder
   
    <img width="1216" height="334" alt="image" src="https://github.com/user-attachments/assets/bedf62a1-a973-4d42-b67b-ab80bc3c2612" />

    
3. **Configure transformation parameters as applicable & Create**:  
   - *Delimiter* in case of CSVs – Select the character used to separate columns (comma, semicolon, pipe, tab).  
   - *First row as headers* in case of CSVs – Indicate whether the first row contains column names
   - *Table name* – Provide a friendly name; Fabric creates it under **/Tables**
   - Note: More user configurations for all the supported file formats being planned
     
4. Fabric Spark compute copies the data into a Delta table & refreshes could be tracked in **Manage Shortcuts hub**

   <img width="605" height="527" alt="image" src="https://github.com/user-attachments/assets/b70069ca-8f97-42cd-b1ce-fc1c10cbb5e0" />

6. **View logs** in the monitoring view for complete transparency

   <img width="605" height="452" alt="image" src="https://github.com/user-attachments/assets/b1b5b94a-2089-4545-9d90-6d59d88b9a36" />


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
   * **Activity log** – Chronological list of sync operations with row counts and any error details.  

Note: **Pause** or **Delete** the transformation from this tab is an upcoming feature part of roadmap

## Limitations (preview)

* Only **CSV, Parqut, JSON** sources are supported.  
* Files must share an identical schema; schema drift isn’t yet supported.  
* Transformations are _read-optimized_; **MERGE INTO** or **DELETE** statements directly on the table are blocked.  
* Available only in **Lakehouse** items (not Warehouses or KQL databases)
* **Unsupported datatypes for CSV:** Mixed data type columns, Timestamp_Nanos, Complex logical types - MAP/LIST/STRUCT, Raw binary
* **Unsupported datatype for Parquet:** Timestamp_nanos, Decimal with INT32/INT64, INT96, Unassigned integer types - UINT_8/UINT_16/UINT_64, Complex logical types - MAP/LIST/STRUCT)
* **Unsupported datatypes for JSON:** Mixed data types in an array, Raw binary blobs inside JSON, Timestamp_Nanos
* **Flatening of Array data type in JSON:** Array data type shall be retained in delta table and data accessible with Spark SQL & Pyspark where for further transformations Fabric Materialized Lake Views could be leverage for silver layer
* **Unsupported file name characters:** File names cannot contain characters such as  < > : " / \ | ? * because they are reserved by file systems and will cause read/write errors

Note: To add support for some of the above and reduced limitations is part of our roadmap. Please track our release communications for further update


## Clean up

To stop synchronization, delete the shortcut transformation from the lakehouse UI.  
Deleting the transformation doesn’t remove the underlying files.
