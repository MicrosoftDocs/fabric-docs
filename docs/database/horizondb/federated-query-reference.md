---
title: "Federated query reference for Microsoft Fabric HorizonDB"
description: Review pg_fabric_fdw options, type mappings, query pushdown, behavior differences, and session settings for federated queries.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: reference
ai-usage: ai-generated
---
# Federated query reference for Microsoft Fabric HorizonDB

Federated queries in Fabric HorizonDB use `pg_fabric_fdw` to read supported warehouses and SQL analytics endpoints with PostgreSQL SQL. This article describes the foreign-table metadata, query behavior, and session controls for this [Federated Analytics](federated-analytics-overview.md) capability.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Use the service-managed extension and connection configuration supplied for your database. Instructions that install the extension, require PostgreSQL superuser access, or replace a managed foreign server don't apply to the managed service.

For a procedure, see [Query Fabric data from a HorizonDB database](query-fabric-data.md). For errors and recovery steps, see [Troubleshoot federated queries](federated-query-troubleshooting.md).

## Connection and metadata options

The managed foreign server has two connection options:

| Option | Meaning |
|---|---|
| `endpoint` | The bare Fabric host name, without a port or `tcp:` prefix. |
| `database` | The default warehouse or SQL analytics endpoint database. |

The wrapper uses a native Tabular Data Stream (TDS) connection, not an Open Database Connectivity (ODBC) data source name (DSN) or connection string. Connect as the database creator and confirm Microsoft Entra access to the source. You don't pass a token in SQL. Don't change service-managed servers or user mappings.

