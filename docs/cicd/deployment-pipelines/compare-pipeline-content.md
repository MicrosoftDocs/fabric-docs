---
title: Compare content in different stages before deployment
description: Learn how to compare the content of the source stage and target stage before deployment with the Fabric Application lifecycle management (ALM) tool.
author: mberdugo
ms.author: monaberdugo
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/09/2023
ms.search.form: Deployment pipelines operations
---

# Compare content in different deployment stages

Before you deploy content to a different stage, it can be helpful to see the differences between the two stages. The deployment pipeline home page compares consecutive deployment stages and indicates if there are any differences between them. Use the **Compare** and **Change review** buttons to display the content of each pipeline and see exactly which items are different and where those differences are.

Deployment pipelines pairs items of two neighboring stages by combining item type and item name, to know which items to compare and to override. The item name includes the path, so items in different folders are not paired. The pairing is created only once, during the first deployment of one stage to another, or during assignment of a workspace. On subsequent deployments, each deployed item will override its paired item metadata, including its name, if it was changed.

## Compare stages

:::image type="content" source="./media/compare-pipeline-content/deployment-pipelines-compare.png" alt-text="Screenshot showing three stages of deployment. There's a green check between the test and production stages and an orange X between the development and test stages." lightbox="media/compare-pipeline-content/deployment-pipelines-compare.png":::

A comparison icon indicator appears between two sequential stages to give a quick visual insight into the differences between them. The comparison indicator has two states:

- **Green indicator** – The metadata for each content item in both stages, is the same.

- **Orange indicator** - Appears if one of these conditions is true:
  - Some of the content items in each stage were changed or updated (have different metadata).
  - There's a difference in the number of items in each stage.

When two sequential stages are different, a **Compare** link appears underneath the orange comparison icon. Select **Compare** to open the content item list in both stages. This *Compare view* helps you track changes or differences between items in each pipeline stage.

:::image type="content" source="media/compare-pipeline-content/compare.png" alt-text="A screenshot showing the compare option, which expands the compare view and allows comparing items between deployment pipeline stages." lightbox="media/compare-pipeline-content/compare.png":::

In the comparison display, items are arranged alphabetically by item type. Paired items are next to each other, even if they have different names.

Items that aren't paired or that were changed get one of the following labels:

- **New** – A new item in the source stage. This item doesn't exist in the target stage. After deployment, this item will be cloned to the target stage.

- **Different** – An item that exists both in the source and the target stage, where one of the versions was changed after the last deployment. After deployment, the item in the source stage will overwrite the item in the target stage, regardless of where the change was made.

    Semantic models with configured deployment rules that haven't been deployed, are also marked as *different*, since deployment rules aren't applied until the semantic models are deployed from the source stage to the target stage.

- **Missing from** – This item appears in the target stage, but not in the source stage.

    >[!NOTE]
    >Deployment will not impact *missing from* items.

## Review changes to paired items

If a text item, like a semantic model, is different, hover over it to see the **Change review** button.

:::image type="content" source="./media/compare-pipeline-content/granular-change-button.png" alt-text="Screenshot showing the change review button next to an item.":::

If there's [nothing to compare](#considerations-and-limitations), the button is disabled. If there are changes to the schema, you can select the button to see a detailed, line by line comparison of the two items.

When you select the **Change review** button, a pop-up window opens with a line by line comparison of the item's content as it [currently looks in the two stages being compared](#file-modifications-before-comparison).

The top of the screen has the following information:

1. The workspace name followed by name of the item as it appears in the source (*to be deployed*) stage.
1. The total number of changes made to the file in the *to be modified* stage (green) and the *to be deployed* stage (red).
1. Up and down arrows that take you to the previous or next difference in the file.
1. A navigation bar on the right side with red or green bars highlighting where the changes are in the file.
1. Buttons that toggle between a side-by-side view and an inline view of the changes.
1. The change review window with a line by line comparison of the items.

### [Side-by-side view](#tab/browser)

:::image type="content" source="./media/compare-pipeline-content/changes-side-by-side-numbered.png" alt-text="Screenshot showing a side-by-side view of the changes made to the file.":::

### [Inline view](#tab/visual-studio)

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

The two versions of the content shown in the change review window are modified in the following ways to make the comparison easier:

- Data source and parameter rules are applied to the source item so that the data source you see is the one that will be deployed.
- Some fields that don't indicate differences (for example, timestamps and role membership) are removed from both items.
- System managed tables, like auto aggregate, are removed.
- Items are sorted so that fields and tables appear in the same order.

Close the window when you finish examining the differences and deploy to the next stage when you're ready.

## Considerations and limitations

- The *change review* feature only supports schema changes for textual item types. Currently it supports semantic models, excluding data modeling format v1, and dataflows.

- An item can be tagged as *Different*, but still not qualify for change review. In these cases, the **Change review** button is disabled. For example:
  - Settings changes such as name change.
  - Item type isn't yet supported.
  - Item has an unknown status because the comparison process wasn't completed.

- The content in the change review window may look a bit different than the original version since it was [modified before running the comparison](#file-modifications-before-comparison).

## Related content

[Deploy content to the next stage](deploy-content.md)
