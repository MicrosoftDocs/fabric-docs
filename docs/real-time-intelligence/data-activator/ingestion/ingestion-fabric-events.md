---
title: Activator ingestion of Fabric events
description: Learn how Activator ingests streaming Fabric events from Real-Time Hub, including workspace item, OneLake, and job events.
ms.topic: concept-article
ms.date: 02/27/2026
---

# Ingestion of Fabric Events

This article explains how Activator ingests Fabric events. Understanding this is useful for understanding how rules created from Fabric events behave. For step-by-step instructions on creating a rule from Fabric events, see [Set alerts on Fabric workspace item events in Real-Time hub](../../../real-time-hub/set-alerts-fabric-workspace-item-events.md), [Set alerts on OneLake events in Real-Time hub](../../../real-time-hub/set-alerts-fabric-onelake-events.md), or [Set alerts on Job events in Real-Time hub](../../../real-time-hub/set-alerts-fabric-job-events.md).

## How it works

Fabric events are a **streaming data source** for Activator. When activity occurs within your Microsoft Fabric environment, Fabric emits an event. You can subscribe to these events in Real-Time Hub and route them into Activator, where your rules are evaluated as each event arrives.

You connect Fabric events to Activator through Real-Time Hub. In Real-Time Hub, you choose an event source, subscribe to one or more of its event types, and add Activator as the destination. Once configured, Fabric pushes matching events into Activator in near real time.

### Event sources

When you create a connection, you choose from the following Fabric event sources:

| Event source | Description |
|---|---|
| Anomaly detection events (preview) | Events produced by anomaly detection models that indicate detected anomalies. |
| Capacity overview events (preview) | Events produced for capacity state changes and summary-level capacity usage. |
| Job events | Events produced by status changes on Fabric monitor activities, such as a job created, succeeded, or failed. |
| OneLake events | Events produced by actions on files or folders in OneLake, such as a file created, deleted, or renamed. |
| Workspace item events | Events produced by actions on items in a workspace, such as an item created, deleted, or renamed. |

Each event source has its own set of event types that you can subscribe to.

### How events map to Activator

Each incoming event includes fields that describe what happened, when it happened, and which resource was involved. Activator maps these fields as follows:

- **Timestamp**: Activator automatically uses the timestamp from each event as the event time.
- **Object ID** (optional): If you choose "on each event grouped by," you select one of three fields as the object ID. In most cases, **subject** is the right choice. It identifies the specific item or path that the event relates to (for example, a lakehouse item ID or a OneLake file path), which means Activator creates one object per item and tracks events for each item individually.

  The available fields are:
  - **subject**: the specific item or path involved. This is the most common choice.
  - **source**: the Fabric resource that emitted the event (for example, a workspace or a capacity). Useful if you want to track activity at a higher level rather than per item.
  - **type**: the event type (for example, `Microsoft.Fabric.OneLake.FileCreated`). Rarely needed as an object ID.

  If you don't group events by a field, Activator treats all incoming events as a single ungrouped stream.
- **Property**: Activator surfaces fields from the event payload as available properties. When you create your rule, you choose which field to monitor as the property value.
