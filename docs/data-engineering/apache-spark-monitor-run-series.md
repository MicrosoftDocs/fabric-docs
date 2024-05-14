---
title: Run Series Job Analysis Public Preview 
description: The Spark Run Series automatically classifies your Spark applications from your recurring Pipeline activities, or manual Notebook runs, or Spark Job runs from the same Notebook or Spark Job Definition into respective run series
author: jejiang
ms.author: jejiang
ms.topic: overview 
ms.date: 05/08/2024
ms.custom:  template-howto
ms.search.form: Monitor run series
---

# Monitor run series

The Spark Run Series automatically classifies your Spark applications from your recurring Pipeline activities, or manual Notebook runs, or Spark Job runs from the same Notebook or Spark Job Definition into respective run series. The Run Series feature visualizes the duration trend for each Spark application instance, along with the corresponding data input and output trendline for Spark applications in the run series. It also auto-scans the run series and detects whether there are any anomalous Spark application runs. This feature enables you to view details for a particular Spark application.

## Access the monitor run series

You can access the monitor run series from the **monitoring hub's historical view**:

1. Open the Microsoft Fabric and go to monitoring hub page.
2. Select an **Spark job definition** \ **notebook** and expand its more options drop-down list, then click on **historical runs**.
3. Select the job you want to view and expand more options, then click on **monitor run series**.

    :::image type="content" source="media\apache-spark-monitor-run-series\access-run-series-from-historica-view.png" alt-text="Screenshot showing access run series from historica view." lightbox="media\apache-spark-monitor-run-series\access-run-series-from-historica-view.png" border="true":::

You can access the monitor run series from the notebook or spark job definition's **recent runs** panel:

1. Open the Microsoft Fabric homepage and select a workspace where you want to view the job.
2. Selecting **Spark job definition** \ **notebook item context** menu shows the recent run option.
3. Select **Recent runs**.
4. select an application and expand its more options drop-down list, then click on **monitor run series**.

    :::image type="content" source="media\apache-spark-monitor-run-series\access-run-series-from-recent-run.png" alt-text="Screenshot showing access run series from recent run." lightbox="media\apache-spark-monitor-run-series\access-run-series-from-recent-run.png" border="true":::

You can access the monitor run series from the spark application **monitoring detail** page:

1. Go to the Apache Spark application monitoring details page.
2. Click on **monitor run series** in page.

    :::image type="content" source="media\apache-spark-monitor-run-series\access-run-series-from-monitoring-details.png" alt-text="Screenshot showing access run series from the spark application monitoring detail page." lightbox="media\apache-spark-monitor-run-series\access-run-series-from-monitoring-details.png" border="true":::

## View spark application performance

In the **Spark runns** graph, you can view the duration trend of this runn series. Each vertical bar represents an instance of the Notebook/Spark job definition activity run, and its height indicates the run duration. You can also click on each running instance to view more detailed information and zoom in or out on specific time windows.
    
:::image type="content" source="media\apache-spark-monitor-run-series\spark-running-graph.png" alt-text="Screenshot showing the spark running graph." lightbox="media\apache-spark-monitor-run-series\spark-running-graph.png" border="true":::

- Duration
- Duration(Anomaly)
- Read bytes
- Write bytes

Select the color icon to select or unselect the corresponding content in all graph.

:::image type="content" source="media\apache-spark-monitor-run-series\color-icon-to-select-or-unselect.png" alt-text="Screenshot showing the color icon to select or unselect." lightbox="media\apache-spark-monitor-run-series\color-icon-to-select-or-unselect.png" border="true":::

When you select an instance of the notebook/spark job definition activity run in the graph, the instance's **Duration time distribution**, **Executors execution distribution**, and **Spark configuration** are detailed at the bottom of the graph.

:::image type="content" source="media\apache-spark-monitor-run-series\selected-run.png" alt-text="Screenshot showing the selected run.png." lightbox="media\apache-spark-monitor-run-series\selected-run.png" border="true":::

If the bar is marked red, an exception has been detected for that run instance. You can view these information: **Total duration**, **Expected duration** and **Potential causes** for this instance in the Anomalies panel.

:::image type="content" source="media\apache-spark-monitor-run-series\anomalies-panel.png" alt-text="Screenshot showing the anomalies panel.png." lightbox="media\apache-spark-monitor-run-series\anomalies-panel.png" border="true":::


    


## Next steps

- [Run Series Analysis Overview](run-series-analyisis-overview.md)
- [Apache Spark monitoring overview](spark-monitoring-overview.md)
- [Browse item's recent runs](spark-item-recent-runs.md)
- [Monitor Apache Spark jobs within notebooks](spark-monitor-debug.md)
- [Monitor Apache Spark job definition](monitor-spark-job-definitions.md)
- [Monitor Apache Spark application details](spark-detail-monitoring.md)
