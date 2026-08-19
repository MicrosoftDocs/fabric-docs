---
title: "Tutorial: Configure the Mirror Azure Monitor Solution in Fabric (Preview)"
description: Learn how to create a mirrored Azure Monitor item in Microsoft Fabric and access Log Analytics tables through the Eventhouse endpoint or a Lakehouse shortcut.
ms.reviewer: nirarazy, ilanawaitser
ms.date: 07/29/2026
ms.topic: tutorial
ai-usage: ai-assisted
---

# Tutorial: Configure the Mirror Azure Monitor solution in Microsoft Fabric (preview)

In this tutorial, you configure a Microsoft Fabric mirrored Azure Monitor item that exposes selected Log Analytics tables to Fabric workloads without replicating data.

In this tutorial, you:

- Authenticate to a Log Analytics workspace.
- Create a persistent connection to the workspace.
- Select tables to mirror to Fabric.
- Access the mirrored data through the Eventhouse endpoint (real-time analytics) and a Lakehouse shortcut (batch analytics and Power BI).

For more information, see [Mirror Azure Monitor data in Microsoft Fabric (Preview)](azure-monitor.md). 
<br>
For onboarding with AI, see [Onboard with the Mirror Azure Monitor Fabric skill](azure-monitor.md#onboard-with-the-mirror-azure-monitor-skill).

## Prerequisites

- An existing **Log Analytics workspace** with the tables to expose to Fabric.
- Connection creation role - A custom role on the Log Analytics workspace with permissions as detailed in [Create connection custom role](azure-monitor.md#create-connection-permissions) or as provided by the **Owner**, **User Access Administrator**, or **Role Based Access Control Administrator** [privileged roles](/azure/role-based-access-control/built-in-roles/privileged).
- An existing **Fabric capacity**. If none exists, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- A Fabric **workspace** (not *My workspace*) to hold the mirrored item.
- The **Mirrored Azure Monitor** catalog item enabled for your tenant. A tenant admin enables it in the Fabric **Admin portal** under **Tenant settings** > **Mirrored catalog item**. Complete this step if the **Mirrored Azure Monitor** card doesn't appear in **+ New item**.
- For cross-tenant scenarios (Fabric tenant differs from the Log Analytics tenant): a **service principal** in the Log Analytics tenant with read access to the workspace, plus the tenant ID, application (client) ID, and client secret of that service principal.

## Create a mirrored Azure Monitor item

This section shows how to create the item from the Fabric portal. The steps here are the high-level flow. The sections that follow (connect, select tables, review and create) detail each step.

1. Sign in to Microsoft Fabric and open the target workspace.
1. Select **+ New item** from the workspace.
1. Locate and select the **Mirrored Azure Monitor** card.
1. [Connect to an existing Log Analytics workspace](#connect-to-the-log-analytics-workspace).
1. [Select the tables to expose](#select-tables-to-expose).
1. [Review and create](#review-and-create).

## Connect to the Log Analytics workspace

Authentication depends on whether the Fabric tenant matches the Log Analytics tenant. Creating a new connection requires a [connection creation custom role](azure-monitor.md#create-connection-permissions) on the Log Analytics workspace, or by using the **Owner**, **User Access Administrator**, or **Role Based Access Control Administrator** role. After a connection exists, other users in the Fabric workspace can reuse the connection to create their own mirrored items without needing that action, because the connection operates under the credentials of the user who created it. To reuse an existing connection, select it instead of creating a new one in the following steps.

### Same-tenant connection (OAuth)

1. Under **New connection**, select **Azure Monitor**, or pick an existing Azure Monitor connection.
1. For a new connection, enter the connection details.

    | Connection setting | Description |
    | :-- | :-- |
    | **Log Analytics workspace ID** | The workspace ID (a GUID) of the Log Analytics workspace to mirror. Find this value on the workspace's **Overview** page in the Azure portal, under **Workspace ID**. |
    | **Connection name** | A friendly name for the connection. The portal suggests a default. |
    | **Authentication kind** | **OAuth 2.0**. The signed-in user authenticates against the Log Analytics tenant. |

1. Select **Sign in** when prompted, then complete the OAuth flow with an account that holds the connection creation role on the workspace.

### Same-tenant production connection (workspace identity)

For same-tenant production scenarios, use the Fabric workspace identity instead of an organizational account. This approach avoids the risk of shortcuts breaking when a user account changes.

1. Under **New connection**, select **Azure Monitor** and choose **Workspace identity** as the authentication kind.
1. Grant the workspace identity the create connection role (or built-in role required for the mirrored item) on the Log Analytics workspace.
1. Provide the Log Analytics workspace ID.
1. Select **Connect**.

### Cross-tenant connection (service principal)

Use this option when the Fabric tenant differs from the Log Analytics tenant.

1. Under **New connection**, select **Azure Monitor** and choose **Service principal** as the authentication kind.
1. Enter the connection details.

    | Connection setting | Description |
    | :-- | :-- |
    | **Tenant ID** | The Microsoft Entra tenant ID of the **Log Analytics tenant** (not the Fabric tenant). |
    | **Log Analytics workspace ID** | The workspace ID of the Log Analytics workspace to mirror. |
    | **Application (client) ID** | The client ID of the service principal that has the connection creation access to the workspace. |
    | **Client secret** | The client secret for the service principal. Store this value in Azure Key Vault rather than entering it inline whenever possible. |

1. Select **Connect**.

The service principal accesses the underlying Azure Monitor storage on behalf of the connection. The operations available match the service principal's existing Log Analytics permissions. The connection authenticates with a SAS token that isn't tied to a user. Anyone who holds the token can perform every operation the token allows, so store the client secret in Azure Key Vault and rotate it regularly.

## Select tables to expose

After the connection succeeds, Fabric loads the list of mirrored tables in the Log Analytics workspace.

1. Browse the table list. Search by name to filter. During public preview, only tables that recently received streaming data appear in this list. If a table you need isn't shown, add it later through **Edit data selection** on the item.
1. Select the tables to expose in Fabric. Common selections include `AppRequests`, `AppDependencies`, `AppExceptions`, `Heartbeat`, and custom log tables that hold telemetry the team needs in Fabric.
1. Select **Next** to continue.

A mirrored item supports approximately **500 tables**. For larger workspaces, create multiple mirrored items, each scoped to a subset of tables.

## Review and create

1. Review the connection settings, the table list, and the item name.
1. Select **Create**.

Fabric provisions the mirrored item immediately. Because no data is replicated, the item itself appears in the workspace in less than a minute.

The underlying shortcuts to Log Analytics storage take longer to populate. Expect about **15 minutes** before the tables become queryable through the Eventhouse endpoint or a Lakehouse shortcut. During this window, the item is visible but queries might return no results or fail to enumerate tables. This is expected behavior for initial setup.

Only new data is mirrored. Data that arrived before the table was mirrored isn't backfilled into Fabric during public preview.

## Share the mirrored item with business users

By default, the mirrored item inherits permissions from the Fabric workspace. Only users with access to the Fabric workspace see the item. To grant business users access to the mirrored data for real-time analytics, Power BI semantic models, or other scenarios described in the [Common use cases](azure-monitor.md#common-use-cases) section of the overview article, use OneLake security.

During public preview, the mirrored item **Share** action has known issues. Use [OneLake security](../../onelake/security/get-started-onelake-security.md) to grant granular access to the mirrored data instead of the **Share** action.

## Open the Eventhouse endpoint for the mirrored item

The Eventhouse endpoint is created by default when you create the mirrored Azure Monitor item. Open the endpoint to keep the mirrored Azure Monitor data isolated from other Fabric data, or to use it as the entry point for real-time analytics.

1. Open the mirrored Azure Monitor item.
1. Select **Analyze data with** > **Eventhouse endpoint**.

The Eventhouse endpoint contains shortcuts to the mirrored Azure Monitor tables and becomes the entry point for KQL queries, Real-Time Dashboards, and Activator alert rules over the mirrored data. Data acceleration starts on first access.

## Add the mirrored data to an existing eventhouse

Use this approach to combine the mirrored Azure Monitor data with business data that already lives in an eventhouse. This approach is the common path for cross-domain analytics that join telemetry with orders, accounts, or other business tables.

1. Open the eventhouse that contains existing business data.
1. Expand the KQL database.
1. Select **+ New** > **OneLake shortcut** from the toolbar.
1. In the new shortcut pane, select the mirrored Azure Monitor item as the source, and then select the tables to shortcut into the eventhouse.
    - For example, select `AppRequests` and `AppDependencies` to enable analysis of application performance and reliability.
    - Keep acceleration enabled for each table shortcut. If acceleration stays enabled, Fabric loads the data into cache for high-performance queries. To learn more, see [Query acceleration for OneLake shortcuts](../../real-time-intelligence/query-acceleration-overview.md).
1. Select **Create** to add the shortcuts. The mirrored tables appear in the **Shortcuts** folder of the KQL database.
1. Organize the shortcuts into folders, [update the cache period](../../real-time-intelligence/data-policies.md) as needed, and reference them in KQL queries alongside the existing business data in the eventhouse.

<!--Check these steps in the UX. -->

To learn more about creating OneLake shortcuts, see [Create OneLake shortcuts in a KQL database](../../real-time-intelligence/onelake-shortcuts.md).

## Query the eventhouse and create real-time dashboard tiles and alerts

Querying the data in an eventhouse provides a real-time, KQL-based experience over the mirrored data. From an eventhouse, [run queries](../../real-time-intelligence/create-database.md#explore-your-kql-database-with-the-embedded-kql-queryset), [create real-time dashboards](../../real-time-intelligence/dashboard-real-time-create.md), and pin results to the Fabric home page. Write queries in KQL or use the eventhouse copilot to ask questions in natural language. Analyze the data through a Fabric notebook or a SQL Analytics endpoint connected to the eventhouse.

In this tutorial, run a KQL query in the eventhouse and save the results to a real-time dashboard.

1. In the embedded eventhouse KQL queryset, run a query against one of the mirrored tables. For example:

    ```kusto
    AppRequests
    | where TimeGenerated > ago(1h)
    | summarize count() by ResultCode, bin(TimeGenerated, 5m)
    | render timechart
    ```

1. Save the query to the queryset.

1. [Save the result as a tile](../../real-time-intelligence/dashboard-real-time-create.md#add-tile-from-a-queryset) on a Real-Time Dashboard. Select **Pin to dashboard**, choose a new or existing dashboard, name the tile, and select **Create**.

1. Create an [Activator alert rule](../../real-time-intelligence/data-activator/activator-get-data-real-time-dashboard.md) on the tile to notify you when a threshold is met. Open the tile menu, select **Set alert**, define the condition (for example, the count of failed requests exceeds a threshold in a 5-minute window), choose an action such as email or a Teams message, and select **Create**.

1. Explore the data further with [Copilot in Real-Time Intelligence](../../real-time-intelligence/copilot-writing-queries.md). Open the KQL queryset, select **Copilot**, and ask a question in natural language to generate and refine KQL.

Latency in Fabric tracks Azure Monitor latency. Queries run against the mirrored Azure Monitor tables through OneLake shortcuts. When acceleration is enabled, queries run against cached data for high performance.

## Query the mirrored data through a Lakehouse

For batch analytics, Spark, and Power BI semantic models, use a OneLake shortcut from a Lakehouse to the mirrored item.

1. Create or open a Lakehouse in the same Fabric workspace.
1. Under **Tables**, select **New shortcut** > **Microsoft OneLake**.
1. Browse to the mirrored Azure Monitor item and select the tables to shortcut into the Lakehouse.
1. Confirm the shortcut.

After the shortcut exists, the mirrored tables appear in the Lakehouse Tables view as Delta Lake tables. From there:

- Run a Spark notebook over the tables for filtering, joins, and aggregations.
- Build a Power BI semantic model that combines telemetry with business tables in the Lakehouse.
- Schedule pipelines that transform telemetry for downstream consumers.

## Combine telemetry with business data

The shortcut model in OneLake makes it straightforward to join Azure Monitor data with business data already in Fabric, which is the core value of mirroring. Instead of moving telemetry into a separate analytics store, you reason over operational signals and business records together in real time. Two examples:

- **Correlate experience with revenue.** Join `AppRequests` from Application Insights with an orders table to relate request latency or failures to order completion rate, so a spike in errors surfaces as a drop in completed orders rather than an isolated IT metric.
- **Relate usage to cost.** Join compute usage telemetry with billing or cost data to analyze spend against actual consumption.

The following query correlates request latency with order completion by joining the mirrored `AppRequests` table with a business orders table.

```kusto
let orders = externaldata(OrderId:string, OrderTimestamp:datetime, OrderValue:real)
  [@'<shortcut to business orders table>'];
AppRequests
| where TimeGenerated > ago(24h)
| project TimeGenerated, RequestId = OperationId, DurationMs = DurationMs
| join kind=inner (orders) on $left.RequestId == $right.OrderId
| summarize AvgDuration = avg(DurationMs), TotalValue = sum(OrderValue)
  by bin(TimeGenerated, 1h)
```

## Troubleshoot connection failures

If creating the connection or the mirrored item fails, check the following conditions:

- **Connection permission.** Creating a connection requires the `Microsoft.Authorization/roleAssignments/write` action on the source Log Analytics workspace. The Workspace Admin or Contributor role isn't sufficient on its own.
- **Tenant mismatch.** If the Fabric tenant differs from the Log Analytics tenant, an organizational account or workspace identity fails. Use **service principal** authentication for cross-tenant connections.
- **Catalog item not enabled.** If the **Mirrored Azure Monitor** card doesn't appear in **+ New item**, a tenant admin must enable the **Mirrored catalog item** tenant setting in the Fabric Admin portal.
- **Expired or rotated credentials.** A connection that worked previously can fail if the creating user's access changed, or if a service principal's secret expired or was rotated. Re-create the connection with current credentials.
- **Tables don't appear.** Only tables that recently received streaming data appear in the selection list. Add missing tables later through **Edit data selection** on the item.

For data issues after the item is created, such as tables that stay empty or show a temporary error state, see [Troubleshoot a mirrored Azure Monitor item](azure-monitor-troubleshoot.md).

## Clean up resources

To remove the mirrored item, delete it from the Fabric workspace. Deleting the item removes only the Fabric item and any Eventhouse endpoint or Lakehouse shortcut that depends on it. The underlying Azure Monitor data, retention, and billing aren't affected.

To remove the connection, delete it from the **Connections** list in the Fabric workspace. Deleting a connection doesn't delete any mirrored items that already use it, but those items can no longer be edited or refreshed.

## Related content

- [Mirroring Azure Monitor in Microsoft Fabric](azure-monitor.md)
- [What is Mirroring in Fabric?](../../mirroring/overview.md)
- [Skills for Fabric overview](../../fundamentals/skills-for-fabric-overview.md)
- [Azure Monitor Logs overview](/azure/azure-monitor/logs/data-platform-logs)
- [Microsoft Fabric Real-Time Intelligence overview](../../real-time-intelligence/overview.md)
