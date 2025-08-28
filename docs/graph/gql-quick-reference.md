---
title: GQL Quick Reference
description: Quick reference guide for GQL syntax, statements, patterns, and functions in graph in Microsoft Fabric.
ms.topic: reference
ms.date: 09/15/2025
author: spmsft
ms.author: splantikow
ms.reviewer: eur
---

# GQL quick reference

Quick reference for GQL (Graph Query Language) syntax in graph in Microsoft Fabric. For detailed explanations, see the [GQL language reference](gql-language-reference.md).

## Query structure

GQL queries are composed of a sequence of statements that define what data to retrieve from the graph, how to process it, and how to present the results. Each statement serves a specific purpose, and together they form a linear pipeline that transforms graph data step by step.

**Typical query flow:**  
A GQL query usually starts by specifying the graph pattern to match, followed by optional statements for variable creation, filtering, sorting, pagination, and finally, result output.

**Example:**
```gql
MATCH (n:Person)-[:knows]->(m:Person) 
LET fullName = n.firstName || ' ' || n.lastName 
FILTER m.city = 'Seattle' 
ORDER BY fullName ASC 
OFFSET 10
LIMIT 5 
RETURN fullName, m.city
```

**Statement order:**  
Statements must appear in the following order within a query:
1. `MATCH` – Specify graph patterns to find.
2. `LET` – Define variables from expressions.
3. `FILTER` – Keep rows matching conditions.
4. `ORDER BY` – Sort results.
5. `OFFSET` – Skip a number of rows.
6. `LIMIT` – Restrict the number of rows.
7. `RETURN` – Output the final results.

Each statement builds on the previous, allowing you to incrementally refine and shape the query output. For more details on each statement, see the sections below.

## Query statements

### MATCH

Find graph patterns. 

**Syntax:**
```gql
MATCH <graph pattern> [ WHERE <predicate> ]
```
**Example:**
```gql
MATCH (n:Person)-[:knows]-(m:Person) WHERE n.age > 25
```

