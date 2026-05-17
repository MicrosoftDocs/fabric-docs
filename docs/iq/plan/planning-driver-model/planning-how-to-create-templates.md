---
title: Create Templates for Reusable Row Structures
description: Learn how to create templates for reusing row structures in models.
ms.date: 04/28/2026
ms.topic: how-to
#customer intent: As a user, I want to learn how to create templates for reusing row structures in a model.
---

# Create templates for reusable row structures

This article explains how to create templates and use them in your model.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

A *template* is a predefined layout of rows that can be used to build models with repetitive structures. You create the template once based on your requirements and reuse it multiple times across the model.

For example, a template such as *Net Profit* can be created once and then applied across different product categories to maintain a consistent structure. This scenario is illustrated in the following image:

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/template-concept.png" alt-text="Screenshot illustrating the concept of templates.":::

## Sample scenario

This article uses the following model as an example. The model consists of repeated line items as rows for different companies.

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/sample-data-for-template.png" alt-text="Screenshot of a sample data model." lightbox="../media/planning-driver-model/planning-how-to-create-templates/sample-data-for-template.png":::

To build a model structure that categorizes revenue and costs separately, create a template. A template is a subset or mini model that you can reuse across your model for different categories wherever needed.

The sample data can be represented by the following model:

```
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

## Create a template

1. Select the row where you want to insert the template, then select **Insert Template**.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/insert-template.png" alt-text="Screenshot of selecting insert template option." lightbox="../media/planning-driver-model/planning-how-to-create-templates/insert-template.png":::

1. Begin building the template as you would build a model. Rename the template by double-selecting and updating the name.
1. To add child rows, select the **+** icon (**Add Child**) or select **Insert Row**. Or, use **Bulk Insert** to create the template structure at once.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/insert-bulk-rows-for-template.png" alt-text="Screenshot of inserting rows in bulk for creating template." lightbox="../media/planning-driver-model/planning-how-to-create-templates/insert-bulk-rows-for-template.png":::

    The template structure is created as shown:

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/created-template.png" alt-text="Screenshot of created template." lightbox="../media/planning-driver-model/planning-how-to-create-templates/created-template.png":::

1. Configure the template's rows.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/template-rows-configuration.png" alt-text="Screenshot of configuring rows in the template." lightbox="../media/planning-driver-model/planning-how-to-create-templates/template-rows-configuration.png":::

## Ways to insert template

You can insert a template into the model in two ways:

* **Append**: Inserts the template row structure within the model as it is.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/append-template.png" alt-text="Screenshot of appending template in the model." lightbox="../media/planning-driver-model/planning-how-to-create-templates/append-template.png":::

* **Replace**: Replaces the existing model structure with the template's row structure.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/replace-template.png" alt-text="Screenshot of replacing model structure with template." lightbox="../media/planning-driver-model/planning-how-to-create-templates/replace-template.png" :::

### Set Conditions

Insert the template at only specific levels in the model based on filter or set criteria. If you added two row dimensions, *Company* and *Department*, you can now set conditions based on them.

* **Simple**: Choose the specific categories or levels where the template must be inserted. Use **Search** to find any level. This option is ideal for straightforward selection scenarios where no complex logic or grouping is required.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/set-simple-conditions.png" alt-text="Screenshot of setting simple conditions for inserting the template." lightbox="../media/planning-driver-model/planning-how-to-create-templates/set-simple-conditions.png":::

* **Advanced**: Define complex rules for applying templates by combining multiple filters and groups.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/set-advanced-conditions.png" alt-text="Screenshot of setting advanced conditions for inserting the template.":::
    
    In this mode, you can:
    
    * Add multiple filters (for example, *Department is Admin* or *Company contains B*).
    * Group filters using logical operators such as AND and OR.
    * Create nested groups to build multi-level conditions.
    
    Each group can have its own AND/OR logic, allowing you to control how conditions are evaluated. For example:
    
    * The top-level group uses OR to apply the template if *any* of the conditions is met.
    * A nested group can use AND to ensure *all* conditions within that group are satisfied.
    * Apply a template when *Department is Admin OR Company contains B*.
    * Apply the template for a specific group where *Department is Marketing AND Company is not C*.

## Apply template to the model

If you choose **Replace**, the template is applied to the model as shown in the following image. You can't edit the template directly from the model. Instead, edit the template to modify the row structure.

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/apply-template-to-model.png" alt-text="Screenshot of applying the template to the model." lightbox="../media/planning-driver-model/planning-how-to-create-templates/apply-template-to-model.png":::

You can create multiple templates for a model and apply them wherever required.

## Manage templates

Select **Manage Template** to edit, duplicate, or delete templates.

Select the template that you want to modify from the list of available templates in the dropdown. Then choose the appropriate action icon to perform the required operation.

* Select the **Add** icon to create a new blank template.
* Select the **Duplicate** icon to create a copy of the selected template.
* Select the **Delete** icon to delete the template.

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-templates/manage-templates.png" alt-text="Screenshot of managing created templates." lightbox="../media/planning-driver-model/planning-how-to-create-templates/manage-templates.png":::

## Related content

[Create a model using model builder](planning-how-to-create-model-using-model-builder.md)
