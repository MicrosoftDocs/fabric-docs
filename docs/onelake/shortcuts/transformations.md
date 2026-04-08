---
title: Shortcut transformations (file)
description: Use OneLake shortcut transformations to convert raw files into Delta tables that stay always in sync with the source data.  
ms.reviewer: preshah
ms.topic: how-to
ms.date: 04/07/2026
ai-usage: ai-assisted
---

# Transform structured files into Delta tables

Use shortcut transformations to convert structured files into queryable Delta tables. If your source data is already in a tabular format like CSV, Parquet, JSON, or Excel, file transformations automatically copy and convert that data into Delta Lake format so you can query it by using SQL, Spark, or Power BI without building ETL pipelines.

For unstructured text files that need AI processing like summarization, translation, or sentiment analysis, see [Shortcut transformations (AI-powered)](./transformations-ai.md).

Shortcut transformations stay *always in sync* with the source data. **Fabric Spark compute** executes the transformation and copies the data referenced by a OneLake shortcut into a managed Delta table. With automatic schema handling, deep flattening capabilities, and support for multiple compression formats, shortcut transformations eliminate the complexity of building and maintaining ETL pipelines.

## Why use shortcut transformations?

* **Automatic conversion** – Fabric copies and converts source files to Delta format without manual pipeline orchestration.
* **Frequent sync** – Fabric polls the shortcut every two minutes and synchronizes changes.
* **Recursive folder discovery** – Fabric automatically traverses subfolders to detect and transform files across the entire directory hierarchy.
* **Delta Lake output** – The resulting table is compatible with any Apache Spark engine.
* **Inherited governance** – The shortcut inherits OneLake lineage, permissions, and Microsoft Purview policies.

## Prerequisites

| Requirement | Details |
| ----------- | ------- |
| Microsoft Fabric SKU | Capacity or trial that supports **Lakehouse** workloads. |
| Source data | A folder that contains homogeneous CSV, Parquet, JSON, or Excel files. |
| Workspace role | **Contributor** or higher. |

## Supported file formats

All data sources supported in OneLake are supported.

| Source file format | Supported extensions | Supported compression types | Notes |
| ------------------ | -------------------- | --------------------------- | ----- |
| CSV (UTF-8, UTF-16) | .csv, .txt (delimiter), .tsv (tab-separated), .psv (pipe-separated) | .csv.gz, .csv.bz2 | .csv.zip and .csv.snappy aren't supported. |
| Parquet | .parquet | .parquet.snappy, .parquet.gzip, .parquet.lz4, .parquet.brotli, .parquet.zstd | |
| JSON | .json, .jsonl, .ndjson | .json.gz, .json.bz2, .jsonl.gz, .ndjson.gz, .jsonl.bz2, .ndjson.bz2 | .json.zip and .json.snappy aren't supported. |
| Excel | .xlsx | Not applicable | Supports both table and schema shortcuts. Table shortcuts consolidate sheets into one Delta table. Schema shortcuts create one Delta table per sheet. |

## Supported shortcut types

| Menu option | What it creates | Supported file types for transformation |
| -- | -- | -- |
| **New shortcut** | A shortcut to any folder, in any format. Data isn't automatically registered as a table. | CSV, Parquet, JSON, Excel |
| **New table shortcut** | A shortcut to a single Delta table, which is automatically registered as a table in the lakehouse. | CSV, Parquet, JSON, Excel |
| **New schema shortcut** | A shortcut to a folder containing multiple Delta tables, which appear as a new schema in the lakehouse. For more information, see [Lakehouse schemas](../../data-engineering/lakehouse-schemas.md) | Excel |

## Create a table shortcut with data transformation

1. In your lakehouse, right-click a schema name under the **Tables** folder then select **New table shortcut**. Choose your shortcut source (for example, Azure Data Lake, Azure Blob Storage, Dataverse, Amazon S3, GCP, SharePoint, OneDrive, and more).

   :::image type="content" source="./media/transformations/create-new-table-shortcut.png" alt-text="Screenshot that shows creating 'table shortcut'." lightbox="./media/transformations/create-new-table-shortcut.png":::

1. Select the folder with your CSV, Parquet, or JSON files, or select the folder that contains your .xlsx files.

1. At the transform step, configure settings for the Delta conversion:

   * **Delimiter** in CSV files – Select the character used to separate columns (comma, semicolon, pipe, tab, ampersand, space).  
   * **First row as headers** – Indicate whether the first row contains column names.
   * **Sheets** in Excel files – Select whether to include all sheets or only a subset of sheets.

