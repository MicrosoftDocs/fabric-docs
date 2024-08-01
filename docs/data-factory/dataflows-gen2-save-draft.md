---
title: How to save and publish your dataflow
description: This article describes how to save a draft version of your dataflow.
author: luitwieler
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.author: jeluitwi
ms.search.form: DataflowGen2 Tutorials
---

# Save a draft of your dataflow

With Dataflow Gen2, we changed how saving a dataflow works. We wanted to improve the experience and resiliency of Dataflow Gen1 by:

1. Automatically saving to the cloud any change made to a dataflow. This saved change is called the draft version of the dataflow.
2. Deferring long running validation required to guarantee a dataflow can refresh, to the background. The version of the dataflow that passed validation and is ready to refresh is called the published version.

This powerful feature allows you to make changes to your dataflow without immediately publishing them to your workspace. Instead, all your changes are automatically saved as a draft, which you can review a later time, and then publish when you're ready. With this feature, you don't have to worry about losing your work if you want to resume it at a later time, if your dataflow fails validation, or if your editing session abruptly ends. In this article, you learn how to use the new Dataflow Gen2 auto-save and publish feature and how it can benefit your dataflow development and management.

## How to save a draft version of your dataflow

Saving a draft of your dataflow is as easy as just closing your browser, closing the dataflows editors, or navigating to another workspace. Anytime you add a new Power Query step to your dataflow, a draft of your changes is saved to the workspace.

## How to publish your draft dataflow

To publish the changes you made in your draft, you take the following steps:

1. Navigate to your workspace.

   :::image type="content" source="./media/dataflows-gen2-save-draft/workspace-view-inline.png" alt-text="Screenshot of the workspace view." lightbox="./media/dataflows-gen2-save-draft/workspace-view.png":::

1. Open the draft dataflow that you recently saved changes to.
1. Review all the changes you made last time.
1. Publish the dataflow with the button on the bottom of the page.

   :::image type="content" source="./media/dataflows-gen2-save-draft/publish-dataflow-inline.png" alt-text="Screenshot that shows how to publish your dataflow." lightbox="./media/dataflows-gen2-save-draft/publish-dataflow.png":::

Your dataflow starts the publishing process in the background, which is indicated by a spinner next to the dataflow name. Once the spinner completes, the dataflow can be refreshed. If there are any publishing related errors, an indication is visible next to the dataflow name. Selecting the indication reveals the publishing errors and allows you to edit the dataflow from your last saved version.

## Related content

- [Compare differences between Dataflow Gen1 and Gen2 in Data Factory](dataflows-gen2-overview.md)
- [Dataflows refresh history and monitoring](dataflows-gen2-monitor.md)
