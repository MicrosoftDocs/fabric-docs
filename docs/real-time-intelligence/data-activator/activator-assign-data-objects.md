---
title: Assign data to objects in Activator
description: Learn how to assign eventstream data to new or existing objects in Fabric Activator so you can monitor entities like packages, stores, or devices.
ms.topic: how-to
ms.search.form: Activator Object Creation
ms.date: 05/05/2026
ai-usage: ai-assisted
#customer intent: As a Fabric Activator user, I want to assign eventstream data to objects so that I can track entities and create rules on them.
---

# Assign data to objects in Activator

After you set up a [data source](ingestion/ingestion-overview.md) for Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)], assign your events to objects. Assign events to objects when there's a distinct entity you want to track, such as a device, machine, package, or store. Each object uses a **Unique Identifier** to track individual instances over time. The examples in this article use the **Package delivery events** sample that comes with Fabric Activator, where packages are the entities being tracked. Substitute your own values when working with your own data.

> [!NOTE]
> If you use a **query-based source** (Power BI, KQL queryset, or Real-Time Dashboard), Activator handles data binding differently and might create objects automatically. This article applies primarily to **streaming sources** such as eventstreams, Fabric events, and Azure events.

## Prerequisites

- A workspace with a Microsoft Fabric-enabled capacity.
- A streaming data source connected to an Activator item, such as an eventstream. To set up a streaming data source, see [Ingestion from Eventstreams](ingestion/ingestion-event-streams.md).

## Assign data to a new object

1. Open an Activator item that has a streaming data source connected to it, or [create a sample activator](activator-tutorial.md#create-a-sample-activator) to use the **Package delivery events** sample eventstream.

   > [!NOTE]
   > The Activator item must be running for **New object** to be available in the ribbon. If it isn't started, select **Start** from the ribbon, then go back to your workspace and reopen the Activator item.

1. In the Explorer pane, select the eventstream you want to assign to an object. For example, select the **Package delivery events** eventstream.

1. Select **New object** from the ribbon. The **Build object** pane opens with **Create a new object** selected by default. Provide the following values:

   - **Object name**: A name for the entity you're tracking.
   - **Unique Identifier**: A column in your events that uniquely identifies each instance you're monitoring.

   For this example, choose *Package* as the object name and *Package ID* as the unique identifier.

   :::image type="content" source="media/activator-assign-data-objects/activator-assign-data-objects-01.png" alt-text="Screenshot of the Build object pane in Activator.":::

1. Select **Create**.

   After Activator creates the object, you see the columns received from that eventstream. The events are organized by the values in the unique identifier column.

   :::image type="content" source="media/activator-assign-data-objects/activator-assign-data-objects-02.png" alt-text="Screenshot of events received by Activator, organized by unique identifier." lightbox="media/activator-assign-data-objects/activator-assign-data-objects-02.png":::

   By default, the chart shows events for five of the available object instances over the **Last 24 hours**. Use the **Instance** and **Time** selectors in the upper right corner of the chart to change these values. You can also toggle **Auto-refresh** to control whether the chart updates automatically.

## Assign data to an existing object

You can assign multiple eventstreams to a single object. Assigning multiple streams to one object is useful when data about the same entity is spread across multiple streams. For example, if slowly changing reference data arrives in one eventstream and fast-moving updates arrive in another. When you assign data to an existing object, choose a **Unique Identifier** that references the same IDs used when you first created the object. Otherwise, properties and rules produce unexpected results.

For a complete walkthrough using two eventstreams, see [Combine multiple eventstreams in an Activator rule](combine-multiple-streams.md).

## Assign an event source to multiple objects

You can assign columns from a single event source to multiple objects. Assigning one event source to multiple objects is useful when your event source contains data for more than one entity. For example, the sample *Packages* eventstream contains both a **PackageID** and a **City** column. Creating a *Package* object lets you track and set rules on individual packages. For example, alert when a specific package's temperature exceeds a threshold. Creating a separate *City* object from the same stream lets you track conditions at the city level. For example, monitor the total number of packages in transit across a city or detect when a city's delivery volume drops unexpectedly. Each object type has its own rules and properties, so you can monitor and act on both the individual and aggregate level from a single eventstream.

1. Follow the steps in [Assign data to a new object](#assign-data-to-a-new-object) to create your first object. For example, create a *Package* object using **PackageID** as the unique identifier.

1. Go back to your workspace, then reopen the Activator item and select the same event stream in the Explorer pane.

1. Select **New object** from the ribbon.

1. In the **Build object** pane, **Create a new object** is selected by default. Enter a name for the second object and choose a different column as the unique identifier. For example, name the object *City* and select **City** as the unique identifier.

1. Select **Create**.

Repeat steps 2–5 for each additional object you want to create from the same eventstream. For more information about creating properties and aggregate measures on your objects, see [Create properties](activator-create-activators.md#create-properties).

## Related content

- [Activator ingestion overview](ingestion/ingestion-overview.md)
- [Ingestion from Eventstreams](ingestion/ingestion-event-streams.md)
- [Combine multiple eventstreams in an Activator rule](combine-multiple-streams.md)
- [Create a rule in Fabric Activator](activator-create-activators.md)
- [Fabric Activator tutorial using sample data](activator-tutorial.md)
