---
title: Create an Apache Airflow Job project in Microsoft Fabric
description: This tutorial helps you create an Apache Airflow Job in Microsoft Fabric.
ms.reviewer: abnarain
ms.topic: quickstart
ms.custom: airflows
ms.date: 11/20/2025
---

# Quickstart: Create an Apache Airflow Job

> [!NOTE]
> Apache Airflow job is powered by Apache Airflow.
>
>[Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex jobs. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent pipelines.

Apache Airflow Job provides a simple and efficient way to create and manage Apache Airflow environments, enabling you to run your orchestration jobs at scale with ease. In this quickstart, let's create a simple Apache Airflow job to familiarize yourself with the environment and functionalities of Apache Airflow Job.

## Create an Apache Airflow Job

1. You can use an existing workspace or [Create a new workspace](../fundamentals/create-workspaces.md).

1. Expand **+ New item** dropdown, then under the **Data Factory** section, select **Apache Airflow Job**

   :::image type="content" source="media/apache-airflow-jobs/apache-airflow-project.png" alt-text="Screenshot to select Apache Airflow Job.":::

1. Give a suitable name to your project and select the **Create** button.

## Create a DAG File

1. Select the **New DAG file** card, give the name to the file, and select **Create**.

   :::image type="content" source="media/apache-airflow-jobs/name-directed-acyclic-graph-file.png" alt-text="Screenshot to name the DAG file.":::

1. A boilerplate DAG code is presented to you. You can edit the file as per your requirements.

   :::image type="content" source="media/apache-airflow-jobs/boilerplate-directed-acyclic-graph.png" lightbox="media/apache-airflow-jobs/boilerplate-directed-acyclic-graph.png" alt-text="Screenshot presents boilerplate DAG file in Microsoft Fabric.":::

1. Select **Save**.

   :::image type="content" source="media/apache-airflow-jobs/click-on-save-icon.png" lightbox="media/apache-airflow-jobs/click-on-save-icon.png" alt-text="Screenshot presents how to save DAG file in Microsoft Fabric.":::

## Run a DAG

1. Begin by selecting the **Run DAG** button.

   :::image type="content" source="media/apache-airflow-jobs/run-directed-acyclic-graph.png" alt-text="Screenshot to run the DAG from data workflows UI." lightbox="media/apache-airflow-jobs/run-directed-acyclic-graph.png":::

1. Once initiated, a notification appears indicating the DAG is running.

1. To monitor the progress of the DAG run, select **View Details** within the notification center. This action will redirect you to the Apache Airflow UI, where you can conveniently track the status and details of the DAG run.

   :::image type="content" source="media/apache-airflow-jobs/notification-to-run-directed-acyclic-graph.png" alt-text="Screenshot to navigate to Apache Airflow UI from notification center." lightbox="media/apache-airflow-jobs/notification-to-run-directed-acyclic-graph.png":::

## Monitor your Apache Airflow DAG in Apache Airflow UI

The saved dag files are loaded in the Apache Airflow UI. You can monitor them by clicking on the **Monitor in Apache Airflow** button.

:::image type="content" source="media/apache-airflow-jobs/monitor-directed-acyclic-graph.png" alt-text="Screenshot to monitor the Airflow DAG.":::

:::image type="content" source="media/apache-airflow-jobs/directed-acyclic-graph-in-ui.png" alt-text="Screenshot presents the loaded Airflow DAG.":::

## Related Content

- [Install Private Package in Apache Airflow job](apache-airflow-jobs-install-private-package.md)
