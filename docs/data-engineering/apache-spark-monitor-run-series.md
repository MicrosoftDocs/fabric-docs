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

The Spark Run Series automatically classifies your Spark applications from your recurring Pipeline activities, or manual Notebook runs, or Spark Job runs from the same Notebook or Spark Job Definition into respective run series

## Access the monitor run series

You can access the monitor run series through the monitoring hub's historical view:

1. Open the Microsoft Fabric and go to monitoring hub page.
2. Select an **Spark job definition** \ **notebook** \ **pipeline** and expand its more options drop-down list, then click on **historical runs**.
3. Select the job you want to view and expand more options, then click on **monitor run series**.

:::image type="content" source="media\apache-spark-monitor-run-series\access-run-series-from-historica-view.png" alt-text="Screenshot showing access run series from historica view." lightbox="media\apache-spark-monitor-run-series\access-run-series-from-historica-view.png":::

You can access the monitor run series through the notebook or spark job definition's recent runs panel:

1. Open the Microsoft Fabric homepage and select a workspace where you want to view the job.
2. Selecting **Spark job definition** \ **notebook item context** \ **pipeline item context** menu shows the recent run option.
3. Select **Recent runs**.
4. select an application and expand its more options drop-down list, then click on **monitor run series**.

:::image type="content" source="media\apache-spark-monitor-run-series\access-run-series-from-recent-run.png" alt-text="Screenshot showing access run series from recent run." lightbox="media\apache-spark-monitor-run-series\access-run-series-from-recent-run.png":::

You can access the monitor run series from the spark application monitoring detail page:

1. Go to the Apache Spark application monitoring details page.
2. Click on **monitor run series** in page.

:::image type="content" source="media\apache-spark-monitor-run-series\access-run-series-from-monitoring-details.png" alt-text="Screenshot showing access run series from the spark application monitoring detail page." lightbox="media\apache-spark-monitor-run-series\access-run-series-from-monitoring-details.png":::


## Next steps

- [Run Series Analysis Overview](run-series-analyisis-overview.md)
- [Apache Spark monitoring overview](spark-monitoring-overview.md)
- [Browse item’s recent runs](spark-item-recent-runs.md)
- [Monitor Apache Spark jobs within notebooks](spark-monitor-debug.md)
- [Monitor Apache Spark job definition](monitor-spark-job-definitions.md)
- [Monitor Apache Spark application details](spark-detail-monitoring.md)
