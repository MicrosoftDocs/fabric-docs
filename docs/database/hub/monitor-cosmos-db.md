---
title: Monitor a Cosmos DB Account in the Database Hub (Preview)
description: Learn how to monitor a Cosmos DB account in the Database Hub in Microsoft Fabric.
ms.reviewer: amapatil, jmaldonado, mjbrown
ms.date: 09/22/2026
ms.topic: how-to
ai-usage: ai-assisted
---
# Monitor a Cosmos DB account in the Database Hub (preview)

Database Hub in Microsoft Fabric helps you discover Azure Cosmos DB accounts across APIs (NoSQL, MongoDB, Cassandra, Gremlin, Table). 

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

## Monitor Cosmos DB in place

Your Cosmos DB accounts remain Azure resources in their existing subscriptions, resource groups, and regions. Using Database Hub for discovery and monitoring doesn't require moving data into Fabric, configuring mirroring, or onboarding to Cosmos DB Fleet Analytics. 

Database Hub metrics describe the account unless a metric or filter parameter explicitly identifies a narrower scope, such as a specific database or container.

- Cosmos DB monitoring in Database Hub uses existing Azure Monitor platform metrics, which are collected automatically for every account with no explicit configuration. 
- You don't need to enable diagnostic (resource) logs or onboard to Cosmos DB Fleet Analytics. 
- [Azure Monitor](/azure/cosmos-db/monitor-resource-logs) and [Fleet Analytics](/azure/cosmos-db/fleet-analytics) are separate, opt-in tools for deeper investigation, and they aren't needed to populate baseline metrics.
 
## Prerequisites

- In the current preview, ask a Fabric administrator to opt your tenant into the Database Hub preview experience in the Fabric admin portal. In **Tenant settings**, enable **Users can access the Database hub (preview)**.
- Start with the free experience by signing in with your work or school account. You can enter from the Azure portal or directly from Microsoft Fabric, even if you haven't used Fabric before. Authenticate with a Microsoft Entra identity that has access to the Azure subscriptions and Cosmos DB resources you want to work with. Azure resource visibility alone doesn't grant permission to query a database. Database Hub uses your existing Microsoft Entra ID and Azure RBAC permissions rather than a separate permission model, so the access you assign here follows [standard Azure role-assignment steps](/azure/role-based-access-control/role-assignments-portal).
   - To discover and monitor Cosmos DB accounts, assign the **Reader** role, or a role with greater permissions, at the subscription scope for each subscription that contains accounts you want to monitor. 
   - To create a new Cosmos DB account from Database Hub, assign the Cosmos DB Operator role, or a role with greater permissions, at the resource group scope where the account will be created. 
   - Managing or reconfiguring an existing account, such as changing throughput, indexing, or network settings, is done outside Database Hub, using the Azure portal, Azure CLI, Azure PowerShell, or an Azure Resource Manager template. The same identity needs the Cosmos DB Operator role, or a role with greater permissions, at the account scope to make these changes there.

- For querying data in a database or container, your identity needs a separate Cosmos DB data-plane role assignment (or account keys, where allowed), plus network access to the account. Resource-level (management-plane) access doesn't grant this permission. To learn more, see [<u>Connect using role-based access control and Microsoft Entra ID for Azure Cosmos DB</u>](/azure/cosmos-db/how-to-connect-role-based-access-control).

- Database Hub respects your existing access boundaries. The Database Hub doesn't grant additional access. Your visibility to databases is limited to resources your current identity is authorized to view. Sharing a view or sending someone a resource link doesn't grant them access to the underlying server. 

## View your Cosmos DB estate

> [!TIP]
> The Cosmos DB resource represented in **Estate** is a database account, not each database or container hosted inside that account.

Use the Database Hub to identify resources that need investigation. Continue in the Azure portal or Visual Studio Code for account configuration, container-level work, or query diagnostics.

