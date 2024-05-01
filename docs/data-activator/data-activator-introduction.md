---
title: Introduction to Data Activator
description: Learn about Data Activator and how it works.
author: davidiseminger
ms.author: davidi
ms.topic: concept
ms.custom:
  - ignite-2023
ms.search.form: product-reflex
ms.date: 11/16/2023
---

# What is Data Activator?

> [!IMPORTANT]
> Data Activator is currently in preview.

Data Activator is a no-code experience in Microsoft Fabric for automatically taking actions when patterns or conditions are detected in changing data. It monitors data in Power BI reports and Eventstreams items, for when the data hits certain thresholds or matches other patterns. It then automatically takes appropriate action such as alerting users or kicking off Power Automate workflows.

Data Activator allows customers to build a digital nervous system that acts across all their data, at scale and in a timely manner. Business users can describe business conditions in a no-code experience to launch actions such as Email, Teams notifications, Power Automate flows and call into third party action systems. Business users can self-serve their needs and reduce their reliance on internal IT and/or developer teams, either of which is often costly and hinders agility. Customer organizations don’t need a developer team to manage and maintain custom in-house monitoring or alerting solutions.

Some common use cases are:

* Run ads when same-store sales decline.
* Alert store managers to move food from failing grocery store freezers before it spoils.
* Retain customers who had a bad experience by tracking their journey through apps, websites etc.
* Help logistics companies find lost shipments proactively by starting an investigation workflow when package status isn’t updated for a certain length of time.
* Alert account teams when customers fall into arrears, with customized time or value limits per customer.
* Track data pipeline quality, either rerunning jobs or alerting when pipelines fail or anomalies are detected.

## Core concepts

The following concepts are used to build and trigger automated actions and responses in Data Activator.

### Events

Data Activator considers all data sources to be streams of events. An event is an observation about the state of an object, with some identifier for the object itself, a timestamp, and the values for fields
you’re monitoring. Eventstreams vary in frequency from many times per second in the case of IoT sensors down to more sporadic streams such as packages being scanned in and out of shipping locations. 

Data being observed from Power BI is also treated as an Eventstream. In this case, events are observations made of the data on a regular schedule that would typically match the refresh frequency of your Power BI semantic model (previously known as dataset). This might only happen once a day, or even once a week – it’s just a slowly changing Eventstream.

### Objects

The business objects that you want to monitor could be physical objects like Freezers, Vehicles, Packages, Users, etc. or less tangible concepts like Advertising Campaigns, Accounts, User Sessions. In your reflex item, you model the object by connecting one or more Eventstreams, choosing a column from the object ID, and specifying the fields you want to make properties of the object.

The term ‘object instance’ means a specific Freezer/Vehicle/Package etc. whereas ‘object’ is typically used for the definition or class of object. We talk about the ‘population’ to refer to all the object instances.

### Triggers

Triggers define the conditions you want to detect on your objects, and the actions that you want to take when those conditions are met. When a trigger activates, it's always for a specific object instance. A trigger on a Freezer object might detect the freezer being too warm, and send an email to the relevant technician. 

### Properties

Properties are useful when you want to reuse logic across multiple triggers. You might define a property on a Freezer object that smooths out the temperature readings over a one-hour period. You could then use that smoothed value in many triggers.

## Related content

* [Get started with Data Activator](data-activator-get-started.md)
* [Get data for Data Activator from Power BI](data-activator-get-data-power-bi.md)
* [Get data for Data Activator from Eventstreams](data-activator-get-data-eventstreams.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Detection conditions in Data Activator](data-activator-detection-conditions.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
