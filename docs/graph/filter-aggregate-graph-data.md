---
title: Filter and aggregate graph data in Microsoft Fabric
description: Learn how to filter and aggregate graph data in Microsoft Fabric using GQL FILTER, WHERE, GROUP BY, and aggregate functions with practical examples.
ms.topic: how-to
ms.date: 04/27/2026
ms.reviewer: splantikow
ai-usage: ai-assisted
---

# Filter and aggregate graph data in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Filtering narrows your results to the rows that matter. Aggregation summarizes those rows into counts, totals, and averages. This article shows you how to apply both techniques in GQL queries against graph in Microsoft Fabric.

Examples use the [social network sample dataset](sample-datasets.md). For a full reference of GQL statements and expressions, see [GQL language guide](gql-language-guide.md).

## Prerequisites

- A graph item with data loaded. If you're new to graph, complete the [tutorial](tutorial-introduction.md) first.
- Familiarity with basic `MATCH` and `RETURN` queries. See [GQL language guide](gql-language-guide.md).

## Filter rows with FILTER

Use `FILTER` to keep only the rows that meet a condition. Place `FILTER` after `MATCH` to narrow the matched results.

The following query returns all females with their name and birthday:

```gql
MATCH (p:Person)
FILTER p.gender = 'female'
RETURN p.firstName, p.lastName, p.birthday
```

Combine multiple conditions with `AND` and `OR`. For example, the following query returns the names of all females born before 1990:

```gql
MATCH (p:Person)
FILTER p.gender = 'female' AND p.birthday < 19900101
RETURN p.firstName, p.lastName
```

> [!TIP]
> For better performance, filter during pattern matching with an inline `WHERE` clause rather than in a separate `FILTER` statement. See [Filter during pattern matching](#filter-during-pattern-matching).

## Filter during pattern matching

Inline `WHERE` clauses inside a `MATCH` pattern restrict which nodes and edges are matched before any results are produced. This approach is more efficient than a post-match `FILTER` clause because the query engine prunes rows earlier.

For example, to find people born before 1994 along with the company where they work, limiting results to companies whose name starts with 'A':

```gql
MATCH (p:Person WHERE p.birthday < 19940101)-[:workAt]->(c:Company WHERE c.name STARTS WITH 'A')
RETURN p.firstName, p.lastName, c.name
```

Filter edge properties the same way. For example, to return only people who started working at a company in 2000 or later:

```gql
MATCH (p:Person)-[w:workAt WHERE w.workFrom >= 2000]->(c:Company)
RETURN p.firstName, p.lastName, c.name, w.workFrom
```

For more on the performance difference between inline and post-match filtering, see [Optimize GQL query performance](gql-query-performance.md#filter-early-in-patterns).

## Handle null values in filters

GQL uses three-valued logic: predicates evaluate to `TRUE`, `FALSE`, or `UNKNOWN`. When a property value is null, comparisons return `UNKNOWN`. `FILTER` treats `UNKNOWN` as not matching, so the row is excluded.

Use `IS NULL` and `IS NOT NULL` to test for null values explicitly:

```gql
-- Only include people who have a nickname
MATCH (p:Person)
FILTER p.nickname IS NOT NULL
RETURN p.firstName, p.nickname
```

Use `coalesce()` to substitute a default value when a property might be null:

```gql
MATCH (p:Person)
RETURN p.firstName, coalesce(p.nickname, p.firstName) AS displayName
```

> [!CAUTION]
> `NULL = NULL` evaluates to `UNKNOWN`, not `TRUE`. Always use `IS NULL` to test for null values, not equality.

## Aggregate results with RETURN

Use aggregate functions in `RETURN` to summarize your results. GQL supports `count()`, `sum()`, `avg()`, `min()`, and `max()`.

For example, to count all people in the graph:

```gql
MATCH (p:Person)
RETURN count(*) AS totalPeople
```

To count distinct values such as how many distinct companies employ people:

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN count(DISTINCT c) AS companyCount
```

## Group results with GROUP BY

Use `GROUP BY` in `RETURN` to group rows by shared values and compute aggregates within each group. This grouping is the GQL equivalent of SQL `GROUP BY`.

For example, to count employees per company:

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
LET companyName = c.name
RETURN companyName, count(*) AS employeeCount
GROUP BY companyName
ORDER BY employeeCount DESC
```

Group by multiple columns and compute several aggregates at once. For example, break down the person count and birthday range by gender and browser, returning the 10 most common combinations:

```gql
MATCH (p:Person)
LET gender = p.gender
LET browser = p.browserUsed
RETURN gender,
       browser,
       count(*) AS personCount,
       min(p.birthday) AS earliestBirthday,
       max(p.birthday) AS latestBirthday
GROUP BY gender, browser
ORDER BY personCount DESC
LIMIT 10
```

> [!NOTE]
> All non-aggregate expressions in `RETURN` must appear in `GROUP BY`. Expressions that aren't in `GROUP BY` must use an aggregate function.

## Sort and limit aggregated results

Use `ORDER BY` and `LIMIT` together with `GROUP BY` to find top-N results.

For example, to find the top five cities by number of residents:

```gql
MATCH (p:Person)-[:isLocatedIn]->(city:City)
LET cityName = city.name
RETURN cityName, count(*) AS residentCount
GROUP BY cityName
ORDER BY residentCount DESC
LIMIT 5
```

> [!IMPORTANT]
> Place `ORDER BY` before `LIMIT`. `LIMIT` always applies to the already-sorted result set.

## Use CASE for conditional values in results

Use `CASE`/`WHEN`/`THEN`/`ELSE` to compute conditional values in `RETURN` or `LET`.

For example, to categorize people into eras based on their birth year:

```gql
MATCH (p:Person)
RETURN p.firstName,
       CASE WHEN p.birthday < 19800101 THEN 'Before 1980'
            WHEN p.birthday < 20000101 THEN '1980–1999'
            ELSE '2000 or later'
       END AS era
```

## Related content

- [GQL language guide](gql-language-guide.md)
- [GQL expressions, predicates, and functions](gql-expressions.md)
- [Optimize GQL query performance](gql-query-performance.md)
- [Write graph pattern queries](write-graph-pattern-queries.md)
- [Write common GQL queries](write-common-gql-queries.md)
