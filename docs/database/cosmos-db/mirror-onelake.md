---
title: Mirror OneLake in Cosmos DB Database
description: Learn how data is automatically mirrored from Cosmos DB database in Microsoft Fabric to OneLake.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/17/2025
ms.search.form: Databases replication to OneLake,Integrate Cosmos DB with other services
---

# Mirror OneLake in Cosmos DB database in Microsoft Fabric

Every Cosmos DB in Microsoft Fabric database is mirrored into OneLake in the open-source Delta Lake format. This feature doesn't require any extra configuration or setup and is automatically enabled when the database is created. This tight integration eliminates the need for ETL (Extract, Transform, Load) pipelines and ensures that Cosmos DB data is always analytics-ready.

This automatic mirror support enables scenarios including, but not limited to:

- Ad-hoc queries using the Transact SQL (T-SQL) query language
- Integration with Apache Spark
- Analytics over real-time data using notebooks
- Data science and machine learning workflows

## Mirroring status

You can check the status of replication by navigating to the replication section for the database in the Fabric portal. This section includes metadata about replication including the status of the last sync.

:::image type="content" source="media/mirror-onelake/mirroring-status.png" lightbox="media/mirror-onelake/mirroring-status-full.png" alt-text="Screenshot of the status dialog for mirroring for a Cosmos DB in Fabric database.":::

## SQL analytics endpoint queries

The SQL analytics endpoint enables you to query mirrored Cosmos DB data directly in the Fabric portal using T-SQL. You can switch between the NoSQL data explorer and the T-SQL SQL analytics endpoint at any time.

### Run basic queries

Use standard T-SQL syntax to query your mirrored data. The following example shows a simple aggregation query:

```tsql
SELECT
  categoryName,
  COUNT(*) AS quantity
FROM
  [<database-name>].[<database-name>].[<container-name>] -- Replace with your database and container name
GROUP BY
  categoryName
```

:::image type="content" source="media/mirror-onelake/sql-analytics-endpoint-query.png" lightbox="media/mirror-onelake/sql-analytics-endpoint-query-full.png" alt-text="Screenshot of a Transact SQL (T-SQL) query using the query editor in the SQL analytics endpoint for a basic scenario.":::

### Analyze sample data with advanced queries

For more complex analytics scenarios, you can run queries that combine multiple metrics and use advanced T-SQL features. The following example uses the built-in sample data set to calculate product KPIs, financial metrics, and review insights across categories. For more information about the sample data set, see [Sample data sets in Cosmos DB in Microsoft Fabric](sample-data.md).

```tsql
-- Product performance analysis by category
WITH SampleData AS (
  SELECT *
  FROM [<database-name>].[<database-name>].[<container-name>] -- Replace with your database and container name
)
, CategoryMetrics AS (
  SELECT
    categoryName,
    COUNT(DISTINCT CASE WHEN docType = 'product' THEN productId END) AS totalProducts,
    COUNT(CASE WHEN docType = 'review' THEN id END) AS totalReviews,
    ROUND(AVG(CASE WHEN docType = 'review' THEN CAST(stars AS FLOAT) END), 2) AS avgCategoryRating,
    SUM(CASE WHEN docType = 'product' THEN currentPrice * inventory END) AS totalInventoryValue,
    ROUND(AVG(CASE WHEN docType = 'product' THEN currentPrice END), 2) AS avgPrice,
    ROUND((COUNT(CASE WHEN docType = 'review' AND stars >= 4 THEN 1 END) * 100.0 /
         NULLIF(COUNT(CASE WHEN docType = 'review' THEN 1 END), 0)), 1) AS satisfactionRate
  FROM SampleData
  GROUP BY categoryName
)
SELECT
  metrics.categoryName,
  metrics.totalProducts,
  metrics.totalReviews,
  metrics.avgCategoryRating,
  topProduct.name AS topProduct,
  metrics.totalInventoryValue,
  metrics.avgPrice,
  metrics.satisfactionRate
FROM CategoryMetrics AS metrics
OUTER APPLY (
  SELECT TOP 1 p.name
  FROM SampleData AS p
  WHERE p.categoryName = metrics.categoryName AND p.docType = 'product'
  ORDER BY (
    SELECT AVG(CAST(r.stars AS FLOAT))
    FROM SampleData AS r
    WHERE r.productId = p.productId AND r.docType = 'review'
  ) DESC, p.currentPrice DESC
) AS topProduct
ORDER BY metrics.avgCategoryRating DESC, metrics.totalInventoryValue DESC;
```

Observe the results of the query in the query editor:

```json
[
  {
    "categoryName": "Devices, E-readers",
    "totalProducts": "10",
    "totalReviews": "24",
    "avgCategoryRating": "4.38",
    "topProduct": "AuraLume X7 ePaper Pro",
    "totalInventoryValue": "890338.94",
    "avgPrice": "146.33",
    "satisfactionRate": "87.500000000000"
  },
  {
    "categoryName": "Devices, Smartwatches",
    "totalProducts": "10",
    "totalReviews": "41",
    "avgCategoryRating": "4.37",
    "topProduct": "PulseWear XR Pro",
    "totalInventoryValue": "750008.86",
    "avgPrice": "170.24",
    "satisfactionRate": "85.400000000000"
  },
  // Ommitted for brevity
]
```

:::image type="content" source="media/mirror-onelake/sql-analytics-endpoint-query-advanced.png" lightbox="media/mirror-onelake/sql-analytics-endpoint-query-advanced-full.png" alt-text="Screenshot of a Transact SQL (T-SQL) query using the query editor in the SQL analytics endpoint for an advanced scenario.":::

## Next steps
- [Create a OneLake shortcut in a Lakehouse](./how-to-access-data-lakehouse.md) or [run a cross-database query](./how-to-query-cross-database.md)

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
- [Review limitations of Cosmos DB in Microsoft Fabric](limitations.md)
