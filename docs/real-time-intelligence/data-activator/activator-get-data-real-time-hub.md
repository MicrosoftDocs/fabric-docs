---
title: Get data for Activator from Real-Time Hub
description: Learn how to get data from Real-Time Hub and use it in Activator to enhance your application's functionality.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter, ignite-2024
ms.date: 11/08/2024
#customer intent: As a Fabric user I want to learn to get data for Activator from Real-Time Hub.
---

# Get data for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from Real-Time Hub

You can get data for use in Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from many sources. This article describes how to get data from Real-Time Hub. 

## Prerequisites

* You must have an activator already created.
* You can connect to Real-Time Hub events from an empty activator.
* You can connect to Real-Time Hub events from an activator that already has events flowing into it.

### Browse Real-Time Hub from Activator

To browse Real-Time Hub items from an activator, select **Home** > **Get data** from the toolbar as shown in the following image.

:::image type="content" source="media/activator-get-data-real-time-hub/data-activator-real-time-hub-01.png" alt-text="Screenshot of get data from Real-Time Hub.":::

A wizard appears enabling you to add new events using the recommended connectors. You can also browse to existing streams and events in the Real-Time Hub in the table displayed at the bottom of the dialog.

:::image type="content" source="media/activator-get-data-real-time-hub/data-activator-real-time-hub-02.png" alt-text="Screenshot of get data sources from Real-Time Hub." lightbox="media/activator-get-data-real-time-hub/data-activator-real-time-hub-02.png":::

When you choose a connector, a new eventstream is created to manage the connection and transformation of the new events.

For more information about connecting to data with Real-Time Hub, see the [Real-Time Hub](../../real-time-hub/real-time-hub-overview.md) article.

## Related content

* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)
* [Trigger Fabric items](activator-trigger-fabric-items.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
