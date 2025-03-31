---
title: Schedule a DAG run
description: Learn how to schedule a DAG run
ms.topic: how-to
author: apurbasroy
ms.author: apsinhar
ms.reviewer: nijelsf
ms.date: 03/28/2025
---

# Schedule a DAG run

Scheduling the DAG runs is an option provided to the users to decide how frequently the MV’s need to be refreshed as per business requirements when and how the DAG should be executed to refresh the materialized view.

## Determining the Schedule

The schedule for running the DAG depends on various factors, such as:
* Data update frequency: How often does the source data change?
* Query performance requirements: How fresh does the data in the materialized view need to be?
*	System load: What is the optimal time to run the DAG without overloading the system?

## Implementing the Schedule

Click on the Schedule button on the Lakehouse in the DAG view

:::image type="content" source="./media/schedule-a-dag-run/schedule-run.png" alt-text="Screenshot showing the schedule button in DAG UI ." border="true" lightbox="./media/schedule-a-dag-run/schedule-run.png":::


The schedule UI opens and is visible to the user.

:::image type="content" source="./media/schedule-a-dag-run/schedule-inputs.png" alt-text="Screenshot showing the schedule UI where user sends their inputs for scheduling." border="true" lightbox="./media/schedule-a-dag-run/schedule-inputs.png":::


Click on the Schedule Refresh **On** button.
Select the following from the schedule UI:

*	Repeat (By the minute/Hourly/Daily/Weekly/Monthly)
*	Every(Frequency/Date/Time/Month)
*	Start Date
*	End Date and Time
*	Time Zone

**Click on Apply**
The schedule is set for the particular DAG.

> [!Note]
> The scheduler will reflect the users local time.

## Next Steps
 
[Microsoft Fabric materialized views tutorial](./tutorial.md)
 
