---
title: GQL Values and Value Types
description: Complete reference for GQL values, value types, literals, comparison rules, and the type system for graph in Microsoft Fabric.
ms.topic: reference
ms.date: 11/18/2025
author: lorihollasch
ms.author: loriwhip
ms.reviewer: splantikow
---

# GQL values and value types

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

The GQL language supports various kinds of values like numbers, strings, and graph elements. These values are organized into sets called value types, which define what operations you can perform and how values behave in different contexts. Understanding the type system is essential for writing correct queries and avoiding runtime errors.

> [!IMPORTANT]
> This article exclusively uses the [social network example graph dataset](sample-datasets.md).

**Key concepts:**

- **Value types** can be _nullable_ or _material_ (non-nullable), depending on whether they include or exclude the null value.
- **Non-nullable value types** are specified syntactically as `NOT NULL`.
- **The same value** can belong to multiple value types (polymorphism).
- **The null value** is a member of every nullable value type.

> [!NOTE]
> All value types are nullable by default, unless explicitly declared as `NOT NULL`.
> For example,  `INT` specifies the nullable integer type, while `INT NOT NULL` specifies the material integer type.

## How value types are organized

All value types fall into two major categories that serve different purposes in your queries:

- **Predefined value types** - Built into the language (such as numbers, strings, and booleans).
- **Constructed value types** - Composed from other types (lists, paths).

Predefined value types are further organized into specialized categories:

- **Boolean value types** - True, false, and unknown values for logical operations.
- **Character string value types** - Text data with Unicode support.
- **Numeric value types** - Integers and floating-point numbers.
- **Temporal value types** - Date and time values with timezone support.
- **Reference value types** - References to nodes and edges in your graph.
- **Immaterial value types** - Special values like null and nothing.

## How equality and comparison work

Understanding how GQL compares values is crucial for writing effective queries, especially when dealing with filtering, sorting, and joins.

### Basic comparison rules

- You can generally compare values of the same kind.
- All numbers can be compared with each other (for example, integers with floats).
- Only reference values referencing the same kind of object can be compared (node references with node references, edge references with edge references).

### Null handling in comparisons

When you compare any value with null, the result is always `UNKNOWN`. Null handling follows three-valued logic principles. However, the `ORDER BY` statement treats `NULL` as the smallest value when sorting, providing predictable ordering behavior.

## Distinctness vs. equality

Certain statements don't test for equality but rather for distinctness. Understanding the difference is important for operations like `DISTINCT` and `GROUP BY`.

Distinctness testing follows the same rules as equality with one crucial exception: `NULL` isn't distinct from `NULL`. Distinctness differs from equality tests involving `NULL`, which always result in `UNKNOWN`.

Distinctness testing is used by:

- **`RETURN DISTINCT`**: Determines whether two rows are duplicates of each other.
- **`GROUP BY`**: Determines whether two rows belong to the same grouping key during aggregation.

Two rows from a table are considered distinct if there's at least one column in which the values from both rows are distinct.

## Boolean value types

Boolean values are the three-valued logic values `TRUE`, `FALSE`, and `UNKNOWN`.

> [!NOTE]
> `UNKNOWN` and the null value are identical. `UNKNOWN` is just a null value of type `BOOL`.

**How equality works:**

| Left value | Right value | Result |
|------------|-------------|---------|
| TRUE       | FALSE       | FALSE   |
| TRUE       | TRUE        | TRUE    |
| TRUE       | UNKNOWN     | UNKNOWN |
| FALSE      | FALSE       | TRUE    |
| FALSE      | TRUE        | FALSE   |
| FALSE      | UNKNOWN     | UNKNOWN |
| UNKNOWN    | FALSE       | UNKNOWN |
| UNKNOWN    | TRUE        | UNKNOWN |
| UNKNOWN    | UNKNOWN     | UNKNOWN |

**How comparison works:**

`FALSE` is less than `TRUE`. Any comparison involving `UNKNOWN` results in `UNKNOWN`.

