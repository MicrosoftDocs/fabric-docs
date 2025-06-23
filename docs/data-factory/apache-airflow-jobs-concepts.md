---
title: What is Apache Airflow job?
description: Learn about when to use Apache Airflow job, basic concepts, and supported regions.
ms.topic: conceptual
ms.custom: airflows
author: nabhishek
ms.author: abnarain
ms.date: 06/23/2025
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

## Region availability 

- Australia East
- Australia Southeast
- Brazil South
- Canada Central
- Canada East
- Central India
- Central US
- East Asia
- East US
- East US 2
- France Central
- Germany West Central
- Indonesia Central (Coming soon)
- Israel Central
- Italy North
- Japan East
- Japan West
- Korea Central
- Malaysia West (Coming soon)
- Mexico Central
- New Zealand North (Coming soon)
- North Europe
- Norway East
- Poland Central
- Qatar Central (Coming soon)
- Spain Central (Coming soon)
- South Africa North
- South Central US
- South India
- Southeast Asia
- Sweden Central
- Switzerland North
- Switzerland West
- Taiwan North (Coming soon)
- Taiwan Northwest (Coming soon)
- UAE North
- UK South
- UK West
- West Europe
- West US
- West US 2
- West US 3

 

## Supported Apache Airflow versions

- 2.10.5

## Support Python version

- 3.12

> [!NOTE]
> Changing the Apache Airflow version within an existing Apache Airflow job is currently not supported. Instead, the recommended solution is to create a new Apache Airflow job with the desired version

## Related Content

- Quickstart: [Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md).