1. Review the shortcut configuration. At the review step, you can also configure the following setting before you select **Create**:

   * **Include subfolders** – Enable recursive processing of files in nested subdirectories. This option is selected by default for new transformations. Clear the checkbox if you want to process only the top-level folder.

1. Track refreshes and view logs for transparency in **Manage Shortcut monitoring hub**.

Fabric Spark compute copies the data into a Delta table and shows progress in the **Manage shortcut** pane.

For Excel table shortcuts, all selected sheets are consolidated into one Delta table.

## Create a schema shortcut with data transformation

Use schema shortcuts when you want one Delta table per Excel sheet.

1. In your lakehouse, right-click the **Tables** folder then select **New schema shortcut**.

   > [!NOTE]
   > Schema shortcuts with file transformation are currently available for Excel (.xlsx) files only.

1. Select the folder that contains your .xlsx files.

1. At the transform step, select whether to include all sheets or only a subset of sheets.

1. Review and select **Create**.

Fabric Spark compute creates separate Delta tables for each selected sheet and keeps them in sync with the source files.

## How synchronization works

After the initial load, Fabric Spark compute:

* Polls the shortcut target **every two minutes**.  
* Detects **new or modified files** and appends or overwrites rows accordingly.  
* Detects **deleted files** and removes corresponding rows.

When subfolder support is enabled, the system recursively discovers and processes files across all nested subdirectories within the target folder.  

## Monitor and troubleshoot

Shortcut transformations include monitoring and error handling to help you track ingestion status and diagnose problems.

1. Open the lakehouse and right-click the shortcut that feeds your transformation.  
1. Select **Manage shortcut**.
1. In the details pane, you can view:  

   * **Status** – Last scan result and current sync state.  
   * **Refresh history** – Chronological list of sync operations with row counts and any error details.
   * **Include subfolders** – Indicates whether subfolder transformation is enabled (**Yes** or **No**).

     :::image type="content" source="./media/transformations/monitoring-hub.png" alt-text="Screenshot that shows 'monitoring hub' for viewing transformation status.":::

1. View more details in logs to troubleshoot.

   :::image type="content" source="./media/transformations/log-files-troubleshooting.png" alt-text="Screenshot that shows how to access 'log file' to troubleshoot.":::

## Limitations

The following limitations currently apply to shortcut transformations:

* **Source format:** CSV, JSON, Parquet, and Excel (.xlsx) files are supported.
* **Unsupported data types for CSV:** Mixed data type columns, Timestamp_Nanos, Complex logical types - MAP/LIST/STRUCT, Raw binary.
* **Unsupported data types for Parquet:** Timestamp_nanos, Decimal with INT32/INT64, INT96, Unassigned integer types - UINT_8/UINT_16/UINT_64, Complex logical types - MAP/LIST/STRUCT.
* **Unsupported data types for JSON:** Mixed data types in an array, Raw binary blobs inside JSON, Timestamp_Nanos.
* **Schema shortcut availability:** Schema shortcuts for file transformations are currently supported for Excel (.xlsx) files.
* **File schema consistency:** Files must share an identical schema.
* **Workspace availability:** Available only in **Lakehouse** items (not Data Warehouses or KQL databases).  
* **Write operations:** Transformations are *read-optimized*. Direct **MERGE INTO** or **DELETE** statements on the transformation target table aren't supported.
* **Flattening of array data type in JSON:** The array data type is retained in the Delta table and is accessible with Spark SQL and PySpark. For further transformations, use Fabric Materialized Lake Views for the silver layer.
* **Flattening depth in JSON:** Nested structures are flattened up to five levels deep. Deeper nesting requires preprocessing.
* **Nested folder support:** The following limitations apply to subfolder processing:
  * Only available for new transformations. Existing transformations can't enable subfolder support.
  * Once subfolder support is enabled, it can't be disabled.
  * Shortcuts nested inside the target folder aren't followed. Only physical folders and files are processed.
  * Selective include or exclude of specific subfolders isn't supported.
  * Nested folders don't work with SharePoint shortcuts.

Use the [Fabric Roadmap](https://roadmap.fabric.microsoft.com/?product=onelake) and [Fabric Updates Blog](https://blog.fabric.microsoft.com/blog/category/onelake/) to learn about new features and releases.

## Clean up

To stop synchronization, delete the shortcut transformation from Lakehouse Explorer.  

Deleting the transformation doesn't remove the underlying files.
