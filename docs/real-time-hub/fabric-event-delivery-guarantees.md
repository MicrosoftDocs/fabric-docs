---
title: Events delivery guarantees
description: Describes how Microsoft Fabric delivers Business events, Fabric events, and Azure events, and provides guidance for handling duplicate events in your workflows.
ms.reviewer: george-guirguis
ms.date: 3/26/2026
ms.topic: concept-article
---

# Delivery guarantees for Business, Fabric, and Azure Events

This article describes how Microsoft Fabric delivers Business events, Fabric events, and Azure events, and provides guidance for handling duplicate events in your workflows.

## Delivery model

Business events, Fabric events, and Azure events use **at-least-once delivery** of events. In rare cases, the same event might be delivered more than once. Events are also **not guaranteed to arrive in order**, so your application should not depend on the sequence in which events are received. Because delivery is at-least-once, your event consumers should be designed to handle receiving the same event more than once. The next section explains how to do this.

## How to deduplicate events

All Business events, Fabric events, and Azure events use the [CloudEvents](https://cloudevents.io/) specification. Every event includes an `id` attribute and a `source` attribute. Together, the combination of `source` + `id` uniquely identifies each distinct event. If the same event is delivered again due to a retry, it carries the same `id` and `source` values.

To deduplicate events, use the following approach:

1. **Extract the `id` and `source`** from each incoming event.
2. **Check whether you have already processed an event** with that same `source` + `id` combination.
3. **If yes, skip it.** If no, process the event and record the `source` + `id` as processed.

### Example: Deduplication using a record of processed events

The following pseudocode illustrates the deduplication pattern:

```
on event_received(event):
    key = event.source + event.id

    if key exists in processed_events_store:
        // Already handled — skip this event
        return

    // Process the event
    handle(event)

    // Record that this event has been processed
    add key to processed_events_store
```

> [!TIP]
> Use a persistent store such as a database table, cache, or key-value store to track processed event IDs. Consider adding an expiration policy (for example, 24–48 hours) to keep the store from growing indefinitely, since retries typically occur within minutes of the original delivery.

## Design for idempotent processing

In addition to deduplication, design your event handlers to be **idempotent**—meaning that processing the same event multiple times produces the same result as processing it once. Idempotent processing protects your application even if a duplicate event slips through your deduplication logic.


## Related content

- [Azure and Fabric events overview](https://learn.microsoft.com/fabric/real-time-hub/fabric-events-overview)
- [Business events overview](https://learn.microsoft.com/fabric/real-time-hub/business-events/business-events-overview)
- [CloudEvents specification](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md)
