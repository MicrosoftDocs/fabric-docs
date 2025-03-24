---
title: Add a Real-time weather source to an eventstream
description: Learn how to add a Real-time weather source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: wenyangshi
ms.topic: how-to
ms.custom:
ms.date: 3/24/2025
ms.search.form: Source and Destination
---

# Add a Real-time weather source to an eventstream

You can add a real-time weather source to an eventstream to stream real-time weather data from different locations. This source allows you to select specific cities or latitude and longitude coordinates to receive weather information. This article shows you how to add a real-time weather source to an eventstream.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 

## Add a Real-time weather as a source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Real-time weather** tile.

:::image type="content" source="./media/add-source-realtime-weather/select-realtime-weather.png" alt-text="Screenshot that shows the selection of Real-time weather as the source type in the Select a data source wizard." lightbox="./media/add-source-realtime-weather/select-realtime-weather.png":::

## Configure Real-time weather

[!INCLUDE [real-time-weather](./includes/real-time-weather.md)]

## View updated eventstream
1. You see the Real-time weather source added to your eventstream in **Edit mode**. Select **Publish** to publish the changes and begin streaming Real-time weather data to the eventstream.

    :::image type="content" source="media/real-time-weather/edit-mode.png" alt-text="A screenshot of the added Real-time weather source in Edit mode with the Publish button highlighted.":::
1. You see the eventstream in Live mode. Select **Edit** on the ribbon to get back to the Edit mode to update the eventstream. 

    :::image type="content" source="media/real-time-weather/live-view.png" alt-text="A screenshot of the published eventstream with Real-time weather source in Live View.":::

## Related content
To learn how to add other sources to an eventstream, see the following article: [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).
