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
| Microsoft.Fabric.Capacity.Summary | Emitted every 30 seconds to summarize the capacity usage across all operations during that interval.  |
| Microsoft.Fabric.Capacity.State | Emitted when a capacity’s state changes. For example, when a capacity is paused or resumed. |

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

#### Summary Events Schema

> [!NOTE]
> The summary table contains aggregated CU data at the capacity level in a granularity of 30-second windows. CU data is smoothed, rather than raw- this approach reflects the way the system analyzes CU consumption for the purposes of throttling. Active capacities emit exactly one line item every 30 seconds, unless all line items for that window (CU, Interactive Delay Throttling percentage etc) are 0. Also, if a capacity is paused, it doesn't emit summary data.

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `capacityId` | string | The ID of the capacity on which the operation ran. A capacity always retains the same capacity ID, even if it's paused, restarted, scaled up, or scaled down. You can find the identifiers (IDs) of the capacities you have access to in the Power BI Service settings pane under **Governance and administration** -> **Admin portal**- **Capacity settings**. When you select a capacity, the ID appears in the browser URL. You can also check the "workspace settings" > "License info" to see which capacity is assigned to a workspace. | `00000000-0000-0000-0000-000000000000`  |
| `capacityName` | string | The name of the capacity. Capacity name can be changed without impacting the capacity ID. | `foocapacity` |
| `capacitySku` | string | The Stock Keeping Unit (SKU) size of the capacity on which the operation ran at that time. SKUs can be scaled up or down at any time by admins, so the SKU may change for the same capacity ID. | `FT1` |
| `windowStartTime` | timestamp | Indicates the start time window from which the smoothing took place. The windows are split into 30-second buckets and represent the capacity unit (CU) smoothing windows. Each capacity emits one event per window while active. When a capacity is paused, no events are emitted. | `2025-09-22 05:23:00.0000000` |
| `windowEndTime` | timestamp | Indicates the end time of the window in which the smoothing took place. This timestamp is always 30 seconds after the window start time as smoothing windows are always 30 seconds long. | `2025-09-22 05:23:30.0000000` |
| `baseCapacityUnits` | integer | The amount of CU per second available on the specific SKU. You can use this figure to create a CU budget value for the time window by multiplying the value by 1000 (to convert second to milliseconds) and multiply the result by 30. You can compare this to the amount of capacityUnitMs used in the same window. | `64` |
| `capacityUnitMs` | double | CU Milliseconds used within the time window. This value can be compared to the budgeted CU. You can then divide capacityUnitMs by the budget to calculate % utilization. | `191.1869444` |
| `interactiveDelayThresholdPercentage` | double | The percentage of interactive delay at the timepoint. This percentage is an expression of the average % utilization of the upcoming 20 time windows (10 minutes). When this value exceeds 100%, interactive delay begins. | `51.12069` |
| `interactiveRejectionThresholdPercentage` | double | The percentage of interactive rejection at the timepoint. This percentage is an expression of the average % utilization of the upcoming 120 time windows (1 hour). This means those CUs are already committed for the upcoming 120 time windows due to smoothing. When this value exceeds 100%, interactive rejection begins. | `50.42771` |
| `backgroundRejectionThresholdPercentage` | double | The percentage of background rejection at the timepoint. This percentage is an expression of the average % utilization of the upcoming 2,880 time windows (24 hours). This means those CUs are already committed for the upcoming 2,880 time windows due to smoothing. When this value exceeds 100%, background rejection begins. | `25.61163`  |
| `overageTotalCapacityUnitMs` | double | The total carry forward into the current time window. This value is the net result of all carry forward and burndown to this point. | `7087709173.2001` |
| `overageAddCapacityUnitMs` | double | The amount of CU that was carried forward within the 30-second window because it exceeded the available budget. This can also be calculated as the delta between capacityUnitMs and available CU budget (base capacity units * 1000 * 30) where that number is positive. | `3427.21` |
| `overageBurndownCapacityUnitMs` | double | The amount of CU burnt down in the time window because there was spare capacity when the time window ended. This can also be calculated as the delta between cpuTimeCapacityUnitMs and available CU budget (base capacity units * 1000 * 30) where that number is a negative, or the total carry forward available, whichever is smaller. | `333000.7` |
| `utilizationBackground` | double | Shows the amount of CU consumed for billable background operations. This value is shown in milliseconds. Adding utilizationBackground to utilizationInteractive should add up to capacityUnitMs. | `28.74986111` |
| `utilizationInteractive` | double | Shows the amount of CU consumed for billable interactive operations. This value is shown in milliseconds. Adding utilizationBackground to utilizationInteractive should add up to capacityUnitMs. | `401.6` |
| `utilizationBackgroundPreview` | double | Shows the amount of CU (in milliseconds) consumed for background operations that aren't charged (usually, but not always, because operations are uncharged preview features). | `140.0416667` |
| `utilizationInteractivePreview` | double | Shows the amount of CU (in milliseconds) consumed for interactive operations that aren't charged (usually, but not always, because these operations are uncharged preview features). | `123.4` |
| `capacityUnitUtilizationBreakdown` | object | Breaks down CU consumption by workload, billable and non billable items and background and interactive. |  |
| `tenantId` | string | The tenant where the operation took place. The tenant ID always remains the same for your organization (although some organizations may have more than one tenant). Currently Real-Time Hub returns data for your current tenant. | `00000000-0000-0000-0000-000000000000` |
| `capacityRegion` | string | The region in which the data center the capacity is hosted on resides. Capacities can't be moved to different regions after they're created. | `west us` |
| `processedOverageCapacityUnitsMs` | double | Related to certain billing aspects. Value is 0. |  |
| `overageBillingLimitCapacityUnitsMs` | double | Related to certain billing aspects. Value is 0. |  |

