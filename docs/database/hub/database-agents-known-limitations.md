---
title: Database Agents limitations and troubleshooting (Preview)
description: Review current Database Agents limitations and resolve common enablement and issue-discovery problems.
ms.reviewer: pleblanc, amapatil, lancewright
ms.date: 11/11/2026
ms.topic: troubleshooting
ms.custom: references_regions
ai-usage: ai-assisted
ms.search.form: product-databases, Database Agents troubleshooting
zone_pivot_group_filename: database/hub/zone-pivot-groups.json
zone_pivot_groups: database-agents-engine
---

# Database Agents limitations and troubleshooting

This article is for database administrators who need to determine why a database or server can't be enabled, doesn't appear, or doesn't produce an expected issue.

> [!IMPORTANT]
> Database Agents is in preview. Supported configurations, regional availability, and issue behavior can change before general availability.

## Supported database scope

::: zone pivot="azure-sql"

Database Agents supports Azure SQL databases, including serverless and Hyperscale databases. A serverless database must be awake for Database Agents to evaluate it.

Currently, Database Agents doesn't support:

- Azure SQL elastic pools.
- One-vCore serverless databases.
- Azure SQL Managed Instance.
- SQL Server on Azure Virtual Machines.
- SQL Server enabled by Azure Arc.

::: zone-end

::: zone pivot="postgresql"

Database Agents supports Azure Database for PostgreSQL flexible server running PostgreSQL 16 or later across Flexible Server compute tiers (including Burstable, General Purpose, and Memory Optimized) and deployment configurations. Support for Azure HorizonDB is coming soon.

