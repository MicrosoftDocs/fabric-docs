---
title: Digital twin builder (preview) flow
description: Understand how digital twin builder (preview) flow items work.
author: baanders
ms.author: baanders
ms.date: 06/17/2025
ms.topic: concept-article
---

# Digital twin builder (preview) flow

*Digital twin builder flows* are created to execute mapping and contextualization (relationship) operations in digital twin builder (preview). Digital twin builder items automatically create digital twin builder flows to facilitate the execution of these operations.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Digital twin builder flows can run either on-demand or on a defined schedule. For instance, if you schedule a mapping job, a corresponding digital twin builder flow is automatically created and executed based on that schedule, to help facilitate execution of the mapping operation. Digital twin builder relies on these digital twin builder flows to perform mapping and contextualization operations.

## Flows as child items

In [Microsoft Fabric terminology](../../fundamentals/fabric-terminology.md), an *item* is a set of capabilities within a specific experience.

Some Fabric items have child items associated with them, and the parent-child relationship is visible from the Fabric workspace. For more information about items in the Fabric workspace, see [Workspaces in Microsoft Fabric and Power BI](../../fundamentals/workspaces.md).

*Digital Twin Builder Flow (preview)* items appear in the Fabric workspace as children of the *Digital Twin Builder (preview)* item.

## On-demand digital twin builder flow

An *on-demand* digital twin builder flow is created by default when the digital twin builder item is created. It's visible as a child item under the digital twin builder item in the workspace (shown in the following image). Digital twin builder assigns a name to this digital twin builder flow by combining the digital twin builder item name with the suffix *OnDemand*.

:::image type="content" source="media/concept-flows/fabric-on-demand.png" alt-text="Screenshot of an on-demand item in a Microsoft Fabric workspace.":::

The on-demand digital twin builder flow is used to perform operations such as [mapping](concept-mapping.md) and [contextualization](model-perform-contextualization.md) execution on demand. The same on-demand digital twin builder flow can execute multiple on-demand operations in parallel.

To run operations on demand, go to the **Scheduling** tab for an entity type and select the **Run** button.

:::image type="content" source="media/concept-flows/run-now.png" alt-text="Screenshot of the Run button.":::

## Scheduled digital twin builder flow

A *scheduled* digital twin builder flow is created when a new schedule is set up for a mapping or contextualization operation. After the schedule is configured, the corresponding digital twin builder flow appears as a child item under the digital twin builder item in the workspace. A digital twin builder item relies on this scheduled digital twin builder flow to execute the specified mapping or contextualization operations according to the defined schedule.

To create a schedule, go to the **Scheduling** tab for an entity type and run on **Schedule flow**. Open the dropdown list of options under **Select digital twin builder flow** and select **Create flow**.

:::image type="content" source="media/concept-flows/create-flow.png" alt-text="Screenshot of the Create flow option.":::
 
Assign a name to the schedule. The digital twin builder flow shares the same name as the schedule.

When the schedule is created, use the **Update the schedule** button to configure a regular interval for your schedule to run. When you're finished configuring the schedule details, select **Apply**.

:::image type="content" source="media/concept-flows/update-schedule.png" alt-text="Screenshot of updating the schedule.":::

After the schedule is created, a digital twin builder flow item appears as a child item under the digital twin builder item in your Fabric workspace.

:::image type="content" source="media/concept-flows/fabric-scheduled.png" alt-text="Screenshot of the flow child in a Microsoft Fabric workspace.":::

>[!IMPORTANT]
>Schedules get disabled if their associated operations fail multiple times. To avoid widespread impact in these cases, create distinct schedules to isolate operations and reduce failure effects.

## Viewing flow details

If you want to view all the scheduled and nonscheduled operations in your digital twin builder (preview) item, select **Manage operations**.

:::image type="content" source="media/concept-flows/manage-operations.png" alt-text="Screenshot of the Manage operations button.":::

This page shows a list of your digital twin builder flows with the option to select more **Details** for each.

:::image type="content" source="media/concept-flows/manage-operations-tab.png" alt-text="Screenshot of the flows listed on the Manage operations tab.":::

In the **Operation details**, there are two tabs: **Runs**, which shows a summary of the last 10 runs, and **Last run details**, which shows details of the most recent run.

:::image type="content" source="media/concept-flows/operation-details.png" alt-text="Screenshot of the Operation details pane.":::

You can troubleshoot digital twin builder (preview) flows using the *monitoring* experience. For more information, see [Digital twin builder (preview) troubleshooting - Get logs using Monitor hub](resources-troubleshooting.md#get-logs-using-monitor-hub).

## Limits and considerations

### Separate operations into different flows

When creating digital twin builder (preview) flows, it's important to consider the number of operations you associate with a single flow. Digital twin builder (preview) flows are designed to execute multiple operations in parallel, but this design can lead to complications if too many operations are tied to a single flow.

We recommend that you create multiple distinct schedules for different operations, and avoid having a large number of operations tied to a single digital twin builder flow. This approach helps reduce the impact of potential failures by ensuring that if one operation in the flow fails, it doesn't affect all the other operations.

There are two reasons for this recommendation:

* **A failed operation cancels downstream operations in the flow.** If there are multiple operation types associated with a digital twin builder (preview) flow, the flow executes operations in a fixed order: mappings first, then contextualization operations. If one of these operations fails, all downstream operations queued for execution are canceled. For example, say we have a flow with two mapping operations and two contextualization operations. If a mapping operation fails, then no contextualization operations in the flow are executed. To mitigate the effects of this, we recommend having separate schedules for mapping and contextualization, and avoiding having lots of operations tied to a single flow.
* **Repeated failures disable scheduled flows altogether.** If the operations associated with a scheduled flow fail multiple times, the flow is automatically disabled. The Fabric platform enforces this scheduling policy. Creating distinct schedules for different operations helps you isolate failures and prevent other operations from being disabled as a result.

### Can't use with autoscale billing

Digital twin builder flows don't work if [Autoscale Billing for Spark in Microsoft Fabric](../../data-engineering/autoscale-billing-for-spark-overview.md) is enabled.