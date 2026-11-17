---
title: "Monitor Microsoft Fabric HorizonDB"
description: Monitor Fabric HorizonDB lifecycle, compute, PostgreSQL activity, storage, and integration health.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: concept-article
ms.search.form: Fabric HorizonDB monitoring, PostgreSQL performance
ai-usage: ai-assisted
---
# Monitor Microsoft Fabric HorizonDB

Monitor Fabric HorizonDB by combining Fabric item and capacity state with PostgreSQL diagnostic views. No single signal describes database, mirroring, federation, and Copy job health.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Monitoring controls and status can vary by environment. Use the information exposed by your database item, mirroring experience, and Copy job run history; don't assume dashboard parity with another service. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Monitor separate health dimensions

Review these dimensions independently:

| Dimension | Examples |
|---|---|
| Database lifecycle | Provisioning, ready, scaling, pausing, paused, resuming, maintenance, failed, or degraded. |
| Compute | Current, target, requested maximum, effective maximum, and whether a transition is pending or constrained. |
| PostgreSQL workload | Connections, transactions, waits, blocking, temporary I/O, cache behavior, and table size. |
| Mirroring | Initial copy, catching up, healthy, suspended, lag, or reseed required. |
| Federation | Remote authorization, foreign-server metadata, bounded query behavior, and remote endpoint health. |
| Copy job | Source read, target write, row validation, retries, and publish status. |
| Capacity | Item and operation consumption in the Fabric Capacity Metrics experience. |

A ready PostgreSQL endpoint doesn't prove that an integration is healthy. A healthy SQL analytics endpoint can still be behind the operational database.

## Review item and operation state

Open the HorizonDB database and review the current lifecycle and most recent operation. For an asynchronous operation, preserve:

- Operation ID.
- Requested and effective state.
- Current stage.
- Last update time.
- Retry guidance.
- Request or correlation ID.

Don't treat a client timeout as operation failure. Reopen the same item or operation before submitting a duplicate mutation.

## Monitor database activity

Use PostgreSQL catalog views to inspect activity while connected as the database creator. Other users and principals can't connect in the current preview.

### Database statistics

```sql
SELECT
    datname AS database_name,
    numbackends AS active_connections,
    xact_commit,
    xact_rollback,
    blks_read,
    blks_hit,
    temp_files,
    temp_bytes,
    deadlocks,
    stats_reset
FROM pg_catalog.pg_stat_database
WHERE datname = current_database();
```

Use deltas over a known interval for cumulative counters. Check `stats_reset` before comparing two observations.

### Current sessions

```sql
SELECT
    pid,
    usename,
    application_name,
    client_addr,
    state,
    wait_event_type,
    wait_event,
    xact_start,
    query_start,
    age(clock_timestamp(), query_start) AS query_duration,
    left(query, 200) AS query_preview
FROM pg_catalog.pg_stat_activity
WHERE datname = current_database()
  AND pid <> pg_backend_pid()
ORDER BY query_start NULLS LAST;
```

Visibility depends on PostgreSQL privileges. Query text can contain sensitive data.

### Blocked sessions

```sql
SELECT
    activity.pid AS blocked_pid,
    activity.usename AS blocked_user,
    activity.wait_event_type,
    activity.wait_event,
    pg_blocking_pids(activity.pid) AS blocking_pids,
    age(clock_timestamp(), activity.query_start) AS blocked_duration,
    left(activity.query, 200) AS blocked_query
FROM pg_catalog.pg_stat_activity AS activity
WHERE activity.datname = current_database()
  AND cardinality(pg_blocking_pids(activity.pid)) > 0
ORDER BY blocked_duration DESC;
```

Don't cancel or terminate another user's session without authorization and an understanding of the transaction impact.

### Largest customer tables

```sql
SELECT
    statistics.schemaname AS schema_name,
    statistics.relname AS table_name,
    pg_total_relation_size(statistics.relid) AS total_bytes,
    pg_size_pretty(pg_total_relation_size(statistics.relid)) AS total_size,
    pg_size_pretty(pg_relation_size(statistics.relid)) AS table_size,
    pg_size_pretty(
        pg_total_relation_size(statistics.relid)
        - pg_relation_size(statistics.relid)
    ) AS related_size
FROM pg_catalog.pg_statio_user_tables AS statistics
ORDER BY total_bytes DESC
LIMIT 20;
```

## Interpret telemetry carefully

- PostgreSQL statistics can reset or evict older entries.
- Service samples can arrive late.
- A paused database can't answer a live catalog query.
- Missing values aren't zero values.
- Elapsed execution time isn't exact CPU time.
- Buffer and temporary-file counts aren't exact memory attribution.
- The performance view isn't the billing ledger.

Use the Fabric Capacity Metrics experience for authoritative capacity consumption. Correlate it with lifecycle and workload evidence by item, operation, and time range.

## Optional statement diagnostics

Use statement-level views only when the released service has installed the required extension and your identity has permission:

```sql
SELECT
    extname,
    extversion
FROM pg_catalog.pg_extension
WHERE extname = 'pg_stat_statements';
```

Don't try to install a diagnostic extension merely because it appears in `pg_available_extensions`. Fabric HorizonDB uses a curated extension catalog.

## Build a troubleshooting record

For an issue, collect:

- UTC timestamp and time range.
- Database lifecycle state.
- Available compute controls and the state displayed in your preview.
- Sanitized session, blocking, or table-size evidence.
- Relevant integration state.
- Capacity metric time range.
- Operation, request, and correlation IDs.
- Expected and actual behavior.

Remove tokens, complete connection strings, real data values, and unreviewed query text.

## Related content

- [Usage reporting](usage-reporting.md).
- [Control compute usage](control-compute-usage.md).
- [Troubleshoot Fabric HorizonDB](troubleshoot.md).