> [!NOTE]
> **For capacityUnitUtilisationBreakdown, the possible workload values are:**
>
> | Workload          | Workload name                | Description                                                                                                      |
> |--------------------|----------------------------|------------------------------------------------------------------------------------------------------------------|
> | AD                | Anomaly Detector           | Anomaly detection by running queries supporting both interactive and background utilization types for real-time and scheduled analysis. |
> | AI                | AI (Copilot/AI features)   | Evaluates AI functions on dataflows and datasets as background operations to deliver intelligent and contextual insights. |
> | AS                | Semantic Model             | Semantic Model queries and refresh operations.                                                                    |
> | CDSA              | Dataflow/VNET              | Background operations related to dataflow refresh and virtual network gateways.                                          |
> | Dataflows         | Dataflow                   | Background operations related to running queries for dataflows Gen 2.                                           |
> | DI                | Data Integration           | Background operations across different item types for data movement, activity runs, and orchestration.           |
> | DMS               | Warehouse                  | Background operations across warehouses related to queries and SQL endpoints.                                   |
> | ES                | Eventstream                | Background operations related to eventstream data and traffic generated per hour.                               |
> | FuncSet           | User Data Functions        | Interactive and background operations for user data function related to read, write, and executions.            |
> | GeoIntel          | Map                        | Generating and managing map tiles and creating custom tilesets for geospatial visualization.                    |
> | Graph             | GraphIndex                 | Background operations related to graphs.                                                                        |
> | GraphQL           | GraphQL                    | Interactive operations for queries on graphs.                                                                   |
> | Kusto             | Kusto                      | Background operations for uptime related to Kusto databases and eventhouse.                                     |
> | lake              | OneLake                    | Background operations for lakehouse such as reads, writes with respect to different item types.             |
> | ML                | Machine Learning           | Background operations for machine learning features such as Copilot across different item types.                |
> | OneRiver          | OneRiver                   | One Lake operations for different item types related to event listeners and event operations.                    |
> | Reflex            | Activator                  | Data activator operations related to event computations and ingestion.                                          |
> | RsRdlEngine       | PaginatedReport            | Paginated report operations fired during renders.                                                               |
> | ScreenshotEngine  | Report Export/ Subscription| Background operations related to subscriptions and export.                                                      |
> | SparkCore         | Spark                      | Background operations related to spark job runs across different item types.                                    |
> | SQLDb              | SQL Database               | Interactive execution of SQL usage operations on native database items.                                         |

The `data` object has the following properties for State events:

#### State Events Schema

