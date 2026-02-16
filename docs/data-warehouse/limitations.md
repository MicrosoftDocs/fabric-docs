---
title: Limitations of Fabric Data Warehouse
description: This article contains a list of current limitations in Microsoft Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: joanpo, ajagadish, anphil, fresantos
ms.date: 11/19/2025
ms.topic: limits-and-quotas
ms.search.form: SQL Analytics Endpoint overview, Warehouse overview # This article's title should not change. If so, contact engineering.
---
# Limitations of Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article details the current limitations in [!INCLUDE [product-name](../includes/product-name.md)].

These limitations apply only to Warehouse and SQL analytics endpoint items in Fabric Synapse Data Warehouse. For limitations of SQL database in Fabric, see [Limitations in SQL database in Microsoft Fabric (preview)](../database/sql/limitations.md).

## Limitations

Current general product limitations for Data Warehousing in Microsoft Fabric are listed in this article, with feature level limitations called out in the corresponding feature article. More functionality will build upon the world class, industry-leading performance and concurrency story, and will land incrementally. For more information on the future of Microsoft Fabric, see [Fabric Roadmap](https://blog.fabric.microsoft.com/blog/announcing-the-fabric-roadmap?ft=All).

> [!IMPORTANT]
> Fabric Data Warehouse and SQL analytics endpoint connections require both the source and target items to be in the same region. Cross-region connections—including those across workspaces or capacities in different regions—are not supported and might fail to authenticate or connect.

For more limitations in specific areas, see:

- [Clone table](clone-table.md#limitations)
- [Connectivity](connectivity.md#considerations-and-limitations)
- [Data types in Microsoft Fabric](data-types.md)
- [Delta lake logs](query-delta-lake-logs.md#limitations)
- [Migration Assistant](migration-assistant.md#limitations)
- [Pause and resume in Fabric data warehousing](pause-resume.md#considerations-and-limitations)
- [Semantic models](semantic-models.md#limitations)
- [Share your data and manage permissions](share-warehouse-manage-permissions.md#limitations)
- [Source control](source-control.md#limitations-in-source-control)
- [Statistics](statistics.md#limitations)
- [Tables](tables.md#limitations)
- [Transactions](transactions.md#limitations)
- [Visual Query editor](visual-query-editor.md#limitations-with-visual-query-editor)

## Limitations of the SQL analytics endpoint

The following limitations apply to [!INCLUDE [fabric-se](includes/fabric-se.md)] automatic schema generation and metadata discovery.

- Data should be in Delta Parquet format to be autodiscovered in the [!INCLUDE [fabricse](includes/fabric-se.md)]. [Delta Lake is an open-source storage framework](https://delta.io/) that enables building Lakehouse architecture.

- [Delta column mapping](https://docs.delta.io/latest/delta-column-mapping.html) by name is supported, but Delta column mapping by ID is not supported. For more information, see [Delta Lake features and Fabric experiences](../fundamentals/delta-lake-interoperability.md#delta-lake-features-and-fabric-experiences).
  - [Delta column mapping in the SQL analytics endpoint](https://blog.fabric.microsoft.com/blog/fabric-september-2024-monthly-update?ft=All#post-14247-_Toc177485830) is currently in preview.

- Delta tables created outside of the `/tables` folder aren't available in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

   If you don't see a Lakehouse table in the warehouse, check the location of the table. Only the tables that are referencing data in the `/tables` folder are available in the warehouse. The tables that reference data in the `/files` folder in the lake aren't exposed in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. As a workaround, move your data to the `/tables` folder.

- Some columns that exist in the Spark Delta tables might not be available in the tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. For a full list of supported data types, see [Data types in Fabric Data Warehouse](data-types.md). 

- If you add a foreign key constraint between tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)], you won't be able to make any further schema changes (for example, adding the new columns). If you don't see the Delta Lake columns with the types that should be supported in [!INCLUDE [fabric-se](includes/fabric-se.md)], check if there is a foreign key constraint that might prevent updates on the table. 

- For information and recommendations on performance of the [!INCLUDE [fabric-se](includes/fabric-se.md)], see [SQL analytics endpoint performance considerations](sql-analytics-endpoint-performance.md).

- Scalar UDFs are supported when inlineable. For more information, see [CREATE FUNCTION](/sql/t-sql/statements/create-function-sql-data-warehouse?view=fabric&preserve-view=true) and [Scalar UDF inlining](/sql/relational-databases/user-defined-functions/scalar-udf-inlining?view=fabric&preserve-view=true).

- The **varchar(max)** data type is only supported in SQL analytics endpoints of mirrored items and Fabric databases, and not for Lakehouses. Tables created after November 10, 2025 will automatically be mapped with **varchar(max)**. Tables created before November 10, 2025 need to be recreated to adopt a new data type, or will be automatically upgraded to **varchar(max)** during the next schema change. 

Data truncation to 8 KB still applies on the tables in SQL analytics endpoint of the Lakehouse, including shortcuts to a mirrored item.

Since all tables do not support **varchar(max)** joins on these columns may not work as expected if one of the tables still has a data truncation. For example, if you CTAS a table of a newly created mirrored item into a Lakehouse table using Spark, then join them using the column with **varchar(max)**, the query results will be different compared to the **varchar(8000)** data type. If you would like to continue to have previous behavior, you can cast the column to **varchar(8000)** in the query.    

You can confirm if a table has any **varchar(max)** column from the schema metadata using the following T-SQL query. A `max_length` value of `-1` represents **varchar(max)**:


```sql
SELECT o.name, c.name, type_name(user_type_id) AS [type], max_length
FROM sys.columns AS c
INNER JOIN sys.objects AS o
ON c.object_id = o.object_id
WHERE max_length = -1 
AND type_name(user_type_id) IN ('varchar', 'varbinary');
```

- Schemas with names that are [SQL reserved keywords](/sql/t-sql/language-elements/reserved-keywords-transact-sql?view=sql-server-ver17) aren't supported in SQL analytics endpoint. Tables under these schemas will fail to sync to the SQL analytics endpoint. Use non‑reserved names for schemas.

## Known issues

For known issues in [!INCLUDE [product-name](../includes/product-name.md)], visit [Microsoft Fabric Known Issues](https://support.fabric.microsoft.com/known-issues/).

## Related content

- [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md)
- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
