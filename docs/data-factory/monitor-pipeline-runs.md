---
title: How to monitor pipeline runs
description: Learn how to monitor pipeline runs.
ms.reviewer: jonburchel
ms.author: noelleli
author: n0elleli
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# How to monitor data pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]

In this how-to guide, you'll learn the different ways to review and monitor your pipeline runs.

## Monitor data pipeline runs

1. To monitor your data pipeline runs, hover over your pipeline in your workspace. Doing so will bring up three dots to the right of your pipeline name.

   :::image type="content" source="media/monitor-pipeline-runs/more-options-for-pipeline.png" alt-text="Screenshot showing where to find more pipeline options.":::

1. Select the three dots to find a list of options. Then select **View run history**. This action opens a fly-out on the right side of your screen with all your recent runs and run statuses.

   :::image type="content" source="media/monitor-pipeline-runs/pipeline-recent-runs.png" alt-text="Screenshot showing where to select View run history.":::

   :::image type="content" source="media/monitor-pipeline-runs/view-recent-pipeline-runs.png" alt-text="Screenshot showing a recent run list.":::

1. Select **Go to monitoring hub** from the prior screenshot to view more details and filter results. Use the filter to find specific data pipeline runs based on several criteria.

   :::image type="content" source="media/monitor-pipeline-runs/filter-recent-runs.png" alt-text="Screenshot of filter options.":::

1. Select one of your pipeline runs to view detailed information. You’ll be able to view what your pipeline looks like and view more properties like Run ID or errors if your pipeline run failed.

   :::image type="content" source="media/monitor-pipeline-runs/view-recent-run-additional-details.png" alt-text="Screenshot of recent run details.":::

1. To find additional information on your pipeline runs **Input** and **Output**, select the input or output links to the right of the relevant row in the Activity Runs.

1. You can select **Update pipeline** to make changes to your pipeline from this screen. This selection will take you back in the pipeline canvas.

1. You can also **Rerun** your data pipeline. You can choose to rerun the entire pipeline or only rerun the pipeline from the failed activity.  

1. To view performance details, select an activity from the list of **Activity Runs**. Performance details will pop up.

   :::image type="content" source="media/monitor-pipeline-runs/performance-details.png" alt-text="Screenshot of Copy data details screen.":::

   More details can be found under **Duration breakdown** and **Advanced**.  

   :::image type="content" source="media/monitor-pipeline-runs/copy-data-details.png" alt-text="Screenshot of additional details for copy data run.":::

## Gantt view

A Gantt chart is a view that lets you see the run history over a time range. If you switch to a Gantt view, all pipeline runs will be grouped by name, displayed as bars relative to how long the run took.

:::image type="content" source="media/monitor-pipeline-runs/gantt-view.png" alt-text="Screenshot showing where to switch between views.":::

The length of the bar relates to the duration of the pipeline. You can select the bar to view more details.

:::image type="content" lightbox="media/monitor-pipeline-runs/gantt-view-displayed.png" source="media/monitor-pipeline-runs/gantt-view-displayed.png" alt-text="Screenshot of Gantt view showing different bar lengths.":::

:::image type="content" source="media/monitor-pipeline-runs/gantt-view-bar-details.png" alt-text="Screenshot of pipeline run details from Gantt view.":::

## Related content

- [Quickstart: Create your first data pipeline to copy data](create-first-pipeline-with-sample-data.md)
- [Quickstart: Create your first Dataflow Gen2 to get and transform data](create-first-dataflow-gen2.md)
