---
title: Understand your Fabric capacity throttling
description: Learn why and how capacities are throttled in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - build-2024
ms.date: 04/24/2025
---

# The Fabric throttling policy

Throttling occurs when a capacity consumes more capacity resources than it has purchased. Too much throttling can result in a degraded end-user experience. A Microsoft Fabric tenant can create multiple capacities and assign workspaces to a specific capacity for billing and sizing.

Throttling is applied at the capacity level, meaning that while one capacity, or set of workspaces, might be experiencing reduced performance due to being overloaded, other capacities might continue running normally. In cases where features such as OneLake artifacts are produced in one capacity and consumed by another, the throttling state of the consuming capacity determines whether calls to the artifact are throttled.

## Balance between performance and reliability

Fabric is designed to deliver fast performance to its customers by allowing operations to access more capacity unit (CU) resources than are provisioned by the capacity. Tasks that might take several minutes to complete on other platforms can be finished in mere seconds on Fabric. With Fabric's built-in _bursting_ and _smoothing_, capacities can be self-managing and self-healing when temporary spikes in usage would otherwise cause other systems to fail or slow down. 

### Bursting
To ensure fast performance, Fabric uses _bursting_ to let operations run as fast as they can. This ensures users get results quickly without waiting. Bursting allows users can temporarily use more compute than the provisioned compute. It means that a smaller capacity can run larger jobs that would normally require a more expensive capacity. 

### Smoothing
To avoid penalizing users when operations benefit from bursting, Fabric _smooths_ or averages the CU usage of an operation over a longer timeframe. This behavior ensures users can enjoy consistently fast performance without experiencing throttling. 

Smoothing distributes consumed CU usage over future _timepoints_ that are automatically managed by the capacity. Timepoints in Fabric are 30 seconds long. There are 2880 timepoints in a 24-hours.

An operation's utilization type determines the number of timepoints used for smoothing. Learn about [Fabric operations](fabric-operations.md).
- Interactive operations are smoothed over a minimum of five minutes, and up to 64 minutes depending on how much CU usage they consume.
- Background operations are smoothed over a 24-hour period because they typically have long runtimes and large CU consumption.

Due to smoothing, only a portion of the CU usage for an operation applies to any individual timepoint, which reduces throttling overall. Smoothed CU usage accumulates as operations run and is paid for by _future capacity_, which is the CU that is available in future timepoints because the capacity is running continuously. 

Bursting and smoothing work together to make it easier for capacity users to do their work. For example, data scientists and database administrators typically spend time scheduling jobs and spreading them out across the day. With smoothing, the compute cost for background jobs is smoothed over 24-hours. This means scheduled jobs can all run simultaneously without causing any spikes that would otherwise block jobs from starting. At the same time, users can enjoy consistently fast performance without waiting for slow jobs to complete or wasting time managing job schedules.

## Throttle triggers and throttle stages

Even though capacities have built-in smoothing that reduces the impact of spikes in usage, it's still possible to _overload_ a capacity by running too many operations and not giving enough time for smoothed usage to _burndown_. When a capacity is overloaded, it will automatically start to throttle new operations. The throttling is applied in several progressive stages to try to reduce the impact on critical jobs like data refreshes. 

Even when a capacity is operating above 100% utilization, Fabric doesn't immediately apply throttling. Instead, the capacity provides _overage protection_ that allows 10 minutes of future capacity to be consumed without throttling. This behavior offers a limited built-in protection from surges, while providing users consistently fast performance without disruptions.

The first phase of throttling begins when a capacity has consumed all its available CU resources for the next 10 minutes. This is when the capacity becomes _overloaded_. In the first phase of throttling, new interactive operations are delayed by 20 seconds upon submission. If the capacity has consumed all its available CU resources for the next one-hour, interactive requests are rejected, but scheduled background operations are allowed to start and run. If the capacity has consumed all its available CU resources for a full 24 hours, the entire capacity rejects all requests until all the consumed CU are paid off.

>[!NOTE]
>Microsoft tries to improve customer flexibility in using the service, while balancing the need to manage customer capacity usage. For this reason, Microsoft might change or update the Fabric throttling policy.

The table summarizes the throttling triggers and stages. 

| Usage  | Policy Limits	 | Platform Policy	Experience Impact | 
| --- | --- | --- | 
| Usage <= 10 minutes	 | Overage protection	 | Jobs can consume 10 minutes of future capacity use without throttling. | 
| 10 minutes < Usage <= 60 minutes	 | Interactive Delay	 | User-requested interactive jobs are delayed 20 seconds at submission. | 
| 60 minutes < Usage <= 24 hours	 | Interactive Rejection	 | User-requested interactive jobs are rejected. | 
| Usage > 24 hours	 | Background Rejection	 | All requests are rejected. | 

