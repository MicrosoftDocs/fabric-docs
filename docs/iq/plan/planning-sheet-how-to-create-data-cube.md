---
title: Create a multi-dimensional planning cube
description: Learn how to configure and allocate plans across dimensions with a planning cube
ms.date: 04/12/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to build planning cubes
---
# Plan across multiple dimensions with cubes

 [Cubes](concept-planning-cube.md) support allocating plans, budgets, forecasts, or other data input measures across multiple dimensions. Allocate values across dimensions based on the weights of a driver measure. Allocations can even be extended to dimensions and driver measures that aren't included in the current report. This approach enables complex, multi‑dimensional planning with minimal effort.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

* The column dimension should be a standard date hierarchy, for example, year > quarter > month.
* A numeric data input measure should be created. The data cube is configured for this measure.

## Configure a cube

Create cube measures by adding breakdowns in data input measures.

1. Create a numeric data input measure.
1. Go to **Data Input** > **Enable Multi-Dimension Allocation**. Select **Add breakdown**.

    :::image type="content" source="media/planning-how-to-create-cube/add-breakdown.png" alt-text="Screenshot of creating a cube.":::

1. To allocate values based on the weights of a driver measure, select the required measure from **Reference measures** in **Add breakdown**.
1. The row dimensions in the current planning sheet are automatically added in the first breakdown.

    :::image type="content" source="media/planning-how-to-create-cube/add-breakdown-dimensions.png" alt-text="Screenshot of configuring breakdown dimensions.":::

1. Select **Add** to create new dimension breakdowns.

    >[!NOTE]
    >At least one row dimension from the current planning sheet is required to create breakdowns based on dimensions that aren't part of the sheet.

    :::image type="content" source="media/planning-how-to-create-cube/add-multiple-breakdowns.png" alt-text="Screenshot of configuring additonal breakdown dimensions.":::

1. Create the breakdown and create the measure.
1. After a cube measure is created, it will be added under **Data** > **From Sheets** > **Cube**.

    :::image type="content" source="media/planning-how-to-create-cube/cube-measure.png" alt-text="Screenshot of cube measure creation.":::

## Import a cube measure into another plan

After configuring a cube measure, it can be used in other plans with different granularities based on the configured breakdowns. For instance, a cube created in a region-level plan can be imported into a product-level plan.

>[!NOTE]
>When importing a cube, the row dimensions in the planning sheet must be a subset of the dimensions configured in the cube breakdowns. The dimensions can be in any order.
>For example, the cube breakdown is configured with the dimensions Region, Country, Province, and City. The planning sheet can include any subset of these dimensions, such as Country > City or Province, regardless of the order.

Go to Data > From Sheets > Cube. Select the measure to import. From More options (…), select **Insert as measure**.

:::image type="content" source="media/planning-how-to-create-cube/insert-cube-measure.png" alt-text="Screenshot of inserting a cube measure.":::

The cube measure is imported into the planning sheet, and allocations are based on the configured breakdowns.

:::image type="content" source="media/planning-how-to-create-cube/insert-cube-measure.png" alt-text="Screenshot of cube measure used in another report.":::

Any updates made to the Budget cube measure in Product Plan are automatically cascaded back to Regional Plan and vice versa; making sure that related plans are consistent while allowing planning and adjustments to occur at the appropriate level of detail.

## Best practices while setting up a cube

* **Use a valid allocation driver**
  Always configure a single, clearly defined allocation driver (reference measure) such as prior year actuals, revenue, or units. Ensure the driver reflects real-world business weighting logic.

* **Allocate only across nonblank driver cells**
  Allocation occurs only where the selected driver measure has valid (nonblank) values. Avoid allocations across intersections where the driver is null, as it can cause allocation errors or unintended distributions.

* **Restrict input using “Allow Input – Based on Formula”**
  To prevent users from entering or allocating values on invalid intersections, configure an input rule such as:

   :::image type="content" source="media/planning-how-to-create-cube/validation-formula.jpg" alt-text="Screenshot of a validation formula.":::

  By configuring **Allow Input – Based on Formula**, cells that don't satisfy the specified condition are automatically locked ensuring that users can allocate only across dimension intersections that meet the defined driver criteria (for example, where the reference measure is nonblank).

```
[Driver Measure] !== BLANK
```
