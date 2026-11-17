---
title: "Query Microsoft Fabric HorizonDB with the SQL editor"
description: Use the Fabric SQL editor and object explorer to run PostgreSQL queries against Fabric HorizonDB.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ms.search.form: Fabric HorizonDB SQL editor, PostgreSQL query editor
ai-usage: ai-assisted
---
# Query Microsoft Fabric HorizonDB with the SQL editor

The SQL editor for Fabric HorizonDB runs PostgreSQL SQL against the operational PostgreSQL endpoint. Use it to create and inspect customer-owned schemas, query data, test transactions, and review PostgreSQL errors.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Access to the Fabric workspace and HorizonDB database.
- Sign-in as the Microsoft Entra user who created the database.

Other users and principals can't connect to PostgreSQL in the current preview, even if they can open the item. See [Validate PostgreSQL access](configure-postgresql-access-controls.md).

## Open a query

1. Open the HorizonDB database in the Fabric portal.
1. Select **New Query**.
1. Confirm that the editor targets the operational database, not the SQL analytics endpoint.
1. Run:

   ```sql
   SELECT
       current_database() AS database_name,
       current_user AS signed_in_user,
       pg_backend_pid() AS session_id,
       clock_timestamp() AS connected_at;
   ```

The result should identify the selected database and the effective identity for your Microsoft Entra principal.

Paste the query, select the full statement, and select **Run**. Confirm that one row appears in the results grid, and review the messages area for warnings or errors.

## Work with statements

The editor can run a selected statement or the current query text according to the controls shown in the released experience. To make scripts predictable:

- End statements with semicolons.
- Use PostgreSQL syntax and data types.
- Qualify customer tables with their schema.
- Use lowercase, unquoted identifiers unless case sensitivity is intentional.
- Avoid running destructive statements together with unrelated queries.
- Add `ORDER BY` when row order matters.
- Add a selective `WHERE` clause and a reasonable `LIMIT` while exploring large tables.

For example:

```sql
SELECT
    order_row.order_reference,
    customer.customer_name,
    order_row.status,
    order_row.total
FROM horizon_sample.orders AS order_row
JOIN horizon_sample.customers AS customer
  ON customer.customer_id = order_row.customer_id
WHERE order_row.status IN ('open', 'processing')
ORDER BY order_row.order_date DESC, order_row.order_reference
LIMIT 100;
```

## View results and messages

Successful row-returning statements display a result grid. Review:

- Column names and PostgreSQL types.
- The number of rows returned.
- Null values and numeric precision.
- Server notices or warnings.
- Execution status and elapsed time when available.

An empty result set can be correct. It isn't proof that the statement failed. Conversely, a result grid doesn't prove that a separate mirroring or Copy job operation is healthy.

PostgreSQL errors typically identify an error category and position. Read the complete message before changing the statement. Common causes include a missing schema qualification, quoted identifier case, an invalid cast, a constraint violation, or insufficient privileges.

## Use explicit transactions

The editor session can remain open between statements, so make transaction boundaries explicit for related changes:

```sql
BEGIN;

UPDATE horizon_sample.orders
SET status = 'processing'
WHERE order_reference = 'ORD-1001'
  AND status = 'open';

SELECT
    order_reference,
    status
FROM horizon_sample.orders
WHERE order_reference = 'ORD-1001';

COMMIT;
```

Use `ROLLBACK;` instead of `COMMIT;` when validation fails.

Don't leave a transaction open. An idle transaction can retain locks and prevent maintenance. If a connection drops while `COMMIT` is in progress, the outcome can be indeterminate; reconnect and verify the business record before replaying the change.

## Explore database objects

Use the object explorer to browse schemas, tables, views, functions, and supported extensions. After DDL:

1. Refresh the relevant schema or object group.
1. Expand the customer-owned schema.
1. Inspect columns, constraints, and indexes.
1. Confirm that the displayed object matches the database and schema used by the query.

If the explorer is stale, verify the object with PostgreSQL catalogs:

```sql
SELECT
    table_schema,
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'horizon_sample'
ORDER BY table_name;
```

## Inspect query activity

To inspect your current session:

```sql
SELECT
    pid,
    usename,
    application_name,
    state,
    xact_start,
    query_start,
    wait_event_type,
    wait_event
FROM pg_catalog.pg_stat_activity
WHERE pid = pg_backend_pid();
```

Visibility into other sessions and their query text depends on PostgreSQL privileges. Query text can contain sensitive values; don't paste unreviewed output into issues or screenshots.

## Handle long-running work

- Keep the query tab open while a statement is running unless the editor confirms that closing it doesn't cancel the server operation.
- Use a separate session to inspect `pg_stat_activity` and `pg_blocking_pids()` when you have permission.
- Cancel only the intended statement. Don't terminate another user's session without explicit authorization.
- After a browser or network interruption, verify whether a data-changing statement committed before running it again.

The service can pause after idle time. An open editor tab doesn't guarantee that a PostgreSQL session remains usable indefinitely.

## Troubleshoot the editor

| Symptom | Resolution |
|---|---|
| Sign-in fails | Refresh the Fabric session, verify the tenant and workspace permission, and retry once. |
| Query fails with permission denied | Confirm that you're the database creator, check object ownership, and verify that the operation is supported. |
| Relation doesn't exist | Verify the database, schema, spelling, and quoted identifier case. |
| Object explorer doesn't show a new table | Commit the DDL if needed and refresh the explorer. |
| Query waits | Check blocking sessions, lifecycle state, and whether the database is resuming. |
| Connection resets | Reopen the query, start a new transaction, and safely reconcile any previous write. |
| A query works on the PostgreSQL endpoint but not the SQL analytics endpoint | The endpoints have different engines, permissions, freshness, and supported operations. |

## Related content

- [Create a table](create-table.md).
- [Query Fabric HorizonDB](query.md).
- [Monitor Fabric HorizonDB](monitor.md).
- [Troubleshoot Fabric HorizonDB](troubleshoot.md).
