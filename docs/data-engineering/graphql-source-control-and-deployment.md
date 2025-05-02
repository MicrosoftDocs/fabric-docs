---
title: Source control and deployment pipelines in API for GraphQL (preview)
description: Learn how Git integration and deployment pipelines work with API for GraphQL. 
author: HHPHTTP
ms.author: hhosseinpour
ms.topic: how-to 
ms.date: 12/19/2024

---
# Source control and deployment pipelines in API for GraphQL (preview)

Learn how Git integration and deployment pipelines work with API for GraphQL in Microsoft Fabric. This article helps you to understand how to set up a connection to your repository, manage your API for GraphQL, and deploy them across different environments.

> [!NOTE]
> API for GraphQL source control and deployment is currently in **preview**.

## Prerequisites

* You must have an API for GraphQL in Fabric. For more information, see [**Create an API for GraphQL in Fabric and add data**](get-started-api-graphql.md).

## Overview

Fabric offers powerful tools for CI/CD (continuous integration and continuous deployment) and development lifecycle management through two main components: [**Git integration**](..\cicd\git-integration\git-get-started.md) (CI) and [**deployment pipelines**](..\cicd\deployment-pipelines\get-started-with-deployment-pipelines.md) (CD). Workspaces serve as central components for both Git synchronization and deployment stages.

**Git integration (CI)**: Synchronizes workspace items (e.g., code, configurations, APIs) with [version control repositories](..\cicd\git-integration\intro-to-git-integration.md), enabling version control and change tracking via Git.

**Deployment pipelines (CD)**: Enables the creation of stages (e.g., Development, Test, Production) with linked workspaces. Items supported in each stage are automatically replicated to subsequent stages, and changes in a workspace trigger deployment in a release pipeline. You can configure the pipeline to ensure that changes are tested and deployed efficiently across environments.

Fabric supports various CI/CD workflows tailored to common scenarios. For more details, see [**CI/CD workflow options in Fabric**](..\cicd\manage-deployment.md).  

> [!NOTE]
> Only metadata is copied during deployment; and data is not copied.

Items from workspace are stored in the associated Git repository as Infrastructure as Code (IaC). Code changes in the repository can trigger the deployment in pipelines. This method allows you to have code changes automatically replicated across stages for testing and production release purposes.

## Data source authentication methods

In this section, you learn about authentication methods to connect data sources to your API for GraphQL and understand their impact on autobinding between the API for GraphQL and its connected data sources in development pipelines. You can learn more about autobinding in [**the deployment pipeline process**](..\cicd\deployment-pipelines\understand-the-deployment-process.md).  

There are two options available to connect data sources to your API for GraphQL:

1. Connect to Fabric data sources with single sign-on authentication (SSO)
2. Connect to Fabric OR external data sources using a Saved Credential  

    :::image type="content" source="media\graphql-source-control-and-deployment\graphql-connection-options.png" alt-text="Screenshot of options for GraphQL connection to data sources.":::

The first option, **Single Sign-On (SSO)**, enables connections to data sources within Fabric. In this case, when you connect a data source to GraphQL using Single sign-on method in the original workspace (for example, Dev stage), the data source and GraphQL item will be deployed to the target workspace (for example, Test stage) in the pipeline, and GraphQL in the target workspace will be automatically connected to the deployed local data source in the target workspace (see the diagram below).

The second option, **Saved Credential**, enables connections to external data sources outside Fabric and data sources within Fabric. However, [**autobinding**](..\cicd\deployment-pipelines\understand-the-deployment-process.md) isn't supported for the Saved Credential approach. This means that if you connect a data source to GraphQL using Saved Credential in the original workspace (Dev stage), the data source will be deployed to the target workspace (Test stage) in the pipeline. However, the GraphQL item in the target workspace will remain connected to the data source in the original workspace (Dev stage) through the Saved Credentials, rather than autobinding to a local data source in the target workspace. (**see the diagram below**)

Additionally, if the **Saved Credential** method is used to connect to data sources, developers must have access to the Saved Credential information in order to successfully deploy GraphQL item.  

> [!NOTE]
> If an API for GraphQL in original workspace (Dev stage) is connected to a data source that is in a different workspace, the deployed API for GraphQL in the target workspace (Test stage) will remain connected to the data source that is located in different workspace regardless of which authentication method is used to connect the data sources to your API for GraphQL. (**see the diagram below**)

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-pipeline-diagram.png" alt-text="Screenshot of pipeline for various data source connections and scenarios." lightbox="media\graphql-source-control-and-deployment\graphql-pipeline-diagram.png":::

