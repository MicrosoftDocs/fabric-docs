---
title: Get Started With Fabric Real-Time Hub
description: This article shows how to get started with Fabric Real-Time hub and provides a high-level overview of all the features.
#customer intent: As a new Fabric user, I want to find and open the Real-Time hub so that I can start streaming and monitoring data.
author: mystina
ms.author: majia
ms.topic: quickstart
ms.custom: null
ms.date: 02/03/2026
---

# Get started with Fabric Real-Time hub

Real-Time hub is the central place to discover and manage all streaming data across your organization. Every Microsoft Fabric tenant is automatically provisioned with Real-Time hub, with no extra steps needed to set up or manage it. For detailed overview, see [Real-Time hub overview](real-time-hub-overview.md).

This article provides guidance on getting started with Fabric Real-Time hub.

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## Real-Time hub page

The Real-Time hub page layout changes based on whether you have streams or tables. Details are provided in the following sections.

### Hub page when you have no streams or no tables

If you don't have any streams or tables, the **Real-Time hub** has three sections.

:::image type="content" source="./media/get-started-real-time-hub/home-page-empty.png" alt-text="Screenshot that shows the Real-Time hub page when you don't have any streams or tables." lightbox="./media/get-started-real-time-hub/home-page-empty.png":::

The **first section** at the top has the following cards that provides shortcuts to the common tasks.

