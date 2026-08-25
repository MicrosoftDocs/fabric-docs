---
title: Create a Multi-Dimensional Planning Cube
description: Learn how to configure and allocate plans across dimensions with a planning cube
ms.date: 07/27/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to build planning cubes
---

# Multidimensional expense allocation

Data input cubes enable multidimensional planning by connecting planning sheets with different dimensional granularities. Use them to flow data between summarized and detailed plans. Instead of maintaining separate planning sheets and manually reconciling changes, use data input cubes to automatically distribute updates to detailed planning sheets based on allocation rules and aggregate changes back to higher-level plans. For more information, see [planning cubes](../planning-concept-cube.md).

You often create business plans at a higher level of the organization but must allocate them to lower levels for detailed planning and analysis. In this article, you learn how to use cubes to allocate expense from the region level product level using multidimensional allocations.

:::image type="content" source="../media/planning-cubes/how-to-create-cube/expense-allocation-region-level.png" alt-text="Screenshot of operating expense allocation at region level that doesn't flow to product level." lightbox="../media/planning-cubes/how-to-create-cube/expense-allocation-region-level.png":::

## Prerequisites

The column dimension is a standard date hierarchy (for example, year > quarter > month).

## Configure a cube

When you create a data input measure, define one or more breakdown dimensions to convert it into a cube measure. The measure can then store and allocate values at multiple levels of dimensional granularity.

1. In the **Planning** ribbon, go to **Insert Column** > **Number** > **Insert a new empty series**. For more information, see [create a numeric data input measure](../planning-how-to-insert-columns/how-to-insert-number-columns.md).

1. Select **+Add Breakdown** from the **Enable Multi-Dimensional Allocation** section. This action opens the **Add Breakdown** window where you configure the cube.

