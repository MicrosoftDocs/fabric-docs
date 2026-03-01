---
title: Compare code changes in Microsoft Fabric Git integration
description: Understand what compare code changes is and how to use it.
author: billmath
ms.author: billmath
ms.reviewer: Yaron
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 02/26/2026
---

# Compare code changes in Fabric Git integration (Public Preview)

Compare code changes is a feature of Microsoft Fabric Git integration that lets users review the exact changes that occur during Git operations—commit, undo, or update—before applying them.

Instead of only showing which items will be affected, Compare code changes displays a side‑by‑side or inline diff of every modified file within each workspace item. This gives developers clarity, confidence, and control over the changes moving between the Fabric workspace and the connected Git branch.

## Key Capabilities
Compare code changes enables developers to:
- View a precise, file‑level diff for all modified items participating in a Git operation.
- Ability to compare workspace changes before committing them into git
- Ability to review incoming updates before performing git 'update-all' operation
- Review conflict before resolving them

## Entry Points
Compare code changes can be opened from multiple locations. The following table summarizes the various entry points. 

|Entry Point|Description|
|-----|-----|
|Source Control → Changes tab|●Shows diffs where the workspace has changes relative to workspace last Git synced</br>●Workspace side is highlighted (“green side”)|
|Source Control → Updates tab|●Shows diffs where connected Git folder has new changes relative to workspac last Git synced</br>●Git branch side is highlighted (“green side”)|
|Conflict Dialog|●Shows only conflicted items</br>●Comparisons current workspace version vs. current Git version)|
|Per‑item compare|●Clicking a specific item shows its diff expanded</br>●Other items remain collapsed|


## Example - Review changes to a all or specific items
The following steps show how to review changes for a specific item. 

1. At the top of your workspace, select **Source control**.
2. To review all changes, select the **review changes** button at the top. This will open a dialog showing all the changes.
3. To review a specific item's changes, hover next to it and select the **review changes** button.  This will open a dialog that takes you directly to that item. You can review additional items from here also.
 
 :::image type="content" source="media/granular-compare/compare-new-1.png" alt-text="Screenshot of item review changes." lightbox="media/granular-compare/compare-new-1.png":::

4. On the diff screen, review the changes.
 
 :::image type="content" source="media/granular-compare/compare-new-2.png" alt-text="Screenshot of the item diff screen." lightbox="media/granular-compare/compare-new-2.png":::

## Example - Review updates
The following steps show how to review updates for items.

1. At the top of your workspace, select **Source control**.
2. To review all updates, select the **review changes** button at the top. This will open a dialog showing all the incoming updates.
3. To review a specific item's update, hover next to it and select the **review changes** button.  This will open a dialog that takes you directly to that item. You can review additional items from here also.

:::image type="content" source="media/granular-compare/compare-new-3.png" alt-text="Screenshot of item review changes for updates." lightbox="media/granular-compare/compare-new-3.png":::

4. On the diff screen, review the updates.

:::image type="content" source="media/granular-compare/compare-new-4.png" alt-text="Screenshot of diffs for updates." lightbox="media/granular-compare/compare-new-4.png":::

## Conflict resolution
Compare code changes helps in [resolving conflicts](conflict-resolution.md) by making differences explicit, scoped, and reviewable before taking any actions.

:::image type="content" source="media/granular-compare/compare-13.png" alt-text="Screenshot of the resolve conflicts diaglog." lightbox="media/granular-compare/compare-13.png":::

Hovering over the two options will reveal the **Review changes** button. Click on it and you can see the compare the current workspace version vs. current Git version.

 :::image type="content" source="media/granular-compare/compare-19.png" alt-text="Screenshot showing the workspace and git item in conflict." lightbox="media/granular-compare/compare-19.png":::

## System files and system level changes
System files and platform changes participate in Git synchronization. So whenever Microsoft Fabric sees a difference in the underlying system files, metadata changes, version updates — it correctly marks the item as "modified." This is why the item appears in the Changes or Updates list.

System files are repesented  by a "/" in the list of changes or updates. 

:::image type="content" source="media/granular-compare/compare-10.png" alt-text="Screenshot of item deletion and addition." lightbox="media/granular-compare/compare-10.png":::

In most cases, the changes in the system files are just like any other changes. In case of system platform file upgrade from version 1 to version 2. You may see additions and deletion of files which won’t affect your current changes.

For more information see [Automatically generated system files](source-code-format.md).


## Limitations
The following is a list of limitations for the code changes compare feature.

- Files that are over 1 MB, like binary files, don't show content.
- Not all Fabric / Power BI items is supported with Git code changes compare experience.
- In case of conflict, you can only open the compare dialog from the **changes** tab or via the conflict dialog.
- if the change is one of encoding (if the file was manually uploaded to git and saved under a special encoding), the git status will detect the change, but code changes compare dialog will show 0 diffs

 ## Related content
* [Git integration - get started](git-get-started.md)
* [Git integration - resolve conflict](conflict-resolution.md)
* [Automatically generated system files](source-code-format.md)