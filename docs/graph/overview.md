---
title: Graph Overview
description: Learn about the core purpose, architecture, and benefits of graph in Microsoft Fabric, including integration and feature highlights.
ms.topic: concept-article
ms.date: 11/18/2025
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
ms.custom: references_regions
ms.search.form: Graph Overview
---

# Graph in Microsoft Fabric overview (preview)

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Graph in Microsoft Fabric is a scalable, enterprise-grade solution that turns disconnected data into AI-powered insights. 

Unlike traditional relational databases that often require costly joins and complex queries, graph in Microsoft Fabric:
- Introduces a scale-out architecture that implements the flexible [labeled property graph model](graph-data-models.md).
- Offers data querying functionality that's compliant with the [international standard for the graph query language GQL (ISO/IEC 39075)](gql-language-guide.md). 

Together, these capabilities enable advanced graph analytics directly on OneLake without the need to manually set up brittle ETL (extract, transform, load) or data replication workflows.

Graph in Microsoft Fabric's scale-out design ensures performance and elasticity for enterprise-scale workloads, so you can analyze billions of relationships without bottlenecks. Its labeled property graph model lets nodes and edges carry labels and properties that make complex relationships easy to model, query, and explore.

And with native GQL and NL2GQL support, you gain standards-based querying capabilities optimized for graph operations—delivering portability and consistency across graph solutions. Graph in Microsoft Fabric removes the complexity of joins and transformations to unlock seamless graph analysis and advanced insights at scale, all while using your existing data estate.

## Why graph analytics matter

Traditional relational and tabular data formats make it difficult—if not impossible—to map relationships between different data points, such as the intertwined connections between users, posts, comments, forums, and tags on a social media platform. Graph enables you to uncover hidden connections, communities, and influence within your data, making it possible to answer complex questions about social networks, business processes, and more.

Graph in Microsoft Fabric provides an efficient way to model, visualize, and query these relationships, helping you understand the interconnectedness of your data and drive better insights.

