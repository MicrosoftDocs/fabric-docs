---
title: Mirror OneLake in Cosmos DB Database
titleSuffix: Microsoft Fabric
description: Learn how data is automatically mirrored from Cosmos DB database in Microsoft Fabric to OneLake during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/17/2025
ms.search.form: Databases replication to OneLake,Integrate Cosmos DB with other services
appliesto:
- ✅ Cosmos DB in Fabric
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

The mirrored database can be queried directly using the SQL analytics endpoint experience in the Fabric portal. At any point, you can use the portal to switch between the NoSQL-native data explorer and the T-SQL-native SQL analytics endpoint explorer.

Within the SQL analytics endpoint, you can query data using common T-SQL query language expressions like:

```tsql
SELECT
  category,
  COUNT(*) AS quantity
FROM
  [<database-name>].[<container-name>]
GROUP BY
  category
```

:::image type="content" source="media/mirror-onelake/sql-analytics-endpoint-query.png" lightbox="media/mirror-onelake/sql-analytics-endpoint-query-full.png" alt-text="Screenshot of a Transact SQL (T-SQL) query using the query editor in the SQL analytics endpoint.":::

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
- [Review limitations of Cosmos DB in Microsoft Fabric](limitations.md)
