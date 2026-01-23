---
title: Overview of Activator rules
description: Learn about Fabric Activator rules. Learn what they are and how to create them on events, properties, and objects. Use rules to get notifications about your data and to automate workflows.
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.search.form: Data Activator Rule Creation
ms.date: 12/09/2024
---

# Fabric Activator rules
Once you bring streaming data into an activator or [assign events to objects](activator-assign-data-objects.md#assign-data-to-objects-in-activator), you can create rules to act on your data. 
Rules define the conditions you want to detect on your objects and the actions to take when those conditions are met. For example, a rule on a freezer object might detect when the temperature rises above a safe threshold and automatically send an email alert to the assigned technician.

Each Activator includes one or more rules, which are evaluated continuously. These can be simple comparisons (`value < threshold`) or stateful expressions like `BECOMES`, `DECREASES`, `INCREASES`, `EXIT RANGE`, or absence of data (heartbeat). Activator ensures state tracking per object, which enables complex pattern detection over time.

## Actions 
When a rule’s conditions are met and an action is initiated, then the rule is said to be activated. The supported targets for actions include: 

- Fabric pipelines (for data movement, enrichment)
- Fabric notebooks (for machine-learning scoring, diagnostics)
- Fabric spark jobs (for batch/streaming jobs)

- Fabric functions (for custom business logic with code)

- Power Automate flows (for business process integration)
- Teams notifications (using template-based messaging)

- Email notifications

There are three types of rules: rules on events, rules on events that are added to an object, and rules on an object's properties.  

## Create rules on events
Creating rules on events allows you to get an activation for every event that comes in on an eventstream. When creating these kinds of rules, you can track the state of something over time. For example:

- You get an alert every time a new event comes in on an eventstream that has readings on a single IoT sensor.
- You get an alert every time a new event comes in and the value for a column in that event meets your defined condition.

## Create rules on Object events
Objects are created from streaming data and are identified by unique columns in one or more stream. You pick specific columns and the unique column to bundle into an object. Then, instead of creating rules on the arrival of events, you create rules that monitor events and report on either the arrival of that object, or the arrival of an object that meets a defined condition. Your rule activates every time a new event comes in on the eventstream object. And, you can identify which instance it came in for as well. 

## Create rules on properties
Creating rules on properties allows you to monitor a property on objects over time. If you want to monitor the state of a property on an object, create a rule on a property. For example, you can monitor the temperature on a package and whether it stays within a set range over time.

## Stateless vs. stateful rules
Rules in Activator can be stateless or stateful:

- **Stateless rules** evaluate each event in isolation (for example, value < 50).
- **Stateful rules** maintain memory across events per object (for example, value DECREASES, BECOMES, EXIT RANGE)

Stateful evaluation relies on:

- **Delta detection**: Tracks changes between prior and current event values.
- **Temporal sequencing**: Evaluates time-based conditions like absence of events (heartbeat detection)
- **State transitions**: Rules only fire on entry into a new state, preventing repeated firings in unchanged conditions

Each rule condition is compiled into an execution graph that is evaluated continuously, in-memory, and near-instantly. The system is optimized for subsecond decisioning latency after event arrival.

## Key Design Considerations

- **Stateful logic vs. stateless filtering** - Stateless filters (e.g., value < 5) may be too noisy. Prefer transitional logic like DECREASES or BECOMES to reduce false positives and spam.
- **Object key cardinality** - Each unique object key (e.g., device ID) incurs memory and compute tracking. High-cardinality implementations (>10,000 unique objects) should be carefully profiled to maintain performance.
- **Combining rules** - Activator supports both AND and OR logic. Use them to build complex detection trees (e.g., temperature decreases AND status becomes “critical”).
- **Alert fatigue management** - Design rules to fire on edge transitions only. Activator automatically suppresses repeat alerts unless a new state is entered, but good design further reduces noise.


## Next step

> [!div class="nextstepaction"]
> [Create an activator rule](activator-create-activators.md)