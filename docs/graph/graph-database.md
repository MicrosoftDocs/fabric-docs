---
title: What is a graph database?
description: Learn about the benefits of using a graph database.
ms.topic: concept-article
ms.date: 02/09/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
---

# What is a graph database?

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Graph databases offer a powerful way to model and query connected data. Unlike traditional relational databases that store data in tables, graph databases represent information as nodes (entities) and edges (relationships), making it easier to more flexibly explore complex connections and patterns.

The most commonly used type of graph database implements the [labeled property graph](graph-data-models.md#labeled-property-graph-lpg) (LPG) model: entities (nodes) and relationships (edges) can have labels and properties (key–value pairs). This flexible model enables both schema-optional and schema-driven designs, and it lets you express rich semantics. Because connections are stored explicitly as edges, queries traverse relationships by following edges instead of computing expensive joins at query time.

> [!IMPORTANT]
> This article exclusively uses the [social network example graph dataset](sample-datasets.md).

## Graph database core concepts

- **Nodes** represent entities such as people, products, or places. Nodes can have labels and properties that describe their attributes. For example, a Person node might have properties like firstName, lastName, and age.
- **Edges** represent how the entities are connected, for example FRIENDS_WITH, PURCHASED, or LOCATED_IN. Edges can also carry properties and labels to encode relationship metadata.
- **Properties** attach details to nodes and edges (for example, a person’s name or an edge’s since date). Because relationships are stored explicitly as edges, queries navigate the graph by following connections rather than computing them at query time.

## How querying relationships works

Graph queries retrieve connected information by traversing from a starting node to its neighbors, then to their neighbors, and so on. The effort a traversal performs is tied to the number of edges it touches (the local neighborhood), not the total size of the dataset. This characteristic makes questions about paths, connections, and patterns—such as *friends of friends*, shortest paths, or multi-hop dependencies—natural and efficient to express.

Graph databases use pattern-based query languages, such as the increasingly adopted **Graph Query Language (GQL)**, to describe these traversals concisely. GQL is being standardized by the same international working group that oversees SQL (ISO/IEC 39075), aligning graph querying with established database standards.

**Example (pattern matching with GQL):**

<!-- GQL Query: Checked 2025-11-20 -->
```gql
MATCH (p:Person {firstName: "Annemarie"})-[:knows]->(friend)-[:likes]->(c:Comment)
RETURN c
ORDER BY c.creationDate
LIMIT 100
```

This pattern reads as: starting at the Person node for Annemarie, follow `:knows` edges to each friend node, then follow `:likes` edges to related `:Comment` nodes. Return the 100 newest of those comments ordered by their creation date.

## Modeling and schema

Graph data models are schema-optional: you can work with a fixed schema when you need strong governance, or evolve the model as new node types, relationships, or properties appear. This approach reduces the need for data duplication and lets teams unify data from multiple sources without heavy upfront redesign.

## Common uses for graph databases

Graph databases align closely with domains where connections drive value, such as:

- Social networks
- Knowledge graphs
- Recommendation systems
- Fraud and risk networks
- Network and IT topology
- Supply chain dependency analysis

In these scenarios, questions are less about single records and more about how many entities relate and interact over several hops.

## When to consider a graph database

Choose a graph database when:

- Your primary questions involve paths, neighborhoods, and patterns in connected data.
- The number of hops is variable or not known in advance.
- You need to combine and navigate relationships across disparate datasets.

If you regularly ask these kinds of questions, a graph model is a natural fit.

## Graph in Microsoft Fabric

Representing your data as a graph and storing it in a separate, standalone graph database often introduces ETL (extract, transform, load) and governance overhead. By contrast, Graph in Microsoft Fabric operates directly on OneLake, which reduces or eliminates the need for separate ETL pipelines and data duplication. Consider these tradeoffs:

- **Data movement and duplication**: Standalone graph databases typically require extracting, transforming, and loading data into a separate store, which increases complexity and can lead to duplicated datasets. Graph in Microsoft Fabric operates on OneLake so you can model and query connected data without moving it.
- **Operational costs**: Standalone graph stacks run as separate clusters or services and often carry idle-capacity charges. Graph workloads in Fabric consume pooled capacity units (CUs) with automatic scale-down and centralized metrics, which simplifies operations and can lower cost.
- **Scalability**: Some standalone graph databases depend on scale-up or vendor-specific clustering. Graph in Microsoft Fabric is designed for large-scale graphs and uses scale-out sharding across multiple workers to handle big-data workloads efficiently.
- **Tooling and skills**: Vendor-specific graph systems can require specialized languages and separate analytics frameworks. Graph in Microsoft Fabric provides unified modeling, standards-based querying (GQL), built-in graph analytics algorithms, BI and AI integration, and low/no-code exploratory tools. These capabilities enable a broader set of users to work with connected data.
- **Governance and security**: Separate graph deployments need independent governance and security setups. Graph in Microsoft Fabric uses OneLake governance, lineage, and workspace role-based access control (RBAC) so compliance, auditing, and permissions remain consistent with the rest of your Fabric environment.

## Related content

- [Compare graph and relational databases](graph-relational-databases.md)
- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
