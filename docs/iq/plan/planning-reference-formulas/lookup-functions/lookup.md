---
title: Fetch Values Across Planning Sheets in Fabric with LOOKUP
description: Use the LOOKUP function to fetch values from another planning sheet or query in Fabric. Learn how to configure dimensions, measures, and formulas.
#customer intent: As a financial planner working across multiple planning sheets, I want to set up an advanced lookup, so that I can use values from another sheet in my formulas without copying them manually.
ms.date: 10/29/2026
ms.topic: reference
---

# LOOKUP

Use the advanced lookup to fetch values from another sheet or query and use them in planning formulas. Configure the dimensions that identify a value, choose the measure to retrieve, and reference the lookup in a formula.

For example, you can bring a forecast from another sheet into your planning view by matching *Region* and *Product*. You can then use the retrieved forecast in further calculations without manually copying values.

## When to use advanced lookup

The following table describes typical scenarios for using an advanced lookup in your planning sheets.

| Planning need | Example lookup |
|---|---|
| **Compare plans with a shared forecast** | Retrieve Forecast by Region and Product from another sheet. |
| **Use common planning assumptions** | Retrieve a growth rate or unit cost by Product and Year. |
| **Apply currency assumptions** | Retrieve exchange rates by Currency and Period. |
| **Reference prepared query results** | Retrieve target or budget measures from a query using matching categories. |

> [!TIP]
> Choose categories that identify the value at the level you need. For example, to fetch a monthly exchange rate, currency alone isn't enough; include the relevant period as well.

## Prerequisites

Before you begin, open a planning sheet in editing mode and assign the fields needed for your planning view. Ensure the **Data** pane has the source sheet or query and its fields.

## Create an advanced lookup

You can add an advanced lookup directly from the field settings pane. The following steps guide you through creating the lookup before referencing it directly in your formulas.

The lookup planning sheet used to fetch data in this example is shown in the following image.

:::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-source-planning-sheet.png" alt-text="Screenshot of the Rebate Plan planning sheet used as the lookup source to fetch data." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-source-planning-sheet.png":::

1. Open your target planning sheet in editing mode. In this example, the target sheet is *Regional Revenue Plan*. 
1. Go to **Fields** and select the **Advanced** tab.
1. Expand the **Lookup** section if it's collapsed and select **Add Lookup**.

    :::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/fields-pane-advanced-lookup-option.png" alt-text="Screenshot of the Advanced tab in the Fields pane with the Lookup section expanded and the Add Lookup option highlighted." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/fields-pane-advanced-lookup-option.png":::

    Fabric creates a new lookup with an automatically assigned name, such as **Lookup 1**. Note this name; you use it in formulas.

1. Open the **Data** pane, and expand the appropriate source section:

    * **From Sheets** for fields from another sheet.
    * **Queries** for fields from an available query.

    In this case, the source is the *Rebate Plan* sheet.

