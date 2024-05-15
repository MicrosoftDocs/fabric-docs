---
title: Create a Data workflow project in Microsoft Fabric
description: This tutorial helps you create a Data workflow in Microsoft Fabric.
ms.reviewer: abnarain
ms.author: abnarain
author: nabhishek
ms.topic: quickstart
# ms.custom:
#   - ignite-2023
ms.date: 03/25/2024
---

# Quickstart: Create a Data workflow

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

Data workflows provide a simple and efficient way to create and manage Apache Airflow environments, enabling you to run data pipelines at scale with ease. In this quickstart, you create your first Data workflow and run a Directed Acyclic Graph (DAG) to familiarize yourself with the environment and functionalities of Data workflows.

## Prerequisites

- Enable Data workflows in your Tenant.

> [!NOTE]
> Since Data workflows is in preview state, you need to enable it through your tenant admin. If you already see Data workflows, your tenant admin may have already enabled it.

1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand 'Users can create and use Data workflows (preview)' section.
2. Select **Apply**.

:::image type="content" source="media/data-workflows/enable-data-workflow-tenant.png" lightbox="media/data-workflows/enable-data-workflow-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant.":::

### Create a Data workflow

1. You can use an existing workspace or [Create a new workspace](../get-started/create-workspaces.md).

2. Expand `+ New` dropdown -> Click on More Options -> Under `Data Factory` section -> Select Data workflows (preview)

   :::image type="content" source="media/data-workflows/more-options.png" lightbox="media/data-workflows/more-options.png" alt-text="Screenshot shows click on more options.":::

   :::image type="content" source="media/data-workflows/apache-airflow-project.png" alt-text="Screenshot to select Data Workflow.":::

3. Give a suitable name to your project and click on the "Create" button.

### Create a DAG File

1. Click on "New DAG file" card -> give the name to the file and Click on "Create" button.

   :::image type="content" source="media/data-workflows/name-directed-acyclic-graph-file.png" alt-text="Screenshot to name the DAG file.":::

2. A boilerplate DAG code is presented to you. You can edit the file as per your requirements.

   :::image type="content" source="media/data-workflows/boilerplate-directed-acyclic-graph.png" lightbox="media/data-workflows/boilerplate-directed-acyclic-graph.png" alt-text="Screenshot presents boilerplate DAG file in Microsoft Fabric.":::

3. Click on "Save icon".

   :::image type="content" source="media/data-workflows/click-on-save-icon.png" lightbox="media/data-workflows/click-on-save-icon.png" alt-text="Screenshot presents how to save DAG file in Microsoft Fabric.":::

### Run a DAG

1. Begin by clicking on the "Run DAG" button.

   :::image type="content" source="media/data-workflows/run-directed-acyclic-graph.png" alt-text="Screenshot to run the DAG from data workflows UI." lightbox="media/data-workflows/run-directed-acyclic-graph.png":::

2. Once initiated, a notification will promptly appear indicating the DAG is running.

3. To monitor the progress of the DAG run, simply click on "View Details" within the notification center. This action will redirect you to the Apache Airflow UI, where you can conveniently track the status and details of the DAG run.

   :::image type="content" source="media/data-workflows/notification-to-run-directed-acyclic-graph.png" alt-text="Screenshot to navigate to Apache Airflow UI from notification center." lightbox="media/data-workflows/notification-to-run-directed-acyclic-graph.png":::


### Monitor your Data workflow DAG in Apache Airflow UI

The saved dag files are loaded in the Apache Airflow UI. You can monitor them by clicking on the "Monitor in Apache Airflow" button.

:::image type="content" source="media/data-workflows/monitor-directed-acyclic-graph.png" alt-text="Screenshot to monitor the Airflow DAG.":::

:::image type="content" source="media/data-workflows/directed-acyclic-graph-in-ui.png" alt-text="Screenshot presents the loaded Airflow DAG.":::

## Related Content

* [Install Private Package in Data workflows](data-workflows-install-private-package.md)
