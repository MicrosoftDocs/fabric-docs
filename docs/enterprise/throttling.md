---
title: Understand your Fabric capacity throttling
description: Learn why and how capacities are throttled in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - build-2024
ms.date: 01/24/2025
---

# The Fabric throttling policy

Throttling occurs when a tenant’s capacity consumes more capacity resources than it has purchased. Too much throttling can result in a degraded end-user experience. A Microsoft Fabric tenant can create multiple capacities and assign workspaces to a specific capacity for billing and sizing.

Throttling is applied at the capacity level, meaning that while one capacity, or set of workspaces, might be experiencing reduced performance due to being overloaded, other capacities might continue running normally. In cases where features such as OneLake artifacts are produced in one capacity and consumed by another, the throttling state of the consuming capacity determines whether calls to the artifact are throttled.

## Balance between performance and reliability

Fabric is designed to deliver lightning-fast performance to its customers by allowing operations to access more capacity unit (CU) resources than are allocated to the capacity. Tasks that might take several minutes to complete on other platforms can be finished in mere seconds on Fabric. With Fabric's built-in _bursting_ and _smoothing_, capacities can be self-managing and self-healing when temporary spikes in usage would otherwise cause other systems to fail or slow down. 

### Bursting
To ensure lightning-fast performance, Fabric uses _bursting_ to lets operations run as fast as they can. This ensures users get results quickly without waiting. Because of bursting, users can temporarily use more compute than the provisioned compute. It means that a smaller capacity can run larger jobs that would normally require a more expensive capacity. 

### Smoothing
To avoid penalizing users when operations benefit from bursting, Fabric _smooths_ or averages the CU usage of an operation over a longer timeframe. This behavior ensures users can enjoy consistently fast performance without experiencing throttling. The usage is distributed over future _timeslots_ that are automatically managed by the capacity.

Interactive operations are smoothed over a minimum of five minutes, and up to 64 minutes depending on how much CU usage they consume. Background operations are smoothed over a 24-hour period because they typically have long runtimes and large CU consumption.

Smoothed usage accumulates as job runs and is payed for by _future capacity_, which is the CU that are avabilable in future timeslots because the capacity is running continuously. 

Bursting and smoothing work together to eliminate the need for data scientists and database administrators to spend time creating job schedules that spread CU load across the day. With background jobs smoothing over 24-hours, scheduled jobs can all run simultaneously without causing any spikes that would otherwise block jobs from starting. At the same time, users can enjoy consistently fast performance without waiting for slow jobs to complete or wasting time managing job schedules.

## Throttle triggers and throttle stages

Even though capacities have built-in smoothing that reduces the impact of spikes in usage, it's still possible to _overload_ a capacity by running too many operations and not giving enough time for smoothed usage to _burndown_. When a capacity is overloaded, it will automatically start to throttle new operations. The throttling is applied in several progressive stages to try to reduce the impact on critical jobs like data refreshes. 

Even when a capacity is operating at its full CU potential, Fabric doesn't immediately apply throttling. Instead, the capacity provides _overage protection_ that allows 10 minutes of future capacity to be consumed without throttling. This behavior offers a limited built-in protection from surges, while providing users consistently fast performance without disruptions.

The first phase of throttling begins when a capacity has consumed all its available CU resources for the next 10 minutes. This is when the capacity becomes _overloaded_. In the first phase of throttling,   new interactive operations are delayed by 20 seconds upon submission. If the capacity has consumed all its available CU resources for the next one hour, interactive requests are rejected, but scheduled background operations are allowed to start and run. If the capacity has consumed all it's available CU resources for a full 24 hours, the entire capacity rejects all requests until all the consumed CU are paid off.

>[!NOTE]
>Microsoft tries to improve customer flexibility in using the service, while balancing the need to manage customer capacity usage. For this reason, Microsoft might change or update the Fabric throttling policy.

The table summarizes the throttling triggers and stages. 
| Usage  | Policy Limits	 | Platform Policy	Experience Impact | 
| --- | --- | --- | 
| Usage <= 10 minutes	 | Overage protection	 | Jobs can consume 10 minutes of future capacity use without throttling. | 
| 10 minutes < Usage <= 60 minutes	 | Interactive Delay	 | User-requested interactive jobs are delayed 20 seconds at submission. | 
| 60 minutes < Usage <= 24 hours	 | Interactive Rejection	 | User-requested interactive jobs are rejected. | 
| Usage > 24 hours	 | Background Rejection	 | All requests are rejected. | 


