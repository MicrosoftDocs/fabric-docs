---
title: Monitor Pipeline Runs in the Legacy Monitoring Hub
description: Learn how to monitor pipeline runs from the legacy Monitoring hub experience in Microsoft Fabric Data Factory.
ms.reviewer: chugu
ms.topic: how-to
ms.custom: pipelines, sfi-image-nochange
ms.date: 09/02/2026
ai-usage: ai-assisted
---

# Monitor pipeline runs in the legacy Monitoring hub

The legacy Monitoring hub provides a centralized place to browse and manage pipeline runs across Fabric items. Use it to find runs, inspect activity details, export monitoring data, view execution relationships, and rerun pipelines.

> [!IMPORTANT]
> This article describes the legacy Monitoring hub experience. To use the preview experience, see [Monitor pipeline runs in the new Monitoring hub (preview)](monitor-pipeline-runs-new-monitoring-hub.md).

## Access the legacy Monitoring hub

You can open the legacy Monitoring hub from the Fabric navigation or from a pipeline in your workspace.

### Open the legacy Monitoring hub from the navigation

In the **Data Factory** or **Data Engineering** experience, select **Monitoring hub** in the left navigation.

:::image type="content" lightbox="media/monitoring-hub-pipeline-runs/pipeline-access-monitoring-hub.png" source="media/monitoring-hub-pipeline-runs/pipeline-access-monitoring-hub.png" alt-text="Screenshot showing where to find Monitoring hub.":::

### Open pipeline run history from a workspace

1. In your workspace, hover over a pipeline, and then select **More options** (**...**).

   :::image type="content" source="media/monitor-pipeline-runs/more-options-for-pipeline.png" alt-text="Screenshot showing the More options button for a pipeline.":::

1. Select **View run history**. A pane opens with the pipeline's recent runs and run statuses.

   :::image type="content" source="media/monitor-pipeline-runs/pipeline-recent-runs.png" alt-text="Screenshot showing the View run history option for a pipeline.":::

   :::image type="content" source="media/monitor-pipeline-runs/view-recent-pipeline-runs.png" alt-text="Screenshot showing recent pipeline runs and their statuses.":::

1. Select **Go to monitor** to open the pipeline runs in the legacy Monitoring hub.

   :::image type="content" source="media/monitor-pipeline-runs/filter-recent-runs.png" alt-text="Screenshot showing pipeline runs in the legacy Monitoring hub.":::

## Find pipeline runs in the legacy Monitoring hub

In the legacy Monitoring hub, sort, filter, or search the run list to find specific pipeline runs.

### Sort pipeline runs

Select a column header, such as **Name**, **Status**, **Item type**, **Start time**, **Location**, or **Run kind**, to sort the pipeline runs.

:::image type="content" source="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-sort.png" alt-text="Screenshot showing pipeline runs sorted in the legacy Monitoring hub." lightbox="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-sort.png":::

### Filter pipeline runs

Use the **Filter** pane to filter pipeline runs by **Status**, **Item type**, **Start time**, **Submitter**, or **Location**.

:::image type="content" source="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-filter.png" alt-text="Screenshot showing filters for pipeline runs in the legacy Monitoring hub." lightbox="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-filter.png":::

### Search pipeline runs

Enter a pipeline name or keyword in the search box to find specific pipeline runs.

:::image type="content" source="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-search.png" alt-text="Screenshot showing the search box for pipeline runs in the legacy Monitoring hub." lightbox="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-search.png":::

## View pipeline run relationships in the legacy Monitoring hub

The hierarchical view shows upstream jobs that triggered a pipeline run and downstream jobs that the run triggered.

In **Column options**, turn on **Upstream run** and **Downstream runs**.

:::image type="content" source="media/monitoring-hub-pipeline-runs/hierarchical-view-column-options.png" alt-text="Screenshot showing the Upstream run and Downstream runs options selected in Column options." lightbox="media/monitoring-hub-pipeline-runs/hierarchical-view-column-options.png":::

After you apply the changes, the run list shows the upstream and downstream runs for each pipeline.

:::image type="content" source="media/monitoring-hub-pipeline-runs/hierarchical-view-pipelines.png" alt-text="Screenshot showing upstream and downstream pipeline runs in the legacy Monitoring hub." lightbox="media/monitoring-hub-pipeline-runs/hierarchical-view-pipelines.png":::

Job hierarchy describes execution relationships. It differs from the parent-child relationship between Fabric items that appears in the workspace view.

## View pipeline run details in the legacy Monitoring hub

Use the detail pane for a run summary, or open the run detail view to inspect activity runs and performance.

### View pipeline run detail pane

Hover over a pipeline run, and then select the **View detail** icon to open the **Detail** pane.

