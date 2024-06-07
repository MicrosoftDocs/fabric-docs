---
title: Understand your Fabric capacity throttling
description: Learn why and how capacities are throttled in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - build-2024
ms.date: 06/10/2024
---

# The Fabric throttling policy

Throttling occurs when a tenant’s capacity consumes more capacity resources than it has purchased. Too much throttling can result in a degraded end-user experience. A Microsoft Fabric tenant can create multiple capacities and assign workspaces to a specific capacity for billing and sizing.

Throttling is applied at the capacity level, meaning that while one capacity, or set of workspaces, might be experiencing reduced performance due to being overloaded, other capacities might continue running normally. In cases where features such as OneLake artifacts are produced in one capacity and consumed by another, the throttling state of the consuming capacity determines whether calls to the artifact are throttled.

## Balance between performance and reliability

Fabric is designed to deliver lightning-fast performance to its customers by allowing operations to access more capacity unit (CU) resources than are allocated to the capacity. Tasks that might take several minutes to complete on other platforms can be finished in mere seconds on Fabric. To avoid penalizing users when operational loads surge, Fabric smooths or averages the CU usage of an operation over a minimum of five minutes, and even longer for high CU usage but short runtime requests. This behavior ensures you can enjoy consistently fast performance without experiencing throttling.

For background operations that have long runtimes and consume heavy CU loads, Fabric smooths their CU usage over a 24-hour period. Smoothing eliminates the need for data scientists and database administrators to spend time creating job schedules to spread CU load across the day to prevent accounts from freezing. With 24-hour CU smoothing, scheduled jobs can all run simultaneously without causing any spikes at any time during the day, and you can enjoy consistently fast performance without wasting time managing job schedules.

## In-flight operations aren't throttled

When a capacity enters a throttled state, it only affects operations that are requested after the capacity has begun throttling. All operations, including long-running ones that were submitted before throttling began, are allowed to run to completion. This behavior gives you the assurance that operations are completed, even during surges in CU usage.

## Throttle triggers and throttle stages

After smoothing, some accounts might still experience spikes in CU usage during peak reporting times. To help manage those spikes, admins can set up email alerts to be notified when a capacity consumes 100% of its provisioned CU resources. This pattern is an indication that the capacity might benefit from load balancing, and the admin should consider increasing the SKU size. It’s important to note that for F SKUs, you can manually increase and decrease them at any time in the admin settings. However, even when a capacity is operating at its full CU potential, Fabric doesn't apply throttling. This behavior ensures users have consistently fast performance without experiencing any disruptions.

The first phase of throttling begins when a capacity has consumed all its available CU resources for the next 10 minutes. For example, if you purchased 10 units of capacity and then consumed 50 units per minute, you would create a carryforward of 40 units per minute. After two and a half minutes, you would have accumulated a carryforward of 100 units, borrowed from future windows. At this point where all capacity is already exhausted for the next 10 minutes, Fabric initiates its first level of throttling, and all new interactive operations are delayed by 20 seconds upon submission. If the carryforward reaches a full hour, interactive requests are rejected, but scheduled background operations continue to run. If the capacity accumulates a full 24 hours of carryforward, the entire capacity is frozen until the carryforward is paid off.

## Future smoothed consumption

>[!NOTE]
>Microsoft tries to improve customer flexibility in using the service, while balancing the need to manage customer capacity usage. For this reason, Microsoft might change or update the Fabric throttling policy.

| Usage  | Policy Limits	 | Platform Policy	Experience Impact | 
| --- | --- | --- | 
| Usage <= 10 minutes	 | Overage protection	 | Jobs can consume 10 minutes of future capacity use without throttling. | 
| 10 minutes < Usage <= 60 minutes	 | Interactive Delay	 | User-requested interactive jobs are delayed 20 seconds at submission. | 
| 60 minutes < Usage <= 24 hours	 | Interactive Rejection	 | User-requested interactive jobs are rejected. | 
| Usage > 24 hours	 | Background Rejection	 | All requests are rejected. | 

## Carryforward capacity usage reduction

Anytime a capacity has idle capacity, the system pays down the carryforward levels.