1. To allocate values based on the weights of a driver measure, select the required measure from **Reference measures**. In this example, use *Revenue Actual* as the reference measure. To learn more, see [weighted allocation](../planning-concept-cube.md#how-allocation-works).

    > [!TIP]
    > The reference measure doesn't need to be part of the current planning sheet. You can select any measure from your semantic model as long as it doesn't have any null values for the breakdown dimensions. If the reference measure has null values for any of the breakdown dimensions, allocation fails.

    :::image type="content" source="../media/planning-cubes/how-to-create-cube/add-breakdown-select-reference-measure.png" alt-text="Screenshot of the Add Breakdown option in the input configuration and option to select the reference measure for weighted allocation." lightbox="../media/planning-cubes/how-to-create-cube/add-breakdown-select-reference-measure.png":::

1. Allocate plans, budgets, and forecasts across dimensions that aren't included in the current planning sheet by adding breakdowns. The row dimensions in the current planning sheet are automatically added in the first breakdown. Select additional dimensions, such as *City*, *Channel*, and *Product*, to distribute values at a finer level of granularity.

    > [!NOTE]
    > Cubes supports planning across unrelated dimensions. For example, updates made to a revenue plan by product, geography, and channel can automatically flow to finance dimensions such as GL Account, enabling seamless bidirectional allocations.
    >
    > The top level row dimension in the current planning sheet is required to create breakdowns for dimensions that aren't included in the sheet. In this example, *region_name*.

    :::image type="content" source="../media/planning-cubes/how-to-create-cube/add-product-dimensions-breakdown.png" alt-text="Screenshot of creating dimension breakdowns by adding dimensions such as city, channel, and product." lightbox="../media/planning-cubes/how-to-create-cube/add-product-dimensions-breakdown.png":::

    In this example, the product-level planning sheet that you create in the next section also contains region dimensions, so you can add the product-level dimensions to the same breakdown. To create new dimension breakdowns as shown in the following image, select **Add**.

    :::image type="content" source="../media/planning-cubes/how-to-create-cube/add-separate-breakdowns.png" alt-text="Screenshot of creating separate breakdowns for city and product dimensions." lightbox="../media/planning-cubes/how-to-create-cube/add-separate-breakdowns.png":::

1. Create the breakdown and the measure.
1. After you create a cube measure, you can see it under **Data** > **From Sheets** > **Cube**.

    :::image type="content" source="../media/planning-cubes/how-to-create-cube/cube-created-data-pane.png" alt-text="Screenshot of cube measure created in the From Sheets section of the data pane." lightbox="../media/planning-cubes/how-to-create-cube/cube-created-data-pane.png":::

1. Enter a value at the grand total level. In this example, you copy the *Operating Expense Actual* value to use the cube to allocate this value across additional dimensions. Plan automatically distributes the value equally among child rows and columns. Select the distribution icon to choose an alternate distribution method.

    :::image type="content" source="../media/planning-cubes/how-to-create-cube/enter-distribute-expense-total-value.png" alt-text="Screenshot of entering an expense value and changing the distribution from equal to measure-based." lightbox="../media/planning-cubes/how-to-create-cube/enter-distribute-expense-total-value.png":::

1. Create a calculated measure to compute *Gross Margin* at the region level.

    > [!NOTE]
    > This step is optional. It isn't required to create cubes.

    :::image type="content" source="../media/planning-cubes/how-to-create-cube/regional-gross-margin-formula.png" alt-text="Screenshot of creating a formula to calculate gross margin based on the cube measure." lightbox="../media/planning-cubes/how-to-create-cube/regional-gross-margin-formula.png":::

## Import a cube measure into another planning sheet

After you configure a cube measure, you can use it in other planning sheets with different granularities based on the configured breakdowns. In this example:

* You create a cube in a region-level plan.
* You configure breakdowns on city, sales channel, and product dimensions.
* You enter data for the cube measure.
* You import the cube measure into the product-level plan.

The values you enter in the region-level planning sheet allocate to the product dimensions based on the weights of the reference measure. When you import the cube into the product-level planning sheet, Plan automatically populates the entered values.

> [!IMPORTANT]
> When importing a cube measure, the column dimensions in the second sheet must match those of the original sheet.
>
> The row dimensions in the planning sheet must be a subset of the dimensions configured in the cube breakdowns. The dimensions can be in any order. For example, if the cube breakdown is configured with the dimensions Region, Province, and City, the planning sheet can include any subset of these dimensions, such as Region > City or Province.

1. Go to **Data** > **From Sheets** > **Cube**. Select the measure to import. From **More options (...)**, select **Insert as measure**. Alternatively, in the **Model** ribbon, go to **Cube** > **Import Cube Measure** and select the measure to import.

    :::image type="content" source="../media/planning-cubes/how-to-create-cube/insert-cube-option.png" alt-text="Screenshot of option to import a cube measure into a planning sheet with lower granularity." lightbox="../media/planning-cubes/how-to-create-cube/insert-cube-option.png":::

    This action imports the cube measure into the product-level planning sheet. Organizations often plan values at higher levels of the business hierarchy and allocate them to lower levels for detailed planning. In this example, a cube allocates operating expenses (expense) from the region level to product-level dimensions.

    :::image type="content" source="../media/planning-cubes/how-to-create-cube/allocate-expense-breakdown-dimensions.png" alt-text="Screenshot of inserting the cube meaure into the product level planning sheet with values allocated to the product dimensions." lightbox="../media/planning-cubes/how-to-create-cube/allocate-expense-breakdown-dimensions.png":::

1. Plan distributes cube measure values equally to breakdown dimensions such as *city*, *sales channel*, *product family*, and *product*. Select the distribution icon to choose an alternate distribution method.

    > [!NOTE]
    > Redistributing imported cube values affects only the unrelated dimensions and preserves existing allocations.

    :::image type="content" source="../media/planning-cubes/how-to-create-cube/redistribute-expense-breakdown-dimensions.png" alt-text="Screenshot of option to redistribute imported expense values." lightbox="../media/planning-cubes/how-to-create-cube/redistribute-expense-breakdown-dimensions.png":::

    This action redistributes imported cube values across the product dimensions while preserving region-level allocations. The following screenshot demonstrates how the cube value remains unchanged for the *Asia* and *China* rows even after redistribution.

    :::image type="content" source="../media/planning-cubes/how-to-create-cube/redistribute-cube-values-product-dimensions.png" alt-text="Screenshot of cube values redistributed across product dimensions while region-level allocations remain unchanged." lightbox="../media/planning-cubes/how-to-create-cube/redistribute-cube-values-product-dimensions.png":::

1. In the **Planning** ribbon, go to **Show Columns** and deselect the measures that are not required for planning - in this example, the native measure *Operating Expense Actual*.

1. Create a calculated measure to compute *Gross Margin* at the product level.

    > [!NOTE]
    > This step is optional. It isn't required to create cubes.

## Update cube values

Cubes support bi-directional updates between planning sheets of different granularities. In this example, update the *expense Allocation* for China from 24.3m to 25m in the region-level planning sheet.

:::image type="content" source="../media/planning-cubes/how-to-create-cube/update-region-level-expense-value.png" alt-text="Screenshot of updating the grand total expense value at region level for China." lightbox="../media/planning-cubes/how-to-create-cube/update-region-level-expense-value.png":::

The cube allocates the updated value to the additional dimensions in the product-level planning sheet. Plan automatically recomputes calculated measures, such as *Gross Margin*, to reflect updates to cube values.

:::image type="content" source="../media/planning-cubes/how-to-create-cube/updated-value-allocated-product-level.png" alt-text="Screenshot of updated value propagated to the product level planning sheet and automatically allocated across the hierarchy." lightbox="../media/planning-cubes/how-to-create-cube/updated-value-allocated-product-level.png":::

Similarly, the cube automatically aggregates updates made at a lower level of granularity and propagates the aggregated values to the planning sheet at the higher level of granularity.

## Best practices for setting up a cube

* *Use a valid allocation driver*: Always configure a single, clearly defined allocation driver (reference measure) such as prior year actuals, revenue, or units. Ensure the driver reflects real-world business weighting logic.
* *Allocate only across nonblank driver cells*: Allocation only occurs where the selected driver measure has valid (nonblank) values. Avoid allocations across intersections where the driver is null, as it can cause allocation errors or unintended distributions.
* *Restrict input by using **Allow Input – Based on Formula***: To prevent users from entering or allocating values on invalid intersections, configure an input rule such as `[Driver Measure]!==BLANK`.

:::image type="content" source="../media/planning-cubes/how-to-create-cube/cube-allow-input-based-formula-rule.png" alt-text="Screenshot of the Allow Input – Based on Formula setting used to restrict cube input to nonblank driver measure cells." lightbox="../media/planning-cubes/how-to-create-cube/cube-allow-input-based-formula-rule.png":::

By configuring **Allow Input – Based on Formula**, cells that don't satisfy the specified condition are automatically locked. This configuration ensures that users can allocate only at dimension intersections that meet the defined driver criteria (for example, where the reference measure is nonblank).
