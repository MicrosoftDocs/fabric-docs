---
title: Get data for Activator from eventstreams
description: Learn how to get data from event streams for use in Activator and integrate it into your applications.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.date: 11/08/2024
#customer-intent: '#customer intent: As a Fabric user I want to learn how to use Activator to get data from eventstreams.'
---

# Get data for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from event streams

You can get data for use in Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from many sources. This article describes how to get data from event streams.

If you have real-time streaming data in Fabric event streams, connect it to Data Activator. This article explains how.

## Prerequisites

* You need an event stream item in Fabric with a connection to a source.
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

### Connect your event stream item to [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]

You can connect your event stream item to [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] in one of two ways:

#### Start from the event stream item
1. Open your event stream item
2. Add a destination to your event stream item, of type *Activator*

   :::image type="content" source="media/data-activator-get-data/data-activator-get-data-04.png" alt-text=" A Screenshot of an event stream item showing data flow.":::
  
3. In the side panel, select an existing [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] item, or make a new one, then select **Add**.
4. Open your [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] item. See the data flowing from your event stream item in the data pane.
  
    :::image type="content" source="media/data-activator-get-data/data-activator-get-data-05.png" alt-text="Screenshot of eventstream item showing data flow.":::

#### Start from the activator item
1. Open your activator item
2. Select *Get data* from the Home tab of the ribbon
3. Use the *Connect data source* dialog to search or browse to your event stream. 

Once you connect your event stream item to [!INCLUDE [fabric-activator](../includes/fabric-activator.md)], the next step is to assign your data to some objects. To assign your data, follow the steps described in the [Assign data to objects in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](data-activator-assign-data-objects.md) article.

## Related content

* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../get-started/microsoft-fabric-overview.md)
