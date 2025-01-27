---
title: Get data for Activator from eventstreams
description: Learn how to get data from eventstreams for use in Activator and integrate it into your applications.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.date: 11/19/2024
#customer-intent: '#customer intent: As a Fabric user I want to learn how to use Activator to get data from eventstreams.'
---

# Get data for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from eventstreams

You can get data for use in Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from many sources. This article describes how to get data from eventstreams.

If you have real-time streaming data in Fabric eventstreams, connect it to [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. This article explains how.

## Prerequisites

* You need an eventstream item in Fabric with a connection to a source.
* Each event in the source must consist of a JSON dictionary.
* One of the dictionary keys must represent a unique object ID.

Here's an example of an event that meets these criteria:

```json
{
"PackageID": "PKG123",
"Temperature": 25
}
```

In this example, *PackageID* is the unique ID.

### Connect your eventstream item to [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]

You can connect your eventstream item to [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] in one of two ways:

#### Start from the eventstream item

If you don't have your own eventstream, Microsoft supplies a sample eventstream named **Bicycles**.

1. To open the sample, select **Create** from the nav pane.
1. Scroll down to Real-Time intelligence and select **Eventstream.** 
1. Name the eventstream and select **Use sample data**.
1. Name the source and select **Add**.
1. Add a destination to your eventstream item, of type *Activator*

   :::image type="content" source="media/activator-get-data-eventstreams/activator-destination.png" alt-text="A screenshot of an eventstream dropdown for selecting a destination.":::
  
3. In the right pane, select an existing [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] item, or make a new one, then select **Save**.
4. Open your [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] item. See the data flowing from your eventstream item in the data pane.
  
    :::image type="content" source="media/activator-get-data-eventstreams/activator-stream.png" alt-text="Screenshot of eventstream item showing data flow.":::

#### Start from the activator item

1. Open your activator item. One way to open your activator is to select **Real-Time** from the nav pane and choose an eventstream from the list.
2. Select the **Set alert** tile.

Once you connect your eventstream item to [!INCLUDE [fabric-activator](../includes/fabric-activator.md)], the next step is to assign your data to some objects. To assign your data, follow the steps described in the [Assign data to objects in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-assign-data-objects.md) article.

## Related content

* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
