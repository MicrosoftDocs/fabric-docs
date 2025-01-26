---
title: Manage and monitor an Eventhouse
description: Learn how to manage and monitor an eventhouse and gain insights from the system information in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: how-to
ms.custom:
  - ignite-2024
ms.date: 11/19/2024
ms.search.form: Eventhouse
#customer intent: As a user, I want to learn how to manage and monitor an eventhouse so that I can effectively utilize Real-Time Intelligence.
---
# Manage and monitor an eventhouse

The Eventhouse page serves as the central hub for all your interactions within the Eventhouse environment. It's your gateway to seamlessly manage and monitor an eventhouse, navigate through databases, and perform various Eventhouse-related actions.

In this article, you learn about how to manage and gain insights about an eventhouse in Real-Time Intelligence.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An [eventhouse](create-eventhouse.md) in your workspace

## Navigate to an Eventhouse page

1. Browse to your workspace homepage in Real-Time Intelligence.

1. Select an eventhouse from your list of items in the workspace.

:::image type="content" source="media/eventhouse/event-house-page.png" alt-text="Screenshot showing the main Eventhouse page." lightbox="media/eventhouse/event-house-page.png":::

This page is divided into the following sections:

A. **Eventhouse ribbon**: The ribbon provides quick access to essential actions within the Eventhouse.

B. **Explorer pane**: The explorer pane provides an intuitive interface for navigating between Eventhouse views and working with databases.

C. **Main view area**: The main view area displays the system overview details for the eventhouse.

## Eventhouse ribbon

The Eventhouse ribbon is your quick-access action bar, offering a convenient way to perform essential tasks within an Eventhouse. From here, you can refresh your main view and enable minimum consumption.

### Enable minimum consumption

Minimum consumption sets a minimum available capacity unit (CU) size for an eventhouse.

1. From the ribbon, select **Minimum consumption**
1. In the **Minimum consumption** pane, select the size corresponding to the [minimum available CU](eventhouse.md#minimum-consumption) size you want to apply to this eventhouse, and then select **Done**.

    The following table maps the size to the minimum [capacity units](../admin/capacity-settings.md) allotted to the eventhouse:

    [!INCLUDE [capacity-eventhouse](includes/capacity-eventhouse.md)]

    :::image type="content" source="media/eventhouse/minimum-capacity.png" alt-text="Screenshot showing how to select the correct minimum consumption in Real-Time Intelligence Eventhouse.":::

## Explorer pane

The Eventhouse explorer provides an intuitive interface for navigating between Eventhouse views and for working with databases.

### View system overview details for an eventhouse

The system overview page provides a snapshot of the current state of the eventhouse.

1. From the **Eventhouse** explorer, select **System overview**.

    :::image type="content" source="media/eventhouse/system-overview.png" alt-text="Screenshot of the system overview page in Real-Time Intelligence." lightbox="media/eventhouse/system-overview.png":::

    The system overview page displays the following information:

    * **Running state of the eventhouse**: Shows the operational status of the eventhouse. Possible states are:
        * **Running**: The eventhouse is running optimally.
        * **Maintenance**: The eventhouse is temporarily unavailable. Try refreshing the page later. If you have enabled security features, try connecting to your environment using a VPN connection.
        * **Missing capacity**: The eventhouse is unavailable because your organization's Fabric compute [capacity reached its limits](../enterprise/throttling.md). Try again later or contact your capacity admin to [increase the capacity](../enterprise/scale-capacity.md).
        * **Suspended capacity**: The capacity used for this eventhouse was suspended. Contact your capacity admin to [reverse the suspension](../enterprise/pause-resume.md).
        * **Unknown**: For unknown reasons, the eventhouse is unavailable.
    * **Storage**: OneLake Cache storage shows the amount of retained data and OneLake Standard storage shows any more data that's not in the cache. <!-- For information about OneLake storage and how to turn it on, see [OneLake availability](one-logical-copy.md). -->
    * **Storage usage by database**: Shows the storage breakdown by database. You can adjust a databases storage usage by configuring its [caching policy](data-policies.md#caching-policy).
    * **Activity in minutes**: Shows the duration, in minutes, to run compute operations such as queries and commands. It's important to note that compute minutes don't directly correspond to compute units, which represent the actual processing time consumed by these operations.

        For example, if two users execute queries at the same time, one taking 3 minutes and the other 5 minutes, the total compute minutes would be 8. But since these queries ran together, the actual compute units used are just 5 minutes.

        Likewise, even if 78 queries and 173 ingest operations run at the same time and total 183 compute minutes, if they all finish within a 5-minute period, the actual compute units used is still only 5 minutes.

    * **Most queried databases**: Highlights the most active databases in the eventhouse. The information can assist you in obtaining a comprehensive overview of the efficiency with which databases are utilizing compute units.
    * **Eventhouse details**: Displays the eventhouse name, creation date, and last updated date. You can copy the following eventhouse URI values:

        |URI type |Usage |
        |---|---|
        |Query URI |URI that can be used to [add database shortcuts](database-shortcut.md) or by [connectors](data-connectors/data-connectors.md) and APIs to run queries or management commands.|
        |Ingestion URI |URI that can be used by connectors and APIs to ingest data.|

    * **Activity in minutes - Top 5 users**: Shows the total compute minutes used users. The information can help you understand the efficiency with which users are utilizing compute units.
    * **What's new**: Highlights recent eventhouse events, such as the following operations:

        * Create or delete a database
        * Create, alter, or delete a table
        * Create or delete an external table
        * Create, alter, or delete a materialized view
        * Create, alter, or delete a function
        * Alter a caching policy, retention policy, or table update policy

1. Optionally, select one of the tabs at the top of a card to filter its date by time range. These tabs allow you to filter by one hour (1 h), one day (1 d), one week (7 d), one month (30 d).

### View all databases in an eventhouse

The databases page provides a summary of all the databases in the eventhouse.

1. From the **Eventhouse** explorer, select **Databases**.

    :::image type="content" source="media/eventhouse/browse-databases.png" alt-text="Screenshot of an eventhouse pane with Browse all databases highlighted in a red box.":::'

    A window opens with details about all the databases in this eventhouse.

    :::image type="content" source="media/eventhouse/browse-all-databases.png" alt-text="Screenshot of database view in an eventhouse in Real-Time Intelligence.":::

1. Toggle between list and tile view using the buttons on the top right of the page.

    :::image type="content" source="media/eventhouse/list-tile-view.png" alt-text="Screenshot showing the eventhouse details page with the tile and list view buttons surrounded by a red box.":::

1. To explore a specific database, select the name of this database from the list.

## Manage KQL Databases

In the Eventhouse explorer, under **KQL Databases**, you can manage all the databases in the eventhouse.

:::image type="content" source="media/eventhouse/manage-databases.png" alt-text="Screenshot showing the eventhouse KQL Databases section.":::

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
* [Create an eventhouse](create-eventhouse.md)
