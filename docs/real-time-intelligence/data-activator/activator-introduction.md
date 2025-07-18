---
title: Introduction to Fabric Activator
description: Learn about Fabric Activator, a no-code tool that automatically takes actions when patterns or conditions are detected in changing data across Microsoft Fabric.
author: spelluru
ms.author: spelluru
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.search.form: Data Activator Introduction
ms.date: 07/18/2025
#customer intent: As a Fabric user I want to understand what Activator is and learn some of the basic concepts.
---

# Introduction to Fabric Activator
In the landscape of real-time analytics, Fabric Activator plays a pivotal role in bridging insights and action. Activator is low-latency event rule engine, designed to listen to event streams, detect complex conditions, and trigger downstream actions within seconds.

Fabric Activator is a no-code and low-latency event detection engine that automatically triggers actions when specific patterns or conditions are detected in data streams or Power BI reports. It continuously monitors these data sources, and initiates actions when thresholds are met or specific patterns are detected. These actions can include sending emails or Teams notifications, launching Power Automate flows, or integrating with third-party systems. 

From detecting anomalies in IoT telemetry to reacting to operational changes in supply chains or public infrastructure, Activator transforms raw event data into automated, intelligent responses. It enables organizations to move from passive monitoring to proactive, event-driven decision-making, a shift critical in high-velocity data environments.

## Core architecture 
Activator is the event detection and rules engine at the heart of Fabric Real-Time intelligence stack. Architecturally, it acts as an intelligent observer - consuming high-velocity data streams, evaluating rule conditions in near real-time, and initiating automated downstream actions based on changes in event states.

It fits into a reactive, event-driven architecture where data flows continuously, and decisions are made based on stateful evaluations of event data in near real-time.

:::image type="content" source="./media/activator-introduction/activator.png" alt-text="Diagram that shows the architecture of Fabric Activator.":::

- **Event sources**

    Activator connects directly to eventstreams, which ingest data from various producers (Azure Event Hubs, IoT devices, custom endpoint, etc.). These streams serve as the source of events, and Activator can subscribe to one or more eventstreams to observe data changes. Other event sources could be Fabric or Azure events or an Activator listening to a Power BI report or a Real-Time dashboard.

- **Events and objects**

    Events are individual records (for example, a telemetry signal or a file drop) received via eventstream. These events are grouped into objects based on a shared identifier (for example, `bikepoint_id`, `device_id`). Rules are then evaluated per object, allowing fine-grained detection (for example, per sensor or per asset).

- **Rules and conditions** 

    Each activator includes one or more rules, which are evaluated continuously. These rules can be simple comparisons (`value < threshold`) or stateful expressions like `BECOMES`, `DECREASES`, `INCREASES`, `EXIT RANGE`, or absence of data (heartbeat). Activator ensures state tracking per object, which enables complex pattern detection over time.

- **Actions** 

    When a rule condition is satisfied, Activator can trigger:
    - Data pipelines or notebooks in Fabric.
    - External actions via Power Automate.
    - Send Teams message
    - Send e-mail
    
- **Alert management and rule Testing** 

    Activator provides preview and impact estimates before rules are activated, showing how often a rule would have fired on historical data. These features help prevent alert spam and over-firing. Internally, state transitions are managed to suppress noise (for example, a value must cross a threshold, not just remain under it).

- **Monitoring and cost control** 

    You only incur cost when activators are actively running. Activator instances are scoped to Fabric capacities and can be monitored through the workspace. Runtime logs and telemetry are available via eventstreams and pipeline outputs.

## Deployment model
Activator instances are deployed per workspace and bound to specific data sources. Multiple activators can monitor the same stream, enabling parallel rule evaluations for distinct business functions. Because activator is capacity-bound, pay-as-you-go pricing only applies when rules are actively running—providing cost efficiency for intermittent detection scenarios.

## Integration points within Real-Time intelligence

| Component | Interaction with Activator |
| --------- | -------------------- |
| Eventstream    | Supplies federated data to Activator via low-latency stream ingestion. |
| Activator      | Can generate events (for example, enriched entities or inferred labels) that trigger another activator. |
| Pipeline       | Target of Activator’s rule triggers, which automates downstream processing |
| Power BI       | Consumes the result of triggered pipelines or notebooks for real-time visualizations |
| Power Automate | Allows event-driven ops via templated or custom actions |
| Fabric events  | Supplies events that are happening within Fabric like refreshing of a semantic model or failing of a pipeline​ |
| Notebooks      | Notebook execution can be triggered by an Activator |

## Common use cases
Here are a few real-world scenarios where you can use Fabric Activator:

- Automatically launch ad campaigns when same-store sales decline, helping to boost performance in underperforming locations.
- Notify grocery store managers to relocate food from malfunctioning freezers before spoilage occurs.
- Trigger personalized outreach workflows when a customer’s journey across apps, websites, or other touchpoints indicates a negative experience.
- Proactively initiate investigation workflows when a shipment’s status wasn't updated within a defined timeframe, helping to locate lost packages faster.
- Alert account teams when customers fall into arrears, using customized thresholds for time or outstanding balances per customer.
- Monitor data pipeline health and automatically rerun failed jobs or alert teams when anomalies or failures are detected.

## Next step
See [Tutorial: Create and activate a Fabric Activator rule](activator-tutorial.md).
