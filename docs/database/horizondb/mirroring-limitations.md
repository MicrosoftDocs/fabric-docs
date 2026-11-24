---
title: "Mirroring limitations for Microsoft Fabric HorizonDB"
description: Review eligibility, schema, freshness, and operational limitations for Fabric HorizonDB mirroring.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: concept-article
ai-usage: ai-assisted
---
# Mirroring limitations for Microsoft Fabric HorizonDB

Fabric HorizonDB mirroring is a public-preview integration. Eligibility and behavior depend on the table, key, type, DDL, and item limits available in your preview environment. Use synthetic data and verify the initial copy before evaluating freshness.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

This article describes contract boundaries that you should design for. Check the mirroring status experience for the specific reason that a table or column isn't eligible.

## Service boundaries

- Mirroring is asynchronous and doesn't provide transactionally current OneLake data.
- PostgreSQL health, mirroring health, and SQL analytics endpoint health are independent.
- Public preview doesn't provide a numeric freshness guarantee.
- Mirroring publishes a read-only analytical representation. It isn't a write target.
- Cross-workspace, cross-region, and private-network behavior is limited to the combinations explicitly released for Fabric HorizonDB.

## Table identity

A mirrored table needs a supported, stable row identity. Use a primary key for tables intended for mirroring.

Primary-key presence doesn't guarantee eligibility. The key's data types, width, nullability semantics, and later DDL must also be supported. Changing or removing a key can suspend mirroring or require reseeding.

Find tables without a primary key:

```sql
SELECT
    table_namespace.nspname AS schema_name,
    table_class.relname AS table_name
FROM pg_catalog.pg_class AS table_class
JOIN pg_catalog.pg_namespace AS table_namespace
  ON table_namespace.oid = table_class.relnamespace
LEFT JOIN pg_catalog.pg_constraint AS primary_key
  ON primary_key.conrelid = table_class.oid
 AND primary_key.contype = 'p'
WHERE table_class.relkind = 'r'
  AND table_namespace.nspname NOT IN ('pg_catalog', 'information_schema')
  AND primary_key.oid IS NULL
ORDER BY
    table_namespace.nspname,
    table_class.relname;
```

Use this query as a preparation check, not as proof of eligibility.

## Object and data-type boundaries

Only released ordinary table, column, and data-type combinations are eligible. Views, materialized views, foreign tables, temporary tables, unlogged tables, sequences, functions, procedures, and extension-owned objects aren't automatically mirrored merely because PostgreSQL can query them.

Inspect source column types:

```sql
SELECT
    column_info.table_schema,
    column_info.table_name,
    column_info.column_name,
    column_info.data_type,
    column_info.udt_schema,
    column_info.udt_name,
    column_info.is_nullable
FROM information_schema.columns AS column_info
WHERE column_info.table_schema NOT IN ('pg_catalog', 'information_schema')
ORDER BY
    column_info.table_schema,
    column_info.table_name,
    column_info.ordinal_position;
```

Compare the result with the current released mirroring type matrix. Don't infer support for extension types, domains, arrays, ranges, large values, or user-defined types from generic PostgreSQL support.

## DDL and schema evolution

Schema changes can require metadata processing, suspend a table, or start a new initial copy. Review the current contract before:

- Adding, altering, renaming, or dropping a column.
- Changing a primary key.
- Renaming, truncating, or dropping a table.
- Changing a column to or from an unsupported type.
- Moving a table between schemas.

Coordinate source changes with report, semantic-model, API, and downstream consumers. Mirroring doesn't guarantee that every schema change is propagated without consumer impact.

## Initial copy and reseed

Initial-copy duration depends on eligible data volume and available integration resources. Public preview doesn't promise a fixed completion time.

A table can require reseeding after:

- Loss of a usable change position.
- Retention overrun.
- Incompatible DDL or type conversion.
- A lineage change.
- A service repair that can't safely continue from the prior copy.

During a reseed, the previous analytical copy can be stale or unavailable according to the displayed state. Don't combine old and new lineage as though it were one current dataset.

## Transactions and workload

Long-running transactions delay the point at which committed changes become available to mirroring and can increase retained change volume. Large bursts of writes can increase lag.

Find long-running active transactions:

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

Don't terminate sessions solely because they appear in this query. Confirm application ownership and transaction impact first.

## Security boundaries

Only the database creator can connect to PostgreSQL in the current preview. That connection doesn't define access to the mirrored analytical copy. Configure and test security on the SQL analytics endpoint, semantic model, and report separately.

Don't mirror sensitive columns until the analytical access model is approved.

## Related content

- [Mirroring overview](mirroring-overview.md).
- [Monitor Fabric HorizonDB mirroring](mirroring-monitor.md).
- [Troubleshoot Fabric HorizonDB mirroring](mirroring-troubleshooting.md).
- [Fabric HorizonDB limitations](limitations.md).
