---
title: "What Is Monitor Hub in Microsoft Fabric?"
description: Learn how the Monitor hub gives you a unified observability pane in Microsoft Fabric to track jobs, alerts, capacity, and agents. Get started today.
#customer intent: As a Fabric user, I want to understand what the Monitor hub is and what I can monitor so that I can find the right observability surface for my task.
ms.topic: concept-article
ms.date: 09/04/2026
ai-usage: ai-assisted
---

# What is the Monitor hub?

The Monitor hub is the unified observability pane in Microsoft Fabric. It brings job execution health, alerts, capacity, agents, and application telemetry together in one place. Instead of checking each item type on its own, you can spot problems across your Fabric estate and act on them from a single surface.

This article explains what you can monitor in the Monitor hub and how its dedicated pages for job runs, job alerts, applications, capacity, and agents map to different parts of your environment.

Any Fabric user can open the Monitor hub, but you only see activities for Fabric items you have permission to view.

> [!IMPORTANT]
> The Monitor hub is currently in preview.
>
> See the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/) for legal terms that apply to Azure features that are in beta, preview, or otherwise not yet released into general availability.

:::image type="content" source="media/monitoring-hub/monitoring-hub.png" alt-text="Screenshot of the Fabric Monitor hub showing activity history with filter, refresh, and column options visible." lightbox="media/monitoring-hub/monitoring-hub.png":::

## What can you monitor in the Monitor hub?

<a id="schedule-failures-preview"></a>

The Monitor hub organizes observability into dedicated pages, each focused on a different part of your Fabric estate. Select a page to learn how to use it:

- **[Job runs](monitoring-hub-jobs.md)** — Track job runs across the items in your workspace.
- **[Applications](monitoring-hub-applications.md)** — Monitor application health and usage.
- **[Capacity and cost](monitoring-hub-capacity.md)** — Monitor capacity health and consumption.
- **[Agents](monitoring-hub-agents.md)** — Monitor agent activity and health.
- **[Alerts](monitoring-hub-alerts.md)** — Manage who receives notifications about job failures and other job events.

## Investigate failed pipeline runs with the Operations agent (preview)

For failed pipeline runs, the Monitor hub gives you an entry point to a read-only **Operations agent** (preview) investigation. From the run history of a failed pipeline job, you can start an investigation that reviews the run and surfaces likely root causes without changing your pipeline or its configuration. This entry point connects job-run monitoring in the Monitor hub to the **Operations agent** (preview) in Real-Time Intelligence.

To start an investigation from a failed run, see [Monitor job runs in the Monitor hub](monitoring-hub-jobs.md#investigate-a-failed-run-with-the-operations-agent-preview). For **Operations agent** (preview) setup, prerequisites, governance, responsible AI guidance, and limitations, see [Create and configure operations agents](../real-time-intelligence/operations-agent.md).

## Related content

- [Feature usage and adoption report](feature-usage-adoption.md)
- [Job scheduler in Fabric](../fundamentals/job-scheduler.md)
- [Admin overview](microsoft-fabric-admin.md)
