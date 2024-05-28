---
title: Data workflows workspace settings
description: This article enumerates the Data workflow environment run-time configurations.
author: nabhishek
ms.author: abnarain
ms.reviewer: abnarain
ms.topic: conceptual
ms.date: 04/24/2024
---

# Data workflows workspace settings

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

You can configure and manage the runtime settings of Apache Airflow for Data workflows, as well as the default Apache Airflow runtime for the workspace. Data workflow offers the two types of the environment settings, i.e.Starter pool and Custom pool. You have the option to use the automatically created starter pool or create custom pools for workspaces. If the setting for customizing compute configurations for items is disabled, this pool will be used for all environments within this workspace. Starter pools offer an instant Apache Airflow runtime, which is automatically deprovisioned when not in use. On the other hand, custom pools provide more flexibility and offer an always-on Apache Airflow runtime. This article outlines each setting and suggests ideal scenarios for their respective usage.

## Starter Pool and Custom Pool

The following table contains the list the properties of both the pools.

|Property  |Starter Pool  |Custom Pool
|---------|---------|------|
|Default|Default pool for workspace|Needs to be configured|
|Size|Default Compute Node Size: Large|Offers flexibility in size; You can configure 'Compute node size,' 'Extra nodes,' 'Enable autoscale'|
|Initialization Behavior|Automatically starts|Starts in the stopped stage| 
|Resume Behavior|Instantaneous|Takes up to 5 minutes|
|TTL(Time to live)|Shuts down after 20 minutes of inactivity on Airflow Environment | Won't automatically pause |
|Ideal Scenario| Developer Environment| Production Environment|


## Configure Custom Pool

1. Go to your workspace settings.
2. In the 'Data Factory' section, click on 'Data Workflow Settings'.
3. You'll find that the Default Data Workflow Setting is currently set to Starter Pool. To switch to a Custom Pool, expand the dropdown menu labeled 'Default Data Workflow Setting' and select 'New Pool.'

    :::image type="content" source="media/data-workflows/data-workflow-run-time-settings.png" lightbox="media/data-workflows/data-workflow-run-time-settings.png" alt-text="Screenshot shows data workflows run time settings.":::

4. Customize the following properties according to your needs:
    - Name: Give a suitable name to your pool.
    - Compute node size: The size of compute node you want to run your environment on. You can choose the value `Large` for running complex or production DAGs and `Small` for running simpler Directed Acyclic Graphs (DAGs).
    - Enable autoscale: This feature allows your Apache Airflow pool to scale nodes up or down as needed.
    - Extra nodes: Additional nodes enable the pool to run more DAGs concurrently. Each additional node provides the capacity to run 3 more workers.

    :::image type="content" source="media/data-workflows/new-custom-pool.png" lightbox="media/data-workflows/new-custom-pool.png" alt-text="Screenshot shows custom pool settings in data workflow.":::

5. Click on 'Create' to finalize your configuration.


## Related Content

[Quickstart: Create a Data workflow.](../data-factory/create-data-workflows.md)
