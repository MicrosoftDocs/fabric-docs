---
title: Overview of Fabric deployment pipelines new user interface
description: An introduction to the new user interface for deployment pipelines in the Fabric (ALM) tool
author: billmath
ms.author: billmath
ms.topic: concept-article
ms.custom:
ms.date: 12/15/2025
ms.search.form: Deployment pipelines UI
#customer intent: As a developer, I want to learn about the new user interface for deployment pipelines in the Fabric service so that I can manage my development process efficiently.
---

# New deployment pipelines user interface

The user interface for Microsoft Fabric's Deployment pipelines is undergoing a change to improve the user experience. The new UI is designed to be more focused, easier to navigate, and have a smoother flow. The functionality has stayed the same, and anything you can do with the original UI you can do with the new UI.

> [!NOTE]
> The new UI is currently in preview and is available to all users. The old UI is still available and can be accessed by using the [toggle switch](#begin-using-the-new-ui) in the upper right corner of the page.

## What changed in the new UI

The new UI offers several improvements and a change in the workflow concept over the old UI. The main changes are:

* [New workflow concept](#new-workflow-concept)
* [Enhanced experience](#enhanced-experience)

### New workflow concept

#### Pipeline stage perspective

The main difference in the new UI is the perspective. The focus is on a single selected stage and all operations are done and viewed from the perspective of that stage. Once you select a stage in the pipeline, you view and manage everything in the pipeline in relation to that stage. From that stage you can:

* View the content
* View the sync status
* Compare the content with the source stage
* View the deployment history of previous deployments to that stage
* Create rules for deployment to this stage

This is a more consistent and intuitive experience than before. Whereas in the original UI, you deployed content while in the source stage, but created rules while in the target stage, in the new UI, everything is done from the same stage.

#### Compare status by item

When you select a stage in the new UI, the content of that stage appears on the bottom pane with each item shown next to its [paired item](./intro-to-deployment-pipelines.md#item-pairing) in the source stage and the sync status displayed by default. The source stage is the one shown in the drop-down menu next to the *Deploy* button. Learn more in [Compare stages content](./compare-pipeline-content.md#compare-stages).

:::image type="content" source="./media/deployment-pipelines-new-ui/source-stage.png" alt-text="Screenshot showing where to find the name of the source stage in the new UI. It's next to the deploy button.":::

### Enhanced experience

The new UI contains advanced functionalities for a better experience. Some of these functionalities include:

* Search for an item by its name (free text)
* Filter by item type or sync status.
* Sort by name, type, or sync status
* Zoom in/out in the pipeline view

* The following functionalities are supported only in the new UI

  * [Workspace folders](./understand-the-deployment-process.md#folders-in-deployment-pipelines-preview) - View the workspace items by their folder hierarchy. To deploy items in a subfolder, navigate to that folder.
  * Parent/child items - Child items are shown but can't be deployed. During deployment, the child item is recreated in the target stage in each deployment.
  * Unsupported items in the pipeline can be seen and filtered, but not deployed.
  * Custom actions for deployment pipelines, such as *Configure rules*, are no longer available in the item menu but are available elsewhere in the UI. The item menu list is now the same as the menu on the workspace page.

## What remains unchanged

The following deployment pipeline features remain unchanged:

* [Deployment rules](./create-rules.md)
* [Deployment history](./deployment-history.md)
* [Change review](./compare-pipeline-content.md)
* The Deployment pipelines home page
* Deployment pipelines entry points

## Begin using the new UI

The default UI is the new one, but you can switch between the new and old UIs using the toggle switch in the upper right corner.

:::image type="content" source="./media/deployment-pipelines-new-ui/pipeline-switch.png" alt-text="Demonstration of how to use the toggle button to switch between the two interfaces.":::

Your selection is saved and will be remembered the next time you visit the page. You can switch back and forth as many times as you like.

## Related content

* [Overview of deployment pipelines](./intro-to-deployment-pipelines.md)
* [Get started with deployment pipelines](get-started-with-deployment-pipelines.md)
