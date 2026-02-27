# Ingestion from Eventstreams

This article explains how Activator ingests data from Eventstreams. Understanding this is useful for understanding how rules created from Eventstreams behave. For step-by-step instructions on creating a rule from an Eventstream, see [Create a rule from an Eventstream](../../event-streams/add-destination-activator.md).

## How it works

Eventstreams are a **streaming data source** for Activator. Events flow continuously from your Eventstream into Activator, and your rules are evaluated as each event arrives.

You connect an Eventstream to Activator by adding Activator as a destination in the Eventstream editor. Once connected, the Eventstream pushes events into Activator in real time. Each event represents something that happened (a sensor reading, a transaction, a status change) and carries a set of fields describing it.

Activator interprets each incoming event as the value of a property for a particular object at a given point in time. For this to work, you map fields from your event schema to the following:

- **Property**: maps to a property in Activator (for example, a temperature reading or an order status).
- **Object ID**: maps to an object ID in Activator (for example, a device ID or order ID).
- **Timestamp** (optional): if present, Activator uses it as the event's timestamp. If absent, Activator uses the time at which it receives the event.

You configure this field mapping within Activator after adding the Eventstream destination.

### What happens if the Eventstream changes

Activator connects to the Eventstream directly and receives whatever events the Eventstream delivers. This means:

- If you reconfigure the Eventstream (for example, change its source or add transformations), the events flowing into Activator change accordingly. Your rule continues to run, but it evaluates against whatever the Eventstream now produces.
- If the Eventstream's schema changes (for example, a field your rule depends on is renamed or removed), the rule may stop evaluating correctly. You would need to update the rule's field mapping to match the new schema.
- If you delete the Eventstream, events stop flowing to Activator and the rule has no new data to evaluate.
