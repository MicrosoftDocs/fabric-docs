---
title: Insert Formula Columns in PowerTable Sheet
description: Create formula columns to calculate metrics, forecasts, and KPIs from your existing data. Explore this guide to insert them at the visual or database level.
#customer intent: As a data analyst, I want to insert a formula column so that I can derive business-specific metrics from my existing data.
ms.date: 07/11/2026
ms.topic: how-to
---

# Insert formula columns in PowerTable

Formula columns are calculated columns that you create from your data to derive business-specific metrics or calculations on the go. You can add them at the visual level or directly to your source database as a database column.

Common use cases for formula columns include calculating profit margins, tracking performance metrics, creating planning and forecasting calculations, generating status indicators, and building custom KPIs from existing data.

## Insert the formula column

1. To insert formula columns, select **PowerTable** > **Insert Column** > **Formula Column**.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-formula-columns/insert-formula-column.png" alt-text="Screenshot of PowerTable ribbon showing Insert Column dropdown with Formula Column selected.":::

1. Enter the column name.

1. Enter the required formula in the formula box.

    * When you place the cursor in the editor, a context assistant appears automatically with **Functions** and **References**. Or press **Ctrl** + **Space** to open it.
    * As you type, the suggestions narrow automatically.
    * Use the **References** tab to find and insert available columns from the current table into the formula.
    * Use the **Functions** tab to browse and insert supported functions, such as **SUM**, **MIN**, **MAX**, and **AVERAGE**, into the formula.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-formula-columns/enter-formula.png" alt-text="Screenshot of Add Formula Column pane showing Column Name Profit and formula input with References.":::

1. Specify the currency type and the number of decimal points to display.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-formula-columns/currency-decimal-options.png" alt-text="Screenshot showing US Dollar currency and Decimal Points set to 2 in formula column pane.":::

1. To add the formula column directly to the database, select the **Create a database column** checkbox. Then, choose the appropriate data type and attributes such as length, precision, or scale for the column in the target database.

    > [!NOTE]
    > Ensure you have the required permissions to the database you connect to, because you add a column directly to the source database.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-formula-columns/create-as-database-column.png" alt-text="Screenshot of Add Formula Column pane with Create a database column checkbox selected and Save button highlighted.":::

1. Select **Save**.

The formula column is added to the table.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-formula-columns/formula-column-added.png" alt-text="Screenshot of PowerTable with new Profit formula column added with currency in US dollars." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-formula-columns/formula-column-added.png":::

## Related content

For more information about the available formulas and functions, see [Formula Syntax](../planning-reference-formulas/conditional-statements.md).
