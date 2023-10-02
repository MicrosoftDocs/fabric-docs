---
title: Understand your Fabric capacity throttling
description: Learn why and how capacities are throttled in Microsoft Fabric
author: KesemSharabi
ms.author: kesharab
ms.topic: concept-article
ms.custom: build-2023
ms.date: 10/02/2023
---

# The Fabric throttling policy

Throttling occurs when a tenant’s capacity consumes more capacity resources than it has purchased. This results in a degraded end-user experience. A Fabric tenant can create multiple capacities and assign workspaces to a specific capacity for billing and sizing. 

Throttling is applied at the capacity level, meaning that while one capacity, or set of workspaces, may be experiencing reduced performance due to being overloaded, other capacities may continue running normally. In cases where features such as OneLake artifacts are produced in one capacity and consumed by another, the throttling state of the consuming capacity will determine whether calls to the artifact will be throttled.

## Balance between performance and reliability

Fabric is designed to deliver lightning-fast performance to its customers by allowing operations to access more CU (Capacity Units) resources than are allocated to the capacity. This means tasks that might take several minutes to complete on other platforms can be finished in mere seconds on Fabric. To avoid penalizing customers when operational loads surge to provide superior performance, Fabric smooths or averages the CU usage of an operation over a minimum of 5 minutes, and even longer for high CU but short runtime requests. This ensures customers can enjoy consistently fast performance without experiencing throttling.
For background operations that have long runtimes and consume heavy CU loads, Fabric smooths their CU usage over a 24-hour period. This eliminates the need for data scientists and database administrators to spend time creating job schedules to spread CU load across the day to prevent accounts from freezing. With 24-hour CU smoothing, scheduled jobs can all run simultaneously without causing any spikes at any time during the day, and users can enjoy consistently fast performance without wasting time managing job scheduling.

## In-flight operations are not throttled

When a capacity enters a throttled state, it only affects operations that are requested after the capacity has begun throttling. All operations, including long-running ones, that were submitted before throttling began are allowed to run to completion. This ensures customers can rely on their operations being completed, even during CU surges.

## Throttle triggers and throttle stages

After applying smoothing, some accounts may still experience spikes in CU usage during peak reporting times. To help manage this, admins can set up email alerts to be notified when a capacity consumes 100% of its provisioned CU. This is an indication that the capacity may benefit from load balancing, and the admin should consider increasing the SKU size. It’s important to note that for F SKUs, you can manually increase and decrease them at any time in the admin settings. However, even when a capacity is operating at its full CU potential, Fabric will not apply throttling. This ensures users enjoy consistently fast performance without experiencing any disruptions.

The first phase of throttling begins when a capacity has consumed all its available CU resources for the next 10 minutes. For example, if you purchased 10 units of CU and then consumed 50 units per minute, you would create a carry forward of 40 units per minute. After two and a half minutes, you would have accumulated a carry forward of 100 units, borrowed from future windows. At this point where the capacity has already exhausted all capacity for the next 10 minutes, Fabric initiates its first level of throttling, and all new interactive operations are delayed by 20 seconds upon submission. If the carry foward reaches a full hour, interactive requests will be rejected, but background scheduled operations will continue to run. If the capacity accumulates a full 24 hours of carry forward, the entire capacity will be frozen until the carry forward is paid off.

## Future smoothed consumption

| Usage  | Policy Limits	 | Platform Policy	Experience Impact | 
| -- | -- | -- | 
| <= 10 minutes	 | Overage protection	 | Jobs can consume 10 minutes of future capacity use without throttling | 
| 10 minutes < Usage <= 60 minutes	 | Interactive Delay	 | User-requested interactive jobs will be delayed 20 seconds at submission | 
| 60 minutes < Usage <= 24 hours	 | Interactive Rejection	 | User-requested interactive jobs will be rejected | 
| Usage > 24 hours	 | Background Rejection	 | All requests will be rejected | 

## Carry forward capacity usage reduction

Anytime a capacity has idle capacity it will pay down the carry forward carry forward levels. If you have 100 CU minutes and a carry forward of 200 CU minutes, it will take two minutes for you to pay off your carry forward if you don’t have any operations running. Note that in this example you would not be throttled as you are only at 2 minutes of carry forward and throttling delays won’t begin until you are at ten minutes of carry forward. If you need to pay down your carry forward faster you can increase your SKU size temporarily to generate more idle capacity that will be applied to your carry forward carry forward. 

## Throttling behavior is specific to Fabric

While most Fabric products follow the previously mentioned throttling rules, there are some exceptions. For example, eventstream has many operations that can run for years once they are started. Throttling new eventstream operations wouldn’t make sense, so instead, the amount of CU allocated to keeping the stream open is reduced until the capacity is in good standing again. Another exception is Real-Time Data, which wouldn’t be real-time if operations were delayed by 20 seconds. As a result, Real-Time Data ignores the first stage of throttling with 20-second delays at 10 minutes of carry forward and waits until the rejection phase at 60 minutes of carry forward to begin throttling. This ensures users can continue to enjoy real-time performance even during periods of high demand.

## Interactive and background classifications for Throttling and Smoothing

Some admins may notice that operations are sometimes classified as interactive and smoothed as background, or vice versa. This is because Fabric’s throttling systems must apply throttling rules before a request begins to run, while smoothing is applied after the job has started running and CU consumption can be measured. Throttling systems do their best to accurately categorize operations upon submission, but sometimes an operation’s classification may change after throttling has been applied, when the operation begins to run and more detailed information about the request is available. In ambiguous scenarios, throttling systems try to err on the side of classifying operations as background, which is in the user’s best interest. 

## Track rejected Operations

The metrics app drilldown will allow admins to see operations that were rejected during a throttling event. There will be limited information about these operations as they were never allowed to start, but the admin should see the product, user, operation ID, and time the request was submitted. End Users will receive an error message when a request is rejected that asks them to try again later. 