1. Go to the [Database Hub in Microsoft Fabric](https://powerbi.com/workloads/fdh/databaseHub). In the Databases navigation, select **Overview**. 
1. The **What needs attention?** section points out parts of your database estate that need attention. Every card and link in **What needs attention?** leads to **Estate**. In the **Estate** view, beneath each resource, **Issues** appear in colorful chips while **Suggestions** appear in chips with a lightbulb icon.
1. Filter the inventory to **View: Azure Cosmos DB**. Select the relevant subscriptions or resource groups by using the available filters. 
1. Search for the account you need, or review the filtered inventory. Select the account to review its resource details. Treat this account as the Azure account resource, not an individual database or container.

### Cosmos DB monitoring metrics in the Database Hub

**Overview** surfaces availability and normalized RU consumption summaries across your Cosmos DB account resources.

For a well-provisioned, actively used account, it's normal to see both lines sitting at or near 100% most of the time. High RU consumption means the account is using most or all of its provisioned throughput. Whether that's fine depends on Availability in the same window. 

 - High availability alongside it means requests are still succeeding and the account is simply making full use of what's provisioned. 
 - A drop in Availability at the same time points to real throttled or failed requests, since sustained maximum RU consumption is the same condition that triggers rate limiting. 

Pay closer attention when Availability drops noticeably below 100%. Also watch for RU consumption staying low over an extended period, which can point to over-provisioned throughput.

**Performance** gives you a closer look at specific accounts you explicitly select. It doesn't automatically include every account in **Estate**, and if no filters are applied, the **Performance** chart limits the view to the first 100 resources to keep the page responsive. Before treating a **Performance** chart as estate-wide, confirm which accounts are currently selected, since the scoped selection and your full Estate inventory can differ.

Missing telemetry isn't zero utilization or proof that an account is healthy. Check whether the account produced data during the selected interval and whether a metric applies to its API type and configuration.

### Interpret Cosmos DB performance signals

| **Signal** | **Azure Monitor metric** | **Aggregation** | **Description** |
|----|----|----|----|
| Normalized RU Consumption (Peak Norm RU %) | `NormalizedRUConsumption` | Maximum | Peak RU/s utilization across partition key ranges for the account, 0 to 100%. |
| Total Request Units (Total RU consumed) | `TotalRequestUnits` | Total (Sum) | Total RUs consumed, summed over the selected interval. |
| Throttled Requests (429s) | `TotalRequests` filtered to StatusCode 429 | Count | Raw count of requests rejected for exceeding provisioned throughput. |
| 429 Rate % | `TotalRequests` filtered to StatusCode 429, divided by total TotalRequests | Count (ratio) | Percentage of requests throttled for exceeding provisioned throughput. |
| Provisioned throughput (Provisioned RU/s) | `ProvisionedThroughput` | Maximum | The RU/s provisioned for the account over the selected interval, so you can compare provisioned versus consumed capacity. |
| Avg Latency (ms) | `ServerSideLatencyDirect` | Average | Average server-side latency in milliseconds for requests made in direct connection mode. Doesn't include gateway-mode latency. |
| Availability % | `ServiceAvailability` | Average | Percentage of requests that succeeded during the interval. |

> [!NOTE]
> Availability % on **Performance** uses **Average** aggregation. The **Overview** page's availability summary uses **Minimum** aggregation instead to highlight outliers. 

Charts on this page use an hourly time grain: a 24-hour view plots 24 points, using the associated aggregation. The grid uses a different time grain and reduces your entire selected range to a single value per account per column instead of plotting points over time. For example, the grid's **Peak Norm RU %** is the maximum observed anywhere in that range, not a per-hour breakdown.

For more information, see [Monitor Azure Cosmos DB](/azure/cosmos-db/monitor) and [Supported metrics for Microsoft.DocumentDB/databaseAccounts](/azure/azure-monitor/reference/supported-metrics/microsoft-documentdb-databaseaccounts-metrics).

### Interpret Cosmos DB security and capability differences

The Database Hub's **Security** page evaluates three Cosmos DB signals:

- **Microsoft Entra ID authentication**: whether an account enforces Entra ID-only authentication or still allows local (key-based) authentication.
- **Customer-managed keys (CMK)**: whether CMK encryption is enabled, or the account relies on service-managed keys.
- **Public network access**: whether an account has it enabled.

If an account allows local authentication or doesn't have CMK enabled, Database Hub lists it as a **Suggestion**, an optional improvement you can make when convenient. An account with public network access enabled is listed as an **Issue**, since that's treated as more time-sensitive.

A Database Hub signal reflects what it currently evaluates, not necessarily the complete state of an account's underlying security configuration. For example, an account without CMK enabled still has encryption at rest by default via Microsoft-managed keys, so a flag here means "not enabled for this specific feature" rather than "unprotected." Verify the account's current configuration in the Azure portal before you act on a finding. See [Configure customer-managed keys for Azure Cosmos DB](/azure/cosmos-db/how-to-setup-customer-managed-keys) and [Encryption at rest in Azure Cosmos DB](/azure/cosmos-db/database-encryption-at-rest) for details.

These security signals offer a quick view to help you triage. For a complete security assessment and remediation, use services like Microsoft Defender for Cloud and your account's diagnostic logs alongside Database Hub.

## Continue investigation in the Azure portal

You can use the Azure portal to further investigate any issues, for example, to compare the same account's metrics side by side in Database Hub and the Azure portal.

> [!TIP]
> Use the [Visual Studio Code Cosmos DB extension](/azure/cosmos-db/vscode-extension/overview) for data-plane work like querying and managing documents, but not for reviewing performance metrics.

1. Select the intended Cosmos DB account in Database Hub. A pane for that item opens in the Database Hub.
1. Select the **Open the Azure portal** button. 
1. Go to the **Insights** tab and set the time range. Compare the relevant metrics over an appropriate follow-up interval. 

During the current preview, the Azure portal's **Insights** tab offers a broader range of charts and metrics, so use it for signals Database Hub doesn't yet surface. 

## Investigate Cosmos DB security findings

1. Select the Cosmos DB finding from the Security summary or the affected account in **Estate**, where available.

1. Confirm the affected account, assessment name, evaluated setting, and any available observation time. Check the recommendation against your organization's policy.

1. Open the account in the Azure portal and verify its current configuration. For Microsoft Entra authentication, customer-managed keys, or public network access, follow the corresponding Cosmos DB service documentation.

1. Assess application impact and obtain the required approval before making a change.

1. After the authorized change completes, verify the setting in the Azure portal. Allow for reassessment and refresh Database Hub; if the finding persists, compare its evidence with the current account configuration.

## Troubleshoot Cosmos DB data in Database Hub

- If a Cosmos DB account doesn't appear in **Estate**, check the signed-in tenant, Azure access, resource type, inventory filters, and authorization.
- If performance metrics are missing or different between Azure Monitor and the Database Hub:
   - Choose a time interval when the account was actively serving requests. Check whether the metric applies to the account's API type; for example, the 429 mapping differs between NoSQL (StatusCode 429) and MongoDB API (error code 16500).
   - Open the same account in the Azure portal and inspect the corresponding Azure Monitor metric under the **Insights** tab. Match the time zone, start and end times, aggregation, and granularity as closely as possible.
   - If the metric is absent in both places, check account activity and allow for processing delay.
   - If Azure Monitor has data but Database Hub doesn't, refresh the Database Hub view and retry with that account alone. If the difference persists, contact Support. 

## Limitations

- Cosmos DB Fleet Analytics isn't currently supported in Database Hub.
- The current preview supports Azure Cosmos DB accounts only. In the current preview, Cosmos DB in Fabric isn't currently supported.
- In the current preview, **Overview** and **Performance** surface a curated subset of the metrics available in Azure Monitor. 
- In the current preview, Activator alerting over Cosmos DB metrics isn't available.

## Related content

- [Monitor Azure Cosmos DB](/azure/cosmos-db/monitor)
- [Supported metrics for Microsoft.DocumentDB/databaseAccounts](/azure/azure-monitor/reference/supported-metrics/microsoft-documentdb-databaseaccounts-metrics)
- [Connect using role-based access control and Microsoft Entra ID for Azure Cosmos DB](/azure/cosmos-db/how-to-connect-role-based-access-control)
- [Fleet Analytics for Azure Cosmos DB](/azure/cosmos-db/fleet-analytics)
- [Visual Studio Code extension for Azure Cosmos DB](/azure/cosmos-db/vscode-extension/overview)
