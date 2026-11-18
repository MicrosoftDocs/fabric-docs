---
title: Trigger Scripts with Action Parameters in Fabric Planning
description: Action parameters let report viewers run scripts from toggles and buttons to drill down, switch layouts, and apply formatting. Learn how to set them up today.
#customer intent: As a report author, I want to run scripts from buttons and toggles by using action parameters, so that viewers can interact with reports without edit permissions.
ms.date: 11/13/2026
ms.topic: how-to
---

# Run scripts by using action parameters

Action parameters help end-users to interactively trigger custom scripts directly from report controls like buttons or toggles. Unlike traditional dashboard controls that rely on DAX measures or modifying underlying semantic models, Action Parameters execute predefined operations natively within the report environment.

Viewers can perform advanced layout and analytical operations such as drilling down, rolling up hierarchies, switching visual layouts, or applying conditional formatting rules on the fly without requiring edit permissions or deep technical knowledge of report authoring.

## Prerequisites
 When you configure an action parameter, select **Enable Script** under **Interface Options** to define custom scripts. Select **Include in read mode** for every parameter that viewers need to use, including threshold inputs.

## Drill down and roll up hierarchies

Action parameters allow report authors to attach hierarchy-navigation scripts directly to UI controls like buttons or toggle switches. Instead of forcing users to rely on default visual header icons or context menus, action parameters offer a one-click experience to adjust the depth of data granularity.

1. Create a new parameter and set the type to **Action**.
1. Set the interface to **Toggle**. Changing the toggle triggers different scripts.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/drill-down-parameter-configuration.png" alt-text="Screenshot of creating an action parameter with the interface type set to toggle." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/drill-down-parameter-configuration.png":::

1. To define the scripts that run when the toggle is enabled, select the **+ Add button** in the **On Actions** section.
1. In the **On State Configuration** window, enter a descriptive label for when the toggle is enabled (defaults to ON). Use a label that clearly indicates the action triggered in this state, such as *Drill Down*.
1. Use the **Apply to** dropdown to choose the scope of the script: the entire dashboard (Root) or a specific visual. In this example, select the **Treemap** visual to enable drill-down and roll-up capabilities.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/apply-to-dropdown-treemap-visual-selection.png" alt-text="Screenshot of the Apply to dropdown with the Treemap visual selected as the script scope." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/apply-to-dropdown-treemap-visual-selection.png":::

1. In the **Formula Script** section, select the built-in scripts to define the actions for each state, and then select Save. Use the `DRILL_DOWN` function in the On state configuration and `DRILL_UP` in the Off state configuration.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/toggle-on-off-state-drill-down-roll-up-scripts.png" alt-text="Screenshot of toggle On and Off state configurations with drill-down and roll-up formula scripts applied to the treemap visual." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/toggle-on-off-state-drill-down-roll-up-scripts.png":::

1. Choose whether the toggle loads as On or Off when the report opens. Setting the toggle's default state to Off ensures the visual opens in the rolled-up view automatically.
1. Enabling the toggle drills down the treemap to the subcategory level, while disabling it rolls the data back up to the category level.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/action-parameter-drill-down-roll-up.gif" alt-text="Animation showing a toggle control to drill down and roll up hierarchical dimensions in the treemap." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/action-parameter-drill-down-roll-up.gif":::

## Apply conditional formatting by using scripts

When you bind a script to UI controls like toggles or buttons, you can highlight performance thresholds, flag variance outliers, or change color scales across tables, charts, and KPI cards. This approach provides a clean, highly interactive way to surface visual insights.

To demonstrate this feature, start by creating a number parameter that accepts a threshold value. Then use this number parameter to define a conditional formatting rule and finally trigger the rule with a button control.

1. Create a number parameter. Enter the parameter ID and name, specify an optional default value, and set the **Interface Type** to **Input Box**.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/create-number-parameter.png" alt-text="Screenshot of configuring a number parameter with the interface type set to input box." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/create-number-parameter.png":::

1. Select your chart visual. Select **Conditional Formatting** > **New Rule** from the respective ribbon.
1. Configure the rule to set a custom background color when the sales value is below the threshold parameter you created in step 1.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/create-conditional-formatting-rule-number-parameter.png" alt-text="Screenshot of a conditional formatting rule that sets a custom background color when sales are below the threshold parameter value." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/create-conditional-formatting-rule-number-parameter.png":::

1. Create an action parameter to apply conditional formatting on demand. In the script, use the `RULES` identifier to select the conditional formatting rule you defined in step 3.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/create-action-parameter-conditional-formatting.png" alt-text="Screenshot of creating an action parameter script to apply the conditional formatting rule." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/create-action-parameter-conditional-formatting.png":::

1. Use the `TOGGLE_RULE` formula for the on-state configuration and the `SET_RULE_ENABLED` formula for the off-state configuration.

    > [!NOTE]
    > After you select the rule in your script, planning converts the rule name to the rule identifier.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/conditional-formatting-action-rule-scripts.png" alt-text="Screenshot of TOGGLE_RULE and SET_RULE_ENABLED scripts in the on-state and off-state configuration of an action parameter." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/conditional-formatting-action-rule-scripts.png":::

1. Enable the toggle to highlight region panels whose sales values are below the threshold value defined in the number parameter.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/action-parameter-apply-conditional-formatting.gif" alt-text="Animation showing a background color applied when the switch is enabled and the sales is below entered threshold." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/action-parameter-apply-conditional-formatting.gif":::

## Set number formatting

Use action parameters to switch number formatting modes across a planning sheet without altering the sheet structure. Tie scripts to controls like dropdowns or toggle buttons so viewers can switch between automatic and native number formatting.

1. Create a new action parameter.
1. Use the `SETNUMBERFORMATTING` function to change the number scaling.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/change-number-formatting-script.png" alt-text="Screenshot of using the SETNUMBERFORMATTING function to change the scaling." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/change-number-formatting-script.png":::

1. Select the button to apply the number formatting script. The example shows how to switch between auto scaling and native scaling in the planning sheet.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/action-parameters-number-formatting.gif" alt-text="Screenshot showing how to use a button parameter to change the scaling in a planning sheet." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/action-parameters-number-formatting.gif":::

## Change layouts

By changing planning sheet layouts dynamically by using scripts, report authors and end-users can alter how data is structured and visualized on the fly, without manually altering the base sheet design. Tie layout scripts to interactive elements like buttons or toggle switches to give report viewers flexibility to customize their layout perspective without needing edit permissions.

1. Create a new action parameter. Enter a parameter name, parameter ID, and set the interface type to **Toggle**.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/action-parameter-toggle-interface-type.png" alt-text="Screenshot of configuring an action parameter with the interface type set to toggle." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/action-parameter-toggle-interface-type.png":::

1. Use the `SETLAYOUT` function with `LAYOUT` references to set a specific layout. In this example, you use scripts to switch between table and hierarchy layouts.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/layout-toggle-scripts-table-hierarchy.png" alt-text="Screenshot of the on-state script to set the layout to table and the off state script to switch to hierarchy." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/layout-toggle-scripts-table-hierarchy.png":::

1. Enable the switch to change the layout to table and disable it to switch back to the hierarchy layout.

     :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/action-parameter-change-layout.gif" alt-text="Screenshot of using a toggle to switch between hierarchy and table layouts." lightbox="../../../media/resources/best-practices/parameters/how-to-create-action-parameters/action-parameter-change-layout.gif":::
