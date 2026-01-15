---
title: Statistics
description: Learn how to use the statistics features in Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: emtehran
ms.date: 12/10/2025
ms.topic: concept-article
ms.search.form: Optimization # This article's title should not change. If so, contact engineering.
---
# Statistics

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] uses a query engine to create an execution plan for a given SQL query. When you submit a query, the query optimizer tries to enumerate all possible plans and choose the most efficient candidate. To determine which plan would require the least overhead (I/O, CPU, memory), the engine needs to be able to evaluate the amount of work or rows that might be processed at each operator. Then, based on each plan's cost, it chooses the one with the least amount of estimated work. Statistics are objects that contain relevant information about your data, to allow query optimizer to estimate these costs.

## How to use statistics

To achieve optimal query performance, it is important to have accurate statistics. [!INCLUDE [product-name](../includes/product-name.md)] currently supports the following paths to provide relevant and up-to-date statistics:

- User-defined statistics
    - The user [manually uses data definition language (DDL) syntax](#manual-statistics-for-all-tables) to create, update, and drop statistics as needed
- Automatic statistics
    - Engine automatically [creates and maintains statistics at querytime](#automatic-statistics-at-query)

## Manual statistics for all tables

The traditional option of maintaining statistics health is available in [!INCLUDE [product-name](../includes/product-name.md)]. Users can create, update, and drop histogram-based single-column statistics with [CREATE STATISTICS](/sql/t-sql/statements/create-statistics-transact-sql?view=fabric&preserve-view=true), [UPDATE STATISTICS](/sql/t-sql/statements/update-statistics-transact-sql?view=fabric&preserve-view=true), and [DROP STATISTICS](/sql/t-sql/statements/drop-statistics-transact-sql?view=fabric&preserve-view=true), respectively. Users can also view the contents of histogram-based single-column statistics with [DBCC SHOW_STATISTICS](/sql/t-sql/database-console-commands/dbcc-show-statistics-transact-sql?view=fabric&preserve-view=true). Currently, a limited version of these statements is supported. 

- If creating statistics manually, consider focusing on columns heavily used in your query workload (specifically in GROUP BYs, ORDER BYs, filters, and JOINs).
- Consider updating column-level statistics regularly after data changes that significantly change rowcount or distribution of the data.

### Examples of manual statistics maintenance

To create statistics on the `dbo.DimCustomer` table, based on all the rows in a column `CustomerKey`:

```sql
CREATE STATISTICS DimCustomer_CustomerKey_FullScan
ON dbo.DimCustomer (CustomerKey) WITH FULLSCAN;
```

To manually update the statistics object `DimCustomer_CustomerKey_FullScan`, perhaps after a large data update:

```sql
UPDATE STATISTICS dbo.DimCustomer (DimCustomer_CustomerKey_FullScan) WITH FULLSCAN;  
```

To show information about the statistics object:

```sql
DBCC SHOW_STATISTICS ("dbo.DimCustomer", "DimCustomer_CustomerKey_FullScan");
```

To show only information about the histogram of the statistics object:

```sql
DBCC SHOW_STATISTICS ("dbo.DimCustomer", "DimCustomer_CustomerKey_FullScan") WITH HISTOGRAM;
```

To manually drop the statistics object `DimCustomer_CustomerKey_FullScan`:

```sql
DROP STATISTICS dbo.DimCustomer.DimCustomer_CustomerKey_FullScan;
```

The following T-SQL objects can also be used to check both manually created and automatically created statistics in [!INCLUDE [product-name](../includes/product-name.md)]:

- [sys.stats](/sql/relational-databases/system-catalog-views/sys-stats-transact-sql?view=fabric&preserve-view=true) catalog view
- [sys.stats_columns](/sql/relational-databases/system-catalog-views/sys-stats-columns-transact-sql?view=fabric&preserve-view=true) catalog view
- [STATS_DATE](/sql/t-sql/functions/stats-date-transact-sql?view=fabric&preserve-view=true) system function

## Automatic statistics at query

Whenever you issue a query and query optimizer requires statistics for plan exploration, [!INCLUDE [product-name](../includes/product-name.md)] automatically creates those statistics if they don't already exist. Once statistics have been created, query optimizer can utilize them in estimating the plan costs of the triggering query. In addition, if the query engine determines that existing statistics relevant to query no longer accurately reflect the data, those statistics are automatically refreshed. Because these automatic operations are done synchronously, you can expect the query duration to include this time if the needed statistics do not yet exist or significant data changes have happened since the last statistics refresh. 

<a id="to-verify-automatic-statistics-at-querytime"></a>

### Verify automatic statistics at querytime

There are various cases where you can expect some type of automatic statistics. The most common are histogram-based statistics, which are requested by the query optimizer for columns referenced in GROUP BYs, JOINs, DISTINCT clauses, filters (WHERE clauses), and ORDER BYs. For example, if you want to see the automatic creation of these statistics, a query will trigger creation if statistics for `COLUMN_NAME` do not yet exist. For example:

```sql
SELECT <COLUMN_NAME>
FROM <YOUR_TABLE_NAME>
GROUP BY <COLUMN_NAME>;
```

In this case, you should expect that statistics for `COLUMN_NAME` to have been created. If the column was also a varchar column, you would also see average column length statistics created. If you'd like to validate statistics were automatically created, you can run the following query:

```sql
select
    object_name(s.object_id) AS [object_name],
    c.name AS [column_name],
    s.name AS [stats_name],
    s.stats_id,
    STATS_DATE(s.object_id, s.stats_id) AS [stats_update_date], 
    s.auto_created,
    s.user_created,
    s.stats_generation_method_desc 
FROM sys.stats AS s 
INNER JOIN sys.objects AS o 
ON o.object_id = s.object_id 
LEFT JOIN sys.stats_columns AS sc 
ON s.object_id = sc.object_id 
AND s.stats_id = sc.stats_id 
LEFT JOIN sys.columns AS c 
ON sc.object_id = c.object_id 
AND c.column_id = sc.column_id
WHERE o.type = 'U' -- Only check for stats on user-tables
    AND s.auto_created = 1
    AND o.name = '<YOUR_TABLE_NAME>'
ORDER BY object_name, column_name;
```


Now, you can find the `statistics_name` of the automatically generated histogram statistic (should be something like `_WA_Sys_00000007_3B75D760`) and run the following T-SQL:

```sql
DBCC SHOW_STATISTICS ('<YOUR_TABLE_NAME>', '<statistics_name>');
```

For example:

```sql
DBCC SHOW_STATISTICS ('sales.FactInvoice', '_WA_Sys_00000007_3B75D760');
```

The `Updated` value in the result set of [DBCC SHOW_STATISTICS](/sql/t-sql/database-console-commands/dbcc-show-statistics-transact-sql?view=fabric&preserve-view=true) should be a date (in UTC) similar to when you ran the original GROUP BY query.

These automatically generated statistics can then be leveraged in subsequent queries by the query engine to improve plan costing and execution efficiency. If enough changes occur in table, the query engine will also refresh those statistics to improve query optimization. The same previous sample exercise can be applied after changing the table significantly. In Fabric, the SQL query engine uses the same recompilation threshold as SQL Server 2016 (13.x) to refresh statistics.

### Types of automatically generated statistics

In [!INCLUDE [product-name](../includes/product-name.md)], there are multiple types of statistics that are automatically generated by the engine to improve query plans. Currently, they can be found in [sys.stats](/sql/relational-databases/system-catalog-views/sys-stats-transact-sql?view=fabric&preserve-view=true) although not all are actionable:

- Histogram statistics
    - Created per column needing histogram statistics at querytime
    - These objects contain histogram and density information regarding the distribution of a particular column. Similar to the statistics automatically created at querytime in Azure Synapse Analytics dedicated pools.
    - Name begins with `_WA_Sys_`.
    - Contents can be viewed with [DBCC SHOW_STATISTICS](/sql/t-sql/database-console-commands/dbcc-show-statistics-transact-sql?view=fabric&preserve-view=true)
- Average column length statistics
    - Created for variable character columns (varchar) greater than 100 needing average column length at querytime.
    - These objects contain a value representing the average row size of the varchar column at the time of statistics creation.
    - Name begins with `ACE-AverageColumnLength_`.
    - Contents cannot be viewed and are nonactionable by user.
- Table-based cardinality statistics
    - Created per table needing cardinality estimation at querytime.
    - These objects contain an estimate of the rowcount of a table.
    - Named `ACE-Cardinality`.
    - Contents cannot be viewed and are nonactionable by user.

## Built-in optimizations within Fabric statistics

### Incremental statistics refresh

Incremental statistics refresh is a performance enhancement for automatic updates of column statistics. 

Usually, when a column's statistic is automatically refreshed, a sample of the entire column must be scanned to update the statistic. This feature speeds up these operations when possible by only sampling rows that have been added since the last refresh, and merging that data with existing histograms. 

When the engine requests an update to a column statistic, it will automatically determine whether this faster refresh method can be used. Incremental statistics updates typically benefit larger tables with mostly INSERTs since the last statistic refresh.

### Proactive statistics refresh

Proactive statistics refresh is a fully-managed process that attempts to frontload statistic refreshes after data change.

This optimization aims to reduce the likelihood of a `SELECT` query experiencing delay caused by statistics updates during query plan generation. 

Proactive statistics updates only affect automatically generated histogram statistics, those with the system-generated naming convention of `_WA_Sys_`.

The proactive statistics refresh feature is enabled by default but can be configured using the [ALTER DATABASE](/sql/t-sql/statements/alter-database-transact-sql-set-options?view=fabric&preserve-view=true) T-SQL command.

## Limitations

- Only single-column histogram statistics can be manually created and modified.
- Multi-column statistics creation is not supported.
- Other statistics objects might appear in [sys.stats](/sql/relational-databases/system-catalog-views/sys-stats-transact-sql?view=fabric&preserve-view=true), aside from manually created statistics and automatically created statistics. These objects are not used for query optimization.

## Related content

- [Monitoring connections, sessions, and requests using DMVs](monitor-using-dmv.md)
