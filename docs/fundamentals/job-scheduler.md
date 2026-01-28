---
title: Job Scheduler in Microsoft Fabric
description: Learn how to use the job scheduler in Microsoft Fabric to automate recurring jobs, manage multiple schedules, and integrate with CI/CD.
ms.reviewer: zhaya
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.date: 10/27/2025

#customer intent: As a Fabric user, I want to understand how to use the job scheduler to automate tasks and manage schedules for my items in Fabric.

---

# Job scheduler in Microsoft Fabric

Automate and streamline your data analytics workflows in Microsoft Fabric with the job scheduler. This article explains how to use the job scheduler to set up recurring jobs, manage multiple schedules, and integrate scheduling with your CI/CD processes. Learn how to keep your items up to date and ensure reliable task automation in your Fabric workspace.

## What is the job scheduler?

The job scheduler is a built-in tool that lets you schedule jobs to run automatically at specified times. Use it to trigger data refreshes, pipeline runs, or other supported tasks for items in your Fabric workspace.

### Access the job scheduler

To access the job scheduler:

1. Open your Fabric workspace and locate the item you want to schedule (for example, Notebook).
1. Select the item’s contextual menu.
1. Select **Schedule** from the menu to open the job scheduler interface. 

You can also access the scheduler from within an item's settings by selecting the **Schedule** label. 

## Set up your schedule

After you open the scheduler for an item:

1. Toggle the scheduler **On** to enable scheduling.
1. Use the configuration panel to set when and how often the job runs.
1. Save your schedule to activate it.

Choose how often you want the job to run, and specify the start and end times. The scheduler supports various recurrence types, including minute-based, hourly, daily, weekly, monthly, and specific dates or weekdays of a month.

| Recurrence type | Details and options |
| --- | --- |
| **Minute-based** | Every 1 to 720 minutes |
| **Hourly** | Every 1 to 72 hours |
| **Daily** | Up to 10 times per day |
| **Weekly** | On selected weekdays, up to 10 times per week |
| **Monthly** | Every 1 to 12 months |
| **Specific dates/weekdays of a month** | Select specific dates or weekdays in a month |

If your configuration doesn't match a valid time, the scheduler skips that run and waits for the next valid time.

To ensure your schedule is valid:

- Set a valid start and end time for your schedule.
- Make sure the end time is after the start time.
- The scheduler automatically handles special cases like daylight saving time and invalid dates (for example, February 30).

**Job throttling limits**

* The Scheduler limits each user to 50 job submissions and 50 Get Job requests per minute to maintain system stability. Requests beyond these limits are automatically rejected.

* Jobs can run for a maximum of 24 days. Any jobs exceeding this duration are automatically terminated.

> [!IMPORTANT]
> Schedules become expired if a user doesn't log in to Fabric for 90 consecutive days. For more information, see [Refresh tokens in the Microsoft identity platform](/entra/identity-platform/refresh-tokens).

## Manage multiple schedules

Create and manage multiple schedules for a single item. Use different schedules to run jobs at different times or with different settings.

1. On the **Schedule** screen, view, add, and edit multiple schedule configurations for each item.
1. Select the schedule you want to manage, or create a new one for different job types or timing needs.

:::image type="content" source="media/job-scheduler/job-scheduler-multiple.png" alt-text="Screenshot of multiple scheduler configurations for a single item in Microsoft Fabric.":::

## Automate schedules with CI/CD

The job scheduler supports CI/CD integration, so you can deploy and manage schedules as part of your development workflow.

| Workflow | Description|
| --- | --- |
| **Deployment pipelines** | Schedules are included when you deploy an item |
| **Git integration** | Schedules are stored in a `.schedules` file in your item definition |
| **Public API** | Manage schedules by using code |

When you deploy an item, its schedules are automatically included, so you don't need to recreate them manually. For step-by-step instructions, see [CI/CD workflow options in Fabric](../cicd/manage-deployment.md).

> [!IMPORTANT]
> All items that had a scheduler configured prior to CI/CD being enabled appear as "uncommitted" when running `git status`. Carefully review and confirm the changes that need to be committed to avoid unintended actions. Items without prior scheduler configuration aren't affected. We apologize for any inconvenience this may cause.

## Summary

The job scheduler in Microsoft Fabric lets you automate recurring jobs, manage multiple schedules for each item, and integrate scheduling into your CI/CD workflows. Use it to streamline your data analytics process, and make sure your jobs run reliably and efficiently. 

## Related content

- [CI/CD workflow options in Fabric](../cicd/manage-deployment.md)
