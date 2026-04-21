---
title: Build forecasts
description: Learn how to create and manage forecasts in a Planning sheet. Create forecast models, manage forecast periods, and streamline planning and forecasting workflows.
ms.date: 03/11/2026
ms.topic: how-to
---

# Forecast data to predict future trends

Forecasting capabilities in the Planning sheet allow organizations to move beyond static annual plans and adopt agile planning methods, such as rolling forecasts and periodic re-forecasting, which help you estimate future business performance based on historical data and current trends. Use forecasting to project revenue, expenses, and other metrics for upcoming periods. Forecasting in the Planning sheet helps you create dynamic forecasts directly on your semantic model and update them as new actuals become available. Forecasts can be generated using multiple approaches, such as copying historical values, applying averages, or manually adjusting projections.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Key forecasting capabilities in Planning sheets

* **Real-time forecasting** directly on live data models.
* **Flexible forecast methods** to suit different planning needs.
* **Continuous updates** through rolling forecasts and re-forecasting.
* **Improved decision-making** through up-to-date projections.
* **Time intelligence and period extensions** in Planning sheets support time-based calculations and extensions to simplify forecast creation across fiscal periods.
* **Seamless integration** with planning, budgeting, and analytics workflows.

These capabilities enable finance and business teams to monitor performance closely and make proactive decisions based on reliable forecasts.

## Prerequisites

Before you create or edit forecasts, make sure you have the following prerequisites in place:

* You have **created** a Planning sheet and **saved** it.
* The required dimensions and measures are added to the **Fields**.
* You have permission to **edit** forecast data.
* Historical or actual data exists for the periods used as reference.

## Create a forecast

1. Go to **Model > Forecast**.
1. Enter a forecast **Measure Name**.
1. Select the **Forecast Period**.
1. Generate forecast values within the **Closed Period**, using either **Measure** or **Formula**.

    :::image type="content" source="media/planning-how-to-build-forecasts/closed-period.png" alt-text="Screenshot of the closed period options as described.":::

1. Generate forecast values for the **Open Period** using **Measure**, **Formula**, or **Data Input**.

    :::image type="content" source="media/planning-how-to-build-forecasts/open-period.png" alt-text="Screenshot of the open period options as described.":::

1. Add the forecast measure by selecting **Create**.

    :::image type="content" source="media/planning-how-to-build-forecasts/add-forecast-measure.png" alt-text="Screenshot of creating the forecast with values for the fields described in this section.":::

1. In the **Period Setup**, you can split the forecast period into smaller periods and initialize each period individually by adding ranges within the **Target Period**.

    :::image type="content" source="media/planning-how-to-build-forecasts/period-setup-1.png" alt-text="Screenshot of the option to set the period range.":::

1. Initialize the forecast values using an existing measure in the report for each period range. Select the measure from the **Copy Source** menu.

1. Select *Average of Period Range* and set the **Source Periods** to *Q1 2026 - Q2 2026*. The average of the net revenues will be used to initialize the Q1 2027-Q2 2027 forecast.

    :::image type="content" source="media/planning-how-to-build-forecasts/period-setup-2.png" alt-text="Screenshot of the setting the average of the period range to the values described.":::

1. The forecast measure is created.

    :::image type="content" source="media/planning-how-to-build-forecasts/forecast-complete.png" alt-text="Screenshot of the completed forecast and its values." lightbox="media/planning-how-to-build-forecasts/forecast-complete.png":::