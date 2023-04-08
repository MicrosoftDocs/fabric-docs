---
title: Statistics
description: Learn how to use the statistics features.
ms.reviewer: wiassaf
ms.author: emtehran
author: mstehrani
ms.topic: conceptual
ms.date: 04/7/2023
ms.search.form: Optimization
---

# Statistics

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Like any other data warehouse, the [!INCLUDE [product-name](../includes/product-name.md)] warehouse uses a query engine to create an execution plan for a given SQL query. When you submit a query, the query optimizer tries to enumerate all possible plans and choose the most efficient candidate. To determine which plan would require the least overhead (I/O and memory), the engine needs to be able to evaluate the amount of work or rows that might be processed at each operator. Then, based on each plan's cost, it chooses the one with the least amount of estimated work. Statistics are objects that contain relevalnt information about table data, to allow query optimizer to estimate these costs.

## How to leverage statistics

To achieve optimal query performance, it is important to have accurate statistics. [!INCLUDE [product-name](../includes/product-name.md)] today supports the following paths to deliver this:

- User-defined statistics
    - User issues DDL to create, update, and drop statistics as needed
- Automatic statistics (autostats)
    - Engine automatically [creates statistics at querytime](#autostats-at-query)

## Autostats at query

Whenever you issue a query and query optimizer requires statistics for particular columns, [!INCLUDE [product-name](../includes/product-name.md)] will automatically creates those statistics if they don't already exist. Once statistics have been created for the required columns, query optimizer can utilize them in exploring query plans for the triggering query. Because this creation is done synchronously, you can expect the first query run to include this statistics creation time, and subsequent queries to not (as long as data hasn't changed).

The following type of automatic statistics exist in [!INCLUDE [product-name](../includes/product-name.md)]:
1. Histogram statistics
    - Created per column needing histogram statistics at querytime
    - These objects contain histogram and density information regarding the distribution of a particular column. Similar to the statistics automatically created at querytime in Azure Synapse Analytics dedicated pools.
    - Name begins with "_WA_Sys_"
    - Shown in [sys.stats](/sql/relational-databases/system-catalog-views/sys-stats-transact-sql) and contents can be viewed with [DBCC SHOW_STATISTICS](/sql/t-sql/database-console-commands/dbcc-show-statistics-transact-sql)
2. Average column length statistics
    - Created per varchar column needing average column length at querytime
    - These objects contain a value respresenting the average rowsize of the varchar column at the time of statistics creation.
    - Name begins with "ACE-AverageColumnLength_"
    - Shown in [sys.stats](/sql/relational-databases/system-catalog-views/sys-stats-transact-sql) but contents cannot be viewed
3. Table-based cardinality statistics
    - Created per table needing cardinality estimation at querytime
    - These objects contain an estimate of the rowcount of a table.
    - Name begins with "ACE-AverageColumnLength_"
    - Shown in [sys.stats](/sql/relational-databases/system-catalog-views/sys-stats-transact-sql) but contents cannot be viewed

### To verify Autostats creation at querytime

There are various cases where you can expect some type of statistics to be automatically created. The most common is the histogram-based system statistics, which is often created for columns referenced in GROUP BYs, JOINs, filters (WHERE clauses), and ORDER BYs. For example, if you want to see the automatic creation of these statistics in a sample query, a query like the below will trigger creation if statistics for `COLUMN_NAME` do not yet exist:

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
INNER JOIN sys.stats_columns AS sc 
ON s.object_id = sc.object_id 
AND s.stats_id = sc.stats_id 
INNER JOIN sys.columns AS c 
ON sc.object_id = c.object_id 
AND c.column_id = sc.column_id
WHERE o.type = 'U' -- Only check for stats on user-tables
	AND s.auto_created = 1
	AND o.name = '<YOUR_TABLE_NAME>'
ORDER BY object_name, column_name;
```

Note that this query only looks for column-based statistics. If you'd like to see all statistics (including cardinality), remove the JOINs on sys.stats_columns and sys.columns.

Now, you can find the statistics_name of the automatically generated histogram statistic (should be something like `_WA_Sys_00000007_3B75D760`) and run the following:

```sql
DBCC SHOW_STATISTICS ('<YOUR_TABLE_NAME>', '<statistics_name>');
```

For example:

```sql
DBCC SHOW_STATISTICS ('sales.FactInvoice', '_WA_Sys_00000007_3B75D760');
```

The `Updated` value in the result set of [DBCC SHOW_STATISTICS](/sql/t-sql/database-console-commands/dbcc-show-statistics-transact-sql) should be a date (in UTC) similar to when you ran the original GROUP BY query.

> [!NOTE]
> [!INCLUDE [product-name](../includes/product-name.md)] does not currently support the automatic update of statistics at querytime.

## Manual statistics for all tables

The traditional option of maintaining statistics health is also available in [!INCLUDE [product-name](../includes/product-name.md)]. Users can create, update, and drop histogram-based single-column statistics with [CREATE STATISTICS](/sql/t-sql/statements/create-statistics-transact-sql), [UPDATE STATISTICS](/sql/t-sql/statements/update-statistics-transact-sql), and [DROP STATISTICS](/sql/t-sql/statements/drop-statistics-transact-sql), respectively. Users can also view the contents of histogram-based single-column statistics with [DBCC SHOW_STATISTICS](/sql/t-sql/database-console-commands/dbcc-show-statistics-transact-sql). Currently, a limited version of these statements are supported, and are listed below:

### CREATE STATISTICS

```sql
CREATE STATISTICS statistics_name
    ON { database_name.schema_name.table_name | schema_name.table_name | table_name }
    ( column_name )
    [ WITH {
           FULLSCAN
           | SAMPLE number PERCENT
      }
    ]
[;]
```

- Only single-column FULLSCAN and single-column SAMPLE-based statistics are supported. When no option is included, FULLSCAN statistics are created.

### UPDATE STATISTICS

```sql
UPDATE STATISTICS [ schema_name . ] table_name
    [ ( { statistics_name } ) ]
    [ WITH
       {
              FULLSCAN
            | SAMPLE number PERCENT
        }
    ]
[;]
```

- When `statistics_name` isn't specified, statistics for all columns in the table are updated.
- Resample (using the last recent sample percentage) isn't supported.

### DROP STATISTICS

```sql
DROP STATISTICS [ schema_name . ] table_name.statistics_name
[;]
```

### DBCC SHOW_STATISTICS

```sql
DBCC SHOW_STATISTICS ( table_name , target )
    [ WITH { STAT_HEADER | DENSITY_VECTOR | HISTOGRAM } [ ,...n ] ]
[;]
```

Likewise, the following T-SQL constructs exist and can be used to check both manually created and automatically created statistics in [!INCLUDE [product-name](../includes/product-name.md)]:

- [sys.stats](/sql/relational-databases/system-catalog-views/sys-stats-transact-sql) catalog view
- [sys.stats_columns](/sql/relational-databases/system-catalog-views/sys-stats-columns-transact-sql) catalog view
- [STATS_DATE](/sql/t-sql/functions/stats-date-transact-sql) system function

## Known limitations

- Multi-column statistics creation is not supported. Only single-column statistics can be created.
- Statistics (of any kind) are not currently supported for varchar(max).
- Other statistics objects may show under [sys.stats](/sql/relational-databases/system-catalog-views/sys-stats-transact-sql) aside from manually created statistics and automatically created statistics. These are not automatically generated statistic objects and are not used for query optimization.

## Next steps

- [Monitoring connections, sessions, and requests using DMVs](monitor-using-dmv.md)
