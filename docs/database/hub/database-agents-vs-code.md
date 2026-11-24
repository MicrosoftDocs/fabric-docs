---
title: Use Database Agents in Visual Studio Code (Preview)
description: Use Database Agents in Visual Studio Code to investigate and respond to Azure Database for PostgreSQL issues, currently available as a limited preview.
ms.reviewer: pleblanc, amapatil, lancewright
ms.date: 11/11/2026
ms.topic: how-to
ms.custom: references_regions
ai-usage: ai-assisted
ms.search.form: product-databases, Database Agents VS Code
---

# Use Database Agents in Visual Studio Code

Database Agents integrates with Visual Studio Code so you can configure agents, review AI-assisted performance investigations, inspect live server state, and carry out manual responses without leaving your editor.

> [!IMPORTANT]
> Database Agents for Azure Database for PostgreSQL flexible server is currently available as a **limited preview** in Visual Studio Code. Access is limited and requires approval. To request access, complete the [Database Agents limited preview participation form](https://aka.ms/databaseagent-form).
>
> Validate AI-generated diagnoses, SQL statements, and parameter changes against the live server before you act, and follow your organization's approval and change-management workflow.

> [!NOTE]
> - **Azure Database for PostgreSQL flexible server:** Available now as a limited preview in Visual Studio Code. Support for PostgreSQL Database Agents in [Fabric Database Hub](https://powerbi.com/workloads/fdh/databaseHub) is coming soon.
> - **Azure SQL Database:** Support in Visual Studio Code is coming soon. Today, use [Database Hub](database-agents.md?pivots=azure-sql) for Azure SQL Database.

## Prerequisites

> [!IMPORTANT]
> Database Agents for Azure Database for PostgreSQL is in **limited preview**. Before you can enable this feature, you must [request access through the participation form](https://aka.ms/databaseagent-form) and receive approval.

- Use a running Azure Database for PostgreSQL flexible server on PostgreSQL 16 or later in a supported limited preview region (**South Central US**, **West US 3**, or **Sweden Central**).
- Install [Visual Studio Code](https://code.visualstudio.com/) (version 1.102.0 or later is recommended for Model Context Protocol (MCP) agent tools).
- Install the [PostgreSQL extension for Visual Studio Code](/azure/postgresql/development/vs-code-extension/postgresql-extension-overview) (version 1.32.0 or later).
- Sign in with a Microsoft Entra identity that has access to the Azure server resource (including Azure RBAC write permission on the server resource when configuring Database Agent), plus PostgreSQL credentials and network access to connect and run queries.
- (Optional) Install [GitHub Copilot in Visual Studio Code](https://code.visualstudio.com/docs/copilot/overview) to use **Ask Copilot about this section** and Agent mode tools.

## Open Database Agent for your server

Connect your Azure Database for PostgreSQL flexible server in the PostgreSQL extension to open Database Agent or view findings on the server dashboard.

1. In Visual Studio Code, select the **PostgreSQL** icon in the Activity Bar to open **Connections**.
1. Under **Servers**, add or connect to your Azure Database for PostgreSQL flexible server and sign in with your Azure account if prompted.
1. Right-click the connected server node:
   - Select **Database Agent** to configure and manage Database Agent for the server.
   - Select **Dashboard** to open the server dashboard and review active investigations and issues.

   :::image type="content" source="media/database-agents-vs-code/postgresql-open-database-agent.png" alt-text="Screenshot of the PostgreSQL Connections tree in Visual Studio Code showing the server context menu with Dashboard and Database Agent." lightbox="media/database-agents-vs-code/postgresql-open-database-agent.png":::

1. If the dashboard toolbar displays **Azure Server Detected**, select **Fetch Metadata** so the extension resolves the server's Azure resource identity. If **Incomplete Azure Metadata** appears, select **Fetch Metadata** in the banner to complete tenant resolution.

## Review an issue

You can review and manage PostgreSQL Database Agent issues directly on the server's **Dashboard** tab in Visual Studio Code.

1. Open **Dashboard** for your server. When Database Agent is investigating or has detected issues on the server, an **Investigation** banner appears at the top of the dashboard with the issue count—select **View first of *N* issues** to jump directly to the findings.
1. Expand an issue to inspect its severity, status (such as **DETECTED** or **DIAGNOSED**), detection timestamp, and AI-generated analysis:
   - **RECOMMENDED ACTION** includes the **Recommended change** (with generated SQL and **Open in editor** and **Copy** controls), **Why this is safe**, **Rollback** SQL (also with **Open in editor** and **Copy**), and **View full details**.
   - **EXPECTED OUTCOME** summarizes the anticipated workload improvement and provides a collapsible **Rollback plan**.
   - Action buttons at the bottom of the issue let you choose **Review action**, **Mark manually applied**, or **Dismiss issue**.

   :::image type="content" source="media/database-agents-vs-code/postgresql-dashboard-agent-issues.png" alt-text="Screenshot of a PostgreSQL Database Agent issue on the Visual Studio Code server dashboard showing the Investigation banner, Recommended action, Why this is safe, Rollback SQL, Expected outcome, and issue action buttons." lightbox="media/database-agents-vs-code/postgresql-dashboard-agent-issues.png":::

1. To explore an issue section with AI, select the sparkle icon (**Ask Copilot about this section**) next to a heading such as **RECOMMENDED ACTION** or **EXPECTED OUTCOME**. GitHub Copilot **Chat** opens with the structured issue details preloaded so you can ask follow-up questions and inspect live server metrics, sessions, or execution plans.

   :::image type="content" source="media/database-agents-vs-code/postgresql-copilot-issue-context.png" alt-text="Screenshot of selecting Ask Copilot about this section next to Recommended action on a PostgreSQL Database Agent issue, opening GitHub Copilot Chat with the issue details preloaded." lightbox="media/database-agents-vs-code/postgresql-copilot-issue-context.png":::

## Respond to an issue

Captured evidence reflects the server state when the issue was diagnosed, and AI-generated findings can be incomplete or incorrect. Validate every recommendation against the live server before making changes.

1. Use the server **Dashboard** (**Queries**, **Waits**, and **Sessions** tabs) or open a query editor to confirm whether the detected condition is still active on the live server (for example, querying `pg_stat_activity` and `pg_locks` before calling `pg_terminate_backend()`).
1. For SQL changes (such as creating an index or running `ANALYZE`), select **Open in editor** or **Copy** on the **Recommended change** SQL block in **RECOMMENDED ACTION**:
   - Inspect `EXPLAIN` output in the **Query Plan Visualizer** when validating query or index changes.
   - Review lock and resource impact (for example, keeping `CREATE INDEX CONCURRENTLY` to avoid blocking writes on active tables) and keep the **Rollback** SQL ready.
   - Run the approved statement manually through your authorized database workflow.
1. For server parameter recommendations (such as tuning `work_mem` or autovacuum settings), right-click the server under **Connections** > **Servers** and select **Server Management** > **Server Parameters**. If a static parameter change requires a restart, use **Server Management** > **Restart server** during an approved maintenance window.

   :::image type="content" source="media/database-agents-vs-code/postgresql-server-management-parameters.png" alt-text="Screenshot of the PostgreSQL server context menu in Visual Studio Code highlighting Server Management and Server Parameters." lightbox="media/database-agents-vs-code/postgresql-server-management-parameters.png":::

1. Recheck live server metrics and query plans to confirm that the workload recovered.
1. Return to the issue on the dashboard and select **Mark manually applied** to record that you completed the remediation, or select **Dismiss issue** if no change is needed. You can still review dismissal details on dismissed issues.

## Surface availability by database engine

During preview, Database Agents support across Visual Studio Code and Fabric Database Hub varies by engine:

| Engine | Visual Studio Code | Fabric Database Hub |
| --- | --- | --- |
| **Azure Database for PostgreSQL flexible server** | Available now (limited preview) via the PostgreSQL extension (**Database Agent** and **Dashboard**) | Coming soon for Database Agents (baseline estate and metric monitoring is available in [Monitor an Azure Database for PostgreSQL flexible server](monitor-postgresql.md)) |
| **Azure SQL Database** | Coming soon | Available now (preview) in [Database Hub](database-agents.md?pivots=azure-sql) |

## Related content

- [What are Database Agents?](database-agents.md?pivots=postgresql)
- [Enable and activate Database Agents](enable-database-agents.md?pivots=postgresql)
- [Review a Database Agents performance issue](review-performance-issue.md?pivots=postgresql)
- [Database Agents limitations and troubleshooting](database-agents-known-limitations.md?pivots=postgresql)
