---
title: "Schedule a Materialized Lake View Refresh"
description: Learn how to schedule a materialized lake view refresh
ms.topic: how-to
ms.reviewer: rkottackal
ms.date: 03/18/2026
ai-usage: ai-assisted
---

# Schedule a materialized lake view refresh

As source data changes, materialized lake views (MLVs) in your Lakehouse need regular refresh to keep downstream reports and dashboards current. Scheduling lets you control how often each view, or group of views, is refreshed. Each schedule runs independently.

## View schedules

To see all configured schedules for MLVs in a Lakehouse, open **Manage** in **Materialized lake views** and select **Schedules** from the toolbar. The **Schedules** pane opens beside the lineage view.

:::image type="content" source="media/schedule-lineage-run/schedule-pane.png" alt-text="Screenshot showing the schedule pane." border="true" lightbox="media/schedule-lineage-run/schedule-pane.png":::

## Plan schedule frequency

Before you create a schedule, consider what drives your refresh timing:

- **How often does source data change?** If bronze tables update hourly, refreshing gold views every 15 minutes usually increases compute cost without improving freshness.
- **When do end users need fresh data?** Align schedules with reporting SLAs and business needs, for example, before a morning dashboard review.
- **Are dependency graphs independent?** If your Lakehouse has separate dependency graphs, schedule them at different cadences to avoid waiting on unrelated views.
- **What is the current system load?** Choose a cadence that meets freshness goals without overloading the system.

## Create a schedule

1. Select **+ New schedule** in the **Schedules** pane.

1. Choose a refresh scope:

    - **Refresh all materialized lake views**: Refreshes every view in dependency order. Use this option when the whole lineage should run on the same cadence.
    - **Refresh selected materialized lake view(s)**: Refreshes only the views you select.

    Search and select views from the dropdown, and then check the left pane to verify included views. The lineage graph highlights selected views with a dashed border so you can confirm scope.

    :::image type="content" source="media/schedule-lineage-run/select-mlvs.png" alt-text="Screenshot showing the Create new schedule pane with selected MLVs." border="true" lightbox="media/schedule-lineage-run/select-mlvs.png":::
    
    > [!TIP]
    > You can select views at any level in the lineage.

1. Configure the schedule:

    - Set **Repeat** (minute, hourly, daily, weekly, or monthly).
    - Add one or more **Time** slots.
    - Set **Start date**, **End date**, and **Time zone**.

1. Select **Apply**.

1. Optional: select **Run** next to the schedule to trigger an immediate refresh.

    > [!NOTE]
    > A run fails if it exceeds 24 hours.
    > If a new refresh starts while another refresh is in progress, Fabric skips the later refresh. See [run history](./run-history.md) for details.

## Manage schedules

From the **Schedules** pane, search by name or filter by **Active**/**Inactive** to find a schedule.

- **Edit**: Select the pencil icon, update views, recurrence, or date range, and then select **Apply**.
- **Pause or resume**: Toggle the **On/Off** switch. Use this option during maintenance or while investigating issues.
- **Delete**: Select the trash can icon and confirm. This action permanently removes the schedule.

## Related content

- [Microsoft Fabric materialized lake view tutorial](./tutorial.md)
- [Monitor Fabric materialized lake views](./monitor-materialized-lake-views.md)
