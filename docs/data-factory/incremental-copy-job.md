---
title: Incremental copy in Copy job
description: Learn how incremental copy works in Copy job, including supported watermark column types, how NULL watermark values are handled, and how to reset incremental copy.
ms.reviewer: yexu
ms.topic: how-to
ms.date: 04/23/2026
ms.search.form: copy-job-tutorials
ms.custom: copy-job
ai-usage: ai-assisted
---

# Incremental copy in Copy job

This article describes how incremental copy works in Copy job in Microsoft Fabric Data Factory. It covers supported watermark column types, and how to reset incremental copy back to a full copy.

For an overview of Copy job, see [What is Copy job in Data Factory for Microsoft Fabric?](what-is-copy-job.md).

## Copy modes (Full copy, Incremental copy)

You can choose how your data is copied from source to destination:

- **Full copy**: Every time the job runs, it copies all data from your source to your destination.
- **Incremental copy**: The first run copies everything, and subsequent runs only move new or changed data since the last run.

## How incremental copy works

In incremental copy, every run after the initial full copy (called a "subsequent load") transfers only certain changes. Copy job automatically tracks and manages the state of the last successful run, so it knows what data to copy next.

- When Copy job copies from a database using an incremental column (“watermark column”), each subsequent load copies only rows with a value in that column larger than any row previously copied.
- When Copy job copies from a database that has CDC enabled, each subsequent load copies all rows inserted, updated, or deleted since the last successful run.
- When Copy job copies files, each subsequent load copies only those files created or modified since the last successful run.

If your database has CDC enabled, you don’t need to choose an incremental column — Copy job automatically detects the changes. See more details for [Change data capture (CDC) in Copy Job](cdc-copy-job.md).

If a copy job fails, you don’t need to worry about data loss. Copy job always resumes from the end of the last successful run. A failure doesn't change the state managed by Copy job.

## When to use CDC vs. watermark-based incremental copy

Copy job supports two approaches for detecting changes in database sources: CDC and watermark-based incremental copy. Choose the one that best fits your source system, data patterns, and downstream requirements.

### When to use CDC

CDC is a good fit when:

- **Your source database has CDC enabled** and Copy job supports CDC for that connector. See [Change data capture (CDC) in Copy Job](cdc-copy-job.md) for the list of supported sources.
- **You need to replicate deletes**, not just inserts and updates. CDC captures delete events so the destination can be kept in sync with the source.
- **You want to keep the destination continuously synchronized** with the source as a mirrored copy, for example by using SCD Type 1 (Merge) write behavior.
- **You need historical tracking** of changes at the destination. CDC in Copy job supports SCD Type 2, which preserves previous versions of each record.
- **You want to minimize load on the source**. CDC reads from the database's change feed instead of scanning the source table for rows newer than a watermark, which can be more efficient for high-change-volume tables.
- **Your source doesn't have a reliable incremental column** that you can use as a watermark.

### When to use watermark-based incremental copy

Watermark-based incremental copy is a good fit when:

