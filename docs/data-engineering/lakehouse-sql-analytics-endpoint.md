---
title: What is the SQL analytics endpoint for a lakehouse?
description: Learn about the SQL analytics endpoint and how to run SQL queries directly on Fabric lakehouse tables.
ms.reviewer: tvilutis
ms.topic: concept-article
ms.date: 05/19/2026
ms.search.form: Lakehouse SQL Analytics Endpoint
---

# What is the SQL analytics endpoint for a lakehouse?

The SQL analytics endpoint gives you a read-only T-SQL query surface over the Delta tables in your lakehouse. Every lakehouse automatically provisions a SQL analytics endpoint when created — there's nothing extra to set up. Behind the scenes, the SQL analytics endpoint runs on the same engine as the [Fabric Data Warehouse](../data-warehouse/data-warehousing.md), so you get high-performance, low-latency SQL queries without managing infrastructure.

The SQL analytics endpoint isn't unique to lakehouses. Other Fabric items — including [warehouses](../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse), [mirrored databases](../mirroring/overview.md), [SQL databases](../database/sql/sql-analytics-endpoint.md), and [Azure Cosmos DB](../database/cosmos-db/overview.md) — also auto-provision a SQL analytics endpoint. The experience and [limitations](#limitations) are the same across all of them.

:::image type="content" source="media/lakehouse-sql-analytics-endpoint/lakehouse-sql-analytics-endpoint.png" alt-text="Screenshot of the SQL analytics endpoint for a lakehouse showing the query editor and table list." lightbox="media/lakehouse-sql-analytics-endpoint/lakehouse-sql-analytics-endpoint.png":::

## What you can do

The SQL analytics endpoint operates in read-only mode over Delta tables — you can't insert, update, or delete data through it. To modify data, switch to the lakehouse and use Apache Spark.

Within that read-only boundary, you can:

- **Query Delta tables with T-SQL** — Run SELECT statements against any Delta table in your lakehouse, including tables exposed through [shortcuts](lakehouse-shortcuts.md) to external Azure Data Lake Storage or Amazon S3.
- **Create views, functions, and stored procedures** — Encapsulate business logic and reusable query patterns in T-SQL objects that persist in the SQL analytics endpoint.
- **Apply row-level and object-level security** — Use [SQL granular permissions](../data-warehouse/sql-granular-permissions.md) to control which users can see which tables, columns, or rows.
- **Build Power BI reports** — Power BI semantic models can connect to the SQL analytics endpoint through its Tabular Data Stream (TDS) endpoint, so you can build reports over your lakehouse data.
- **Query across workspaces** — Use [OneLake shortcuts](lakehouse-shortcuts.md) to reference Delta tables in other lakehouses or warehouses, then join them in a single query. For more cross-workspace scenarios, see [Lakehouse SQL analytics endpoint use cases](lakehouse-sql-analytics-endpoint-use-cases.md).

> [!NOTE]
> External Delta tables created with Spark code aren't visible to the SQL analytics endpoint. Use shortcuts in the Tables section to make external Delta tables visible. To learn how, see [Create a shortcut](lakehouse-shortcuts.md#create-a-shortcut).

## Access the SQL analytics endpoint

You can open the SQL analytics endpoint in two ways:

- **From the workspace** — In your workspace item list, find the SQL analytics endpoint item (it shares a name with your lakehouse) and select it.
- **From the Lakehouse explorer** — In the top-right area of the ribbon, use the dropdown to switch to the SQL analytics endpoint view.

Either way, the query editor opens where you can write and run T-SQL queries against your Delta tables.

## Security

SQL security rules set on the SQL analytics endpoint only apply when data is accessed through the endpoint. They don't apply when the same data is accessed through Spark or other tools.

To secure your data:

- Set [SQL granular permissions](../data-warehouse/sql-granular-permissions.md) on the SQL analytics endpoint to control access to specific tables, columns, or rows.
- Set [workspace roles and permissions](workspace-roles-lakehouse.md) to control who can access the lakehouse and its data through other paths.

For more about the security model, see [OneLake security for SQL analytics endpoints](../onelake/security/sql-analytics-endpoint-onelake-security.md).

<a id="automatic-metadata-sync"></a>

## Metadata sync

