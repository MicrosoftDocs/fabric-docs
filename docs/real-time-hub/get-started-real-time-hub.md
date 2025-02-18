---
title: Get started with Fabric Real-Time hub
description: This article shows how to get started with Fabric Real-Time hub.
author: mystina
ms.author: majia
ms.topic: quickstart
ms.custom:
ms.date: 11/18/2024
---

# Get started with Fabric Real-Time hub

Real-Time hub is the single estate for all data-in-motion across your entire organization. Every Microsoft Fabric tenant is automatically provisioned with Real-Time hub, with no extra steps needed to set up or manages it. For detailed overview, see [Real-Time hub overview](real-time-hub-overview.md).

This article provides guidance on getting started with Fabric Real-Time hub.



## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## All data streams page

On the **All data streams** page, you see all the streams and tables you can access. Streams are the outputs from [Fabric eventstreams](../real-time-intelligence/event-streams/overview.md) and tables are from Kusto Query Language (KQL) databases that you can access.

For a data stream of type **stream**, there are four actions available: - 

- **Preview data** to [preview data in the stream](preview-data-streams.md).
- **Open eventstream** to [open the eventstream that outputs the data stream](view-data-stream-details.md).
- **Endorse** option to [endorse stream](endorse-data-streams.md) for others to use.

    :::image type="content" source="./media/get-started-real-time-hub/data-streams-actions.png" alt-text="Screenshot that shows the actions available on a stream." lightbox="./media/get-started-real-time-hub/data-streams-actions.png":::

For a data stream of type **KQL table**, there are four actions available: 

- **Explore data** option to explore data in the KQL table. 
- **Create real-time dashboard (Preview)** option to [create a real-time dashboard](../real-time-intelligence/dashboard-real-time-create.md) based on data in the KQL table. 
- **Open KQL Database** option to open the KQL database that contains the table. 
- **Endorse** option to endorse data in the KQL table. 

    :::image type="content" source="./media/get-started-real-time-hub/kql-table-actions.png" alt-text="Screenshot that shows the actions available on a KQL table stream." lightbox="./media/get-started-real-time-hub/kql-table-actions.png":::

## My data streams page

The **My data streams** page shows all the streams you brought into Fabric into your workspace. To **explore** your streams and tables, use instructions from [Explore my streams in Fabric Real-Time hub](explore-my-data-streams.md).

:::image type="content" source="media/get-started-real-time-hub/hub-my-streams-menu.png" alt-text="Screenshot that shows the actions available for a stream from the My streams page." lightbox="./media/get-started-real-time-hub/hub-my-streams-menu.png":::

The actions available for streams or KQL tables are same as the ones mentioned in the previous **All data streams** section. 

## Data sources page

You can connect to data from both inside and outside of Fabric in a mere few steps within Fabric Real-Time hub. Whether data is coming from new or existing sources, streams, or available events, the Connect data source experience allows you to connect to a wide range of event sources directly from Real-Time hub.

It allows for easy connectivity to external data streams including Kafka connectors powered by Kafka Connect and Debezium connectors for fetching the Change Data Capture (CDC) streams. Connectivity to notification sources and discrete events is also included, which enables access to notification events from Azure and other clouds solutions including Amazon Web Services and Google Cloud Platform.  

There are two ways you can get to the **Data sources** page:

- By selecting **+ Connect data source** on the **All data streams** or **My data streams** pages.

    :::image type="content" source="media/get-started-real-time-hub/connect-to-data-source-button.png" alt-text="Screenshot that shows the Connect to data source button." lightbox="./media/get-started-real-time-hub/connect-to-data-source-button.png":::
- By selecting **+ Data sources** under **Connect to** category on the left navigation menu.

    :::image type="content" source="media/get-started-real-time-hub/connect-to-data-sources-page.png" alt-text="Screenshot that shows the Data sources page under Connect to category." lightbox="./media/get-started-real-time-hub/connect-to-data-sources-page.png":::

Then, follow the prompts to complete the flow. Here's a full list of built-in sources.

[!INCLUDE [supported-sources](./includes/supported-sources.md)]

You can connect to these services and create eventstreams that show up on **My data streams** and **All data streams** pages. Select a link for a source in the list to learn how to create an eventstream for that source.

## Microsoft sources page

**Microsoft sources** page in the **Connect to** section shows you all the Microsoft data sources you can access. They include sources of the following types.

[!INCLUDE [microsoft-sources](./includes/microsoft-sources.md)]

You can connect to these resources and create eventstreams that show up on **My data streams** and **All data streams** pages. Select a link for a source in the list to learn how to create an eventstream for that source.

:::image type="content" source="./media/get-started-real-time-hub/microsoft-sources-menu.png" alt-text="Screenshot that shows the Microsoft sources page in Real-Time hub." lightbox="./media/get-started-real-time-hub/microsoft-sources-menu.png":::

## Fabric events page
The **Fabric events page** shows you the list of system events generated in **Fabric** that you can access. You can **create eventstreams** for events from your Fabric workspaces. You can also set up an alert to send notifications via email, Teams etc. when an event occurs. Use links from the list to navigate to articles that show you how to create eventstreams for Fabric workspace item events.

- [Fabric Workspace Item](create-streams-fabric-workspace-item-events.md) 
- [Explore Fabric events in Real-Time hub](explore-fabric-events.md).
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)

:::image type="content" source="./media/get-started-real-time-hub/fabric-events-page.png" alt-text="Screenshot that shows the Fabric events page in Real-Time hub." lightbox="./media/get-started-real-time-hub/fabric-events-page.png":::

## Azure events page
The **Azure events page** shows you the list of system events generated in **Azure** that you can access. You can **create eventstreams** for events from your Azure blob storage. You can also set up an alert to send notifications via email, Teams etc. when an event occurs. Use links from the list to navigate to articles that show you how to create eventstreams for Azure Blob Storage events.

See following articles to learn how to **setup alerts** on Fabric events:

- [Azure Blob Storage events](get-azure-blob-storage-events.md)
- [Explore Azure blob storage events](explore-azure-blob-storage-events.md).
- [Set alerts on Azure Blob Storage events](set-alerts-azure-blob-storage-events.md)

:::image type="content" source="./media/get-started-real-time-hub/azure-events-page.png" alt-text="Screenshot that shows the Azure events page in Real-Time hub." lightbox="./media/get-started-real-time-hub/azure-events-page.png":::