- **CDC isn't enabled or isn't available** on your source database, or you can't enable it because of permissions, licensing, or source system constraints.
- **Your source table has a reliable incremental column** that increases monotonically whenever rows are inserted or updated. For supported types, see [Supported watermark column types](#supported-watermark-column-types).
- **You only need to track inserts and updates**, not deletes. Watermark-based incremental copy can't detect rows that are deleted from the source.
- **You're copying files** based on their last-modified date. File-based incremental copy uses the file modification timestamp as the watermark.

### Quick comparison

| Consideration | CDC | Watermark-based incremental copy |
|---|---|---|
| Source prerequisites | CDC enabled on the source database and supported by the Copy job connector | A column that monotonically increases on insert or update |
| Detects inserts | Yes | Yes |
| Detects updates | Yes | Yes (when the watermark column changes) |
| Detects deletes | Yes | No |
| Typical write methods | Merge or SCD Type 2 | Append or Merge (when configured) |

If your database has CDC enabled, you don't need to choose an incremental column — Copy job automatically detects the changes. When a source table does not have CDC enabled, Copy job goes with watermark-based incremental copy approach.

## Supported watermark column types

Copy job supports the following watermark column types for watermark-based incremental copy from a database:

- **ROWVERSION**: A binary column that automatically changes whenever a row is modified. It’s ideal for SQL-based systems with high-throughput transactional workloads, because every insert or update is captured reliably without depending on application-managed timestamps.
- **Datetime**: Datetime columns such as `LastUpdatedDatetime` or `ModifiedAt` that store both date and time. Copy job uses the precise timestamp to track incremental progress across runs. Datetime is preferred when your source tracks changes with high-frequency precision.
- **Date**: Date-only columns such as `LastUpdatedDate`. Because date values don’t include a time component, Copy job automatically applies delayed extraction from the last day to ensure there’s no data loss or overlap between runs, safely managing incremental windows. Date is suitable for daily batch processes.
- **String (interpreted as datetime)**: String columns whose values can be interpreted as datetime. This lets you use incremental copy even when timestamps are stored as strings, with no need to cast or transform columns or make schema changes in the source.
- **Integer**: An increasing number that tracks row changes.

### How NULL values in a watermark column are handled

Watermark-based incremental copy detects new or changed rows by comparing values in the watermark column across runs. Because NULL values can't be compared in this way, they're handled as follows:

- **Initial full load**: Rows with a NULL value in the watermark column are included. The initial run copies the complete dataset, regardless of watermark values.
- **Subsequent incremental loads**: Rows with a NULL value in the watermark column are excluded. Only rows whose watermark value is greater than the last recorded watermark are copied, and NULL values can't satisfy that comparison. As a result, any row that's inserted or updated with a NULL watermark value after the initial load isn't picked up by later incremental runs.
- **Column availability in the dropdown**: When you select the incremental column in Copy job, columns that aren't valid for watermark-based tracking might not appear in the dropdown. Make sure the column type is one of the [supported watermark column types](#supported-watermark-column-types) and that the column is accessible to the connection you're using.


## Reset incremental copy

You have the flexibility in managing incremental copy, including the ability to reset it back to a full copy on the next run. This is incredibly useful when there’s a data discrepancy between your source and destination—you can simply let Copy job perform a full copy in the next run to resolve the issue, then continue with incremental updates afterward.

You can reset incremental copy either per entire job or per table, giving you fine-grained control. For example, you can re-copy smaller tables without impacting larger ones. This means smarter troubleshooting, less disruption, and more efficient data movement.

In some cases, when you edit a copy job — for example, updating the incremental column in your source table — Copy job resets the incremental copy to a full copy on the next run. This ensures data consistency between the source and the destination.

### Understand Reset behavior

If your Copy job uses incremental copy, Fabric maintains internal state (for example, a watermark or checkpoint) to know what data has already been processed.

### What Reset does

**Reset** clears the Copy job's incremental state (watermark/checkpoint) for the selected source(s). After you reset, the next run behaves like an initial run for incremental logic (for example, it can re-read the full range of data, depending on your configuration).

### What Reset does not do

**Reset does not delete, truncate, or otherwise change data in the destination.** Existing rows remain in the destination table or files.

### Why Reset might create duplicates

If you reset and the next run reads data that was previously loaded, the outcome depends on your destination write behavior:

- **Append**: Previously loaded rows can be written again, causing duplicates.
- **Overwrite/Merge/Upsert (if configured)**: Duplicate risk is reduced because existing data might be replaced or matched, but the exact behavior depends on the destination and your mappings/keys.

### Best practice when using Reset with Append

If you must use **Append** and also need to **Reset**:

1. **Truncate or otherwise clear the destination table/data** (for example, delete existing rows) before running the Copy job again.
1. Run the Copy job after the destination is cleared.

This ensures that the reloaded data doesn't stack on top of existing data.

## Related content

- [What is Copy job in Data Factory for Microsoft Fabric?](what-is-copy-job.md)
- [Change data capture (CDC) in Copy Job](cdc-copy-job.md)
- [How to create a Copy job](create-copy-job.md)
- [How to monitor a Copy job](monitor-copy-job.md)
