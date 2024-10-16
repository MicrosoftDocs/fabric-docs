---
title: Dataflow Gen2 with CICD and Git integration
description: Describes how to use Dataflow Gen2 with CICD and Git integration in Fabric data factory.
ms.reviewer: DougKlopfenstein
ms.author: jeluitwi
author: luitwieler
ms.topic: how-to
ms.date: 10/07/2024
---

# Dataflow Gen2 with CICD and Git integration support (Preview)

Dataflow Gen2 now supports CICD and Git integration. This feature allows you to create, edit, and manage dataflows in a Git repository that is connected to your fabric workspace. Additionally, you can use the Deployment pipelines feature to automate the deployment of dataflows from your workspace to other workspaces. Also, you can use the Fabric CRUDL API to manage dataflows Gen2. This article goes deeper into how to use Dataflow Gen2 with CICD and Git integration in Fabric data factory.

## New features

With Dataflow Gen2 (CI/CD preview), you can now:

- Enjoy git integration support for dataflows Gen2.
- Use the Deployment pipelines feature to automate the deployment of dataflows from your workspace to other workspaces.
- Leverage the Fabric CRUDL API to manage dataflows Gen2.
- Use the Fabric settings and scheduler to refresh and edit settings for dataflows Gen2.

## Prerequisites

To get started, you must complete the following prerequisites:

- A Microsoft Fabric tenant account with an active subscription. Create an account for free.
- Make sure you have a Microsoft Fabric enabled Workspace.
- Git integration is enabled for your workspace. Learn more about enabling Git integration [here](/fabric/cicd/git-integration/git-get-started).

## Create a dataflow gen2 with CI/CD and Git support

To create a dataflow gen2 with CI/CD and Git support, follow these steps:

- In the fabric workspace, click on create new item and select Dataflow Gen2 (CI/CD, preview).
- Give your dataflow a name and click on create.
- The dataflow will be created and you will be redirected to the dataflow authoring canvas.
- You can now start creating your dataflow.
- When you are done, click on publish
- After publishing, you will notice that the dataflow has the status of uncommitted.
- To commit the dataflow to the Git repository, click on the source control icon in the top right corner.
- Select all the changes you want to commit and click on commit.

You now have a dataflow Gen2 with CI/CD and Git support. Suggested is to follow the best practices for working with CI/CD and Git integration in Fabric by following the tutorial [here](/fabric/cicd/git-integration/manage-branches?tabs=azure-devops#scenario-2---develop-using-another-workspace).

Current limitations for CI/CD and Git integration support:

- By default the staging artifacts are visible in the workspace. This will be hidden in the future but for now make sure they are not synced to the GIT repository as it may cause issues along the way for updating the workspace from git changes.

## Refresh a dataflow gen2 or schedule a refresh

To refresh a dataflow gen2, follow these steps:

- In the fabric workspace, click on the more options icon next to the dataflow you want to refresh.
- Click on schedule
- On the schedule page, you can set the refresh frequency and the start time.
- To start the refresh now, click on the refresh button.

## Use the Fabric CRUDL API to manage dataflows Gen2

With CICD and Git integration support, we also introduced the Fabric CRUDL API to manage dataflows Gen2. You can use the API to create, read, update, delete, and list dataflows Gen2. The API is available in the Fabric API reference.
Todays limitations for the public rest API's:

- "Get Item" and "List Item Access Details" does not return the correct information if you filter on a specific type of item. When you do not specify the type it will return the new Dataflow Gen2 with CI/CD and GIT support. 
