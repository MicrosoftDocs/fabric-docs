---
title: Current Limitations of graph in Microsoft Fabric
description: Understand the current limitations of graph in Microsoft Fabric, including data types, graph size, query constraints, GQL language support, and catalog and runtime reference.
ms.topic: reference
ms.date: 09/19/2026
ms.reviewer: wangwilliam
ai-usage: ai-assisted
---

# Current limitations of graph in Microsoft Fabric

Graph in Microsoft Fabric has certain functional limitations. This article highlights some key limitations but isn't an exhaustive list. Check back regularly for updates.

For help with common problems, see [Troubleshooting graph](troubleshooting-and-faq.md).

## Creating graph models

### Data sources

OneLake and Mirrored Databases are the supported data sources for graph.

### Data types

Graph models support the following property value types.

| GQL value type | Description |
|---|---|
| `BOOLEAN` | Values are `true` and `false`. |
| `INT` (or `INT64`) | Values are 64-bit signed integers. |
| `DOUBLE` (or `FLOAT64`) | Values are 64-bit IEEE-754 floating point numbers. |
| `FLOAT` (or `FLOAT32`) | Values are 32-bit floating point numbers. |
| `STRING` | Values are UTF-8 encoded Unicode character strings. The maximum property size is 65,535 bytes. |
| `ZONED DATETIME` | Values are timestamps together with a time-zone offset, with millisecond precision. |

The following OneLake and Delta Lake column types are supported for ingestion into graphs.

| OneLake type | Maps to GQL property value type |
|---|---|
| `BooleanType` | `BOOLEAN` |
| `ByteType` | `INT` (or `INT64`) |
| `IntegerType` | `INT` (or `INT64`) |
| `LongType` | `INT` (or `INT64`) |
| `FloatType` | `DOUBLE` (or `FLOAT64`) |
| `DoubleType` | `DOUBLE` (or `FLOAT64`) |
| `StringType` | `STRING` |
| `DateType` | `ZONED DATETIME` |
| `TimestampType` | `ZONED DATETIME` |
| `TimestampNtzType` | `ZONED DATETIME` |

> [!NOTE]
> Complex or nested Delta Lake types (`MapType` and `StructType`) aren't supported. You can parse JSON-encoded string columns at query time by using `PARSE_JSON_STRING`.

### Graph processing and scale

Graph loading and refresh operations may require extended processing time depending on graph size, the number of graph elements (nodes and edges), and the size of property payloads associated with those elements. Large graphs may take several hours to process. If a graph loading or refresh operation has not been completed after 24 hours, [submit a support request](/power-bi/support/create-support-ticket) for further investigation.

Current graph processing capabilities support graphs containing up to approximately 2 billion graph elements (nodes and edges). Effective capacity may vary based on graph structure and property payload size. If your workload is expected to exceed these limits, contact Microsoft Support for guidance.

### Partition columns

Delta Lake partition columns have limited support as graph properties:

- Partition columns used as the sole primary key are always rejected.
- Generated partition columns aren't supported.
- Complex and decimal partition column types (`Decimal`, `Binary`, `Array`, `Map`, and `Struct`) are dropped with a warning.

### Schema changes

Schema changes trigger a graph reload.

## Querying

### Variable-length paths

The **Explore** UI path builder supports up to eight hops for variable-length
patterns. This user-interface limit doesn't apply to GQL queries entered in the
code editor.

Graph supports the `ALL` and `ANY SHORTEST` path search prefixes. `ALL SHORTEST`
and `ANY` aren't supported.

The following table summarizes variable-length GQL support:

| Path search and path mode | Fixed or bounded quantifier | Unbounded quantifier |
| ------------------------- | --------------------------- | -------------------- |
| `ALL WALK` (default) | Supported | Not supported because repeated elements can produce infinitely many paths. |
| `ALL TRAIL`, `ALL SIMPLE`, or `ALL ACYCLIC` | Supported | Supported, but the number of paths can still be large. |
| `ANY SHORTEST WALK` | Supported | Supported for simple endpoint reachability with one anonymous quantified edge between two nodes. A path bound by this unbounded form can be used only with `PATH_LENGTH(path)` and, alongside it, `path IS NULL`; the complete path isn't materialized. See [Unbounded variable-length patterns](gql-graph-patterns.md#unbounded-variable-length-patterns). |
| `ANY SHORTEST TRAIL`, `ANY SHORTEST SIMPLE`, or `ANY SHORTEST ACYCLIC` | Supported | Supported. |

