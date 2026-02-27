---
title: Monitor Graph workloads in Microsoft Fabric
description: Learn how to monitor Graph workloads and troubleshoot issues in Microsoft Fabric using the Monitoring hub.
ms.topic: how-to
ms.date: 02/17/2026
ms.reviewer: wangwilliam
---

# Monitor Graph workloads in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This article shows you how to monitor your Graph workloads in Microsoft Fabric by using the [Monitoring hub](/fabric/admin/monitoring-hub). You can use monitoring data to track activities, view historical activity, and gain insights into the performance and usage of your Graph workloads. The data enables administrators and users to troubleshoot issues and optimize resource usage.

Graph in Microsoft Fabric follows the existing Fabric-wide telemetry framework. Graph items are workspace-scoped (each graph belongs to a specific workspace), but the Monitoring hub aggregates visibility based on your role and permissions. You don't need to navigate workspace-by-workspace to monitor your Graph workloads. They're all visible in the centralized Monitoring hub, filtered by what you're authorized to see.

## Access monitoring data

To access monitoring data, follow these steps:

1. In [Microsoft Fabric](https://fabric.microsoft.com/), select **Monitor** in the navigation pane to open the Monitoring hub.
1. In the Monitoring hub, locate your Graph activities. You can filter by **Item type**, **Status**, or **Location** to narrow the results.
1. Review the **Status** column to check the current state of your Graph refresh jobs.

   The following screenshot shows a graph refresh job that is in progress:

   :::image type="content" source="./media/how-to/monitor-graph-status-in-progress.png" alt-text="Screenshot showing graph data refresh is in progress." lightbox="./media/how-to/monitor-graph-status-in-progress.png":::

1. When the refresh finishes, the status updates to **Succeeded** or **Failed**.

   The following screenshot shows a completed refresh with a **Succeeded** status:

   :::image type="content" source="./media/how-to/monitor-graph-status-success.png" alt-text="Screenshot showing graph data refresh is successful." lightbox="./media/how-to/monitor-graph-status-success.png":::

## Interpret monitoring results

The Monitoring hub displays the following status values for Graph refresh jobs:

| Status | Description |
| --- | --- |
| **In Progress** | The graph is actively loading data from OneLake and constructing the queryable graph. |
| **Succeeded** | The refresh completed successfully. The graph is ready for querying. |
| **Failed** | The refresh encountered an error. Check your node and edge type configurations. |

> [!IMPORTANT]
> A **Succeeded** status means the refresh job completed without errors, but the graph might not have queryable data if you didn't configure the node types and edge types properly. Verify your graph model configuration if queries return no results after a successful refresh.

## Troubleshoot common issues

If your Graph refresh fails or produces unexpected results, try the following steps:

- **Verify source data**: Confirm that the source tables in your lakehouse contain data and are accessible.
- **Check node and edge configurations**: Ensure that the mapping tables, ID columns, and foreign key columns are configured correctly in your graph model.
- **Review permissions**: Confirm that you have the appropriate workspace permissions to access the underlying lakehouse data.
- **Reload the graph**: Select **Save** in the graph model editor to reload the graph and apply any changes to the model or underlying data.

## Related content

- [Graph overview](overview.md)
- [Monitoring hub](/fabric/admin/monitoring-hub)
- [Troubleshooting and FAQ](troubleshooting-and-faq.md)
