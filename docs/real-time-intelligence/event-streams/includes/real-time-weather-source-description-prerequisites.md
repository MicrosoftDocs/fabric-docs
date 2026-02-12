---
title: Description and prerequisites for Real-Time weather source
description: The include file provides description, a note, and prerequisites for using a Real-Time weather source.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: include
ms.custom:
ms.date: 12/11/2025
---

The real-time weather connector allows you to ingest live weather data from a selected location into Eventstream. It provides real-time weather conditions such as precipitation, temperature, and wind for a specified set of coordinates. This data is updated **every minute** to ensure timely insights.

Weather data is powered by the Azure Maps Weather service. The cost of using Azure Maps is included in the connector's capacity consumption, so there's no need to set up a separate Azure Maps account or service within your Azure subscription. To learn more about Azure Maps, refer to [What is Azure Maps?](/azure/azure-maps/about-azure-maps).

## Prerequisites

- A workspace with **Fabric** capacity or **Fabric Trial** workspace type.
- Access to the workspace with **Contributor** or higher workspace roles.
- If you don't have an eventstream, follow the guide to [create an eventstream](../create-manage-an-eventstream.md).

In addition, the following [tenant switches](../../../admin/about-tenant-settings.md) must be enabled from the Admin portal:

- [Users can use Azure Maps services](../../../admin/map-settings.md)
- [Users can use Azure Maps Weather Services](https://go.microsoft.com/fwlink/?linkid=2340279). By enabling this setting, you consent to share your selected location with Azure Maps and AccuWeather to retrieve real-time weather information.

:::image type="content" source="media/weather/weather-tenant-setting.png" alt-text="Screenshot that shows weather tenant setting." lightbox="media/weather/weather-tenant-setting.png":::