If you have 100 CU minutes and a carryforward of 200 CU minutes, and you don’t have any operations running, it takes two minutes for you to pay off your carryforward. In this example, the system isn't throttled, as there are two minutes of carryforward. Throttling delays won’t begin until 10 minutes of carryforward have accumulated.

If you need to pay down your carryforward faster, you can increase your SKU size temporarily to generate more idle capacity that is applied to your carryforward.

## Throttling behavior is specific to Fabric

While most Fabric products follow the previously mentioned throttling rules, there are some exceptions.

For example, Fabric event streams have many operations that can run for years once they're started. Throttling new event stream operations wouldn’t make sense, so instead, the amount of CU resources allocated to keeping the stream open is reduced until the capacity is in good standing again.

Another exception is Real-Time Intelligence, which wouldn’t be real-time if operations were delayed by 20 seconds. As a result, Real-Time Intelligence ignores the first stage of throttling with 20-second delays at 10 minutes of carryforward and waits until the rejection phase at 60 minutes of carryforward to begin throttling. This behavior ensures users can continue to enjoy real-time performance even during periods of high demand.

Similarly, almost all operations in the **Warehouse** category are reported as *background* to take advantage of 24-hour smoothing of activity to allow for the most flexible usage patterns. Classifying all data warehousing as *background* prevents peaks of CU utilization from triggering throttling too quickly. Some requests might trigger a string of operations that are throttled differently. This can make a background operation become subject to throttling as an interactive operation.

## Interactive and background classifications for throttling and smoothing

Microsoft Fabric divides operations into two types, *interactive* and *background*. You can find descriptions of these and the distinctions between them in [Fabric operations](fabric-operations.md).

Some admins might notice that operations are sometimes classified as interactive and smoothed as background, or vice versa. This distinction happens because Fabric’s throttling systems must apply throttling rules before a request begins to run. Smoothing occurs after the job has started running and CU consumption can be measured.

Throttling systems attempt to accurately categorize operations upon submission, but sometimes an operation’s classification might change after throttling has been applied. When the operation begins to run, more detailed information about the request becomes available. In ambiguous scenarios, throttling systems try to err on the side of classifying operations as background, which is in the user’s best interest.

## Track overages and rejected operations

You can see if your capacity is overloading by reviewing the [Utilization chart](metrics-app-compute-page.md#utilization) in the [Microsoft Fabric Capacity Metrics app](metrics-app.md). A spike that goes over the line indicates an overload. To further investigate the overload, drill through to the timepoint page. You can then review both your interactive and background operations, and see which ones were responsible for overloading your capacity. You can also determine when the overloading events took place.

Since utilization exceeding 100% doesn't automatically mean throttling, you need to use the [Throttling chart](metrics-app-compute-page.md#throttling) when evaluating overages. From there you can open a table that shows minutes to burndown, a chart with add, burndown, and cumulative percent, and more.

:::image type="content" source="media/fabric-drill-through.gif" alt-text="Animation that shows the drill-through option for a selected time point." lightbox="media/fabric-drill-through.gif":::

To view a visual history of any overutilization of capacity, including carryforward, cumulative, and burndown of utilization data, go to the [Overages tab](metrics-app-compute-page.md#overages). You can change the overages visual scale to display 10 minutes, 60 minutes, and 24 hours. Carryforward only takes into account billable operations.

:::image type="content" source="media/fabric-cross-filter-overages.gif" alt-text="Animation that shows overage over time." lightbox="media/fabric-cross-filter-overages.gif":::

The Microsoft Fabric Capacity Metrics app drilldown allows admins to see operations that were rejected during a throttling event. There's limited information about these operations as they were never allowed to start. The admin can see the product, user, operation ID, and time the request was submitted. When a request is rejected, end users receive an error message that asks them to try again later.

## Actions you can take to recover from overload situations

Strategies you can use to recover from a throttling situation:

* wait until the overload state is over before issuing new requests.
* upgrade the SKU of an F capacity.
* pause/resume an F capacity.
* [autoscale](/power-bi/enterprise/service-premium-auto-scale) a P capacity.
* move lower priority or overconsuming workspaces out of the capacity.

## Related content

* [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md) to monitor Fabric capacities.
