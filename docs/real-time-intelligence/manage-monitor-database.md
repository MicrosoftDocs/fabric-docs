---
title: Manage and monitor an KQL database
description: Learn how to manage and monitor a KQL database and gain insights from the system information in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: how-to
ms.custom:
ms.date: 03/18/2025
ms.search.form: Database
#customer intent: As a user, I want to learn how to manage and monitor a KQL  database so that I can effectively utilize Real-Time Intelligence.
---
# Manage and monitor a database

The main page of your KQL database shows an overview of the contents and activity of your database. You track database activity, preview tables, gain insights into the database table schemas. This article provides an overview of the main page of a KQL database and how to navigate to a database table page.

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

A. **Database ribbon**: The ribbon provides quick access to essential actions within the Eventhouse.

B. **Explorer pane**: The explorer pane provides an intuitive interface for navigating between Eventhouse views and working with databases.

C. **Main view area**: The main view area displays the main database activities, such as querying data, ingesting data, and the database tables.

D. **Details area**: The details area provides additional information about the database.

## Database ribbon

The Eventhouse ribbon is your quick-access action bar, offering a convenient way to perform essential tasks within a database. From here, you can get data, query with code, add a new related item such as a notebook or dashbooard, explore data policies, and if available, open OneLake.

## Explorer pane

