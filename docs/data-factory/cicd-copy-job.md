---
title: CI/CD for copy job in Data Factory
#customer intent: As a developer, I want to set up CI/CD for copy job in Data Factory so that I can automate integration, testing, and deployment.
description: This article describes how to set up continuous integration and delivery (CI/CD) for copy job in Data Factory for Microsoft Fabric.
ms.reviewer: yexu
ms.topic: how-to
ms.date: 06/20/2025
ms.custom: copy-job
ai-usage: ai-assisted
---

# CI/CD for Copy job in Data Factory in Microsoft Fabric

To run successful data analytics projects with Copy job, you want to use source control, continuous integration, continuous deployment, and a collaborative environment.

In Microsoft Fabric, you get two main tools for this: Git integration and deployment pipelines. These let you manage workspace resources and update them as needed.

With Git integration and deployment pipelines, you can connect your own Git repositories in Azure DevOps or GitHub and use Fabric’s built-in deployment tools. This makes it easy to set up smooth CI/CD workflows, so you can build, test, and deploy your data projects with confidence.

Additionally, with Variable library support, you can parameterize connections in Copy Job. This powerful capability streamlines CI/CD by externalizing connection values, enabling you to deploy the same Copy Job across multiple environments while the Variable library injects the correct connection for each stage.

## Git integration for Copy job

Follow these steps to connect your Copy job in Data Factory to Git. This helps you track changes, work with your team, and keep your work safe:

