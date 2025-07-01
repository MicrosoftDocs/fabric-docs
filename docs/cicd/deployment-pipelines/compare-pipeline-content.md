---
title: Compare content in different stages before deployment
description: Learn how to compare the content of the source stage and target stage before deployment with the Fabric Application lifecycle management (ALM) tool.
author: billmath
ms.author: billmath
ms.service: fabric
ms.subservice: cicd
ms.topic: how-to
ms.custom:
ms.date: 01/09/2025
ms.search.form: Deployment pipelines operations
#customer intent: As a developer, I want to learn how to compare the content of the source stage and target stage before deployment so that I can ensure that the content is correct.
---

# Compare content in different deployment stages

Before you deploy content to a different stage, it can be helpful to see the differences between the two stages. The deployment pipeline home page compares consecutive deployment stages and indicates if there are any differences between them.

Deployment pipelines pairs items of two neighboring stages by combining item type and item name, to know which items to compare and to override. Items of the same name and type are paired. If there's more than one item in a workspace with the same name and type, then the items are paired if their paths are the same. If the path isn't the same, the items aren't paired. The pairing is created only once, during the first deployment of one stage to another, or during assignment of a workspace. On subsequent deployments, each deployed item overrides its paired item metadata, including its name, if it was changed. For more information on pairing, see [pairing items](./understand-the-deployment-process.md#autobinding).

> [!NOTE]
> The new Deployment pipeline user interface is currently in **preview**. To turn on or use the new UI, see [Begin using the new UI](./deployment-pipelines-new-ui.md#begin-using-the-new-ui).

## Compare stages

### [New deployment pipeline UI](#tab/new-ui)

A comparison icon indicator appears on each stage card except for the first stage of the pipeline. It indicates if this stage is identical to the source stage (previous stage) to give a quick visual insight into the differences between them.

:::image type="content" source="./media/compare-pipeline-content/deployment-pipelines-compare-new.png" alt-text="Screenshot showing three stages of deployment. There's list of all the items in the source and target stages with icons showing the compare status." lightbox="media/compare-pipeline-content/deployment-pipelines-compare-new.png":::

The comparison indicator has two states:

- **Green indicator** – The metadata for each content item in both stages, is the same.

- **Orange indicator** - Appears if at least one item in one of the compared stages were changed, added, or removed.

When you select a deployment pipelines stage, the items in the stage are listed and compared to the item they're linked to in the source stage.

The source stage is shown in the drop-down menu on the bottom pane and the name of the compared source item’s name appears on the last column 

:::image type="content" source="./media/compare-pipeline-content/compare-stages-new.png" alt-text="Screenshot of production stage with paired items from test stage.":::

In the stage display, items are arranged alphabetically by default. You can sort or filter the items to find the ones you're interested in, or you can search for a specific item. Each item has one of the following labels depending on the comparison status:

- **Not in source** – This item appears in the selected stage, but not in the source stage.
This item can't be selected for deployment (since it doesn't exist in the source) and isn't impacted during a deployment.

- **Different from source** – A difference was identified between this item and its paired item in the source stage. The difference could be any of several things:

  - a schema change to one of the items
  - property change, like a name change (considering full path of folders, if any)
  - deployment rules that were set for this item but not applied yet (requires deployment of the item).

  After deployment, the item in the source stage overwrites the item in the target stage, regardless of where the change was made.

- **Only in source** – A new item identified in the source stage. This item doesn't exist in the selected stage and therefore s as a placeholder with no item name in the first column (under *name*). After deployment, this item will be cloned to this stage.

- **Same as source** – No difference was identified between this item and its pair in the source stage.

### [Original Deployment pipeline UI](#tab/old-ui)

:::image type="content" source="./media/compare-pipeline-content/deployment-pipelines-compare.png" alt-text="Screenshot showing three stages of deployment. There's a green check between the test and production stages and an orange X between the development and test stages." lightbox="media/compare-pipeline-content/deployment-pipelines-compare.png":::

A comparison icon indicator appears between two sequential stages to give a quick visual insight into the differences between them. The comparison indicator has two states:

- **Green indicator** – The metadata for each content item in both stages, is the same.

- **Orange indicator** - Appears if at least one item in one of the compared stages were changed, added, or removed.

When two sequential stages are different, a **Compare** link appears underneath the orange comparison icon. Select **Compare** to open the content item list in both stages. The *Compare view* helps you track changes or differences between items in each pipeline stage.

:::image type="content" source="media/compare-pipeline-content/compare.png" alt-text="A screenshot showing the compare option, which expands the compare view and allows comparing items between deployment pipeline stages." lightbox="media/compare-pipeline-content/compare.png":::

In the comparison display, paired items are next to each other, even if they have different names. All items in the workspace are listed in a flat list, regardless of their folder structure. Hover over an item to see its path and name.

Items that aren't paired or that were changed get one of the following labels:

- **New** – A new item in the source stage. This item doesn't exist in the target stage. After deployment, this item will be cloned to the target stage.

- **Different** – An item that exists both in the source and the target stage, where one of the versions was changed after the last deployment. After deployment, the item in the source stage will overwrite the item in the target stage, regardless of where the change was made.

    Semantic models with configured deployment rules that haven't been deployed, are also marked as *different*, since deployment rules aren't applied until the semantic models are deployed from the source stage to the target stage.

- **Missing from** – This item appears in the target stage, but not in the source stage. Deployment doesn't affect these items.

---

> [!NOTE]
>
> - If you make changes to a folder, such as moving its location or renaming it, even if you didn't change the items in it, the items are still treated as if you renamed them. Therefore, when comparing pipelines the items are labeled as *Different*.
> - Deployment will not impact items not in the source stage.

## Review changes to paired items

If there's a change in the schema, you can see the differences between the two items by selecting the **Compare** button.

### [New Deployment change review button](#tab/new-ui)

To compare the items in the two stages, select the **Compare** icon:

:::image type="content" source="./media/compare-pipeline-content/compare-new.png" alt-text="Screenshot showing the compare button in the top right corner.":::

### [Original Deployment change review button](#tab/old-ui)

If a text item, like a semantic model, is different, hover over it to see the **Change review** button.

:::image type="content" source="./media/compare-pipeline-content/granular-change-button.png" alt-text="Screenshot showing the change review button next to an item.":::

If there's [nothing to compare](#considerations-and-limitations), the button is disabled. If there are changes to the schema, you can select the button to see a detailed, line by line comparison of the two items.

---

A pop-up window opens with a line by line comparison of the item's content as it [currently looks in the two stages being compared](#file-modifications-before-comparison).

The top of the screen has the following information:

1. The workspace name followed by name of the item as it appears in the source (*to be deployed*) stage.
1. The total number of changes made to the file in the *to be modified* stage (green) and the *to be deployed* stage (red).
1. Up and down arrows that take you to the previous or next difference in the file.
1. A navigation bar on the right side with red or green bars highlighting where the changes are in the file.
1. Buttons that toggle between a side-by-side view and an inline view of the changes.

### [Side-by-side view](#tab/browser)

A line by line comparison of the items. On the left is the schema of this stage’s item. On the right is the schema of the paired item in the source stage.

:::image type="content" source="./media/compare-pipeline-content/changes-side-by-side-numbered.png" alt-text="Screenshot showing a side-by-side view of the changes made to the file.":::

### [Inline view](#tab/visual-studio)

An inline comparison of the items. The schema of this stage’s item is on top, and under it is the schema of the paired item in the source stage.

:::image type="content" source="./media/compare-pipeline-content/changes-inline-numbered.png" alt-text="Screenshot showing an inline view of the changes made to the file.":::

---

### Compare changes

In the *side-by-side* comparison view of the items, the code area is split in two:

- On the **left** is the item's content in the *target* stage of the deployment. This stage will be modified at the next deployment. Its content will be overridden.
- On the **right** is the item's content in the *source* stage of the deployment. This stage will be deployed. Its content will be applied.
- The lines on each side appear in the same order, so each line is next to its equivalent in the compared stage.

The *inline* comparison view, as opposed to the side-by-side view, shows each line in the *target* (to be modified) stage underneath its equivalent in the *source* (To be deployed) stage.

In both comparison displays, whether inline or side-by-side, the differences are highlighted as follows:

- The file content lines are numbered and the lines that were changed are marked as follows:

  - Changes shown in the *To be modified* stage will be removed or overwritten during the next deployment. They're highlighted in **red** with a '-' sign next to the number.
  - Changes shown in the *To be deployed* stage are the new values that will be applied during the next deployment. They're highlighted in **green** with a '+' sign next to the number.
  
- In the modified lines, the specific characters that were added or deleted are highlighted in a darker shade.

### File modifications before comparison

Both versions of the content shown in the *Compare* window are modified in the following ways to make the comparison easier:

- Data source and parameter rules are applied to the source item so that the data source you see is the one that's deployed.
- Some fields that don't indicate differences (for example, timestamps and role membership) are removed from both items.
- System managed tables, like auto aggregate, are removed.
- Items are sorted so that fields and tables appear in the same order.

Close the window when you finish examining the differences and deploy to the next stage when you're ready.

## Considerations and limitations

- The *change review* feature only supports schema changes for textual item types. Currently it supports semantic models, excluding data modeling format v1, and dataflows.

- An item can be tagged as *Different*, but still not qualify to appear in the Compare window. In these cases, the **Compare** button is disabled. For example:
  - Settings changes such as name change.
  - Item type isn't yet supported.
  - Item has an unknown status because the comparison process wasn't completed.

- The content in the change review window might look a bit different than the original version since it was [modified before running the comparison](#file-modifications-before-comparison).

## Related content

[Deploy content to the next stage](deploy-content.md)
