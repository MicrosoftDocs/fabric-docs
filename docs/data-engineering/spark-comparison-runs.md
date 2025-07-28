---
title: Apache Spark applications comparison
description: This article introduces the Compare runs feature of Spark applications.
ms.reviewer: snehagunda
ms.author: jejiang
author: jejiang
ms.topic: how-to
ms.custom:
ms.date: 06/26/2025
ms.search.form: Apache Spark applications comparison
---

# Apache Spark applications comparison

This article introduces the Compare runs feature of Spark applications. By comparing the duration trend and data input or output trend for each Spark application instance, you can intuitively see how this run compares to the baseline run. 

## Access the compare run feature 

You can access the compare run feature from the [Monitor Run series](apache-spark-monitor-run-series.md#access-the-monitor-run-series-feature):

1. Go to the Monitor Run series page.
2. Switch to Compare runs tab.

:::image type="content" source="media\spark-comparison-runs\access-the-compare-run-feature.png" alt-text="Screenshot showing access the compare run feature." lightbox="media\spark-comparison-runs\access-the-compare-run-feature.png":::

View Spark application runs list. This list shows only the Spark application runs that are in the Completed state. The Spark applications in the Queued, Launching, Submitting, and Running states are filtered. 

By default, the run entered by the user from the Monitoring Center/Recent Runs panel is considered base run. The base run is a reference Spark application that serves as a baseline for comparing the performance and metrics of other Spark applications. Users can also clear all selections to re-label (select the flag icon button) the base run. You can select up to 4 runs to compare, this selection includes the base run. c

:::image type="content" source="media\spark-comparison-runs\view-spark-application-runs-list.png" alt-text="Screenshot showing view spark application runs list." lightbox="media\spark-comparison-runs\view-spark-application-runs-list.png":::


## View Compare Panel

In the compare panel, you can view the comparison of the performance and metrics of the base run Spark application and other Spark applications 

Once you have selected the runs for comparison, the Compare Panel provides a side-by-side visualization of key performance metrics. Here, you can examine variations in execution duration, input and output data volumes, and other important Spark application parameters. The panel highlights (Delta to the base run (delta %)) differences and trends, making it easier to identify regressions, improvements, or anomalies between runs. 

:::image type="content" source="media\spark-comparison-runs\compare-panel.png" alt-text="Screenshot showing compare panel." lightbox="media\spark-comparison-runs\compare-panel.png":::

For anomaly Spark applications run, potential cause is listed in the comparison list, and the activities that take the most time during the run are listed. 

:::image type="content" source="media\spark-comparison-runs\anomaly-spark-applications-run.png" alt-text="Screenshot showing anomaly spark applications run." lightbox="media\spark-comparison-runs\anomaly-spark-applications-run.png":::

## Related content

The next step after viewing the details of an Apache Spark application is to view **Spark job progress** below the Notebook cell. You can refer to:

- [Notebook contextual monitoring and debugging](spark-monitor-debug.md)
