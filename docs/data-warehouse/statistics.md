---
title: Statistics
description: Learn how to use the statistics features.
ms.reviewer: wiassaf
ms.author: emtehran
author: mstehrani
ms.topic: conceptual
ms.date: 03/15/2023
---

# Statistics

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Applies to:** Warehouse and SQL Endpoint

Like any other data warehouse, the [!INCLUDE [product-name](../includes/product-name.md)] warehouse uses a query engine to create an execution plan for any given SQL query.

When you submit a query, query optimizer tries to enumerate all possible plans and choose the most efficient candidate. To determine which would require the least overhead (I/O and memory), query optimizer needs to be able to evaluate the amount of work or rows that might be processed at each operator. Then based on each plan's total cost, it chooses the one with the least work and therefore return the results as quickly as possible. To estimate these costs, we need some sort of quick insight or reference to the range of values we have in a column. Our statistics is an object that contains some interesting information about a particular column that query optimizer can use.

## How to leverage statistics

To maintain optimal query performance, traditionally users have had to maintain statistics themselves by creating and updating them to keep them accurate. In [!INCLUDE [product-name](../includes/product-name.md)], there's an automatic management of statistics ([!INCLUDE [product-name](../includes/product-name.md)] AutoStats) that has multiple components to ensure the query optimizer always has accurate statistics when it needs them, without manual intervention. 

<!-- AutoStats consists of three components:

1. AutoStats at query

2. AutoStats at discovery 

3. AutoStats On-Load -->

> [!NOTE]
> Users will still have the ability to create statistics themselves but are heavily discouraged from doing so during preview. Instead, load and test as you would without manual maintenance and observe query performance from the built-in AutoStats Management.

## AutoStats at query

Whenever you issue a query and query optimizer requires statistics for particular columns, [!INCLUDE [product-name](../includes/product-name.md)] AutoStats automatically creates those statistics if they don't already exist. Once statistics have been created for the required columns, query optimizer can utilize them in exploring query plans for the triggering query. Because this creation is done synchronously, you can expect the first query run to include this stats creation time, and subsequent queries to not (as long as data hasn't changed).

### To verify the creation of autoStats at query

There are various cases where you should expect some type of statistics to be created. The most common is the `_WA_Sys` system statistics, which is created for columns referenced in GROUP BYs, JOINs, filters (WHERE clauses), and ORDER BYs. For example, if you want to see the automatic creation of statistics in a sample query, you can test with a query like:

```sql
SELECT <COLUMN_NAME>
FROM <YOUR_TABLE_NAME>
GROUP BY <COLUMN_NAME>;
```

In this case, you should expect that statistics for `COLUMN_NAME` to have been created. AutoStats in [!INCLUDE [product-name](../includes/product-name.md)] always have a `name` that begins with `_WA_Sys`, have an `auto_created` value of `1`, have a `user_created` value of `0`, and `stats_generation_method_desc` of `Streaming statistics computed by CREATE or UPDATE statistics and auto statistics`. If you'd like to validate these values, you can run the following query:

```sql
SELECT 
s.stats_id,
STATS_DATE(s.object_id, s.stats_id) AS [stats_update_date], 
s.name AS [stats_name],
object_name(s.object_id) AS [object_name],
o.type AS [object_type],
c.name AS [column_name],
sc.stats_column_id AS [column_order_in_stats],
s.auto_created,
s.user_created,
s.stats_generation_method_desc 
FROM sys.stats AS s 
INNER JOIN sys.stats_columns AS sc 
ON s.object_id = sc.object_id 
AND s.stats_id = sc.stats_id 
INNER JOIN sys.columns AS c 
ON sc.object_id = c.object_id 
AND c.column_id = sc.column_id 
INNER JOIN sys.objects AS o 
ON o.object_id = c.object_id 
WHERE o.type = 'U'                        -- Only check stats on user-tables
AND s.name LIKE '_WA_Sys%' 
AND o.name = '<YOUR_TABLE_NAME>'
AND c.name = '<COLUMN_NAME>';
```

Copy and paste the statistics_name of the automatically generated stats (should be something like `_WA_Sys_00000007_3B75D760`) and run:

```sql
DBCC SHOW_STATISTICS (<YOUR_TABLE_NAME>, <statistics_name>);
```

The `Updated` value in the result set of [DBCC SHOW_STATISTICS](/sql/t-sql/database-console-commands/dbcc-show-statistics-transact-sql) should be a date (in UTC) similar to when you ran the original GROUP BY query, and the `Rows` should be equal to the total row count of your table.

> [!NOTE]
> Currently, data changes to a table cause its related statistics to be dropped. This means if you are frequently updating a table, then you can expect its columns statistics to be re-created each time you issue a query that JOINS on its columns or using the columns in a GROUP BY.

<!--
## AutoStats at discovery for autogenerated tables

Another component of [!INCLUDE [product-name](../includes/product-name.md)] AutoStats that will be introduced in a future release is AutoStats at discovery. When data is loaded into the Lakehouse, this feature proactively creates pre-query statistics for table columns on autogenerated warehouse tables as the Metadata Discovery service discovers them. In addition, it will also periodically update statistics on these tables once enough data has changed. This helps to reduce the likelihood of waiting for statistics creation at query time. More details will be added here once this component is released.

## AutoStats on load for manually created tables

Similar to at discovery AutoStats for warehouse autogenerated tables, we'll also support a proactive, pre-query statistics process called AutoStats on load (or simply "stats on load") for tables that are manually created. Once a table is ingested, statistics are automatically created for the tables' columns and periodically updated once substantial data has changed More details will be added here once this component is released.
-->
## Manual statistics for all tables

You have the option of manually creating statistics objects. If you're familiar with maintaining statistics health, you recognize the [CREATE STATISTICS](/sql/t-sql/statements/create-statistics-transact-sql), [UPDATE STATISTICS](/sql/t-sql/statements/update-statistics-transact-sql), and [DROP STATISTICS](/sql/t-sql/statements/drop-statistics-transact-sql) statements. Currently, a limited version of these statements is supported. See the following examples:

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

Only single-column FULLSCAN and single-column SAMPLE-based statistics are supported. When no option is included, FULLSCAN statistics are created.

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

Resample (using the last recent sample percentage) isn't supported.

When `statistics_name` isn't specified, statistics for all columns in the table are updated.

### DROP STATISTICS

```sql
DROP STATISTICS [ schema_name . ] table_name.statistics_name
[;]
```

Likewise, the following T-SQL constructs exist and can be used to check both manually created and automatically created statistics in [!INCLUDE [product-name](../includes/product-name.md)]:

- [sys.stats](/sql/relational-databases/system-catalog-views/sys-stats-transact-sqll) catalog view
- [DBCC SHOW_STATISTICS](/sql/t-sql/database-console-commands/dbcc-show-statistics-transact-sql?view=sql-server-ver16&preserve-view=true) DBCC statement

  ```sql
  DBCC SHOW_STATISTICS ( table_name , target )
      [ WITH { STAT_HEADER | DENSITY_VECTOR | HISTOGRAM } [ ,...n ] ]
  [;]
  ```

- [sys.stats_columns](/sql/relational-databases/system-catalog-views/sys-stats-columns-transact-sql) catalog view
- [STATS_DATE](/sql/t-sql/functions/stats-date-transact-sql) system function

## Known limitations

- Automatic updates of statistics isn't currently supported. When a table's data changes, expect for stats to be recreated at the next query for a particular column.
- AutoStats at discovery isn't currently supported, which means statistics for autogenerated tables will be created first at query time. Queries that reference a column (in JOIN, GROUP BY, etc.) for the first time may be slower than its subsequent runs, as statistics for those columns are generated.
- AutoStats on load isn't currently supported.
- Statistics (of any kind) aren't currently supported for LOB types: nvarchar(max), varchar(max), and varbinary(max).
- Other statistics objects may show under [sys.stats](/sql/relational-databases/system-catalog-views/sys-stats-transact-sql) aside from manually created stats and automatically created stats. These objects should be ignored.

## Next steps

- [Monitoring connections, sessions, and requests using DMVs](monitor-using-dmv.md)
