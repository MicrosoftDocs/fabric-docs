---
title: Monitor Apache Spark Applications Resource Utilization
description: Learn how to monitor Apache Spark applications using resource utilization.
ms.reviewer: jejiang
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.date: 12/31/2024
ms.search.form: Monitor Spark application using resource utilization
---


# Monitor Apache Spark applications resource utilization

The executor usage graph under the Resources tab visualizes the allocation and utilization of Spark executors for the current Spark application in near real-time during Spark execution. The graph also provides an interactive experience, allowing you to view Spark jobs and tasks by clicking on running executors at a given moment. Currently, only Spark runtime version 3.4 and above support this feature.  

## Resources tab

Click on the **Resources** tab to access a graph featuring four distinct line graphs, each depicting a different executor status: **Running**, **Idled**, **Allocated**, and **Maximum instances**. 

 :::image type="content" source="media\spark-detail-monitoring\monitoring-resource-usage.png" alt-text="Screenshot showing the monitoring resource usage." lightbox="media\spark-detail-monitoring\monitoring-resource-usage.png":::

- **Running**: This shows the actual number of cores used by the Spark application to run Spark jobs and tasks. 

- **Idled**: This represents the number of cores that are available but unused while the Spark application is running. 

- **Allocated**: This refers to the cores allocated during the operation of the Spark application. 

- **Maximum Instances**: This indicates the maximum number of cores that can be allocated to the Spark application. 

Toggle the color legend to select or deselect the corresponding graph in the resource utilization chart.

 :::image type="content" source="media\spark-detail-monitoring\graph-select-chart.png" alt-text="Screenshot showing the graph select chart." lightbox="media\spark-detail-monitoring\graph-select-chart.png":::    

The resource utilization graph is interactive. When you hover your mouse over the running executor cores graph, a summary of the cores and corresponding executor information will appear. Clicking on a point in the running executor core line will display detailed information about the respective executor and job at that specific moment, shown at the bottom of the graph.  

 :::image type="content" source="media\spark-detail-monitoring\running-executor-core-allocation-details.png" alt-text="Screenshot showing the running executor core allocation details." lightbox="media\spark-detail-monitoring\running-executor-core-allocation-details.png":::

> [!NOTE]
>
> In some cases, at certain time points, the number of tasks may exceed the capacity of the executor cores (i.e., task numbers > total executor cores / spark.task.cpus). This is expected, as there could be a time gap between a task being marked as running and its actual execution on an executor core. Therefore, some tasks may appear as running, but they are not actively running on any core. 


## Related content

For an overview of Fabric Spark monitoring, Spark application monitoring, and Notebook contextual monitoring, you can refer to: 

- [Apache Spark monitoring overview](spark-monitoring-overview.md)
- [Apache Spark application detail monitoring](spark-detail-monitoring.md)
- [Notebook contextual monitoring and debugging](spark-monitor-debug.md)
