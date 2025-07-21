---
title:  Fabric decision guide - choose an operational database
description: Review a reference table and scenarios to choose the most suitable operational database for your transactional workloads.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer:
ms.topic: product-comparison
ms.custom:
ms.search.form: SQL database Overview, Databases decision guide for SQL
ms.date: 02/13/2025
---
# Microsoft Fabric decision guide: choose a SQL database

Use this reference guide and the example scenarios to help you choose the most suitable operational database for your transactional workloads: **Azure SQL Database** or a **SQL database in Fabric** (preview).

Both provide all the enterprise-scale features and capabilities of the SQL Database Engine, with all the familiar performance of cloud-scale operational database. With **Azure SQL Database** you retain detailed control of the provisioning of your databases, while **SQL database in Fabric** (preview) provides autonomous management and ease of use advantages. **SQL database in Fabric** is fully integrated with other workloads in the Microsoft Fabric platform by default.

## Databases

For a detailed comparison of features and capabilities, see [Features comparison: Azure SQL Database and SQL database in Fabric (preview)](feature-comparison-sql-database-fabric.md).

> [!IMPORTANT]
> SQL databases in Fabric are currently in PREVIEW. Features and capabilities are likely to expand.
> This information relates to a prerelease product that can be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

|&nbsp;| **[Azure SQL Database](/azure/azure-sql/database/sql-database-paas-overview)** | **[SQL database in Fabric (preview)](overview.md)**|
|:---|:---:|:---:|
| Purchasing models | vCore, DTU | Provisioned [Fabric capacity SKU](../../enterprise/licenses.md) |
| Compute tiers | Provisioned or serverless | Serverless |
| Hardware configurations | Gen5, Fsv2, DC | Latest |
| Copilot skills | [Yes](/azure/azure-sql/copilot/copilot-azure-sql-overview) | [Yes](copilot.md) |
| Elastic pools | [Yes](/azure/azure-sql/database/elastic-pool-overview) | No |
| Create options | Azure portal, PowerShell, Az CLI, Azure Resource Manager, Bicep, Terraform, T-SQL, REST API | Fabric portal, REST API |
| Secure | Azure RBAC, SQL permissions | [Fabric workspace roles and sharing permissions](share-sql-manage-permission.md), SQL permissions |
| Authentication | Microsoft Entra ID authentication, SQL authentication | Microsoft Entra ID authentication |
| Database mirroring to Fabric OneLake | [Yes, manually enabled](../mirrored-database/azure-sql-database.md) | [Yes, automatically enabled for all eligible tables](../mirrored-database/overview.md) |
| Cross-platform queries in Fabric | Yes, via mirroring to Fabric | Yes, via Fabric OneLake automatically |
| Source of Fabric shortcuts | Yes, via mirroring to Fabric | Yes, via Fabric OneLake automatically |
| Source for Power BI DirectLake mode | Yes, via mirroring to Fabric | Yes, via Fabric OneLake automatically |
| Free offer | [Yes, free 100,000 vCore s/month](/azure/azure-sql/database/free-offer) | [Yes, with Microsoft Fabric trial capacity](../../fundamentals/fabric-trial.md) |
| Monitoring | Azure Monitor, [database watcher](/azure/azure-sql/database-watcher-overview) | [Performance Dashboard](performance-dashboard.md), Capacity metrics app |

## Scenarios

Review these scenarios for help with choosing a data store in Fabric.

### Scenario 1

Kirby is a solutions architect creating an AI application for operational data. They need an easy-to-manage operational database platform that can easily integrate with cross-platform queries against real-time intelligence data, parquet files, and master data managed in a warehouse.

Kirby chooses a SQL database in Fabric for operational data. The serverless, autoscaling architecture of a SQL database provides cost-effective resources on-demand. Thanks to mirroring to the Fabric OneLake, data in the SQL database is automatically available to other workloads inside Fabric. The multi-model capabilities of SQL database, based on the rock-solid SQL Database Engine of SQL Server and Azure SQL Database, provides relational, graph, JSON, and key-value data architectures.

The simple, autonomous, and integrated nature of default configurations of SQL database in Fabric minimizes database management tasks, with best practices already implemented.

SQL database in Fabric is simple to purchase as well - the features of SQL database in Fabric are the same at any Fabric capacity.

### Scenario 2

Arin is an Azure architect experienced working with .NET application developers at an independent software vendor (ISV). They're developing a new transactional database with large scale in mind: 10+ TB of data is expected, and the workload requires high memory/vCore ratios.

Arin chooses [Azure SQL Database Hyperscale](/azure/azure-sql/database/service-tier-hyperscale?view=azuresql-db&preserve-view=true) with premium series memory-optimized provisioned hardware. Hyperscale provides the highest possible Azure SQL Database storage capacity, up to 128 TB of storage. [Hyperscale is built on a distinct cloud-native architecture](/azure/azure-sql/database/hyperscale-architecture?view=azuresql-db&preserve-view=true) that provides independently scalable compute and storage. The premium-series memory optimized hardware provides 10.2 GB of provisioned memory per vCore for up to 128 vCores, higher than other available Azure SQL Database hardware. 

## Related content

- [Features comparison: Azure SQL Database and SQL database in Fabric (preview)](feature-comparison-sql-database-fabric.md)
- [Engage with the Fabric Community for SQL database](https://community.fabric.microsoft.com/t5/SQL-database/bd-p/db_general_discussion)
- [What's new in Fabric Databases](../../fundamentals/whats-new.md#sql-database-in-microsoft-fabric)
- [Frequently asked questions for SQL database in Microsoft Fabric (preview)](faq.yml)
