---
title: Fabric security features availability
description: Learn about the support status of the Fabric security features Workspace private links, Customer managed keys, and Outbound access protection for various Fabric workloads and items. Find out if items are currently supported in preview or general availability.
#customer intent: As a Fabric security admin or decision-maker, I want to learn if certain security features are supported for specific workload items.
author: msmimart
ms.author: mimart
ms.reviewer: mimart
ms.date: 02/19/2026
ms.topic: concept-article
---

# Security feature availability in Microsoft Fabric

Microsoft Fabric supports various security features across different workloads and items. This article is continually updated with the availability of the following security features for Fabric items:

* [Workspace private links](security-workspace-level-private-links-overview.md)
* [Customer managed keys](workspace-customer-managed-keys.md)
* [Outbound access protection](workspace-outbound-access-protection-overview.md)

## Feature availability by Fabric item type

The following table shows the support status for each Fabric item. A check mark (✓) indicates the item is currently supported and generally available (GA). "Preview" means support for the item type is in preview. For the most up-to-date Fabric release timelines, refer to the [Microsoft Fabric Roadmap](https://roadmap.fabric.microsoft.com/?product=administration%2Cgovernanceandsecurity).

| Workload | Item type | Workspace private links | Customer managed keys | Outbound access protection |
|--|--|:--:|:--:|:--:|
| **Data Engineering** | Lakehouse | ✓ | ✓ | ✓ |
|  | Lakehouse Shortcut | ✓ | - | Preview |
|  | Lakehouse SQL Endpoint | ✓ | ✓ | ✓ |
|  | Notebook | ✓ | ✓ | ✓ |
|  | Spark Job Definition | ✓ | ✓ | ✓ |
|  | Environment | ✓ | ✓ | ✓ |
|  | Lakehouse with Schema | - | ✓ | ✓ |
|  | Spark Connectors for SQL Data Warehouse | - | - | - |
| **Data Factory** | Default Semantic Model | ✓ | - | ✓ |
|  | Pipeline | ✓ | ✓ | Preview |
|  | Dataflow Gen1 | Not supported | Not supported | Not supported |
|  | Dataflow Gen2 | - | ✓ | Preview |
|  | Copy Job | ✓ | ✓ | Preview |
|  | Mounted Azure Data Factory | ✓ | - | - |
|  | Vnet data gateway | ✓ | - | Preview |
|  | On-premises data gateway: Pipeline/Copy Job | ✓ | - | Preview |
|  | On-premises data gateway: Dataflow Gen2 | -| - | Preview|
|  | Data Workflow | - | - | - |
|  | Data Build Tool job | - | - | - |
| **Data Science** | ML Model | ✓ | ✓ |  |
|  | Experiment | ✓ | ✓ |  |
|  | Data Agent | ✓ | - |  |
| **Data Warehouse** | SQL Endpoint | ✓ | ✓ | ✓ |
|  | Warehouse | ✓ | ✓ | ✓ |
|  | Warehouse with EDPE |  | Not supported | - |
| **Developer Experience** | API for GraphQL | - | ✓ | - |
|  | Deployment Pipeline |  | - | ✓ |
|  | Git Integration | ✓ | - | ✓ |
|  | Variable Library | ✓ | - | - |
| **Governance and Security** | Sensitivity Label | - | - | - |
|  | Share item | - | - | - |
| **Graph** | Graph model  | - | - | - |
|  | Graph queryset | - | - | - |
| **Industry Solutions** | Healthcare data solutions | - | ✓ | - |
|  | Sustainability Solution | - | ✓ | - |
|  | Retail Solution | - | ✓ | - |
| **Mirroring** | Mirrored Azure SQL Database | Not supported | - | Preview|
|  | Mirrored Azure SQL Managed Instance | Not supported | - | Preview |
|  | Mirrored Azure Databricks Catalog | - | - | - |
|  | Mirrored Snowflake | - | - | Preview|
|  | Mirrored SQL Server (Windows/Linux on-premises) | ✓ | - | Preview |
|  | Mirrored Dataverse | - | - | - |
|  | Mirrored SAP | - | - | - |
|  | Mirrored Azure Cosmos DB | ✓ | - | Preview |
|  | Mirrored Azure Database for PostgreSQL | Not supported | - | Preview |
|  | Mirrored Google Bigquery | - | - | Preview |
|  | Mirrored Oracle |  | - | Preview |
| **Native Databases** | Sql DB in Fabric |  | Preview | - |
|  | Cosmos DB |  |  | - |
|  | Snowflake database | - | - | - |
| **OneLake** | Shortcut | ✓ | - | - |
| **Power BI** | Power BI Report | - | - | - |
|  | Dashboard | - | - | - |
|  | Scorecard | - | - | - |
|  | Semantic Model | - | - | - |
|  | Streaming dataflow | - | - | - |
|  | Streaming dataset | - | - | - |
|  | Paginated Report | - | - | - |
|  | Datamart | - | - | - |
|  | Exploration | - | - | - |
|  | Org App | - | - | - |
|  | Metric Set | - | - | - |
| **Real-Time Intelligence** | KQL Queryset | ✓ | Preview | - |
|  | Activator | ✓ | - | - |
|  | Eventhouse/KQL DB | ✓ | Preview |  |
|  | Eventstream | ✓ |  | - |
|  | Real-Time Dashboard | ✓ | Preview | - |
|  | Anomaly detector  | - | - | - |
|  | Digital Twin Builder | - | - | - | 
|  | Event Schema Set  | - | - | - |
|  | Map | - | - | - |
| **Uncategorized**  | Operations Agent | - | - | - |

## Related links

- Learn about the new features and documentation improvements for Microsoft Fabric in [What's new in Microsoft Fabric](/fabric/fundamentals/whats-new).
- Follow the latest in Fabric news and features in the [Microsoft Fabric Updates Blog](https://blog.fabric.microsoft.com/).
- Find community, marketing, case studies, and industry news in the [Microsoft Fabric Blog](https://www.microsoft.com/microsoft-fabric/blog/).
- Follow the latest in Power BI at [What's new in Power BI?](/power-bi/fundamentals/desktop-latest-update?tabs=powerbi-service)
- Review older updates in the [Microsoft Fabric What's New archive](/fabric/fundamentals/whats-new-archive).
