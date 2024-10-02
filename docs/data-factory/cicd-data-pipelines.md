---
title: CI/CD for data pipelines in Data Factory
#customer intent: As a developer, I want to set up CI/CD for data pipelines in Data Factory so that I can automate integration, testing, and deployment.
description: This article describes how to set up continuous integration and delivery (CI/CD) for data pipelines in Data Factory for Microsoft Fabric.
author: conxu-ms
ms.author: conxu
ms.topic: how-to
ms.date: 10/01/2024
---

# CI/CD for data pipelines in Data Factory in Microsoft Fabric

In Fabric Data Factory, continuous integration and continuous development (CI/CD) automates the integration, testing, and deployment of code changes to ensure efficient and reliable development.

In Fabric, there are 2 features we currently support in collaboration with the Application Lifecycle Management (ALM) team: Git Integration and deployment pipelines. These features allow users to import/export workspace resources with individual updates.

The Fabric Data Factory CI/CD solution deviates from the Azure Data Factory model where whole factory updates using ARM template export methodology is preferred. This change in methodology allows customers to selectively choose which pipelines to update without pausing the whole factory. Both Git integration (bring-your-own Git) and deployment pipelines (built-in CI/CD) use the concept of associated a single workspace with a single environment. You will need to map out different workspaces to your different environments such as development, test, and production.

## Why developers use CI/CD

CI/CD is a practice that automates software delivery, and it resolves a few prominent pain points:

- **Manual integration issues**: without CI/CD, integrating code changes manually can lead to conflicts and errors, slowing down development.
- **Development delays**: manual deployments are time-consuming and prone to errors, leading to delays in delivering new features and updates.
- **Inconsistent environments**: different environments (development, testing, and production) can have inconsistencies, causing issues that are hard to debug.
- **Lack of visibility**: without CI/CD, tracking changes and understanding the state of the codebase can be challenging.

## Understanding CI/CD, Git, and deployment pipelines

CI/CD consists of continuous integration, and continuous development.

### Continuous integration (CI)

Developers frequently commit to a Git-managed main branch, triggering automated tests and builds for integration. Git tracks changes to enable automatic fetching and testing of new commits.

### Continuous development (CD)

Focuses on deploying verified changes to production developments through structured deployment stages within deployment pipelines.

## Git integration with Data Factory data pipelines

Git is a version control system that allows developers to track changes in their codebase (or JSON code definitions, in the case of data pipelines) and collaborate with others. It provides a centralized repository where code changes are stored and managed. Currently, Git is supported in Fabric via GitHub or Azure DevOps.
There are a few key workflow essentials to understand when working with Git.

- **Main branch**: The main branch, sometimes named the _master&nbsp;branch_, holds production ready code.
- **Feature branches**: These branches are separate from the main branch and allow for isolated development without changing the main branch.
- **Pull requests (PRs)**: PRs allow users to propose, review, and discuss changes before integration.
- **Merging**: This occurs when changes are approved. Git will integrate these changes, continuously updating the project.

## Deployment pipelines for Git

Deployment pipelines are tightly integrated with Git. When a developer pushes code changes to the Git repository, it triggers the CI/CD pipeline. This integration ensures that the latest code changes are always tested and deployed automatically.

### Stages and jobs

Deployment pipelines consist of multiple stages and jobs within each stage. Typically, these stages are separated into 3 environments: development (compiling code), testing (running tests), and production (deploying the application). The pipeline progresses through these stages, ensuring that the code is thoroughly tested and deployed in a controlled manner.

### Automated workflows

Deployment pipelines automate the entire process of building, testing, and deploying code. This reduces the risk of human error, speeds up the development process, and ensures code changes are consistently and reliably delivered to production.

## Get started with Git integration for Data Factory data pipelines

Take the following steps to set up Git integration for your data pipelines in Data Factory:

### Prerequisites for Git integration

To access Git with your Microsoft Fabric workspace, ensure the following prerequisites for both Fabric and Git.

- Either a [PowerBI Premium license](/power-bi/enterprise/service-premium-what-is) or [Fabric capacity](../enterprise/licenses.md#capacity).
- Enabled the following tenant switches from the admin portal:
  - [Users can create Fabric items](../admin/fabric-switch.md)
  - [Users can synchronize workspace items with their Git repositories](../admin/git-integration-admin-settings.md#users-can-synchronize-workspace-items-with-their-git-repositories-preview)
  - (For GitHub users only) [Users can synchronize workspace items with GitHub repositories](../admin/git-integration-admin-settings.md#users-can-sync-workspace-items-with-github-repositories-preview)
- Either an Azure DevOps or GitHub account.
  - For an Azure DevOps account:
    - An active Azure account registered to the same user that is using the Fabric workspace. [Create a free account](https://azure.microsoft.com/products/devops/).
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
1. Select your Git provider. Currently, Fabric only support _Azure DevOps_ or _GitHub_. If you use _GitHub_ you need to select **Add account* to connect your GitHub account. After you sign in, select Connect to allow Fabric to access your GitHub account.

   :::image type="content" source="media/cicd-data-pipelines/add-github-account.png" alt-text="Screenshot showing where to add a GitHub account for a Fabric workspace Git integration.":::

### Step 2: Connect to a workspace

Once you connect to a Git repository, you need to connect to a workspace, as described here.

1. From the dropdown menu specify the following details about the branch you want to connect to:

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

   :::image type="content" source="media/cicd-data-pipelines/workspace-git-status.png" alt-text="Screenshot showing the Fabric workspace with Git status and other details reported for pipelines.":::

## Step 3: Commit changes to Git



## Related content