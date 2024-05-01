---
title: Understand your Fabric capacity throttling
description: Learn why and how capacities are throttled in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 12/03/2023
---

# The Fabric throttling policy

Throttling occurs when a tenant’s capacity consumes more capacity resources than it has purchased. Too much throttling can result in a degraded end-user experience. A Fabric tenant can create multiple capacities and assign workspaces to a specific capacity for billing and sizing. 

Throttling is applied at the capacity level, meaning that while one capacity, or set of workspaces, may be experiencing reduced performance due to being overloaded, other capacities may continue running normally. In cases where features such as OneLake artifacts are produced in one capacity and consumed by another, the throttling state of the consuming capacity determines whether calls to the artifact are throttled.

## Balance between performance and reliability

Fabric is designed to deliver lightning-fast performance to its customers by allowing operations to access more CU (Capacity Units) resources than are allocated to the capacity. Tasks that might take several minutes to complete on other platforms can be finished in mere seconds on Fabric. To avoid penalizing users when operational loads surge, Fabric smooths or averages the CU usage of an operation over a minimum of 5 minutes, and even longer for high CU but short runtime requests. This behavior ensures you can enjoy consistently fast performance without experiencing throttling.

For background operations that have long runtimes and consume heavy CU loads, Fabric smooths their CU usage over a 24-hour period. Smoothing eliminates the need for data scientists and database administrators to spend time creating job schedules to spread CU load across the day to prevent accounts from freezing. With 24-hour CU smoothing, scheduled jobs can all run simultaneously without causing any spikes at any time during the day, and you can enjoy consistently fast performance without wasting time managing job schedules.

## In-flight operations aren't throttled

When a capacity enters a throttled state, it only affects operations that are requested after the capacity has begun throttling. All operations, including long-running ones that were submitted before throttling began, are allowed to run to completion. This behavior gives you the assurance that operations are completed, even during CU surges.

## Throttle triggers and throttle stages

After smoothing, some accounts may still experience spikes in CU usage during peak reporting times. To help manage those spikes, admins can set up email alerts to be notified when a capacity consumes 100% of its provisioned CU. This pattern is an indication that the capacity may benefit from load balancing, and the admin should consider increasing the SKU size. It’s important to note that for F SKUs, you can manually increase and decrease them at any time in the admin settings. However, even when a capacity is operating at its full CU potential, Fabric doesn't apply throttling. This ensures users have consistently fast performance without experiencing any disruptions.

The first phase of throttling begins when a capacity has consumed all its available CU resources for the next 10 minutes. For example, if you purchased 10 units of CU and then consumed 50 units per minute, you would create a carry forward of 40 units per minute. After two and a half minutes, you would have accumulated a carry forward of 100 units, borrowed from future windows. At this point where the capacity has already exhausted all capacity for the next 10 minutes, Fabric initiates its first level of throttling, and all new interactive operations are delayed by 20 seconds upon submission. If the carry forward reaches a full hour, interactive requests are rejected, but background scheduled operations continue to run. If the capacity accumulates a full 24 hours of carry forward, the entire capacity is frozen until the carry forward is paid off.

## Future smoothed consumption

>[!NOTE]
>Microsoft tries to improve customer's flexibility in using the service, while balancing the need to manage customer's capacity usage.  For this reason, Microsoft might change or update the Fabric throttling policy.

| Usage  | Policy Limits	 | Platform Policy	Experience Impact | 
| --- | --- | --- | 
| Usage <= 10 minutes	 | Overage protection	 | Jobs can consume 10 minutes of future capacity use without throttling. | 
| 10 minutes < Usage <= 60 minutes	 | Interactive Delay	 | User-requested interactive jobs are delayed 20 seconds at submission. | 
| 60 minutes < Usage <= 24 hours	 | Interactive Rejection	 | User-requested interactive jobs are rejected. | 
| Usage > 24 hours	 | Background Rejection	 | All requests are rejected. | 

## Carry forward capacity usage reduction

Anytime a capacity has idle capacity, the system pays down the carry forward levels. 

If you have 100 CU minutes and a carry forward of 200 CU minutes, and you don’t have any operations running, it takes two minutes for you to pay off your carry forward. In this example, the system isn't throttled, as there are 2 minutes of carry forward. Throttling delays won’t begin until it's at 10 minutes of carry forward. 

If you need to pay down your carry forward faster, you can increase your SKU size temporarily to generate more idle capacity that is applied to your carry forward. 

## Throttling behavior is specific to Fabric

While most Fabric products follow the previously mentioned throttling rules, there are some exceptions. 

For example, Fabric Eventstreams have many operations that can run for years once they're started. Throttling new eventstream operations wouldn’t make sense, so instead, the amount of CU allocated to keeping the stream open is reduced until the capacity is in good standing again. 

Another exception is Real-Time Analytics, which wouldn’t be real-time if operations were delayed by 20 seconds. As a result, Real-Time Analytics ignores the first stage of throttling with 20-second delays at 10 minutes of carry forward and waits until the rejection phase at 60 minutes of carry forward to begin throttling. This behavior ensures users can continue to enjoy real-time performance even during periods of high demand.

Similarly, almost all operations in the **Warehouse** category are reported as *background* to take advantage of 24-hour smoothing of activity to allow for the most flexible usage patterns. Classifying all data warehousing as *background* prevents peaks of CU utilization from triggering throttling too quickly. Some requests may trigger a string of operations that are throttled differently. This can make a background operation become subject to throttling as an interactive operation. 
## Interactive and background classifications for throttling and smoothing

Some admins may notice that operations are sometimes classified as interactive and smoothed as background, or vice versa. This distinction happens because Fabric’s throttling systems must apply throttling rules before a request begins to run. Smoothing occurs after the job has started running and CU consumption can be measured. 

Throttling systems attempt to accurately categorize operations upon submission, but sometimes an operation’s classification may change after throttling has been applied. When the operation begins to run, more detailed information about the request becomes available. In ambiguous scenarios, throttling systems try to err on the side of classifying operations as background, which is in the user’s best interest. 

## Track rejected operations

The [Microsoft Fabric Capacity Metrics app](metrics-app.md) drilldown allows admins to see operations that were rejected during a throttling event. There's limited information about these operations as they were never allowed to start. The admin can see the product, user, operation ID, and time the request was submitted. End users receive an error message when a request is rejected that asks them to try again later. 

## Related content

- [Install the Microsoft Fabric capacity metrics app](metrics-app-install.md) to monitor Fabric capacities. 
