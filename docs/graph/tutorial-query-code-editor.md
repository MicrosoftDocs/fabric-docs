---
title: "Tutorial: Query the graph with GQL"
description: Learn how to query your graph using GQL (Graph Query Language) in the code editor.
ms.topic: tutorial
ms.date: 02/02/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Query the graph with GQL
---

# Tutorial: Query the graph by using GQL

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this tutorial step, you query your graph by using GQL (Graph Query Language) in the code editor. GQL provides powerful querying capabilities for complex graph patterns and analysis.

## Switch to code editor mode

Follow these steps to switch to the code editor and start querying your graph by using GQL:

1. Go to your graph's home page.
1. Select **Code editor** from the top menu.

    :::image type="content" source="./media/tutorial/select-code-editor.png" alt-text="Screenshot showing result of selecting 'Code editor'." lightbox="./media/tutorial/select-code-editor.png":::

## Run a basic query

1. Enter a GQL query into the input field. For example, count all orders:

    ```gql
    MATCH (n:`Order`) RETURN count(n) AS num_orders
    ```

1. Select **Run query** to execute the query.

This query finds all nodes with the `Order` label, counts them, and returns the total as `num_orders`. It's a simple way to confirm your graph has data. The following image shows the result of the query:

:::image type="content" source="./media/tutorial/code-editor-query-results-1.png" alt-text="Screenshot showing the result of running a GQL query to count all orders." lightbox="./media/tutorial/code-editor-query-results-1.png":::

## Recreate the query builder query in GQL

In the [previous tutorial step](tutorial-query-builder.md), you used the query builder to find what products a specific customer purchased. Here's the same query written in GQL:

```gql
MATCH (c:Customer)-[:purchases]->(o:`Order`)-[:`contains`]->(p:`Product`)
FILTER c.fullName = 'Carla Adams'
RETURN c.fullName, o, p.productName
```

This query:

1. **Matches** the pattern Customer → purchases → Order → contains → Product
1. **Filters** for the customer named "Carla Adams"
1. **Returns** the customer's full name, order details, and product names

The following image shows the result of the query (only a portion of the returned data is shown).

:::image type="content" source="./media/tutorial/code-editor-query-results-2.png" alt-text="Screenshot showing the result of running a GQL query to find products purchased by Carla Adams." lightbox="./media/tutorial/code-editor-query-results-2.png":::

## Run a complex query

You can run more complex queries that combine matching graph patterns, filtering, aggregation, sorting, and limiting:

```gql
MATCH (v:Vendor)-[:produces]->(p:`Product`)->(sc:`ProductSubcategory`)->(c:`ProductCategory`), 
      (o:`Order`)-[:`contains`]->(p)
FILTER c.subCategoryName = 'Touring Bikes'
LET vendorName = v.vendorName, subCategoryName = sc.subCategoryName
RETURN vendorName, subCategoryName, count(DISTINCT p) AS num_products, count(o) AS num_orders
GROUP BY vendorName, subCategoryName
ORDER BY num_orders DESC
LIMIT 5
```

This query:

1. **Matches** a pattern that connects vendors to products through the supply chain, and orders to products.
1. **Filters** for products in the 'Touring Bikes' category.
1. **Defines** variables for vendor and subcategory names.
1. **Returns** the vendor name, subcategory name, distinct product count, and order count.
1. **Groups** results by vendor and subcategory.
1. **Orders** results by order count in descending order.
1. **Limits** results to the top 5.

In summary, it shows the top five vendors supplying products in the 'Touring Bikes' category, along with how many products they supply and how many orders those products have.

:::image type="content" source="./media/tutorial/code-editor-query-results-3.png" alt-text="Screenshot showing the result of running a GQL query to find the top five vendors supplying products in the 'Touring Bikes' category." lightbox="./media/tutorial/code-editor-query-results-3.png":::

## Related content

For more information about GQL language support, see:

- [GQL language guide](gql-language-guide.md)
- [GQL quick reference](gql-reference-abridged.md)

## Next step

> [!div class="nextstepaction"]
> [Clean up tutorial resources](tutorial-clean-up.md)