- Business user: Visually explores relationships, [runs NL (natural language) queries](https://forms.office.com/r/97QkVDBeuM), and gains insights effortlessly.
- Data engineer: Defines graph models, unifies data in OneLake with low and no-code tools.
- Data scientist: Uses graph algorithms and ML (machine learning) in Fabric's data science environment.
- Developer: Builds AI agents and real-time apps using graph-powered contextual insights.

Graph in Microsoft Fabric broadens access to graph insights beyond specialized roles. Any user can use connected data in daily decision-making.

## What you can do with graph

Graph in Microsoft Fabric enables you to:

- Create a labeled property graph over structured data in OneLake by defining its nodes and edges in terms of underlying tabular data.

    > [!TIP]
    > Graph fully supports schema evolution through OneLake. This means you can add, remove, or reorder columns in your source tables without breaking graph ingestion or requiring a full reload. All schema changes are automatically handled during graph load and reflected in production, giving you flexibility to adapt your data model as business needs evolve. This capability ensures that graph solutions remain resilient and up to date even as underlying datasets change.

- Query using GQL (Graph Query Language), including pattern matching, path constructs, aggregations, and other features as they're released. The official International Standard for GQL is [ISO/IEC 39075 Information Technology - Database Languages - GQL](https://www.iso.org/standard/76120.html).
<!-- - Enrich your graph with scores and communities for downstream BI (business intelligence) and AI (artificial intelligence) workflows. Run built-in graph algorithms such as shortest path, page rank, weakly connected components (WCC), and Louvain. -->
- Benefit from job function-based experiences:  
    - Data engineers can model and create graphs.  
    - Analysts can run low/no-code queries and curate view sets.  
    - Business users can explore visually or [use natural language](https://forms.office.com/r/97QkVDBeuM) to interact with the data.  
    <!-- - Developers and data scientists can integrate graph analytics in notebooks and applications. -->

- Operate within Fabric: Automatically shut down when not in use and monitor usage in the capacity metrics app—all governed by Fabric OneLake security, compliance, and permission model.

## Integration with Microsoft Fabric

Graph in Microsoft Fabric is deeply integrated with the Microsoft Fabric platform, including OneLake for unified data storage and Fabric UI for visualization. It integrates seamlessly with Microsoft Fabric's governance, security, and operational features.

You can incorporate graph analytics into your existing workflows, eliminating the need for data duplication and specialized skills. So, insights are accessible to a broader audience compared to traditional standalone [graph databases](graph-database.md).

#### How graph in Microsoft Fabric differs from standalone graph databases

| Area | Graph in Microsoft Fabric | Standalone graph database |
|---|---|---|
| Data gravity | Graph operates directly on OneLake, so you don't have to perform ETL or duplicate data. | Standalone graph databases require you to move or duplicate your data into a separate graph database instance, which can add complexity and overhead. |
| Scalability | The service is designed for large-scale graphs and uses scale-out sharding across multiple machines to handle big data workloads efficiently. | Most standalone graph databases rely on scale-up architectures or clusters that might be limited by the vendor or edition, which can restrict scalability. |
| Language | Graph in Microsoft Fabric is compatible with the new GQL standard (preview) and includes built-in graph analytics algorithms. | Standalone graph databases often use vendor-specific query languages and separate analytics frameworks, and the support for algorithms can vary widely. |
| User experience | Users benefit from a unified Microsoft Fabric interface for modeling, querying, business intelligence (BI), artificial intelligence (AI) integration, and low/no-code exploration. Specialized graph engineering skills aren't required. | Standalone graph databases are primarily developer-focused, with consoles and SDKs that often require specialized skills. Visualization and low-code tools can be separate and might require extra setup. |
| Operations & cost | Graph workloads run on pooled Fabric capacity units (CUs) with automatic scale-down and centralized metrics, which helps optimize resource usage and cost. | Standalone graph databases require separate clusters or licenses, custom scaling and monitoring, and often incur idle capacity charges, increasing operational complexity and cost. |
| Governance & security | Microsoft Fabric provides native OneLake governance, lineage tracking, and workspace role-based access control (RBAC), and integrates with Fabric compliance standards for security and auditing. | Standalone graph databases have separate security and governance models that must be configured and audited independently, which can increase risk and administrative burden. |

> [!NOTE]
> * Join the new Fabric user panel to share feedback and help shape Fabric and Power BI. Participate in surveys and 1:1 sessions with the product team. Learn more and sign up at [Fabric user panel](../fundamentals/feedback.md#fabric-user-panel).

## Pricing and capacity units

Graph uses the same capacity units (CUs) as other workloads in Microsoft Fabric. You don't need to purchase a separate graph-specific license or SKU. All graph operations, including data ingestion, querying, and running algorithms, consume your organization's reserved or pay-as-you-go Fabric capacity.

Usage is measured in minutes of CPU uptime. You can monitor your graph workload's resource consumption and performance in the centralized capacity metrics app.

| Fabric operation name    | Azure billing meter     | Unit of measure  | Fabric CU consumption rate |
|--------------------------|-------------------------|------------------|----------------------------|
| Graph general operations | Graph capacity usage CU | Minute           | 0.16667 CUs per minute     |
| Graph cache storage      | OneLake Cache           | Per GB per month | -                          |

For more information on pricing and capacity units, see [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

## Region availability

Graph is currently available in the following regions:

- Australia East
- Australia Southeast
- Brazil South
- Canada Central
- Central India
- Central US
- East Asia
- East US
- East US 2
- France Central
- Germany West Central
- Israel Central
- Italy North
- Japan East
- Japan West
- Korea Central
- Mexico Central
- North Central US
- North Europe
- Norway East
- Poland Central
- South Africa North
- South Central US
- Southeast Asia
- South India
- Spain Central
- Sweden Central
- Switzerland North
- Switzerland West
- UAE North
- UK South
- UK West
- West Europe
- West US
- West US 2
- West US 3

## Related content

- [Sign up for preview of natural language querying of Graph](https://forms.office.com/r/97QkVDBeuM)
- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
- [End-to-end tutorials in Microsoft Fabric](/fabric/fundamentals/end-to-end-tutorials)
