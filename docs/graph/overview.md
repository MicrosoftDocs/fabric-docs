---
title: Graph in Microsoft Fabric Overview
description: Learn about the core purpose, architecture, and benefits of Graph in Microsoft Fabric, including integration and feature highlights.
ms.topic: concept-article
ms.date: 09/15/2025
author: eric-urban
ms.author: eur
ms.reviewer: eur
ms.service: fabric
#ms.subservice: graph
ms.custom: references_regions
---

# Graph in Microsoft Fabric overview (preview)

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Graph in Microsoft Fabric is an intelligent, scalable solution that transforms disconnected data into AI-powered insights. 

Unlike relational databases that often require expensive joins and complex queries, graph in Microsoft Fabric implements a labeled property graph model. The entities (nodes) and relationships (edges) can have labels and properties. This flexible approach enables powerful graph analysis and advanced analytics directly from OneLake—without requiring ETL (extract, transform, load) or data replication.

## Why graph analytics matter

Traditional relational and tabular data formats make it difficult—if not impossible—to map relationships between different data points, such as the intertwined connections between users, posts, comments, forums, and tags on a social media platform. Graph enables you to uncover hidden connections, communities, and influence within your data, making it possible to answer complex questions about social networks, business processes, and more.

Graph in Microsoft Fabric provides an efficient way to model, visualize, and query these relationships, helping you understand the interconnectedness of your data and drive better insights.

- Business user: Visually explores relationships, runs NL queries, and gains insights effortlessly.
- Data engineer: Defines graph models, unifies data in OneLake with low and no-code tools.
- Data scientist: Uses graph algorithms and ML (machine learning) in Fabric's data science environment.
- Developer: Builds AI agents and real-time apps using graph-powered contextual insights.

Graph in Microsoft Fabric broadens access to graph insights beyond specialized roles. Any user can use connected data in daily decision-making.

## Integration with Microsoft Fabric

Graph in Microsoft Fabric is deeply integrated with the Microsoft Fabric platform, including OneLake for unified data storage and Power BI for visualization. It integrates seamlessly with Microsoft Fabric's governance, security, and operational features.

You can incorporate graph analytics into your existing workflows, eliminating the need for data duplication and specialized skills. This makes insights accessible to a broader audience compared to traditional standalone graph databases.

### What you can do with graph

Graph in Microsoft Fabric enables you to:

- Model a labeled property graph over structured data in OneLake. Define node and edge schemas, and materialize graph views in the engine.

- Query using Graph Query Language (GQL) semantics, including pattern matching, path constructs, aggregations, and OPTIONAL MATCH as new features are released. The official International Standard for GQL is [ISO/IEC 39075 Information Technology - Database Languages - GQL](https://www.iso.org/standard/76120.html)

- Enrich your graph with scores and communities for downstream BI (business intelligence) and AI (artificial intelligence) workflows. Run built-in graph algorithms such as shortest path, page rank, weakly connected components (WCC), and Louvain, using a vertex-centric, bulk synchronous parallel (BSP) algorithm executor. 

- Benefit from role-based experiences:  
    - Data engineers can model and ingest data.  
    - Analysts can run low/no-code queries and curate view sets.  
    - Business users can explore visually or use natural language to interact with the data.  
    - Developers and data scientists can integrate graph analytics in notebooks and applications.

- Operate within Fabric: Automatically shut down when not in use and monitor usage in the capacity metrics app—all governed by Fabric OneLake security, compliance, and permission model.

### How graph in Microsoft Fabric differs from standalone graph databases

| Area | Graph in Microsoft Fabric | Standalone graph database |
|---|---|---|
| Data gravity | Graph operates directly on OneLake, so you don't have to perform ETL or duplicate data. | Standalone graph databases require you to move or duplicate your data into a separate graph database instance, which can add complexity and overhead. |
| Scalability | The service is designed for large-scale graphs and uses scale-out sharding across multiple workers to handle big data workloads efficiently. | Most standalone graph databases rely on scale-up architectures or clusters that might be limited by the vendor or edition, which can restrict scalability. |
| Language & algorithms | Graph in Microsoft Fabric supports standards-based GQL (preview) and includes built-in graph analytics algorithms. | Standalone graph databases often use vendor-specific query languages and separate analytics frameworks, and the support for algorithms can vary widely. |
| User experience | Users benefit from a unified Microsoft Fabric interface for modeling, querying, business intelligence (BI), artificial intelligence (AI) integration, and low/no-code exploration. Specialized graph engineering skills aren't required. | Standalone graph databases are primarily developer-focused, with consoles and SDKs that often require specialized skills. Visualization and low-code tools can be separate and might require extra setup. |
| Operations & cost | Graph workloads run on pooled Fabric capacity units (CUs) with automatic scale-down and centralized metrics, which helps optimize resource usage and cost. | Standalone graph databases require separate clusters or licenses, custom scaling and monitoring, and often incur idle capacity charges, increasing operational complexity and cost. |
| Governance & security | Microsoft Fabric provides native OneLake governance, lineage tracking, and workspace role-based access control (RBAC), and integrates with Fabric compliance standards for security and auditing. | Standalone graph databases have separate security and governance models that must be configured and audited independently, which can increase risk and administrative burden. |

## Pricing and capacity units

Graph uses the same capacity units (CUs) as other workloads in Microsoft Fabric. You don't need to purchase a separate graph-specific license or SKU. All graph operations, including data ingestion, querying, and running algorithms, consume your organization's reserved or pay-as-you-go Fabric capacity.

Usage is measured in minutes of CPU uptime. You can monitor your graph workload's resource consumption and performance in the centralized capacity metrics app.

| Fabric operation name | Azure billing meter | Unit of measure | Fabric CU consumption rate |
|---|---|---|---|
| Graph general operations | Graph capacity usage CU | Minute | 0.16667 CUs per minute |
| Graph algorithm operations| Graph capacity usage CU | Minute | 0.26667 CUs per minute |
| Graph cache storage | OneLakeCache | Per GB per month | - |
| Graph standard storage | OneLakeStorage | Per GB per month | - |

For more information on pricing and capacity units, see [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

## Region availability

Graph in Microsoft Fabric is available in the following Azure regions:

- East US 2
- North Central US
- West Europe

## Related content

- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
- [End-to-end tutorials in Microsoft Fabric](/fabric/fundamentals/end-to-end-tutorials)
