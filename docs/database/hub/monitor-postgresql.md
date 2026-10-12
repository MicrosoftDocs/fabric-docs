---
title: Monitor an Azure Database for PostgreSQL flexible server in the Database Hub (preview)
description: Learn how to monitor an Azure Database for PostgreSQL flexible server in the Database Hub in Microsoft Fabric.
ms.reviewer: amapatil, varundhawan
ms.date: 10/05/2026
ms.topic: how-to
ai-usage: ai-assisted
---
# Monitor an Azure Database for PostgreSQL flexible server in the Database Hub (preview)

Database Hub in Microsoft Fabric helps you discover Azure Database for PostgreSQL flexible servers and review their performance across your estate. 

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

## Monitor PostgreSQL flexible server in place

Your Flexible Server instances remain Azure resources in their existing subscriptions and regions. Using Database Hub for discovery and monitoring doesn't require moving data into Fabric or configuring mirroring.

The PostgreSQL resource represented in **Estate** is a flexible server instance, not each database hosted inside that server. **Estate** metrics describe the server unless a metric explicitly identifies a narrower scope.

## Prerequisites

- In the current preview, ask a Fabric administrator to opt your tenant into the Database Hub preview experience in the Fabric admin portal. In **Tenant settings**, enable **Users can access the Database hub (preview)**.
- Start with the free experience by signing in with your work or school account. You can enter from the Azure portal or directly from Microsoft Fabric, even if you didn't use Fabric before. Authenticate with a Microsoft Entra identity that has access to the Azure subscriptions and PostgreSQL flexible server resources you want to work with. Azure resource visibility alone doesn't grant permission to query a database. Database Hub uses your existing Microsoft Entra ID and Azure RBAC permissions rather than a separate permission model, so the access you assign here follows [standard Azure role-assignment steps](/azure/role-based-access-control/role-assignments-portal).

    - For discovery and monitoring, your identity needs permission to read the relevant Azure resource metadata and Azure Monitor metrics.

    - For discovery and monitoring, your identity needs the **Reader** role, or a role with greater permissions, on each subscription that contains the resources you want to monitor.

- Baseline PostgreSQL monitoring uses existing Azure Monitor metrics. It doesn't require the SQL performance-monitoring extended property, Azure Arc onboarding, or registering additional resource providers for the PostgreSQL metrics path. Query Store and a new customer-managed telemetry pipeline aren't prerequisites for baseline metrics.

- Database Hub respects your existing access boundaries. The Database Hub doesn't grant additional access. Your visibility to databases is limited to resources your current identity is authorized to view. Sharing a view or sending someone a resource link doesn't grant them access to the underlying server.

## View your PostgreSQL estate

Start with an **Estate** view, identify servers that need investigation, and continue in the Azure portal or Visual Studio Code for server configuration or database work.

