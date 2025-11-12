---
title: Schedule a Materialized Lake View Run
description: Learn how to schedule a materialized lake view run
ms.topic: how-to
author: eric-urban
ms.author: eur
ms.reviewer: apsinhar
ms.date: 06/26/2025
# customer intent: As a data engineer, I want to schedule a materialized lake views run in Microsoft Fabric so that I can refresh the materialized lake views based on business requirements.
---

# Schedule a materialized lake view run

Scheduling the materialized lake view (MLV) run lets users set how often the MLV should be refreshed based on business needs and lineage execution timing.

## Determining the schedule

The schedule to run the MLV depends on various factors, such as:

* **Data update frequency:** The frequency with which the data is updated.
* **Query performance requirements:** Business requirement to refresh the data in defined frequent intervals.
* **System load:** Optimizing the time to run the lineage without overloading the system

## Implement the schedule

From the **Manage materialized lake views** page, select the **Schedule** option.

:::image type="content" source="./media/schedule-lineage-run/schedule-run.png" alt-text="Screenshot showing the schedule button in lineage view." border="true" lightbox="./media/schedule-lineage-run/schedule-run.png":::

The schedule UI opens and is visible to the user.

:::image type="content" source="./media/schedule-lineage-run/schedule-inputs.png" alt-text="Screenshot showing the schedule UI where user sends their inputs for scheduling." border="true" lightbox="./media/schedule-lineage-run/schedule-inputs.png":::

Turn **On** the **Schedule Refresh** option and select the following from the schedule UI:

* Repeat (By the minute/Hourly/Daily/Weekly/Monthly)
* Every (Frequency/Date/Time/Month)
* Start Date
* End Date and Time
* Time Zone

Select **Apply** to set the schedule for the particular MLV run.

> [!NOTE]
> * The scheduler reflects the user's local time.
> * A materialized lake view fails if it runs beyond 24 hours.
> * Materialized lake view runs use High Concurrency Sessions by default.

## Related articles

* [Microsoft Fabric materialized lake view tutorial](./tutorial.md)
* [Monitor Fabric materialized lake views](./monitor-materialized-lake-views.md)