PostgreSQL Database Agents is currently available as a **limited preview** in [Visual Studio Code](database-agents-vs-code.md) only (support in Fabric Database Hub is coming soon) and is initially supported in **South Central US**, **West US 3**, and **Sweden Central**. Access is limited and requires approval. To request access, complete the [Database Agents limited preview participation form](https://aka.ms/databaseagent-form).

Every PostgreSQL investigation is AI-assisted, with AI model processing in the **US Data Zone** (for **South Central US** and **West US 3**) and **EU Data Zone** (for **Sweden Central**). You don't pay for investigations during the limited preview. Billing starts before general availability, and Microsoft notifies enrolled customers in advance. AI-generated findings can be incomplete or incorrect, so validate them against the live server before you act.

::: zone-end

## A database or server doesn't appear

::: zone pivot="azure-sql"

1. Confirm that the database is within the supported scope.
1. Confirm that you have access to the database.
1. Confirm that you completed the applicable subscription and database setup in [Enable performance monitoring for Microsoft SQL](add-sql.md).
1. If the database is serverless, confirm that it's awake.
1. Confirm that the database is in the supported region associated with the [Fabric tenant home region](../../admin/find-fabric-home-region.md).
1. Allow approximately 15 minutes for performance-monitoring enablement to propagate to the database list and configuration. A database can't be enrolled until that information is available, so no agent can detect or create issues for it before enrollment.

If the database still doesn't appear, contact Microsoft Support.

::: zone-end

::: zone pivot="postgresql"

PostgreSQL Database Agents isn't yet available in Fabric Database Hub (coming soon). Check your setup in Visual Studio Code instead:

1. Confirm that you requested access through the [Database Agents limited preview participation form](https://aka.ms/databaseagent-form) and received approval.
1. Confirm that you installed the [PostgreSQL extension for Visual Studio Code](/azure/postgresql/development/vs-code-extension/postgresql-extension-overview) (version 1.32.0 or later).
1. Confirm that the flexible server runs PostgreSQL 16 or later, is running (not stopped), and is in a supported limited preview region (**South Central US**, **West US 3**, or **Sweden Central**).
1. Confirm that you signed in with an Azure account that has access to the server, and select **Fetch Metadata** on the server **Dashboard** if **Azure Server Detected** or **Incomplete Azure Metadata** appears.

If Database Agent still isn't available for the server in Visual Studio Code, contact Microsoft Support.

::: zone-end

## An agent can't be saved or doesn't become active

::: zone pivot="azure-sql"

1. Review the error to identify whether the save failed due to an agent-level check or a database permission check.
1. Confirm that you have Azure role-based access control (Azure RBAC) write permission on the Azure resource for every selected database. Permission to execute SQL changes isn't a substitute for this Azure resource permission.
1. If any selected database fails the write-permission check, the entire save fails. Remove databases for which you lack permission from the selection, and then save the remaining configuration.
1. Confirm that each selected database is supported and in the supported region associated with the [Fabric tenant home region](../../admin/find-fabric-home-region.md).
1. If a selected database is serverless, confirm that it's awake.
1. After saving succeeds, look for the **Database agent is active** message in **Database agent settings**. The message indicates agent-level status, not a separate activation status for each database.

If you still can't save or activate the agent, contact Microsoft Support.

::: zone-end

::: zone pivot="postgresql"

1. Confirm that you requested access through the [Database Agents limited preview participation form](https://aka.ms/databaseagent-form) and received approval.
1. Confirm that you have Azure role-based access control (Azure RBAC) write permission on the Azure server resource. Permission to execute SQL changes isn't a substitute for this Azure resource permission.
1. Confirm that the flexible server runs PostgreSQL 16 or later, is running (not stopped), and is in a supported limited preview region (**South Central US**, **West US 3**, or **Sweden Central**).
1. On the server **Dashboard** in Visual Studio Code, select **Fetch Metadata** if **Azure Server Detected** or **Incomplete Azure Metadata** appears, and then retry configuring **Database Agent**.

If you still can't save or activate the agent, contact Microsoft Support.

::: zone-end

## A new issue doesn't appear

When you enable a new database, server, or scenario, it can take about 15 minutes before a new issue appears.

1. Wait at least 15 minutes.
1. Confirm that the source condition is still active.
1. Refresh the issue list.
1. Confirm that the corresponding agent policy option is enabled for the database or server.

If the expected issue still doesn't appear, contact Microsoft Support.

## Issue details are incomplete

Database Agents validates read permission on the database or server and automatically retries an investigation up to three times for retriable errors.

After an investigation reaches **Failed** or **Investigation completed**, its details aren't automatically regenerated. Waiting, refreshing, or reopening the issue doesn't repair missing details. Confirm that you have read permission on the database or server, and contact Microsoft Support if details are missing.

## An issue can't be opened

Confirm that you have read permission on the database or server. If you still can't open the issue, contact Microsoft Support. Refreshing or reopening doesn't rerun a failed or completed investigation or regenerate missing details.

## Investigation fails

**Failed** means that the investigation didn't complete successfully. It doesn't mean that Database Agents attempted a database or server change. Automatic retries apply only to retriable errors and are limited to three retries. Once the investigation is **Failed**, refreshing or reopening doesn't restart it. Review the available issue information, confirm read permission on the database or server, and contact Microsoft Support if you need help.

## Can't apply a recommendation from an issue

Database Agents provides investigation and guidance only. All scenarios require a manual response through your authorized database workflow. Enabling an option in **Agent policy** doesn't execute a database or server change.

For response and verification steps, see [Respond manually and verify the condition](review-performance-issue.md#respond-manually-and-verify-the-condition).

::: zone pivot="azure-sql"

## Contextual AI scope and requirements

Contextual AI assistance is available for high CPU and long-running query issues only. Administrator-assigned Copilot capacity is sufficient in addition to the existing Database Agents setup and access requirements.

These features provide explanations and suggestions, not automatic remediation. Generated analysis depends on the available evidence and can be incomplete. Review the evidence and any stated limitations before choosing a manual response.

For the differences between issue-context Copilot prompts, inline **Explain why**, and query-level **Analyze slow query**, see [Investigate with contextual AI](review-performance-issue.md#investigate-with-contextual-ai).

### Contextual AI controls are unavailable or fail

If a prompt button in **Recommended action**, **Explain why**, or **Analyze slow query** is unavailable or fails, contact your administrator.

::: zone-end

## The database or server list can't be loaded

The resource list can fail when your identity can't access one or more resources already saved for the tenant.

Confirm your Azure read access, or retry with an identity that can access the configured resources. If the list still can't be loaded, contact Microsoft Support.

## A database or server is in another region

::: zone pivot="azure-sql"

Database Agents requires all Azure SQL databases to reside in the same region as the [Fabric tenant home region](../../admin/find-fabric-home-region.md). Cross-region enrollment isn't supported.

::: zone-end

::: zone pivot="postgresql"

During the limited preview, PostgreSQL support is available for flexible servers in **South Central US**, **West US 3**, and **Sweden Central** only. AI model processing runs in the **US Data Zone** for **South Central US** and **West US 3**, and in the **EU Data Zone** for **Sweden Central**.

::: zone-end

Use an eligible database or server in a supported region.

## Next step

> [!div class="nextstepaction"]
> [Enable and activate Database Agents](enable-database-agents.md)

## Related content

- [Database Agents overview](database-agents.md)
- [Understand issue statuses](database-agents.md#4-track-issue-status)
- [Database Agents frequently asked questions](database-agents-faq.md)
