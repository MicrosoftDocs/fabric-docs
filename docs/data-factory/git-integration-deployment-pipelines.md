---
title: Git integration and deployment for data pipelines in Data Factory for Microsoft Fabric
description: This article describes how to use continuous integration and deployment (CI/CD) with Git integration for data pipelines in Microsoft Fabric.
author: kromerm
ms.author: makromer
ms.topic: conceptual
ms.date: 03/26/2024
---

# Git integration and deployment for data pipelines in Data Factory for Microsoft Fabric

> [!IMPORTANT]
> Git integration and deployment for data pipelines in Data Factory for Microsoft Fabric are currently in preview. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In Fabric, continuous integration and development (CI/CD) features with Git Integration & deployment pipelines allow users to import/export workspace resources with individual updates, deviating from the Azure Data Factory model where whole factory updates using ARM template export methodology is preferred. This change in methodology allows customers to selectively choose which pipelines to update without pausing the whole factory. Both Git integration (bring-your-own Git) as well as deployment pipelines (built-in CI/CD) use the concept of associated a single workspace with a single environment. You need to map out different workspaces to your different environments such as dev, test, and production.

## Create a new branch

From the Fabric UI, go to New Branch and create a new development branch for your work. Refer to screenshots in the following sections for the **Branch** property.

## Develop new pipelines from the new branch

Use this methodology to collaborate as a team on your data factory. Export the contents of your pipeline and apply changes accordingly. Refer to the steps in the following section to create a new branch and begin developing your pipeline changes there.

## Steps for testing Git integration

1. Select your workspace from the left navigation bar and connect your workspace to your Git repository by selecting **Workspace settings**.

   :::image type="content" source="media/git-integration-deployment-pipelines/workspace-settings.png" alt-text="Screenshot showing where to select the Workspace settings button for a workspace.":::

1. Select **Git integration**, then provide your organization, project, and Git repository. Under the **Branch** dropdown, select **+ New Branch**.

   :::image type="content" source="media/git-integration-deployment-pipelines/git-integration-new-branch.png" alt-text="Screenshot showing where to select the Git integration tab and + New Branch button on the Workspace settings dialog.":::

1. From your workspace view, you will see the status of the pipeline artifact as “synced” or “uncommitted”
1. When there is uncommitted work from your workspace, a Source Control indicator at the top of the view will indicate that there is work that is not yet committed.
1. Click that button to pick which artifacts to sync to your repo or from your repo to your workspace