## API for GraphQL Git integration

Fabric API for GraphQL offers Git integration for source control. With Git integration, you can back up and version your API for GraphQL, revert to previous stages as needed, collaborate or work alone using [**Git branches**](..\cicd\git-integration\manage-branches.md), and manage your API for GraphQL lifecycle entirely within Fabric.

**Set up a Connection:**

From your **Workspace settings**, you can easily set up a connection to your repo to commit and sync changes. To set up the connection see [**Get started with Git integration**](..\cicd\git-integration\git-get-started.md). Once connected, your items, including API for GraphQL, appear in the **Source control** panel.

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-source-control-workspace-view.png" alt-text="Screenshot of workspace and source control status." lightbox="media\graphql-source-control-and-deployment\graphql-source-control-workspace-view.png":::

After you successfully commit the API for GraphQL instances to the Git repo, you see the GraphQL folder structure in the repo. You can now execute future operations, like **Create pull request**.

**GraphQL representation in Git:**

The following image is an example of the file structure of each API for GraphQL item in the Git repo:

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-source-control-repo-structure.png" alt-text="Screenshot of file structure representation in Git for GraphQL.":::

When you commit the API for GraphQL item to the Git repo, the API for GraphQL definition is stored. This approach supports a precise recovery when you sync back to a Fabric workspace:  

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-source-control-graphql-definition.png" alt-text="Screenshot of API for GraphQL definitions stored in Git.":::

## API for GraphQL in deployment pipeline

Use the following steps to complete your API for GraphQL deployment using the deployment pipeline.

1. Create a new deployment pipeline or open an existing deployment pipeline. For more information, see [**Get started with deployment pipelines**](..\cicd\deployment-pipelines\get-started-with-deployment-pipelines.md).

2. Assign workspaces to different stages according to your deployment goals.

3. Select, **view**, and compare items including API for GraphQL between different stages, as shown in the following example. The highlighted areas indicating changed item count between the previous stage and current stage.

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-pipeline-changed-items.png" alt-text="Screenshot of pipeline illustrating items' status in each development stage." lightbox="media\graphql-source-control-and-deployment\graphql-pipeline-changed-items.png":::

4. Select the items that need to be deployed. Select **Deploy** to deploy your selected items (API for GraphQL and its Connected Data source) across the Development, Test, and Production stages.

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-pipeline-deployment.png" alt-text="Screenshot of pipeline showing the selected items that need to be deployed." lightbox="media\graphql-source-control-and-deployment\graphql-pipeline-deployment.png":::

The next message pops up confirming the items that you're about to deploy. Select **Deploy** to confirm and continue the deployment process.

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-pipeline-deploy-confirmation.png" alt-text="Screenshot of pipeline showing deployment confirmation message.":::

## Current limitations

1. Fabric CI/CD does not support [**autobinding**](..\cicd\deployment-pipelines\understand-the-deployment-process.md) of the child items. This means that if the API for GraphQL connects to a SQL Analytics Endpoint as a child of a data source in the original workspace (e.g., Dev stage), the lineage does not transfer to the target workspace (e.g., Test stage). As a result, the deployed API for GraphQL in the target workspace (e.g., Test stage) remains connected to the SQL Analytics Endpoint in the original workspace (e.g., Dev stage).

2. Using a service principal to deploy an API for GraphQL that uses a data source being accessed through SQL Analytics Endpoint is currently not supported. This entails data sources such as Lakehouse, and mirrored databases.

3. [**Autobinding**](..\cicd\deployment-pipelines\understand-the-deployment-process.md) isn't supported when the **Saved Credential** approach is used for data source connections. For more information, see [data source authentication methods](#data-source-authentication-methods) section described above.

## Related content

* [What is Microsoft Fabric API for GraphQL?](api-graphql-overview.md)

* [Create and add data to an API for GraphQL](get-started-api-graphql.md)

* [Git integration](..\cicd\git-integration\git-get-started.md)

* [Deployment pipelines](..\cicd\deployment-pipelines\intro-to-deployment-pipelines.md)

* [CI/CD workflow options in Fabric](..\cicd\manage-deployment.md)
