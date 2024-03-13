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

1. From your workspace view, you will see the status of the pipeline artifact as _synced_ or _uncommitted_.
1. When there is uncommitted work from your workspace, a Source Control indicator at the top of the view will indicate that there is work that is not yet committed. Select that button to choose which artifacts to sync to your repo or from your repo to your workspace.

## Steps for testing deployment pipelines

1. As opposed to Git Integration, there is no manual set-up required from the user, you can start using deployment pipelines directly from your existing workspace
1. Select the **Deployment pipelines** icon on the app navigator on the left of the screen.

   :::image type="content" source="media/git-integration-deployment-pipelines/deployment-pipelines.png" alt-text="Screenshot showing where to select the Deployment pipelines button on the left-hand app navigator for Fabric.":::

1. This navigates to the deployment pipelines home page where you can start a new pipeline or manage existing pipelines.
1. From there, you can map your workspaces to your dev, test, and prod workspace environments.

   :::image type="content" source="media/git-integration-deployment-pipelines/assign-workspaces.png" alt-text="Screenshot showing where to assign workspaces for dev, test, and prod environments.":::

1. Refer to general documentation on [Fabric deployment pipelines](/cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).

## Current limitations

- Currently, pipelines with activities that reference Fabric artifacts (for example, Notebook or Invoke pipeline activities) require the dependent item to already have been imported and present in the target workspace. For now, you must sequence your deployments in a way that those items have been loaded first.
- Deployment rules in Deployment Pipelines (built-in Fabric CICD) are not yet supported.

## Next steps

- [Introduction to deployment pipelines](/cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
- [Understand the deployment process](/cicd/deployment-pipelines/understand-the-deployment-process.md)
- [Automate deployment pipelines](/cicd/deployment-pipelines/pipeline-automation.md)