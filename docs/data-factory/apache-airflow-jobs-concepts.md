---
title: What is Apache Airflow job?
description: Learn about when to use Apache Airflow job, basic concepts, and supported regions.
ms.topic: concept-article
ms.custom: airflows
author: n0elleli
ms.author: noelleli
ms.date: 10/06/2025
---

# What is Apache Airflow Job?

> [!NOTE]
> Apache Airflow job is powered by [Apache Airflow](https://airflow.apache.org/). Currently, private networks and Vnet are not supported with Fabric Apache Airflow jobs. This feature is under development and will be updated soon.

Apache Airflow job is the next generation of Azure Data Factory's Workflow Orchestration Manager.
It makes it easy to create and manage [Apache Airflow](https://airflow.apache.org) jobs, so you can run Directed Acyclic Graphs (DAGs) at scale without hassle.  As part of Microsoft Fabric's Data Factory, it gives you a modern way to bring in, prepare, and transform data from all kinds of data sources — like databases, data warehouses, Lakehouse, real-time data, and more.

## When to use Apache Airflow job?

Apache Airflow jobs give you a managed service where you can build and run Python-based DAGs (Directed Acyclic Graphs) for workflow orchestration, without worrying about the setup behind the scenes. If you like working with Apache Airflow or prefer writing code, this option is a great fit. If you’d rather not write code, pipelines offer a simple, no-code way to handle data orchestration.

## Key Features

Microsoft Fabric's hosted Apache Airflow job comes with a variety of helpful features, including:

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
- North Central US
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

## Supported Python version

- 3.12

> [!NOTE]
> Changing the Apache Airflow version within an existing Apache Airflow job is currently not supported. If you need a different Apache Airflow version, create a new Apache Airflow job with the updated version you want. 


## Related Content

- Quickstart: [Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md).
