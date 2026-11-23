---
title: "Data Warehouse Tutorial: AI Functions in a Warehouse"
description: "In this tutorial, learn how to use built-in AI functions in T-SQL to classify, extract, translate, and enrich data in a warehouse table."
ms.reviewer: jovanpop
ms.date: 09/14/2026
ms.topic: how-to
---

# Tutorial: Use AI functions in a warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In this tutorial, you learn how to use built-in [AI functions](ai-functions.md) in T-SQL to reason about warehouse table data in natural language. Use the `dbo.fact_sale` table to explore AI functions in simple `SELECT` queries, use them in a more advanced analytics query, and persist their results into columns.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). To complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse](tutorial-create-warehouse.md)
> 1. [Ingest data into a Warehouse](tutorial-ingest-data.md)

## Explore data with AI functions

In this task, learn how to use a few of the built-in AI functions in simple `SELECT` queries to explore what they return, without changing the table.

Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

### Extract categories from description

1. On the **Home** ribbon, select **New SQL query**.

1. In the query editor, paste the following code. The code uses `AI_EXTRACT` to pull the color and size out of descriptions such as `Alien officer hoodie (Black) XXL`. `AI_EXTRACT` returns a JSON object, so use `OPENJSON` to turn the attributes into separate columns.

    ```sql
    -- Extract color and size attributes.
    SELECT
        SaleKey,
        Description,
        extracted.Color,
        extracted.Size
    FROM dbo.fact_sale
    CROSS APPLY OPENJSON(AI_EXTRACT(Description, 'Color', 'Size'))
        WITH (Color varchar(50), Size varchar(20)) AS extracted;
    ```

1. Run the query.

1. When execution completes, rename the query as `Color & Size Extraction`. Verify that `Color` and `Size` are populated in separate columns.

### Format description as HTML

1. Create a new query, paste the following code, and run it. The code uses `AI_GENERATE_RESPONSE` to rewrite `Description` as an HTML product summary with a key attribute list, ready to render on a web page.

    ```sql
    -- Generate a catalog description formatted as HTML, with a summary and an attribute list.
    SELECT
        SaleKey,
        Description,
        AI_GENERATE_RESPONSE(
            'Rewrite as a short e-commerce catalog description. Format the result as HTML: wrap the summary in a <p> tag, then list key attributes as a <dl>, with each <dt> label bolded using <strong> and followed by its <dd> value.',
            Description
        ) AS CatalogDescription
    FROM dbo.fact_sale;
    ```

1. Rename the query as `Short Catalog Description Generation`. Inspect `CatalogDescription` and confirm it includes the requested `<p>`, `<dl>`, `<dt>`, and `<dd>` elements.

### Summarize sales item information

1. Create a new query, paste the following code, and run it. The code uses `AI_GENERATE_RESPONSE` to turn numeric columns, instead of `Description`, into a plain-text summary of the sales item.

    ```sql
    -- Summarize each sales item in plain text, based on numeric columns only.
    DECLARE @prompt nvarchar(max) = N'Summarize this sales item in one short sentence for a business report.';

    SELECT
        *,
        AI_GENERATE_RESPONSE(
            @prompt,
            CONCAT(
                'Package: ', Package,
                '. Quantity: ', Quantity,
                '. Dry items: ', TotalDryItems,
                '. Chiller items: ', TotalChillerItems,
                '. Unit price: ', UnitPrice,
                '. Tax rate: ', TaxRate,
                '. Profit: ', Profit,
                '. Total including tax: ', TotalIncludingTax
            )
        ) AS SalesItemSummary
    FROM dbo.fact_sale;
    ```

1. Rename the query as `Sales Item Summary Generation`. Read a few `SalesItemSummary` values and confirm they reflect the numeric columns in the same row.

### Determine priority of each sales item

In this task, use `AI_GENERATE_RESPONSE` in a more advanced query that combines several columns to support a business decision, instead of reasoning about a single column.

