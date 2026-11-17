---
title: "Query Microsoft Fabric HorizonDB"
description: Run PostgreSQL queries that filter, join, aggregate, and safely update sample data in Fabric HorizonDB.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ms.search.form: Fabric HorizonDB query, PostgreSQL SQL editor
ai-usage: ai-assisted
---
# Query Microsoft Fabric HorizonDB

Use PostgreSQL SQL to query the operational data in Fabric HorizonDB. This article uses the `horizon_sample` schema created by the sample-data quickstart.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- A HorizonDB database.
- The data from [Load sample data](load-sample-data.md), or equivalent tables of your own.
- Sign-in as the database creator, the only identity that can connect to PostgreSQL in the current preview.

## Inspect rows

Start with a bounded, ordered result:

```sql
SELECT
    order_reference,
    order_date,
    status,
    total
FROM horizon_sample.orders
ORDER BY order_date DESC, order_reference
LIMIT 100;
```

PostgreSQL doesn't guarantee row order without `ORDER BY`.

## Join customers and orders

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
ORDER BY order_row.order_reference;
```

Schema qualification makes the target unambiguous and avoids relying on `search_path`.

## Filter with parameters

Applications should pass values as driver parameters. In an interactive query, you can use a prepared statement:

```sql
PREPARE orders_by_status (text) AS
SELECT
    order_reference,
    order_date,
    total
FROM horizon_sample.orders
WHERE status = $1
ORDER BY order_date DESC;

EXECUTE orders_by_status ('open');

DEALLOCATE orders_by_status;
```

Prepared-statement lifetime is tied to the session. Don't assume it survives pause or a disruptive transition.

## Aggregate data

```sql
SELECT
    customer.segment,
    count(order_row.order_id) AS order_count,
    coalesce(sum(order_row.total), 0) AS order_total,
    coalesce(avg(order_row.total), 0) AS average_order_total
FROM horizon_sample.customers AS customer
LEFT JOIN horizon_sample.orders AS order_row
  ON order_row.customer_id = customer.customer_id
GROUP BY customer.segment
ORDER BY customer.segment;
```

The left join keeps a segment in the result even when a customer has no orders.

## Analyze a query plan

Use `EXPLAIN` to inspect the planned operations without executing the query:

```sql
EXPLAIN (COSTS, VERBOSE)
SELECT
    order_reference,
    order_date,
    total
FROM horizon_sample.orders
WHERE customer_id = 1
ORDER BY order_date DESC;
```

Use `EXPLAIN (ANALYZE, BUFFERS)` carefully because it executes the statement. Don't use `ANALYZE` on a data-changing statement unless you intentionally want the change and wrap it in an appropriate transaction.

## Update data in a transaction

```sql
BEGIN;

UPDATE horizon_sample.orders
SET status = 'processing'
WHERE order_reference = 'ORD-1001'
  AND status = 'open'
RETURNING order_reference, status;

COMMIT;
```

The status predicate makes the transition conditional. If the command returns no rows, another session or a previous run might already have changed the order.

For retryable application workflows, use stable business keys and idempotent state transitions. Don't blindly replay a transaction after losing the connection during commit.

## Query metadata

Find customer tables:

```sql
SELECT
    schemaname AS schema_name,
    tablename AS table_name,
    tableowner AS table_owner
FROM pg_catalog.pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY schemaname, tablename;
```

Find the largest customer tables:

```sql
SELECT
    statistics.schemaname AS schema_name,
    statistics.relname AS table_name,
    pg_total_relation_size(statistics.relid) AS total_bytes,
    pg_size_pretty(pg_total_relation_size(statistics.relid)) AS total_size
FROM pg_catalog.pg_statio_user_tables AS statistics
ORDER BY total_bytes DESC
LIMIT 20;
```

## Troubleshoot query results

| Symptom | Check |
|---|---|
| No rows | Verify filters, transaction visibility, and that sample data was committed. |
| Relation doesn't exist | Verify the database, schema, name, and quoted identifier case. |
| Permission denied | Confirm that you're the database creator, inspect object ownership, and verify that the operation is supported. |
| Query is blocked | Inspect `pg_stat_activity` and `pg_blocking_pids()` if permitted. |
| Data differs from the SQL analytics endpoint | Mirroring is asynchronous; compare timestamps and mirroring status. |
| Connection fails after idle time | Reconnect with bounded retry while the database resumes. |

## Next step

[Connect from Python](connect-python.md).

## Related content

- [Query with the SQL editor](query-editor.md).
- [Monitor Fabric HorizonDB](monitor.md).
- [PostgreSQL SELECT](https://www.postgresql.org/docs/current/sql-select.html).
