---
title: GQL Expressions, Predicates, and Functions
description: Complete reference for GQL expressions, predicates, and built-in functions in graph in Microsoft Fabric.
ms.topic: reference
ms.date: 09/15/2025
author: spmsft
ms.author: splantikow
ms.reviewer: eur
ms.service: fabric
#ms.subservice: graph
---

# GQL expressions, predicates, and functions

GQL expressions let you perform calculations, comparisons, and transformations on data within your queries. Combined with built-in functions, expressions provide powerful tools for data processing, filtering, and analysis in graph queries.

## Literals

Literals are simple expressions that directly evaluate to the stated value. Literals of each kind of value are explained in detail in [GQL values and value types](gql-values-and-value-types.md).

**Example:**

```gql
1
1.0
TRUE
"Hello, graph!"
[ 1, 2, 3 ]
NULL
```

For detailed literal syntax for each data type, see [GQL values and value types](gql-values-and-value-types.md).

## Predicates

Predicates are boolean expressions, which are commonly used to filter results in GQL queries. They evaluate to `TRUE`, `FALSE`, or `UNKNOWN` (null). 

> [!CAUTION]
> When used as a filter, predicates retain only those items, which the predicate evaluates to `TRUE`.

## Comparison predicates

Compare values using these operators:

- `=` (equal)
- `<>` (not equal)
- `<` (less than)
- `>` (greater than)
- `<=` (less than or equal)
- `>=` (greater than or equal)

GQL uses three-valued logic where comparisons with null return `UNKNOWN`:

| Expression    | Result    |
|---------------|-----------|
| `5 = 5`       | `TRUE`    |
| `5 = 3`       | `FALSE`   |
| `5 = NULL`    | `UNKNOWN` |
| `NULL = NULL` | `UNKNOWN` |

For specific comparison behavior, see the documentation for each value type in [GQL values and value types](gql-values-and-value-types.md).

**Example:**

```gql
MATCH (p:Person)
FILTER WHERE p.age >= 18
RETURN p.name
```

**Coercion rules:**

In order of precedence:

1. Comparison expressions involving arguments of approximate numeric types coerce all arguments to be of an approximate numeric type.
2. Comparison expressions involving arguments of both signed and unsigned integer types coerce all arguments to be of a signed integer type.

## Logical expressions

Combine conditions with logical operators:

- `AND` (both conditions true)
- `OR` (either condition true)
- `NOT` (negates condition)

**Example:**

```gql
MATCH (p:Person)
FILTER WHERE p.age >= 18 AND p.first = 'John'
RETURN p.name
```

## Property existence predicates

Check if properties exist:

```gql
p.phone IS NOT NULL
p.middle_name IS NULL
```

## List membership predicates

Test if values are in lists:

```gql
p.name IN ['Alice', 'Bob', 'Charlie']
p.age NOT IN [25, 30, 35]
```

## String pattern predicates

Match strings using pattern matching:

```gql
p.name CONTAINS 'John'
p.email STARTS WITH 'admin'
p.phone ENDS WITH '1234'
```

## Arithmetic expressions

Use standard arithmetic operators with numeric values:

- `+` (addition)
- `-` (subtraction)
- `*` (multiplication)
- `/` (division)

Arithmetic operators follow general mathematical conventions. 

**Precedence:**

Generally operators follow established operator precedence rules, such as `*` before `+`. Use parentheses to control evaluation order as needed.

**Example:**

```gql
(p.age < 25 OR p.age > 65) AND p.active = TRUE
```

**Coercion rules:**

In order of precedence:

1. Arithmetic expressions involving arguments of approximate number types return a result of an approximate numeric type.
2. Arithmetic expressions involving arguments of both signed and unsigned integer types return a result of a signed integer type.

**Example:**

```gql
LET age_in_months = p.age * 12
RETURN age_in_months
```

## Property access

Access properties using dot notation:

```gql
p.name
edge.weight
```

## List access

