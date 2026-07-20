---
title: "Forecasting FAQ: Common Questions Answered"
description: "Forecasting FAQ: Get answers to common questions about rolling forecasts, statistical configuration, closing periods, and writing forecasts to a SQL database in Fabric."
ms.date: 07/17/2026
ms.topic: faq
ai-usage: ai-assisted
---

# Forecasting FAQ

This FAQ addresses common questions and clarifications that arise while working with Forecasting. It covers rolling forecast concepts, statistical forecasting configuration, closing and extending the forecast horizon, reforecasting open periods, and writing the finalized forecast to the SQL database in Fabric.

## What is the difference between a closed period and an open period in a forecast measure?

A closed period reads from an existing measure—typically actuals—so the forecast reflects what actually happened. An open period accepts data input, either manual entry or values copied from another measure during period setup. As time moves forward, you progressively close periods to replace forecast values with actuals, keeping the full-year view accurate.

## Can I have more than one forecast measure on the same planning sheet?

Yes—you can create multiple forecast measures and display them as separate columns on the same sheet. Each forecast measure has its own open and closed period configuration.

## Can I delete a forecast measure and start over?

Yes—go to **Planning** > **Manage Measures** to delete the forecast measure. This action removes the measure and all associated open period configurations from the planning sheet.

## Why do I need at least two years of historical data for the statistical forecast?

The algorithm needs sufficient data to reliably detect seasonal patterns. With less than two years of data, the model can't distinguish a true seasonal pattern—for example, a Q4 uplift every year—from a one-time event. Two years give the model one full seasonal cycle to learn from and one to validate against.

## What does the Confidence % setting control?

The confidence interval defines the range within which the algorithm expects the true value to fall, given the variability in historical data. A 90% confidence interval means the algorithm is 90% confident that the actual value falls within the shaded range in the forecast preview. A higher confidence produces a wider range; a lower one produces a narrower range. The point estimate—the central line—doesn't change; only the uncertainty band changes.

## What does the Growth Factor do? Is it applied on top of the model's prediction?

Yes—the Growth Factor applies an additional uplift on top of the model's statistically derived values. Setting it to 4% instructs Predict to grow its output by 4% before saving, reflecting a business assumption about market growth that the historical data alone wouldn't capture.

## What is the difference between Bottom-Up and Top-Down evaluation?

Bottom-Up evaluation calculates the forecast at the most granular level first and aggregates up to the highest dimension category and total. Top-Down evaluation calculates at the top level and distributes down. Bottom-Up evaluation is generally more accurate for granular sales data because it captures each child category's seasonality pattern independently. Top-Down evaluation is faster but smooths over child category-level differences.

## What is the difference between the available forecasting algorithms?

* **Trend Decomposition with MSTL** splits the series into separate layers—one per seasonal cycle plus a trend—forecasts each layer independently, then combines them. It's the best choice when data has patterns repeating at multiple levels, such as both annual and quarterly cycles in beverage sales.
* **Exponential Smoothing** predicts by weighting recent observations more heavily than older ones. It's a good general-purpose choice for most business data, including sales and demand.
* **ARIMA** models the statistical structure of the series based on how each value relates to past values and past forecast errors. It's more technical and better suited to data with strong autocorrelation patterns.

## What does the Set Seasonality setting under Customize Algorithm do?

**Set Seasonality** tells the model which cycle lengths to detect and account for when generating the forecast. Select **Year** to instruct the model to look for patterns that repeat annually—for example, a consistent Q4 uplift each year. Select **Quarter** to add a second layer, capturing patterns that repeat within the year at the quarterly level.

## What does the forecast preview show before saving?

The preview shows historical data in gray and predicted values in green, with the confidence range as green shading in the background. This visualization lets you assess whether the model's output looks reasonable before you commit the values to the forecast measure.

## Can I re-run the statistical forecast with different settings after saving?

Yes—you can re-run Predict on the same measure with different settings. The new values overwrite the previously saved forecast values for the selected date range.

## Can I apply the statistical forecast to a subset of categories rather than the full hierarchy?

Yes—you can filter the rows before running Predict, or configure the row selection in the **Predict** dialog to target a specific subset. The Bottom-Up evaluation then runs only for the rows in scope.

## What happens when a period is closed?

The closed month locks. It automatically populates with the linked measure and turns gray to indicate that you can't edit it. The actual value replaces any forecast assumption that you previously entered for that month.

## Can I edit the closed period values?

No, you can't edit closed period values. These values appear in gray to show that they're non-editable.

## What do “Overwrite forecasts” and “Retain forecasts” mean when closing a period?

**Overwrite forecasts** replace the closed period forecast values with actual performance data. This option is the default and the most common choice for a rolling forecast, since you want actuals to be the single source of truth for closed periods. **Retain forecasts** keeps the original forecast values and only fills in actuals where forecast values are blank. Use **Retain** when you want to preserve the forecast for variance analysis alongside actuals.

## If I close a forecast and the actuals are slightly different from my forecast, does the grand total change?

Yes, closing a period replaces the forecast value with the actual value, so the full-year total reflects the actual figure. This change is expected and correct. You can see the variance between forecast and actuals when you show both measures side by side.

## Can I close multiple periods at once, or only one at a time?

You can close a custom range—not just the previous month. In the **Close Period** dialog, select **Custom** under **Close Period Till** and specify the end date of the range you want to close. This option is useful if you're catching up after a gap or closing an entire quarter at once.

## What does Extend Forecast Range do when closing a period?

**Extend Forecast Range** automatically adds one period to the end of the forecast horizon when you close a period. This feature makes it a true rolling forecast. For example, closing January 2026 and extending by one month adds January 2027, so the forecast always covers the same forward-looking window.

## What happens if I close a period without selecting "Extend Forecast Range"?

The period closes, and actuals populate correctly, but the forecast horizon shrinks by one month. You need to manually extend it later by using Reforecast.

## After closing a forecast period, can I reopen it if there is a correction to the actuals?

Reopening a closed period isn't a standard operation. It requires adjusting the close period configuration. In practice, you typically handle actuals corrections in the source system and re-run the close period.

## What's the difference between reforecasting and editing the forecast measure directly?

Reforecasting opens a new period setup dialog that you use to reconfigure the open period behavior. For example, you can change the copy source or growth assumptions. The process then redistributes values across the remaining open periods. Editing cells directly is faster for a single adjustment, but it doesn't recalculate the full distribution. Use **Reforecast** when assumptions change broadly. Use direct editing for targeted corrections.

## What does "Apply Operation – Period Range" mean in the Period Setup dialog?

It maps each target month to its corresponding source month within the defined range. It's a positional copy—the first month of the target range gets the value from the first month of the source range, and so on.

## If I apply a +3% growth at the subtotal level, does it apply uniformly across all subcategories or proportionally?

Proportionally—each child category within a parent category receives the growth distributed according to its share of the category total, so it preserves the existing distribution. If you need to distribute it based on any other measure or equally, you can configure this option after entering values in the cells.
