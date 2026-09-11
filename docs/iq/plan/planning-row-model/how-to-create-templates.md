---
title: Create Row Model Templates for Reusable Row Structures
description: Learn how to create templates in row models for reusing row structures.
ms.date: 09/01/2026
ms.topic: how-to
#customer intent: As a user, I want to learn how to create row model templates for reusing row structures in a model.
---

# Create row model templates

This article explains how to create templates and use them for your row model.

A *template* is a predefined layout of rows that you can use to build models with repetitive structures. You create the template once based on your requirements and reuse it multiple times across the model.

For example, you can create a *Net Profit* template once and then apply it across different product categories to maintain a consistent structure. The following image illustrates a sample scenario:

:::image type="content" source="../media/planning-row-model/how-to-create-templates/template-concept.png" alt-text="Diagram of before and after template use, showing flat rows becoming a Net Profit hierarchy for Clothes, Dairy, and Beverages." lightbox="../media/planning-row-model/how-to-create-templates/template-concept.png":::

## Benefits of creating a template

When you create a template, you define a reusable row structure that you can apply wherever the same structure is needed in a model. This approach is useful when your model contains repeated structures across categories, companies, departments, or other dimensions.

Use templates to:

* **Reuse row structures:** Create a predefined set of rows once and apply it to multiple parts of the model instead of rebuilding the same structure repeatedly.
* **Manage repeated structures centrally:** Edit, duplicate, or delete only the templates as your model requirements change, without manually finding and altering the structure throughout the model.
* **Maintain consistency:** Use the same hierarchy and line-item structure across different categories or entities.
* **Build models efficiently:** Create a template as a reusable subset or mini model and insert it across your model wherever required.
* **Append or replace:** Insert a template by either appending it to the existing model or replacing the existing model structure with the template structure.

## Sample scenario

This article uses the following planning sheet as an example. The planning sheet is configured with **Region** and **Chart of Accounts** as row dimensions, **Year**, **Quarter**, and **Month** in the **Columns** field, and **Actuals** in the **Values** field.

:::image type="content" source="../media/planning-row-model/how-to-create-templates/sample-data-for-template.png" alt-text="Screenshot of a planning sheet with Region and Chart of Accounts rows, Year, Quarter, Month columns, and Actuals values highlighted in the Fields pane." lightbox="../media/planning-row-model/how-to-create-templates/sample-data-for-template.png":::

This article walks you through creating a row model where you create a template to define the row model structure and insert the template for different regions.

## Enable model builder

The first step is to start building the row model by using the Model Builder.

1. Select **Row Model** under the **Model** tab. The **Model Builder** pop-up opens. Select **Enable**.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/enable-model-builder.png" alt-text="Screenshot of the Model Builder dialog with the Enable button highlighted, opened from Row Model on the Model tab." lightbox="../media/planning-row-model/how-to-create-templates/enable-model-builder.png":::

1. This action enables **Model Builder**. You can select **Back to Home** to save the report and return to this screen by selecting **Row Model** again.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/row-model-builder.png" alt-text="Screenshot of the Row Model builder showing rows with Type, Configuration, and Aggregation columns for closed period." lightbox="../media/planning-row-model/how-to-create-templates/row-model-builder.png":::

The model builder displays each row as a configurable driver for both open and closed periods, enabling you to build row-based models.

## Create a template

This model contains repeated line items for different regions. Create a template that defines the required row structure and reuse it for each region. In this example, the template groups revenue and expenses and calculates **Net Profit**.

```
Net Profit
    Revenue
    Expenses
        Advertising & Promotions
        Purchase
        Rent & Utilities
        Salaries
        Transportation
```

1. Select the row where you want to insert the template, and then select **Insert Template**. This action creates a new template that you can configure.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/insert-template.png" alt-text="Screenshot of Row Model page with Insert Template highlighted and a new Template (1) panel open below the row grid." lightbox="../media/planning-row-model/how-to-create-templates/insert-template.png":::

1. Begin building the template as you would [create a row model](how-to-create-row-model.md). Rename the template name and the top row by double-clicking *Template(1)* and updating the name.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/create-template.png" alt-text="Screenshot of Row Model page with the template panel open below the grid and the row name being renamed to Net Profit." lightbox="../media/planning-row-model/how-to-create-templates/create-template.png":::

1. Select the *Net Profit* row and then select **Bulk Insert**. In the side panel, enter the row structure you want to add. Use **Tab** to add a row as a child at the next hierarchy level.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/bulk-insert.png" alt-text="Screenshot of Row Model page with Bulk Insert highlighted and the Insert Bulk Row panel listing Revenue and Expenses rows." lightbox="../media/planning-row-model/how-to-create-templates/bulk-insert.png":::

1. Select **Add**. The template structure is created as shown in the following image.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/template-created.png" alt-text="Screenshot of the created template hierarchy with Net Profit parent row and child rows set to Data Input and Sum aggregation." lightbox="../media/planning-row-model/how-to-create-templates/template-created.png":::

## Configure the template rows

Configure the template's rows like you [configure a row model](how-to-create-row-model.md#configure-the-row-model).

1. Configure all leaf rows to **Data Source** type and link them to their corresponding source rows.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/configure-leaf-rows-data-source.png" alt-text="Screenshot of template rows configured as Data Source, with the Revenue side panel showing Configure as Data Source and Desired Trend Increase." lightbox="../media/planning-row-model/how-to-create-templates/configure-leaf-rows-data-source.png":::

1. Set the **Desired Trend**. For *Revenue*, use *Increase* and for all child rows under *Expenses*, use *Decrease*.
1. For *Expenses*, use **Aggregate** and **Sum** to add all its child rows.
1. For *Net Profit,* use **Aggregate** and then choose **Subtract** since,  `Net Profit = Revenue - Expenses`.

