---
title:  Fabric decision guide - choose an operational database
description: Review a reference table and scenarios to choose the most suitable operational database for your transactional workloads.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer:
ms.topic: product-comparison
ms.custom:
  - ignite-2024
ms.date: 01/15/2025
---
# Microsoft Fabric decision guide: choose a SQL database

Use this reference guide and the example scenarios to help you choose the most suitable operational database for your transactional workloads: **Azure SQL Database** or a **SQL database in Fabric** (preview).

Both provide all the enterprise-scale features and capabilities of the SQL Database Engine, with all the familiar performance of cloud-scale operational database. With **Azure SQL Database** you retain detailed control of the provisioning of your databases, while **SQL database in Fabric** (preview) provides autonomous management and ease of use advantages. **SQL database in Fabric** is fully integrated with other workloads in the Microsoft Fabric platform by default.

## Databases

For a detailed comparison of features and capabilities, see [Features comparison: Azure SQL Database and SQL database in Fabric (preview)](feature-comparison-sql-database-fabric.md).

> [!IMPORTANT]
> SQL databases in Fabric are currently in PREVIEW. Features and capabilities are likely to expand.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

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

Arin is an Azure architect experienced working with .NET application developers at an independent software vendor (ISV). They're developing a multitenant architecture where each customer requires their own isolated database. Customers are worldwide and have peak usage hours at different times.

Arin chooses to deploy many databases at scale inside Azure SQL Database elastic pools. Elastic pools offer a consistent billing and resource pool perfect for housing databases of different sizes, different workload profiles. By controlling database pool membership and monitoring peak utilization patterns, Arin can save money with consistent resources and billing from elastic pools.

## Related content

- [Create a SQL database in the Fabric portal](create.md)
