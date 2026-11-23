---
title: "Tutorial: Query mirrored Fabric data from Microsoft Fabric HorizonDB"
description: Import mirrored tables and a separate warehouse source, inspect pushdown, and join local PostgreSQL data with Fabric signals.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Tutorial: Query mirrored Fabric data from Microsoft Fabric HorizonDB

In this tutorial step, you use the service-managed `pg_fabric_fdw` integration to query the Contoso mirrored data from the Fabric HorizonDB PostgreSQL endpoint. The imported foreign tables contain metadata only. The rows remain in the remote mirrored source.

You also inspect which operations run in Fabric and join a local PostgreSQL table with a remote foreign table. This is the federated queries capability of [Federated Analytics](federated-analytics-overview.md).

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Complete [Use the SQL analytics endpoint](tutorial-use-analytics-endpoint.md).
- Confirm that mirroring is healthy enough for `customers` and `orders` to appear in the SQL analytics endpoint.
- Sign in as the database creator, with permission to create a warehouse and read its data. Other users and principals can't connect to PostgreSQL in the current preview.

## Verify the managed integration

Open a query against the `contoso-orders-db` PostgreSQL endpoint, and run:

```sql
SELECT
    extension.extname,
    extension.extversion
FROM pg_catalog.pg_extension AS extension
WHERE extension.extname = 'pg_fabric_fdw';
```

Verify the default foreign server:

```sql
SELECT
    server.srvname,
    server.srvoptions
FROM pg_catalog.pg_foreign_server AS server
WHERE server.srvname = 'fabric_dw';
```

Each query should return one row. The extension and `fabric_dw` server are service-managed. Don't recreate, alter, or drop them.

The wrapper sends translated queries to Fabric over a native Tabular Data Stream (TDS) connection. You don't need an Open Database Connectivity (ODBC) driver or a separate PostgreSQL extension installation. If the managed server is missing, verify provisioning and integration readiness rather than creating a replacement.

## Import the mirrored tables

Create a customer-owned schema:

```sql
CREATE SCHEMA IF NOT EXISTS fabric_mirror;
```

Use the remote schema name shown by the SQL analytics endpoint. If it is `horizon_sample`, run:

```sql
IMPORT FOREIGN SCHEMA horizon_sample
    LIMIT TO (customers, orders)
    FROM SERVER fabric_dw
    INTO fabric_mirror;
```

If the endpoint shows another schema name, replace `horizon_sample` in the `IMPORT FOREIGN SCHEMA` statement. Importing the schema reads the remote catalog and creates PostgreSQL column names and type mappings. It doesn't copy rows into Fabric HorizonDB. The local name `fabric_mirror` doesn't need to match the remote schema.

`LIMIT TO` keeps this import limited to the two tutorial tables. Quote names if the source uses mixed case. If import reports a collation warning, verify that it still finishes successfully, and validate text comparisons before relying on equivalent PostgreSQL results.

## Inspect and query the foreign tables

Confirm the imported objects:

```sql
SELECT
    foreign_table.foreign_table_schema,
    foreign_table.foreign_table_name,
    foreign_table.foreign_server_name
FROM information_schema.foreign_tables AS foreign_table
WHERE foreign_table.foreign_table_schema = 'fabric_mirror'
ORDER BY foreign_table.foreign_table_name;
```

Run a bounded query:

```sql
SELECT
    order_row.order_reference,
    order_row.order_date,
    order_row.status,
    order_row.total
FROM fabric_mirror.orders AS order_row
ORDER BY order_row.order_date DESC, order_row.order_reference
LIMIT 20;
```

After mirroring catches up, the unchanged tutorial data returns three orders.

## Confirm aggregate pushdown

Plan an aggregate before executing it:

```sql
EXPLAIN (VERBOSE, COSTS OFF)
SELECT
    order_row.status,
    count(*) AS order_count,
    sum(order_row.total) AS order_total
FROM fabric_mirror.orders AS order_row
GROUP BY order_row.status
ORDER BY order_row.status;
```

Find the `Fabric SQL` line. It shows the exact T-SQL planned for Fabric. If the aggregate pushes down fully, that line includes `GROUP BY`, `SUM`, and `COUNT_BIG`, the translation of PostgreSQL `count(*)`. A `Foreign Scan` returns the grouped rows rather than all input orders.

With the default remote-plan setting, `EXPLAIN` without `ANALYZE` plans locally without contacting Fabric. It doesn't prove that the remote endpoint is reachable. A local `Aggregate` or `Sort` node means PostgreSQL performs that operation after receiving rows from Fabric.

Validate a bounded aggregate:

```sql
SELECT
    order_row.status,
    count(*) AS order_count,
    sum(order_row.total) AS order_total
FROM fabric_mirror.orders AS order_row
GROUP BY order_row.status
ORDER BY order_row.status;
```

Compare the results with the same aggregate on the SQL analytics endpoint. Small differences can occur while mirroring applies committed changes.

## Join local customers with mirrored orders

Use the local operational customer table to select customers, and read their orders from Fabric:

