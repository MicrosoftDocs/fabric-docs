---
title: Orchestrating dbt Jobs with Data workflows
description: This tutorial guides you through orchestrating dbt jobs using Data workflows.
ms.reviewer: xupxhou
ms.author: abnarain
author: abnarain
ms.topic: how-to
ms.custom:
  - build-2024
# ms.custom:
#   - ignite-2023
ms.date: 05/24/2024
---

# Orchestrate DBT Jobs with Data Workflows

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

DBT, short for "Data Build Tool," is an open-source command-line interface (CLI) that revolutionizes data transformation and modeling within data warehouses. It addresses a critical challenge of managing complex SQL code in a structured and maintainable way in data pipelines. DBT empowers data teams to build robust, reliable, and testable data transformations that form the core of their analytical pipelines. When integrated with Apache Airflow, a popular workflow management system, DBT becomes a powerful tool for orchestrating data transformations. Airflow's scheduling and task management capabilities allow data teams to automate DBT runs, ensuring regular data updates and maintaining a consistent flow of high-quality data for analysis and reporting. This combined approach, using DBT's transformation expertise with Airflow's workflow management, delivers efficient and robust data pipelines, ultimately leading to faster and more insightful data-driven decisions.

This tutorial will guide you through orchestrating DBT jobs within an Airflow environment provided by Data Workflows. We walk you through the following steps:

1. Create a Fabric warehouse.
2. Ingest sample Data into Fabric warehouse using Data Pipeline.
3. Create a DBT project in Data Workflows to transform the data in warehouse.
4. Create an Apache Airflow DAG to orchestrate DBT jobs.
5. Monitor the DAG run.


## Prerequisites

To get started, you must complete the following prerequisites:

- Enable Data workflows in your Tenant.

  > [!NOTE]
  > Since Data workflows is in preview state, you need to enable it through your tenant admin. If you already see Data workflows, your tenant admin may have already enabled it.

  1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand "Users can create and use Data workflows (preview)" section.

  2. Select Apply.

  :::image type="content" source="media/data-workflows/enable-data-workflow-tenant.png" lightbox="media/data-workflows/enable-data-workflow-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant.":::

- [Create the Service Principal](/entra/identity-platform/howto-create-service-principal-portal).

- [Create the "Data workflows" in the workspace.](../data-factory/create-data-workflows.md)

## Create a Fabric warehouse.

1. To create a warehouse, navigate to your workspace, select `+ New` and then select Warehouse.

2. Once initialized, you can load data into your warehouse

3. 

## Ingest sample Data into Fabric warehouse using Data Pipeline.


## Create a DBT project in Data Workflows.


## Create an Apache Airflow DAG to orchestrate DBT jobs.


## Monitor the DAG run.


## Related Content

[Quickstart: Create a Data workflow](../data-factory/create-data-workflows.md)
