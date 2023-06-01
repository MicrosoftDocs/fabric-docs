---
title: Warehouse performance guidelines
description: This article contains a list of performance guidelines for warehouse.
author: trichter
ms.author: trichter
ms.reviewer: wiassaf
ms.date: 06/01/2023
ms.topic: conceptual
ms.search.form: SQL Endpoint overview, Warehouse overview # This article's title should not change. If so, contact engineering.
---
# Synapse Data Warehouse in Microsoft Fabric Performance Guidelines

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

These are guidelines to help you understand performance of your Synapse Data Warehouse in Microsoft Fabric. Below, you'll find guidance and important topics to focus on. Warehouse in Microsoft Fabric is a SaaS platform where activities like workload management, concurrency, and storage management are managed internally by the platform. In addition to this internal performance management, you can still improve your performance by developing performant queries against well designed Warehouses.
Each topic will direct you to more detailed information that will cover the material in greater depth. 

[!INCLUDE [preview-note](../includes/preview-note.md)]

Included in this document are some specific topics devoted to guidelines that apply only during this Public Preview period.

## Cold Run (Cold Cache) performance during public preview

Cold run or First Run query performance will be continuously improved during the Public Preview period.  If you are experiencing cold run performance issues during your preview experience (i.e. the first 1-3 executions of a query perform noticeably slower than subsequent executions) here are a couple of things you can do that may improve your cold run performance:

- Manually create statistics. Auto-Statistics is not available in preview at this time. Please review [statistics](statistics.md) documentation to better understand the role of statistics and for guidance on how to create manual statistics to improve your query performance during preview.

- If using Power BI, use Direct Lake mode where possible.

It will be best that you just be aware of the improvements coming before GA and not focus at this time on performance of cold run queries – execute your query several times and focus on the performance of later executions.

## Metrics for monitoring performance

Currently, the [Monitoring Hub](../admin/monitoring-hub.md)does not include Warehouse. If you choose the Data Warehouse Experience, you will not be able to access the Monitoring Hub from the left nav menu.

Fabric Administrators will be able to access the Capacity Utilization and Metrics report for up-to-date information tracking the utilization of capacity which includes Warehouse.

## Use Dynamic Management Views (DMVs) to monitor query execution

You can use [dynamic management views (DMVs)](monitor-using-dmv.md) to monitor connection, session, and request status in the Warehouse.

## Statistics

The Warehouse uses a query engine to create an execution plan for a given SQL query. When you submit a query, the query optimizer tries to enumerate all possible plans and choose the most efficient candidate. To determine which plan would require the least overhead, the engine needs to be able to evaluate the amount of work or rows that might be processed by each operator. Then, based on each plan's cost, it chooses the one with the least amount of estimated work. Statistics are objects that contain relevant information about your data, to allow the query optimizer to estimate these costs.

Please review this [documentation](statistics.md) to become familiar with statistics and how you can augment the automatically created statistics.

## Manually update Statistics after data modifications

Auto-Update of Statistics is planned to become available in the Public Preview prior to GA release.  Until it becomes available, you will need to [manually update statistics](statistics.md#manual-statistics-for-all-tables) after each data load or data update to assure that the best query plan can be built.

## Data ingestion guidelines

There are four options for data ingestion into a Warehouse:

- COPY (Transact-SQL)
- Data pipelines
- Dataflows
- Cross-warehouse ingestion

Review this [documentation](ingest-data.md#data-ingestion-options) to help determine which option is best for you and to review some data ingestion best practices.

## Group INSERT statements into batches (avoid trickle inserts)

A one-time load to a small table with an INSERT statement such as shown in the example below may be the best approach depending on your needs. However, if you need to load thousands or millions of rows throughout the day, it's likely that singleton INSERTS aren't optimal.

```sql
INSERT INTO MyLookup VALUES (1, 'Type 1') 
```

Read this [document](ingest-data.md#best-practices) for guidance on how to handle these trickle load scenarios.

## Minimize transaction sizes

INSERT, UPDATE, and DELETE statements run in a transaction. When they fail, they must be rolled back. To reduce the potential for a long rollback, minimize transaction sizes whenever possible. Minimizing transaction sizes can be done by dividing INSERT, UPDATE, and DELETE statements into parts. For example, if you have an INSERT that you expect to take 1 hour, you can break up the INSERT into four parts. Each run will then be shortened to 15 minutes.
Consider using a CTAS to write the data you want to keep in a table rather than using DELETE. If a CTAS takes the same amount of time, it's much safer to run since it has minimal transaction logging and can be canceled quickly if needed.

## Collocate client applications and Microsoft Fabric

If you're using client applications, make sure you're using Microsoft Fabric in a region that's close to your client computer. Client application examples include Power BI Desktop, SQL Server Management Studio, and Azure Data Studio.

## Create (UNENFORCED) Primary Key, Foreign Key and Unique Constraints

Having [primary key, foreign key and/or unique](table-constraints.md) constraints may help the Query Optimizer to generate an execution plan for a query. These constraints can only be UNENFORCED in Warehouse so care must be taken to ensure referential integrity is not violated.

## Utilize Star Schema data design

A [star schema](https://wikipedia.org/wiki/Star_schema) organizes data into fact and dimension tables. A Star Schema design facilitates analytical processing by denormalizing the data from highly normalized OLTP systems, ingesting transactional data, and enterprise master data into a common, cleansed, and verified data structure that minimizes JOINS at query time, reduces the number of rows read and facilitates aggregations and grouping processing.

Please review [Tables in data warehousing](tables.md) for more Warehouse design guidance.

## Reduce Query Result set sizes

Reducing query result set sizes helps you avoid client-side issues caused by large query results. The Microsoft Fabric SQL Query editor results sets are limited to the first 10,000 rows to avoid these issues in this browser-based UI. If you need to return more than 10,000 rows, please use SQL Server Management Studio (SSMS) or Azure Data Studio.

## Choosing the best data type for performance

When defining your tables, use the smallest data type that will support your data as doing so will improve query performance. This recommendation is particularly important for CHAR and VARCHAR columns. If the longest value in a column is 25 characters, then define your column as VARCHAR(25). Avoid defining all character columns with a large default length.

Use integer-based data types if possible. SORT, JOIN, and GROUP BY operations complete faster on integers than on character data.

Please review the data types supported by Warehouse and additional guidance on their usage in [data types](data-types.md#autogenerated-data-types-in-the-sql-endpoint).

## Next steps

- [Limitations and known issues](limitations.md)
- [Troubleshoot the Warehouse](troubleshoot-synapse-data-warehouse.md)
- [Data types](data-types.md)
- [T-SQL surface area](tsql-surface-area.md)
- [Tables in data warehouse](tables.md)
