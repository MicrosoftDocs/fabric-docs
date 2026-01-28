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
ms.date: 01/20/2026
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
- Identify binary items that changed (without showing their contents).
- Work across large workspaces where items may contain many files.

## Limitations
The following is a list of limitations for the granular compare feature.

- Files that are over 1 MB, like binary files, don't show content.
- System file operations currently don't display content.  See [System files and granular compare](#system-files-and-granular-compare) for more information.
- In case of conflict,  you can only open the compare dialog from the **changes** tab and via the conflict dialog.

## How it works
The following sections provide an overview of how granular compare works.

### Entry Points
Granular Compare can be opened from multiple locations. The following table summarizes the various entry points. 

|Entry Point|Description|
|-----|-----|
|Source Control → Changes tab|●Shows diffs where the workspace has changes relative to Git</br>●Workspace side is highlighted (“green side”)|
|Source Control → Updates tab|●Shows diffs where Git has new changes relative to workspace</br>●Git branch side is highlighted (“green side”)|
|Conflict Dialog|●Shows only conflicted items</br>●Comparisons depend on scenario (e.g., workspace vs. latest Git)|
|Per‑item compare|●Clicking a specific item shows its diff expanded</br>●Other items remain collapsed|


## System files, system level changes and granular compare
System files and system level changes are included in Git export/import because Microsoft Fabric must track them for correctness, lineage, and reproducibility. However, their internal contents are not rendered in the compare viewer.

System files and system level changes participate in Git synchronization. So whenever Microsoft Fabric sees a difference in the underlying system file—format changes, metadata changes, version updates—it correctly marks the item as "modified." This is why the item appears in the Changes or Updates list. But their content is currently not diff‑renderable and because of this, the diff component can’t currently render meaningful before/after views. 

System files are repesented  by a "/" in the list of changes or updates. The following screenshot shows an update to the git integration schema. An update to the git schema would be considered a system level change.

 :::image type="content" source="media/granular-compare/compare-10.png" alt-text="Screenshot of the schema update screen." lightbox="media/granular-compare/compare-10.png":::

You may see additions and deletions but in reality nothing changes, only the change in report.json is changing.

 :::image type="content" source="media/granular-compare/compare-11.png" alt-text="Screenshot of item deletion and addition." lightbox="media/granular-compare/compare-11.png":::

For more information see [Automatically generated system files](../git-integration/source-code-format.md) and see [Example - Sytem file 1.0 changes](#example---sytem-file-10-changes.) for an additional example.


## Example - Review changes to a specific item
The following steps show how to review changes for a specific item.

1. At the top of your workspace, select **Source control**.
2. On the right, under **changes**, select the item you want to review.
3. Select the **Review changes** box next to the item.
 :::image type="content" source="media/granular-compare/compare-1.png" alt-text="Screenshot of item review changes." lightbox="media/granular-compare/compare-1.png":::

4. On the diff screen, review the changes.
 :::image type="content" source="media/granular-compare/compare-2.png" alt-text="Screenshot of the item diff screen." lightbox="media/granular-compare/compare-2.png":::

5. Once you have reviewed it, under **Source control** the item has a checkbox and you should see a **Reviewed By** information with the reviewer and date.


## Example - Review changes to all items
The following steps show how to review changes for all items.

1. At the top of your workspace, select **Source control**.
2. On the right, select **Review changes**.
 :::image type="content" source="media/granular-compare/compare-3.png" alt-text="Screenshot of review all changes." lightbox="media/granular-compare/compare-3.png":::

3. On the diff screen, review the changes.
 :::image type="content" source="media/granular-compare/compare-4.png" alt-text="Screenshot of the diff screen." lightbox="media/granular-compare/compare-4.png":::

4. Once you have reviewed it, under **Source control** the item has a checkbox and you should see a **Reviewed By** information with the reviewer and date.

## Example - Review updates
The following steps show how to review updates for items.

1. At the top of your workspace, select **Source control**.
2. On the right, under **updates**, select the item you want to review.
3. Select the **Review changes** box next to the item.
 :::image type="content" source="media/granular-compare/compare-5.png" alt-text="Screenshot of item review upsates." lightbox="media/granular-compare/compare-5.png":::

4. On the diff screen, review the updates.
 :::image type="content" source="media/granular-compare/compare-6.png" alt-text="Screenshot of the diff screen." lightbox="media/granular-compare/compare-6.png":::

5. Once you have reviewed it, under **Source control** the item has a checkbox and you should see a **Reviewed By** information with the reviewer and date.

## Example - Sytem file 1.0 changes
The following steps show how to review changes to system files. Remember that system files content is currently not diff‑renderable and because of this, the diff component can’t currently render meaningful before/after views. In this example, the **report**. item is renamed to **quarterly report**.

1. At the top of your workspace, select **Source control**.
2. On the right, under **changes**, select the item you want to review.
3. Select the **Review changes** box next to the item.
 :::image type="content" source="media/granular-compare/compare-7.png" alt-text="Screenshot of report changes." lightbox="media/granular-compare/compare-7.png":::

4. On the diff screen, note that there are no visible changes.
 :::image type="content" source="media/granular-compare/compare-8.png" alt-text="Screenshot of report changes." lightbox="media/granular-compare/compare-8.png":::

 5. Once you have reviewed it, under **Source control** the item has a checkbox and you should see a **Reviewed By** information with the reviewer and date.


## Example - Items in conflict
If a conflict is detected between items, the granular compare feature will be disabled until this conflict is resolved.
 :::image type="content" source="media/granular-compare/compare-9.png" alt-text="Screenshot of conflict." lightbox="media/granular-compare/compare-9.png":::

## automaticaly generated system file behavior'


 ## Related content
* [Git integration - get started](git-get-started.md)
* [Fabric APIs](/rest/api/fabric/articles/using-fabric-apis)
* [Git best practices](../best-practices-cicd.md)