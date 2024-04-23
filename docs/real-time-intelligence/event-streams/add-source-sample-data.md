---
title: Add a sample data source to an eventstream
description: Learn how to Add a sample data source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 04/03/2024
ms.search.form: Source and Destination
---

# Add a sample data source to an eventstream
This article shows you how to Add a sample data source to an eventstream. 

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add sample data as a source

To get a better understanding of how an eventstream works, you can use the out-of-box sample data provided and send data to the eventstream. Follow these steps to add a sample data source:

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then **Sample data**.

1. On the right pane, enter a source name to appear on the canvas, select the sample data you want to add to your eventstream, and then select **Add**.
   - **Bicycles**: sample bicycles data with a preset schema that includes fields such as BikepointID, Street, Neighborhood, Latitude, and more.
   - **Yellow Taxi**: sample taxi data with a preset schema that includes fields such as pickup time, drop-off time, distance, total fee, and more.
   - **Stock Market**: sample data of a stock exchange with a preset schema column such as time, symbol, price, volume, and more.

       :::image type="content" source="./media/event-streams-source/eventstream-sources-sample-data.png" alt-text="Screenshot showing the sample data source configuration." lightbox="./media/event-streams-source/eventstream-sources-sample-data.png":::

1. When the sample data source is added successfully, you can find it on the canvas and navigation pane.

To verify if the sample data is added successfully, select **Data preview** in the bottom pane.

:::image type="content" source="./media/add-manage-eventstream-sources/sample-data-source-completed.png" alt-text="Screenshot showing the sample data source." lightbox="./media/add-manage-eventstream-sources/sample-data-source-completed.png":::

## Related content

To learn how to add other sources to an eventstream, see the following articles: 
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Custom app](add-source-custom-app.md)

To add a destination to the eventstream, see the following articles: 
- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)
- [Create and manage an eventstream](./create-manage-an-eventstream.md)
