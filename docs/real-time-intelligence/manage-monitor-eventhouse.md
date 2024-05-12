---
title: Manage and monitor an Event house
description: Learn how to manage and monitor an event house and gain insights from the system information in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: how-to
ms.date: 05/23/2024
ms.search.form: Eventhouse
#customer intent: As a user, I want to learn how to manage and monitor an event house so that I can effectively utilize Real-Time Intelligence.
---
# Manage and monitor an event house

The Event house page serves as the central hub for all your interactions within the Event house environment. It's your gateway to seamlessly manage and monitor an event house, navigate through databases, and perform various Event house-related actions.

In this article, you learn about how to manage and gain insights about an event house in Real-Time Intelligence.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An [event house](create-eventhouse.md) in your workspace

## Navigate to an Event house page

1. Browse to your workspace homepage in Real-Time Intelligence.

1. Select an event house from your list of items in the workspace.

:::image type="content" source="media/eventhouse/event-house-page.png" alt-text="Screenshot showing the main Event house page." lightbox="media/eventhouse/event-house-page.png":::

This page is divided into the following sections:

A. **Event house ribbon**: The ribbon provides quick access to essential actions within the Event house.

B. **Explorer pane**: The explorer pane provides an intuitive interface for navigating between Event house views and working with databases.

C. **Main view area**: The main view area displays the system overview details for the event house.

## Event house ribbon

The Event house ribbon is your quick-access action bar, offering a convenient way to perform essential tasks within an Event house. From here, you can refresh your main view and enable minimum consumption.

### Enable minimum consumption

Minimum consumption sets a minimum available capacity unit (CU) size for an event house.

1. From the ribbon, select **Minimum consumption**
1. In the **Minimum consumption** pane, select the size corresponding to the [minimum available CU](eventhouse.md#minimum-consumption) size you want to apply to this event house, and then select **Done**.

    The following table maps the size to the minimum [capacity units](../admin/service-admin-portal-capacity-settings.md) allotted to the event house:

    [!INCLUDE [capacity-eventhouse](includes/capacity-eventhouse.md)]

    :::image type="content" source="media/eventhouse/minimum-capacity.png" alt-text="Screenshot showing how to select the correct minimum consumption in Real-Time Intelligence Event house.":::

## Explorer pane

The Event house explorer provides an intuitive interface for navigating between Event house views and for working with databases.

### View system overview details for an event house

The system overview page provides a snapshot of the current state of the event house.

1. From the **Eventhouse** explorer, select **System overview**.

    :::image type="content" source="media/eventhouse/system-overview.png" alt-text="Screenshot of the system overview page in Real-Time Intelligence." lightbox="media/eventhouse/system-overview.png":::

    The system overview page displays the following information:

    * **Running state of the event house**: Indicates whether the event house. Possible states are:
        * **Running**: The event house is running optimally
        * **Optimize capacity**: The event house is not running optimally and requires more capacity. Contact your capacity admin to increase the capacity.
        * **Throttling**: The event house is running at maximum capacity. Contact your capacity admin to increase the capacity.
    * **Storage**: OneLake Cache storage shows the amount of retained data and OneLake Standard storage shows any additional data that's not in the cache. <!-- For information about OneLake storage and how to turn it on, see [OneLake availability](one-logical-copy.md). -->
    * **Storage usage by database**: Shows the storage breakdown by database. You can adjust a databases storage usage by configuring its [caching policy](data-policies.md#caching-policy).
    * **Activity in minutes**: Shows the duration, in minutes, to run compute operations such as queries and commands. It's important to note that compute minutes don't directly correspond to compute units, which represent the actual processing time consumed by these operations.

        For example, if two users execute queries at the same time, one taking 3 minutes and the other 5 minutes, the total compute minutes would be 8. But since these queries ran together, the actual compute units used is just 5 minutes.

        Likewise, even if 78 queries and 173 ingest operations run at the same time and total 183 compute minutes, if they all finish within a 5-minute period, the actual compute units used is still only 5 minutes.

    * **Most queried databases**: Highlights the most active databases in the event house. The information can assist you in obtaining a comprehensive overview of the efficiency with which databases are utilizing compute units.
    * **Eventhouse details**: Displays the event house name, creation date, and last updated date. You can copy the following event house URI values:

        |URI type |Usage |
        |---|---|
        |Query URI |URI that can be used to [add database shortcuts](database-shortcut.md) or by [connectors](data-connectors/data-connectors.md) and APIs to run queries or management commands.|
        |Ingestion URI |URI that can be used by connectors and APIs to ingest data.|

    * **Activity in minutes - Top 5 users**: Shows the total compute minutes used users. The information can help you understand the efficiency with which users are utilizing compute units.
    * **What's new**: Highlights recent event house events, such as the following operations:

        * Create or delete a database
        * Create, alter, or delete a table
        * Create or delete an external table
        * Create, alter, or delete a materialized view
        * Create, alter, or delete a function
        * Alter a caching policy, retention policy, or table update policy

1. Optionally, select one of the tabs at the top of a card to filter its date by time range. These tabs allow you to filter by one hour (1h), one day (1d), one week (7d), one month (30d).

### View all databases in an event house

The databases page provides a summary of all the databases in the event house.

1. From the **Eventhouse** explorer, select **Databases**.

    :::image type="content" source="media/eventhouse/browse-databases.png" alt-text="Screenshot of an event house pane with Browse all databases highlighted in a red box.":::'

    A window opens with details about all the databases in this event house.

    :::image type="content" source="media/eventhouse/browse-all-databases.png" alt-text="Screenshot of database view in an event house in Real-Time Intelligence.":::

1. Toggle between list and tile view using the buttons on the top right of the page.

    :::image type="content" source="media/eventhouse/list-tile-view.png" alt-text="Screenshot showing the event house details page with the tile and list view buttons surrounded by a red box.":::

1. To explore a specific database, select the name of this database from the list.

## Manage KQL Databases

In the Event house explorer, under **KQL Databases**, you can manage all the databases in the event house.

:::image type="content" source="media/eventhouse/manage-databases.png" alt-text="Screenshot showing the event house KQL Databases section.":::

You can perform the following actions:

* To create either a KQL database or a [database shortcut](database-shortcut.md):

    1. Select **New database +**.

    1. Enter a database name, and select **Create**.

* To filter the list of databases, use the search box.
* To open an existing database, select the database from the list.
* To query tables in a database, hover over the desired database > select **More menu** [**...**] > **Query data**. The **Explore your data** pane opens where you can write and run queries on the selected database. To learn more about KQL, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).
* To ingest data into a database, hover over the desired database > select **More menu** [**...**] > **Get data** > select the desired ingest method. To learn more, see [data formats](ingestion-supported-formats.md) and the corresponding ingestion methods.
* To delete a database, hover over the desired database > select **More menu** [**...**] > **Delete** > **Delete database**.

## Related content

* [Eventhouse overview](eventhouse.md)
* [Create an event house](create-eventhouse.md)
