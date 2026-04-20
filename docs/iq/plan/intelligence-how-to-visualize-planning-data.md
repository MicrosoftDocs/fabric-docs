---
title: Visualize planning data
description: Integrate planning with Intelligence sheets and visualize variances, impacts, and simulations in real time.
ms.date: 03/10/2026
ms.topic: how-to
#customer intent: As a user, I want to visualize my budgets, forecasts, and simulations in real time.
---

# Visualize simulations, budgets, and forecasts

Plan, forecast, and visualize scenarios on live data sources without duplicating datasets, rebuilding models, or relying on technical teams. By unifying planning, budgeting, and forecasting data with visualizations, you can:

* Easily compare budgets, actuals, and forecasts
* Quickly identify and adjust variances that require action
* Evaluate multiple what-if scenarios
* Make real-time, strategic adjustments to budgets and forecasts based on visual insights

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Create Planning sheet

1. Create a planning sheet that can contain manual data inputs, simulations, scenarios, and forecasts.

    :::image type="content" source="media/intelligence-how-to-visualize-planning-data/planning-sheet.png" alt-text="Screenshot of a Planning sheet containing sample data." lightbox="media/intelligence-how-to-visualize-planning-data/planning-sheet.png":::

1. In a new Intelligence sheet, select the Planning visual and choose the Planning sheet to import data from.

    :::image type="content" source="media/intelligence-how-to-visualize-planning-data/intelligence-sheet.png" alt-text="Screenshot of a new Intelligence sheet importing data from a Planning sheet." lightbox="media/intelligence-how-to-visualize-planning-data/intelligence-sheet.png":::

    The selected sheet is imported into the Intelligence sheet.

    :::image type="content" source="media/intelligence-how-to-visualize-planning-data/intelligence-sheet-imported.png" alt-text="Screenshot of the Intelligence sheet containing the newly imported data." lightbox="media/intelligence-how-to-visualize-planning-data/intelligence-sheet-imported.png":::

## Add visuals

1. Add a chart (or a visual that consumes the planning data). 
1. Measures from the Planning sheet (data input, formulas, simulations, forecasts) appear as fields under the **From Sheets** section of the **Data** pane. You can assign dimensions and measures from your semantic models and other Planning sheets.

    :::image type="content" source="media/intelligence-how-to-visualize-planning-data/from-sheets.png" alt-text="Screenshot of the Planning sheet measures visible in the From Sheets section." lightbox="media/intelligence-how-to-visualize-planning-data/from-sheets.png":::

1. As you run simulations in the Planning sheet, the charts in the Intelligence sheet are updated to reflect the changes in real time.

    :::image type="content" source="media/intelligence-how-to-visualize-planning-data/simulations.gif" alt-text="GIF of the screen showing the report changing as values are adjusted in the Planning sheet." lightbox="media/intelligence-how-to-visualize-planning-data/simulations.gif":::