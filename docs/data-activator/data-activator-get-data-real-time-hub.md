---
title: Get data for Data Activator from Real-Time Hub
description: Learn how to get data from Real-Time Hub for use in Data Activator.
author: davidiseminger
ms.author: davidi
ms.topic: conceptual
ms.custom: 
ms.date: 05/21/2024
---

# Get data for Data Activator from Real-Time Hub

> [!IMPORTANT]
> Data Activator is currently in preview.

From within a Data Activator reflex item, you can bring new events from Real-Time Hub.

## Prerequisites

Before you begin, you must have a reflex item already created. However, you can connect to events from Real-Time Hub from an empty reflex item, or a reflex item that already has events flowing into it.

### Browse Real-Time Hub from reflex

To browse Real-Time Hub items from a reflex, select **Get data** from the toolbar as shown in the following image.

:::image type="content" source="media/data-activator-get-data-real-time-hub/data-activator-real-time-hub-01.png" alt-text="Screenshot of get data from Real-Time Hub.":::

A wizard appears enabling you to bring new events using the recommended connectors, or browse to existing streams and events in the Real-Time Hub in the table displayed at the bottom of the dialog, as shown in the following image.

:::image type="content" source="media/data-activator-get-data-real-time-hub/data-activator-real-time-hub-02.png" alt-text="Screenshot of get data sources from Real-Time Hub." lightbox="media/data-activator-get-data-real-time-hub/data-activator-real-time-hub-02.png":::

When you choose a connector, a new Eventstream is created to manage the connection and transformation of the new events.

For more information about connecting to data with Real-Time Hub, see the [Real-Time Hub](../real-time-hub/real-time-hub-overview.md) article.


## Related content

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Detection conditions in Data Activator](data-activator-detection-conditions.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)
* [Trigger Fabric items](data-activator-trigger-fabric-items.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
