---
title: CI/CD for pipelines in Data Factory
#customer intent: As a developer, I want to set up CI/CD for pipelines in Data Factory so that I can automate integration, testing, and deployment.
description: This article describes how to set up continuous integration and delivery (CI/CD) for pipelines in Data Factory for Microsoft Fabric.
ms.reviewer: conxu
ms.topic: how-to
ms.date: 11/14/2025
ms.custom: pipelines
ai-usage: ai-assisted
---

# CI/CD for pipelines in Data Factory in Microsoft Fabric

In Fabric Data Factory, CI/CD (continuous integration and continuous development) helps teams work faster and more reliably by automatically handling code changes—from testing to deployment.

Right now, Fabric supports two key features for CI/CD, built in partnership with the Application Lifecycle Management (ALM) team: Git integration and deployment pipelines. These tools let you import and export workspace resources one at a time, so you can update only what you need.

Unlike Azure Data Factory, which typically updates the entire factory using ARM templates, Fabric's approach gives you more control. You can update specific pipelines without pausing everything. Both Git integration (bring your own Git) and deployment pipelines (built-in CI/CD) link one workspace to one environment. So, you want to set up separate workspaces for development, testing, and production.

## Summary

This article guides you through setting up CI/CD for Data Factory pipelines in Microsoft Fabric using two approaches: Git integration and deployment pipelines. You'll learn the fundamentals of CI/CD, understand how Git version control works with pipelines, and implement automated deployment workflows.

