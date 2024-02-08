---
title: Warehouse performance guidelines
description: This article contains a list of performance guidelines for warehouse.
author: XiaoyuMSFT
ms.author: xiaoyul
ms.reviewer: wiassaf
ms.date: 11/15/2023
ms.topic: conceptual
ms.custom:
  - ignite-2023
---
# Synapse Data Warehouse in Microsoft Fabric performance guidelines

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

These are guidelines to help you understand performance of your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)]. In this article, you'll find guidance and important articles to focus on. [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] is a SaaS platform where activities like workload management, concurrency, and storage management are managed internally by the platform. In addition to this internal performance management, you can still improve your performance by developing performant queries against well-designed warehouses.

## Cold run (cold cache) performance

[Caching with local SSD and memory](caching.md) is automatic. The first 1-3 executions of a query perform noticeably slower than subsequent executions. If you are experiencing cold run performance issues, here are a couple of things you can do that can improve your cold run performance:

- Manually create statistics. Auto-statistics are not currently available. Review the [statistics](statistics.md) article to better understand the role of statistics and for guidance on how to create manual statistics to improve your query performance.

- If using Power BI, use [Direct Lake](../data-engineering/lakehouse-pbi-reporting.md) mode where possible.
 
## Metrics for monitoring performance

Currently, the [Monitoring Hub](../admin/monitoring-hub.md) does not include [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. If you choose the Data Warehouse experience, you will not be able to access the **Monitoring Hub** from the left nav menu.

Fabric administrators will be able to access the **Capacity Utilization and Metrics** report for up-to-date information tracking the utilization of capacity that includes [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

## Use dynamic management views (DMVs) to monitor query execution

You can use [dynamic management views (DMVs)](monitor-using-dmv.md) to monitor connection, session, and request status in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

## Statistics

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] uses a query engine to create an execution plan for a given SQL query. When you submit a query, the query optimizer tries to enumerate all possible plans and choose the most efficient candidate. To determine which plan would require the least overhead, the engine needs to be able to evaluate the amount of work or rows that might be processed by each operator. Then, based on each plan's cost, it chooses the one with the least amount of estimated work. Statistics are objects that contain relevant information about your data, to allow the query optimizer to estimate these costs.

You can also [manually update statistics](statistics.md#manual-statistics-for-all-tables) after each data load or data update to assure that the best query plan can be built.

For more information statistics and how you can augment the automatically created statistics, see [Statistics in Fabric data warehousing](statistics.md).

## Data ingestion guidelines

There are four options for data ingestion into a [!INCLUDE [fabric-dw](includes/fabric-dw.md)]:

- COPY (Transact-SQL)
- Data pipelines
- Dataflows
- Cross-warehouse ingestion

To help determine which option is best for you and to review some data ingestion best practices, review [Ingest data](ingest-data.md#data-ingestion-options).

## Group INSERT statements into batches (avoid trickle inserts)

A one-time load to a small table with an INSERT statement, such as shown in the following example, might be the best approach depending on your needs. However, if you need to load thousands or millions of rows throughout the day, singleton INSERTS aren't optimal.

```sql
INSERT INTO MyLookup VALUES (1, 'Type 1') 
```

For guidance on how to handle these trickle-load scenarios, see [Best practices for ingesting data](ingest-data.md#best-practices).

## Minimize transaction sizes

INSERT, UPDATE, and DELETE statements run in a transaction. When they fail, they must be rolled back. To reduce the potential for a long rollback, minimize transaction sizes whenever possible. Minimizing transaction sizes can be done by dividing INSERT, UPDATE, and DELETE statements into parts. For example, if you have an INSERT that you expect to take 1 hour, you can break up the INSERT into four parts. Each run will then be shortened to 15 minutes.

Consider using [CTAS (Transact-SQL)](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true) to write the data you want to keep in a table rather than using DELETE. If a CTAS takes the same amount of time, it's safer to run since it has minimal transaction logging and can be canceled quickly if needed.

## Collocate client applications and Microsoft Fabric

If you're using client applications, make sure you're using [!INCLUDE [product-name](../includes/product-name.md)] in a region that's close to your client computer. Client application examples include Power BI Desktop, SQL Server Management Studio, and Azure Data Studio.

## Create (UNENFORCED) Primary Key, Foreign Key and Unique Constraints

Having [primary key, foreign key and/or unique](table-constraints.md) constraints help the Query Optimizer to generate an execution plan for a query. These constraints can only be UNENFORCED in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] so care must be taken to ensure referential integrity is not violated.

## Utilize Star Schema data design

A [star schema](/power-bi/guidance/star-schema) organizes data into fact and dimension tables. A star schema design facilitates analytical processing by de-normalizing the data from highly normalized OLTP systems, ingesting transactional data, and enterprise master data into a common, cleansed, and verified data structure that minimizes JOINS at query time, reduces the number of rows read and facilitates aggregations and grouping processing.

For more [!INCLUDE [fabric-dw](includes/fabric-dw.md)] design guidance, see [Tables in data warehousing](tables.md).

## Reduce query result set sizes

Reducing query result set sizes helps you avoid client-side issues caused by large query results. The [SQL Query editor](sql-query-editor.md) results sets are limited to the first 10,000 rows to avoid these issues in this browser-based UI. If you need to return more than 10,000 rows, use SQL Server Management Studio (SSMS) or Azure Data Studio.

## Choose the best data type for performance

When defining your tables, use the smallest data type that supports your data as doing so will improve query performance. This recommendation is important for CHAR and VARCHAR columns. If the longest value in a column is 25 characters, then define your column as VARCHAR(25). Avoid defining all character columns with a large default length.

Use integer-based data types if possible. SORT, JOIN, and GROUP BY operations complete faster on integers than on character data.

For supported data types and more information, see [data types](data-types.md#autogenerated-data-types-in-the-sql-analytics-endpoint).

## Related content

- [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)
- [Limitations](limitations.md)
- [Troubleshoot the Warehouse](troubleshoot-synapse-data-warehouse.md)
- [Data types](data-types.md)
- [T-SQL surface area](tsql-surface-area.md)
- [Tables in data warehouse](tables.md)
- [Caching in Fabric data warehousing](caching.md)
