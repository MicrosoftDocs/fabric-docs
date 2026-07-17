---
title: Schedule a User Data Function
description: Learn how to configure a scheduled trigger for a User Data Function in Microsoft Fabric using the built-in Job Scheduler.
ms.reviewer: mksuni
ms.date: 07/07/2026
ms.topic: how-to
---

# Schedule a User Data Function

Microsoft Fabric Job Scheduler enables you to run User Data Functions (UDFs) on a recurring schedule without requiring a pipeline, notebook, or external orchestration service. You can configure schedules directly on a User Data Function, specify recurrence patterns, pass function parameters, and monitor executions from the Fabric monitoring experience.

## Prerequisites

Before creating a schedule, ensure that:

- You have a published User Data Function.
- You have Contributor or higher permissions on the workspace.
- The function is tested successfully by using manual invocation.
- You configure any required connections, secrets, or dependencies.

## Use cases

Schedule User Data Functions to automate recurring business and operational tasks. Common scenarios include:

- **Data quality validation** – Run checks on datasets before reporting or downstream processing.
- **Customer feedback processing** – Analyze new feedback, generate sentiment scores, and store results.
- **Business event generation** – Detect changes in operational data and publish business events for downstream applications.
- **Scheduled cleanup** – Archive old records, remove temporary files, or perform routine maintenance tasks.
- **Periodic data synchronization** – Sync data from external systems into Fabric on a recurring schedule.
- **Automated notifications** – Generate alerts or notifications based on business rules and thresholds.

## Open the scheduler

1. Open your Fabric workspace.
1. Open the User Data Function item.
1. Select **Settings**.
1. Select **Schedule**.

The **Schedule** page enables you to:

- Create schedules
- Configure failure notifications
- View scheduled executions
- Edit or disable schedules
- Manually run scheduled jobs

## Create a schedule

1. On **Schedule**, select **Add schedule**.
1. Configure the schedule properties.

   The scheduler supports the following settings:

   | Setting | Description |
   |----------|-------------|
   | Controller | Variable used to control execution from Variable library |
   | Repeat | Defines the recurrence pattern |
   | Interval | Frequency interval |
   | Start date and time | When the schedule begins |
   | End date and time | When the schedule expires |
   | Time zone | Time zone for schedule execution |
   | Parameters | Input parameters passed to the function |

   Select how often the function should run and provide the scheduling details. The scheduler supports recurring executions such as every few minutes, hourly, daily, weekly, or monthly. For example, to run a function every 15 minutes, configure:

1. Provide parameters to function as input. The scheduler can pass parameter values directly to the User Data Function during execution.

   > [!IMPORTANT]
   > Parameter names must exactly match the User Data Function signature. Parameter names are case-sensitive.

1. Save the schedule.
1. Add more schedules for other functions in your User Data Function item.

## Run a scheduled function manually

To test a scheduled function immediately, select **Run**. Fabric submits an execution without waiting for the next scheduled interval. Manual execution is useful for validating parameters, verifying connections, and testing function logic.

## Monitor scheduled executions

You can monitor User Data Function executions from the Fabric monitoring experience.

1. Open **Monitor Hub**.
1. Select **Activities**.
1. Filter by **User data functions**.

Use the monitoring experience to troubleshoot failed executions and validate successful runs.

## Configure failure notifications

You can configure email notifications for failed scheduled runs.

1. Open the **Schedule** page.
1. In **Failure notifications**, enter one or more email addresses.
1. Save the configuration.

Fabric sends email notifications whenever a scheduled execution fails.

## Next steps

- Learn about User Data Functions.
- Learn about Job Scheduler in Microsoft Fabric.
- Monitor and troubleshoot Fabric workloads using the Monitor hub.
