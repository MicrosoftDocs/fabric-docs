---
title: Operations Agent Capacity and Billing
description: Learn about the capacity and billing of operations agents in Real-Time Intelligence.
ms.reviewer: willthom, v-hzargari
ms.topic: how-to
ms.date: 12/10/2025
ms.search.form: Operations Agent Billing
---

# Operations agent capacity and billing

Operations agent in Microsoft Fabric Real-Time Intelligence helps you automate monitoring and response actions based on data changes. To use operations agents effectively, you need to understand their capacity and billing aspects. This article explains how Real-Time Intelligence measures, bills, and reports operations agent usage.

## Key concepts
- **Capacity Units (CUs):** All operations in Fabric consume CUs. In operations agents, the system aggregates one or more consumed CUs per agent based on its operations.
- **Preview Status:** Operations agents are currently in public preview. Billing for the 'Copilot in Fabric' meter starts December 12th, 2025 and billing for the other meters will start January 8th, 2026.

## How Real-Time Intelligence measures operations agent usage

### Dedicated operations

- **Copilot in Fabric** usage occurs when the LLM is utilized to directly configure or interact with the operations agent. This usage includes scenarios where you use AI-driven suggestions or automation to set up, modify, or manage the operations agent's rules and actions.

- **Operations agent compute** refers to the cost of the agent processing and monitoring data in the background. This cost includes the compute needed to evaluate rules and conditions, along with any extra costs from data sources providing the required data.

- **Operations agent autonomous reasoning** refers to the LLM processing that happens when a condition is met. The agent analyzes the data, generates recommendations, and sends messages to the user for approval.

- **Storage** refers to the cost associated with retaining Fabric items and events. Data monitored by the agent is stored within Fabric for 30 days, incurring the applicable Fabric storage charges.

### Usage categories

Operations agent consumes capacity based on the following factors:

- **Background usage:** All operations performed by the operations agent are classified as *background usage*, including direct interactions. This is because Fabric Copilot and AI operations are treated as background tasks, see more information in [Copilot Fabric Consumption](../fundamentals/copilot-fabric-consumption.md#capacity-utilization-type). These operations are throttled only if the capacity exceeds its resource limits for 24 hours, after which background tasks are rejected, halting the agent's processing. For details, see [Understand your Fabric capacity throttling](../enterprise/throttling.md#throttle-triggers-and-throttle-stages).

    | Azure Metric Name   | Fabric Operation Name                               | CU Rate |
    |------------------|--------------------------------------------------|----------------------|
    | Operations Agents Compute Capacity Usage CU  | Operations agent compute | 0.46 CUs per vCore hour |
    | Copilot and AI Capacity Usage CU | Copilot in Fabric | 100 CUs per 1,000 input tokens 400 CUs per 1,000 output tokens |
    | Operations Agents Autonomous Reasoning Capacity Usage CU  | Operations agent autonomous reasoning | 400 CUs per 1,000 input tokens 1600 CUs per 1,000 output tokens |
    | N/A | storage | per GB per hour |

- **Other CU consumption:** Operations agents can drive additional CU consumption from other Fabric items or products, such as the Eventhouse being monitored:
  - **Configuration phase:** Copilot in Fabric incurs usage while generating the agent's playbook. Eventhouse usage arises from queries to identify fields and rules to monitor. Storage costs apply for saving the agent's configuration.
  - **Active monitoring:** Once activated, the agent runs queries and tracks rules in the background, consuming the Operations agent compute meter. Eventhouse charges apply for periodic queries, and storage costs cover cached query results and configurations.
  - **Condition met:** When conditions are met, the agent uses its LLM for summarization and recommendations, consuming the Operations agent autonomous reasoning meter. Approved actions invoke Power Automate flows, which may incur separate licensing costs based on your [Power Automate plan](https://www.microsoft.com/power-platform/products/power-automate/pricing).

### Pause and resume activity in your capacity

Microsoft Fabric allows administrators to manage costs by pausing their capacities when they aren't in use. This feature helps organizations save on expenses during downtime. When work needs to resume, you can reactivate the capacity seamlessly.

- [Monitor a paused capacity in Microsoft Fabric](../enterprise/monitor-paused-capacity.md)
- [Pause and resume your capacity in Microsoft Fabric](../enterprise/pause-resume.md)

## Reporting and visibility

You can find detailed usage reports in the Microsoft Fabric Capacity Metrics app or through the Azure billing system. These reports provide insights into CU consumption by operations agents, helping you monitor and manage your usage effectively. See [Understand your Metrics app](../enterprise/metrics-app-compute-page.md) or [Understand your Azure bill](../enterprise/azure-billing.md) to learn more about accessing and interpreting these reports.

## Considerations and limitations

### Changes to Microsoft Fabric workload consumption rate 

Consumption rates can change at any time. Microsoft makes reasonable efforts to provide notice through email or in-product notification. Changes take effect on the date stated in Microsoft’s Release Notes or in the Microsoft Fabric blog. If a change to a Microsoft Fabric workload consumption rate significantly increases the Capacity Units (CU) required to use a particular workload, you can use the cancellation options available for the chosen payment method. 

## Related content

* [Operations agent overview](operations-agent.md)
* [Understand your Azure bill](../enterprise/azure-billing.md)
* [Understand your Metrics app](../enterprise/metrics-app-compute-page.md)