1. Create a new query, paste the following code, and run it. The code combines the invoice date, the delivery date, a reference date, the line total, the profit, and the number of chiller items that need refrigerated handling into one input, then asks AI to return a priority score that blends these signals into one number. `fact_sale` holds historical sales, so `@AsOfDate` stands in for the current business date you'd use in a live fulfillment queue.

    ```sql
    -- Score sales items for fulfillment priority based on invoice-to-delivery time, line total, profit, and chiller items.
    DECLARE @AsOfDate date = '2016-05-01';
    DECLARE @prompt nvarchar(max) = N'Given the invoice date, delivery date, reference date, line total, profit, and number of chiller items below, return a single integer priority score from 1 (low) to 100 (urgent) for sales-item fulfillment. Consider how much time was allowed from invoice to delivery, and how close the delivery date is to the reference date. Larger line totals, closer delivery dates, higher profit, and more chiller items should raise the score. Return only the number.';

    SELECT
        SaleKey,
        InvoiceDateKey,
        DeliveryDateKey,
        TotalIncludingTax,
        Profit,
        TotalChillerItems,
        TRY_CAST(AI_GENERATE_RESPONSE(
            @prompt,
            CONCAT(
                'Invoice date: ', CONVERT(char(10), InvoiceDateKey, 23),
                '. Delivery date: ', CONVERT(char(10), DeliveryDateKey, 23),
                '. Reference date: ', CONVERT(char(10), @AsOfDate, 23),
                '. Line total: ', TotalIncludingTax,
                '. Profit: ', Profit,
                '. Chiller items: ', TotalChillerItems
            )
        ) AS int) AS PriorityScore
    FROM dbo.fact_sale
    ORDER BY PriorityScore DESC;
    ```

1. Rename the query as `Sales Item Fulfillment Priority Scoring`. Confirm `PriorityScore` values fall between 1 and 100, with the highest scores sorted first.

## Persist AI results

The examples so far return AI results in a `SELECT`. To reuse those results without recomputing them every time, write them back with `UPDATE`.

### Fix grammar errors in description

1. Create a new query, paste the following code, and run it. The code uses `AI_FIX_GRAMMAR` to correct `Description` in place, keeping the original text whenever AI has nothing to fix.

    ```sql
    -- Fix grammar issues in the description, in place.
    UPDATE dbo.fact_sale
    SET Description = ISNULL(AI_FIX_GRAMMAR(Description), Description)
    WHERE Description IS NOT NULL;
    ```

1. Rename the query as `Grammar Correction Update`. Compare a few rows where `Description` changed and confirm the correction is accurate.

### Generate new columns

This task first adds two destination columns, then populates them in a single update.

1. Create a new query, paste the following code, and run it. The code adds columns for a translated description and a product category.

    ```sql
    -- Add columns for the translated description and the product category.
    ALTER TABLE dbo.fact_sale ADD DescriptionFr nvarchar(max) NULL, ProductCategory nvarchar(50) NULL;
    ```

1. Rename the query as `Add Translation & Category Columns`.

1. Create a new query, paste the following code, and run it. The code populates both columns in a single update, using `AI_TRANSLATE` for `Description` and `AI_CLASSIFY` to sort each row into a fixed set of product categories that match what's actually in this table, such as novelty mugs, apparel, and packaging supplies.

    ```sql
    -- Populate the translated description and product category columns.
    UPDATE dbo.fact_sale
    SET
        DescriptionFr = AI_TRANSLATE(Description, 'fr'),
        ProductCategory = AI_CLASSIFY(
            Description,
            'Apparel', 'Footwear', 'Novelty & Gifts', 'Packaging Materials', 'Toys & Costumes', 'Office Supplies'
        )
    WHERE Description IS NOT NULL;
    ```

1. Rename the query as `Populate Translation & Category Columns`. Confirm `DescriptionFr` and `ProductCategory` are populated for every row.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create a query with the visual query builder in a Warehouse](tutorial-visual-query.md)

## Related content

- [AI functions in Fabric Data Warehouse](ai-functions.md)
- [AI functions (Transact-SQL)](/sql/t-sql/functions/ai-functions-transact-sql?view=fabric&preserve-view=true)
