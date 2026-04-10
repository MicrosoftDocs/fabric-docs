---
title: GQL Standard Conformance for Graph in Microsoft Fabric
description: Detailed GQL standard conformance mapping for graph in Microsoft Fabric. Use this reference to evaluate GQL coverage, compare with other implementations, or identify gaps when migrating from another GQL database.
ms.topic: reference
ms.date: 04/09/2026
ms.reviewer: splantikow
ms.search.form: GQL Conformance
---

# GQL standard conformance for graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Graph in Microsoft Fabric implements the [ISO/IEC 39075:2024 — Information technology — Database languages — GQL](https://www.iso.org/standard/76120.html) standard. This page maps graph's current support against the minimum conformance and optional feature groups defined in the standard. Check back for updates as features are added.

This reference article is intended for:

- Enterprise architects evaluating graph's GQL coverage.
- Developers migrating queries from another GQL-compliant database.
- Engineers validating conformance claims against the spec.

If you're getting started with GQL in Fabric, see the [GQL language guide](gql-language-guide.md) instead.

## How to read this page

The tables in this article use the following conventions:

| Column Name | Description |
| ----------- | ----------- |
| **Subclause** or **Feature ID** | The identifier from the GQL standard. Minimum conformance capabilities use subclause numbers (for example, 14.4). Optional features use Feature IDs from Annex D (for example, G004 or GQ15). |
| **Capability** or **Feature** | The name or description of the capability or feature. |
| **Supported** | **Yes** — fully supported. **Partial** — some sub-capabilities are supported. **No** — not currently supported. **Unknown** — needs technical review before publication. |
| **Notes** | Implementation details, known constraints, or links to relevant documentation. |

## Data model conformance

