---
title: Graph Database Overview
description: Discover what a graph database is, how it stores relationships as edges, and when to choose a graph database for connected data workloads in Microsoft Fabric.
#customer intent: As a data professional, I want to understand what a graph database is and how it compares to standalone graph database deployments so that I can decide whether graph in Microsoft Fabric fits my workload.
ms.topic: concept-article
ms.date: 04/20/2026
ms.reviewer: wangwilliam
---

# What is a graph database?

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

A graph database is a type of database that represents information as nodes (entities) and edges (relationships) instead of tables and rows. This structure makes it straightforward to explore complex connections and patterns across your data.

The most commonly used type of graph database implements the labeled property graph (LPG) model: entities (nodes) and relationships (edges) can have labels and properties (key-value pairs). This flexible model enables both schema-optional and schema-driven designs, and it lets you express complex relationships. Because connections are stored explicitly as edges, queries traverse relationships by following edges instead of computing expensive joins at query time.

> [!NOTE]
> Examples in this article use the [social network example graph dataset](sample-datasets.md).

## Graph database core concepts

A graph database organizes data into three fundamental building blocks:

- **Nodes** represent entities such as people, products, or places. Nodes can have labels and properties that describe their attributes. For example, a `Person` node might have properties like `firstName`, `lastName`, and `age`.
- **Edges** represent how the entities are connected, for example `FRIENDS_WITH`, `PURCHASED`, or `LOCATED_IN`. Edges can also carry properties and labels to capture relationship metadata.
- **Properties** attach details to nodes and edges (for example, a person's name or an edge's since date).

## How querying relationships works

Graph queries retrieve connected information by traversing from a starting node to its neighbors, then to their neighbors, and so on. A traversal's cost depends on the number of edges it touches (the local neighborhood), not the total size of the dataset. This characteristic makes questions about paths, connections, and patterns—such as *friends of friends*, shortest paths, or multi-hop dependencies—natural and efficient to express.

Graph databases use pattern-based query languages, such as **Graph Query Language (GQL)**, to describe these traversals concisely. The same international working group that oversees SQL (ISO/IEC 39075) is standardizing GQL, which aligns graph querying with established database standards.

**Example (pattern matching with GQL):**

<!-- GQL Query: Checked 2025-11-20 -->
```gql
MATCH (p:Person {firstName: "Annemarie"})-[:knows]->(friend)-[:likes]->(c:Comment)
RETURN c
ORDER BY c.creationDate
LIMIT 100
```

This pattern reads as: starting at the Person node for Annemarie, follow `:knows` edges to each friend node, then follow `:likes` edges to related `:Comment` nodes. Return the 100 newest of those comments ordered by their creation date.

## AI-assisted graph reasoning (preview)

Graph databases are a natural fit for AI reasoning because they encode the relationships that language models need to answer multi-hop questions accurately. In Microsoft Fabric, [Fabric Data Agent](../data-science/concept-data-agent.md) supports graph as a data source, enabling users to ask natural language questions that the agent answers by querying the graph. For details on how NL2GQL translates natural language into GQL, see the [Graph-powered AI reasoning announcement](https://blog.fabric.microsoft.com/en-US/blog/graph-powered-ai-reasoning-preview/).

## Graph data model and schema flexibility

Graph data models are schema-optional: you can start with a flexible model and formalize it over time. In graph in Microsoft Fabric, structural changes — such as adding new properties, modifying labels, or changing relationship types — currently require reingesting data into a new model. This approach reduces the need for data duplication and lets teams unify data from multiple sources without heavy upfront redesign. For more information about the data model used in graph in Microsoft Fabric, see [Labeled property graphs](graph-data-models.md).

## Common uses for graph databases

Graph databases align closely with domains where connections drive value, such as:

- Social networks — model relationships between people and their interactions
- Knowledge graphs — connect concepts, entities, and facts for semantic search and reasoning
- Recommendation systems — traverse user-item interactions to surface personalized suggestions
- Fraud and risk networks — detect suspicious patterns across accounts, transactions, and devices
- Network and IT topology — map dependencies between servers, services, and infrastructure components
- Supply chain dependency analysis — trace component origins and relationships across suppliers
- Graph-based retrieval-augmented generation (RAG) — use graph structure as a knowledge source for AI agents that need multi-hop reasoning with explainable, grounded answers

In these scenarios, questions are less about single records and more about how many entities relate and interact over several hops.

## When to consider a graph database

A graph database is a strong fit when relationships drive the core questions you need to answer. Choose a graph database when:

- Your primary questions involve paths, neighborhoods, and patterns in connected data.
- The number of hops is variable or not known in advance.
- You need to combine and navigate relationships across disparate datasets.

If you regularly ask these kinds of questions, a graph model is a natural fit.

## How graph in Microsoft Fabric compares to standalone graph databases

Representing your data as a graph and storing it in a separate, standalone graph database often introduces ETL (extract, transform, load) and governance overhead. By contrast, graph in Microsoft Fabric operates directly on OneLake, which reduces or eliminates the need for separate ETL pipelines and data duplication. Consider these tradeoffs:

- **Data movement and duplication**: Standalone graph databases typically require extracting, transforming, and loading data into a separate store, which increases complexity and can lead to duplicated datasets. Graph operates on OneLake so you can model and query connected data without moving it.
- **Operational costs**: Standalone graph stacks run as separate clusters or services and often carry idle-capacity charges. In graph, workloads consume pooled capacity units (CUs) with automatic scale-down and centralized metrics, which simplifies operations and can lower cost.
- **Scalability**: Some standalone graph databases depend on scale-up or vendor-specific clustering. Graph is designed for large-scale graphs and uses scale-out sharding across multiple workers to handle big-data workloads efficiently.
- **Tooling and skills**: Vendor-specific graph systems can require specialized languages and separate analytics frameworks. Graph provides unified modeling, standards-based querying (GQL), built-in graph analytics algorithms, BI and AI integration including [Fabric Data Agent](../data-science/concept-data-agent.md) support for [natural language graph querying](https://blog.fabric.microsoft.com/en-US/blog/graph-powered-ai-reasoning-preview/) (preview), and low/no-code exploratory tools. These capabilities enable a broader set of users to work with connected data.
- **Governance and security**: Separate graph deployments need independent governance and security setups. Graph uses OneLake governance, lineage, and workspace role-based access control (RBAC) so compliance, auditing, and permissions remain consistent with the rest of your Fabric environment.

## Related content

- [Compare graph and relational databases](graph-relational-databases.md)
- [Fabric data agent concepts](../data-science/concept-data-agent.md)
- [Try Microsoft Fabric for free](../fundamentals/fabric-trial.md)
