---
title: Apply Conditional Formatting in PowerTable Sheet
description: Learn how to create and manage conditional formatting rules in PowerTable sheets to highlight data based on specified conditions.
ms.date: 07/13/2026
ms.topic: how-to
#customer intent: As a user, I want to apply and manage conditional formatting rules in PowerTable sheets so that I can highlight important data and improve table readability.
---

# Apply conditional formatting in PowerTable

The conditional formatting feature in PowerTable sheets helps highlight specific data based on defined conditions. Use conditional formatting to emphasize records with text styles, borders, icons, font colors, or background colors. This formatting makes it easier to identify trends, exceptions, outliers, and other important data points.

PowerTable automatically applies conditional formatting rules to table data when the data meets the specified conditions. You can create, manage, edit, and remove rules to customize how data appears and improve the readability of your sheets.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Common use cases for conditional formatting include:

* Highlighting values that exceed or fall below a target threshold.
* Identifying records that require attention or follow-up.
* Visualizing performance metrics using color indicators.
* Emphasizing specific text values or statuses.
* Drawing attention to missing, duplicate, or exceptional data.

By using conditional formatting, you can quickly interpret large datasets and focus on the information that matters most.

In this article, you learn how to apply conditional formatting by configuring and managing rules.

## Create a conditional formatting rule

To create a conditional formatting rule:

1. Go to the **Format** tab and select **Format Rules** > **Create Rule**.

    :::image type="content" source="media/powertable-how-to-apply-conditional-formatting/format-create-rule.png" alt-text="Screenshot of the create rule option in the Format tab of the menu ribbon." lightbox="media/powertable-how-to-apply-conditional-formatting/format-create-rule.png":::

    A side panel opens, as the following image shows.

    :::image type="content" source="media/powertable-how-to-apply-conditional-formatting/side-panel-create-format-rule.png" alt-text="Screenshot of the create formatting rule side panel." lightbox="media/powertable-how-to-apply-conditional-formatting/side-panel-create-format-rule.png":::

1. In **Title**, enter a name for the rule.
1. In **Apply To**, select the [column](#apply-to-column) or [rows](#apply-to-rows) to format.

    :::image type="content" source="media/powertable-how-to-apply-conditional-formatting/apply-to.png" alt-text="Screenshot of the apply to option in the create formatting rule side panel.":::

1. Use **Conditions** to define the criteria for the rule. The available operators and comparison options vary based on the selected column type.
1. In **Style**, configure the formatting to apply when the condition is true. You can customize font color, font style, borders, background color, or specific icons.

    :::image type="content" source="media/powertable-how-to-apply-conditional-formatting/condition-if-style.png" alt-text="Screenshot of configuring the condition if and style options.":::

1. Select **Add Rule** to add more conditions. You can combine multiple conditions by using **AND** or **OR** operators.

    :::image type="content" source="media/powertable-how-to-apply-conditional-formatting/add-rule.png" alt-text="Screenshot of the add rule option in the create formatting rule side panel.":::

1. Select **Apply** to save and apply the rule. To discard the changes, select **Cancel**.

### Apply to column

When you select a column, formatting applies only to the records in the **selected** column that meet the specified condition. For example:

1. Select the *ProductSKU* column in the **Apply To** dropdown.
1. Configure the condition as *ProductPrice* **Greater than** 700 in the **Condition If** section.
1. Configure the formatting style by applying bold text, the required font color, and background color.
1. Optionally, use the **Add Prefix/Suffix** option to add text or an icon before or after the cell value by customizing the icon type, icon color, text, and position.

   > [!NOTE]
   > The **Add Prefix/Suffix** option is available only when you select a column in the **Apply To** field.

    :::image type="content" source="media/powertable-how-to-apply-conditional-formatting/apply-to-column.png" alt-text="Screenshot of the conditional formatting rule configuration for a selected column.":::

The following image shows the formatted records in the **ProductSKU** column that meet the configured condition.

:::image type="content" source="media/powertable-how-to-apply-conditional-formatting/apply-to-column-output.png" alt-text="Screenshot of the column after the conditional formatting rules are applied." lightbox="media/powertable-how-to-apply-conditional-formatting/apply-to-column-output.png":::

### Apply to rows

To apply formatting to all columns in rows that meet the specified condition, select **Rows** in the **Apply To** dropdown. For example:

Consider formatting rows that contain products with a price greater than 700 and a subcategory of mountain bikes or road bikes.

1. To format all columns in the rows that meet the specified conditions, select **Rows** in the **Apply To** dropdown.
1. In the **Condition If** section, set the first condition to *ProductPrice* **Greater than** 700.
1. Select **Add Rule** to add the second condition.
1. Set the second condition to *ProductSubcategoryKey* **is** *Mountain Bikes* or *Road Bikes*.
1. Select **AND** to combine the two conditions.
1. Select **Apply**.

    :::image type="content" source="media/powertable-how-to-apply-conditional-formatting/apply-to-rows.png" alt-text="Screenshot of the conditional formatting rule configuration for rows.":::

All columns in rows that meet the configured conditions are formatted as shown in the following image.

:::image type="content" source="media/powertable-how-to-apply-conditional-formatting/apply-to-rows-output.png" alt-text="Screenshot of the table after the conditional formatting rules are applied to all rows that meet the condition." lightbox="media/powertable-how-to-apply-conditional-formatting/apply-to-rows-output.png":::

## Manage conditional formatting rules

Use **Manage Rules** to view, edit, duplicate, disable, or delete existing conditional formatting rules.

To manage rules:

1. Select **Format Rules** > **Manage Rules**. A side panel opens and shows all configured rules.

    :::image type="content" source="media/powertable-how-to-apply-conditional-formatting/format-manage-rules.png" alt-text="Screenshot of the manage rules option in the format tab." lightbox="media/powertable-how-to-apply-conditional-formatting/format-manage-rules.png":::

1. Use the available actions for a rule to edit, duplicate, delete, enable, or disable it.

    :::image type="content" source="media/powertable-how-to-apply-conditional-formatting/manage-rule-side-panel.png" alt-text="Screenshot of the manage rules side panel." lightbox="media/powertable-how-to-apply-conditional-formatting/manage-rule-side-panel.png":::
