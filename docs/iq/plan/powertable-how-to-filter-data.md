---
title: Filter Data in PowerTable Sheet
description: Filter data in PowerTable to focus on specific records using basic, advanced, Top N, and global-level filters. Learn how to refine large datasets.
ms.date: 07/15/2026
ms.topic: how-to
#customer intent: As a user, I want to filter data by using basic, advanced, Top N, and global-level filters so that I can analyze and work with only the records that meet my criteria.
---

# Filter data in PowerTable

Use filters to focus on specific records and analyze only the data that meets your criteria. PowerTable provides basic filters, advanced filters, and Top N filtering options to help you quickly narrow down large datasets.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Apply basic filters

Use basic filters to directly select the values or categories you want to filter.

1. In the PowerTable sheet, select the **Filter** icon to open the **Super Filter** pane.

   :::image type="content" source="media/powertable-how-to-filter-data/filter-icon.png" alt-text="Screenshot of the filter icon and Super Filter pane." lightbox="media/powertable-how-to-filter-data/filter-icon.png":::

1. Select a column.
1. Select one or more values to filter the records. The table automatically filters based on the selected values.

   :::image type="content" source="media/powertable-how-to-filter-data/select-values.png" alt-text="Screenshot of selecting the filter values from the dropdown." lightbox="media/powertable-how-to-filter-data/select-values.png":::

### Search within filter values

Use the search box in the filter pane to locate specific filter values when a column contains many options.

:::image type="content" source="media/powertable-how-to-filter-data/search.png" alt-text="Screenshot of the search box in the filter pane." lightbox="media/powertable-how-to-filter-data/search.png":::

## Apply advanced filters

Use the advanced filtering option to filter records based on specific criteria.

To apply an advanced filter:

1. Select the **Advanced** tab in the filter pane.
1. Choose the condition you want from the dropdown list, based on the column's data type.

   :::image type="content" source="media/powertable-how-to-filter-data/advanced.png" alt-text="Screenshot of the Advanced tab in the filter pane." lightbox="media/powertable-how-to-filter-data/search.png":::

1. Enter the filter criteria and apply the filter.

   :::image type="content" source="media/powertable-how-to-filter-data/filter-criteria.png" alt-text="Screenshot of configuring an advanced filter in the filter pane." lightbox="media/powertable-how-to-filter-data/filter-criteria.png":::

### Number filters

The following number filter conditions are available:
* Equals
* Does not equal
* Greater than
* Greater than or equal to
* Less than
* Less than or equal to
* Between
* Blank

In the following example, a filter on the *ProductPrice* column displays values between 1,000 and 3,000. A filter icon in the column header indicates an applied filter.

:::image type="content" source="media/powertable-how-to-filter-data/number-filter.png" alt-text="Screenshot of the filter applied in a numeric column." lightbox="media/powertable-how-to-filter-data/number-filter.png":::

You can also use the slider or value range controls to filter numeric data.

:::image type="content" source="media/powertable-how-to-filter-data/slider.png" alt-text="Screenshot of the slider while configuring advanced filter." lightbox="media/powertable-how-to-filter-data/slider.png":::

### Text filters

The following text filter conditions are available:
* Contains
* Does not contain
* Starts with
* Does not start with
* Isblank
* Is not blank

In the following example, a filter displays only products whose *ProductName* contains *frame*.

:::image type="content" source="media/powertable-how-to-filter-data/text-filter.png" alt-text="Screenshot of the filter applied to a text column." lightbox="media/powertable-how-to-filter-data/text-filter.png":::

PowerTable provides suggestions while you enter filter values.

:::image type="content" source="media/powertable-how-to-filter-data/suggestion.png" alt-text="Screenshot of the provided suggestions when a filter value is entered." lightbox="media/powertable-how-to-filter-data/suggestion.png":::

## Apply multiple filters

Apply filters to multiple columns simultaneously to further refine the displayed results.

In the following example, the filters display records where *ProductColor* is *Black* or *Blue*, and *ProductPrice* is greater than 2000.

:::image type="content" source="media/powertable-how-to-filter-data/multiple-filters.png" alt-text="Screenshot of applying multiple filters." lightbox="media/powertable-how-to-filter-data/multiple-filters.png":::

## Apply a Top N filter

Use the **Top N** filter to display the top, bottom, or both top and bottom records based on the values in a numeric column. The **Top N** filter is available only for text columns, so you can filter text values based on a related numeric field.

To apply a Top N filter:

1. Select the **Top N** tab in the filter pane.
1. From the **Show items** dropdown, select **Top**, **Bottom**, or **Both**.
1. In the **Values** field, enter or select the number of records to display.
1. From the **Based On** dropdown, select the numeric column to rank the records.

   :::image type="content" source="media/powertable-how-to-filter-data/top-n-filter.png" alt-text="Screenshot of applying Top N filter." lightbox="media/powertable-how-to-filter-data/top-n-filter.png":::

The following example filters the top five products based on their *ProductPrice* values.

:::image type="content" source="media/powertable-how-to-filter-data/top-five-products.png" alt-text="Screenshot of the top 5 products based on product price." lightbox="media/powertable-how-to-filter-data/top-five-products.png":::

## Advanced filter

Use **Advanced Filter** to create complex filtering conditions by combining multiple filters and filter groups with **AND** or **OR** logic.

To apply the advanced filter:

1. Select **Advanced Filter** from the **More options** (**...**) menu in the filter pane.

   :::image type="content" source="media/powertable-how-to-filter-data/advanced-filter.png" alt-text="Screenshot of the Advanced Filter option." lightbox="media/powertable-how-to-filter-data/advanced-filter.png":::

1. Select **Add Filter** to include one or more filter conditions.

    :::image type="content" source="media/powertable-how-to-filter-data/add-filter.png" alt-text="Screenshot of the Advanced Filter dialog with Add Filter button highlighted." lightbox="media/powertable-how-to-filter-data/add-filter.png":::

1. Choose to combine the filter conditions by using AND or OR logic. The following image combines the filter conditions using **OR**. Select products if the product subcategory is *Socks* or if the product size is *M*.

    :::image type="content" source="media/powertable-how-to-filter-data/combine-filter-conditions.png" alt-text="Screenshot of the Advanced Filter dialog with OR selected to combine ProductSubcategory is Socks and ProductSize is M conditions." lightbox="media/powertable-how-to-filter-data/combine-filter-conditions.png":::

1. Select **Add Group** to create a filter group.

    :::image type="content" source="media/powertable-how-to-filter-data/add-filter-group.png" alt-text="Screenshot of the Advanced Filter dialog with Add Group button highlighted." lightbox="media/powertable-how-to-filter-data/add-filter-group.png":::

1. Use the **Add Filter** option to add one or more filter conditions within the group. Combine them using **AND** or **OR**.

    :::image type="content" source="media/powertable-how-to-filter-data/add-filter-inside-group.png" alt-text="Screenshot of the Advanced Filter dialog with a nested group using AND logic and the Add Filter button highlighted.":::

    In this case, PowerTable evaluates the inner filter group first with AND, then combines it with the two outer filter conditions using OR.

1. Select **Update** to apply the filters. PowerTable displays products that meet *any* of the following conditions:

   * The product subcategory is *Socks*.
   * The product size is *M*.
   * The product is *Shorts*, the color is *Black*, and the size is *M*.

    :::image type="content" source="media/powertable-how-to-filter-data/apply-filter.png" alt-text="Screenshot of PowerTable showing filtered products with Socks rows, size M rows, and Black Shorts of size M rows highlighted." lightbox="media/powertable-how-to-filter-data/apply-filter.png":::

The following image shows another example that combines two filter groups using OR.

:::image type="content" source="media/powertable-how-to-filter-data/example-two-groups.png" alt-text="Screenshot of Advanced Filter panel with two And groups for subcategory, size, and color.":::

* The first group filters products where *ProductSubcategoryKey* **is** *Socks* **AND** *ProductSize* **is** *M*.
* The second group filters products where *ProductSubcategoryKey* **is** *Shorts* **AND** *ProductColor* **is** *Black* **AND** *ProductSize* **is** *M*.
* The advanced filter combines the two groups using **OR**, so PowerTable displays records that satisfy either group.

:::image type="content" source="media/powertable-how-to-filter-data/result-example.png" alt-text="Screenshot of PowerTable results with Socks rows and Black Shorts of size M highlighted." lightbox="media/powertable-how-to-filter-data/result-example.png":::

### Other options

* Use **Reset All** to reset all the filter and filter group configurations and add a new set of filters.
* Select **Delete Group** to delete a filter group.

    :::image type="content" source="media/powertable-how-to-filter-data/delete-group.png" alt-text="Screenshot of Advanced Filter dialog with Reset All and Delete Group buttons highlighted." lightbox="media/powertable-how-to-filter-data/delete-group.png":::

* You can rearrange filters and filter groups by using the drag handle next to each item.

    :::image type="content" source="media/powertable-how-to-filter-data/drag-handle.png" alt-text="Screenshot of Advanced Filter dialog with drag handles highlighted next to filters and filter groups." lightbox="media/powertable-how-to-filter-data/drag-handle.png":::

## Apply filters at the global level

By default, the **Filter** pane displays **Page level** filters, which apply only to the current PowerTable sheet. Use **Global level** filters to apply the same filter criteria across multiple PowerTable sheets that share one or more common columns.

To apply a global-level filter:

1. In the **Filter** pane, scroll to the **Global level** section and select the **+** icon.
1. Select the dimensions that you want to use for filtering across tables.
1. In **Add data fields here**, select the PowerTable sheets and the corresponding columns to map them by using common columns.
1. Apply the required filter. The filtered results appear across all configured PowerTable sheets.

For example, consider **Products** as the current table and **Subcategory** as a related table. The **ProductKey** column links both tables. If you configure **ProductSubcategoryKey**, **ProductName**, and **ModelName** as filter dimensions and map the tables by using **ProductKey**, a filter that you apply to **ModelName** in the **Products** table also applies to the **Subcategory** table.

<!--Add image when available-->

## Clear filters

Select the clear icon next to a filter to remove it.

:::image type="content" source="media/powertable-how-to-filter-data/clear-filter.png" alt-text="Screenshot of the clear filter icon." lightbox="media/powertable-how-to-filter-data/clear-filter.png":::

To remove all applied filters, select **Reset All** from the **More options** (**...**) menu in the Filter pane.

:::image type="content" source="media/powertable-how-to-filter-data/reset-all.png" alt-text="Screenshot of the Reset All option." lightbox="media/powertable-how-to-filter-data/reset-all.png":::
