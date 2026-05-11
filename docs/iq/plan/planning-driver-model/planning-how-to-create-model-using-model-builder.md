---
title: Create a model by using model builder
description: Learn how to create a model by using model builder.
ms.date: 04/28/2026
ms.topic: how-to
#customer intent: As a user, I want to learn how to create a model by using the model builder.
---

# Create a model by using model builder

This article explains how to build a model for your data by using the [model builder](planning-concept-driver-model.md#model-builder).

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Sample scenario

This article shows screenshots from the brewery data sample in the following Planning sheet.

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/data-sample-for-model.png" alt-text="Screenshot of a sample brewery data set." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/data-sample-for-model.png":::

The first column contains a list of General Ledger (GL) account items for various quarters of the year 2026. This article shows how to create a sample Profit and Loss (P&L) model using this example.

>[!NOTE]
>Data can include both actuals and forecasts, and models can be configured to handle both closed and open periods. For more information, see [Hybrid row configuration](planning-how-to-configure-model-row-properties.md#hybrid-row-configuration).

## Objectives and approach

In this article, you:

* Learn how to group related line items into a hierarchical structure.
* Create formula or aggregate rows to calculate key financial metrics such as *Gross Revenue*, *Net Revenue*, *Total Cost of Goods Sold (COGS), Gross Profit*, *Operating Income (EBIT), Income Tax Expense*, and *Net Profit*.
* Build a reusable and scalable P&L model for your sample data.

## Create model

1. Go to the model builder by selecting **Model > Driver Model**, then select **Enable** in the pop-up window.

    :::image type="content" source="../media/planning-driver-model/planning-concept-driver-model/enable-model-builder.png" alt-text="Screenshot of enabling model builder from the Planning sheet." lightbox="../media/planning-driver-model/planning-concept-driver-model/enable-model-builder.png":::

    The driver model view opens. This view is where you build the model.

    :::image type="content" source="../media/planning-driver-model/planning-concept-driver-model/before-model.png" alt-text="Screenshot of model builder interface before a model is built." lightbox="../media/planning-driver-model/planning-concept-driver-model/before-model.png":::

1. Delete all rows except the topmost row (*All*) to start building your model from scratch. To delete rows, select all rows except the top row, then select **Delete**.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/delete-rows.png" alt-text="Screenshot of deleting all rows except the top row." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/delete-rows.png":::

    >[!TIP]
    >Use the **Select All** checkbox in the column header to select all rows, then clear the selection for the top row.

    The model looks like this image, with one row:

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/one-row-model.png" alt-text="Screenshot of model with only one row." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/one-row-model.png":::

1. Start with the top-level parent row in your model. Because the objective is to calculate *Net Profit*, rename the top row to **Net Profit** by double-selecting the **All** row and updating its name.
   
    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/rename-top-row.png" alt-text="Screenshot of renaming the top row." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/rename-top-row.png":::

### Add Child row

The net profit for this model is calculated using this formula:

```
Net Profit = Income Before Tax(EBT) - Income Tax Expense
```

This means that the *Net Profit* row needs two child rows: *Income Before Tax* and *Income Tax Expense*.

1. To add a child node, select the **+** icon next to the node. You can also select the node to which you want to add child rows, then select **Add Child** and [choose the type of row](planning-how-to-configure-model-row-properties.md#type) you want to add.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/add-child-row.png" alt-text="Screenshot of adding a child row." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/add-child-row.png":::

1. Add another child row for *Net Profit* and rename both rows.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/add-another-child-row.png" alt-text="Screenshot of adding another child row." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/add-another-child-row.png":::

### Row type configuration

1. The *Net Profit* row is a formula row. In **Type**, select **Formula**. Alternatively, you can select **Aggregate**.

    >[!NOTE]
    >Using **Aggregate** automatically aggregates the child rows, while **Formula** uses explicit row name references to perform the calculation. If row names change, make sure to update the formula accordingly.

1. Select **Configuration**. Choose **Subtract** from the side panel that opens automatically.
1. Select **Apply**.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/row-type-configuration.png" alt-text="Screenshot of configuring the top row." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/row-type-configuration.png":::

1. Configure the type of other child rows as needed for your data. Select **Data Source** to retrieve values from the source data, or choose **Data Input** to enter values manually.
1. For a **Data Source** row, select the corresponding row from the data source in the side panel to retrieve the values. If you choose the **Data Input** type instead, enter the values manually in the side panel.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/row-type-for-child-rows.png" alt-text="Screenshot of configuring the child rows." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/row-type-for-child-rows.png":::

After you complete these steps, you have a calculated row at the top level.

Repeat this process as needed to add and configure more child nodes.

### Add Formula type row

For some rows, the **Formula** type is more suitable than the **Aggregate** type.

```
Income Before Tax (EBT) = Operating Income (EBIT)
                          + Interest Income
                          - Interest Expense
                          + Other Non-Operating Income
```

For *Income Before Tax (EBT)*,

1. Create four child rows.
1. Configure the **Type** as *Data Source* for the child rows if you have data in the source.
1. For each row, select the corresponding row from the data source.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/another-row-type-configuration.png" alt-text="Screenshot of configuring another set of child rows." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/another-row-type-configuration.png":::

1. Configure the parent row, Income Before Tax (EBT), as a **Formula** type.
1. Enter the formula in the formula box by selecting and referencing the required rows. As you enter text, suggestions appear automatically, or use <kbd>Ctrl</kbd>+<kbd>Space</kbd> to view them. Switch between the **References** and **Functions** tabs to select row references or functions.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/formula-row.png" alt-text="Screenshot of configuring a formula type row." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/formula-row.png":::

1. Complete other configurations for the row and select **Apply**.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/mini-row-structure.png" alt-text="Screenshot of a small row structure." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/mini-row-structure.png":::

### Build further rows

To build out the rest of the example for this article, repeat the row building process to create and configure the following row structures.

```
Income Before Tax (EBT)
    Operating Income (EBIT)
        Gross Profit
            Net Revenue
                Gross Revenue
                    Volume
                    Revenue per Barrel
                Federal & State Excise Taxes
                Distributor Allowances & Rebates
                Returns & Breakage
            Total COGS
        Total Operating Expenses
```

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/build-further-rows.png" alt-text="Screenshot of building further rows." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/build-further-rows.png":::

>[!TIP]
>You can also use the [Bulk insert](#add-multiple-rows-with-bulk-insert) feature to instantly build the model.

### Add sibling row

To add a new row at the same level as an existing one, select the row, then select **Add Sibling**. This action creates a sibling row for the selected row.

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/add-sibling-row.png" alt-text="Screenshot of adding a sibling row." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/add-sibling-row.png":::

In the example above, two line items, *Distributor Allowances & Rebates* and *Returns & Breakage*, are to be added at the same level as *Federal & State Excise Taxes*.

Add them as sibling rows to the first line item.

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/sibling-rows-added-for-row.png" alt-text="Screenshot of sibling rows added." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/sibling-rows-added-for-row.png":::

Repeat the same steps to build the *Total COGS* section and complete the model. Optionally, use the **Bulk Insert** and **Bulk Edit** features to speed up the process.

## Add multiple rows with bulk insert

Use **Bulk Insert** to add multiple rows at once or build the entire model in one step. This feature is useful when you already have the model structure planned or prepared.

1. Select the row under which you want to add new rows.
1. Select **Bulk Insert**.
1. Enter the row names, with each row on a new line.
1. Use the **Tab** key to create child rows and define the hierarchy.
1. Choose whether to insert the rows as **Child** or **Sibling** rows to the selected row.
1. Select **Add** to apply the changes.

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/bulk-insert-rows.png" alt-text="Screenshot of inserting rows in bulk." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/bulk-insert-rows.png":::

The rows are added under *Total COGS* based on the defined structure. Update the **Type** and **Configuration** for each row as needed.

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/result-of-bulk-insert.png" alt-text="Screenshot of bulk inserted rows." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/result-of-bulk-insert.png":::

### Aggregation

The **Aggregation** property is typically set to *Sum* to roll up column values across the period from January to December. For rows that represent rates or percentages, set it to *Average (Children)*.

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/column-aggregation.png" alt-text="Screenshot of configuring period values aggregation." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/column-aggregation.png":::

## Edit multiple rows with bulk edit

If multiple rows share common settings, use **Bulk Edit** to apply formatting to all of them at once.

1. Select the rows that you want to format.
1. Select **Bulk Edit**.
1. In the side panel, enter the required settings, such as scale, decimal points, prefix, suffix, desired trend, simulation settings, and description.
1. Select **Apply** to apply these settings to all selected rows at once.

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/bulk-edit.png" alt-text="Screenshot of editing rows in bulk." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/bulk-edit.png":::

## Finish model

The completed model looks like this example:

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/completed-model.png" alt-text="Screenshot of completed model." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/completed-model.png":::

The model you build applies to the **Open Period** by default, unless you modify specific rows by toggling to the **Open Period**.

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/toggle-open-period.png" alt-text="Screenshot of toggling on to open period." lightbox="../media/planning-driver-model/planning-how-to-create-model-using-model-builder/toggle-open-period.png":::

## Build model in one step

If you have the complete model structure written in a text editor, build the entire model in one step by copying and pasting it with [bulk insert](#add-multiple-rows-with-bulk-insert).

Then configure the **Type**, **Configuration**, formatting, and aggregation, either individually or by using [bulk edit](#edit-multiple-rows-with-bulk-edit).

The full model for the sample scenario is shown here:

```
Income Before Tax (EBT)
    Operating Income (EBIT)
        Gross Profit
            Net Revenue
                Gross Revenue
                    Volume
                    Revenue per Barrel
                Federal & State Excise Taxes
                Distributor Allowances & Rebates
                Returns & Breakage
            Total COGS
                Brewing Materials
                Packaging
                Water & Utilities
                Brewing & Production Labor (Input)
                Plant Overhead & Maintenance (Input)
                Inbound Freight & Warehousing (Input)
                Brewery Depreciation (Input)
        Total Operating Expenses
            Selling & Marketing (Input)
            Outbound Distribution & Logistics (Input)
            General & Administrative (Input)
            Research & Product Development (Input)
            Non-Production D&A (Input)
            Other Operating Expenses (Input)
    Interest Income
    Interest Expense
    Other Non-Operating Income
Income Tax Expense
    Effective Tax Rate
```

You can reuse the model across different datasets that follow the same business logic. Maintain and scale the model by adding or removing rows, and adjusting row configurations as needed to reflect changing business needs.

This approach reduces the need to recreate formulas from scratch and ensures consistency across datasets that follow the same logic. Features such as **Bulk Insert** and **Templates** streamline this process and enable efficient model building at scale.

## Next steps

[Create templates for reusable row structures](planning-how-to-create-templates.md)

## Related content

* [Configure row properties in the model](planning-how-to-configure-model-row-properties.md)
* [Create a driver model](planning-how-to-create-driver-model.md)
