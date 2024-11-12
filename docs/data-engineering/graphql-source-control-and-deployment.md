---
title: API for GraphQL Source Control and Deployment (Preview)
description: Learn how Git integration and deployment pipelines work with API for GraphQL. 
author: HHPHTTP
ms.author: hhosseinpour
ms.topic: concept-article 
ms.date: 11/01/2024

---

# Data Source Authentication Methods:

In this section, you will learn about data source authentication methods for connecting data sources to your API for GraphQL and understand how that may impact autobinding between the API for GraphQL and its connected data source(s) in development pipelines. You can learn more about autobinding in [**The Deployment Pipeline Process**](https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/understand-the-deployment-process?tabs=new#autobinding).  

There are two options available to connect data sources to your API for GraphQL:

1. Connect to Fabric data sources with Single sign-on Authentication (SSO)
2. Connect to Fabric OR External data sources using a Saved Credential  

    :::image type="content" source="media\graphql-source-control-and-deployment\graphql-connection-options.png"" alt-text="Screenshot of options for GraphQL connection to data sources.":::

    The first option, **Single sign-on (SSO)**, enables connections to data sources within Fabric. In this case, when you connect a data source to GraphQL using Single sign-on method in the original Workspace (e.g. Dev stage), the data source and GraphQL item will be deployed to the target Workspace (e.g. Test stage) in the pipeline, and GraphQL in the target Workspace will be automatically connected to the deployed local data source in the target Workspace. (see the diagram below)

    The second option, **Saved Credential**, enables connections to external data sources outside Fabric as well as data sources within Fabric.  However, [**autobinding**](https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/understand-the-deployment-process?tabs=new#autobinding) is not supported for the Saved Credential approach. This means that if you connect a data source to GarphQL using Saved Credential in the original Workspace (e.g in Dev stage), the data source will still be deployed to the target Workspace (e.g. Test stage) in the pipeline; however, the GraphQL item in the target Workspace will remain connected to the data source in the original Workspace (Dev stage) through the Saved Credentials, rather than autobinding to a local data source in the target Workspace.  (**see the diagram below**)

    Additionally, if the **Saved Credential** method is used to connect to data sources, developers must have access to the Saved Credential information in order to successfully deploy GraphQL item.  

> [!NOTE]
> If an API for GraphQL in original Workspace (e.g. Dev stage) is connected to a data source that is in a different Workspace, the deployed API for GraphQL in the target Workspace (e.g. Test Stage) will remain connected to the data source that is located in different Workspace regardless of which authentication method is used to connect the data source(s) to your API for GraphQL. (**see the diagram below**)

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-pipeline-diagram.png"" alt-text="Screenshot of pipeline for various data source connections and scenarios.":::

# API for GraphQL Source Control and Deployment (Preview)

Learn how Git integration and deployment pipelines work with API for GraphQL in Microsoft Fabric. This article helps you to understand how to set up a connection to your repository, manage your API for GraphQL, and deploy them across different environments.

> [!NOTE]
> API for GraphQL Source Control and Deployment is in **preview**.

## Prerequisites

* You must have an API for GraphQL in Fabric. For more information, see [**Create an API for GraphQL in Fabric and add data**](get-started-api-graphql.md).

## Overview

Fabric provides powerful tools for CI/CD (Continuous Integration and Continuous Deployment) and development lifecycle management with two main components: [**Git Integration**](https://learn.microsoft.com/en-us/fabric/cicd/git-integration/git-get-started?tabs=azure-devops%2CAzure%2Ccommit-to-git) (CI) and [**Deployment Pipelines**](https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/get-started-with-deployment-pipelines?tabs=from-fabric%2Cnew%2Cstage-settings-new) (CD). Workspaces act as central components for both Git synchronization and deployment stages.

**Git Integration (Continuous Integration)**: allows you to synchronize items in a Workspace (such as code, configurations, or APIs) with repositories in [**version control systems**](https://learn.microsoft.com/en-us/fabric/cicd/git-integration/intro-to-git-integration?tabs=azure-devops#supported-git-providers). Changes to items in a Workspace can be version-controlled and tracked through Git.

**Deployment Pipelines (Continuous Deployment)**: enable the creation of stages (e.g., Development, Test, Production) with linked Workspaces. Items supported in each stage are automatically replicated to subsequent stages, and changes in a Workspace trigger deployment in a release pipeline. Developers can configure the pipeline to ensure that changes are tested and deployed efficiently across environments.  

Fabric provides you with different options for building CI/CD processes, based on common scenarios, see [**CI/CD workflow options in Fabric**](https://learn.microsoft.com/en-us/fabric/cicd/manage-deployment).  Please note that during deployment only metadata is being copied, and data is not copied.  

Items from Workspace are stored in the associated Git repository as Infrastructure as Code (IaC). Code changes in the repository can be automated to trigger the deployment in pipelines allowing you to have code changes automatically replicated across stages for testing and production release purposes.

## API for GraphQL Git Integration

Fabric API for GraphQL offers Git integration for source control. With Git integration, you can back up and version your API for GraphQL, revert to previous stages as needed, collaborate or work alone using [**Git branches**](https://learn.microsoft.com/en-us/fabric/cicd/git-integration/manage-branches?tabs=azure-devops), and manage your API for GraphQL lifecycle entirely within Fabric.

**Set up a Connection:**

From your workspace settings, you can easily set up a connection to your repo to commit and sync changes. To set up the connection, please see [**Get started with Git integration**](https://learn.microsoft.com/en-us/fabric/cicd/git-integration/git-get-started). Once connected, your items, including API for GraphQL, appear in the **Source control** panel.

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-source-control-workspaceview.png"" alt-text="Screenshot of workspace and source control status.":::

After you successfully commit the API for GraphQL instances to the Git repo, you see the GraphQL folder structure in the repo. You can now execute future operations, like **Create pull request**.

**GraphQL Representation in Git:**

The following image is an example of the file structure of each API for GraphQL item in the Git repo:

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-source-control-repostructure.png"" alt-text="Screenshot of file structure representation in Git for GraphQL.":::

When you commit the API for GraphQL item to the Git repo, the API for GraphQL definitions are stored. This approach supports a precise recovery when you sync back to a Fabric workspace:  

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-source-control-graphqldefinition.png"" alt-text="Screenshot of API for GraphQL definitions stored in Git.":::

## API for GraphQL in Deployment Pipeline

Use the following steps to complete your API for GraphQL deployment using the deployment pipeline.

1. Create a new deployment pipeline or open an existing deployment pipeline. For more information, see [**Get started with deployment pipelines**](https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/get-started-with-deployment-pipelines).

2. Assign workspaces to different stages according to your deployment goals.

3. Select, view, and compare items including API for GraphQL between different stages, as shown in the following example. The highlighted areas indicating changed item count between the previous stage and current stage.

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-pipeline-changeditems.png"" alt-text="Screenshot of pipeline illustrating items' status in each development stage.":::

4. Select the items that need to be deployed. Select **Deploy** to deploy your selected items (API for GraphQL and its Connected Data source) across the Development, Test, and Production stages.

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-pipeline-deployment.png"" alt-text="Screenshot of pipeline showing the selected items that need to be deployed.":::

The next message pops up confirming the items that you are about to deploy. Select **Deploy** to confirm and continue the deployment process.

:::image type="content" source="media\graphql-source-control-and-deployment\graphql-pipeline-deploy-confirmation.png"" alt-text="Screenshot of pipeline showing deployment confirmation message.":::

## Current Limitations for Deployment Pipelines and Git Integration

1. Fabric CI/CD does not support [**autobinding**](https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/understand-the-deployment-process?tabs=new#autobinding) for the child artifact. That means that if the API for GraphQL connects to SQL Analytics Endpoint as a child of a data source in original Workspace (e.g. in Dev stage), the lineage does not carry over to the target Workspace (e.g. Test stage), and the deployed API for GraphQL in the target Workspace (e.g Test stage) still remains connected to the SQL Analytics Endpoint in the original Workspace (Dev stage).

2. Deploying API for GraphQL by using a Service Principal is not supported.  

3. [**Autobinding**](https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/understand-the-deployment-process?tabs=new#autobinding) is not supported when the **Saved Credential** approach is used for data source connections.For more information, please check out the **Data Source Authentication Methods** section described above.

## Related content

* [What is Microsoft Fabric API for GraphQL?](api-graphql-overview.md)

* [Create an API for GraphQL in Fabric](get-started-api-graphql.md)

* [Get Started with Git Integration](https://learn.microsoft.com/en-us/fabric/cicd/git-integration/git-get-started?tabs=azure-devops%2CAzure%2Ccommit-to-git)

* [What is Deployment Pipelines](https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/intro-to-deployment-pipelines?tabs=new)

* [CI/CD Workflow Options in Fabric](https://learn.microsoft.com/en-us/fabric/cicd/manage-deployment)
