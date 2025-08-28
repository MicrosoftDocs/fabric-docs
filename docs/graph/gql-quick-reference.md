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

**Basic pattern:** Linear sequence of statements ending with `RETURN`

```gql
MATCH (pattern) WHERE condition RETURN result
```

**Statement order:** `MATCH` → `LET` → `FILTER` → `ORDER BY` → `OFFSET` → `LIMIT` → `RETURN`

## Query statements

### MATCH

Find graph patterns. [Details →](gql-language-reference.md#match-statement)

```gql
MATCH (n:Person)-[:knows]-(m:Person) WHERE n.age > 25
MATCH (a)-[e:follows]->(b), (b)-[:likes]->(c)
```

### LET  

Create variables from expressions. [Details →](gql-language-reference.md#let-statement)

```gql
LET fullName = n.firstName || ' ' || n.lastName
LET ageInMonths = n.age * 12
```

### FILTER

Keep rows matching conditions. [Details →](gql-language-reference.md#filter-statement)  

```gql
FILTER WHERE n.age > m.age
FILTER WHERE n.city IN ['Seattle', 'Portland']
```

### ORDER BY

Sort results. [Details →](gql-language-reference.md#order-by-statement)

```gql
ORDER BY n.lastName ASC, n.firstName ASC
ORDER BY n.age DESC
```

### OFFSET/LIMIT

Skip and limit rows. [Details →](gql-language-reference.md#offset-and-limit-statements)

```gql
OFFSET 10 LIMIT 20    -- Skip 10, take next 20
```

### RETURN

Output final results. [Details →](gql-language-reference.md#return-statement)

```gql
RETURN n.name, m.age
RETURN count(*) AS total
RETURN n.name AS person, m.name AS friend
```

## Graph patterns

### Node patterns

[Details →](gql-language-reference.md#simple-node-patterns)

```gql
(n)              -- Any node
(n:Person)       -- Node with Person label  
(n:City&Place)   -- Node with City AND Place label
(:Person)        -- Person node, don't bind variable
```

### Edge patterns

[Details →](gql-language-reference.md#simple-edge-patterns)

```gql
-[e]->             -- Directed edge, any type
-[e:knows]->       -- Directed edge, knows type
-[e:knows|likes]-> -- knows OR likes edge
<-[e]-             -- Incoming edge
-[e]-              -- Undirected (any direction)
```

### Label expressions

[Details →](gql-language-reference.md#label-expressions)

```gql
:Person&Company                  -- Both Person AND Company labels
:Person|Company                  -- Person OR Company labels
:!Company                        -- NOT Company label
:(Person|!Company)&Active        -- Complex expressions with parentheses
```

### Path patterns  

[Details →](gql-language-reference.md#compose-path-patterns)

```gql
(a)-[e1]->(b)-[e2]->(c)           -- 2-hop path
(a)-[e]->{2,4}(b)                 -- 2 to 4 hops
(a)-[e]->{1,}(b)                  -- 1 or more hops
(a)-[:knows|likes]->{1,3}(b)      -- 1-3 hops via knows/follows
p=()-[:knows]->()                 -- Binding a path variable
```

### Multiple patterns

[Details →](gql-language-reference.md#compose-non-linear-patterns)

```gql
(a)->(b), (a)->(c)               -- Multiple edges from same node
(a)->(b)<-(c), (b)->(d)          -- Non-linear structures
```

## Data types

### Basic types

[Details →](gql-language-reference.md#understand-values-and-value-types)

```gql
STRING           -- 'hello', "world"
INT64            -- 42, -17
FLOAT64          -- 3.14, -2.5e10
BOOL             -- TRUE, FAKSE, UNKNOWN
ZONED DATETIME   -- ZONED_DATETIME('2023-01-15T10:30:00Z')
```

### Reference value types

[Details →](gql-language-reference.md#reference-value-types)

```gql
NODE             -- Node reference values
EDGE             -- Edge reference values
```

### Collection types

[Details →](gql-language-reference.md#constructed-value-types)

```gql
LIST<INT64>      -- [1, 2, 3]
LIST<STRING>     -- ['a', 'b', 'c']
PATH             -- Path values
```

### Nullable types

```gql
STRING NOT NULL  -- Non-nullable string
INT64            -- Nullable int (default)
```

## Graph types & schema

[Details →](gql-language-reference.md#graph-types--schema)

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

## Expressions & operators

### Comparison

[Details →](gql-language-reference.md#comparison-predicates)

```gql
=, <>, <, <=, >, >=              -- Standard comparison
IS NULL, IS NOT NULL             -- Null checks
```

### Logical

[Details →](gql-language-reference.md#logical-expressions)

```gql
AND, OR, NOT                     -- Boolean logic
```

### Arithmetic  

[Details →](gql-language-reference.md#arithmetic-expressions)

```gql
+, -, *, /                       -- Basic math
```

### String patterns

[Details →](gql-language-reference.md#string-pattern-predicates)

```gql
n.name CONTAINS 'John'           -- Contains substring
n.email STARTS WITH 'admin'     -- Starts with prefix  
n.phone ENDS WITH '1234'        -- Ends with suffix
```

### List operations

[Details →](gql-language-reference.md#list-membership-predicates)

```gql
n.age IN [25, 30, 35]            -- Membership test
n.tags[0]                        -- First element
size(n.tags)                     -- List length
```

### Property access

[Details →](gql-language-reference.md#property-access)

```gql
n.firstName                      -- Property access
```

## Functions

### Aggregate functions

[Details →](gql-language-reference.md#aggregate-functions)

```gql
count(*)                         -- Count all rows
count(expr)                      -- Count non-null values
sum(n.age)                       -- Sum values
avg(n.age)                       -- Average
min(n.age), max(n.age)           -- Min/max values
collect_list(n.name)             -- Collect into list
```

### String functions  

[Details →](gql-language-reference.md#string-functions)

```gql
char_length(s)                   -- String length
upper(s), lower(s)               -- Case conversion (US ASCII only)
trim(s)                          -- Remove leading/trailing whitespace
string_join(list, separator)     -- Join list elements with separator
```

### List functions

[Details →](gql-language-reference.md#list-functions)

```gql
size(list)                       -- List length
trim(list,n)                     -- trim a list to be at most of size `n`
```

### Graph functions

[Details →](gql-language-reference.md#graph-functions)  

```gql
labels(node)                     -- Get node labels
nodes(path)                      -- Get path nodes
edges(path)                      -- Get path edges
```

### Temporal functions

[Details →](gql-language-reference.md#temporal-functions)

```gql
zoned_datetime()               -- Current timestamp
```

### Generic functions

[Details →](gql-language-reference.md#generic-functions)

```gql
coalesce(expr1, expr2, ...)    -- First non-null value
```

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
