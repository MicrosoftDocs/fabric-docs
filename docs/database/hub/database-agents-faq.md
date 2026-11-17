---
title: Database Agents frequently asked questions (Preview)
description: Get answers about current Database Agents support, permissions, scenarios, and limitations for Azure SQL Database and Azure Database for PostgreSQL.
ms.reviewer: pleblanc, amapatil, lancewright, wiassaf
ms.date: 11/11/2026
ms.topic: faq
ms.custom: references_regions
ai-usage: ai-assisted
ms.search.form: product-databases, Database Agents FAQ
zone_pivot_group_filename: database/hub/zone-pivot-groups.json
zone_pivot_groups: database-agents-engine
---

# Database Agents frequently asked questions

Get answers to common questions about Database Agents support, permissions, issue scenarios, limitations, and recovery.

> [!IMPORTANT]
> Database Agents is in preview. All supported scenarios provide investigation and guidance for a manual response. You can't apply a database change directly from an issue.

## Availability and support

### Which database products does Database Agents support?

Database Agents supports Azure SQL Database and Azure Database for PostgreSQL flexible server. Support for Azure HorizonDB is coming soon.

::: zone pivot="postgresql"

For Azure Database for PostgreSQL flexible server, Database Agents supports PostgreSQL 16 and later across Flexible Server compute tiers (including Burstable, General Purpose, and Memory Optimized) and deployment configurations.

### How do I get access to Database Agents for PostgreSQL?