Access list elements using 0-based indexing:

```gql
friends[0]    -- first element
friends[1]    -- second element
```

## Built-in functions

GQL supports various built-in functions for data processing and analysis.

### Aggregate functions

Aggregate functions are used to evaluate an expression over a set of rows and obtain a final result value by combining the values computed for each row. The following aggregate functions are supported in graph in Microsoft Fabric:

- `count(*)` - counts rows
- `sum(expression)` - sums numeric values
- `avg(expression)` - averages numeric values  
- `min(expression)` - finds minimum value
- `max(expression)` - finds maximum value
- `collect_list(expression)` - collects values into a list

In general, aggregate functions ignore null values and always return a null value when no material input values are provided. You can use `coalesce` to obtain a different default value: `coalesce(sum(expr), 0)`. The only exception is the `count` aggregate function, which always counts the non-null values provided, returning 0 if there are none. Use `count(*)` to also include null values in the count.  

Aggregate functions are used in three different ways:

- For computing (vertical) aggregates over whole tables
- For computing (vertical) aggregates over subtables determined by a grouping key
- For computing (horizontal) aggregates over the elements of a group list

**Vertical aggregates:**

```gql
-- Vertical aggregate over whole table
MATCH (p:Person)
RETURN count(*) AS total_people, avg(p.age) AS average_age
```

```gql
-- Vertical aggregate with grouping
MATCH (p:Person)
RETURN p.city, count(*) AS population, avg(p.age) AS average_age
GROUP BY p.city
```

**Horizontal aggregates:**

Horizontal aggregation computes aggregates over the elements of group list variables from variable-length patterns:

```gql
-- Horizontal aggregate over a group list variable
MATCH (p:Person)-[edges:knows]->{1,3}(:Person)
RETURN p.name, avg(edges.creationDate) AS avg_connection_date
```

> [!NOTE]
> For comprehensive coverage of aggregation techniques including variable-length edge binding and combining horizontal/vertical aggregation, see [Advanced Aggregation Techniques](gql-language-guide.md#advanced-aggregation-techniques).

> [!TIP]
> Horizontal aggregation always takes precedence over vertical aggregation. 
> To convert a group list into a regular list, use `collect_list(edges)`.

### String functions

- `char_length(string)` - returns string length
- `upper(string)`- returns uppercase variant of provided string (US ASCII only)
- `lower(string)`- returns lowercase variant of provided string (US ASCII only)
- `trim(string)` - removes leading and trailing whitespace
- `string_join(list, separator)` - joins list elements with separator

**Example:**

```gql
MATCH (p:Person)
WHERE char_length(p.name) > 5
RETURN upper(p.name) AS name_upper
```

### Graph functions

- `nodes(path)` - returns nodes from a path value
- `edges(path)` - returns edges from a path value
- `labels(node_or_edge)` - returns the labels of a node or edge as a list of strings

**Example:**

```gql
MATCH p=(:Company)<-[:workAt]-(:Person)-[:knows]-{1,3}(:Person)-[:workAt]->(:Company)
RETURN nodes(p) AS chain_of_friends
```

### List functions

- `size(list)` - returns size of a list value
- `trim(list,n)` - trim a list to be at most of size `n`

**Example:**

```gql
MATCH (p:Person)
WHERE size(p.hobbies) > 3
RETURN p.name, trim(p.hobbies, 5) AS top_hobbies
```

### Temporal functions

- `zoned_datetime()` - returns current zoned datetime

**Example:**

```gql
RETURN zoned_datetime() AS now
```

### Generic functions

- `coalesce(value1, value2, ...)` - returns first non-null value

**Example:**

```gql
MATCH (p:Person)
RETURN coalesce(p.nickname, p.firstName, 'Unknown') AS display_name
```

## Related content

- [GQL language guide](gql-language-guide.md)
- [GQL values and value types](gql-values-and-value-types.md)
- [Graph patterns](gql-graph-patterns.md)
- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)