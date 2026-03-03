---
title: "Tutorial: Use Data Clustering in Fabric Data Warehouse"
description: This tutorial explains how to use data clustering for better query performance in Fabric Data Warehouse.
ms.reviewer: procha
ms.date: 11/11/2025
ms.topic: tutorial
---
# Use data clustering in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Data clustering in Fabric Data Warehouse organizes data for faster query performance and reduced compute usage. This tutorial walks through the steps to create tables with data clustering, from creating clustered tables to checking their effectiveness.

### Prerequisites

- A Microsoft Fabric tenant account with an active subscription.
- Make sure you have a Microsoft Fabric enabled Workspace: [Create a workspace](../fundamentals/create-workspaces.md).
- Make sure you have already created a Warehouse. To create a new Warehouse, refer to [Create a Warehouse in Microsoft Fabric](create-warehouse.md).
- Basic understanding of T-SQL and querying data.

## Import sample data
This tutorial uses the NY Taxi sample data set. To import the NY Taxi data into your Warehouse. Use the [Load Sample data to Data Warehouse tutorial](../data-factory/tutorial-load-sample-data-to-data-warehouse.md) tutorial.

## Create a table with data clustering

For this tutorial, we need two copies of the NYTaxi table: the regular copy of the table as imported from the tutorial, and a copy that uses data clustering. Use the following command to create a new table using `CREATE TABLE AS SELECT` (CTAS), based on the original NYTaxi table:

```sql
CREATE TABLE nyctlc_With_DataClustering 
WITH (CLUSTER BY (lpepPickupDatetime)) 
AS SELECT * FROM nyctlc
```

> [!NOTE]
> The example assumes the table name given to the NY Taxi dataset in the Load Sample data to Data Warehouse tutorial. If you used a different name for your table, adjust the command to replace `nyctlc` with your table name.

This command creates an exact copy of the original NYTaxi table, but with data clustering on the `lpepPickupDatetime` column. Next, we use this column for querying.

## Query data

Run a query on the NYTaxi table, and repeat the exact same query on the NYTaxi_With_DataClustering table for comparison. 

> [!NOTE]
> For this analysis, it's beneficial to look at the cold cache performance of both runs – that is, without using the caching features of Fabric Data Warehouse. Therefore, run each query exactly once before you look at the results in Query Insights.

We use a query that is often repeated in the Warehouse. This query computes the average fare amount by year between the dates `2008-12-31` and `2014-06-30`:

```sql
SELECT
    YEAR(lpepPickupDatetime), 
    AVG(fareAmount) as [Average Fare]
FROM 
    NYTaxi
WHERE 
    lpepPickupDatetime BETWEEN '2008-12-31' AND '2014-06-30'
GROUP BY 
    YEAR(lpepPickupDatetime)
ORDER BY 
    YEAR(lpepPickupDatetime) DESC
OPTION (LABEL = 'Regular');
```

> [!NOTE]
> The [label option](query-label.md) used in this query is useful when we compare the query details of the `Regular` table against the one that uses data clustering later using [Query Insights views](query-insights.md).

Next, we repeat the exact same query, but on the version of the table that uses data clustering: 

```sql
SELECT 
    YEAR(lpepPickupDatetime), 
    AVG(fareAmount) as [Average Fare]
FROM 
    NYTaxi_With_DataClustering
WHERE 
    lpepPickupDatetime BETWEEN '2008-12-31' AND '2014-06-30'
GROUP BY 
    YEAR(lpepPickupDatetime)
ORDER BY 
    YEAR(lpepPickupDatetime) DESC
OPTION (LABEL = 'Clustered');
```

The second query uses the label `Clustered` to allow us to identify this query later with [Query Insights](query-insights.md).

## Check the effectiveness of data clustering

After setting up clustering, you can assess its effectiveness using Query Insights. Query Insights in Fabric Data Warehouse captures historical query execution data and aggregates it into actionable insights, such as identifying long-running or frequently executed queries.

In this case, we use Query Insights to compare difference in data scanned between the regular and the clustered cases. 

Use the following query:

```sql
SELECT 
    label, 
    submit_time, 
    row_count,
    total_elapsed_time_ms, 
    allocated_cpu_time_ms, 
    result_cache_hit, 
    data_scanned_disk_mb, 
    data_scanned_memory_mb, 
    data_scanned_remote_storage_mb, 
    command 
FROM 
    queryinsights.exec_requests_history 
WHERE 
    command LIKE '%NYTaxi%' 
    AND label IN ('Regular','Clustered')
ORDER BY 
    submit_time DESC;
```

This query fetches details from the `exec_requests_history` view. For more information, see [queryinsights.exec_requests_history (Transact-SQL)](/sql/relational-databases/system-views/queryinsights-exec-requests-history-transact-sql?view=fabric&preserve-view=true).

The query filters the results the following ways:

- Fetches only rows that contain the `NYTaxi` text in the command name (as was used in the test queries) 
- Fetches only rows where the label value was either regular or clustered

> [!NOTE]
> It might take a few minutes for your query details to become available in Query Insights. If your Query Insights query returns no results, try again after a few minutes.

Running this query, we observe the following results:

:::image type="content" source="media/tutorial-data-clustering/checking-effectiveness.png" alt-text="Table comparing query execution metrics for two labels: Clustered and Regular. The Regular query used more resources." lightbox="media/tutorial-data-clustering/checking-effectiveness.png":::

Both queries have a row count of 6 and similar submit times. The `Clustered` query shows `total_elapsed_time_ms` of 1794, `allocated_cpu_time_ms` of 1676, and `data_scanned_remote_storage_mb` of 77.519. The `Regular` query shows `total_elapsed_time_ms` of 2651, `allocated_cpu_time_ms` of 2600, and `data_scanned_remote_storage_mb` of 177.700. These numbers demonstrate that even though both queries returned the same results, the `Clustered` version used approximately 36% less CPU time than the `Regular` version and scanned approximately 56% less data on disk. No cache was used in either query run. These are significant results to help reduce query execution time and consumption usage, and make the `lpepPickupDatetime` column a strong candidate for data clustering.

> [!NOTE]
> This is a small table, with approximately 76 million rows and 2GB of data volume. Even though this query returns only six rows on its aggregation (one for each year in the range), it scans approximately 8.3 million rows in the date range provided before results are aggregated. Actual production data with larger data volumes can provide more significant results. Your results might vary based on the capacity size, cached results, or concurrency during the queries.

## Related content

- [Data Clustering in Fabric Data Warehouse](data-clustering.md)
- [Query insights in Fabric Data Warehouse](query-insights.md)
- [Monitor Fabric Data Warehouse](monitoring-overview.md)
- [Use query labels in Fabric Data Warehouse](query-label.md)