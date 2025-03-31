---
title: Dataflow Gen2 with CI/CD and Git integration
description: Describes how to use Dataflow Gen2 with CI/CD and Git integration in Fabric Data Factory.
ms.reviewer: DougKlopfenstein
ms.author: jeluitwi
author: luitwieler
ms.topic: how-to
ms.custom:
ms.date: 03/31/2025
---

# Dataflow Gen2 with CI/CD and Git integration support (Preview)

Dataflow Gen2 now supports Continuous Integration/Continuous Deployment (CI/CD) and Git integration. This feature allows you to create, edit, and manage dataflows in a Git repository that's connected to your fabric workspace. Additionally, you can use the deployment pipelines feature to automate the deployment of dataflows from your workspace to other workspaces. This article goes deeper into how to use Dataflow Gen2 with CI/CD and Git integration in Fabric Data Factory.

   > [!IMPORTANT]
   > Git integration and deployment pipeline (CI/CD) for Dataflows Gen2 in Data Factory for Microsoft Fabric are currently in public preview. This information relates to a pre-release product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

## New features

With Dataflow Gen2 (CI/CD preview), you can now:

- Use Git integration support for Dataflow Gen2.
- Use the deployment pipelines feature to automate the deployment of dataflows from your workspace to other workspaces.
- Use the Fabric settings and scheduler to refresh and edit settings for Dataflow Gen2.
- Create your Dataflow Gen2 directly into a workspace folder.

## Prerequisites

To get started, you must complete the following prerequisites:

- Have a Microsoft Fabric tenant account with an active subscription. Create an account for [free](../fundamentals/fabric-trial.md).
- Make sure you have a Microsoft Fabric enabled workspace.
- To enjoy Git integration, make sure it's enabled for your workspace. To learn more about enabling Git integration, go to [Get started with Git integration](/fabric/cicd/git-integration/git-get-started).

## Create a Dataflow Gen2 with CI/CD and Git support

To create a Dataflow Gen2 with CI/CD and Git support, follow these steps:

1. In the Fabric workspace, select **Create new item** and then select **Dataflow Gen2**.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/new-dataflow-gen2-item.png" alt-text="Screenshot of the New item window with the Dataflow Gen2 item emphasized.":::

1. Give your dataflow a name and enable the Git integration. Then select **Create**.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/new-dataflow-gen2-item-set-name.png" alt-text="Screenshot of the New Dataflow Gen2 window with the dataflow name set and Git integration emphasized and selected.":::

   The dataflow is created and you're redirected to the dataflow authoring canvas. You can now start creating your dataflow.

1. When you're done, select **Save and run**.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/save-dataflow-gen2.png" alt-text="Screenshot of Power Query editor with the Save and run button emphasized.":::

1. After you publish, the dataflow has a status of uncommitted.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/dataflow-gen2-uncommited-git.png" alt-text="Screenshot of the saved Dataflow Gen2 with the status shown as uncommitted.":::

1. To commit the dataflow to the Git repository, select the source control icon in the top right corner of the workspace view.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/source-control-button.png" alt-text="Screenshot of the Source control button.":::

1. Select all the changes you want to commit and then select **Commit**.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/commit-changes-to-git.png" alt-text="Screenshot of the Source control window with the dataflow selected and Commit button emphasized.":::

You now have a Dataflow Gen2 with CI/CD and Git support. We suggest you follow the best practices for working with CI/CD and Git integration in Fabric described in the [Scenario 2 - Develop using another workspace](/fabric/cicd/git-integration/manage-branches?tabs=azure-devops#scenario-2---develop-using-another-workspace) tutorial.

## Refresh a Dataflow Gen2 or schedule a refresh

You can refresh a Dataflow Gen2 with CI/CD and Git support in two ways&mdash;manually or by scheduling a refresh. The following sections describe how to refresh a Dataflow Gen2 with CI/CD and Git support.

### Refresh now

1. In the fabric workspace, select the more options ellipsis icon next to the dataflow you want to refresh.
1. Select **refresh now**.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/dataflow-gen2-refresh-now.png" alt-text="Screenshot of the more options drop-down menu with the Refresh now options emphasized.":::

### Schedule a refresh

If your dataflow needs to be refreshed on a regular interval, you can schedule the refresh using the Fabric scheduler.

1. In the Fabric workspace, select the more options ellipsis icon next to the dataflow you want to refresh.
1. Select **Schedule**.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/dataflow-gen2-schedule-refresh.png" alt-text="Screenshot of the more options dropdown menu with the Schedule option emphasized.":::

1. On the schedule page, you can set the refresh frequency and the start time and end time, after which you can apply changes.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/settings-schedule-refresh.png" alt-text="Screenshot of the dataflow's settings screen with the Schedule tab selected and the Refresh button emphasized.":::

1. To start the refresh now, select the **Refresh** button.

## Refresh history and settings

To view the refresh history of the dataflow, you can either select the recent runs tab in the dropdown menu or go into the monitor hub and select the dataflow you want to view the refresh history of.

## Settings for Dataflow Gen2 with CI/CD

Accessing the settings of the new Dataflow Gen2 with CI/CD and Git support is similar to any other Fabric item. You can access the settings by selecting the more options ellipsis icon next to the dataflow and selecting the settings.

## Saving replaces the publish operation

With Dataflow Gen2 with CI/CD and Git support, the save operation replaces the publish operation. This means that when you save your dataflow, it automatically "publishes" the changes to the dataflow. This is a significant change from the previous version of Dataflow Gen2, where you had to explicitly publish your changes. The saving operation is directly overwriting the dataflow in the workspace. If you want to discard the changes, you can do that by selecting the **Discard changes** when closing the editor. During the save operation we also check if the dataflow is in a valid state. If the dataflow is not in a valid state, we will show an error message in the dropdown menu in the workspace view. We determine the validity of the dataflow by running a "zero row" evaluation for all the queries in the dataflow. This means that we run all the queries in the dataflow in a manner that only requests the schema of the query result, without returning any rows. If a query evaluation fails or a query’s schema cannot be determined within 10 minutes, we fail validation and use the previously saved version of the dataflow for refreshes.

## Limitations and known issues

While Dataflow Gen2 with CI/CD and Git support offers a powerful set of features for enterprise ready collaboration, this required us to rebuild the backend to the fabric architecture. This means that some features are not yet available or have limitations. We are actively working on improving the experience and will update this article as new features are added.

- When you delete the last Dataflow Gen2 with CI/CD and Git support, the staging artifacts become visible in the workspace and are safe to be deleted by the user.
- Workspace view doesn't show if a refresh is ongoing for the dataflow.
- When branching out to another workspace, a Dataflow Gen2 refresh might fail with the message that the staging lakehouse couldn't be found. When this happens, create a new Dataflow Gen2 with CI/CD and Git support in the workspace to trigger the creation of the staging lakehouse. After this, all other dataflows in the workspace should start to function again.
- When syncing changes from GIT into the workspace, you need to open the new or updated dataflow and save changes manually with the editor. This triggers a publish action in the background to allow the changes to be used during refresh of your dataflow.