The template is complete.

:::image type="content" source="../media/planning-row-model/how-to-create-templates/finished-template.png" alt-text="Screenshot of the finished template listing Revenue and expense rows configured as Data Source with Sum aggregation." lightbox="../media/planning-row-model/how-to-create-templates/finished-template.png":::

## Ways to insert a template

You can insert a template into the model by using either of the following options:

* **Append:** Inserts the template row structure into the model as it is, without modifying the existing model structure.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/append-template.png" alt-text="Screenshot of Row Model showing appended Net Profit template rows highlighted in the grid and the Append button selected." lightbox="../media/planning-row-model/how-to-create-templates/append-template.png":::

* **Replace**: Replaces the existing model structure with the template's row structure.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/replace-structure-with-template.png" alt-text="Screenshot of Row Model grid where Asia rows are replaced with the template row structure and the Replace button is highlighted." lightbox="../media/planning-row-model/how-to-create-templates/replace-structure-with-template.png":::

Use **Replace** for this example to replace the existing structure with the template structure for every region.

## Apply template to the model

If you choose **Replace**, the template is applied to the model as shown in the following image.

:::image type="content" source="../media/planning-row-model/how-to-create-templates/apply-template-to-model.png" alt-text="Screenshot of the Row Model grid showing Asia and Europe regions expanded with the applied template row structure of Net Profit, Revenue, and Expenses." lightbox="../media/planning-row-model/how-to-create-templates/apply-template-to-model.png":::

You can't edit the template directly from the model. Instead, select [**Manage Template**](#manage-templates) to edit the template and modify the row structure.

You can create multiple templates for a model and apply them wherever required.

The row model in the planning sheet looks as follows with a consistent structure for all regions.

:::image type="content" source="../media/planning-row-model/how-to-create-templates/planning-sheet-row-model-template-applied.png" alt-text="Screenshot of the planning sheet grid showing Asia and Europe regions with the same template rows of Net Profit, Revenue, and Expenses across months and quarters." lightbox="../media/planning-row-model/how-to-create-templates/planning-sheet-row-model-template-applied.png":::

## Set conditions

Use **Set Conditions** to insert the template at specific levels in the model based on filters or set criteria.

1. Go to the **Row Model** window and open the templates section by selecting **Manage Template**.
1. Select **Set Conditions**.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/set-conditions.png" alt-text="Screenshot of the Row Model window with Manage Template and Set Conditions highlighted, and the Set Template Conditions pane open." lightbox="../media/planning-row-model/how-to-create-templates/set-conditions.png":::

1. Set conditions by using the **Simple** and **Advanced** options.

    * **Simple**: Choose the specific categories or levels where the template must be inserted. Use **Search** to find any level. This option is ideal for straightforward selection scenarios where no complex logic or grouping is required.

    The following image shows *Asia* cleared. When you select **Apply**, the template applies to all regions except *Asia*.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/set-simple-condition.png" alt-text="Screenshot of the Set Template Conditions pane with Simple selected, Asia cleared, Europe and North America checked, and Apply highlighted." lightbox="../media/planning-row-model/how-to-create-templates/set-simple-condition.png":::

    The following image shows another example with two row dimensions in the planning sheet. You can select or clear the levels or categories where you want to apply the template.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/set-simple-conditions-two-row-dimensions.png" alt-text="Screenshot of the Set Template Conditions pane with Simple selected, showing a two-level tree of regions and channels with some checkboxes selected." lightbox="../media/planning-row-model/how-to-create-templates/set-simple-conditions-two-row-dimensions.png":::

    * **Advanced:** Select **Advanced** to define complex rules for applying templates by combining multiple filters and groups.

    In this mode, you can:

    * Add multiple filters by using **Add filter**.
    * Group filters by using logical operators such as **AND** and **OR**.
    * Create nested groups to build multi-level conditions by using **Add group**.

    Each group can have its own AND/OR logic, so you control how conditions are evaluated. For example:

    * The top-level group uses **OR** to apply the template if *any* condition is met.
    * A nested group uses **AND** to ensure *all* conditions within that group are satisfied.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/set-template-conditions-advanced.png" alt-text="Screenshot of the Set Template Conditions pane in Advanced mode with Or filters for Region and Channel_Name and a nested And group filter.":::

    This example means:

    * Apply a template when *Region is Asia OR Channel\_Name contains In.*
    * Also, apply it for a specific group where *Region is Europe AND Channel\_Name doesn't begin with E*.

1. Select **Apply** to apply the filters. The template applies only to the levels that meet the specified filter conditions.

    :::image type="content" source="../media/planning-row-model/how-to-create-templates/apply-template-filtered-rows.png" alt-text="Screenshot of the Model grid showing template applied to Distributor rows with edit icons, while Ecommerce rows are unchanged." lightbox="../media/planning-row-model/how-to-create-templates/apply-template-filtered-rows.png":::

## Manage templates

1. Select **Manage Template** to edit, duplicate, or delete templates.

1. Select the template that you want to modify from the list of available templates in the dropdown. Then choose the appropriate action icon to perform the required operation.

* Select the **Add** icon to create a new blank template.
* Select the **Duplicate** icon to create a copy of the selected template.
* Select the **Delete** icon to delete the template.

:::image type="content" source="../media/planning-row-model/how-to-create-templates/manage-templates.png" alt-text="Screenshot of Row Model with Manage Template highlighted and a template dropdown showing Add, Duplicate, and Delete icons." lightbox="../media/planning-row-model/how-to-create-templates/manage-templates.png":::