The default `fabric_dw` server targets the database's own mirrored SQL analytics endpoint. For a separate warehouse, create a customer-owned server with `CREATE SERVER ... FOREIGN DATA WRAPPER pg_fabric_fdw OPTIONS (endpoint '...', database '...')`. Copy the host and SQL database name from the warehouse's **Settings** > **Connection strings**. The SQL database name can differ from the Fabric item display name. See [Register a separate warehouse source](query-fabric-data.md#register-a-separate-warehouse-source).

### Import options

`IMPORT FOREIGN SCHEMA` reads the source catalog and creates local metadata. The local schema must already exist. Use `LIMIT TO` to select tables or `EXCEPT` to exclude them.

| Option | Meaning |
|---|---|
| `database_name` | Selects another queryable SQL database reachable through the selected Fabric connection instead of its default database. It doesn't discover arbitrary workspaces. |
| `mirror_schema` | Associates each imported table with a same-named local statistics source by setting its `mirror_of` option. The source must meet the requirements in [Local planner statistics](#local-planner-statistics). |

For example, import one table from another database in the workspace:

```sql
CREATE SCHEMA IF NOT EXISTS fabric_sales;

IMPORT FOREIGN SCHEMA analytics
    LIMIT TO (customer_signals)
    FROM SERVER fabric_dw
    INTO fabric_sales
    OPTIONS (database_name 'sales_analytics');
```

Replace the names with your source and managed server. The option doesn't grant access to the other database or discover arbitrary workspaces. A different endpoint can require a separate customer-owned server.

Import filters match exact names. Quote a mixed-case name, such as `"CustomerSignals"`. A missing schema, insufficient catalog visibility, an empty selection, or an unsupported remote type can fail the import.

### Foreign-table and column options

Use a manual definition when you need a subset of columns or a different local name:

```sql
CREATE FOREIGN TABLE fabric_sales.customer_signal_scores (
    customer_id bigint,
    score numeric(5, 2) OPTIONS (column_name 'risk_score')
)
    SERVER fabric_dw
    OPTIONS (
        database_name 'sales_analytics',
        schema_name 'analytics',
        table_name 'customer_signals'
    );
```

This example assumes the source has those columns and matching types. Verify the source definition instead of inferring a type from sample values.

| Option | Scope | Meaning |
|---|---|---|
| `schema_name` | Foreign table; required | The remote schema. |
| `table_name` | Foreign table; required | The remote table. |
| `database_name` | Foreign table; optional | Another queryable database reachable through the selected Fabric connection. |
| `mirror_of` | Foreign table; optional | A schema-qualified local table or materialized view used only for statistics. |
| `column_name` | Column; optional | The exact remote column name. Without it, the local name is used. |

Imported columns retain their remote names through `column_name`. Set this option before renaming a manually defined column that doesn't already have it. Otherwise, a local rename changes which remote column the wrapper requests. A difference between local and remote column names prevents full-query pushdown, although eligible parts can still run remotely.

Changing or dropping customer-owned foreign-table metadata doesn't change the remote table or its rows.

## Data type mappings

Prefer `IMPORT FOREIGN SCHEMA` to obtain the source's type mapping.

| Fabric column type | PostgreSQL column type |
|---|---|
| `bit` | `boolean` |
| `tinyint`, `smallint` | `smallint` |
| `int` | `integer` |
| `bigint` | `bigint` |
| `real` | `real` |
| `float` | `double precision` |
| `decimal(p,s)`, `numeric(p,s)` | `numeric(p,s)` |
| `date` | `date` |
| `time(p)` | `time` |
| `datetime2(p)` | `timestamp` |
| `datetimeoffset(p)` | `timestamptz` |
| `char(n)`, `nchar(n)` | `char(n)` |
| `varchar(n)`, `nvarchar(n)` | `varchar(n)` |
| `varchar(max)` | `text` |
| `varbinary(n)`, `varbinary(max)` | `bytea` |

The wrapper also supports UUID columns. Use the imported mapping or verify the source representation before declaring a `uuid` column. A binary column isn't necessarily a UUID.

These boundaries affect imports and expressions:

- Remote `time`, `datetime2`, and `datetimeoffset` columns support at most six fractional-second digits. Import rejects a remote precision of seven.
- Fabric exact numeric calculations support up to 38 digits. Wider PostgreSQL numeric definitions can't participate in pushed-down expressions.
- Unmapped remote column types fail import. Fetch JSON stored as string data as `text`, and apply PostgreSQL JSON functions locally.
- UUID casts run in PostgreSQL because the engines accept different string representations. UUID equality can still push down.
- Timezone-dependent expressions, such as `date::timestamptz`, run locally to preserve PostgreSQL timezone rules.
- Out-of-range date literals, BC dates, infinity, and `TIME '24:00:00'` stay local. Dates constructed remotely can still fail if their calculated value falls outside Fabric's supported range.

## Query pushdown

The wrapper translates eligible PostgreSQL operations into T-SQL. Fabric evaluates those operations and returns the result rows. Other operations can run in PostgreSQL over the returned rows, or the query can fail if it can't be translated safely.

| Query shape | Behavior |
|---|---|
| Projection, filters, ordering, `LIMIT`, and `OFFSET` | Can run in Fabric when the expressions are supported. |
| Joins between eligible foreign tables on one server | Can run as one remote join, including across reachable databases when supported by the connection. |
| A join between a local table and a foreign table | Uses local planning and eligible remote scans. A selective local key can parameterize a remote scan; broader inputs can require a local join. |
| `count`, `sum`, `avg`, `min`, and `max` | Can run in Fabric. `count` uses `COUNT_BIG`; integer inputs to `sum` are widened where required. |
| Supported window functions, such as `row_number`, `rank`, `lag`, and `lead` | Push down when the entire query runs in Fabric. In a mixed query, they run locally. |
| `array_agg`, `json_agg`, and `jsonb_agg` | Run locally over a remote scan because Fabric has no corresponding result type. |
| PostgreSQL-only functions or unsupported date expressions | Can run locally or produce an unsupported-construct error. Local fallback isn't guaranteed for every expression. |
| Regular-expression predicates and recursive common table expressions | Aren't supported. |
| Writes, `COPY` into a foreign table, `FOR UPDATE`, and `FOR SHARE` | Aren't supported. Foreign tables are read-only. |

Run `EXPLAIN (VERBOSE)` on the actual query. The `Fabric SQL` line shows the SQL planned for Fabric. Local aggregate, join, or sort nodes show where PostgreSQL completes the work. A cursor's `Materialize` node alone doesn't imply local query computation.

By default, `EXPLAIN` without `ANALYZE` doesn't contact Fabric. `EXPLAIN ANALYZE` executes the query.

### Remote estimated plans

Enable the remote plan for your session:

```sql
SET fabric_fdw.remote_explain = ON;
```

`EXPLAIN` now contacts Fabric to obtain an estimated execution plan without executing the remote SQL. The remote identity needs permission to execute the statement and `SHOWPLAN` permission in every referenced database. Without those permissions, `EXPLAIN` fails.

The output includes a `Fabric Plan` tree. Fabric costs use different units from PostgreSQL costs. Even with `EXPLAIN ANALYZE`, the nested Fabric plan remains estimated rather than providing actual per-operator counters. A parameterized scan can report that its remote plan is skipped because the runtime parameter values aren't available yet.

Restore the default when you finish:

```sql
RESET fabric_fdw.remote_explain;
```

## Cross-engine behavior differences

Pushdown doesn't guarantee PostgreSQL-equivalent results for every expression. The engine that performs a comparison or calculation applies its own rules.

| Operation | Difference and guidance |
|---|---|
| Text comparison, ordering, grouping, and joins | Remote operations use the warehouse collation. A local `COLLATE` declaration doesn't change results already computed by Fabric. Validate case, accents, and sort order. |
| UUID ordering and range predicates | Fabric and PostgreSQL rank UUIDs differently. Equality, `IN`, and grouping agree. See [UUID comparison rules](#uuid-comparison-rules). |
| Average of integers | A pushed integer average can discard the fraction. Use `avg(column_name::numeric)` when the fractional result is required. |
| Text length with trailing spaces | The remote length function omits trailing spaces. Use `length(column_name \|\| '\|') - 1` to count them. |
| Fixed-length character padding | Fabric can retain padding where PostgreSQL trims it during conversion. Use `rtrim` when padding must be removed. |
| Numeric-to-integer casts at `.5` | The rounding rules differ. Use `round(value)::integer` for half-away-from-zero behavior, and check the target integer range before casting. |
| `LIKE` patterns | T-SQL treats brackets as pattern syntax and doesn't use PostgreSQL's implicit backslash escape. Use an explicit escape character, such as `LIKE 'a#%b' ESCAPE '#'` for a literal percent sign. |
| Week and day-of-week calculations | Fabric calendar settings can differ from PostgreSQL ISO-week rules. Validate `week`, `dow`, and week truncation against the required business calendar. |
| High-precision calculations | Large exact results can exceed 38 digits. Some power, exponent, and division results use floating-point precision. Don't assume exact PostgreSQL numeric results. |
| An empty grouping set over empty input | Fabric can return no rows where PostgreSQL returns one grand-total row. Test empty inputs explicitly. |

Import can warn that a Fabric text collation isn't verified compatible with the PostgreSQL database collation. The warning appears at most once per import and reports counts rather than affected column names. It isn't proof that the import finished or that a specific comparison will differ. Inspect the source collation and test representative values.

### UUID comparison rules

`fabric_fdw.uuid_fabric_semantics` defaults to `ON`. It allows Fabric UUID comparisons where the query can push them down. A mixed plan can still sort UUIDs locally, so the resulting order can depend on the plan.

Use PostgreSQL ordering when your application requires consistent PostgreSQL UUID range and sort behavior:

```sql
SET fabric_fdw.uuid_fabric_semantics = OFF;
```

The relevant sort or filter now runs locally. This can increase the number of rows transferred. The setting affects UUIDs only, not text collation.

## Session controls

Use the controls exposed by your released extension version and permissions.

| Setting | Default | Effect |
|---|---|---|
| `fabric_fdw.max_retrieved_rows` | `0` | No cap by default. A positive value rejects a foreign scan if its estimated retrieved rows exceed the limit. This isn't an exact runtime row limit. |
| `fabric_fdw.max_batch_memory` | `256` kB | A positive value enables result batching. `0` fetches one row at a time. The allowed range is `0` through `1024` kB; the effective memory limit is also bounded by `work_mem`. Changing this setting requires the applicable parameter `SET` privilege. |
| `fabric_fdw.remote_explain` | `OFF` | Adds Fabric's estimated execution plan to `EXPLAIN` and requires remote plan permissions. |
| `fabric_fdw.enable_query_labels` | `OFF` | Adds a unique label to each remote query and reports it in a PostgreSQL `NOTICE`. |
| `fabric_fdw.uuid_fabric_semantics` | `ON` | Allows Fabric UUID comparison semantics where those operations can push down. |

Set `statement_timeout` before starting a scan. The wrapper captures it for remote reads when the scan starts; changing it during a scan doesn't change that captured value. Query cleanup can continue after cancellation. For details, see [Cancellation and timeouts](federated-query-troubleshooting.md#cancellation-and-timeouts).

### Correlate a query with Fabric history

Enable labels before running a query:

```sql
SET fabric_fdw.enable_query_labels = ON;

SELECT count(*)
FROM fabric_mirror.orders;
```

Record the label from the `NOTICE`. One PostgreSQL query can issue multiple remote queries, each with a separate label.

Run the following query against the source warehouse, not the HorizonDB database's PostgreSQL endpoint:

```sql
SELECT
    distributed_statement_id,
    label,
    start_time
FROM queryinsights.exec_requests_history
WHERE label = '<query-label>';
```

The label and `distributed_statement_id` are different identifiers. History can take up to 15 minutes to appear. Access depends on your warehouse permissions. For more information, see [Query insights](../../data-warehouse/query-insights.md).

Restore the default after collecting the labels:

```sql
RESET fabric_fdw.enable_query_labels;
```

## Local planner statistics

The optional `mirror_of` foreign-table option identifies a permanent local table or materialized view that PostgreSQL samples during `ANALYZE`. The wrapper doesn't create or refresh this statistics source, and queries still read rows from Fabric.

This option isn't Fabric database mirroring and doesn't synchronize data. Maintain representative local rows through your own approved load process.

The statistics source must:

- Be a permanent table or materialized view, not a temporary table or ordinary view.
- Use a schema-qualified name in `mirror_of`.
- Match the foreign table's non-dropped columns by count, order, and PostgreSQL type.
- Match declared type modifiers, such as character length or numeric precision and scale.

Column names can differ because matching is positional. `IMPORT FOREIGN SCHEMA ... OPTIONS (mirror_schema 'analytics_stats')` sets `mirror_of` for each imported table using the same table name in `analytics_stats`.

After you populate or refresh a matching statistics source, run `ANALYZE` on the customer-owned foreign table. Changing the local source doesn't refresh foreign-table metadata or remote data.

## Related content

- [Query Fabric data from a HorizonDB database](query-fabric-data.md).
- [Tutorial: Query mirrored Fabric data](tutorial-query-fabric-data.md).
- [Troubleshoot federated queries](federated-query-troubleshooting.md).
- [PostgreSQL foreign data](https://www.postgresql.org/docs/current/ddl-foreign-data.html).
