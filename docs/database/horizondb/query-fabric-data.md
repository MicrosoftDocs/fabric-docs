---
title: "Query Fabric data from a HorizonDB database"
description: Import Fabric foreign tables, query across databases, inspect query pushdown, and control data transfers with pg_fabric_fdw.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ai-usage: ai-assisted
---
# Query Fabric data from a HorizonDB database

Federated queries are a [Federated Analytics](federated-analytics-overview.md) capability in Microsoft Fabric HorizonDB. Use the service-managed `pg_fabric_fdw` extension to query supported warehouses and SQL analytics endpoints with a PostgreSQL query. You can import Fabric objects as PostgreSQL foreign tables by using the `IMPORT FOREIGN SCHEMA` command, so an application connected to a HorizonDB database can join operational rows with Fabric data without storing a local copy.

The wrapper translates eligible PostgreSQL queries into T-SQL and sends them to Fabric over a native Tabular Data Stream (TDS) connection. Fabric runs those operations and returns the results. You don't need to rewrite your application queries in T-SQL or configure an Open Database Connectivity (ODBC) driver or data source name (DSN).

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

Foreign tables are read-only. `INSERT`, `UPDATE`, `DELETE`, `MERGE`, `COPY` into a foreign table, and row-locking queries aren't supported. Use [data delivery with a Copy job](load-fabric-data-copy-job.md) when an application needs data stored in local HorizonDB database tables.

## Prerequisites

- A HorizonDB database with the federation integration enabled.
- Sign-in as the database creator, with Microsoft Entra permission to read the Fabric source. Other users and principals can't connect to PostgreSQL in the current preview.
- A healthy supported warehouse or SQL analytics endpoint, such as the SQL analytics endpoint for mirrored data.
- The remote database, schema, and table names.
- Permission to create the local schema and foreign-table metadata, and the required schema `USAGE` and object privileges.

