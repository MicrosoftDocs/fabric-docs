---
title: Dataflow Gen2 with CI/CD and Git integration
description: Learn how to use Dataflow Gen2 with CI/CD and Git integration in Fabric Data Factory.
ms.reviewer: whhender
ms.author: jeluitwi
author: luitwieler
ms.topic: how-to
ms.date: 08/29/2025
ms.custom: dataflows
ai-usage: ai-assisted
---

# Dataflow Gen2 with CI/CD and Git integration

Dataflow Gen2 supports Continuous Integration/Continuous Deployment (CI/CD) and Git integration. You can create, edit, and manage dataflows in a Git repository connected to your Fabric workspace. Use deployment pipelines to automate moving dataflows between workspaces. This article explains how to use these features in Fabric Data Factory.

## Features

Dataflow Gen2 with CI/CD and Git integration offers a range of capabilities to streamline your workflow. Here's what you can do with these features:

- Integrate Git with Dataflow Gen2.
- Automate dataflow deployment between workspaces using deployment pipelines.
- Refresh and edit Dataflow Gen2 settings with Fabric tools.
- Create Dataflow Gen2 directly in a workspace folder.
- Use Public APIs (preview) to manage Dataflow Gen2 with CI/CD and Git integration.

## Prerequisites

Before you start, make sure you:

- Have a Microsoft Fabric tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- Use a Microsoft Fabric-enabled workspace.
- Enable Git integration for your workspace. [Learn how to enable Git integration](/fabric/cicd/git-integration/git-get-started).

## Create a Dataflow Gen2 with CI/CD and Git integration

Creating a Dataflow Gen2 with CI/CD and Git integration allows you to manage your dataflows efficiently within a connected Git repository. Follow these steps to get started:

1. In the Fabric workspace, select **Create new item**, then select **Dataflow Gen2**.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/new-dataflow-gen2-item.png" alt-text="Screenshot of the New item window with the Dataflow Gen2 item emphasized.":::

1. Name your dataflow, enable Git integration, and select **Create**.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/new-dataflow-gen2-item-set-name.png" alt-text="Screenshot of the New Dataflow Gen2 window with the dataflow name set and Git integration emphasized and selected.":::

   The dataflow opens in the authoring canvas, where you can start creating your dataflow.

1. When you're done, select **Save and run**.

1. After publishing, the dataflow shows an "uncommitted" status.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/dataflow-gen2-uncommited-git.png" alt-text="Screenshot of the saved Dataflow Gen2 with the status shown as uncommitted.":::

1. To commit the dataflow to Git, select the source control icon in the top-right corner.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/source-control-button.png" alt-text="Screenshot of the Source control button.":::

1. Select the changes to commit, then select **Commit**.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/commit-changes-to-git.png" alt-text="Screenshot of the Source control window with the dataflow selected and Commit button emphasized.":::

Your Dataflow Gen2 with CI/CD and Git integration is ready. For best practices, see the [Scenario 2 - Develop using another workspace](/fabric/cicd/git-integration/manage-branches?tabs=azure-devops#scenario-2---develop-using-another-workspace) tutorial.

## Refresh a Dataflow Gen2

Refreshing a Dataflow Gen2 ensures your data is up-to-date. You can [refresh manually](#refresh-now) or [set up a schedule](#schedule-a-refresh) to automate the process.

### Refresh now

1. In the Fabric workspace, select the ellipsis next to the dataflow.
1. Select **Refresh now**.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/dataflow-gen2-refresh-now.png" alt-text="Screenshot of the more options drop-down menu with the Refresh now options emphasized.":::

### Schedule a refresh

1. In the Fabric workspace, select the ellipsis next to the dataflow.
1. Select **Schedule**.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/dataflow-gen2-schedule-refresh.png" alt-text="Screenshot of the more options dropdown menu with the Schedule option emphasized.":::

1. On the schedule page, set the refresh frequency, start time, and end time. Apply changes.

   :::image type="content" source="media/dataflow-gen2-cicd-and-git-integration/settings-schedule-refresh.png" alt-text="Screenshot of the dataflow's settings screen with the Schedule tab selected and the Refresh button emphasized.":::

1. To refresh immediately, select **Refresh**.

## View refresh history and settings

Understanding the refresh history and managing settings helps you monitor and control your Dataflow Gen2. Here's how you can access these options.

To view refresh history, select the recent runs tab in the dropdown menu or go to the monitor hub and select the dataflow.

Access dataflow settings by selecting the ellipsis next to the dataflow and choosing **Settings**.

## Save replaces publish

The save operation in Dataflow Gen2 with CI/CD and Git integration automatically publishes changes, simplifying the workflow.

Saving a Dataflow Gen2 automatically publishes changes. If you want to discard changes, select **Discard changes** when closing the editor.

### Validation

When saving, the system checks if the dataflow is valid. If not, an error appears in the workspace view. Validation runs a "zero row" evaluation, which checks query schemas without returning rows. If a query's schema can't be determined within 10 minutes, the evaluation fails. If validation fails, the system uses the last saved version for refreshes.

## Just-in-time publishing

Just-in-time publishing ensures your changes are available when needed. This section explains how the system handles publishing during refreshes and other operations.

Dataflow Gen2 uses an automated "just-in-time" publishing model. When you save a dataflow, changes are immediately available for the next refresh or execution. Syncing changes from Git or using deployment pipelines saves the updated dataflow in your workspace. The next refresh attempts to publish the latest saved version. If publishing fails, the error appears in the refresh history.

In some cases, the backend automatically republishes dataflows during refreshes to ensure compatibility with updates.

APIs are also available to refresh a dataflow without publishing or to manually trigger publishing.

## Limitations and known issues

While Dataflow Gen2 with CI/CD and Git integration is powerful, there are some limitations and known issues to be aware of. Here's what you need to know.

Currently, Dataflow Gen2 with CI/CD and Git integration has these limitations:

- Deleting the last Dataflow Gen2 with CI/CD reveals staging items in the workspace. These can be safely deleted.
- The workspace view doesn't show ongoing refreshes, last refresh, next refresh, or refresh failures.
- Refresh failure notifications aren't supported. Use Data Pipelines for orchestration.
- Refreshes could fail when branching to another workspace. Create a new Dataflow Gen2 with CI/CD in the workspace to resolve this.
- After syncing changes from Git or using deployment pipelines, open and save the dataflow in the editor to trigger publishing. Alternatively, use the [on-demand Dataflow publish job API call](/fabric/data-factory/dataflow-gen2-public-apis#run-on-demand-dataflow-publish-job).
- The Power Automate connector for dataflows doesn't work with Dataflow Gen2 with CI/CD and Git integration.
