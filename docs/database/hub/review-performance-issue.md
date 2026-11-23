---
title: Review a Database Agents performance issue (Preview)
description: Review a Database Agents performance issue, understand the evidence, and plan a manual response.
ms.reviewer: pleblanc, amapatil, lancewright, xiy
ms.date: 11/11/2026
ms.topic: how-to
ai-usage: ai-assisted
ms.search.form: product-databases, Review Database Agent issue
zone_pivot_group_filename: database/hub/zone-pivot-groups.json
zone_pivot_groups: database-agents-engine
---

# Review a Database Agents performance issue

This article helps anyone responsible for managing databases understand a performance issue and decide on an authorized manual response.

> [!IMPORTANT]
> Database Agents is in preview. All scenarios provide investigation and guidance for a manual response. You can't approve or execute a database change directly from an issue.

## Prerequisites

- Database Agents must be enabled for the affected database or server. For more information, see [Enable and activate Database Agents](enable-database-agents.md).
- You need read permission on the database or server to view issues.
- To perform a manual response, you need the permissions required by that database operation. Viewing an issue doesn't grant those permissions.

::: zone pivot="azure-sql"

- For the optional contextual AI assistance in high CPU or long-running query issues, you need administrator-assigned Copilot capacity and the applicable [Copilot tenant and capacity settings](../../fundamentals/copilot-enable-fabric.md) enabled for your user, in addition to the existing Database Agents setup and access requirements.

::: zone-end

::: zone pivot="postgresql"

