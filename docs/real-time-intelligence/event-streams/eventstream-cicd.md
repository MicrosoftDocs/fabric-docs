---
title: Eventstream CI/CD - Git Integration and Deployment Pipeline
description: Learn how to use git integration and deployment pipeline for Eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 10/30/2024
ms.search.form: cicd
---

# Eventstream CI/CD - Git Integration and Deployment Pipeline
This article explains how Git integration and deployment pipelines work for Eventstream in Fabric. Learn how to sync a workspace to your Git repository, commit your Eventstream items to Git, and deploy them across different workspaces.

Fabric platform offers Git integration and Deployment pipelines for different scenarios:

* Use **Git integration** to sync a workspace to a git repo, and manage incremental change, team collaboration, commit history in Eventstream items.
* Use **Deployment pipelines** to deploy a workspace (with Eventstream items) to different development, test, and production environments.

## Prerequisites

To access the CI/CD features for Eventstream, you need to meet the following requirements:

* A Fabric capacity to use all supported Fabric items. If you don't have one yet, sign up for a free trial.
* Git integration must be enabled from the Admin portal: [Users can synchronize workspace items with their Git repositories](../../admin/git-integration-admin-settings.md).
* Access to an existing repository from **Azure DevOps** or **GitHub**.
* You're an admin of a Fabric workspace.

## Connect a workspace to a Git repo

Only a workspace admin can connect a workspace to a repository, but once connected, anyone with permission can work in the workspace. If you're not an admin, ask your admin for help with connecting.

To connect a workspace to an Azure or GitHub Repo, follow these steps:

1. Sign into Fabric and navigate to the workspace you want to connect with.
2. Go to **Workspace settings** and select **Git integration**
   :::image type="content" source="./media/eventstream-cicd/connect-to-git.png" alt-text="Screenshot that shows connect a workspace to git.":::
3. Choose a git repository and enter a git folder. One workspace is synced to a git folder.
   :::image type="content" source="./media/eventstream-cicd/enter-git-folder.png" alt-text="Screenshot that shows enter a git folder to be synced with.":::
4. From your workspace view, you see the status of the Eventstream item as **Synced**.
   :::image type="content" source="./media/eventstream-cicd/workspace-git-status.png" alt-text="Screenshot that shows git status in the workspace.":::

## Commit Eventstream changes to git

After making changes to your Eventstream item, you see an **Uncommitted** git status beside your Eventstream item in the workspace view. Select the **Source control** button at the top of the view and choose the Eventstream item to be committed.

:::image type="content" source="./media/eventstream-cicd/uncommitted-eventstream.png" alt-text="Screenshot that shows uncommitted eventstream item in the workspace.":::

Once the Eventstream item is synced, you can view the latest Eventstream change in your git repository.

:::image type="content" source="./media/eventstream-cicd/view-in-git-repo.png" alt-text="Screenshot that shows the latest Eventstream change in git repo.":::

## Update Eventstream items from Git

If you make changes to your Eventstream item in the git repository, you see an **Update Required** git status beside your Eventstream item in the workspace view. Select the **Source control** button at the top of the view and select **Update all** to merge the latest Eventstream changes.

:::image type="content" source="./media/eventstream-cicd/update-from-git.png" alt-text="Screenshot that shows update eventstream items from git.":::

## Deploy Eventstream items from one stage to another

1. In the workspace view, select Create deployment pipeline. You can also create a pipeline from the deployment pipelines entry point in Fabric (at the bottom of the workspace list).
    :::image type="content" source="./media/eventstream-cicd/create-pipeline.png" alt-text="Screenshot that shows where to create a pipeline.":::
2. You can define how many stages it should have and what they should be called. The number of stages are permanent and can't be changed after the pipeline is created.
3. Give a name to your pipeline. The default pipeline has three stages named **Development**, **Test**, and **Production**. You can rename the stages and have anywhere between 2-10 stages in a pipeline. Then select **Create and continue**.
    :::image type="content" source="./media/eventstream-cicd/name-pipeline.png" alt-text="Screenshot that shows name a pipeline and stage.":::
4. After creating a pipeline, you can assign a workspace to each stage.
    :::image type="content" source="./media/eventstream-cicd/assign-a-workspace.png" alt-text="Screenshot that shows how to assign a workspace to each stage.":::

To learn more about deployment pipeline, visit [Get started with deployment pipelines](/fabric/cicd/deployment-pipelines/get-started-with-deployment-pipelines)

## Related content

- [Get started with Git integration](/fabric/cicd/git-integration/git-get-started)
- [Choose the best Fabric CI/CD workflow option for you](/fabric/cicd/manage-deployment)
