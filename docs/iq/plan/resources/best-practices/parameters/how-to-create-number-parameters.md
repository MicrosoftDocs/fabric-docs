---
title: Number Parameters for What-If Analysis in Planning
description: Create number parameters in Planning to drive what-if formulas, TopN rankings, and conditional formatting. Learn how to set up sliders, tiles, and radio controls.
#customer intent: As a financial planner, I want to create number parameters so that I can run what-if analysis and apply conditional formatting.
ms.date: 11/06/2026
ms.topic: how-to
---

# Create number parameters

Number parameters pass numeric or percentage values dynamically into conditional formatting rules, calculated measures, or data filters. Use them to interactively adjust values, such as interest rates or thresholds, and see instant updates across reports without manually modifying underlying formulas or filters each time.

## Reference number parameters in formulas

Bind parameters directly into calculated measures to enable interactive "what-if" analysis. To demonstrate this feature, we use the formula: Real Sales = Sales / (1 + i)<sup>t</sup>

In the formula:

* i is the inflation rate, which you pass as a parameter
* t is the tenure, which you also pass as a parameter
* Sales is a native measure from the semantic model

Follow the steps outlined to create number parameters and use them in a calculated measure.

1. Create a new parameter and set the **Type** to **Number**. This parameter captures the inflation rate.
1. Select **Show as Percentage** to display the inflation rate as a percentage. Planning internally converts it to a numeric value to use in calculations.
1. Enter a unique parameter ID to reference the parameter value in a formula.
1. Under **Interface Options**, select the interface type as **Slider**.
1. Set the minimum and maximum values to ensure users don't set a value outside the allowed range.
1. Set the **Step Increment / Decrement**. This value determines how much the value increases or decreases each time you drag the slider.
1. Select **Show Min/Max Labels** to display the allowed range (configured in step 5) on the slider control.
1. Select **Show Current Value** to display the active slider value above the control. Select **Add**. The following image shows the configuration:

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/inflation-parameter-configuration.png" alt-text="Screenshot of configuring a number parameter to capture the inflation rate." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/inflation-parameter-configuration.png":::

1. Follow the same steps to configure a parameter to capture the tenure but leave **Show as Percentage** cleared so the value represents a number of periods rather than a percentage.
1. For the tenure, set the interface type to **Tiles**. Set **Columns per View** to the total number of tiles to display in one row.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/create-tenure-parameter.png" alt-text="Screenshot of creating a number parameter with a tiles interface to capture the tenure." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/create-tenure-parameter.png":::

    The following image shows the parameter pane with the inflation rate and tenure:

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/inflation-rate-tenure-parameters-created.png" alt-text="Screenshot of tenure and inflation rate parameters created with a slider and tile interface." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/inflation-rate-tenure-parameters-created.png":::

1. To create a calculated measure, in the **Planning** ribbon, go to **Insert Column** > **Formula**. Enter the formula. Press Ctrl + Spacebar to use IntelliSense to add references to the parameters in the formula.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/create-real-sales-formula-measure.png" alt-text="Screenshot of referencing the tenure and inflation rate parameters in a formula." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/create-real-sales-formula-measure.png":::

1. Planning recalculates the *RealSales* values dynamically as you change the inflation and tenure parameters.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameters-formula.gif" alt-text="Animation showing how planning recalculates the formula when changing the inflation rate and tenure parameter values." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameters-formula.gif":::

## Rank data by using numeric parameters

Dynamically display top or bottom items by passing numeric parameter values directly into your ranking filters.

1. Create a new parameter and set the **Type** to **Number**. This parameter captures how many ranks to display.
1. Set the interface type to **Tiles** or **Radio** to allow users to select from predefined ranking values.
1. Set the minimum and maximum ranks to display.
1. For radio buttons, define the **Layout Direction** - arrange the radio buttons one below the other or side by side.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-ranking-configuration-planning-sheet.png" alt-text="Screenshot of number parameter configuration with the interface type set to radio button and layout direction set to vertical." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-ranking-configuration-planning-sheet.png":::

    The following image shows the number parameter created with a radio button interface.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-ranking-parameter-created-planning-sheet.png" alt-text="Screenshot of a number parameter created with a radio button interface." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-ranking-parameter-created-planning-sheet.png":::

1. In the **Planning** ribbon of your planning sheet, select **Tools** > **TopN**.
1. Select the parameter in the TopN configuration.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-ranking-configure-top-n.png" alt-text="Screenshot of selecting the ranking parameter in the topN configuration in the planning sheet." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-ranking-configure-top-n.png":::

1. Selecting a parameter value automatically ranks the data in the planning sheet.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-change-ranks-planning-sheet.gif" alt-text="Animation showing how changing the parameter value applies ranking in the planning sheet." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-change-ranks-planning-sheet.gif":::

To learn how to configure ranking in intelligence sheets by using parameters, see [Use parameters in intelligence sheets](./how-to-configure-parameters.md?tabs=intelligence-sheets#configure-parameters).

## Enter conditional formatting thresholds

Pass threshold values directly into conditional formatting to automatically highlight key data across your intelligence dashboards without configuring additional rules.

1. Create a number parameter to pass the threshold value. In this example, use parameters to drive the conditional formatting for *Profit Margin* in the chart visuals and *Sales Amount* in the matrix visual.
1. Set the interface type. In this example, use a slider.

     :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-configuration-threshold-intelligence.png" alt-text="Screenshot of configuring a number parameter with a slider interface." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-configuration-threshold-intelligence.png":::

1. In your intelligence visual, select **Conditional Formatting** > **Create Rule**.
1. In the side pane, set **Format by** to **Rules (If Conditions)**.
1. Reference the defined parameter in your conditional formatting rule. In this example, the rule highlights the categories when the *Profit Margin* falls below the threshold value set in the slider parameter.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-conditional-formatting-intelligence-rule.png" alt-text="Screenshot of configuring a conditional formatting rule to reference the threshold parameter." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-conditional-formatting-intelligence-rule.png":::

1. Create a second number parameter to highlight the *Sales Amount* in the matrix visual when the amount falls below the entered threshold value. Refer to the configuration shown in the following screenshot.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-threshold-sales-amount.png" alt-text="Screenshot of creating a parameter to capture the threshold for sales amount." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-threshold-sales-amount.png":::

1. In the **Matrix** tab of the visual, go to **Conditional Formatting** > **Create Rule** and configure the rule to reference the parameter created in step 6.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-conditional-formatting-matrix.png" alt-text="Screenshot of configuring a conditional formatting rule that references the threshold parameter." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-conditional-formatting-matrix.png":::

    The chart categories and matrix data are highlighted based on the parameter values.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-conditional-formatting-intelligence.gif" alt-text="Animation showing how changing the threshold parameters applies formatting to the dashboard." lightbox="../../../media/resources/best-practices/parameters/how-to-create-number-parameters/number-parameter-conditional-formatting-intelligence.gif":::

To learn how to configure conditional formatting in planning sheets by using parameters, see [Use parameters in planning sheets](./how-to-configure-parameters.md?tabs=planning-sheets#configure-parameters).

## Best practices for selecting the UI control

* Use sliders when visual exploration matters more than entering an exact decimal point (for example, "What if sales drop 5%?").
* Use input boxes when users need precise control or need to enter values outside a fixed range.
* Use tiles or radio buttons when business rules require planners to pick from a specific set of allowed standard values rather than arbitrary numbers.
