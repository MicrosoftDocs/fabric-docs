---
title: Monitoring and telemetry overview for Graph in Microsoft Fabric
description: Learn about monitoring and telemetry for Graph in Microsoft Fabric.
ms.topic: how-to
ms.date: 01/22/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
---

# Monitoring and telemetry for Graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Monitoring and telemetry for Graph in Microsoft Fabric follows the existing Fabric-wide telemetry framework. This data enables administrators and users to troubleshoot issues and optimize resource usage.

## Accessing monitoring data

You can use the [Monitoring hub](/fabric/admin/monitoring-hub) to track activities, view historical activity, and gain insights into the performance and usage of your Graph workloads.

To access monitoring data, select **Monitor** in Fabric's navigation pane.

Graph items are workspace-scoped (each Graph belongs to a specific workspace), but the Monitoring Hub aggregates visibility based on your role and permissions. This means you don't need to navigate workspace-by-workspace to monitor your Graph workloads. They're all visible in the centralized Monitoring Hub, filtered by what you're authorized to see.

Here is an example of a graph that is undergoing refresh:

:::image type="content" source="./media/how-to/monitor-graph-status-in-progress.png" alt-text="Screenshot showing graph data refresh is in progress." lightbox="./media/how-to/monitor-graph-status-in-progress.png":::

In this screenshot, the refresh job is complete. Note that despite the "Succeeded" job status, the graph wouldn't have queryable data if you didn't configure the node types and edge types properly. 

:::image type="content" source="./media/how-to/monitor-graph-status-success.png" alt-text="Screenshot showing graph data refresh is successful." lightbox="./media/how-to/monitor-graph-status-success.png":::

## Related content

- [Graph overview](overview.md)
