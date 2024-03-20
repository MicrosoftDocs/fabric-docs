---
title: Frequently asked questions about the Fabric lifecycle management tools
description: Find answers to your deployment pipelines, the Fabric Application lifecycle management (ALM) tool, troubleshooting questions
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: troubleshooting
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 08/03/2023
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

Lifecycle management has two parts, integration and deployment. To understand what integration is in Fabric, refer to [the Git integration overview](./git-integration/intro-to-git-integration.md). To understand what deployment pipelines is in Fabric, refer to the [deployment pipelines overview](deployment-pipelines/intro-to-deployment-pipelines.md).

### What is Git integration?

For a short explanation of Git integration, see the [Git integration overview](./git-integration/intro-to-git-integration.md).

### What is deployment pipelines?

For a short explanation of deployment pipelines, see the [deployment pipelines overview](./deployment-pipelines/intro-to-deployment-pipelines.md).

## Licensing questions

### What licenses are needed to work with lifecycle management?

For information on licenses, see [Fabric licenses](../enterprise/licenses.md).

### What type of capacity do I need?

All workspaces must be assigned to a Fabric license. However, you can use different capacity types for different workspaces.

For information on capacity types, see [Capacity and SKUs](../enterprise/licenses.md#capacity-license).

>[!NOTE]
>
> * PPU, EM, and A SKUs only work with Power BI items. If you add other Fabric items to the workspace, you need a trial, P, or F SKU.
> * When you create a workspace with a PPU, only other PPU users can able to access the workspace and consume its content.

## Permissions

### What is the deployment pipelines permissions model?

The deployment pipelines permissions model is described the [permissions](deployment-pipelines/understand-the-deployment-process.md#permissions) section.

### What permissions do I need to configure deployment rules?

To configure deployment rules in deployment pipelines, you must be the owner of the semantic model.

## Git integration questions

### Can I connect to a repository that's in a different region than my workspace?

If the workspace capacity is in one geographic location while the Azure DevOps repo is in another location, the Fabric admin can decide whether to enable cross-geo exports. For more information, see [Users can export items to Git repositories in other geographical locations](../admin/git-integration-admin-settings.md#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview).

### How do I get started with Git integration?

Get started with Git integration using the [get started instructions](git-integration/git-get-started.md).

### Why was my item removed from the workspace?

There could be several reasons why an item was removed from the workspace.

* If the item wasn't committed and you selected it in an *undo* action, the item is removed from the workspace.
* If the item was committed, it could get removed if you switch branches and the item doesn't exist in the new branch.

## Deployment pipeline questions

### What are some general deployment limitations to keep in mind?

These are some important considerations to keep in mind:

* [Deployment rule limitations](deployment-pipelines/create-rules.md#considerations-and-limitations)
* [Supported data sources for dataflow and semantic model rules](deployment-pipelines/create-rules.md#supported-data-sources-for-dataflow-and-semantic-model-rules)
* [Incremental refresh](deployment-pipelines/understand-the-deployment-process.md#considerations-and-limitations)
* [Automation](deployment-pipelines/pipeline-automation.md#considerations-and-limitations)

### How can I assign workspaces to all the stages in a pipeline?

You can either assign one workspace to your pipeline and deploy it across the pipeline, or assign a different workspace to each pipeline stage. For more information, see [assign a workspace to a deployment pipeline](deployment-pipelines/assign-pipeline.md).

### Does deployment pipelines support multi-geo?

Multi-geo is supported. It may take longer to deploy content between stages in different geographic locations.

### What can I do if I have a dataset with DirectQuery or Composite connectivity mode, that uses variation or auto date/time tables?

Datasets that use DirectQuery or Composite connectivity mode and have variation or [auto date/time](/power-bi/transform-model/desktop-auto-date-time) tables aren't supported in deployment pipelines. If your deployment fails and you think it's because you have a dataset with a variation table, you can look for the [variations](/dotnet/api/microsoft.analysisservices.tabular.column.variations) property in your table's columns. You can use one of the methods listed below to edit your semantic model so that it works in deployment pipelines.

* In your dataset, instead of using DirectQuery or Composite mode, use [import](/power-bi/connect-data/service-dataset-modes-understand#import-mode) mode.

* Remove the [auto date/time](/power-bi/transform-model/desktop-auto-date-time) tables from your semantic model. If necessary, delete any remaining variations from all the columns in your tables. Deleting a variation may invalidate user authored measures, calculated columns and calculated tables. Use this method only if you understand how your semantic model model works as it may result in data corruption in your visuals.

### Why aren't some tiles displaying information after deployment?

When you pin a tile to a dashboard, if the tile relies on an [unsupported item](deployment-pipelines/understand-the-deployment-process.md#unsupported-items), or on an item that you don't have permissions to deploy, after deploying the dashboard the tile won't render. For example, if you create a tile from a report that relies on a semantic model you're not an admin on, when deploying the report you get an error warning. However, when deploying the dashboard with the tile, you don't an error message, the deployment will succeed, but the tile won't display any information.

### Paginated reports questions

#### Who's the owner of a deployed paginated report?

When you're deploying a paginated report for the first time, you become the owner of the report.

If you're deploying a paginated report to a stage that already contains a copy of that paginated report, you overwrite the previous report and become its owner, instead of the previous owner. In such cases, you need credentials to the underlying data source, so that the data can be used in the paginated report.

#### Where are my paginated report subreports?

Paginated report subreports are kept in the same folder that holds your paginated report. To avoid rendering problems, when you're using [selective copy](deployment-pipelines/deploy-content.md#selective-deployment) to copy a paginated report with subreports, select both the parent report and the subreports.
          
####  How do I create a deployment rule for a paginated report with a Fabric semantic model?

Paginated report rules can be created if you want to point the paginated report to the semantic model in the same stage. When creating a deployment rule for a paginated report, you need to select a database and a server.

If you're setting a deployment rule for a paginated report that doesn't have a Fabric semantic model, because the target data source is external, you need to specify both the server and the database.

However, paginated reports that use a Fabric semantic model use an internal semantic model. In such cases, you can't rely on the data source name to identify the Fabric semantic model you're connecting to. The data source name doesn't change when you update it in the target stage, by creating a data source rule or by calling the [update datasource](/rest/api/power-bi/datasets/updatedatasourcesingroup) API. When you set a deployment rule, you need to keep the database format and replace the semantic model object ID in the database field. As the semantic model is internal, the server stays the same.

* **Database** - The database format for a paginated report with a Fabric semantic model, is `sobe_wowvirtualserver-<dataset ID>`. For example, `sobe_wowvirtualserver-d51fd26e-9124-467f-919c-0c48a99a1d63`. Replace the `<dataset ID>` with your dataset's ID. You can get the dataset ID from the URL, by selecting the GUID that comes after `datasets/` and before the next forward slash.

  :::image type="content" source="media/troubleshoot-cicd/datasets-id.png" alt-text="A screenshot of the dataset ID as it appears in a Fabric URL.":::

* **Server** - The server that hosts your database. Keep the existing server as is.

#### After deployment, can I download the RDL file of the paginated report?

After a deployment, if you download the RDL of the paginated report, it might not be updated with the latest version that you can see in Power BI service.

### Dataflows

#### What happens to the incremental refresh configuration after deploying dataflows?

When you have a dataflow that contains semantic models that are configured with [incremental refresh](/power-bi/connect-data/incremental-refresh-overview), the refresh policy isn't copied or overwritten during deployment. After deploying a dataflow that includes a semantic model with incremental refresh to a stage that doesn't include this dataflow, if you have a refresh policy you'll need to reconfigure it in the target stage. If you're deploying a dataflow with incremental refresh to a stage where it already resides, the incremental refresh policy isn't copied. In such cases, if you wish to update the refresh policy in the target stage, you need to do it manually.

### Datamarts

#### Where is my datamart's dataset?

Deployment pipelines don't display datasets that belong to datamarts in the pipeline stages. When you're deploying a datamart, its dataset is also deployed. You can view your datamart's dataset in the workspace of the stage it's in.

## Related content

* [Get started with Git integration](git-integration/git-get-started.md)
* [Get started with deployment pipelines](deployment-pipelines/get-started-with-deployment-pipelines.md)
