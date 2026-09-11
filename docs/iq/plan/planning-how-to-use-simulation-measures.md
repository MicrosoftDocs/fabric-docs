---
title: Use Simulation Measures in a Planning Sheet
description: Learn how to create, edit, and manage simulation measures in planning in Fabric.
ms.date: 08/03/2026
ms.topic: how-to
---

# Use simulation measures in a planning sheet

Simulation measures let you model projected values without modifying the original data. Use simulations to evaluate planning scenarios, compare projected and actual values, and analyze the impact of changes before committing them.

## Create a simulation measure

1. Open the planning sheet.
1. On the **Planning** ribbon, select **Simulate**.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/simulate-command.png" alt-text="Screenshot of the Simulate command on the Planning ribbon." lightbox="media/planning-how-to-use-simulation-measures/simulate-command.png":::

1. Configure the simulation in the **Simulation** pane.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/simulation-pane.png" alt-text="Screenshot of the Simulation pane used to create a simulation measure." lightbox="media/planning-how-to-use-simulation-measures/simulation-pane.png":::

    Configure the simulation by using the following options.

    | Option | Description |
    |---|---|
    | **Title** | Specifies the display name of the simulation measure. |
    | **Insert as** | Creates either a **Visual Measure** or **Visual Column**. |
    | **Simulation based on** | Selects the measure to simulate. |
    | **Variance formatting style** | Defines how favorable and unfavorable variances are displayed. |
    | **Show slider** | Displays an interactive slider for editing simulation values. |
    | **Value range** | Specifies the allowed simulation range. The default is **±100%**. |
    | **Simulation value** | Controls whether the percentage indicator is displayed to the left or right of the simulated value. |
    | **Allow input** | Specifies whether users can edit simulated values in read mode, edit mode, or both. |
    | **Description** | Adds an optional description for the simulation measure. |

1. Select **Create**.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/simulation-measure-created.png" alt-text="Screenshot of a planning sheet with a newly created simulation measure." lightbox="media/planning-how-to-use-simulation-measures/simulation-measure-created.png":::

## Adjust values by using the simulation slider

1. Select a simulated cell to display the slider.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/simulation-slider.png" alt-text="Screenshot of a simulation slider displayed for a simulated value." lightbox="media/planning-how-to-use-simulation-measures/simulation-slider.png":::

1. Drag the slider to increase or decrease the value. The percentage change appears while you drag, and the planning sheet recalculates totals when you release the slider.

1. If you simulate a parent value, the same percentage applies to all eligible child members.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/parent-value-simulation.png" alt-text="Screenshot showing a parent-level simulation applied to child values." lightbox="media/planning-how-to-use-simulation-measures/parent-value-simulation.png":::

1. To simulate multiple values, select multiple cells by using **Ctrl** or **Shift**, and then adjust the slider on any selected cell.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/multiple-cell-simulation.png" alt-text="Screenshot showing multiple selected cells being simulated together." lightbox="media/planning-how-to-use-simulation-measures/multiple-cell-simulation.png":::

## Edit a simulation

1. Select the **Edit** icon on the slider.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/edit-simulation-button.png" alt-text="Screenshot showing the Edit option on the simulation slider." lightbox="media/planning-how-to-use-simulation-measures/edit-simulation-button.png":::

1. Enter the required percentage and select **Apply**.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/edit-simulation-dialog.png" alt-text="Screenshot of the Simulation percentage dialog." lightbox="media/planning-how-to-use-simulation-measures/edit-simulation-dialog.png":::

1. The simulation updates immediately.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/updated-simulation-value.png" alt-text="Screenshot showing an updated simulated value." lightbox="media/planning-how-to-use-simulation-measures/updated-simulation-value.png":::

## Lock or unlock a simulation

1. Select the **Lock** icon to lock the simulated cell. Locked cells aren't updated when parent-level simulations are applied.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/lock-simulation-cell.png" alt-text="Screenshot showing the Lock option on the simulation slider." lightbox="media/planning-how-to-use-simulation-measures/lock-simulation-cell.png":::

1. Locked cells are dimmed and aren't updated by parent simulations.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/locked-simulation-cell.png" alt-text="Screenshot showing a locked simulation cell." lightbox="media/planning-how-to-use-simulation-measures/locked-simulation-cell.png":::

1. Select the lock icon again to unlock the cell.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/unlock-simulation-cell.png" alt-text="Screenshot showing the Unlock option on the simulation slider." lightbox="media/planning-how-to-use-simulation-measures/unlock-simulation-cell.png":::

## Delete a simulation

1. Select the **Delete** icon to remove the simulation from the selected cell or cells.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/delete-simulation.png" alt-text="Screenshot showing the Delete option on the simulation slider." lightbox="media/planning-how-to-use-simulation-measures/delete-simulation.png":::

    > [!NOTE]
    > You can edit, lock, or delete multiple simulations by selecting multiple cells with **Ctrl** or **Shift**.

1. When the simulation slider isn't displayed, double-click a simulated cell, and enter the required value or formula directly.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/direct-edit-simulation.png" alt-text="Screenshot showing direct editing of a simulated value." lightbox="media/planning-how-to-use-simulation-measures/direct-edit-simulation.png":::

## Bulk edit simulation measures

Apply the same simulation percentage across multiple row and column members.

1. On the **Planning** ribbon, select **Bulk Edit**.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/bulk-edit-command.png" alt-text="Screenshot of the Bulk Edit command on the Planning ribbon." lightbox="media/planning-how-to-use-simulation-measures/bulk-edit-command.png":::

1. Select the simulation measure.
1. Configure filters, row level, column level, and the simulation percentage.
1. Select **Apply**.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/bulk-edit-pane.png" alt-text="Screenshot of the Bulk Edit pane showing filters, row level, column level, and simulation options." lightbox="media/planning-how-to-use-simulation-measures/bulk-edit-pane.png":::

    The selected members are updated using the specified simulation percentage.

    :::image type="content" source="media/planning-how-to-use-simulation-measures/bulk-edit-results.png" alt-text="Screenshot showing the planning sheet after a bulk simulation is applied." lightbox="media/planning-how-to-use-simulation-measures/bulk-edit-results.png":::
