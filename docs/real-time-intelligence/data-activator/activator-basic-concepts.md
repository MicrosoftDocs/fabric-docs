---
title: Activator - basic concepts
description: "Definitions and descriptions of concepts used by Activator. These include: eventstreams, rules, events, objects, activators, and more."
author: spelluru
ms.author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 10/22/2024
#customerIntent: As a new user of Fabric Activator, I need an understanding of the basic concepts of Activator. By understanding the pieces that make up Activator, I can more easily create and use Activator on my own.
#customer intent: As a person creating activators and as someone consuming activators I want to understand how activators are created and how they work.
---

# [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] basic concepts

Use this article to familiarize yourself with some of the terms and concepts associated with Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] ([!INCLUDE [fabric-activator](../includes/fabric-activator.md)]). Understanding these terms and concepts makes it easier for you to read through the other [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] articles and to work with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)].

There are many objects and concepts that make up [!INCLUDE [fabric-activator](../includes/fabric-activator.md)], too many to cover in a single article. So this article introduces you to the most common:  ***activators***, ***workspaces***, **_eventstreams_**, **_rules_**, **_objects_**,  **_events_**, and ***latency***.

## [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] creation workflow

A typical [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] workflow involves many of these concepts. One common workflow starts with creating a new empty activator in a workspace and using ***Get events*** to connect to an eventstream. From that eventstream, you create objects and properties. Then you build a rule based on those objects and properties. For example: email me if the temperature of the package becomes greater than 60 degrees. To create a rule on that object, the designer sets conditions, parameters, and aggregations that tell [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] when to trigger and what actions to take when triggered. For example: send an email, create a Fabric item, or start a Power Automate action. Another common workflow is to start from the eventstream itself. From the eventstream, you add an [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] destination and create the new activator. Once the activator is created, open that activator and create the objects and properties. 

## Workspaces

As with all Fabric workloads, you can begin using [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] by creating an item in a Fabric workspace. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]’s items are called *activators.* Workspaces are places to collaborate with colleagues on specific content. Workspaces hold collections of dashboards, reports, eventstreams, activators, and more. When a workspace owner gives you access to a workspace, they also give you view or edit permissions to the content in that workspace. This access includes giving you permissions to view or edit the activator rules in that workspace.

Everyone also has a **My workspace**. **My workspace** is your personal sandbox where you create content for yourself.

To see your workspaces, select **Workspaces** from your left navigation pane.

[Learn more about workspaces.](/power-bi/consumer/end-user-workspaces)

## [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] and activator

*[!INCLUDE [fabric-activator](../includes/fabric-activator.md)]* is the name of the Fabric product. An *activator* is the thing that you create by using Activator. An activator holds all the information necessary to connect to data, monitor for conditions, and act. You typically create an activator for each business process or area you monitor.

Once you create an activator, populate it with data. Learn how to get data into your activator from [Power BI](activator-get-data-power-bi.md), [eventstreams](activator-get-data-eventstreams.md), and [Real-Time Hub](activator-get-data-real-time-hub.md).

## Events and eventstreams

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] considers all data sources to be streams of events. An event is an observation about the state of an object, with some identifier for the object itself, a timestamp, and the values for fields you’re monitoring. Eventstreams vary in frequency. IoT sensors might have events many times per second. While packages being scanned in and out of shipping locations might have sporadic streams.

An *eventstream* is an instance of the Eventstream item in Fabric. The eventstreams feature in the Microsoft Fabric Real-Time Intelligence experience lets you bring real-time events into Fabric, transform them, and then route them to various destinations without writing any code (no-code). [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] takes actions on patterns or conditions that are detected in eventstream data. For example, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] monitors eventstream items and detects when an "event" hits certain thresholds such as "delivery time more than 10 hours." It then automatically takes appropriate action such as alerting users or kicking off Power Automate workflows.

Data being observed from Power BI is also treated as an eventstream. In this case, events are observations made of the data on a regular schedule that typically matches the refresh frequency of your Power BI semantic model (previously known as a dataset). These observations might only happen once a day, or even once a week – it’s just a slowly changing eventstream.

## Objects

The business objects that you want to monitor could be physical objects like freezers, vehicles, packages, and users. The business object can also be a less tangible concept like advertising campaigns, accounts, and user sessions. In your activator, you model the object by connecting one or more eventstreams, choosing a column for the object ID, and specifying the fields you want to make properties of the object.

The term *object instance* refers to a specific freezer/vehicle/package etc., where object is typically used for the definition or class of object. We use population to refer to all of the object instances.

## Rules

Rules define the conditions you want to detect on your objects, and the actions that you want to take when those conditions are met. A rule on a freezer object might detect the freezer being too warm, and send an email to the relevant technician.

There are three types of rules: rules on events, rules on events that are added to an object, and rules on an object's properties.  

When a rule’s conditions are met, and an action is initiated, then the rule is activated

## Properties

Properties are useful when you want to reuse logic across multiple rules. You might define a property on a freezer object that smooths out the temperature readings over a one-hour period. You can then use that smoothed value in many other rules.

### Lookback period 

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] needs to track historical data to ensure that correct actions can be computed. The amount of historical data to be queried is called the lookback period. This lookback period depends on how a rule is defined and the data volume (events per second) of the data that is needed to evaluate the rule. 

For example, a pharmaceutical logistics operation is transporting medicine packages in a cold chain. The goal is to get an alert when a medicine package becomes too warm. Say the rule definition evaluates the average temperature over a three-hour period for each individual package. And the rule condition is that the average temperature becomes greater than 8°C. Here, the lookback period is six hours. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] needs to inspect six hours’ worth of historical data to decide whether the rule condition holds. 

### Distinct, active object IDs

Rules built on attributes are used to monitor how an attribute on an object ID changes over time. In the pharmaceutical logistics example, each individual package is represented by a unique ID. The data source provides periodic readings of the temperature of each package. Some limits are defined in terms of the number of distinct object IDs (the number of packages) being tracked by [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] within the lookback period. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tracks active object IDs. An active object ID is an object where events are arriving within the stored period. For example, a toll station that has cars passing through.

## Related content

- [Get started with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-get-started.md)
- [What is [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-introduction.md)
