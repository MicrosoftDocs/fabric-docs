---
title: Create an Apache Airflow Project in Microsoft Fabric
description: This tutorial helps you create an Apache Airflow Project in Microsoft Fabric.
ms.reviewer: xupxhou
ms.author: abnarain
author: abnarain
ms.topic: quickstart
# ms.custom:
#   - ignite-2023
ms.date: 03/25/2024
---

# Quickstart: Create an Apache Airflow Project

## Introduction
[Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines. Airflow enables you to execute these DAGs on a schedule or in response to an event, monitor the progress of workflows, and provide visibility into the state of each task. It is widely used in data engineering and data science to orchestrate data pipelines, and is known for its flexibility, extensibility, and ease of use.

Data Factory's Workflow Orchestration Manager service is a simple and efficient way to create and manage Apache Airflow environments, enabling you to run data pipelines at scale with ease.

This tutorial provides step-by-step instructions to create an Apache Airflow Project in Microsoft Fabric.

### Step 1: Enable Apache Airflow in your Tenant.

1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand 'Users can create and use Apache Airflow projects (preview)' section.
2. Click Apply.

   :::image type="content" source="media/workflow-orchestration-manager/enable-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant.":::

### Step 2: Create an Apache Airflow Project

1. [Create a new workspace](../get-started/create-workspaces.md).
2. Expand + New -> Click on More Options -> Under Data Factory -> Select Apache Airflow Project (preview)

   :::image type="content" source="media/workflow-orchestration-manager/apache-airflow-project.png" alt-text="Screenshot to select Apache Airflow Project.":::

3. Give a suitable name to your project and Click on Create Button.

   :::image type="content" source="media/workflow-orchestration-manager/name-airflow-project.png" alt-text="Screenshot to name Apache Airflow Project.":::

### Step 3: Configure an Airflow Environment.

1. Click on 'Configure Airflow' Card.
2. Specify the Apache Airflow environment configuration for your DAGs to run against. You can change these settings later as well.

:::image type="content" source="media/workflow-orchestration-manager/configure-airflow-env.png" alt-text="Screenshot to configure Apache Airflow Project.":::

* <strong>Compute Node Size:</strong> The size of the compute node you want your Airflow environment to run on.
* <strong>Enable Autoscale:</strong> Allow your Airflow environment to scale nodes up or down as needed.
* <strong>Environment variables:</strong> You can use this key value store within Airflow to store and retrieve arbitrary content or settings.
* <strong>Configuration Overrides:</strong> You can override any Airflow configurations that you set in airflow.cfg. Examples are name: AIRFLOW__VAR__FOO and value: BAR. For more information, see Airflow configurations.
* <strong>Kubernetes secrets:</strong> You can create a custom Kubernetes secret for your Airflow environment. An example is Private registry credentials to pull images for KubernetesPodOperator.
* <strong>Enable Triggers:</strong> Allows the Airflow Tasks to run in deferrable mode.


### Step 4: Synchronize your GitHub Repository

Specify the git repository you want to sync your Airflow project with.

1. Click on 'Sync with Git' Card, you are navigated to 'File Storage'.

:::image type="content" source="media/workflow-orchestration-manager/git-sync.png" alt-text="Screenshot to synchronize GitHub repository.":::

2. Fill out the following fields:

* <strong>Git service type</strong>: Supported service types:
    * GitHub
    * ADO: Azure DevOps
    * GitLab
    * BitBucket

* <strong>Git Credential type</strong>: Supported credential types:
    * None: Choose this credential type, if the repository is public.
    * Personal Access token: A personal access token from the Git service used to authenticate with repository.
      * Fill out the fields:
         * Username: Username of GitHub.
         * Personal Access token
    * Service Principal: Select this credential when you choose Git Service as Azure Devops:
        * Fill out the fields:
            * Service principal app ID: Client ID of your Service Principal that has access to Azure Devops Repository.
            * Service principal secret: Client secret with access to Azure DevOps repository.
            * Service principal tenant ID: Tenant ID of your Service Principal.

* <strong>Repo</strong>: The clone URL to the repository you want to sync.
* <strong>Branch</strong>: Name of the repository’s branch you want to sync.

3. Click on 'Apply'.

#### Supported Git Repository Structure

```
|── dags/
|   |-- *.py
|-- plugins
|    |-- executors/
|    |   ├-- __init__.py
|    |   └-- *.py
|    |-- hooks/
|    |   ├-- __init__.py
|    |   └-- *.py
|    |-- operators/
|    |   ├-- __init__.py
|    |   └-- *.py
|    |-- transfers/
|    |   ├-- __init__.py
|    |   └-- *.py
|    |-- triggers/
|    |    ├-- __init__.py
|    |    └-- *.py
```

### Step 5: Start Apache Airflow Environment

1. Click on Start Apache Airflow Environment to configure the Airflow Runtime. (It should take about 5 mins for the configuration).

   :::image type="content" source="media/workflow-orchestration-manager/start-apache-airflow.png" alt-text="Screenshot to start Apache Airflow Project.":::

## Next Steps

* [Sync your GitHub Repository with Workflow Orchestration Manager]().
