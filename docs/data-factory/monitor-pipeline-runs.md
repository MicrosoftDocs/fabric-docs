---
title: Choose How to Monitor Pipeline Runs
description: Compare options for monitoring pipeline runs, viewing run history, analyzing logs, creating alerts, and investigating failures in Microsoft Fabric Data Factory.
ms.reviewer: noelleli
ms.topic: concept-article
ms.custom: pipelines, sfi-image-nochange
ms.date: 06/17/2026
ai-usage: ai-assisted
---

# Choose how to monitor pipeline runs in Fabric Data Factory

Fabric Data Factory provides several ways to monitor pipeline runs. Choose an option based on whether you need to inspect current runs, analyze historical logs, receive alerts, investigate failures, or review capacity use.

## Compare pipeline monitoring options

| Monitoring option | Use this option when you need to | Learn more |
| --- | --- | --- |
| New Monitoring hub (preview) | Monitor pipeline health across workspaces, inspect run history and execution relationships, manage alerts, or investigate failures in the new experience. | [Monitor pipeline runs in the new Monitoring hub (preview)](monitor-pipeline-runs-new-monitoring-hub.md) |
| Legacy Monitoring hub | Browse runs across items, open run history from a workspace, filter activity runs, export monitoring data, or rerun a pipeline in the legacy experience. | [Monitor pipeline runs in the legacy Monitoring hub](monitoring-hub-pipeline-runs.md) |
| Workspace monitoring | Store pipeline and activity-level execution logs in an eventhouse, query the logs with Kusto Query Language (KQL), or build custom reports across a workspace. | [Enable workspace monitoring](workspace-monitoring.md) |
| Pipeline run alerts | Receive notifications for pipeline or activity events and manage alerts in the new Monitoring hub. | [Create alerts for pipeline runs](create-alerts-for-pipeline-runs.md) |
| Operations agent for pipelines | Monitor pipeline health continuously in Microsoft Teams or investigate a failed run with AI-assisted analysis. | [Use the operations agent for pipelines](operations-agent-for-pipelines.md) |
| Microsoft Fabric Capacity Metrics app | Review pipeline capacity consumption, identify peak demand, and find resource-intensive items in capacity-enabled workspaces. | [Install the Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app-install.md?tabs=1st) |

## Related content

- [Quickstart: Create your first pipeline to copy data](create-first-pipeline-with-sample-data.md)
- [Quickstart: Create your first dataflow to get and transform data](create-first-dataflow-gen2.md)
