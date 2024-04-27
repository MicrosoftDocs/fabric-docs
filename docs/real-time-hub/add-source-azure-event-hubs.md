---
title: Add Azure Event Hubs as source in Real-Time hub
description: This article describes how to add an Azure event hub as an event source in Fabric Real-Time hub. 
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 04/03/2024
---

# Add Azure Event Hubs as source in Real-Time hub
This article describes how to add an Azure event hub as an event source in Fabric Real-Time hub. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- [Create ann Azure Event Hubs namespace and an event hub](/azure/event-hubs/event-hubs-create) if you don't have one.

## Get events from an Azure event hub
You can get events from Azure event hub into Real-Time hub in one of the ways:

- Using **Get events** button
- Using **Microsoft sources** tab

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Using Microsoft sources tab

1. In Real-Time hub, switch to the **Microsoft sources** tab. 
1. In the **Source** drop-down list, select **Azure Event Hubs namespace**. 
1. For **Subscription**, select an **Azure subscription** that has the resource group with your event hubs. 
1. For **Resource group**, select a **resource group** that has your event hubs.
1. For **Region**, select a location where your event hubs are located. 
1. Now, move the mouse over the name of the event hub that you want to connect to Real-Time hub in the list of event hubs, and select the **Connect** button, or select **... (ellipsis)**, and then select the **Connect** button. 

    :::image type="content" source="./media/add-source-azure-event-hubs/microsoft-sources-connect-button.png" alt-text="Screenshot that shows the Microsoft sources tab with filters to show event hubs and the connect button for an event hub.":::

## Add Azure Event Hubs as a source

> [!NOTE]
> If you are using the **Microsoft sources** tab, skip the first step of selecting **Azure Event Hubs** in the **Get events** wizard and move on to configure the connection details. 

[!INCLUDE [azure-event-hubs-source-connector](../real-time-intelligence/event-streams/includes/azure-event-hubs-source-connector.md)]

You should see the data stream created for you on the **Data streams** tab of Real-Time hub as shown in the following image.

