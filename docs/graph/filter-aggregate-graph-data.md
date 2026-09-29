---
title: Filter and aggregate graph data in Microsoft Fabric
description: Learn how to filter, conditionally route, and aggregate graph data in Microsoft Fabric using GQL statements and aggregate functions.
ms.topic: how-to
ms.date: 09/18/2026
ms.reviewer: splantikow
ai-usage: ai-assisted
---

# Filter and aggregate graph data in Microsoft Fabric

Filtering narrows your results to the rows that matter. Aggregation summarizes those rows into counts, totals, and averages. This article shows you how to apply both techniques in GQL queries against graph in Microsoft Fabric.

The examples use the [social network sample dataset](sample-datasets.md). For an
end-to-end explanation of query flow and statements, see [GQL language
guide](gql-language-guide.md).

Use this article for row and pattern filtering, grouped and ungrouped
aggregation, aggregate-specific filters, and conditional routing. For
constructing multihop patterns and selecting paths, see [Write graph pattern
queries](write-graph-pattern-queries.md). For ready-to-adapt business tasks, see
[Write common GQL queries](write-common-gql-queries.md).

## Prerequisites

- A graph item built from the [social network sample dataset](sample-datasets.md), with the node types, edge types, and properties described in the [social network schema example](gql-schema-example.md).
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
> Use an inline `WHERE` clause when the condition defines which node or edge can
> participate in the match. Use `FILTER` when the condition applies to the row
> produced by an earlier statement. Predicate placement can change
> shortest-path results; see [Place predicates before or after path
> selection](gql-graph-patterns.md#place-predicates-before-or-after-path-selection).

## Filter during pattern matching

Inline `WHERE` clauses inside a `MATCH` pattern restrict which nodes and edges qualify for the match. The query optimizer can apply equivalent predicates during scanning, so inline syntax isn't inherently faster than a separate `FILTER`. Choose the form that expresses the intended semantics.

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

For more information about choosing between inline and post-match filtering, see [Optimize GQL query performance](gql-query-performance.md#place-filters-according-to-their-semantics).

## Handle null values in filters

GQL uses three-valued logic: predicates evaluate to `TRUE`, `FALSE`, or `UNKNOWN`. When a property value is null, comparisons return `UNKNOWN`. `FILTER` treats `UNKNOWN` as not matching, so the row is excluded.

Use `IS NULL` and `IS NOT NULL` to test for null values explicitly:

```gql
-- Only include people whose browser is known
MATCH (p:Person)
FILTER p.browserUsed IS NOT NULL
RETURN p.firstName, p.browserUsed
```

Use `coalesce()` to substitute a default value when a property might be null:

```gql
MATCH (p:Person)
RETURN p.firstName, coalesce(p.browserUsed, 'Unknown browser') AS browser
```

> [!CAUTION]
> `NULL = NULL` evaluates to `UNKNOWN`, not `TRUE`. Always use `IS NULL` to test for null values, not equality.

## Aggregate results with RETURN

Use aggregate functions in `RETURN` to summarize your results. Graph supports
the following aggregate functions: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`,
`COLLECT_LIST`, `COLLECT_ONE`, and `COLLECT_ELEMENTS`.

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

## Filter input for one aggregate

Add `FILTER (WHERE predicate)` after an aggregate to filter only that
aggregate's input. Other aggregates in the same `RETURN` still receive all
input rows.

```gql
MATCH (p:Person)
RETURN count(*) AS allPeople,
       count(*) FILTER (WHERE p.birthday < 19900101) AS peopleBornBefore1990
```

Add `LIMIT` inside the aggregate filter to use at most that many qualifying
rows. The query applies the predicate before the aggregate-specific limit.

```gql
MATCH (p:Person)
RETURN count(*) FILTER (WHERE p.birthday < 19900101 LIMIT 100) AS sampleCount
```

Aggregate-specific `FILTER` and `LIMIT` don't remove rows from the rest of the
query. Use a `FILTER` statement or match-level `WHERE` clause when you want to
filter the row stream.

## Collect values

Use `COLLECT_LIST` to return one list element for each input value, including
null values. Add `DISTINCT` to remove duplicates.

```gql
MATCH (p:Person)
RETURN collect_list(DISTINCT p.browserUsed) AS browsers
```

`COLLECT_ONE` returns one non-null input value. The selected value isn't
deterministic, so use it only when any value from the group is acceptable.

`COLLECT_ELEMENTS` accepts list-valued inputs and concatenates their elements
into one list:

```gql
MATCH (p:Person)
RETURN collect_elements([p.firstName, p.lastName]) AS names
```

Without grouping columns, an aggregate query with no input rows returns an
empty list from `COLLECT_LIST` and `COLLECT_ELEMENTS` and null from
`COLLECT_ONE`.

## Group results with GROUP BY

Use `GROUP BY` in `RETURN` to group rows by shared values and compute aggregates within each group. This grouping is the GQL equivalent of SQL `GROUP BY`.

For example, to count employees per company:

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
LET companyId = c.id, companyName = c.name
RETURN companyId, companyName, count(*) AS employeeCount
GROUP BY companyId, companyName
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
LET cityId = city.id, cityName = city.name
RETURN cityId, cityName, count(*) AS residentCount
GROUP BY cityId, cityName
ORDER BY residentCount DESC
LIMIT 5
```

> [!IMPORTANT]
> Place `ORDER BY` before `LIMIT`. `LIMIT` always applies to the already-sorted result set.

## Route rows with conditional statements

Use a conditional statement to route each incoming row to the first matching
branch. The input can come from any preceding query stage, not only an
aggregation. For example, the following query categorizes companies after
calculating their employee counts:

<!-- GQL Query: Added 2026-09-16 -->
```gql
MATCH (p:Person)-[:workAt]->(c:Company)
LET companyId = c.id, companyName = c.name
RETURN companyId, companyName, count(*) AS employeeCount
GROUP BY companyId, companyName
NEXT
WHEN employeeCount >= 100u THEN
  RETURN companyId, companyName, employeeCount, 'Large' AS category
WHEN employeeCount >= 10u THEN
  RETURN companyId, companyName, employeeCount, 'Medium' AS category
ELSE
  RETURN companyId, companyName, employeeCount, 'Small' AS category
```

Branches can run complete query statements and nested procedures, rather than
only returning expressions. The following example sends three input rows
through different branch shapes. One branch runs a `MATCH`, one combines two
aggregates with `UNION ALL` and then aggregates their results, and the fallback
branch returns a constant:

<!-- GQL Query: Added 2026-09-17 -->
```gql
FOR selector IN [1, 2, 3]
RETURN selector
NEXT
WHEN selector = 1 THEN
  MATCH (:Person)-[:knows]->(:Person)
  RETURN count(*) AS total, 'Knows edges' AS category
WHEN selector = 2 THEN {
  MATCH (:Person)-[:workAt]->(:Company)
  RETURN count(*) AS partialCount
  UNION ALL
  MATCH (:Person)-[:studyAt]->(:University)
  RETURN count(*) AS partialCount
  NEXT
  RETURN sum(partialCount) AS total, 'Affiliation edges' AS category
}
ELSE
  RETURN 0u AS total, 'No selected metric' AS category
```

The query engine evaluates the predicates in order for each row. It runs only the first matching branch. If a predicate evaluates to `UNKNOWN`, evaluation continues with the next branch. Without an `ELSE`, rows that don't match a `WHEN` branch are omitted.

Conditional statements are different from `CASE` expressions. Graph supports simple `CASE <expression> WHEN <value>` expressions for equality-based value selection. Searched `CASE WHEN <predicate>` expressions aren't supported. For more information, see [Conditional statements](gql-language-guide.md#conditional-statements).

## Related content

- [GQL expressions, predicates, and functions](gql-expressions.md)
- [Write graph pattern queries](write-graph-pattern-queries.md)
- [Write common GQL queries](write-common-gql-queries.md)
- [Optimize GQL query performance](gql-query-performance.md)