Graph implements the [labeled property graph](graph-data-models.md) model. The following table summarizes data model support.

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GG02 | Graph with a closed graph type | Yes | Graph uses closed [graph types](gql-graph-types.md) that define allowed node types and edge types. |
| GG20 | Explicit element type names | Yes | Node and edge types are identified by label names defined in the graph type. |
| GG23 | Optional element type key label sets | Yes | The key label set of an element type is its element type name. |
| GH02 | Undirected edges | No | All edges are directed. |
| GV11, GV12, GV24, GV31 | Property value types | Yes | Supported types: `BOOL`, `INT`/`INT64`, `UINT64`, `FLOAT64`/`DOUBLE`, `STRING`. For the full type reference, see [GQL values and value types](gql-values-and-value-types.md). GV08, GV21, GV40, and GV07 have nuances — see the [GV section](#gv--value-type-features). |

## Minimum conformance

The GQL standard (Subclause 5.3.7) defines minimum conformance as support for all mandatory functionality — the full language syntax and semantics not gated by an optional Feature ID. The standard's informative Annex H documents mandatory functionality. On top of minimum conformance, an implementation can claim support for zero or more **optional features** identified by Feature IDs in the standard's Annex D.

In addition to the mandatory functionality, Subclause 24.2 requires that a minimum conformance claim include:

1. Support for at least one of Feature GC00 ("Automatic graph population") or Feature GC04 ("Graph management"). See the [GC section](#gc--catalog-management-features).
1. A claim of conformance to a specific Unicode version (not less than 13.0.0). Character strings in graph are [Unicode](gql-values-and-value-types.md#character-string-value-types) with `UCS_BASIC` collation. Unicode validation isn't currently supported.
1. Support for at minimum these property value types: `STRING` (or `VARCHAR`), `BOOL` (or `BOOLEAN`), signed `INTEGER` (or `INT`), and `FLOAT`.

The following tables summarize the current state of graph's support for mandatory capabilities, organized by functional area.

### Session and transaction management (Subclauses 7–8)

| Subclause | Capability | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| 7 | Session management | Unknown | `SESSION SET`, `SESSION RESET`, `SESSION CLOSE`. Needs technical review. The Fabric platform might handle session management rather than GQL. |
| 8 | Transaction management | Unknown | `START TRANSACTION`, `ROLLBACK`, `COMMIT`. Needs technical review. The Fabric platform might manage transactions. |

### Object expressions (Subclause 11)

| Subclause | Capability | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| 11 | Object expressions | Unknown | Covers `<graph expression>`, `<binding table expression>`, and `<object expression primary>`. Includes `CURRENT_GRAPH`. Needs technical review. |

### Query statements (Subclause 14)

| Subclause | Capability | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| 14.3 | Linear query statement / nested query specification | Unknown | Needs technical review. |
| 14.4 | `MATCH` statement | Yes | [`MATCH`](gql-language-guide.md#match-statement) with pattern matching. |
| 14.4 | `OPTIONAL MATCH` statement | No | Part of the `<match statement>` subclause. |
| 14.9 | `ORDER BY` and page statement | Yes | [`ORDER BY`](gql-language-guide.md#order-by-statement), [`OFFSET`, and `LIMIT`](gql-language-guide.md#offset-and-limit-statements). |
| 14.10 | Primitive result statement | Yes | Supported through [`RETURN`](gql-language-guide.md#return-basic-result-projection). |
| 14.11 | `RETURN` statement | Yes | [`RETURN`](gql-language-guide.md#return-basic-result-projection) with projections, aliases, and [`GROUP BY`](gql-language-guide.md#return-with-group-by-grouped-result-projection). |
| 14.12 | `SELECT` statement | Unknown | Needs technical review. |

### Graph patterns and common elements (Subclause 16)

| Subclause | Capability | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| 16.1 | `AT` schema clause | Unknown | Needs technical review. |
| 16.3 | Graph pattern binding table | Yes | Path binding and [group variables](gql-language-guide.md#advanced-aggregation-techniques). |
| 16.4 | Graph pattern | Yes | Simple anonymous patterns, named edge patterns, and [composed patterns](gql-graph-patterns.md#compose-patterns) with `WHERE` clause. |
| 16.4 | Node patterns | Yes | `(n:Label)` syntax with element variable declarations, label expressions, and property specifications. |
| 16.4 | Edge patterns (full directed) | Yes | `->`, `<-`, and `-[]-` directed edge patterns. |
| 16.4 | Element property specification | Yes | `{key: value}` inline property predicates. |
| 16.5 | Insert graph pattern | Unknown | Graph data is loaded through [data management](manage-data.md). Needs technical review to confirm whether GQL `INSERT` syntax is supported. |
| 16.7 | Path pattern expression | Yes | [Path patterns](gql-graph-patterns.md) with composition and variable-length traversals. |
| 16.7 | Path concatenation | Yes | Multi-hop patterns through sequential node-edge-node syntax. |
| 16.8 | Label expression | Yes | [Label expressions](gql-graph-patterns.md#label-expressions) with `&` (AND), `\|` (OR), and `!` (NOT) operators. |
| 16.9 | Path variable reference | Yes | [Path variables](gql-graph-patterns.md#binding-path-variables) can be bound and returned. |
| 16.10 | Element variable reference | Yes | Node and edge [element variables](gql-graph-patterns.md#binding-element-variables). |
| 16.13 | `WHERE` clause | Yes | [`FILTER`](gql-language-guide.md#filter-statement) statement and inline `WHERE` in pattern predicates. |
| 16.14 | `YIELD` clause | Unknown | Needs technical review. |
| 16.16 | `ORDER BY` clause | Yes | [`ORDER BY`](gql-language-guide.md#order-by-statement) with `ASC`/`ASCENDING` and `DESC`/`DESCENDING`. |
| 16.17 | Sort specification list | Yes | Multiple sort keys with ordering direction. |

### Predicates (Subclause 19)

| Subclause | Capability | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| 19.3 | Comparison predicate | Yes | [Comparison operators](gql-expressions.md#comparison-predicates): `=`, `<>`, `<`, `>`, `<=`, `>=`. |
| 19.4 | `EXISTS` predicate | Unknown | Needs technical review. `EXISTS` with graph patterns, parenthesized patterns, and nested queries are all part of mandatory functionality. |
| 19.5 | `NULL` predicate | Yes | [`IS NULL` and `IS NOT NULL`](gql-expressions.md#property-existence-predicates). |
| 19.7 | `NORMALIZED` predicate | No | Unicode normalization functions aren't currently supported. |

### Value expressions and functions (Subclause 20)

| Subclause | Capability | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| 20.2 | Value expression primary | Yes | Literals, variable references, property access, and parenthesized expressions. |
| 20.3 | Value specification | Partial | Literals and variable references are supported. `SESSION_USER` and dynamic parameter specification aren't currently supported. |
| 20.7 | `CASE` expression | Partial | [`COALESCE`](gql-expressions.md#built-in-functions) is supported. `CASE`, `NULLIF`, simple case, and searched case status needs technical review. |
| 20.9 | Aggregate function | Yes | [`count`](gql-expressions.md#aggregate-functions), `sum`, `avg`, `min`, `max` with `DISTINCT`/`ALL` set quantifiers. |
| 20.11 | Property reference | Yes | Dot-notation [property access](gql-expressions.md#property-access) on nodes and edges. |
| 20.12 | Binding variable reference | Yes | Variable references in expressions. |
| 20.20 | Boolean value expression | Yes | [`AND`, `OR`, `NOT`](gql-expressions.md#logical-expressions) with `IS [NOT] TRUE/FALSE/UNKNOWN` tests. |
| 20.21 | Numeric value expression | Yes | [Arithmetic operators](gql-expressions.md#arithmetic-expressions): `+`, `-`, `*`, `/`. |
| 20.22 | Numeric value function | Partial | [`char_length`](gql-expressions.md#string-functions) is supported. Needs technical review to confirm `CHARACTER_LENGTH` alias and full subclause coverage. |
| 20.23 | String value expression | Yes | String concatenation with the `\|\|` operator. |
| 20.24 | Character string function | Partial | [`upper`](gql-expressions.md#string-functions), `lower`, `trim` are supported. `LEFT`/`RIGHT` substring functions and `NORMALIZE` aren't currently supported. |
| 20.25 | Byte string function | No | Byte string types aren't supported. |
| 20.29 | Duration value function | No | |

### Value types (Subclause 24.2)

Graph supports all four required property value types: [`BOOL`](gql-values-and-value-types.md#boolean-value-types), [`STRING`](gql-values-and-value-types.md#character-string-value-types), signed [`INTEGER`](gql-values-and-value-types.md#exact-numeric-types) (64-bit), and [`FLOAT`](gql-values-and-value-types.md#approximate-numeric-types), plus additional types. For the full type reference, see [GQL values and value types](gql-values-and-value-types.md).

### Lexical elements (Subclause 21)

| Subclause | Capability | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| 21.1 | Names and variables | Yes | [Variable binding](gql-graph-patterns.md#binding-variables) with forward scoping rules. Regular and delimited identifiers. |
| 21.2 | Literals | Yes | [Literals](gql-values-and-value-types.md) for booleans, integers, floating-point numbers, strings (with C-style and SQL-style escaping), `NULL`, and lists. |
| 21.3 | Tokens, separators, identifiers | Yes | Standard GQL lexical rules. |

## Optional feature conformance

A Feature ID identifies optional features. It starts with "G" followed by a group letter and digits. The following sections organize features by group.

### G — Graph pattern features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| G002 | Different-edges match mode | Unknown | Needs technical review. |
| G003 | Explicit `REPEATABLE ELEMENTS` keyword | Unknown | Needs technical review. |
| G004 | Path variables | Yes | [Path variable binding](gql-graph-patterns.md#binding-path-variables) is supported. |
| G005 | Path search prefix in a path pattern | Unknown | Needs technical review. |
| G006 | Graph pattern `KEEP` clause: path mode prefix | Unknown | Needs technical review. |
| G007 | Graph pattern `KEEP` clause: path search prefix | Unknown | Needs technical review. |
| G010 | Explicit `WALK` keyword | Unknown | Needs technical review. |
| G011 | Advanced path modes: `TRAIL` | Yes | [`TRAIL`](gql-graph-patterns.md#match-trails) prevents duplicate edge traversal. |
| G012 | Advanced path modes: `SIMPLE` | No | |
| G013 | Advanced path modes: `ACYCLIC` | No | |
| G014 | Explicit `PATH`/`PATHS` keywords | Unknown | Needs technical review. |
| G015 | All path search: explicit `ALL` keyword | Unknown | Needs technical review. |
| G016 | Any path search | Unknown | Needs technical review. |
| G017 | All shortest path search | Unknown | Needs technical review. |
| G018 | Any shortest path search | Unknown | Needs technical review. |
| G019 | Counted shortest path search | Unknown | Needs technical review. |
| G020 | Counted shortest group search | Unknown | Needs technical review. |
| G030 | Path multiset alternation | Unknown | Needs technical review. |
| G031 | Path multiset alternation: variable length path operands | Unknown | Needs technical review. |
| G032 | Path pattern union | Unknown | Needs technical review. |
| G033 | Path pattern union: variable length path operands | Unknown | Needs technical review. |
| G035 | Quantified paths | Yes | [Bounded variable-length patterns](gql-graph-patterns.md#bounded-variable-length-patterns) with `{m,n}` syntax. |
| G036 | Quantified edges | Unknown | Needs technical review. Docs describe [quantified paths](gql-graph-patterns.md#bounded-variable-length-patterns) but don't address quantified edges separately. |
| G037 | Questioned paths | Unknown | Needs technical review. |
| G038 | Parenthesized path pattern expression | Unknown | Needs technical review. |
| G039 | Simplified path pattern expression: full defaulting | Unknown | Needs technical review. |
| G041 | Non-local element pattern predicates | Yes | [Pattern predicates](gql-graph-patterns.md#binding-element-variables) with `WHERE` in node and edge fillers. |
| G043 | Complete full edge patterns | Yes | Full directed edge patterns with `->` and `<-`. |
| G044 | Basic abbreviated edge patterns | Yes | Shorthand patterns like `()->()` and `()-()`. |
| G045 | Complete abbreviated edge patterns | Yes | Abbreviated [edge pattern shortcuts](gql-graph-patterns.md#graph-edge-pattern-shortcuts) for any direction. |
| G046 | Relaxed topological consistency: adjacent vertex patterns | No | |
| G047 | Relaxed topological consistency: concise edge patterns | No | |
| G048 | Parenthesized path pattern: subpath variable declaration | Unknown | Needs technical review. |
| G049 | Parenthesized path pattern: path mode prefix | Unknown | Needs technical review. |
| G050 | Parenthesized path pattern: `WHERE` clause | Unknown | Needs technical review. |
| G051 | Parenthesized path pattern: non-local predicates | Unknown | Needs technical review. |
| G060 | Bounded graph pattern quantifiers | Yes | `{m,n}`, `{m}`, `{,n}` syntax. Maximum upper bound of 8. |
| G061 | Unbounded graph pattern quantifiers | No | Unbounded quantifiers (`{m,}`, `*`, `+`) aren't currently supported. Bounded quantifiers have a maximum upper bound of 8. |
| G074 | Label expression: wildcard label | No | Wildcards aren't currently supported. |
| G080 | Simplified path pattern expression: basic defaulting | Unknown | Needs technical review. |
| G081 | Simplified path pattern expression: full overrides | Unknown | Needs technical review. |
| G082 | Simplified path pattern expression: basic overrides | Unknown | Needs technical review. |
| G100 | `ELEMENT_ID` function | Unknown | Needs technical review. |
| G110 | `IS DIRECTED` predicate | No | |
| G111 | `IS LABELED` predicate | No | |
| G112 | `IS SOURCE` and `IS DESTINATION` predicate | No | |
| G113 | `ALL_DIFFERENT` predicate | No | |
| G114 | `SAME` predicate | No | |
| G115 | `PROPERTY_EXISTS` predicate | Unknown | Needs technical review. |

### GA — General features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GA01 | IEEE 754 floating-point operations | Yes | `FLOAT64` uses IEEE 754 binary64 representation. See [approximate numeric types](gql-values-and-value-types.md#approximate-numeric-types) and the [Query API value encoding](gql-query-api.md#floating-point-types). |
| GA03 | Explicit ordering of nulls | No | `NULL` sorts as the smallest value in [`ORDER BY`](gql-language-guide.md#order-by-statement), but explicit `NULLS FIRST`/`NULLS LAST` keywords aren't currently supported. |
| GA04 | Universal comparison | Unknown | Needs technical review. |
| GA05 | Cast specification | Yes | `CAST(value AS target_type)` is supported. See [type conversions](gql-values-and-value-types.md#type-conversions-and-casting). |
| GA06 | Value type predicate | No | |
| GA07 | Ordering by discarded binding variables | Unknown | Needs technical review. |
| GA08 | GQL-status objects with diagnostic records | Partial | Status objects with GQLSTATUS codes, messages, diagnostic records, and cause chains are supported. See [status codes reference](gql-reference-status-codes.md) and the [Query API status object](gql-query-api.md#status-object). Full GQL status code coverage isn't yet complete. |
| GA09 | Comparison of paths | Unknown | Needs technical review. |

### GB — Lexical features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GB01 | Long identifiers | Unknown | Needs technical review. |
| GB02 | Double minus sign comments | Yes | `--` line comments. |
| GB03 | Double solidus comments | Yes | `//` line comments and `/* */` block comments. |

### GC — Catalog management features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GC01 | Graph schema management | Unknown | Needs technical review. |
| GC02 | Graph schema management: `IF [NOT] EXISTS` | Unknown | Needs technical review. |
| GC03 | Graph type: `IF [NOT] EXISTS` | Unknown | Needs technical review. |
| GC04 | Graph management | Partial | [`CREATE GRAPH`](gql-schema-example.md) with a closed graph type is supported. `DROP GRAPH` isn't supported through GQL; use the [Fabric UI or REST API](/rest/api/fabric/graphmodel/items) instead. |
| GC05 | Graph management: `IF [NOT] EXISTS` | Unknown | Needs technical review. |

### GD — Data modification features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GD01 | Updatable graphs | No | Graph data is loaded and refreshed through [data management](manage-data.md), not through GQL `INSERT`/`SET`/`DELETE` statements. |
| GD02 | Graph label set changes | No | |
| GD03 | `DELETE` statement: subquery support | No | |
| GD04 | `DELETE` statement: simple expression support | No | |

### GE — Expression features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GE01 | Graph reference value expressions | Unknown | Needs technical review. |
| GE02 | Binding table reference value expressions | Unknown | Needs technical review. |
| GE03 | Let-binding of variables in expressions | Yes | [`LET`](gql-language-guide.md#let-statement) statement for variable binding. |
| GE04 | Graph parameters | Unknown | Needs technical review. |
| GE05 | Binding table parameters | Unknown | Needs technical review. |
| GE06 | Path value construction | No | |
| GE07 | Boolean `XOR` | No | |
| GE08 | Reference parameters | Unknown | Needs technical review. |
| GE09 | Horizontal aggregation | Yes | [Horizontal aggregation](gql-language-guide.md#horizontal-aggregation-with-group-list-variables) over group list variables from variable-length patterns. |

### GF — Function features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GF01 | Enhanced numeric functions | No | `abs`, `mod`, `floor`, `ceil`, and `sqrt` aren't currently supported. |
| GF02 | Trigonometric functions | No | |
| GF03 | Logarithmic functions | No | |
| GF04 | Enhanced path functions | Yes | [`nodes(path)`](gql-expressions.md#graph-functions) and [`edges(path)`](gql-expressions.md#graph-functions) are supported. |
| GF05 | Multi-character `TRIM` function | No | |
| GF06 | Explicit `TRIM` function | Yes | [`trim(string)`](gql-expressions.md#string-functions) removes leading and trailing whitespace. |
| GF07 | Byte string `TRIM` function | No | Byte string types aren't supported. |
| GF10 | Advanced aggregate functions: general set functions | Partial | [`collect_list`](gql-expressions.md#aggregate-functions) is supported. `stddev_pop`, `stddev_samp`, and `product` aren't currently supported. |
| GF11 | Advanced aggregate functions: binary set functions | No | `percentile_cont` and `percentile_disc` aren't currently supported. |
| GF12 | `CARDINALITY` function | No | Use [`size(list)`](gql-expressions.md#list-functions) instead. |
| GF13 | `SIZE` function | Yes | [`size(list)`](gql-expressions.md#list-functions) returns the number of elements in a list. |
| GF20 | Aggregate functions in sort keys | Unknown | Needs technical review. |

### GG — Graph type features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GG01 | Graph with an open graph type | Unknown | Needs technical review. The documentation describes closed graph types but doesn't explicitly state that open graph types are unsupported. |
| GG02 | Graph with a closed graph type | Yes | The default. Graph types define allowed node and edge types. See [GQL graph types](gql-graph-types.md). |
| GG03 | Graph type inline specification | Yes | Node and edge types are specified inline in the graph type definition. |
| GG04 | Graph type like a graph | Unknown | Needs technical review. |
| GG05 | Graph from a graph source | Unknown | Needs technical review. |
| GG20 | Explicit element type names | Yes | Labels serve as element type names. |
| GG21 | Explicit element type key label sets | Unknown | Needs technical review. |
| GG22 | Element type key label set inference | Unknown | Needs technical review. |
| GG23 | Optional element type key label sets | Yes | The key label set is the element type name. |
| GG24 | Relaxed structural consistency | Unknown | Needs technical review. |
| GG25 | Relaxed key label set uniqueness for edge types | Unknown | Needs technical review. |
| GG26 | Relaxed property value type consistency | Unknown | Needs technical review. |

### GL — Literal features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GL01 | Hexadecimal literals | Unknown | Needs technical review. |
| GL02 | Octal literals | Unknown | Needs technical review. |
| GL03 | Binary literals | Unknown | Needs technical review. |
| GL04 | Exact number in common notation without suffix | Yes | Integer literals like `123456`. See [exact numeric types](gql-values-and-value-types.md#exact-numeric-types). |
| GL05 | Exact number with suffix | No | |
| GL06 | Exact number in scientific notation with suffix | No | |
| GL07 | Approximate number in common notation with suffix | Unknown | Needs technical review. |
| GL08 | Approximate number in scientific notation with suffix | Unknown | Needs technical review. |
| GL09 | Optional float number suffix | Unknown | Needs technical review. |
| GL10 | Optional double number suffix | Unknown | Needs technical review. |
| GL11 | Opt-out character escaping | Unknown | Needs technical review. |
| GL12 | SQL datetime formats | Yes | ISO 8601 format through `ZONED_DATETIME('...')`. See [zoned datetime values](gql-values-and-value-types.md#zoned-datetime-values). |

### GP — Procedure features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GP01 | Inline procedure | No | `CALL` subqueries aren't currently supported. |
| GP02 | Inline procedure with implicit nested variable scope | Unknown | Needs technical review. |
| GP03 | Inline procedure with explicit nested variable scope | Unknown | Needs technical review. |
| GP04 | Named procedure calls | No | `CALL` named procedures aren't currently supported. |
| GP05 | Procedure-local value variable definitions | Unknown | Needs technical review. |
| GP06 | Procedure-local value variable definitions: based on simple expressions | Unknown | Needs technical review. |
| GP07 | Procedure-local value variable definitions: based on subqueries | Unknown | Needs technical review. |
| GP08 | Procedure-local binding table variable definitions | Unknown | Needs technical review. |
| GP09 | Procedure-local binding table variable definitions: based on simple expressions or references | Unknown | Needs technical review. |
| GP10 | Procedure-local binding table variable definitions: based on subqueries | Unknown | Needs technical review. |
| GP11 | Procedure-local graph variable definitions | Unknown | Needs technical review. |
| GP12 | Procedure-local graph variable definitions: based on simple expressions or references | Unknown | Needs technical review. |
| GP13 | Procedure-local graph variable definitions: based on subqueries | Unknown | Needs technical review. |
| GP14 | Binding tables as procedure arguments | Unknown | Needs technical review. |
| GP15 | Graphs as procedure arguments | Unknown | Needs technical review. |
| GP16 | `AT` schema clause | Unknown | Needs technical review. |
| GP17 | Binding variable definition block | Unknown | Needs technical review. |
| GP18 | Catalog and data statement mixing | Unknown | Needs technical review. |

### GQ — Query composition features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GQ01 | `USE` graph clause | Unknown | Needs technical review. |
| GQ02 | Composite query: `OTHERWISE` | No | |
| GQ03 | Composite query: `UNION` | Partial | `UNION ALL` is supported. `UNION DISTINCT` isn't currently supported. |
| GQ04 | Composite query: `EXCEPT DISTINCT` | No | |
| GQ05 | Composite query: `EXCEPT ALL` | No | |
| GQ06 | Composite query: `INTERSECT DISTINCT` | No | |
| GQ07 | Composite query: `INTERSECT ALL` | No | |
| GQ08 | `FILTER` statement | Yes | [`FILTER`](gql-language-guide.md#filter-statement) with `WHERE` keyword. |
| GQ09 | `LET` statement | Yes | [`LET`](gql-language-guide.md#let-statement) for computed variables. |
| GQ10 | `FOR` statement: list value support | No | |
| GQ11 | `FOR` statement: `WITH ORDINALITY` | Unknown | Needs technical review. |
| GQ12 | `ORDER BY` and page statement: `OFFSET` clause | Yes | [`OFFSET`](gql-language-guide.md#offset-and-limit-statements) (also aliased as `SKIP`). |
| GQ13 | `ORDER BY` and page statement: `LIMIT` clause | Yes | [`LIMIT`](gql-language-guide.md#offset-and-limit-statements). |
| GQ14 | Complex expressions in sort keys | Unknown | Needs technical review. |
| GQ15 | `GROUP BY` clause | Yes | [`RETURN` with `GROUP BY`](gql-language-guide.md#return-with-group-by-grouped-result-projection). |
| GQ16 | Pre-projection aliases in sort keys | Unknown | Needs technical review. |
| GQ17 | Element-wise group variable operations | Yes | Supported through [horizontal aggregation](gql-language-guide.md#horizontal-aggregation-with-group-list-variables). |
| GQ18 | Scalar subqueries | No | Scalar subqueries aren't currently supported. |
| GQ19 | Graph pattern `YIELD` clause | Unknown | Needs technical review. |
| GQ20 | Advanced linear composition with `NEXT` | No | |
| GQ21 | `OPTIONAL`: Multiple `MATCH` statements | No | |
| GQ22 | `EXISTS` predicate: multiple `MATCH` statements | Unknown | Needs technical review. |
| GQ23 | `FOR` statement: binding table support | Unknown | Needs technical review. |
| GQ24 | `FOR` statement: `WITH OFFSET` | Unknown | Needs technical review. |

### GS — Session management features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GS01 | `SESSION SET` command: session-local graph parameters | Unknown | Needs technical review. The Fabric platform might handle session management rather than GQL. |
| GS02 | `SESSION SET` command: session-local binding table parameters | Unknown | Needs technical review. |
| GS03 | `SESSION SET` command: session-local value parameters | Unknown | Needs technical review. |
| GS04 | `SESSION RESET` command: reset all characteristics | Unknown | Needs technical review. |
| GS05 | `SESSION RESET` command: reset session schema | Unknown | Needs technical review. |
| GS06 | `SESSION RESET` command: reset session graph | Unknown | Needs technical review. |
| GS07 | `SESSION RESET` command: reset time zone displacement | Unknown | Needs technical review. |
| GS08 | `SESSION RESET` command: reset all session parameters | Unknown | Needs technical review. |
| GS10 | `SESSION SET` command: session-local binding table parameters based on subqueries | Unknown | Needs technical review. |
| GS11 | `SESSION SET` command: session-local value parameters based on subqueries | Unknown | Needs technical review. |
| GS12 | `SESSION SET` command: session-local graph parameters based on simple expressions or references | Unknown | Needs technical review. |
| GS13 | `SESSION SET` command: session-local binding table parameters based on simple expressions or references | Unknown | Needs technical review. |
| GS14 | `SESSION SET` command: session-local value parameters based on simple expressions | Unknown | Needs technical review. |
| GS15 | `SESSION SET` command: set time zone displacement | Unknown | Needs technical review. |
| GS16 | `SESSION RESET` command: reset individual session parameters | Unknown | Needs technical review. |

### GT — Transaction management features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GT01 | Explicit transaction commands | Unknown | Needs technical review. The Fabric platform might manage transactions. |
| GT02 | Specified transaction characteristics | Unknown | Needs technical review. |
| GT03 | Use of multiple graphs in a transaction | Unknown | Needs technical review. |

### GV — Value type features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GV01 | 8-bit unsigned integer numbers | No | |
| GV02 | 8-bit signed integer numbers | No | |
| GV03 | 16-bit unsigned integer numbers | No | |
| GV04 | 16-bit signed integer numbers | No | |
| GV05 | Small unsigned integer numbers | No | |
| GV06 | 32-bit unsigned integer numbers | No | |
| GV07 | 32-bit signed integer numbers | Unknown | The [limitations](limitations.md) list `INT32` as not supported, but the [Query API](gql-query-api.md#integer-types) uses `INT32` as a return type. Needs technical review. |
| GV08 | Regular unsigned integer numbers | Unknown | Needs technical review. The docs describe [`UINT`/`UINT64`](gql-values-and-value-types.md#exact-numeric-types) but the mapping to this Feature ID needs confirmation. |
| GV09 | Specified integer number precision | No | |
| GV10 | Big unsigned integer numbers | No | |
| GV11 | 64-bit unsigned integer numbers | Yes | `UINT64`. |
| GV12 | 64-bit signed integer numbers | Yes | `INT64`. |
| GV13 | 128-bit unsigned integer numbers | No | |
| GV14 | 128-bit signed integer numbers | No | |
| GV15 | 256-bit unsigned integer numbers | No | |
| GV16 | 256-bit signed integer numbers | No | |
| GV17 | Decimal numbers | No | |
| GV18 | Small signed integer numbers | No | |
| GV19 | Big signed integer numbers | No | |
| GV20 | 16-bit floating-point numbers | No | |
| GV21 | 32-bit floating-point numbers | No | `FLOAT` in graph aliases `FLOAT64` (64-bit), not `FLOAT32`. See [approximate numeric types](gql-values-and-value-types.md#approximate-numeric-types). |
| GV22 | Specified floating-point number precision | No | |
| GV23 | Floating-point type name synonyms | Yes | `DOUBLE`, `FLOAT`, and `FLOAT64` all specify the same type. |
| GV24 | 64-bit floating-point numbers | Yes | `DOUBLE`/`FLOAT64`. |
| GV25 | 128-bit floating-point numbers | No | |
| GV26 | 256-bit floating-point numbers | No | |
| GV30 | Specified character string minimum length | No | |
| GV31 | Specified character string maximum length | Yes | `STRING` type. |
| GV32 | Specified character string fixed length | No | |
| GV35 | Byte string types | No | |
| GV36 | Specified byte string minimum length | No | |
| GV37 | Specified byte string maximum length | No | |
| GV38 | Specified byte string fixed length | No | |
| GV39 | Temporal types: date, local datetime, and local time | No | `DATE`, `LOCAL DATETIME`, and `LOCAL TIME` aren't supported. Only `ZONED DATETIME` is supported. |
| GV40 | Temporal types: zoned datetime and zoned time | Partial | [`ZONED DATETIME`](gql-values-and-value-types.md#zoned-datetime-values) is supported. `ZONED TIME` isn't currently supported. |
| GV41 | Temporal types: duration | No | |
| GV45 | Record types | Unknown | Needs technical review. |
| GV46 | Closed record types | Unknown | Needs technical review. |
| GV47 | Open record types | Unknown | Needs technical review. |
| GV48 | Nested record types | Unknown | Needs technical review. |
| GV50 | List value types | Yes | [`LIST<element_type>`](gql-values-and-value-types.md#list-values). Lists can't contain mixed types. |
| GV55 | Path value types | Yes | [`PATH`](gql-values-and-value-types.md#path-values) type for matched paths. |
| GV60 | Graph reference value types | Unknown | Needs technical review. |
| GV61 | Binding table reference value types | Unknown | Needs technical review. |
| GV65 | Dynamic union types | Unknown | Needs technical review. |
| GV66 | Open dynamic union types | Unknown | Needs technical review. |
| GV67 | Closed dynamic union types | Unknown | Needs technical review. |
| GV68 | Dynamic property value types | Unknown | Needs technical review. |
| GV70 | Immaterial value types | Yes | [`NULL`](gql-values-and-value-types.md#null-values) and [`NOTHING`](gql-values-and-value-types.md#nothing-type) types. |
| GV71 | Immaterial value types: null type | Yes | `NULL` is a member of every nullable value type. |
| GV72 | Immaterial value types: empty type | Yes | `NOTHING` / `NULL NOT NULL`. |
| GV90 | Explicit value type nullability | Yes | `NOT NULL` syntax is supported for all types. |

### GH — Other features

| Feature ID | Feature | Supported | Notes |
| ---------- | ------- | --------- | ----- |
| GH01 | External object references | Unknown | Needs technical review. |
| GH02 | Undirected edge patterns | No | Graph requires directed edges. Any-directed patterns (`-[]-`) match based on connectivity regardless of direction. |

## Features not yet supported

The following notable features aren't currently supported. For the full list, see any row marked **No** in the tables above. Features marked **Unknown** need technical review.

- `OPTIONAL MATCH` statement (GQ21)
- `CALL` inline procedure / subqueries (GP01)
- `FOR` statement (GQ10)
- `NEXT` keyword for advanced linear composition (GQ20)
- `UNION DISTINCT` statement (GQ03) — `UNION ALL` is supported
- Unbounded graph pattern quantifiers: `{m,}`, `*`, `+` (G061)
- `ACYCLIC` and `SIMPLE` path modes (G013, G012)
- Scalar subqueries (GQ18)
- Enhanced numeric, trigonometric, and logarithmic functions (GF01–GF03)
- `EXCEPT` and `INTERSECT` statements (GQ04–GQ07)
- `OTHERWISE` statement (GQ02)
- GQL `INSERT`/`SET`/`DELETE` statements (GD01) — use [data management](manage-data.md) instead

## Related content

- [GQL language guide](gql-language-guide.md)
- [GQL values and value types](gql-values-and-value-types.md)
- [GQL expressions, predicates, and functions](gql-expressions.md)
- [GQL graph patterns](gql-graph-patterns.md)
- [GQL graph types](gql-graph-types.md)
- [Current limitations](limitations.md)
- [ISO/IEC 39075:2024 — GQL standard](https://www.iso.org/standard/76120.html)
