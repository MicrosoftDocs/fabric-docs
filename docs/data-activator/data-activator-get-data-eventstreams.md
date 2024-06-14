---
title: Get data for Data Activator from eventstreams
description: Learn how to get data from eventstreams for use in Data Activator.
author: davidiseminger
ms.author: davidi
ms.topic: conceptual
ms.custom: 
ms.date: 11/16/2023
---

# Get data for Data Activator from eventstreams

> [!IMPORTANT]
> Data Activator is currently in preview.

You can get data for use in Data Activator from many sources. This article describes how to get data from eventstreams.

## Get data from eventstreams 

If you have real-time streaming data in Fabric eventstreams, you can connect it to Data Activator. This section explains how.

### Prerequisites

Before you begin, you need an eventstream item in Fabric with an existing connection to a Source. Each event in the source must consist of a JSON dictionary, and one of the dictionary keys must represent a unique object ID. Here's an example of an event that meets these criteria:

```
{
"PackageID": "PKG123",
"Temperature": 25
}
```

In this example, *PackageID* is the unique ID key.

### Connect your eventstream item to Data Activator

To connect your eventstream item to data activator:

1. Open your eventstream item
2. Add a destination to your eventstream item, of type *Reflex*
    
    :::image type="content" source="media/data-activator-get-data/data-activator-get-data-04.png" alt-text="Screenshot of reflex eventstream item.":::

3. In the side panel, select an existing reflex item, or make a new one, as appropriate, then select *Add.*
4. Open your reflex item. You see the data flowing from your eventstream item in the data pane.
    
    :::image type="content" source="media/data-activator-get-data/data-activator-get-data-05.png" alt-text="Screenshot of trigger created.":::

Once you have connected your eventstream item to data activator, the next step is to assign your data to some objects. To do this, follow the steps described in the [Assign data to objects in Data Activator](data-activator-assign-data-objects.md) article.

## Related content

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Detection conditions in Data Activator](data-activator-detection-conditions.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
