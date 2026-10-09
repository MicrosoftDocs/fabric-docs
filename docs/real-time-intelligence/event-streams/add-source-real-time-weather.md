---
title: Real-time Weather Source in Fabric Eventstream
description: Real-time weather data streaming made easy. Learn how to add a real-time weather source to an eventstream, configure it, and publish live weather data. Get started now.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 04/01/2026
author: spelluru
ms.author: spelluru
ms.search.form: Source and Destination
---

# Add a real-time weather source to an eventstream 

[!INCLUDE [real-time-weather-connector-prerequisites](./includes/connectors/real-time-weather-connector-prerequisites.md)] 

## Add a real-time weather as a source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **real-time weather** tile.

:::image type="content" source="./media/add-source-real-time-weather/select-real-time-weather.png" alt-text="Screenshot that shows the selection of real-time weather as the source type in the Select a data source wizard." lightbox="./media/add-source-real-time-weather/select-real-time-weather.png":::

## Configure real-time weather

[!INCLUDE [real-time-weather-connector-configuration](./includes/connectors/real-time-weather-connector-configuration.md)] 

## View updated eventstream

1. You see the real-time weather source added to your eventstream in **Edit mode**. Select **Publish** to publish the changes and begin streaming real-time weather data to the eventstream.

    :::image type="content" source="media/add-source-real-time-weather/edit-mode.png" alt-text="A screenshot of the added real-time weather source in Edit mode with the Publish button highlighted." lightbox="./media/add-source-real-time-weather/edit-mode.png":::

1. After you complete these steps, the source is available for visualization in the **Live view**. Select the **real-time weather** tile in the diagram to see the page similar to the following one.

    :::image type="content" source="media/add-source-real-time-weather/live-view.png" alt-text="A screenshot of the published eventstream with real-time weather source in Live View." lightbox="./media/add-source-real-time-weather/live-view.png":::

[!INCLUDE [real-time-weather-connector-fields](./includes/connectors/real-time-weather-connector-fields.md)] 