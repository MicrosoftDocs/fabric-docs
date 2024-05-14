---
title: Monitor run series
description: The Spark run series categorizes your Spark applications based on recurring pipeline activities, manual notebook runs, or Spark job runs.
author: jejiang
ms.author: jejiang
ms.topic: overview 
ms.date: 05/08/2024
ms.custom:  template-howto
ms.search.form: Monitor run series
---

# Monitor run series

The Spark run series automatically classifies the following into respective run series:

* Your Spark applications from your recurring pipeline activities, or manual notebook runs. 
* Spark job runs from the same notebook or Spark job definition into respective run series. 

The run series feature visually represents the duration trend for each Spark application instance along with the corresponding data input and output trendline for Spark applications. It also auto-scans the run series and detects whether there are any anomalous Spark application runs. This feature enables you to view details for a particular Spark application.

## Access the monitor run series feature

You can access the monitor run series feature from the **Monitoring hub's historical view**:

1. Open the Microsoft Fabric portal and go to **Monitoring hub** menu.
2. Open your Spark job definition or notebook and expand its **More options** drop-down list and then select **Historical runs**.
3. Select the job you want to view and expand **More options**, then select **Monitor run series**.

    :::image type="content" source="media\apache-spark-monitor-run-series\access-run-series-from-historica-view.png" alt-text="Screenshot showing access run series from historica view." lightbox="media\apache-spark-monitor-run-series\access-run-series-from-historica-view.png" border="true":::

You can access the monitor run series feature from the notebook or spark job definition's **Recent runs** panel:

1. Open the Microsoft Fabric homepage and select a workspace where you want to view the job.
2. Selecting **Spark job definition** or **Notebook item context** menu shows the recent run option.
3. Select **Recent runs**.
4. select an application and expand its **More options** drop-down list and then select **Monitor run series**.

    :::image type="content" source="media\apache-spark-monitor-run-series\access-run-series-from-recent-run.png" alt-text="Screenshot showing access run series from recent run." lightbox="media\apache-spark-monitor-run-series\access-run-series-from-recent-run.png" border="true":::

You can access the monitor run series feature from the spark application **Monitoring detail** page:

1. Go to the Apache Spark application monitoring details page.
2. Select the **Monitor run series** option.

    :::image type="content" source="media\apache-spark-monitor-run-series\access-run-series-from-monitoring-details.png" alt-text="Screenshot showing access run series from the spark application monitoring detail page." lightbox="media\apache-spark-monitor-run-series\access-run-series-from-monitoring-details.png" border="true":::

## View spark application performance

In the **Spark runs** graph, you can view the duration trend of this run series. Each vertical bar represents an instance of the Notebook/Spark job definition activity run, and its height indicates the run duration. You can also click on each running instance to view more detailed information and zoom in or out on specific time windows.
    
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
