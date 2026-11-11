---
title: Delta Lake expected behaviors and troubleshooting
description: Understand expected Delta Lake behaviors and troubleshoot OPTIMIZE, VACUUM, MERGE, and common table issues in Microsoft Fabric.
ms.topic: troubleshooting
ms.date: 11/11/2026
ai-usage: ai-assisted
---

# Delta Lake expected behaviors and troubleshooting

Use this article to understand expected behavior and troubleshoot common edge cases for `OPTIMIZE`, `VACUUM`, and `MERGE` in Microsoft Fabric. Each section explains why a behavior occurs and provides the relevant setting, command, or mitigation when action is required.

Applies to: Microsoft Fabric lakehouse tables, Spark notebooks, Spark job definitions, and the lakehouse **Maintenance** feature.

Before you begin, review [Delta table maintenance in Microsoft Fabric](delta-lake-table-maintenance.md), [Optimize Delta Lake tables with V-order](delta-optimization-and-v-order.md), and [Deletion vectors for Delta tables](delta-lake-deletion-vectors.md). Additional links appear in the relevant sections.

> [!TIP]
> For a quick diagnosis, use the quick answers table in each troubleshooting section, and then follow the link to the detailed explanation.

## How Fabric runs table maintenance

Start with: [Delta table maintenance in Microsoft Fabric](delta-lake-table-maintenance.md).

When you run table maintenance on a lakehouse table (right-click a table > **Maintenance**, or use the table maintenance jobs API), Fabric executes up to three Delta operations in this order:

| Order | Operation | Delta command | What it does |
|---|---|---|---|
| 1 | Optimize | `OPTIMIZE` | Compacts many small files into fewer larger ones. Optionally rewrites files in V-order format. |
| 2 | Vacuum | `VACUUM` | Deletes data files that are no longer referenced by the table and are outside the retention period. |
| 3 | Deletion vector purge | `REORG TABLE ... APPLY (PURGE)` | Physically rewrites files that have deletion vectors to remove soft-deleted rows. |

Two behaviors of this pipeline are by design and frequently raise questions:

- The deletion vector purge step is nonfatal. If `OPTIMIZE` and `VACUUM` succeed but the purge step fails, the overall job still reports success. The purge error is logged but not surfaced as a job failure.
- The order is fixed. Vacuum always runs after optimize. Old files replaced by compaction are eligible for cleanup only after the retention period. Files replaced by the final purge step require a later `VACUUM` after that period.

## Troubleshoot OPTIMIZE

Start with: [Optimize Delta Lake tables with V-order](delta-optimization-and-v-order.md).

### Quick answers

