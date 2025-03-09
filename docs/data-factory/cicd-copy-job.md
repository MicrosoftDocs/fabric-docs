---
title: CI/CD for copy job in Data Factory
#customer intent: As a developer, I want to set up CI/CD for copy job in Data Factory so that I can automate integration, testing, and deployment.
description: This article describes how to set up continuous integration and delivery (CI/CD) for copy job in Data Factory for Microsoft Fabric.
author: dearandyxu
ms.author: yexu
ms.topic: how-to
ms.date: 11/05/2024
---

# CI/CD for Copy job (preview) in Data Factory in Microsoft Fabric

To build successful data analytics projects with Copy job, it is very important to have source control, continuous integration, continuous deployment, and collaborative development environments. 

In Fabric, there are two features we currently support in collaboration with the Application Lifecycle Management (ALM) team: Git integration and deployment pipelines. These features allow users to import/export workspace resources with individual updates.

With Git integration and deployment pipeline supported for Copy job, users can leverage their own Git repositories in Azure DevOps or GitHub and utilize Fabric’s built-in Deployment Pipelines, enabling seamless CI/CD workflows. This integration marks an important step toward expanding CI/CD capabilities across all Fabric items, empowering users with advanced, reliable development tools for their data projects.

## Get started with Git integration for Copy job

Take the following steps to set up Git integration for your Copy job in Data Factory:

### Prerequisites for Git integration

To access Git with your Microsoft Fabric workspace, ensure the following prerequisites for both Fabric and Git.