When you create or update a Delta table in your lakehouse, the SQL analytics endpoint automatically detects the change and updates its SQL metadata — table definitions, column types, and statistics. There's no import step and no manual sync required. You do have multiple options to manually initiate a refresh of the SQL analytics endpoint metadata.

For more information, see [SQL analytics endpoint metadata sync](sql-analytics-endpoint-metadata-sync.md).

## Reprovisioning

If the SQL analytics endpoint fails to provision when you create a lakehouse, you can retry directly from the Lakehouse home page without recreating the lakehouse.

:::image type="content" source="media/lakehouse-sql-analytics-endpoint/sql-analytics-endpoint-reprovisioning.png" alt-text="Screenshot showing the option to retry SQL analytics endpoint provisioning in the lakehouse." lightbox="media/lakehouse-sql-analytics-endpoint/sql-analytics-endpoint-reprovisioning.png":::

> [!NOTE]
> Reprovisioning can still fail, just as the initial provisioning can. If repeated attempts fail, contact support.

## Limitations

The SQL analytics endpoint shares its engine with the Fabric Data Warehouse, and they share the same limitations.

The following limitations apply to SQL analytics endpoint automatic schema generation and metadata discovery.

- Data should be in Delta Parquet format to be autodiscovered in the SQL analytics endpoint. [Delta Lake is an open-source storage framework](https://delta.io/) that enables building Lakehouse architecture.

- [Delta column mapping](https://docs.delta.io/latest/delta-column-mapping.html) by name is supported, but Delta column mapping by ID is not supported. For more information, see [Delta Lake features and Fabric experiences](../fundamentals/delta-lake-interoperability.md#delta-lake-features-and-fabric-experiences).
  - [Delta column mapping in the SQL analytics endpoint](https://blog.fabric.microsoft.com/blog/fabric-september-2024-monthly-update?ft=All#post-14247-_Toc177485830) is currently in preview.

- Delta tables created outside of the `/tables` folder aren't available in the SQL analytics endpoint.

   If you don't see a Lakehouse table in the SQL analytics endpoint, check the location of the table. Only the tables that reference data in the `/tables` folder are available in the SQL analytics endpoint. The tables that reference data in the `/files` folder in the lake aren't exposed in the SQL analytics endpoint. As a workaround, move your data to the `/tables` folder.

- Some columns that exist in the Spark Delta tables might not be available in the tables in the SQL analytics endpoint. For every Delta table in your [Lakehouse](../data-engineering/lakehouse-overview.md), the SQL analytics endpoint automatically generates a table with T-SQL data types. The SQL analytics endpoint engine is based on the Fabric Data Warehouse engine, and shares data types. For a full list of supported data types, see [Data types in Fabric Data Warehouse](../data-warehouse/data-types.md).

- If you add a foreign key constraint between tables in the SQL analytics endpoint, you won't be able to make any further schema changes (for example, adding the new columns). If you don't see the Delta Lake columns with the types that should be supported in SQL analytics endpoint, check if there is a foreign key constraint that might prevent updates on the table. 

- For information and recommendations on performance of the SQL analytics endpoint, see [SQL analytics endpoint performance considerations](../data-engineering/sql-analytics-endpoint-performance.md).

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

- Schemas with names that conflict with system schemas (such as `sys` or `information_schema`) and database security principals (such as `db_owner`, `db_datareader`) aren't supported in the SQL analytics endpoint. Tables under these schemas will fail to sync to the SQL analytics endpoint.

- A workspace supports up to **150 warehouse and SQL analytics endpoint items combined**. Creating additional items beyond this limit isn't supported. Delete an existing item before creating a new one.

## Related content

- [Lakehouse SQL analytics endpoint use cases](lakehouse-sql-analytics-endpoint-use-cases.md)
- [Query the SQL analytics endpoint or warehouse](../data-warehouse/query-warehouse.md)
- [SQL analytics endpoint performance considerations](sql-analytics-endpoint-performance.md)
- [OneLake security for SQL analytics endpoints](../onelake/security/sql-analytics-endpoint-onelake-security.md)
- [SQL granular permissions](../data-warehouse/sql-granular-permissions.md)
- [Workspace roles and permissions](workspace-roles-lakehouse.md)
- [Lakehouse overview](lakehouse-overview.md)
