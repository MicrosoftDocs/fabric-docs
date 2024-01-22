---
title: Get data for Data Activator from Eventstreams
description: Learn how to get data from Eventstreams for use in Data Activator.
author: davidiseminger
ms.author: davidi
ms.topic: concept
ms.custom: 
ms.date: 11/16/2023
---

# Get data for Data Activator from Eventstreams

> [!IMPORTANT]
> Data Activator is currently in preview.

You can get data for use in Data Activator from many sources. This article describes how to get data from Eventstreams.

## Get data from Eventstreams 

If you have real-time streaming data in Fabric Eventstreams, you can connect it to Data Activator. This section explains how.

### Prerequisites

Before you begin, you need an Eventstream item in Fabric with an existing connection to a Source. Each event in the source must consist of a JSON dictionary, and one of the dictionary keys must represent a unique object ID. Here's an example of an event that meets these criteria:

```
{
"PackageID": "PKG123",
"Temperature": 25
}
```

In this example, *PackageID* is the unique ID key.

### Connect your Eventstream item to Data Activator

To connect your Eventstream item to data activator:

1. Open your Eventstream item
2. Add a destination to your Eventstream item, of type *Reflex*
    
    :::image type="content" source="media/data-activator-get-data/data-activator-get-data-04.png" alt-text="Screenshot of reflex event stream item.":::

3. In the side panel, select an existing reflex item, or make a new one, as appropriate, then select *Add.*
4. Open your reflex item. You see the data flowing from your Eventstream item in the data pane.
    
    :::image type="content" source="media/data-activator-get-data/data-activator-get-data-05.png" alt-text="Screenshot of trigger created.":::


## Related content

Once you have connected your Eventstream item to data activator, the next step is to assign your data to some objects. To do this, follow the steps described in the [Assign data to objects in Data Activator](data-activator-assign-data-objects.md) article.

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Detection conditions in Data Activator](data-activator-detection-conditions.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
