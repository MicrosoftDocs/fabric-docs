---
title: Monitor a Microsoft SQL Database in the Database Hub (Preview)
description: Learn how to monitor a Microsoft SQL database in the Database Hub in Microsoft Fabric.
ms.reviewer: amapatil
ms.date: 10/05/2026
ms.topic: how-to
ai-usage: ai-assisted
---
# Monitor a Microsoft SQL database in the Database Hub (preview)

Database Hub in Microsoft Fabric helps you discover Microsoft SQL databases in Azure SQL Database, SQL database in Fabric, and SQL Server enabled by Azure Arc. Start with an **Estate** view, identify databases that need investigation, and continue in the Azure portal or Visual Studio Code for configuration, database-level work, or query diagnostics.

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

## Monitor a Microsoft SQL database in place

Your SQL databases remain in their existing subscriptions, resource groups, and regions, or even on-premises. Database Hub doesn't require moving data into Fabric.

## Prerequisites

- In the current preview, ask a Fabric administrator to opt your tenant into the Database Hub preview experience in the Fabric admin portal. In **Tenant settings**, enable **Users can access the Database hub (preview)**.
- Start with the free experience by signing in with your work or school account. You can enter from the Azure portal or directly from Microsoft Fabric, even if you didn't use Fabric before. Database Hub uses your existing Microsoft Entra ID and Azure RBAC permissions rather than a separate permission model, so the access you assign here follows [standard Azure role-assignment steps](/azure/role-based-access-control/role-assignments-portal).
    - For discovery and monitoring, your identity needs permission to read the relevant Azure resource metadata and Azure Monitor metrics.
    - For discovery and monitoring, your identity needs to be a member of the **Reader** role, or a role with greater permissions, on each subscription that contains the resources you want to monitor.
