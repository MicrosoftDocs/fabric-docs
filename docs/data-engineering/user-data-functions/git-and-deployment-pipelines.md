---
title: User data functions source control and deployment
description: Learn how to enable CI/CD for user data functions items in Fabric.
ms.author: eur
ms.reviewer: sumuth
author: eric-urban
ms.topic: how-to
ms.custom: freshness-kr
ms.date: 01/21/2026
ms.search.form: Use Git and deployment pipelines in user data functions
---

# User data functions source control and deployment

This article explains how Git integration and deployment pipelines work for user data functions in Microsoft Fabric. With Git integration, you can keep your Fabric workspace in sync with a repository branch, enabling you to version control your user data functions, collaborate using branches and pull requests, and work with your code in your preferred Git tooling, such as Azure DevOps.

Learn more about the process of integrating Git with your Microsoft Fabric workspace in [Basic concepts in Git integration](../../cicd/git-integration/git-integration-process.md).

## Set up a connection

From your workspace settings, you can easily set up a connection to your repo to commit and sync changes. To set up the connection, see [Get started with Git integration](../../cicd/git-integration/git-get-started.md). Once connected, your items, including user data functions, appear in the **Source control** pane.

:::image type="content" source="..\media\user-data-functions-git-deployment\udf-source-control-view.png" alt-text="Screenshot showing user data functions item with uncommitted changes in source control." lightbox="..\media\user-data-functions-git-deployment\udf-source-control-view.png":::

After you successfully commit the user data functions items to the Git repo, you see the user data functions folders in the repository. You can now execute future operations, like create a pull request.

## User data functions representation in Git

The following image shows an example of the file structure of each user data functions item in the repo. 

:::image type="content" source="..\media\user-data-functions-git-deployment\udf-folder-structure.png" alt-text="Screenshot showing folder structure for a user data functions item in the repository." lightbox="..\media\user-data-functions-git-deployment\udf-folder-structure.png":::

The folder structure includes the following elements:

- **.platform**: The `.platform` file contains the following attributes:

    :::image type="content" source="..\media\user-data-functions-git-deployment\platform-json-file.png" alt-text="Screenshot showing a platform file for a user data functions item." lightbox="..\media\user-data-functions-git-deployment\platform-json-file.png":::

    - **version**: Version number of the system files. This number is used to enable backwards compatibility. The version number of the item might be different.
    - **logicalId**: An automatically generated cross-workspace identifier representing an item and its source control representation.
    - **type**: `UserDataFunction` is the type to define a user data functions item.
    - **displayName**: Represents the name of the item. When the user data functions item is renamed, this displayName is updated.

- **definitions.json**: This file shares all the user data functions item definitions such as connections, libraries, etc. as a representation of the user data functions item properties.

    :::image type="content" source="..\media\user-data-functions-git-deployment\definitions-json-file.png" alt-text="Screenshot showing definitions.json file for a user data functions item." lightbox="..\media\user-data-functions-git-deployment\definitions-json-file.png":::

- **function-app.py**: This file is your functions code. Any code changes you make to the user data functions item is synced into the repo with this file. You can perform various Git operations to manage the code development cycle.

    :::image type="content" source="..\media\user-data-functions-git-deployment\function-app-python-file.png" alt-text="Screenshot showing function-app.py file for a user data functions item." lightbox="..\media\user-data-functions-git-deployment\function-app-python-file.png":::

- **resources**: The folder contains a functions.json file with all the metadata such as connections, libraries, and functions within this item. **DO NOT UPDATE THIS FILE** manually. `functions.json` allows Fabric to create or recreate the user data functions item in a workspace.

    :::image type="content" source="..\media\user-data-functions-git-deployment\functions-json-file.png" alt-text="Screenshot showing function.json file in resources folder for a user data functions item." lightbox="..\media\user-data-functions-git-deployment\functions-json-file.png":::

For more information about Git integration, including details about the folder structure and system files, see [Git integration source code format](../../cicd/git-integration/source-code-format.md).

## User data functions in deployment pipelines

You can use deployment pipelines to deploy your user data functions across different environments, such as development, test, and production. Deployment pipelines help you streamline your development process, ensure quality and consistency, and reduce manual errors with lightweight, low-code operations.

> [!NOTE]
> All connections and libraries are added to new user data functions items created in other environments.

To deploy your user data functions using a deployment pipeline:

1. Create a new deployment pipeline or open an existing deployment pipeline. See [Get started with deployment pipelines](../../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md) for more information.

1. Assign workspaces to different stages according to your deployment goals.

1. Select, view, and compare items including user data functions items between different stages.

1. Select **Deploy** to deploy your user data functions item to your test environment. You can add a note to provide details on the changes for this deployment. Similarly, you can push changes across the Development, Test, and Production stages.

1. Monitor the deployment status from **Deployment history**.

## Related content

- [Introduction to Microsoft Fabric Git integration](../../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