Database Agents for Azure Database for PostgreSQL flexible server is currently available as a **limited preview** in [Visual Studio Code](database-agents-vs-code.md). Access is limited and requires approval. To request access, complete the [Database Agents limited preview participation form](https://aka.ms/databaseagent-form).

### Can I use Database Agents for PostgreSQL in Fabric Database Hub?

Not yet. During the limited preview, Database Agents for PostgreSQL is available in [Visual Studio Code](database-agents-vs-code.md) through the PostgreSQL extension. Support for PostgreSQL Database Agents in Fabric Database Hub is coming soon.

### Which regions and data zones are supported for PostgreSQL?

During the limited preview, Database Agents for PostgreSQL is available for flexible servers in **South Central US**, **West US 3**, and **Sweden Central**. AI-assisted investigations process data in the **US Data Zone** for US regions (**South Central US** and **West US 3**) and in the **EU Data Zone** for **Sweden Central**.

### Are Database Agents investigations for PostgreSQL billed during preview?

No. You don't pay for PostgreSQL Database Agents investigations during the limited preview. Billing starts before general availability, and Microsoft notifies enrolled customers in advance before billing starts.

::: zone-end

::: zone pivot="azure-sql"

For Azure SQL Database, Database Agents supports serverless and Hyperscale databases.

Currently, Database Agents doesn't support Azure SQL elastic pools, one-vCore serverless databases, Azure SQL Managed Instance, SQL Server on Azure Virtual Machines, or Azure Arc-enabled SQL Server.

### Does Database Agents support serverless databases?

Yes. Database Agents supports serverless Azure SQL databases, but the database must be awake for the agent to evaluate it. One-vCore serverless databases aren't supported.

::: zone-end

### Do Database Agents use AI?

::: zone pivot="azure-sql"

Core detection and investigation for Azure SQL Database don't use a large language model (LLM) or consume Copilot capacity. For high CPU and long-running query issues, optional [contextual AI assistance](#contextual-ai-assistance) uses an LLM and the Copilot capacity assigned by your administrator.

::: zone-end

::: zone pivot="postgresql"

Yes. Every Azure Database for PostgreSQL investigation is AI-assisted and uses an LLM to diagnose issues and recommend a manual response.

During the limited preview, Azure Database for PostgreSQL investigations aren't billed. Billing starts before general availability, and Microsoft notifies enrolled customers in advance before billing starts.

::: zone-end

### Do Azure SQL Database and PostgreSQL support the same scenarios?

No. Each engine supports a different set of scenarios that reflect how that engine behaves. For the current list, see [Detect a supported issue](database-agents.md#1-detect-a-supported-issue).

## Permissions

### What permission do I need to view issues?

You need read permission on the database or server to view the issue list.

### What permission do I need to save an agent?

You need Azure role-based access control (Azure RBAC) write permission on the Azure resource for every selected database or server. Saving also performs agent-level checks. This Azure resource permission is distinct from permission to execute SQL changes.

### Why does one permission error prevent the configuration from being saved?

Saving validates write permission for every selected database or server. If any selected database or server fails this check, the entire save fails. Remove databases or servers for which you lack permission from the selection, and then save the remaining configuration. Contact Microsoft Support if the save still fails.

### What permissions do I need to perform a manual response?

You need the permissions required by the database operation you perform through your authorized tools. Permission to view an issue or save an agent doesn't grant permission to execute a recommended database change.

## Supported scenarios

::: zone pivot="azure-sql"

### Which performance issues can Database Agents investigate?

Database Agents investigates high CPU, high memory, high I/O, long-running query, blocking query, missing index, drop unused or duplicate index, and query plan regression issues for supported Azure SQL databases. All scenarios provide guidance for manual remediation.

### Can Database Agents show high I/O issues?

Yes. Database Agents investigates high I/O issues and provides guidance for manual remediation.

### Can Database Agents show long-running query issues?

Yes. Database Agents investigates long-running query issues and provides guidance for manual remediation.

### Can Database Agents show high memory issues?

Yes. Database Agents investigates high memory issues and provides guidance for manual remediation.

### Can Database Agents respond to query plan regression?

Database Agents investigates query plan regression and provides guidance. Review the recommendation and perform any plan change manually through your authorized database workflow. Verify the live condition and workload afterward.

### Can Database Agents respond to index findings?

Database Agents investigates missing index and unused or duplicate index findings and provides guidance. Review the recommendation and perform any index change manually through your authorized database workflow.

::: zone-end

::: zone pivot="postgresql"

### Which performance issues can Database Agents investigate?

Database Agents investigates connection exhaustion, dead tuple bloat, high CPU, idle in transaction, lock contention, query plan regression, and sort spill and memory pressure issues for supported Azure Database for PostgreSQL flexible servers. All scenarios provide AI-assisted guidance for manual remediation.

For the conditions in each scenario, see [Detect a supported issue](database-agents.md#1-detect-a-supported-issue).

### Can Database Agents apply a fix to my PostgreSQL server?

No. Database Agents provides AI-assisted guidance, which can include SQL statements or server parameter changes—for example, creating an index, running `ANALYZE`, or adjusting `work_mem`. Validate the guidance against the live workload (such as using `CREATE INDEX CONCURRENTLY` to avoid write locks or checking whether a parameter change requires a server restart), and apply any change manually through your authorized database workflow.

::: zone-end

::: zone pivot="azure-sql"

## Contextual AI assistance

### Which issues support contextual AI assistance?

High CPU and long-running query issues support contextual AI assistance. Additional skills generate explanations and suggestions in the context of the issue or a captured query.

For the workflow, see [Investigate with contextual AI](review-performance-issue.md#investigate-with-contextual-ai).

### How do the Copilot prompt buttons and inline explanations differ?

Selecting a prompt button in **Recommended action** opens the Copilot pane in the context of the issue and uses the selected button text as the prompt. Selecting **Explain why** displays a generated explanation directly within the issue instead.

To investigate a particular captured query, select **Analyze slow query** beneath its query text. The generated analysis and suggestions appear inline in the context of that query.

### What capacity does contextual AI assistance use?

It uses the Copilot capacity assigned by your administrator. That capacity is sufficient in addition to the existing Database Agents setup and access requirements; no additional feature-specific licensing, tenant settings, regions, or permissions are required.

### What should I do if contextual AI assistance is unavailable or fails?

If a prompt button, **Explain why**, or **Analyze slow query** is unavailable or fails, contact your administrator.

### Does contextual AI assistance apply database changes?

No. These features generate explanations and suggestions, not automatic remediation. Review the evidence and any limitations in the response, and perform any database change manually through your authorized workflow. Generated guidance doesn't verify the root cause or workload recovery.

::: zone-end

## Manual responses and issue status

### Can I apply a recommendation directly from an issue?

No. Database Agents doesn't execute database or server changes. Use the issue evidence and guidance to decide on a manual response, and follow your organization's approval and change-management requirements.

### What does Failed mean?

**Failed** means that the investigation didn't complete successfully. It doesn't mean that a database or server change failed. Review the issue information and contact Microsoft Support if you need help.

### Will refreshing an issue rerun its investigation or restore missing details?

No. Database Agents automatically retries investigations up to three times for retriable errors and validates read permission on the database or server. After an investigation reaches **Failed** or **Investigation completed**, its details aren't automatically regenerated. Waiting, refreshing, or reopening doesn't repair missing details. Confirm read permission on the database or server and contact Microsoft Support if details are missing.

### What does Closed mean?

**Closed** is the final status after an issue is closed manually or after monitoring determines that the condition cleared. The issue remains available in history. Closing an issue doesn't itself verify workload recovery, so recheck the live database or server condition.

For the complete list, see [Understand issue statuses](database-agents.md#4-track-issue-status).

## Current limitations

### Why did an issue not appear immediately?

A newly enabled database, server, or scenario can take approximately 15 minutes to produce a new issue. Wait at least 15 minutes, refresh the issue list, and confirm that the source condition remains active.

::: zone pivot="azure-sql"

### Why isn't a database available for enrollment immediately after performance-monitoring setup?

Performance-monitoring enablement can take approximately 15 minutes to propagate to the database list and configuration. You can't enroll the database until that information is available. Before enrollment, there is no agent to detect or create issues for that database. This setup propagation is separate from issue creation after enrollment.

::: zone-end

### Can I enable a database or server in a different region?

::: zone pivot="azure-sql"

No. The Azure SQL database must be in the supported region associated with the [Fabric tenant home region](../../admin/find-fabric-home-region.md).

::: zone-end

::: zone pivot="postgresql"

No. During the limited preview, the PostgreSQL flexible server must be in **South Central US**, **West US 3**, or **Sweden Central**.

::: zone-end

## Service availability and recovery

### What happens to Database Agents during a regional service disruption?

For guidance, see [Experience-specific disaster recovery guidance](../../security/experience-specific-guidance.md#database-hub).

## Related content

- [Database Agents overview](database-agents.md)
- [Review a performance issue and respond manually](review-performance-issue.md)
- [Database Agents limitations and troubleshooting](database-agents-known-limitations.md)
- [Use Database Agents in Visual Studio Code](database-agents-vs-code.md)
