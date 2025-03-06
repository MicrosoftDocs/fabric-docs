---
title: User data functions source control and deployment
description: Learn how to enable CI/CD for User data functions in Fabric.
ms.author: sumuth
author: mksuni
ms.topic: how-to
ms.date: 03/27/2025
ms.search.form: Using Git and Deployment pipelines in User Data Functions
---


# User data functions source control and deployment (Preview)

This article explains how Git integration and deployment pipelines work for User data functions in Microsoft Fabric. Fabric User data functions offer Git integration for source control with Azure DevOps repositories. With Git integration, you can version control your User data functions item, collaborate using Git branches, and manage your user data function content lifecycle entirely within Fabric.

Learn more [Fabric Git integration process](../../cicd/git-integration/git-integration-process.md)

## Set up a connection
From your workspace settings, you can easily set up a connection to your repo to commit and sync changes. To set up the connection, see [Get started with Git integration](../../cicd/git-integration/git-get-started.md). Once connected, your items, including user data functions, appear in the **Source control** panel.

:::image type="content" source="..\media\user-data-functions-git-deployment\udf-source-control-view.png" alt-text="Screenshot showing User data function with uncommitted changes in source control." lightbox="..\media\user-data-functions-git-deployment\udf-source-control-view.png":::

After you successfully commit the user data functions items to the Git repo, you see the user data functions folders in the repository. You can now execute future operations, like Create pull request.

## User data functions representation in Git
The following image is an example of the file structure of each user data functions item in the repo:

:::image type="content" source="..\media\user-data-functions-git-deployment\udf-folder-structure.png" alt-text="Screenshot showing folder structure for a user data functions item in the repository." lightbox="..\media\user-data-functions-git-deployment\udf-folder-structure.png":::

The folder structure includes: 

- **.platform**: The `.platform` file contains the following attributes:
    :::image type="content" source="..\media\user-data-functions-git-deployment\platform-json-file.png" alt-text="Screenshot showing.platform file for a User data functions item." lightbox="..\media\user-data-functions-git-deployment\platform-json-file.png":::

    - **version**: Version number of the system files. This number is used to enable backwards compatibility. Version number of the item might be different.
    - **logicalId**: An automatically generated cross-workspace identifier representing an item and its source control representation.
    - **type**: `UserDataFunction` is the type to define User data functions item.
    - **displayName**: Represents the name of the item. When the user data functions item is renamed, this displayName is updated. 
 
- **definitions.json**: This file shares all the user data functions item definition such as connections, libraries, etc. as a representation of user data functions item properties. 
    :::image type="content" source="..\media\user-data-functions-git-deployment\definitions-json-file.png" alt-text="Screenshot showing definitions.json file for a user data functions item." lightbox="..\media\user-data-functions-git-deployment\definitions-json-file.png":::

- **function-app.py**: This file is your functions code. Any code changes you make to the user data functions item, is synced into the repo with this file. You can perform various git operations to manage the code development cycle.
    :::image type="content" source="..\media\user-data-functions-git-deployment\function-app-python-file.png" alt-text="Screenshot showing function-app.py file for a user data functions item." lightbox="..\media\user-data-functions-git-deployment\function-app-python-file.png":::

- **resources**: The folder contains functions.json file that contains all the metadata such as connections, libraries, and functions within this item. **DO NOT UPDATE THIS FILE** manually. `functions.json` allows Fabric to create or recreate the user data functions item in a workspace. 
    :::image type="content" source="..\media\user-data-functions-git-deployment\functions-json-file.png" alt-text="Screenshot showing function.json file in resources folder for a user data functions item." lightbox="..\media\user-data-functions-git-deployment\functions-json-file.png":::


## User data functions in deployment pipelines

You can also use Deployment pipeline to deploy your User data functions code across different environments, such as development, test, and production. This feature can enable you to streamline your development process, ensure quality and consistency, and reduce manual errors with lightweight low-code operations.

> [!NOTE]
> - All the connections and libraries are added to new user data functions item created in other environments. 

Use the following steps to complete your notebook deployment using the deployment pipeline.

1. Create a new deployment pipeline or open an existing deployment pipeline. (For more information, see [Get started with deployment pipelines](../../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).)

1. Assign workspaces to different stages according to your deployment goals.
2. Select, view, and compare items including user data functions between different stages.
3. Select **Deploy** to deploy your user data functions to test environment. You can add a note to provide details on the changes for this deployment. Similarly you can push changes across the Development, Test, and Production stages.
4. Monitor the deployment status from **Deployment history**.

## Related content

- [Introduction to Git integration](../../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)