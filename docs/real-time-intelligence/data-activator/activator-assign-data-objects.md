---
title: Assign data to objects in Activator
description: Learn how to assign data to objects in Activator and improve your data management capabilities.
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.search.form: Activator Object Creation
ms.date: 11/26/2024
---

# Assign data to objects in Activator

Once you [get data](activator-get-data-power-bi.md) into Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)], the next step is to assign your events to objects. You assign events to objects if there's a business object that you want to track. For example: packages, households, stores, etc. Each object uses unique IDs to monitor over time.  

> [!NOTE]
> If you started from Power BI, then [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] automatically creates an object for you (if needed) and assigns your Power BI data to it. You can skip this section unless you wish to combine your Power BI data with other events coming from eventstreams.

## Assign data to a new object

Open a workspace that has streaming data or open the [Microsoft sample eventstream](activator-tutorial.md). To create an object, pick the eventstream that you wish to add to the object. Then select **New object** from the ribbon. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] prompts you for an Object name and a unique column. The unique column must be a column in your events that uniquely identifies the objects being monitored. In the **Package delivery events** sample, **PackageID** is a unique column. 

Optionally, you can use *Assign Properties* to import other columns from your eventstream and convert them into properties on your objects. Refer to [create properties](activator-create-activators.md#create-properties) for more information on properties.

The example shown is based on the sample *Packages* data that comes with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. Since this data is monitoring packages, we choose *Package* as our object name. We choose *Package ID* as our unique identifier because it uniquely identifies packages.

:::image type="content" source="media/activator-assign-data-objects/activator-assign-data-objects-01.png" alt-text="Screenshot of Assign your data window.":::

When you create an object, you see the columns that were received with that event. The events are organized by the unique values from the ID column.

:::image type="content" source="media/activator-assign-data-objects/activator-assign-data-objects-02.png" alt-text="Screenshot of event received by activator." lightbox="media/activator-assign-data-objects/activator-assign-data-objects-02.png":::

By default the events for five random instances for the previous 24 hours are displayed in the chart. You can change this using the selectors in the upper right corner of the chart.

## Assign data to an existing object

You can assign multiple data streams to a single object. This assignment is useful if data about an object is spread across multiple streams. One reason for assigning to an existing object is if you have slowly changing reference data about an object in one eventstream, and fast-moving updates about an object in another eventstream.

Assign data using the **New object**  option in the ribbon. The process is the same as for assigning data to a new object, except that you assign the events to an existing object.

> [!NOTE]
> When assigning to an existing object, it is essential that you choose a key column that references the same object IDs that you used when creating the object in the first place. Otherwise, you get unexpected results from your properties and rules.

:::image type="content" source="media/activator-assign-data-objects/activator-assign-data-objects-03.png" alt-text="Screenshot of assigning data in activator.":::

## Assign an event source to multiple objects

You can assign columns from a single event source to multiple objects. Using multiple objects is useful if your event source contains data for more than one entity. The sample *Packages* eventstream used in the [tutorial](activator-tutorial.md) contains values for both a Package ID and a City. It can be useful to create both a *Package* object and a *City* object from the packages stream. Since there are multiple packages in each city, you can create aggregate measures at the city level, such as the number of packages currently in transit for a given city.

To assign an eventstream to multiple objects, for each object follow the procedures described in the previous two sections.

## Related content

* [Fabric Activator tutorial using sample data](activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
