---
title: Activator capacity consumption, usage reporting, and billing
description: 'Activator is part of Microsoft Fabric Real-Time Intelligence and billing is based on the consumption of various resources. This article reviews the types of consumption activities and impact on billing. '
ms.service: fabric
ms.topic: concept-article
ms.date: 11/12/2024
ms.subservice: rti-activator
---

# Understand Activator capacity consumption, usage reporting, and billing

Activator is part of Microsoft Fabric Real-Time Intelligence. Similar to other workloads in Fabric, Activator billing is based on the consumption of resources. Fabric uses Capacity Units (CU) to measure and bill for resource usage. You can review and track your Activator capacity usage with the [Capacity Metrics App](/fabric/enterprise/metrics-app-compute-page).

Your [Azure subscription bill](/fabric/enterprise/azure-billing) is calculated from your accumulated usage and is reported in the global Real-Time Intelligence capacity consumption metrics. Usage is broken down to the dedicated operations emitted and reported by each Fabric workload and component.

- __Rule uptime per hour__ is a flat base charge. As long as a rule is active in your Fabric capacity, it incurs an hourly uptime consumption charge.

- __Event ingestion__ is accrued when an activator processes incoming real time event data.

- __Event computations__ is the cost of evaluating an incoming event’s data to see whether the defined condition is met. This cost is calculated based on the compute resources the activator consumes in order to evaluate the rule. If the condition is met, the specified rule is activated.

- __Storage:__ is the cost of retaining Fabric items and events. All events are retained for 30 days and are stored within Fabric, incurring corresponding Fabric storage costs. 

## Usage categories

Activator capacity consumption is broken into two categories: interactive and background. *Interactive* usage consumes resources when the user is actively working within the Fabric UI. *Background* usage consumes processing resources once a rule starts.

Use the [Capacity Metrics App](/fabric/enterprise/metrics-app-compute-page) to observe types of operations, their duration, and the percentage of the capacity consumed.

:::image type="content" source="media/activator-capacity-usage/activator-capacity-utilization.png" alt-text="Screenshot showing the capacity utilization of Activator in the Capacity Metrics app.":::

The consumed CU(s) are aggregated per activator based on its operations.

:::image type="content" source="media/activator-capacity-usage/activator-capacity-meters.png" alt-text="Screenshot showing consumption activity by activator and operation.":::

### Background consumption

Activator background capacity consumption is calculated based on the following operations. 

| Azure metric name                               | Fabric operation name | Unit of measure | Fabric consumption rate CU(hr) |
| ----------------------------------------------- | --------------------- | --------------- | ------------------------------ |
| Real-Time Intelligence event listener and alert | rule uptime per hour  | per hour        | 0.02222                        |
| Real-Time Intelligence event operationS         | event ingestion       | per event       | 0.000011111                    |
| Activator event analytics                  | event computations    | per computation | 0.00000278                     |
| n/a                                             | storage               | per GB per hour | 0.00177                        |

### Interactive consumption

Interactive capacity consumption activities are charged at a fraction of the background operation cost. Interactive capacity consumption includes exploring the data, reviewing events, viewing visualized activations, and performing other data related activities to define rules for the Activator. 

## Pause and resume activity in your capacity

Microsoft Fabric allows administrators to pause and resume their capacities. When your capacity isn't operational, you can pause it to enable cost savings for your organization. Later, when you want to resume work, reactivate your capacity.

- [Monitor a paused capacity in Microsoft Fabric](/fabric/enterprise/monitor-paused-capacity)

- [Pause and resume your capacity in Microsoft Fabric](/fabric/enterprise/pause-resume)

## High consumption 

If you are the Capacity administrator, here are some additional actions that you can take to reduce capacity consumption and reduce expense. 

- High volume event ingestion can cause significant resource consumption. To reduce costs, review the number of events streamed to the Activator items. Sometimes the frequency or the volume of events can be reduced without impacting the business outcomes.
- Event computations can be straightforward, such as evaluating each incoming event and responding accordingly. Real-Time Intelligence Activator also supports complex and computationally intensive scenarios. For example, it can look back on previous events to assess state changes or perform calculations based on data from multiple events. These state-based event computations are more resource-intensive and thus are more expensive. Assess the business justification for complex events and remove unnecessary events.

- Active rules incur costs even if there is no data ingested into them. Ensure that there are no stale or redundant rules active in the system.
- To save computational costs, stop or remove your test rules. Note that pausing or stopping a rule doesn't stop the event listener. The event listener continues to run and incur capacity consumption (rule uptime per hour) until the rule is removed.

## Considerations and limitations

__Changes to Microsoft Fabric workload consumption rate__

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in Microsoft’s Release Notes or in the Microsoft Fabric blog. If any change to a Microsoft Fabric workload consumption rate materially increases the Capacity Units (CU) required to use a particular workload, you can use the cancellation options available for the chosen payment method.

## Related content
- [Activator tutorial](activator-get-data-power-bi.md)
- [Consumption in Real-Time Intelligence](../real-time-intelligence-consumption.md)