**How to write boolean literals:**

- `TRUE`
- `FALSE`  
- `UNKNOWN` or `NULL`

**Type syntax:**

```gql
BOOL [ NOT NULL ]
```

## Character string value types

Character strings are sequences of Unicode codepoints (they can be zero-length). The empty character string isn't identical with the null value.

**How comparison works:**

Character strings are compared by comparing the Unicode scalar values of their codepoints (the comparison method is sometimes called the `UCS_BASIC` collation).

**How to write string literals:**

Enclose your characters in either double quotes (`"`) or single quotes (`'`):

```gql
"Hello, World!"
'Guten Tag!'
```

You can't directly specify certain Unicode control characters in string literals. 
Specifically, all characters from the Unicode General Category classes "Cc" and "Cn" are 
disallowed. Instead, use C-style `\`-escapes:

| Input        | Unescaped character |
|--------------|---------------------|
| `\\`         | `\`                 |
| `\"`         | `"`                 |
| `\'`         | `'`                 |
| `` \` ``     | `` ` ``             |
| `\t`         | U+0009              |
| `\b`         | U+0008              |
| `\n`         | U+000A              |
| `\r`         | U+000D              |
| `\f`         | U+000C              |
| `\uabcd`     | U+ABCD              |
| `\UABCDEF01` | U+ABCDEF01          |

GQL also supports SQL-style escaping by doubling the surrounding `"` and `'` characters:

| Actual string | C-style             | SQL-style           |
|---------------|---------------------|---------------------|
| How "Ironic!" | `"How \"ironic!\""` | `"How ""ironic!"""` |
| How 'Ironic!' | `'How \'ironic!\''` | `'How ''ironic!'''` |

> [!TIP]
> Disable C-style `\`-escapes by prefixing your string literal with `@`.

**Type syntax:**

```gql
STRING [ NOT NULL ]
```

## Numeric types

### Exact numeric types

Graph in Microsoft Fabric supports exact numbers that are negative or positive integers.

**How comparison works:**

The system compares all numbers by their numeric value.

**How to write integer literals:**

| Description                 | Example    |  Value  |
|-----------------------------|------------|---------|
| Integer                     |  123456    |  123456 |
| Integer w. grouping         |  123_456   |  123456 |
| Explicitly positive integer | +123456    |  123456 |
| Zero                        |       0    |       0 |
| Negative integer            | -123456    | -123456 |

**Type syntax:**

```gql
INT [ NOT NULL ]
INT64 [ NOT NULL ]
UINT [ NOT NULL ]
UINT64 [ NOT NULL ]
```

`INT` and `INT64` specify the same numeric type.
So do `UINT` and `UINT64`.

### Approximate numeric types

Graph in Microsoft Fabric supports approximate numbers that are IEEE (Institute of Electrical and Electronics Engineers) 754-compatible floating point numbers.

**How comparison works:**

The system compares all numbers by their numeric value.

**How to write floating-point literals:**

| Description                     | Example       | Value      |
|---------------------------------|---------------|------------|
| Common notation                 | 123.456       | 123.456    |
| Common notation w. grouping     | 123_456.789   | 123456.789 |
| Scientific notation             | 1.23456e2     | 123.456    |
| Scientific notation (uppercase) | 1.23456E2     | 123.456    |
| Floating-point with suffix      | 123.456f      | 123.456    |
| Double precision with suffix    | 123.456d      | 123.456    |

**Additional numeric considerations:**

- **Overflow and underflow**: Integer operations that exceed the supported range may result in runtime errors or wrap-around behavior depending on the implementation.
- **Precision**: Floating-point operations may lose precision due to IEEE 754 representation limitations.
- **Special float values**: `NaN` (Not a Number), positive infinity (`+∞`), and negative infinity (`-∞`) may be supported in floating-point contexts.

**Type syntax:**

```gql
FLOAT [ NOT NULL ]
DOUBLE [ NOT NULL ]
FLOAT64 [ NOT NULL ]
```

`DOUBLE`, `FLOAT`, and `FLOAT64` all specify the same type.

## Temporal value types

### Zoned datetime values

A zoned datetime value represents an ISO 8601-compatible datetime with a timezone offset.

**How comparison works:**

The system compares zoned datetime values chronologically by their absolute time points.

**How to write datetime literals:**

Use ISO 8601 format with timezone information:

```gql
ZONED_DATETIME('2024-08-15T14:30:00+02:00')
ZONED_DATETIME('2024-08-15T12:30:00Z')
ZONED_DATETIME('2024-12-31T23:59:59.999-08:00')
```

**Type syntax:**

```gql
ZONED DATETIME [ NOT NULL ]
```

## Reference value types

Reference values contain references to matched nodes or edges.

### Node reference values

Node reference values represent references to specific nodes in your graph. You typically get these values when nodes are matched in graph patterns, and you can use them to access node properties and perform comparisons.

**How comparison works:**

You should only compare node reference values for equality. Two node reference values are equal if and only if they reference the same node. 

Graph in Microsoft Fabric defines a deterministic order over reference values. However, this order can change from query to query and shouldn't be relied upon in production queries.

**How to access properties:**

Use dot notation to access node properties:

```gql
node_var.property_name
```

**Abstract node types in graph schemas:**

When working with graph types, you can define abstract node types that serve as base types for inheritance but can't be instantiated directly. Abstract types enable polymorphic querying patterns:

```gql
-- Abstract base type (cannot be instantiated)
ABSTRACT
(:Person => {
  id :: INT64,
  name :: STRING,
  birth_date :: ZONED DATETIME
}),

