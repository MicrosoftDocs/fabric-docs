---
title: Tutorial: Bring your real-time events to Fabric Lakehouse from Azure Event Hubs
description: This tutorial provides an end-to-end demonstration of how to use event streams feature to bring your real-time events to Fabric Lakehouse from Azure Event Hubs.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: tutorial
ms.date: 04/28/2023
ms.search.form: product-kusto
---

# Bring your real-time events to Fabric Lakehouse from Azure Event Hubs

This tutorial shows you how to use Microsoft Fabric event streams to bring your real-time events to lakehouse from your Azure event hub. 

In this tutorial, you learn how to:

> [!div class="checklist"]
> * Create an Eventstream item and Lakehouse item in Microsoft Fabric
> * Add an Azure Event Hubs source to the Eventstream item
> * Create an event hub cloud connection
> * Add an Lakehouse destination to the Eventstream item
> * Define real-time events processing logic with event processor
> * Verify the data in lakehouse

## Prerequisites

To get started, you must complete the following prerequisites:
- Get access to a **premium workspace** with **Contributor** or above permissions where your Eventstream and Lakehouse item are located in.
- An Azure event hub with event data inside exists and appropriate permission available to access the policy keys.

## Create Eventstream item and Lakehouse item


## Add an Azure Event Hubs source to the Eventstream item


## Add an Lakehouse destination to the Eventstream item



## Define real-time events processing logic with event processor



## Verify the data in lakehouse


:::image type="content" source="./media/overview/eventstream-overview.png" alt-text="Screenshot showing an Eventstream item overview." lightbox="./media/overview/eventstream-overview.png" :::


## Next steps

In this tutorial, you learned how to transfer real-time events from your Azure Event Hub to a Microsoft Fabric lakehouse. Once your data is safely stored in your lakehouse, there are many ways to analyze and make use of it to inform your business decisions. If you're interested in discovering more advanced features for working with event streams, you may find the following resources helpful.

- [Introduction to Microsoft Fabric event streams](./overview.md)
- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
- [Process event data with event processor editor](./process-event-with-event-preocessor-editor.md)