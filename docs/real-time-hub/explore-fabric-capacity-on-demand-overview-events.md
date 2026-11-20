---
title: Fabric capacity on-demand overview events in Real-Time hub
description: Explore Fabric capacity on-demand overview events in Real-Time hub. Learn about event schemas, rolling 24-hour usage, category limits, and event timing.
ms.reviewer: geguirgu
ms.topic: how-to
ai-usage: ai-assisted
ms.date: 11/03/2026
author: SnehaGunda
ms.author: sngun
ms.search.form: Explore Fabric capacity on-demand overview events
ms.custom: references_regions
---

# Explore Fabric capacity on-demand overview events in Fabric Real-Time hub

> [!IMPORTANT]
> On-demand summary events support the upcoming Microsoft Fabric on-demand billing capability. Fabric emits these events only after the capability is available and your tenant runs workloads on an F0 capacity or a hybrid capacity with on-demand billing enabled. For more information, see [Introducing on-demand compute and zero-provisioned capacity (Preview)](https://community.fabric.microsoft.com/blog/fbc_fabricupdatesblogs/build-deploy-and-govern-microsoft-fabric-at-scale/5369145#community-5369145-toc-hId-1297339526).
>
> This information relates to a prerelease product that might be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Fabric capacity on-demand overview events provide a rolling 24-hour usage snapshot for each on-demand billing category on a capacity. Each event reports usage and the configured category limit in capacity unit (CU) milliseconds. Use these events to create alerts in Activator when a category approaches its usage limit, or store them in an eventhouse for historical analysis.

The `Microsoft.Fabric.Capacity.OnDemandSummary` event type reports on-demand usage. The `Microsoft.Fabric.Capacity.Summary` event type, described in [Fabric capacity overview events](explore-fabric-capacity-overview-events.md), reports provisioned-capacity usage only and doesn't include on-demand billing consumption.

Use these events to monitor usage. Don't use them to reconcile invoices.

[!INCLUDE [consume-fabric-events-regions](../real-time-intelligence/event-streams/includes/connectors/consume-fabric-events-regions.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the Trial license mode with Contributor or higher permissions.
- A Fabric capacity where you have the capacity admin role.
- An F0 capacity, or a paid F capacity with at least one on-demand billing category enabled.

A paid F capacity with an on-demand billing category enabled is a hybrid capacity. Both F0 and hybrid capacities support on-demand billing categories, so don't use `capacitySku` alone to determine the billing mode.

## View event details

1. In **Real-Time hub**, select **Fabric events**.
1. Select **Fabric capacity on-demand overview events** from the list.

The detail page shows the available actions and the items that use these events.

### Available actions

At the top of the detail page, select an action:

- **Create eventstream** - Creates an eventstream based on events from the selected Fabric capacity.
- **Set alert** - Sets an alert based on on-demand usage events for a Fabric capacity.

### View items that use these events

The detail page lists the items that use Fabric capacity on-demand overview events. The list has the following columns:

| Column | Description |
| ------ | ----------- |
| Name | Name of the item that's using Fabric capacity on-demand overview events. |
| Type | Item type: Activator or Eventstream. |
| Workspace | Workspace where the item lives. |
| Source | Name of the capacity that's the source of the events. |

## Event types

Fabric supports the following capacity on-demand overview event:

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.Capacity.OnDemandSummary | Fabric typically emits this event about every five minutes for each capacity and on-demand billing category. The event reports rolling 24-hour usage and the configured category limit. |

The `Microsoft.Fabric.Capacity.State` and `Microsoft.Fabric.Capacity.Summary` events don't change. Consumers that filter for those event types can continue to exclude `Microsoft.Fabric.Capacity.OnDemandSummary`. Consumers subscribed to the full Capacity Events group must handle the additional event type.

## Event schema

An event has the following top-level properties:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `source` | string | Identifies the context in which an event happened. For this event, the value is the tenant ID. | `00000000-0000-0000-0000-000000000000` |
| `subject` | string | Identifies the subject of the event in the context of the event producer. | `/capacities/<capacity-id>` |
| `type` | string | Describes the type of event. | `Microsoft.Fabric.Capacity.OnDemandSummary` |
| `time` | timestamp | Timestamp of when Fabric emitted the event. This value isn't the start or end of the usage window. | `2026-10-28T21:17:32.6029537+00:00` |
| `id` | string | Unique identifier for the event. | `00000000-0000-0000-0000-000000000000` |
| `specversion` | string | The version of the Cloud Event spec. | `1.0` |
| `dataschemaversion` | string | The version of the data schema. | `1.0` |

### OnDemandSummary data properties

Each event is a snapshot for one capacity and one billing category. The `data` object has the following properties:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `tenantId` | string | The ID of the tenant associated with the capacity. | `00000000-0000-0000-0000-000000000000` |
| `capacityId` | string | The ID of the capacity whose category usage the snapshot represents. | `00000000-0000-0000-0000-000000000000` |
| `capacityName` | string | The current name of the capacity. | `foocapacity` |
| `capacitySku` | string | The SKU of the capacity. On-demand billing categories aren't limited to F0 capacities. | `F64` |
| `capacityRegion` | string | The display name of the Azure region of the capacity. | `West US` |
| `billingCategory` | string | The on-demand billing category for this snapshot. Use this value to correlate the snapshot with category-attributed operation events that use data schema version 1.2. | `DataScience` |
| `cumulative24HourProcessedCapacityUnitMs` | double | The CU milliseconds that the category used in the rolling 24-hour period, excluding preview usage. This value is a cumulative snapshot, not the amount since the previous event. | `180000000` |
| `cumulative24HourPreviewProcessedCapacityUnitMs` | double | The CU milliseconds that preview operations in the category used in the rolling 24-hour period. If the source doesn't report preview usage, the value is `0`, so you can't distinguish no measurement from zero usage. | `3600000` |
| `billingCategoryLimitCapacityUnitMs` | double | The usage limit that's configured for the category, in CU milliseconds. See [Interpret the category limit](#interpret-the-category-limit). | `360000000` |

The following example shows an event:

```json
{
  "specversion": "1.0",
  "dataschemaversion": "1.0",
  "id": "00000000-0000-0000-0000-000000000000",
  "source": "00000000-0000-0000-0000-000000000000",
  "subject": "/capacities/00000000-0000-0000-0000-000000000000",
  "type": "Microsoft.Fabric.Capacity.OnDemandSummary",
  "time": "2026-10-28T21:17:32.6029537+00:00",
  "data": {
    "tenantId": "00000000-0000-0000-0000-000000000000",
    "capacityId": "00000000-0000-0000-0000-000000000000",
    "capacityName": "foocapacity",
    "capacitySku": "F64",
    "capacityRegion": "West US",
    "billingCategory": "DataScience",
    "cumulative24HourProcessedCapacityUnitMs": 180000000,
    "cumulative24HourPreviewProcessedCapacityUnitMs": 3600000,
    "billingCategoryLimitCapacityUnitMs": 360000000
  }
}
```

In this example, the category used 50 CU-hours (180,000,000 CU milliseconds) of its 100 CU-hour limit (360,000,000 CU milliseconds). To convert CU milliseconds to CU-hours, divide by 3,600,000.

## Interpret the category limit

The `billingCategoryLimitCapacityUnitMs` property uses the following values:

| Value | Meaning |
| ----- | ------- |
| `-1` | On-demand billing is disabled for the category. No other negative value has a defined meaning. |
| `0` | On-demand billing is enabled with zero allowance. This value represents the category's blocked state. |
| Greater than `0` | The configured spend limit. The limit is exceeded only when `cumulative24HourProcessedCapacityUnitMs` is greater than the limit. Usage equal to the limit doesn't exceed it. |

Billing category limits are thresholds, not hard caps. Under normal conditions, Fabric stops starting new operations within five minutes of reaching the limit. Operations that are already running continue to completion, so actual usage can exceed the configured limit.

During public preview, billing category limits might not be consistently enforced. Usage can exceed the configured limit beyond the overruns described here. Monitor your on-demand usage regularly.

Preview usage isn't added to `cumulative24HourProcessedCapacityUnitMs` when you compare usage to the limit.

The event doesn't include separate properties for the enabled or exceeded state. Determine these states from `billingCategoryLimitCapacityUnitMs` and `cumulative24HourProcessedCapacityUnitMs`, using the rules in the preceding table.

Exact rolling-window boundaries and the effective time of a limit change aren't available from these events. Compare successive snapshots to detect a change in the reported limit, not to determine exactly when the change took effect.

## Event timing and delays

- Fabric typically emits one event about every five minutes for each capacity and category. Arrival times can vary.
- The `time` property is the emission time, not the boundary of the usage window.
- The usage values cover a rolling 24-hour period, so consecutive events overlap. Don't add consecutive snapshots together to calculate total usage or cost.
- The usage value can decrease without new operations when older consumption leaves the 24-hour period.
- A missing event doesn't mean that the category is disabled, idle, or within its limit.

## Consumer considerations

- Design your consumers to tolerate duplicate events and gaps in delivery.
- Don't depend on historical backfill. To retain history for analysis, send events to an eventhouse or OneLake.

## Drill down into operation events

The `OnDemandSummary` event reports usage by category. To find the workspaces, items, and operations behind that usage, correlate it with [Fabric capacity operation events](explore-fabric-capacity-operation-events.md) that use data schema version 1.2. Match events by `capacityId` and `billingCategory`.

Version 1.2 adds the following properties to the operation event schema:

| Property | Description |
| -------- | ----------- |
| `billingMode` | `Capacity` for operations that use the provisioned capacity billing path, or `OnDemand` for operations that use on-demand billing. `Capacity` doesn't indicate whether the capacity was purchased as pay-as-you-go or reserved. |
| `billingCategory` | The billing category of the operation. The value can be empty if the producer doesn't supply a category. A category is a billing grouping, not a meter, an invoice line, or a charge. Fabric can add, split, or combine categories, so don't treat the set of values as fixed. |

Operation events with data schema version 1.1 don't include `billingMode` or `billingCategory`. Make sure your queries and alert rules handle both versions. Don't classify an operation as `Capacity` when `billingMode` is missing or unrecognized.

To drill down from a summary event by using version 1.2 operation events:

1. Filter operation events to `billingMode` equal to `OnDemand`.
1. Filter to the same `capacityId` and `billingCategory` as the summary event.
1. Group by `workspaceId`, `itemId`, or `operationName` to find the largest consumers.

If an operation event has an empty `billingCategory`, you can't attribute it to a summary category by using that property.

## Subscription permissions

For more information, see [subscribe permission for Fabric events](fabric-events-subscribe-permission.md).

## Related content

- [Explore Fabric capacity overview events](explore-fabric-capacity-overview-events.md)
- [Explore Fabric capacity operation events](explore-fabric-capacity-operation-events.md)
- [Introducing on-demand compute and zero-provisioned capacity (Preview)](https://community.fabric.microsoft.com/blog/fbc_fabricupdatesblogs/build-deploy-and-govern-microsoft-fabric-at-scale/5369145#community-5369145-toc-hId-1297339526)
- [Azure, Fabric, and Business events capacity consumption](fabric-events-capacity-consumption.md)
