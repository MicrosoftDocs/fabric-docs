---
title: CI/CD for Apache Airflow in Data Factory in Microsoft Fabric 
#customer intent: As a developer, I want to set up CI/CD for Apache Airflow Jobs in Data Factory so that I can automate integration, testing, and deployment.
description: This article describes how to set up continuous integration and delivery (CI/CD) for Apache Airflow in Data Factory for Microsoft Fabric.
ms.reviewer: conxu
ms.topic: how-to
ms.date: 06/10/2025
ms.custom: airflows
ai-usage: ai-assisted
---

# CI/CD for Apache Airflow in Data Factory in Microsoft Fabric

> [!IMPORTANT]
> CI/CD in Apache Airflow in Data Factory for Microsoft Fabric is currently in preview. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

[!INCLUDE[apache-airflow-note](includes/apache-airflow-note.md)]

You can use source control, CI/CD, and a shared workspace with Apache Airflow to manage your workflows.

Microsoft Fabric includes two built-in tools to support CI/CD: Git integration and deployment pipelines. These tools help you organize your Airflow pipelines and workspace resources.

Git integration lets you connect to your own repositories in Azure DevOps or GitHub. Deployment pipelines help you move updates between environments, so you only update what’s needed. Together, they make it easier to build, test, and deploy your Airflow workflows.

## Git integration for Airflow

Follow these steps to connect your Airflow in Data Factory to Git. Git helps you track changes, work with your team, and keep your work safe.

### Prerequisites for Git integration

[!INCLUDE [cicd-git-prerequisites](includes/cicd-git-prerequisites.md)]

### Step 1: Connect to a Git repository

To use Git integration with Airflow in Fabric, you first need to connect to a Git repository:

1. Sign in to Fabric and go to the workspace you want to connect to Git.
1. Select **Workspace settings**.

   :::image type="content" source="media/cicd-data-pipelines/workspace-settings.png" alt-text="Screenshot showing where to select Workspace settings in Fabric UI.":::

1. Select **Git integration**.
1. Choose your Git provider—either _Azure DevOps_ or _GitHub_. If you pick GitHub, select **Add account** to connect your GitHub account. After you sign in, select **Connect** so Fabric can access your GitHub account.

   :::image type="content" source="media/cicd-data-pipelines/add-github-account.png" alt-text="Screenshot showing where to add a GitHub account for a Fabric workspace Git integration.":::

### Step 2: Connect to a workspace

Once you’ve connected to a Git repository, you need to connect to your workspace.

1. From the dropdown menu, fill in the details about the workspace and branch you want to use:

   - **For Azure DevOps**:
     - Organization name
     - Project name
     - Repository name
     - Branch name
     - Folder name

   - **For GitHub**:
     - Repository URL
     - Branch name
     - Folder name

1. Select **Connect and sync**.

1. After connecting, select **Source control** for information about the linked branch, the status of each item, and when it last synced.

### Step 3: Commit changes to Git

You can commit your changes to Git by following these steps:

1. Go to your workspace.
2. Select the **Source control** icon. You see a number showing how many changes aren't committed yet.
3. In the **Source control** panel, select the **Changes** tab. You see a list of everything you've changed, along with status icons.
4. Choose the items you want to commit. To select everything, check the box at the top.
5. (Optional) Add a commit comment about your changes.
6. Select **Commit**.

Once you commit, those items disappear from the list, and your workspace points to the latest commit.

## Deployment pipelines

Deployment pipelines for Airflow jobs use the same workflow as other Fabric Data Factory items. For the full setup steps, including prerequisites, creating a pipeline, assigning workspaces, and deploying content between stages, see [Get started with deployment pipelines for Git](cicd-pipelines.md#get-started-with-deployment-pipelines-for-git).


## Known limitations

Here are some of the current limitations when using CI/CD for Airflow in Data Factory in Microsoft Fabric.

- Git integration does not support Airflow Git-Sync (exporting with Git Sync will not export Git Sync properties. If you import onto an item with Git Sync enabled, Git Sync will be removed) 
- Secrets are not supported. (Exporting with secrets will not export Git Sync properties. If you import onto an item with existing secrets they will NOT be removed). 
- Importing/creating a customPool with files in the same operation is not currently supported.
- Soft limitation: We support up to 50 DAGS for now. ALM operations might potentially fail if you have more than 50 DAGs. 

## Related content

- [Introduction to the CI/CD process as part of the ALM cycle in Microsoft Fabric](../cicd/cicd-overview.md?source=recommendations)
- [Get started with Git integration, the Fabric Application Lifecycle Management (ALM) tool](../cicd/git-integration/git-get-started.md?tabs=azure-devops%2CAzure%2Ccommit-to-git)
- [Get started using deployment pipelines, the Fabric Application Lifecycle Management (ALM) tool](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md?tabs=from-fabric%2Cnew%2Cstage-settings-new)
