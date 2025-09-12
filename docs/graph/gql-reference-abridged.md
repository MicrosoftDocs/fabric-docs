---
title: GQL Quick Reference
description: Quick reference for GQL syntax, statements, patterns, and expressions in graph in Microsoft Fabric.
ms.topic: reference
ms.date: 09/15/2025
author: spmsft
ms.author: splantikow
ms.reviewer: eur
ms.service: fabric
#ms.subservice: graph
---

# GQL quick reference

This article is a quick reference for GQL (Graph Query Language) syntax in graph in Microsoft Fabric. For detailed explanations, see the [GQL language guide](gql-language-guide.md).

## Query structure

GQL queries use a sequence of statements that define what data to get from the graph, how to process it, and how to show the results. Each statement has a specific purpose, and together they form a linear pipeline that transforms graph data step by step.

**Typical query flow:**  
A GQL query usually starts by specifying the graph pattern to match, then uses optional statements for variable creation, filtering, sorting, pagination, and result output.

**Example:**
```gql
MATCH (n:Person)-[:knows]->(m:Person) 
LET fullName = n.firstName || ' ' || n.lastName 
FILTER m.gender = 'female' 
ORDER BY fullName ASC 
OFFSET 10
LIMIT 5 
RETURN fullName, m.firstName
```

**Statement order:**  
Statements must appear in the following order within a query:
1. `MATCH` – Specify graph patterns to find.
1. `LET` – Define variables from expressions.
1. `FILTER` – Keep rows matching conditions.
1. `ORDER BY` – Sort results.
1. `OFFSET` – Skip a number of rows.
1. `LIMIT` – Restrict the number of rows.
1. `RETURN` – Output the final results.

Each statement builds on the previous one, so you incrementally refine and shape the query output. For more details on each statement, see the sections below.

## Query statements

### MATCH

Find graph patterns in your data.

**Syntax:**
```gql
MATCH <graph pattern> [ WHERE <predicate> ]
```
**Example:**
```gql
MATCH (n:Person)-[:knows]-(m:Person) WHERE n.birthday > 20000101
```

For more information about the `MATCH` statement, see the [Graph patterns](gql-graph-patterns.md).

### LET  

Create variables using expressions.

**Syntax:**
```gql
LET <variable> = <expression>, <variable> = <expression>, ...
```
**Example:**
```gql
LET fullName = n.firstName || ' ' || n.lastName
```

