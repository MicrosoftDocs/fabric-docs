---
title: Real-Time Intelligence Activator - basic concepts
description: "Definitions and descriptions of concepts used by Real-Time Intelligence Activator. These include: eventstreams, rules, events, objects, activators, and more."
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.date: 10/22/2024
#customer intent: As a person creating activators and as someone consuming activators I want to understand how activators are created and how they work. 
#customerIntent: As a new user of Fabric Activator, I need an understanding of the basic concepts of Activator. By understanding the pieces that make up Activator, I can more easily create and use Activator on my own.
---

# Activator basic concepts

Use this article to familiarize yourself with some of the terms and concepts associated with Fabric Activator (Activator). Understanding these terms and concepts makes it easier for you to read through the other Activator articles and to work with Activator.

There are many objects and concepts that make up Activator, too many to cover in a single article. So this article introduces you to the most common:  ***activators***, ***workspaces***, **_eventstreams_**, **_rules_**, **_objects_**,  **_events_**, and ***latency***.

## Activator creation workflow

A typical Activator workflow involves many of these concepts. One common workflow starts with creating a new empty activator in a workspace and using ***Get events*** to connect to an eventstream. From that eventstream you create objects and properties. Then you build a rule based on those objects and properties. For example: email me if the temperature of the package becomes greater than 60 degrees. To create a rule on that object, the designer sets conditions, parameters, and aggregations that tell Activator when to trigger and what actions to take when triggered. For example: send an email, create a Fabric item, start a Power Automate action. Another common workflow is to start from the Eventstream itself. From there you add an Activator destination, and create the new activator from there. Once the activator is created, open that activator and create the objects and properties. 

![A basic Real-Time Intelligence Activator workflow chart.](media/end-user-basic-concepts/activator--workflow.png)  

## Workspaces

As with all Fabric workloads, you can begin using Fabric Activator by creating an item in a Fabric workspace. Fabric Activator’s items are called *activators.* Workspaces are places to collaborate with colleagues on specific content. Workspaces hold collections of dashboards, reports, eventstreams, activators, and more. When a workspace owner gives you access to a workspace, they also give you view or edit permissions to the content in that workspace. This includes giving you access to view or edit the activator rules in that workspace.

Everyone also has a **My workspace**. **My workspace** is your personal sandbox where you create content for yourself.

To see your workspaces, select **Workspaces** from your left navigation pane.

:::image type="content" source="media/end-user-basic-concepts/power-bi-workspaces.png" alt-text="Screenshot of Power BI with Workspaces selected.":::

[Learn more about workspaces.](end-user-workspaces.md)

## Activator and activator

*Activator *is the name of the Fabric product. An *activator *is the thing that you create by using Activator. An activator holds all the information necessary to connect to data, monitor for conditions, and act. You typically create an activator for each business process or area you monitor.

Once you create an activator, populate it with data. Learn how to get data into your reflex from PBI and eventstreams and ???.

## Eventstreams

## Events

Activator considers all data sources to be streams of events. An event is an observation about the state of an object, with some identifier for the object itself, a timestamp, and the values for fields you’re monitoring. Eventstreams vary in frequency from many times per second for IoT sensors, to more sporadic streams such as packages being scanned in and out of shipping locations.

Data being observed from Power BI is also treated as an eventstream. In this case, events are observations made of the data on a regular schedule that typically matches the refresh frequency of your Power BI semantic model (previously known as a dataset). These observations might only happen once a day, or even once a week – it’s just a slowly changing event stream.
@MI77 MI77 3 days ago
I think "event stream" with a space makes it clear it's separate from the Eventstream item type.

@mihart	Reply...

## Objects

The business objects that you want to monitor could be physical objects like freezers, vehicles, packages, and users. The business object can also be less tangible concepts like advertising campaigns, accounts, and user sessions. In your activator, you model the object by connecting one or more event streams, choosing a column for the object ID, and specifying the fields you want to make properties of the object.

The term object instance refers to a specific freezer/vehicle/package etc. where object is typically used for the definition or class of object. We use population to refer to all of the object instances.

## Rules

Rules define the conditions you want to detect on your objects, and the actions that you want to take when those conditions are met. A rule on a freezer object might detect the freezer being too warm, and send an email to the relevant technician.

There are three types of rules: rules on events, rules on events that are added to an object, and rules on an object's properties.  

When a rule’s conditions are met, and an action is initiated, then the rule is activated

## Properties

Properties are useful when you want to reuse logic across multiple rules. You might define a property on a Freezer object that smooths out the temperature readings over a one-hour period. You could then use that smoothed value in many other rules.

### Lookback period 

Activator needs to track historical data to ensure that correct actions can be computed. The amount of historical data to be queried is called the lookback period. This lookback period depends on how a rule is defined as well as the data volume (events per second) of the data that is needed to evaluate the rule. 

For example, let’s say a pharmaceutical logistics operation is transporting medicine packages in a cold chain. The goal is to get an alert when a medicine package becomes too warm. Say the rule definition evaluates the average temperature over a three-hour period for each individual package, with the rule condition being that the average temperature becomes greater than 8°C. Here, the lookback period would be six hours, as Activator needs to inspect six hours’ worth of historical data to decide whether the rule condition holds. 

### Distinct, active object IDs 

Rules built on attributes are used to monitor how an attribute on an object ID changes over time. In the pharmaceutical logistics operation example, each individual package is represented by a unique ID, with the data source providing periodic readings of the temperature of each package. Some limits are defined in terms of the number of distinct object IDs (in the case of the example, the number of packages) being tracked by Activator within the lookback period. Activator will track active object IDs, which are object IDs that have had an event on them within the stored period.

## Related content

- [Get started with Activator](data-activator-get-started.md)
- [What is Activator](data-activator-introduction.md)