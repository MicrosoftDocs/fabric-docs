---
title: Granular Compare in Microsoft Fabric
description: Understand what granular compare is and how to use it.
author: billmath
ms.author: billmath
ms.reviewer: Yaron
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 03/10/2026
---

# Compare code changes in Git Integration (Public Preview)

Granular Compare is a feature of Microsoft Fabric Git integration that lets users review the exact changes that occur during Git operations—commit, undo, or update—before applying them.

Instead of only showing which items will be affected, Granular Compare displays a side‑by‑side or inline diff of every modified file within each workspace item. This gives developers clarity, confidence, and control over the changes moving between the Fabric workspace and the connected Git branch. The experience is consistent with the Deployment Pipeline Change Review model and reuses the same comparison component for familiarity and predictability.

Granular Compare is an interactive diff viewer that surfaces every textual change detected between:

- Workspace version of an item
- Git branch version of the same item
- Or both, in conflict situations

It highlights additions, deletions, and modifications at the file level inside any supported item type (notebooks, dataflows, semantic models, .platform files, schedules, etc.).

## Key Capabilities
Granular Compare enables users to:

- View a precise, file‑level diff for all modified items participating in a Git operation.
- Understand how Git commit, update, or undo actions affect the workspace.
- Compare only modified items (not new, deleted, or unchanged ones).
- Inspect changes triggered by non‑content modifications, such as sub‑folder moves.
- Navigate across all changed files within an item—collapsed by default unless opened via single‑item view.
- Work across large workspaces where items may contain many files.

## Entry Points
Granular Compare can be opened from multiple locations. The following table summarizes the various entry points. 

|Entry Point|Description|
|-----|-----|
|Source Control → Changes tab|●Shows diffs where the workspace has changes relative to Git</br>●Workspace side is highlighted (“green side”)|
|Source Control → Updates tab|●Shows diffs where Git has new changes relative to workspace</br>●Git branch side is highlighted (“green side”)|
|Conflict Dialog|●Shows only conflicted items</br>●Comparisons depend on scenario (e.g., workspace vs. latest Git)|
|Per‑item compare|●Clicking a specific item shows its diff expanded</br>●Other items remain collapsed|


## Example - Review changes to a all or specific items
The following steps show how to review changes for a specific item. 

1. At the top of your workspace, select **Source control**.
2. To review all changes, select the **review changes** button at the top. This will open a dialog showing all the changes.
3. To review a specific item's changes, hover next to it and select the **review changes** button.  This will open a dialog that takes you directly to that item. You can review additional items from here also.
 
 :::image type="content" source="media/granular-compare/compare-new-1.png" alt-text="Screenshot of item review changes." lightbox="media/granular-compare/compare-new-1.png":::

4. On the diff screen, review the changes.
 
 :::image type="content" source="media/granular-compare/compare-new-2.png" alt-text="Screenshot of the item diff screen." lightbox="media/granular-compare/compare-new-2.png":::

5. Once you have reviewed it, click **Commit** to commit the changes.

## Example - Review updates
The following steps show how to review updates for items.

1. At the top of your workspace, select **Source control**.
2. To review all updates, select the **review changes** button at the top. This will open a dialog showing all the incoming updates.
3. To review a specific item's update, hover next to it and select the **review changes** button.  This will open a dialog that takes you directly to that item. You can review additional items from here also.

:::image type="content" source="media/granular-compare/compare-new-3.png" alt-text="Screenshot of item review changes for updates." lightbox="media/granular-compare/compare-new-3.png":::

4. On the diff screen, review the updates.

:::image type="content" source="media/granular-compare/compare-new-4.png" alt-text="Screenshot of diffs for updates." lightbox="media/granular-compare/compare-new-4.png":::

5. Once you have reviewed it, click **Update all** to commit the changes.



## Conflict resolution
Granular compare helps mitigate conflicts by making differences explicit, scoped, and reviewable before a Git operation is executed, reducing accidental overwrites and uncertainty when multiple users work in the same workspace.

 :::image type="content" source="media/granular-compare/compare-14.png" alt-text="Conceputal image simulating a conflict." lightbox="media/granular-compare/compare-14.png":::

For example, lets consider the following scenario:

- A Microsoft Fabric wokspace connected to a GitHub repository
- The Fabric workspace contains a notebook that is synced to the GitHub repo.
- Developer A changes the display name of the notebook from `Notebook_Test_1` to `My_Notebook_Test_1` in the workspace. 
- Developer B chnages the display name of the notebook from `Notebook_Test_1` to `New_Notebook_Test_1` in the GitHub repo.

