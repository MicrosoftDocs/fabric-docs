---
title: Eventstream CI/CD - Git Integration and Deployment Pipeline
description: Learn how to use git integration and deployment pipeline for Eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 4/08/2025
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
   :::image type="content" source="./media/eventstream-cicd/connect-to-git.png" alt-text="Screenshot that shows connect a workspace to git." lightbox="./media/eventstream-cicd/connect-to-git.png":::
3. Choose a git repository and enter a git folder. One workspace is synced to a git folder.
   :::image type="content" source="./media/eventstream-cicd/enter-git-folder.png" alt-text="Screenshot that shows enter a git folder to be synced with." lightbox="./media/eventstream-cicd/enter-git-folder.png":::
4. From your workspace view, you see the status of the Eventstream item as **Synced**.
   :::image type="content" source="./media/eventstream-cicd/workspace-git-status.png" alt-text="Screenshot that shows git status in the workspace." lightbox="./media/eventstream-cicd/workspace-git-status.png":::

## Commit Eventstream changes to git

After making changes to your Eventstream item, you see an **Uncommitted** git status beside your Eventstream item in the workspace view. Select the **Source control** button at the top of the view and choose the Eventstream item to be committed.

:::image type="content" source="./media/eventstream-cicd/uncommitted-eventstream.png" alt-text="Screenshot that shows uncommitted eventstream item in the workspace." lightbox="./media/eventstream-cicd/uncommitted-eventstream.png":::

Once the Eventstream item is synced, you can view the latest Eventstream change in your git repository.

:::image type="content" source="./media/eventstream-cicd/view-in-git-repo.png" alt-text="Screenshot that shows the latest Eventstream change in git repo." lightbox="./media/eventstream-cicd/view-in-git-repo.png":::

## Update Eventstream items from Git

If you make changes to your Eventstream item in the git repository, you see an **Update Required** git status beside your Eventstream item in the workspace view. Select the **Source control** button at the top of the view and select **Update all** to merge the latest Eventstream changes.

:::image type="content" source="./media/eventstream-cicd/update-from-git.png" alt-text="Screenshot that shows update eventstream items from git." lightbox="./media/eventstream-cicd/update-from-git.png":::

## Deploy Eventstream items from one stage to another

1. In the workspace view, select Create deployment pipeline. You can also create a pipeline from the deployment pipelines entry point in Fabric (at the bottom of the workspace list).
    :::image type="content" source="./media/eventstream-cicd/create-pipeline.png" alt-text="Screenshot that shows where to create a pipeline." lightbox="./media/eventstream-cicd/create-pipeline.png":::
2. You can define how many stages it should have and what they should be called. The number of stages is permanent and can't be changed after the pipeline is created.
3. Give a name to your pipeline. The default pipeline has three stages named **Development**, **Test**, and **Production**. You can rename the stages and have anywhere between 2-10 stages in a pipeline. Then select **Create and continue**.
    :::image type="content" source="./media/eventstream-cicd/name-pipeline.png" alt-text="Screenshot that shows name a pipeline and stage." lightbox="./media/eventstream-cicd/name-pipeline.png":::
4. After creating a pipeline, you can assign a workspace to each stage.
    :::image type="content" source="./media/eventstream-cicd/assign-a-workspace.png" alt-text="Screenshot that shows how to assign a workspace to each stage." lightbox="./media/eventstream-cicd/assign-a-workspace.png":::
5. Once you have content in a pipeline stage, you can select the items and **Deploy** it to the next stage, even if the next stage workspace has content. Paired items are overwritten.
    :::image type="content" source="./media/eventstream-cicd/deploy-to-stage.png" alt-text="Screenshot that shows how to deploy content to different stages." lightbox="./media/eventstream-cicd/assign-a-workspace.png":::

You can review the deployment history to see the last time content was deployed to each stage. Deployment history is useful for establishing when a stage was last updated. It can also be helpful if you want to track time between deployments.

To learn more about deployment pipeline, visit [Get started with deployment pipelines](/fabric/cicd/deployment-pipelines/get-started-with-deployment-pipelines)

## Resource support for CI/CD

Most Eventstream resources support CI/CD through Git integration and deployment pipelines. Both nodes (sources, destinations and operators) and Eventstream capabilities (such as schema set) are listed below.  

| Full support | Partial support | Not supported |
|--------------|-----------------|---------------|
| Most sources and all destinations<br>All standard operators (except custom code)<br>Most capabilities (e.g., multiple-schema inferencing) | Azure SQL DB (CDC)<br>Azure SQL Managed Instance (CDC)<br>MySQL DB (CDC)<br>PostgreSQL Database CDC<br>SQL Server on VM (CDC)<br> | MongoDB CDC (preview)<br>SQL code editor (custom operator)<br>Pause/resume state |

> [!NOTE]
> **Partial support** means the resource supports CI/CD, but advanced settings configuration is currently not supported and will revert to defaults after deployment.
>
> After CI/CD (Git integration and deployment pipeline), all resources in the target eventstream become active, unless they fail due to connection or configuration issues. The resources in the original eventstream (exported to Git) and in the eventstream being deployed retain their states.

## Limitation

* **Git Integration** and **Deployment Pipeline** have limited support for cross-workspace scenarios. To avoid issues, make sure all Eventstream destinations within the same workspace. Cross-workspace deployment may not work as expected.
* If an Eventstream includes an Eventhouse destination using **Direct Ingestion** mode, you’ll need to manually reconfigure the connection after importing or deploying it to a new workspace.

## Related content

- [Get started with Git integration](/fabric/cicd/git-integration/git-get-started)
- [Choose the best Fabric CI/CD workflow option for you](/fabric/cicd/manage-deployment)
