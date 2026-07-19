---
title: Configure Group By Transformations
description: Learn how to aggregate and summarize data by using Group by transformations.
ms.date: 06/15/2026
ms.topic: how-to
#customer intent: As a user, I want to aggregate measures and summarize data by one or more dimensions using Group by transformations.
---

# Configure Group by transformations

Use Group by transformations to summarize data and calculate aggregated metrics such as totals, averages, minimum values, and maximum values. Group by transformations aggregate measures based on selected dimensions to create summarized datasets for analysis and reporting.

For example, Group by can calculate metrics such as average salary by region, total sales by quarter, or minimum experience by department.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Sample data

The following sample data set is used for the examples in this article.

Sample employee table:

| Employee ID | Department | Region | Salary | Experience |
|---|---|---|---|---|
| Employee_7916 | Operations | North America | 86907 | 12.4 |
| Employee_9890 | Operations | North America | 88255 | 2.0 |
| Employee_2263 | Sales | North America | 37957 | 3.0 |
| Employee_7835 | Marketing | North America | 112324 | 10.5 |
| Employee_5774 | HR | North America | 105082 | 6.4 |
| Employee_9297 | IT | EMEA | 65848 | 11.9 |
| Employee_5061 | Operations | EMEA | 62345 | 5.6 |
| Employee_6237 | Operations | EMEA | 91959 | 6.8 |
| Employee_1004 | HR | EMEA | 57706 | 13.6 |
| Employee_2950 | Finance | APAC | 114873 | 14.4 |
| Employee_8722 | Marketing | APAC | 51200 | 9.2 |
| Employee_8165 | Marketing | APAC | 113498 | 6.6 |
| Employee_2388 | IT | APAC | 58881 | 14.0 |
| Employee_6852 | Operations | APAC | 64887 | 10.8 |
| Employee_7678 | Operations | APAC | 87371 | 2.5 |

Summary of aggregated data:

| Region | Avg Salary | Headcount |
|---|---|---|
| North America | 86105 | 5 |
| EMEA | 69464.5 | 4 |
| APAC | 81785 | 6 |

## Open Group by

Open **Group by** from the **Transform** ribbon to configure aggregations and summarize data.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-interface.png" alt-text="Screenshot of the Group by transformation in Infobridge." lightbox="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-interface.png":::

## Configure Group by for a single measure

Use a single aggregation to summarize one measure by a selected dimension.

1. Open **Group by**.

1. Select **Quarter** from the **Category** dropdown menu.

1. Select **Minimum** from the **Operations 1** dropdown menu.

1. Select **InterestRate** from the **Values** dropdown menu.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-single-measure-configuration.png" alt-text="Screenshot of Group by configured with a Minimum aggregation for InterestRate by Quarter." lightbox="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-single-measure-configuration.png":::

1. Select **Apply**.

The results display the minimum interest rate for each quarter.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-single-measure-results.png" alt-text="Screenshot of grouped results displaying the minimum interest rate by quarter." lightbox="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-single-measure-results.png":::

## Configure Group by for multiple measures

Use multiple aggregations to summarize more than one measure within the same transformation.

1. Open **Group by**.

1. Select **Quarter** from the **Category** dropdown menu.

1. Configure the first aggregation: **Minimum** for **InterestRate**

1. Select **Add Aggregation**.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-measures-configuration.png" alt-text="Screenshot of the first aggregation configured for InterestRate. The Add option is highlighted." lightbox="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-measures-configuration.png":::

1. Configure the second aggregation: **Average** for **COGS**.

1. Select **Add Aggregation** again.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-measures-configuration-adding-second-measure.png" alt-text="Screenshot of the second aggregation configured for COGS. The Add option is highlighted." lightbox="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-measures-configuration-adding-second-measure.png":::

1. Configure the third aggregation: **Sum** for **Sales**

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-measures-configuration-added-third-measure.png" alt-text="Screenshot of the third aggregation configured for Sales." lightbox="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-measures-configuration-added-third-measure.png":::

1. Select **Apply**.

    The results display aggregated values for all configured measures.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-measures-results.png" alt-text="Screenshot of grouped results displaying multiple aggregated measures." lightbox="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-measures-results.png":::

## Configure Group by for multiple dimensions

Use multiple dimensions to create more detailed aggregations.

1. Open **Group by**.

1. Select multiple dimensions from the **Category** dropdown menu. For example,

   - **Country**
   - **Quarter**

1. Configure the first aggregation. For example:

   - **Maximum** for **InterestRate**

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-dimensions-configuration.png" alt-text="Screenshot of Quarter and Country selected in the Category dropdown menu with a Maximum aggregation configured for InterestRate." lightbox="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-dimensions-configuration.png":::

1. Configure other aggregations. For example:

   - **Sum** for **Sales**
   - **Average** for **COGS**

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-dimensions-configuration-added-additional-operations.png" alt-text="Screenshot showing additional aggregations configured for Sales and COGS." lightbox="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-dimensions-configuration-added-additional-operations.png":::

1. Select **Apply**.

    The results display aggregated measures for each dimension combination.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-dimensions-results.png" alt-text="Screenshot of summarized data grouped by multiple dimensions." lightbox="../media/infobridge-transformations/infobridge-how-to-group-by/group-by-multiple-dimensions-results.png":::
