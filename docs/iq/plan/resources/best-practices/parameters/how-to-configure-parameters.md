---
title: Add Interactive Parameters to Fabric Planning Sheets
description: Use parameters in Fabric planning to add buttons, sliders, and dropdowns that let viewers filter, rank, and format reports in read mode. 
ms.date: 11/02/2026
ms.topic: how-to
---

# Build interactive controls with parameters

Create parameters in planning to enable viewers in reading mode to interactively analyze and control reports without making manual edits or modifying the underlying setup. By using graphical controls like buttons, checkboxes, or sliders, users can filter datasets, change visual layouts, and run ad hoc scripts. This interactive capability allows team members to quickly rank data and dynamically navigate complex datasets across different timeframes and dimension categories while keeping the original planning structure intact.

## Prerequisite

Create a planning item that has at least one planning sheet or an intelligence sheet.

## Configure parameters

You can define parameters at two levels depending on your scope:

* **Page-level parameters**: Apply specifically to an individual page, giving users localized control over that view.
* **Global parameters**: Apply universally across all planning and intelligence sheets to maintain consistent filtering and logic throughout the app.

Fabric planning supports the following types:

| Parameter type | Planning use case |
|----------------|-------------------|
| **Number** | - Dynamic calculations: Pass an exchange rate or adjust a discount percentage for price sensitivity analysis.<br>- Ranking: Set a Top-N ranking, such as viewing the top 10 products by margin.<br>- Threshold values: Apply conditional formatting, such as highlighting categories with sales > 10k. |
| **Text** | - Add custom header or footer content before printing a report.<br>- Add custom text like a summary to a report header . <br>- Pass values to a filter . |
| **Date** | - Add custom dates to a report header. |
| **List** | - Category filtering: Choose a target department or entity for budget allocation.<br>- Select a currency, such as USD, EUR, or GBP. |
| **Action (Script)** | - Run scripts to execute multi-step workflows, such as updating layouts, reformatting visuals, applying conditional rules, or adjusting ranking. |

### [Use parameters in intelligence sheets](#tab/intelligence-sheets)
The following steps show how to create and use parameters in intelligence sheets:

1. To create a new parameter, expand the **Parameter** pane and select **+Add new**. To create a global parameter, select the **+Add new** option from the **Global** tab.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-configure-parameters/intelligence-sheets-parameter-pane-add-new.png" alt-text="Screenshot of page level and global level parameters options and the add new button." lightbox="../../../media/resources/best-practices/parameters/how-to-configure-parameters/intelligence-sheets-parameter-pane-add-new.png":::

1. Select the parameter type. In this example, you create a number parameter that captures the number of ranks to display.
1. Enter the parameter name and an optional default value if applicable.
1. Enter a unique **Parameter ID**. You need the parameter ID to reference the parameter in formulas.
1. Add an optional description to help users understand what this parameter controls. This description is displayed as a tooltip when you hover over the parameter.
1. Select an interface type. Fabric planning supports various interface options such as toggles, sliders, dropdowns, radio buttons, and text boxes to assign values to parameters. The interface options vary based on the parameter type.
1. Select **Include in Read Mode** to display the parameter controls in read-only view and allow users to change the parameters.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-configure-parameters/create-number-parameter-options-pane.png" alt-text="Screenshot of the parameter creation pane showing type, name, ID, description, and interface options for a number parameter." lightbox="../../../media/resources/best-practices/parameters/how-to-configure-parameters/create-number-parameter-options-pane.png":::

1. Select **Add** to create the parameter. Since you set the interface type to Input Box, you create the parameter with an input box that accepts numeric values.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-configure-parameters/number-parameter-input-box-created.png" alt-text="Screenshot of a number parameter created with an input box interface." lightbox="../../../media/resources/best-practices/parameters/how-to-configure-parameters/number-parameter-input-box-created.png":::

