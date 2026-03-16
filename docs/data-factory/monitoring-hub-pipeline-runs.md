---
title: How to monitor pipeline runs in Monitoring hub
description: Learn how to monitor pipeline runs from the Monitoring hub.
ms.reviewer: chugu
ms.topic: how-to
ms.custom: pipelines, sfi-image-nochange
ms.date: 11/15/2023
---

# Browse pipeline runs in the Monitoring hub

The Monitoring hub serves as a centralized portal for browsing pipeline runs across items, when you are in the **Data Factory** or **Data Engineering** experience.

## Access the monitoring hub

In the **Data Factory** or **Data Engineering** experience, you can access the Monitoring hub to view various pipeline runs by selecting **Monitoring hub** in the left-side navigation links.

   :::image type="content" lightbox="media/monitoring-hub-pipeline-runs/pipeline-access-monitoring-hub.png" source="media/monitoring-hub-pipeline-runs/pipeline-access-monitoring-hub.png" alt-text="Screenshot showing where to find monitoring hub.":::

## Sort, search, and filter pipeline runs

For better usability and discoverability, you can sort the pipeline runs by selecting different columns in the UI. You can also filter the pipeline runs based on different columns and search for specific pipeline runs.

### Sort pipeline runs

To sort pipeline runs, you can select on each column header, such as **Name**, **Status**, **Item type**, **Start time**, **Location** , **Run kind**, and so on.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-sort.png" alt-text="Screenshot showing the sort pipelines." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-sort.png":::

### Filter pipeline runs

You can filter pipeline runs by **Status**, **Item Type**, **Start Time**, **Submitter**, and **Location** using the Filter pane in the upper-right corner.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-filter.png" alt-text="Screenshot showing the filter pipelines." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-filter.png":::

### Search pipeline runs

To search for specific pipelines, you can enter certain keywords in the search box located in the upper-right corner.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-search.png" alt-text="Screenshot showing the search pipelines." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-search.png":::

## Manage a pipeline run

When you hover over a pipeline run row, you can see various row-level actions that enable you to manage a particular pipeline run.

### View pipeline run detail pane

You can hover over a pipeline run row and select the **View detail** icon to open the **Detail** pane and view more details about a pipeline run.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-detail-pane.png" alt-text="Screenshot showing the pipeline run detail pane." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-detail-pane.png":::

## Navigate to pipeline run detail view

If you need more information about detail activity runs of the pipeline run, you can select on the name of a pipeline run to navigate to its corresponding pipeline run detail page.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-level-two-status.png" alt-text="Screenshot showing a pipeline run level 2 status." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-level-two-status.png":::

### Retry a pipeline run

If you need to retry a completed pipeline run, hover over its row inside of Monitoring Hub and select the **Retry** icon.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-retry.png" alt-text="Screenshot showing the retry a pipeline run." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-retry.png":::

Inside of the pipeline run detail view, you can navigate to a specific pipeline and identify an activity within that pipeline. Here, you'll be able to rerun your pipeline by failed activity or the selected activity.
:::image type="content" source="media\monitoring-hub-pipeline-runs\monitoring-hub-rerun-pipeline.png" alt-text="Screenshot showing the retry a pipeline run by failed activity." lightbox="media\monitoring-hub-pipeline-runs\monitoring-hub-rerun-pipeline.png":::

## Related content

- [Quickstart: Create your first pipeline to copy data](create-first-pipeline-with-sample-data.md)
- [Quickstart: Create your first Dataflow Gen2 to get and transform data](create-first-dataflow-gen2.md)
