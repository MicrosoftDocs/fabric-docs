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

An event publisher is a Fabric item such as Eventstream, Notebook, Spark job, or User Data Function that you configure to send business events. 

## Event consumer 

An event consumer is a Fabric item that subscribes to a business event and processes it for downstream actions, analytics, workflows, or notifications. Consumers can include:

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

## Related content

To learn how to publish and subscribe to business events in Microsoft Fabric, see the following tutorial articles:

- [Tutorial: Publish business events from a Spark Notebook and subscribe to them using Activator](tutorial-business-events-notebook-user-data-function-activator.md) - Learn how to publish business events using Spark Notebook and react to them using User Data Function (UDF) through Activator.
- [Tutorial: Publish business events from a User Data Function and subscribe to them using Activator](tutorial-business-events-user-data-function-activation-email.md) - Learn how to publish business events using User Data Function (UDF) and get notified via email using Activator.
    
