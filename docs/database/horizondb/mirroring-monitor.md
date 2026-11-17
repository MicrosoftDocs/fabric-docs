---
title: "Monitor Microsoft Fabric HorizonDB mirroring"
description: Monitor initial copy, freshness, suspended tables, and reseed progress for Fabric HorizonDB mirroring.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ai-usage: ai-assisted
---
# Monitor Microsoft Fabric HorizonDB mirroring

Fabric HorizonDB mirroring has its own status and lifecycle. Monitor it independently from the PostgreSQL database, the SQL analytics endpoint, semantic models, and reports.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Open mirroring status

1. Return to the Fabric workspace.
1. Locate the mirroring-related item associated with the PostgreSQL database, and open its status experience.
1. Review database-level status.
1. Review each table's initial-copy, current, suspended, unsupported, or reseed state.
1. Record any last-applied, lag, row-count, or refresh information that the experience exposes.
1. Save the operation or support correlation information for unresolved failures.

Exact labels can change during public preview. Interpret the displayed details rather than relying only on a color or summary state.

## Status information to review

| Signal | What it tells you | What it doesn't prove |
|---|---|---|
| Initial copy complete | The first analytical representation was created | That the copy includes later source changes |
| Last applied position or time | Progress reported by the mirroring path | A numeric freshness guarantee |
| Lag | Difference measured by the integration | PostgreSQL database health |
| Unsupported table or column | The source doesn't meet the released eligibility contract | That the source table itself is invalid |
| Suspended | Mirroring can't currently continue for the affected scope | That the PostgreSQL database is unavailable |
| Reseed progress | A replacement analytical copy is being created | That the old copy is current |

## Validate source and analytical data

Use stable aggregates and high-water marks instead of comparing rapidly changing row sets.

On the PostgreSQL endpoint:

```sql
SELECT
    count(*) AS source_order_count,
    max(order_id) AS source_latest_order_id,
    max(created_at) AS source_latest_created_at
FROM horizon_sample.orders;
```

Run the PostgreSQL query as the database creator. Then run an equivalent query against the generated SQL analytics endpoint, using the schema name displayed there if it differs from `horizon_sample`. Record the time of both queries.

If the values differ:

1. Wait for active source transactions to commit.
1. Review mirroring lag and last-applied information.
1. Check whether the table is initializing or reseeding.
1. Confirm that recent DDL and data types remain eligible.
1. Repeat the comparison without changing the source data.

## Monitor source conditions

Check active transactions that can delay a consistent change boundary:

```sql
SELECT
    activity.pid,
    activity.usename,
    activity.application_name,
    activity.xact_start,
    clock_timestamp() - activity.xact_start AS transaction_age,
    activity.state
FROM pg_catalog.pg_stat_activity AS activity
WHERE activity.xact_start IS NOT NULL
  AND activity.pid <> pg_backend_pid()
ORDER BY activity.xact_start;
```

This query shows PostgreSQL sessions, not mirroring status. Use it as supporting evidence only.

## Respond to common states

| State | Response |
|---|---|
| Initial copy in progress | Allow the copy to finish, limit disruptive DDL, and monitor per-table progress. |
| Healthy but behind | Check workload volume, long transactions, dependency state, and consumer freshness requirements. |
| Unsupported | Open the table details, compare keys and types with the released eligibility matrix, and redesign the analytical projection if required. |
| Suspended | Preserve the error, correlation information, source DDL history, and last known good position before changing the source. |
| Reseeding | Treat the analytical data as stale or unavailable according to the displayed state, and wait for completion before validating freshness. |
| Database healthy, mirroring failed | Troubleshoot the integration. Don't restart or modify PostgreSQL without evidence that the database caused the failure. |

## Establish an operational checklist

For important analytical consumers, record:

- The mirrored tables they depend on.
- Their maximum acceptable data age.
- The source timestamp displayed to users.
- The response when a table is suspended or reseeding.
- The owner for PostgreSQL, mirroring, semantic model, and report incidents.
- The evidence required before support escalation.

## Related content

- [Troubleshoot Fabric HorizonDB mirroring](mirroring-troubleshooting.md).
- [Mirroring limitations](mirroring-limitations.md).
- [Query the SQL analytics endpoint](query-sql-analytics-endpoint.md).