```sql
EXPLAIN (VERBOSE, COSTS OFF)
SELECT
    customer.customer_name,
    order_row.order_reference,
    order_row.total
FROM horizon_sample.customers AS customer
JOIN fabric_mirror.orders AS order_row
  ON order_row.customer_id = customer.customer_id
WHERE customer.segment = 'Enterprise'
ORDER BY order_row.order_reference
LIMIT 20;
```

Remove `EXPLAIN (VERBOSE, COSTS OFF)` to execute the query. For each matching local customer, the result contains the mirrored orders available at query time. A new operational order might not appear until mirroring catches up.

The join can't run entirely in Fabric because one input is local. PostgreSQL might choose a parameterized foreign scan for selected customer keys or a remote scan followed by a local join. Read the plan instead of assuming that only matching rows cross the connection.

## Use federation safely

- Foreign tables are read-only during public preview.
- Select only required columns, and use selective filters and limits.
- Use `EXPLAIN (VERBOSE)` to check filters, aggregates, and joins before running larger queries.
- Validate identifiers, types, null behavior, timestamps, and aggregates against the source.
- Don't assume integer averages, trailing spaces, `LIKE` patterns, or UUID order behave identically on both engines.
- Treat PostgreSQL, mirroring, SQL analytics endpoint, and federation health independently.
- Use a Copy job when the application needs a stable local copy.

The separate how-to shows [cross-database imports and transfer guardrails](query-fabric-data.md).

## Create a warehouse source

Create a separate warehouse for the analytical signals used by this tutorial and the next Copy job step. Don't create the table in the SQL analytics endpoint copy of your database, that endpoint is read-only.

1. On the HorizonDB PostgreSQL endpoint, record the generated IDs:

   ```sql
   SELECT customer_id, customer_name
   FROM horizon_sample.customers
   ORDER BY customer_id;
   ```

1. In your tutorial workspace, create a new Fabric Data Warehouse item named `contoso-signals-warehouse`.
1. In the warehouse's T-SQL editor, run the following script. The example uses IDs `1`, `2`, and `3`; replace them with the IDs returned for your sample customers before running it.

   ```sql
   CREATE TABLE dbo.customer_signals (
       customer_id bigint NOT NULL,
       risk_score decimal(5, 2) NOT NULL,
       recommended_action varchar(200) NOT NULL,
       calculated_at datetime2(6) NOT NULL,
       load_batch_id varchar(50) NOT NULL
   );

   INSERT INTO dbo.customer_signals (
       customer_id, risk_score, recommended_action,
       calculated_at, load_batch_id
   )
   VALUES
       (1, 82.00, 'Prioritize account review',
        SYSUTCDATETIME(), 'preview-demo-001'),
       (2, 64.00, 'Monitor engagement',
        SYSUTCDATETIME(), 'preview-demo-001'),
       (3, 91.00, 'Escalate renewal risk',
        SYSUTCDATETIME(), 'preview-demo-001');
   ```

   Run this setup once in the dedicated tutorial warehouse. On a rerun, inspect existing data instead of appending the same batch again. The timestamp uses six fractional-second digits for federation compatibility.

1. Open the warehouse's **Settings** > **Connection strings**. Copy its SQL connection string host and SQL database name; the SQL database name can differ from `contoso-signals-warehouse`.

## Import and query warehouse signals

Return to the HorizonDB PostgreSQL editor. Replace both connection placeholders with values from your warehouse:

```sql
CREATE SERVER customer_signals_dw
    FOREIGN DATA WRAPPER pg_fabric_fdw
    OPTIONS (
        endpoint '<warehouse-sql-endpoint>',
        database '<warehouse-sql-database-name>'
    );

CREATE SCHEMA IF NOT EXISTS fabric_sales;

IMPORT FOREIGN SCHEMA dbo
    LIMIT TO (customer_signals)
    FROM SERVER customer_signals_dw
    INTO fabric_sales;
```

`customer_signals_dw` is customer-owned. Don't change or recreate the managed `fabric_dw` server.

Join local customers with the warehouse signals:

```sql
SELECT
    customer.customer_id,
    customer.customer_name,
    customer.segment,
    signal.risk_score,
    signal.recommended_action,
    signal.calculated_at
FROM horizon_sample.customers AS customer
JOIN fabric_sales.customer_signals AS signal
  ON signal.customer_id = customer.customer_id
WHERE signal.risk_score >= 70
ORDER BY signal.risk_score DESC
LIMIT 20;
```

With the sample mappings, the result contains Adventure Works and Contoso Retail. The application stays connected to PostgreSQL while the signals remain in the warehouse. Keep this warehouse and foreign-table metadata for the Copy job and application steps.

## Expected outcome

The `fabric_mirror` schema exposes mirrored Contoso tables, and `fabric_sales` exposes customer signals from a separate warehouse. You can inspect pushdown and join local operational data with either source.

## Next step

> [!div class="nextstepaction"]
> [Load Fabric data into Fabric HorizonDB with a Copy job](tutorial-load-fabric-data.md)

## Related content

- [Query Fabric data from a HorizonDB database](query-fabric-data.md).
- [Federated query reference](federated-query-reference.md).
- [Troubleshoot federated queries](federated-query-troubleshooting.md).
- [Federated Analytics overview](federated-analytics-overview.md).
