---
title: Notebook source control and deployment
description: Learn about Fabric notebook Git integration and deployment pipelines.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form: Notebook git deployment pipelines alm ci cd
---

# Notebook source control and deployment

This article explains how Git integration and deployment pipelines work for notebooks in Microsoft Fabric. Learn how to set up a connection to your repository, manage your notebooks, and deploy them across different environments.

## Notebook Git integration

Fabric notebooks offer Git integration for source control with Azure DevOps. With Git integration, you can back up and version your notebook, revert to previous stages as needed, collaborate or work alone using Git branches, and manage your notebook content lifecycle entirely within Fabric.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

### Set up a connection

From your workspace settings, you can easily set up a connection to your repo to commit and sync changes. To set up the connection, see [Get started with Git integration](../cicd/git-integration/git-get-started.md). Once connected, your items, including notebooks, appear in the **Source control** panel.

:::image type="content" source="media\notebook-source-control-deployment\git-source-panel.png" alt-text="Screenshot of workspace source control panel." lightbox="media\notebook-source-control-deployment\git-source-panel.png":::

After you successfully commit the notebook instances to the Git repo, you see the notebook folder structure in the repo.

You can now execute future operations, like **Create pull request**.

### Notebook representation in Git

The following image is an example of the file structure of each notebook item in the repo:

:::image type="content" source="media\notebook-source-control-deployment\notebook-repo-view.png" alt-text="Screenshot of notebook Git repo file structure." lightbox="media\notebook-source-control-deployment\notebook-repo-view.png":::

When you commit the notebook item to the Git repo, the notebook code is converted to a source code format, instead of a standard .ipynb file. For example, a PySpark notebook converts to a notebook-content.py file. This approach allows for easier code reviews using built-in diff features.

In the item content source file, metadata (including the default lakehouse and attached environment), markdown cells, and code cells are preserved and distinguished. This approach supports a precise recovery when you sync back to a Fabric workspace.

Notebook cell output isn't included when syncing to Git.

:::image type="content" source="media\notebook-source-control-deployment\notebook-content.png" alt-text="Screenshot of notebook Git repo content format." lightbox="media\notebook-source-control-deployment\notebook-content.png":::

> [!NOTE]
>
> - Currently, files in **Notebook resources** aren't committed to the repo. Committing these files is supported in an upcoming release.
> - The attached environment persists in a notebook when you sync from repo to a Fabric workspace. Currently, cross-workspace reference environments aren't supported. You must manually attach to a new environment or workspace default settings in to run the notebook.
> - The default lakehouse ID persists in the notebook when you sync from the repo to a Fabric workspace. If you commit a notebook with the default lakehouse, you must refer a newly created lakehouse item manually. For more information, see [Lakehouse Git integration](lakehouse-git-deployment-pipelines.md).

## Notebook in deployment pipelines

You can also use Deployment pipeline to deploy your notebook code across different environments, such as development, test, and production. This feature can enable you to streamline your development process, ensure quality and consistency, and reduce manual errors with lightweight low-code operations. You can also use deployment rules to customize the behavior of your notebooks when they're deployed, such as changing the default lakehouse of a notebook.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Use the following steps to complete your notebook deployment using the deployment pipeline.

1. Create a new deployment pipeline or open an existing deployment pipeline. (For more information, see [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).)

1. Assign workspaces to different stages according to your deployment goals.

1. Select, view, and compare items including notebooks between different stages, as shown in the following example.

    :::image type="content" source="media\notebook-source-control-deployment\compare-stages.png" alt-text="Screenshot of notebook in deployment pipeline." lightbox="media\notebook-source-control-deployment\compare-stages.png":::

1. Select **Deploy** to deploy your notebooks across the Development, Test, and Production stages.

1. (Optional.) You can select **Deployment rules** to create deployment rules for a deployment process. Deployment rules entry is on the target stage for a deployment process.

    :::image type="content" source="media\notebook-source-control-deployment\deploy-rule-entry.png" alt-text="Screenshot of deployment rules entry." lightbox="media\notebook-source-control-deployment\deploy-rule-entry.png":::

    Fabric supports parameterizing the default lakehouse for **each** notebook instance when deploying with deployment rules. Three options are available to specify the target default lakehouse: Same with source lakehouse, _N/A_, and other lakehouse.

    :::image type="content" source="media\notebook-source-control-deployment\set-default-lakehouse.png" alt-text="Screenshot of set default lakehouse." lightbox="media\notebook-source-control-deployment\set-default-lakehouse.png":::

    You can achieve secured data isolation by setting up this rule. Your notebook's default lakehouse is replaced by the one you specified as target during deployment.

    > [!NOTE]
    > When you choose to adopt other lakehouses in the target environment, **Lakehouse ID** is a must have. You can find the ID of a lakehouse from the lakehouse URL link.

1. Monitor the deployment status from **Deployment history**.

## Related content

- [Manage and execute Fabric notebooks with public APIs](notebook-public-api.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
