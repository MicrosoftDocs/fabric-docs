---
title: How to monitor pipeline runs
description: Learn how to monitor pipeline runs.
ms.reviewer: jonburchel
ms.author: noelleli
author: n0elleli
ms.topic: how-to 
ms.date: 01/27/2023
---

# How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)] (Preview)

In this how-to guide, you'll learn the different ways to review and monitor your pipeline runs.

## Monitor pipeline runs

1. To monitor your pipeline runs, hover over your pipeline in your workspace. Doing so will bring up three dots to the right of your pipeline name.

   :::image type="content" lightbox="media/monitor-pipeline-runs/more-options-for-pipeline-1.png" source="media/monitor-pipeline-runs/more-options-for-pipeline-1.png" alt-text="Screenshot showing where to find more pipeline options.":::

2. Click to find a list of options and select **View run history**. This will open a fly-out on the right side of your screen with all your recent runs and run statuses.

   :::image type="content" lightbox="media/monitor-pipeline-runs/pipeline-recent-runs-2.png" source="media/monitor-pipeline-runs/pipeline-recent-runs-2.png" alt-text="Screenshot showing where to select View run history.":::

   :::image type="content" lightbox="media/monitor-pipeline-runs/view-recent-pipeline-runs-3.png" source="media/monitor-pipeline-runs/view-recent-pipeline-runs-3.png" alt-text="Screenshot showing a recent run list.":::

3. Use the Filter to find specific pipeline runs. You can filter on Status or on End time.

   :::image type="content" source="media/monitor-pipeline-runs/filter-recent-runs-4.png" alt-text="Screenshot of filter options.":::

4. Select one of your pipeline runs to see detailed information. You’ll be able to see what your pipeline looks like and see more properties like Run ID or errors if your pipeline run failed.

   :::image type="content" lightbox="media/monitor-pipeline-runs/view-recent-run-details-5.png" source="media/monitor-pipeline-runs/view-recent-run-details-5.png" alt-text="Screenshot showing where to select a run.":::

   :::image type="content" lightbox="media/monitor-pipeline-runs/view-recent-run-additional-details-6.png" source="media/monitor-pipeline-runs/view-recent-run-additional-details-6.png" alt-text="Screenshot of recent run details.":::

5. To find additional information on your pipeline runs **Input** and **Output**, hover over an Activity row and click either the **Input** or **Output** icon. Details will be shown in a pop-up.

   :::image type="content" lightbox="media/monitor-pipeline-runs/view-input-output-details-7.png" source="media/monitor-pipeline-runs/view-input-output-details-7.png" alt-text="Screenshot showing how input and output options appear.":::

   :::image type="content" source="media/monitor-pipeline-runs/pipeline-input-details-8.png" alt-text="Screenshot of Input details.":::

6. To view performance details, hover over an Activity row and click on the glasses icon. Performance details will pop up.

   :::image type="content" lightbox="media/monitor-pipeline-runs/view-performance-details-9.png" source="media/monitor-pipeline-runs/view-performance-details-9.png" alt-text="Screenshot showing glasses icon.":::

   :::image type="content" lightbox="media/monitor-pipeline-runs/performance-details-10.png" source="media/monitor-pipeline-runs/performance-details-10.png" alt-text="Screenshot of Copy data details screen.":::

More details can be found under **Duration breakdown** and **Advanced**.  

:::image type="content" source="media/monitor-pipeline-runs/copy-data-details-11.png" alt-text="Screenshot of additional details for copy data run.":::

7. If your pipeline failed, view the error message by hovering over the Activity row and click the message icon under Status. This will bring up error details like the error code and message.

   :::image type="content" lightbox="media/monitor-pipeline-runs/failed-pipeline-12.png" source="media/monitor-pipeline-runs/failed-pipeline-12.png" alt-text="Screenshot showing where the failed status appears.":::

   :::image type="content" lightbox="media/monitor-pipeline-runs/error-details-13.png" source="media/monitor-pipeline-runs/error-details-13.png" alt-text="Screenshot of error details.":::

8. Click **Update pipeline** to make changes to our pipeline. This will land you back in the pipeline canvas.

   :::image type="content" lightbox="media/monitor-pipeline-runs/update-pipeline-on-canvas-14.png" source="media/monitor-pipeline-runs/update-pipeline-on-canvas-14.png" alt-text="Screenshot showing where to select Update pipeline.":::

9. You can also **Rerun** your pipeline. You can choose to rerun the entire pipeline or only rerun the pipeline from the failed activity.  

   :::image type="content" lightbox="media/monitor-pipeline-runs/rerun-15.png" source="media/monitor-pipeline-runs/rerun-15.png" alt-text="Screenshot showing where to select Rerun.":::

   :::image type="content" lightbox="media/monitor-pipeline-runs/rerun-menu-16.png" source="media/monitor-pipeline-runs/rerun-menu-16.png" alt-text="Screenshot showing Rerun menu options.":::

## Gantt view

A Gantt chart is a view that allows you to see the run history over a time range. By switching to a Gantt view, you'll see all pipeline runs grouped by name displayed as bars relative to how long the run took.

:::image type="content" lightbox="media/monitor-pipeline-runs/gantt-view-17.png" source="media/monitor-pipeline-runs/gantt-view-17.png" alt-text="Screenshot showing where to switch between views.":::

The length of the bar relates to the duration of the pipeline. You can select the bar to see more details.

:::image type="content" lightbox="media/monitor-pipeline-runs/gantt-view-displayed-18.png" source="media/monitor-pipeline-runs/gantt-view-displayed-18.png" alt-text="Screenshot of Gantt view showing different bar lengths.":::

:::image type="content" source="media/monitor-pipeline-runs/gantt-view-bar-details-19.png" alt-text="Screenshot of pipeline run details from Gantt view.":::

## Next steps

- [Quickstart: Create your first pipeline to copy data (Preview)](create-first-pipeline.md)
- [Quickstart: Create your first Dataflows Gen2 to get and transform data (Preview)](create-first-dataflow-gen2.md)
