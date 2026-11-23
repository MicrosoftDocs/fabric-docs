---
title: Distribute Forecast Deficits in Fabric Planning
description: Deficit allocation in Fabric planning keeps committed targets on track. Learn how to view shortfalls and redistribute them across future forecast periods.
#customer intent: As a financial planner, I want to see the deficit between actual and forecasted values so that I can tell where my plan is falling short.
ms.date: 09/16/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Allocate deficits to meet targets

After you define a forecast, actuals might fall below the forecasted value. The shortfall between the forecasted and actual values is called the deficit.

If the forecast represents a committed target (quarter or year), you need to recover a shortfall in early periods later to still meet the target total.

* Without deficit distribution, the total forecast drifts downward unless someone manually adjusts later periods.
* With deficit distribution, Fabric planning shifts the shortfall to remaining periods so the overall target remains consistent.

In this article, you learn how to

* View the deficit between actual and forecasted values
* Allocate forecast deficits to future periods
* Distribute the deficit equally or by using weights

## Prerequisites

1. Create a forecast measure and enter forecast values. In this example, you create a forecast for 2026.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-distribute-deficits/create-forecast-2026-quarterly-monthly-values.png" alt-text="Screenshot of creating a forecast for 2026 and entering forecast values for all the quarters and months." lightbox="../media/planning-forecasting/planning-how-to-distribute-deficits/create-forecast-2026-quarterly-monthly-values.png":::

1. Close a forecast period as actuals become available.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-distribute-deficits/close-january-forecast.png" alt-text="Screenshot of closing the January forecast and Actuals displayed." lightbox="../media/planning-forecasting/planning-how-to-distribute-deficits/close-january-forecast.png":::

January actuals are less than the forecasted value of 2.49m. Use the **Distribute Deficit** option to allocate the shortfall across open forecasts.

## Configure measures and periods for deficit allocation

To configure measures and periods for deficit allocation in Fabric Planning, set up your baseline comparison and define where to redistribute the shortfall.

1. Select a forecast cell. In the **Model** ribbon, select **Reforecast** > **Distribute Deficit**.

    > [!TIP]
    > Distribute a deficit to the total cell to adjust the overall total, or distribute it to child cells to spread the adjustment across lower-level forecasts.

1. Select the measures to compare - in this example, *Forecast* and *GL Amount Actual*. Fabric Planning calculates the deficit.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-distribute-deficits/select-forecast-measure-calculate-deficit.png" alt-text="Screenshot of selecting the forecast measure and actual measure to calculate the deficit." lightbox="../media/planning-forecasting/planning-how-to-distribute-deficits/select-forecast-measure-calculate-deficit.png":::

1. If your report has other forecast measures, you can distribute the deficit to those forecasts. Use the **Distribute to** dropdown to select the forecast.

1. Select the calendar icon, then select the periods to distribute the deficit across. In this example, you distribute the deficit in the January forecast across the forecasts for February and March.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-distribute-deficits/select-forecast-period-distribute-deficit.png" alt-text="Screenshot of selecting the calendar periods across which to distribute the forecast deficit." lightbox="../media/planning-forecasting/planning-how-to-distribute-deficits/select-forecast-period-distribute-deficit.png":::

1. Select the **Distribution Method**: distribute the deficit equally or by the weights of the forecast. To learn more about equal distribution, see [Distribute deficits equally](#distribute-deficits-equally). To learn more about weighted deficit allocation, see [Distribute deficits by weights](#distribute-deficits-by-weights).
1. Select **Run** to update the forecast periods configured in step 4 with the deficit value. Notice how the forecasts for February and March are updated.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-distribute-deficits/forecast-deficit-distributed-february-march.png" alt-text="Screenshot showing the January deficit distributed across the February and March forecasts." lightbox="../media/planning-forecasting/planning-how-to-distribute-deficits/forecast-deficit-distributed-february-march.png":::

## Distribute deficits equally

To distribute the deficit equally between configured periods, set the **Distribution Method** to **Distribute Equally**.

  :::image type="content" source="../media/planning-forecasting/planning-how-to-distribute-deficits/distribution-method-distribute-equally.png" alt-text="Screenshot of option to distribute deficits equally." lightbox="../media/planning-forecasting/planning-how-to-distribute-deficits/distribution-method-distribute-equally.png":::

In this case, since the total deficit is distributed equally across two periods (February and March), divide the deficit amount by 2:

`Adjustment per month = 470,363.4057/2 = 235,181.70285`

February forecast adjustment

* Original forecast: 2.45m
* Deficit share: 235,181.70
* Calculation: 2.45m + 235.18k = 2,695,181.70
* Rounded Output: 2.70m

March forecast adjustment

* Original forecast: 2.57m
* Deficit share: 235,181.70
* Calculation: 2.57m + 235.18k = 2,805,181.70
* Rounded Output: 2.80m

> [!NOTE]
> When you distribute deficits to a total value in a hierarchy, Fabric Planning automatically updates the child values based on the selected distribution method.

:::image type="content" source="../media/planning-forecasting/planning-how-to-distribute-deficits/deficit-distributed-equally-allocated-child-rows.png" alt-text="Screenshot of the February and March forecasts updated with the deficit equally distributed across the hierarchy." lightbox="../media/planning-forecasting/planning-how-to-distribute-deficits/deficit-distributed-equally-allocated-child-rows.png":::

## Distribute deficits by weights

You can also distribute deficits based on the weights of the forecast values. Set the **Distribution Method** to **Distribute By Weights**.

:::image type="content" source="../media/planning-forecasting/planning-how-to-distribute-deficits/planning-distribution-method-distribute-by-weights.png" alt-text="Screenshot of option to distribute deficits based on weights of existing values." lightbox="../media/planning-forecasting/planning-how-to-distribute-deficits/planning-distribution-method-distribute-by-weights.png":::

The following steps demonstrate how weighted allocation works internally.

1. Calculate the total weight base. Combine the original forecasts for February and March to determine the total baseline:

    Total Base = 2.46m + 2.57m = 5.03m

2. Determine each month's proportion (weight).

    * February weight: 2.46m / 5.03m = approx 48.9%
    
    * March weight: 2.57m / 5.03m = approx 51.09%

3. Allocate the deficit proportional to the weight. Multiply the total deficit by each month's respective weight:
    
    * February deficit share: 470,363.40 * 48.90% = 230,038.5 (230k)
    
    * March deficit share: 470,363.40 * 51.09% = 240,324.85 (240k)

4. Calculate updated forecasts. Add the allocated deficit share to each original forecast value:

    * February updated forecast: 2.46m + 230k = 2.69m
    
    * March updated forecast: 2.57m + 240k = 2.81m
    
    The following image shows the updated forecasts for February and March after distributing the deficit based on weights.
    
    :::image type="content" source="../media/planning-forecasting/planning-how-to-distribute-deficits/deficit-distributed-weights.png" alt-text="Screenshot of February and March forecasts updated after the deficit is distributed based on existing forecast value weights." lightbox="../media/planning-forecasting/planning-how-to-distribute-deficits/deficit-distributed-weights.png":::
