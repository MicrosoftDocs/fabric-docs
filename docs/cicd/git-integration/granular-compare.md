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

# Granular Compare in Microsoft Fabric 

Granular Compare is a feature of Microsoft Fabric Git integration that lets users review the exact changes that will occur during Git operations—commit, undo, or update—before applying them.

Instead of only showing which items will be affected, Granular Compare displays a side‑by‑side or inline diff of every modified file within each workspace item. This gives developers clarity, confidence, and control over the changes moving between the Fabric workspace and the connected Git branch. The experience is consistent with the Deployment Pipeline Change Review model and reuses the same comparison component for familiarity and predictability.

Granular Compare is an interactive diff viewer that surfaces every textual change detected between:

- Workspace version of an item
- Git branch version of the same item
- Or both, in conflict situations

It highlights additions, deletions, and modifications at the file level inside any supported item type (notebooks, dataflows, semantic models, .platform files, schedules, etc.).

## Key Capabilities
Granular Compare enables users to:

- View a precise, file‑level diff for all modified items participating in a Git operation.
- Understand how Git commit, update, or undo actions will affect the workspace.
- Compare only modified items (not new, deleted, or unchanged ones).
- Inspect changes triggered by non‑content modifications, such as sub‑folder moves.
- See warnings for items using partial update, to understand why an item may behave differently.
- Navigate across all changed files within an item—collapsed by default unless opened via single‑item view.
- Identify binary items that changed (without showing their contents).
- Work across large workspaces where items may contain many files.

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

## Understand the Diff Logic
The following summarizes the diff logic and what and what isn't displayed.

### What Is Displayed
Granular Compare displays:

- Only modified items (as in Deployment Pipeline)
- All modified textual files, including .platform and .schedule
- Indicators for binary file changes
- Partial‑update warnings

It uses three icons to represent the change status:

|Entry Point|Description|
|-----|-----|
|Diff|What is in the source workspace differs from what is in the target workspace|
|New|Represents a new item in the source workspace that is not yet in the target workspace|
|Missing|Item is missing from the source workspace|

:::image type="content" source="media/granular-compare/granular-5.png" alt-text="Screenshot of the diff icons." lightbox="media/granular-compare/granular-5.png":::


### What Is Not Displayed
Granular compare does not display:

- No file‑level commit actions 
- No filtering to text‑only files 
- Items that explicitly opt out 


## Example - Diff between workspace and Git

1. At the top of your workspace, select **Source control**.
2. On the right, select **Review changes**.
  :::image type="content" source="media/granular-compare/granular-2.png" alt-text="Screenshot of review changes." lightbox="media/granular-compare/granular-2.png":::

3. On the left, select the item to review.
4. This will bring up the diff screen, review the changes.
5. At the top, you can choose the following:
    - Mark as reviewed
    - Text wrapping
    - Expand all rows

  :::image type="content" source="media/granular-compare/granular-3.png" alt-text="Screenshot of the diff screen." lightbox="media/granular-compare/granular-3.png":::
6. Once you have reviewed it, under **Source control** the item will have a checkbox and you should see a **Reviewed By** information with the reviewer and date.
  :::image type="content" source="media/granular-compare/granular-4.png" alt-text="Screenshot of the reviewed items." lightbox="media/granular-compare/granular-4.png":::

## Example - Deployment pipeline Diff compare

1. From your deployment pipeline, select the stage you want to review.
2. On the bottom pane, select **Review changes**.
  :::image type="content" source="media/granular-compare/granular-6.png" alt-text="Screenshot of deployment pipeline review changes." lightbox="media/granular-compare/granular-6.png":::

3. Select the item to review.
4. This will bring up the diff screen, review the changes.
5. At the top, you can choose the following:
    - Mark as reviewed
    - Text wrapping
    - Expand all rows
  :::image type="content" source="media/granular-compare/granular-7.png" alt-text="Screenshot of deployment pipeline diff screen." lightbox="media/granular-compare/granular-7.png":::

6. Once you have reviewed it, the item will have a checkbox and you should see a **Reviewed By** information with the reviewer and date.
  :::image type="content" source="media/granular-compare/granular-8.png" alt-text="Screenshot of the deployment pipeline reviewed items." lightbox="media/granular-compare/granular-8.png":::

  ## Related content
* [Git integration - get started](git-get-started.md)
* [Fabric APIs](/rest/api/fabric/articles/using-fabric-apis)
* [Git best practices](../best-practices-cicd.md)