-- Concrete types that inherit from abstract base
(:Employee => Person {
  employee_id :: STRING,
  department :: STRING,
  hire_date :: ZONED DATETIME
})

(:Customer => :Person {
  customer_id :: STRING,
  membership_level :: STRING,
  registration_date :: ZONED DATETIME
})
```

**Polymorphic queries with abstract types:**

Abstract types enable powerful querying patterns where you can match against the base type to find all instances of derived types:

```gql
-- Find all Person instances (both Employee and Customer)
MATCH (p:Person)
RETURN p.name, p.birthday, labels(p) AS label_names

-- Mixed type patterns
MATCH (e:Employee)-[:knows]-(c:Customer)
WHERE e.department = 'Sales' AND c.membership_level = 'Premium'
RETURN e.name AS sales_person, c.name AS customer
```

> [!NOTE]
> The preceding queries assume the graph type sketched out above and do not use the social network example data set.

This approach provides type safety while enabling flexible, inheritance-based data modeling in your graph schemas.

**Type syntax:**

```gql
NODE [ NOT NULL ]
```

### Graph edge reference values

Graph edge reference values represent references to specific edges in your graph. You typically get these values when edges are matched in graph patterns, and you can use them to access edge properties and perform comparisons.

**How comparison works:**

You can only compare edge reference values for equality. Two edge reference values are equal if and only if they reference the same edge.

**How to access properties:**

Use dot notation to access edge properties:

```gql
edge_var.property_name
```

**Type syntax:**

```gql
EDGE [ NOT NULL ]
```

## Immaterial value types

Immaterial value types don't contain "ordinary" material values.

### Null values

The null value represents the absence of a known material value. It's a member of every nullable value type and is distinct from any material value. It's the only value of the null type.

**How comparison works:**

When you compare any value with null, the result is `UNKNOWN`.

**How to write null literals:**

```gql
NULL        -- type NULL
UNKNOWN     -- type BOOL
```

**Type syntax:**

```gql
NULL
```

### Nothing type

The nothing type is a value type that contains no values. 

Although it might seem like a technicality, the nothing type lets you assign a precise type to values like empty list values. The nothing type allows you to pass empty lists wherever a list value type is expected (regardless of the required list element type).

**Type syntax:**

```gql
NOTHING
NULL NOT NULL
```

(`NOTHING` and `NULL NOT NULL` specify the same type)

## Constructed value types

### List values

List values are sequences of elements. Lists can contain elements of the same type, and can include null values.

> [!IMPORTANT]
> Currently, lists in graph in Microsoft Fabric cannot contain elements of mixed types.
 
**How comparison works:**

Lists are compared first by size, then element by element in order. Two lists are equal if they have the same size and all corresponding elements are equal.

> [!TIP]
> Comparisons involving null element values always result in `UNKNOWN`. Null comparisons can lead to surprising results when comparing list values!

**Group lists:**

Group lists are lists bound by matching variable-length edge patterns. Graph in Microsoft Fabric tracks their status as group lists.

Group lists can be used in horizontal aggregation. For more information, see [GQL expressions and functions](gql-expressions.md).

**How to write list literals:**

Use square bracket notation to create lists:

```gql
[1, 2, 3, 4]
['hello', 'world']
[1, 'mixed', TRUE, NULL]
[]  -- empty list
```

**How to access elements:**

Use square brackets with zero-based indexing to access list elements:

```gql
list_var[0]  -- first element
list_var[1]  -- second element
```

**Common list operations:**

```gql
-- Check if list contains a value
WHERE 'Engineering' IN employee.departments

