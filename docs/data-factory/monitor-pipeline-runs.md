---
title: How to monitor pipeline runs
description: Learn how to monitor pipeline runs.
ms.reviewer: jonburchel
ms.author: noelleli
author: n0elleli
ms.subservice: data-factory
ms.topic: how-to 
ms.date: 01/27/2023
---

# How to monitor data pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)] (Preview)

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this how-to guide, you'll learn the different ways to review and monitor your pipeline runs.

## Monitor data pipeline runs

1. To monitor your data pipeline runs, hover over your pipeline in your workspace. Doing so will bring up three dots to the right of your pipeline name.

   :::image type="content" lightbox="media/monitor-pipeline-runs/more-options-for-pipeline.png" source="media/monitor-pipeline-runs/more-options-for-pipeline.png" alt-text="Screenshot showing where to find more pipeline options.":::

2. Select the three dots to find a list of options. Then select **View run history**. This action opens a fly-out on the right side of your screen with all your recent runs and run statuses.

   :::image type="content" lightbox="media/monitor-pipeline-runs/pipeline-recent-runs.png" source="media/monitor-pipeline-runs/pipeline-recent-runs.png" alt-text="Screenshot showing where to select View run history.":::

   :::image type="content" lightbox="media/monitor-pipeline-runs/view-recent-pipeline-runs.png" source="media/monitor-pipeline-runs/view-recent-pipeline-runs.png" alt-text="Screenshot showing a recent run list.":::

3. Use the Filter to find specific data pipeline runs. You can filter on **Status** or on **End time**.

   :::image type="content" source="media/monitor-pipeline-runs/filter-recent-runs.png" alt-text="Screenshot of filter options.":::

4. Select one of your pipeline runs to view detailed information. You’ll be able to view what your pipeline looks like and view more properties like Run ID or errors if your pipeline run failed.

   :::image type="content" lightbox="media/monitor-pipeline-runs/view-recent-run-details.png" source="media/monitor-pipeline-runs/view-recent-run-details.png" alt-text="Screenshot showing where to select a run.":::

   :::image type="content" lightbox="media/monitor-pipeline-runs/view-recent-run-additional-details.png" source="media/monitor-pipeline-runs/view-recent-run-additional-details.png" alt-text="Screenshot of recent run details.":::

5. To find additional information on your pipeline runs **Input** and **Output**, hover over an activity row and select either the **Input** or **Output** icon. Details will be shown in a pop-up.

   :::image type="content" lightbox="media/monitor-pipeline-runs/view-input-output-details.png" source="media/monitor-pipeline-runs/view-input-output-details.png" alt-text="Screenshot showing how input and output options appear.":::

   :::image type="content" source="media/monitor-pipeline-runs/pipeline-input-details.png" alt-text="Screenshot of Input details.":::

6. To view performance details, hover over an activity row and select the glasses icon. Performance details will pop up.

   :::image type="content" lightbox="media/monitor-pipeline-runs/view-performance-details.png" source="media/monitor-pipeline-runs/view-performance-details.png" alt-text="Screenshot showing glasses icon.":::

   :::image type="content" lightbox="media/monitor-pipeline-runs/performance-details.png" source="media/monitor-pipeline-runs/performance-details.png" alt-text="Screenshot of Copy data details screen.":::

   More details can be found under **Duration breakdown** and **Advanced**.  

   :::image type="content" source="media/monitor-pipeline-runs/copy-data-details.png" alt-text="Screenshot of additional details for copy data run.":::

7. If your data pipeline failed, view the error message by hovering over the activity row and select the message icon under **Status**. This selection will bring up error details, such as the error code and message.

   :::image type="content" lightbox="media/monitor-pipeline-runs/failed-pipeline.png" source="media/monitor-pipeline-runs/failed-pipeline.png" alt-text="Screenshot showing where the failed status appears.":::

   :::image type="content" lightbox="media/monitor-pipeline-runs/error-details.png" source="media/monitor-pipeline-runs/error-details.png" alt-text="Screenshot of error details.":::

8. Select **Update pipeline** to make changes to your pipeline. This selection will land you back in the pipeline canvas.

   :::image type="content" lightbox="media/monitor-pipeline-runs/update-pipeline-on-canvas.png" source="media/monitor-pipeline-runs/update-pipeline-on-canvas.png" alt-text="Screenshot showing where to select Update pipeline.":::

9. You can also **Rerun** your data pipeline. You can choose to rerun the entire pipeline or only rerun the pipeline from the failed activity.  

   :::image type="content" lightbox="media/monitor-pipeline-runs/rerun.png" source="media/monitor-pipeline-runs/rerun.png" alt-text="Screenshot showing where to select Rerun.":::

   :::image type="content" lightbox="media/monitor-pipeline-runs/rerun-menu.png" source="media/monitor-pipeline-runs/rerun-menu.png" alt-text="Screenshot showing Rerun menu options.":::

## Gantt view

A Gantt chart is a view that lets you see the run history over a time range. If you switch to a Gantt view, all pipeline runs will be grouped by name, displayed as bars relative to how long the run took.

:::image type="content" lightbox="media/monitor-pipeline-runs/gantt-view.png" source="media/monitor-pipeline-runs/gantt-view.png" alt-text="Screenshot showing where to switch between views.":::

The length of the bar relates to the duration of the pipeline. You can select the bar to view more details.

:::image type="content" lightbox="media/monitor-pipeline-runs/gantt-view-displayed.png" source="media/monitor-pipeline-runs/gantt-view-displayed.png" alt-text="Screenshot of Gantt view showing different bar lengths.":::

:::image type="content" source="media/monitor-pipeline-runs/gantt-view-bar-details.png" alt-text="Screenshot of pipeline run details from Gantt view.":::

## Next steps

- [Quickstart: Create your first data pipeline to copy data (Preview)](create-first-pipeline-with-sample-data.md)
- [Quickstart: Create your first Dataflows Gen2 to get and transform data (Preview)](create-first-dataflow-gen2.md)
