---
title: Best Practices for Open Mirroring in Microsoft Fabric
description: Learn how to publish reliable open mirroring files, choose detection strategies, improve merge performance, recover tables, and manage schema changes.
ms.reviewer: tinglee, sbahadur, marakiketema
ms.date: 09/18/2026
ms.topic: best-practice
ms.search.form: Fabric Mirroring
ai-usage: ai-assisted
---

# Best practices for open mirroring in Microsoft Fabric

Use these practices to publish reliable change data, improve merge efficiency, and prepare for recovery and schema evolution when you write data files to a Fabric landing zone. Apply them together with the [open mirroring landing zone requirements and formats](open-mirroring-landing-zone-format.md) and the documentation for your data producer. Producers such as Oracle GoldenGate can have additional requirements.

## Publish files atomically

For a simple publication pattern, upload a single file in its table folder with an underscore-prefixed temporary name, such as `_00000000000000000042.parquet`. After the upload finishes, use the [Azure Data Lake Storage Gen2 rename operation](/rest/api/storageservices/datalakestoragegen2/path/create) to atomically rename it to its final name, such as `00000000000000000042.parquet`.

For a parallel or multistep publisher, use the reserved `_scratchPad` folder as an optional staging area that open mirroring excludes from table discovery. Upload, complete, and validate the file there, and then atomically move or rename it into the table folder. Open mirroring also ignores underscore-prefixed items, so neither temporary pattern exposes incomplete data as a table file.

Before the rename, verify that the Parquet or CSV file is complete and valid. Don't publish a partial, corrupt, or zero-byte file. Treat every final landing-zone path as immutable:

- Never append to or overwrite a published file.
- Never reuse a final path for different content.

Maintain a crash-safe, durable association between each source batch and its assigned publication sequence or final path. On retry or recovery, first check whether the immutable file was already published and verify that it represents the assigned batch. If it does, advance progress without rewriting it. If it doesn't exist, retry the temporary upload and atomic rename for the same assignment. If the path exists with different content, stop and reconcile the conflict. Never overwrite it or assign it to another batch.

## Choose a file-detection strategy

Open mirroring uses `SequentialFileName` by default. Keep it when source order matters, and use `LastUpdateTimeFileDetection` only when files can arrive independently and strict source event order isn't required or is provided elsewhere. Persist the selected strategy's allocation and processing progress across producer restarts and recoveries.

| Dimension | `SequentialFileName` | `LastUpdateTimeFileDetection` |
| --- | --- | --- |
| File name rule | Use exactly 20 numeric digits. Start with `00000000000000000001.parquet`, and increment by one for each file in a partition. | Use an arbitrary, unique, immutable path. The file name doesn't need to be numeric. |
| Detection order | Uses the exact contiguous producer-declared numeric sequence within each partition. | Uses storage `LastModified` order for each currently visible, unprocessed set. Equal timestamps have no defined producer-order tie-break. |
| Checkpoint and recovery identity | Uses the next numeric index, backed by a durable sequence allocator and publication progress. | Tracks previously processed paths. |
| Gap behavior | A missing index blocks detection of later files in that partition. | No numeric gap can stall ingestion, but the strategy can't detect a missing logical batch. |
| Producer coordination | Coordinate durable sequence allocation, and increment exactly once per partition file. | Coordinate unique immutable paths. A shared numeric allocator isn't required. |
| Best fit | Order-sensitive change data capture (CDC) streams that need explicit order and can durably coordinate sequence allocation and progress. | Independently arriving immutable data when strict source event order isn't required or is provided elsewhere. |

For `SequentialFileName`, don't skip, reuse, or regress an index. Apply the verify-before-retry recovery pattern from [Publish files atomically](#publish-files-atomically) before advancing the durable sequence progress.

