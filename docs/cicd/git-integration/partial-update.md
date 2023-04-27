---
title: Manual updates with Git integration
description: Learn how to update your workspace manually when there's an internal inconsistency.
author: mberdugo
ms.author: monaberdugo
ms.service: powerbi
ms.topic: how-to
ms.date: 05/23/2023
ms.custom:
---

# Manual update

When updating more than one item in a workspace, there’s always a chance that one of them will fail. This can happen if the incoming update from the git branch causes inconsistencies or dependency problems in the workspace that are difficult to determine in advance. The update stops when an item fails. For example, if you're tying to update three items, and the second item fails, you're left in a situation where your workspace isn't synced to any git branch.

:::image type="content" source="./media/manual-update/partial-update-error.png" alt-text="Screenshot showing the error message when update fails.":::

This error message appears for any user trying to access the workspace, until the update is completed successfully.

Your workspace now contains.

* The item or items updated before the failure are identical to the items in git, but the metadata isn't updated. These have a git status of *synced* but with a triangle warning.
* The item that failed. This item has a git status of *Update required*.
* The items or items after the one that failed aren't updated at all. These have a git status of *Update required*.

The status bar at the bottom of the screen that shows the latest sync status is red and indicated the partially synced status.

One item is updated and identical to the git item, but the metadata isn't updated, one item failed, and one item is

1. Figure out which item is causing the problem and what the problem is using the error dialog that says which item failed and error message.
1. Fix it in git (eg. revert to earlier version, or fix the problem with the item)
1. Update again

## Revert item

Fix problems in git and then update

## Considerations and limitations

The update process fails as soon as one item fails. Therefore, there's no way to know if other items in the git branch are also problematic. If you're updating many items and more than one item is problematic, you have to repeat this process once for each failed item.
