---
title: Database Agents (Preview)
description: Decide whether Database Agents supports your Azure SQL Database or Azure Database for PostgreSQL performance monitoring and response needs.
ms.reviewer: pleblanc, amapatil, lancewright, wiassaf, xiy
ms.date: 11/11/2026
ms.topic: overview
ms.custom: references_regions
ai-usage: ai-assisted
ms.search.form: product-databases, Database Agents
zone_pivot_group_filename: database/hub/zone-pivot-groups.json
zone_pivot_groups: database-agents-engine
---

# What are Database Agents?

Database Agents helps application owners and database administrators detect, investigate, and respond to supported performance issues in Azure SQL Database and Azure Database for PostgreSQL flexible server.

Use Database Agents to:

- Detect supported database performance conditions.
- Review issue summaries, evidence, and guidance.
- Track the investigation, issue closure, and recurrence.

Where you use Database Agents depends on the database engine during preview:

- **Azure SQL Database:** Available in [Fabric Database Hub](https://powerbi.com/workloads/fdh/databaseHub). Visual Studio Code support is coming soon.
- **Azure Database for PostgreSQL flexible server:** Available as a limited preview in [Visual Studio Code](database-agents-vs-code.md). Support in Fabric Database Hub is coming soon.

Database Agents uses your existing identity, Azure resource permissions, and database permissions. It doesn't grant additional access or bypass your existing approval and change-management requirements.

> [!IMPORTANT]
> Database Agents is in preview. It investigates supported issues and provides guidance. You can't apply a database change directly from an issue. All scenarios require a manual response through your authorized database workflow.

::: zone pivot="postgresql"

> [!NOTE]
> Database Agents for Azure Database for PostgreSQL flexible server is currently available as a **limited preview** in [Visual Studio Code](database-agents-vs-code.md). Access is limited and requires approval. To request access, complete the [Database Agents limited preview participation form](https://aka.ms/databaseagent-form).

::: zone-end

## How Database Agents works

Database Agents creates a guided operational workflow for selected databases and servers:

1. **Detect** a supported database condition.
1. **Investigate** the condition and collect evidence.
1. **Guide or recommend** the next response based on the issue type.
1. **Track** the investigation and issue status through closure or recurrence.

All issues provide guidance for a manual response. Existing database permissions and operational controls continue to apply.

### How Database Agents uses AI

::: zone pivot="azure-sql"

Database Agents detects and investigates Azure SQL Database issues without a large language model (LLM). This core investigation doesn't consume Copilot capacity.

For high CPU and long-running query issues, you can optionally use [contextual AI assistance](review-performance-issue.md#investigate-with-contextual-ai) to explore the evidence. Contextual AI uses an LLM and the Copilot capacity assigned by your administrator.

::: zone-end

::: zone pivot="postgresql"

Every Azure Database for PostgreSQL investigation is AI-assisted. Database Agents uses a large language model (LLM) to diagnose the condition and recommend a manual response. AI model processing runs in the **US Data Zone** for US regions (**South Central US** and **West US 3**) and in the **EU Data Zone** for **Sweden Central**.

During the limited preview, you don't pay for PostgreSQL Database Agents investigations. Billing starts before general availability, and Microsoft notifies enrolled customers in advance before billing starts.

::: zone-end

## Get started

Before you enable Database Agents, confirm the following prerequisites.

### Prerequisites

::: zone pivot="azure-sql"

- Sign in to Fabric with an identity that has access to the Azure SQL databases you want to monitor.
- Use a supported Azure SQL database.
- If the database is serverless, confirm that it's awake so Database Agents can evaluate it.
- Confirm that the database is in the supported region associated with the [Fabric tenant home region](../../admin/find-fabric-home-region.md).
- Complete the applicable Azure SQL Database setup in [Enable performance monitoring for Microsoft SQL](add-sql.md).
- Confirm that you have database read permission to view issues.
- Confirm that you have Azure role-based access control (Azure RBAC) write permission on the Azure resource for every database selected when saving an agent.

::: zone-end

::: zone pivot="postgresql"

> [!IMPORTANT]
> Database Agents for Azure Database for PostgreSQL is in **limited preview**. Before you can enable this feature, you must [request access through the participation form](https://aka.ms/databaseagent-form) and receive approval.

- Install [Visual Studio Code](https://code.visualstudio.com/) and the [PostgreSQL extension for Visual Studio Code](/azure/postgresql/development/vs-code-extension/postgresql-extension-overview) (version 1.32.0 or later). Support for PostgreSQL Database Agents in Fabric Database Hub is coming soon.
- Use a running Azure Database for PostgreSQL flexible server on PostgreSQL 16 or later in a supported limited preview region: **South Central US**, **West US 3**, or **Sweden Central**.
- Sign in to Visual Studio Code with an identity that has access to the Azure server resource (including Azure RBAC write permission on the server resource when configuring an agent), plus PostgreSQL credentials to connect to the server.

::: zone-end

For complete setup instructions, see [Enable and activate Database Agents](enable-database-agents.md) or [Use Database Agents in Visual Studio Code](database-agents-vs-code.md).

## Open Database Agents

::: zone pivot="azure-sql"

1. Open [Database Hub](https://powerbi.com/workloads/fdh/databaseHub).
1. Select **Manage agents**.
1. Select **Database agent settings**.

From **Database agent settings**, you can select Azure SQL databases, review their agent policies, and save the configuration. Support for Azure SQL Database in Visual Studio Code is coming soon.

::: zone-end

::: zone pivot="postgresql"

During the limited preview, you access Database Agents for PostgreSQL from Visual Studio Code (support in Fabric Database Hub is coming soon):

1. Open Visual Studio Code and select the **PostgreSQL** icon in the Activity Bar to open **Connections**.
1. Under **Servers**, right-click your connected Azure Database for PostgreSQL flexible server.
1. Select **Database Agent** to configure the agent, or select **Dashboard** to review active investigations and issues.

For the full Visual Studio Code workflow, see [Use Database Agents in Visual Studio Code](database-agents-vs-code.md).

::: zone-end

## 1. Detect a supported issue

Database Agents evaluates selected databases and servers according to their saved agent policies.

::: zone pivot="azure-sql"

Supported issue scenarios for Azure SQL Database include:

- High CPU.
- High memory.
- High I/O.
- Long-running query.
- Blocking query.
- Missing index.
- Drop unused or duplicate indexes.
- Query plan regression.

::: zone-end

::: zone pivot="postgresql"

Supported issue scenarios for Azure Database for PostgreSQL include:

| Scenario | Conditions Database Agents investigates |
| --- | --- |
| Connection exhaustion | Role connection limits and session hoarding. |
| Dead tuple bloat | Dead tuple accumulation, heap-only tuple (HOT) update degradation, and index bloat from update churn. |
| High CPU | Index type mismatch, stale statistics, and unindexed queries. |
| Idle in transaction | Snapshot retention by idle-in-transaction sessions. |
| Lock contention | Row locks and table locks. |
| Query plan regression | Gather bottlenecks, join type misselection, lossy bitmap rechecks, and dropped supporting indexes. |
| Sort spill and memory pressure | Spills from full aggregates, hash joins, large sorts, and parallel queries. |

::: zone-end

When you enable a database, server, or scenario, it can take about 15 minutes to produce a new issue. Issue creation can finish sooner.

::: zone pivot="azure-sql"

Separately, enabling performance monitoring can take approximately 15 minutes to propagate to the database list and configuration before you can enroll the database. Database Agents can't detect or create issues for a database before enrollment.

::: zone-end

## 2. Review the investigation and evidence

Open an issue to understand the detected condition and decide what to do next. Depending on the issue type and its current state, Database Agents can provide:

- A summary of the condition.
- Captured evidence.
- Recommendations.
- Guidance for a manual response.
- The current issue status and history.

Captured evidence describes the condition at the time it was detected. Review the current status and available evidence before taking an action.

::: zone pivot="azure-sql"

For high CPU and long-running query issues, contextual AI assistance uses additional skills to help you explore the evidence. Prompt buttons in **Recommended action** open the Copilot pane with the issue as context; **Explain why** displays an explanation inline; and **Analyze slow query** provides inline suggestions for a captured query. This assistance uses the Copilot capacity assigned by your administrator and doesn't apply database changes.

For these optional investigation steps, see [Investigate with contextual AI](review-performance-issue.md#investigate-with-contextual-ai).

::: zone-end

::: zone pivot="postgresql"

Because PostgreSQL investigations are AI-assisted, the summary, analysis, **Recommended action** (including **Recommended change**, **Why this is safe**, and **Rollback** SQL), and **Expected outcome** are generated by an LLM. On the server **Dashboard** in Visual Studio Code, you can also select **Ask Copilot about this section** to explore an issue in GitHub Copilot Chat. Validate the diagnosis and any suggested SQL statements or server parameter changes against the live server before you act.

::: zone-end

For detailed review guidance, see [Review a Database Agents performance issue](review-performance-issue.md).

## 3. Decide how to respond

The recommended manual response depends on the issue scenario. Database Agents doesn't execute the response.

### Follow guidance and respond manually

All issues provide investigation results and guidance for manual remediation.

Review the evidence and guidance, recheck the current condition, and complete the appropriate response through your authorized database workflow. Verify the live condition after the response. If the issue remains open after you finish, close it.

For response and verification guidance, see [Review a Database Agents performance issue](review-performance-issue.md#respond-manually-and-verify-the-condition).

## 4. Track issue status

Database Agents updates an issue as it investigates the condition or determines that the condition no longer requires attention.

::: zone pivot="azure-sql"

In Database Hub, issue statuses are:

- **Active:** The condition needs attention.
- **Investigating:** Database Agents is gathering or analyzing evidence.
- **Investigation completed:** Guidance is available. Perform the response manually.
- **Failed:** The investigation didn't complete successfully.
- **Closed:** The issue is no longer active and remains available in history.

::: zone-end

::: zone pivot="postgresql"

On the Visual Studio Code server **Dashboard**, Database Agent surfaces active investigation progress in the **Investigation** banner and tracks each issue from **Detected** and **Diagnosed** through resolution—such as when you select **Mark manually applied** after completing a change or **Dismiss issue** when no action is needed.

::: zone-end

An investigation failure doesn't mean that a database or server change failed. Database Agents doesn't execute database or server changes automatically without your action.

Investigations are automatically retried up to three times for retriable errors. After an investigation reaches **Failed** or **Investigation completed**, refreshing or reopening the issue doesn't regenerate missing details. Confirm read permission on the database or server, and contact Microsoft Support if investigation details are missing.

## 5. Review issue history and recurrence

An issue can close after you complete a manual response or after monitoring determines that the condition cleared. **Closed** is the final status in either case. Review the issue history and the live database or server condition to understand the outcome. Closing an issue doesn't itself prove that the workload recovered.

If a condition recurs after an issue was closed, Database Agents creates a new issue and preserves the closed issue in history.

### Use Database Agents responsibly

Operator review is required for Database Agent findings and recommendations.

Database Agents doesn't replace:

- Database authentication and authorization.
- Existing approval processes.
- Change-management requirements.
- Production validation.
- Human accountability for database changes.

## Supported databases and servers

::: zone pivot="azure-sql"

Database Agents supports Azure SQL databases, including serverless and Hyperscale databases.

Currently, Database Agents doesn't support:

- Azure SQL elastic pools.
- One-vCore serverless databases.
- Azure SQL Managed Instance.
- SQL Server on Azure Virtual Machines.
- SQL Server enabled by Azure Arc.

::: zone-end

::: zone pivot="postgresql"

Database Agents supports Azure Database for PostgreSQL flexible server running PostgreSQL 16 or later across Flexible Server compute tiers (including Burstable, General Purpose, and Memory Optimized) and deployment configurations. Support for Azure HorizonDB is coming soon.

PostgreSQL support is currently available as a **limited preview** in [Visual Studio Code](database-agents-vs-code.md), and support in Fabric Database Hub is coming soon. Access is limited and requires approval. To request access, complete the [Database Agents limited preview participation form](https://aka.ms/databaseagent-form).

::: zone-end

## Limitations of public preview

::: zone pivot="azure-sql"

- **Surface availability:** Azure SQL Database is currently supported in Fabric Database Hub; Visual Studio Code support is coming soon.
- **Regional availability:** The database must be in the supported region associated with the [Fabric tenant home region](../../admin/find-fabric-home-region.md). Cross-region enrollment isn't supported.

::: zone-end

::: zone pivot="postgresql"

- **Surface availability:** PostgreSQL Database Agents is currently available as a limited preview in [Visual Studio Code](database-agents-vs-code.md) only. Support in Fabric Database Hub is coming soon.
- **Limited preview regions and data zones:** PostgreSQL support is initially available for servers in **South Central US**, **West US 3**, and **Sweden Central**, with AI processing in the **US Data Zone** and **EU Data Zone**.

::: zone-end

- **Issue availability:** A newly enabled database, server, or scenario can take approximately 15 minutes to produce a new issue.
- **Manual response:** Review recommendations and carry out changes through your authorized database workflow.
- **Preview behavior:** Supported issues, configurations, and regions can change during preview.

For the complete list and recovery steps, see [Database Agents limitations and troubleshooting](database-agents-known-limitations.md).

## Troubleshoot

### A database or server doesn't appear

::: zone pivot="azure-sql"

Confirm that the database is supported, in the supported region, and visible to your identity. If the database is serverless, confirm that it's awake. Confirm that [performance monitoring for Microsoft SQL](add-sql.md) is enabled, and allow approximately 15 minutes for enablement to propagate to the database list and configuration. If the database still doesn't appear, contact Microsoft Support.

::: zone-end

::: zone pivot="postgresql"

Confirm that you received approval for the limited preview, that you installed the PostgreSQL extension for Visual Studio Code (version 1.32.0 or later), and that the flexible server runs PostgreSQL 16 or later, is running (not stopped), is in a supported limited preview region (**South Central US**, **West US 3**, or **Sweden Central**), and has Azure metadata loaded on the server **Dashboard** (**Fetch Metadata**). Note that PostgreSQL Database Agents isn't yet available in Fabric Database Hub (coming soon). If the server or agent still doesn't appear in Visual Studio Code, contact Microsoft Support.

::: zone-end

### An agent configuration can't be saved

Saving validates the agent and your Azure resource write permission for every selected database or server. If any selected database or server fails the permission check, the entire save fails. Remove resources for which you lack permission from the selection, and save the remaining configuration. For other errors or continued failures, see [An agent can't be saved or doesn't become active](database-agents-known-limitations.md#an-agent-cant-be-saved-or-doesnt-become-active).

### A new issue doesn't appear

Wait at least 15 minutes, confirm that the source condition remains active, confirm that the corresponding agent policy option is enabled, and refresh the issue list.

### The database or server list can't be loaded

Confirm that your identity can read the resources already saved for the tenant. Retry with an identity that can access the configured resources.

### Database Agents doesn't return after a regional service disruption

You don't need to reconfigure or re-enable Database Agents. After service is restored, refresh Database Hub or Visual Studio Code and retry the operation. If Database Agents doesn't return, contact Microsoft Support.

## Next step

> [!div class="nextstepaction"]
> [Enable and activate Database Agents](enable-database-agents.md)

## Related content

- [Review a performance issue](review-performance-issue.md)
- [Understand issue statuses](#4-track-issue-status)
- [Database Agents frequently asked questions](database-agents-faq.md)
- [Use Database Agents in Visual Studio Code](database-agents-vs-code.md)
