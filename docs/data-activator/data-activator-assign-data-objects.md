---
title: Assign data to objects in Data Activator
description: Learn how to assign data to objects in Data Activator and improve your data management capabilities.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.search.form: Data Activator Object Creation
ms.date: 11/01/2024
---

# Assign data to objects in Data Activator

Once you [get data](data-activator-get-data-power-bi.md) into Data Activator, the next step is to assign your events to objects. You assign events to objects if there's a business object that you want to track. For example: packages, households, stores, etc. Create objects if you want to monitor object IDs and their state over time.  

> [!IMPORTANT]
> Data Activator is currently in preview.

> [!NOTE]
> If you started from Power BI, then Data Activator automatically creates an object for you (if needed) and assigns your Power BI data to it. You can skip this section unless you wish to combine your Power BI data with other events coming from event streams.

## Assign data to a new object

To create an object, pick the event stream that you wish to add to the object. Then select **New object** from the ribbon. Data Activator prompts you for an Object name and a unique column. Choose an object name that reflects the type of object to which your event refers. The unique column must be a column in your events that uniquely identifies the objects being monitored. Optionally, you can use *Assign Properties* to import other columns from your event stream and convert them into properties on your objects. Refer to [create properties](data-activator-create-triggers-design-mode.md#create-properties) for more information on properties.

The example shown is based on the sample *Packages* data that comes with Data Activator. Since this data is monitoring packages, we choose *Package* as our object name. We choose *Package ID* as our key column because it uniquely identifies packages.

:::image type="content" source="media/data-activator-assign-data-objects/activator-assign-data-objects-01.png" alt-text="Screenshot of Assign your data window.":::

When you create an object, you see the events that were received organized by the unique values from the ID column.

:::image type="content" source="media/data-activator-assign-data-objects/activator-assign-data-objects-02.png" alt-text="Screenshot of event received by data activator." lightbox="media/data-activator-assign-data-objects/activator-assign-data-objects-02.png":::

By default the events for five random instances for the previous 24 hours are displayed in the chart. You can change this using the population selector and time selectors at the top of the card.

## Assign data to an existing object

You can assign multiple data streams to a single object. This assignment is useful if data about an object is spread across multiple streams. One example of how this can occur is if you have slowly changing reference data about an object in one event stream, and fast-moving updates about an object in another event stream.

Assign data using the **New object**  option in the ribbon. The process is the same as for assigning data to a new object, except that you assign the events to an existing object.

> [!NOTE]
> When assigning to an existing object, it is essential that you choose a key column that references the same object IDs that you used when creating the object in the first place. Otherwise, you get unexpected results from your properties and rules.

:::image type="content" source="media/data-activator-assign-data-objects/activator-assign-data-objects-03.png" alt-text="Screenshot of assigning data in Data Activator.":::

## Assign data to multiple objects

You can assign a single event source to multiple objects, which is useful if your event source references multiple object types. The sample *Packages* event stream used in the [tutorial](data-activator-tutorial.md) references both a Package ID and a City, so it can be useful to create both a *Package* and a *City* object from the packages stream. Since there are multiple packages in each city, you can create aggregate measures at the city level, such as the number of packages currently in transit for a given city.

To assign an event stream to multiple objects, for each object follow the procedures described in the previous two sections.

## Related content

* [Get started with Data Activator](data-activator-get-started.md)

* [Get data for Data Activator from event streams](data-activator-get-data-eventstreams.md)

* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:
* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)