> [!NOTE]
> The state table summarizes key changes relating to the capacity’s state. This summary includes the capacity being created, becoming overloaded (throttling) or being paused. Other changes to the capacity like scaling up/ scaling down or renaming the capacity aren't considered as state changes (you can find this information in the summary table).
>
> State events only emit on a change in status. For example, if your capacity has a status of "NotOverloaded," it doesn't report again until that status changes, such as when the capacity is paused or becomes overloaded. This behavior might mean there are many days or weeks between state events emitting. It also means the states table can remain blank depending on when you start collecting data. For an active capacity, you can consider a blank states table to be equivalent to "NotOverloaded."
>
> ManuallyResumed is treated as "NotOverloaded," so when a capacity restarts, it doesn't send another event until it becomes overloaded or you pause it

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `capacityId` | string | The ID of the capacity on which the operation ran. A capacity always retains the same capacity ID, even if it's paused, restarted, scaled up, or scaled down. | `00000000-0000-0000-0000-000000000000`  |
| `capacityName` | string | The name of the capacity on which the operation ran. The capacity name can be changed without impacting the capacity ID. | `foocapacity` |
| `capacitySku` | string | The SKU size of the capacity on which the operation ran at that time. SKUs can be scaled up or down at any time by admins, so the SKU may change for the same capacity ID. | `FT1` |
| `transitionTime` | timestamp | The time when the capacity state changed. | `2025-09-07 17:23:10.5399586` |
| `capacityState` | string | The state of the premium capacity during the timestamp. | `Active` |
| `stateChangeReason` | string | This shows why the capacity moved to the current state. | `InteractiveDelay` |
| `activationId` | string | When a capacity is paused and restarted, it keeps the same capacity ID but gets a new activationId. The restart creates this new ID, which helps track pauses and restarts.  | `00000000-0000-0000-0000-000000000000` |

### Considerations and Patterns

- When a capacity is paused, all smoothed usage is pushed into the next available window. As a result, large spikes in capacity utilization can appear for the window in which the pause occurs.

- Utilization percentage can't be calculated for P SKUs when autoscale is enabled because autoscale adds extra capacity units that aren't included in the states table.

- This system is a real-time system and doesn't backfill historical data. Even if you're using Real-Time Hub for alerting, start pushing data to Eventhouse or OneLake early, to ensure you have enough data for analysis such as graphing.

- Guidance on scenarios you might encounter:

    In order to ensure low latency and high performance, Capacity Events in Real-Time Hub are based on a best effort delivery mode. For the Summary table this behavior can mean that, while rare, events can either fail to be sent, or duplicates might be received.

    As follows are some patterns that can be employed for each of the scenarios mentioned.

    - **Duplicate events**

    Duplicates can be corrected through filtering, as there should only be one event per 30-second window per capacity. This step allows easy identification of duplicate values.

    In Kusto Query Language, you can use the following clause to remove duplicate data from the Summary table:

    ```
    | summarize take_any(*) by windowStartTime, windowEndTime, capacityId
    ```

    take_any is preferred to distinct because there's a possibility there might be small differences between duplicate data. In this case, a distinct operation would keep both. Here, take_any ensures exactly one row is taken.

    - **Missing events**

    Missing data is far rarer than duplicate data but might still occur. This condition doesn't have a noticeable impact on alerting or most capacity analysis, but might impact graphing/ analysis at the granularity of window start time.
    A useful pattern to handle dropped data is sampling the maximum value of a column over a fixed time window, such as five minutes. This approach helps ignore dropped data while still analyzing your data at a detailed level.

    - **Paused capacities**

    When a capacity is paused, all smoothed usage is pushed into the next available window. This behavior can cause large spikes in CU appearing for the window in which the pause occurs (up to 288,000% of normal if a capacity is busy when paused).

    For some graphing you might want to exclude paused windows, which impacts your X axis. The best way to do this is to calculate average utilization and exclude any values greater than ~500%. This approach should allow you to retain data related to normal overages, but exclude pause events. In Kusto Query Language, one way to achieve this approach is as follows:

    ```
    ['_summaryTable']
    | extend capacityUnitMsBudget = baseCapacityUnits * 1000 * 30
    | extend UtilizationPct = todecimal(capacityUnitMs)/ capacityUnitMsBudget * 100
    | project windowStartTime, UtilizationPct | where UtilizationPct < 500
    | render timechart
    ```

## Subscribe permission
For more information, see [subscribe permission for Fabric events](fabric-events-subscribe-permission.md)