---
title: Create templates for reusable row structures
description: Learn how to create templates for reusing row structures in model
ms.date: 04/26/2026
ms.topic: how-to
#customer intent: As a user, I want to learn how to create templates for reusing row structures in a model.
---

# Create templates for reusable row structures

In this article, you learn how to create templates and use them in your model.

A template is a predefined layout of rows that can be used to build models with repetitive structures. You create the template once based on your requirements and reuse it multiple times across the model.

For example, a template such as **Net Profit** can be created once and then applied across different product categories to maintain a consistent structure.

:::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/template-concept.png" alt-text="Screenshot of concept of templates.":::

## Create a template

1. Consider the following model, which consists of repeated line items as rows for different companies.

    :::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/sample-data-for-template.png" alt-text="Screenshot of a sample data model.":::

1. To build a model structure that categorizes revenue and costs separately, you can create a template. A template is essentially a subset or a mini model that can be reused across your model for different categories wherever needed.

    ```text
    Gross Profit
        Gross Revenue
            Sales
            Other Revenue
        COGS
            Cost of Sales
            Support Costs
            Rent
            Other Costs
    ```

1. Select the row where you want to insert the template, then select **Insert Template**.

    :::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/insert-template.png" alt-text="Screenshot of selecting insert template option.":::

1. Build the template as you would build a model. First, rename the template by double-clicking and updating the name.
1. To add child rows, select the **+** icon (**Add Child**) or select **Insert Row**. Alternatively, you can use **Bulk Insert** to create the template structure at once.

    :::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/insert-bulk-rows-for-template.png" alt-text="Screenshot of inserting rows in bulk for creating template.":::

    The template structure is created as shown:

    :::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/created-template.png" alt-text="Screenshot of created template.":::

1. Configure the template's rows.

    :::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/template-rows-configuration.png" alt-text="Screenshot of configuring rows in the template.":::

## Ways to insert template

Templates can be inserted into the model in two ways:

* **Append**: Append inserts the template row structure within the model as it is.

    :::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/append-template.png" alt-text="Screenshot of appending template in the model.":::

* **Replace**: Replace replaces the existing model structure with the template's row structure.

    :::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/replace-template.png" alt-text="Screenshot of replacing model structure with template.":::

### Set Conditions

Insert the template at only specific levels in the model based on filter or set criteria. Assuming that you added two row dimensions, *Company* and *Department,* you can now set conditions based on them.

**Simple:** Choose the specific categories or levels where the template has to be inserted. Use **Search** to find any level. This option is ideal for straightforward selection scenarios where no complex logic or grouping is required.

:::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/set-simple-conditions.png" alt-text="Screenshot of setting simple conditions for inserting the template.":::

**Advanced:** Define complex rules for applying templates by combining multiple filters and groups.

:::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/set-advanced-conditions.png" alt-text="Screenshot of setting advanced conditions for inserting the template.":::

In this mode, you can:

* Add multiple **filters** (for example, *Department is Admin* or *Company contains B*)
* Group filters using logical operators such as **AND** and **OR**
* Create nested **groups** to build multi-level conditions

Each group can have its own AND/OR logic, allowing you to control how conditions are evaluated. For example:

* The top-level group uses **OR** to apply the template if *any* of the conditions is met
* A nested group can use **AND** to ensure *all* conditions within that group are satisfied
* Apply a template when *Department is Admin OR Company contains B*
* Additionally apply it for a specific group where *Department is Marketing AND Company is not C*

## Apply template to the model

If you choose **Replace**, the template is applied to the model as shown below. The template cannot be edited directly from the model; instead, edit the template to modify the row structure.

:::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/apply-template-to-model.png" alt-text="Screenshot of applying the template to the model.":::

You can create multiple templates for a model and apply them wherever required.

## Manage templates

Select **Manage Template** to edit, duplicate, or delete inserted templates.

Select the template that you want to modify from the list of available templates in the dropdown. Then choose the appropriate action icon to perform the required operation.

* Select **Add** icon to create a new blank template.
* Select **Duplicate** icon to create a copy of the selected template.
* Select **Delete** icon to delete the template.

:::image type="content" source="../media/planning-model-builder/planning-how-to-create-templates-for-reusable-row-structures/manage-templates.png" alt-text="Screenshot of managing created templates.":::

## Related content

[Create a model using Model Builder](./planning-how-to-create-model-using-model-builder.md).
