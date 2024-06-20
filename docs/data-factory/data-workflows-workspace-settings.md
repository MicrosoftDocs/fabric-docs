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
> Data workflows is powered by Apache Airflow.
>
> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

You can configure and manage the runtime settings of Apache Airflow in Data workflows and the default Apache Airflow runtime for the workspace. Data workflow offers the two types of the environment settings, that is, Starter pool and Custom pool. You can use the starter pool which is configured by default or create custom pools for your workspace. If the setting for customizing compute configurations for items is disabled, the starter pool is used for all environments within the workspace. Starter pools offer an instant Apache Airflow runtime, which is automatically deprovisioned when not in use. On the other hand, custom pools provide more flexibility and offer an always-on Apache Airflow runtime. This article outlines each setting and suggests ideal scenarios for their respective usage.

## Starter Pool and Custom Pool

The following table contains the list the properties of both the pools.

| Property               | Starter Pool (Default)                                           | Custom Pool                                                                                          |
| ---------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Size                   | Compute Node Size: Large                                         | Offers flexibility in size; You can configure 'Compute node size,' 'Extra nodes,' 'Enable autoscale' |
| Startup latency        | Instantaneous                                                    | Starts in the stopped stage                                                                          |
| Resume latency         | Takes up to 5 minutes                                            | Takes up to 5 minutes                                                                                |
| Pool uptime behavior   | Shuts down after 20 minutes of inactivity on Airflow Environment | Always on until manually paused                                                                      |
| Suggested Environments | Developer                                                        | Production                                                                                           |

## Configure Custom Pool

1. Go to your workspace settings.
2. In the 'Data Factory' section, click on 'Data Workflow Settings.'
3. You find that the Default Data Workflow Setting is currently set to Starter Pool. To switch to a Custom Pool, expand the dropdown menu labeled 'Default Data Workflow Setting' and select 'New Pool.'

   :::image type="content" source="media/data-workflows/data-workflow-runtime-settings.png" lightbox="media/data-workflows/data-workflow-runtime-settings.png" alt-text="Screenshot shows data workflows run time settings.":::

4. Customize the following properties according to your needs:

   - Name: Give a suitable name to your pool.
   - Compute node size: The size of compute node you want to run your environment on. You can choose the value `Large` for running complex or production DAGs and `Small` for running simpler Directed Acyclic Graphs (DAGs).
   - Enable autoscale: This feature allows your Apache Airflow pool to scale nodes up or down as needed.
   - Extra nodes: Extra nodes enable the pool to run more DAGs concurrently. Each node provides the capacity to run three more workers.

   :::image type="content" source="media/data-workflows/new-custom-pool.png" lightbox="media/data-workflows/new-custom-pool.png" alt-text="Screenshot shows custom pool settings in data workflow.":::

5. Click on 'Create' to finalize your configuration.

## Related content

[Quickstart: Create a Data workflow.](../data-factory/create-data-workflows.md)
