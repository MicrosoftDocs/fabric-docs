---
title: GQL Quick Reference for graph in Microsoft Fabric
description: Quick reference for GQL syntax, statements, graph patterns, expressions, and functions supported by graph in Microsoft Fabric, with examples.
ms.topic: reference
ms.date: 09/18/2026
ms.reviewer: splantikow
ms.search.form: GQL Quick Reference
ai-usage: ai-assisted
---

# GQL quick reference

This article is a quick reference for GQL (Graph Query Language) syntax for
graph in Microsoft Fabric. Use it to recall syntax and defaults. For an
end-to-end explanation, see the [GQL language guide](gql-language-guide.md);
each section links to the focused reference that owns the complete details.

> [!NOTE]
> This article primarily uses the [social network example graph dataset](sample-datasets.md). It also provides a few examples that use the Adventure Works dataset from the [graph tutorial](tutorial-introduction.md).

## Query structure

GQL queries use a sequence of statements that define what data to get from the graph, how to process it, and how to show the results. Each statement has a specific purpose, and together they create a linear pipeline that matches data from the graph and transforms it step by step.

**Typical query flow:**  
A GQL query usually starts by specifying the graph pattern to match. Then, it uses optional statements for variable creation, filtering, sorting, pagination, and result output.

**Example:**

<!-- GQL Query: Checked 2025-11-19 -->
```gql
MATCH (n:Person)-[:knows]->(m:Person) 
LET fullName = n.firstName || ' ' || n.lastName 
FILTER m.gender = 'female' 
ORDER BY fullName ASC 
OFFSET 10
LIMIT 5 
RETURN fullName, m.firstName
```

**Statement composition:**

> [!IMPORTANT]
> Statements form an ordered pipeline and can't be rearranged arbitrarily.
> See the article on [current limitations](limitations.md).

- `MATCH` – Specify graph patterns to find.
- `LET` – Define variables from expressions.
- `FOR` – Expand a list into rows.
- `CALL` – Run an inline subquery and add its returned columns.
- `FILTER` – Keep rows matching conditions.
- `WHEN` – Route each input row to the first matching conditional branch.
- `ORDER BY` – Sort results.
- `OFFSET` – Skip many rows.
- `LIMIT` – Restrict the number of rows.
- `RETURN` – Output the final results.
- `NEXT` – Start another query stage by using the columns returned by the preceding stage.

Each statement builds on the previous one, so you incrementally refine and shape the query output. Use `UNION`, `UNION DISTINCT`, or `UNION ALL` to combine complete query blocks. For more information on each statement, see the following sections.

## Query statements

### MATCH

Find graph patterns in your data.

**Syntax:**

```gql
MATCH <graph pattern> [ WHERE <predicate> ]
...
```

**Example:**

<!-- GQL Query: Checked 2025-11-19 -->
```gql
MATCH (n:Person)-[:knows]-(m:Person) WHERE n.birthday > 2000
RETURN *
```

For more information about the `MATCH` statement, see the [Graph patterns](gql-graph-patterns.md).

### LET  

Create variables by using expressions.

**Syntax:**

```gql
LET <variable> = <expression>, <variable> = <expression>, ...
...
```

**Example:**

<!-- GQL Query: Checked 2025-11-19 -->
```gql
MATCH (n:Person)
LET fullName = n.firstName || ' ' || n.lastName
RETURN fullName
```

