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
- Create your Gen2 dataflow directly into a workspace folder.

## Prerequisites

To get started, you must complete the following prerequisites:

- A Microsoft Fabric tenant account with an active subscription. Create an account for free.
- Make sure you have a Microsoft Fabric enabled Workspace.
- Git integration is enabled for your workspace. Learn more about enabling Git integration [here](/fabric/cicd/git-integration/git-get-started).

## Create a dataflow gen2 with CI/CD and Git support

To create a dataflow gen2 with CI/CD and Git support, follow these steps:

- In the fabric workspace, click on create new item and select Dataflow Gen2.

:::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/new-dataflow-gen2-item.png" alt-text="Create new dataflow Gen2 item":::

- Give your dataflow a name and enable the GIT integration and click on create.

:::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/new-dataflow-gen2-item-set-name.png" alt-text="Set dataflow Gen2 name":::

- The dataflow will be created and you will be redirected to the dataflow authoring canvas.
- You can now start creating your dataflow.
- When you are done, click on save and run.

:::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/save-dataflow-gen2.png" alt-text="Save dataflow Gen2":::

- After publishing, you will notice that the dataflow has the status of uncommitted.

:::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/dataflow-gen2-uncommited-git.png" alt-text="Dataflow Gen2 uncommitted":::

- To commit the dataflow to the Git repository, click on the source control icon in the top right corner.

:::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/source-control-button.png" alt-text="Source control button":::

- Select all the changes you want to commit and click on commit.

:::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/commit-changes-to-git.png" alt-text="Commit changes":::

You now have a dataflow Gen2 with CI/CD and Git support. Suggested is to follow the best practices for working with CI/CD and Git integration in Fabric by following the tutorial [here](/fabric/cicd/git-integration/manage-branches?tabs=azure-devops#scenario-2---develop-using-another-workspace).

## Refresh a dataflow gen2 or schedule a refresh


### Refresh now

- In the fabric workspace, click on the more options icon next to the dataflow you want to refresh.
- Click on **refresh now**.

:::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/dataflow-gen2-refresh-now.png" alt-text="Refresh dataflow Gen2 now":::

### Schedule a refresh

If your dataflow needs to be refreshed on a regular interval you can schedule the refresh using the fabric scheduler

- In the fabric workspace, click on the more options icon next to the dataflow you want to refresh.
- Click on **Schedule**.

:::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/dataflow-gen2-schedule-refresh.png" alt-text="Schedule dataflow Gen2 refresh":::

- On the schedule page, you can set the refresh frequency and the start time and end time, after which you can apply changes.

:::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/settings-schedule-refresh.png" alt-text="Settings screen schedule dataflow Gen2 refresh":::

- To start the refresh now, click on the refresh button.

## Refresh history and settings




## Settings dataflow gen2 with CI/CD



## Use the Fabric CRUDL API to manage dataflows Gen2

With CICD and Git integration support, we also introduced the Fabric CRUDL API to manage dataflows Gen2. You can use the API to create, read, update, delete, and list dataflows Gen2. The API is available in the Fabric API reference.

## Limitations and known issues

- By default the staging artifacts are visible in the workspace. This will be hidden in the future but for now make sure they are not synced to the GIT repository as it may cause issues along the way for updating the workspace from git changes.
- "Get Item" and "List Item Access Details" API's does not return the correct information if you filter on a specific type of item. When you do not specify the type it will return the new Dataflow Gen2 with CI/CD and GIT support. Filtering for "dataflow"  type will result in only non-cicd dataflows.
- Orchestrating a refresh of a dataflow gen2 with CI/CD and Git support is not possible in fabric data pipelines.
- Workspace view does not show if a refresh is ongoing for the dataflow. 