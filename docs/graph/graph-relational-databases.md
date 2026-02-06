---
title:  Compare Graph and Relational Databases
description: Compare graph databases and relational databases, highlighting key differences, use cases, and advantages in analytics.
ms.topic: concept-article
ms.date: 11/18/2025
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
---

#  Compare graph and relational databases

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this article, we compare graph databases and relational databases, highlighting key differences, use cases, and advantages in analytics. You can evaluate whether to use [Graph for Microsoft Fabric](overview.md) or a relational database based on your specific needs.

A [**graph database**](graph-database.md) stores and queries data as a network of nodes (entities) and edges (relationships), making it fundamentally different from the tables-and-rows format of relational databases. Graph databases excel at modeling and analyzing highly connected data, such as social networks, knowledge graphs, recommendation systems, and fraud detection.

## Core Differences

- **Graph databases:** Organize data as nodes and edges, storing relationships explicitly. Traversing connections is efficient and often independent of total dataset size.
- **Relational databases:** Organize data in tables with rows and columns. Relationships are inferred at query time using JOIN operations, which can become complex and slow for highly connected data.

## Querying relationships: Joins versus traversals

**Relational database queries:** Data in different tables is linked through foreign keys. To retrieve related data, relational databases use JOIN operations to combine rows from multiple tables. This works well for simple relationships but can become expensive and complex for deep or variable-length connections.

**Graph database queries:** Relationships are stored as edges, allowing direct traversal from one node to another. Graph queries can efficiently navigate multiple hops and complex patterns. Graph query languages like GQL make it easy to express traversals and pattern matching.

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
> GQL is an ISO-standardized query language for graph databases, designed for efficient querying and manipulation of graph-structured data. The same international working group that oversees SQL is developing it.

## Performance Implications

Graph databases can outperform relational systems for queries involving many edges or unknown depths, especially for deep-link analytics or recursive queries. Relational databases excel at set-oriented operations and aggregations due to decades of optimization.

## Scaling Considerations

- **Relational databases:** Typically scale vertically (bigger machines) and can scale horizontally via sharding and replication. Sharding highly connected schemas is complex and can incur cross-network overhead.
- **Graph databases:** Scale vertically and horizontally. Distributed graph databases partition graphs across machines, aiming to keep related nodes together for efficient traversals.

## When to Use Each

**Use a Graph Database if:**
- Your data is highly connected and relationship-heavy (social networks, knowledge graphs, recommendations).
- You need to traverse an unknown or variable number of hops.
- The schema is evolving or semi-structured.
- You want intuitive modeling for domains where relationships are central.

**Use a Relational Database if:**
- Your data is mostly tabular or fits a well-defined structure.
- Your queries involve heavy aggregations or large set operations.
- You have existing tooling or expertise aligned with SQL.

## Hybrid Approaches

Many projects use both: a relational database for core transactional data, and a graph database for specialized analytics or network analysis features.

## Related content

- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
- [End-to-end tutorials in Microsoft Fabric](/fabric/fundamentals/end-to-end-tutorials)
