---
title: GQL Expressions, Predicates, and Functions
description: Learn about GQL expressions, predicates, and built-in functions for data processing, filtering, and analysis in graph in Microsoft Fabric queries.
ms.topic: reference
ms.date: 09/17/2026
ms.reviewer: splantikow
ai-usage: ai-assisted
---

# GQL expressions, predicates, and functions

This article provides a comprehensive reference for GQL expressions, predicates, and built-in functions available in graph in Microsoft Fabric queries. Use this reference to understand how to perform calculations, filter results, and transform data in your graph queries.

For an overview of the GQL query language and end-to-end query examples, see [GQL language guide](gql-language-guide.md). For information about supported data types and literal syntax, see [GQL values and value types](gql-values-and-value-types.md).

## Literals

Literals are simple expressions that directly evaluate to the stated value. The [GQL values and value types](gql-values-and-value-types.md) article explains literals of each kind of value in detail.

**Example:**

<!-- GQL Literals: Checked 2025-11-13 -->
```gql
1
1.0d
1.00m
TRUE
"Hello, graph!"
[ 1, 2, 3 ]
NULL
```

For detailed literal syntax for each data type, see [GQL values and value types](gql-values-and-value-types.md).

## Predicates

Predicates are boolean expressions that you commonly use to filter results in GQL queries. They evaluate to `TRUE`, `FALSE`, or `UNKNOWN` (null).

> [!CAUTION]
> When you use predicates as a filter, they retain only those items for which the predicate evaluates to `TRUE`.

## Comparison predicates

Use these operators to compare values:

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

<!-- GQL Query: Checked 2025-11-13 -->
```gql
MATCH (p:Person)
FILTER WHERE p.birthday <= 20050915
RETURN p.firstName
```

If both operands are numbers, GQL compares them by their numerical values.

> [!IMPORTANT]
> Graph doesn't yet support every numeric comparison that GQL defines. Current
> behavior uses these rules:
>
> - A comparison between an integer and an approximate number converts the
>   integer to an approximate numeric type.
> - A comparison between signed and unsigned integer values generally converts
>   both values to a signed integer type. An unsigned value outside the signed
>   integer range causes an error.

## Logical expressions

Combine conditions with logical operators:

- `AND` (both conditions true)
- `OR` (either condition true)
- `NOT` (negates condition)
- `XOR` (exclusive disjunction — true when exactly one operand is true)

**Example:**

<!-- GQL Query: Checked 2025-11-13 -->
```gql
MATCH (p:Person)
FILTER WHERE p.birthday <= 20050915 AND p.firstName = 'John'
RETURN p.firstName || ' ' || p.lastName AS fullName
```

## Property existence predicates

To check if properties exist, use these predicates:

<!-- GQL Predicate: Checked 2025-11-13 -->
```gql
p.locationIP IS NOT NULL
p.browserUsed IS NULL
```

> [!NOTE]
> Attempting to access a known non-existing property results in a syntax error.
> Access to a potentially non-existing property evaluates to `null`.
> The determination of whether a property is known or potentially non-existing
> is based on the type of the accessed node or edge.

## Existence subqueries

Use a procedure-form `EXISTS` subquery to test whether a nested query returns at least one row:

```gql
EXISTS {
  <query statements>
  RETURN <columns>
}
```

The result is a non-null Boolean value:

- `TRUE` if the subquery returns one or more rows.
- `FALSE` if the subquery returns no rows.

Variables already in scope are implicitly available inside the subquery. Variables introduced only inside the subquery aren't available outside it.

Use `EXISTS` in a filter:

<!-- GQL Query: Added 2026-09-16 -->
```gql
MATCH (p:Person)
WHERE EXISTS {
  MATCH (p)-[:knows]->(friend:Person)
  RETURN friend
}
RETURN p.firstName, p.lastName
```

Use `NOT EXISTS` to retain rows for which the subquery returns no rows. You can also use `EXISTS` in `LET`, `RETURN`, `ORDER BY`, and aggregate filter or source expressions. `EXISTS` isn't supported inside a list predicate filter.

