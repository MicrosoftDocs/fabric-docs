---
title: Business Events Overview in Fabric Real-Time Hub
description: Discover how Microsoft Fabric's Business Events enable real-time responsiveness, automation, and consistent event modeling for modern organizations.
#customer intent: As a developer, I want to understand what business events are so that I can determine their relevance to my organization's needs.
ms.date: 02/22/2026
ms.topic: overview
---

# Business events overview (Preview)

**Business events** a capability in Fabric Real-Time Intelligence that empowers teams to define, explore, and act on business signals in real time, accelerating event‑driven application development and faster decision‑making. 

You can generate business events from the following sources:

- Spark notebooks 
- User data functions (UDFs)
 
Once published, these events are available in Real-Time hub, where you can set up alerts to take actions such as the following ones:

- Alert and automate downstream processes (Activator – Email, Teams)
- Execute custom logic (User Data Functions)
- Run analytical workflows (Notebooks)
- Give real time context to AI/ML (Notebooks)
- Run distributed processing (Spark Jobs)
- Prepare and Move data (Dataflows)
- Automate business processes (Power Automation)  

The following diagram shows how a manufacturing system detects abnormal vibration using a Spark Notebook, analyzes it, and publishes a `VibrationCriticalDetected` business event that triggers custom business logic in a User Data Function (UDF) through Activator.

:::image type="content" source="media/business-events-overview/business-event-workflow.png" alt-text="Diagram showing a manufacturing system detecting abnormal vibration using a Spark Notebook, analyzing it, and publishing a VibrationCriticalDetected business event that triggers custom business logic in a User Data Function through Activator." lightbox="media/business-events-overview/business-event-workflow.png":::

> [!IMPORTANT]
> This feature is in [preview](../../fundamentals/preview.md).

## What is a business event?

A business event is a critical occurrence or change in state that matters to a business. It captures something meaningful enough that a downstream workflow should act on it. Business events help drive critical business decisions, automate workflows, trigger alerts, enable analytics, and provide real-time context to artificial intelligence (AI). This capability delivers a unified view of customer-initiated business events in Fabric. 

## Why business events matter

Modern organizations operate across distributed systems, cloud platforms, and heterogeneous applications. These environments benefit from doing more than simply ingesting data. They need **signals with meaning**, delivered instantly, with the context required to act.

Business events provide value by enabling:

- **Real-time responsiveness**: Applications and teams react immediately when important events occur, reducing delays and unlocking automation.

- **Decoupled architecture**: Publishers and consumers operate independently, allowing teams to add new consumers without changing the original publisher.

- **Consistent modeling across the organization**: A shared, consistent event model through the Schema Registry ensures every component relies on the same contract, eliminating integration problems and scaling across the organization.

- **End-to-end observability**: Data Preview provides a real-time window into the payloads moving across publishers and consumers, helping teams validate correctness, troubleshoot problems, and confirm that events follow the expected end-to-end path. 

The following sections dive deeper into these core benefits and the key concepts that underpin business events in Microsoft Fabric.

## Real-time responsiveness

Applications and teams react immediately when important events occur, reducing delays and unlocking automation. The following table shows examples of business events across different categories:

| Category | Examples |
|----------|----------|
| Commerce and payments | PaymentFailed, RefundIssued |
| User lifecycle | UserAccountCreated, UserProfileUpdated |
| Operations, supply chain, and manufacturing | ShipmentDelayed, ThresholdExceeded |
| Travel, transportation | FlightDelayed, GateChanged |
| Market, finance, and data signals | WeatherAlertIssued, DemandForecastDeviationDetected |

The following table shows examples of non-business events:

| Category | Examples |
|----------|----------|
| IoT sensor telemetry | CurrentTemperature, SystemHealthStatus |
| Application log or diagnostic events | DiskReadError, UnhandledExceptionLogged |
| Metric or aggregated events | MemoryUsagePercent, DiskQueueLength |

## Decoupled architecture

Business Events enable a fully **decoupled architecture** where publishers and consumers in Fabric operate independently. Publishers send events once, and any consumer can subscribe without modifying the source or introducing tight coupling.

In Microsoft Fabric:

- **Eventstream**, **Notebook**, and **User Data Function (UDF)** act as publishers, emitting business events into the real-time ecosystem.
- **Activator** runs as a consumer, subscribing to events and triggering automated workflows, actions, or downstream processes.

This model lets you add new consumers - such as analytics flows, pipelines, automations, or external integrations - without changing or coordinating with the original publisher.

## Consistent modeling across the organization

One of the core strengths of business events in Microsoft Fabric is the ability to establish a **shared, consistent event model** across the entire organization. Instead of every system defining its own version of an "OrderDelayed" or "InventoryMovement" event, which can lead to mismatched fields, incompatible formats, and complex downstream mapping, Fabric centralizes governance through the **Schema Registry** in Real-Time hub.

The [Schema Registry](../../real-time-intelligence/schema-sets/schema-registry-overview.md) is a centralized repository where teams define, store, and manage the schemas associated with business event types.

#### Consistent interpretation across publishers and consumers 

When you use the Schema Registry as the single source of truth, every Fabric component, whether producing or consuming events, rely on the **same contract**:

- **Publishers** such as Eventstream, Notebook, and User Data Functions choose the appropriate schema from the registry when publishing a business event.
- **Consumers** such as Activator can subscribe with the confidence that field names, data types, structure, and semantics are always aligned.

This usage of the Schema Registry eliminates the most common integration problems: 

- Remapping fields between inconsistent schemas. 

- Managing ad-hoc validations across publishers and consumers. 

- Handling version mismatches or structural drifts. 

- Maintaining custom adapters for each publisher–consumer. 

#### Reduced integration complexity 

Because all business events come from a centrally managed schema, onboarding a new consumer becomes drastically simpler. You don't need to negotiate formats or build custom connectors. Instead: 

- Consumers can immediately discover business events and their schemas in Real-Time hub. 

- Version control is managed centrally, ensuring smooth evolution of event definitions over time. 

This level of consistency scales across the organization, enabling publishers and consumers to interact through clean, well-defined event contracts without manual coordination. 

#### A shared business language 

By ensuring every event adheres to the same business-aligned schema: 

- Analytics teams get clean, structured, and predictable data. 

- Activator trigger actions are based on well formed and standardized payloads with full business context. 

- Engineering teams avoid schema drift and operational friction. 

Ultimately, the Schema Registry makes business events not just real-time, but reliable, interpretable, and maintainable across every team in the organization. 

## End-to-end observability 

End-to-end observability ensures users can inspect business events - from what publishers send to what consumers receive. Data preview provides a direct, real-time window into the payloads moving across publishers and consumers, helping teams validate correctness, troubleshoot problems, and confirm that events follow the expected end-to-end path.

## Related content
- [Business Events concepts and terminology](business-events-concepts.md) - Explore the core concepts of business events in Microsoft Fabric, including what they are, why they matter, and the key terminology that underpins this powerful real-time capability.
- [Tutorial: Publish business events from a Spark Notebook and subscribe to them using Activator](tutorial-business-events-notebook-user-data-function-activator.md) - Learn how to publish business events using Spark Notebook and react to them using User Data Function (UDF) through Activator.
- [Tutorial: Publish business events from a User Data Function and subscribe to them using Activator](tutorial-business-events-user-data-function-activation-email.md) - Learn how to publish business events using User Data Function (UDF) and get notified via email using Activator.
    
