---
title: Multidimensional Forecasting with Cube Measures in Planning
description: Multidimensional forecasting links data across dimensions in one unified model. Discover how to configure forecast cubes and allocate targets to any granularity.
ms.date: 08/04/2026
ms.topic: how-to
---

# Multidimensional forecasting

Enterprise planning involves distributing high-level targets (such as revenue or budget) across complex business structures like regions, product lines, departments, and time periods. Multidimensional or cube forecasting automates this process by linking data across related and unrelated dimensions into a unified model. For more information, see [creating forecasts](../planning-forecasting/planning-how-to-build-forecasts.md).

Instead of manually maintaining separate planning sheets for each dimension, use cube forecasting to enable real-time distribution and aggregation across multiple dimensions simultaneously.

In this article, you learn how to allocate a revenue target forecast defined at the region level to product and sales channel dimensions.

## Prerequisites

The column dimension is a standard date hierarchy (for example, year > quarter > month).

## Configure a forecast cube

When you create a forecast, define one or more breakdown dimensions to convert it into a forecast cube. The cube can then store and allocate forecast values at multiple levels of dimensional granularity.

In this example,

* You create a planning sheet at the region level.
* You create a profit forecast cube and configure dimensional breakdowns.
* You import the forecast cube into a product-level planning sheet.
* You update the forecast in the product-level planning sheet and use bidirectional updates in cube to aggregate it to the region-level planning sheet.

1. In the **Model** ribbon, select **Forecast**, enter the forecast measure name, and set the forecast period.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/create-forecast-global-level.jpg" alt-text="Screenshot of creating a forecast from the model ribbon in the global target revenue planning sheet." lightbox="../media/planning-cubes/how-to-create-forecast-cube/create-forecast-global-level.jpg":::

