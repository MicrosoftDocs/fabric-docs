---
title: Monitor your running and completed queries using Query activity
description: Learn about monitoring your running and completed queries using Query activity.
author: jacindaeng
ms.author: jacindaeng
ms.reviewer: wiassaf
ms.date: 05/01/2024
ms.topic: conceptual
ms.search.form: Monitoring # This article's title should not change. If so, contact engineering.
---
# Monitor your running and completed queries using Query activity

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

> [!NOTE]
> You must be an admin in your workspace to access Query activity. Members, Contributors, Viewers do not have permission to access this view.

> [!NOTE]
> This feature is available for Microsoft Fabric Warehouse and Lakehouse SQL Analytics Endpoint.

Monitoring SQL queries is essential for maintaining the performance and efficiency of the warehouse to ensure that queries aren’t taking longer than expected to execute and are completing successfully. With Query activity, you have a one-stop view of all running and historical queries along with a list of long-running and frequently run queries without having to run any T-SQL code. 

## Getting started

There are two ways you can launch the Query activity experience.

Click on **More Options (…)** next to the warehouse you want to monitor within the workspace view and select **Query activity**.

:::image type="content" source="media\query-activity\query-activity-entry-point-workspace.png" alt-text="Screenshot of the Query activity entry point from the workspace context menu." lightbox="media\query-activity\query-activity-entry-point-workspace.png":::

Or once you are within the query editor of the warehouse you want to monitor, click on **Query activity** in the ribbon. 

:::image type="content" source="media\query-activity\query-activity-entry-point-ribbon.png" alt-text="Screenshot of the Query activity entry point from the ribbon." lightbox="media\query-activity\query-activity-entry-point-ribbon.png":::

## Query runs 

On the Query runs page, you can see a list of running, succeeded, canceled, and failed queries up to the past 30 days. You can use the filter dropdown to select a certain status, submitter, or submit time you would like to view queries from. If there is a specific keyword in the query text or another column you would like to search up by, you can use the search bar in the top right corner to look it up. 

For each query, the following details are provided:

| Column name   |  Description |
|---|---|
|**Distributed statement Id**|Unique ID for each query|
|**Query text**|Text of the executed query (up to 8000 characters)|   
|**Submit time (UTC)**|Timestamp when the request arrived|
|**Duration**|Time it took for the query to execute|
|**Status**|Query status (Running, Succeeded, Failed, or Canceled)|   
|**Submitter**|Name of the user or system that sent the query|
|**Session Id**|ID linking the query to a specific user session|   
|**Run source**|Name of the client program that initiated the session|

When you want to reload the queries that are displayed on the page, click on the **Refresh** button in the ribbon. If you see a query that is running that you would like to immediately stop the execution of, select the query using the checkbox and click on the **Cancel** button. You’ll be prompted with a dialog to confirm before the query is canceled. Any unselected queries that are part of the same SQL session as the run(s) you selected will also be canceled. 

:::image type="content" source="media\query-activity\cancel-dialog.png" alt-text="Screenshot of the Query runs cancel dialog." lightbox="media\query-activity\cancel-dialog.png":::

The same information regarding running queries from Query runs can also be found by running [Monitor connections, sessions, and requests using DMVs](query-activity.md)

## Query insights 

On the Query insights page, you can see a list of long running queries and frequently run queries to help determine any trends within your warehouse’s queries. 

For each query in the **Long running queries** insight, the following details are provided:

| Column name   |  Description |
|---|---|
|**Query text**|Text of the executed query (up to 8000 characters)|   
|**Median run duration**|Median query execution time (ms) across runs|
|**Run count**|Total number of times the query was executed|
|**Last run duration**|Time taken by the last execution (ms)|   
|**Last run distributed statement ID**|Unique ID for the last query execution|
|**Last run session ID**|Session ID for the last execution|   

For each query in the **Frequently run queries** insight, the following details are provided:

| Column name   |  Description |
|---|---|
|**Query text**|Text of the executed query (up to 8000 characters)|   
|**Average run duration**|Average query execution time (ms) across runs|
|**Max duration**|Longest query execution time (ms)|
|**Min duration**|Shortest query execution time (ms)|
|**Last run distributed statement ID**|Unique ID for the last query execution|
|**Run count**|Total number of times the query was executed|
|**Count of successful runs**|Number of successful query executions|
|**Count of failed runs**|Number of failed query executions|
|**Count of canceled runs**|Number of canceld query executions|

The same information regarding completed, failed, and canceled queries from Query runs along with aggregated insights can also be found by running query insights views [Query insights in Fabric data warehousing](query-insights.md).

## Considerations and Limitations

- Queries that are initially executed in the warehouse may take up to 7 minutes to show up in Query activity. Once there’s more activity within the Warehouse, the queries populate much more quickly.  
- Historical queries can take up to 15 minutes to appear in Query activity depending on the concurrent workload being executed.
- Only the top 10,000 rows can be shown in the Query runs and Query insights tabs for the given filter selections.  

## Next steps
- [Billing and utilization reporting in Synapse Data Warehouse](usage-reporting.md)
- [Query insights in Fabric data warehousing](query-insights.md)
- [Monitor connections, sessions, and requests using DMVs](query-activity.md)