Fixed and bounded quantifiers are `{n}`, `{m,n}`, and `{,n}`. Unbounded
quantifiers are `{m,}`, `*`, and `+`. For more information, see [GQL graph
patterns](gql-graph-patterns.md#use-variable-length-patterns).

### Path predicate placement

GQL distinguishes predicates that constrain eligible paths from predicates that
filter paths after a path search prefix selects them. For some `ANY SHORTEST`
query shapes, Graph can currently apply a statement-level `MATCH ... WHERE`
condition before path selection.

To make the intended stage explicit, place eligibility predicates inline in
node or edge patterns. For post-selection filtering, use a separate `FILTER`
statement after `MATCH`. For examples, see [Place predicates before or after
path selection](gql-graph-patterns.md#place-predicates-before-or-after-path-selection).

### List predicate filters

List predicate filters don't currently support:

- `EXISTS` subqueries.
- Aggregate functions over the locally bound element. Horizontal aggregation
  over an enclosing group list is supported.

For supported syntax and result semantics, see [List predicate
functions](gql-expressions.md#list-predicate-functions).

### Size of results

Graph truncates a query response when its internal binary representation
exceeds 64 MB. Graph returns the rows that fit and reports an additional warning
with public status code `01000` and canonical GQLSTATUS `01M11`. Intermediate
results are capped at 128 MB.

The response doesn't include a continuation token for rows omitted by
truncation. Narrow the result with filters, specific projections, or `LIMIT`,
and then run the query again.

### Timeout

Query API execution has a total timeout of 20 minutes, including continuation
requests. If execution exceeds this limit, the API returns HTTP 408 with error
code `QueryTimeout`.

### Subqueries

`CALL`, `OPTIONAL CALL`, and procedure-form `EXISTS` subqueries are supported.
Inline `CALL` subqueries can be nested and implicitly import variables from
enclosing scopes. Named procedure calls, explicit variable import lists such as
`CALL (p) { ... }`, graph-pattern-only `EXISTS`, and scalar subqueries
(`VALUE { ... }`) aren't supported.

### Aggregation functions

The following aggregation functions are supported:

- `COUNT`, `COUNT(*)`, `SUM`, `AVG`, `MIN`, and `MAX`
- `COLLECT_LIST`, `COLLECT_ONE`, and `COLLECT_ELEMENTS`
- `DISTINCT` variants of all the preceding functions
- Horizontal (row-wise, over group variables/lists) variants of all the above

The following aggregation functions aren't yet supported:

- `PERCENTILE_CONT` and `PERCENTILE_DISC`
- `STDDEV_POP` and `STDDEV_SAMP`
- `PRODUCT`

### Set operations

`UNION ALL` and `UNION DISTINCT` are supported. `INTERSECT`, `EXCEPT`, and `OTHERWISE` aren't yet supported.

### Supported GQL statements and clauses

The following core GQL statements and clauses are supported:

- `MATCH` and `OPTIONAL MATCH`
- `WHERE` filters
- `LET` variable bindings
- `FOR ... IN` list unrolling with optional `ORDINALITY` indexing
- `NEXT`, including query stages that contain `UNION`, `UNION DISTINCT`, or
  `UNION ALL`
- `RETURN` and `RETURN DISTINCT`
- `GROUP BY`
- `ORDER BY` with `NULLS FIRST` or `NULLS LAST`
- `LIMIT` and `OFFSET`
- `UNION ALL` and `UNION DISTINCT`
- `CALL`, `OPTIONAL CALL`, and `EXISTS`
- `CAST` with a broad type conversion matrix
- Supported scalar and aggregate functions listed in [GQL expressions,
  predicates, and functions](gql-expressions.md)

### DML and DDL operations

Data Manipulation Language (DML) operations such as `INSERT`, `UPDATE`, and `DELETE` aren't supported through GQL. Data Definition Language (DDL) operations for schema mutation aren't supported.

## Data export and visualization

Exporting graph query results or graph structures isn't currently supported.

Connecting Power BI directly to a graph for visualization scenarios isn't currently supported.

## GQL conformance

For a detailed mapping of supported GQL features against the ISO/IEC 39075:2024 standard, including minimum conformance, optional features by group, and features not yet supported, see [GQL standard conformance](gql-conformance.md).

Conformance to GQL standards is still in progress for the following features.

### Control flow and set operations

- `EXCEPT ALL` and `EXCEPT DISTINCT` statements
- `INTERSECT ALL` and `INTERSECT DISTINCT` statements
- `OTHERWISE` statement

### Path search and pattern matching

- `ALL SHORTEST` path search (not supported)
- `ANY` path search
- Nonlocal pattern predicates
- Relaxed topological consistency
- Wildcards

### Predicates

- Label test predicate (`IS LABELED`)
- `IS DIRECTED` predicate
- Normalized predicate
- Source/destination predicate
- `ALL_DIFFERENT` predicate
- `IS DISTINCT` predicate
- `SAME` predicate
- `REGEXP_CONTAINS` predicate

### Runtime value types supported

| Runtime value type | Representation/range | Limit |
|---|---|---|
| `BOOLEAN` | `true` and `false` | |
| `INT` (or `INT64`) | Signed 64-bit integer | |
| `UINT` (or `UINT64`) | Unsigned 64-bit integer | |
| `DOUBLE` (or `FLOAT64`) | IEEE-754 `binary64` | No finite-only check; nonfinite values are accepted |
| `STRING` | Unicode string | 65,534 bytes (uint16 on-disk length) |
| `ZONED DATETIME` | Milliseconds since Unix epoch plus int32 UTC offset | int64 millisecond range |
| `DURATION(DAY TO SECOND)` | Millisecond precision | |
| `NODE` | | uint64 raw |
| `EDGE` | | uint64 raw |
| `LIST` | Homogeneous typed list | 65,534 elements (uint16 on-disk length) |
| `RECORD` | Struct of typed fields | |
| `PATH` | Alternating list of nodes and edges that always starts and ends with a node | 65,534 elements (uint16 on-disk length) |

### Runtime value types not yet supported

- `INT8`, `INT16`, and `INT32` value types (`INT64` is supported)
- `FLOAT16` and `FLOAT32` value types (`FLOAT64` is supported)
- `UINT8`, `UINT16`, and `UINT32` value types (`UINT64` is supported)
- `ZONED TIME` value type
- `DATE` value type as a standalone type. Ingested dates map to Zoned DateTime.
- `LOCAL DATETIME` value type
- `LOCAL TIME` value type
- `DURATION(YEAR TO MONTH)` value type
- `BYTES` value type. Ingestion is supported, but the type isn't queryable as a stored property.
- `VECTOR` value type

### Functions and expressions

- `PROPERTIES` function
- `NORMALIZE` with the `NFKC` and `NFKD` forms
- `DURATION_BETWEEN` function
- Searched `CASE WHEN` expressions
- Scalar subqueries
- Path value concatenation
- Byte string concatenation, `TRIM`, and length functions
- Simple `TRIM` function with a `TRIM` specification
- Multicharacter `TRIM` function
- `CARDINALITY`

### Aggregation

- `PERCENTILE_CONT` aggregate function
- `PERCENTILE_DISC` aggregate function
- `PRODUCT` aggregate function
- `STDDEV_POP` aggregate function
- `STDDEV_SAMP` aggregate function

### Other

- Parameter passing (`$param` dynamic parameter specification)
- Session user (`SESSION_USER`)
- `CALL` named procedure statement
- `CALL` subqueries with explicit variable import lists
- Catalog management. Graph and constraint names are automatically generated.

## Catalog

>[!NOTE]
> Graph names and constraint names are automatically generated and can't be specified in the UI or in the JSON schema.

| Catalog area | Current limit / behavior | Recommendation |
|---|---|---|
| Graph schema | One graph type per catalog. | |
| Graph name | Must be nonempty; no explicit maximum length. | 127 characters |
| Node types | Maximum of approximately 2 billion (int32 ID space). | 64K |
| Edge types | Maximum of approximately 2 billion (int32 ID space). | 64K |
| Unique node labels | Maximum of approximately 2 billion; duplicates within one type are rejected. | Derived from node types |
| Unique edge labels | Maximum of approximately 2 billion; duplicates within one type are rejected. | Derived from edge types |
| Unique property names | Maximum of approximately 2 billion; empty names and duplicates within one type are rejected. | 64K x 10 |
| Properties per node type | No explicit maximum; duplicate property names are rejected. | 256 |
| Properties per edge type | No explicit maximum; duplicate property names are rejected. | 256 |
| Labels per node type | No explicit maximum; duplicate labels are rejected. | 64 |
| Labels per edge type | No explicit maximum; duplicate labels are rejected. | 64 |
| Key properties per constraint | No explicit maximum; property names must be nonempty. | 16 |
| Property name length | Not explicitly enforced beyond nonempty. | 127 characters |
| Label name length | Not explicitly enforced beyond nonempty. | 127 characters |
| Edge key constraints | Disabled by default (`allow_edge_key_constraints` flag). | ≤ the number of edge types |

## Related content

- [Graph in Microsoft Fabric overview](./overview.md)
- [What is a graph database?](./graph-database.md)
- [Troubleshooting and FAQ for graph](troubleshooting-and-faq.md)
- [Optimize GQL query performance in graph](gql-query-performance.md)