1. Go to the [Database Hub in Microsoft Fabric](https://powerbi.com/workloads/fdh/databaseHub). In the Databases navigation, select **Overview**. 
1. The **What needs attention?** section points out parts of your database estate that need attention. Every card and link in **What needs attention?** leads to **Estate**. In the **Estate** view, beneath each resource, **Issues** appear in colorful chips while **Suggestions** appear in chips with a lightbulb icon.
1. Filter the inventory to **View: PostgreSQL**. Select the relevant subscriptions or resource groups by using the available filters.
1. Search for the instance you need, or review the filtered inventory. Select the Flexible Server instance to review its resource details. Treat this resource as the Azure server resource, not an individual PostgreSQL database.

## Understand PostgreSQL database estate monitoring

Use **Overview** for PostgreSQL CPU, memory, and storage summaries. Use **Performance** for the **PostgreSQL** dashboard and a more detailed view of the selected servers. Inventory scope and the dashboard's selected resource set can differ. Check the resource selection before treating a chart as the whole estate.

### Interpret PostgreSQL signals

The dashboard shows a subset of the Azure Monitor metrics available for Flexible Server. Use this reference to interpret a displayed signal and compare it with its source metric.

| **Signal** | **Azure Monitor metric** | **Interpretation** |
|----|----|----|
| CPU | `cpu_percent` | Server CPU utilization as a percentage. |
| Memory | `memory_percent` | Server memory utilization as a percentage. |
| Storage | `storage_percent` | Used storage percentage, including more than application table data. |
| Disk activity | `iops` | Disk operations per second, not a saturation percentage. |
| Connections | `active_connections` | Connections across all states, including idle; not just executing queries. |
| Failed connections | `connections_failed` | Failed attempts, not necessarily server downtime. |
| Read replica lag | `physical_replication_delay_in_seconds` | Read replica delay in seconds; not HA standby or logical replication lag. |

For more information, see [PostgreSQL monitoring and metrics](/azure/postgresql/monitor/concepts-monitoring) and [the Azure Monitor metric reference for Flexible Server](/azure/azure-monitor/reference/supported-metrics/microsoft-dbforpostgresql-flexibleservers-metrics).

Metric collection, processing, and dashboard refresh are separate stages. Some Azure Monitor metrics arrive in batches. A newly created, recently restarted, or stopped server can have incomplete data for the selected period. A dashboard refresh doesn't force the server to emit a new sample.

## Security and capability differences

Security assessment coverage varies by database engine. For PostgreSQL, use only assessments identified as applicable to PostgreSQL in Database Hub. An absent finding isn't proof that a control is configured or that the server satisfies a compliance requirement.

Currently, Database Hub evaluates the following PostgreSQL security assessments:

- **Microsoft Entra Authentication Enabled** (issue)
- **Encryption at rest using customer-managed keys (CMK)** (suggestion)
- **Microsoft Entra Authentication Enforced** (suggestion)
- **Public Network Access Disabled** (suggestion)

These assessments reflect the current configuration only; Database Hub doesn't evaluate every available PostgreSQL security control. For example, a server that doesn't use a customer-managed key can still be encrypted with a service-managed key.

Database Hub posture information complements specialized security tooling. Don't treat it as a replacement for Microsoft Defender capabilities, a complete audit-log viewer, or automatic remediation. Review findings in context and make authorized changes through the appropriate service.

## Find a PostgreSQL server that needs performance investigation

1. Review the PostgreSQL CPU, memory, and storage summaries in **Overview** to choose the signal to investigate.
1. Open **Performance** and select the **PostgreSQL** dashboard. Set the subscription, resource group, and server selection you intend to examine.
1. Set the time range to include the reported event. Check the chart description for its metric, unit, and aggregation before interpreting the value.
1. Use the chart's server drill-down, where available, to identify the contributing resources. Otherwise, narrow the server selection and compare their trends over the same interval.
1. For the candidate server, compare the original signal with storage, I/O, or connection trends as relevant. Record the resource ID, event time, selected interval, and metric aggregation.
1. Open that server in the Azure portal. Compare its Azure Monitor metrics using the same time range and aggregation, then use PostgreSQL diagnostics to investigate the workload.

### Continue an investigation in the Azure portal or Visual Studio Code

Use the Azure portal for Azure resource configuration and service monitoring. Use [Visual Studio Code with the PostgreSQL extension](/azure/postgresql/development/vs-code-extension/postgresql-extension-overview) when you need a database connection or query-level investigation.

1. Select the intended Flexible Server in Database Hub and verify its Azure resource identity.
1. Choose the available Azure portal or Visual Studio Code action. If the desired action is unavailable, open the tool directly and locate the same server.
1. In the Azure portal, confirm the subscription and resource group. For metrics comparison, set the investigation time range explicitly; don't assume the handoff preserves every dashboard filter.
1. In Visual Studio Code, confirm the host, target database, and authentication method before connecting. A link from Database Hub doesn't bypass PostgreSQL authentication or network controls.
1. Investigate using the recorded time interval and evidence. After an authorized change, compare the relevant metrics over an appropriate follow-up interval.

## Review an available PostgreSQL security finding

Use the following steps when the Database Hub displays a security finding that explicitly applies to a PostgreSQL server. If the relevant assessment isn't available, review that control directly in the Azure portal using the PostgreSQL service guidance.

1. Select the PostgreSQL finding from the **Security** summary or the affected server in **Estate**, where available.
1. Confirm the affected server, assessment name, evaluated setting, and any available observation time. Check the recommendation against your organization's policy.
1. Open the server in the Azure portal and verify its current configuration. For authentication, encryption, or auditing, follow the corresponding PostgreSQL service documentation.
1. Assess application impact and obtain the required approval before making a change. Enabling an authentication method or changing a security configuration can require additional service-specific steps.
1. After the authorized change completes, verify the setting in the Azure portal. Allow for reassessment and refresh Database Hub; if the finding persists, compare its evidence with the current server configuration.

## Troubleshoot PostgreSQL data in Database Hub

- If a PostgreSQL server doesn't appear in **Estate**, check the signed-in tenant, Azure access, resource type, and inventory filters.
- If performance metrics are missing or different between Azure Monitor and the Database Hub:
    1. Choose a time interval when the server was running. Check whether the metric applies to this server; for example, a server without the applicable replica configuration might not have read-replica lag data.
    1. Open the same server in the Azure portal and inspect the corresponding Azure Monitor metric. Match the time zone, start and end times, aggregation, and granularity as closely as possible.
    1. If the metric is absent in both places, check server state and the metric's collection requirements, and allow for processing delay.
    1. If Azure Monitor has data but Database Hub doesn't, refresh the Database Hub view and retry with that server alone. If the difference persists, contact Support.

## Limitations

During the current preview, PostgreSQL monitoring in the Database Hub has the following limitations:

- Activator alerting and RTD Copilot query exploration over the REST-backed PostgreSQL metrics aren't included in this preview path. This article doesn't describe all Copilot capabilities elsewhere in Database Hub or Visual Studio Code.

- The Database Hub doesn't automatically resize, tune, or remediate PostgreSQL servers. Changes require the appropriate permissions and your organization's approval process.

- Availability of links, assessments, and creation options depends on the preview experience enabled for your tenant. Check the applicable Database Hub availability guidance before relying on a specific entry point.

- For Azure Database for PostgreSQL flexible server, **Estate** lists flexible server resources, not the individual PostgreSQL databases hosted on each server.

- In the current preview, monitoring for Azure Database for PostgreSQL flexible server uses existing Azure Monitor metrics and doesn't provide query-level diagnostics in Database Hub. Query Store-backed top queries, query plans, wait-event analysis, and log search aren't part of the Database Hub. Use the Azure portal and native PostgreSQL tools to investigate queries.

## Related PostgreSQL guidance

- [Monitor PostgreSQL using metrics and logs](/azure/postgresql/monitor/concepts-monitoring)
- [Flexible Server metric reference](/azure/azure-monitor/reference/supported-metrics/microsoft-dbforpostgresql-flexibleservers-metrics)
- [Azure Monitor roles and permissions](/azure/azure-monitor/fundamentals/roles-permissions-security)
- [Create a PostgreSQL Flexible Server](/azure/postgresql/configure-maintain/quickstart-create-server)
- [PostgreSQL extension for Visual Studio Code](/azure/postgresql/development/vs-code-extension/postgresql-extension-overview)
- [Microsoft Entra authentication for PostgreSQL](/azure/postgresql/security/security-entra-concepts)
- [PostgreSQL encryption at rest](/azure/postgresql/security/security-data-encryption)
- [PostgreSQL audit logging](/azure/postgresql/security/security-audit)
