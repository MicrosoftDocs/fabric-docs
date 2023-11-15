---
title: Ingest data into your Warehouse using Transact-SQL
description: Follow steps to ingest data into a Warehouse table using Transact-SQL
author: periclesrocha
ms.author: procha
ms.reviewer: wiassaf
ms.date: 11/15/2023
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Ingesting data
---

# Ingest data into your Warehouse using Transact-SQL

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

The Transact-SQL language offers options you can use to load data at scale from existing tables in your lakehouse and warehouse into new tables in your warehouse. These options are convenient if you need to create new versions of a table with aggregated data, versions of tables with a subset of the rows, or to create a table as a result of a complex query. Let's explore some examples.

## Creating a new table with the result of a query by using CREATE TABLE AS SELECT (CTAS)

The **CREATE TABLE AS SELECT (CTAS)** statement allows you to create a new table in your warehouse from the output of a `SELECT` statement. It runs the ingestion operation into the new table in parallel, making it highly efficient for data transformation and creation of new tables in your workspace.

> [!NOTE] 
> The examples in this article use the Bing COVID-19 sample dataset. To load the sample dataset, follow the steps in [Ingest data into your Warehouse using the COPY statement](ingest-data-copy.md) to create the sample data into your warehouse.

The first example illustrates how to create a new table that is a copy of the existing `dbo.[bing_covid-19_data_2023]` table, but filtered to data from the year 2023 only:

```sql
CREATE TABLE [dbo].[bing_covid-19_data_2023]
AS
SELECT * 
FROM [dbo].[bing_covid-19_data] 
WHERE DATEPART(YEAR,[updated]) = '2023';
```

You can also create a new table with new `year`, `month`, `dayofmonth` columns, with values obtained from `updated` column in the source table. This can be useful if you're trying to visualize infection data by year, or to see months when the most COVID-19 cases are observed:

```sql
CREATE TABLE [dbo].[bing_covid-19_data_with_year_month_day]
AS
SELECT DATEPART(YEAR,[updated]) [year], DATEPART(MONTH,[updated]) [month], DATEPART(DAY,[updated]) [dayofmonth], * 
FROM [dbo].[bing_covid-19_data];
```

As another example, you can create a new table that summarizes the number of cases observed in each month, regardless of the year, to evaluate how seasonality affects spread in a given country/region. It uses the table created in the previous example with the new `month` column as a source: 

```sql
CREATE TABLE [dbo].[infections_by_month]
AS
SELECT [country_region],[month], SUM(CAST(confirmed as bigint)) [confirmed_sum]
FROM [dbo].[bing_covid-19_data_with_year_month_day]
GROUP BY [country_region],[month];
```

Based on this new table, we can see that the United States observed more confirmed cases across all years in the month of `January`, followed by `December` and `October`. `April` is the month with the lowest number of cases overall:

```sql
SELECT * FROM [dbo].[infections_by_month]
WHERE [country_region] = 'United States'
ORDER BY [confirmed_sum] DESC;
```

:::image type="content" source="media\ingest-data-tsql\infections-by-month.png" alt-text="Screenshot of the query results showing the number of infections by month in the United States, ordered by month, in descending order. The month number 1 is shown on top." lightbox="media\ingest-data-tsql\infections-by-month.png":::

For more examples and syntax reference, see [CREATE TABLE AS SELECT (Transact-SQL)](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true).

## Ingesting data into existing tables with T-SQL queries

The previous examples create new tables based on the result of a query. To replicate the examples but on existing tables, the **INSERT...SELECT** pattern can be used. For example, the following code ingests new data into an existing table:

```sql
INSERT INTO [dbo].[bing_covid-19_data_2023]
SELECT * FROM [dbo].[bing_covid-19_data] 
WHERE [updated] > '2023-02-28';
```

The query criteria for the `SELECT` statement can be any valid query, as long as the resulting query column types align with the columns on the destination table. If column names are specified and include only a subset of the columns from the destination table, all other columns are loaded as `NULL`. For more information, see [Using INSERT INTO...SELECT to Bulk Import data with minimal logging and parallelism](/sql/t-sql/statements/insert-transact-sql?view=fabric&preserve-view=true#using-insert-intoselect-to-bulk-import-data-with-minimal-logging-and-parallelism).

## Ingesting data from tables on different warehouses and lakehouses

For both **CREATE TABLE AS SELECT** and **INSERT...SELECT**, the `SELECT` statement can also reference tables on warehouses that are different from the warehouse where your destination table is stored, by using **cross-warehouse queries**. This can be achieved by using the three-part naming convention `[warehouse_or_lakehouse_name.][schema_name.]table_name`. For example, suppose you have the following workspace assets:

- A lakehouse named `cases_lakehouse` with the latest case data. 
- A warehouse named `reference_warehouse` with tables used for reference data.
- A warehouse named `research_warehouse` where the destination table is created. 

A new table can be created that uses three-part naming to combine data from tables on these workspace assets:

```sql
CREATE TABLE [research_warehouse].[dbo].[cases_by_continent]
AS
SELECT 
FROM [cases_lakehouse].[dbo].[bing_covid-19_data] cases
INNER JOIN [reference_warehouse].[dbo].[bing_covid-19_data] reference
ON cases.[iso3] = reference.[countrycode];
```

To learn more about cross-warehouse queries, see [Write a cross-database SQL Query](query-warehouse.md#write-a-cross-database-query).

## Related content

- [Ingesting data into the Warehouse](ingest-data.md)
- [Ingest data using the COPY statement](ingest-data-copy.md)
- [Ingest data using Data pipelines](ingest-data-pipelines.md)
- [Write a cross-database SQL Query](query-warehouse.md#write-a-cross-database-query)
