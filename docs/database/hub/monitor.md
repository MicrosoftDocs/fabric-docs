---
title: Monitor Databases in the Database Hub (Preview)
description: Learn how to monitor your database estate in the Database Hub in Microsoft Fabric.
ms.reviewer: amapatil, jmaldonado, varundhawan, ivujic, lancewright
ms.date: 09/21/2026
ms.topic: overview
ai-usage: ai-assisted
---
# Monitor databases in the Database Hub (preview)

In the Database Hub in the Fabric portal, you can quickly identify affected resources, understand impact, and prioritize investigation. 

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

To get started, [Open the Database Hub](https://powerbi.com/workloads/fdh/databaseHub). From the navigation pane, select **Databases**. The Database Hub opens to **Overview**, scoped to your permissions.

   :::image type="content" source="media/monitor/databases-navigation-overview.png" alt-text="The Databases icon in the Fabric navigation menu.":::

In the Database Hub you can browse your database inventory in one place, narrow it to the resources you manage, and expand a database to review **Suggestions** and **Issues** without navigating across multiple portals.

- In the **Estate** view, beneath each resource, **Issues** appear in colorful chips while **Suggestions** appear in chips with a lightbulb icon.
    - **Issues** require timely attention.
        - The **Issue** detail shows the finding, source evidence, affected resource, summary, and recommended action. A source can be a system agent, user agent, Activator alert, Azure Resource Graph, or telemetry pipeline.
    - **Suggestions** help you identify resources to investigate, tune, or right-size.
    
## Prerequisites

- In the current preview, ask a Fabric administrator to opt your tenant into the Database Hub preview experience in the Fabric admin portal. In **Tenant settings**, enable **Users can access the Database hub (preview)**.
- Access to Microsoft Fabric and the Databases experience.
- Permission to view the resource. Some detail fields and connection strings require read access to the resource itself, not only to the inventory.
- For **Open in VS Code** and **Open in SSMS**, the tool must be installed on your device.

## Investigate issues in your database estate

The **Overview** summarizes findings across your current database scope. Select a finding to move into **Estate** without losing context, then inspect the affected resource and the evidence behind a specific finding.

1. On **Overview**, review the **Issues** and **Suggestions** summaries for **Security**, **Performance**, and **Optimization**.
1. Select an **Issue type** to open **Estate** filtered to the affected databases, or select **See affected resources** to open **Estate** with the same filter. Your filters persist between **Overview** and **Estate**. 
1. In the **Estate** view, select a resource name to open its detail pane. The detail pane includes helpful resources to identify, connect to, locate, and manage the resource. 
1. In the **Estate** view, on an expanded item, review the **Issues** and **Suggestions** associated with that resource.
1. Select a finding to open **Issue Details**. Review the finding and evidence, including its **Summary** and **Recommended action**. Findings can come from agents, alerts, resource metadata, or telemetry. The recommendation action includes helpful recommendations, links, or sample code to investigate further.
1. Continue your investigation in product-specific platforms and tools, using [platform-specific monitoring guidance](#platform-specific-monitoring-guidance). Use the **Open in...** dropdown to open the resource directly, with the right context.

## Save a custom view

Save a custom view when you build a filtered state you expect to reuse. Your filters persist between **Overview** and **Estate** and can be re-used in the future and shared with a colleague.

1. Configure the scope, Category, Relevance, metadata filters, and search. The **View** label shows an asterisk to indicate unsaved changes.
1. Select **View**, then under **Manage custom views** select **Save**.
1. In the **Save view** dialog, select **Save as new custom view**.
1. Enter a custom **View name** for your custom view. Use names that describe the scope and the intent, so that the list of views stays useful as it grows and so that the name makes sense on **Overview**, where the filters are not visible. Select **Apply**.
1. You can share your custom view as a link that carries your current **Estate** filters. Select the **View** dropdown, then under **Manage custom views** select **Share**, then **Copy link**. A recipient who opens the link lands on **Estate** with the same scope and filters, and expanded or collapsed state applied. Sharing a link doesn't confer permissions. The list of databases is evaluated against the resources the recipient can access.

### Share a custom view of your estate

Sharing a link to a server or a filtered **Estate** view doesn't grant the recipient any access they don't already have. You can share a custom view with a colleague.

1. From **Estate**, apply the filters or select the server that reflects the scope you want to share.
1. Copy the page link and send it to the person who needs it.
1. When they open the link, they see the same filtered **Estate** view, evaluated against their own Azure or Fabric RBAC permissions. They might see more or fewer resources than you did if their permissions are different.

## Review your database security and compliance posture

**Overview** summarizes security and compliance findings across the estate. Signals can include Microsoft Entra authentication, customer-managed keys (CMK), and auditing coverage. 

1. Select a finding to open the affected resources in **Estate**, inspect **Issue Details**, and continue to the authoritative remediation surface.
1. Select an issue type or **See affected resources** to open the filtered **Estate** view.
1. Expand an affected database and select the security finding to open **Issue Details**.
1. Use the provided action to open the database where you can remediate the configuration.

## Find optimization opportunities

The Database Hub identifies suggestion opportunities from supported storage, compute, and memory signals. 

1. On **Overview**, review **Optimization Suggestions** and supported performance signals.
1. Select a suggestion type or affected-resource link to open **Estate** with the relevant filter applied.
1. Expand a database row and open the suggestion to review its evidence, expected impact, recommended action, and next step.

## Monitor estate performance with the performance dashboard

Use the built-in Performance dashboard to review database performance across the estate. 

1. Open the **Performance** page in Database Hub. Set the time range and resource filters.
1. Review **Recent signal changes** for items that might require your attention. 
1. Review the overall **CPU**, **Memory**, and **Storage** performance.
1. Hover over a chart and select its information icon to review how the metric is calculated.

## Best practices

- Compare metrics using the same time range, aggregation, and resource selection. An estate average can hide an individual server with high utilization. A chart that averages each server's peak is different from an average over all samples, and neither should be read as the current utilization of every server.

- Missing telemetry isn't zero utilization or proof that a server is healthy. Check whether the server produced data during the selected interval and whether a metric applies to its configuration. Historical utilization and the server's current running state answer different questions.

- Selecting **None** together with **Issues** or **Suggestions** widens the relevance layer rather than narrowing it, because a resource either has findings or it doesn't. Use **None** on its own to list resources that currently need no attention.

## Platform-specific monitoring guidance

- [Monitor an Azure Database for PostgreSQL flexible server in the Database Hub (preview)](monitor-postgresql.md)
- [Monitor a Cosmos DB account in the Database Hub (preview)](monitor-cosmos-db.md)
- [Monitor a Microsoft SQL database in the Database Hub (preview)](monitor-sql.md)

## Next step

> [!div class="nextstepaction"]
> [Open the Database Hub](https://powerbi.com/workloads/fdh/databaseHub)

## Related content

- [Frequently asked questions for Database Hub in the Fabric portal](faq.yml)
