---
title: How to monitor pipeline runs
description: Learn how to monitor pipeline runs.
ms.reviewer: noelleli
ms.topic: how-to
ms.custom: pipelines, sfi-image-nochange
ms.date: 12/18/2024
---

# How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]

This guide walks you through ways to check in on your pipeline runs, or monitor your pipeline runs. Whether you're just curious about how things are going or need to troubleshoot something specific, we’ll show you how to track progress, spot issues early, and make sure everything’s running smoothly. Monitoring helps you stay in control so that you can catch problems before they grow and keep your workflows on track.

## Monitor pipeline runs

1. To monitor your pipeline runs, hover over your pipeline in your workspace. Doing so brings up three dots to the right of your pipeline name.

   :::image type="content" source="media/monitor-pipeline-runs/more-options-for-pipeline.png" alt-text="Screenshot showing where to find more pipeline options.":::

2. Select the three dots to find a list of options. Then select **View run history**. This action opens a fly-out on the right side of your screen with all your recent runs and run statuses.

   :::image type="content" source="media/monitor-pipeline-runs/pipeline-recent-runs.png" alt-text="Screenshot showing where to select View run history.":::

   :::image type="content" source="media/monitor-pipeline-runs/view-recent-pipeline-runs.png" alt-text="Screenshot showing a recent run list.":::

3. Select **Go to monitoring hub** from the prior screenshot to view more details and filter results. Use the filter to find specific pipeline runs based on several criteria.

   :::image type="content" source="media/monitor-pipeline-runs/filter-recent-runs.png" alt-text="Screenshot of filter options.":::

4. Select one of your pipeline runs to view detailed information. You're able to view what your pipeline looks like and view more properties like Run ID or errors if your pipeline run failed.

   :::image type="content" source="media/monitor-pipeline-runs/view-recent-run-additional-details.png" alt-text="Screenshot of recent run details.":::

5. If you have greater than 2000 activity runs in your pipelines, select **Load more** to see more results in the same monitoring page. 

   :::image type="content" source="media/monitor-pipeline-runs/load-more.png" alt-text="Screenshot of activity runs with a load more text box highlighted.":::

   :::image type="content" source="media/monitor-pipeline-runs/full-activity-load.png" alt-text="Screenshot of all activity run details loaded.":::
   
6. Use the **Filter** to filter by activity status or **Column Options** to edit the columns viewed in the monitoring view.

   :::image type="content" source="media/monitor-pipeline-runs/filter-options.png" alt-text="Screenshot of activity run filter options.":::

   :::image type="content" source="media/monitor-pipeline-runs/column-options.png" alt-text="Screenshot of column options.":::

   You can also search for an activity name, activity type, or activity run ID with the **Filter by keyword** box.

   :::image type="content" source="media/monitor-pipeline-runs/filter-by-keyword.png" alt-text="Screenshot of keyword filter box.":::

   :::image type="content" source="media/monitor-pipeline-runs/filter-by-keyword-results.png" alt-text="Screenshot of keyword filtering results.":::

7. If you want to export your monitoring data, select **Export to CSV**.

   :::image type="content" source="media/monitor-pipeline-runs/export-to-csv.png" alt-text="Screenshot of the export to csv option.":::

8. To find additional information on your pipeline runs **Input** and **Output**, select the input or output links to the right of the relevant row in the Activity Runs.

9. You can select **Update pipeline** to make changes to your pipeline from this screen. This selection takes you back to the pipeline canvas.

10. You can also **Rerun** your pipeline. You can choose to rerun the entire pipeline or only rerun the pipeline from the failed activity.

   :::image type="content" source="media/monitor-pipeline-runs/monitoring-hub-rerun-pipeline.png" alt-text="Screenshot showing rerun failed activity.":::

11. To view performance details, select an activity from the list of **Activity Runs**. Performance details pop up.

   :::image type="content" source="media/monitor-pipeline-runs/performance-details.png" alt-text="Screenshot of Copy data details screen.":::

   More details can be found under **Duration breakdown** and **Advanced**.  

   :::image type="content" source="media/monitor-pipeline-runs/copy-data-details.png" alt-text="Screenshot of additional details for copy data run.":::

## Gantt view

Switching to the Gantt view gives you a clear, visual way to track your pipeline runs over time. Each run shows up as a bar, grouped by pipeline name, and the length of the bar shows how long the run took. It’s a great way to spot patterns, compare durations, and quickly see what’s running when. This view makes monitoring easier so that you can catch delays, overlaps, or anything unusual at a glance.

:::image type="content" source="media/monitor-pipeline-runs/gantt-view.png" alt-text="Screenshot showing where to switch between views.":::

The length of the bar relates to the duration of the pipeline. You can select the bar to view more details.

:::image type="content" lightbox="media/monitor-pipeline-runs/gantt-view-displayed.png" source="media/monitor-pipeline-runs/gantt-view-displayed.png" alt-text="Screenshot of Gantt view showing different bar lengths.":::

:::image type="content" source="media/monitor-pipeline-runs/gantt-view-bar-details.png" alt-text="Screenshot of pipeline run details from Gantt view.":::

## Workspace monitoring for pipelines

Workspace Monitoring provides log-level visibility for all items in a workspace, including pipelines.

1. To enable Workspace Monitoring, go to **Workspace Settings** in your Fabric Workspace and select **Monitoring**.
   
1. Add a Monitoring Eventhouse and turning on **Log workspace activity**. Fabric creates a KQL database inside the Eventhouse within your workspace for storing logs. 
   
   :::image type="content" source="media/monitor-pipeline-runs/workspace-monitoring-settings.png" alt-text="Screenshot of how to toggle on workspace monitoring.":::

1. Navigate to the KQL database created. You can find this in the **Monitoring database** link within the Monitoring settings or find the database within your workspace.

   :::image type="content" source="media/monitor-pipeline-runs/monitoring-kql-database.png" alt-text="Screenshot of items generated from workspace monitoring.":::

1. Within the KQL database, the **ItemJobEventLogs** table captures pipeline-level events that occur in your workspace (we call this L1 monitoring). Logs include pipeline name, run status, timestamps, and system diagnostics.

   :::image type="content" source="media/monitor-pipeline-runs/workspace-monitoring-item-job-event-logs.png" alt-text="Screenshot of pipeline workspace monitoring table." lightbox="media\monitor-pipeline-runs\workspace-monitoring-item-job-event-logs.png":::

Use KQL queries in the Monitoring Eventhouse to analyze:
- Success/failure trends
- Performance metrics
- Error details for troubleshooting

## Related content

- [Quickstart: Create your first pipeline to copy data](create-first-pipeline-with-sample-data.md)
- [Quickstart: Create your first Dataflow Gen2 to get and transform data](create-first-dataflow-gen2.md)
