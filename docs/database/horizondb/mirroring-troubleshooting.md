---
title: "Troubleshoot Microsoft Fabric HorizonDB mirroring"
description: Diagnose missing, stale, suspended, or reseeding Fabric HorizonDB mirrored data.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: troubleshooting
ai-usage: ai-assisted
---
# Troubleshoot Microsoft Fabric HorizonDB mirroring

Fabric HorizonDB mirroring is independent from PostgreSQL database health. Start with the mirroring status for the affected table, preserve evidence, and avoid changing the source until you understand the failure.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Collect evidence

Record:

- Workspace, HorizonDB database, schema, and table.
- Approximate time the issue started.
- Database lifecycle state.
- Mirroring database-level and table-level state.
- Initial-copy, last-applied, lag, suspended, unsupported, or reseed information.
- Recent source DDL.
- Stable source and analytical counts or high-water marks.
- Operation, Copy job, or support correlation information.

Remove tokens, connection strings, personal data, and sensitive row values before sharing evidence.

## A table doesn't appear in the SQL analytics endpoint

1. Return to the workspace, find the database's associated mirroring item, and open its status experience.
1. Find the source table.
1. Check whether it is initializing, unsupported, suspended, or reseeding.
1. Confirm that it has a primary key:

   ```sql
   SELECT
       constraint_info.constraint_name,
       key_column.column_name,
       key_column.ordinal_position
   FROM information_schema.table_constraints AS constraint_info
   JOIN information_schema.key_column_usage AS key_column
     ON key_column.constraint_name = constraint_info.constraint_name
    AND key_column.constraint_schema = constraint_info.constraint_schema
   WHERE constraint_info.constraint_type = 'PRIMARY KEY'
     AND constraint_info.table_schema = '<schema-name>'
     AND constraint_info.table_name = '<table-name>'
   ORDER BY key_column.ordinal_position;
   ```

1. Inspect its column types:

   ```sql
   SELECT
       column_info.column_name,
       column_info.data_type,
       column_info.udt_schema,
       column_info.udt_name,
       column_info.is_nullable
   FROM information_schema.columns AS column_info
   WHERE column_info.table_schema = '<schema-name>'
     AND column_info.table_name = '<table-name>'
   ORDER BY column_info.ordinal_position;
   ```

1. Compare keys and types with the eligibility guidance for your preview.
1. After the initial copy completes, check the schema name in the generated SQL analytics endpoint. It can differ from the PostgreSQL name, such as a transformed `_public` schema.

Don't add or change a key on an active application table without assessing application and DDL impact.

## A column is missing

- Check whether the column type and value size are supported.
- Check whether the column was recently added, renamed, or altered.
- Check whether the table is still processing metadata or reseeding.
- Confirm the column's name and representation in the SQL analytics endpoint.
- Refresh downstream semantic-model or API metadata only after mirroring reports a compatible schema.

## Mirrored data is behind

1. Record a stable source high-water mark:

   ```sql
   SELECT
       count(*) AS source_rows,
       max(updated_at) AS source_latest_update
   FROM <schema-name>.<table-name>;
   ```

   Use a real source timestamp column. If the table doesn't have one, compare a stable key or a controlled test row.

1. Run an equivalent query against the SQL analytics endpoint.
1. Check mirroring lag and last-applied information.
1. Find long-running active transactions:

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

1. Check recent write volume, capacity state, dependency incidents, and schema changes.
1. Repeat the comparison after the source is stable.

Don't terminate a transaction solely to reduce mirroring lag. Confirm ownership and business impact first.

## Mirroring is suspended

Common categories include:

- The service can no longer continue from the last usable position.
- A retention boundary was exceeded.
- Source DDL or a data type is incompatible.
- Authorization or capacity is unavailable.
- Another lineage change requires reinitialization.

Preserve the error and last known good state. Correct only the condition identified by the status. If a reseed is required, wait for the supported repair workflow or contact support; don't manually alter service-owned extensions or mirroring metadata.

## A reseed doesn't complete

- Confirm that the source table remains eligible.
- Avoid additional disruptive DDL.
- Check for large or long-running transactions.
- Monitor per-table progress instead of only database readiness.
- Confirm capacity and dependency state.
- Escalate with the affected table, timing, progress, error, and correlation information.

Don't treat the previous analytical copy as current unless the status explicitly says it remains usable and identifies its staleness.

## The SQL analytics endpoint is available but data is stale

Endpoint availability doesn't prove data freshness. Check:

- The latest source timestamp represented in the data.
- Mirroring lag and last-applied information.
- Whether the table is suspended or reseeding.
- Whether the report or semantic model cached older metadata or results.

## PostgreSQL is healthy but mirroring fails

This condition is possible by design. Continue serving the operational application if its own health checks pass. Investigate mirroring identity, eligibility, capacity, position, and dependency status separately.

Don't restart, resize, or modify PostgreSQL as a generic mirroring repair.

## Contact support

Use the preview contact or feedback channel supplied in your invitation when:

- A service-managed extension or mirroring dependency is missing.
- A supported table remains suspended after the identified dependency recovers.
- Initial copy or reseed shows no progress and no actionable error.
- Status claims healthy but stable source and analytical high-water marks don't converge.
- A lineage change leaves conflicting analytical state.

Include sanitized evidence from the [collection checklist](#collect-evidence).

## Related content

- [Monitor Fabric HorizonDB mirroring](mirroring-monitor.md).
- [Mirroring limitations](mirroring-limitations.md).
- [Mirroring frequently asked questions](mirroring-faq.yml).