The database explorer provides an intuitive interface for navigating between the databases in your Eventhouse. You can also use the more menu in the explorer pane to [Manage and monitor an eventhouse](manage-monitor-eventhouse.md#manage-kql-databases).

## Database details

The right pane displays the details of the selected database.
<!--| Size? | Compression ratio | Compression ratio of the data.|-->

|Card | Item| Description|
|---|---|---|
| **Size** |
| | Compressed| Total size of compressed data.|
| | Original | Total size of uncompressed data.|
| **OneLake** |
| | Availability| Set OneLake availability to **Enabled** or **Disabled**. When OneLake availability is enabled, tables can't be renamed.|
| | Latency| The maximum time until data is available across tables in OneLake.|
| | Table number |The number of tables available in OneLake. |
| | OneLake path | Copy the OneLake folder path for creating shortcuts.|
|**Overview** |
| | Created by | The user name of person who created the database.|
| | Created on | The creation date of the database, if available.|
| | Region | Shows the region where your capacity is hosted. For more information, see [Fabric region availability](../admin/region-availability.md).|
| | Query URI | The URI used to run queries or management commands.|
| | Last ingestion | The date of the last data ingestion.|
| | Ingestion URI | The date of the last data ingestion and the URI that can be used to get data.|
| | Caching Policy | The time period in which data is cached and kept in local SSD storage. For more information, see [Caching policy](/fabric/real-time-intelligence/data-policies#caching-policy).|
| | Retention Policy | The time period after which data is automatically removed from tables or materialized views. For more information, see [Data retention policy](/fabric/real-time-intelligence/data-policies#data-retention-policy).|

## Main view area

The main database information pane tracks data activity, allows you to preview table details and data, and to view query insights. <!-- and, ingestion failures. Add post fabcon -->

At the top of the main view area, you can select these options:

* **Live View** - toggle between the options to manually refresh the database or if the interface with continually refresh the database.
* **Refresh** - use this button to manually refresh the database, when live view is disabled.
* **Query with code** - select to open the queryset for the database.
* **Overview** - select to view the database activity tracker and database tables in the main view area.
* **Entity diagram (preview)** - select to view the dtatabase as an [entiity diagram](database-entity-diagram.md).

### Database activity tracker

The database activity tracker displays the number of rows loaded into the database and the number or queries, in the selected time range.

:::image type="content" source="media/create-database/database-activity-tracker-tooltip.png" alt-text="Screenshot of KQL database activity tracker area." lightbox="media/create-database/database-activity-tracker-tooltip.png":::

|Card | Item| Description|
|---|---|---|
| | Ingestion | The number of rows loaded into the database in the selected time range. You can toggle between viewing both query and ingestion data, or only ingestion data. |
| | Query | The number of queries run in the database in the selected time range. You can toggle between viewing both query and ingestion data, or only query data.|
| | Last run | The time when the histogram was last generated.|
| | Time range | The time raqge of the histogram display. Set ranges for one hour, 6 hours, three days, 7 days, or 30 days. |
| | Interval | Set the interval of the histogram display. Set intervals by one minute, five minutes, one hour, 12 hours, one day, three days, and 30 days. |
| | Refresh | Refresh your histogram.|
| | Histogram | The query and ingestion data display side by side, each with their own vertical scale. The ingestion scale is on the left, and the query scale is on the right of the histogram. The ingestion histogram displays data by the interval chosen. The interval is calculated by a full coordinated universal time (UTC) day, but displays according to the local time. Hover over the histogram to display total rows ingested and total queries per status. |

### Tables

The tables section displays a list of tables in the database, with the following information:

|**Tables**|
| | Tables display | View table information by **Cards** or by **List** view. </br></br>Cards and list view both display table name, *Compressed size*, *Last ingestion*, and *OneLake availability* or latency. </br></br>Cards uniquely display a histogram of the database ingestion over the past seven days, the number of rows ingested in the last ingestion, and the table creator profile. </br></br>The list view display also shows total *Row count*, *Original size*, *Compressed size*, *Last ingestion*, Caching*, *Retention*, *OneLake* status, and *Created on*. |
|**Data preview**|
| | Data preview | Shows a preview of the top 200 records ingested for each table. Displays *IngestionTime*, *TableName*, and *Record*. Select **Columns** to select columns and values for a Pivot view.|
|**Query insights - top 100 queries**|
| | Query insights| Shows the top 100 records from the last year. |
<!--| | Cache hit misses over time|  |
| | Top queries | You can top by latest, duration, CPU time, cold storage access, or by memory peak. |
|**Ingestion failures**|
| | Ingestion failures | Highlights permanent failures only. Shows the time, table, and details of the ingestion failure.|-->

## Navigate to a database table page

1. Browse to your database from your list of KQL databases.  

1. In the Explorer pane, expand **Tables**. A list of tables in your database is displayed.

1. Select a table from the list. Alternatively, in the main view area > Tables tab > seect a table name.

The table page is divided into the following sections:

A. **Main view area**: The main view area displays the main table name, table data activity tracler, a preview of the data in the table, and the table schema insights.

B. **Details area**: The details area provides additional information about the table.

### Table details

The right information pane displays the details of the selected table.

| Card | Item| Description|
|---|---|---|
| **Size**|
| | Compressed | Total size of compressed data.|
| | Original size | Total size of uncompressed data.|
| **OneLake**|
| | Availability | Set OneLake availability to **Enabled** or **Disabled**. When OneLake availability is turned on, tables can't be renamed. |
<!--| | Latency| The maximum time until table data is available in OneLake.|
| | Since | The start time from when availability is recorded. |
| | OneLake path | OneLake folder path that can be used for creating shortcuts.|-->
|**Overview**|
| | Row count | The number of rows in the table.|
| | Rows ingested last 24h | The number of rows ingested in the last 24 hours.|
| | Schema last altered by | When the schema was last altered and by whom.|
| | Ingestion URI | The date of the last data ingestion and the URI that can be used to get data.|
| | Caching Policy | The time period in which data is cached and kept in local SSD storage. For more information, see [Caching policy](/fabric/real-time-intelligence/data-policies#caching-policy).|
| | Retention Policy | The time period after which data is automatically removed from tables or materialized views. For more information, see [Data retention policy](/fabric/real-time-intelligence/data-policies#data-retention-policy).|

### Main view area

The center table information pane depicts a histogram of the ingestion data, table information, and a means to preview the table data and schema insights.

:::image type="content" source="media/create-database/database-table-details.png" alt-text="Screenshot of table main view area." lightbox="media/create-database/database-table-details.png":::

|Card | Item| Description|
|---|---|---|
|**Histogram**|
| | ingestion | The number of rows ingested into the database.|
| | Last run | The time when the histogram was last generated.|
| | Time range | The time raqge of the histogram display. Set ranges for one hour, 6 hours, three days, 7 days, or 30 days. |
| | Interval |Set the interval of the histogram display. Set intervals by one hour, six hours, one day, three days, 7 days, and 30 day intervals. The interval is calculated by a full coordinated universal time (UTC) day, but displays according to the local time. |
| | Refresh | Refresh your histogram.|
| | Histogram | The ingestion histogram displays data by the time range and interval chosen.|
|**Data preview**|
| | Quick query | Shows a preview of the table ingestion results. Displays Ingestion time, TableName, and Record. Select **Columns** to select columns and values for a Pivot view.|
|**Schema insights**|
| | Columns | For each column in a table, shows insights for column values, such as date ranges, minimum and maximum values, or the number of unique values.|
| | Top 10 | Select a column listed in the *Columns* section to display the top 10 values for that column.|

## Related content

* [Create a KQL database](create-database.md)
* [Create an eventhouse](create-eventhouse.md)
* [Manage and monitor an eventhouse](manage-monitor-eventhouse.md)
