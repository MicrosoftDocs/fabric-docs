---
title: What is Fabric Activator?
description: Learn about Microsoft Fabric Activator, a no-code event detection engine that automatically triggers actions when patterns are detected in real-time data streams.
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.search.form: Data Activator Introduction
ms.date: 07/18/2025
#customer intent: As a business analyst, I want to understand what Fabric Activator is and its core capabilities so that I can determine if it meets my organization's real-time event detection needs.
---

# What is Fabric Activator? Transform data streams into automated actions
Fabric Activator is a no-code and low-latency event detection engine that automatically triggers actions when specific patterns or conditions are detected in data sources. Key capabilities are: 

It continuously monitors these data sources with subsecond latency, and initiates actions when thresholds are met or specific patterns are detected. These actions can include sending emails or Teams notifications, launching Power Automate flows, or integrating with third-party systems. 

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
  - pipelines, notebooks, functions, or spark job definition in Fabric.
  
  - External actions via Power Automate.
  
  - Send Teams message to an individual, group, or channel 
  
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
| Spark Job Definition| Spark job execution can be triggered by an Activator|
| User Data Function| Function execution can be triggered by an Activator|

### Activator as an orchestrator
Effective use of Activator in enterprise-grade real-time architectures requires intentional orchestration across Microsoft Fabric components and performance tuning for event volume, object cardinality, and rule complexity. This section explores how to orchestrate Activator with other services and how to optimize detection logic and runtime behavior to support low-latency, cost-efficient automation at scale.

Activator plays a central role in event-driven pipelines by evaluating data at the point of arrival and triggering actions downstream. Typical **orchestration patterns** include:

| Pattern                                | Flow Description                                                                                                                 |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Ingestion → Detection → Transformation | Events flow from Eventstream into Activator, which triggers a Pipeline to enrich or move the data.                          |
| Ingestion → Detection → Notification   | Activator triggers Power Automate to send alerts or push status into Teams, Outlook, or ServiceNow.                              |
| Ingestion → Detection → Model Scoring  | Activator triggers a Notebook to score an ML model or perform advanced analytics based on real-time anomalies.                   |
| Feedback Loop with Activator (planned) | Activator-generated insights (e.g., sensitivity labels) are fed into Activator rules, enabling semantically enriched automation. |


## Core concepts
Microsoft Fabric Activator operates as a high-performance, state-aware rules engine designed for low-latency evaluation of streaming events. At its core, Activator processes real-time events emitted via eventstream, evaluates rule conditions per logical object, and initiates downstream actions in response to state transitions. For an overview of Fabric Activator, see [Introduction to Fabric Activator](activator-introduction.md).

The following concepts are used to build and trigger automated actions and responses in Fabric Activator. 

### Event sources and events
Fabric Activator treats all data sources as streams of events. An event represents an observation about the state of an object and typically includes an identifier for the object, a timestamp, and values of the fields being monitored.

Events ingested into Activator originate from:

- Eventstream, which supports multiple upstream sources (for example, Azure Event Hubs, IoT Hub, Blob Storage triggers). An Eventstream is a specific item type in Microsoft Fabric, which allows you to ingest, transform, and route real-time events without writing any code. Fabric Activator monitors the eventstream and automatically takes action when defined patterns or thresholds are detected. Activator can also subscribe to two or more eventstreams to observe data changes. Eventstreams vary in frequency. For example, IoT sensors emit events multiple times per second, and logistics systems generate events sporadically, such as when packages are scanned at shipping locations.
- Fabric events. For example, Fabric workspace item events are discrete Fabric events that occur when changes are made to your Fabric Workspace. These changes include creating, updating, or deleting a Fabric item.
- Azure events. For example, Azure Blob Storage events are triggered when a client creates, replaces, deletes a blob, etc. 
- Power BI report. In this case, events are periodic observations based on the refresh schedule of a Power BI semantic model (formerly known as a dataset). These observations might occur daily or weekly, forming a slow-moving eventstream.
- Fabric Real-Time dashboard. 

Each event contains:

- A timestamp
- A payload (structured or semi-structured data)
- One or more attributes used for object identification (for example, device_id, bikepoint_id)

### Objects
In Fabric Activator, the entities you monitor are called business objects, which can be either physical or conceptual. Examples include physical objects such as freezers, vehicles, packages, and users, and conceptual objects such as advertising campaigns, customer accounts, user sessions.

To model a business object in Activator, you connect one or more eventstream, select a column to serve as the object ID, and specify the fields you want to treat as properties of the object.

The term **object instance** refers to a specific example of a business object such as a particular freezer, vehicle, or user session. In contrast, object typically refers to the general definition or class (for example, freezer as a type). The term population is used to the full set of object instances being monitored.

The object creation is implicit: Activator groups events using a designated object key. Rules are scoped to objects, meaning all evaluation logic is object-aware and independent across instances. For example, a rule monitoring `bikepoint_id` creates distinct logical evaluations for each unique bike station.

