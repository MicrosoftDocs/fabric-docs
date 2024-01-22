---
title: How to monitor pipeline runs in Monitoring hub
description: Learn how to monitor pipeline runs from the Monitoring hub.
ms.reviewer: jonburchel
ms.author: chugu
author: chugugrace
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Browse data pipeline runs in the Monitoring hub

The Monitoring hub serves as a centralized portal for browsing data pipeline runs across items, when you are in the **Data Factory** or **Data Engineering** experience.

## Access the monitoring hub

In the **Data Factory** or **Data Engineering** experience, you can access the Monitoring hub to view various data pipeline runs by selecting **Monitoring hub** in the left-side navigation links.

   :::image type="content" lightbox="media/monitoring-hub-pipeline-runs/pipeline-access-monitoring-hub.png" source="media/monitoring-hub-pipeline-runs/pipeline-access-monitoring-hub.png" alt-text="Screenshot showing where to find monitoring hub.":::

## Sort, search and filter data pipeline runs

For better usability and discoverability, you can sort the data pipeline runs by selecting different columns in the UI. You can also filter the pipeline runs based on different columns and search for specific pipeline runs.

### Sort data pipeline runs

To sort data pipeline runs, you can select on each column header, such as **Name**, **Status**, **Item type**, **Start time**, **Location** , **Run kind**, and so on.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-sort.png" alt-text="Screenshot showing the sort data pipelines." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-sort.png":::

### Filter data pipeline runs

You can filter data pipeline runs by **Status**, **Item Type**, **Start Time**, **Submitter**, and **Location** using the Filter pane in the upper-right corner.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-filter.png" alt-text="Screenshot showing the filter data pipelines." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-filter.png":::

### Search data pipeline runs

To search for specific data pipelines, you can enter certain keywords in the search box located in the upper-right corner.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-search.png" alt-text="Screenshot showing the search data pipelines." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-search.png":::

## Manage a data pipeline run

When you hover over a data pipeline run row, you can see various row-level actions that enable you to manage a particular data pipeline run.

### View data pipeline run detail pane

You can hover over a data pipeline run row and click the **View detail** icon to open the **Detail** pane and view more details about a data pipeline run.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-detail-pane.png" alt-text="Screenshot showing the data pipeline run detail pane." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-detail-pane.png":::

### Retry a data pipeline run

If you need to retry a completed data pipeline run, hover over its row and click the **Retry** icon.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-retry.png" alt-text="Screenshot showing the retry a data pipeline run." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-retry.png":::

## Navigate to data pipeline run detail view

If you need more information about detail activity runs of the data pipeline run, you can click on the name of a data pipeline run to navigate to its corresponding data pipeline run detail page.

:::image type="content" source="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-level-two-status.png" alt-text="Screenshot showing a data pipeline run level two status." lightbox="media\monitoring-hub-pipeline-runs\pipeline-monitoring-hub-level-two-status.png":::

## Related content

- [Quickstart: Create your first data pipeline to copy data](create-first-pipeline-with-sample-data.md)
- [Quickstart: Create your first Dataflow Gen2 to get and transform data](create-first-dataflow-gen2.md)
