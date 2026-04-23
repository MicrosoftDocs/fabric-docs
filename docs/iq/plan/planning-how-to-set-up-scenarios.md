---
title: Set up a scenario
description: Learn how to simulate business outcomes in Planning sheets by using scenarios. Simulate business outcomes for effective planning decisions.
ms.date: 04/22/2026
ms.topic: how-to
#customer intent: As a user, I want to understand and use Scenarios effectively.
---

# Analyze planning outcomes with scenarios

Scenarios let you create multiple planning versions within a Planning sheet to evaluate different business outcomes. Use scenarios to compare budgets, forecasts, and alternative business assumptions without affecting the base data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you create a scenario, make sure that you have the following prerequisites in place:

* You have access to the Planning sheet.
* Required fields and dimensions are added.
* The planning model includes a scenario dimension.
* You have permission to edit planning data.

## Create a scenario

1. Go to **Model > Scenario**.
1. Enter a name for the scenario in **Scenario name**.
1. Select the series to be simulated and select **Create**.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/create-scenario.png" alt-text="Screenshot showing the steps to create a scenario." lightbox="media/planning-how-to-set-up-scenarios/create-scenario.png":::

1. Adjust the slider to increase or decrease cell values and simulate sales values. Net revenue is recalculated accordingly.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/value-slider.png" alt-text="Screenshot showing the value slider for a cell." lightbox="media/planning-how-to-set-up-scenarios/value-slider.png":::

1. Review the results and select **Save** to save the scenario.
1. To create more scenarios, select the **+** icon at the bottom of the page. When you're done, select **Save** to save the report.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/save-add.png" alt-text="Screenshot of adding another scenario and saving the report." lightbox="media/planning-how-to-set-up-scenarios/save-add.png":::

The new scenario is added to the Planning sheet and is available for planning and analysis.

## Scenario toolbar

Use the **Scenario** tab to create, manage, and analyze scenarios in the Planning sheet.

:::image type="content" source="media/planning-how-to-set-up-scenarios/scenario-toolbar.png" alt-text="Screenshot showing the  scenario toolbar." lightbox="media/planning-how-to-set-up-scenarios/scenario-toolbar.png":::

## Compare scenarios

Use **Compare scenarios** to analyze differences between two scenarios across measures, time periods, and dimensions. This view helps you evaluate performance, identify variances, and make data-driven decisions.

### Open scenario comparison

1. Go to the planning view.
1. Select **Compare Scenario**.
1. The **Scenario Comparison** view opens.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/compare-scenario-tab.png" alt-text="Screenshot showing the compare scenario." lightbox="media/planning-how-to-set-up-scenarios/compare-scenario-tab.png":::


### Configure comparison

The following configuration options are available:

* **Compare**: Select the primary scenario you want to analyze.
* **With**: Select the scenario to compare against.
* **Measures**: Choose the measures to include in the comparison. Select **All Measures** or a specific measure.

### Key elements of the comparison view

The comparison grid displays data across selected dimensions and time periods.

* **Scenarios**: Displays values for both selected scenarios.
* **Δ Scenario**: Shows the variance between the two scenarios.
  * Positive values indicate an increase.
  * Negative values indicate a decrease.
* **Time periods**: Data is grouped by periods such as **Q1** and **Q2**.
* **Measures**: Displays values for selected measures.
* **Dimensions**: Rows represent hierarchical categories such as *Category*, *Beverages*, and *Water*.

### Exit comparison

Select **Exit Compare** to return to the standard view shown in the following image.

:::image type="content" source="media/planning-how-to-set-up-scenarios/compare-scenario.png" alt-text="Screenshot showing the compare scenario view." lightbox="media/planning-how-to-set-up-scenarios/compare-scenario.png":::

## Update scenario settings

Update scenario settings such as the name, included measures, and lock status in **Edit Scenario** under **Scenario > Settings**.

* **Scenario name**: Update the name of the scenario.
* Under **Include series in scenarios**, select the measures to include:
  * Choose one or more series.
  * Only selected series are included in the simulation.
* **Lock the scenario**: Select **Lock Scenario** to prevent changes to the scenario.

    > [!NOTE]
    > When a scenario is locked, you cannot modify values or settings until it is unlocked.

* Select **Apply** to save changes, or select **Cancel** to discard changes.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/scenario-settings.png" alt-text="Screenshot showing the scenario settings." lightbox="media/planning-how-to-set-up-scenarios/scenario-settings.png":::

## Configure input method

Use the **Input Method** to simulate and adjust values directly in the Planning sheet.

:::image type="content" source="media/planning-how-to-set-up-scenarios/configure-input.png" alt-text="Screenshot for configuring the input in scenario.":::

### Simulation

Adjust the slider to increase or decrease cell values and test different outcomes.

Enter a custom value in a cell to apply a specific adjustment.

:::image type="content" source="media/planning-how-to-set-up-scenarios/scenario-simulation.png" alt-text="Screenshot for configuring the input using simulation in scenario." lightbox="media/planning-how-to-set-up-scenarios/scenario-simulation.png":::

### Distribution

Distribution lets you apply consistent or trend-based changes quickly across multiple data points. Use the distribution options to apply values across rows or columns.

When adjusting distribution values, use the slider to increase or decrease values proportionally. Enter a custom value in a cell to apply a specific adjustment.

Available distribution options:

* **Copy until last row in \<category>**: Apply the value to all rows from the selected category until the last row.
* **Copy until last row with trend in \<category>**: Apply values across rows based on an existing trend.
* **Copy to all rows in \<category>**: Distribute the value to all rows in the selected category.
* **Copy to all rows**: Apply the value across all rows in the sheet.
* **Copy until last column**: Apply the value across columns until the last column.
* **Copy until last column with trend**: Distribute values across columns using a trend.
* Select **Reset value** to revert changes to the original value.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/scenario-distribution.png" alt-text="Screenshot for configuring the input using distribution in scenario." lightbox="media/planning-how-to-set-up-scenarios/scenario-distribution.png":::

