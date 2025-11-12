---
title: Explore Fabric capacity overview events in Fabric Real-Time hub
description: This article shows how to explore Fabric capacity overview events in Fabric Real-Time hub.
author: george-guirguis
ms.author: geguirgu
ms.topic: how-to
ms.date: 11/17/2025
ms.custom: references_regions
---

# Explore Fabric capacity overview events in Fabric Real-Time hub

Fabric Capacity Overview Events provide summary level information related to your capacity. These events can be used to create alerts related to your capacity health via Data Activator or can be stored in an Eventhouse for granular or historical analysis.

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

## View Fabric capacity overview events detail page

1. In **Real-Time hub**, select **Fabric events**.
1. Select **Fabric capacity overview events** from the list.
1. You should see the detailed view for Fabric capacity overview events.

## Actions

At the top of the detail page, you see the following two actions.

- **Create eventstream** - lets you create an eventstream based on events from the selected Fabric capacity.
- **Set alert** - lets you set an alert when an operation is done for a Fabric capacity, such as a state change.

## See what's using this category

This section shows the artifacts using Fabric capacity overview events. Here are the columns and their descriptions shown in the list.

| Column | Description |
| ------ | ------------ |
| Name | Name of the artifact that's using Fabric capacity overview events. |
| Type | Artifact type – Activator or Eventstream |
| Workspace | Workspace where the artifact lives. |
| Source | Name of the capacity that is the source of the events. |

## Event types
Here are the supported Capacity overview events:

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.Capacity.Summary | Emitted every 30 seconds to summarize the capacity usage across all operations during that interval. |
| Microsoft.Fabric.Capacity.State | Emitted when a capacity’s state changes. For example, when a capacity is paused or resumed. |

> [!NOTE]
> When a capacity is paused, all smoothed usage is pushed into the next available window. As a result, large spikes in capacity utilization can appear for the window in which the pause occurs. If a capacity is busy when paused (for instance, during background rejection), you might see higher than average capacity unit consumption for that time window.

### Schemas

An event has the following top-level data:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ----- |
| `source` | string | Identifies the context in which an event happened.  | `00000000-0000-0000-0000-000000000000` |
| `subject` | string | Identifies the subject of the event in the context of the event producer. |  `/capacities/<capacity-id>` |
| `type` | string | Contains a value describing the type of event related to the originating occurrence. | `Microsoft.Fabric.Capacity.Summary / Microsoft.Fabric.Capacity.State` |
| `time` | timestamp | Timestamp of when the occurrence happened. | `2024-04-23T21:17:32.6029537+00:00` |
| `id` | string | Unique identifier for the event. | `00000000-0000-0000-0000-000000000000` |
| `specversion` | string | The version of the Cloud Event spec. | `1.0` |