- **Subscribe to OneLake events** - Provides a shortcut to create streams based on Fabric OneLake events. For details, see [Subscribe to OneLake events](create-streams-fabric-onelake-events.md#configure-and-create-an-eventstream).
- **Act on Job events** - Provides a shortcut to create alerts on Fabric events. For more information, [Set alerts for Job events](set-alerts-fabric-job-events.md)
- **Connect weather data** - Provides a shortcut to create a data streams based on real-time weather data. For more information, see [Real-Time weather source](add-source-real-time-weather.md)
- **Learn from a tutorial** - Links to the [Fabric Real-Time intelligence tutorial](/fabric/real-time-intelligence/tutorial-introduction) that has a module on using the Real-Time hub.
- **Case study** - Links to a [case study](https://www.microsoft.com/customers/story/1770346240728000716-elcome-microsoft-copilot-consumer-goods-en-united-arab-emirates).

The **second section** in the middle has the following cards:

- **Bicycle rentals** or **Stock market** - When you select these cards, the flow creates a group of sample Fabric Real-Time intelligence items. You get an end-to-end solution that demonstrates how Real-Time Intelligence components work together, enabling you to stream, analyze, and visualize real-time data in a real-world context. For more information, see [End-to-end Real-Time Intelligence sample](/fabric/real-time-intelligence/sample-end-to-end).
- **View more samples** - You see the two end-to-end samples, **Bicycle rentals** and **Stock market**, and also an Eventstream sample, **Yellow tax**. When you select the first tow, the flow creates a group of Fabric Real-Time intelligence work items as described in the previous bullet point. When you select the third option, the flow creates an eventstream with Yellow Taxi sample as an input. 
- **Connect data sources** - This link takes you to the **Data sources** page where you see all the supported data sources that you can connect to and create streams.

The **third section** has link to learning resources including the following:

- [Real-Time intelligence tutorial](/fabric/real-time-intelligence/tutorial-introduction)
- [Real-Time documentation home page](/fabric/real-time-intelligence/)
- [Microsoft events page where you can register for a workshop](https://www.microsoft.com/events/search-catalog?q=Real-Time+Intelligence+in+a+Day)
- [Customer success stories](https://www.microsoft.com/customers/search?filters=product%3Aazure&q=Real-time+intelligence)
- [Partners list who can help you with implementing Fabric Real-Time intelligence solutions](https://appsource.microsoft.com/marketplace/partner-dir?filter=sort%3D0%3BendorsedProduct%3DMicrosoft%2520Fabric;endorsedWorkloads=Real-Time%20Intelligence)
- [Blog post on Fabric Real-Time Intelligence updates](https://blog.fabric.microsoft.com/blog/category/real-time-intelligence/)

### Hub page when you have at least one stream or a table

When you have access to at least one eventstream or a Kusto Query Language (KQL) table, the **Real-Time hub** page has two sections.

In the **first section** at the top, you see **cards or tiles** that provide a quick way to performing the tasks:

:::image type="content" source="./media/get-started-real-time-hub/cards.png" alt-text="Screenshot that shows cards at the top of the Real-Time hub page." lightbox="./media/get-started-real-time-hub/cards.png":::

- **Subscribe to OneLake events** - Provides a shortcut to create streams based on Fabric OneLake events. For details, see [Subscribe to OneLake events](create-streams-fabric-onelake-events.md#configure-and-create-an-eventstream).
- **Act on Job events** - Provides a shortcut to create alerts on Fabric events. For more information, [Set alerts for Job events](set-alerts-fabric-job-events.md).
- **Visualize data** - Provides a shortcut to create a dashboard based on data in a KQL table.
- **Explore data in motion** - Provides a shortcut to preview data in a data source. For more information, see [Preview data streams](preview-data-streams.md).
- **Connect weather data** - Provides a shortcut to create a data streams based on real-time weather data. For more information, see [Real-Time weather source](add-source-real-time-weather.md) 
- **Learn from a tutorial** - Links to the [Fabric Real-Time intelligence tutorial](/fabric/real-time-intelligence/tutorial-introduction) that has a module on using the Real-Time hub.
- **Case study** - Links to a [case study](https://www.microsoft.com/customers/story/1770346240728000716-elcome-microsoft-copilot-consumer-goods-en-united-arab-emirates).

In the **All data streams** section at the bottom, you see all the streams and tables you can access. Streams are the outputs from [Fabric eventstreams](../real-time-intelligence/event-streams/overview.md) and tables are from Kusto Query Language (KQL) databases that you can access. 

:::image type="content" source="./media/get-started-real-time-hub/all-data-streams-section.png" alt-text="Screenshot that shows the All data streams section of the Real-Time hub page." lightbox="./media/get-started-real-time-hub/all-data-streams-section.png":::

The **All data streams** table has the following columns:

| Column | Description |
| ------ | ----------- |
| Data | Name of the stream or KQL table. |
| Source item | Name of the parent artifact. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. |
| Item owner | Name of owner of the parent artifact. |
| Workspace | Name of workspace where the parent artifact is located. |
| Endorsement | Endorsement status of the parent artifact. |
| Sensitivity | Sensitivity status of the parent artifact. |


The following filters are available at the top for you to narrow down easily to the desired stream:

| Filter | Description |
| ------ | --------- |
| Data type | You can filter on the data type. Either stream or table. |
| Item owner | You can filter on the name of the owner of the parent artifact. For a stream, it's the owner of the parent eventstream. For a KQL table, it's owner of the parent KQL database. |
| Item | You can filter on the desired parent artifact name. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. |
| Workspace | You can filter on the desired workspace name. |

> [!NOTE]
> To see streams and tables from only your workspace, select **My workspace** for the **Workspace** filter.

Using the **search** text window, you can search your streams by typing in the name of stream.

Here are the **actions** available on streams from eventstreams from the **All data streams** page. Move the mouse over the data stream, select **... (ellipsis)** to see the actions.

| Action | Description |
| ------ | ----------- |
| Preview data | Preview the data in the stream or derived stream. For more information, see [Preview data streams](preview-data-streams.md). |
| Open eventstream | Open parent eventstream of the stream. After you open the eventstream, you can optionally add transformations to [transform the data](../real-time-intelligence/event-streams/route-events-based-on-content.md#supported-operations) and [add destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md) to send the output data to a supported destination. |
| Endorse | Endorse parent eventstream of the stream. For more information, see [Endorse data streams](endorse-data-streams.md). |

:::image type="content" source="./media/get-started-real-time-hub/actions.png" alt-text="Screenshot that shows the actions available on a stream." lightbox="./media/get-started-real-time-hub/actions.png":::

Here are the actions available on a KQL table from the **All data streams** page.

| Action | Description |
| ------ | ----------- |
| Explore data | Explore the KQL table data in a Real-Time dashboard, using Copilot. For more information, see [Explore All data streams in Fabric Real-Time hub](explore-data-tables-copilot.md) |
| Open KQL Database | Open parent KQL Database of the KQL table. |
| Endorse | Endorse parent KQL Database of the KQL table. For more information, see [Endorse data streams](endorse-data-streams.md). |
| Detect anomalies (Preview) | Detect anomalies in data stored in the KQL table. Follow steps from [How to set up anomaly detection](../real-time-intelligence/anomaly-detection.md#how-to-set-up-anomaly-detection).|
| Create real-time dashboard (Preview) |[Create a Real-Time Dashboard with Copilot](/fabric/fundamentals/copilot-generate-dashboard) based on data in the KQL table. |

:::image type="content" source="./media/get-started-real-time-hub/kql-table-actions.png" alt-text="Screenshot that shows the actions available on a KQL table stream." lightbox="./media/get-started-real-time-hub/kql-table-actions.png":::

## Data sources page

You can connect to data from both inside and outside of Fabric in a mere few steps within Fabric Real-Time hub. Whether data is coming from new or existing sources, streams, or available events, the Add data experience allows you to connect to a wide range of event sources directly from Real-Time hub.

It allows for easy connectivity to external data streams including Kafka connectors powered by Kafka Connect and Debezium connectors for fetching Change Data Capture (CDC) streams, which track and stream changes made to your databases in real time. Connectivity to notification sources and discrete events is also included, which enables access to notification events from Azure and other cloud solutions including Amazon Web Services and Google Cloud Platform.  

There are two ways you can get to the **Data sources** page:

- By selecting **Add data** button on the **Streaming Data** page.

    :::image type="content" source="media/get-started-real-time-hub/connect-to-data-source-button.png" alt-text="Screenshot that shows the Add data button." lightbox="./media/get-started-real-time-hub/connect-to-data-source-button.png":::
- By selecting **Add data** on the left navigation menu.

    :::image type="content" source="media/get-started-real-time-hub/add-data.png" alt-text="Screenshot that shows the Data sources page." lightbox="./media/get-started-real-time-hub/add-data.png":::

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
- [Explore Fabric events in Real-Time hub](explore-fabric-events.md)
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)

:::image type="content" source="./media/get-started-real-time-hub/fabric-events-page.png" alt-text="Screenshot that shows the Fabric events page in Real-Time hub." lightbox="./media/get-started-real-time-hub/fabric-events-page.png":::

## Azure events page
The **Azure events page** shows you the list of system events generated in **Azure** that you can access. You can **create eventstreams** for events from your Azure blob storage. You can also set up an alert to send notifications via email, Teams, etc. when an event occurs. Use links from the list to navigate to articles that show you how to create eventstreams for Azure Blob Storage events.

See following articles to learn how to **set up alerts** on Fabric events:

- [Azure Blob Storage events](get-azure-blob-storage-events.md)
- [Explore Azure blob storage events](explore-azure-blob-storage-events.md).
- [Set alerts on Azure Blob Storage events](set-alerts-azure-blob-storage-events.md)

:::image type="content" source="./media/get-started-real-time-hub/azure-events-page.png" alt-text="Screenshot that shows the Azure events page in Real-Time hub." lightbox="./media/get-started-real-time-hub/azure-events-page.png":::
