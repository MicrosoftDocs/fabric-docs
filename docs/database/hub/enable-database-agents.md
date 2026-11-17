---
title: Enable and activate Database Agents (Preview)
description: Enable Database Agents and activate it for selected Azure SQL databases or Azure Database for PostgreSQL flexible servers.
ms.reviewer: pleblanc, amapatil, lancewright, xiy
ms.date: 11/11/2026
ms.topic: how-to
ms.custom: references_regions
ai-usage: ai-assisted
ms.search.form: product-databases, Enable Database Agents
zone_pivot_group_filename: database/hub/zone-pivot-groups.json
zone_pivot_groups: database-agents-engine
---

# Enable and activate Database Agents

This article is for database administrators who need to enable Database Agents and activate it for selected Azure SQL databases or Azure Database for PostgreSQL flexible servers.

> [!IMPORTANT]
> Database Agents is in preview. Use the supported database and server scope and review your organization's operational requirements before enabling it for a production workload.

::: zone pivot="postgresql"

> [!NOTE]
> Database Agents for **Azure Database for PostgreSQL flexible server** is currently available as a **limited preview** in **Visual Studio Code** only. Access is limited and requires approval. To request access, complete the [Database Agents limited preview participation form](https://aka.ms/databaseagent-form). Support for PostgreSQL Database Agents in Fabric Database Hub is coming soon.

::: zone-end

## Prerequisites

::: zone pivot="azure-sql"

- Use a supported Azure SQL database, including a supported serverless or Hyperscale database. One-vCore serverless databases aren't supported.
- Sign in to Fabric with an identity that has access to the database.
- Confirm that the database is in the supported region associated with the [Fabric tenant home region](../../admin/find-fabric-home-region.md).
- Complete the applicable setup in [Enable performance monitoring for Microsoft SQL](add-sql.md). Follow the instructions for Azure SQL Database. If the database is serverless, confirm that it's awake.
- You need Azure role-based access control (Azure RBAC) write permission on the Azure resource for every database you select when saving an agent. This permission is distinct from permission to execute SQL changes.

::: zone-end

::: zone pivot="postgresql"

> [!IMPORTANT]
> Database Agents for Azure Database for PostgreSQL is in **limited preview**. Before you can enable this feature, you must [request access through the participation form](https://aka.ms/databaseagent-form) and receive approval.

- Install [Visual Studio Code](https://code.visualstudio.com/) and the [PostgreSQL extension for Visual Studio Code](/azure/postgresql/development/vs-code-extension/postgresql-extension-overview) (version 1.32.0 or later).
- Use a running Azure Database for PostgreSQL flexible server on PostgreSQL 16 or later (including Burstable, General Purpose, or Memory Optimized compute tiers) in a supported limited preview region: **South Central US**, **West US 3**, or **Sweden Central**.
- Sign in to Visual Studio Code with an identity that has access to the Azure server resource (including Azure RBAC write permission on the server resource when configuring an agent), plus PostgreSQL credentials to connect to the server.

> [!NOTE]
> Every PostgreSQL investigation is AI-assisted, with AI model processing in the **US Data Zone** (for **South Central US** and **West US 3**) and **EU Data Zone** (for **Sweden Central**). You don't pay for investigations during the limited preview. Billing starts before general availability, and Microsoft notifies enrolled customers in advance before billing starts.

::: zone-end

## Enable and activate Database Agents

::: zone pivot="azure-sql"

First, enable Database Agents in Fabric Database Hub:

1. Open [Fabric Database Hub](https://powerbi.com/workloads/fdh/databaseHub).
1. In the upper left, select **Manage agents**.
1. Select **Database agent settings**.
1. Turn **Enabled** on.
1. Select **Save**.

This step enables Database Agents, but it doesn't activate Database Agents for any database.

After you enable performance monitoring, wait about 15 minutes for the database list and configuration to update. You can't enroll a database until this information is available. Issue detection doesn't start before enrollment.

1. Select one or more databases that you want Database Agents to monitor.
1. Open **Agent policy** for the selected databases.
1. Under **Enabled**, select the action categories or individual actions for which Database Agents provides investigation and guidance:

   | Action category | Actions |
   | --- | --- |
   | Blocking and deadlocks | **Kill blocking session (identify blocking session)** |
   | Query performance | **Flag long-running queries**; **Force last known good plans** |
   | Index tuning | **Create missing index**; **Drop unused index**; **Drop duplicate index** |
   | Resource pressure and contention | **Flag high CPU**; **Flag high memory**; **Flag high I/O** |

1. Select **Apply**.
1. Select **Save** to save the database configuration.

Saving validates the agent and your Azure resource write permission for every selected database. If any selected database fails that permission check, the entire save fails. Remove databases for which you lack permission from the selection, and then save the remaining configuration. For other save failures, see [An agent can't be saved or doesn't become active](database-agents-known-limitations.md#an-agent-cant-be-saved-or-doesnt-become-active).

The action names in **Agent policy** are UI labels. Enabling an action doesn't authorize or execute the named database change. For every scenario, review the issue guidance and perform any response manually through your authorized database workflow.

::: zone-end

::: zone pivot="postgresql"

During the limited preview, you configure and open Database Agent for PostgreSQL directly in Visual Studio Code (Fabric Database Hub support is coming soon):

1. In Visual Studio Code, select the **PostgreSQL** icon in the Activity Bar to open **Connections**.
1. Under **Servers**, add or connect to your Azure Database for PostgreSQL flexible server and sign in with your Azure account if prompted.
1. Right-click the connected server node and select **Database Agent** to configure and enable Database Agent for the server.
1. If you open **Dashboard** and see **Azure Server Detected** (or **Incomplete Azure Metadata**), select **Fetch Metadata** so the extension resolves the server's Azure resource identity.

For the complete Visual Studio Code workflow with screenshots, see [Use Database Agents in Visual Studio Code](database-agents-vs-code.md).

::: zone-end

## Verify the outcome

::: zone pivot="azure-sql"

1. Open **Database agent settings** and confirm that the green **Database agent is active** message appears. This message shows agent-level status, not a separate activation status for each database. Confirm that saving the configuration completed without an error before checking for issues.
1. After you save the configuration, wait about 15 minutes for a new issue to appear, and then open the issue list in Database Hub. Issues appear only if Database Agents detects a condition in an enrolled database. This 15-minute issue-creation interval is separate from the initial propagation delay after you enable SQL performance monitoring.

When you review a high CPU or long-running query issue, you can optionally [investigate with contextual AI](review-performance-issue.md#investigate-with-contextual-ai) before deciding on a manual response.

::: zone-end

::: zone pivot="postgresql"

1. Right-click the server under **Connections** > **Servers** in Visual Studio Code and select **Dashboard**.
1. Confirm that the server's Azure metadata is loaded and monitor the top of the dashboard for the **Investigation** banner. After you enable a server, it can take up to 15 minutes to detect an active condition and surface an issue.

::: zone-end

## Limitations and known issues

::: zone pivot="azure-sql"

- Currently, Database Agents for Azure SQL Database is available in Fabric Database Hub (Visual Studio Code support is coming soon).
- Currently, Database Agents doesn't support Azure SQL elastic pools, single vCore serverless databases, Azure SQL Managed Instance, SQL Server on Azure Virtual Machines, or SQL Server enabled by Azure Arc.
- The database must be in the supported region associated with the [Fabric tenant home region](../../admin/find-fabric-home-region.md).

::: zone-end

::: zone pivot="postgresql"

- Currently, Database Agents for PostgreSQL is available in [Visual Studio Code](database-agents-vs-code.md) only; support in Fabric Database Hub is coming soon.
- Currently, Database Agents supports Azure Database for PostgreSQL flexible server (PostgreSQL 16 and later) only. Support for Azure HorizonDB is coming soon.
- PostgreSQL support is currently available as a **limited preview** for servers in **South Central US**, **West US 3**, and **Sweden Central** (with AI processing in the **US Data Zone** and **EU Data Zone**). Access is limited and requires approval through the [Database Agents limited preview participation form](https://aka.ms/databaseagent-form).

::: zone-end

- A newly enabled database, server, or scenario can take approximately 15 minutes to produce an issue.
- Review recommendations and apply any database or server change through your authorized workflow.

## Troubleshoot

For current setup and issue-discovery checks, see [Database Agents limitations and troubleshooting](database-agents-known-limitations.md).

## Next step

> [!div class="nextstepaction"]
> [Review a Database Agents performance issue](review-performance-issue.md)

## Related content

- [Database Agents overview](database-agents.md)
- [Understand issue statuses](database-agents.md#4-track-issue-status)
- [Database Agents frequently asked questions](database-agents-faq.md)
