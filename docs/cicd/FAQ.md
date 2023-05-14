---
title: Troubleshoot the Fabric lifecycle management tools.
description: Find answers to your deployment pipelines, the Fabric Application lifecycle management (ALM) tool, troubleshooting questions
author: mberdugo
ms.author: monaberdugo
ms.topic: troubleshooting
ms.service: powerbi
ms.subservice: pbi-deployment-pipeline
ms.date: 05/23/2023
ms.search.form: Deployment pipelines troubleshooting, View deployment pipeline, Deployment pipelines operations, Deployment rules
---

# Frequently asked questions about the Fabric lifecycle management tools

  This article provides answers to some of the most common questions about the [Fabric lifecycle management tools](./cicd-overview.md).

  [General questions](#general-questions)  
  [Licensing questions](#licensing-questions)  
  [Git integration questions](#git-integration-questions)  
  [Deployment pipeline questions](#deployment-pipeline-questions)  

## General questions

### What is lifecycle management in Microsoft Fabric?

Lifecycle management has two parts, integration and deployment. To understand what integration is in Fabric, refer to [the git integration overview](./git-integration/intro-to-git-integration.md). To understand what deployment pipelines is in Fabric, refer to the [deployment pipelines overview](deployment-pipelines/intro-to-deployment-pipelines.md).

### How do I get started with git integration?

Get started with git integration using the [get started instructions](git-integration/git-get-started.md).

### How do I get started with deployment pipelines?

Get started with deployment pipelines using the [get started instructions](deployment-pipelines/get-started-with-deployment-pipelines.md).

## Licensing questions

### What licenses are needed to work with lifecycle management?

For information on licenses, see [Fabric licenses](../enterprise/licenses.md).

### What type of capacity do I need?

All workspaces must be assigned to a Fabric license. However, you can use different capacity types for different workspaces.

For information on capacity types, see [Capacity and SKUs](../enterprise/licenses.md#capacity-and-skus).

>[!NOTE]
>
> * PPU, EM, and A SKUs only work with Power BI items. If you add other Fabric items to the workspace, you need a trial, P, or F SKU.
> * When you create a workspace with a PPU, only other PPU users can able to access the workspace and consume its content.

## Git integration questions

### How do I get started with git integration ?

Get started with git integration using the [get started instructions](git-integration/git-get-started.md).

### Deployment pipeline questions

#### What are some general deployment limitations to keep in mind?

These are some important considerations to keep in mind:

* [Deployment rule limitations](deployment-pipelines/create-rules.md#considerations-and-limitations)
* [Supported data sources for dataflow and dataset rules](deployment-pipelines/create-rules.md#supported-data-sources-for-dataflow-and-dataset-rules)
* [Incremental refresh](deployment-pipelines/understand-the-deployment-process.md#considerations-and-limitations)
* [Automation](deployment-pipelines/pipeline-automation.md#considerations-and-limitations)

### How can I assign workspaces to all the stages in a pipeline?

You can either assign one workspace to your pipeline and then deploy it across the pipeline, or assign a different workspace to each pipeline stage. For more information, see [assign a workspace to a deployment pipeline](deployment-pipelines/assign-pipeline.md).

### Does deployment pipelines support multi-geo?

Multi-geo is supported. It may take longer to deploy content between stages in different geographic locations.

### What can I do if I have a dataset with DirectQuery or Composite connectivity mode, that uses variation or auto date/time tables?

Datasets that use DirectQuery or Composite connectivity mode and have variation or [auto date/time](/power-bi/transform-model/desktop-auto-date-time.md) tables aren't supported in deployment pipelines. If your deployment fails and you think it's because you have a dataset with a variation table, you can look for the [variations](/dotnet/api/microsoft.analysisservices.tabular.column.variations?view=analysisservices-dotnet) property in your table's columns. You can use one of the methods listed below to edit your dataset so that it works in deployment pipelines.

* In your dataset, instead of using DirectQuery or Composite mode, use [import](/power-bi/connect-data/service-dataset-modes-understand.md#import-mode) mode.

* Remove the [auto date/time](/power-bi/transform-model/desktop-auto-date-time.md) tables from your dataset. If necessary, delete any remaining variations from all the columns in your tables. Deleting a variation may invalidate user authored measures, calculated columns and calculated tables. Use this method only if you understand how your dataset model works as it may result in data corruption in your visuals.

## Next steps

* [Get started with git integration](git-integration/git-get-started.md)
* [Get started with deployment pipelines](deployment-pipelines/get-started-with-deployment-pipelines.md)
