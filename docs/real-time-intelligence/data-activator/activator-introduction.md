---
title: Introduction to Activator
description: Learn about Activator, a powerful tool for automating actions based on changing data in Microsoft Fabric.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter, ignite-2024
ms.search.form: Data Activator Introduction
ms.date: 11/05/2024
#customer intent: As a Fabric user I want to understand what Activator is and learn some of the basic concepts.
---

# What is [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]?

Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is a no-code experience in Microsoft Fabric for automatically taking actions when patterns or conditions are detected in changing data.
It monitors data in Power BI reports and eventstreams, for when the data hits certain thresholds or matches other patterns.
It then automatically takes appropriate action such as alerting users or kicking off Power Automate workflows.

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] allows customers to build a digital nervous system that acts across all their data, at scale, and in a timely manner. Business users can describe business conditions in a no-code experience to launch actions such as email, Teams notifications, Power Automate flows, and call into third party action systems. Business users can self-serve their needs and reduce their reliance on internal IT and developer teams, either of which is often costly and hinders agility. Customer organizations don’t need a developer team to manage and maintain custom in-house monitoring or alerting solutions.

Some common use cases are:

* Run ads when same-store sales decline.
* Alert store managers to move food from failing grocery store freezers before it spoils.
* Retain customers who had a bad experience by tracking their journey through apps, websites etc.
* Help logistics companies find lost shipments proactively by starting an investigation workflow when package status isn’t updated for a certain length of time.
* Alert account teams when customers fall into arrears, with customized time or value limits per customer.
* Track data pipeline quality, either rerunning jobs or alerting when pipelines fail or anomalies are detected.

## Core concepts

The following concepts are used to build and trigger automated actions and responses in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. For more detail about these concepts and more, see [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] basic concepts](activator-basic-concepts.md).

## Events

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] considers all data sources to be streams of events. An event is an observation about the state of an object, with some identifier for the object itself, a timestamp, and the values for fields
you’re monitoring. Eventstreams vary in frequency from many times per second for IoT sensors, to more sporadic streams such as packages being scanned in and out of shipping locations.

Data being observed from Power BI is also treated as an eventstream. In this case, events are observations made of the data on a regular schedule that typically matches the refresh frequency of your Power BI semantic model (previously known as a dataset). These observations might only happen once a day, or even once a week – it’s just a slowly changing eventstream.

### Objects

The business objects that you want to monitor could be physical objects like freezers, vehicles, packages, and users. The business object can also be less tangible concepts like advertising campaigns, accounts, and user sessions. In your activator, you model the object by connecting one or more eventstreams, choosing a column foxr the object ID, and specifying the fields you want to make properties of the object.

The term *object instance* refers to a specific freezer/vehicle/package etc. where *object* is typically used for the definition or class of object. We use *population* to refer to all of the object instances.

### Rules

Rules define the conditions you want to detect on your objects, and the actions that you want to take when those conditions are met. A rule on a freezer object might detect the freezer being too warm, and send an email to the relevant technician.

### Properties

Properties are useful when you want to reuse logic across multiple activators. You might define a property on a freezer object that smooths out the temperature readings over a one-hour period. You can then use that smoothed value in many rules.

## Related content

* [Basic concepts for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-basic-concepts.md)
* [Get started with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-get-started.md)
* [Get data for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from eventstreams](activator-get-data-eventstreams.md)
* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