## Show variance

View differences between scenario values and base values when **Show variance** is checked.

:::image type="content" source="media/planning-how-to-set-up-scenarios/show-variance.png" alt-text="Screenshot for showing variance in scenario.":::

### Slider settings

Select **Slider settings** to open the **Variance settings** pane.

### Variance settings options

The **Variance settings** pane has the following options:

* **Series**: Displays the series included in the scenario.
* **Increase is good**: Enabled by default.
  * When enabled, increases are shown in green and decreases in red.
  * When disabled, increases are shown in red.
* **Value range**: Specify the maximum value for the range.
  * The default value is **100%**.

      :::image type="content" source="media/planning-how-to-set-up-scenarios/slider-settings.png" alt-text="Screenshot for showing slider settings in scenario." lightbox="media/planning-how-to-set-up-scenarios/slider-settings.png":::

## Reset

Revert changes made in the scenario.

## Copy scenario data to base

Use **Copy to base** to apply simulated values from a scenario to the base sheet.

You can copy scenario values to the base by following these steps:

1. Select **Copy to base** from the **Scenario** toolbar, or select the **More options (⋮)** menu next to the scenario tab.
1. Review the selected columns.
1. Select **Proceed**.

:::image type="content" source="media/planning-how-to-set-up-scenarios/copy-base.png" alt-text="Screenshot for copying the scenario to base." lightbox="media/planning-how-to-set-up-scenarios/copy-base.png":::

The selected scenario values are copied to the corresponding base measures. After copying, the base report reflects the updated values from the selected scenario.

> [!NOTE]
> Only simulated values are copied to the base. Native measures are not copied from scenarios to the base.

## Bulk edit in scenarios

Use **Bulk edit** to apply changes to multiple values in a scenario at once. Use bulk edit to efficiently perform large-scale scenario simulations without updating individual cells.

### Open and configure bulk edit

1. Select **Bulk Edit** from **Scenario**.
1. In the **Bulk Edit** pane, configure the following:
  * **Measure**: Select the scenario measure to update.
  * **Row dimensions**: Select the required categories and subcategories.
  * **Column dimensions**: Select the required columns or time periods.

> [!NOTE]
> As you select dimensions, the Planning sheet updates to reflect the filtered data.

### Apply bulk changes

1. **Set value**: Assign a specific value to the selected cells. Use the slider or input box to define the value or adjustment, or specify the value or percentage to apply.
1. Select **Apply**.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/bulk-edit.png" alt-text="Screenshot for bulk editing the scenario." lightbox="media/planning-how-to-set-up-scenarios/bulk-edit.png":::

The selected values are updated across the specified dimensions.

* **Cancel**: Closes the dialog without saving changes.
* **Reset**: Clears all selections and restores default settings.

## Pivot

Change the layout to analyze data from different perspectives. Use **Pivot** in the **Scenario** tab to create alternate row-level views for analyzing and simulating scenarios. Pivoting lets you rearrange dimensions, such as Category and Sub Category, without affecting the underlying data.

### Create a pivot

1. Go to the **Scenario** tab.
1. Select **Pivot**.
1. The **Row Pivot** dialog opens.
1. In the **Row Pivot** dialog, select **+ Add** to create a new pivot.
1. Enter a name for the pivot in the **Name** field.
1. In **Available fields**, select the dimensions to include.
1. Add selected fields to the **Fields** section. Arrange the fields in the desired order.
1. Select **Save**.

A pivot called *pivot 2* is created for subcategories.

:::image type="content" source="media/planning-how-to-set-up-scenarios/pivot-scenario.png" alt-text="Screenshot for applying pivots in scenario." lightbox="media/planning-how-to-set-up-scenarios/pivot-scenario.png":::

## Writeback scenarios

Use **Writeback** to persist scenario data from the planning view to the underlying data source. You can write back all scenarios or a selected scenario. Use writeback to:

* Save planning inputs and updates
* Commit scenario changes to the data source
* Share finalized data with other users or systems

To write back scenarios,

1. Go to the **Scenario** tab.
1. Select **Writeback**.
1. Choose one of the following:
   * **Writeback All**:  Writes back all available scenarios.
   * **Writeback**: Writes back only the selected scenario.
1. Writeback is completed.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/writeback-scenario.png" alt-text="Screenshot for writeback in scenario." lightbox="media/planning-how-to-set-up-scenarios/writeback-scenario.png":::

> [!NOTE]
> The writeback option is enabled only after the destination is added. For more information, see [Write back data](planning-how-to-write-back-data.md).

## Logs

Use **Logs** to track and review all writeback activities. Go to **Scenario** > **Logs**. This view provides detailed information about each writeback operation, including status, duration, and user details.

:::image type="content" source="media/planning-how-to-set-up-scenarios/writeback-logs.png" alt-text="Screenshot for writeback logs in scenario." lightbox="media/planning-how-to-set-up-scenarios/writeback-logs.png":::

## Close scenario

Exit the current scenario by selecting **Close Scenario** from **Scenario**.

## Configure scenario access

Control who can access, manage, and interact with scenario using the **Security** settings.

1. Select **Security** from the toolbar.
1. In the left pane, select **Scenario**.
1. **Who can access scenario**: Specify users who can view and interact with each scenario. Enter names to grant access.
1. Select **Save** to apply changes, or select **Cancel** to discard the changes.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/scenario-access.png" alt-text="Screenshot for  scenario access." lightbox="media/planning-how-to-set-up-scenarios/scenario-access.png":::
