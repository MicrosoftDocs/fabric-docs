---
title: Create List Parameters for Dynamic Dropdowns in Fabric Planning
description: Create list parameters to let users pick categories, regions, or months from dynamic dropdowns. Learn how to drive conditional formatting without changing reports.
#customer intent: As a report author, I want to create a list parameter from my semantic model, so that users can select values like product categories, regions, or months without changing the report layout.
ms.date: 11/13/2026
ms.topic: how-to
---

# Create list parameters

A list parameter lets users select values from a predefined or dynamic list of options, such as product categories, business units, regions, or specific months. You can source list parameters directly from a semantic model or hard-code them as custom options. Users can dynamically apply formatting or feed categorical inputs into planning models without modifying the underlying report layout.

## Apply conditional formatting based on selected values

When you combine list parameters with conditional formatting, you can highlight data points on a visual based on the user's categorical selections. Instead of filtering out nonselected items entirely, parameter-driven conditional formatting evaluates the current parameter value against target rules, such as highlighting sales performance bars, threshold alerts, or profit margins only for the user-selected products or months.

1. Before you begin, [create a number parameter](how-to-create-number-parameters.md#enter-conditional-formatting-thresholds) for the COGS threshold used in this example.
1. Create a new parameter and set the type to **List**.
1. Set the source to **Data set** to fetch the dropdown values from your semantic model.
1. Select the dimension from your semantic model. The list sources values from the unique categories in the selected dimension.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-list-parameters/select-list-source-dimension.png" alt-text="Screenshot of selecting the dimension to source the list categories." lightbox="../../../media/resources/best-practices/parameters/how-to-create-list-parameters/select-list-source-dimension.png":::

1. Create a second parameter to select the product category.
1. In this example, radio buttons control the product category parameter, and a multiselect dropdown lets users select multiple months.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-list-parameters/list-parameter-created.png" alt-text="Screenshot of list parameters with radio buttons for product category and a multiselect dropdown for month." lightbox="../../../media/resources/best-practices/parameters/how-to-create-list-parameters/list-parameter-created.png":::

1. Select the visual, and then select **Conditional Formatting** > **New Rule**.
1. Configure the rule as shown in the following image. In this example, you create a rule to highlight the profit margin bars when the COGS falls below the threshold entered in the number parameter and for the months selected in the list parameter.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-list-parameters/conditional-formatting-rule-number-list-parameters.png" alt-text="Screenshot of configuring a conditional formatting rule that uses the number and list parameters." lightbox="../../../media/resources/best-practices/parameters/how-to-create-list-parameters/conditional-formatting-rule-number-list-parameters.png":::

1. Repeat step 7 to create parameter-driven conditional formatting rules for other visuals in your dashboard.
1. Planning applies conditional formatting based on the thresholds and values set in the parameters.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-list-parameters/list-parameter-conditional-formatting.gif" alt-text="Animation showing profit margin bars highlighted based on months selected in a list parameter and a COGS number parameter threshold." lightbox="../../../media/resources/best-practices/parameters/how-to-create-list-parameters/list-parameter-conditional-formatting.gif":::

## Best practices for selecting the UI control

* Use radio buttons for high-visibility choices that require immediate comparison without opening a menu. They're ideal for two to five options.
* Use tiles for touch-friendly, modern layouts, such as categories or years. They're ideal for two to six options.
* Use single-select dropdowns when users must select exactly one option from a large or dynamic list, such as choosing a specific store ID or employee.
* Use multi-select dropdowns for complex filtering across multiple categories simultaneously.

## Related content

 - [Configure parameters](./how-to-configure-parameters.md).
 - [Create numeric input parameters](./how-to-create-number-parameters.md).
