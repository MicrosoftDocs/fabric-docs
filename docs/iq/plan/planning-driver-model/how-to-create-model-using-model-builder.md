---
title: Create a model using Model Builder
description: Learn how to create a model using Model Builder
ms.date: 04/25/2026
ms.topic: how-to
#customer intent: As a user, I want to learn how to create a model using the Model Builder.
---

# Create a model using Model Builder

In this article, you learn how to build a model for your data using the Model Builder.

Consider the brewery data sample shown below in the planning sheet.

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/data-sample-for-model.jpg" alt-text="Screenshot of a sample brewery data set." lightbox="../media/planning-model-builder/create-model-using-model-builder/data-sample-for-model.jpg":::

The first column contains a list of General Ledger (GL) account items for various quarters of the year 2026. In this module, you learn how to create a sample Profit and Loss (P\&L) model using this example.&#x20;

>[!Note]
>Data can include both actuals and forecasts, and models can be configured to handle both closed and open periods.
>To learn more, refer to [Hybrid row configuration](./how-to-configure-row-properties-for-model.md/#hybrid-row-configuration).

## Objectives and approach

* You learn how to group related line items into a hierarchical structure.
* You create formula or aggregate rows to calculate key financial metrics such as *Gross Revenue*, *Net Revenue*, *Total Cost of Goods Sold (COGS), Gross Profit*, *Operating Income (EBIT), Income Tax Expense*, and *Net Profit*.
* Finally, you build a reusable and scalable P\&L model for your sample data, step by step.

## Create model

1. Go to the Model Builder by selecting **Model > Driver Model** and then selecting **Enable** in the pop-up.

    :::image type="content" source="../media/includes/enable-model-builder.png" alt-text="Screenshot of enabling model builder from the planning sheet.":::

    The Driver Model view opens, where you build the model.

    :::image type="content" source="../media/includes/before-model.png" alt-text="Screenshot of model builder interface before a model is built.":::

1. Delete all rows except the topmost row (*All)* to start building your model from scratch. To delete rows, select all rows except the top row and then select **Delete.**

    :::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/delete-rows.png" alt-text="Screenshot of deleting all rows except the top row.":::

    >[!TIP]
    >Use the **Select All** checkbox in the column header to select all rows, then clear the selection for the top row.

    The model will look like this, with one row:

    :::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/one-row-model.jpg" alt-text="Screenshot of model with only one row.":::

1. Start with the top-level parent row in your model. Since the objective is to calculate *Net Profit*, rename the top row to ***Net Profit*** by double-clicking the ***All*** row and updating its name.
   
    :::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/rename-top-row.png" alt-text="Screenshot of renaming the top row.":::

### Add Child row

The net profit or the net income for this model can be calculated using the formula:

```text
Net Profit = Income Before Tax(EBT) - Income Tax Expense
```

This means the *Net Profit* row needs two child rows: *Income Before Tax* and *Income Tax Expense*.

To add a child node, select the **+** icon next to the node. You can also select the node to which you want to add child rows, then select **Add Child** and [choose the type of row](./how-to-configure-row-properties-for-model.md/#type) you want to add.

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/add-child-row.png" alt-text="Screenshot of adding a child row.":::

Add another child row for *Net Profit* and rename both rows.

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/add-another-child-row.png" alt-text="Screenshot of adding another child row.":::

### Row type configuration

* The *Net Profit* row is a formula row. In **Type**, select **Formula**. Alternatively, you can select **Aggregate**.
* Select **Configuration**. Choose **Subtract** from the side panel that opens automatically.
* Select **Apply**.

    :::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/row-type-configuration.png" alt-text="Screenshot of configuring the top row.":::

>[!Note]
>Using **Aggregate** automatically aggregates the child rows, while **Formula** uses explicit row name references to perform the calculation.
>If row names change, make sure to update the formula accordingly.

* Similarly, configure the child rows' type as per your requirements. Select ***Data Source*** to retrieve values from the source data, or choose ***Data Input*** to enter values manually.
* For a **Data Source** row, select the corresponding row from the data source in the side panel to retrieve the values. If you choose the **Data Input** type instead, enter the values manually in the side panel.

    :::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/row-type-for-child-rows.png" alt-text="Screenshot of configuring the child rows.":::

By following the above steps, you have created a calculated row at the top level.

Now, repeat the same process to add additional child nodes and continue configuring their row type and configuration settings.

### Add Formula type row

For some rows, selecting the **Formula** type is more suitable than using the **Aggregate** type.

```text
Income Before Tax (EBT) = Operating Income (EBIT)
                          + Interest Income
                          - Interest Expense
                          + Other Non-Operating Income
```

For *Income Before Tax (EBT)*,

* Create four child rows.
* Configure the **Type** as *Data Source* for the child rows if you have data in the source.
* For each row, select the corresponding row from the data source.

    :::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/another-row-type-configuration.png" alt-text="Screenshot of configuring another set of child rows.":::

* For the parent row, Income Before Tax (EBT)*, configure it as **Formula** type.
* Enter the formula in the formula box by selecting and referencing the required rows. As you type, suggestions appear automatically, or use Ctrl + Space to view them. You can switch between the **References** and **Functions** tabs to select row references or functions.

    :::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/formula-row.png" alt-text="Screenshot of configuring a formula type row.":::

* Complete other configurations for the row and select **Apply**.

    :::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/mini-row-structure.png" alt-text="Screenshot of a small row structure.":::

### Build further rows

Use the steps described above to create and configure additional row structures.

```text
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

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/build-further-rows.png" alt-text="Screenshot of building further rows.":::

>[!TIP]
>Alternatively, use the [**Bulk Insert**](#add-multiple-rows-using-bulk-insert) feature to instantly build the model.

### Add Sibling row

To add a new row at the same level as an existing one, select the row, and then select **Add Sibling**. This creates a sibling row for the selected row.

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/add-sibling-row.jpg" alt-text="Screenshot of adding a sibling row.":::

In the example above, two line items, *Distributor Allowances & Rebates* and *Returns & Breakage*, are to be added at the same level as *Federal & State Excise Taxes*.

You can add two of them as sibling rows to the first line item.

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/sibling-rows-added-for-row.png" alt-text="Screenshot of sibling rows added.":::

Repeat the same steps to build the *Total COGS* section and complete the model. You can also use the **Bulk Insert** and **Bulk Edit** features to speed up the process.

## Add multiple rows using Bulk Insert

Use **Bulk Insert** to add multiple rows at once or build the entire model in one step. This is useful when you already have the model structure planned or prepared.

1. Select the row under which you want to add new rows.
1. Select **Bulk Insert**.
1. Enter the row names, with each row on a new line.
1. Use the **Tab** key to create child rows and define the hierarchy.
1. Choose whether to insert the rows as **Child** or **Sibling** rows to the selected row.
1. Select **Add** to apply the changes.

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/bulk-insert-rows.png" alt-text="Screenshot of inserting rows in bulk.":::

The rows are added under *Total COGS* based on the defined structure. Update the type and configuration for each row as needed.

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/result-of-bulk-insert.png" alt-text="Screenshot of bulk inserted rows.":::

### Aggregation

The **Aggregation** property is typically set to *Sum* to roll up column values across the period from January to December. For rows that represent rates or percentages, set it to *Average (Children)*.

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/column-aggregation.jpg" alt-text="Screenshot of configuring period values aggregation.":::

## Edit multiple rows using Bulk Edit

If multiple rows share common settings, use **Bulk Edit** to format them all at once.

1. Select the rows that you want to format.
1. Select **Bulk Edit**.
1. In the side panel, enter the required settings, such as scale, decimal points, prefix, suffix, desired trend, simulation settings, and description.
1. Select **Apply** to apply these settings to all selected rows at once.

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/bulk-edit.jpg" alt-text="Screenshot of editing rows in bulk.":::

## Finish model

The completed model looks like this:

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/completed-model.png" alt-text="Screenshot of completed model.":::

The model you build applies to the **Open Period** by default, unless you modify specific rows by toggling to the **Open Period**.

:::image type="content" source="../media/planning-model-builder/create-model-using-model-builder/toggle-open-period.png" alt-text="Screenshot of toggling on to open period.":::

## Build model in one step

If you have the complete model structure handy in a notepad, you can build the entire model in one step by copy-pasting it through [**Bulk Insert**](#add-multiple-rows-using-bulk-insert).

You can then configure the type, configuration, formatting, and aggregation individually or through [**Bulk Edit**](#edit-multiple-rows-using-bulk-edit).

```text
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

You can reuse the model across different datasets that follow the same business logic. Maintain and scale the model by adding or removing rows and/or adjusting row configurations as needed to reflect changing business needs.&#x20;

This approach reduces the need to recreate formulas from scratch and ensures consistency across datasets that follow the same logic. Features such as **Bulk Insert** and **Templates** help streamline this process and enable efficient model building at scale.

## Next step

* [Create templates for reusable row structures](./how-to-create-templates-for-reusable-row-structures.md).

## Related content

* [Configure row properties in the model](./how-to-configure-row-properties-for-model.md).
* [Create a driver-based model](./how-to-create-driver-based-model.md).
