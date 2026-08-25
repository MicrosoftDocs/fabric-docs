---
title: Manage Cube Measures and Breakdowns
description: Manage cube measures to sync data with the semantic model, edit breakdown dimensions, and reuse measures across planning sheets. 
ms.date: 07/29/2026
ms.topic: how-to
---

# Manage cube measures

Use the cube measure menus to manage cube measures, synchronize them with the semantic model, modify breakdown dimensions, and control how cube measures are reused across planning sheets. The **Data** pane provides separate menus for the entire cube and for individual cube measures, so planners can perform bulk operations or manage specific measures independently.

## Modify dimension breakdowns

You configure dimension breakdowns for cubes while creating a data input or forecast measure. To edit existing breakdowns, in the **Model** ribbon, go to **Cube** > **Manage Breakdown** and select the cube measure. Add, remove, or modify the breakdown dimensions associated with the selected cube measure.

:::image type="content" source="../media/planning-cubes/how-to-manage-cube-measures/cube-manage-breakdown-option.png" alt-text="Screenshot of option to manage breakdowns where you can view the existing configuration, edit, and add new breakdowns." lightbox="../media/planning-cubes/how-to-manage-cube-measures/cube-manage-breakdown-option.png":::

## Manage cube measures

Use the main cube measure menu to synchronize, monitor, and manage all cube measures in a planning sheet. In the **Data** pane, hover over the **Cube** section and select the **More options (…)** menu.

:::image type="content" source="../media/planning-cubes/how-to-manage-cube-measures/cube-measures-more-options-menu.png" alt-text="Screenshot of options to manage all cubes in a Plan item and perform actions such as sync, view logs, expand, and collapse cubes." lightbox="../media/planning-cubes/how-to-manage-cube-measures/cube-measures-more-options-menu.png":::

| Option    | Description |
|--------   |-------------|
| **Sync with Data** | Synchronize all cube measures with the latest changes in the semantic model. |
| **View Sync Logs** | View the history and status of synchronization and cube management operations. |
| **Delete** | Permanently delete all cube measures in the planning sheet. This action also removes linked cube measures from other planning sheets and the Data pane. |
| **Collapse All** | Collapse all expanded cube measures. |
| **Expand All** | Expand and display all cube measures. |

## Manage individual cube measures

Use the specific cube measure menu to reuse, synchronize, modify, or delete a specific cube measure. In the **Data** pane, hover over the cube measure and select the **More options (…)** menu.

:::image type="content" source="../media/planning-cubes/how-to-manage-cube-measures/individual-cube-measure-more-options-menu.png" alt-text="Screenshot of options that apply to individual cube measures such as sync or insert a cube measure into a different planning sheet." lightbox="../media/planning-cubes/how-to-manage-cube-measures/individual-cube-measure-more-options-menu.png":::

| Option | Description |
|--------|-------------|
| **Insert as a Measure** | Insert the selected cube measure into the current planning sheet. |
| **Sync Measure** | Synchronize only the selected cube measure with the latest changes in the semantic model. |
| **Manage Breakdown** | Add, remove, or modify the breakdown dimensions associated with the selected cube measure. |
| **Delete** | Delete the selected cube measure, remove it from linked planning sheets, and remove its references from the Data pane. |
