---
title: Manage and Monitor an Eventhouse
description: Learn how to manage and monitor an eventhouse and gain insights from the system information in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: concept-article
ms.custom: sfi-image-nochange
ms.subservice: rti-eventhouse
ms.date: 05/26/2026
ms.search.form: Eventhouse
#customer intent: As a user, I want to learn how to manage and monitor an eventhouse so that I can effectively utilize Real-Time Intelligence.
---
# Manage and monitor an eventhouse

An Eventhouse is a scalable environment for processing and analyzing large volumes of real-time data. It supports structured streaming for continuous data ingestion and analysis, and uses Kusto Query Language (KQL) to easily gain insights from your data. The Eventhouse page serves as the central hub for all your interactions within the Eventhouse environment. It's your gateway to seamlessly manage and monitor an eventhouse, navigate through databases, and perform various Eventhouse-related actions.

## Eventhouse home page

The eventhouse home page is where you can manage and monitor your eventhouse. From here, you can view the [system overview](#system-overview), browse databases, and access monitoring features.

:::image type="content" source="media/eventhouse/event-house-page.png" alt-text="Screenshot showing the main Eventhouse page." lightbox="media/eventhouse/event-house-page.png":::

* **A: Eventhouse ribbon**: The Eventhouse ribbon is your quick-access action bar, offering a convenient way to perform essential tasks within an Eventhouse. From here, you can refresh the eventhouse page, enable always-on, add databases, add plugins, and collapse or expand the details area.

* **B: Explorer pane**: The explorer provides an intuitive interface for navigating between eventhouse views, working with databases, and navigating to the monitoring eventhouse.

* **C: Main pane**: The main view area displays various eventhouse system overview information or database overview information, depending on what you select in the explorer pane.

* **D: Eventhouse details**: The eventhouse details area displays the region, last ingestion date, minimum consumption setting, and plugins. You can expand or collapse the details area using the button, or from the ribbon. 

  In the details area, you can copy the following eventhouse URI values:

  * **Query URI**: URI that can be used to [add database shortcuts](database-shortcut.md) or by [connectors](event-house-connectors.md) and APIs to run queries or management commands.

  * **Ingestion URI**: URI that is for use by connectors and APIs to ingest data.

An eventhouse can have multiple **Related elements**, such as KQL databases, real-time dashboards, activators, and more. You can easily navigate to these related elements from the eventhouse details area.

## System overview

The eventhouse **System overview** provides insights into the eventhouse's health, performance, and activity, including storage usage, compute usage, ingestion rates, and more. <!--You can also view advisory findings that proactively alert you to potential capacity issues.-->

* [Running state](#running-state)
* [Eventhouse storage](#eventhouse-storage)
* [Storage resources](#storage-resources)
* [Time range filter](#time-range-filter)
* [Activity in minutes](#activity-in-minutes)
* [Ingestion](#ingestion)
* [Top 10 queried databases](#top-10-queried-databases)
* [Top 10 ingested databases](#top-10-ingested-databases)
* [Activity in minutes - top 5 users](#activity-in-minutes---top-5-users)
* [What's new - Last 7 days](#whats-new---last-7-days)

### Running state

Shows the operational status of the eventhouse.

:::image type="content" source="media/eventhouse/system-state.png" alt-text="Screenshot showing the system state icon next to the database name.":::

| State | Description |
|--|--|
| **Running** | The eventhouse is running optimally. |
| **Maintenance** | The eventhouse is temporarily unavailable. Try refreshing the page later. If you enabled security features, try connecting to your environment using a VPN connection. |
| **Missing capacity** | The eventhouse is unavailable because your organization's Fabric compute [capacity reached its limits](../enterprise/throttling.md). Try again later or contact your capacity admin to [increase the capacity](../enterprise/scale-capacity.md). |
| **Suspended capacity** | The capacity used for this eventhouse was suspended. To [reverse the suspension](../enterprise/pause-resume.md), contact your capacity admin. |
| **Unknown** | For unknown reasons, the eventhouse is unavailable. |

### Eventhouse storage

Shows the storage capacity of the eventhouse. The storage capacity is divided into categories:

| Category | Description |
|--|--|
| **Original size** | The uncompressed original data size of the eventhouse. |
| **Compressed size** | The compressed data size of the eventhouse. |
| **Premium** | The amount of Premium storage utilized. This tier is the high-performance storage tier for your most active data, ensuring the fastest possible access for real-time processing and analysis. If all data isn't stored in the Premium cache, query latency might be negatively impacted. For more information, review your [caching policy](data-policies.md#caching-policy). |

### Storage resources

Shows a snapshot of the storage breakdown by database. You can drill down into each database from the bar to see the details. You can adjust a databases storage usage by configuring its [caching policy](data-policies.md#caching-policy).

### Time range filter

For the tiles in the system overview page with a time range filter, you can filter by one hour (1H), one day (1D), one week (7D), or one month (30D). To set all the tiles to the same time range, open the ellipsis menu on any of the tiles and select **Apply [time range] for all**.

:::image type="content" source="media/eventhouse/time-frame-apply-all.png" alt-text="Imaage of the time frame drop-down menu with the apply to all option selected.":::

### Activity in minutes

 Shows the duration in minutes to run compute operations such as queries and commands. It's important to note that compute minutes don't directly correspond to compute units, which represent the actual processing time consumed by these operations.

For example, if two users execute queries at the same time, one taking 3 minutes and the other 5 minutes, the total compute minutes would be 8. But since these queries ran together, the actual compute units used are just 5 minutes.

In the case where 78 queries and 173 ingest operations that run at the same time and total 183 compute minutes, if they all finish within a 5-minute period, the actual compute units that is used is still only 5 minutes.

The tile also allows users to open the underlying KQL query by selecting **Open query** in the ellipsis menu.

:::image type="content" source="media/eventhouse/eventhouse-activity.png" alt-text="Screenshot of the Activity in minutes tile.":::

This provides full visibility into how the compute minutes are calculated.

:::image type="content" source="media/eventhouse/eventhouse-activity-kql.png" alt-text="Screenshot of the Activity in minutes KQL query.":::  

### Ingestion

Shows the number of ingested rows and the number of databases that the data was ingested to. The information can help you understand the amount of data that is ingested into the eventhouse over time.

The tile also allows users to open the underlying KQL query by selecting **Open query** in the ellipsis menu.

:::image type="content" source="media/eventhouse/eventhouse-ingestion.png" alt-text="Screenshot of the Ingestion details tile.":::

This provides full visibility into how the number of ingested rows and the number of databases are calculated.

:::image type="content" source="media/eventhouse/eventhouse-ingestion-kql.png" alt-text="Screenshot of the Ingestion details KQL query.":::

### Top 10 queried databases

Highlights the most active databases in the eventhouse, including the number of queries, errors, duration per database, and cache misses. The information can assist you in obtaining a comprehensive overview of which databases are utilizing compute units.

The tile also allows users to open the underlying KQL query by selecting **Open query** in the ellipsis menu.

:::image type="content" source="media/eventhouse/eventhouse-queries.png" alt-text="Screenshot of the Top 10 queried databases tile.":::

This provides full visibility into the top 10 queried databases and their metrics.

:::image type="content" source="media/eventhouse/eventhouse-queries-kql.png" alt-text="Screenshot of the Top 10 queried databases KQL query.":::

### Top 10 ingested databases

Highlights the number of ingested rows and ingestion errors for the databases with the most ingested rows. Currently only partial ingestion errors are reported.

The tile also allows users to open the underlying KQL query by selecting **Open query** in the ellipsis menu.

:::image type="content" source="media/eventhouse/eventhouse-ingested-databases.png" alt-text="Screenshot of the Top 10 ingested databases tile":::

This provides full visibility into top 10 ingested databases and their metrics.

:::image type="content" source="media/eventhouse/eventhouse-ingested-databases-kql.png" alt-text="Screenshot of the Top 10 ingested databases KQL query.":::

### Activity in minutes - top 5 users

Shows the total compute minutes of the most active users. The information can help you understand the efficiency with which users are utilizing compute units.

The tile also allows users to open the underlying KQL query by selecting **Open query** in the ellipsis menu.

:::image type="content" source="media/eventhouse/eventhouse-users.png" alt-text="Screenshot of the Activity in minutes - Top 5 users tile.":::

This provides full visibility into the top 5 users and their compute minutes. 

:::image type="content" source="media/eventhouse/eventhouse-users-kql.png" alt-text="Screenshot of the Activity in minutes - Top 5 users KQL query.":::

### What's new - Last 7 days**

Highlights database owners and recent eventhouse events, such as the following operations:

* Create or delete a database
* Create, alter, or delete a table
* Create or delete an external table
* Create, alter, or delete a materialized view
* Create, alter, or delete a function
* Alter a caching policy, retention policy, or table update policy

## View databases

The databases overview page provides a summary of all the databases in the eventhouse.

1. From the **Eventhouse** explorer, select **Databases**.

    :::image type="content" source="media/eventhouse/browse-databases.png" alt-text="Screenshot of an eventhouse pane with Browse all databases highlighted in a red box.":::'

    A window opens with details about each database. Each tile represents a database.

    :::image type="content" source="media/eventhouse/list-tile-view.png" alt-text="Screenshot showing the eventhouse details page with the tile and list view buttons surrounded by a red box." lightbox="media/eventhouse/list-tile-view.png":::

1. From the tile, you can open the database in a new tab, query the data, get data from a list of sources, or delete the database if you have the required permissions.

    :::image type="content" source="media/eventhouse/eventhouse-databases-more-menu.png" alt-text="Screenshot showing the database more menu options." lightbox="media/eventhouse/eventhouse-databases-more-menu.png":::

1. Toggle between list and tile view using the buttons on the top right of the page.

    :::image type="content" source="media/eventhouse/browse-all-databases.png" alt-text="Screenshot showing the eventhouse details page with the tile and list view buttons highlighted." lightbox="media/eventhouse/browse-all-databases.png":::

1. To explore a specific database, select the name of this database from the list.

1. To add a new database or database shortcut to the eventhouse, select **+ New database** at the top of the page. For more information, see [Create a KQL database](create-database.md) and [Create a database shortcut](database-shortcut.md).

## View monitoring eventhouse

Eventhouse workspace monitoring is a feature that lets you track the health and performance of the eventhouse using Fabric workspace monitoring.
When you enable workspace monitoring, Fabric automatically creates an eventhouse in your workspace that collects metrics from your eventhouse. You can then query this data using KQL (Kusto Query Language) to troubleshoot issues, analyze trends, and build custom dashboards.

The monitoring eventhouse is provided as a set of read-only tables, inside a monitoring KQL database. You can query the tables to get insights into the usage and performance of your eventhouse. For more information about the monitoring data that you can query, see [Eventhouse monitoring](monitor-eventhouse.md).

For more monitoring insights, see the following articles:

* [Workspace Monitoring Overview](../fundamentals/workspace-monitoring-overview.md) - Learn about workspace-level monitoring capabilities.
* [Eventhouse Monitoring Overview](monitor-eventhouse.md) - Explore comprehensive insights into eventhouse usage and performance.

## Related content

* [Eventhouse overview](eventhouse.md)
* [Create an eventhouse](create-eventhouse.md)
* [Eventhouse monitoring overview](monitor-eventhouse.md)
* [Manage and monitor a database](manage-monitor-database.md)
