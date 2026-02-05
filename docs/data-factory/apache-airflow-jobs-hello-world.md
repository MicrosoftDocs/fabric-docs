---
title: Hello world tutorial for Apache Airflow Job
description: Learn to get started with the Apache Airflow Job and run a Hello World dag.
ms.reviewer: abnarain
ms.topic: tutorial
ms.custom: airflows
ms.date: 11/20/2025
---

# Tutorial: Run Hello-world DAG in Apache Airflow Job

> [!NOTE]
> Apache Airflow job is powered by [Apache Airflow](https://airflow.apache.org/).

In this tutorial, you run a hello-world DAG in Apache Airflow Job. This tutorial focuses on familiarizing users with the features and environment of the Apache Airflow Job.

## Create an Apache Airflow Job

1. You can use an existing workspace or [Create a new workspace](../fundamentals/create-workspaces.md).

1. Expand **+ New** dropdown -> Select **Browse all** -> Under the **Data Factory** section -> Select **Apache Airflow Job (preview)**

   :::image type="content" source="media/apache-airflow-jobs/apache-airflow-project.png" alt-text="Screenshot to select Apache Airflow job.":::

1. Give a suitable name to your project and select the **Create** button.

## Create a DAG File

1. Select the **New DAG file** card -> Give the name to the file and select the **Create** button.

   :::image type="content" source="media/apache-airflow-jobs/name-directed-acyclic-graph-file.png" alt-text="Screenshot to name the DAG file.":::

1. A boilerplate DAG code is presented to you. You can edit the file as per your requirements.

   :::image type="content" source="media/apache-airflow-jobs/boilerplate-directed-acyclic-graph.png" lightbox="media/apache-airflow-jobs/boilerplate-directed-acyclic-graph.png" alt-text="Screenshot presents boilerplate DAG file in Microsoft Fabric.":::

1. Select **Save**.

   :::image type="content" source="media/apache-airflow-jobs/click-on-save-icon.png" lightbox="media/apache-airflow-jobs/click-on-save-icon.png" alt-text="Screenshot presents how to save DAG file in Microsoft Fabric.":::

## Monitor your Apache Airflow DAG in Apache Airflow UI

1. The saved dag files are loaded in the Apache Airflow UI. You can monitor them by clicking on the "Monitor in Apache Airflow" button.

   :::image type="content" source="media/apache-airflow-jobs/monitor-directed-acyclic-graph.png" alt-text="Screenshot to monitor the Airflow DAG.":::

   :::image type="content" source="media/apache-airflow-jobs/directed-acyclic-graph-in-ui.png" alt-text="Screenshot presents the loaded Airflow DAG.":::

## Related Content

[Quickstart: Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md)