1. In this example, use parameters to rank data in a dashboard. Select the TopN option from the intelligence visual. Repeat this step for each visual in an intelligence dashboard.
1. Set the **By** option to **Parameters** and select the configured ranking parameter. Select **Apply**.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-configure-parameters/top-ranking-by-parameter-configuration.png" alt-text="Screenshot of using parameters in the topN ranking configuration in a chart visual." lightbox="../../../media/resources/best-practices/parameters/how-to-configure-parameters/top-ranking-by-parameter-configuration.png":::

1. Changing parameter values instantly re-ranks data across your entire dashboard.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-configure-parameters/parameter-change-ranks-dashboard-visuals.gif" alt-text="Animation showing how changing the parameter values applies ranking to the matrix and chart visuals." lightbox="../../../media/resources/best-practices/parameters/how-to-configure-parameters/parameter-change-ranks-dashboard-visuals.gif":::

### [Use parameters in planning sheets](#tab/planning-sheets)

The following steps show how to create and use parameters in planning sheets:

1. To create a new parameter, expand the **Parameter** pane and select **+Add new**. To create a global parameter, select the **+Add new** option from the **Global** tab.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-configure-parameters/add-new-parameter-planning-sheet.png" alt-text="Screenshot of the +Add new option in the Parameter pane of a planning sheet." lightbox="../../../media/resources/best-practices/parameters/how-to-configure-parameters/add-new-parameter-planning-sheet.png":::

1. Select the parameter type. In this example, you create a number parameter that captures the sales threshold for conditional formatting.
1. Enter the parameter name and an optional default value if applicable.
1. Enter a unique **Parameter ID**. You need the parameter ID to reference the parameter in formulas.
1. Add an optional description to help users understand what this parameter controls. This description is displayed as a tooltip when you hover over the parameter.
1. Select an interface type. Fabric planning supports various interface options such as toggles, sliders, dropdowns, radio buttons, and text boxes to assign values to parameters. The interface options vary based on the parameter type.
1. Select **Include in Read Mode** to display the parameter controls in read-only view and allow users to change the parameters.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-configure-parameters/number-parameter-threshold-configuration-planning-sheet.png" alt-text="Screenshot of number parameter settings in a planning sheet, including name, parameter ID, description, interface type, and include in read mode options." lightbox="../../../media/resources/best-practices/parameters/how-to-configure-parameters/number-parameter-threshold-configuration-planning-sheet.png":::

1. Select **Add** to create the parameter. Since you set the interface type to Input Box, you create the parameter with an input box that accepts numeric values.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-configure-parameters/number-parameter-threshold-created-planning-sheet.png" alt-text="Screenshot of a number parameter created in a planning sheet with an input box interface to accept conditional formatting thresholds." lightbox="../../../media/resources/best-practices/parameters/how-to-configure-parameters/number-parameter-threshold-created-planning-sheet.png":::

1. In the **Format** ribbon of your planning sheet, select **Conditional Formatting** > **Create Rule**. In the side pane, set **Format by** to **Rules (If Conditions)**.
1. Configure the rule as shown in the following image. You can select the threshold parameter and use it in the rule condition.  In this example, you highlight the cells where the *Total Sales* is lower than the value entered in the threshold parameter. 

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-configure-parameters/select-parameter-create-conditional-formatting-rule.png" alt-text="Screenshot of using the threshold parameter in a conditional formatting rule to highlight values." lightbox="../../../media/resources/best-practices/parameters/how-to-configure-parameters/select-parameter-create-conditional-formatting-rule.png":::

1. Select **Apply** to create the rule. The cells with sales less than the specified threshold are dynamically highlighted based on the parameter value you enter.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-configure-parameters/number-parameters-conditional-formatting.gif" alt-text="Animation showing how conditional formatting is applied as you change the threshold value." lightbox="../../../media/resources/best-practices/parameters/how-to-configure-parameters/number-parameters-conditional-formatting.gif":::

---

## Related content

Apply conditional formatting to planning sheets: [Conditional formatting in planning sheets](/fabric/iq/plan/planning-conditional-formatting/concept-conditional-formatting)
