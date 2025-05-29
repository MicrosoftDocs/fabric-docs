---
title: Schedule a Materialized Lake Views run
description: Learn how to schedule a Materialized Lake Views run
ms.topic: how-to
author: apurbasroy
ms.author: apsinhar
ms.reviewer: nijelsf
ms.date: 05/29/2025
---

# Schedule a Materialized Lake Views run

Scheduling the Materialized Lake Views (MLV) run is an option provided to the users to decide how frequently the materialized lake views' need to be refreshed as per business requirements when and how the lineage should be executed to refresh the materialized lake views.

## Determining the Schedule

The schedule for running the MLV depends on various factors, such as:
* Data update frequency: The frequency of the data is updated.
* Query performance requirements: Business requirement to refresh the data in set frequent intervals.
*	System load: Optimizing the time to run the lineage without overloading the system

## Implementing the Schedule

Click on the Schedule button on the Manage Materialized lake views page.

:::image type="content" source="./media/schedule-lineage-run/schedule-run.png" alt-text="Screenshot showing the schedule button in lineage view." border="true" lightbox="./media/schedule-lineage-run/schedule-run.png":::


The schedule UI opens and is visible to the user.

:::image type="content" source="./media/schedule-lineage-run/schedule-inputs.png" alt-text="Screenshot showing the schedule UI where user sends their inputs for scheduling." border="true" lightbox="./media/schedule-lineage-run/schedule-inputs.png":::


Click on the Schedule Refresh **On** button.
Select the following from the schedule UI:

*	Repeat (By the minute/Hourly/Daily/Weekly/Monthly)
*	Every(Frequency/Date/Time/Month)
*	Start Date
*	End Date and Time
*	Time Zone

**Click on Apply**
The schedule is set for the particular MLV run.

> [!Note]
> The scheduler will reflect the users local time.

## Next step
 
* [Microsoft Fabric materialized lake view tutorial](./tutorial.md)
 
