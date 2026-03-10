---
title: Schedule a Materialized Lake View Run
description: Learn how to schedule a materialized lake view refresh run in Microsoft Fabric, including frequency options and configuration steps.
ms.topic: how-to
ms.reviewer: apsinhar
ms.date: 03/01/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to schedule a materialized lake views run in Microsoft Fabric so that I can refresh the materialized lake views based on business requirements.
---

# Schedule a materialized lake view run

Scheduling a materialized lake view (MLV) run lets you control refresh cadence based on business needs and lineage timing.

## Choose a schedule

Choose the materialized lake view refresh schedule based on these factors:

- **Data update frequency**: How often source data changes.
- **Query performance requirements**: How often downstream processes require refreshed data.
- **System load**: How often lineage can run without overloading compute.

Also keep these constraints in mind:

- The scheduler reflects your local time.
- An MLV run fails if it runs longer than 24 hours.
- MLV runs use High Concurrency sessions by default.

## Create a schedule

To create a schedule for a materialized lake view refresh run in Fabric:

1. From the **Manage materialized lake views** page, select **Schedule**.

    :::image type="content" source="./media/schedule-lineage-run/schedule-run.png" alt-text="Screenshot showing the schedule button in lineage view." border="true" lightbox="./media/schedule-lineage-run/schedule-run.png":::

1. In the schedule pane, for **Schedule refresh**, select the **On** radio button (instead of **Off**).

1. Configure these settings:

	- **Repeat** (By the minute, Hourly, Daily, Weekly, or Monthly).
	- **Every** (frequency, date, time, or month values).
	- **Start date**.
	- **End date and time**.
	- **Time zone**.

1. Select **Apply**.

    :::image type="content" source="./media/schedule-lineage-run/schedule-inputs.png" alt-text="Screenshot showing the schedule pane where you can schedule lineage runs." border="true" lightbox="./media/schedule-lineage-run/schedule-inputs.png":::

Fabric applies the schedule to the selected MLV run.

## Related content

- [Microsoft Fabric materialized lake view tutorial](./tutorial.md)
- [Monitor Fabric materialized lake views](./monitor-materialized-lake-views.md)
