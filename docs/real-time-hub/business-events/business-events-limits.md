---
title: Business Events limits in Fabric Real-Time Hub
description: Learn about the key Business Events limits in Microsoft Fabric, including event size, retry window, filters, preview data, and event types per listener.
#customer intent: As a developer, I want to understand Business Events limits so that I can design, test, and operate event-driven solutions in Fabric within those constraints.
ms.date: 06/25/2026
ms.topic: reference
---

# Business Events limits (Preview)

Use this page to understand the key Business Events limits that can affect how you design, test, and operate event-driven solutions in Fabric.

> [!IMPORTANT]
> This feature is in [preview](../../../fundamentals/preview.md).

## At a glance

| Limit | Value |
|-------|-------|
| Maximum event size | 1 MB |
| Retry window | 24 hours |
| Filters per event consumer | 25 |
| Preview data (recent events shown) | 30 events from the last 24 hours |
| Event types per listener | 25 |

When working with larger payloads, many event types, or complex filtering, considering these limits early can help you optimize your design over time.

## What each limit means for you

### Event size: up to 1 MB

Each event can be up to 1 MB in size. For larger payloads, consider splitting the data or using alternative approaches to keep events within this limit.

### Retry window: up to 24 hours

If delivery doesn't succeed on the first attempt, Business Events can retry for up to 24 hours. This helps handle temporary issues, after which the event is no longer retried.

### Filters per consumer: up to 25

Each event consumer can define up to 25 filters to control which events it receives. This allows for flexible routing based on your scenario.

### Preview data: up to 30 recent events

Preview shows up to 30 recent events from the last 24 hours for each publisher or consumer, providing a quick way to validate event flow.

### Event types per listener: up to 25

A listener can subscribe to up to 25 event types. For broader scenarios, you can distribute event types across multiple listeners.

## Related content

- [Business Events overview](business-events-overview.md)
- [Business Events concepts and terminology](business-events-concepts.md)
- [Create and manage business events](create-business-events.md)
