---
title: Introduction to Fabric Activator
description: Learn about Fabric Activator, a no-code tool that automatically takes actions when patterns or conditions are detected in changing data across Microsoft Fabric.
author: spelluru
ms.author: spelluru
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.search.form: Data Activator Introduction
ms.date: 07/08/2025
#customer intent: As a Fabric user I want to understand what Activator is and learn some of the basic concepts.
---

# Introduction to Fabric Activator

Fabric Activator is a no-code experience that automatically triggers actions when specific patterns or conditions are detected in data streams or Power BI reports. It continuously monitors these data sources, and initiates actions when thresholds are met or specific patterns are detected. These actions can include sending emails or Teams notifications, launching Power Automate flows, or integrating with third-party systems. 

:::image type="content" source="./media/activator-introduction/activator.png" alt-text="Diagram that shows the architecture of Fabric Activator.":::

## Common use cases
Here are a few real-world scenarios where you can use Fabric Activator:

- Automatically launch ad campaigns when same-store sales decline, helping to boost performance in underperforming locations.
- Notify store managers to relocate food from malfunctioning grocery store freezers before spoilage occurs.
- Trigger personalized outreach workflows when a customer’s journey across apps, websites, or other touchpoints indicates a negative experience.
- Proactively initiate investigation workflows when a shipment’s status wasn't updated within a defined timeframe, helping to locate lost packages faster.
- Alert account teams when customers fall into arrears, using customized thresholds for time or outstanding balances per customer.
- Monitor data pipeline health and automatically rerun failed jobs or alert teams when anomalies or failures are detected.

## Core concepts

The following concepts are used to build and trigger automated actions and responses in Fabric Activator. 

## Events and eventstreams
Fabric Activator treats all data sources as streams of events. An event represents an observation about the state of an object and typically includes an identifier for the object, a timestamp, and values of the fields being monitored.

Eventstreams vary in frequency. For example, IoT sensors emit events multiple times per second, and logistics systems generate events sporadically, such as when packages are scanned at shipping locations.

An eventstream is a specific item type in Microsoft Fabric. The Eventstreams feature within the Real-Time Intelligence workload allows you to ingest, transform, and route real-time events—without writing any code. Fabric Activator monitors the eventstream and automatically takes action when defined patterns or thresholds are detected.

Even data from Power BI is treated as an eventstream. In this case, events are periodic observations based on the refresh schedule of a Power BI semantic model (formerly known as a dataset). These observations might occur daily or weekly, forming a slow-moving eventstream.

## Objects

In Fabric Activator, the entities you monitor are called business objects, which can be either physical or conceptual. Examples include physical objects such as freezers, vehicles, packages, and users, and conceptual objects such as advertising campaigns, customer accounts, user sessions.

To model a business object in Activator, you connect one or more eventstream, slect a column to serve as the object ID, and specify the fields you want to treat as properties of the object.

The term **object instance** refers to a specific example of a business object such as a particular freezer, vehicle, or user session. In contrast, object typically refers to the general definition or class (for example, “freezer” as a type). The term population is used to the full set of object instances being monitored.

## Rules

Rules define the conditions you want to detect on your objects and the actions to take when those conditions are met. For example, a rule on a freezer object might detect when the temperature rises above a safe threshold and automatically send an email alert to the assigned technician.

There are three types of rules you can create:

- **Event-based rules**: Triggered by individual events as they occur in the eventstream.
- **Object event rules**: Triggered when events are added to a specific object instance.
- **Object property rules**: Triggered based on the current state or properties of an object instance.

When a rule’s conditions are met and an action is initiated, then the rule is said to be activated.

## Properties

Properties are useful when you want to reuse logic across multiple rules. For example, on a freezer object, you might define a property that calculates a temperature average over a one-hour period. Once defined, this property can be referenced in multiple rules, such as those that detect overheating, temperature fluctuations, or maintenance thresholds—without duplicating the logic.

By centralizing logic in properties, you make your rules easier to manage, more consistent, and easier to update over time.

### Lookback period 

Fabric Activator needs to track historical data to ensure that correct actions can be computed. The duration of historical data that is queried is known as the **lookback period**.

The lookback period is determined by:

- How the rule is defined, for example, whether it requires analyzing trends, detecting anomalies, or comparing values over time.
- The volume of incoming data such as the number of events per second in the eventstream.

Consider a pharmaceutical logistics operation transporting medicine packages in a cold chain. The goal is to receive an alert when a package becomes too warm.

Let’s say the rule is defined to:

- Evaluate the average temperature of each package over a three-hour window
- Trigger an alert if the average temperature exceeds 8°C

To compute this rule accurately, Fabric Activator needs to analyze a broader window of historical data—specifically, a six-hour lookback period. It ensures that enough data is available to calculate the three-hour average at any point in time, even if data arrives with some delay or irregularity.

The lookback period is essential for enabling timely and accurate detection of conditions, especially in scenarios where data patterns evolve over time.

### Distinct, active object IDs

Rules built on attributes are used to monitor how specific attributes of an object change over time. In the pharmaceutical logistics example, each medicine package is represented by a unique object ID, and the system receives periodic temperature readings for each package. 

To evaluate these rules effectively, Fabric Activator tracks active object IDs, that is, objects for which events are arriving within the defined lookback period. This behavior ensures that only relevant, currently active objects are considered when applying rules.

For instance, a toll station might track vehicles (object IDs) as they pass through. Each vehicle generates events (for example, entry and exit scans), and only those objects with recent activity are considered active and evaluated by the system.

There are also limits based on the number of distinct object IDs (number of packages) being tracked within the lookback window. 

## Related content

* [Get started with Fabric Activator](activator-get-started.md)
* [Fabric Activator tutorial using sample data](activator-tutorial.md)
