---
title: What is Apache Airflow job?
description: Learn about when to use Apache Airflow job, basic concepts, and supported regions.
ms.topic: conceptual
ms.custom:
  - build-2024
author: nabhishek
ms.author: abnarain
ms.date: 04/16/2024
---

# What is Apache Airflow Job?

> [!NOTE]
> Apache Airflow job is powered by [Apache Airflow](https://airflow.apache.org/).

Apache Airflow job is the next generation of Azure Data Factory's Workflow Orchestration Manager.
It's a simple and efficient way to create and manage [Apache Airflow](https://airflow.apache.org) orchestration jobs, enabling you to run Directed Acyclic Graphs (DAGs) at scale with ease.  It's the part of Fabric's Data Factory that empowers you with a modern data integration experience to ingest, prepare and transform data from a rich set of data sources for example, databases, data warehouse, Lakehouse, real-time data, and more.

## When to use Apache Airflow job?

Apache Airflow jobs offers a managed service that enables users to create and manage Python-based DAGs (Directed Acyclic Graphs) for workflow orchestration, without worrying about the underlying infrastructure. If you have experience with Apache Airflow or you prefer code-centric approach, this option is ideal. In contrast, if you prefer a no-code solution for data orchestration, data pipelines offer a user-friendly alternative that doesn’t require managing or writing Python-based workflows.

## Key Features

Microsoft Fabric hosted Apache Airflow job offer a range of powerful features, including:

| Key Features                                                                       | Apache Airflow Job in Fabric | Workflow Orchestration Manager in Azure Data Factory |
| ---------------------------------------------------------------------------------- | ------------------------ | ------------------------------------- |
| Git sync                                                                           | Yes                      | Yes                                   |
| Enable AKV (Azure Key Vault) as backend                                                              | Yes                      | Yes                                   |
| Install private package as requirement                                             | Yes                      | Yes                                   |
| Diagnostic logs and metrics                                                        | No                       | Yes                                   |
| Blob Storage                                                                       | No                       | Yes                                   |
| Apache Airflow cluster IP address                                                  | Yes                      | Yes                                   |
| Autoscale for managing production workload execution spikes                       | Yes                      | Partial                               |
| High Availability for mitigating outage/downtime                                   | Yes                      | No                                    |
| Deferrable Operators for suspending idle operators and free up workers             | Yes                      | No                                    |
| Pause and Resume TTL (Time to live)                                                               | Yes                      | No                                    |
| SaaSified Experience - 10 secs to get started - Authoring DAGs - Fabric Free Trial | Yes                      | No                                    |

## Region availability (public preview)

- Australia East
- Australia Southeast
- Brazil South
- Canada East
- Canada Central
- East Asia
- East US
- Germany West Central
- Japan East
- Japan West
- North Europe
- South Africa North
- South Central US
- South India
- Southeast Asia
- Sweden Central
- Switzerland West
- UK South
- UK West
- West Central US
- West Europe
- West US

## Supported Apache Airflow versions

- 2.6.3

## Support Python version

- 3.8.17

> [!NOTE]
> Changing the Apache Airflow version within an existing IR is not supported. Instead, the recommended solution is to create a new Airflow IR with the desired version

## Related Content

- Quickstart: [Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md).