`LastUpdateTimeFileDetection` doesn't guarantee that files are processed in the order expected by the producer. It processes each currently visible, unprocessed set in storage `LastModified` order, not producer sequence or event time. Equal timestamps have no defined producer-order tie-break. A late file can be processed after newer batches, and overwriting a processed path doesn't make that path eligible to be read again. Keep every path unique and immutable, and don't use this strategy to infer that all logical source batches arrived.

Before mirroring starts, create the full landing-zone structure and publish the initial files required by your producer contract. This preparation gives mirroring a consistent point from which to discover progress.

## Keep merge keys narrow

For best merge performance and more predictable memory use, keep a merge key as small as practical. Use fewer than five key columns when possible. This guidance is a performance recommendation, not a hard limit.

For a keyed change, open mirroring encodes the typed key values and computes a 64-bit candidate locator. This lookup hash locates candidates in a cache or target index, but it isn't the row identity. A cache miss falls back to the target index. Before an upsert, or whenever candidates are ambiguous, the engine verifies the exact typed composite key values. This verification protects correctness when different keys produce the same hash candidate.

Updates and deletes don't physically update the previous data row in place:

- A matched update marks the previous target row as deleted through a deletion vector and writes a replacement row.
- A matched delete marks the previous row as deleted.
- An insert or an upsert without an exact match writes a new row.

Assess lookup effort by considering the number of changed rows, key width and encoded bytes, number of relevant target files, index readiness, cache hit rate, and candidate key data reads. These factors indicate relative effort, not elapsed time or an estimated completion time. Actual time varies with target layout, index readiness, cache state, storage performance, concurrency, and retries. Benchmark representative data volume, key distributions, change rates, target layout, and cache conditions.

## Optimize insert-only files

The `__rowMarker__` column identifies each row as an insert, update, delete, or upsert. For a genuinely insert-only Parquet stream, omit `__rowMarker__` when the selected open mirroring contract and file-detection strategy allow it. Eligible marker-free Parquet files can use direct staging. A marker-bearing file uses the row-based processing path even when every marker denotes an insert.

Missing `__rowMarker__` alone doesn't prove that a stream is append-only. Configuration can assign a default operation, such as upsert, so the selected contract determines the data semantics. Don't remove the marker from CSV or from a stream that can update or delete rows.

Before production use, validate the marker-free path with representative files, configuration, initial loading, incremental inserts, retries, and recovery. Confirm both the resulting rows and the expected processing path.

## Plan for recovery

If a zero-byte, corrupt, or otherwise invalid file fails ingestion, delete it from OneLake and upload a complete, valid replacement with exactly the same file name. For sequential naming, later files remain blocked until the missing sequence number is restored. This procedure repairs a failed file; it doesn't replay a file that was already processed. A valid Parquet file containing zero rows isn't a zero-byte file and doesn't require repair.

To restart one table from the beginning:

1. Delete the table's entire landing-zone folder.
1. Wait until the table disappears from the mirrored database.
1. Recreate the same folder, and upload the required configuration and a complete, valid initial load.
1. Resume publishing incremental changes only after the table reappears.

Don't stop and restart the mirrored database to recover a single table. Do that only when you intentionally want the entire mirrored database to restart from the beginning.

## Coordinate source schema changes

Before you publish data after a source data definition language (DDL) change, confirm that the new source and landing-file schemas are compatible with the existing destination table. Most changes continue through the normal publishing flow. Only a breaking change requires the affected table to be rebuilt and reloaded.

| Source change | Destination behavior | Required action |
| --- | --- | --- |
| Add a column | Open mirroring adds the column to the destination table. | Continue publishing normally. |
| Drop a nullable column | Later files omit the column, and new rows store `NULL` for it. | Continue publishing normally. Rebuild only if you need to remove the column from the table. |
| Drop a nonnullable column | Schema merge fails because a column missing from a file must be nullable. | Rebuild the table, or keep publishing the column. |
| Change a column data type | Replication for that table stops with an error. | Rebuild the table, and then republish. |
| Rename a table | Open mirroring treats the replacement folder as a new table. | Drop and recreate the folder with the complete initial and incremental data under the new name. |
| Rename a column | Open mirroring treats the change as dropping one column and adding another. | Rebuild the table to retire the old column name. |

