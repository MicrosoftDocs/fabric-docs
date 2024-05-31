---
title: Hello world tutorial for Data workflows
description: Learn to get started with the Data workflows and run a Hello World dag.
ms.reviewer: abnarain
ms.author: abnarain
author: abnarain
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 04/15/2024
---

# Tutorial: Run Hello-world DAG in Data workflows

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

In this tutorial, you'll run a hello-world DAG in Data workflows. This tutorial focuses on getting users acquainted with the Data workflows features and environment.

## Prerequisites

To get started, you must complete the following prerequisite:

- Enable Data workflows in your Tenant.
  > [!NOTE]
  > Since Data workflows is in preview state, you need to enable it through your tenant admin. If you already see Data workflows, your tenant admin may have already enabled it.

    1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand 'Users can create and use Data workflows (preview)' section.

    2. Click Apply.

        :::image type="content" source="media/data-workflows/enable-data-workflow-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant." lightbox="media/data-workflows/enable-data-workflow-tenant.png":::

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

### Monitor your Data workflow DAG in Apache Airflow UI

1. The saved dag files are loaded in the Apache Airflow UI. You can monitor them by clicking on the "Monitor in Apache Airflow" button.

    :::image type="content" source="media/data-workflows/monitor-directed-acyclic-graph.png" alt-text="Screenshot to monitor the Airflow DAG.":::

    :::image type="content" source="media/data-workflows/directed-acyclic-graph-in-ui.png" alt-text="Screenshot presents the loaded Airflow DAG.":::

## Related Content

[Quickstart: Create a Data workflow](../data-factory/create-data-workflows.md)