> [!IMPORTANT]
> Graph-pattern-only forms such as `EXISTS { (p)-[:knows]->(friend) }` and `EXISTS ((p)-[:knows]->(friend))` aren't supported. Use the procedure form shown in the preceding examples. Scalar `VALUE { ... }` subqueries aren't supported.

> [!CAUTION]
> `EXISTS` tests whether the subquery returns a row, not whether an aggregate value is nonzero. An ungrouped aggregate such as `RETURN count(*)` returns one row even when `MATCH` finds no rows, so that form of `EXISTS` evaluates to `TRUE`. Return a matched variable when you want to test whether matches exist.

For more information about correlated subqueries, see the [`CALL` statement](gql-language-guide.md#call-statement) in the GQL language guide.

## List membership predicates

Test if values are in lists:

<!-- GQL Predicate: Checked 2025-11-13 -->
```gql
p.firstName IN ['Alice', 'Bob', 'Charlie']
p.gender NOT IN ['male', 'female']
```

## List predicate functions

Use a list predicate function to evaluate a Boolean expression for the elements of a list:

```gql
ALL(element IN list WHERE predicate)
ANY(element IN list WHERE predicate)
NONE(element IN list WHERE predicate)
SINGLE(element IN list WHERE predicate)
```

The source can be a list literal, a list-valued property, a variable, or a group list from a variable-length pattern.

The functions have the following meanings:

| Function | Meaning |
| -------- | ------- |
| `ALL` | Every element satisfies the predicate. |
| `ANY` | At least one element satisfies the predicate. |
| `NONE` | No element satisfies the predicate. |
| `SINGLE` | Exactly one element satisfies the predicate. |

The following example evaluates all four functions over a dynamically constructed list:

<!-- GQL Query: Checked 2026-09-17 -->
```gql
LET items = [1, 2, 3]
RETURN ALL(x IN items WHERE x > 0) AS all_match,
       ANY(x IN items WHERE x = 2) AS any_match,
       NONE(x IN items WHERE x < 0) AS none_match,
       SINGLE(x IN items WHERE x = 2) AS single_match
```

All four returned values are `TRUE`.

You can also evaluate properties of elements from a list. In this example, `connections` is the group list created by the variable-length edge pattern:

<!-- GQL Query: Added 2026-09-17 -->
```gql
MATCH (person:Person)-[connections:knows]->{1,4}(friend:Person)
WHERE ALL(connection IN connections WHERE connection.creationDate IS NOT NULL)
RETURN person.firstName, friend.firstName
```

List predicates use three-valued logic. The table describes the result in terms of the values produced by the filter expression for the list elements:

| Function | `TRUE` | `FALSE` | `UNKNOWN` | Empty list |
| -------- | ------ | ------- | --------- | ---------- |
| `ALL` | Every filter result is `TRUE`. | At least one result is `FALSE`. | No result is `FALSE`, and at least one is `UNKNOWN`. | `TRUE` |
| `ANY` | At least one filter result is `TRUE`. | No result is `TRUE` or `UNKNOWN`. | No result is `TRUE`, and at least one is `UNKNOWN`. | `FALSE` |
| `NONE` | No result is `TRUE` or `UNKNOWN`. | At least one result is `TRUE`. | No result is `TRUE`, and at least one is `UNKNOWN`. | `TRUE` |
| `SINGLE` | Exactly one result is `TRUE`, and none is `UNKNOWN`. | More than one result is `TRUE`, or no result is `TRUE` or `UNKNOWN`. | At most one result is `TRUE`, and at least one is `UNKNOWN`. | `FALSE` |

If the source list is null, each function returns `UNKNOWN`. A null list element contributes the result of evaluating the filter with that element bound to null; it doesn't automatically make the function result unknown.

The element variable is available only within the list predicate's filter expression. The filter can also reference variables from the enclosing query. If the element variable has the same name as an outer variable, the local element variable takes precedence. Nested list predicates can similarly shadow an outer element variable.

Aggregate functions can reference an enclosing group list, but they can't aggregate the locally bound element variable. `EXISTS` subqueries also aren't supported inside a list predicate filter.

`ANY(...)` is a list predicate function. Don't confuse it with the `ANY SHORTEST` path search prefix or the `ANY` dynamic value type.

## String pattern predicates

Match strings by using pattern matching techniques:

<!-- GQL Predicate: Checked 2025-11-13 -->
```gql
p.firstName CONTAINS 'John'
p.browserUsed STARTS WITH 'Chrome'
p.locationIP ENDS WITH '.1'
```

For RE2 regular expression matching, use [`MSFT.REGEXP_LIKE`](#regular-expression-functions).

## Arithmetic expressions

Use standard arithmetic operators with numeric values:

- `+` (addition)
- `-` (subtraction)
- `*` (multiplication)
- `/` (division)

Arithmetic operators follow general mathematical conventions.

**Precedence:**

Generally, operators follow established operator precedence rules, such as `*` before `+`. Use parentheses to control evaluation order as needed.

**Example:**

```gql
(p.birthday < 20050915 OR p.birthday > 19651231) AND p.gender = 'male'
```

**Coercion rules:**

Use the following rules in order of precedence:

1. Arithmetic expressions that involve an approximate numeric type return an approximate numeric type.
1. Arithmetic expressions that involve both signed and unsigned integer types return a signed integer type.

## Property access

Access properties by using dot notation:

```gql
p.firstName
edge.creationDate
```

## List access

Access list elements by using zero-based indexing:

```gql
interests[0]    -- first element
interests[1]    -- second element
```

## Built-in functions

GQL supports various built-in functions for data processing and analysis.

### Numeric functions

Use numeric functions to transform numeric values, calculate trigonometric values, and create integer ranges.

#### Absolute value and power

| Function | Description |
| --- | --- |
| `ABS(value)` | Returns the absolute value. The result has the same numeric type as `value`. |
| `POWER(base, exponent)` | Raises `base` to `exponent` and returns a `DOUBLE`. |

Both functions accept numeric values. A null argument produces null. An invalid
numeric operation, such as an overflowing `POWER` result, produces an error.

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN ABS(-1) AS absoluteValue, POWER(2, -2) AS reciprocalSquare
```

The result is:

| absoluteValue | reciprocalSquare |
| ---: | ---: |
| `1` | `0.25` |

#### Trigonometric functions

The trigonometric functions accept one numeric value and return a `DOUBLE`.
A null argument produces null.

| Function | Description |
| --- | --- |
| `SIN(value)`, `COS(value)`, `TAN(value)`, `COT(value)` | Calculate a trigonometric function. `value` is an angle in radians. |
| `ASIN(value)`, `ACOS(value)`, `ATAN(value)` | Calculate an inverse trigonometric function. The result is in radians. `ASIN` and `ACOS` require a value from `-1` through `1`. |
| `SINH(value)`, `COSH(value)`, `TANH(value)` | Calculate a hyperbolic function. |
| `DEGREES(value)` | Converts an angle from radians to degrees. |
| `RADIANS(value)` | Converts an angle from degrees to radians. |

An argument outside a function's mathematical domain produces an error.

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN COS(0) AS cosine, RADIANS(180) AS angle
```

The result is:

| cosine | angle |
| ---: | ---: |
| `1.0` | `3.141592653589793238462643383279502884` |

#### Integer ranges

`RANGE(start, end)` returns a list of integers from `start` toward `end`, using
a step of `1`. `RANGE(start, end, step)` uses the specified nonzero step.
`start`, `end`, and `step` must be non-null integers. Zero is valid for `start`
or `end`; only `step` must be nonzero.

The range includes `start`. It includes `end` only when repeatedly adding
`step` reaches `end` exactly. A positive step with `start` greater than `end`,
or a negative step with `start` less than `end`, returns an empty list. A zero
step produces an error.

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN RANGE(0, 10, 3) AS ascending, RANGE(5, 0, -2) AS descending
```

The result is:

| ascending | descending |
| --- | --- |
| `[0, 3, 6, 9]` | `[5, 3, 1]` |

If all arguments are unsigned integers, `RANGE` returns a `LIST<UINT64>`.
Otherwise, it returns a `LIST<INT64>` and rejects values that can't be
represented safely as signed integers.

### Aggregate functions

Aggregate functions combine values either across input rows or within a group
list bound by a variable-length pattern.

| Function | Description |
| --- | --- |
| `COUNT(*)` | Counts input rows, including rows that contain null values. |
| `COUNT(expression)` | Counts non-null results of `expression`. |
| `SUM(expression)` | Returns the sum of non-null numeric values. |
| `AVG(expression)` | Returns the average of non-null numeric values. |
| `MIN(expression)` | Returns the minimum non-null value. |
| `MAX(expression)` | Returns the maximum non-null value. |
| `COLLECT_LIST(expression)` | Returns a list with one element for each input, including null elements. |
| `COLLECT_ONE(expression)` | Returns one non-null input value. The selected value isn't deterministic. |
| `COLLECT_ELEMENTS(expression)` | Concatenates the elements of list-valued inputs into one list. Null input lists contribute no elements, but null elements within a list remain in the result. |

When an aggregate query has no grouping columns and receives no input rows,
`COUNT` returns `0`, `COLLECT_LIST` and `COLLECT_ELEMENTS` return an empty
list, and the other aggregate functions return null. Don't rely on the order
of values returned by a collection aggregate. With grouping columns, no input
rows produce no group and therefore no result row.

#### Set quantifiers

Use `ALL` to include duplicate values or `DISTINCT` to remove them. `ALL` is
the default for expression aggregates. `COUNT(*)` doesn't accept a set
quantifier.

```gql
MATCH (person:Person)
RETURN COUNT(person) AS personCount,
       COUNT(DISTINCT person.browserUsed) AS browserCount
```

For `COLLECT_LIST`, `DISTINCT` removes duplicate values and retains at most one
null. For `COLLECT_ELEMENTS`, `DISTINCT` applies to the elements after the
input lists are concatenated. `DISTINCT` doesn't make `COLLECT_ONE`
deterministic.

#### Aggregate-specific filters and limits

Add `FILTER (WHERE predicate)` after an aggregate to include only values for
which `predicate` is true. False and unknown predicate results are excluded.
This filter affects only that aggregate, not the input rows available to other
expressions in the same `RETURN`.

Add `LIMIT n` inside the aggregate filter to consider at most `n` qualifying
input rows. Filtering occurs before the aggregate-specific limit, and
`DISTINCT` is applied after the limit.

```gql
MATCH (person:Person)
RETURN COUNT(*) AS allPeople,
       COUNT(*) FILTER (WHERE person.birthday < 19900101 LIMIT 5) AS sampleBornBefore1990
```

#### Aggregation across rows

An aggregate normally combines values vertically across input rows. Use
`GROUP BY` to calculate one result for each group.

```gql
MATCH (p:Person)
RETURN count(*) AS total_people, avg(p.birthday) AS average_birth_year
```

```gql
MATCH (p:Person)-[:isLocatedIn]->(c:City)
RETURN c.id AS cityId, c.name, count(*) AS population, avg(p.birthday) AS average_birth_year
GROUP BY cityId, c.name
```

Don't place one vertical aggregate directly inside another in the same query
block. For example, `SUM(COUNT(*))` is invalid. Use `NEXT` to separate the
aggregation steps when you need to aggregate an aggregate result.

#### Aggregation within a matched path

An edge variable bound by a variable-length pattern becomes a group list.
An aggregate over that variable is horizontal: it calculates one result within
the list for each matched path instead of combining different input rows.

```gql
MATCH (person:Person)-[knows:knows]->{1,5}(friend:Person)
RETURN COUNT(knows) AS pathLength
```

Here, `COUNT(knows)` returns the number of edges in each matched path. The
horizontal forms of `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `COLLECT_LIST`,
`COLLECT_ONE`, and `COLLECT_ELEMENTS` are supported. `COUNT(*)` and
aggregate-specific `FILTER` or `LIMIT` aren't horizontal forms.

A horizontal aggregate can be the input to one outer vertical aggregate:

```gql
MATCH (person:Person)-[knows:knows]->{1,5}(friend:Person)
RETURN MIN(COUNT(knows)) AS shortestMatchedPath
```

In this query, `COUNT(knows)` calculates one length per matched path, and
`MIN` combines those lengths across the input rows.

For task-oriented examples, see [Filter and aggregate graph
data](filter-aggregate-graph-data.md).

### Conditional expressions

Use a simple `CASE` expression to compare one expression with one or more values and return the result associated with the first equal value:

```gql
CASE expression
  WHEN value1 THEN result1
  WHEN value2 THEN result2
  ELSE default_result
END
```

**NULLIF:**

`NULLIF(a, b)` returns `NULL` if `a` equals `b`, otherwise returns `a`.

**Example:**

```gql
MATCH (p:Person)
RETURN p.firstName,
       CASE p.gender
         WHEN 'male' THEN 'M'
         WHEN 'female' THEN 'F'
         ELSE 'Other'
       END AS gender_code,
       NULLIF(p.browserUsed, 'Unknown') AS browser
```

Searched `CASE WHEN <predicate>` expressions aren't supported. To route rows by predicates and run a query statement or nested procedure for the selected branch, use a [`WHEN` conditional statement](gql-language-guide.md#conditional-statements).

### String functions

Use string functions to measure, transform, search, compare, and combine character strings.

#### Character length and case

Use these functions to measure or change character strings:

| Function | Description |
| -------- | ----------- |
| `CHAR_LENGTH(string)` | Returns the number of characters. |
| `UPPER(string)` | Applies Unicode uppercase mapping. |
| `LOWER(string)` | Applies Unicode lowercase mapping. |
| `CASEFOLD(string)` | Applies locale-independent Unicode case folding for caseless matching. |

Unicode mappings can change the length or representation of a string:

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN UPPER('straße') AS uppercase,
       LOWER('İ') AS lowercase,
       CASEFOLD('Straße') AS folded
```

The results are `STRASSE`, `i̇`, and `strasse`, respectively. `CASEFOLD` isn't equivalent to `LOWER`. For example, case folding maps `ß` to `ss` and maps the Greek sigma forms `Σ`, `σ`, and `ς` to `σ`.

#### Normalize strings

GQL defines four Unicode normalization forms:

- Normalization Form C (`NFC`), canonical composition.
- Normalization Form D (`NFD`), canonical decomposition.
- Normalization Form KC (`NFKC`), compatibility composition.
- Normalization Form KD (`NFKD`), compatibility decomposition.

`NORMALIZE(string)` defaults to NFC. Specify a normalization form as the second
argument:

```gql
RETURN NORMALIZE('cafe\u0301') AS composed,
       NORMALIZE('café', NFD) AS decomposed
```

The argument must be a string.

> [!IMPORTANT]
> Graph currently supports NFC and NFD. Specifying NFKC or NFKD produces an
> error.

#### Trim strings

Use `TRIM` to remove space characters or one specified character from both ends, the beginning, or the end of a string:

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN TRIM('  text  ') AS both_ends,
       TRIM(BOTH FROM '  text  ') AS explicit_both,
       TRIM(LEADING FROM '  text  ') AS beginning,
       TRIM(TRAILING FROM '  text  ') AS ending,
       TRIM(LEADING 'f' FROM 'foobar') AS custom_character
```

The custom trim value must be exactly one byte. Multibyte Unicode characters and strings containing multiple characters aren't supported as custom trim values. A null source or custom trim value returns null.

#### Join strings

`STRING_JOIN(list [, delimiter])` joins a list of strings. The default delimiter is a comma followed by a space:

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN STRING_JOIN(['foo', 'bar', 'baz']) AS default_delimiter,
       STRING_JOIN(['foo', 'bar', 'baz'], '-') AS custom_delimiter
```

The results are `foo, bar, baz` and `foo-bar-baz`. An empty list returns an empty string. A null list, null delimiter, or null list element returns null. Every non-null list element must be a string.

#### Regular expression functions

Graph provides these regular expression functions as extensions to GQL:

| Function | Use |
| -------- | --- |
| `MSFT.REGEXP_LIKE` | Test whether text contains a match. |
| `MSFT.REGEXP_COUNT` | Count matches. |
| `MSFT.REGEXP_INSTR` | Find the position of a match or capture group. |
| `MSFT.REGEXP_SUBSTR` | Return the text of a match or capture group. |
| `MSFT.REGEXP_REPLACE` | Replace matching text. |

##### `MSFT.REGEXP_LIKE`

Returns `TRUE` when the pattern matches any part of the source string. If no match is found, it returns `FALSE`.

| Arguments | Syntax |
| --------- | ------ |
| 2 | `MSFT.REGEXP_LIKE(source, pattern)` |
| 3 | `MSFT.REGEXP_LIKE(source, pattern, flags)` |

`source` is the string to search. `pattern` is matched against any substring of `source` unless the expression itself uses anchors such as `^` or `$`. `flags` changes matching behavior as described in [Matching rules and options](#matching-rules-and-options).

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN MSFT.REGEXP_LIKE('HELLO', 'hello', 'i') AS matches
```

The result is `TRUE`.

##### `MSFT.REGEXP_COUNT`

Returns the number of matches. If no match is found, it returns `0`.

| Arguments | Syntax |
| --------- | ------ |
| 2 | `MSFT.REGEXP_COUNT(source, pattern)` |
| 3 | `MSFT.REGEXP_COUNT(source, pattern, start)` |
| 4 | `MSFT.REGEXP_COUNT(source, pattern, start, flags)` |

`source` is the string to search, and `pattern` identifies the matches to count. `start` is the zero-based Unicode code-point position at which matching can begin. A match must start at or after this position. The position doesn't become a new beginning of the string for anchored patterns. `flags` changes matching behavior as described in [Matching rules and options](#matching-rules-and-options).

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN MSFT.REGEXP_COUNT('1a2a3a4', '[0-9]', 3) AS match_count
```

The search starts at position `3`, the second `a`, so only the digits `3` and `4` are counted. The result is `2`.

##### `MSFT.REGEXP_INSTR`

Returns the zero-based position of a selected match or capture group.

| Arguments | Syntax |
| --------- | ------ |
| 2 | `MSFT.REGEXP_INSTR(source, pattern)` |
| 3 | `MSFT.REGEXP_INSTR(source, pattern, start)` |
| 4 | `MSFT.REGEXP_INSTR(source, pattern, start, occurrence)` |
| 5 | `MSFT.REGEXP_INSTR(source, pattern, start, occurrence, return_option)` |
| 6 | `MSFT.REGEXP_INSTR(source, pattern, start, occurrence, return_option, flags)` |
| 7 | `MSFT.REGEXP_INSTR(source, pattern, start, occurrence, return_option, flags, group)` |

`source` is the string to search, and `pattern` identifies the matches. `start` is the zero-based Unicode code-point position at which matching can begin. A match must start at or after this position, which doesn't become a new beginning of the string for anchored patterns.

`occurrence` selects the first, second, or subsequent nonoverlapping match found from `start`. `group` selects what to locate within that match: `0` selects the complete match, and a positive value selects that numbered capture group. `return_option` determines which boundary of the selected match or group is returned: `0` returns its starting position, and `1` returns the position immediately after its end. `flags` changes matching behavior as described in [Matching rules and options](#matching-rules-and-options).

If no matching occurrence is found, or the selected capture group doesn't participate in that occurrence, the function returns `-1`.

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN MSFT.REGEXP_INSTR('banana', 'a', 0, 2) AS match_position
```

The second match starts at position `3`, so the result is `3`.

##### `MSFT.REGEXP_SUBSTR`

Returns the text of a selected match or capture group.

| Arguments | Syntax |
| --------- | ------ |
| 2 | `MSFT.REGEXP_SUBSTR(source, pattern)` |
| 3 | `MSFT.REGEXP_SUBSTR(source, pattern, start)` |
| 4 | `MSFT.REGEXP_SUBSTR(source, pattern, start, occurrence)` |
| 5 | `MSFT.REGEXP_SUBSTR(source, pattern, start, occurrence, flags)` |
| 6 | `MSFT.REGEXP_SUBSTR(source, pattern, start, occurrence, flags, group)` |

`source` is the string to search, and `pattern` identifies the matches. `start` is the zero-based Unicode code-point position at which matching can begin. A match must start at or after this position, which doesn't become a new beginning of the string for anchored patterns.

`occurrence` selects the first, second, or subsequent nonoverlapping match found from `start`. `group` selects the text to return from that match: `0` selects the complete match, and a positive value selects that numbered capture group. `flags` changes matching behavior as described in [Matching rules and options](#matching-rules-and-options).

If no matching occurrence is found, or the selected capture group doesn't participate in that occurrence, the function returns null.

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN MSFT.REGEXP_SUBSTR(
  '12-345',
  '([0-9]+)-([0-9]+)',
  0,
  1,
  '',
  2
) AS matched_text
```

The first occurrence is the complete string, and capture group `2` is `345`, so the result is `345`.

##### `MSFT.REGEXP_REPLACE`

Replaces matching text. By default, it replaces every match and inserts the replacement text literally.

| Arguments | Syntax |
| --------- | ------ |
| 3 | `MSFT.REGEXP_REPLACE(source, pattern, [EXACT \| TEMPLATE] replacement)` |
| 4 | `MSFT.REGEXP_REPLACE(source, pattern, [EXACT \| TEMPLATE] replacement, start)` |
| 5 | `MSFT.REGEXP_REPLACE(source, pattern, [EXACT \| TEMPLATE] replacement, start, occurrence)` |
| 6 | `MSFT.REGEXP_REPLACE(source, pattern, [EXACT \| TEMPLATE] replacement, start, occurrence, flags)` |

`source` is the string to modify, and `pattern` identifies the matches. `replacement` is the text inserted for a selected match. `EXACT` inserts it literally; `TEMPLATE` interprets capture references.

`start` is the zero-based Unicode code-point position at which replacement can begin. A match must start at or after this position. Text before `start` is preserved unchanged, and the position doesn't become a new beginning of the string for anchored patterns. Set `occurrence` to `0` to replace every match from `start`, or to a positive value to replace only that numbered nonoverlapping match. Earlier matches after `start` remain unchanged when a specific occurrence is selected. `flags` changes matching behavior as described in [Matching rules and options](#matching-rules-and-options).

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN MSFT.REGEXP_REPLACE('a1b2c3', '[0-9]', '#', 0, 2) AS replaced
```

Only the second digit match is replaced, so the result is `a1b#c3`.

If no match is found, the source string is returned unchanged.

To reuse matched text in the replacement, specify `TEMPLATE`. In this mode, `\0` through `\9` refer to the complete match and capture groups, and `\\` inserts a literal backslash. Use a raw string literal, prefixed with `@`, to pass these references without additional escaping:

<!-- GQL Query: Checked 2026-09-17 -->
```gql
RETURN MSFT.REGEXP_REPLACE(
  'John Smith',
  @'([A-Za-z]+) ([A-Za-z]+)',
  TEMPLATE @'\2 \1'
) AS reordered_name
```

The result is `Smith John`.

##### Matching rules and options

Patterns use [RE2 regular expression syntax](https://github.com/google/re2/wiki/Syntax) and match Unicode strings. The source can be any string expression. The pattern, flags, and replacement must be string literals, and numeric options must be unsigned integer literals.

Matches are found from left to right without overlapping. After a zero-length match, matching advances by one Unicode code point.

Start positions and returned positions are zero-based Unicode code-point offsets. Occurrence numbers are one-based, except that occurrence `0` means replace every occurrence in `MSFT.REGEXP_REPLACE`.

The following table lists the defaults for omitted optional arguments:

| Function | Defaults |
| -------- | -------- |
| `MSFT.REGEXP_LIKE` | Flags are empty. |
| `MSFT.REGEXP_COUNT` | Start is `0`; flags are empty. |
| `MSFT.REGEXP_INSTR` | Start is `0`; occurrence is `1`; return option is `0`; flags are empty; group is `0`. |
| `MSFT.REGEXP_SUBSTR` | Start is `0`; occurrence is `1`; flags are empty; group is `0`. |
| `MSFT.REGEXP_REPLACE` | Mode is `EXACT`; start is `0`; occurrence is `0`; flags are empty. |

The optional flags are:

| Flag | Behavior |
| ---- | -------- |
| `i` | Match without regard to case. |
| `m` | Make `^` and `$` match the beginning and end of each line. |
| `s` | Make `.` match newline characters. |

Combine flags in one string, such as `'ims'`. A null source returns null. An unsupported flag, invalid regular expression, invalid return option, or invalid occurrence or group number returns an error.

### Graph functions

- `nodes(path)` - returns nodes from a path value.
- `edges(path)` - returns edges from a path value.
- `elements(path)` - returns all nodes and edges from a path as a single list, in path order.
- `labels(node_or_edge)` - returns the labels of a node or edge as a list of strings.
- `path_length(path)` - returns the number of edges in a path.
- `element_id(node_or_edge)` - returns the node or edge identifier as an opaque string.

`ELEMENT_ID` accepts a node or edge reference and returns null for a null input.
Treat the returned string as opaque.

**Example:**

```gql
MATCH p=(:Company)<-[:workAt]-(:Person)-[:knows]-{1,3}(:Person)-[:workAt]->(:Company)
RETURN nodes(p) AS chain_of_colleagues, path_length(p) AS hops
```

### List functions

- `size(list)` - returns size of a list value.
- `trim(list,n)` - trims a list to at most `n` elements.

**Example:**

```gql
MATCH (p:Person)-[:hasInterest]->(t:Tag)
LET personId = p.id, personName = p.firstName
RETURN personId, personName, collect_list(t.name) AS interests
GROUP BY personId, personName
FILTER size(interests) > 3
```

### Temporal functions

- `CURRENT_TIMESTAMP` - returns the current zoned datetime.
- `ZONED_DATETIME(string)` - returns the zoned datetime represented by an ISO 8601 string.
- `DURATION(string)` - returns the day-time duration represented by an ISO 8601 duration string.

**Example:**

```gql
RETURN CURRENT_TIMESTAMP AS now,
       DURATION('PT2H') AS twoHours
```

Use the subtraction operator to derive a duration between two zoned datetimes:

```gql
RETURN ZONED_DATETIME('2026-09-17T12:00:00Z')
       - ZONED_DATETIME('2026-09-17T10:00:00Z') AS elapsed
```

> [!IMPORTANT]
> Graph supports day-time durations but not year-month durations.
> `DURATION_BETWEEN(start, end)` isn't currently supported; subtract the two
> zoned datetime values instead.

### Generic functions

- `coalesce(value1, value2, ...)` - returns the first non-null value.
- `to_json_string(value)` - converts a value to its JSON string representation.

**Example:**

```gql
MATCH (p:Person)
RETURN coalesce(p.firstName, 'Unknown') AS display_name,
       to_json_string(p) AS person_json
```

## Related content

- [GQL language guide](gql-language-guide.md)
- [GQL values and value types](gql-values-and-value-types.md)
- [Graph patterns](gql-graph-patterns.md)
- [Filter and aggregate graph data](filter-aggregate-graph-data.md)
