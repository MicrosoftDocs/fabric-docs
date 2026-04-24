---
title: Add a real-time weather source to an eventstream
description: Include file that provides the common content for configuring a real-time weather for Fabric event streams and real-time hub.
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 12/11/2025
---

1. Select a location on the map or search for a location to retrieve real-time weather data.

    :::image type="content" source="./media/real-time-weather-connector/select-location.png" alt-text="Screenshot that shows selecting location in the Connection setting page." lightbox="./media/real-time-weather-connector/select-location.png":::

1. **(Optional)** Enter a **Location name** to identify this location’s weather data in your stream. This name appears in the data payload.

    :::image type="content" source="./media/real-time-weather-connector/enter-location-name.png" alt-text="Screenshot that shows entering an optional location name." lightbox="./media/real-time-weather-connector/enter-location-name.png":::

### Stream or source details

[!INCLUDE [stream-source-details](./stream-source-details.md)]

### Review and connect

On the **Review + connect** screen, review the summary, and select **Add** (Eventstream) or **Connect** (Real-Time hub).


> [!IMPORTANT]
> By using this connector, you acknowledge and agree that:
>
> * Your use of this connector is subject to the applicable Azure Maps Product Terms and may only be used within Microsoft Fabric only.
> * Weather data may not be downloaded, exported, or streamed outside of Fabric.
>
> For more information, see [Azure Maps Product Terms](https://www.microsoft.com/licensing/terms/productoffering/onlineservices)
