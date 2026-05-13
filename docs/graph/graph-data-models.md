---
title: Labeled Property Graph (LPG)
description: Learn how the Labeled Property Graph (LPG) model in graph in Microsoft Fabric uses nodes, edges, properties, and labels for fast traversal and analytics.
#customer intent: As a data professional, I want to understand the labeled property graph model used by graph in Microsoft Fabric so that I can effectively model my connected data.
ai-usage: ai-assisted
ms.topic: concept-article
ms.date: 04/14/2026
ms.reviewer: wangwilliam
---

# Labeled property graphs in graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

A labeled property graph (LPG) is a data model that represents entities as nodes and connections as edges, with labels and properties on both. Graph in Microsoft Fabric uses the LPG model to deliver fast traversal and query performance for analytics and connected data.

## What is a labeled property graph (LPG)?

Many popular [graph databases](graph-database.md) use the LPG data model, including graph in Microsoft Fabric. In an LPG:

- You represent data as nodes and edges, which are also sometimes called vertices and relationships, respectively.
- You classify nodes (such as `Person` or `Product`) and edges (such as `FRIENDS_WITH` or `PURCHASED`) with **labels**.
- Both nodes and edges can have **properties** - key-value pairs that store more data (such as `{name: "Alice", age: 30}` for a node, `{since: 2020}` for an edge).

LPGs don't require global identifiers such as Internationalized Resource Identifiers (IRIs) or Uniform Resource Identifiers (URIs) for every node or edge. Instead, they use internal or application-level identifiers. Your application defines the meaning of labels.

## Resource Description Framework (RDF) comparison

> [!IMPORTANT]
> Graph in Microsoft Fabric only supports the LPG model. Resource Description Framework (RDF) isn't supported.

**RDF** is a World Wide Web Consortium (W3C)-standardized model for representing information as subject-predicate-object triples. It's often used for semantic web and knowledge graph scenarios. RDF excels at interoperability, data integration, and formal reasoning with ontologies. However, graph *doesn't support RDF*.

If your use case requires semantic web standards, semantic web ontologies, or global data integration, consider other platforms that support RDF. For enterprise analytics, operational graph workloads, and business intelligence scenarios, LPG is the recommended and supported model.

## Key benefits of the LPG model in Fabric

For most customers, the LPG model provides the best balance of performance, usability, and integration for connected data analytics in Microsoft Fabric.

- **Simplicity and intuitiveness:** Nodes and edges map closely to how people think about networks. LPG is less complex than RDF. You don't need to define ontologies or manage global identifiers.
- **Properties on edges:** Model weighted, temporal, or labeled relationships on edges. This feature supports advanced analytics like recommendations and fraud detection.
- **Performance and storage efficiency:** LPG-based graph databases store data compactly and enable fast traversals, even for large, complex graphs.
- **Flexible schema:** Evolve your graph model as your business needs change, without rigid constraints. Note that schema changes currently require you to create a new graph model and reload your data. For more information, see [Design a graph schema](design-graph-schema.md).
- **Integration with Fabric:** Graph works with OneLake and Power BI, enabling seamless analytics and visualization.

For details on how node types and edge types map to lakehouse tables in Fabric, see [Understand node types and edge types](design-graph-schema.md#understand-node-types-and-edge-types).

## Related content

- [Design a graph schema](design-graph-schema.md)
- [Tutorial: Introduction to graph](tutorial-introduction.md)
- [Try Microsoft Fabric for free](../fundamentals/fabric-trial.md)
- [End-to-end tutorials in Microsoft Fabric](../fundamentals/end-to-end-tutorials.md)