For more information about the `LET` statement, see the [GQL language guide](gql-language-guide.md#let-statement).

### FILTER

Keep rows that match conditions.

**Syntax:**
```gql
FILTER [ WHERE ] <predicate>
```
**Example:**
```gql
FILTER WHERE n.birthday > m.birthday
```

For more information about the `FILTER` statement, see the [GQL language guide](gql-language-guide.md#filter-statement).

### ORDER BY

Sort the results.

**Syntax:**
```gql
ORDER BY <expression> [ ASC | DESC ], ...
```
**Example:**
```gql
ORDER BY n.lastName ASC, n.firstName ASC
```

For more information about the `ORDER BY` statement, see the [GQL language guide](gql-language-guide.md#order-by-statement).

### OFFSET/LIMIT

Skip rows and limit the number of results.

**Syntax:**
```gql
OFFSET <offset> [ LIMIT <limit> ]
LIMIT <limit>
```
**Example:**
```gql
OFFSET 10 LIMIT 20
```

For more information about the `OFFSET` and `LIMIT` statements, see the [GQL language guide](gql-language-guide.md#offset-and-limit-statements).

### RETURN

Output the final results.

**Syntax:**
```gql
RETURN [ DISTINCT ] <expression> [ AS <alias> ], ...
```
**Example:**
```gql
RETURN n.firstName, m.lastName
```

For more information about the `RETURN` statement, see the [GQL language guide](gql-language-guide.md#return-basic-results).

## Graph patterns

Graph patterns describe the structure of the graph to match.

### Node patterns

Node patterns describe how to match nodes in the graph. You can filter by label or bind variables.

```gql
(n)              -- Any node
(n:Person)       -- Node with Person label  
(n:City&Place)   -- Node with City AND Place label
(:Person)        -- Person node, don't bind variable
```

For more information about node patterns, see the [Graph patterns](gql-graph-patterns.md).

### Edge patterns

Edge patterns specify relationships between nodes, including direction and edge type.

```gql
<-[e]-             -- Incoming edge
```

For more information about edge patterns, see the [Graph patterns](gql-graph-patterns.md).

### Label expressions

Label expressions let you match nodes with specific label combinations using logical operators.

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
(a)-[:knows|likes]->{1,3}(b)      -- 1-3 hops via knows/likes
p=()-[:knows]->()                 -- Binding a path variable
```

For more information about path patterns, see the [Graph patterns](gql-graph-patterns.md).

### Multiple patterns

Multiple patterns let you match complex, non-linear graph structures in a single query.

```gql
(a)->(b), (a)->(c)               -- Multiple edges from same node
(a)->(b)<-(c), (b)->(d)          -- Non-linear structures
```

For more information about multiple patterns, see the [Graph patterns](gql-graph-patterns.md).

## Values and value types

### Basic types

Basic types are primitive data values like strings, numbers, booleans, and datetimes.

```gql
STRING           -- 'hello', "world"
INT64            -- 42, -17
FLOAT64          -- 3.14, -2.5e10
BOOL             -- TRUE, FALSE, UNKNOWN
ZONED DATETIME   -- ZONED_DATETIME('2023-01-15T10:30:00Z')
```

Learn more about basic types in the [GQL values and value types](gql-values-and-value-types.md).

### Reference value types

Reference value types are nodes and edges used as values in queries.

```gql
NODE             -- Node reference values
EDGE             -- Edge reference values
```

Learn more about reference value types in the [GQL values and value types](gql-values-and-value-types.md).

### Collection types

Collection types group multiple values, like lists and paths.

```gql
LIST<INT64>      -- [1, 2, 3]
LIST<STRING>     -- ['a', 'b', 'c']
PATH             -- Path values
```

Learn more about collection types in the [GQL values and value types](gql-values-and-value-types.md).

### Nullable types

```gql
STRING NOT NULL  -- Nonnullable string
INT64            -- Nullable int (default)
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

(:University => :Organisation)   -- Inheritance
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
AND, OR, NOT                     -- Boolean logic
```

For more information about logical expressions, see the [GQL expressions and functions](gql-expressions.md).

### Arithmetic  

Arithmetic operators perform calculations on numbers.

```gql
+, -, *, /                       -- Basic arithmetic operations
```

For more information about arithmetic expressions, see the [GQL expressions and functions](gql-expressions.md).

### String patterns

String pattern predicates match substrings, prefixes, or suffixes in strings.

```gql
n.firstName CONTAINS 'John'          -- Has substring
n.browserUsed STARTS WITH 'Chrome'   -- Starts with prefix
n.locationIP ENDS WITH '.1'          -- Ends with suffix
```

For more information about string pattern predicates, see the [GQL expressions and functions](gql-expressions.md).

### List operations

List operations test membership, access elements, and measure list length.

```gql
n.gender IN ['male', 'female']    -- Membership test
n.tags[0]                        -- First element
size(n.tags)                     -- List length
```

For more information about list membership predicates, see the [GQL expressions and functions](gql-expressions.md).

### Property access

Property access gets the value of a property from a node or edge.

```gql
n.firstName                      -- Property access
```

For more information about property access, see the [GQL expressions and functions](gql-expressions.md).

## Functions

### Aggregate functions

Aggregate functions compute summary values for groups of rows (vertical aggregation) or over the elements of a group list (horizontal aggregation).

```gql
count(*)                         -- Count all rows
count(expr)                      -- Count non-null values
sum(p.birthday)                  -- Sum values
avg(p.birthday)                  -- Average
min(p.birthday), max(p.birthday) -- Minimum and maximum values
collect_list(p.firstName)        -- Collect values into a list
```

Learn more about aggregate functions in the [GQL expressions and functions](gql-expressions.md).

### String functions  

String functions let you work with and analyze string values.

```gql
char_length(s)                   -- String length
upper(s), lower(s)               -- Change case (US ASCII only)
trim(s)                          -- Remove leading and trailing whitespace
string_join(list, separator)     -- Join list elements with a separator
```

Learn more about string functions in the [GQL expressions and functions](gql-expressions.md).

### List functions

List functions let you work with lists, like checking length or trimming size.

```gql
size(list)                       -- List length
trim(list, n)                    -- Trim a list to be at most size `n`
```

Learn more about list functions in the [GQL expressions and functions](gql-expressions.md).

### Graph functions

Graph functions let you get information from nodes, paths, and edges.

```gql
labels(node)                     -- Get node labels
nodes(path)                      -- Get path nodes
edges(path)                      -- Get path edges
```

Learn more about graph functions in the [GQL expressions and functions](gql-expressions.md).

### Temporal functions

Temporal functions let you work with date and time values.

```gql
zoned_datetime()               -- Get the current timestamp
```

Learn more about temporal functions in the [GQL expressions and functions](gql-expressions.md).

### Generic functions

Generic functions let you work with data in common ways.

```gql
coalesce(expr1, expr2, ...)    -- Get the first non-null value
```

Learn more about generic functions in the [GQL expressions and functions](gql-expressions.md).

## Common patterns

### Find connections

```gql
-- Friends of friends  
MATCH (me:Person {firstName: 'Alice'})-[:knows]->{2}(fof:Person)
WHERE fof <> me
RETURN DISTINCT fof.firstName
```

### Aggregation

```gql
-- Count by group
MATCH (p:Person)-[:isLocatedIn]->(c:City)
RETURN c.name, count(*) AS population
ORDER BY population DESC
```

### Top k

```gql
-- Top 10
MATCH (p:Person)-[:hasCreator]-(m:Post)
RETURN p.firstName, count(m) AS posts
ORDER BY posts DESC
LIMIT 10
```

### Filtering and conditions

```gql
-- Complex conditions
MATCH (p:Person)-[:isLocatedIn]->(c:City)
WHERE p.birthday >= 19800101 AND p.birthday <= 20000101
  AND c.name IN ['Seattle', 'Portland']
  AND p.firstName IS NOT NULL
RETURN p.firstName, p.birthday
```

### Path traversal

```gql
-- Variable length paths
MATCH path = (start:Person {firstName: 'Alice'})-[:knows]->{1,3}(end:Person)
WHERE end.firstName = 'Bob'
RETURN path
```

## Related content

- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
- [End-to-end tutorials in Microsoft Fabric](/fabric/fundamentals/end-to-end-tutorials)
