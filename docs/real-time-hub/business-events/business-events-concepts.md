---
title: Concepts - Business Events in Fabric Real-Time Hub
description: Explore the core concepts of business events in Microsoft Fabric, including what they are, why they matter, and the key terminology that underpins this powerful real-time capability.
#customer intent: As a developer, I want to understand the core concepts of business events in Microsoft Fabric so that I can evaluate their applicability to my organization's real-time processes.
ms.date: 02/22/2026
ms.topic: overview
---

# Business events in Fabric Real-Time Hub - Key concepts and terminology 

This section defines the foundational terms used throughout the business events ecosystem in Microsoft Fabric. These concepts represent the mental model for how events are defined, published, discovered, routed, and consumed across the platform. 

## Business event 

A business event is a customer-initiated business-critical notification used to trigger downstream processes in real time.  

## Event publisher 

An event publisher is a Fabric item such as Eventstream, Notebook, Spark job, or User Data Function that you configure to send business events. Any compatible Fabric item can act as a publisher, and publishers don't need code changes when new consumers are added, because the decoupled architecture keeps producers and subscribers independent. 

## Event consumer 

An event consumer is a Fabric item that subscribes to a business event and processes it for downstream actions, analytics, workflows, or notifications. Consumers can include:

- **Activator** for triggering automated actions and alerts.
- **Fabric Notebooks and Spark jobs** for running analytics and distributed processing on event data.
- **Dataflows Gen2** for orchestrating low-code data movement and enrichment in response to events.
- **Power Automate** for automating business workflows and integrations with external systems.

Consumers can trigger actions, analytics, or data movement upon event receipt. Multiple consumers can subscribe to the same event in parallel, each processing the event independently. 

## Event schema registry 

Schema Registry in Fabric Real-Time hub is a centralized repository that stores and manages event schemas. It ensures consistency and validation across business events publishers and consumers. The registry governs schema versions and domain alignment via schema sets. Centralized schema versioning enables safe evolution of event contracts while mitigating schema drift, ensuring that both publishers and consumers can validate payloads as schemas evolve over time. 

## Event schema set 

An event schema set is a logical grouping of event schemas that represent a domain or business context. 

## Event schema 

A schema describes the structure of each event payload, including fields, types, required properties, metadata, and envelope requirements. This structure defines a repeatable pattern of events that share the same business meaning (for example, InventoryMovement, PriceChanged, ShipmentDeparted). In other words, the event schema is a conceptual definition that publishers and consumers use to send and subscribe to business events. 

## Event payload 

The business-specific content of the event, defined by the schema. Nested objects are allowed but might be encoded as strings depending on integration constraints. 

## CloudEvents 1.0 compatibility 

Think of CloudEvents 1.0 as a standard envelope that every business event must use. It doesn't change your business data. It simply defines a common set of properties so any tool can understand where the event came from, what type it is, and when it happened. 

This standardization helps business events move cleanly through different systems in Fabric, Azure, and beyond.

## Event routing and decoupling

Business events use a pub/sub model in Fabric Real-Time Hub that decouples publishers from consumers. Publishers emit events to Real-Time Hub without knowing which consumers are listening, and consumers subscribe independently without coordinating with publishers. This model enables scalable, parallel processing—multiple consumers can act on the same event simultaneously—and allows producers and subscribers to evolve independently without requiring changes to publisher code.

## End-to-end example

Consider a manufacturing scenario where equipment sensors detect abnormal vibration. A Spark job running a notebook publishes a `CriticalVibrationDetected` business event to Real-Time Hub using the event schema defined in the Schema Registry. Multiple consumers then process the event in parallel:

- **Activator** evaluates the event payload and triggers an automated mitigation workflow and creates a maintenance ticket.
- **Fabric Notebooks and Spark jobs** run further analysis on the vibration data to identify root causes.
- **Dataflows Gen2** moves and enriches the data for downstream storage and reporting.
- **Power BI** reports consume the results, giving operations teams a real-time view of equipment health.

Because publishers and consumers are decoupled, each consumer acts independently and new consumers can subscribe to the same `CriticalVibrationDetected` event at any time without modifying the publishing notebook or Spark job.

## Related content

To learn how to publish and subscribe to business events in Microsoft Fabric, see the following tutorial articles:

- [Tutorial: Publish business events from a Spark Notebook and subscribe to them using Activator](tutorial-business-events-notebook-user-data-function-activator.md) - Learn how to publish business events using Spark Notebook and react to them using User Data Function (UDF) through Activator.
- [Tutorial: Publish business events from a User Data Function and subscribe to them using Activator](tutorial-business-events-user-data-function-activation-email.md) - Learn how to publish business events using User Data Function (UDF) and get notified via email using Activator.
    