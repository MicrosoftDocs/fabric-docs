---
title: Set up a scenario
description: Learn how to simulate business outcomes in Planning sheets by using scenarios. Simulate business outcomes for effective planning decisions.
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a user, I want to understand and use Scenarios effectively.
---

# Analyze planning outcomes with scenarios

Scenarios allow you to create multiple planning versions within a Planning sheet to evaluate different business outcomes. You can use scenarios to compare budgets, forecasts, and alternative business assumptions without affecting the base data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you create a scenario, make sure that you have the following prerequisites in place:

* A Planning sheet is created.
* Required fields and dimensions are added.
* The planning model includes a *scenario dimension*.
* You have permission to edit planning data.

## Create a scenario

1. Go to **Model > Scenario**.
1. Enter a name for the scenario in **Scenario name**.
1. Select the series to be simulated and select **Create**.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/create-scenario.png" alt-text="Screenshot showing the steps to create a scenario." lightbox="media/planning-how-to-set-up-scenarios/create-scenario.png":::

1. Sales values are simulated by adjusting the slider to increase or decrease cell values. Net revenue is recalculated accordingly.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/value-slider.png" alt-text="Screenshot showing the value slider for a cell." lightbox="media/planning-how-to-set-up-scenarios/value-slider.png":::

1. Select **Save** to save the scenario after reviewing the results.
1. Select the **+** icon at the bottom of the page to create more scenarios. **Save** the report when you're done.

    :::image type="content" source="media/planning-how-to-set-up-scenarios/save-add.png" alt-text="Screenshot of adding another scenario and saving the report." lightbox="media/planning-how-to-set-up-scenarios/save-add.png":::

The new scenario is added to the Planning sheet and is available for planning and analysis.