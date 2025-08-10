---
# Required metadata
# For more information, see https://learn.microsoft.com/en-us/help/platform/learn-editor-add-metadata
# For valid values of ms.service, ms.prod, and ms.topic, see https://learn.microsoft.com/en-us/help/platform/metadata-taxonomies

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
| CSV (UTF-8, comma-delimited) | Delta Lake table in the **Lakehouse / Tables** folder | Additional formats (Parquet, JSON) will be added during preview. |

## Set up a shortcut transformation

1. In your lakehouse, select **+ New > Shortcut transformation (preview)**.  
2. **Choose shortcut** – Browse to an existing OneLake shortcut that points to the folder with your CSV files.  
3. **Configure transformation**:  
   - *Table name* – Provide a friendly name; Fabric creates it under **/Tables**.  
   - *Delimiter* – Select the character used to separate columns (comma, semicolon, pipe, tab).  
   - *First row as headers* – Indicate whether the first row contains column names.  
4. Select **Create**.

Fabric Spark compute copies the data into a Delta table and shows progress in the **Manage shortcuts** pane.

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

From this tab you can also **Pause** or **Delete** the transformation if needed.

## Limitations (preview)

* Only **CSV** sources are supported.  
* Files must share an identical schema; schema drift isn’t yet supported.  
* Transformations are _read-optimized_; **MERGE INTO** or **DELETE** statements directly on the table are blocked.  
* Available only in **Lakehouse** items (not Warehouses or KQL databases).  

## Clean up

To stop synchronization, delete the shortcut transformation from the lakehouse UI.  
Deleting the transformation doesn’t remove the underlying files.
