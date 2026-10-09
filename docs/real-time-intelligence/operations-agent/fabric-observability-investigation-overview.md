---
title: Fabric Observability Investigation
description: Learn what Fabric observability investigation is, how it analyzes failed data pipeline runs in Microsoft Fabric, and how to start and interpret an investigation.
ms.topic: concept-article
ms.service: fabric
ms.collection: ce-skilling-ai-copilot
ms.reviewer: ilanawaitser
ms.date: 09/03/2026
ms.custom: references_regions
# Customer intent: As a Fabric workspace user, I want to understand what Fabric observability investigation is and how to use it so that I can find the root cause of a failed data pipeline run faster.
---

# What is Fabric observability investigation?

Fabric observability investigation is an AI-assisted feature that helps you understand why a data pipeline run failed in Microsoft Fabric. When a pipeline run fails, start an investigation from the [Monitor hub](../../admin/monitoring-hub.md). The investigation opens a chat with the [Operations agent](../operations-agent.md), which analyzes the failure, explains the likely root cause, and suggests what to do next.

> [!IMPORTANT]
> Fabric observability investigation is currently in preview. See the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/) for legal terms that apply to features that are in beta, preview, or otherwise not yet released into general availability.

## What an investigation does

Fabric observability investigation is a capability of the Fabric Operations agent. An investigation is a focused, read-only analysis that runs when a pipeline job fails and you need to know what happened and what to do next. The agent gathers the monitoring signals for that job, correlates them, and produces a report with findings and recommended next steps. It doesn't change your pipeline or rerun any jobs.

Use an investigation to move from a failed run toward an explanation and next steps. Use this feature to:

- **Investigate a failed data pipeline run** by starting from the failed job in the Monitor hub.
- **Understand the likely root cause** through a structured report that correlates job, activity, and error details.
- **See the run history** for the pipeline so you can tell whether the failure is a one-time event or a recurring pattern.
- **Ask follow-up questions** in the same chat to dig deeper into what the report surfaced.

## How to run an investigation

See [Run a Fabric observability investigation](fabric-observability-investigation-run.md) for step-by-step instructions on how to start an investigation and interpret its results.

## Supported sources

Currently, investigations support only **data pipeline run failures**.

## Session lifetime and data retention

An investigation runs in a temporary chat session and the session isn't saved. If you refresh the page or close the tab, the conversation clears and the next investigation starts fresh. If a step fails or a result looks incomplete, send another message in the same chat to try again. You don't need to refresh to retry.

Investigations are ephemeral. Conversation content isn't retained after the session ends. The investigation reads monitoring data that already lives in your workspace and doesn't keep extra copies of your telemetry.

## Data access and permissions

An investigation reads only the data needed to analyze the failed job, and only within your existing permissions:

- The monitoring data captured for your workspace, such as the pipeline job logs, copy activity logs, and error details.
- The pipeline's definition and the job's human-readable error message, retrieved through Fabric APIs.

The investigation runs with your identity and can access only data you are already authorized to view. Microsoft Entra ID issues short-lived tokens for each call the investigation makes.

## Responsible AI

The feature is designed and operated in alignment with Microsoft's Responsible AI principles. See [Responsible AI FAQ for Fabric observability investigation](fabric-observability-investigation-responsible-use.md).

## Billing

Billing isn't currently enabled for observability investigation. For more information about billing in operations agent, see [Operations agent capacity and billing](../operations-agent-billing.md).

## Related content

- [Run a Fabric observability investigation](fabric-observability-investigation-run.md) - Learn how to start and interpret an investigation.
- [Responsible AI FAQ for Fabric observability investigation](fabric-observability-investigation-responsible-use.md) - Understand how the agent generates results and how to validate outputs.
- [Data, privacy, and governance FAQ for Fabric observability investigation](fabric-observability-investigation-governance-faq.md) - Understand governance, privacy, and model-use details.
- [Workspace monitoring overview](/fabric/fundamentals/workspace-monitoring-overview) - Learn how workspace monitoring captures the data an investigation reads.
