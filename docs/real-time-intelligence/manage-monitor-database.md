---
title: Manage and monitor a KQL database
description: Learn how to manage and monitor a KQL database and gain insights from the system information in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 01/29/2026
ms.subservice: rti-eventhouse
ms.search.form: Database
#customer intent: As a user, I want to learn how to manage and monitor a KQL  database so that I can effectively utilize Real-Time Intelligence.
---
# Manage and monitor a database

The main page of your KQL database shows an overview of the contents and activity of your database. You can track data activity, preview tables, and gain insights into the database table schemas.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An [eventhouse](create-eventhouse.md) in your workspace
* A [KQL database](create-database.md) in your eventhouse

## Navigate to a database page

1. Browse to your workspace homepage in Real-Time Intelligence.

1. Select an eventhouse from your list of items in the workspace.

1. Select a database from your list of KQL databases.

:::image type="content" source="media/create-database/database-dashboard-new.png" alt-text="Screenshot of KQL database main page." lightbox="media/create-database/database-dashboard-new.png":::

This page is divided into the following sections:

A. **Database ribbon**: The ribbon provides quick access to essential actions within the database.

B. **Explorer pane**: The explorer pane provides an intuitive interface for navigating between databases.

C. **Main view area**: The main view area displays the main database activities, such as querying data, ingesting data, and the database tables.

D. **Details area**: The details area provides additional information about the database.

## Manage KQL Databases

