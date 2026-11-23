---
title: Operations agent performance dashboard in Fabric
description: Use the operations agent performance dashboard in Fabric to monitor agent health, reliability, approvals, and failures over time and spot issues faster.
#customer intent: As a data operations engineer, I want to open the operations agent performance dashboard in Fabric, so that I can check whether my agent is healthy and running as expected.
ms.reviewer: tessahurr
ms.topic: how-to
ms.date: 09/16/2026
author: spelluru
ms.author: spelluru
ms.search.form: Operations Agent Performance Dashboard
ai-usage: ai-assisted
---

# Monitor operations agent performance with the dashboard in Fabric

Use the operations agent performance dashboard in Fabric Real-Time Intelligence to monitor an operations agent's health, activity, approval decisions, and errors over time. Open the dashboard to understand what each tile shows and spot issues faster.

## Prerequisites

Before you open the dashboard:

- Create and start an operations agent.
- Make sure that you can open the operations agent in Fabric.

## Why use the performance dashboard?

The operations agent performance dashboard provides a comprehensive view of an agent's activity, approvals, errors, and overall health. By using this dashboard, you can quickly identify trends, diagnose issues, and ensure that your operations agents are performing reliably.

Use the operations agent performance dashboard to get an at-a-glance view of overall agent health. Check whether the agent is running, completing operations, and encountering errors during the selected time range.

Compare activity, approvals, and failures in one place to distinguish operational reliability from the quality of the agent's recommendations. Spot trends quickly and diagnose issues faster when operations fail.

## Launch the performance dashboard

1. On the ribbon of the operations agent page, select **View performance**.

    :::image type="content" source="media/operations-agent-performance-dashboard/fabric-operations-agent-performance-dashboard-button.png" alt-text="Screenshot Operations Agent page with View performance on the ribbon selected." lightbox="media/operations-agent-performance-dashboard/fabric-operations-agent-performance-dashboard-button.png":::

1. At the top of the **View performance** page, open the **Time range** list, and then select the time window that you want to review. By default, the dashboard shows the last 24 hours. The dashboard refreshes to show metrics for the selected time range.

    :::image type="content" source="media/operations-agent-performance-dashboard/operations-agent-performance-dashboard-fabric.png" alt-text="Screenshot of the operations agent performance dashboard in Fabric showing agent health and reliability metrics." lightbox="media/operations-agent-performance-dashboard/operations-agent-performance-dashboard-fabric.png":::

## Tiles in the dashboard

The following table describes the tiles in the dashboard. 

| Tile | Description |
|------|-------------|
| Count of errors | Shows count of active errors. |
| Actions executed | Shows how many actions the operations agent executed. |
| Actions approval decisions | Shows the count of actions that are approved. |
| Error rate | Shows error rate over time. |
| Errors over time | Shows the total number of errors during the selected time range. |
| Volume of operations over time | Shows how many operations the agent created or ran during the selected time range. |

## Related content

- [Create and configure operations agents](operations-agent.md)
- [Operations agent actions](operations-agent-actions.md)
- [Operations agent best practices and limitations](operations-agent-limitations.md)