1. Drag the matching dimensions into the lookup **Category** bucket. To learn more about dimension matching across planning sheets, see [Understand dimension matching](#understand-dimension-matching).
1. Drag the measure (for example, *Rebate Rate*) you want to retrieve into the **Values** bucket.
1. Note the lookup name and the original field name in **Values**.
1. To fetch the *Rebate Rate* from the *Rebate Plan* sheet, drag the matching dimensions from the semantic model. Expand the **From Sheets** section and drag the measure to fetch from the lookup planning sheet.

    > [!TIP]
    > Even if the source lookup sheet contains finer details (like Product Category > Subcategory), you only need to match the higher-level dimension (like Category) used in your target planning sheet. The lookup aggregates and maps the data accordingly.

    :::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/assign-dimensions-measure-lookup.png" alt-text="Screenshot of a lookup with Category in the Category bucket and Rebate Rate from the Rebate Plan sheet in the Values bucket." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/assign-dimensions-measure-lookup.png":::

## Use a lookup in formulas

After configuring an advanced lookup, use the LOOKUP function in your formulas to retrieve measure values from other planning sheets.

Lookup syntax:

```
LOOKUP("advancedLookupName", "measure", [rows], [columns])
```

| Argument | Meaning |
|---|---|
| `advancedLookupName: string` | The auto-assigned lookup name. Example: "Lookup 1". |
| `measure: string` | The original source field name for the measure assigned to **Values**. This name isn't the title of the new formula. |
| `rows: [string]` (Optional) | - Use the ROW identifier for the current row context.<br>- Select the lookup dimension name from the **References** tab in the formula editor. For example, `[[Region]]`.<br>- Use an ordered list (array of values) such as `["North"]` for a specific dimension category value.<br>- If omitted, the current row context is used. |
| `columns: [string]` (Optional) | - Use the COLUMN identifier for the current row context.<br>- Select the lookup dimension name from the **References** tab in the formula editor. For example, `[[Year]]`.<br>- Use an ordered list (array of values) such as `["Bikes"]` for a specific dimension category value.<br>- If omitted, the current column context is used. |

> [!TIP]
> * Enclose lookup names, value field names, and literal category values in straight quotation marks.
> * Use square brackets for lists.
> * Match the value field's original name exactly, even if a custom display label is different.

In the target planning sheet, go to **Insert Column** > **Formula** in the **Planning** ribbon. Create a formula by using the LOOKUP function.

:::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/planning-sheet-insert-lookup-formula-column.png" alt-text="Screenshot of creating a formula column with the LOOKUP function in the Planning ribbon of a target planning sheet." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/planning-sheet-insert-lookup-formula-column.png":::

The lookup retrieves data at the leaf level of its assigned dimensions. The region-level rows display "#N/A" because the region dimension exists only in the target sheet (and not in the lookup). Set the row aggregation type to Sum. This setting allows the target sheet to roll up the fetched leaf-level values to the region level.

:::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-formula-row-aggregation-sum.png" alt-text="Screenshot of setting the row aggregation for the formula measure to sum." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-formula-row-aggregation-sum.png":::

## Understand dimension matching

Lookups match dimensions based on their positional order, not by matching field names automatically. When using row and column contexts from your current visual:

* Row values are processed first.
* Column values are processed second.

Ensure your lookup’s category order matches this exact sequence (Rows > Columns). For example, consider a target planning sheet that has *Region* and *Product* on rows and *Year* in columns.

:::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/dimension-matching-target-planning-sheet-row-column-dimensions.png" alt-text="Screenshot of the target planning sheet with Region and Product on rows and Year in columns." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/dimension-matching-target-planning-sheet-row-column-dimensions.png":::

You need to fetch a measure from another lookup planning sheet that has *Category*, *Subcategory,* and *Product* on rows and *Year* and *Quarter* in columns.

:::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/dimension-matching-lookup-planning-sheet-row-column-dimensions.png" alt-text="Screenshot of lookup planning sheet row and column dimension assignments." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/dimension-matching-lookup-planning-sheet-row-column-dimensions.png":::

Configure the lookup in the target visual with the matching row and column dimensions: *Product* and *Year*. 

:::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/dimension-matching-lookup-configuration.png" alt-text="Screenshot of the lookup configured in the target planning sheet with matching Product row and Year column dimensions." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/dimension-matching-lookup-configuration.png":::

Because the target rows also include *Region*, explicitly select `[[Product]]` for the formula's rows argument and `[[Year]]` for the columns argument.

## Match the current row and column

Use the `ROW` and `COLUMN` identifiers or directly reference values from another planning sheet when the row and column dimensions in the source planning sheet match the categories in the lookup.

The following image shows a planning sheet where *Region* and *Category* are set as row dimensions, and *Quarter* is set as the column dimension. The lookup uses the same dimensions to fetch the *Price Forecast* visual.

:::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/matching-categories-lookup-row-column-dimensions-match.png" alt-text="Screenshot of a planning sheet with Region and Category rows, Quarter columns, and a lookup using matching dimensions." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/matching-categories-lookup-row-column-dimensions-match.png":::

To reference the *Unit Price Forecast* in a formula within the Product Plan sheet, use the following syntax:

```
LOOKUP("Lookup 1", "Unit Price Forecast", ROW, COLUMN)
```

:::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/matching-categories-lookup-measure-referenced-formula.png" alt-text="Screenshot of lookup formula when the row and column dimensions are an exact match." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/matching-categories-lookup-measure-referenced-formula.png":::

The shorter form uses the current row and column context automatically:

```
LOOKUP("Lookup 1", "Forecast")
```
> [!NOTE]
> Use this syntax only when the planning sheet's dimension values and their order match the lookup categories.

## Retrieve a specific combination

You can also retrieve a specific combination of values from the lookup, regardless of the current row and column context. Use an ordered list of values for each dimension in the lookup.

To retrieve the *North* forecast for *Bikes* irrespective of the current cell:

```
LOOKUP("Lookup 1", "Forecast", ["North"], ["Bikes"])
```

For multiple dimensions, list their values in the required order. For example, a lookup with categories *Currency* followed by *Period* can use:

```
LOOKUP("Lookup 2", "Exchange Rate", ["EUR", "2026-01"], [])
```

Here, you supply both matching values in the first list. The empty second list, `[]`, prevents the inclusion of extra values from the current column context.

> [!NOTE]
> The field names and category labels in these examples are illustrative. Replace them with your configured lookup's names and actual source values.

## Preview lookup data

Use the preview to check that the source contains the category combinations your formula uses and that the selected value field returns the expected figures.

The preview is a sample limited to 100 rows, not a complete source-data listing. A value missing from the sample isn't necessarily missing from the source. The preview icon is disabled while the lookup has no assigned fields.

1. In the **Fields** pane, go to **Advanced** > **Lookup**.
1. Select the table-shaped preview icon beside the lookup to inspect.
1. Verify the category labels and retrieved values in the **Preview** window.
1. Close the preview to return to configuration.

    :::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-preview-option.png" alt-text="Screenshot of the table-shaped preview icon beside a lookup under Advanced > Lookup in the Fields pane." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-preview-option.png":::

## Refresh lookup data

When a planning sheet loads, it automatically retrieves lookup data for any saved formula that uses it.

> [!NOTE]
> Creating a lookup on its own doesn't trigger data loading. The system only loads data when an active formula references the lookup. To verify a newly created lookup before adding it to a formula, use the **Preview** feature.

1. Ensure the lookup sheet or query contains the values you expect.
1. Select the **Sync** option in the target planning sheet footer.
1. Compare a known lookup result with the target value after the sync action completes. Open **Preview** if you need to inspect the lookup again.
1. If the formula still shows an earlier value, reopen the planning sheet and check again.
1. Verify a known value to validate the lookup result.

## Business case: Price forecast with advanced lookup

In this use case, you build a revenue forecast by using integrated planning with a lookup. This approach reduces error rates and updates both plans dynamically when lead times or market prices shift.

* **Planned Regional Sales**: Create a planning sheet to capture the planned quantity. Assign the row and column dimensions as per the following table.

    | Dimension type | Example |
    |---|---|
    | Row dimensions | - Region<br>- City<br>- Category<br>- SubCategory |
    | Column dimensions | - Year |

    Use this target planning sheet to create a lookup that retrieves price forecast values from the *Product Price Forecast* sheet.

    :::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/target-planning-sheet-dimension-assignments.png" alt-text="Screenshot of the data assignments in the target planning sheet." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/target-planning-sheet-dimension-assignments.png":::

* **Product Price Forecast**: Create a second planning sheet to forecast the product price and assign the row and column dimensions as per the following table.

    | Dimension type | Example |
    |---|---|
    | Row dimensions | - Category<br>- SubCategory<br>- Product |
    | Column dimensions | - Year<br>- Quarter |

    Use this planning sheet as the lookup source for the *Price Forecast* measure.

    :::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-source-planning-sheet-price-forecast.png" alt-text="Screenshot of a planning sheet with Category, SubCategory, and Product rows, Year and Quarter columns, and a Price Forecast measure." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-source-planning-sheet-price-forecast.png":::

1. Open the target *Planned Regional Sales* sheet, and expand the **Fields** and **Data** panes. Select **+ Add Lookup** in the **Fields** pane.
1. Expand the **Semantic Model** section in the **Data** pane, and assign the matching dimensions, that is, the *Category*, *SubCategory*, and *Year* to the **Category** bucket.
1. Expand the **From sheets** section and assign *Price Forecast* to the **Values** bucket. The lookup is now ready to use in formulas.
1. Select the **Preview** icon to view the data fetched by the lookup.

    :::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-configuration-data-preview.png" alt-text="Screenshot of the lookup preview option showing dimensions and the forecast measure." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-configuration-data-preview.png":::

1. In the Planning ribbon, go to **Insert Column** > **Formula**. To pull the *Price Forecast* into your sheet, enter the formula:

    ```
    LOOKUP("Lookup 2", "Price Forecast", [[Category], [SubCategory]], [[Year]])
    ```
     It matches values based on row categories (Category and SubCategory) and column categories (Year).

    > [!TIP]
    > When adding dimension names to your formula, press Ctrl + Space to open the suggestions menu and select them from the **References** tab instead of typing them manually.

    :::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-formula-price-forecast-measure.png" alt-text="Screenshot of a formula measure using lookup to fetch Price Forecast values by Category, SubCategory, and Year." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/lookup-formula-price-forecast-measure.png":::

1. Although the *Category* dimension is available in the lookup visual, the lookup only populates leaf values - in this example, price forecast for *SubCategory* rows. Set the **Row aggregation** type to **Sum** to roll up the lookup values to the *Category*, *City*, and *Region* levels.

    :::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/set-row-aggregation-sum.png" alt-text="Screenshot of setting the row aggregation to sum in formula measure settings." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/set-row-aggregation-sum.png":::

1. Multiply the *Quantity Plan* in the target planning sheet with the *Price Forecast* lookup values to project top-line revenue. Set the revenue formula's **Row aggregation** type to **Sum** so parent rows sum the calculated revenues instead of multiplying aggregated quantities by summed price forecasts.

    :::image type="content" source="../../media/planning-reference-formulas/lookup-functions/lookup/revenue-forecast-formula.png" alt-text="Screenshot of multiplying the price forecast with the quantity to get the revenue forecast." lightbox="../../media/planning-reference-formulas/lookup-functions/lookup/revenue-forecast-formula.png":::

## Important notes and limitations

* **Lookup names:** New lookups get names such as Lookup 1 and Lookup 2. In formulas, use the same name shown on the lookup card to reference them correctly.
* **Value fields:** A formula can retrieve only a value field available in that lookup. Use its original source name, not the formula's Title or an unrelated display label.
* **Complete matching:** Supply all the category values needed to identify a result, in order. Matching a shorter parent path doesn't automatically total the missing category levels.
* **Exact labels:** Differences in spelling, case, spacing, or period labels can prevent a match.
* **No-category lookups:** Configure at least one Category dimension. A lookup with no dimension values doesn't provide a matching result.
* **Aggregation:** Retrieved values can reflect source aggregation. Check the preview, especially for rates and other assumptions where summing multiple source records would be inappropriate.
* **Preview size:** The 100-row preview is a sample; it isn't a formula-result limit.
* **Missing matches:** A missing category combination or value field can produce a lookup error. Don't assume a missing match returns zero.
* **Source changes:** Recheck the configuration and formulas if source fields are renamed or removed. Deleting a lookup can invalidate formulas that reference it.
* **Refresh expectations:** Automatic loading isn't continuous live synchronization. Verify source updates and resulting formula values after refreshing.

## FAQ

### Where can I find the Lookup section?

Select a Planning visual in editing mode, open **Fields** > **Advanced.**

### Why isn't my source listed?

Check the **From Sheets** and **Queries** sections in the Data pane. Confirm that the source is available and that you can access its fields.

### Why is the preview icon disabled?

Assign fields to the lookup. For a relevant result, configure both **Category** and **Values**.

### Why does the preview say "Unable to resolve table relationships"**?**

Recheck the source and assigned fields, including any relationships needed to combine them. Retry after the source is ready. If the error persists, contact your support team.

### **Why doesn't my formula return a value?**

Ensure the lookup name used in the formula matches the auto-generated label. Check the original value field name, the dimension category order, and the exact labels. Verify that the complete row and column combination exists in the source planning sheet.

### **Why does my formula work in one cell but not another?**

Compare the row and column context in both cells. Extra hierarchy levels or a different category order can change the match. Try explicit lists to isolate the combination, for example, `LOOKUP("Lookup 1", "Forecast", ["North"], ["Bikes"])`.

### **Why is the returned number larger than expected?**

Check the selected measure and its aggregation. Confirm that your categories identify the intended level of detail, especially for exchange rates or unit costs.

### **Why is my source row missing in the preview?**

The preview option shows only a sample of up to 100 rows. Check the full source before concluding that the combination is missing.

### **Why is the result still stale even after refreshing?**

Confirm that the source itself has updated values. Use **Sync** or **Refresh Data**, then reopen the visual if needed and compare it to a known value.

### **Can I have more than one lookup?**

Yes. Select **Add Lookup** again and use the designated name for each lookup in the related formulas.

### **Does LOOKUP change the source data?**

No. It retrieves a value for use in a formula; it doesn't write the result back to the source.

### **Is this Excel VLOOKUP syntax?**

No. Use the supported LOOKUP syntax covered in earlier sections. Don't add Excel table ranges or column-number arguments.