- Install [Visual Studio Code](https://code.visualstudio.com/) and the [PostgreSQL extension for Visual Studio Code](/azure/postgresql/development/vs-code-extension/postgresql-extension-overview) (version 1.32.0 or later). During the limited preview, PostgreSQL Database Agents issues appear in Visual Studio Code, and support in Fabric Database Hub is coming soon.

::: zone-end

## Review a performance issue

::: zone pivot="azure-sql"

1. Open the issue list in [Database Hub](https://powerbi.com/workloads/fdh/databaseHub).
1. Find the issue you want to review. Use search or the available filters to narrow the issue list.
1. Select the issue to open its details.
1. Review the affected database, severity, current status, and capture time in the issue header. For an explanation of issue statuses, see [Understand issue statuses](database-agents.md#4-track-issue-status).
1. Review the summary, recommendation, and analysis. All issues contain this information, but the details and any queries provided vary by issue type.
1. For a blocking query issue, review **Summary** for the reported root cause and captured query details. Review **Both sides of the blocking** for the head blocker and a representative blocked session, and **Analysis** for the diagnosis snapshot and blocked-process history. Captured evidence reflects the condition at diagnosis, not necessarily the current blocking situation.
1. Review the recommended manual response, expected effect, and checks required before changing the database. For a blocking query issue, terminating a session rolls back its uncommitted work and can't be undone. Recheck the live condition and confirm the intended target before deciding on a manual response.

::: zone-end

::: zone pivot="postgresql"

1. In Visual Studio Code, open the **PostgreSQL** view, right-click your connected flexible server under **Connections** > **Servers**, and select **Dashboard** (or **Database Agent**).
1. If an **Investigation** banner appears at the top of the dashboard, select **View first of *N* issues**, or scroll to the Database Agent issues section and expand the issue you want to review.
1. Review the issue status (for example, **DETECTED** or **DIAGNOSED**), detection time, AI-generated summary, and supporting evidence. Captured evidence reflects the condition at diagnosis, not necessarily the current state of the server.
1. Review **RECOMMENDED ACTION**—including **Recommended change**, **Why this is safe**, and **Rollback** (each SQL block includes **Open in editor** and **Copy**)—and **EXPECTED OUTCOME**.
1. (Optional) Select the sparkle icon (**Ask Copilot about this section**) next to **RECOMMENDED ACTION** or **EXPECTED OUTCOME** to open GitHub Copilot **Chat** with the issue details preloaded.
1. Validate the diagnosis against the live server before you act. AI-generated findings can be incomplete or incorrect. For a lock contention or idle-in-transaction issue, recheck the current sessions—for example, by querying `pg_stat_activity` and `pg_locks`—and confirm the intended target. Terminating a session with `pg_terminate_backend()` rolls back its uncommitted work and can't be undone.

For the complete Visual Studio Code walkthrough with screenshots, see [Use Database Agents in Visual Studio Code](database-agents-vs-code.md).

::: zone-end

::: zone pivot="azure-sql"

## Investigate with contextual AI

For high CPU and long-running query issues, use contextual AI assistance to understand the issue, explore a recommendation, or analyze a captured query before deciding on a manual response. These experiences use additional skills to generate explanations and suggestions in the context of the issue or query.

Choose the experience that matches your question:

| What you want to understand | What to select | Where the response appears |
| --- | --- | --- |
| The issue's root cause or possible triggers | A prompt button in **Recommended action** | The Copilot pane, with the issue as context |
| Why the action is recommended | **Explain why** in **Recommended action** | Inline within the issue |
| A captured query's performance and possible improvements | **Analyze slow query** beneath the query text | Inline beneath the query |

### Ask a question in the Copilot pane

1. In **Recommended action**, select a prompt button, such as **Help me understand the root cause in more detail** or **What could have triggered this issue**.
1. The Copilot pane opens in the context of the issue. The selected button text is used as the prompt.
1. Review the response against the issue evidence before choosing a next step.

### Understand a recommendation inline

1. In **Recommended action**, select **Explain why**.
1. Review the generated explanation directly within the issue. Unlike a prompt button, this control displays the explanation inline rather than opening the Copilot pane.

### Analyze a captured query

1. Find the captured query text you want to investigate.
1. Select **Analyze slow query** beneath that query.
1. Review the inline analysis and suggestions in the context of that query. Check the supporting evidence and any stated limitations before deciding whether further investigation or a tuning change is appropriate.

> [!IMPORTANT]
> Copilot can make mistakes. Generated explanations and suggestions don't establish a verified root cause, confirm that a query is still running, or prove workload recovery. Analysis can be incomplete when supporting evidence isn't available. These features don't apply database changes; follow your authorized manual-response workflow.

::: zone-end

## Respond manually and verify the condition

The same response path applies to all supported scenarios.

1. Use authorized database tools to recheck the live condition. Don't rely only on the captured investigation.
1. Review the recommendation with a database administrator if you don't have the permissions or expertise to carry it out. Follow your organization's approval and change-management requirements.
1. Perform the appropriate response manually outside the issue. Database Agents doesn't execute the database or server change.
1. Recheck the live condition and workload after the response. Confirm whether the detected condition cleared and whether the workload recovered.
1. Review the issue status and history. In Database Hub for Azure SQL Database, close the issue if it remains open after you complete and verify the response. A condition can also clear automatically, with **Closed** as the final status. In Visual Studio Code for PostgreSQL, select **Mark manually applied** after you complete and verify the remediation, or select **Dismiss issue** if no change is needed. Updating or closing an issue doesn't verify workload recovery.

## Verify the outcome

1. Confirm that you understand which database or server and issue type require attention.
1. For a blocking query or lock contention issue, confirm that you can identify the blocking session, affected sessions, capture time, and recommended response from the issue details. This step confirms that you reviewed the captured evidence; it doesn't verify that the live condition is resolved.
1. For other issue types, confirm that you reviewed the summary, recommendation, and analysis and understand the recommended next step. The details and any queries provided vary by issue type.

::: zone pivot="azure-sql"

If you used contextual AI for a high CPU or long-running query issue, confirm that you reviewed the response in the expected location: the Copilot pane for a prompt button, or inline for **Explain why** or **Analyze slow query**. A generated response confirms that guidance is available, not that the database condition improved.

::: zone-end

## Limitations and known issues

- All supported scenarios require a manual response. Recommendations aren't executable actions in the issue.
- Captured evidence might not reflect the live database or server condition.
- **Failed** means the investigation didn't complete successfully, not that Database Agents attempted a database or server change.
- Investigation details aren't automatically regenerated after **Failed** or **Investigation completed**. Waiting, refreshing, or reopening doesn't repair missing details.

::: zone pivot="azure-sql"

- Contextual AI assistance is available for high CPU and long-running query issues only and uses administrator-assigned Copilot capacity. Suggestions depend on the available evidence and can be incomplete.

::: zone-end

::: zone pivot="postgresql"

- PostgreSQL Database Agents is currently available in [Visual Studio Code](database-agents-vs-code.md) only; support in Fabric Database Hub is coming soon.
- Every PostgreSQL investigation is AI-assisted. Findings and suggestions depend on the available evidence and can be incomplete or incorrect.

::: zone-end

## Troubleshoot

If issue details are missing after investigation fails or completes, confirm read permission on the database or server and contact Microsoft Support. For investigation retry behavior, see [Issue details are incomplete](database-agents-known-limitations.md#issue-details-are-incomplete).

::: zone pivot="azure-sql"

If contextual AI prompt buttons, **Explain why**, or **Analyze slow query** are unavailable or fail, contact your administrator.

::: zone-end

For current checks, see [Database Agents limitations and troubleshooting](database-agents-known-limitations.md).

## Next step

> [!div class="nextstepaction"]
> [Understand issue statuses](database-agents.md#4-track-issue-status)

## Related content

- [Database Agents overview](database-agents.md)
- [Database Agents frequently asked questions](database-agents-faq.md)
