---
title: Data workflow environment settings
description: This article enumerates the Data workflow environment run-time configurations.
author: nabhishek
ms.author: abnarain
ms.reviewer: abnarain
ms.topic: conceptual
ms.date: 04/24/2024
---

# Data workflow environment settings

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

Data workflow offers the two types of the environment settings, i.e.Starter pool and Custom pool. This article outlines each setting and suggests ideal scenarios for their respective usage.

## Starter Pool and Custom Pool

The following table contains the list the properties of both the pools.

|Property  |Starter Pool  |Custom Pool
|---------|---------|------|
|Default Setting|Yes, Enabled by default|No, Needs to be configured|
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
    - Compute node size: The size of compute node you want to run your environment on. You can choose the value `Large` and `Small`.
    - Enable autoscale: The min and max number of nodes you want your environment to scale to.
    - Extra nodes: Add more nodes to your compute environment.

    :::image type="content" source="media/data-workflows/new-custom-pool.png" lightbox="media/data-workflows/new-custom-pool.png" alt-text="Screenshot shows custom pool settings in data workflow.":::

5. Click on 'Create' to finalize your configuration.


## Related Content

[Quickstart: Create a Data workflow.](../data-factory/create-data-workflows.md)
