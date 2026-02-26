---
title: CI/CD for Apache Airflow in Data Factory in Microsoft Fabric 
#customer intent: As a developer, I want to set up CI/CD for Apache Airflow Jobs in Data Factory so that I can automate integration, testing, and deployment.
description: This article describes how to set up continuous integration and delivery (CI/CD) for Apache Airflow in Data Factory for Microsoft Fabric.
ms.reviewer: conxu
ms.topic: how-to
ms.date: 08/20/2025
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

- You need a [Power BI Premium license](/power-bi/enterprise/service-premium-what-is) or [Fabric capacity](../enterprise/licenses.md#capacity).
- Make sure these admin settings are turned on:
   - [Users can create Fabric items](../admin/fabric-switch.md)
   - [Users can sync workspace items with their Git repositories](../admin/git-integration-admin-settings.md#users-can-synchronize-workspace-items-with-their-git-repositories)
   - (For GitHub users) [Users can sync workspace items with GitHub repositories](../admin/git-integration-admin-settings.md#users-can-sync-workspace-items-with-github-repositories)
- You need either an Azure DevOps organization or a GitHub account.
   - For Azure DevOps:
      - Sign up for a free [Azure account](https://azure.microsoft.com/products/devops/) if you don’t have one.
      - Make sure you have access to a repository.
   - For GitHub:
      - Sign up for a free [GitHub account](https://github.com/) if you don’t have one.
      - You need a [fine-grained token](https://github.com/settings/personal-access-tokens/new) with _read_ and _write_ permissions for _Contents_, or a [GitHub classic token](https://github.com/settings/tokens/new) with repo scopes enabled.

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

Follow these steps to use deployment pipelines with your Fabric workspace:

1. [Prerequisites](#prerequisites-for-deployment-pipelines)
1. [Create a deployment pipeline](#step-1-create-a-deployment-pipeline)
1. [Assign a workspace to the deployment pipeline](#step-2-assign-a-workspace-to-the-deployment-pipeline)
1. [Deploy to an empty stage](#step-3-deploy-to-an-empty-stage)
1. [Deploy content from one stage to another](#step-4-deploy-content-from-one-stage-to-another)

### Prerequisites for deployment pipelines

Before you get started, be sure to set up the following prerequisites:

- An active [Microsoft Fabric subscription](../enterprise/licenses.md).
- Admin access on a [Fabric workspace](../fundamentals/create-workspaces.md).

### Step 1: Create a deployment pipeline

1. In the **Workspaces** menu, select **Deployment pipelines**.
2. When the **Create deployment pipeline** window opens, enter a name and description for your pipeline, then select **Next**.
3. Choose how many stages you want in your pipeline. By default, you see three stages: _Development_, _Test_, and _Production_.

### Step 2: Assign a workspace to the deployment pipeline

After creating a deployment pipeline, you need to add content you want to manage to the deployment pipeline. Adding content to the deployment pipeline is done by assigning a workspace to any deployment pipeline stage:

1. Open the deployment pipeline.

2. In the stage you want to assign a workspace to, expand the dropdown titled **Add content to this stage**.

3. Select the workspace you want to assign to this stage.

    :::image type="content" source="../cicd/deployment-pipelines/media/assign-pipeline/assign-workspace-new.png" alt-text="A screenshot showing the assign workspace dropdown in a deployment pipelines empty stage in the new UI.":::

4. Select Assign.

### Step 3: Deploy to an empty stage

When you're ready to move your content from one pipeline stage to the next, you can deploy it using one of these options:

- **Full deployment**: Select this to deploy everything in the current stage to the next stage.
- **Selective deployment**: Pick only the items you want to deploy.
- **Backward deployment**: Move content from a later stage back to an earlier stage. You can only do this if the target stage is empty (no workspace assigned).

After you choose your deployment option, you can [review the details and leave a note about the deployment if you'd like](../cicd/deployment-pipelines/deploy-content.md#review-your-deployment-and-leave-a-note).

### Step 4: Deploy content from one stage to another

1. Once you have content in a pipeline stage, you can deploy it to the next stage, even if the next stage workspace has content. [Paired items](../cicd/deployment-pipelines/assign-pipeline.md#item-pairing) are overwritten. You can learn more about this process, in the [Deploy content to an existing workspace](../cicd/deployment-pipelines/understand-the-deployment-process.md#deploy-content-from-one-stage-to-another) article
2. You can also review the deployment history to see the last time content was deployed to each stage. To examine the differences between the two pipelines before you deploy, see [Compare content in different deployment stages](../cicd/deployment-pipelines/compare-pipeline-content.md).

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
