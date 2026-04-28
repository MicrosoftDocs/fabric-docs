---
title: Write common GQL queries in Microsoft Fabric
description: Learn how to write common GQL queries in Microsoft Fabric, including neighbor queries, multi-hop traversal, shared connection patterns, and entity existence checks.
ms.topic: how-to
ms.date: 04/27/2026
ms.reviewer: splantikow
ai-usage: ai-assisted
---

# Write common GQL queries in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This article provides practical GQL query patterns for common graph tasks in Microsoft Fabric: finding neighbors, traversing multihop connections, identifying shared connections, counting relationships, and finding entities with no connections.

Examples use the [social network sample dataset](sample-datasets.md). For full language reference, see [GQL language guide](gql-language-guide.md).

## Prerequisites

- A graph item with data loaded. If you're new to graph, complete the [tutorial](tutorial-introduction.md) first.
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

Find people two hops away - friends of Alice's friends who Alice doesn't directly know:

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

> [!TIP]
> Always set an upper bound on variable-length traversal. Unbounded patterns across large or dense graphs can hit query timeout limits. See [Current limitations](limitations.md).

## Count relationships per entity

Use `GROUP BY` with `count(*)` to count how many relationships each entity has.

Count how many friends each person has, ordered from most to fewest:

```gql
MATCH (p:Person)-[:knows]->(friend:Person)
LET name = p.firstName || ' ' || p.lastName
RETURN name, count(*) AS friendCount
GROUP BY name
ORDER BY friendCount DESC
LIMIT 20
```

Count how many employees work at each company:

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
LET companyName = c.name
RETURN companyName, count(*) AS employeeCount
GROUP BY companyName
ORDER BY employeeCount DESC
```

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

Use `OPTIONAL MATCH` followed by a null check to find nodes that have no matching relationship.

Find people who don't work at any company:

```gql
MATCH (p:Person)
OPTIONAL MATCH (p)-[:workAt]->(c:Company)
FILTER c IS NULL
RETURN p.firstName, p.lastName
LIMIT 100
```

Find posts with no comments:

```gql
MATCH (post:Post)
OPTIONAL MATCH (comment:Comment)-[:replyOf]->(post)
FILTER comment IS NULL
RETURN post.id, post.content
LIMIT 100
```

## Find entities with many connections

Combine `GROUP BY` and `FILTER` to identify highly connected nodes. This method is useful for finding hubs or outliers.

Find people with more than 10 friends:

```gql
MATCH (p:Person)-[:knows]->(friend:Person)
LET name = p.firstName || ' ' || p.lastName
RETURN name, count(*) AS friendCount
GROUP BY name
FILTER friendCount > 10
ORDER BY friendCount DESC
```

> [!NOTE]
> `FILTER` after `GROUP BY` works like `HAVING` in SQL. It filters on the aggregated result, not the individual rows.

## Related content

- [Write graph pattern queries](write-graph-pattern-queries.md)
- [Filter and aggregate graph data](filter-aggregate-graph-data.md)
- [GQL language guide](gql-language-guide.md)
- [GQL graph patterns](gql-graph-patterns.md)
- [Optimize GQL query performance](gql-query-performance.md)
- [Current limitations](limitations.md)
