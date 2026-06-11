---
title: Time Travel
description: Learn how to query data as it existed in the past with time travel in Fabric Data Warehouse.
ms.reviewer: ajagadish
ms.date: 05/19/2026
ms.topic: concept-article
---
# Query data as it existed in the past

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Microsoft Fabric offers the capability to query historical data as it existed in the past in warehouse and SQL analytics endpoint items (preview). The ability to query data from a specific timestamp is known in the data warehousing industry as *time travel*.

- Time travel facilitates stable reporting by maintaining the consistency and accuracy of data over time.
- Time travel enables historical trend analysis by querying across various past points in time, and helps anticipate the future trends.
- Time travel simplifies low-cost comparisons between previous versions of data.
- Time travel aids in analyzing performance over time.
- Time travel allows organizations to audit data changes over time, often required for compliance purposes.
- Time travel helps to reproduce the results from machine learning models.
- Time travel can query tables as they existed at a specific point in time across multiple warehouses in the same workspace.
- Time travel hints can be used with session-scoped temp tables, which are unaffected by `TIMESTAMP` syntax.

## What is time travel?

Time travel in a data warehouse is a low-cost and efficient capability to quickly query prior versions of data.

Microsoft Fabric currently allows retrieval of past states of data in the following ways:

- [At the statement level with FOR TIMESTAMP AS OF](#time-travel-with-the-for-timestamp-as-of-t-sql-command)
- [At the table level with CLONE TABLE](clone-table.md)

### Time travel with the FOR TIMESTAMP AS OF T-SQL command

Tables can be queried using the [OPTION FOR TIMESTAMP AS OF](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true#for-timestamp) T-SQL syntax to retrieve data at past points in time. The `FOR TIMESTAMP AS OF` clause affects the entire statement, including all joined warehouse tables.

The results obtained from the time travel queries are inherently read-only. Write operations such as [INSERT](/sql/t-sql/statements/insert-transact-sql?view=fabric&preserve-view=true), [UPDATE](/sql/t-sql/queries/update-transact-sql?view=fabric&preserve-view=true), and [DELETE](/sql/t-sql/statements/delete-transact-sql?view=fabric&preserve-view=true) cannot occur while utilizing the [FOR TIMESTAMP AS OF query hint](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true). 

Use the [OPTION clause](/sql/t-sql/queries/option-clause-transact-sql?view=fabric&preserve-view=true) to specify [the FOR TIMESTAMP AS OF query hint](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true). Queries return data exactly as it existed at the timestamp, specified as `YYYY-MM-DDTHH:MM:SS[.fff]`. For example:

```sql
SELECT *
FROM [dbo].[dimension_customer] AS DC
OPTION (FOR TIMESTAMP AS OF '2024-03-13T19:39:35.28'); --March 13, 2024 at 7:39:35.28 PM UTC
```

Use the `CONVERT` syntax for the necessary datetime format with [style 126](/sql/t-sql/functions/cast-and-convert-transact-sql?view=fabric&preserve-view=true#date-and-time-styles).

The timestamp can be specified only once using the `OPTION` clause for queries, stored procedures, views, etc. The `OPTION` applies to everything within the [SELECT](/sql/t-sql/queries/select-transact-sql?view=fabric&preserve-view=true) statement.

For samples, see [How to: Query using time travel](how-to-query-using-time-travel.md).

## Data retention in Fabric Data Warehouse

- For Fabric Data Warehouse, time travel is limited by the [warehouse configurable data retention period](data-retention.md), which is automatic.
- For a Lakehouse SQL analytics endpoint, time travel is limited at the table level by [vacuum retention settings](../data-engineering/lakehouse-table-maintenance.md#vacuum-retention-settings). Lakehouse table maintenance can be run manually in the Fabric portal or as a scheduled and orchestrated process by using notebooks, pipelines, or REST API.

In Microsoft Fabric, a warehouse automatically preserves and maintains various versions of the data based on the [configured retention period](data-retention.md). The **default warehouse retention period is 30 calendar days**, and can be configured based on your organization's needs. This allows the ability to query tables as of any prior point-in-time within the retention window. All inserts, updates, and deletes made to the warehouse are retained.
 
The retention automatically begins from the moment the warehouse is created. Expired files are automatically deleted after the retention threshold.

- Currently, a `SELECT` statement with the `FOR TIMESTAMP AS OF` query hint returns the *latest* version of table *schema*.
- Any records that are deleted in a table are available to be queried as they existed before deletion, if the deletion is within the retention period.
- A time-travel query to a point in time before the schema change succeeds only when it references columns that already existed at that point in time, and fails if it references columns introduced later.

## Time travel scenarios

Consider the ability to time travel to prior data in the following scenarios:

### Stable reporting

Frequent execution of extract, transform, and load (ETL) jobs is essential to keep up with the ever-changing data landscape. The ability to time travel supports this goal by ensuring data integrity while providing the flexibility to generate reports based on the query results that are returned as of a past point in time, such as the previous evening, while background processing is ongoing.

ETL activities can run concurrently while the same table is queried as of a prior point-in-time.

#### Historical trend and predictive analysis

Time travel simplifies the analysis of historical data, helping uncover valuable trends and patterns through querying data across various past time frames. This facilitates predictive analysis by enabling experimenting with historical datasets and training of predictive models. It aids in anticipating future trends and helps making well-informed, data-driven decisions.

#### Analysis and comparison

Time travel offers an efficient and cost-effective troubleshooting capability by providing a historical lens for analysis and comparison, facilitating the identification of root cause.

#### Performance analysis

Time travel can help analyze the performance of warehouse queries overtime. This helps identify the performance degradation trends based on which the queries can be optimized.

#### Audit and compliance

Time travel streamlines auditing and compliance procedures by empowering auditors to navigate through data history. This not only helps to remain compliant with regulations but also helps enhance assurance and transparency.

#### Machine learning models

Time travel capabilities help in reproducing the results of machine learning models by facilitating analysis of historical data and simulating real-world scenarios. This enhances the overall reliability of the models so that accurate data driven decisions can be made.

#### Design considerations

Considerations for the [OPTION FOR TIMESTAMP AS OF query hint](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true#for-timestamp):

- The `FOR TIMESTAMP AS OF` query hint cannot be used to create the views as of any prior point in time within the retention period. It can be used to query views as of past point in time, within the retention period.
- The `FOR TIMESTAMP AS OF` query hint can be used only once within a `SELECT` statement.
- The `FOR TIMESTAMP AS OF` query hint can be defined within the `SELECT` statement in a stored procedure.
- The `FOR TIMESTAMP AS OF` query hint doesn't affect session-scoped temp tables, like `#temp_table`.

## Permissions to time travel

Any user who has **Admin**, **Member**, **Contributor**, or **Viewer** [workspace roles](../data-warehouse/workspace-roles.md) can query the tables as of a past point-in-time. When users query tables, the restrictions imposed by column-level security ([CLS](column-level-security.md)), row-level security ([RLS](row-level-security.md)), or dynamic data masking ([DDM](dynamic-data-masking.md)) are automatically imposed.

## Limitations

- Any modifications made to the schema of a table, including but not limited to adding or removing columns, are only queryable from the point in time the change was made. A time-travel query to a point in time before the schema change succeeds only when it references columns that already existed at that point in time, and fails if it references columns introduced later. Similarly, dropping and recreating a table with the same data removes its history.
- Supply at most three digits of fractional seconds in the timestamp. If you supply more precision, you receive the error message `An error occurred during timestamp conversion. Please provide a timestamp in the format yyyy-MM-ddTHH:mm:ss[.fff]. Msg 22440, Level 16, State 1, Code line 29`.
- Currently, only the Coordinated Universal Time (UTC) time zone is used for time travel.
- Currently, the data retention for time travel queries is configurable from 1 to 120 calendar days. The default retention period is thirty calendar days. For more information, see [Configurable data retention](data-retention.md).
- `FOR TIMESTAMP AS OF` values in the `OPTION` clause must be deterministic. For an example of parameterization, see [Time travel in a stored procedure](how-to-query-using-time-travel.md#time-travel-in-a-stored-procedure).
- The [OPTION FOR TIMESTAMP AS OF query hint](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true#for-timestamp) can only be used in queries that begin with `SELECT` statement. 
- View definitions cannot contain the `OPTION FOR TIMESTAMP AS OF` T-SQL syntax. The view can be queried with the `SELECT .. FROM <view> ... OPTION FOR TIMESTAMP AS OF` T-SQL syntax. However, you cannot query past data from tables in a view from before the view was created.
- The `FOR TIMESTAMP AS OF` T-SQL syntax for time travel is not currently supported in Power BI Desktop Direct query mode or the **Explore this data** option.
- Currently, time travel for SQL analytics endpoints is only enabled for SQL analytics endpoints created with the [New metadata sync (preview)](../data-engineering/sql-analytics-endpoint-metadata-sync.md#new-metadata-sync-preview) enabled.

## Next step

> [!div class="nextstepaction"]
> [How to: Query using time travel](how-to-query-using-time-travel.md)

## Related content

- [Configurable data retention](data-retention.md)
- [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)
- [Query hints](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true)
