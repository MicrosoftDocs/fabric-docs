---
title: Manage and monitor an Eventhouse
description: Learn how to manage and monitor an eventhouse and gain insights from the system information in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.subservice: rti-eventhouse
ms.date: 01/26/2026
ms.search.form: Eventhouse
#customer intent: As a user, I want to learn how to manage and monitor an eventhouse so that I can effectively utilize Real-Time Intelligence.
---
# Manage and monitor an eventhouse

An Eventhouse is a scalable environment for processing and analyzing large volumes of real-time data. It supports structured streaming for continuous data ingestion and analysis, and uses Kusto Query Language (KQL) to easily gain insights from your data. The Eventhouse page serves as the central hub for all your interactions within the Eventhouse environment. It's your gateway to seamlessly manage and monitor an eventhouse, navigate through databases, and perform various Eventhouse-related actions.

In this article, you learn about how to manage and gain insights about an eventhouse in Real-Time Intelligence.

For advanced analytic insights, see [View Workspace monitoring](#view-workspace-monitoring) and [Eventhouse monitoring overview](monitor-eventhouse.md).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An [eventhouse](create-eventhouse.md) in your workspace

## Navigate to an Eventhouse page

1. Browse to your workspace homepage in Real-Time Intelligence.

1. Select an eventhouse from your list of items in the workspace.

:::image type="content" source="media/eventhouse/event-house-page.png" alt-text="Screenshot showing the main Eventhouse page." lightbox="media/eventhouse/event-house-page.png":::

This page is divided into the following sections:

A. **Eventhouse ribbon**: The [ribbon](#eventhouse-ribbon) provides quick access to essential actions within the Eventhouse.

B. **Explorer pane**: The [explorer pane](#explorer-pane) provides an intuitive interface for navigating between Eventhouse views and working with databases.

C. **Main view area**: The main view area displays the [system overview details](#view-system-overview) for the eventhouse.

D. **Details area**: The [details area](#view-eventhouse-details) provides additional information about the eventhouse.

## Eventhouse ribbon

The Eventhouse ribbon is your quick-access action bar, offering a convenient way to perform essential tasks within an Eventhouse. From here, you can refresh your main view, enable minimum consumption, add databases, add plugins, and collapse or expand the details area.

### Enable always-on

> [!NOTE]
> Enabling [always-on](manage-monitor-eventhouse.md#enable-always-on) means that you aren't charged for *OneLake Cache Storage*. When minimum capacity is set, the eventhouse is always active resulting in 100% Eventhouse UpTime.
Always-on prevents your eventhouse from suspending the service due to inactivity. For highly time-sensitive systems, it prevents the latency of re-activating the eventhouse.

1. From the ribbon, select **Always-On**
2. In the **Always-On** pane, select the option to **Enable** the feature

#### Enable minimum consumption
In addition to **Always-On** you can optionally set the Minimum consumption. This sets a minimum available capacity unit (CU) size for an eventhouse. After you enable **Always-On**, you have the option to enable **Minimum consumption**

1. In the **Always-On** pane, select **Minimum consumption**
1. In the **Minimum consumption** pane, select the size corresponding to the [minimum available CU](eventhouse.md#minimum-consumption) size you want to apply to this eventhouse, and then select **Done**.

    The following table maps the size to the minimum [capacity units](../admin/capacity-settings.md) allotted to the eventhouse:

    [!INCLUDE [capacity-eventhouse](includes/capacity-eventhouse.md)]

    :::image type="content" source="media/eventhouse/minimum-capacity.png" alt-text="Screenshot showing how to select the correct minimum consumption in Real-Time Intelligence Eventhouse.":::

## Explorer pane

The Eventhouse explorer provides an intuitive interface for navigating between Eventhouse views and for working with databases.

## View eventhouse details

The eventhouse details area displays the region, last ingestion date, minimum consumption setting, and plugins. You can expand or collapse the details area using the button, or from the ribbon.

In the details area, you can copy the following eventhouse URI values:

| URI type | Usage |
|--|--|
| Query URI | URI that can be used to [add database shortcuts](database-shortcut.md) or by [connectors](event-house-connectors.md) and APIs to run queries or management commands. |
| Ingestion URI | URI that is for use by connectors and APIs to ingest data. |
| [Always-on](#enable-always-on) | Minimum available capacity unit (CU) size for your eventhouse.|

## View system overview

The system overview page provides a snapshot of the current state of the eventhouse.

1. From the **Eventhouse** explorer, select **System overview**.

    :::image type="content" source="media/eventhouse/system-overview.png" alt-text="Screenshot of the system overview page in Real-Time Intelligence." lightbox="media/eventhouse/system-overview.png":::

    The system overview page displays the following information:

    * **Running state of the eventhouse**: Shows the operational status of the eventhouse.

        :::image type="content" source="media/eventhouse/system-state.png" alt-text="Screenshot showing the system state icon next to the database name.":::

        Possible states are:

        * **Running**: The eventhouse is running optimally.
        * **Maintenance**: The eventhouse is temporarily unavailable. Try refreshing the page later. If you enabled security features, try connecting to your environment using a VPN connection.
        * **Missing capacity**: The eventhouse is unavailable because your organization's Fabric compute [capacity reached its limits](../enterprise/throttling.md). Try again later or contact your capacity admin to [increase the capacity](../enterprise/scale-capacity.md).
        * **Suspended capacity**: The capacity used for this eventhouse was suspended. To [reverse the suspension](../enterprise/pause-resume.md), contact your capacity admin.
        * **Unknown**: For unknown reasons, the eventhouse is unavailable.

    * **Eventhouse storage**: Shows the storage capacity of the eventhouse. The storage capacity is divided into categories:
        * **Original size**: The uncompressed original data size of the eventhouse.
        * **Compressed size**: The compressed data size of the eventhouse.
        * **Premium**: The amount of Premium storage utilized. This tier is the high-performance storage tier for your most active data, ensuring the fastest possible access for real-time processing and analysis. If all data isn't stored in the Premium cache, query latency might be negatively impacted. For more information, review your [caching policy](data-policies.md#caching-policy).

    * **Storage resources**: Shows a snapshot of the storage breakdown by database. You can drill down into each database from the bar to see the details. You can adjust a databases storage usage by configuring its [caching policy](data-policies.md#caching-policy).

    * **Activity in minutes**: Shows the duration in minutes to run compute operations such as queries and commands. It's important to note that compute minutes don't directly correspond to compute units, which represent the actual processing time consumed by these operations.

        For example, if two users execute queries at the same time, one taking 3 minutes and the other 5 minutes, the total compute minutes would be 8. But since these queries ran together, the actual compute units used are just 5 minutes.

        In the case where 78 queries and 173 ingest operations run at the same time and total 183 compute minutes, if they all finish within a 5-minute period, the actual compute units used is still only 5 minutes.

        The tile also allows users to open the underlying KQL query by selecting **Open query** in the ellipsis menu.     
        :::image type="content" source="media/eventhouse/eventhouse-activity.png" alt-text="Screenshot of the Activity in minutes tile.":::

        This provides full visibility into how the compute minutes are calculated.    
        :::image type="content" source="media/eventhouse/eventhouse-activity-kql.png" alt-text="Screenshot of the Activity in minutes KQL query.":::    

    * **Ingestion**: Shows the number of ingested rows and the number of databases that the data was ingested to. The information can help you understand the amount of data that is ingested into the eventhouse over time.

        The tile also allows users to open the underlying KQL query by selecting **Open query** in the ellipsis menu.     
        :::image type="content" source="media/eventhouse/eventhouse-ingestion.png" alt-text="Screenshot of the Ingestion details tile.":::

        This provides full visibility into how the number of ingested rows and the number of databases are calculated.    
        :::image type="content" source="media/eventhouse/eventhouse-ingestion-kql.png" alt-text="Screenshot of the Ingestion details KQL query.":::    

    * **Top 10 queried databases**: Highlights the most active databases in the eventhouse, including the number of queries, errors, duration per database, and cache misses. The information can assist you in obtaining a comprehensive overview of which databases are utilizing compute units.

        The tile also allows users to open the underlying KQL query by selecting **Open query** in the ellipsis menu.     
        :::image type="content" source="media/eventhouse/eventhouse-queries.png" alt-text="Screenshot of the Top 10 queried databases tile.":::

        This provides full visibility into the top 10 queried databases and their metrics.    
        :::image type="content" source="media/eventhouse/eventhouse-queries-kql.png" alt-text="Screenshot of the Top 10 queried databases KQL query.":::    

    * **Top 10 ingested databases**: Highlights the number of ingested rows and ingestion errors for the databases with the most ingested rows. Currently only partial ingestion errors are reported.

        The tile also allows users to open the underlying KQL query by selecting **Open query** in the ellipsis menu.     
        :::image type="content" source="media/eventhouse/eventhouse-ingested-databases.png" alt-text="Screenshot of the Top 10 ingested databases tile":::

        This provides full visibility into top 10 ingested databases and their metrics.    
        :::image type="content" source="media/eventhouse/eventhouse-ingested-databases-kql.png" alt-text="Screenshot of the Top 10 ingested databases KQL query.":::    

    * **Activity in minutes - top 5 users**: Shows the total compute minutes of the most active users. The information can help you understand the efficiency with which users are utilizing compute units.

        The tile also allows users to open the underlying KQL query by selecting **Open query** in the ellipsis menu.     
        :::image type="content" source="media/eventhouse/eventhouse-users.png" alt-text="Screenshot of the Activity in minutes - Top 5 users tile.":::

        This provides full visibility into the top 5 users and their compute minutes.    
        :::image type="content" source="media/eventhouse/eventhouse-users-kql.png" alt-text="Screenshot of the Activity in minutes - Top 5 users KQL query.":::    

    * **What's new - Last 7 days**: Highlights database owners and recent eventhouse events, such as the following operations:

        * Create or delete a database
        * Create, alter, or delete a table
        * Create or delete an external table
        * Create, alter, or delete a materialized view
        * Create, alter, or delete a function
        * Alter a caching policy, retention policy, or table update policy

1. Optionally, select one of the tabs at the top of a card to filter its date by time range. These tabs allow you to filter by one hour (1H), one day (1D), one week (7D), one month (30D).

## View databases overview

The databases overview page provides a summary of all the databases in the eventhouse.

1. From the **Eventhouse** explorer, select **Databases**.

    :::image type="content" source="media/eventhouse/browse-databases.png" alt-text="Screenshot of an eventhouse pane with Browse all databases highlighted in a red box.":::'

    A window opens with details about all the databases in this eventhouse.

    :::image type="content" source="media/eventhouse/browse-all-databases.png" alt-text="Screenshot of database view in an eventhouse in Real-Time Intelligence." lightbox="media/eventhouse/browse-all-databases.png":::

1. Toggle between list and tile view using the buttons on the top right of the page.

    :::image type="content" source="media/eventhouse/list-tile-view.png" alt-text="Screenshot showing the eventhouse details page with the tile and list view buttons surrounded by a red box." lightbox="media/eventhouse/list-tile-view.png":::

1. To explore a specific database, select the name of this database from the list. For more information, see (manage-monitor-database.md).

## View Workspace monitoring

You can access the read-only Workspace monitoring database from the Eventhouse explorer pane. Workspace monitoring provides a set of tables that you can query to get insights into the usage and performance of your eventhouse. For more information about the monitoring data that you can query, see [Eventhouse monitoring](monitor-eventhouse.md).

> [!NOTE]
>
> * If the monitoring option is enabled, workspace logging is turned on.
> * If the monitoring option is disabled, workspace logging is turned off. See [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md).
>
> :::image type="content" source="media/eventhouse/monitor-eventhouse-disabled.png" alt-text="Screenshot of an eventhouse explorer pane with disabled Monitoring highlighted in a red box.":::

1. From the **Eventhouse** explorer, select **Monitoring** to open the **Monitoring Eventhouse** in a new window.

    :::image type="content" source="media/eventhouse/monitor-eventhouse.png" alt-text="Screenshot of an eventhouse pane with Monitoring highlighted in a red box.":::

1. In the **Monitoring KQL database** overview page, view the query insights and query the data. 

    :::image type="content" source="media/eventhouse/monitor-eventhouse-details.png" alt-text="Screenshot of a monitoring eventhouse showing the monitoring KQL database overview page.":::

    For information about the monitoring data that you can query, see [Eventhouse monitoring](monitor-eventhouse.md).

## Related content

* [Eventhouse overview](eventhouse.md)
* [Create an eventhouse](create-eventhouse.md)
* [Eventhouse monitoring overview](monitor-eventhouse.md)
* [Manage and monitor a database](manage-monitor-database.md)
