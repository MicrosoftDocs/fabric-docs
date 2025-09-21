---
title: Dataflow Gen2 and deployment pipelines
description: Overview of Dataflow Gen2 solution architectures using Fabric deployment pipelines, including guidance on selecting the right approach based on requirements and best practices.
ms.reviewer: whhender
ms.author: miescobar
author: ptyx507x
ms.topic: conceptual
ms.date: 9/19/2025
ms.custom: dataflows
---

# Dataflow Gen2 and deployment pipelines

>[!NOTE]
>Fabric deployment pipelines support [Dataflow Gen2 with CI/CD support](dataflow-gen2-cicd-and-git-integration.md). This article aims to provide general concepts and guidance on how to best use Dataflow Gen2 with deployment pipelines.

Microsoft Fabric offers a robust set of tools for implementing Continuous Integration/Continuous Deployment (CI/CD) and Application Lifecycle Management (ALM). These capabilities empower teams to build, test, and deploy data solutions with speed, consistency, and governance.

Dataflow Gen2 with CI/CD support enables seamless integration of dataflows into [Fabric deployment pipelines](/fabric/cicd/deployment-pipelines/intro-to-deployment-pipelines). It automates build, test, and deployment stages, ensuring consistent, version-controlled delivery of dataflows. It accelerates development cycles, improves reliability, and simplifies management by embedding Dataflow Gen2 directly into Fabric’s end-to-end pipeline orchestration.

This article provides guidance on the different solution architectures for your Dataflow and related Fabric items to build a deployment pipeline tailored to your needs.

While there are many goals with deployment pipelines, this article focuses on two specific goals:

* **Consistency**: Ensure the mashup script of your Dataflow remains unchanged across all deployment stages.
* **Stage-specific configuration**: Use dynamic references for data sources and destinations that adapt to each stage (Dev, Test, Prod).

## Solution architectures

A good solution architecture enables you to not only have something that works for your Dataflow Gen2, but also components that extend through your overall Fabric solution. 

The following list covers the available solution architectures when using a Dataflow Gen2:

* **Parameterized Dataflow Gen2**: Using the [public parameters mode](dataflow-parameters.md), you can parameterize Dataflow components—such as logic, sources, or destinations—and pass runtime values to dynamically adapt the Dataflow based on the pipeline stage.
* **Variable libraries inside a Dataflow Gen2**: Using the [variable libraries integration with Dataflow Gen2](dataflow-gen2-variable-library-integration.md), you can reference variables throughout your Dataflow. These variables are evaluated at runtime based on values stored in the library, enabling dynamic behavior aligned with the pipeline stage.

The main differences between these two relies on how a parameterized Dataflow requires setting a process through either the REST API or the [Fabric pipeline Dataflow activity](dataflow-activity.md) to pass values for runtime whereas the variable libraries integration with Dataflow Gen2 relies on a variable library being available at the workspace level and the correct variables being referenced inside the Dataflow.

While both options are valid, each has its own set of considerations and limitations. We recommend doing an assessment as to how you'd like your workflow to be and how such workflow would fit into your overall Fabric solution.

## General considerations

The following are a collection of things to consider when using a Dataflow Gen2 inside a Fabric deployment pipeline:

* **Default References**: Dataflow Gen2 creates absolute references to Fabric items (for example, Lakehouses, Warehouses) by default. Review your Dataflow to identify which references should remain fixed and which should be adapted dynamically across environments.
* **Connection Behavior**: Dataflow Gen2 doesn't support dynamic reconfiguration of data source connections. If your Dataflow connects to sources like SQL databases using parameters (for example, server name, database name), those connections are statically bound and can't be altered using workspace variables or parameterization. 
* **Git Integration Scope**: As a general recommendation, only the first stage (typically Dev) needs Git integration enabled. Once the mashup script is authored and committed, subsequent stages can use deployment pipelines without Git.
* **Use Fabric pipelines to orchestrate**: A [Dataflow activity in pipelines](dataflow-activity.md) can help you orchestrate the run of your Dataflow and pass parameters using an intuitive user interface. You can also use the [variable library integration with pipelines](variable-library-integration-with-data-pipelines.md) to retrieve the values from the variables and pass those values to the Dataflow parameters at runtime.    
* **Deployment Rules Compatibility**: While deployment rules can modify certain item properties, they don't currently support altering Dataflow connections or mashup logic. Plan your architecture accordingly.
* **Testing Across Stages**: Always validate Dataflow behavior in each stage after deployment. Differences in data sources, permissions, or variable values can lead to unexpected results.