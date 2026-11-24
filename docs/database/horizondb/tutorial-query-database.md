---
title: "Tutorial: Query and inspect Microsoft Fabric HorizonDB"
description: Query the Fabric HorizonDB tutorial database and review object, monitoring, security, and integration state.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Tutorial: Query and inspect Microsoft Fabric HorizonDB

In this tutorial step, you query the HorizonDB database, inspect PostgreSQL metadata, and review basic monitoring, security, and integration state.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Complete [Create tables and load data](tutorial-ingest-data.md).
- Open `contoso-orders-db`.
- Sign in as the database creator. Other users and principals can't connect to PostgreSQL in the current preview.

## Query open and processing orders

Open a new query against the PostgreSQL endpoint, and run:

```sql
SELECT
    order_row.order_reference,
    customer.customer_name,
    customer.segment,
    order_row.order_date,
    order_row.status,
    order_row.total
FROM horizon_sample.orders AS order_row
JOIN horizon_sample.customers AS customer
  ON customer.customer_id = order_row.customer_id
WHERE order_row.status IN ('open', 'processing')
ORDER BY order_row.order_date DESC, order_row.order_reference;
```

The result contains `ORD-1001` and `ORD-1002`.

## Aggregate orders by customer segment

Run:

```sql
SELECT
    customer.segment,
    count(order_row.order_id) AS order_count,
    coalesce(sum(order_row.total), 0) AS order_total
FROM horizon_sample.customers AS customer
LEFT JOIN horizon_sample.orders AS order_row
  ON order_row.customer_id = customer.customer_id
GROUP BY customer.segment
ORDER BY customer.segment;
```

Expected results:

| Segment | Order count | Order total |
|---|---:|---:|
| Commercial | 1 | 425.50 |
| Enterprise | 2 | 2230.25 |

## Test an update in a transaction

Use an explicit transaction so that the tutorial data remains unchanged:

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

ROLLBACK;
```

The query inside the transaction reports `processing`. After `ROLLBACK`, `ORD-1001` remains `open`.

Don't leave transactions open in the editor. Idle transactions can retain locks. If a connection drops while a commit is in progress, reconnect and verify the business record before replaying a write.

## Inspect objects and extensions

Refresh the object explorer, expand `horizon_sample`, and confirm that both tutorial tables are present.

List the same objects with SQL:

```sql
SELECT
    table_schema,
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'horizon_sample'
ORDER BY table_name;
```

Review installed extensions:

```sql
SELECT
    extension.extname AS extension_name,
    extension.extversion AS installed_version,
    namespace.nspname AS schema_name
FROM pg_catalog.pg_extension AS extension
JOIN pg_catalog.pg_namespace AS namespace
  ON namespace.oid = extension.extnamespace
ORDER BY extension.extname;
```

The service manages its automatically created extensions. Don't create, drop, replace, or alter them.

If you plan to query an eligible Fabric source, verify the federation extension:

```sql
SELECT
    extname,
    extversion
FROM pg_catalog.pg_extension
WHERE extname = 'pg_fabric_fdw';
```

You use this managed integration later in [Query mirrored Fabric data from Fabric HorizonDB](tutorial-query-fabric-data.md).

## Review basic monitoring

Run this PostgreSQL-native database statistics query:

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

The query returns one row for the current database. Counters can reset, lag, or be unavailable while the database is paused. Missing telemetry isn't the same as zero activity.

Inspect your current session:

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

Visibility into other sessions and full query text depends on PostgreSQL privileges. Query text can contain sensitive values, so don't paste unreviewed output into screenshots or support requests.

For broader monitoring guidance, see [Monitor Fabric HorizonDB](monitor.md).

## Review authentication and authorization

Run:

```sql
SELECT
    current_user AS signed_in_user,
    session_user,
    has_schema_privilege(current_user, 'horizon_sample', 'USAGE')
        AS can_use_sample_schema,
    has_table_privilege(
        current_user,
        'horizon_sample.customers',
        'SELECT'
    ) AS can_read_customers,
    has_table_privilege(
        current_user,
        'horizon_sample.orders',
        'SELECT'
    ) AS can_read_orders;
```

Confirm that the identity represents your Microsoft Entra principal and that the required checks return `true`.

Sharing the database item doesn't enable other users or principals to connect to PostgreSQL. It also doesn't grant superuser or host access. Review [Authentication](authentication.md), [Authorization](authorization.md), and [Validate PostgreSQL access](configure-postgresql-access-controls.md).

For an optional desktop exercise, select **Visual Studio Code** in the Fabric toolbar, open the connection, choose **Entra Auth**, and sign in as the creator. Refresh the PostgreSQL **Connections** tree after creating objects. See [Connect with Visual Studio Code](connect.md#connect-with-visual-studio-code).

## Review integration state

Open the database's integration or mirroring experience. Confirm that it doesn't report a failed dependency before the next step. Initial-copy progress can continue after PostgreSQL becomes ready.

PostgreSQL health, mirroring health, SQL analytics endpoint health, federation health, and Copy job health are independent.

## Troubleshoot queries

| Symptom | Resolution |
|---|---|
| Authentication succeeds but a query is denied | Confirm the creator's identity, object ownership, and supported operation. |
| A relation isn't found | Verify the database, schema qualification, spelling, and quoted identifier case. |
| The explorer doesn't show a table | Refresh it and verify the object through `information_schema`. |
| A query waits | Review lifecycle state, your transaction state, and blocking sessions if you have permission. |
| A connection resets | Reopen the query and safely reconcile any prior write before retrying. |

## Next step

> [!div class="nextstepaction"]
> [Use the SQL analytics endpoint](tutorial-use-analytics-endpoint.md)

## Related content

- [Query Fabric HorizonDB](query.md).
- [Use the SQL editor](query-editor.md).
- [Security overview](security-overview.md).
