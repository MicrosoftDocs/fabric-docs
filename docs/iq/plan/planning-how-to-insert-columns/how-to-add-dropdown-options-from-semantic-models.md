---
title: Add dropdown options from semantic models
description: Learn how to populate Single Select and Multi Select columns with values from a Power BI semantic model and filter those values based on other columns.
ms.date: 10/07/2026
ms.topic: how-to
---

# Add dropdown options from semantic models

For **Single Select** and **Multi Select** columns, you can create a list of values (LOV) from your Power BI semantic models or other dimensions, such as master data reference fields. The options are dynamically updated as the source data changes.

## Create options from a semantic model

The following example creates options for a **Single Select** column from a semantic model.

1. In the **Data Input** pane, create or select a **Single Select** or **Multi Select** column.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/dropdown-options-single-select-multi-select.png" alt-text="Screenshot of the Data Input pane showing the Single Select and Multi Select input types and the Semantic Model option." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/dropdown-options-single-select-multi-select.png":::

2. Under **Options**, select **Semantic Model**.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-single-select-semantic-model.png" alt-text="Screenshot of the Data Input pane with Single Select selected and the Semantic Model option selected." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-single-select-semantic-model.png":::

3. From the **Table** dropdown, select the table that contains the values you want to use as options.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-table-from-semantic-model.png" alt-text="Screenshot of the Add options from semantic model pane showing the Table dropdown." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-table-from-semantic-model.png":::

### Configure the Label and ID columns

From the **Label Column** dropdown, select the column from the table that you want to use to populate the options. You can associate the options with an ID by selecting the **ID Column**.

For example, if the Single Select column shows a list of colors, select a color ID field if one is available in the data model. The options aren't affected if color names contain duplicates because the Color ID field remains the foreign key that uniquely identifies each option.

In this example, a Color ID field isn't available, so the **Color** column is used for both **Label Column** and **ID Column**.

> [!NOTE]
> If an ID field isn't available in your dataset, use the **Label Column** as the **ID Column**.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-label-and-id-columns-same-field.png" alt-text="Screenshot of the Add options from semantic model pane showing the same Color column selected for Label Column and ID Column." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-label-and-id-columns-same-field.png":::

1. Select **Create** to add the semantic model values to the column.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-create-semantic-model-options.png" alt-text="Screenshot of the Add options from semantic model pane showing the option to create the semantic model values." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-create-semantic-model-options.png":::

2. Select a value from the list to populate the Single Select column.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-color-from-single-select-options.png" alt-text="Screenshot of the Single Select column showing color values available from the semantic model." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-color-from-single-select-options.png":::

## Filter dropdown options based on another field

You can filter the options available in a dropdown based on the row dimension or another field in the visual. This is useful when the available options need to change based on the current row context.

For example, you can filter the **Color Selection** options based on **Brand Name**, so that the dropdown shows only colors associated with the selected brand.

1. Create the **Color Selection** column and configure the semantic model options.

2. Under **Filter Options**, select the field in **Columns** that you want to use to filter the options. In this example, select **Brand Name (Contoso, Ltd. - Sales)**.

3. In the corresponding **Visual Column** dropdown, select the matching field from the visual. In this example, select **Brand Name**.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/configure-filter-options-by-brand-name.png" alt-text="Screenshot of the Add options from semantic model pane showing Filter Options configured to filter Color values by Brand Name." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/configure-filter-options-by-brand-name.png":::

   The dropdown now displays the color values that match the selected brand.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/view-color-options-filtered-by-brand-name.png" alt-text="Screenshot of the Color Selection column showing color values filtered by Brand Name." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/view-color-options-filtered-by-brand-name.png":::

   You can then select a filtered value, such as **Blue**, for the **Color Selection** column.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-blue-for-color-selection.png" alt-text="Screenshot of the Color Selection column with Blue selected." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-blue-for-color-selection.png":::

### Use different label and ID columns

Use different columns for the option label and option ID when the data model provides a separate key column.

For example, if the dropdown displays product names and the data model includes a **ProdID** field, use **ProductName** as the **Label Column** and **ProdID** as the **ID Column**. This keeps the option associated with a stable identifier even if the displayed product name changes or duplicate names exist.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-different-label-and-id-columns.png" alt-text="Screenshot of the Add options from semantic model pane showing different columns selected for Label Column and ID Column." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-different-label-and-id-columns.png":::

The product names are displayed in the **Product Selection** column according to the selected label and ID columns.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/view-product-options-using-label-and-id-columns.png" alt-text="Screenshot of the Product Selection column showing product names populated from the selected Label Column and ID Column." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/view-product-options-using-label-and-id-columns.png":::

You can select a product from the available options.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-product-from-product-selection-options.png" alt-text="Screenshot of the Product Selection column showing selected product values." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-product-from-product-selection-options.png":::

## Use Join Table to access options from a related table

The base data in the visual can come from one table while the options for a dropdown come from another table.

The **Join Table** option lets you use columns from different tables that already have a relationship. It's useful when the value displayed in the dropdown is stored in one table and the corresponding key is available in another related table.

> [!NOTE]
> Use **Join Table** to access columns from related tables in the semantic model.

The following example uses the **Contoso, Ltd. - Sales** and **Contoso, Ltd. - Product** tables.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/join-related-semantic-model-tables.png" alt-text="Screenshot of the Add options from semantic model pane showing the two related tables used for the Join Table example." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/join-related-semantic-model-tables.png":::

The following dataset is used to illustrate the scenarios in this section.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/view-sales-and-product-table-fields.png" alt-text="Screenshot of the visual showing fields from the Contoso, Ltd. - Sales and Contoso, Ltd. - Product tables." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/view-sales-and-product-table-fields.png":::

### Create options from the related table

1. Create a **Single Select** column, such as **Sub Categ**, and configure its options from the semantic model.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/create-subcategory-single-select-column.png" alt-text="Screenshot of the Data Input pane and the Sub Category Single Select column configured with semantic model options." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/create-subcategory-single-select-column.png":::

2. Select a value from the available **Sub Categ** options.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/view-subcategory-options.png" alt-text="Screenshot of the Sub Category column showing the available values from the semantic model." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/view-subcategory-options.png":::

3. Select the required value.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-subcategory-option.png" alt-text="Screenshot of the Sub Category column showing a selected value from the available options." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/select-subcategory-option.png":::

4. Create the **Single Select** column **Product Selection**. Select **Semantic Model** under **Options**. Select **Join Table** to use product values from the related table. Select the column containing the product name as the **Label Column** and the corresponding product key as the **ID Column**. To make the join work, under **Filter Options**, select **SubCategory (Contoso, Ltd. - Product)** from the semantic model in **Columns** and **Sub Categ** from the visual in **Visual Columns**. This restricts the available products based on the selected filter.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/configure-product-name-with-join-and-filter.png" alt-text="Screenshot of the Add options from semantic model pane showing Product Name configured from a related table and filtered by Sub Category." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/configure-product-name-with-join-and-filter.png":::

   The **Product Selection** column is created using the Join Table option.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/view-product-options-from-joined-table.png" alt-text="Screenshot of the Product Name dropdown showing values populated according to the Join Table, Label Column, ID Column, and Filter Options configuration." lightbox="../media/planning-how-to-insert-columns/how-to-add-dropdown-options-from-semantic-models/view-product-options-from-joined-table.png":::
