---
title: Overview of Activator rules
description: Learn about Fabric Activator rules. Learn what they are and how to create them on events, properties, and objects. Use rules to get notifications about your data and to automate workflows.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.search.form: Data Activator Rule Creation
ms.date: 12/09/2024
---

# Types of [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rules

Once you bring streaming data into an activator or [assign events to objects](activator-assign-data-objects.md#assign-data-to-objects-in-activator), you can create rules to act on your data. There are three types of rules: rules on events, rules on events that are added to an object, and rules on an object's properties.  

## Create rules on events

Creating rules on events allows you to get an activation for every event that comes in on an eventstream. When creating these kinds of rules, you can track the state of something over time. For example:

- You get an alert every time a new event comes in on an eventstream that has readings on a single IoT sensor.

- You can get an alert every time a new event comes in and the value for a column in that event meets your defined condition.

## Create rules on Object events

Objects are created from streaming data and are identified by unique columns in one or more stream. You pick specific columns and the unique column to bundle into an object. Then, instead of creating rules on the arrival of events, you create rules that monitor events and report on either the arrival of that object, or the arrival of an object that meets a defined condition. Your rule activates every time a new event comes in on the eventstream object. And, you can identify which instance it came in for as well. 

## Create rules on properties

Creating rules on properties allows you to monitor a property on objects over time. If you want to monitor the state of a property on an object, create a rule on a property.

For example, you can monitor the temperature on a package and whether it stays within a set range over time.


## Next step

> [!div class="nextstepaction"]
> [Create an activator rule](activator-create-activators.md)