---
title: Understand capacity throttling and smoothing
description: Learn how Microsoft Fabric capacity throttling works, including bursting, smoothing, overage protection, and the throttling stages for overloaded capacities.
author: dknappettmsft
ms.author: daknappe
ms.topic: concept-article
ai-usage: ai-assisted
ms.date: 08/14/2026
---

# Understand the Fabric capacity throttling policy

Throttling occurs when operations consume more capacity unit (CU) seconds than the capacity SKU allows. [Capacity units](licenses.md#capacity) measure the compute power available for each SKU. Too much throttling can result in a degraded end-user experience. A Microsoft Fabric tenant can create multiple capacities and assign workspaces to a specific capacity for billing and sizing.

Fabric applies throttling at the capacity level. While one capacity, or set of workspaces, might experience reduced performance from being overloaded, other capacities might continue running normally. When one capacity produces features such as OneLake items and another capacity consumes them, the throttling state of the consuming capacity determines whether it throttles calls to the item.

## How Fabric balances performance and reliability

Fabric delivers fast performance to its customers. Tasks that might take several minutes to complete on other platforms can finish in mere seconds on Fabric. Large operations can run at any time of day without the need for careful scheduling because Fabric spreads the compute for those operations over a longer time period, without slowing down the operation. Fabric enables this behavior using built-in _bursting_ and _smoothing_. These features let capacities self-manage and self-heal when temporary spikes in usage would otherwise cause other systems to fail or slow down.

## Bursting: Use more compute than the capacity SKU provides

To ensure fast performance, Fabric uses _bursting_ to run operations as fast as possible. With bursting, operations can temporarily use more compute than the provisioned compute for the capacity SKU. Because of bursting, you get results without waiting. A smaller capacity can also use bursting to run larger operations that would normally require a more expensive capacity.

## Smoothing: Spread CU usage across future timepoints

To avoid penalizing you when operations benefit from bursting, Fabric _smooths_, or averages, the CU usage of an operation over a longer timeframe. This behavior ensures you can enjoy consistently fast performance without throttling.

Smoothing distributes consumed CU usage over future _timepoints_. Timepoints in Fabric are 30 seconds long. The next 24 hours contain 2,880 timepoints. Fabric automatically manages the amount of consumed CUs in each timepoint.

An operation's utilization type determines the number of timepoints that Fabric uses for smoothing. Learn about [Fabric operations](fabric-operations.md).
- Fabric smooths interactive operations over a minimum of five minutes, and up to 64 minutes depending on how much CU usage they consume.
- Fabric smooths background operations over a 24-hour period because they typically have long runtimes and large CU consumption.

Due to smoothing, only a portion of the CU usage for an operation applies to any individual timepoint, which reduces throttling overall. Smoothed CU usage accumulates as operations run. _Future capacity_, which is the CUs available in future timepoints, pays for smoothed usage because the capacity runs continuously.

Bursting and smoothing work together to make it easier for you to do your work. For example, you typically spend time scheduling jobs and spreading them out across the day. With smoothing, Fabric spreads the compute cost for background jobs over 24 hours. As a result, scheduled jobs can all run simultaneously without causing any spikes that would otherwise block jobs from starting. At the same time, you can enjoy consistently fast performance without waiting for slow jobs to complete or wasting time managing job schedules.

> [!NOTE]
> Fabric doesn't support bursting and smoothing when a capacity admin enables Autoscale Billing for Spark. In this scenario, Spark usage operates in a pay-as-you-go mode, and the concepts of bursting and smoothing don't apply.

## Throttle triggers and throttle stages

Even though capacities have built-in smoothing that reduces the impact of spikes in usage, it's still possible to _overload_ a capacity by running too many operations.

The capacity automatically throttles new operations when it's overloaded. Throttling happens in progressive steps to minimize the impact on important tasks like data refreshes.

Even when a capacity is operating above 100% utilization, Fabric doesn't immediately apply throttling. Instead, the capacity provides _overage protection_ that lets you consume 10 minutes of future capacity without throttling. This behavior offers limited built-in protection from surges, while providing users consistently fast performance without disruptions.

Throttling starts when a capacity uses up all its CU resources for the next 10 minutes. The first phase of throttling applies 20-second delays to new interactive operations. The second phase of throttling rejects new interactive operations when a capacity uses up all its CU resources for the next one hour. During this phase, background operations can start and run. The third phase of throttling rejects all new requests, interactive and background, when the capacity uses up all its available CU resources for the next 24 hours. The capacity continues to throttle requests until you pay off the consumed CUs.

> [!NOTE]
> Microsoft tries to improve customer flexibility in using the service, while balancing the need to manage customer capacity usage. For this reason, Microsoft might change or update the Fabric throttling policy.

The following table summarizes the throttling triggers and stages.

| Usage | Policy limit | Experience impact |
| --- | --- | --- |
| Usage <= 10 minutes | Overage protection | Jobs can consume 10 minutes of future capacity use without throttling. |
| 10 minutes < Usage <= 60 minutes | Interactive delay | Fabric delays user-requested interactive jobs by 20 seconds at submission. |
| 60 minutes < Usage <= 24 hours | Interactive rejection | Fabric rejects user-requested interactive jobs. |
| Usage > 24 hours | Background rejection | Fabric rejects all requests. |

## Example: How smoothing reduces throttling for a background operation

Here's an illustrative example of how smoothing works for one background operation that consumed 1 CU hour (its usage was equivalent to 1 CU for 1 hour).
Fabric smooths background operations over 24 hours. A background operation's contribution to any timepoint is the operation's CU hours divided by the SKU's CU hours over the smoothing period.
An F2 provides 2 CUs, or 48 CU hours per day (2 CUs multiplied by 24 hours). This job contributes 1 CU hour / 48 CU hours = ~2.1% to each timepoint. The impact on the 10-minute and 60-minute throttling limits is also ~2.1%.

Here's the detail supporting the example:

1 CU hour = 3,600 CU seconds (1 CU multiplied by 60 minutes per hour and 60 seconds per minute).

Each time point is 30 seconds long. In 24 hours, there are 2,880 timepoints (24 hours * 60 minutes * 2 timepoints per minute).

Because smoothing spreads the 3,600 CU seconds over 24 hours, the job contributes 3,600 CU seconds / 2,880 timepoints to each 30-second timepoint. So it contributes 1.25 CU seconds per timepoint.

The 10-minute throttling percentage is based on the total CUs available in the next 10 minutes of capacity uptime.

An F2 capacity provides 2 CUs. In each timepoint, an F2 has 2 CUs multiplied by 30 seconds = 60 CU seconds of compute.

The contribution of the background job to any individual timepoint is 1.25 CU seconds / 60 CU seconds = ~2.1% of an individual timepoint.

In 10 minutes, the F2 has 2 CUs multiplied by 600 seconds = 1,200 CU seconds of compute.

The portion of the background job that smoothing spreads into the next 10 minutes of capacity is 1.25 CU seconds multiplied by 20 timepoints = 25 CU seconds.

So, the 10-minute throttling percentage is 25 CU seconds / 1,200 CU seconds = ~2.1%.

Similarly, the 60-minute throttling percentage impact of the background job is also ~2.1%.

Even though the background operation consumed more CUs than is available in the next 10-minute time span (it consumed six times the amount), the F2 capacity isn't throttled because smoothing spreads the total CUs over 24 hours. Because of smoothing, only a small portion of the consumed CUs applies to any individual timepoint.

## Overages, carryforward, and burndown

When operations use more capacity than the SKU supports in a single timepoint, the system computes an _overage_. The system computes overages after smoothing. If overages exceed the allowed 10-minute throttling window, they become _carryforward_ CUs.

_Overage protection_ ensures the capacity doesn't throttle until the 10-minute throttling window is full. It reduces the frequency of interactive delays that temporary spikes in utilization cause.

Fabric applies the _carryforward_ CUs to each subsequent timepoint. If a timepoint isn't full, the unused CUs reduce the _carryforward_ CUs amount. This reduction is _burndown_.

Throttling enforcement continues until unused capacity pays off all carryforward CUs.

## Monitoring capacities for throttling

Capacity admins can [set up email alerts for capacity thresholds](../real-time-hub/tutorial-monitor-capacity-threshold.md) by using Capacity Overview Events. Admins can also use the capacity metrics app to review the throttling levels for their capacity.

## Right-sizing and optimizing a capacity

Consistently high throttling levels indicate the need to load balance across multiple capacities or increase the capacity's SKU size. For F SKUs, you can [scale the capacity](scale-capacity.md). Scaling between SKUs on opposite sides of the F256 and F512 boundary might result in a slower experience.

## How to tell that capacity throttling is occurring

When a capacity rejects requests, you see specific error codes and error text:
- Status code `CapacityLimitExceeded`
- Error message `Your organization's Fabric compute capacity has exceeded its limits. Try again later`.
- Error message `Cannot load model due to reaching capacity limits`

> [!NOTE]
> Slow performance is often due to the design of an item. Only sometimes is slow performance due to capacity throttling.

When a capacity is overloaded, a capacity admin can use the Fabric capacity metrics app to confirm throttling.
- The *System events* table on the *Compute* page shows the history of throttling events.
- The *Throttling* charts on the *Compute* page show when smoothed usage exceeds one of the throttling limits.

## How to stop throttling when it occurs

Capacities are self-healing, so you can always wait until the overload state is over before submitting new requests.

However, to stop throttling faster, you can use the following strategies.

When using F SKU capacities, to stop throttling:
- Temporarily increase the SKU. By increasing your SKU, you burndown carryforward faster because each timepoint has more idle capacity.
- [Pause and then resume your capacity](pause-resume.md). Pausing a capacity results in a billing event for the accumulated future capacity usage. When a capacity starts or resumes, it has zero future capacity usage so it can accept new operations right away. Pausing can make content assigned to the capacity unavailable, so first make sure the capacity isn't in use.
- Capacity overage billing can also stop throttling from occurring; however, it costs three times the normal capacity rate. For more information, see [Enable capacity overage](enable-capacity-overage.md).

When using P SKU capacities, to stop throttling:
- Enable [Autoscale](/power-bi/enterprise/service-premium-auto-scale) for the P capacity.

## In-flight operations aren't throttled

Throttling only affects operations requested after the capacity starts throttling. All operations, including long-running ones that you submitted before throttling began, can run to completion. This behavior assures you that operations complete, even during surges in CU usage.

## Compound throttling protection

In Fabric, one operation often triggers other items or workloads to complete. There are many examples, but a typical one is viewing a report. Each visual in the report runs a query against an underlying semantic model. The semantic model might also read data from OneLake to provide the query result. Each of these requests forms a chain.

When there's a chain of calls, there's a risk of _compound throttling_, which occurs when Fabric applies throttling more than once to the same request. Fabric has built-in compound throttling protection that reduces the likelihood of compound throttling. Workloads can opt in to this protection.

When workloads support compound throttling protection, Fabric throttles a request only once for each capacity that participates in the chain. The throttling decision occurs when the request starts and applies to all operations in the chain.

If a chain relies on more than one capacity, then each capacity enforces its throttling once for the first request it receives in the chain.

The following workload experiences support compound throttling:
- Semantic models that connect to other semantic models by using DirectQuery.
- DAX queries from paginated reports to semantic models.

## Throttling behavior is specific to Fabric workloads

While most Fabric products follow the previously mentioned throttling rules, some exceptions exist.

For example, Fabric eventstreams have many operations that can run for years after they start. Throttling new eventstream operations wouldn't make sense, so instead, Fabric reduces the amount of CU resources allocated to keeping the stream open until the capacity is in good standing again.

Another exception is Real-Time Intelligence, which wouldn't be real-time if it delayed operations by 20 seconds. As a result, Real-Time Intelligence doesn't apply the first stage of throttling with 20-second delays at 10 minutes of future capacity. Real-Time Intelligence waits until the rejection phase at 60 minutes of future capacity to begin throttling. This behavior ensures you can continue to enjoy real-time performance even during periods of high demand.

Similarly, Fabric reports almost all operations in the **Warehouse** category as *background* to take advantage of 24-hour smoothing of activity and allow for the most flexible usage patterns. Classifying all data warehousing as *background* prevents peaks of CU utilization from triggering throttling too quickly. Some requests might trigger a chain of operations that Fabric throttles differently. When an interactive operation starts a chain that includes a background operation, Fabric can throttle the background operation as an interactive operation.

## Interactive and background classifications for throttling and smoothing

You might notice that Fabric sometimes classifies operations as interactive and smooths them as background, or vice versa. This distinction happens because Fabric's throttling systems must apply throttling rules before a request begins to run.

The throttling system attempts to accurately categorize operations upon submission. Sometimes when an operation begins to run, more detailed information becomes available that changes the categorization. In ambiguous scenarios, the throttling system falls back to classifying operations as background, which is in your best interest.

## Track overages and rejected operations

To see whether your capacity is overloaded, review the [Utilization chart](metrics-app-compute-page.md#utilization) in the [Microsoft Fabric Capacity Metrics app](metrics-app.md). A spike that goes over the line indicates an overage. To further investigate the overage, drill through to the timepoint page. Then review both your interactive and background operations to see which ones caused the overages.

Because utilization exceeding 100% doesn't automatically mean throttling, use the [Throttling chart](metrics-app-compute-page.md#throttling) when you evaluate overages. From there, open a table that shows minutes to burndown, a chart with add, burndown, and cumulative percent, and more. Minutes to burndown estimates how long burndown would take if no more operations occur in the capacity.

:::image type="content" source="media/fabric-drill-through.gif" alt-text="Animation that shows the drill-through option for a selected time point." lightbox="media/fabric-drill-through.gif":::

To view a visual history of any overutilization of capacity, including carryforward, cumulative, and burndown of utilization data, go to the [Overages tab](metrics-app-compute-page.md#overages). Change the overages visual scale to show 10 minutes, 60 minutes, and 24 hours.

:::image type="content" source="media/fabric-cross-filter-overages.gif" alt-text="Animation that shows cross-filtering between the multi-metric ribbon chart and the CU percentage over time chart." lightbox="media/fabric-cross-filter-overages.gif":::

The Microsoft Fabric Capacity Metrics app drilldown shows operations that Fabric rejected during a throttling event. There's limited information about these operations because they never started. You can see the product, user, operation ID, and time of the request. When Fabric rejects a request, end users receive an error message that asks them to try again later.

## Billable and non-billable compute in throttling calculations
When you review capacity usage in the capacity metrics app, some operations are billable, and others are non-billable. Throttling calculations include only billable operations. Some preview capabilities can generate non-billable operations. Use non-billable operations to plan ahead so that you size your capacity correctly for when these preview features become billable.

## Related content

- [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md) to monitor Fabric capacities.
- [How to resize your capacity](scale-capacity.md).
- [Explore Fabric capacity overview events in Fabric Real-Time hub](../real-time-hub/explore-fabric-capacity-overview-events.md)
