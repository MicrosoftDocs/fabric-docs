---
title: Write graph pattern queries in Microsoft Fabric
description: Learn how to write GQL graph pattern queries in Microsoft Fabric, including multi-hop traversal, path modes, variable reuse, and optional matching with examples.
ms.topic: how-to
ms.date: 09/18/2026
ms.reviewer: splantikow
ai-usage: ai-assisted
---

# Write graph pattern queries in Microsoft Fabric

Graph pattern matching lets you describe the structure of the data you want to find using intuitive, visual syntax. Instead of joining tables, you write patterns that look like the relationships themselves - nodes connected by edges. This article shows you how to write GQL pattern queries for common scenarios in graph in Microsoft Fabric.

The examples use the [social network sample dataset](sample-datasets.md). For a full pattern syntax reference, see [GQL graph patterns](gql-graph-patterns.md).

Use this article to learn how to construct and combine node, edge, and path
patterns. For ready-to-adapt tasks such as finding neighbors or entities with
no relationships, see [Write common GQL queries](write-common-gql-queries.md).
For filtering, grouping, and aggregate workflows, see [Filter and aggregate
graph data](filter-aggregate-graph-data.md).

## Prerequisites

- A graph item built from the [social network sample dataset](sample-datasets.md), with the node types, edge types, and properties described in the [social network schema example](gql-schema-example.md).
- Familiarity with basic `MATCH` and `RETURN` queries. See [GQL language guide](gql-language-guide.md).

## Match direct relationships

A basic pattern matches a node type, a specific edge type, and another node type. The syntax looks like a diagram of the relationship.

For example, to find up to 100 people paired with the company they work at:

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN p.firstName, p.lastName, c.name
LIMIT 100
```

Use an undirected edge pattern when you don't know or don't care about direction. For example, to find up to 100 mutual acquaintances regardless of who initiated the connection:

```gql
MATCH (a:Person)-[:knows]-(b:Person)
RETURN a.firstName, b.firstName
LIMIT 100
```

> [!NOTE]
> graph currently doesn't support creating undirected edges, but you can query edges in any direction by using `-[:label]-` syntax.

## Filter patterns with inline WHERE

Place `WHERE` inside the pattern when a condition defines which node or edge can
participate in the match. Use a statement-level `MATCH ... WHERE` condition to
postfilter the completed match, or a separate `FILTER` when the condition
applies to the row produced by an earlier statement. Predicate placement can
change shortest-path results. For more information, see [Place predicates before or after path
selection](gql-graph-patterns.md#place-predicates-before-or-after-path-selection).

For example, to find people born before 1990 who work at a company whose name starts with 'A':

```gql
MATCH (p:Person WHERE p.birthday < 19900101)-[:workAt]->(c:Company WHERE c.name STARTS WITH 'A')
RETURN p.firstName, p.lastName, c.name
```

Filter on edge properties to restrict which relationships match. For example, to return only people who started working at a company in 2010 or later:

```gql
MATCH (p:Person)-[w:workAt WHERE w.workFrom >= 2010]->(c:Company)
RETURN p.firstName, c.name, w.workFrom
```

## Match multi-hop relationships

Use variable-length patterns to traverse multiple hops in one expression. Specify the minimum and maximum number of hops with `{min,max}` syntax.

For example, to find up to 100 people reachable within two to four degrees of friendship from Alice:

```gql
MATCH (src:Person WHERE src.firstName = 'Alice')-[:knows]->{2,4}(dst:Person)
RETURN dst.firstName, dst.lastName
LIMIT 100
```

To find up to 100 immediate and second-degree connections (one or two hops) from Alice:

```gql
MATCH (src:Person WHERE src.firstName = 'Alice')-[:knows]->{1,2}(dst:Person)
RETURN DISTINCT dst.firstName, dst.lastName
LIMIT 100
```

## Control traversal with path modes

By default, GQL uses `WALK`, which allows repeated nodes and edges. Use another path mode when you need stricter element uniqueness.

| Path mode | Behavior | Use when... |
| --- | --- | --- |
| `WALK` | Allows repeated nodes and edges (default) | You want all matching walks within a finite bound. |
| `TRAIL` | No repeated edges | You want to avoid retracing the same edge, but the same node can appear through different edges. |
| `SIMPLE` | No repeated nodes except a shared start and end node, and no repeated edges | You want no node to appear more than once in the middle of a path, but allow paths that close back to the start. Useful for detecting loops. |
| `ACYCLIC` | No repeated nodes or edges | You need to guarantee that no node appears anywhere in the path more than once. Use for strict hierarchies, lineage, or any traversal where revisiting a node would produce incorrect results. |

`WALK` is the most permissive mode and `ACYCLIC` is the most restrictive.

For `SIMPLE` and `ACYCLIC`, edge uniqueness follows from node uniqueness. A `SIMPLE` path can close by returning to its first node, but it still can't reuse an edge.

To illustrate the difference, consider the path Alice → Bob → Carol → Bob:

- **WALK** — allows this path. Nodes and edges can repeat freely.
- **TRAIL** — allows this path. Bob appears twice, but each edge used is a different relationship (Alice→Bob and Carol→Bob are distinct edges), so no edge is repeated.
- **SIMPLE** — blocks this path. Bob appears more than once, and SIMPLE only allows a node to repeat if it's both the start and end of the path (a closed cycle). Here Alice is the start and Bob is the end, so no exception applies.
- **ACYCLIC** — blocks this path. Bob appears more than once anywhere in the path.

The following example shows how to use `TRAIL` to count how many distinct paths lead to each of the first 100 people reachable in Alice's network within four hops:

```gql
MATCH TRAIL (src:Person WHERE src.firstName = 'Alice')-[:knows]->{1,4}(dst:Person)
LET personId = dst.id
RETURN personId, dst.firstName, dst.lastName, count(*) AS pathCount
GROUP BY personId, dst.firstName, dst.lastName
ORDER BY pathCount DESC
LIMIT 100
```

Use `ACYCLIC` to return up to 100 people reachable from Alice within four hops, where each person in the path is unique:

```gql
MATCH ACYCLIC (src:Person WHERE src.firstName = 'Alice')-[:knows]->{1,4}(dst:Person)
RETURN dst.firstName, dst.lastName
LIMIT 100
```

The default `REPEATABLE ELEMENTS` match mode allows an edge to be reused by separate paths in the same graph pattern. Use `DIFFERENT EDGES` or `DIFFERENT RELATIONSHIPS` when every edge binding across all paths must be different:

<!-- GQL Query: Added 2026-09-17 -->
```gql
MATCH DIFFERENT EDGES
  (p:Person)-[:knows]->(friend:Person),
  (p)-[:knows]->(other:Person)
