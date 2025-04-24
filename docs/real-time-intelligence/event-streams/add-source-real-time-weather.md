---
title: Add a real-time weather source to an eventstream
description: Learn how to add a real-time weather source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: wenyangshi
ms.topic: how-to
ms.custom:
ms.date: 3/24/2025
ms.search.form: Source and Destination
---

# Add a real-time weather source to an eventstream (preview)

[!INCLUDE [real-time-weather-source-description-prerequisites](./includes/real-time-weather-source-description-prerequisites.md)] 

- [Create an eventstream](create-manage-an-eventstream.md) if you don't have one already. 

## Add a real-time weather as a source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **real-time weather** tile.

:::image type="content" source="./media/add-source-real-time-weather/select-real-time-weather.png" alt-text="Screenshot that shows the selection of real-time weather as the source type in the Select a data source wizard." lightbox="./media/add-source-real-time-weather/select-real-time-weather.png":::

## Configure real-time weather

[!INCLUDE [real-time-weather](./includes/real-time-weather.md)]

## View updated eventstream
1. You see the real-time weather source added to your eventstream in **Edit mode**. Select **Publish** to publish the changes and begin streaming real-time weather data to the eventstream.

    :::image type="content" source="media/add-source-real-time-weather/edit-mode.png" alt-text="A screenshot of the added real-time weather source in Edit mode with the Publish button highlighted." lightbox="./media/add-source-real-time-weather/edit-mode.png":::
1. After you complete these steps, the source is available for visualization in the **Live view**. Select the **real-time weather** tile in the diagram to see the page similar to the following one.

    :::image type="content" source="media/add-source-real-time-weather/live-view.png" alt-text="A screenshot of the published eventstream with real-time weather source in Live View." lightbox="./media/add-source-real-time-weather/live-view.png":::

[!INCLUDE [sources-do-not-support-data-preview](./includes/sources-do-not-support-data-preview.md)]


## Related content
To learn how to add other sources to an eventstream, see the following article: [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).