-- List concatenation
RETURN [1, 2] || [3, 4]  -- [1, 2, 3, 4]

-- List size
size(list_var)
```

**Type syntax:**

```gql
LIST<element_type> [ NOT NULL ]
LIST<element_type NOT NULL> [ NOT NULL ]
```

Where `element_type` can be any supported type, such as STRING, INT64, DOUBLE, BOOL, etc.

### Path values

Path values represent paths matched in your graph. A path value contains a nonempty sequence of alternating node and edge reference values that always starts and ends with a node reference value. These reference values identify the nodes and edges of the originally matched path in your graph.

**How paths are structured:**

A path consists of:

- A sequence of nodes and edges: `node₁ - edge₁ - node₂ - edge₂ - ... - nodeₙ`
- Always starts and ends with a node.
- Contains at least one node (minimum path length is zero edges).

> [!NOTE]
> Currently literal syntax for paths is not yet supported.
> Instead, paths can be bound using `MATCH pathVar=...path pattern...`.

**How comparison works:**

Paths are compared by comparing lists of reference values to all of their constituent nodes and edges, in the sequence in which they occur along the path.

See the comparison rules for [list values](#list-values) and [reference values](#reference-value-types) for further details.

**Type syntax:**

```gql
PATH [ NOT NULL ]
```

## Type conversions and casting

GQL supports both implicit and explicit type conversions to enable flexible operations while maintaining type safety.

### Implicit conversions

Certain value types can be implicitly converted when the conversion is safe and doesn't lose information:

- **Numeric widening**: Integer values can be implicitly converted to floating-point types when used in mixed arithmetic operations.
- **String contexts**: Values may be implicitly converted to strings in certain contexts like concatenation operations.

### Explicit casting

Use the `CAST` function to explicitly convert values between compatible types:

```gql
CAST(value AS target_type)
```

**Examples:**

```gql
CAST(123 AS STRING)           -- "123"
CAST('456' AS INT64)          -- 456
CAST(3.14 AS STRING)          -- "3.14"
CAST('true' AS BOOL)          -- TRUE
```

**Casting rules:**

- **To STRING**: Most value types can be cast to STRING with their literal representation.
- **To numeric types**: Strings containing valid numeric literals can be cast to appropriate numeric types.
- **To BOOL**: Strings 'true'/'false' (case-insensitive) can be cast to boolean values.
- **Invalid casts**: Attempting to cast incompatible values results in runtime errors.

## Related content

- [GQL language guide](gql-language-guide.md)
- [GQL expressions and functions](gql-expressions.md)
- [GQL graph types](gql-graph-types.md)
- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
