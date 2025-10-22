---
title: Configure Continuous Integration and Continuous Deployment (Preview)
titleSuffix: Microsoft Fabric
description: Understand how to set up continuous integration and deployment for Cosmos DB databases in Microsoft Fabric during the preview phase.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/17/2025
ms.search.form: Deploy and monitor Cosmos DB
appliesto:
- ✅ Cosmos DB in Fabric
---

# Configure continuous integration and continuous deployment for Cosmos DB in Microsoft Fabric (preview)

Cosmos DB in Microsoft Fabric supports robust CI/CD capabilities through deployment pipelines and Git integration. This functionality streamlines development workflows and promotes consistency across environments. In this guide, you configure a deployment pipeline and Git integration for a database in Cosmos DB in Fabric.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

## Configure deployment pipeline

Deployment pipelines simplify the process of moving items like datasets, reports, or semantic models from one workspace to another. For example, you can use a deployment pipeline to migrate items between development, staging, test, and production environments. The pipeline compares items between environments and deploys only items with changes. In this section, a deployment pipeline is configured to migrate a database to a new workspace.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing workspace with your Cosmos DB database.

1. In the menu bar, select **Create deployment pipeline**.

1. In the **Add a new deployment pipeline** dialog, enter a unique name for the pipeline, and then select **Next**.

1. Configure your pipeline's structure by defining stages like "Development," "Test," or "Production."

1. Select **Create and continue**.

1. Now, assign workspaces to each stage of the pipeline. Items in each workspace are automatically associated with the stage.

1. Once you have content in the first pipeline stage, deploy it to the next stage and any subsequent stages.

    > [!TIP]
    > You can deploy to the next stage even if that stage has content. Paired items are overwritten.

> [!NOTE]
> For more information about supported deployment pipeline items, see [supported items in deployment pipelines](../../cicd/deployment-pipelines/intro-to-deployment-pipelines.md#supported-items).

## Integrate with Git

Git integration streamlines the process of collaboration using version control for your Fabric items. Using the integration with Git, you can sync your Cosmos DB database with the repository, import items from Git into your current workspace, or track changes over time using the Gitflow (pull requests, branches, etc.). In this section, the database is integrated with a repository on GitHub.

1. Navigate to your existing workspace again.

1. In the menu bar, select **Settings**.

1. In the **Workspace settings** dialog, select **Git integration**.

1. Select the **GitHub** provider for Git.

1. If necessary, authorize your connection to GitHub.

1. Select the **repository**, **branch**, and **folder** for your destination GitHub repository.

1. Select **Connect and sync**.

> [!NOTE]
> For more information about Git integration, see [Get started with Git integration](../../cicd/git-integration/git-get-started.md).

## Related content

- [Configure a container in Cosmos DB in Microsoft Fabric](how-to-configure-container.md)
