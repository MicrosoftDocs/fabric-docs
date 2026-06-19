---
title: Monitor pipeline runs
description: Learn how to track pipeline run progress, view run history, use Gantt view, and enable workspace monitoring in Microsoft Fabric Data Factory.
ms.reviewer: noelleli
ms.topic: how-to
ms.custom: pipelines, sfi-image-nochange
ms.date: 06/17/2026
ai-usage: ai-assisted
---

# Monitor pipeline runs in Fabric Data Factory

This article shows you how to monitor your pipeline runs. Whether you need to check how things are going or troubleshoot something specific, you can track progress, spot issues early, and keep workflows running smoothly. Monitoring helps you catch problems early and keep your workflows on track.

## Monitor pipeline runs

1. To monitor your pipeline runs, hover over your pipeline in your workspace. The **More options** (**...**) button appears to the right of your pipeline name.

   :::image type="content" source="media/monitor-pipeline-runs/more-options-for-pipeline.png" alt-text="Screenshot showing where to find more pipeline options.":::

1. Select **More options** (**...**) to display the list of options. Then select **View run history**. This action opens a fly-out on the right side of your screen with all your recent runs and run statuses.

   :::image type="content" source="media/monitor-pipeline-runs/pipeline-recent-runs.png" alt-text="Screenshot showing where to select View run history.":::

   :::image type="content" source="media/monitor-pipeline-runs/view-recent-pipeline-runs.png" alt-text="Screenshot showing a recent run list.":::

1. Select **Go to monitor** from the prior screenshot to view more details and filter results. Use the filter to find specific pipeline runs based on several criteria.

   :::image type="content" source="media/monitor-pipeline-runs/filter-recent-runs.png" alt-text="Screenshot of filter options.":::

1. Select one of your pipeline runs to view detailed information. You can view what your pipeline looks like and view more properties like Run ID or errors if your pipeline run failed.

   :::image type="content" source="media/monitor-pipeline-runs/view-recent-run-additional-details.png" alt-text="Screenshot of recent run details.":::

1. If you have more than 2,000 activity runs in your pipelines, select **Load more** to see more results in the same monitoring page. 

   :::image type="content" source="media/monitor-pipeline-runs/load-more.png" alt-text="Screenshot of activity runs with a load more text box highlighted.":::

   :::image type="content" source="media/monitor-pipeline-runs/full-activity-load.png" alt-text="Screenshot of all activity run details loaded.":::
   
1. Use **Filter** to filter by activity status, or **Column options** to change which columns appear in the monitoring view.

   :::image type="content" source="media/monitor-pipeline-runs/filter-options.png" alt-text="Screenshot of activity run filter options.":::

   :::image type="content" source="media/monitor-pipeline-runs/column-options.png" alt-text="Screenshot of column options.":::

   You can also search for an activity name, activity type, or activity run ID with the **Filter by keyword** box.

   :::image type="content" source="media/monitor-pipeline-runs/filter-by-keyword.png" alt-text="Screenshot of keyword filter box.":::

   :::image type="content" source="media/monitor-pipeline-runs/filter-by-keyword-results.png" alt-text="Screenshot of keyword filtering results.":::

1. To export your monitoring data, select **Export to CSV**.

   :::image type="content" source="media/monitor-pipeline-runs/export-to-csv.png" alt-text="Screenshot of the export to csv option.":::

1. To find more information on your pipeline run **Input** and **Output**, select the input or output links to the right of the relevant row under **Activity runs**.

1. Select **Update pipeline** to make changes to your pipeline from this screen. This action takes you back to the pipeline canvas.

1. Select **Rerun** to rerun your pipeline. Choose to rerun the entire pipeline, or to rerun only from the failed activity.

   :::image type="content" source="media/monitor-pipeline-runs/monitoring-hub-rerun-pipeline.png" alt-text="Screenshot showing rerun failed activity.":::

1. To view performance details, select an activity from the list of **Activity runs**. The performance details pane opens.

   :::image type="content" source="media/monitor-pipeline-runs/performance-details.png" alt-text="Screenshot of Copy data details screen.":::

   Find more details under **Duration breakdown** and **Advanced**.  

   :::image type="content" source="media/monitor-pipeline-runs/copy-data-details.png" alt-text="Screenshot of additional details for copy data run.":::

## Gantt view

The Gantt view provides a clear, visual way to track pipeline runs over time. Each run appears as a bar, grouped by pipeline name, and the length of the bar shows how long the run took. Use this view to spot patterns, compare durations, and identify delays, overlaps, or anomalies at a glance.

:::image type="content" source="media/monitor-pipeline-runs/gantt-view.png" alt-text="Screenshot showing where to switch between views.":::

The length of the bar represents the duration of the pipeline run. You can select the bar to view more details.

:::image type="content" lightbox="media/monitor-pipeline-runs/gantt-view-displayed.png" source="media/monitor-pipeline-runs/gantt-view-displayed.png" alt-text="Screenshot of Gantt view showing different bar lengths.":::

:::image type="content" source="media/monitor-pipeline-runs/gantt-view-bar-details.png" alt-text="Screenshot of pipeline run details from Gantt view.":::

## Workspace monitoring for pipelines

Workspace monitoring provides log-level visibility for all items in a workspace, including pipelines.

1. To enable workspace monitoring, go to **Workspace settings** in your Fabric workspace and select **Monitoring**.
   
1. Add a monitoring eventhouse and turn on **Log workspace activity**. Fabric creates a Kusto Query Language (KQL) database inside the eventhouse within your workspace for storing logs. 
   
   :::image type="content" source="media/monitor-pipeline-runs/workspace-monitoring-settings.png" alt-text="Screenshot of how to toggle on workspace monitoring.":::

1. Go to the KQL database that Fabric created. You can find it through the **Monitoring database** link in the monitoring settings, or directly in your workspace.

   :::image type="content" source="media/monitor-pipeline-runs/monitoring-kql-database.png" alt-text="Screenshot of items generated from workspace monitoring.":::

1. Within the KQL database, the **ItemJobEventLogs** table captures pipeline-level events that occur in your workspace (also called L1 monitoring). Logs include pipeline name, run status, timestamps, and system diagnostics.

   :::image type="content" source="media/monitor-pipeline-runs/workspace-monitoring-item-job-event-logs.png" alt-text="Screenshot of pipeline workspace monitoring table." lightbox="media\monitor-pipeline-runs\workspace-monitoring-item-job-event-logs.png":::

Use KQL queries in the monitoring eventhouse to analyze:

- Success and failure trends
- Performance metrics
- Error details for troubleshooting

## Monitor capacity utilization

Fabric capacity administrators can use the [Microsoft Fabric Capacity Metrics](../enterprise/metrics-app-install.md?tabs=1st) app to view capacity resources. This app shows how much CPU utilization, processing time, and memory pipelines, dataflows, and other items consume in capacity-enabled workspaces. Use it to identify overload causes, peak demand times, and the most resource-intensive items.

## Related content

- [Quickstart: Create your first pipeline to copy data](create-first-pipeline-with-sample-data.md)
- [Quickstart: Create your first Dataflow Gen2 to get and transform data](create-first-dataflow-gen2.md)