### Rules
Rules define the conditions you want to detect on your objects and the actions to take when those conditions are met. For example, a rule on a freezer object might detect when the temperature rises above a safe threshold and automatically send an email alert to the assigned technician.

Rules in Activator can be stateless or stateful:

- **Stateless rules** evaluate each event in isolation (for example, value < 50).
- **Stateful rules** maintain memory across events per object (for example, value DECREASES, BECOMES, EXIT RANGE)

Stateful evaluation relies on:

- **Delta detection**: Tracks changes between prior and current event values.
- **Temporal sequencing**: Evaluates time-based conditions like absence of events (heartbeat detection)
- **State transitions**: Rules only fire on entry into a new state, preventing repeated firings in unchanged conditions

Each rule condition is compiled into an execution graph that is evaluated continuously, in-memory, and near-instantly. The system is optimized for subsecond decisioning latency after event arrival.

#### Actions 
When a rule’s conditions are met and an action is initiated, then the rule is said to be activated. The supported targets for actions include: 

- Fabric pipelines (for data movement, enrichment)
- Fabric notebooks (for machine-learning scoring, diagnostics)
- Fabric spark jobs (for batch/streaming jobs)
- Fabric functions (for custom business logic with code)
- Power Automate flows (for business process integration)
- Teams notifications (using template-based messaging)
- Email notifications

Activator emits a trigger message with the current object state and rule metadata, and actions are nonblocking, that is, and Activator doesn't wait for completions of actions to enable scalable asynchronous flows.

### Properties
Properties are specific fields or attributes of a business object that you want to monitor. These can be physical or conceptual characteristics, such as:

- Temperature of a package
- Status of a shipment
- Balance of a customer account
- Engagement score of a user session

They're derived from eventstreams, which are continuous flows of data from sources like IoT sensors, Power BI reports, or other systems. 

When you define a business object in Activator, you connect one or more eventstreams, choose a column to serve as the object ID, and select other columns to be treated as properties of that object. You can create rules on these properties to track changes over time, detect when a property exceeds a threshold or falls outside a range, or trigger actions like alerts, workflows, or notifications.

Properties are also useful when you want to reuse logic across multiple rules. For example, on a freezer object, you might define a property that calculates a temperature average over a one-hour period. Once defined, this property can be referenced in multiple rules, such as those that detect overheating, temperature fluctuations, or maintenance thresholds—without duplicating the logic. By centralizing logic in properties, you make your rules easier to manage, more consistent, and easier to update over time.

### Lookback period 
The lookback period refers to the duration of historical data that Activator analyzes to evaluate a rule. It ensures that enough past data is available to accurately detect patterns or compute aggregations like averages, even if data arrives late or irregularly.

The lookback period is determined by:

- How the rule is defined, for example, whether it requires analyzing trends, detecting anomalies, or comparing values over time.
- The volume of incoming data such as the number of events per second in the eventstream.

Consider a pharmaceutical logistics operation transporting medicine packages in a cold chain. The goal is to receive an alert when a package becomes too warm.

Let’s say the rule is defined to:

- Evaluate the average temperature of each package over a three-hour window
- Trigger an alert if the average temperature exceeds 8°C

To compute this rule accurately, Fabric Activator needs to analyze a broader window of historical data, specifically, a six-hour lookback period. It ensures that enough data is available to calculate the three-hour average at any point in time, even if data arrives with some delay or irregularity.

The lookback period is essential for enabling timely and accurate detection of conditions, especially in scenarios where data patterns evolve over time.

### Distinct, active object IDs

Rules built on attributes are used to monitor how specific attributes of an object change over time. In the pharmaceutical logistics example, each medicine package is represented by a unique object ID, and the system receives periodic temperature readings for each package. 

To evaluate these rules effectively, Fabric Activator tracks active object IDs, that is, objects for which events are arriving within the defined lookback period. This behavior ensures that only relevant, currently active objects are considered when applying rules.

For instance, a toll station might track vehicles (object IDs) as they pass through. Each vehicle generates events (for example, entry and exit scans), and only those objects with recent activity are considered active and evaluated by the system.

There are also limits based on the number of distinct object IDs (number of packages) being tracked within the lookback window. 

## Common use cases
Here are a few real-world scenarios where you can use Fabric Activator:

- Automatically launch ad campaigns when same-store sales decline, helping to boost performance in underperforming locations.
- Notify grocery store managers to relocate food from malfunctioning freezers before spoilage occurs.
- Trigger personalized outreach workflows when a customer’s journey across apps, websites, or other touchpoints indicates a negative experience.
- Proactively initiate investigation workflows when a shipment’s status wasn't updated within a defined timeframe, helping to locate lost packages faster.
- Alert account teams when customers fall into arrears, using customized thresholds for time or outstanding balances per customer.
- Monitor pipeline health and automatically rerun failed jobs or alert teams when anomalies or failures are detected.


## Next step
See [Tutorial: Create and activate a Fabric Activator rule](activator-tutorial.md).