## Overages, carryforward and burndown
>[!NOTE]
>The example below is simplified to help explain the core concepts. Each reported timepoint in Fabric is 30 seconds long.

When operations use more capacity than the SKU supports in a single timepoint an _overage_ is computed. 

Let's look at a fictional example where there's no smoothing to illustrate the concept. If your SKU allows 64 CU, and a background job used 144 CU in a single timepoint, there's a 80 CU overage. 

Fabric capacities smooth background jobs over 24 hours. For the sake of this example, let's assume each timepoint is 10 minutes long which means there are 144 timepoints in 24 hours. The 144 CU background job gets smoothed uniformly across the timepoints resulting in each timepoint having 1 CU. 

Without smoothing, there was an overage, but with smoothing there isn't one. In fact, with smoothing the capacity could run 64 of these 144 CU background jobs before throttling occurred. 

In practice, capacities usually have a mix of interactive and background jobs running at any time. The smoothing of these jobs fills the timepoints progressively. Coming back to our example, let's assume a 60 CU interactive jobs ran and was smoothed over 1 hour. Then, each of the 6 10-minute timepoint in the next hour would get 10 CU. They'd each have a total of 11 CU in them because they each already had 1 CU from the background job. 

Now after more background and interactive jobs run and are smoothed, our next 10 minute long timepoint will become full when it has 64 CU in it already. The throttling stages start to apply but operations are still allowed to run. These operations can use additional CU which is smoothed over future timepoints including the next one which is already full! So the amount of CU that is in excess becomes an _overage_ and is applied to the next timepoint as _carryforward_. 

The _carryforward_ is applied to each future timepoints as it occurs. If a timepoint isn't full, then it has _idle_ capacity that reduces the _carryforward_ amount. Let's say there's 84 CU of carryforward. Then if a timepoint only has 20 CU in it and the SKU size is 64 CU, then there's 44 CU of idle capacity in the timepoint. The carryforward would be reduced to 40 CU. The process continues until all of the carryforward is paid off by idle capacity in future timepoints. This process is referred to as _burndown_. 

## Monitoring capacities for throttling
Admins can set up email alerts to be notified when a capacity consumes 100% of its provisioned CU resources. Admins can also use the capacity metrics app to review the throttling levels for their capacity.

## Right-sizing and optimizing a capacity

Admins should regularly check if they're getting many alerts, and if throttling levels are consistently high for their capacities. These are good indications that the capacity might benefit from load balancing or an increased SKU size. When using F SKUs, you can manually increase and decrease them at any time in the admin settings, which makes it easier to resolve throttling when needed.

If you need to stop throttling, you can temporariliy increase the SKU. By increasing your SKU, you burndown carryforward faster because each timepoint has more idle capacity. 

## In-flight operations aren't throttled

When a capacity enters a throttled state, it only affects operations that are requested after the capacity has begun throttling. All operations, including long-running ones that were submitted before throttling began, are allowed to run to completion. This behavior gives you the assurance that operations are completed, even during surges in CU usage.

## Compound throttling protection

Unlike traditional system, in Fabric it's common that an operation started by one item or workload will need to call into other items or workloads to complete. There are many examples, but a typicaly one is viewing a report. Each visual in the report runs a query against an underlying semantic model. The semantic model likely also reads data form OneLake in order to provide the query result. Each of these requests forms a chain.  

When there's a chain of calls, there's a risk of _compound throttling_, which is when throttling is applied more than once to the same request. Fabric has built-in infrastructure that reduces the likelihood of compound throttling that workloads opt-in to using. When workloads support compound throttling protection, then a request is throttled only once for each capacity that participates in the chain. The throttling decision occurs when the request starts and applies to all operations in the chain. So if a request is delayed, it is only delayed once. If a chain relies on more than one capacity then each capacity enforces it's throttling once for the first request it receives in the chain. 

The following workload experiences support compound throttling:
1. TBD1
2. TBD2
3. TBD3
4. TBD4

## Throttling behavior is specific to Fabric workloads

While most Fabric products follow the previously mentioned throttling rules, there are some exceptions.