1. [Prerequisites](#prerequisites-for-git-integration)
1. [Connect to a Git repository](#step-1-connect-to-a-git-repository)
1. [Connect to a workspace](#step-2-connect-to-a-workspace)
1. [Commit changes to Git](#step-3-commit-changes-to-git)

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

To use Git integration with Copy job in Fabric, you first need to connect to a Git repository:

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

   :::image type="content" source="media/cicd-copy-job/workspace-git-status.png" alt-text="Screenshot showing the Fabric workspace with Git status and other details reported for Copy job.":::

### Step 3: Commit changes to Git

You can commit your changes to Git by following these steps:

1. Go to your workspace.
1. Select the **Source control** icon. You see a number showing how many changes aren't committed yet.
1. In the **Source control** panel, select the **Changes** tab. You see a list of everything you've changed, along with status icons.
1. Choose the items you want to commit. To select everything, check the box at the top.
1. (Optional) Add a commit comment about your changes.
1. Select **Commit**.

Once you commit, those items disappear from the list, and your workspace points to the latest commit.

   :::image type="content" source="media/cicd-copy-job/source-control-commit.png" alt-text="Screenshot of a committed Copy job item.":::

## Deployment pipelines for Git

Follow these steps to use Git deployment pipelines with your Fabric workspace:

1. [Prerequisites](#prerequisites-for-deployment-pipelines)
1. [Create a deployment pipeline](#step-1-create-a-deployment-pipeline)
1. [Assign a workspace to the deployment pipeline](#step-3-assign-a-workspace-to-the-deployment-pipeline)
1. [Deploy to an empty stage](#deploy-to-an-empty-stage)
1. [Deploy content from one stage to another](#deploy-content-from-one-stage-to-another)

### Prerequisites for deployment pipelines

Before you get started, be sure to set up the following prerequisites:

- An active [Microsoft Fabric subscription](../enterprise/licenses.md).
- Admin access on a [Fabric workspace](../fundamentals/create-workspaces.md).

### Step 1: Create a deployment pipeline

1. In the **Workspaces** menu, select **Deployment pipelines**.
1. When the **Create deployment pipeline** window opens, enter a name and description for your pipeline, then select **Next**.
1. Choose how many stages you want in your pipeline. By default, you see three stages: _Development_, _Test_, and _Production_.

### Step 3: Assign a workspace to the deployment pipeline

After creating a pipeline, you need to add content you want to manage to the pipeline. Adding content to the pipeline is done by assigning a workspace to any pipeline stage:

1. Open the deployment pipeline.

1. In the stage you want to assign a workspace to, expand the dropdown titled **Add content to this stage**.

1. Select the workspace you want to assign to this stage.

    :::image type="content" source="../cicd/deployment-pipelines/media/assign-pipeline/assign-workspace-new.png" alt-text="A screenshot showing the assign workspace dropdown in a deployment pipelines empty stage in the new UI.":::

1. Select Assign.

### Deploy to an empty stage

When you're ready to move your content from one pipeline stage to the next, you can deploy it using one of these options:

- **Full deployment**: Select this to deploy everything in the current stage to the next stage.
- **Selective deployment**: Pick only the items you want to deploy.
- **Backward deployment**: Move content from a later stage back to an earlier stage. You can only do this if the target stage is empty (no workspace assigned).

After you choose your deployment option, you can [review the details and leave a note about the deployment if you'd like](../cicd/deployment-pipelines/deploy-content.md#review-your-deployment-and-leave-a-note).

### Deploy content from one stage to another

1. Once you have content in a pipeline stage, you can deploy it to the next stage, even if the next stage workspace has content. [Paired items](../cicd/deployment-pipelines/assign-pipeline.md#item-pairing) are overwritten. You can learn more about this process, in the [Deploy content to an existing workspace](../cicd/deployment-pipelines/understand-the-deployment-process.md#deploy-content-from-one-stage-to-another) article
1. You can also review the deployment history to see the last time content was deployed to each stage. To examine the differences between the two pipelines before you deploy, see [Compare content in different deployment stages](../cicd/deployment-pipelines/compare-pipeline-content.md).

   :::image type="content" source="media/cicd-copy-job/deployment-pipeline.png" alt-text="Screenshot of deployment pipeline for Copy job.":::

## Connection parameterization with Variable library for Copy job

You can do the followings to parameterize the connections in Copy job using Variable library. Learn more about [Variable library](../cicd/variable-library/variable-library-overview.md).

### Step 1: Create a Variable library

1. Select **+ New item** in Fabric to create a Variable library.
1. When the **New Variable library** window opens, enter a name for your Variable library, then select **Create**.
1. Select **+ New variable** to create new variables for both source and destination connections.
1. Add your different connection ID as value sets to your variables for different environments, such as development, test, and production. You can look up the ID for your connection from **Settings | Manage connections and gateways**. There you will find the ID for your connection by clicking **Settings** next to your connection name.

   :::image type="content" source="media/cicd-copy-job/create-variable-library.png" alt-text="Screenshot of creating Variable library for Copy job.":::

### Step 2: Use the Variable library in Copy job

1. Open your Copy job.
1. Navigate to your source and destination connections, and link them to your created Variable library.

   :::image type="content" source="media/cicd-copy-job/select-variable-library.png" alt-text="Screenshot of selecting Variable library for Copy job.":::
   
### Step 3: Activate different Connection values in each Workspace 

After deploying your Copy job from the development workspace to test or production, you can activate different connection ID by selecting the appropriate value set for each workspace.

1. Go to the target workspace and open the Variable library.
1. Activate the corresponding connection ID for that workspace in the Variable library.

   :::image type="content" source="media/cicd-copy-job/set-variable-library.png" alt-text="Screenshot of setting Variable library for Copy job.":::


## Known limitations

Here are some of the current limitations when using CI/CD for Copy job in Data Factory in Microsoft Fabric:

- **Workspace variables**: CI/CD doesn't currently support workspace variables.
- **Git Integration limited support**: Currently, Fabric only supports Git integration with Azure DevOps and GitHub. Azure DevOps Git integration is recommended as GitHub Git integration has more limitations.

## Related content

- [Introduction to the CI/CD process as part of the ALM cycle in Microsoft Fabric](../cicd/cicd-overview.md?source=recommendations)
- [Get started with Git integration, the Fabric Application Lifecycle Management (ALM) tool](../cicd/git-integration/git-get-started.md?tabs=azure-devops%2CAzure%2Ccommit-to-git)
- [Get started using deployment pipelines, the Fabric Application Lifecycle Management (ALM) tool](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md?tabs=from-fabric%2Cnew%2Cstage-settings-new)
