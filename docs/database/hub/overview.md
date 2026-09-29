---
title: Database Hub (Preview)
description: Learn about the Database Hub in Microsoft Fabric.
ms.reviewer: amapatil, jmaldonado, varundhawan, ivujic, lancewright, mjbrown
ms.date: 09/24/2026
ms.topic: overview
ai-usage: ai-assisted
ms.search.form: product-databases, Databases Overview
---
# What is the Database Hub?

The [Database Hub in Microsoft Fabric](https://powerbi.com/workloads/fdh/databaseHub) provides a unified operational experience for managing database estates across Azure, Microsoft Fabric, on-premises environments, and supported multicloud environments. 

> [!TIP]
> 💡 Agent setup for Database Hub
>
> Get started using [Database Hub agent skills](https://github.com/microsoft/microsoft-sql/tree/main/plugins/microsoft-sql-fdh) to understand and interact with the [Database Hub in Fabric](https://powerbi.com/workloads/fdh/databaseHub):
> ```agent-prompt
> - Use [Database Hub skills](https://github.com/microsoft/microsoft-sql/tree/main/plugins/microsoft-sql-fdh).
> - Review [Database Hub in Fabric documentation](https://learn.microsoft.com/fabric/database/hub/)
>   and use the [Microsoft Learn MCP server](https://learn.microsoft.com/api/mcp) for official docs.
> ```
>

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

Database Hub helps you discover, prioritize, and investigate findings across your database estate.

:::image type="content" source="media/monitor/databases-navigation-overview.png" alt-text="The Databases icon in the Fabric navigation menu.":::

## Discover your database estate

- The **Overview** page highlights what needs attention, while **Estate** provides a cross-engine resource view where you can investigate findings, understand impact, and take the next step. 
   - In the **Estate**, you can browse your inventory of databases in one place.
       - You can [set and save your filters](monitor.md#save-a-custom-view) and [share a custom view of your estate](monitor.md#share-a-custom-view-of-your-estate) with others.
   - View **Issues** and **Suggestions** without navigating across multiple portals.
      - **Issues** require timely attention or remediation. Issues appear in colorful buttons. 
      - **Suggestions** are opportunities to improve security, performance, utilization, cost efficiency, or operational posture over time. 
      - Resources with the most open Issues appear first to help prioritize investigation. Suggestions appear as buttons with lightbulb icons inside them.
- The **Performance** page provides a unified look at performance at the estate-level, with real-time and historical metrics across all the database engines you have access to.

## Supported database services

The current preview experience brings together Microsoft database resources from Azure, Fabric, and on-premises environments: 
- Azure SQL Database (all service tiers)
- Azure SQL Elastic Pools
- Azure SQL Managed Instance
- SQL database in Fabric
- SQL Server instances enabled by Azure Arc
- SQL Server instance on Azure Virtual Machines
- Azure Database for PostgreSQL flexible server
- Azure Cosmos DB
 
For service-specific details, see [Limitations](#limitations).

The resources and capabilities that appear in Database Hub depend on your tenant configuration, region, permissions, and preview enrollment.

## Understand Azure and Fabric integration

When you access Database Hub from Microsoft Fabric, Database Hub uses your existing Azure permissions to display database resources that you already have access to in Azure. 

Database Hub retrieves resource metadata and insights by using existing Azure management APIs to provide a centralized view of your database estate across supported database services. Database Hub doesn't modify your database resources.

## Data processing transparency

To provide inventory, monitoring, security, and management experiences, Database Hub retrieves and processes resource metadata and operational information from Azure services within Microsoft Fabric. Database Hub uses this information to render insights and experiences.

To understand how information is processed within your organization's environments, review both Azure and Microsoft Fabric compliance, privacy, and data residency guidance.

## Access and permissions

Database Hub uses your existing Microsoft Entra ID and Azure RBAC permissions. To view performance monitoring data, you need to be a member of the **Reader** role or a role with greater permissions on each subscription that contains resources you want to monitor.

Database Hub doesn't grant additional access. Inventory and signals are limited to resources your current identity is authorized to view.

When you [share a custom view of your estate](monitor.md#share-a-custom-view-of-your-estate) it doesn't grant any permissions. Your colleagues see only the resources their Azure or Fabric RBAC allows them to see.

## Create database resources from Database Hub

From the **Estate** page, use **+ Create resource** to create an item type for any supported platform.  

To create a resource, you need permission to create items in the target Fabric workspace or Azure subscription. Check your organization's allowed regions, network requirements, authentication policy, and capacity or quota constraints.

Unlike Microsoft SQL, Cosmos DB separates account creation from container creation. Only Cosmos DB account creation is available in Database Hub.

## Limitations

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

- You can view resources in the Database Hub from Azure, Fabric, and on-premises, including: Azure SQL Database, SQL database in Fabric, Azure SQL Elastic pools, Azure SQL Managed Instance, SQL Server enabled by Azure Arc, SQL Server instances in Azure VMs, Azure Database for PostgreSQL flexible server, and Azure Cosmos DB. 
    - Other platforms aren't currently supported in the Database Hub in the Fabric portal, including Cosmos DB in Fabric, mirrored databases in Fabric, Fabric Data Warehouse.   
    - Currently, for a Microsoft SQL database service to appear in the **Overview** and **Estate** pages of the Database Hub, an additional step is necessary to [register an Azure resource provider in each subscription](add-sql.md#add-an-azure-resource-provider-to-enable-the-database-hub). This resource provider might already be in place for your subscription.
    - For Azure SQL Database, an extended property must be added to your database in order to start collecting performance monitoring data, which you can then view in the Performance page of Database Hub. You can add this extended property by selecting the **Enable Performance Monitoring** option in the **Estate** page of Database Hub or by running [T-SQL scripts provided in this article](add-sql.md#add-metadata-to-a-user-database-to-enable-azure-sql-database-in-the-performance-page-of-the-database-hub).
    - The following Microsoft SQL services show inventory on the **Estate** page but don't yet show on the **Performance** page: Azure SQL Elastic Pools, Azure SQL Managed Instance, SQL database in Fabric, and SQL Server instances on Azure VMs.

- Supported signals, actions, agents, engines, and regions can change during preview.

- Generated recommendations require operator review. Existing RBAC, service permissions, and change-management requirements continue to apply.

## Next step

> [!div class="nextstepaction"]
> [Open the Database Hub](https://powerbi.com/workloads/fdh/databaseHub)

## Related content

- [Monitor databases in the Database Hub (preview)](monitor.md)
- [Frequently asked questions for the Database Hub in the Fabric portal](faq.yml)