Key columns are fixed after the table metadata declares them, so plan a rebuild if the key must change. For delimited text, the declared schema definition doesn't support schema evolution.

To rebuild a table, follow the restart procedure in [Plan for recovery](#plan-for-recovery). Use the [Fabric REST API for mirrored databases](/rest/api/fabric/mirroreddatabase/items) and PySpark-based automation where appropriate to coordinate the rebuild and validate the destination table before you resume publishing.

## Follow producer-specific requirements

Open mirroring defines the landing zone contract, not how your producer generates files. Third-party writers add their own prerequisites, which the producer owns and documents. Review the documentation for your producer and the [open mirroring partners ecosystem](open-mirroring-partners-ecosystem.md).

Confirm these landing zone settings for any producer:

- `keyColumns`: Declare the key for update and delete support. Omit it only for insert-only tables.
- `fileDetectionStrategy`: Keep the sequential default when order matters. Set `LastUpdateTimeFileDetection` only for nonsequential file names.
- `isUpsertDefaultRowMarker`: Set to `true` when marker-free rows should be treated as upserts instead of inserts.
- `_partnerEvents.json`: Publish this file at the mirrored database level to identify the producer and source type.

The following examples show the kind of producer-side settings these writers expose. They're owned by the producer, so always confirm them in the producer's own documentation.

### Oracle GoldenGate 23ai

Oracle's documentation replicates into a mirrored database through GoldenGate for Distributed Applications and Analytics. Add a Classic Replicat, set the target to **Mirrored Database in Microsoft Fabric**, and select your Fabric Mirror connection as the alias. Leave the managed options and replicat parameters at their defaults, and set the OneLake event handler properties `gg.eventhandler.onelake.workspace` and `gg.eventhandler.onelake.mirror` to your target workspace and mirror name.

### MongoDB Atlas

MongoDB's documentation runs a mirroring application on an Azure App Service or a virtual machine, so the host is a prerequisite you provision. Authenticate with a service principal that has admin access to the Fabric workspace, and supply the Atlas connection URI, the database name, and either an explicit list of collections or all collections. Append a trailing slash to the landing zone URL when you pass it to the application. Because the application runs an initial sync per collection before it follows the change stream, size the host for the initial load; MongoDB's own high-level benchmark suggests monitoring throughput and CPU beyond roughly five large collections.

Both producers also write their own progress and state files with an underscore prefix. Open mirroring ignores underscore-prefixed items, so they never surface as table data.

## Publication and recovery checklist

| Area | Confirm before you proceed |
| --- | --- |
| File publication | Each completed file is atomically renamed from an underscore-prefixed temporary name, or moved from optional `_scratchPad` staging, to a unique, immutable final path by using the Azure Data Lake Storage Gen2 rename operation. No published file is partial, zero-byte, appended, overwritten, or reused. |
| Detection | The selected detection strategy matches the ordering requirement and has durable allocation or processed-path progress. |
| Startup | The full landing zone structure and required initial files exist before mirroring starts. |
| Merge behavior | Keys are stable and no wider than needed. Open mirroring verifies candidate keys exactly before applying an upsert. |
| Insert-only optimization | Marker omission is supported by the contract, genuinely insert-only, and validated with representative Parquet files. |
| Recovery | Replace an invalid failed file with a complete, valid file of exactly the same name, or restart one table by deleting and recreating its entire landing zone folder and initial load. |
| Schema | Schema changes are classified as compatible or breaking, and a rebuild and republication plan is ready for breaking changes. |
| Producer prerequisites | Third-party writer prerequisites are confirmed in the producer's documentation. |
