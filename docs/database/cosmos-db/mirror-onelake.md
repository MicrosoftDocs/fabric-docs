---
title: Mirror OneLake in Cosmos DB Database
description: Learn how data is automatically mirrored from Cosmos DB database in Microsoft Fabric to OneLake.
ms.reviewer: mjbrown
ms.topic: how-to
ms.date: 11/03/2025
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

For more complex analytics scenarios, you can run queries that combine multiple metrics and use advanced T-SQL features. The following example uses the built-in sample data set to calculate product KPIs and review insights across categories. For more information about the sample data set, see [Sample data sets in Cosmos DB in Microsoft Fabric](sample-data.md).

```tsql
-- Product performance analysis by category
WITH SampleData AS (
  SELECT *
  FROM [<database-name>].[<database-name>].[<container-name>] -- Replace with your database and container name
),
TopProducts AS (
  SELECT 
    categoryName,
    name,
    ROW_NUMBER() OVER (PARTITION BY categoryName ORDER BY currentPrice DESC) AS rn
  FROM SampleData
  WHERE docType = 'product'
)
SELECT
  c.categoryName,
  COUNT(DISTINCT CASE WHEN c.docType = 'product' THEN c.productId END) AS totalProducts,
  ROUND(AVG(CASE WHEN c.docType = 'review' THEN CAST(c.stars AS FLOAT) END), 2) AS avgRating,
  tp.name AS topProduct,
  SUM(CASE WHEN c.docType = 'product' THEN c.currentPrice * c.inventory END) AS totalInventoryValue
FROM SampleData AS c
LEFT JOIN TopProducts AS tp ON c.categoryName = tp.categoryName AND tp.rn = 1
GROUP BY c.categoryName, tp.name
ORDER BY avgRating DESC;
```

Observe the results of the query in the query editor:
```json
[
  {
    "categoryName": "Devices, E-readers",
    "totalProducts": "10",
    "avgRating": "4.38",
    "topProduct": "eReader Lumina Edge X7",
    "totalInventoryValue": "890338.94"
  },
  {
    "categoryName": "Devices, Smartwatches",
    "totalProducts": "10",
    "avgRating": "4.37",
    "topProduct": "PulseSync Pro S7",
    "totalInventoryValue": "750008.86"
  },
  // Omitted for brevity
]
```

:::image type="content" source="media/mirror-onelake/sql-analytics-endpoint-query-advanced.png" lightbox="media/mirror-onelake/sql-analytics-endpoint-query-advanced-full.png" alt-text="Screenshot of advanced Transact SQL (T-SQL) query using the query editor in the SQL analytics endpoint for an advanced scenario.":::

### Query nested JSON arrays with OPENJSON

Use the `OPENJSON` function to parse and query nested JSON arrays within your documents. The following example demonstrates how to analyze the `priceHistory` array to identify products with the largest price increases, helping you track pricing trends and optimize your pricing strategy.

```tsql
-- Identify products with significant price increases
WITH PriceChanges AS (
  SELECT
    p.productId,
    p.name,
    p.categoryName,
    p.currentPrice,
    ph.priceDate,
    ph.historicalPrice,
    p.currentPrice - ph.historicalPrice AS priceIncrease,
    ROUND(((p.currentPrice - ph.historicalPrice) / ph.historicalPrice) * 100, 1) AS percentIncrease
  FROM [<database-name>].[<database-name>].[<container-name>] AS p -- Replace with your database and container name
  CROSS APPLY OPENJSON(p.priceHistory) WITH (
    priceDate datetime2,
    historicalPrice float '$.price'
  ) AS ph
  WHERE p.docType = 'product'
)
SELECT TOP 10
  name,
  categoryName,
  currentPrice,
  priceIncrease,
  percentIncrease
FROM PriceChanges
WHERE priceIncrease > 0
ORDER BY percentIncrease DESC;
```

Observe the results of the query in the query editor:
```json
[
  {
    "name": "Resonova Elite360 Wireless ANC Headphones",
    "categoryName": "Accessories, Premium Headphones",
    "currentPrice": "523.66",
    "priceIncrease": "224.66",
    "percentIncrease": "75.1"
  },
  {
    "name": "AuraLux VX Pro Leather Case",
    "categoryName": "Accessories, Luxury Cases",
    "currentPrice": "129.96",
    "priceIncrease": "50.89",
    "percentIncrease": "64.4"
  },
  // Omitted for brevity
]
```

:::image type="content" source="media/mirror-onelake/sql-analytics-endpoint-query-openjson.png" lightbox="media/mirror-onelake/sql-analytics-endpoint-query-openjson-full.png" alt-text="Screenshot of an OPENJSON Transact SQL (T-SQL) query using the query editor in the SQL analytics endpoint for an advanced scenario.":::

## Next steps
- [Create a OneLake shortcut in a Lakehouse](./how-to-access-data-lakehouse.md) or [run a cross-database query](./how-to-query-cross-database.md)

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
- [Review limitations of Cosmos DB in Microsoft Fabric](limitations.md)