### Example of smoothing and throttling limits
Here's an illustrative example for how smoothing works for one background operation that consumed 1 CUHr (it's usage was 1 CU for 1 hour).
Background operations are smoothed over 24-hours. A background operation's contribution on any timepoint is # CUHrs for the operation / # of CUHrs at the SKU level. 
For an F2, this job would contribute 1 CUHr / 48CUhrs = ~2.1% to each timepoint. The impact on the 10-minute and 60-minute throttling limits will be ~2.1%.

Here's the detail supporting the example:

1 CUHr = 3600 CUs (1 CU * 60 minutes per hour * 60 seconds per minute)

Each time point is 30-seconds long. In 24 hours, there are 2880 timepoints (24 hours * 60 minutes * 2 timepoints per minute).

Since the 3600 CUs are smoothed over 24 hours, the job contributes 3600CUs/2880 timepoints to each 30-second timepoint. So it contributes 1.25 CUs per timepoint.

The 10-minute throttling percentage is based on the total CUs available in the next 10-minutes of capacity uptime.

A F2 capacity has 2 CU for each second (or 2 CUs). In each timepoint, an F2 has 2 CUs * 30 seconds = 60 CUs of compute.

The contribution of the background job to any individual timepoint is 1.25 CUs/60 CUs = ~2.1% of an individual timepoint.

In 10-minutes, the F2 has 2 CU * 60 seconds * 10 minutes = 1,200 CUs of compute.

The portion of the background job that was smoothed into the next 10-minutes of capacity is 1.25 CUs * 2 timepoints per minute * 10 minutes = 25 CUs.

So, the 10-minute throttling percentage is 25 CUs / 1,200 CUs = ~2.1%. 

Similarly, the  60-minute throttling percentage impact of the background job is also ~2.1%.

Even though the background operation consumed more CUs than is available in the next 10-minute time span (it consumed 6 times the amount), the F2 capacity is not throttled because the total CUs are smoothed over 24-hours. This means that only a small portion of the consumed CUs apply to any individual timepoint. 

## Overages, carryforward, and burndown

When operations use more capacity than the SKU supports in a single timepoint, an _overage_ is computed. Overages are computed after smoothing is applied. If there are overages that exceed the allowed 10-minute throttling window, then they become _carryforward_ CUs. 

The policy not to throttle until the 10-minute throttling window is full is called _overage protection_. It is designed to reduce the frequency of interactive delays due to temporary spikes in utilization.

The _carryforward_ CUs are applied to each subsequent timepoint. If a timepoint isn't full, then the unused CUs reduce the _carryforward_ CUs amount. The reduction is referred to as _burndown_.

Throttling enforcement continues until all carryforward CUs are paid off by unused capacity. 

## Monitoring capacities for throttling
Capacity admins can set up email alerts to be notified when a capacity consumes 100% of its provisioned CU resources. Admins can also use the capacity metrics app to review the throttling levels for their capacity.

## Right-sizing and optimizing a capacity

When throttling levels are consistently high it indicates the need to load balance across multiple capacities or to increase the capacity's SKU size. When using F SKUs, you can manually increase and decrease the SKU size at any time in the admin settings, which allows you to resolve throttling when needed.

If you need to stop throttling, you can temporarily increase the SKU. By increasing your SKU, you burndown carryforward faster because each timepoint has more idle capacity. 

## In-flight operations aren't throttled

When a capacity enters a throttled state, it only affects operations that are requested after the capacity has begun throttling. All operations, including long running ones that were submitted before throttling began, are allowed to run to completion. This behavior gives you the assurance that operations are completed, even during surges in CU usage.

## Compound throttling protection

In Fabric it's common for an operation started by one item or workload to call other items or workloads to complete. There are many examples, but a typical one is viewing a report. Each visual in the report runs a query against an underlying semantic model. The semantic model might also read data form OneLake in order to provide the query result. Each of these requests forms a chain.  

When there's a chain of calls, there's a risk of _compound throttling_, which is when throttling is applied more than once to the same request. Fabric has a built-in compound throttling protection that reduces the likelihood of compound throttling occurring. Workloads can opt-in to using this protection.

When workloads support compound throttling protection, a request is throttled only once for each capacity that participates in the chain. The throttling decision occurs when the request starts and applies to all operations in the chain. So, if a request is delayed, it's only delayed once. 

If a chain relies on more than one capacity, then each capacity enforces it's throttling once for the first request it receives in the chain. 

