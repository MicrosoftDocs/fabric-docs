---
title: Monitor Spark job definition
description: Learn how to monitor the progress and status of a running Spark job definition, and how to view the status and duration of previous runs.
author: jejiang
ms.author: jejiang
ms.topic: overview
ms.date: 05/23/2023
ms.custom:
  - template-howto
  - build-2023
  - ignite-2023
ms.search.form: Monitor Spark job definitions
---

# Monitor your Apache Spark job definition

Using the Spark job definition item's inline monitoring, you can track the following:

* Monitor the progress and status of a running Spark job definition.
* View the status and duration of previous Spark job definition runs.

You can get this information from the **Recent Runs** contextual menu in the workspace or by browsing the Spark job definition activities in the monitoring hub.

## Spark job definition inline monitoring

The Spark job definition inline monitoring feature allows you to view Spark job definition submission and run status in real-time. You can also view the Spark job definition's past runs and configurations and navigate to the **Spark application detail** page to view more details.

:::image type="content" source="media\monitor-spark-job-definitions\spark-job-definition-inline-monitoring.png" alt-text="Screenshot showing the spark job definition inline monitoring." lightbox="media\monitor-spark-job-definitions\spark-job-definition-inline-monitoring.png":::

## Spark job definition item view in workspace

You can access the job runs associated with specific Spark job definition items by using the **Recent run** contextual menu on the workspace homepage.

:::image type="content" source="media\monitor-spark-job-definitions\spark-job-definition-artifact-view-in-workspace.png" alt-text="Screenshot showing the spark job definition item view in workspace." lightbox="media\monitor-spark-job-definitions\spark-job-definition-artifact-view-in-workspace.png":::

## Spark job definition runs in the Monitoring hub

To view all the Spark applications related to a Spark job definition, go to the **Monitoring hub**.  Sort or filter the **Item Type** column to view all the run activities associated with the Spark job definitions.

:::image type="content" source="media\monitor-spark-job-definitions\spark-job-definition-runs-in-monitoring-hub.png" alt-text="Screenshot showing the spark job definition runs in Monitoring hub." lightbox="media\monitor-spark-job-definitions\spark-job-definition-runs-in-monitoring-hub.png":::

## Related content

The next step after viewing the details of an Apache Spark application is to view Spark job progress below the Notebook cell. You can refer to

* [Spark application detail monitoring](spark-detail-monitoring.md)
