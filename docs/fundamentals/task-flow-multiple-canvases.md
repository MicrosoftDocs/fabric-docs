---
title: Manage multiple task flow canvases in a workspace
description: Learn how to create, rename, and delete task flow canvases, and how to add task flows to each canvas in a workspace.
ms.reviewer: liud
author: SnehaGunda
ms.author: sngun
ms.topic: how-to
ms.date: 03/10/2026

#customer intent: As a data analytics solution architect, I want to organize multiple task flows in the same workspace so I can separate and manage different solution paths.

---

# Manage multiple task flow canvases in a workspace

This article describes how to work with multiple task flow canvases in a workspace. You can create separate canvases for different data processes, select predesigned task flow, build or import task flows on each canvas, and keep your workspace easier to navigate as projects grow.

## Prerequisites

To create, rename, or delete task flow canvases, you must be a workspace Admin, Member, or Contributor.

## When to use multiple task flow canvases

Use multiple canvases when you want to:

* Separate independent solution tracks in the same workspace.
* Keep domain-specific flows isolated from each other.
* Reduce visual complexity in large projects while preserving context.

> [!NOTE]
> One item can be assigned to multiple tasks when those tasks are in different task flow canvases.

## Create a task flow canvas

1. In the task flow area, select the task flow canvas selector.

   :::image type="content" source="./media/task-flow-multiple-canvases/task-flow-canvas-selector.png" alt-text="Screenshot showing the task flow canvas selector in the task flow area." lightbox="./media/task-flow-multiple-canvases/task-flow-canvas-selector.png":::

1. In the flyout menu, select **New task flow canvas**.

   :::image type="content" source="./media/task-flow-multiple-canvases/task-flow-new-canvas-option.png" alt-text="Screenshot showing the New task flow canvas option selected in the task flow canvas flyout menu." lightbox="./media/task-flow-multiple-canvases/task-flow-new-canvas-option.png":::

1. In the **New task flow canvas** dialog, enter a canvas name. The name field is required.
1. Choose one of the following:
   * Select **Create blank** to create an empty canvas.
   * Select **Browse task flows** to start from a predesigned task flow.

   :::image type="content" source="./media/task-flow-multiple-canvases/task-flow-new-canvas-dialog-create-blank.png" alt-text="Screenshot showing the New task flow canvas dialog with a canvas name entered and the Create blank and Browse task flows options." lightbox="./media/task-flow-multiple-canvases/task-flow-new-canvas-dialog-create-blank.png":::

The new canvas appears in the canvas selector and opens on the task flow area.

## Add a task flow in a canvas

After you create or select a canvas, add a task flow to that canvas.

1. Make sure the target canvas is selected.
1. Choose one of the following options:
   * **Select a predesigned task flow** to start from a Microsoft-provided template.
   * **Add a task** to build a custom task flow from scratch.
   * **Import a task flow** to reuse a previously exported *.json* file.

   :::image type="content" source="./media/task-flow-multiple-canvases/task-flow-building-options.png" alt-text="Screenshot showing options for building a task flow on a canvas, including Add task and Apply predesigned task flow." lightbox="./media/task-flow-multiple-canvases/task-flow-building-options.png":::

For detailed steps to build and edit the task flow itself, see [Set up a task flow](./task-flow-create.md) and [Work with task flows](./task-flow-work-with.md).


## Navigate and switch task flow canvases

Before you rename or delete a canvas, switch to the target canvas first.

1. Select the task flow canvas selector menu.
1. In the canvas list, select and click another task flow canvas to switch to it.

   :::image type="content" source="./media/task-flow-multiple-canvases/task-flow-canvas-switch.png" alt-text="Screenshot showing the task flow canvas selector list with another canvas selected to switch canvases." lightbox="./media/task-flow-multiple-canvases/task-flow-canvas-switch.png":::

## Rename a task flow canvas

1. Open the canvas selector, open canvas options, and then select **Rename canvas**.
1. Enter the new name, and then select **Rename**.

Use clear and descriptive names so you can quickly identify each canvas purpose.

## Delete a task flow canvas

1. Open the canvas selector, open canvas options, and then select **Delete canvas**.
1. Confirm the deletion.

> [!WARNING]
> Deleting this task flow canvas deletes all tasks and any assignments created between tasks and items. Items in your workspace won't be deleted. 



## Related content

* [Task flows overview](./task-flow-overview.md)
* [Set up a task flow](./task-flow-create.md)
* [Work with task flows](./task-flow-work-with.md)