The following workload experiences support compound throttling:
- When a semantic model connects to another semantic model using Direct Query. Both models residing on the same capacity.
- A DAX query form a paginated report to a semantic model.

## Throttling behavior is specific to Fabric workloads

While most Fabric products follow the previously mentioned throttling rules, there are some exceptions.

For example, Fabric eventstreams have many operations that can run for years once they're started. Throttling new eventstream operations wouldn’t make sense, so instead, the amount of CU resources allocated to keeping the stream open is reduced until the capacity is in good standing again.

Another exception is Real-Time Intelligence, which wouldn’t be real-time if operations were delayed by 20 seconds. As a result, Real-Time Intelligence ignores the first stage of throttling with 20-second delays at 10 minutes of future capacity and waits until the rejection phase at 60 minutes of future capacity to begin throttling. This behavior ensures users can continue to enjoy real-time performance even during periods of high demand.

Similarly, almost all operations in the **Warehouse** category are reported as *background* to take advantage of 24-hour smoothing of activity to allow for the most flexible usage patterns. Classifying all data warehousing as *background* prevents peaks of CU utilization from triggering throttling too quickly. Some requests might trigger a chain of operations that are throttled differently. When an interactive operation starts a chain that includes a background operation, the background operation can become subject to throttling as an interactive operation.

## Interactive and background classifications for throttling and smoothing


Some admins might notice that operations are sometimes classified as interactive and smoothed as background, or vice versa. This distinction happens because Fabric’s throttling systems must apply throttling rules before a request begins to run.

The throttling system attempts to accurately categorize operations upon submission. Sometimes when an operation begins to run, more detailed information becomes available that changes the categorization. In ambiguous scenarios, the throttling system falls back to classifying operations as background, which is in the user’s best interest.

## Track overages and rejected operations

You can see if your capacity is overloaded by reviewing the [Utilization chart](metrics-app-compute-page.md#utilization) in the [Microsoft Fabric Capacity Metrics app](metrics-app.md). A spike that goes over the line indicates an overage. To further investigate the overage, drill through to the timepoint page. You can then review both your interactive and background operations, and see which ones were responsible for the overages.

Since utilization exceeding 100% doesn't automatically mean throttling, you need to use the [Throttling chart](metrics-app-compute-page.md#throttling) when evaluating overages. From there you can open a table that shows minutes to burndown, a chart with add, burndown, and cumulative percent, and more. The minutes to burndown shows how long burndown would take if no more operations ran in the capacity.

:::image type="content" source="media/fabric-drill-through.gif" alt-text="Animation that shows the drill-through option for a selected time point." lightbox="media/fabric-drill-through.gif":::

To view a visual history of any overutilization of capacity, including carryforward, cumulative, and burndown of utilization data, go to the [Overages tab](metrics-app-compute-page.md#overages). You can change the overages visual scale to display 10 minutes, 60 minutes, and 24 hours. 

:::image type="content" source="media/fabric-cross-filter-overages.gif" alt-text="Animation that shows overages over time." lightbox="media/fabric-cross-filter-overages.gif":::

The Microsoft Fabric Capacity Metrics app drilldown allows admins to see operations that were rejected during a throttling event. There's limited information about these operations as they were never allowed to start. The admin can see the product, user, operation ID, and time the request was submitted. When a request is rejected, end users receive an error message that asks them to try again later.

## Billable and non-billable compute
When you review capacity usage in the capacity metrics app, some operations are billable, and others are non-billable. Only billable operations are included in throttling calculations. Preview capabilities can generate non-billable operations. Use non-billable operations to plan ahead so that your capacity is sized correctly for when these preview features become billable.

## Actions you can take to recover from overload situations

When your capacity is overloaded and users are experiencing throttling, they receive errors that include the status code `CapacityLimitExceeded`. This happens for all operations that are rejected by throttling because they require Fabric compute resources to run. For example, the error can say *Cannot load model due to reaching capacity limits*. In such cases, you can use these strategies to recover your capacity from its overloaded state.

>[!NOTE]
> Pausing a capacity results in a billing event for the accumulated future capacity usage. When a capacity starts or is resumed, it has zero future capacity usage.

* Wait until the overload state is over before issuing new requests.
* Upgrade the SKU of an F capacity.
* Pause/resume an F capacity.
* [Autoscale](/power-bi/enterprise/service-premium-auto-scale) a P capacity.
* Move lower priority or overconsuming workspaces out of the capacity.

## Related content

* [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md) to monitor Fabric capacities.
* [How to resize your capacity](scale-capacity.md).