- To view performance monitoring data for Microsoft SQL resources in the Database Hub, you need to [register the SQL resource provider](add-sql.md#register-the-azure-resource-provider) and [enable performance monitoring for each service](add-sql.md).
    - In the current preview, the **Performance** tab supports Azure SQL Database (all service tiers), SQL Server on Azure VMs, and SQL Server enabled by Azure Arc.
        - The **Performance** tab doesn't currently support Azure SQL Managed Instance or SQL database in Fabric.
- To appear in the Database Hub, SQL Server instances in Azure VMs must have the [Windows SQL Server IaaS Agent extension](/azure/azure-sql/virtual-machines/windows/sql-server-iaas-agent-extension-automate-management?view=azuresql-vm&preserve-view=true) installed.

## View your Microsoft SQL estate

Start with an **Estate** view, identify databases that need investigation, and continue in the Azure portal or Visual Studio Code for server configuration, database-level work, or query diagnostics.

1. Go to the [Database Hub in Microsoft Fabric](https://powerbi.com/workloads/fdh/databaseHub). In the Databases navigation, select **Overview**. 
1. The **What needs attention?** section points out parts of your database estate that need attention. Every card and link in **What needs attention?** leads to **Estate**. In the **Estate** view, beneath each resource, **Issues** appear in colorful chips while **Suggestions** appear in chips with a lightbulb icon.
1. Filter the inventory to **View: Microsoft SQL**. Select the relevant subscriptions or resource groups by using the available filters.
1. Search for the SQL database you need, or review the filtered inventory. Select the database to review its resource details.

## Understand Microsoft SQL database estate monitoring

Use **Overview** for Microsoft SQL CPU, memory, storage, and IO summaries. Use **Performance** for the **Microsoft SQL** dashboard and a more detailed view of the selected servers, including CPU, memory, storage, IO, and workload pressure. Inventory scope and the dashboard's selected resource set can differ. Check the resource selection before treating a chart as the whole estate.

### Create a custom SQL monitor

Create a custom performance monitoring dashboard from a template. The result is a [Fabric Real-Time Dashboard](../../real-time-intelligence/real-time-dashboards-overview.md) where you can control charts and layout and share the dashboard with others in your Fabric tenant. Database Hub respects your existing access boundaries. Sharing a view or sending someone a resource link doesn't grant them access to the underlying server.

1. On the **Performance** page, select **Create SQL monitors from template**.
1. Choose the template that contains the metrics you want, and then select **Next**.
1. Select the databases to monitor, and then select **Next**.
1. Select a destination workspace.
1. Create a new dashboard or add a page to an existing dashboard.
1. Customize the charts, layout, time range, and sharing settings in the Real-Time Dashboard experience.

### Query performance data directly in Azure Data Explorer (ADX)

For tabular analysis beyond the built-in dashboards, use the web version of Azure Data Explorer (ADX) to query the performance monitoring data exposed by the SQL ADX proxy.

> [!NOTE]
> In the current preview, the connection URI and schema can vary by preview environment and region. Use the endpoint provided by your Database Hub experience. The Azure Data Explorer desktop client isn't supported for this preview scenario.

1. Go to the [Azure Data Explorer web UI](https://dataexplorer.azure.com).
1. In the **Connections** pane, select **Add**, and then select **Connection**.
1. Enter the SQL ADX proxy connection URI for your environment.
   - The connection URI is `https://adx.centralus.arcdataservices.com/kusto/`
   - The connection URI is the same, regardless of the region or environment your SQL resource is located.

1. Enter an optional display name, and then select **Add**.
1. If prompted, add the URI as a trusted source.
1. Expand the connection and select the `ArcSqlTelemetry` database.
1. Explore the available tables and run KQL queries against the scoped telemetry.

#### Sample KQL queries in Azure Data Explorer (ADX)

List 10 monitored databases and their host machine names: 

```kql
SqlServerDatabaseProperties 
| summarize by MachineName, DatabaseName 
| take 10 
```
 
List the 10 most recent CPU utilization samples: 

```kql
SqlServerCPUUtilization 
| order by SampleTimeUTC desc 
| take 10 
```

## Review an available Microsoft SQL security finding

Use the following steps when the Database Hub displays a security finding that explicitly applies to a SQL database. If the relevant assessment isn't available, review that control directly in the Azure portal by using the SQL database documentation guidance.

1. Select the SQL database finding from the **Security** summary or the affected server in **Estate**, where available.
1. Confirm the affected server, assessment name, evaluated setting, and any available observation time. Check the recommendation against your organization's policy.
1. Open the server in the Azure portal and verify its current configuration. For authentication, encryption, or auditing, follow the corresponding SQL database service documentation.
1. Assess application impact and obtain the required approval before making a change. Enabling an authentication method or changing a security configuration can require additional service-specific steps.
1. After the authorized change completes, verify the setting in the Azure portal. Allow for reassessment and refresh Database Hub; if the finding persists, compare its evidence with the current server configuration.

Currently, Database Hub evaluates the following Microsoft SQL platform security assessments:

- **Microsoft Entra Authentication Enabled** (issue)
    - Applicable to Azure SQL Database, SQL Server enabled by Azure Arc, Azure SQL Managed Instance
- **Minimum TLS version 1.2 Required** (issue)
    - Applicable to Azure SQL Database, Azure SQL Managed Instance
- **Public Network Access Disabled** (issue)
    - Applicable to Azure SQL Database, SQL Server on Azure VM, Azure SQL Managed Instance
- **Private Endpoint Enabled** (issue)
    - Applicable to Azure SQL Database
- **Auditing** (suggestion)
    - Applicable to Azure SQL Database
- **Encryption at rest using Customer Managed Keys (CMK)** (suggestion)
    - Applicable to Azure SQL Database, Azure SQL Managed Instance
- **Microsoft Entra Authentication Enforced** (suggestion)
    - Applicable to Azure SQL Database, SQL Server enabled by Azure Arc, Azure SQL Managed Instance
- **SQL Ledger** (suggestion) 
    - Applicable to Azure SQL Database

## Troubleshoot

| **Issue** | **What to check** |
|----|----|
| Expected databases are missing | Confirm subscription access, your Azure RBAC, supported resource type, and resource provider registration. Verify that you have [registered an Azure resource provider in each subscription](add-sql.md#register-the-azure-resource-provider).|
| Performance data is missing | Confirm **Reader** access, `Microsoft.Sql` registration, and that [performance monitoring is enabled](add-sql.md) for the resource. |
| A warning doesn't clear | Confirm the native change completed successfully, allow time for signal refresh, and refresh **Database Hub**. |
| **Open in SSMS** opens without full context | Copy the issue summary and evidence into SSMS manually and continue with the authorized diagnostic workflow. |
| Recommendation conflicts with evidence | Don't apply the change. Recheck the scoped resource, time range, captured evidence, and approval path. |

## Related content

- [Monitor databases in the Database Hub (preview)](monitor.md)
- [What is Azure SQL Database?](/azure/azure-sql/database/sql-database-paas-overview)
- [SQL database in Fabric](../sql/overview.md)
- [SQL Server enabled by Azure Arc](/sql/sql-server/azure-arc/overview)