The examples use the mirrored `horizon_sample.customers` and `horizon_sample.orders` tables from [Create tables](create-table.md) and [Load sample data](load-sample-data.md). The warehouse example uses a separate `sales_analytics` warehouse with a `dbo.customer_signals` table containing `customer_id`, `risk_score`, `recommended_action`, `calculated_at`, and `load_batch_id`. [Create the tutorial warehouse source](tutorial-query-fabric-data.md#create-a-warehouse-source) for a complete synthetic dataset that you can also use with a Copy job.

Public preview setup uses PostgreSQL DDL. It doesn't provide a complete graphical source browser or support every Fabric item type.

## Verify the service-managed extension

Connect to the PostgreSQL endpoint and run:

```sql
SELECT
    extension.extname AS extension_name,
    extension.extversion AS installed_version
FROM pg_catalog.pg_extension AS extension
WHERE extension.extname = 'pg_fabric_fdw';
```

One row should be returned. If it isn't, don't run `CREATE EXTENSION`. The extension is service-managed, contact Microsoft support.

Inspect available foreign servers:

```sql
SELECT
    server.srvname AS server_name,
    wrapper.fdwname AS wrapper_name,
    server.srvoptions AS server_options
FROM pg_catalog.pg_foreign_server AS server
JOIN pg_catalog.pg_foreign_data_wrapper AS wrapper
  ON wrapper.oid = server.srvfdw
ORDER BY server.srvname;
```

A Federated Analytics-enabled database includes the default `fabric_dw` server for its mirrored SQL analytics endpoint. The `endpoint` option identifies the Fabric host, and `database` identifies its default remote database. Don't drop, replace, or change this managed server. If `fabric_dw` or `pg_fabric_fdw` is missing, treat it as a provisioning or preview-enablement issue.

Use your Microsoft Entra creator connection and confirm access to the Fabric source. Don't supply a token in foreign-server options or SQL. An authorized PostgreSQL connection doesn't by itself prove that the Fabric query can authenticate or read the remote source. For recovery steps, see [Troubleshoot federated queries](federated-query-troubleshooting.md#authentication-errors).

## Import foreign-table metadata

Create a customer-owned schema for the imported metadata:

```sql
CREATE SCHEMA IF NOT EXISTS fabric_mirror;
```

Import only the tables that the application needs:

```sql
IMPORT FOREIGN SCHEMA horizon_sample
    LIMIT TO (customers, orders)
    FROM SERVER fabric_dw
    INTO fabric_mirror;
```

Replace `horizon_sample`, the table list, and `fabric_dw` with the remote schema, objects, and managed server for your database. The local schema name can differ from the remote schema name.

`IMPORT FOREIGN SCHEMA` reads the remote catalog and creates local column names and type mappings. It doesn't copy rows into your HorizonDB database. The remote endpoint might expose schema or table names differently from PostgreSQL, such as `_public` for a source schema. Use names reported by that endpoint.

Use one of these forms to select tables:

- Omit `LIMIT TO` to import all visible tables from the remote schema.
- Use `LIMIT TO (customers, orders)` to import only those tables.
- Use `EXCEPT (staging_log)` instead of `LIMIT TO` to exclude selected tables.

Quote mixed-case names, such as `LIMIT TO ("Orders")`. Import filters use exact names even when the remote collation is case-insensitive.

An unsupported column type fails the import rather than creating an unsafe mapping. Exclude the table, or define a foreign table with only the required supported columns. A collation warning is different: it reports potentially different text-comparison rules, not an unsupported type. Verify that the command finishes and inspect the created tables.

For mappings, manual definitions, and import options, see [Federated query reference](federated-query-reference.md).

## Register a separate warehouse source

The mirrored SQL analytics endpoint is read-only. Create analytical source tables in a separate Fabric Data Warehouse, not in a SQL analytics endpoint.

1. Open the source warehouse.
1. Open **Settings**, and find **Connection strings**.
1. Copy the SQL connection string and SQL database name. The SQL database name can differ from the Fabric item display name.
1. Return to the HorizonDB PostgreSQL editor, and create a customer-owned foreign server:

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

Replace both placeholders with your warehouse connection values. Use a new customer-owned server name; never recreate or alter `fabric_dw`.

## Import from another reachable database

The `database_name` import option selects another queryable database reachable through the selected Fabric connection. For example, instead of the previous import, use this form when your connection can reach the source:

```sql
CREATE SCHEMA IF NOT EXISTS fabric_sales;

IMPORT FOREIGN SCHEMA dbo
    LIMIT TO (customer_signals)
    FROM SERVER customer_signals_dw
    INTO fabric_sales
    OPTIONS (database_name 'sales_analytics');
```

Each imported table retains its remote database name. This option doesn't discover arbitrary workspaces or grant source permissions. Use the SQL database name from connection details, not an assumed display name.

`database_name` is an import or foreign-table option. The server option is named `database`; the names aren't interchangeable.

## Inspect imported foreign tables

```sql
SELECT
    foreign_table.foreign_table_schema,
    foreign_table.foreign_table_name,
    foreign_table.foreign_server_name
FROM information_schema.foreign_tables AS foreign_table
ORDER BY
    foreign_table.foreign_table_schema,
    foreign_table.foreign_table_name;
```

If you completed the optional `sales_analytics` import, test a bounded query:

```sql
SELECT
    signal.customer_id,
    signal.risk_score,
    signal.recommended_action,
    signal.calculated_at
FROM fabric_sales.customer_signals AS signal
WHERE signal.risk_score >= 70
ORDER BY signal.risk_score DESC
LIMIT 20;
```

## Join local and Fabric data

This query joins local customers to remote analytical results:

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

The application remains connected to Fabric HorizonDB, but the query depends on the remote Fabric source. A local query can succeed while this federated query fails.

For a selective local table, PostgreSQL can choose a parameterized foreign scan that requests matching remote rows for each local key. For a broader local result, it can choose a remote scan followed by a local join. Don't assume that adding a join always reduces the transfer. Inspect the plan for representative filters and data volumes.

## Check which operations run in Fabric

*Pushdown* means that Fabric performs an operation instead of returning all its input rows to PostgreSQL. Filters, joins between eligible foreign tables, aggregates, sorting, and limits can push down.

For example, plan an aggregate over the mirrored order table:

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

Read the `Fabric SQL` line. It shows the exact T-SQL planned for Fabric. For a fully pushed aggregate, that SQL includes the grouping and aggregates; PostgreSQL `count(*)` translates to `COUNT_BIG(*)`.

| Plan finding | Meaning |
|---|---|
| A `Foreign Scan` with the complete query on its `Fabric SQL` line | Fabric performs the query operations and returns the result rows. |
| A local `Aggregate`, `Hash Join`, or `Sort` above a foreign scan | PostgreSQL performs that operation on rows returned by Fabric. More rows might cross the connection. |
| A `Materialize` node for a scrollable cursor | PostgreSQL buffers rows for cursor movement. This node alone doesn't mean the query failed to push down. |
| A planning error | The wrapper can't run the requested construct or a configured limit rejects the plan. |

With the default `fabric_fdw.remote_explain = OFF`, `EXPLAIN` without `ANALYZE` plans locally without contacting Fabric. It doesn't validate remote availability. `EXPLAIN ANALYZE` executes the query, so use it only when you're ready to run the workload.

For Fabric's estimated plan, supported operations, and cross-engine result differences, see [Federated query reference](federated-query-reference.md).

## Control transfer size and query time

Set a planning guardrail and a finite statement timeout for the session:

```sql
SET fabric_fdw.max_retrieved_rows = 100000;
SET statement_timeout = '30s';
```

The row guardrail defaults to `0`, which means no cap. A positive value rejects a foreign scan at planning time when the estimated number of retrieved rows exceeds the cap. The estimate accounts for pushed filters, joins, and aggregation.

This is an estimate-based planning check, not an exact runtime row limit. Keep selective predicates and explicit result limits, and choose a timeout that fits your workload. For cancellation and timeout recovery, see [Troubleshoot federated queries](federated-query-troubleshooting.md#cancellation-and-timeouts).

After you finish the example, restore the session defaults:

```sql
RESET fabric_fdw.max_retrieved_rows;
RESET statement_timeout;
```

## Design efficient federated queries

- Import only required tables and select only required columns.
- Filter remote data as early and selectively as possible.
- Aggregate in Fabric before joining a large remote result with a small local table when that shape meets your query's requirements.
- Avoid unbounded scans in application request paths.
- Confirm type, null, timestamp, collation, and comparison behavior across engines.
- Check integer averages, trailing spaces, `LIKE` patterns, and UUID ordering before relying on PostgreSQL-equivalent results.
- Compare bounded federated results with the source for representative filters and aggregates.
- Set application timeouts and use bounded retries only for safe reads.
- Use a Copy job when repeated queries need a stable, indexed local result.
- Refresh imported metadata deliberately after an approved remote schema change.

Imported metadata isn't an automatic schema-synchronization mechanism. Reconcile changed columns and dependent queries before replacing customer-owned foreign-table definitions. Don't drop service-managed components to refresh a schema.

## Permissions

Federation requires authorization at both ends:

- The caller must be the database creator in the current preview.
- The creator needs permission to read the selected Fabric source.
- The creator needs to create customer-owned schema and foreign-table metadata.
- A `database_name` override still requires a reachable source and source access.

A failure must not fall back to another user's identity. Don't place tokens or secrets in server options or SQL scripts.

## Troubleshoot federation

| Symptom | Check |
|---|---|
| `pg_fabric_fdw` isn't installed | Confirm database provisioning and feature eligibility. Don't create the service-managed extension. |
| The managed server is missing | Wait for provisioning or mirroring initialization, and then collect operation status for support. |
| Authentication is denied | Verify Microsoft Entra access to both Fabric HorizonDB and the remote Fabric item. |
| A schema or table isn't found | Verify the remote database, schema, table, and case-sensitive names shown by the source. |
| Import fails for a type | Import a supported subset and review the released type mapping. |
| A local relation already exists | Import into a new customer-owned schema or remove only the obsolete foreign-table metadata. |
| A query returns too many rows or takes too long | Inspect `EXPLAIN (VERBOSE)`, add selective filters, project fewer columns, and review the row guardrail. |
| A write is rejected | This is expected. Public preview foreign tables are read-only. |
| Local queries work but federation fails | Investigate remote capacity, authorization, schema, and federation status independently from database health. |

For SQLSTATE codes, authentication recovery, import failures, and query translation errors, see [Troubleshoot federated queries](federated-query-troubleshooting.md).

## Remove imported metadata

Remove only the customer-owned foreign tables created by these examples:

```sql
DROP FOREIGN TABLE IF EXISTS fabric_sales.customer_signals;
DROP FOREIGN TABLE IF EXISTS fabric_mirror.customers;
DROP FOREIGN TABLE IF EXISTS fabric_mirror.orders;
```

If you created `customer_signals_dw` only for this exercise, remove it after its foreign tables:

```sql
DROP SERVER customer_signals_dw;
```

These statements don't delete remote data. If a local object depends on a foreign table, review that dependency rather than adding `CASCADE` without checking it. Remove the example schemas only after you confirm they're empty and no longer needed.

Don't drop `pg_fabric_fdw` or a service-managed foreign server or user mapping.

## Related content

- [Federated Analytics overview](federated-analytics-overview.md).
- [Federated query reference](federated-query-reference.md).
- [Troubleshoot federated queries](federated-query-troubleshooting.md).
- [What is the SQL analytics endpoint?](sql-analytics-endpoint.md).
- [Load Fabric data into Fabric HorizonDB with a Copy job](load-fabric-data-copy-job.md).
