---
title: Merge Queries
description: Learn how to merge queries in Infobridge to combine measures from multiple queries that use the same row and column dimensions.
ms.date: 07/22/2026
ms.topic: how-to
#customer intent: As a user, I want to merge multiple queries so that I can analyze measures from multiple queries in a single report.
---

# Merge queries in Infobridge

Use **Merge Query** to combine measures from multiple queries into a single query.

**Merge Query** simplifies reporting by combining related measures while preserving the existing row and column dimensions.

> [!IMPORTANT]
> **Merge Query** works only when all selected queries use the same row and column dimensions. The queries can contain different measures.

**Merge Query** creates a new query. It doesn't modify the original queries.

## Example scenario

The following example uses two product-based queries.

Both queries use the same ProductName and Category dimensions but contain different measures.

The **Product Sales query** contains sales measures.

| ProductName | Category | Units | Sales Amount |
|--------------|--------------------------|------:|-------------:|
| Camera M300 | Cameras and camcorders | 415 | 78.28K |
| Camera M200 | Cameras and camcorders | 362 | 68.06K |
| Camera X300 | Cameras and camcorders | 381 | 71.25K |

The **Product Pricing query** contains pricing measures.

| ProductName | Category | Unit Price | Unit Cost |
|--------------|--------------------------|-----------:|----------:|
| Camera M300 | Cameras and camcorders | 27.52K | 12.66K |
| Camera M200 | Cameras and camcorders | 22.56K | 10.37K |
| Camera X300 | Cameras and camcorders | 23.18K | 10.66K |

After you merge the queries, the new query contains the shared dimensions with measures from both queries.

| ProductName | Category | Units | Sales Amount | Unit Price | Unit Cost |
|--------------|--------------------------|------:|-------------:|-----------:|----------:|
| Camera M300 | Cameras and camcorders | 415 | 78.28K | 27.52K | 12.66K |
| Camera M200 | Cameras and camcorders | 362 | 68.06K | 22.56K | 10.37K |
| Camera X300 | Cameras and camcorders | 381 | 71.25K | 23.18K | 10.66K |

## Merge queries

This example merges the **Product Sales query** and **Product Pricing query**.

The **Product Sales query** contains the shared dimensions **ProductName** and **Category**, together with the **Units** and **Sales Amount** measures.

:::image type="content" source="../media/infobridge-transform-queries/how-to-merge-query/product-sales-query.png" alt-text="Screenshot of the Product Sales query showing ProductName, Category, Units, and Sales Amount." lightbox="../media/infobridge-transform-queries/how-to-merge-query/product-sales-query.png":::

The **Product Pricing query** uses the same dimensions and contains the **Unit Price** and **Unit Cost** measures.

:::image type="content" source="../media/infobridge-transform-queries/how-to-merge-query/product-pricing-query.png" alt-text="Screenshot of the Product Pricing query showing ProductName, Category, Unit Price, and Unit Cost." lightbox="../media/infobridge-transform-queries/how-to-merge-query/product-pricing-query.png":::

To merge queries:

1. On the **Home** ribbon, select **Merge Query**.

1. In the **Merge Query** dialog, add the queries that you want to merge.

1. For the **Product Sales query**, select the measures to include in the merged query.

   In this example, select:

   - **Sum of Units**
   - **Sum of Sales Amount**

   :::image type="content" source="../media/infobridge-transform-queries/how-to-merge-query/merge-query-select-first-query.png" alt-text="Screenshot of the Merge Query dialog showing the Product Sales query with the Sum of Units and Sum of Sales Amount measures selected." lightbox="../media/infobridge-transform-queries/how-to-merge-query/merge-query-select-first-query.png":::

1. For the **Product Pricing query**, select the measures to include in the merged query.

   In this example, select:

   - **Sum of Unit Price**
   - **Sum of Unit Cost**

   :::image type="content" source="../media/infobridge-transform-queries/how-to-merge-query/merge-query-select-second-query.png" alt-text="Screenshot of the Merge Query dialog showing the Product Pricing query with the Sum of Unit Price and Sum of Unit Cost measures selected." lightbox="../media/infobridge-transform-queries/how-to-merge-query/merge-query-select-second-query.png":::

1. Select **Apply**.

   :::image type="content" source="../media/infobridge-transform-queries/how-to-merge-query/merge-query-ready-to-apply.png" alt-text="Screenshot of the Merge Query dialog with both queries configured and ready to merge." lightbox="../media/infobridge-transform-queries/how-to-merge-query/merge-query-ready-to-apply.png":::

    Infobridge creates a new merged query.

    The merged query preserves the shared row and column dimensions and combines the measures from all selected queries.

    :::image type="content" source="../media/infobridge-transform-queries/how-to-merge-query/merged-query-results.png" alt-text="Screenshot of the merged query showing ProductName, Category, Units, Sales Amount, Unit Price, and Unit Cost." lightbox="../media/infobridge-transform-queries/how-to-merge-query/merged-query-results.png":::
