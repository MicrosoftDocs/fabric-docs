---
title: Description and prerequisites for Real-Time weather source
description: The include file provides description, a note, and prerequisites for using a Real-Time weather source.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: include
ms.custom:
ms.date: 04/24/2025
---


The real-time weather connector allows you to ingest live weather data from a selected location into Eventstream. It provides real-time weather conditions such as precipitation, temperature, and wind for a specified set of coordinates. This data is updated **every minute** to ensure timely insights.

Weather data is powered by the Azure Maps Weather service. The cost of using Azure Maps is included in the connector's capacity consumption, so there's no need to set up a separate Azure Maps account or service within your Azure subscription. To learn more about Azure Maps, refer to [What is Azure Maps?](/azure/azure-maps/about-azure-maps).

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with **Contributor** or higher permissions.
