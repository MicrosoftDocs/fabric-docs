---
title: Event streams sources
description: This article describes the event source types that Microsoft Fabric event streams feature supports.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: concept
ms.date: 04/23/2023
ms.search.form: product-kusto
---

# Event streams sources
By utilizing the eventstream sources, users can seamlessly incorporate their real-time events into Microsoft Fabric, facilitating efficient and effective data ingestion.

:::image type="content" source="./media/event-streams-source/eventstream-sources.png" alt-text="Screenshot showing the overview of the event streams source types." lightbox="./media/event-streams-source/eventstream-sources.png" :::

The following sources are currently available.

## Azure Event Hubs

If you already have Azure event hub set up in Azure, you can utilize that event hub to ingest real-time data into Microsoft Fabric via event streams feature.

- **Source name** - Meaningful source name that appears in your eventstream. 
- **Cloud connection** - A cloud connection needs to be established between existing event hub to Microsoft Fabric. Once that cloud connection is in place, it can be reused across multiple Eventstream items. To create a new cloud connection, you must provide the **event hub namespace name**, **event hub name**, **shared access policy name** and **primary key**.  
- **Data format** - Format of the incoming real-time events that you want to get from your Azure event hub.
- **Consumer group** - The consumer group of your event hub that is used for reading the event data from your Azure event hub.

:::image type="content" source="./media/event-streams-source/eventstream-sources-event-hub.png" alt-text="Screenshot showing the Azure Event Hubs source configuration." lightbox="./media/event-streams-source/eventstream-sources-event-hub.png" :::

## Sample data

By utilizing the sample data source (Yellow Taxi or Stock Market events), you can effortlessly test your configuration without the need for writing any code, as the sample data is pushed directly into your eventstream.

- **Source name** – Meaningful source name that appears in your eventstream. 
- **Sample data** – Select either the Yellow Taxi or Stock Market sample data.
 
:::image type="content" source="./media/event-streams-source/eventstream-sources-sample-data.png" alt-text="Screenshot showing the sample data source configuration." lightbox="./media/event-streams-source/eventstream-sources-sample-data.png" :::

## Custom application

Custom application enables a streaming endpoint where you can point your existing event hubs or Kafka clients to your eventstream in Microsoft Fabric without needing any code changes. 

- **Source name** – Meaningful source name that appears in your eventstream.

:::image type="content" source="./media/event-streams-source/eventstream-sources-custom-app.png" alt-text="Screenshot showing the custom app source configuration." lightbox="./media/event-streams-source/eventstream-sources-custom-app.png" :::


## Next steps

- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Event streams destination](./event-streams-destination.md) 
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)