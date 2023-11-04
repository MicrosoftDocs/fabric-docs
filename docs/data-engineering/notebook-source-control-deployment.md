---
title: Notebook Source control and Deployment
description: Instruction of notebook git integration, and deployment pipelines.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: conceptual
ms.date: 11/2/2023
ms.search.form: Notebook git deployment pipelines alm ci cd
---

# Notebook source control and deployment

This article explains how Git integration and deployment pipelines work for notebooks in Microsoft Fabric. How to set up a connection to your repository, manage your notebooks, and deploy them across different environments. 

## Notebook Git integration

Fabric notebook offers Git integration for source control using Azure DevOps. With git integration, you can back up and version your notebook, revert to previous stages as needed, collaborate or work alone using git branches, and manage their content lifecycle end-to-end within Fabric.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

### Set up a connection

You can easily set up a connection to your Repo from the workspace settings to commit and sync changes following the [Get started with Git integration](../cicd/git-integration/git-get-started.md) of Fabric platform. Once connected, your items including notebooks appear in the 'Source control' panel.

:::image type="content" source="media\notebook-source-control-deployment\git-source-panel.png" alt-text="Screenshot of workspace source control panel." lightbox="media\notebook-source-control-deployment\git-source-panel.png":::

After the notebook instances are committed to Git repo successfully, you’ll be able to see the notebook folder structure in repo.

You can do future operations like **Create pull request** etc.

### Notebook representation in Git

Here's an example of the file structure of each notebook item in the repo:

:::image type="content" source="media\notebook-source-control-deployment\notebook-repo-view.png" alt-text="Screenshot of notebook git repo file structure." lightbox="media\notebook-source-control-deployment\notebook-repo-view.png":::

When committing the notebook item to the Git repo, the notebook code is converted to a source code format (for example, PySpark notebook to a 'notebook-content.py' file) instead of a standard ‘.ipynb’ file. This approach allows for easier code reviews using built-in diff features.

In the item content source file, metadata (include default Lakehouse, attached Environment), markdown cells, and code cells are preserved and distinguished, to support a precise recovery when synced back to a Fabric workspace.

Notebook cell output won't be included when syncing to Git.

:::image type="content" source="media\notebook-source-control-deployment\notebook-content.png" alt-text="Screenshot of notebook git repo content format." lightbox="media\notebook-source-control-deployment\notebook-content.png":::

> [!NOTE]
>
> - Files in **Notebook Resources** won't be committed to the repo for now, will be supported in an upcoming release.
> - The attached Environment will be persisted in a notebook when you sync from repo to Fabric workspace, but cross workspace reference Environment is not being supported for now, you need to manually attach to a new Environment or workspace default settings in order to run the notebook.
> - The Default lakehouse ID will be persisted in the notebook when you sync from the repo to Fabric workspace, if you commit a notebook together with the default Lakehouse, you need to refer newly created lakehouse item manually. More details please check [Lakehouse Git integration](lakehouse-git-deployment-pipelines.md).
>

## Notebook in deployment pipelines

You can also use Deployment pipeline to deploy your notebook code across different environments, such as development, test, and production. This feature can enable you to streamline your development process, ensure quality and consistency, and reduce manual errors with lightweight low-code operations. You can also use deployment rules to customize the behavior of your notebooks when they're deployed, such as changing the default Lakehouse of a Notebook.  

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Use the following steps to complete your Notebook deployment using the deployment pipeline.

1. Create a new deployment pipeline or open an existing deployment pipeline, Follow the instructions [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md) to set up your deployment pipeline.

1. Assign workspaces to different stages according to your deployment goals.

1. Select, view, and compare items including Notebooks between different stages, as the example shows.

    :::image type="content" source="media\notebook-source-control-deployment\compare-stages.png" alt-text="Screenshot of notebook in deployment pipeline." lightbox="media\notebook-source-control-deployment\compare-stages.png":::

1. Click **Deploy** button to deploy your notebooks across the Development, Test, and Production stages.

1. (Optional) You can click the **Deployment rules** to create deployment rules for a deployment process, Deployment rules entry is on the target stage for a deployment process.

    :::image type="content" source="media\notebook-source-control-deployment\deploy-rule-entry.png" alt-text="Screenshot of deployment rules entry." lightbox="media\notebook-source-control-deployment\deploy-rule-entry.png":::

    We support parameterizing the default Lakehouse for **each** notebook instance when deploying with deployment rules. 3 options are offered here to specify the target default Lakehouse: Same with source Lakehouse, _N/A_, and other Lakehouse.

    :::image type="content" source="media\notebook-source-control-deployment\set-default-lakehouse.png" alt-text="Screenshot of set default lakehouse." lightbox="media\notebook-source-control-deployment\set-default-lakehouse.png":::

    You can achieve secured data isolation by setting up this rule, your notebook's default lakehouse will be replaced by the one you specified as target during deployment.

    > [!NOTE]
    > 
    > When you choose to adopt other Lakehouse in the target environment, The _Lakehouse id_ is a must have. You can find the id of a Lakehouse from the Lakehouse URL link.

1. Monitor the deployment status from **Deployment history**.

## Next steps

- [Introduction of Notebook Public API](notebook-public-api.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