- Either a [Power BI Premium license](/power-bi/enterprise/service-premium-what-is) or [Fabric capacity](../enterprise/licenses.md#capacity).
- Enabled the following tenant switches from the admin portal:
  - [Users can create Fabric items](../admin/fabric-switch.md)
  - [Users can synchronize workspace items with their Git repositories](../admin/git-integration-admin-settings.md#users-can-synchronize-workspace-items-with-their-git-repositories)
  - (For GitHub users only) [Users can synchronize workspace items with GitHub repositories](../admin/git-integration-admin-settings.md#users-can-sync-workspace-items-with-github-repositories)
- Either an Azure DevOps organization or GitHub account.
  - For an Azure DevOps organization:
    - An active Azure account registered to the same user that is using the Fabric workspace. [Create a free account](https://azure.microsoft.com/products/devops/).
    - Access to an existing repository
  - For a GitHub account:
    - An active GitHub account. [Create a free account](https://github.com/).
    - Either a [fine grained token](https://github.com/settings/personal-access-tokens/new) with _read_ and _write_ permissions for _Contents_, under repository permissions, or a [GitHub classic token](https://github.com/settings/tokens/new) with repo scopes enabled.

### Step 1: Connect to a Git repository

To use Git integration with Copy job in Fabric, you first need to connect to a Git repository, as described here.

1. Sign into Fabric and navigate to the workspace you want to connect to Git.
1. Select **Workspace settings**.

   :::image type="content" source="media/cicd-data-pipelines/workspace-settings.png" alt-text="Screenshot showing where to select Workspace settings in Fabric UI.":::

1. Select **Git integration**.
1. Select your Git provider. Currently, Fabric only supports _Azure DevOps_ or _GitHub_. If you use GitHub, you need to select **Add account** to connect your GitHub account. After you sign in, select Connect to allow Fabric to access your GitHub account.

   :::image type="content" source="media/cicd-data-pipelines/add-github-account.png" alt-text="Screenshot showing where to add a GitHub account for a Fabric workspace Git integration.":::

### Step 2: Connect to a workspace

Once you connect to a Git repository, you need to connect to a workspace, as described here.

1. From the dropdown menu, specify the following details about the branch you want to connect to:

   1. For Azure DevOps branch connections, specify the following details:
      - **Organization**: The Azure DevOps organization name.
      - **Project**: The Azure DevOps project name.
      - **Repository**: The Azure DevOps repository name.
      - **Branch**: The Azure DevOps branch name.
      - **Folder**: The Azure DevOps folder name.

   1. For GitHub branch connections, specify the following details:
      - **Repository URL**: The GitHub repository URL.
      - **Branch**: The GitHub branch name.
      - **Folder**: The GitHub folder name.

1. Select **Connect and sync**.

1. After you connect, the Workspace displays information about source control that allows users to view the connected branch, the status of each item in the branch, and the time of the last sync. 

   :::image type="content" source="media/cicd-copy-job/workspace-git-status.png" alt-text="Screenshot showing the Fabric workspace with Git status and other details reported for Copy job.":::

### Step 3: Commit changes to Git

You can now commit changes to Git, as described here.

1. Go to the workspace.
1. Select the **Source control** icon. This icon shows the number of uncommitted changes.
1. Select the **Changes** tab from the **Source control** panel. A list appears with all the items you changed, and an icon indicating the status.
1. Select the items you want to commit. To select all items, check the top box.
1. _(Optional)_ Add a commit comment in the box.
1. Select **Commit**.

After the changes are committed, the items that were committed are removed from the list, and the workspace will point to the new commit that it synced to.

   :::image type="content" source="media/cicd-copy-job/source-control-commit.png" alt-text="Screenshot of a committed Copy job item.":::


## Get started with deployment pipelines for Git

Take the following steps to use Git deployment pipelines with your Fabric workspace. 

### Prerequisites for deployment pipelines

Before you get started, be sure to set up the following prerequisites:

- An active [Microsoft Fabric subscription](../enterprise/licenses.md).
- Admin access of a [Fabric workspace](../fundamentals/create-workspaces.md).

### Step 1: Create a deployment pipeline

1. From the **Workspaces** flyout, select **Deployment pipelines**.

### Step 2: Name the pipeline and assign stages

1. In the **Create deployment pipeline** dialog box, enter a name and description for the pipeline, and select **Next**.
1. Set your deployment pipeline’s structure by defining the required stages for your deployment pipeline. By default, the pipeline has three stages: _Development_, _Test_, and _Production_.

### Step 3: Assign a workspace to the deployment pipeline

After creating a pipeline, you need to add content you want to manage to the pipeline. Adding content to the pipeline is done by assigning a workspace to the pipeline stage. You can assign a workspace to any stage. Follow the instructions to [Assign a workspace to a pipeline](../cicd/deployment-pipelines/assign-pipeline.md#assign-a-workspace-to-any-vacant-pipeline-stage).

### Step 4: Deploy to an empty stage

1. When you finish working with content in one pipeline stage, you can deploy it to the next stage. Deployment pipelines offer three options for deploying your content:

   - **[Full deployment](../cicd/deployment-pipelines/deploy-content.md#deploy-all-content)**: Deploy all your content to the target stage.
   - **[Selective deployment](../cicd/deployment-pipelines/deploy-content.md#selective-deployment)**: Select which content to deploy to the target stage.
   - **Backward deployment**: Deploy content from a later stage to an earlier stage in the pipeline. Currently, backward deployment is only possible when the target stage is empty (has no workspace assigned to it).

1. After you choose how to deploy your content, you can [review your deployment and leave a note](../cicd/deployment-pipelines/deploy-content.md#review-your-deployment-and-leave-a-note).

### Step 5: Deploy content from one stage to another

1. Once you have content in a pipeline stage, you can deploy it to the next stage, even if the next stage workspace has content. [Paired items](../cicd/deployment-pipelines/assign-pipeline.md#item-pairing) are overwritten. You can learn more about this process, in the [Deploy content to an existing workspace](../cicd/deployment-pipelines/understand-the-deployment-process.md#deploy-content-from-one-stage-to-another) section.
1. You can review the deployment history to see the last time content was deployed to each stage. To examine the differences between the two pipelines before you deploy, see [Compare content in different deployment stages](../cicd/deployment-pipelines/compare-pipeline-content.md).

   :::image type="content" source="media/cicd-copy-job/deployment-pipeline.png" alt-text="Screenshot of deployment pipeline for Copy job.":::


## Known limitations

The following known limitations apply to CI/CD for Copy job in Data Factory in Microsoft Fabric:

- **Workspace variables**: CI/CD doesn't currently support workspace variables.
- **Git Integration limited support**: Currently, Fabric only supports Git integration with Azure DevOps and GitHub. Azure DevOps Git integration is recommended as GitHub Git integration has more limitations.

## Related content

- [Introduction to the CI/CD process as part of the ALM cycle in Microsoft Fabric](../cicd/cicd-overview.md?source=recommendations)
- [Get started with Git integration, the Fabric Application Lifecycle Management (ALM) tool](../cicd/git-integration/git-get-started.md?tabs=azure-devops%2CAzure%2Ccommit-to-git)
- [Get started using deployment pipelines, the Fabric Application Lifecycle Management (ALM) tool](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md?tabs=from-fabric%2Cnew%2Cstage-settings-new)