For more information about the `LET` statement, see the [GQL language guide](gql-language-guide.md#let-statement).

### FOR

Expands a list into rows and optionally returns each element's position.

**Syntax:**

```gql
FOR <variable> IN <list_expression>
  [ WITH OFFSET <offset_variable> | WITH ORDINALITY <ordinality_variable> ]
...
```

**Example:**

<!-- GQL Query: Added 2026-09-16 -->
```gql
FOR value IN [10, 20] WITH OFFSET index
RETURN value, index
```

`WITH OFFSET` starts at `0`. `WITH ORDINALITY` starts at `1`.

For more information about the `FOR` statement, see the [GQL language guide](gql-language-guide.md#for-statement).

### CALL

Runs an inline subquery for each input row. Variables already in scope are implicitly available inside the subquery.

**Syntax:**

```gql
[ OPTIONAL ] CALL {
  <query statements>
  RETURN <columns>
}
...
```

Of the variables created inside the subquery, only columns from its final `RETURN` statement become available outside it. Ordinary `CALL` drops an outer row when the subquery returns no rows and multiplies it when the subquery returns multiple rows. `OPTIONAL CALL` preserves an outer row with `NULL` subquery columns when the subquery returns no rows.

<!-- GQL Query: Added 2026-09-16 -->
```gql
MATCH (p:Person)
CALL {
  MATCH (p)-[:knows]->(friend:Person)
  RETURN count(*) AS friendCount
}
RETURN p.firstName, friendCount
```

For more information about inline subqueries, see the [GQL language guide](gql-language-guide.md#call-statement).

### FILTER

Keeps rows that match conditions.

**Syntax:**

```gql
FILTER [ WHERE ] <predicate>
...
```

**Example:**

<!-- GQL Query: Checked 2025-11-19 -->
```gql
MATCH (n:Person)-[:knows]->(m:Person)
FILTER WHERE n.birthday > m.birthday
RETURN *
```

For more information about the `FILTER` statement, see the [GQL language guide](gql-language-guide.md#filter-statement).

### ORDER BY

Sorts the results.

**Syntax:**

```gql
ORDER BY <expression> [ ASC | DESC ] [ NULLS FIRST | NULLS LAST ], ...
...
```

**Example:**

<!-- GQL Query: Added 2026-09-16 -->
```gql
MATCH (n:Person)
RETURN *
ORDER BY n.lastName ASC NULLS LAST, n.firstName ASC
```

Null placement is independent of sort direction. The default is `NULLS LAST`
for both `ASC` and `DESC`; specify `NULLS FIRST` to place null values before
non-null values.

> [!IMPORTANT]
> The requested order of rows is only guaranteed to hold immediately after a preceding `ORDER BY` statement.
> Any following statements (if present) aren't guaranteed to preserve any such order.

For more information about the `ORDER BY` statement, see the [GQL language guide](gql-language-guide.md#order-by-statement).

### OFFSET/LIMIT

Skip rows and limit the number of results.

**Syntax:**

```gql
OFFSET <offset> [ LIMIT <limit> ]
LIMIT <limit>
...
```

**Example:**

<!-- GQL Query: Checked 2025-11-19 -->
```gql
MATCH (n:Person)
ORDER BY n.birthday
OFFSET 10 LIMIT 20
RETURN n.firstName || ' ' || n.lastName AS name, n.birthday
```

For more information about the `OFFSET` and `LIMIT` statements, see the [GQL language guide](gql-language-guide.md#offset-and-limit-statements).

### RETURN

Output the final results.

**Syntax:**

```gql
RETURN [ DISTINCT ] <expression> [ AS <alias> ], ...
```

**Example:**

<!-- GQL Query: Checked 2025-11-19 -->
```gql
MATCH (n:Person)
RETURN n.firstName, n.lastName
```

For more information about the `RETURN` statement, see the [GQL language guide](gql-language-guide.md#return-basic-result-projection).

### NEXT

Starts another query stage. Only columns returned by the preceding stage are available after `NEXT`.

**Syntax:**

```gql
<query stage>
RETURN <columns>
NEXT
<query stage>
```

**Example:**

<!-- GQL Query: Added 2026-09-16 -->
```gql
RETURN 1 AS value
NEXT
RETURN value + 1 AS nextValue
```

Either stage can contain a union of query blocks. The union is evaluated within that stage before its output crosses the `NEXT` boundary.

For more information about `NEXT`, see the [GQL language guide](gql-language-guide.md#next).

### Conditional statements

Routes each input row to the first `WHEN` branch whose predicate evaluates to `TRUE`.

**Syntax:**

```gql
WHEN <predicate> THEN <linear query statement or { query statements }>
[ WHEN <predicate> THEN <linear query statement or { query statements }> ... ]
[ ELSE <linear query statement or { query statements }> ]
```

Predicates must be Boolean and are evaluated in order. `FALSE` and `UNKNOWN` fall through to the next branch. If no branch matches and there's no `ELSE`, the input row is omitted. Predicates after the first match and unselected branch bodies aren't evaluated.

<!-- GQL Query: Added 2026-09-16 -->
```gql
RETURN 'Alice' AS name, 19900101u AS birthday
NEXT
WHEN birthday < 20000101u THEN
  RETURN name, 'Before 2000' AS era
ELSE
  RETURN name, '2000 or later' AS era
```

All branches must return the same column names with compatible data types. Enclose a branch in braces when it contains a nested procedure.

For more information, see [Conditional statements](gql-language-guide.md#conditional-statements).

### UNION

Combines the output of complete query blocks.

**Syntax:**

```gql
<query block>
UNION [ DISTINCT | ALL ]
<query block>
```

Bare `UNION` and `UNION DISTINCT` remove duplicate rows. `UNION ALL` preserves duplicate rows. Each query block must return the same set of column names with compatible data types.

For more information about unions, see the [GQL language guide](gql-language-guide.md#union-and-union-all).

## Graph patterns

Graph patterns describe the structure of the graph to match.

### Node patterns

In [graph databases](graph-database.md), use nodes to represent entities, such as people, products, or places.

Node patterns describe how to match nodes in the graph. You can filter by label or bind variables.

```gql
(n)              -- Any node
(n:Person)       -- Node with Person label  
(n:City&Place)   -- Node with City AND Place label
(:Person)        -- Person node, don't bind variable
```

For more information about node patterns, see the [Graph patterns](gql-graph-patterns.md).

### Edge patterns

Edge patterns specify relationships between nodes, including direction and edge type. In graph databases, an edge represents a connection or relationship between two nodes.

```gql
<-[e]-             -- Incoming edge
-[e]->             -- Outgoing edge
-[e]-              -- Any edge
-[e:knows]->       -- Edge with label ("relationship type")
-[e:knows|likes]-> -- Edges with different labels
-[:knows]->        -- :knows edge, don't bind variable
```

For more information about edge patterns, see the [Graph patterns](gql-graph-patterns.md).

### Label expressions

Label expressions let you match nodes with specific label combinations by using logical operators.

```gql
:Person&Company                  -- Both Person AND Company labels
:Person|Company                  -- Person OR Company labels
:!Company                        -- NOT Company label
:(Person|!Company)&Active        -- Complex expressions with parentheses
```

For more information about label expressions, see the [Graph patterns](gql-graph-patterns.md).

### Path patterns  

Path patterns describe traversals through the graph, including hop counts and variable bindings.

```gql
(a)-[:knows|likes]->{1,3}(b)        -- 1-3 hops via knows/likes
p=()-[:knows]->()                   -- Bind a path variable
MATCH REPEATABLE ELEMENTS (a)->(b)  -- Explicit default match mode
MATCH DIFFERENT EDGES (a)->(b), (a)->(c)
MATCH ALL TRAIL (a)->{1,4}(b)       -- Every edge-unique path
MATCH p = ANY SHORTEST (a)->{1,4}(b) -- One shortest path per endpoint pair
```

`WALK` is the default path mode and allows repeated nodes and edges. `TRAIL` prevents repeated edges. `SIMPLE` prevents repeated nodes except for a closing first-to-last cycle, and `ACYCLIC` prevents all repeated nodes. Both node-unique modes also prevent repeated edges because edge reuse would repeat endpoint nodes. `ALL` is the default path search. `ANY SHORTEST` returns one shortest path for each source-destination pair and doesn't choose deterministically among tied paths.

Supported quantifiers include fixed `{n}`, bounded `{m,n}` and `{,n}`, and unbounded `{m,}`, `*`, and `+`. Unbounded `ALL WALK` patterns aren't supported; use a terminating path mode. Unbounded `ANY SHORTEST WALK` has additional shape and path-value restrictions. For details, see [GQL graph patterns](gql-graph-patterns.md#unbounded-variable-length-patterns).

For more information about path patterns, see the [Graph patterns](gql-graph-patterns.md).

### Multiple patterns

Use multiple patterns to match complex, nonlinear graph structures in a single query.

```gql
(a)->(b), (a)->(c)               -- Multiple edges from same node
(a)->(b)<-(c), (b)->(d)          -- Nonlinear structures
```

For more information about multiple patterns, see the [Graph patterns](gql-graph-patterns.md).

## Values and value types

### Basic types

Basic types are primitive data values like strings, numbers, booleans, and datetimes.

```gql
STRING           -- 'hello', "world"
INT64            -- 42, -17
FLOAT64          -- 3.14, -2.5e10, -17d
BOOL             -- TRUE, FALSE, UNKNOWN
ZONED DATETIME   -- ZONED_DATETIME('2023-01-15T10:30:00Z')
```

The `d` or `D` suffix creates an approximate `FLOAT64` literal. An exponent without a suffix also creates a
`FLOAT64` value. The `f` and `F` literal suffixes aren't currently supported.

For more information about basic types, see [GQL values and value types](gql-values-and-value-types.md).

### Reference value types

Reference value types are nodes and edges that you use as values in queries.

```gql
NODE             -- Node reference values
EDGE             -- Edge reference values
```

For more information about reference value types, see [GQL values and value types](gql-values-and-value-types.md).

### Collection types

Collection types group multiple values, like lists and paths.

```gql
LIST<INT64>      -- [1, 2, 3]
LIST<STRING>     -- ['a', 'b', 'c']
PATH             -- Path values
```

For more information about collection types, see [GQL values and value types](gql-values-and-value-types.md).

### Material and nullable types

Every value type is either nullable (includes the null value) or material (excludes it).
By default, types are nullable unless you explicitly specify `NOT NULL`.

```gql
STRING NOT NULL  -- Material (Non-nullable) string type
INT64            -- Nullable (default) integer type
```

<!--
## Graph types

Graph types define the structure of nodes, edges, and constraints in the graph.

### Node types

```gql
(:Person => { 
    id :: UINT64 NOT NULL, 
    name :: STRING 
})

(:University => :Organization)   -- Inheritance
ABSTRACT (:Message => { ... })   -- Abstract type
```

### Edge types

```gql
(:Person)-[:knows { creationDate :: ZONED DATETIME }]->(:Person)
(:Person)-[:workAt { workFrom :: UINT64 }]->(:Company)
```

### Node key constraints

```gql
CONSTRAINT person_pk
  FOR (n:Person) REQUIRE n.id IS KEY

CONSTRAINT compound_key  
  FOR (n:Node) REQUIRE (n.prop1, n.prop2) IS KEY
```

Learn more about [graph types](gql-graph-types.md).
-->

## Expressions & operators

### Conditional

Simple `CASE` expressions compare one expression with one or more values.

```gql
CASE expr WHEN val THEN val ELSE val END -- Simple CASE
NULLIF(a, b)                           -- NULL if a = b
```

Searched `CASE WHEN <predicate>` expressions aren't supported. Use a [conditional statement](gql-language-guide.md#conditional-statements) to route rows based on predicates.

For more information about conditional expressions, see the [GQL expressions and functions](gql-expressions.md).

### Comparison

Comparison operators compare values and check for equality, ordering, or nulls.

```gql
=, <>, <, <=, >, >=              -- Standard comparison
IS NULL, IS NOT NULL             -- Null checks
```

For more information about comparison predicates, see the [GQL expressions and functions](gql-expressions.md).

### Logical

Logical operators combine or negate boolean conditions in queries.

```gql
AND, OR, NOT, XOR               -- Boolean logic
```

For more information about logical expressions, see the [GQL expressions and functions](gql-expressions.md).

### EXISTS

Tests whether a procedure-form subquery returns at least one row.

```gql
EXISTS {
  MATCH (p)-[:knows]->(friend:Person)
  RETURN friend
}
```

`EXISTS` returns a non-null Boolean value. Use `NOT EXISTS` to test that the subquery returns no rows. You can use the result in `WHERE` or `FILTER`, `LET`, `RETURN`, `ORDER BY`, and aggregate filter or source expressions. `EXISTS` isn't supported inside a list predicate filter.

> [!IMPORTANT]
> Graph-pattern-only forms such as `EXISTS { (p)-[:knows]->(friend) }` and `EXISTS ((p)-[:knows]->(friend))` aren't supported. Use the procedure form with `MATCH` shown in the preceding example.

> [!CAUTION]
> An ungrouped aggregate such as `RETURN count(*)` returns one row even when no pattern matches. Because `EXISTS` tests for rows, that form evaluates to `TRUE`.

For more information about `EXISTS`, see [Existence subqueries](gql-expressions.md#existence-subqueries).

### Arithmetic  

Arithmetic operators perform calculations on numbers.

```gql
+, -, *, /                       -- Basic arithmetic operations
1.00m / 8.00m                    -- Exact result: 0.1250m
```

For more information about arithmetic expressions, see the [GQL expressions and functions](gql-expressions.md).

### String patterns

String pattern predicates match substrings, prefixes, or suffixes in strings.

```gql
n.firstName CONTAINS 'John'          -- Has substring
n.browserUsed STARTS WITH 'Chrome'   -- Starts with prefix
n.locationIP ENDS WITH '.1'          -- Ends with suffix
MSFT.REGEXP_LIKE(n.firstName, '^jo', 'i') -- RE2 regular expression
```

For more information about string pattern predicates, see the [GQL expressions and functions](gql-expressions.md).

### List operations

List operations test membership, access elements, and measure list length.

```gql
n.gender IN ['male', 'female']    -- Membership test
n.tags[0]                        -- First element
size(n.tags)                     -- List length
ALL(x IN n.tags WHERE x <> '')   -- Every element matches
ANY(x IN n.tags WHERE x = 'gql') -- At least one element matches
NONE(x IN n.tags WHERE x = '')   -- No element matches
SINGLE(x IN n.tags WHERE x = 'gql') -- Exactly one element matches
```

List predicate functions return `TRUE`, `FALSE`, or `UNKNOWN` according to the filter results. For an empty list, `ALL` and `NONE` return `TRUE`, while `ANY` and `SINGLE` return `FALSE`. A null source list returns `UNKNOWN`.

The element binding is local to the filter and can shadow an outer variable. Aggregates over that local binding and `EXISTS` subqueries inside the filter aren't supported.

For more information, see [List predicate functions](gql-expressions.md#list-predicate-functions).

### Property access

Property access gets the value of a property from a node or edge.

```gql
n.firstName                      -- Property access
```

For more information about property access, see the [GQL expressions and functions](gql-expressions.md).

## Functions

Use built-in functions to transform values, inspect graph elements, and aggregate rows.

### Numeric functions

Numeric functions calculate numeric values or produce integer ranges.

```gql
abs(value)                       -- Absolute value; preserves the numeric type
power(base, exponent)            -- Exponentiation; returns DOUBLE
sin(radians), cos(radians)       -- Trigonometric functions
asin(value), acos(value)         -- Inverse functions; value must be in [-1, 1]
degrees(radians)                 -- Convert radians to degrees
radians(degrees)                 -- Convert degrees to radians
range(start, end)                -- Integer range with step 1
range(start, end, step)          -- Integer range with a nonzero step
```

Other supported trigonometric functions are `TAN`, `COT`, `ATAN`, `SINH`,
`COSH`, and `TANH`. Except for `ABS` and `RANGE`, these numeric functions
return `DOUBLE`.

Learn more about numeric functions in [GQL expressions and functions](gql-expressions.md#numeric-functions).

### Aggregate functions

Aggregate functions compute summary values for groups of rows (vertical aggregation) or over the elements of a group list (horizontal aggregation).

```gql
count(*)                         -- Count all rows
count(expr)                      -- Count non-null values
sum(p.birthday)                  -- Sum values
avg(p.birthday)                  -- Average
min(p.birthday), max(p.birthday) -- Minimum and maximum values
collect_list(p.firstName)        -- Collect inputs, including nulls
collect_one(p.firstName)         -- Select one non-null value
collect_elements(p.roles)        -- Concatenate list-valued inputs
count(DISTINCT expr)             -- Remove duplicate expression values
count(*) FILTER (WHERE predicate LIMIT 10) -- Filter and limit this aggregate
```

Without grouping columns, an aggregate query with no input rows returns `0`
for `COUNT`, an empty list for `COLLECT_LIST` and `COLLECT_ELEMENTS`, and null
for `SUM`, `AVG`, `MIN`, `MAX`, and `COLLECT_ONE`. A group-list argument makes
the aggregate horizontal.

Learn more about aggregate functions in the [GQL expressions and functions](gql-expressions.md).

### String functions  

String functions let you work with and analyze string values.

```gql
char_length(s)                   -- String length
upper(s), lower(s)               -- Unicode case mapping
casefold(s)                      -- Unicode caseless form
normalize(s)                     -- Normalize a string to NFC
normalize(s, NFD)                -- Normalize a string to NFD
trim(s)                          -- Trim spaces
trim(leading '_' from s)         -- Trim one custom byte
string_join(list)                -- Join with ", "
string_join(list, delimiter)     -- Join with a custom delimiter
MSFT.REGEXP_COUNT(s, pattern)    -- Count RE2 matches
MSFT.REGEXP_INSTR(s, pattern)    -- Find a zero-based match position
MSFT.REGEXP_SUBSTR(s, pattern)   -- Return matching text
MSFT.REGEXP_REPLACE(s, pattern, replacement) -- Replace matches
```

Regex patterns, replacements, and options must be literals. For signatures, flags, and null behavior, see [String functions](gql-expressions.md#string-functions).

### List functions

List functions let you work with lists, like checking length or trimming size.

```gql
size(list)                       -- List length
trim(list, n)                    -- Trim a list to at most n elements
```

For more information about list functions, see [GQL expressions and functions](gql-expressions.md).

### Graph functions

Graph functions let you get information from nodes, paths, and edges.

```gql
labels(node)                     -- Get node labels
element_id(node_or_edge)         -- Get an opaque element identifier
nodes(path)                      -- Get path nodes
edges(path)                      -- Get path edges
elements(path)                   -- Get all path nodes and edges
path_length(path)                -- Get number of edges in a path
```

For more information about graph functions, see [GQL expressions and functions](gql-expressions.md).

### Temporal functions

Temporal functions let you work with date and time values.

```gql
CURRENT_TIMESTAMP                -- Get the current zoned datetime
ZONED_DATETIME(string)           -- Parse an ISO 8601 zoned datetime
DURATION(string)                 -- Parse an ISO 8601 day-time duration
```

For more information about temporal functions, see [GQL expressions and functions](gql-expressions.md).

### Generic functions

Generic functions let you work with data in common ways.

```gql
coalesce(expr1, expr2, ...)    -- Get the first non-null value
to_json_string(value)          -- Convert value to JSON string
nullif(a, b)                   -- NULL if a = b, else a
```

For more information about generic functions, see [GQL expressions and functions](gql-expressions.md).

## Task-oriented examples

Use the how-to articles when you need complete, ready-to-adapt query patterns:

- [Write common GQL queries](write-common-gql-queries.md) for neighbors,
  multihop traversal, shared connections, and existence checks.
- [Filter and aggregate graph data](filter-aggregate-graph-data.md) for row and
  pattern filtering, grouping, collection aggregates, and conditional routing.
- [Write graph pattern queries](write-graph-pattern-queries.md) for path modes,
  path searches, pattern composition, and optional matching.

## Related content

- [GQL language guide](gql-language-guide.md)
- [GQL graph patterns](gql-graph-patterns.md)
- [GQL expressions, predicates, and functions](gql-expressions.md)
- [GQL values and value types](gql-values-and-value-types.md)
