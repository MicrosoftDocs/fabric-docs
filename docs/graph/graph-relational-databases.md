---
title:  Compare Graph and Relational Databases
description: Compare graph databases and relational databases, highlighting key differences, use cases, and advantages in analytics.
ms.topic: concept-article
ms.date: 03/03/2026
ms.reviewer: wangwilliam
---

# Compare graph and relational databases

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This article compares graph databases and relational databases. It highlights key differences, use cases, and advantages in analytics. Use this information to decide whether to use [Fabric Graph](overview.md) or a relational database for your specific needs.

A [**graph database**](graph-database.md) stores and queries data as a network of nodes (entities) and edges (relationships). This approach makes it fundamentally different from the tables-and-rows format of relational databases. Graph databases work well for modeling and analyzing highly connected data, such as social networks, knowledge graphs, recommendation systems, and fraud detection.

## Core differences

- **Graph databases:** Organize data as nodes and edges, storing relationships explicitly. Traversing connections is efficient and often independent of total dataset size.
- **Relational databases:** Organize data in tables with rows and columns. Use JOIN operations to infer relationships at query time. For highly connected data, these operations can become complex and slow.

## Querying relationships: Joins versus traversals

**Relational database queries:** Foreign keys link data in different tables. To retrieve related data, relational databases use JOIN operations to combine rows from multiple tables. This method works well for simple relationships but can become expensive and complex for deep or variable-length connections.

**Graph database queries:** Store relationships as edges, so you can directly traverse from one node to another. Graph queries can efficiently navigate multiple hops and complex patterns. Graph query languages like GQL make it easy to express traversals and pattern matching.

**Example:**

GQL:

```gql
MATCH (p:Person)-[:friendsWith]->(friend)-[:purchased]->(o:Order)
WHERE p.name = 'Alice';
RETURN o
```

SQL (equivalent):

```sql
SELECT o.*
FROM Person AS p
JOIN Friends_With AS fw ON p.id = fw.person_id
JOIN Person AS friend ON fw.friend_id = friend.id
JOIN Purchased AS pur ON friend.id = pur.person_id
JOIN "Order" AS o ON pur.order_id = o.id
WHERE p.name = 'Alice';
```

> [!NOTE]
> GQL is an ISO-standardized query language for graph databases. It's designed for efficient querying and manipulation of graph-structured data. The same international working group that oversees SQL is developing it.

## Performance implications

Graph databases can outperform relational systems for queries that involve many edges or unknown depths, especially for deep-link analytics or recursive queries. Relational databases excel at set-oriented operations and aggregations because of decades of optimization.

## Scaling considerations

- **Relational databases:** Typically scale vertically (bigger machines) and can scale horizontally through sharding and replication. Sharding highly connected schemas is complex and can cause cross-network overhead.
- **Graph databases:** Scale vertically and horizontally. Distributed graph databases partition graphs across machines, aiming to keep related nodes together for efficient traversals.

## When to use each

**Use a graph database if:**

- Your data is highly connected and relationship-heavy (social networks, knowledge graphs, recommendations).
- You need to traverse an unknown or variable number of hops.
- The schema is evolving or semi-structured.
- You want intuitive modeling for domains where relationships are central.

**Use a relational database if:**

- Your data is mostly tabular or fits a well-defined structure.
- Your queries involve heavy aggregations or large set operations.
- You have existing tooling or expertise aligned with SQL.

## Hybrid approaches

Many projects use both types of databases: a relational database for core transactional data and a graph database for specialized analytics or network analysis features.

## Related content

- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
- [End-to-end tutorials in Microsoft Fabric](/fabric/fundamentals/end-to-end-tutorials)
