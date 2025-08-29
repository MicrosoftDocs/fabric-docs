---
title: Graph in Microsoft Fabric Overview
description: Learn about the core purpose, architecture, and benefits of Graph in Microsoft Fabric, including integration and feature highlights.
ms.topic: concept-article
ms.date: 08/18/2025
author: eric-urban
ms.author: eur
ms.reviewer: eur
ms.search.form: Getting started with Graph
---

# Graph in Microsoft Fabric overview

Graph in Microsoft Fabric is an intelligent, scalable solution that transforms disconnected data into AI-powered insights. 

Unlike relational databases that often require expensive joins and complex queries, graph in Microsoft Fabric implements a labeled property graph model. The nodes (vertices) and relationships (edges) can have labels and properties. This flexible approach enables powerful graph analysis and advanced analytics directly from OneLake—without requiring ETL (extract, transform, load) or data replication.

## Why Graph analytics matter

Traditional relational and tabular data formats make it difficult—if not impossible—to map relationships between different data points, such as users, posts, comments, forums, and tags. Graph analytics enable you to uncover hidden connections, communities, and influence within your data, making it possible to answer complex questions about social networks, business processes, and more.

Graph in Microsoft Fabric provides an efficient way to model, visualize, and query these relationships, helping you understand the interconnectedness of your data and drive better insights.

- Business User: Visually explores relationships, runs NL queries, and gains insights effortlessly.
- Data Engineer: Defines graph models, unifies data in OneLake with low and no-code tools.
- Data Scientist: Uses graph algorithms and ML (machine learning) in Fabric's Data Science environment.
- Developer: Builds AI agents and real-time apps using graph-powered contextual insights.

Graph in Microsoft Fabric broadens access to graph insights beyond specialized roles. Any user can use connected data in daily decision-making.

## Integration with Microsoft Fabric

Graph in Microsoft Fabric is deeply integrated with the Microsoft Fabric platform, including OneLake for unified data storage and Power BI for visualization. It integrates seamlessly with Microsoft Fabric's governance, security, and operational features.

You can incorporate graph analytics into your existing workflows, eliminating the need for data duplication and specialized skills. This makes insights accessible to a broader audience compared to traditional standalone graph databases.

### What you can do with Graph in Microsoft Fabric

With Graph in Microsoft Fabric, you can:

- Model a labeled property graph over structured data in OneLake (Delta/Parquet). Define vertex and edge schemas, and materialize graph views in the engine—decoupled from your system-of-record datasets.

- Query using Graph Query Language (GQL) semantics, including pattern matching, path constructs, aggregations, and OPTIONAL MATCH as new features are released. The official International Standard for GQL is [ISO/IEC 39075 Information Technology - Database Languages - GQL](https://www.iso.org/standard/76120.html)

- Enrich your graph with scores and communities for downstream BI (business intelligence) and AI (artificial intelligence) workflows. Run built-in graph algorithms such as shortest path, page rank, weakly connected components (WCC), and Louvain, using a vertex-centric, bulk synchronous parallel (BSP) algorithm executor. 

- Benefit from role-based experiences:  
    - Data engineers can model and ingest data.  
    - Analysts can run low/no-code queries and curate view sets.  
    - Business users can explore visually or use natural language to interact with GQL.  
    - Developers and data scientists can integrate graph analytics in notebooks and applications.

- Operate within Fabric: Autoscale with Fabric Capacity Units (CUs), pause and resume workloads, and monitor usage in the Capacity Metrics app—all governed by OneLake security and compliance.

### How graph in Microsoft Fabric differs from standalone graph databases

| Area | Graph in Microsoft Fabric | Standalone Graph Database |
|---|---|---|
| Data gravity | Graph in Microsoft Fabric operates directly on OneLake using Delta and Parquet formats, so there's no need for repeated ETL processes or data duplication. | Standalone graph databases require you to move or duplicate your data into a separate graph database instance, which can add complexity and overhead. |
| Scalability | The service is designed for large-scale graphs and uses scale-out sharding across multiple workers to handle big data workloads efficiently. | Most standalone graph databases rely on scale-up architectures or clusters that might be limited by the vendor or edition, which can restrict scalability. |
| Language & algorithms | Graph in Microsoft Fabric supports standards-based GQL (preview) and includes built-in algorithms such as vertex-centric and bulk synchronous parallel (BSP) within the engine. | Standalone graph databases often use vendor-specific query languages and separate analytics frameworks, and the support for algorithms can vary widely. |
| User experience | Users benefit from a unified Microsoft Fabric interface for modeling, querying, business intelligence (BI), artificial intelligence (AI) integration, and low/no-code exploration. Specialized graph engineering skills aren't required. | Standalone graph databases are primarily developer-focused, with consoles and SDKs that often require specialized skills. Visualization and low-code tools can be separate and might require extra setup. |
| Operations & cost | Graph workloads run on pooled Fabric compute units (CUs) with autoscale, pause/resume, and centralized metrics, which helps optimize resource usage and cost. | Standalone graph databases require separate clusters or licenses, custom scaling and monitoring, and often incur idle capacity charges, increasing operational complexity and cost. |
| Governance & security | Microsoft Fabric provides native OneLake governance, lineage tracking, and workspace role-based access control (RBAC), and integrates with Fabric compliance standards for security and auditing. | Standalone graph databases have separate security and governance models that must be configured and audited independently, which can increase risk and administrative burden. |

## Pricing and capacity units

Fabric Graph uses the same Fabric Capacity Units (CUs) as other workloads in Microsoft Fabric. You don't need to purchase a separate graph-specific license or SKU. All graph operations, including data ingestion, querying, and running algorithms, consume your organization's reserved or pay-as-you-go Fabric capacity. 

Usage is measured in capacity minutes or capacity unit hours, depending on your region's billing model. You can monitor your graph workload's resource consumption and performance in the centralized Capacity Metrics app, specifically on the Compute page.

| Fabric operation name | Azure billing meter | Unit of measure | Fabric Consumption Unit |
|---|---|---|---|
| Graph general operations | Graph Capacity Usage CU | Minute | 10 CUs per minute |
| Graph algorithm operations| Graph Capacity Usage CU | Minute | 16 CUs per minute |
| Graph cache storage | OneLakeCache | Per GB per month | - |
| Graph standard storage | OneLakeStorage | Per GB per month | - |

For more information on pricing and capacity units, see [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

## Related content

- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
- [End-to-end tutorials in Microsoft Fabric](/fabric/fundamentals/end-to-end-tutorials)
