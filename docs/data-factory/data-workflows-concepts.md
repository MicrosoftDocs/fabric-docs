---
title: What are Data Workflows?
description: Learn about when to use Data Workflows, basic concepts and supported regions.
ms.topic: conceptual
ms.custom:
  - build-2024
author: nabhishek
ms.author: abnarain
ms.date: 04/16/2024
---

# What are Data workflows?

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

Data workflows is the next generation of Azure Data Factory's Workflow Orchestration Manager. Data Factory in Fabric offers serverless pipelines for data process orchestration, data movement with 100+ managed connectors, and visual transformations with the mapping data flow.

Data Workflows is a simple and efficient way to create and manage [Apache Airflow](https://airflow.apache.org) environments, enabling you to run data pipelines at scale with ease. Developers can focus on writing business logic without worrying about the underlying infrastructure. It abstracts away the complexities of distributed systems, allowing developers to build resilient and scalable DAGs.

## When to use Data Workflows?

Data Workflows is a Managed service that offers allows the users to create and manage Apache Airflow based python DAGs (python code-centric authoring) for defining the data orchestration process without having to manage the underlying infrastructure. If you have the Apache Airflow background, or are currently using Apache Airflow, you might prefer to use the Data Workflows. On the contrary, if you wouldn't like to write/ manage python-based DAGs for data process orchestration, you might prefer to use pipelines.

## Key Features
Data Workflows in Data Factory for Microsoft Fabric offer a range of powerful features, including:

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

- Australia East
- Australia Southeast
- Brazil South
- Brazil South (duplicate)
- Canada East
- East Asia
- East US
- East US 2 EUAP
- Germany West Central
- Japan East
- Japan West
- North Europe
- Qatar Central
- South Africa North
- South Central US
- Southeast Asia
- UK South
- UK South (duplicate)
- West Central US
- West Europe
- West US

## Supported Apache Airflow versions

- 2.6.3

> [!NOTE]
> Changing the Apache Airflow version within an existing IR is not supported. Instead, the recommended solution is to create a new Airflow IR with the desired version

## Related Content

* Quickstart: [Create a Data workflow](../data-factory/create-data-workflows.md).