The following scenario will introduce a conflict.

 :::image type="content" source="media/granular-compare/compare-16.png" alt-text="Screenshot showing the conflict between the notebooks." lightbox="media/granular-compare/compare-16.png":::

Under **Source control** you can see two red marks indicating status changes. Digging deeper, under **Changes** we see the uncommitted name change of `Notebook_Test_1` to `My_Notebook_Test_1` in the workspace.

 :::image type="content" source="media/granular-compare/compare-17.png" alt-text="Screenshot showing the change to the notebook." lightbox="media/granular-compare/compare-17.png":::

Under **Updates** we see the update coming from the GitHub repo.

 :::image type="content" source="media/granular-compare/compare-18.png" alt-text="Screenshot showing the update to the notebook." lightbox="media/granular-compare/compare-17.png":::

Using granular compare, we can see both changes by click the **Resolve conflicts** button.  This brings up a new dialog that allows you to choose between keeping the current changes in the workspace or importing the changes from your git provider.  

|Resolution option|Description|
|-----|-----|
|Accept incoming changes|Accepts the change from your Git provider. This will overwrite the value in the workspace.|
|Keep current content|Keeps the current workspace change and ignores the incoming change from your Git provider. This will overwrite the value in your Git repository.|

:::image type="content" source="media/granular-compare/compare-13.png" alt-text="Screenshot of the resolve conflicts diaglog." lightbox="media/granular-compare/compare-13.png":::

Hovering over the two options will reveal the **Review changes** button.  Click on it and you can see the changes from both the workspace and the Git repo.

 :::image type="content" source="media/granular-compare/compare-19.png" alt-text="Screenshot showing the workspace and git item in conflict." lightbox="media/granular-compare/compare-19.png":::

 ### Accept incoming changes

Selecting **Accept incoming changes** will overwrite the changes in the workspace with the changes that are coming from Git.

 :::image type="content" source="media/granular-compare/compare-20.png" alt-text="Screenshot showing accept incoming changes." lightbox="media/granular-compare/compare-20.png":::

You need to place a check in **I understand workspace items may be deleted and can't be restored** and click **Merge and Update**.  This will bring the change into the workspace.

However, you still need to commit this new change to the workspace, so click on the **Changes** tab. Place a check next to the notebook and click **Commit**.

 :::image type="content" source="media/granular-compare/compare-21.png" alt-text="Screenshot showing commiting changes." lightbox="media/granular-compare/compare-21.png":::

That should commit and the conflict should be resolved.

 ### Keep current content

Selecting **Keep current content** will ignore the changes coming from Git and will keep the change in the workspace.

 :::image type="content" source="media/granular-compare/compare-22.png" alt-text="Screenshot showing keeping current content." lightbox="media/granular-compare/compare-22.png":::

Click **Merge and Update**.  This will ignore the change coming from Git.

However, you still need to commit this new change to the workspace, so click on the **Changes** tab. Place a check next to the notebook and click **Commit**.

 :::image type="content" source="media/granular-compare/compare-21.png" alt-text="Screenshot showing commiting changes." lightbox="media/granular-compare/compare-21.png":::

That should commit, the changes from the workspace should be synched to the Git repo and the conflict should be resolved.

>[!NOTE]
> After selecting Accept incoming changes or Keep current content or , you still need to commit the workspace change.

## System files and system level changes
System files and system level changes participate in Git synchronization. So whenever Microsoft Fabric sees a difference in the underlying system file—format changes, metadata changes, version updates—it correctly marks the item as "modified." This is why the item appears in the Changes or Updates list.

System files are repesented  by a "/" in the list of changes or updates. 

:::image type="content" source="media/granular-compare/compare-11.png" alt-text="Screenshot of item deletion and addition." lightbox="media/granular-compare/compare-11.png":::

In most cases, the changes in the system files are just like any other changes. In some extreme edge cases, you may see additions and deletions but in reality nothing changes.

For more information see [Automatically generated system files](../git-integration/source-code-format.md).


## Limitations
The following is a list of limitations for the granular compare feature.

- Files that are over 1 MB, like binary files, don't show content.
- System files and system level changes currently show content, but sometimes these changes don't reflect actual changes being made to the item.  See [System files and system level changes](#system-files-and-system-level-changes) for more information.
- In case of conflict,  you can only open the compare dialog from the **changes** tab and via the conflict dialog.
- Granular compare is in preview and as such, currently not all items are supported
- if the change is one of encoding (if the file was manually uploaded to git and saved under a special encoding), the git status will detect the change, but granular compare will show 0 diffs


 ## Related content
* [Git integration - get started](git-get-started.md)
* [Fabric APIs](/rest/api/fabric/articles/using-fabric-apis)
* [Git best practices](../best-practices-cicd.md)