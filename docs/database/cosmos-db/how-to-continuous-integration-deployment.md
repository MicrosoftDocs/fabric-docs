---
title: Configure Continuous Integration and Continuous Deployment (Preview)
titleSuffix: Microsoft Fabric
description: Understand how to set up continuous integration and deployment for Cosmos DB databases in Microsoft Fabric during the preview phase.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/11/2025
appliesto:
- ✅ Cosmos DB in Fabric
---

# Configure continuous integration and continuous deployment for Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Cosmos DB in Microsoft Fabric supports robust CI/CD capabilities through deployment pipelines and Git integration. This functionality streamlines development workflows and promotes consistency across environments. In this guide, you configure a deployment pipeline and Git integration for a database in Cosmos DB in Fabric.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

## Configure deployment pipeline

Deployment pipelines simplify the process of moving artifacts like datasets, reports, or semantic models from one workspace to another. For example, you can use a deployment pipeline to migrate artifacts between development, staging, test, and production environments. The pipeline compares artifacts between environments and deploys only items with changes. In this section, a deployment pipeline is configured to migrate a database to a new workspace.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

1. 

> [!NOTE]
> For more information about supported deployment pipeline artifacts, see [supported items in deployment pipelines](../../cicd/deployment-pipelines/intro-to-deployment-pipelines.md#supported-items).

## Integrate with Git

Git integration streamlines the process of collaboration using version control for your Fabric artifacts. Using the integration with Git, you can sync your Cosmos DB database with the repository, import artifacts from Git into your current workspace, or track changes over time using the Gitflow (pull requests, branches, etc.). In this section, the database is integrated with a repository on GitHub.

1. In the Fabric portal, navigate to your existing Cosmos DB database again.

1. 

> [!NOTE]
> For more information about Git integration, see [Git integration for artifacts](../../cicd/git-integration/git-get-started.md).

## Related content

- [Configure a container in Cosmos DB in Microsoft Fabric](how-to-configure-container.md)