RETURN p.firstName, friend.firstName, other.firstName
LIMIT 100
```

## Return one shortest path

`ALL` is the default path search and returns every matching path. Use `ANY
SHORTEST` to return one shortest path for each source-destination pair. The
following query finds one shortest path from Alice to Bob:

<!-- GQL Query: Added 2026-09-17 -->
```gql
MATCH p = ANY SHORTEST
  (src:Person WHERE src.firstName = 'Alice')-[:knows]->{1,4}
  (dst:Person WHERE dst.firstName = 'Bob')
RETURN p, path_length(p) AS hopCount
```

When multiple shortest paths tie, which path is returned isn't deterministic.
`ALL SHORTEST` and `ANY` path searches aren't supported.

Predicate placement can change the result of `ANY SHORTEST`. Inline node and
edge predicates constrain which paths are eligible, while a postfilter can
remove the selected path without choosing a longer path instead. See [Place
predicates before or after path
selection](gql-graph-patterns.md#place-predicates-before-or-after-path-selection).

> [!TIP]
> Prefer a finite upper bound for predictable query cost. Unbounded `ALL WALK` patterns aren't supported. Unbounded patterns with `TRAIL`, `SIMPLE`, or `ACYCLIC` terminate through element uniqueness but can still return many paths. Unbounded `ANY SHORTEST WALK` supports only specific query shapes. See [Current limitations](limitations.md#variable-length-paths).

## Use variable reuse to express shared entities

Reusing the same variable in two parts of a pattern creates an implicit equality constraint - both references must match the same node. This technique lets you express "find entities connected through a shared third entity."

For example, to find up to 100 pairs of people who know each other and work at the same company:

```gql
MATCH (c:Company)<-[:workAt]-(a:Person)-[:knows]-(b:Person)-[:workAt]->(c)
RETURN a.firstName, b.firstName, c.name
LIMIT 100
```

The variable `c` is reused for both `workAt` targets, so the query only returns pairs where both people know each other *and* work at the same company.

To find up to 100 pairs of people who both liked the same post:

```gql
MATCH (a:Person)-[:likes]->(post:Post)<-[:likes]-(b:Person)
WHERE a.id < b.id
RETURN a.firstName, b.firstName, post.id
LIMIT 100
```

> [!TIP]
> The `WHERE a.id < b.id` condition prevents duplicate pairs (Alice + Bob and Bob + Alice) from appearing in the results.

## Combine multiple patterns

List multiple patterns in a single `MATCH`, separated by commas. Reuse a
variable when the patterns must bind the same graph element.

For example, to find up to 100 people along with both their workplace and the city they live in:

```gql
MATCH (p:Person)-[:workAt]->(c:Company),
      (p)-[:isLocatedIn]->(city:City)
RETURN p.firstName, c.name AS company, city.name AS city
LIMIT 100
```

The shared variable `p` connects the two patterns. Each result row represents one person with their company and city.

Disconnected patterns are also valid, but they form a Cartesian product of
their matches. Use them only when you intentionally need every combination. For
performance guidance, see [Use shared variables for efficient
joins](gql-query-performance.md#use-shared-variables-for-efficient-joins).

## Match optional relationships

Use `OPTIONAL MATCH` when a relationship might not exist for every node. Rows without a match are retained with `NULL` values, similar to a SQL `LEFT JOIN`.

For example, return up to 100 people with their company name, including people with no employer (that is, who return `NULL` for the company column):

```gql
MATCH (p:Person)
OPTIONAL MATCH (p)-[:workAt]->(c:Company)
RETURN p.firstName, p.lastName, c.name AS company
LIMIT 100
```

Use `IS NULL` after `OPTIONAL MATCH` to find up to 100 people who don't work at any company:

```gql
MATCH (p:Person)
OPTIONAL MATCH (p)-[:workAt]->(c:Company)
FILTER c IS NULL
RETURN p.firstName, p.lastName
LIMIT 100
```

## Related content

- [GQL graph patterns](gql-graph-patterns.md)
- [Filter and aggregate graph data](filter-aggregate-graph-data.md)
- [Write common GQL queries](write-common-gql-queries.md)
- [Current limitations](limitations.md)
