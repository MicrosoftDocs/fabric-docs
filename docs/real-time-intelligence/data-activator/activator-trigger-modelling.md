---
title: Trigger modeling in Activator
description: Learn how to model triggers in Fabric Activator using events, objects, properties, and rules. Understand the different rule types and when to use each one.
ms.topic: concept-article
ms.search.form: Data Activator Trigger Modeling
ms.date: 04/09/2026
---

# Trigger modeling in Activator

In Activator, data arrives as **events**. You can create **rules** directly on events to trigger actions when conditions are met. Optionally, you can group events into **objects** by a unique key and expose **properties** (fields you want to monitor over time), which unlock more powerful rule types. Events, objects, properties, and rules are all represented in the Activator UI as **entities**—items in the explorer tree that you can select and configure.

This article explains each of these concepts and how to use them to build triggers.

## The event entity

All triggers in Activator begin with one or more *events*. These events represent Activator's real-time ingestion of data from one of several sources. See [Ingestion overview](ingestion/ingestion-overview.md) to understand how Activator ingests data from various sources into Activator.

You can see information about the event entity on the Event page. It includes a real-time view of events as they arrive and a count of events over time.

:::image type="content" source="media/activator-trigger-modelling/event-page.png" alt-text="Screenshot showing the Event Entity page with a live feed of incoming events. Red box shows the Event Entity selected in the explorer tree.":::