:::image type="content" source="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-detail-pane.png" alt-text="Screenshot showing the pipeline run detail pane in the legacy Monitoring hub." lightbox="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-detail-pane.png":::

### Open the pipeline run detail view

Select a pipeline run name to open its run detail view. The view shows the pipeline diagram, run ID, status, errors, and activity runs.

:::image type="content" source="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-level-two-status.png" alt-text="Screenshot showing activity-level status in the pipeline run detail view." lightbox="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-level-two-status.png":::

:::image type="content" source="media/monitor-pipeline-runs/view-recent-run-additional-details.png" alt-text="Screenshot showing details and properties for a pipeline run.":::

If the pipeline has more than 2,000 activity runs, select **Load more** to display additional results.

:::image type="content" source="media/monitor-pipeline-runs/load-more.png" alt-text="Screenshot showing the Load more option for pipeline activity runs.":::

:::image type="content" source="media/monitor-pipeline-runs/full-activity-load.png" alt-text="Screenshot showing the expanded list of pipeline activity runs.":::

### Filter and export activity runs

Use **Filter** to filter by activity status. Use **Column options** to choose which columns appear in the activity run list.

:::image type="content" source="media/monitor-pipeline-runs/filter-options.png" alt-text="Screenshot showing status filters for pipeline activity runs.":::

:::image type="content" source="media/monitor-pipeline-runs/column-options.png" alt-text="Screenshot showing column options for pipeline activity runs.":::

Use **Filter by keyword** to search for an activity name, activity type, or activity run ID.

:::image type="content" source="media/monitor-pipeline-runs/filter-by-keyword.png" alt-text="Screenshot showing the keyword filter for pipeline activity runs.":::

:::image type="content" source="media/monitor-pipeline-runs/filter-by-keyword-results.png" alt-text="Screenshot showing pipeline activity runs filtered by keyword.":::

To download the activity run data, select **Export to CSV**.

:::image type="content" source="media/monitor-pipeline-runs/export-to-csv.png" alt-text="Screenshot showing the Export to CSV option for pipeline activity runs.":::

### View activity input, output, and performance

Under **Activity runs**, select an input or output link to view the corresponding data for an activity run.

Select an activity to open its performance details. Review **Duration breakdown** and **Advanced** for more information.

:::image type="content" source="media/monitor-pipeline-runs/performance-details.png" alt-text="Screenshot showing performance details for a Copy data activity run.":::

:::image type="content" source="media/monitor-pipeline-runs/copy-data-details.png" alt-text="Screenshot showing duration and advanced details for a Copy data activity run.":::

To modify the pipeline, select **Update pipeline** to return to the pipeline editor.

## View pipeline runs as a Gantt chart

The Gantt view displays pipeline runs as bars grouped by pipeline name. The length of each bar represents the run duration. Use this view to compare durations and identify delays, overlaps, or anomalies.

:::image type="content" source="media/monitor-pipeline-runs/gantt-view.png" alt-text="Screenshot showing the option to open the Gantt view for pipeline runs.":::

Select a bar to view details for that pipeline run.

:::image type="content" lightbox="media/monitor-pipeline-runs/gantt-view-displayed.png" source="media/monitor-pipeline-runs/gantt-view-displayed.png" alt-text="Screenshot showing pipeline runs with different durations in the Gantt view.":::

:::image type="content" source="media/monitor-pipeline-runs/gantt-view-bar-details.png" alt-text="Screenshot showing details for a pipeline run selected in the Gantt view.":::

## Rerun a pipeline in the legacy Monitoring hub

To retry a completed pipeline run from the run list, hover over the run, and then select the **Retry** icon.

:::image type="content" source="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-retry.png" alt-text="Screenshot showing the Retry icon for a pipeline run in the legacy Monitoring hub." lightbox="media/monitoring-hub-pipeline-runs/pipeline-monitoring-hub-retry.png":::

From the pipeline run detail view, select **Rerun**. You can rerun the entire pipeline, start from the failed activity, or start from a selected activity.

:::image type="content" source="media/monitoring-hub-pipeline-runs/monitoring-hub-rerun-pipeline.png" alt-text="Screenshot showing options to rerun a pipeline from an activity in the legacy Monitoring hub." lightbox="media/monitoring-hub-pipeline-runs/monitoring-hub-rerun-pipeline.png":::

## Related content

- [Choose how to monitor pipeline runs in Fabric Data Factory](monitor-pipeline-runs.md)
- [Monitor pipeline runs in the new Monitoring hub (preview)](monitor-pipeline-runs-new-monitoring-hub.md)
- [Quickstart: Create your first pipeline to copy data](create-first-pipeline-with-sample-data.md)