First, review the [Understanding CI/CD, Git, and deployment pipelines](#understanding-cicd-git-and-deployment-pipelines) section to learn the core concepts of continuous integration, continuous deployment, and how Git version control integrates with deployment pipelines.

**To set up Git integration for pipelines**, follow these steps:

1. [Connect to a Git repository](#step-1-connect-to-a-git-repository) - Link your Fabric workspace to Azure DevOps or GitHub
1. [Connect to a workspace](#step-2-connect-to-a-workspace) - Specify branch and folder details
1. [Commit changes to Git](#step-3-commit-changes-to-git) - Track and version your pipeline changes
1. [Update the workspace from Git](#step-4-optional-update-the-workspace-from-git) - Sync changes from your Git repository (optional)

**To set up deployment pipelines**, follow these steps:

1. [Create a deployment pipeline](#step-1-create-a-deployment-pipeline) - Define your CI/CD pipeline structure
1. [Name the pipeline and assign stages](#step-2-name-the-pipeline-and-assign-stages) - Configure development, test, and production stages
1. [Assign a workspace to the deployment pipeline](#step-3-assign-a-workspace-to-the-deployment-pipeline) - Add content to manage
1. [Deploy to an empty stage](#step-4-deploy-to-an-empty-stage) - Move content through pipeline stages
1. [Deploy content from one stage to another](#step-5-deploy-content-from-one-stage-to-another) - Promote changes across environments

## Why developers use CI/CD

CI/CD is a practice that automates software delivery, and it resolves a few prominent pain points:

- **Manual integration issues**: without CI/CD, integrating code changes manually can lead to conflicts and errors, slowing down development.
- **Development delays**: manual deployments are time-consuming and prone to errors, leading to delays in delivering new features and updates.
- **Inconsistent environments**: different environments (development, testing, and production) can have inconsistencies, causing issues that are hard to debug.
- **Lack of visibility**: without CI/CD, tracking changes and understanding the state of the codebase can be challenging.

## Understanding CI/CD, Git, and deployment pipelines

CI/CD consists of continuous integration, and continuous deployment.

### Continuous integration (CI)

Developers frequently commit to a Git-managed main branch, triggering automated tests and builds for integration. Git tracks changes to enable automatic fetching and testing of new commits.

### Continuous deployment (CD)

Focuses on deploying verified changes to production developments through structured deployment stages within deployment pipelines.

## Git integration with Data Factory pipelines

Git is a version control system that allows developers to track changes in their codebase (or JSON code definitions for pipelines) and collaborate with others. It provides a centralized repository where code changes are stored and managed. Currently, Git is supported in Fabric via GitHub or Azure DevOps.
There are a few key workflow essentials to understand when working with Git.

- **Main branch**: The main branch, sometimes named the _master&nbsp;branch_, holds production ready code.
- **Feature branches**: These branches are separate from the main branch and allow for isolated development without changing the main branch.
- **Pull requests (PRs)**: PRs allow users to propose, review, and discuss changes before integration.
- **Merging**: This occurs when changes are approved. Git integrates these changes, continuously updating the project.

## Deployment pipelines

Deployment pipelines are tightly integrated with Git. When a developer pushes code changes to the Git repository, it triggers the CI/CD pipeline. This integration ensures that the latest code changes are always tested and deployed automatically.

### Stages and jobs

Deployment pipelines consist of multiple stages and jobs within each stage. Typically, these stages are separated into three environments: development (compiling code), testing (running tests), and production (deploying the application). The pipeline progresses through these stages, ensuring that the code is thoroughly tested and deployed in a controlled manner.

### Automated workflows

Deployment pipelines automate the entire process of building, testing, and deploying code. This automation reduces the risk of human error, speeds up the development process, and ensures code changes are consistently and reliably delivered to production.

## Get started with Git integration for pipelines

Take the following steps to set up Git integration for your pipelines in Data Factory:

### Prerequisites for Git integration

To access Git with your Microsoft Fabric workspace, ensure the following prerequisites for both Fabric and Git.

- Either a [Power BI Premium license](/power-bi/enterprise/service-premium-what-is) or [Fabric capacity](../enterprise/licenses.md#capacity).
- Enabled the following tenant switches from the admin portal:
  - [Users can create Fabric items](../admin/fabric-switch.md)
  - [Users can synchronize workspace items with their Git repositories](../admin/git-integration-admin-settings.md#users-can-synchronize-workspace-items-with-their-git-repositories)
  - (For GitHub users only) [Users can synchronize workspace items with GitHub repositories](../admin/git-integration-admin-settings.md#users-can-sync-workspace-items-with-github-repositories)
- Either an Azure DevOps or GitHub account.
  - For an Azure DevOps organization:
    - An active Azure account registered to the same user that's using the Fabric workspace. [Create a free account](https://azure.microsoft.com/products/devops/).
    - Access to an existing repository
  - For a GitHub account:
    - An active GitHub account. [Create a free account](https://github.com/).
    - Either a [fine grained token](https://github.com/settings/personal-access-tokens/new) with _read_ and _write_ permissions for _Contents_, under repository permissions, or a [GitHub classic token](https://github.com/settings/tokens/new) with repo scopes enabled.

### Step 1: Connect to a Git repository

To use Git integration with Data Factory pipelines in Fabric, you first need to connect to a Git repository, as described here.

1. Sign into Fabric and navigate to the workspace you want to connect to Git.
1. Select **Workspace settings**.

   :::image type="content" source="media/cicd-data-pipelines/workspace-settings.png" alt-text="Screenshot showing where to select Workspace settings in the Fabric UI.":::

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

   :::image type="content" source="media/cicd-data-pipelines/workspace-git-status.png" lightbox="media/cicd-data-pipelines/workspace-git-status.png" alt-text="Screenshot showing the Fabric workspace with Git status and other details reported for pipelines.":::

### Step 3: Commit changes to Git

After you connect to a Git repository and workspace, you can commit changes to Git, as described here.

1. Go to the workspace.
1. Select the **Source control** icon. This icon shows the number of uncommitted changes.

   :::image type="content" source="media/cicd-data-pipelines/source-control-button.png" alt-text="Screenshot of the Source control button in the Fabric workspace UI.":::

1. Select the **Changes** tab from the **Source control** panel. A list appears with all the items you changed, and an icon indicating the status: **New** :::image type="icon" source="media/cicd-data-pipelines/new-icon.png":::, **Modified** :::image type="icon" source="media/cicd-data-pipelines/modified-icon.png" :::, **Conflict** :::image type="icon" source="media/cicd-data-pipelines/conflict-icon.png":::, or **Deleted** :::image type="icon" source="media/cicd-data-pipelines/deleted-icon.png":::.
1. Select the items you want to commit. To select all items, check the top box.
1. _(Optional)_ Add a commit comment in the box.
1. Select **Commit**.

   :::image type="content" source="media/cicd-data-pipelines/source-control-commit.png" alt-text="Screenshot of the Source control dialog for a Git commit.":::

After the changes are committed, the items that were committed are removed from the list, and the workspace will point to the new commit that it synced to.

### Step 4: (_Optional_) Update the workspace from Git

1. Go to the workspace.
1. Select the **Source control** icon.
1. Select **Updates** from the **Source control** panel. A list appears with all the items that were changed in the branch from your Git connection source since the last update.
1. Select **Update all**.

   :::image type="content" source="media/cicd-data-pipelines/source-control-update-all.png" alt-text="Screenshot showing the Updates tab of the Source control dialog in the Fabric UI.":::

After it updates successfully, the list of items is removed, and the workspace will point to the new commit to which it's synced.

## Get started with deployment pipelines for Git

Take the following steps to use Git deployment pipelines with your Fabric workspace. 

### Prerequisites for deployment pipelines

Before you get started, be sure to set up the following prerequisites:

- An active [Microsoft Fabric subscription](../enterprise/licenses.md).
- Admin access of a [Fabric workspace](../fundamentals/create-workspaces.md).

### Step 1: Create a deployment pipeline

1. From the **Workspaces** flyout, select **Deployment pipelines**.

   :::image type="content" source="media/cicd-data-pipelines/workspace-deployment-pipelines.png" alt-text="Screenshot showing the Workspaces flyout with the Deployment pipelines button in the Fabric UI.":::

1. Select **Create pipeline** or **+ New pipeline**.

### Step 2: Name the pipeline and assign stages

1. In the **Create deployment pipeline** dialog box, enter a name and description for the pipeline, and select **Next**.
1. Set your deployment pipeline’s structure by defining the required stages for your deployment pipeline. By default, the pipeline has three stages: _Development_, _Test_, and _Production_.

   :::image type="content" source="media/cicd-data-pipelines/default-deployment-pipeline-stages.png" alt-text="Screenshot showing the default deployment pipeline stages.":::

   You can add another stage, delete stages, or rename them by typing a new name in the box. Select **Create** (or **Create and continue**) when you’re done.

   :::image type="content" source="media/cicd-data-pipelines/sample-deployment-pipeline.png" alt-text="Screenshot showing a populated sample deployment pipeline.":::

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

## Scheduled pipeline CI/CD integration

When you create a schedule for a pipeline, it's automatically added to the Git repository connected to your workspace and store in a *.schedules* file in the pipeline definition.

:::image type="content" source="media/pipeline-runs/pipeline-job-scheduler-git.png" alt-text="Screenshot of the .schedules file for a scheduled pipeline in Fabric Data Factory." lightbox="media/pipeline-runs/pipeline-job-scheduler-git.png":::

## Known limitations

The following known limitations apply to CI/CD for pipelines in Data Factory in Microsoft Fabric:

- **Workspace variables**: CI/CD doesn't currently support workspace variables.
- **Git Integration limited support**: Currently, Fabric only supports Git integration with Azure DevOps and GitHub. Azure DevOps Git integration is recommended as GitHub Git integration has more limitations.
- **Pipeline activities with OAuth connectors**: For MS Teams and Outlook connectors, when deploying to a higher environment, users must manually open each pipeline and sign into each activity, which is a limitation currently.
- **Pipelines invoking dataflows**: When a pipeline that invokes a dataflow is promoted, it will still reference the dataflow in the previous workspace, which is incorrect. This behavior occurs because dataflows are not currently supported in deployment pipelines.

## Related content

- [Introduction to the CI/CD process as part of the ALM cycle in Microsoft Fabric](../cicd/cicd-overview.md?source=recommendations)
- [Get started with Git integration, the Fabric Application Lifecycle Management (ALM) tool](../cicd/git-integration/git-get-started.md?tabs=azure-devops%2CAzure%2Ccommit-to-git)
- [Get started using deployment pipelines, the Fabric Application Lifecycle Management (ALM) tool](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md?tabs=from-fabric%2Cnew%2Cstage-settings-new)
- [Blog: Exploring CI/CD Capabilities in Microsoft Fabric: A Focus on pipelines](https://blog.fabric.microsoft.com/blog/exploring-ci-cd-capabilities-in-microsoft-fabric-a-focus-on-data-pipelines?ft=All)
