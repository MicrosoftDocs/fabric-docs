---
title: Apache Spark monitoring overview
description: Spark monitoring helps you monitor the status of applications in progress, browse past Spark activities, analyze and optimizing performance, and troubleshoot.
ms.reviewer: snehagunda
ms.author: jejiang
author: jejiang
ms.topic: overview
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: spark_job_definition
---

# Apache Spark monitoring overview

[!INCLUDE [product-name](../includes/product-name.md)] Spark monitoring is designed to offer a web-UI based experience with built-in rich capabilities for monitoring the progress and status of Spark applications in progress, browsing past Spark activities, analyzing and optimizing performance, and facilitating troubleshooting of failures. Multiple entry points are available for browsing, monitoring, and viewing Spark application details.

## Monitoring hub

The Monitoring Hub serves as a centralized portal for browsing Spark activities across items. At a glance, you can view in-progress Spark applications triggered from Notebooks, Spark Job Definitions, and Pipelines. You can also search and filter Spark applications based on different criteria and drill down to view more Spark execution details of a Spark application.

## Item recent runs

When working on specific items, the item Recent Runs feature allows you to browse the item's current and recent activities and gain insights on the submitter, status, duration, and other information for activities submitted by you or others.

## Notebook contextual monitoring

Notebook Contextual Monitoring offers the capability of authoring, monitoring, and debugging Spark jobs within a single place. You can monitor Spark job progress, view Spark execution tasks and executors, and access Spark logs within a Notebook at the Notebook cell level. The Spark advisor is also built into Notebook to offer real-time advice on code and cell Spark execution and perform error analysis.

## Spark job definition inline monitoring

The Spark job definition Inline Monitoring feature allows you to view Spark job definition submission and run status in real-time, as well as view the Spark job definition's past runs and configurations. You can navigate to the Spark application detail page to view more details.

## Pipeline Spark activity inline monitoring

For Pipeline Spark Activity Inline Monitoring, deep links have been built into the Notebook and Spark job definition activities within the Pipeline. You can view Spark application execution details, the respective Notebook and Spark job definition snapshot, and access Spark logs for troubleshooting. If the Spark activities fail, the inline error message is also available within Pipeline Spark activities.

## Related content

- [Apache Spark advisor for real-time advice on notebooks](spark-advisor-introduction.md)
- [Browse the Apache Spark applications in the Fabric monitoring hub](browse-spark-applications-monitoring-hub.md)
- [Browse item's recent runs](spark-item-recent-runs.md)
- [Monitor Spark jobs within a notebook](spark-monitor-debug.md)
- [Monitor your Apache Spark job definition](monitor-spark-job-definitions.md)
- [Apache Spark application detail monitoring](spark-detail-monitoring.md)
- [Use extended Apache Spark history server to debug and diagnose Apache Spark applications](apache-spark-history-server.md)
- [Monitor Spark capacity consumption](../data-engineering/monitor-spark-capacity-consumption.md)
