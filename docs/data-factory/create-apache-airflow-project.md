---
title: Create an Apache Airflow Project in Mircosoft Fabric
description: This tutorial helps you create an Apache Airflow Project in Microsoft Fabric.
ms.reviewer: xupxhou
ms.author: ambikagarg
author: ambikagarg
ms.topic: quickstart
# ms.custom:
#   - ignite-2023
ms.date: 03/25/2024
---

# Quickstart: Create an Apache Airflow Project

## Introduction
[Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines. Airflow enables you to execute these DAGs on a schedule or in response to an event, monitor the progress of workflows, and provide visibility into the state of each task. It's widely used in data engineering and data science to orchestrate data pipelines, and is known for its flexibility, extensibility, and ease of use.

Data Factory's Workflow Orchestration Manager service is a simple and efficient way to create and manage Apache Airflow environments, enabling you to run data pipelines at scale with ease.

This Getting started tutorial provide step-by-step instructions to create an Apache Airflow Project in Microsoft Fabric.

### Step 1: Enable Apache Airflow in your Tenant.

1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand “Users can create and use Apache Airflow projects (preview)” section.
2. Click Apply.

   :::image type="content" source="media/workflow-orchestration-manager/enable-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant.":::

### Step 2: Configure the Apache Airflow Project

1. Once you have enabled Apache Airflow in Tenant Admin Settings, [Create a new workspace](docs/get-started/create-workspaces.md).
2. Expand + New -> Click on More Options -> Under Data Factory -> Select Apache Airflow Project (preview)

   :::image type="content" source="media/workflow-orchestration-manager/apache-airflow-project.png" alt-text="Screenshot to select Apache Airflow Project.":::

3. Give a suitable name to your project and Click on Create Button.

   :::image type="content" source="media/workflow-orchestration-manager/name-airflow-project.png" alt-text="Screenshot to name Apache Airflow Project.":::

4. Click on Start Apache Airflow Environment. This will Configure Airflow Runtime for you. (It should take about 5 mins for the configuration).

   :::image type="content" source="media/workflow-orchestration-manager/configure-apache-airflow.png" alt-text="Screenshot to configure Apache Airflow Project.":::

## Related content

* Read about [workspaces](workspaces.md)