1. Enable the **Multi-Dimension Allocation** toggle. Select the driver measure from **Reference Measures**. Driver measure weights allocate forecasts across dimensions. For more information, see [weighted allocations in cube measures](../planning-concept-cube.md#how-allocation-works).

    > [!TIP]
    > Reference any measure in the semantic model as the weighting measure for allocation. The measure doesn't need to be included in the current planning sheet.
    >
    > Ensure the reference measure contains values for the forecast period in the current planning sheet. Otherwise, cube creation fails.

    In this example, *Previous Year Units* is used as the reference measure. Although it's not assigned to the current planning sheet, you can still use it to determine the allocation weights.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/add-reference-measure-semantic-model.png" alt-text="Screenshot of adding a reference measure from the semantic model that is not part of the current planning sheet." lightbox="../media/planning-cubes/how-to-create-forecast-cube/add-reference-measure-semantic-model.png":::

1. A breakdown defines how a forecast is allocated across different dimension hierarchies (such as *Region > Sales Channel > Product Line*) using a reference measure for proportional weighting. The row dimensions assigned to the planning sheet are automatically treated as the first breakdown.

    > [!NOTE]
    > The top-level row dimension in the current planning sheet is required to create breakdowns for dimensions that aren't included in the sheet. In this example, *Region_name.*

    To allocate values across additional dimensions, select **+ Add** to create a breakdown. Define breakdown dimensions.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/add-dimension-breakdown-product-level.png" alt-text="Screenshot of creating breakdowns by adding dimensions to allocate values across." lightbox="../media/planning-cubes/how-to-create-forecast-cube/add-dimension-breakdown-product-level.png":::

1. Select **Next**. Closed forecasts for previous years are static, and you can't edit them. Configure the measure or formula to populate closed forecasts.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/closed-period-forecast-source.png" alt-text="Screenshot of option to select the measure or enter a formula to populate closed forecasts." lightbox="../media/planning-cubes/how-to-create-forecast-cube/closed-period-forecast-source.png":::


1. In this example, to create a zero-based forecast, set the **Open Periods** configuration to **Data Input** and select **Save**.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/open-period-zero-based-forecast-configuration.png" alt-text="Screenshot of the selecting the data input option for  for a zero based open period." lightbox="../media/planning-cubes/how-to-create-forecast-cube/open-period-zero-based-forecast-configuration.png":::

1. After you create the forecast cube, you can see it in the **From Sheets** section of the **Data** pane.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/forecast-cube-created-from-sheets-data-pane.png" alt-text="Screenshot of the forecast cube created and appearing in the From Sheets section of the Data pane." lightbox="../media/planning-cubes/how-to-create-forecast-cube/forecast-cube-created-from-sheets-data-pane.png":::

1. Enable **Column Subtotal** in the **Planning** ribbon and enter the forecast total value for 2026. Planning automatically distributes the value equally among child rows and columns. Select the distribution icon to choose an alternate distribution method.

    In the following steps, you use bidirectional cube updates to modify the forecast in a different planning sheet at a different granularity. The cube automatically aggregates the updates and propagates them back to the *Global Target Revenue* planning sheet.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/enter-forecast-total-select-distribution.jpg" alt-text="Screenshot of entering forecast values at the total level and selecting a distribution method to allocate the entered value to child dimensions." lightbox="../media/planning-cubes/how-to-create-forecast-cube/enter-forecast-total-select-distribution.jpg":::

## Import a forecast cube into a different planning sheet

After you configure a cube measure, you can use it in other planning based on the configured breakdowns. For example, you can import a cube created in a region-level plan into a product-level plan.

1. Create a second planning sheet and assign measures and dimensions.

    > [!NOTE]
    > When you import a forecast cube, the column dimensions in the second planning sheet must match those of the original sheet.
    >
    > The row dimensions in the planning sheet must be a subset of the dimensions configured in the cube breakdowns. The dimensions can be in any order.
    >
    > For example, if the cube breakdown is configured with the dimensions Region, City, Channel, Product Line, the planning sheet can include any subset of these dimensions, such as Channel > Product Line or Region > City > Product Line.

    In this example, the original planning sheet uses *Year* > *Quarter* > *Month* as the column hierarchy, so the second planning sheet uses the same column dimensions.

    One of the breakdowns is *Region* > *Channel* > *Product Family* > *Product*. The second planning sheet uses *Channel, Product Family, Product* as the row dimensions.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/create-planning-sheet-assign-row-column-dimensions.png" alt-text="Screenshot of assigning row and column dimensions to a new planning sheet. The row dimensions are a subset of the configured product breakdown dimensions." lightbox="../media/planning-cubes/how-to-create-forecast-cube/create-planning-sheet-assign-row-column-dimensions.png":::

1. Go to **Data** > **From Sheets** > **Cube**. Select the cube measure to import. From **More options (…)**, select **Insert as measure**. This action imports the forecast cube measure.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/insert-cube-measure-option.png" alt-text="Screenshot of importing a forecast cube using the Insert as Measure option." lightbox="../media/planning-cubes/how-to-create-forecast-cube/insert-cube-measure-option.png":::

1. Planning distributes forecast values equally to breakdown dimensions such as *sales channel*, *product family*, and *product*. Select the distribution icon to choose an alternate distribution method.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/redistribute-cube-value.png" alt-text="Screenshot of selecting a different distribution method to allocate forecast values to breakdown dimensions." lightbox="../media/planning-cubes/how-to-create-forecast-cube/redistribute-cube-value.png":::


1. Cubes support bi-directional updates between planning sheets of different granularities. Update a value in the cube measure in the second planning sheet. In this example, add a 10% increase to the *Target Revenue Forecast* at the channel level.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/increase-product-level-target-revenue.png" alt-text="Screenshot of increasing the forecast revenue in the product level planning sheet by 10 percent." lightbox="../media/planning-cubes/how-to-create-forecast-cube/increase-product-level-target-revenue.png":::

1. The cube aggregates the updated value and propagates it to the region-level planning sheet. The new forecast value overwrites the forecast entered in step 7 of the [Configure a forecast cube](#configure-a-forecast-cube) section. In the same way, any updates made to the original planning sheet cascade to child sheets.

    :::image type="content" source="../media/planning-cubes/how-to-create-forecast-cube/global-revenue-bidirectional-change.png" alt-text="Screenshot of the updated forecast value aggregated and applied to the Global Target Revenue planning sheet." lightbox="../media/planning-cubes/how-to-create-forecast-cube/global-revenue-bidirectional-change.png":::
   
