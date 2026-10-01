---
title: Database Hub (Preview)
description: Learn about the Database Hub in Microsoft Fabric.
ms.reviewer: amapatil, jmaldonado, varundhawan, ivujic, lancewright, mjbrown
ms.date: 09/30/2026
ms.topic: overview
ai-usage: ai-assisted
ms.search.form: product-databases, Databases Overview
---
# What is the Database Hub?

The [Database Hub in Microsoft Fabric](https://powerbi.com/workloads/fdh/databaseHub) provides a single observability pane inside the Fabric portal.

The Database Hub:

- Automatically discovers your entire database estate
- Sees Azure, Fabric, on-premises, and multicloud
- Creates filtered, customizable dashboards
- Identifies prioritized recommendations
- Provides security best practices
- **Is completely free**

In addition to the Fabric portal, you can access Database Hub data through skills for agentic observability or through integrations with tools you use every day, such as SSMS and VS Code.

> [!TIP]
> 💡 Agent setup for Database Hub
>
> You can use ready-made skills to interact with Database Hub data. Get started using [Database Hub agent skills](https://github.com/microsoft/microsoft-sql/tree/main/plugins/microsoft-sql-fdh) to understand and interact with the [Database Hub in Fabric](https://powerbi.com/workloads/fdh/databaseHub):
> ```agent-prompt
> - Use [Database Hub skills](https://github.com/microsoft/microsoft-sql/tree/main/plugins/microsoft-sql-fdh).
> - Review [Database Hub in Fabric documentation](https://learn.microsoft.com/fabric/database/hub/)
>   and use the [Microsoft Learn MCP server](https://learn.microsoft.com/api/mcp) for official docs.
> ```
>

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

Database Hub helps you discover, prioritize, and investigate findings across your database estate in Azure, Microsoft Fabric, on-premises, and supported multicloud environments.

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

- **Regional availability:** Database Hub is not currently supported on Fabric capacities located in **North Europe** or **West Europe**. If your Fabric capacity is in either region, the Overview page might load, but you might encounter errors when using Database Hub. To use the preview, select a workspace assigned to a Fabric capacity in a supported region. This limitation applies to the Fabric capacity hosting the experience, not the location of the database resources you want to monitor.

- You can view resources in the Database Hub from Azure, Fabric, and on-premises, including: Azure SQL Database, SQL database in Fabric, Azure SQL Elastic pools, Azure SQL Managed Instance, SQL Server enabled by Azure Arc, SQL Server instances in Azure VMs, Azure Database for PostgreSQL flexible server, and Azure Cosmos DB. 
- Other platforms aren't currently supported in the Database Hub in the Fabric portal, including Cosmos DB in Fabric, mirrored databases in Fabric, Fabric Data Warehouse.   
    - Currently, for a Microsoft SQL database service to appear in the **Overview** and **Estate** pages of the Database Hub, an additional step is necessary to [register an Azure resource provider in each subscription](add-sql.md#register-the-azure-resource-provider). This resource provider might already be in place for your subscription.
    - For Azure SQL Database, an extended property must be added to your database in order to start collecting performance monitoring data, which you can then view in the Performance page of Database Hub. You can add this extended property by selecting the **Enable Performance Monitoring** option in the **Estate** page of Database Hub or by running [T-SQL scripts to add metadata to each database](add-sql.md#enable-performance-monitoring-for-azure-sql-database).
    - The following Microsoft SQL services show inventory on the **Estate** page but don't yet show on the **Performance** page: Azure SQL Elastic Pools, Azure SQL Managed Instance, SQL database in Fabric, and SQL Server instances on Azure VMs.

- Supported signals, actions, agents, engines, and regions can change during preview.


## Troubleshoot

- If Azure databases don't appear in Database Hub:
    - Database Hub uses Azure Resource Graph to discover Azure database resources that your signed-in account can access. Access to Microsoft Fabric doesn't automatically grant access to Azure resources.
    - If your account doesn't have access to the relevant Azure resources, those resources won't appear in Database Hub. The Azure Resource Graph request can also return an access-denied response (403 Forbidden) when none of the subscriptions included in the request are accessible to your account.
    - Users in the same organization can see different Azure resources because their Azure permissions differ.
- If you expect to see databases in Microsoft Fabric but don't see them:
    - Azure resource permissions and Fabric permissions are managed separately. You don't need to request Azure access solely because the Azure portion of Database Hub is empty. Access to your Fabric databases is governed by your existing Fabric permissions.
    - An empty Azure resource list doesn't necessarily mean that your organization has no Azure databases—it can mean that your account doesn't have permission to view them.
- If you expect to see Azure databases but don't see them:
    - Check your account and directory. Sign in to the Azure portal with the same account you use for Database Hub, and verify that you're in the Microsoft Entra directory that contains the resources you expect to see.
    - Verify your Azure access. Confirm that you can view the expected resources in the Azure portal. If you can't, ask your Azure administrator to review your Azure role-based access control (Azure RBAC) assignments.
    - Request read access at the appropriate scope. Azure Resource Graph requires at least read access to the resources being queried. Your administrator can grant an appropriate role, such as Reader, at a scope approved by your organization. Fabric workspace permissions don't grant this Azure access.
    - Sign out and sign back in after access changes. After the permissions take effect, sign out and sign back in to refresh your subscription context, then reopen Database Hub.
    - If you can view the expected resources in the Azure portal but they still don't appear in Database Hub, contact support. Include the time of the problem, any displayed error or correlation ID, and the affected tenant and subscription IDs. Don't include passwords or access tokens.
    - For more information, see [Permissions in Azure Resource Graph](/azure/governance/resource-graph/overview#permissions-in-azure-resource-graph).

## Next step

> [!div class="nextstepaction"]
> [Open the Database Hub](https://powerbi.com/workloads/fdh/databaseHub)

## Related content

- [Monitor databases in the Database Hub (preview)](monitor.md)
- [Frequently asked questions for the Database Hub in the Fabric portal](faq.yml)
