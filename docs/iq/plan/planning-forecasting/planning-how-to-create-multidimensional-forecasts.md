---
title: Create multidimensional forecasts with cubes
description: Learn how to create forecast cubes and allocate forecasts across dimensions.
ms.date: 04/22/2026
ms.topic: how-to
---

# Create multidimensional forecasts

Forecasts are often maintained separately by region, product, or other business dimensions, leading to inconsistencies across forecast views. Cube‑based forecasting makes it possible to generate and distribute forecasts across multiple dimensions with varying levels of granularity in a single step. As forecasts are updated, values remain synchronized across all related dimensions.

This article explains how to configure and use a cube for multi-dimensional forecasting. For more information about using cubes, see [Plan across multiple dimensions with cubes](../planning-how-to-create-data-cube.md).

## Configure additonal dimensions for forecasting

Forecasts are generated for the row dimensions included in the planning sheet. To forecast other dimensions that aren't present in the current sheet, add breakdowns.

1. Select **Add Breakdown** in the forecast configuration.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/add-breakdown-dimensions.png" alt-text="Screenshot of option to add breakdowns." lightbox="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/add-breakdown-dimensions.png":::

1. The first breakdown is set to the row dimensions in the sheet. To configure the cube, select **Add** to define the breakdown dimensions. Choose a reference measure to drive allocation weights. Select **Create** to create the cube.

    >[!NOTE]
    >The dimensions and measures used to configure the cube can be sourced from the dataset without being added to the current sheet. The reference measure used for weighted allocation must have values for the future forecast period.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/configure-cube.png" alt-text="Screenshot of configuring cubes." lightbox="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/configure-cube.png":::

1. Complete the forecast configuration and create the forecast.

    After the forecast cube is created, it will appear in the **From Sheets** section of the **Data** pane. The forecast can then be imported into other sheets with different granularities without creating separate forecasts for each sheet.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/forecast-cube.png" alt-text="Screenshot of a forecast cube measure." lightbox="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/forecast-cube.png":::

1. To import a forecast cube into a different planning sheet, go to **Data** > **From Sheets** and select **More(...)** > **Insert as a measure** for that cube.&#x20;

    :::image type="content" source="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/insert-forecast-cube.png" alt-text="Screenshot of inserting a forecast cube measure." lightbox="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/insert-forecast-cube.png":::

    After the forecast cube is inserted into the planning sheet, updates made in either sheet sync automatically, streamlining the process of forecasting across dimensions.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/forecast-cube-inserted.png" alt-text="Screenshot of a forecast cube measure." lightbox="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/forecast-cube-inserted.png":::

1. Forecast values are distributed equally across dimensions in the second sheet. Select a cell to redistribute values based on the measure weights in the second sheet.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/re-distribute-forecast-cube.png" alt-text="Screenshot of redistributing a forecast cube measure values." lightbox="../media/planning-forecasting/planning-how-to-create-multi-dimensional-forecasts/re-distribute-forecast-cube.png":::

## Related content

[Forecast data to predict future trends](./planning-how-to-build-forecasts.md)

[Plan across multiple dimensions with cubes](../cube-concept.md)
