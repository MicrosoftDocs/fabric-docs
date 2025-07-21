---
title: Get started with Fabric Real-Time hub
description: This article shows how to get started with Fabric Real-Time hub.
author: mystina
ms.author: majia
ms.topic: quickstart
ms.custom:
ms.date: 07/21/2025
---

# Get started with Fabric Real-Time hub

Real-Time hub is the single estate for all data-in-motion across your entire organization. Every Microsoft Fabric tenant is automatically provisioned with Real-Time hub, with no extra steps needed to set up or manages it. For detailed overview, see [Real-Time hub overview](real-time-hub-overview.md).

This article provides guidance on getting started with Fabric Real-Time hub.


## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## Real-Time hub page
On the **Real-Time hub** page, you see the **All data streams** section, where you see all the streams and tables you can access. Streams are the outputs from [Fabric eventstreams](../real-time-intelligence/event-streams/overview.md) and tables are from Kusto Query Language (KQL) databases that you can access.

The following sections provide details about the **All data streams** table, such as columns, filters, and other features available on the table. 

### Cards 

| Card | Description |
| ---- | ----------- |
| Subscribe to OneLake events | Provides a shortcut to create streams based on Fabric OneLake events. For details, see [Subscribe to OneLake events](create-streams-fabric-onelake-events.md#configure-and-create-an-eventstream). |
| Act on Job events | Provides a shortcut to create alerts on Fabric events. For more information, [Set alerts for OneLake](set-alerts-fabric-onelake-events.md#set-alert-for-onelake-events) |
| Visualize data | Provides a shortcut to create a dashboard based on data in a KQL table. |
| Explore data in motion | Provides a shortcut to preview data in a data source. For more information, see [Preview data streams](preview-data-streams.md). |
| Connect weather data | Provides a shortcut to create a data streams based on real-time weather data. For more information, see [Real-Time weather source](add-source-real-time-weather.md) |
| Learn from a tutorial | Links to the [Fabric Real-Time intelligence tutorial](../real-time-intelligence/tutorial-introduction.md) that has a module on using the Real-Time hub. |
| Case study | Links to a [case study](https://www.microsoft.com/customers/story/1770346240728000716-elcome-microsoft-copilot-consumer-goods-en-united-arab-emirates). 

### All data streams
The **All data streams** table on the Real-Time hub page shows you all the eventstreams and KQL tables you have access to. The following sections provide more detail on this table.

#### Columns
The **All data streams** table has the following columns:

| Column | Description |
| ------ | ----------- |
| Data | Name of the stream or KQL table. |
| Source item | Name of the parent artifact. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. |
| Item owner | Name of owner of the parent artifact. |
| Workspace | Name of workspace where the parent artifact is located. |
| Endorsement | Endorsement status of the parent artifact. |
| Sensitivity | Sensitivity status of the parent artifact. |

:::image type="content" source="./media/get-started-real-time-hub/all-data-streams-section.png" alt-text="Screenshot that shows the All data streams section of the Real-Time hub page." lightbox="./media/get-started-real-time-hub/all-data-streams-section.png":::

#### Filters

The following filters are available at the top for you to narrow down easily to the desired stream:

| Filter | Description |
| ------ | --------- |
| Data type | You can filter on the data type. Either stream or table. |
| Item owner | You can filter on the name of the owner of the parent artifact. For a stream, it's the owner of the parent eventstream. For a KQL table, it's owner of the parent KQL database. |
| Item | You can filter on the desired parent artifact name. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. |
| Workspace | You can filter on the desired workspace name. |

> [!NOTE]
> To see streams and tables from only your workspace, select **My workspace** for the **Workspace** filter. 

#### Search
Using the **search** text window, you can search your streams/events by typing in the name of stream.


#### Actions

Here are the actions available on streams from eventstreams from the **All data streams** page. Move the mouse over the data stream, select **... (ellipsis)** to see the actions.

| Action | Description |
| ------ | ----------- |
| Preview data | Preview the data in the stream or derived stream. For more information, see [Preview data streams](preview-data-streams.md). |
| Open eventstream | Open parent eventstream of the stream. After you open the eventstream, you can optionally add transformations to [transform the data](../real-time-intelligence/event-streams/route-events-based-on-content.md#supported-operations) and [add destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md) to send the output data to a supported destination. |
| Endorse | Endorse parent eventstream of the stream. For more information, see [Endorse data streams](endorse-data-streams.md). |

:::image type="content" source="./media/get-started-real-time-hub/data-streams-actions.png" alt-text="Screenshot that shows the actions available on a stream." lightbox="./media/get-started-real-time-hub/data-streams-actions.png":::

Here are the actions available on a KQL table from the **All data streams** page.

| Action | Description |
| ------ | ----------- |
| Explore data | Explore data in the KQL table. |
| Create real-time dashboard (Preview) |[Create a real-time dashboard](../real-time-intelligence/dashboard-real-time-create.md) based on data in the KQL table. |
| Open KQL Database | Open parent KQL Database of the KQL table. |
| Endorse | Endorse parent KQL Database of the KQL table. For more information, see [Endorse data streams](endorse-data-streams.md). |

:::image type="content" source="./media/get-started-real-time-hub/kql-table-actions.png" alt-text="Screenshot that shows the actions available on a KQL table stream." lightbox="./media/get-started-real-time-hub/kql-table-actions.png":::

## Data sources page

You can connect to data from both inside and outside of Fabric in a mere few steps within Fabric Real-Time hub. Whether data is coming from new or existing sources, streams, or available events, the Add data experience allows you to connect to a wide range of event sources directly from Real-Time hub.

It allows for easy connectivity to external data streams including Kafka connectors powered by Kafka Connect and Debezium connectors for fetching the Change Data Capture (CDC) streams. Connectivity to notification sources and discrete events is also included, which enables access to notification events from Azure and other clouds solutions including Amazon Web Services and Google Cloud Platform.  

There are two ways you can get to the **Data sources** page:

- By selecting **+ Add data** on the **Real-Time hub** page.

    :::image type="content" source="media/get-started-real-time-hub/connect-to-data-source-button.png" alt-text="Screenshot that shows the Connect to data source button." lightbox="./media/get-started-real-time-hub/connect-to-data-source-button.png":::
- By selecting **+ Data sources** under **Connect to** category on the left navigation menu.

    :::image type="content" source="media/get-started-real-time-hub/connect-to-data-sources-page.png" alt-text="Screenshot that shows the Data sources page under Connect to category." lightbox="./media/get-started-real-time-hub/connect-to-data-sources-page.png":::

Then, follow the prompts to complete the flow. Here's a full list of built-in sources.

[!INCLUDE [supported-sources](./includes/supported-sources.md)]

You can connect to these services and create eventstreams that show up on **My data streams** and **All data streams** pages. Select a link for a source in the list to learn how to create an eventstream for that source.

## Azure sources page

**Azure sources** page in the **Connect to** section shows you all the Azure data sources you can access. They include sources of the following types.

[!INCLUDE [microsoft-sources](./includes/microsoft-sources.md)]

You can connect to these resources and create eventstreams that show up on **My data streams** and **All data streams** pages. Select a link for a source in the list to learn how to create an eventstream for that source.

:::image type="content" source="./media/get-started-real-time-hub/microsoft-sources-menu.png" alt-text="Screenshot that shows the Microsoft sources page in Real-Time hub." lightbox="./media/get-started-real-time-hub/microsoft-sources-menu.png":::

## Fabric events page
The **Fabric events page** shows you the list of system events generated in **Fabric** that you can access. You can **create eventstreams** for events from your Fabric workspaces. You can also set up an alert to send notifications via email, Teams, etc. when an event occurs. Use links from the list to navigate to articles that show you how to create eventstreams for Fabric workspace item events.

- [Fabric Workspace Item](create-streams-fabric-workspace-item-events.md) 
- [Explore Fabric events in Real-Time hub](explore-fabric-events.md).
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)

:::image type="content" source="./media/get-started-real-time-hub/fabric-events-page.png" alt-text="Screenshot that shows the Fabric events page in Real-Time hub." lightbox="./media/get-started-real-time-hub/fabric-events-page.png":::

## Azure events page
The **Azure events page** shows you the list of system events generated in **Azure** that you can access. You can **create eventstreams** for events from your Azure blob storage. You can also set up an alert to send notifications via email, Teams, etc. when an event occurs. Use links from the list to navigate to articles that show you how to create eventstreams for Azure Blob Storage events.

See following articles to learn how to **setup alerts** on Fabric events:

- [Azure Blob Storage events](get-azure-blob-storage-events.md)
- [Explore Azure blob storage events](explore-azure-blob-storage-events.md).
- [Set alerts on Azure Blob Storage events](set-alerts-azure-blob-storage-events.md)

:::image type="content" source="./media/get-started-real-time-hub/azure-events-page.png" alt-text="Screenshot that shows the Azure events page in Real-Time hub." lightbox="./media/get-started-real-time-hub/azure-events-page.png":::
