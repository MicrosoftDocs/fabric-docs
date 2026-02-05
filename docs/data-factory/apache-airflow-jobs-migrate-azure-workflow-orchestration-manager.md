---
title: Migrate to Apache Airflow Job in Microsoft Fabric
description: Learn to migrate from Azure workflow orchestration manager to Apache Airflow Job in Microsoft Fabric.
ms.reviewer: abnarain
ms.topic: how-to
ms.date: 07/26/2024
ms.custom: airflows
---

# Migrate to Apache Airflow job in Microsoft Fabric

> [!NOTE]
> Apache Airflow job is powered by [Apache Airflow](https://airflow.apache.org/).

Apache Airflow job, a transformative capability within Microsoft Fabric, redefines your approach to constructing and managing pipelines. Powered by the Apache Airflow runtime, Apache Airflow jobs provides an integrated, cloud-based platform for developing, scheduling, and monitoring Python-based DAGs(Directed Acyclic Graphs). It delivers a Software-as-a-Service (SaaS) experience for pipeline development and management using Apache Airflow. This makes the Apache Airflow runtime easily accessible, enabling the creation and operation of your Airflow DAGs.

## Key concepts in Apache Airflow job

- **Instant Apache Airflow Runtime Provisioning**: Initiate a new Data Workflow and immediately access an Apache Airflow runtime to run, debug, and operationalize your DAGs.
- **Versatile Cloud-Based Authoring (IDE)**: In addition to your existing development tools to craft Apache Airflow DAGs, you can utilize the cloud-based authoring environment provided by Apache Airflow Job for a truly cloud-native and SaaS-optimized authoring and debugging experience.
- **Dynamic Auto-Scaling**: Execute hundreds of Apache Airflow tasks concurrently with our autoscaling feature, designed to mitigate job queuing and enhance performance.
- **Intelligent Auto-pause**: Achieve cost-effectiveness by automatically pausing the Apache Airflow runtime minutes after inactivity in Data Workflows, optimizing capacity usage, particularly during development phases where continuous runtime is unnecessary.
- **Enhanced Built-in Security**: Integrated within Microsoft Fabric, the Apache Airflow runtime supports Microsoft Entra ID, facilitating single sign-On (SSO) experiences when interfacing with Apache Airflow UIs. Additionally, it incorporates Microsoft Fabric workspace roles for robust security measures.
- **Support for Apache Airflow plugins and Libraries**: Since Data Workflows is powered by Apache Airflow, it supports all features, plugins, and libraries of Apache Airflow, offering comparable extensibility.
- **Custom pools for greater flexibility**: When you create a new Data Workflow, the default pool used is a starter pool. This pool is instantly available and optimized to provide a server-free Apache Airflow runtime experience. It also turns off when not in use to save costs, making it perfect for development scenarios. If you require more control over the pools, you can create a custom pool. This pool allows you to specify the size, autoscale configuration, and more. Setting up your Data Workflows for production in this manner enables unattended operation with an always-on Apache Airflow runtime, supporting Apache Airflow scheduling capabilities. Custom pools can be created using the Workspace settings, ensuring your workflows are tailored to your specific needs.

## Migrate from Azure Workflow Orchestration Manager

### Prerequisites

- [Create a new or use an existing Apache Airflow job.](../data-factory/create-apache-airflow-jobs.md)

To enable customers to upgrade to Microsoft Fabric's Apache Airflow job from Azure's Workflow Orchestration Manager, consider the following two scenarios:

**Scenario 1: You are using Blob storage in Azure Workflow Orchestration Manager.**

In this scenario, our recommended approach is to use Visual Studio Code for a straightforward migration. Open your workflow files in Visual Studio Code and copy-paste them into Fabric managed Storage. This method ensures an easy transition and quick access to the powerful features of Data Workflows.

**Scenario 2: You are using Git sync storage in Azure Workflow Orchestration Manager**

In this scenario, use the Git sync feature of Apache Airflow Job to seamlessly synchronize your GitHub repository. Similar to Azure Workflow Orchestration Manager, this feature ensures your GitHub repository stays in sync, allowing you to start developing instantly. To get started, follow the [tutorial: Synchronize your GitHub Repository in Apache Airflow Job](../data-factory/apache-airflow-jobs-sync-git-repo.md).

## Related content

- [Quickstart: Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md)
- [Run Dag in Apache Airflow Job](../data-factory/apache-airflow-jobs-hello-world.md)
- [Apache Airflow Job workspace settings](../data-factory/apache-airflow-jobs-workspace-settings.md)
