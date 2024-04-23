---
title: What is Data Workflows?
description: Learn about when to use Data Workflows, basic concepts and supported regions.
ms.topic: conceptual
author: nabhishek
ms.author: abnarain
ms.date: 04/16/2024
---
# What is Data workflows?

> [!NOTE]
> Data workflows is powered by Apache Airflow. [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

Data workflows is the next gen of Azure Data Factory's Workflow Orchestration Manager.
Fabric Data Factory offers serverless pipelines for data process orchestration, data movement with 100+ managed connectors, and visual transformations with the mapping data flow.
Data Workflows is a simple and efficient way to create and manage [Apache Airflow](https://airflow.apache.org) environments, enabling you to run data pipelines at scale with ease. Developers can focus on writing business logic without worrying about the underlying infrastructure. It abstracts away the complexities of distributed systems, allowing developers to build resilient and scalable DAGs.

## When to use Data Workflows?

Data Workflows, offers Apache Airflow based python DAGs (python code-centric authoring) for defining the data orchestration process. If you have the Apache Airflow background, or are currently using Apache Airflow, you might prefer to use the Data Workflows. On the contrary, if you wouldn't like to write/ manage python-based DAGs for data process orchestration, you might prefer to use pipelines.

## Key Features
Data Workflows in MS Fabric Data Factory offers a range of powerful features, including:

| Key Features     | Data Workflows in Fabric | Workflow Orchestration Manager in ADF |
| ---------------- | --- | --- |
| Git sync | Yes | Yes |
| Enable AKV as backend | Yes | Yes|
| Install private package as requirement | Yes | Yes |
| Diagnostic logs and metrics | No | Yes |
| Blob Storage | No | Yes |
| Apache Airflow cluster IP address | Yes | Yes |
| Auto-scale for managing production workload execution spikes | Yes | Partial |
| High Availability for mitigating outage/downtime | Yes | No |
| Deferrable Operators for suspending idle operators and free up workers | Yes | No |
| Pause and Resume TTL | Yes | No |
| SaaSified Experience - 10 secs to get started - Authoring DAGs - Fabric Free Trial | Yes | No |

## Region availability (public preview)

- Japan West
- Japan East
- Qatar Central
- North Europe
- West Central US
- West US
- East US 2 EUAP
- UK South
- East US
- South Central US
- Southeast Asia
- West Europe
- Australia Southeast
- Australia East
- Brazil South

## Supported Apache Airflow versions

- 2.6.3

> [!NOTE]
> Changing the Apache Airflow version within an existing IR is not supported. Instead, the recommended solution is to create a new Airflow IR with the desired version

## Related Content

* Quickstart: [Create a Data workflows](../data-factory/create-data-workflows.md).