| Question | Short answer |
|---|---|
| [Why didn't OPTIMIZE reduce my file count much?](#i-ran-optimize-but-the-number-of-files-barely-changed-is-it-broken) | Files already near the target size might not be rewritten. Bin compaction is idempotent. |
| [Why did OPTIMIZE fail with FetchFailedException or shuffle errors?](#optimize-fails-with-fetchfailedexception-or-shuffle-connection-closed-errors-why) | Heavy compaction can cause shuffle pressure. Test `spark.databricks.delta.optimize.repartition.enabled=false`. |
| [Does OPTIMIZE change my data or row count?](#does-optimize-or-z-order-ever-change-my-data) | No. It only reorganizes physical files; row count and values are unchanged. |
| [What does the V-order flag do during OPTIMIZE?](#what-is-the-v-order-flag-and-should-i-always-enable-it) | Rewrites files in a read-optimized layout for Power BI and the SQL analytics endpoint. It's optional and has tradeoffs. |

### I ran OPTIMIZE but the number of files barely changed. Is it broken?

No, this is expected. `OPTIMIZE` is a bin-compaction operation: it groups small files and packs them into larger files. Files that already meet the compaction criteria are left untouched, and running `OPTIMIZE` again on an already-optimized table is effectively a no-op (it's idempotent). If your table was recently written with Optimized Write enabled (the default for most resource profiles in Fabric), the files might already be well-sized, so `OPTIMIZE` has little to do.

As a rough rule of thumb, Spark and Delta can handle about 20,000-30,000 files per table before significant performance regression, but the threshold depends on the workload. Run `OPTIMIZE` (or enable auto compaction) when your average file size is well below the target, for example, if a table has tens of thousands of files averaging about 1 MB each. Downstream engines such as Direct Lake have their own file-count limits.

### OPTIMIZE fails with FetchFailedException or shuffle connection-closed errors. Why?

This can occur when Delta `OPTIMIZE` puts pressure on the external shuffle service under heavy compaction.

Example error:

```text
org.apache.spark.shuffle.FetchFailedException: Connection closed by remote host <executor>:7337
```

For each bin it compacts, `OPTIMIZE` can repartition the input into exactly one output partition. That forces a single task to fetch shuffle data from every executor. With up to 15 such single-task jobs running concurrently, this can saturate the shuffle service and cause connection closures. The `spark.sql.shuffle.partitions` setting has no effect here because the partition count is fixed to 1 in this `OPTIMIZE` code path.

Recommended mitigation: switch the compaction write from a shuffle to a narrow-dependency coalesce.

```python
spark.conf.set("spark.databricks.delta.optimize.repartition.enabled", "false")
```

If that alone isn't enough, also test reduced concurrency and bin size:

```python
spark.conf.set("spark.databricks.delta.optimize.maxThreads", "4")
spark.conf.set("spark.databricks.delta.optimize.maxFileSize", "268435456")
```

| Configuration | Default | Value to test | Effect |
|---|---|---|---|
| `spark.databricks.delta.optimize.repartition.enabled` | `true` | `false` | Uses `coalesce(1)` without a shuffle, which can avoid shuffle fetch failures. |
| `spark.databricks.delta.optimize.maxThreads` | `15` | `4` | Fewer concurrent bin jobs reduce shuffle pressure. |
| `spark.databricks.delta.optimize.maxFileSize` | 1 GB | 256 MiB | Smaller bins reduce data processed per job. |

### Does OPTIMIZE or Z-Order ever change my data?

No. `OPTIMIZE` (with or without `ZORDER BY`) only changes the physical layout of files. The total row count, values, and query results are unchanged for the same table data. Z-Order additionally colocates related data to improve data skipping on the clustered columns, but it never adds, removes, or alters rows.

### What is the V-order flag, and should I always enable it?

V-order is a write-time optimization that lays out Parquet files for fast reads by the Power BI engine and the SQL analytics endpoint. It's beneficial for read-heavy BI tables, but it adds write cost and can cause executor memory pressure on very wide or large writes.

If executors run out of memory or stop during a V-order write, especially on large tables, you can test a cap on the native writer's memory or disable V-order:

```python
spark.conf.set("spark.sql.parquet.native.writer.memory", "268435456")
```

This example sets the cap to 256 MiB. To disable V-order, follow [Control V-order writes](delta-optimization-and-v-order.md#control-v-order-writes).

## Troubleshoot VACUUM

Start with: [Delta table maintenance in Microsoft Fabric](delta-lake-table-maintenance.md).

### Quick answers

| Question | Short answer |
|---|---|
| [Why can't I time travel to an old version after VACUUM?](#after-vacuum-i-can-no-longer-query-an-older-version-did-i-lose-data) | Expected. `VACUUM` physically deletes old files; time travel to versions that need those files is no longer possible. |
| [Why did VACUUM warn me about retention under 168 hours?](#vacuum-warns-about-a-retention-period-shorter-than-168-hours-seven-days-what-does-that-mean) | It's a safety check. Retaining files for less than seven days risks deleting files that in-flight queries still need. |
| Does VACUUM ever delete active data? | No. `VACUUM` doesn't delete files the current table version references. Unsafe retention can affect in-progress operations. |
| [A reader failed with FileNotFoundException after VACUUM. Why?](#a-select-or-downstream-job-failed-with-filenotfoundexception-shortly-after-vacuum-is-the-table-corrupt) | A long-running reader might hold a stale snapshot whose files were vacuumed. Retry against the current snapshot if appropriate. |
| [Does VACUUM reclaim space from deletion vectors?](#i-deleted-rows-and-then-ran-vacuum-but-storage-didnt-shrink-why) | Only after `OPTIMIZE` or purge resolves the deletion vectors into rewritten files and retention has elapsed. |

### After VACUUM I can no longer query an older version. Did I lose data?

Your current data is intact, but time travel to vacuumed versions is gone, and this is by design. `VACUUM` physically removes data files that are no longer referenced by the latest table version and are outside the retention period. Time travel (`VERSION AS OF` or `TIMESTAMP AS OF`) relies on those old files still existing in storage. Once a version's files are vacuumed, you can no longer read that version, even though its transaction log entry might still appear in history.

> [!IMPORTANT]
> `VACUUM` only removes files that the current table version doesn't reference. It doesn't delete the active data of your table. Inserts, updates, and the latest committed snapshot remain readable after `VACUUM` when you use safe retention.

If you need to preserve a specific historical version, write an independent copy before vacuuming. `RESTORE` can bring a version back while its files still exist, but a `SHALLOW CLONE` still depends on the source files and isn't an independent backup.

### VACUUM warns about a retention period shorter than 168 hours (seven days). What does that mean?

The default retention period is seven days (168 hours). Delta deliberately blocks `VACUUM` commands that specify shorter retention to protect files that concurrent readers or in-flight writers might still need.

> [!WARNING]
> Disabling the retention check and vacuuming with a low `RETAIN` value can cause `FileNotFoundException` failures in concurrent readers, affect in-progress writes, and remove your ability to time travel to recent versions. Only do this in a controlled scenario with no concurrent readers or writers and no requirement to retain those versions.

If you intentionally want shorter retention, for example, in a controlled test, explicitly disable the safety check:

```sql
SET spark.databricks.delta.retentionDurationCheck.enabled = false;
VACUUM my_table RETAIN 0 HOURS;
```

### A SELECT or downstream job failed with FileNotFoundException shortly after VACUUM. Is the table corrupt?

The table isn't necessarily corrupt. This can happen when a long-running reader starts with an older snapshot, and then `VACUUM` deletes files that snapshot points to. The reader is asking storage for a file that has since been removed.

This behavior can occur when `VACUUM` runs with a retention period shorter than the duration of your readers. Mitigations:

- Keep at least the default seven-day retention, and extend it if your readers or streams need older files for longer.
- Schedule `VACUUM` during quiet windows when no long reads are active.
- Rerun the failed reader against the current snapshot if the workload doesn't require the original snapshot. If it still fails, investigate the missing files.

### I deleted rows and then ran VACUUM, but storage didn't shrink. Why?

If your table has deletion vectors enabled, a `DELETE`, `UPDATE`, or `MERGE` can record a soft-delete marker instead of immediately rewriting the underlying data files. The original files are still referenced, so `VACUUM` alone won't reclaim that space.

The `delta.enableDeletionVectors` table property controls this behavior. Deletion vectors are enabled by default starting in Fabric Spark runtime 2.0 (Delta 4.1) and are opt-in on earlier runtimes.

To physically reclaim space, first resolve the deletion vectors by running `OPTIMIZE` or the deletion vector purge step, which rewrites the affected files without the deleted rows. After the retention period, `VACUUM` can remove the old data files and unreferenced deletion vector files. Because Fabric table maintenance runs `OPTIMIZE`, `VACUUM`, and then purge, files replaced by purge need a later vacuum run.

### I took a SHALLOW CLONE, then vacuumed the source. Will my clone break?

It can. A shallow clone references the source's data files rather than copying them. If those files become unreferenced by the source and pass its retention period, source `VACUUM` can remove files the clone still needs, causing `FileNotFoundException`.

The default seven-day retention delays this risk but doesn't eliminate it. Coordinate source retention with clone use, or write an independent copy if you need independence from the source's lifecycle. Fabric doesn't support `DEEP CLONE`. See [Clone Delta tables](delta-lake-clone.md).

## Troubleshoot MERGE

Start with: [Deletion vectors for Delta tables](delta-lake-deletion-vectors.md).

### Quick answers

| Question | Short answer |
|---|---|
| [Why did concurrent MERGEs fail with ConcurrentAppendException?](#two-concurrent-merge-or-deleteupdate-jobs-failed-with-concurrentappendexception-or-concurrentdeletereadexception-why) | It's an optimistic concurrency conflict. Retry the failed `MERGE` safely, or scope it to a partition. |
| [MERGE says a target row matched multiple source rows. Why?](#merge-failed-because-a-target-row-matched-more-than-one-source-row-how-do-i-fix-it) | Your `ON` condition isn't unique on the source. Deduplicate the source. |
| [Why didn't MERGE add a new source column?](#my-source-has-an-extra-column-why-didnt-merge-add-it-to-the-target) | Schema auto-merge is off by default. Enable it or add the column first. |
| [Are MERGEs to different partitions safe to run at once?](#can-i-run-multiple-merge-statements-at-the-same-time-safely) | Yes, if explicit partition predicates isolate disjoint file sets. |
| [Why is native MERGE slower on a tiny table?](#my-native-merge-is-slower-than-expected-on-small-tables-why) | Native execution has fixed overhead that can exceed the benefit on very small data. |

### Two concurrent MERGE (or DELETE/UPDATE) jobs failed with ConcurrentAppendException or ConcurrentDeleteReadException. Why?

This is Delta's optimistic concurrency control working as designed, not a bug. Delta lets multiple writers proceed in parallel and validates conflicts at commit time. When two operations touch overlapping files, the first to commit wins and the conflicting operation is rejected so that no write is silently lost.

Common conflict exceptions include:

- `ConcurrentAppendException`.
- `ConcurrentDeleteReadException`.
- `ConcurrentWriteException` or `ConcurrentModificationException`.

Recommended handling:

- **Retry the failed operation.** On retry, it reads the latest committed state and can succeed if the conflict is resolved. Use bounded retries and backoff, and ensure the operation is safe to rerun.
- **Scope writes to partitions.** Include an explicit target partition predicate in your `MERGE` or `DELETE`, for example, `AND target.region = 'EU'`, and restrict the source to that partition. This lets parallel jobs operate on disjoint file sets.
- **Prematerialize the source.** If the same `MERGE` might be retried, materialize the source to a staging Delta table so retries operate on consistent data. A view alone doesn't freeze its input.

For more information, see [Concurrency control for Delta tables](delta-lake-concurrency-control.md).

### MERGE failed because a target row matched more than one source row. How do I fix it?

This is intentional. A `MERGE` update requires that each target row match at most one source row. If your `ON` condition isn't unique on the source side, Delta can't decide which source row to apply and raises an error rather than producing nondeterministic results.

Deduplicate the source so the join key is unique before the merge. For example, keep only the latest row per key. This example assumes that a higher `id` identifies the latest update:

```sql
MERGE INTO target AS t
USING (
    SELECT key, MAX(id) AS max_id
    FROM updates
    GROUP BY key
) AS s
ON t.key = s.key
WHEN MATCHED THEN UPDATE SET t.status = 'latest';
```

### My source has an extra column. Why didn't MERGE add it to the target?

By default, `MERGE` doesn't automatically evolve the target schema. A source column that doesn't exist in the target can be ignored, or an explicit reference to a missing target column can cause an error, unless you opt in to schema auto-merge:

```sql
SET spark.databricks.delta.schema.autoMerge.enabled = true;

MERGE INTO target AS t USING source AS s ON t.id = s.id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;
```

With auto-merge enabled, supported new columns are added to the target schema. Existing rows that aren't updated get `NULL` for the new column, and inserted or updated rows carry the source values. If you prefer explicit control, add the column with `ALTER TABLE ... ADD COLUMNS` first and keep auto-merge off.

### Can I run multiple MERGE statements at the same time safely?

Yes, if they target disjoint data:

- `MERGE` or `DELETE` operations on different partitions can run concurrently without conflict when explicit predicates isolate their read and write scopes.
- Operations on disjoint row ranges can still conflict at the file level if the affected rows share a data file. Use safe retries for concurrency conflicts.
- Operations on the same rows can conflict by design. One commits, and the other must reread the updated state before retrying.

### My native MERGE is slower than expected on small tables. Why?

Native `MERGE` is optimized for larger operations. On very small tables or partitions, the fixed overhead of building deletion vector bitmaps can outweigh the savings, so a small merge might not get faster. Other patterns that reduce efficiency include:

- **Many tiny files.** Writing many small deletion vector files adds metadata and I/O overhead. Consider compacting with `OPTIMIZE` before merging.
- **High resource contention.** Insufficient executor resources slow down native bitmap and pruning work.

If you suspect a correctness or performance problem specifically in the native path, isolate it by disabling native execution for the merge and comparing:

```python
spark.conf.set("spark.microsoft.delta.merge.native.enabled", "false")
spark.conf.set("spark.microsoft.delta.merge.lowShuffle.native.enabled", "false")
```

If the issue disappears with native execution disabled, collect both runs' results and raise the issue with Microsoft Support. Native execution and [low shuffle merge](low-shuffle-merge.md) are separate optimizations; these settings disable the native paths.

## Deletion vectors: why DELETE, UPDATE, and MERGE behave differently

Start with: [Deletion vectors for Delta tables](delta-lake-deletion-vectors.md).

Deletion vectors change how row-level changes are applied:

- **Without deletion vectors (copy-on-write):** Changing even one row can rewrite the entire data file. This can be slow for small, frequent changes.
- **With deletion vectors (merge-on-read):** A `DELETE`, `UPDATE`, or `MERGE` can record a soft-delete marker instead of rewriting existing files. Reads transparently filter out marked rows. Updates and merges still write new rows as needed. Writes can be faster, but physical space isn't reclaimed until `OPTIMIZE` or purge resolves the vectors.

This explains two common expected-behavior questions:

- "My DELETE was instant on a huge table." The operation can use soft delete through deletion vectors.
- "VACUUM didn't shrink storage after DELETE." [Resolve the deletion vectors first](#i-deleted-rows-and-then-ran-vacuum-but-storage-didnt-shrink-why).

Default behavior depends on your Spark runtime. Deletion vectors are enabled by default starting in Fabric Spark runtime 2.0 (Delta 4.1); on earlier runtimes they're opt-in. The `delta.enableDeletionVectors` table property governs the behavior. The feature requires Delta protocol reader version 3 and writer version 7 with deletion vector support. Check compatibility across clients before enabling it.

Enable the feature per table:

```sql
ALTER TABLE my_table SET TBLPROPERTIES ('delta.enableDeletionVectors' = true);
```

You can also set the default for new tables in a session:

```sql
SET spark.databricks.delta.properties.defaults.enableDeletionVectors = true;
```

For cleanup, `OPTIMIZE` automatically purges files where more than 5% of records are referenced by deletion vectors, so routine compaction usually handles cleanup. Use `REORG TABLE ... APPLY (PURGE)` when you need to force physical removal of soft-deleted rows below that threshold, for example, for compliance requirements. Old files still require `VACUUM` after retention.

## Troubleshoot common Delta Lake issues

Start with: [Delta table maintenance](delta-lake-table-maintenance.md), [Direct Lake query performance](../fundamentals/direct-lake-understand-storage.md), and [Direct Lake guardrails and fallback](../fundamentals/direct-lake-overview.md#fabric-capacity-requirements).

The following issues can occur with Delta Lake in Microsoft Fabric. Some indicate expected behavior or a configuration issue; others require a runtime update or workaround.

### Storage keeps growing even though I VACUUM and OPTIMIZE frequently

This can be expected. Two separate retention layers are involved:

1. Delta `VACUUM` deletes unreferenced data files once they're outside the retention period, which defaults to seven days. It doesn't remove active file references from the transaction log.
1. OneLake file-level soft delete keeps deleted files for an additional retention window for accidental-deletion protection. Those files still count toward billable storage until they're permanently removed.

With frequent `MERGE` or `UPDATE` jobs, billable storage includes active data, obsolete files awaiting vacuum, and soft-deleted files awaiting permanent removal. It can therefore look constant or grow.

Setting `VACUUM ... RETAIN 3 HOURS` doesn't shorten OneLake soft-delete retention. OneLake defaults to seven days, but workspace admins can turn it off or configure it from 1 through 365 days. Changes apply only to files deleted afterward. See [Configure file-level soft delete](../onelake/configure-soft-delete.md).

The effective levers are:

- **Reduce churn.** Prefer appends and periodic compaction when appropriate; batch merges into fewer, larger operations.
- **Keep compaction healthy.** Run `OPTIMIZE` targeting appropriate file sizes, up to 1 GB, to reduce small-file proliferation.
- **Plan capacity for retention.** Account for obsolete and soft-deleted data, using the configured retention periods.

### Direct Lake or semantic model refresh fails with "Delta table has too many parquet files"

Direct Lake enforces a maximum number of Parquet files per table that depends on your capacity SKU, for example, 1,000 files for F32 and 5,000 for F64/P1. When a table exceeds the limit, Direct Lake on SQL can fall back to DirectQuery if fallback is allowed. Direct Lake on OneLake refresh fails when guardrails are exceeded. This is a capacity guardrail, not corruption.

To address the issue:

1. Run `OPTIMIZE` to compact active files below the guardrail. `VACUUM` cleans up obsolete files but doesn't reduce the active file count.
1. Enable auto compaction so small files are compacted automatically after writes. On supported runtimes, you can also enable fast optimize:

   ```python
   spark.conf.set("spark.databricks.delta.autoCompact.enabled", "true")
   spark.conf.set("spark.microsoft.delta.optimize.fast.enabled", "true")
   ```

1. Reconsider overpartitioning. Partitioning by multiple high-cardinality columns can cause file proliferation. Fewer partition columns, or none where appropriate, can produce fewer files.

Fast optimize can skip bins. Verify the resulting file count before retrying the refresh. For current limits, see [Direct Lake capacity requirements](../fundamentals/direct-lake-overview.md#fabric-capacity-requirements).

### Intermittent MERGE or write failures from Polars or other delta-rs clients

Notebooks that write with Polars `write_delta` or other delta-rs-based clients, rather than Spark, can fail intermittently during `MERGE` with errors such as:

```text
generic DeltaTable error: external error: parquet error:
ChunkReader::get_bytes error: ... error sending request for url
(https://onelake.blob.fabric.microsoft.com/.../part-...snappy.parquet)
```

Two issues to investigate are:

- **A delta-rs library issue.** For the issue addressed in `deltalake` 1.1 or later, upgrade the separately installed package to a version that includes the fix. Confirm that your error matches the applicable release notes.
- **Table fragmentation.** Many small files can increase metadata and I/O overhead during a merge. Test whether `OPTIMIZE` improves the workload. Also verify access and file availability; this error alone doesn't establish fragmentation as the cause.

> [!NOTE]
> These client libraries aren't part of the Fabric Spark runtime. Compare with Spark-native `MERGE` to help isolate a client-specific issue.

### Rows disappeared after a large write or OPTIMIZE

If row counts drop after a large write while the Delta log reports the expected count, investigate the runtime and Optimized Write path. On affected older runtimes, file-shuffling issues can appear only at scale rather than on small writes. Unexpected row loss isn't expected behavior.

To investigate or mitigate:

1. Upgrade to a supported Spark runtime that includes the applicable fix.
1. Test the affected job with Optimized Write disabled:

   ```python
   spark.conf.set("spark.databricks.delta.optimizeWrite.enabled", "false")
   ```

Disabling Optimized Write doesn't restore missing data. Validate the existing table before rerunning a write so you don't introduce duplicates.

If row loss persists after disabling Optimized Write and updating the runtime, collect the table name, runtime version, and before-and-after row counts, and contact Microsoft Support.

### DELETE followed by APPEND on a cached DataFrame loses rows

Performing a `DELETE` and then an append against a persisted or cached DataFrame can affect results if the cached source depends on files changed by the delete. A cached DataFrame isn't an independent snapshot because Spark can recompute cached partitions.

Recommended patterns instead of delete and append:

- For partition-level replacement, use an atomic overwrite with `replaceWhere`.
- For row-level upserts, use `MERGE`.
- If you use time travel with `versionAsOf` or `timestampAsOf` to pin a version, retain its underlying files. For independent input, materialize a separate staging table.

### DELTA_TRUNCATED_TRANSACTION_LOG or a missing _delta_log JSON file

An error such as `DeltaFileNotFoundException` or `DELTA_TRUNCATED_TRANSACTION_LOG`, for example, a missing `00000000000000000000.json` file, can mean the requested snapshot can't be reconstructed. Causes include manual deletion of files under `_delta_log`, an external process removing them, or historical log retention.

To investigate and recover:

- Never manually delete files under `_delta_log`. Let Delta's log retention manage log cleanup.
- Check whether the error affects only a historical version or also the latest snapshot.
- Preserve remaining files and assess recovery from a known-good source or independent backup. If rebuilding is necessary, recreate the table at a new location and validate it before replacing the original.

> [!WARNING]
> Don't drop the table or delete its directory as an initial recovery step. Preserve the remaining data and transaction log while you investigate or contact Microsoft Support.

### mergeSchema=false didn't raise an error when I expected it to

`mergeSchema=false` doesn't reject a write whose schema is compatible with the existing Delta table. Two common reasons it appears not to work are:

- The initial write was made in Parquet format, not Delta, so there's no Delta schema to enforce against.
- The schema was already evolved by an earlier `mergeSchema=true` write, so the new write matches and no error is expected.

To validate behavior, write to a fresh Delta table path and append a genuinely incompatible schema with `mergeSchema=false`.

### Concurrent update error on parallel jobs

When two jobs update the same Delta table concurrently and one fails with a concurrent-modification error, that's expected behavior. Delta's optimistic concurrency control rejects the conflicting writer so no data is silently lost. See the [MERGE concurrency guidance](#two-concurrent-merge-or-deleteupdate-jobs-failed-with-concurrentappendexception-or-concurrentdeletereadexception-why) for retry and partition-scoping recommendations.

## Identify expected behavior and errors

Start with: [Delta table maintenance in Microsoft Fabric](delta-lake-table-maintenance.md).

| Symptom | Expected? | What to do |
|---|---|---|
| `OPTIMIZE` barely reduced file count. | Expected if already optimized. | Verify file sizes are near the target. |
| `OPTIMIZE` raises `FetchFailedException`. | Execution failure; can be tunable. | Test `spark.databricks.delta.optimize.repartition.enabled=false`. |
| Can't time travel after `VACUUM`. | Expected if required files were removed. | Preserve an independent copy before vacuuming next time. |
| `VACUUM` warns about retention under 168 hours. | Safety check. | Keep safe retention; disable the check only in a controlled scenario. |
| `FileNotFoundException` after `VACUUM`. | Can indicate a stale reader snapshot. | Review retention and retry against the current snapshot if appropriate. |
| `VACUUM` didn't reclaim space after `DELETE`. | Expected with unresolved deletion vectors. | Run `OPTIMIZE` or purge, wait for retention, and then vacuum. |
| `ConcurrentAppendException` on parallel writes. | Optimistic concurrency. | Retry safely and scope writes to partitions. |
| A `MERGE` target row matched multiple source rows. | By design for ambiguous updates. | Deduplicate the source on the join key. |
| `MERGE` didn't add a new source column. | Auto-merge is off by default. | Enable schema auto-merge or use `ALTER TABLE` first. |
| Deletion vector purge failed but the job succeeded. | Purge is nonfatal. | Rerun maintenance and check the driver log. |
| Storage grows despite frequent maintenance. | Can reflect retention and write churn. | Reduce churn and account for Delta and OneLake retention. |
| Direct Lake reports too many Parquet files on F64. | 5,000-file guardrail. | Run `OPTIMIZE`, enable auto compaction, and review partition columns. |
| Intermittent Polars or delta-rs merge error. | Requires client and storage diagnosis. | Check client fixes, access, file availability, and fragmentation. |
| Row loss after a large write or `OPTIMIZE`. | Not expected. | Check runtime fixes and test with Optimized Write disabled. |
| Rows lost after delete and append on a cached DataFrame. | Cache-dependency issue. | Use `replaceWhere`, `MERGE`, or independent staged input. |
| `DELTA_TRUNCATED_TRANSACTION_LOG` or missing log JSON. | Log availability issue. | Preserve `_delta_log` and investigate recovery. |
| `mergeSchema=false` didn't raise an error. | Expected for a compatible schema. | Ensure the target is Delta and test with an incompatible schema. |
| Concurrent update error on parallel jobs. | Optimistic concurrency. | Retry safely and scope writes to partitions. |

## Related content

For more information, see the following resources:

- [Optimize Delta Lake tables with V-order](delta-optimization-and-v-order.md): `OPTIMIZE`, V-order, and control of V-order writes. V-order is disabled by default in new workspaces.
- [Delta table maintenance in Microsoft Fabric](delta-lake-table-maintenance.md): Maintenance operations and the default seven-day `VACUUM` retention. Portal and API requests fail below seven days unless the retention safety check is disabled.
- [Deletion vectors for Delta tables](delta-lake-deletion-vectors.md): Soft-delete behavior, runtime defaults, automatic purge above the 5% threshold, and `REORG TABLE ... APPLY (PURGE)`.
- [Understand Direct Lake storage and performance](../fundamentals/direct-lake-understand-storage.md): Why Delta table health and file counts matter.
- [Direct Lake overview](../fundamentals/direct-lake-overview.md#fabric-capacity-requirements): Per-capacity file and row-group limits, including 1,000 files for F32 and 5,000 for F64/P1.

If the issue continues after you follow this guidance, for example, if results still differ after disabling native execution or the core `OPTIMIZE` or `VACUUM` step fails, collect the table name, operation, complete error message, and approximate time in UTC, and then contact Microsoft Support.