For more information about the `MATCH` statement, see the [comprehensive guide](gql-language-reference.md#match-statement).

### LET  

Create variables from expressions. 

**Syntax:**
```gql
LET <variable> = <expression>, <variable> = <expression>, ...
```
**Example:**
```gql
LET fullName = n.firstName || ' ' || n.lastName
```

For more information about the `LET` statement, see the [comprehensive guide](gql-language-reference.md#let-statement).

### FILTER

Keep rows matching conditions. 

**Syntax:**
```gql
FILTER [ WHERE ] <predicate>
```
**Example:**
```gql
FILTER WHERE n.age > m.age
```

For more information about the `FILTER` statement, see the [comprehensive guide](gql-language-reference.md#filter-statement).


### ORDER BY

Sort results. 

**Syntax:**
```gql
ORDER BY <expression> [ ASC | DESC ], ...
```
**Example:**
```gql
ORDER BY n.lastName ASC, n.firstName ASC
```

For more information about the `ORDER BY` statement, see the [comprehensive guide](gql-language-reference.md#order-by-statement).

### OFFSET/LIMIT

Skip and limit rows. 

**Syntax:**
```gql
OFFSET <offset> [ LIMIT <limit> ]
LIMIT <limit>
```
**Example:**
```gql
OFFSET 10 LIMIT 20
```

For more information about the `OFFSET` and `LIMIT` statements, see the [comprehensive guide](gql-language-reference.md#offset-and-limit-statements).

### RETURN

Output final results. 

**Syntax:**
```gql
RETURN [ DISTINCT ] <expression> [ AS <alias> ], ...
```
**Example:**
```gql
RETURN n.name, m.age
```

For more information about the `RETURN` statement, see the [comprehensive guide](gql-language-reference.md#return-statement).

## Graph patterns

Graph patterns describe the structure of the graph to match against.

### Node patterns

Node patterns describe how to match nodes in the graph, optionally filtering by label or binding variables.

```gql
(n)              -- Any node
(n:Person)       -- Node with Person label  
(n:City&Place)   -- Node with City AND Place label
(:Person)        -- Person node, don't bind variable
```

For more information about node patterns, see the [comprehensive guide](gql-language-reference.md#simple-node-patterns).

### Edge patterns


Edge patterns specify relationships between nodes, including direction and edge type.

```gql
<-[e]-             -- Incoming edge
```

For more information about edge patterns, see the [comprehensive guide](gql-language-reference.md#simple-edge-patterns).

### Label expressions


Label expressions allow you to match nodes with specific label combinations using logical operators.

```gql
:Person&Company                  -- Both Person AND Company labels
:Person|Company                  -- Person OR Company labels
:!Company                        -- NOT Company label
:(Person|!Company)&Active        -- Complex expressions with parentheses
```

For more information about label expressions, see the [comprehensive guide](gql-language-reference.md#label-expressions).

### Path patterns  


Path patterns describe traversals through the graph, including hop counts and variable bindings.

```gql
(a)-[e1]->(b)-[e2]->(c)           -- 2-hop path
(a)-[e]->{2,4}(b)                 -- 2 to 4 hops
(a)-[e]->{1,}(b)                  -- 1 or more hops
(a)-[:knows|likes]->{1,3}(b)      -- 1-3 hops via knows/follows
p=()-[:knows]->()                 -- Binding a path variable
```

For more information about path patterns, see the [comprehensive guide](gql-language-reference.md#compose-path-patterns).

### Multiple patterns


Multiple patterns allow you to match complex, non-linear graph structures in a single query.

```gql
(a)->(b), (a)->(c)               -- Multiple edges from same node
(a)->(b)<-(c), (b)->(d)          -- Non-linear structures
```

For more information about multiple patterns, see the [comprehensive guide](gql-language-reference.md#compose-non-linear-patterns).

## Data types

### Basic types


Basic types represent primitive data values such as strings, numbers, booleans, and datetimes.

```gql
STRING           -- 'hello', "world"
INT64            -- 42, -17
FLOAT64          -- 3.14, -2.5e10
BOOL             -- TRUE, FAKSE, UNKNOWN
ZONED DATETIME   -- ZONED_DATETIME('2023-01-15T10:30:00Z')
```

For more information about basic types, see the [comprehensive guide](gql-language-reference.md#understand-values-and-value-types).

### Reference value types


Reference value types represent nodes and edges as values in queries.

```gql
NODE             -- Node reference values
EDGE             -- Edge reference values
```

For more information about reference value types, see the [comprehensive guide](gql-language-reference.md#reference-value-types).

### Collection types


Collection types group multiple values together, such as lists and paths.

```gql
LIST<INT64>      -- [1, 2, 3]
LIST<STRING>     -- ['a', 'b', 'c']
PATH             -- Path values
```

For more information about collection types, see the [comprehensive guide](gql-language-reference.md#constructed-value-types).

### Nullable types

```gql
STRING NOT NULL  -- Non-nullable string
INT64            -- Nullable int (default)
```

## Graph types & schema

Graph types and schema define the structure of nodes, edges, and constraints in the graph.

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

For more information about graph types and schema, see the [comprehensive guide](gql-language-reference.md#graph-types--schema).

## Expressions & operators

### Comparison


Comparison operators are used to compare values and check for equality, ordering, or nulls.

```gql
=, <>, <, <=, >, >=              -- Standard comparison
IS NULL, IS NOT NULL             -- Null checks
```

For more information about comparison predicates, see the [comprehensive guide](gql-language-reference.md#comparison-predicates).

### Logical


Logical operators combine or negate boolean conditions in queries.

```gql
AND, OR, NOT                     -- Boolean logic
```

For more information about logical expressions, see the [comprehensive guide](gql-language-reference.md#logical-expressions).

### Arithmetic  


Arithmetic operators perform mathematical calculations on numeric values.

```gql
, -, *, /                       -- Basic math
```

For more information about arithmetic expressions, see the [comprehensive guide](gql-language-reference.md#arithmetic-expressions).
+, -, *, /                       -- Basic math
```

### String patterns


String pattern predicates match substrings, prefixes, or suffixes in string values.

```gql
n.name CONTAINS 'John'           -- Contains substring
n.email STARTS WITH 'admin'     -- Starts with prefix  
n.phone ENDS WITH '1234'        -- Ends with suffix
```

For more information about string pattern predicates, see the [comprehensive guide](gql-language-reference.md#string-pattern-predicates).

### List operations


List operations test membership, access elements, and measure list size.

```gql
n.age IN [25, 30, 35]            -- Membership test
n.tags[0]                        -- First element
size(n.tags)                     -- List length
```

For more information about list membership predicates, see the [comprehensive guide](gql-language-reference.md#list-membership-predicates).

### Property access


Property access retrieves the value of a property from a node or edge.

```gql
n.firstName                      -- Property access
```

For more information about property access, see the [comprehensive guide](gql-language-reference.md#property-access).

## Functions

### Aggregate functions


Aggregate functions compute summary values over groups of rows.

```gql
count(*)                         -- Count all rows
count(expr)                      -- Count non-null values
sum(n.age)                       -- Sum values
avg(n.age)                       -- Average
min(n.age), max(n.age)           -- Min/max values
collect_list(n.name)             -- Collect into list
```

For more information about aggregate functions, see the [comprehensive guide](gql-language-reference.md#aggregate-functions).

### String functions  


String functions manipulate and analyze string values.

```gql
char_length(s)                   -- String length
upper(s), lower(s)               -- Case conversion (US ASCII only)
trim(s)                          -- Remove leading/trailing whitespace
string_join(list, separator)     -- Join list elements with separator
```

For more information about string functions, see the [comprehensive guide](gql-language-reference.md#string-functions).

### List functions


List functions operate on lists, such as measuring length or trimming size.

```gql
size(list)                       -- List length
trim(list,n)                     -- trim a list to be at most of size `n`
```

For more information about list functions, see the [comprehensive guide](gql-language-reference.md#list-functions).

### Graph functions


Graph functions extract information from nodes, paths, and edges.

```gql
labels(node)                     -- Get node labels
nodes(path)                      -- Get path nodes
edges(path)                      -- Get path edges
```

For more information about graph functions, see the [comprehensive guide](gql-language-reference.md#graph-functions).

### Temporal functions

Temporal functions deal with date and time values.

```gql
zoned_datetime()               -- Current timestamp
```

For more information about temporal functions, see the [comprehensive guide](gql-language-reference.md#temporal-functions).

### Generic functions

Generic functions provide common utilities for working with data.

```gql
coalesce(expr1, expr2, ...)    -- First non-null value
```

For more information about generic functions, see the [comprehensive guide](gql-language-reference.md#generic-functions).

## Common patterns

### Find connections

```gql
-- Friends of friends  
MATCH (me:Person {name: 'Alice'})-[:knows]->{2}(fof:Person)
WHERE fof <> me
RETURN DISTINCT fof.name
```

### Aggregation

```gql
-- Count by group
MATCH (p:Person)
RETURN p.city, count(*) AS population
ORDER BY population DESC
```

### Top k

```gql
-- Top 10
MATCH (p:Person)-[:posted]->(m:Message)
RETURN p.name, count(m) AS posts
ORDER BY posts DESC
LIMIT 10
```

### Filtering & conditions

```gql
-- Complex conditions
MATCH (p:Person)
WHERE p.age >= 25 AND p.age <= 65 
  AND p.city IN ['Seattle', 'Portland']
  AND p.name IS NOT NULL
RETURN p.name, p.age
```

### Path traversal

```gql
-- Variable length paths
MATCH path = (start:Person {name: 'Alice'})-[:knows]->{1,3}(end:Person)
WHERE end.name = 'Bob'
RETURN path
```

## Related content

- [Graph overview](fabric-graph-overview.md) - graph in Microsoft Fabric introduction
- [Graph data models](graph-data-models.md) - Conceptual overview
- [GQL language reference](gql-language-reference.md) - Complete syntax and examples