You can manage the databases in the eventhouse by using the options in the [Database ribbon](#database-ribbon) or in the [Explorer pane](#explorer-pane) under **KQL Databases**.

### Database ribbon

The database ribbon is your quick-access action bar, offering a convenient way to manage your database.

:::image type="content" source="media/create-database/database-tool-bar.png" alt-text="Screenshot showing the KQL Database toolbar icons.":::

From here, you can:

* **Refresh**: use this button to manually refresh the database when live view is disabled.

* Enable **Live view**: to continually refresh the database automatically, enable Live View. Disable to manually refresh the database.

* Create a **New** item in the database. This option includes a table, a materialized view, a table update policy, and a OneLake shortcut.

* **Get data**: select the desired ingest method. To learn more, see [data formats](ingestion-supported-formats.md) and the corresponding ingestion methods.

* **Query with code**: use this option to open the queryset pane where you can write and run queries on the selected database. To learn more about KQL, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

* Add a new [KQL Queryset](create-query-set.md), [Notebook](notebooks.md#create-a-notebook-from-a-kql-database), or [Real-Time Dashboard](dashboard-real-time-create.md#create-a-new-dashboard).

* Manage **Data policies**: For more information, see [Data retention policy](/fabric/real-time-intelligence/data-policies#data-retention-policy).

* View **OneLake**: if available, view the data in [OneLake](event-house-onelake-availability.md).

### Explorer pane

In the Explorer pane, you can:

:::image type="content" source="media/eventhouse/manage-databases.png" alt-text="Screenshot showing the eventhouse KQL Databases section.":::

* Navigate between the databases in your Eventhouse.

* Select the plus sign next to **KQL databases** to [create a new KQL database](create-database.md) or [create a new database shortcut](database-shortcut.md).

* **Search** for a database from the list of databases.

* Open an existing database by selecting the database from the list.

* Hover over the **more menu** in the explorer pane to perform the following actions:

    * To query tables in a database, select  **Query data**.

    * To create a new related item, select **New related item** > and then select [KQL Queryset](create-query-set.md), [Notebook](notebooks.md#create-a-notebook-from-a-kql-database), or [Real-Time Dashboard](dashboard-real-time-create.md#create-a-new-dashboard).

    * To ingest data into a database, select **Get data**.

## Main view area

The main database information pane tracks data activity, and it allows you to preview table details and data, and to view query insights.

At the top of the main view area, select from these options:

* **Query with code**: select to open the queryset for the database.

* **Overview** or **Entity diagram (preview)**: View an overview of the [Data activity tracker](#data-activity-tracker) and the [Tabs - Tables / Data preview / Query Insights](#data-insights) in the main view area, or view the database as an [entity diagram](database-entity-diagram.md).

* **Share**: to share access to a database, select the database from the list and [share the database link](access-database-copy-uri.md#share-a-kql-database-link).

    > [!NOTE]
    > Sharing multiple databases at once isn't supported.

### Data activity tracker

The data activity tracker displays the number of rows loaded into the database and the number of queries, in the selected time range.

:::image type="content" source="media/create-database/database-activity-tracker-tooltip.png" alt-text="Screenshot of KQL data activity tracker." lightbox="media/create-database/database-activity-tracker-tooltip.png":::

| Item| Description|
|---|---|
| **Ingestion** | The number of rows loaded into the database in the selected time range. Select **Ingestion** to view only ingestion data. Select again to view both query and ingestion data. |
| **Queries** | The number of queries that ran in the database in the selected time range. Select **Queries**  to view only query data. Select again to view both query and ingestion data. <br></br> If there are failed, throttled, or canceled queries, you can open the dropdown menu to view them as a percentage compared to the total queries. <br></br> :::image type="content" source="media/create-database/queries-cancelled-menu.png" alt-text="Screenshot of percentage of queries completed.":::|
| **Last run** | The time when the histogram was last generated.|
| Time range | The time range of the histogram display. Set ranges for one hour, six hours, three days, 7 days, or 30 days. |
| Interval | Set the data aggregation interval for the histogram display. Set intervals by one minute, five minutes, 1 hour, 12 hours, one day, 3 days, and 30 days. |
| Refresh | Refresh your histogram manually.|
| Histogram | The query and ingestion data display side by side, each with their own vertical scale. The ingestion scale is on the left, and the query scale is on the right of the histogram.<br><br/>The ingestion histogram displays data by the interval chosen, and displays in UTC time. Hover over the histogram to display total rows ingested and total queries per status. |
| **Open query** | Open the KQL editor with the underlying query preloaded. This step allows you to modify and execute the query directly to analyze the data further. |

### Data insights

This section of the database page main area displays a list of tables in the database, a preview of the data, and query insights.

:::image type="content" source="media/create-database/query-insights.png" alt-text="Screenshot of the database overview page highlighting the query insights area." lightbox="media/create-database/query-insights.png":::

The tabs and graphs show the following information:

| Tab | Description|
|---|---|
| **Tables** | View table information as **Cards** or as a **List**. Cards and lists view table name, *Compressed size*, *Last ingestion*, and *OneLake availability* or latency. </br></br>* Cards uniquely display a histogram of the database ingestion over the past seven days, the number of rows ingested in the last ingestion, and the table creator profile. </br></br>* The list view display also shows total *Row count*, *Original size*, *Compressed size*, *Last ingestion*, *Caching*, *Retention*, *OneLake* status, and *Created on*. To explore a specific table, select the name of this table from the list. For more information, see [Manage and monitor a table](manage-monitor-table.md). |
| **Data preview** | Shows a preview of the top records ingested for each table. Displays *IngestionTime*, *TableName*, and *Record*. Select **Columns** to select columns and values for a Pivot view. You can also search for keywords and use the filter tables option.|
| **Query insights** | Shows query duration, cache hit misses over time, and top queries.<br></br>* **Queries duration (sec) percentiles over time**: The query duration percentiles represent the duration values in seconds or milliseconds, below which 50%, 75%, and 90% of the query durations fall, respectively. To see the query duration details at a specific point in time, hover over the graph and the details pop up.<br></br>* **Cache hit misses over time (%)**: High cache miss percentage indicates requested data wasn't in cache, leading to longer query durations.<br></br>* **Top queries**: A list of queries that you can sort according to most recent, longest duration, highest CPU usage, highest cold storage usage, or highest memory peak usage. You can also filter the queries by complete, failed, throttled, or canceled. To sort, use the **Top by:** menu.</br> :::image type="content" source="media/create-database/queries-top-by-menu.png" alt-text="Screenshot of queries menu to see percentage of queries completed."::: |

In most graphs, you can select the **Open query** in the ellipsis menu to open the KQL editor with the underlying query preloaded. This step allows you to modify and execute the query directly to analyze the data further.

## Database details

The right pane displays details of the selected database showing the following information:

 **Size**

| Item| Description|
|---|---|
| Compressed | Total size of compressed data.|
| Original | Total size of uncompressed data.|

**OneLake**

| Item| Description|
|---|---|
| Availability| Set OneLake availability to **Enabled** or **Disabled**. When you enable OneLake availability, you can't rename tables.|
| Latency| The maximum time until data is available across tables in OneLake.|
| Table number |The number of tables available in OneLake. |
| OneLake path | Copy the OneLake folder path for creating shortcuts.|

**Overview**

| Item| Description |
|---|---|
| Created by | The user name of person who created the database.|
| Created on | The creation date of the database, if available.|
| Region | Shows the region where your capacity is hosted. For more information, see [Fabric region availability](../admin/region-availability.md).|
| Query URI | The URI used to run queries or management commands.|
| Last ingestion | The date of the last data ingestion.|
| Ingestion URI | The date of the last data ingestion and the URI that can be used to get data.|
| Caching Policy | The time period in which data is cached and kept in local SSD storage. For more information, see [Caching policy](/fabric/real-time-intelligence/data-policies#caching-policy).|
| Retention Policy | The time period after which data is automatically removed from tables or materialized views. For more information, see [Data retention policy](/fabric/real-time-intelligence/data-policies#data-retention-policy).|

## Related content

* [Create an empty table](create-empty-table.md)
* [Manage and monitor tables](manage-monitor-table.md)
* [Data management](data-management.md)