For example, Fabric eventstreams have many operations that can run for years once they're started. Throttling new eventstream operations wouldn’t make sense, so instead, the amount of CU resources allocated to keeping the stream open is reduced until the capacity is in good standing again.

Another exception is Real-Time Intelligence, which wouldn’t be real-time if operations were delayed by 20 seconds. As a result, Real-Time Intelligence ignores the first stage of throttling with 20-second delays at 10 minutes of future capacity and waits until the rejection phase at 60 minutes of future capacity to begin throttling. This behavior ensures users can continue to enjoy real-time performance even during periods of high demand.

Similarly, almost all operations in the **Warehouse** category are reported as *background* to take advantage of 24-hour smoothing of activity to allow for the most flexible usage patterns. Classifying all data warehousing as *background* prevents peaks of CU utilization from triggering throttling too quickly. Some requests might trigger a string of operations that are throttled differently. This can make a background operation become subject to throttling as an interactive operation.

## Interactive and background classifications for throttling and smoothing

Microsoft Fabric divides operations into two types, *interactive* and *background*. You can find descriptions of these and the distinctions between them in [Fabric operations](fabric-operations.md).

Some admins might notice that operations are sometimes classified as interactive and smoothed as background, or vice versa. This distinction happens because Fabric’s throttling systems must apply throttling rules before a request begins to run. Smoothing occurs after the job has started running and CU consumption can be measured.

Throttling systems attempt to accurately categorize operations upon submission, but sometimes an operation’s classification might change after throttling has been applied. When the operation begins to run, more detailed information about the request becomes available. In ambiguous scenarios, the throttling system tries to err on the side of classifying operations as background, which is in the user’s best interest.

## Track overages and rejected operations

You can see if your capacity is overloaded by reviewing the [Utilization chart](metrics-app-compute-page.md#utilization) in the [Microsoft Fabric Capacity Metrics app](metrics-app.md). A spike that goes over the line indicates an overage. To further investigate the overage, drill through to the timepoint page. You can then review both your interactive and background operations, and see which ones were responsible for the overages.

Since utilization exceeding 100% doesn't automatically mean throttling, you need to use the [Throttling chart](metrics-app-compute-page.md#throttling) when evaluating overages. From there you can open a table that shows minutes to burndown, a chart with add, burndown, and cumulative percent, and more.

:::image type="content" source="media/fabric-drill-through.gif" alt-text="Animation that shows the drill-through option for a selected time point." lightbox="media/fabric-drill-through.gif":::

To view a visual history of any overutilization of capacity, including carryforward, cumulative, and burndown of utilization data, go to the [Overages tab](metrics-app-compute-page.md#overages). You can change the overages visual scale to display 10 minutes, 60 minutes, and 24 hours. 

:::image type="content" source="media/fabric-cross-filter-overages.gif" alt-text="Animation that shows overages over time." lightbox="media/fabric-cross-filter-overages.gif":::

The Microsoft Fabric Capacity Metrics app drilldown allows admins to see operations that were rejected during a throttling event. There's limited information about these operations as they were never allowed to start. The admin can see the product, user, operation ID, and time the request was submitted. When a request is rejected, end users receive an error message that asks them to try again later.

## Billable and non-billable compute
When you review capacity usage in the capacity metrics app, you'll see some operations are considered billable and other as non-billiable. Only billable operations are included in throttling caculations. Non-billable operations are typically generated by preview capabilities that is not yet billing. Use non-billable operations to plan ahead so that your capacity is sized correctly for when these preview features become billable.

## Actions you can take to recover from overload situations

When your capacity is overloaded and users are experiencing throttling, they receive errors that include the status code CapacityLimitExceeded. This happens for all operations that are rejected by throttling because they require Fabric compute resources to run. For example, the error can say *Cannot load model due to reaching capacity limits*. In such cases, you can use these strategies to recover your capacity from its overloaded state.

>[!NOTE]
> Pausing a capacity results in a billing event for the accumulated future capacity usage. When a capacity starts or is resumed, it has zero future capacity usage.

* Wait until the overload state is over before issuing new requests.
* Upgrade the SKU of an F capacity.
* Pause/resume an F capacity.
* [Autoscale](/power-bi/enterprise/service-premium-auto-scale) a P capacity.
* Move lower priority or overconsuming workspaces out of the capacity.

## Related content

* [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md) to monitor Fabric capacities.
