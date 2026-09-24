---
title: Filter Rows in Infobridge
description: Learn how to filter rows in a query in Infobridge to retain only the data required for analysis and reporting.
ms.date: 06/23/2026
ms.topic: how-to
#customer intent: As a user, I want to filter rows in a query so that only records that meet specific conditions are included in my analysis and reporting.
---

# Filter rows in Infobridge

Use the **Filter Rows** transformation to keep only rows that meet specified conditions.

Filtering rows reduces the amount of data in a query and ensures that only relevant records are available for analysis and reporting.

## Filter rows

The following example filters a query to keep only rows where **Country** is **United States of America** and **Sum of COGS** is greater than **500250**.

1. On the **Transform** tab, select **Filter Rows**.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-filter-rows/filter-rows-source-data.png" alt-text="Query results before applying filters. The query contains rows from multiple countries and COGS values." lightbox="../media/infobridge-transformations/infobridge-how-to-filter-rows/filter-rows-source-data.png":::

    The **Filter Rows** dialog opens.

1. Enter the following example filters. For a full list of filter options, see [Filter dialog options](#options-for-filter-dialog) later in the article.
    1. In **Column Name**, select **Country**.
    1. In **Operator**, select **Is**.
    1. In **Value**, select **United States of America**.
    1. Select **Add Filter**.
    1. Select **And**.
    1. In **Column Name**, select **Sum of COGS**.
    1. In **Operator**, select **Is greater than**.
    1. In **Value**, enter **500250**.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-filter-rows/filter-rows-configuration.png" alt-text="Filter Rows dialog configured to retain rows where Country is United States of America and Sum of COGS is greater than 500250." lightbox="../media/infobridge-transformations/infobridge-how-to-filter-rows/filter-rows-configuration.png":::

1. Select **Apply**.

After you apply the filter, only rows that satisfy the specified conditions remain in the query results.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-filter-rows/filter-rows-results.png" alt-text="Query results after applying filters. Only rows that meet the Country and Sum of COGS filter conditions remain." lightbox="../media/infobridge-transformations/infobridge-how-to-filter-rows/filter-rows-results.png":::

The applied filter appears in **Performed Steps** and applies to subsequent transformations, calculations, and reporting scenarios.

## Options for filter dialog

The filter dialog supports the following options:

- **Condition**: Defines how to combine multiple filter conditions.
  - Use **And** when all conditions must be true.
  - Use **Or** when any condition is true.
- **Column Name**: Select the measure or dimension to filter on.
- **Operator**: Select the condition to apply.
  - For text columns, operators include **Is**, **Is not**, **In**, and **Not in**.
  - For numeric columns, operators include **Is**, **Is not**, **Less than**, **Greater than**, **Less than or equal to**, and **Greater than or equal to**.
- **Value**: Enter a value or select one from the list.
- **Add Filter**: Add more filter conditions.