The `data` object has the following properties for Summary events:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `capacityId` | string | The ID of the capacity. A capacity always retains the same capacity ID, even if it's paused, restarted, scaled up, or scaled down. You can find the identifiers (IDs) of the capacities you have access to in the Power BI Service settings pane under **Governance and administration** -> **Admin portal**- **Capacity settings**. When you select a capacity, the ID appears in the browser URL. You can also check the "workspace settings" > "License info" to see which capacity is assigned to a workspace. | `00000000-0000-0000-0000-000000000000`  |
| `capacityName` | string | The name of the capacity on which the operation ran. The capacity name can be changed without impacting the capacity ID. | `foocapacity` |
| `capacitySku` | string | The Stock Keeping Unit (SKU) size of the capacity on which the operation ran. | `FT1` |
| `windowStartTime` | timestamp | Indicates the start time window from which the smoothing took place. The windows are split into 30-second buckets and represent the capacity unit (CU) smoothing windows. | `2025-09-22 05:23:00.0000000` |
| `windowEndTime` | timestamp | Indicates the end time of the window in which the smoothing took place. The timestamp is always 30 seconds after the window start time as events are emitted for every 30 seconds. | `2025-09-22 05:23:30.0000000` |
| `baseCapacityUnits` | integer | The amount of CU per second available on the specific SKU. | `64` |
| `capacityUnitMs` | double | CU Milliseconds used within the time window. This value can be compared to the budgeted CU. You can then divide capacityUnitMs by the budget to calculate % utilization. | `191.1869444` |
| `interactiveDelayThresholdPercentage` | double | The percentage of interactive delay at the timepoint. This percentage is an expression of the average % utilization of the upcoming 20 time windows (10 minutes). When this value exceeds 100%, interactive delay begins. | `51.12069` |
| `interactiveRejectionThresholdPercentage` | double | The percentage of interactive rejection at the timepoint. This percentage is an expression of the average % utilization of the upcoming 120 time windows (1 hour). This means those CUs are already committed for the upcoming 120 time windows due to smoothing. When this value exceeds 100%, interactive rejection begins. | `50.42771` |
| `backgroundRejectionThresholdPercentage` | double | The percentage of background rejection at the timepoint. This is an expression of the average % utilization of the upcoming 2,880 time windows (24 hours); that is to say the already committed CUs for the upcoming 2,880 time windows due to smoothing. When this value exceeds 100%, background rejection begins. | `25.61163`  |
| `overageTotalCapacityUnitMs` | double | The total carry forward into the current time window. This value is the net result of all carry forward and burndown to this point. | `7087709173.2001` |
| `overageAddCapacityUnitMs` | double | The amount of CU that was carried forward within the 30-second window because it exceeded the available budget. This can also be calculated as the delta between capacityUnitMs and available CU budget (base capacity units * 1000 * 30) where that number is positive. | `3427.21` |
| `overageBurndownCapacityUnitMs` | double | The amount of CU burnt down in the time window because there was spare capacity when the time window ended. This can also be calculated as the delta between capacityUnitMs and available CU budget (base capacity units * 1000 * 30) when that number is negative. If the total carry forward available is smaller, use that value instead. | `333000.7` |
| `utilizationBackground` | double | Shows the amount of CU consumed for billable background operations. This value is shown in milliseconds. Adding utilizationBackground to utilizationInteractive should add up to capacityUnitMs. | `28.74986111` |
| `utilizationInteractive` | double | Shows the amount of CU consumed for billable interactive operations. This value is shown in milliseconds. Adding utilizationBackground to utilizationInteractive should add up to capacityUnitMs. | `401.6` |
| `utilizationBackgroundPreview` | double | Shows the amount of CU consumed for background operations that aren't charged (usually, but not always, because operations are uncharged preview features). | `140.0416667` |
| `utilizationInteractivePreview` | double | Shows the amount of CU consumed for interactive operations that aren't charged (usually, but not always, because these operations are uncharged preview features). | `123.4` |
| `capacityUnitUtilizationBreakdown` | object | Breakdown of different usage like interactive, background, preview based on workload kind. |  |
| `tenantId` | string | ID of the tenant in which the operation took place. The tenant ID always remains the same for your organization | `00000000-0000-0000-0000-000000000000` |
| `capacityRegion` | string | The region in which the data center the capacity is hosted on resides. Capacities can't be moved to different regions after they're created. | `west us` |
| `processedOverageCapacityUnitsMs` | double | Related to certain billing aspects. Value is 0. |  |
| `overageBillingLimitCapacityUnitsMs` | double | Related to certain billing aspects. Value is 0. |  |

The `data` object has the following properties for State events:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `capacityId` | string | The ID of the capacity on which the operation ran. A capacity always retains the same capacity ID, even if it's paused, restarted, scaled up, or scaled down. | `00000000-0000-0000-0000-000000000000`  |
| `capacityName` | string | The name of the capacity on which the operation ran. The capacity name can be changed without impacting the capacity ID. | `foocapacity` |
| `capacitySku` | string | The SKU size of the capacity on which the operation ran at that time. SKUs can be scaled up or down at any time by admins, so the SKU may change for the same capacity ID | `FT1` |
| `transitionTime` | timestamp | The time when the capacity state changed. | `2025-09-07 17:23:10.5399586` |
| `capacityState` | string | The state of the premium capacity during the timestamp. | `Active` |
| `stateChangeReason` | string | This shows why the capacity moved to the current state. | `InteractiveDelay` |
| `activationId` | string | When a capacity is paused and restarted, it keeps the same capacity ID but gets a new activationId. The restart creates this new ID, which helps track pauses and restarts.  | `00000000-0000-0000-0000-000000000000` |

## Subscribe permission
For more information, see [subscribe permission for Fabric events](fabric-events-subscribe-permission.md)