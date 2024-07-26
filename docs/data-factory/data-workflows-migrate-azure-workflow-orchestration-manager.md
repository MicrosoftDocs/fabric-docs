---
title: Migrate to Data workflows in Microsoft Fabric
description: Learn to migrate from Azure workflow orchestration manager to Data workflows in Microsoft Fabric.
ms.reviewer: abnarain
ms.author: v-ambgarg
author: abnarain
ms.topic: how-to
ms.date: 07/26/24
---

# Migrate to Data Workflows in Microsoft Fabric

Data Workflows, a transformative capability within Microsoft Fabric, redefines your approach to constructing and managing data pipelines. Powered by the Apache Airflow runtime, Data Workflows provides an integrated, cloud-based platform for developing, scheduling, and monitoring Python-based data workflows, articulated as Directed Acyclic Graphs (DAGs). It delivers a Software-as-a-Service (SaaS) experience for data pipeline development and management using Apache Airflow, making the Apache Airflow runtime readily accessible for the development and operationalization of your data workflows.

## Key concepts in Data Workflows
- **Instant Apache Airflow Runtime Provisioning**: Initiate a new Data Workflow and immediately access an Apache Airflow runtime to run, debug, and operationalize your DAGs.
- **Versatile Cloud-Based Authoring (IDE)**: In addition to your existing development tools to craft Apache Airflow DAGs, you can utilize the cloud-based authoring environment provided by Data workflows for a truly cloud-native and SaaS-optimized authoring and debugging experience.
- **Dynamic Auto-Scaling**: Execute hundreds of Apache Airflow tasks concurrently with our auto-scaling feature, designed to mitigate job queuing and enhance performance.
- **Intelligent Auto-pause**: Achieve cost-effectiveness by automatically pausing the Apache Airflow runtime minutes after inactivity in Data Workflows, optimizing capacity usage, particularly during development phases where continuous runtime is unnecessary.
- **Enhanced Built-in Security**: Integrated within Microsoft Fabric, the Apache Airflow runtime supports Microsoft Entra ID, facilitating Single Sign-On (SSO) experiences when interfacing with Apache Airflow UIs. Additionally, it incorporates Microsoft Fabric workspace roles for robust security measures.
- **Support for Apache Airflow plugins and Libraries**: Since Data Workflows is powered by Apache Airflow, it supports all features, plugins, and libraries of Apache Airflow, offering comparable extensibility.
- **Custom pools for greater flexibility**: When you create a new Data Workflow, the default pool used is a starter pool. This pool is instantly available and optimized to provide a server-free Apache Airflow runtime experience. It also turns off when not in use to save costs, making it perfect for development scenarios. If you require more control over the pools, you can create a custom pool. This allows you to specify the size, auto-scale configuration, and more. Setting up your Data Workflows for production in this manner enables unattended operation with an always-on Apache Airflow runtime, supporting Apache Airflow scheduling capabilities. Custom pools can be created using the Workspace settings, ensuring your workflows are tailored to your specific needs.

## Migrate from Azure Workflow Orchestration Manager
To enable customers to upgrade to Microsoft Fabric Data Workflows from Azure Workflow Orchestration Manager, consider the following two scenarios:

### Prerequisites: 
1. [Create a new or use an existing Data Workflow.]()

### **Scenario 1: You are using Blob storage in Azure Workflow Orchestration Manager.**

In this scenario, our recommended way is to open the file in Visual studio In this scenario, our recommended approach is to leverage Visual Studio Code for a straightforward migration. Simply open your workflow files in Visual Studio Code and copy-paste them into Fabric Managed Storage. This method ensures an easy transition and quick access to the powerful features of Data Workflows.

### **Scenario 2: You are using Git sync storage in Azure Workflow Orchestration Manager**  

In this scenario, leverage the Git sync feature of Data Workflows to seamlessly synchronize your GitHub repository. Similar to Azure Workflow Orchestration Manager, this feature ensures your GitHub repository stays in sync, allowing you to start developing instantly. To get started, follow the [tutorial: Synchronize your Github Repository in Dats workflows](../data-factory/data-workflows-sync-git-repo.md).

## Related Content

[Quickstart: Create a Data workflow](../data-factory/create-data-workflows.md)
[Run Dag in Data workflows](../data-factory/data-workflows-hello-world.md)