---
title: Run a Fabric Observability Investigation
description: Run a Fabric observability investigation to uncover the root cause of a failed pipeline run. Follow the prerequisites, start the chat, and review the findings today.
ms.topic: how-to
ms.service: fabric
ms.collection: ce-skilling-ai-copilot
ms.reviewer: ilanawaitser
ms.date: 10/05/2026
author: spelluru
ms.author: spelluru
ms.custom: references_regions
# Customer intent: As a Fabric workspace user, I want to understand what Fabric observability investigation is and how to use it so that I can find the root cause of a failed data pipeline run faster.
---

# Run a Fabric observability investigation

[Fabric observability investigation](fabric-observability-investigation-overview.md) is an AI-assisted feature that helps you understand why a data pipeline run failed in Microsoft Fabric. When a pipeline run fails, start an investigation from the [Monitor hub](../../admin/monitoring-hub.md). The investigation opens a chat with the operations agent, which analyzes the failure, explains the likely root cause, and suggests what to do next. For an overview of Fabric observability investigation, see [Fabric observability investigation](fabric-observability-investigation-overview.md).

This article covers prerequisites for using the feature, how to start an investigation, review the investigation report, ask follow-up questions, and troubleshoot any issues with using the feature itself.

> [!IMPORTANT]
> Fabric observability investigation is currently in preview. See the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/) for legal terms that apply to features that are in beta, preview, or otherwise not yet released into general availability.

## Prerequisites

Before you can run an investigation in a workspace, ensure the workspace meets the following requirements.

### Enable workspace monitoring

An investigation reads the monitoring data that workspace monitoring captures for your pipeline runs. Enable workspace monitoring on the workspace before you run an investigation.

When you enable workspace monitoring, Fabric creates a monitoring database in the workspace with supporting items for collecting and analyzing job and activity logs. When you configure workspace monitoring, an operations agent is created automatically under the monitoring item.

Investigations run through the operations agent in the workspace monitoring item, and use captured data to analyze what happened during a failed run.

For steps, see [Workspace monitoring overview](/fabric/fundamentals/workspace-monitoring-overview).

> [!NOTE]
> Monitoring data is captured only after workspace monitoring is enabled. A pipeline run that failed before monitoring was turned on might not have the data an investigation needs.

### Assign Contributor access

Any user who runs an investigation needs at least the **Contributor** role on the workspace. An investigation runs with the identity of the signed-in user and can access only the data that user is already authorized to view. The person running it needs enough access to read the workspace's monitoring data and pipeline definitions.

To learn about workspace roles, see [Roles in workspaces in Microsoft Fabric](/fabric/fundamentals/roles-workspaces).

## Start an investigation

The **Job runs** page in the Monitor hub displays one row per job. The **Investigate** action in a job's row starts an investigation of its latest run. This selection opens a chat with the operations agent, scoped to that job run.

You can also investigate a specific failed run from the job's run history, as described in [Investigate a failed run with the Operations agent (preview)](../../admin/monitoring-hub-jobs.md#investigate-a-failed-run-with-the-operations-agent-preview).

:::image type="content" source="media/fabric-observability-investigation-overview/investigate-link.png" alt-text="Screenshot of pipeline jobs in the Monitor hub with Investigate links for their latest failed runs." lightbox="media/fabric-observability-investigation-overview/investigate-link.png":::

You don't need to describe the failure or paste any identifiers. The investigation already knows which workspace and which job run you started from, and it begins analyzing right away.

## Review the investigation report

As the investigation runs, the agent gathers the relevant monitoring signals for the failed job, correlates them, and builds a report. The report typically includes what happened, a timeline, the likely root cause, and recommended next steps. When enough run history is available, the report also includes a chart of recent successful and failed runs so you can see the pattern at a glance.

:::image type="content" source="media/fabric-observability-investigation-overview/investigation-report.png" alt-text="Screenshot of a completed investigation report showing the headline finding, a run history chart, and the root-cause analysis for a failed data pipeline run." lightbox="media/fabric-observability-investigation-overview/investigation-report.png":::

The agent explains its reasoning as it works, so you can see which signals it considered and how they relate to one another. This explanation helps you understand not only what the report surfaced, but why the agent identified it as relevant.

## Ask follow-up questions

The conversation continues as your understanding evolves. Ask follow-up questions in the same chat to clarify a specific finding, look at the pipeline's earlier runs, or explore a related angle. The agent keeps the context of the current investigation across the conversation.

:::image type="content" source="media/fabric-observability-investigation-overview/follow-up-question.png" alt-text="Screenshot of an investigation chat where the user asks a follow-up question about the pipeline's earlier runs." lightbox="media/fabric-observability-investigation-overview/follow-up-question.png":::

## Troubleshoot investigation issues

This article provides troubleshooting guidance for Fabric observability investigation.

### You can't start an investigation

When the **Investigate** link is visible, it appears on a failed pipeline run even for users with only the **Reader** role or when the workspace doesn't have an operations agent, so seeing the link doesn't mean the investigation can run. If an investigation doesn't start or fails after you select **Investigate**, check the following:

- You have at least the **Contributor** role on the workspace. An investigation runs with your identity and fails if you don't have enough access to read the workspace's monitoring data.
- Workspace monitoring is enabled on the workspace.

For setup steps, see the [Prerequisites](#prerequisites) section.

### Workspace monitoring isn't enabled or isn't ready

If the investigation reports that it can't find the workspace's monitoring data, workspace monitoring is either not enabled or not fully provisioned yet.

- Enable workspace monitoring on the workspace. See [Workspace monitoring overview](/fabric/fundamentals/workspace-monitoring-overview).
- If you just enabled it, wait for provisioning to finish, then start the investigation again.

### There's no data for the failed run

If the investigation can't find the failed job, the monitoring data for that run might not be available.

- The run might have failed before workspace monitoring was enabled. Monitoring captures data only after it's turned on.
- Monitoring data can appear with a short delay after a run. Wait a few minutes, then start the investigation again.

### The agent has trouble generating a response

Fabric observability investigation depends on an AI service to generate text. Occasionally, that service might have problems. If you see an error indicating a problem generating the response, send your message again in the same chat to retry. You don't need to refresh.

### The conversation clears after a refresh

This behavior is expected. An investigation runs in a temporary session, so refreshing the page or closing the tab clears the conversation. To continue, start a new investigation from the failed run.

## Related content

- [Fabric observability investigation overview](fabric-observability-investigation-overview.md) - Learn what an investigation is, how it works, and how to start one.
- [Responsible AI FAQ for Fabric observability investigation](fabric-observability-investigation-responsible-use.md) - Understand how the agent generates results and how to validate outputs.
- [Data, privacy, and governance FAQ for Fabric observability investigation](fabric-observability-investigation-governance-faq.md) - Understand governance, privacy, and model-use details.
- [Workspace monitoring overview](/fabric/fundamentals/workspace-monitoring-overview) - Learn how workspace monitoring captures the data an investigation reads.
