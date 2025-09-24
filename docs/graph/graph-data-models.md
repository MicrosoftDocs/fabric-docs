---
title: Graph in Microsoft Fabric Data Models
description: Understand why the Labeled Property Graph (LPG) is the recommended and only supported model in Graph in Microsoft Fabric, and how it compares to RDF.
ms.topic: concept-article
ms.date: 10/01/2025
author: eric-urban
ms.author: eur
ms.reviewer: eur
ms.service: fabric
#ms.subservice: graph
---

# Graph in Microsoft Fabric data models

In this article, we explore the Labeled Property Graph (LPG) model, which is the recommended and only supported model in Graph in Microsoft Fabric. LPG delivers practical benefits for analytics and connected data in Microsoft Fabric.

> [!IMPORTANT]
> Graph in Microsoft Fabric only supports the Labeled Property Graph (LPG) model at this time. Resource Description Framework (RDF) isn't supported. 

## Labeled Property Graph (LPG)

**LPG** is a data model used by many popular [graph databases](graph-database.md), including Graph in Microsoft Fabric. In an LPG:
- Data is represented as nodes (vertices) and edges (relationships).
- **Labels** classify nodes (such as Person or Product) and edges (such as FRIENDS_WITH or PURCHASED).
- Both nodes and edges can have **properties**—key-value pairs storing more data (such as `{name: "Alice", age: 30}` for a node, `{since: 2020}` for an edge).

LPGs do **not require global identifiers (IRIs/URIs)** for every node or edge; they use internal or application-level IDs. Your application defines the meaning of labels, making LPGs straightforward and developer-friendly. The property graph approach was born out of a need for efficient, navigable data structures for connected data, with a focus on **fast graph traversal and query performance** for operational analytics (such as recommendation engines, fraud detection, supply chain analysis).

## What about Resource Description Framework (RDF)?

**RDF** is a W3C-standardized model for representing information as subject-predicate-object triples, often used for semantic web and knowledge graph scenarios. RDF excels at interoperability, data integration, and formal reasoning with ontologies. However, RDF is **not supported in Graph in Microsoft Fabric** at this time.

If your use case requires semantic web standards, ontologies, or global data integration, you might need to consider other platforms that support RDF. For most enterprise analytics, operational graph workloads, and business intelligence scenarios, LPG is the recommended and supported model in Graph in Microsoft Fabric.

## Key benefits of LPG in Graph in Microsoft Fabric

For most customers, LPG provides the best balance of performance, usability, and integration for connected data analytics in Microsoft Fabric.

- **Simplicity and intuitiveness:** Nodes and edges map closely to how people think about networks. There's less upfront complexity than RDF—no need to define ontologies or manage global identifiers.
- **Properties on edges:** Easily model weighted, temporal, or labeled relationships, supporting advanced analytics like recommendations and fraud detection.
- **Performance and storage efficiency:** Graph databases that use the LPG model store data compactly and enable fast traversals, even for large, complex graphs.
- **Flexible schema:** You can evolve your graph model as your business needs change, without rigid constraints.
- **Integration with Fabric:** LPG in Graph in Microsoft Fabric is deeply integrated with OneLake and Power BI, enabling seamless analytics and visualization.

## Related content

- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
- [End-to-end tutorials in Microsoft Fabric](/fabric/fundamentals/end-to-end-tutorials)
