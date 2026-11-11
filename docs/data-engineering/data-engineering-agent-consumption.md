---
title: Fabric data engineering agent (Project Osmos) capacity consumption (preview)
description: Understand language model and Spark consumption for Fabric data engineering agent (Project Osmos), monitor usage, and plan for shared capacity.
author: vsarad
ms.author: vijaykris
ms.date: 10/23/2026
ms.topic: concept-article
ms.service: fabric
ms.subservice: data-engineering
ai-usage: ai-generated
#customer intent: As a Fabric capacity administrator, I want to understand Fabric data engineering agent consumption rates so that I can monitor the capacity used by autonomous data engineering tasks.
---

# Fabric data engineering agent (Project Osmos) capacity consumption - preview

[Fabric data engineering agent (Project Osmos)](data-engineering-agent-overview.md) uses language models to plan and refine work, and Spark compute to execute code, test implementation options, and validate results. To understand a task's compute consumption, review both components rather than language model tokens alone.

> [!IMPORTANT]
> The data engineering agent (Project Osmos) is in preview. Preview features are released with limited capabilities and are subject to separate [supplemental preview terms](https://go.microsoft.com/fwlink/?linkid=2240967). They're not intended for production use, aren't subject to service-level agreements, and might be available only in selected regions. For more information, see [Microsoft Fabric preview information](/fabric/fundamentals/preview).

## Understand task consumption

The following components use different consumption and billing rules:

| Component | What consumes resources | Where to find guidance |
| --- | --- | --- |
| Language models | Input, cached input when reported separately, and output tokens used for planning, reasoning, and code generation. | Refer to [Copilot consumption and billing guidance](../fundamentals/copilot-fabric-consumption.md). Language model usage appears under the **Project Osmos** operation and the **Copilot and AI** Azure billing meter. |
| Spark compute | Code execution, implementation experiments, data processing, and validation runs. | Review [Apache Spark billing and utilization](billing-capacity-management-for-spark.md). Spark usage is reported separately from the **Project Osmos** language model operation. |

Task complexity affects both components. More implementation attempts or validation runs can increase token usage and Spark execution. The amount of context processed affects token usage, while data volume and transformations such as joins and aggregations affect Spark work. Tasks with similar prompts can therefore consume different amounts of compute.

Other Fabric operations that a task uses have their own consumption rules. For more information, see [Fabric operations](../enterprise/fabric-operations.md).

## Monitor usage

Use the [Fabric Capacity Metrics app](../enterprise/metrics-app.md) to inspect language model and Spark usage. If you don't have access to the app, ask your capacity administrator to review the usage with you.

In the app's default report:

1. Open the **Compute** page and use **Capacity Name** to select the capacity assigned to the task's workspace.
1. Select the period that includes the task run in the multimetric ribbon chart.
1. Filter the item kind to **Lakehouse**. In the matrix by item and operation, locate the task's workspace and lakehouse.
1. Hover over a value in that lakehouse's row to see the operation breakdown. Find **Project Osmos** for language model consumption. This **Background** operation uses the **Copilot and AI** Azure billing meter.
1. Review the lakehouse's Spark usage separately. If you also run generated notebooks, review their **Notebook** items and Spark operations. Don't interpret the **Project Osmos** operation as the total compute consumption of the task.

For illustrated guidance on the report and operation breakdown, see [Compute page in the Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md) and [Monitor Apache Spark capacity consumption](monitor-spark-capacity-consumption.md). If you use the redesigned preview report, see [Compute page in the Capacity Metrics app preview](../enterprise/metrics-app-preview-compute-page.md).

> [!NOTE]
> Lakehouse totals can include activity from other tasks and users. Don't attribute all Spark usage for a shared lakehouse to one task. Usage also takes time to appear in the app; for refresh behavior, see [Data latency](../enterprise/metrics-app.md#data-latency).

## Consumption rates

Language model usage is converted into Fabric capacity units (CUs). For published Copilot consumption rates and billing guidance, see [Consumption rates and billing for Copilot in Fabric](../fundamentals/copilot-fabric-consumption.md).

Account for Spark usage separately under the applicable [Spark billing model](billing-capacity-management-for-spark.md). A token count alone doesn't determine the total cost of a task.

For capacity planning guidance, see [Plan for shared-capacity usage](data-engineering-agent-best-practices.md#plan-for-shared-capacity-usage).

## Related content

- [Fabric data engineering agent (Project Osmos) overview](data-engineering-agent-overview.md)
- [Get started with data engineering agent (Project Osmos)](data-engineering-agent-get-started.md)
- [Best practices for data engineering agent (Project Osmos)](data-engineering-agent-best-practices.md)
- [Apache Spark billing and utilization](billing-capacity-management-for-spark.md)
- [Fabric operations](../enterprise/fabric-operations.md)
