---
title: CI/CD and ALM solution architectures for Dataflow Gen2
description: Overview of Dataflow Gen2 solution architectures for CI/CD and ALM that apply to Fabric deployment pipelines, including guidance on selecting the right approach based on requirements and best practices.
ms.reviewer: whhender
ms.author: miescobar
author: ptyx507x
ms.topic: concept-article
ms.date: 10/2/2025
ms.custom: dataflows
ai-usage: ai-assisted
---

# CI/CD and ALM solution architectures for Dataflow Gen2

>[!NOTE]
>The contents of this article applies to [Dataflow Gen2 with CI/CD support](dataflow-gen2-cicd-and-git-integration.md). 

Microsoft Fabric provides tools for Continuous Integration/Continuous Deployment (CI/CD) and Application Lifecycle Management (ALM). These tools help teams build, test, and deploy data solutions with consistency and governance.

Dataflow Gen2 with CI/CD support integrates dataflows into [Fabric deployment pipelines](/fabric/cicd/deployment-pipelines/intro-to-deployment-pipelines). This integration automates build, test, and deployment stages. It provides consistent, version-controlled delivery of dataflows and improves reliability by embedding Dataflow Gen2 into Fabric's pipeline orchestration.

This article provides guidance on solution architectures for your Dataflow and related Fabric items with CI/CD and ALM in mind. You can use this guidance to build a solution that fits your needs. This article focuses on two specific goals:

- **Consistency**: Keep your Dataflow's mashup script unchanged across your whole application lifecycle (or deployment stages in a deployment pipeline).
- **Stage-specific configuration**: Use dynamic references for data sources and destinations that adapt to each stage (Dev, Test, Prod).

## Solution architectures

A good solution architecture works for your Dataflow Gen2 and extends through your overall Fabric solution.

The following table covers the available solution architectures when using a Dataflow Gen2:

|Type|Description|Diagram|Tutorial|
|---|---|---|--|
|**Parameterized Dataflow Gen2**| Using the [public parameters mode](dataflow-parameters.md), you can parameterize Dataflow components—such as logic, sources, or destinations—and pass runtime values to dynamically adapt the Dataflow based on the pipeline stage.|:::image type="content" source="media/dataflow-gen2-cicd-alm-solution-architecture/diagram-public-parameters-mode-architecture.png" alt-text="Diagram of the public parameters mode inside a Dataflow Gen2 high level solution architecture." lightbox="media/dataflow-gen2-cicd-alm-solution-architecture/diagram-public-parameters-mode-architecture.png":::| [Link to Tutorial](dataflow-gen2-parameterized-dataflow.md)|
| **Variable references in a Dataflow Gen2** | Using the [variable libraries integration with Dataflow Gen2](dataflow-gen2-variable-library-integration.md), you can reference variables throughout your Dataflow. These variables are evaluated at runtime based on values stored in the library, enabling dynamic behavior aligned with the pipeline stage.|  :::image type="content" source="media/dataflow-gen2-cicd-alm-solution-architecture/diagram-variable-libraries-references-architecture.png" alt-text="Diagram of the variable libraries inside a Dataflow Gen2 high level solution architecture." lightbox="media/dataflow-gen2-cicd-alm-solution-architecture/diagram-variable-libraries-references-architecture.png":::|[Link to Tutorial](dataflow-gen2-variable-references.md)|

The main difference between these two approaches is how they pass values at runtime. A parameterized Dataflow requires a process through either the REST API or the [Fabric pipeline Dataflow activity](dataflow-activity.md) to pass values. The variable libraries integration with Dataflow Gen2 requires a variable library at the workspace level and the correct variables referenced inside the Dataflow.

Both options are valid, and each has its own considerations and limitations. We recommend evaluating how your workflow works and how it fits into your overall Fabric solution.

## General considerations

Here are things to consider when choosing a solution architecture with CI/CD and ALM in mind:

- **Default references**: Dataflow Gen2 creates absolute references to Fabric items (for example, Lakehouses, Warehouses) by default. Review your Dataflow to identify which references should remain fixed and which should be adapted dynamically across environments.
- **Connection behavior**: Dataflow Gen2 doesn't support dynamic reconfiguration of data source connections. If your Dataflow connects to sources like SQL databases using parameters (for example, server name, database name), those connections are statically bound and can't be altered using workspace variables or parameterization.
- **Git integration scope**: We recommend that only the first stage (typically Dev) needs Git integration enabled. Once the mashup script is authored and committed, subsequent stages can use deployment pipelines without Git.
- **Use Fabric pipelines to orchestrate**: A [Dataflow activity in pipelines](dataflow-activity.md) can help you orchestrate the run of your Dataflow and pass parameters using an intuitive user interface. You can also use the [variable library integration with pipelines](variable-library-integration-with-data-pipelines.md) to retrieve the values from the variables and pass those values to the Dataflow parameters at runtime.
- **Deployment rules compatibility**: Currently, deployment rules can modify certain item properties but don't support altering Dataflow connections or mashup logic. Plan your architecture accordingly.
- **Testing across stages**: Always validate Dataflow behavior in each stage after deployment. Differences in data sources, permissions, or variable values can lead to unexpected results.
