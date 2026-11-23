---
title: Write common GQL queries in Microsoft Fabric
description: Learn how to write common GQL queries in Microsoft Fabric, including neighbor queries, multihop traversal, correlated subqueries, shared connections, and entity existence checks.
ms.topic: how-to
ms.date: 09/18/2026
ms.reviewer: splantikow
ai-usage: ai-assisted
---

# Write common GQL queries in Microsoft Fabric

This article provides practical GQL query patterns for common graph tasks in Microsoft Fabric: finding neighbors, traversing multihop connections, identifying shared connections, counting relationships, and finding entities with no connections.

The examples use the [social network sample dataset](sample-datasets.md). For an end-to-end explanation of query flow and statements, see [GQL language guide](gql-language-guide.md).
Use this article when you know the graph task you want to accomplish. For systematic instruction on constructing node, edge, and path patterns, see [Write graph pattern queries](write-graph-pattern-queries.md). For detailed filtering and aggregation workflows, see [Filter and aggregate graph data](filter-aggregate-graph-data.md).


## Prerequisites

- A graph item built from the [social network sample dataset](sample-datasets.md), with the node types, edge types, and properties described in the [social network schema example](gql-schema-example.md).
- Familiarity with basic `MATCH` and `RETURN` queries. See [GQL language guide](gql-language-guide.md).

## Find direct neighbors

Return all nodes connected to a starting node by one hop.

Find everyone a specific person knows:

```gql
MATCH (p:Person WHERE p.firstName = 'Alice')-[:knows]->(friend:Person)
RETURN friend.firstName, friend.lastName
```

Find all companies a person worked at:

```gql
MATCH (p:Person WHERE p.firstName = 'Alice')-[:workAt]->(c:Company)
RETURN c.name, c.url
```

## Find friends of friends (multi-hop)

Use variable-length patterns with `{min,max}` to traverse more than one hop.

Find people reached by exactly two `knows` edges from Alice:

```gql
MATCH (alice:Person WHERE alice.firstName = 'Alice')-[:knows]->{2,2}(fof:Person)
RETURN DISTINCT fof.firstName, fof.lastName
LIMIT 100
```

Find everyone reachable within three degrees:

```gql
MATCH (src:Person WHERE src.firstName = 'Alice')-[:knows]->{1,3}(dst:Person)
RETURN DISTINCT dst.firstName, dst.lastName
LIMIT 100
```

Find one shortest path from Alice to each person reachable within four hops:

<!-- GQL Query: Added 2026-09-17 -->
```gql
MATCH p = ANY SHORTEST
  (src:Person WHERE src.firstName = 'Alice')-[:knows]->{1,4}(dst:Person)
RETURN dst.firstName, dst.lastName, path_length(p) AS hopCount
ORDER BY hopCount, dst.lastName
LIMIT 100
```

If multiple shortest paths reach the same person in the same number of hops, `ANY SHORTEST` returns one of them without a deterministic tie choice.

Inline predicates constrain which paths are eligible for `ANY SHORTEST`.
Postfilters apply after a shortest path is selected. For examples, see [Place
predicates before or after path
selection](gql-graph-patterns.md#place-predicates-before-or-after-path-selection).

> [!TIP]
> Use a finite upper bound for predictable query cost. Unbounded `ALL WALK` traversal isn't supported. Other unbounded path modes can still produce large results. See [Current limitations](limitations.md#variable-length-paths).

## Count relationships per entity

Use `GROUP BY` with `count(*)` to count how many relationships each entity has.
For detailed grouping, aggregate filtering, and conditional routing patterns,
see [Filter and aggregate graph data](filter-aggregate-graph-data.md).

Count how many friends each person has, ordered from most to fewest:

```gql
MATCH (p:Person)-[:knows]->(friend:Person)
LET personId = p.id, name = p.firstName || ' ' || p.lastName
RETURN personId, name, count(*) AS friendCount
GROUP BY personId, name
ORDER BY friendCount DESC
LIMIT 20
```

## Calculate a value for each entity

Use a correlated `CALL` subquery to calculate a value for each input row. Variables from the outer query are implicitly available inside the subquery.

Calculate the number of friends for each person:

<!-- GQL Query: Added 2026-09-16 -->
```gql
MATCH (p:Person)
CALL {
  MATCH (p)-[:knows]->(friend:Person)
  RETURN count(*) AS friendCount
}
RETURN p.firstName, p.lastName, friendCount
ORDER BY friendCount DESC
```

Outer variables remain available after `CALL`. Of the variables created inside the subquery, only returned columns become available outside it. An ungrouped `count(*)` returns `0` when no matching friends exist, so this query retains people who have no friends.

Ordinary `CALL` drops an outer row when the subquery returns no rows and produces one output row for each subquery row when it returns multiple rows. Use `OPTIONAL CALL` when you need to preserve an outer row that has no matching subquery row.

## Find shared connections

Reusing a variable in two parts of a pattern creates an implicit "same node" constraint. Use this constraint to find entities connected through a shared third entity.

Find pairs of people who both know the same person:

```gql
MATCH (a:Person)-[:knows]->(mutual:Person)<-[:knows]-(b:Person)
WHERE a.id < b.id
RETURN a.firstName, b.firstName, mutual.firstName AS sharedContact
LIMIT 100
```

Find pairs of people who work at the same company:

```gql
MATCH (c:Company)<-[:workAt]-(a:Person), (c)<-[:workAt]-(b:Person)
WHERE a.id < b.id
RETURN a.firstName, b.firstName, c.name AS company
LIMIT 100
```

> [!TIP]
> The `WHERE a.id < b.id` condition prevents duplicate pairs (Alice–Bob and Bob–Alice) from appearing in results.

## Find entities with no relationships

Use `NOT EXISTS` to find nodes for which a correlated subquery returns no rows.

Find people who don't work at any company:

<!-- GQL Query: Added 2026-09-16 -->
```gql
MATCH (p:Person)
WHERE NOT EXISTS {
  MATCH (p)-[:workAt]->(c:Company)
  RETURN c
}
RETURN p.firstName, p.lastName
LIMIT 100
```

Find posts with no comments:

<!-- GQL Query: Added 2026-09-16 -->
```gql
MATCH (post:Post)
WHERE NOT EXISTS {
  MATCH (comment:Comment)-[:replyOf]->(post)
  RETURN comment
}
RETURN post.id, post.content
LIMIT 100
```

## Find entities with many connections

Combine `GROUP BY` and `FILTER` to identify highly connected nodes. This method is useful for finding hubs or outliers.

Find people with more than 10 friends:

```gql
MATCH (p:Person)-[:knows]->(friend:Person)
LET personId = p.id, name = p.firstName || ' ' || p.lastName
RETURN personId, name, count(*) AS friendCount
GROUP BY personId, name
FILTER friendCount > 10
ORDER BY friendCount DESC
```

> [!NOTE]
> `FILTER` after `GROUP BY` works like `HAVING` in SQL. It filters on the aggregated result, not the individual rows.

## Related content

- [GQL language guide](gql-language-guide.md)
- [GQL graph patterns](gql-graph-patterns.md)
- [Filter and aggregate graph data](filter-aggregate-graph-data.md)
- [Optimize GQL query performance](gql-query-performance.md)
