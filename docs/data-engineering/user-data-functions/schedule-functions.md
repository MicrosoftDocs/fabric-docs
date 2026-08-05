---
title: Schedule a user data function
description: Learn how to configure a scheduled trigger for a user data function in Microsoft Fabric using the built-in job scheduler.
ms.reviewer: mksuni
ms.date: 07/07/2026
ms.topic: how-to
---

# Schedule a user data function

The job scheduler in Microsoft Fabric enables you to run user data functions (UDFs) on a recurring schedule without requiring a pipeline, notebook, or external orchestration service. You can configure schedules directly on a user data function, specify recurrence patterns, pass function parameters, and monitor executions from the Fabric monitoring experience.

## Prerequisites

Before creating a schedule, ensure that:

- You have a published user data function.
- You have Contributor or higher permissions on the workspace.
- The function is tested successfully by using manual invocation.
- You configure any required connections, secrets, or dependencies.

## Use cases

Schedule user data functions to automate recurring business and operational tasks. Common scenarios include:

- **Data quality validation** – Run checks on datasets before reporting or downstream processing.
- **Customer feedback processing** – Analyze new feedback, generate sentiment scores, and store results.
- **Business event generation** – Detect changes in operational data and publish business events for downstream applications.
- **Scheduled cleanup** – Archive old records, remove temporary files, or perform routine maintenance tasks.
- **Periodic data synchronization** – Sync data from external systems into Fabric on a recurring schedule.
- **Automated notifications** – Generate alerts or notifications based on business rules and thresholds.

## Open the scheduler

1. Open your Fabric workspace.
1. Open the user data function item.
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
   | Controller | Variable used to control execution from variable library |
   | Repeat | Defines the recurrence pattern |
   | Interval | Frequency interval |
   | Start date and time | When the schedule begins |
   | End date and time | When the schedule expires |
   | Time zone | Time zone for schedule execution |
   | Parameters | Input parameters passed to the function |

   Select how often the function should run and provide the scheduling details. The scheduler supports recurring executions such as every few minutes, hourly, daily, weekly, or monthly. For example, to run a function every 15 minutes, configure:

1. Provide parameter for **FunctionName**. This parameter **is required** to define the function that you're calling.

   | Parameter name |Type |Value|
   |----------|-------------|-------------|
   | FunctionName | String| name of the functions, for example `hello_fabric`.|

1. Add more parameters for the function inputs. For example, for `hello_fabric(name:str)`, add a parameter `name` of type string. 

   | Parameter name |Type |
   |----------|-------------|
   | name | String|
   > [!IMPORTANT]
   > Parameter names must exactly match the user data function signature. Parameter names are case-sensitive.
   
1. Save the schedule.
1. Add more schedules for other functions in your user data function item.

## Run a scheduled function manually

To test a scheduled function immediately, select **Run**. Fabric submits an execution without waiting for the next scheduled interval. Manual execution is useful for validating parameters, verifying connections, and testing function logic.

## Monitor scheduled executions

You can monitor user data function executions from the Fabric monitoring experience.

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

- Learn about user data functions.
- Learn about the job scheduler in Fabric.
- Monitor and troubleshoot Fabric workloads using the Monitor hub.