The event has two kinds of fields: system fields (added by Activator as data is ingested) and data fields (the actual data on the event that's being sent to Activator).

The system fields are:

| Field Name | Explanation |
| :--------- | :---------- |
| `Time` | The logical *event time*. How that is calculated varies from source-to-source. See [Ingestion overview](ingestion/ingestion-overview.md) for a description of how this field is calculated by Activator. |
| `___id` | The unique ID of the event |
| `___source` | An internal ID that identifies the source in the Activator system |
| `___type` | The kind of source (for example, Power BI, EventStream) that the event is from |
| `System.IngestionTime` | This is the actual time that the event was ingested into in Activator (in UTC). See [Latency in Activator](activator-latency.md) for a detailed discussion on how it differs from the `Time` field and how this relates to your triggers. |
| `System.LastUpdateTime` | This is the last time the event definition was updated. |

Your data fields can vary from event-to-event, and Activator doesn't impose a strict schema at ingestion time.

> [!NOTE]
> In Activator, a data field containing an empty string ("") is considered the same as the event not containing the data field.

## Rules

After bringing your data into Activator in the form of an [event entity](#the-event-entity), you can create a *rule* to take action on your data. There are three different kinds of rule entities. This table gives a high-level summary of when to choose which:

| Dimension | [Event Rules](#the-event-rule-entity) | [Split-Event Rules](#the-split-event-rule-entity) | [Property Rules](#the-property-rule-entity) |
| :-------- | :---------- | :----------------- | :--------------- |
| Complexity | Lowest | Medium | Highest |
| Support for change detection conditions | Only simple conditions available | Only simple conditions available | Full set of conditions available |
| Can track changes across different objects | Not supported | Supported | Supported |
| Can create rules based on multiple event entities | Not supported | Not supported | Supported |

> [!NOTE]
> The latency depends partly on the complexity of the rule created, but many other factors can affect Activator rule latency. See [Latency in Activator](activator-latency.md) for documentation of these factors.

## The event rule entity

The simplest kind of rule you can create in Activator is an *event rule*. This kind of rule acts directly on one [event entity](#the-event-entity), and presents a simpler set of conditions than split-event rules and property rules. Use it when you want to alert on a global property of a stream, and don't want to differentiate between different objects. For example, if you want to alert when global sales are more than $100,000, use an event rule. However, if you want to instead monitor the sales of individual countries, use a [split-event](#the-split-event-rule-entity) or [property rule](#the-property-rule-entity).

:::image type="content" source="media/activator-trigger-modelling/event-rule-definition.png" alt-text="Screenshot showing an Event Rule with condition and action steps. Red box shows the Event Rule selected in the explorer tree.":::

### Monitor step

In the monitor step, you select which event entity you want to monitor with this rule.

### Condition step

An event rule has one or more conditions, and it fires when *all* the conditions are met. For example, the above fires when temperature is > 10 and pressure is < 30. If your events don't have a consistent schema, then you can select a default value. For example, perhaps some of your events are missing the pressure field, and you want to specify a default pressure of 15.

### Action step

Event rules support the same set of actions as all other rules. See [Activator introduction](activator-introduction.md#core-architecture) for documentation of each one. You can select fields from the event to add extra context to the activation.

## The object entity, split-event entity, and property entities

Objects are a way of logically splitting your incoming event entities into separate streams, so that the objects can be monitored separately. Many real-world use cases fit into this paradigm, for example monitoring engine pressure across a fleet of vehicles.

### Objects

An object is based on one or more event entities. To turn an event into an object, select a column from the event to be the object-id key:

:::image type="content" source="media/activator-trigger-modelling/build-object-dialog.png" alt-text="Screenshot showing the Build object dialog with the object name, unique identifier, and properties. Red box highlights the Build object pane.":::

This column's values must uniquely identify each object—it's how Activator decides which object an incoming event belongs to. Multiple events can share the same value when they belong to the same object. For example, you can use VehicleId for monitoring a vehicle fleet, or PackageId for monitoring a set of packages.

An object can also consist of multiple event entities. For example, you can have engine pressure come in on one event entity, and temperature come in on another, but you want to associate them to the same vehicle object. See [Combining multiple streams](combine-multiple-streams.md) for a detailed walkthrough of this capability.

### Split-event entities

Every event entity you add to the object creates a corresponding split-event entity, which is a view on the original event entity, but split by the object-id key. You can create a [split-event rule](#the-split-event-rule-entity) from a split-event.

:::image type="content" source="media/activator-trigger-modelling/split-event-entity.png" alt-text="Screenshot showing a Split-Event Entity with events grouped by PackageId. Red box shows the Split-Event Entity selected in the explorer tree.":::

### Property entities

You can add fields from the events as *properties* of the object. Property entities allow further computations on the field, and can be reused by one-or-more [property rule](#the-property-rule-entity) entities:

:::image type="content" source="media/activator-trigger-modelling/property-entity.png" alt-text="Screenshot showing a Property Entity for Temperature with per-object charts. Red box shows the Property Entity selected in the explorer tree.":::

Properties allow simple aggregations (average, max, min, and count). The aggregations look at data across an entire window width and calculate the result every window hop size. If you need more complex transformations on an event field, consider using the capabilities of the system that sends the data to Activator.

> [!NOTE]
> Properties are indicated with a single label icon while the object-id is labeled with a double label icon. The object-id isn't a property, and so can't be used as the basis for property rules.

:::image type="content" source="media/activator-trigger-modelling/explorer-icons.png" alt-text="Screenshot showing the explorer tree with a property icon (highlighted in blue) and object-id icon (highlighted in red).":::

## The split-event rule entity

Split-event rules are a simple way to create rules that can differentiate across different logical objects. For example, if you want to create a rule that alerts when any given store's sales are more than $10,000, use a split-event rule. The object-id (for example, the store name) is automatically added to the activation produced by a split-event rule. Otherwise, they function in a very similar way to [event rules](#the-event-rule-entity). Split-event rules share the same condition and action steps as event rules.

:::image type="content" source="media/activator-trigger-modelling/split-event-rule.png" alt-text="Screenshot showing a Split-Event Rule Definition with Monitor, Condition, and Action. Red box shows the Split-Event Rule selected in the explorer tree.":::

## The property rule entity

Property rules give you the most flexibility in defining complex alerting conditions. A property rule must be associated with one "base property". The base property is the only property that can cause the rule to fire. Other properties can be used as filters or to add extra context in the activation.

There are four steps to a property rule:

1. Monitor step

1. Condition step

1. Property filter step

1. Action step

:::image type="content" source="media/activator-trigger-modelling/property-rule.png" alt-text="Screenshot showing a Property Rule with Monitor, Condition, and Property Filter steps. Red box shows the Property Rule selected in the explorer tree.":::

### Monitor step

In the monitor step, you first select which property drives your trigger. Then you can optionally add some filters. These filters remove any property values that don't meet *all* the criteria before the next step.

> [!NOTE]
> If you don't see a field from your event listed, make sure a property exists on the object for that field.

### Condition step

In your condition step, you choose what change detection to use. Activator supports change detection conditions such as IncreasesBy 10%, or BecomesLessThan 30. These conditions compare multiple points in the incoming event stream, rather than a simple point-by-point comparison. See [Detection conditions](activator-detection-conditions.md) for a full list of the condition options and an explanation of their behavior.

You might also want to pick an "Occurrence" option to modify the condition further. For example, you might want to fire when the temperature BecomesLessThan 30, and then stays that way for 10 minutes. The occurrence options are:

- **Every time the condition is met**—this option is the default behavior.

- **When it has been true for n consecutive times**—note that this option means *consecutive*, not total. The trigger fires when the base condition has been true for n consecutive evaluations. For example, you might want to fire when the temperature is less than 30 for 10 consecutive temperature readings.

- **When it has been true for**—this option means the trigger fires when the base condition has been true for x amount of time.

Not all occurrence options are available for all conditions.

### Property filter step

Property filters are a way of filtering the output of the condition step. They differ from the filters in the monitor step in two ways:

1. Monitor-step filters happen *before* the condition result is computed whereas the property-filter step is applied *after* the condition step completes. This difference can result in different activations being produced.

1. Property filters can refer to other properties besides the base property. For example, your base property may be "temperature" and your condition set to fire when temperature increases above 30. You might want to add the constraint that the trigger should only fire when the "pressure" is below 10. You do that by adding a property filter using pressure to the rule.

### Action step

The action step is the same as the action step in [event](#the-event-rule-entity) and [split-event](#the-split-event-rule-entity) triggers. You can select other properties to appear as extra context in your activation through the "context" dropdown. The ID of the object that caused the rule to fire, and the time it fired at, are included by default.

> [!NOTE]
> To add an event field as extra context to your property rule, first ensure that a property exists on your object for that field.

### Misaligned properties

A property rule can reference several properties at once—for example, in the property filter step, or as extra context in the action step. These properties are best thought of as logically independent streams, and so the timing of events on those streams may vary.

If these properties update at different rates, a question arises: which value should be used when evaluating the rule? Consider these examples:

- You create a rule that fires when pressure becomes greater than 30, and you include the average temperature (calculated every five minutes) as extra context.
- You create a rule that fires when a driver becomes unavailable, but only when the driver is assigned to a package with less than one day left before delivery. The driver status and the package deadline come from different event entities.

In traditional streaming systems, careful consideration needs to be given to how multiple event streams, with events happening at different times, can be combined in a consistent way. However, in Activator, this behavior works naturally out of the box. Objects in Activator are *stateful*, so the last event for a given property is always retained and available for use in a future computation. Note that property values are only retained for 7 days from when the last event was seen for that object.

## Related content

- [Activator introduction](activator-introduction.md)
- [Create Activator rules in design mode](activator-create-activators.md)
- [Detection conditions](activator-detection-conditions.md)
- [Latency in Activator](activator-latency.md)
- [Combining multiple streams](combine-multiple-streams.md)
