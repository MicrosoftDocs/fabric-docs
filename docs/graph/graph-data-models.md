---
title: Labeled Property Graphs in Fabric Graph
description: Understand the benefits of the Labeled Property Graph (LPG) model used by Fabric Graph, including nodes, edges, properties, and labels.
ms.topic: concept-article
ms.date: 03/03/2026
ms.reviewer: wangwilliam
---

# Labeled property graphs in Fabric Graph

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This article introduces the Labeled Property Graph (LPG) model, which is the data model used by Fabric Graph. LPG delivers practical benefits for analytics and connected data in Graph.

> [!IMPORTANT]
> Graph only supports the LPG model. Resource Description Framework (RDF) isn't supported.

## Labeled property graph (LPG)

Many popular [graph databases](graph-database.md) use the LPG data model, including Graph. In an LPG:

- You represent data as nodes and edges, which are also sometimes called vertices and relationships, respectively.
- You classify nodes (such as Person or Product) and edges (such as FRIENDS_WITH or PURCHASED) with **labels**.
- Both nodes and edges can have **properties** - key-value pairs that store more data (such as `{name: "Alice", age: 30}` for a node, `{since: 2020}` for an edge).

LPGs don't require global identifiers (IRIs/URIs) for every node or edge. Instead, they use internal or application-level identifiers. Your application defines the meaning of labels, making LPGs straightforward and developer-friendly. The property graph approach was born out of a need for efficient, navigable data structures for connected data, with a focus on **fast graph traversal and query performance** for operational analytics (such as recommendation engines, fraud detection, supply chain analysis).

## What about Resource Description Framework (RDF)?

**RDF** is a W3C-standardized model for representing information as subject-predicate-object triples. It's often used for semantic web and knowledge graph scenarios. RDF excels at interoperability, data integration, and formal reasoning with ontologies. However, Graph *doesn't support RDF*.

If your use case requires semantic web standards, semantic web ontologies, or global data integration, you might need to consider other platforms that support RDF. For most enterprise analytics, operational graph workloads, and business intelligence scenarios, use LPG, which is the recommended and supported model in Graph.

## Key benefits of LPG

For most customers, LPG provides the best balance of performance, usability, and integration for connected data analytics in Microsoft Fabric.

- **Simplicity and intuitiveness:** Nodes and edges map closely to how people think about networks. There's less complexity than RDF. You don't need to define ontologies or manage global identifiers.
- **Properties on edges:** You can easily model weighted, temporal, or labeled relationships. This feature supports advanced analytics like recommendations and fraud detection.
- **Performance and storage efficiency:** Graph databases that use the LPG model store data compactly and enable fast traversals, even for large, complex graphs.
- **Flexible schema:** You can evolve your graph model as your business needs change, without rigid constraints.
- **Integration with Fabric:** The use of LPGs by Graph is deeply integrated with OneLake and Power BI, enabling seamless analytics and visualization.

## Related content

- [Try Microsoft Fabric for free](../fundamentals/fabric-trial.md)
- [End-to-end tutorials in Microsoft Fabric](../fundamentals/end-to-end-tutorials.md)
