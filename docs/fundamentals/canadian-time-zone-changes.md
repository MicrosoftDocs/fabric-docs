---
title: Canadian time zone changes for Fabric schedules
description: Learn which temporary time zones to use during the Canadian time zone transition and which new regional choices to select when they become available.
author: anoopachuta-docs
ms.author: anoopachuta
ms.topic: how-to
ms.date: 10/29/2026
ai-usage: ai-assisted

#customer intent: As a Fabric user, I want to adjust schedules affected by Canadian time zone changes so that jobs continue to run at the intended local time.
---

# Canadian time zone changes: guidance for Fabric schedules

Starting at 02:00 local time on November 1, 2026, affected regions in Canada remain on permanent daylight saving time instead of turning clocks back. If you have Fabric jobs scheduled to follow local time in these regions, review their time zone settings to keep jobs running at the intended local time.

Microsoft is working to make the new regional time zones available in Fabric as quickly as possible. This article will be updated when they are available. From November 1 until you update your schedules, affected schedules that retain their existing time zone settings might run at a different local time.

If you need to preserve local run times during this period, use the temporary choices in this article. Once the new regional choices are available in your Fabric scheduling experience, update your schedules to use them.

## Choose a time zone

| Affected area | Existing schedule time-zone choice | Temporary choice (until the new choice is available) | New regional choice (not yet available) |
| --- | --- | --- | --- |
| Most of British Columbia | (UTC-08:00) Pacific Time (US and Canada) | (UTC-07:00) Arizona | (UTC-07:00) Pacific Time (British Columbia) |
| Alberta and affected Alberta-aligned locations | (UTC-07:00) Mountain Time (US and Canada) | (UTC-06:00) Saskatchewan | (UTC-06:00) Mountain Time (Alberta) |
| Manitoba | (UTC-06:00) Central Time (US and Canada) | (UTC-05:00) Bogota, Lima, Quito | (UTC-05:00) Manitoba |

The existing-choice labels show standard UTC offsets. Before November 1, daylight saving time means their effective offsets match the temporary choices.

Alberta-aligned locations include affected Northwest Territories locations such as Yellowknife and Inuvik, and southeastern British Columbia locations that align with Alberta.

The temporary choices don't observe daylight saving time and match the required offsets. You can select a temporary choice before November 1 without shifting the intended local run time. Switch to the new regional choice once it becomes available in your scheduling experience. Until then, continue using the temporary choice. Keep the same local run time when changing the time zone.

## Preserve local run times during the transition

For schedules that support editing:

1. Identify schedules intended to follow local time in an affected area.
1. If a local run-time shift isn't acceptable, select the corresponding **Temporary choice** in the table before the November 1 transition. Keep the intended local run time.
1. Save your changes, verify the next scheduled run, and monitor the first run after the transition.

If you retain your existing time zone setting during the transition, account for the possible local run-time shift until you update the schedule.

Change the time zone in the Fabric schedule, not just in your device settings. Schedules intentionally following UTC don't need a time zone change. Confirm that their run times still meet your needs.

## Move to the new regional time zones

This article will be updated when the new regional choices are available. Until the corresponding choice is available in your Fabric scheduling experience, continue using the temporary choice to preserve local run times.

For schedules that support editing:

1. Select the corresponding **New regional choice** in the table, whether you used a temporary choice or retained your existing setting.
1. Keep the intended local run time and save your changes.
1. Reopen the schedule to confirm the setting, verify the next scheduled run, and monitor the first run after the update.

Using the new regional choice makes the schedule's intended location clear to anyone reviewing it later. If the new choice isn't available yet, continue using the temporary choice to preserve local run times.

## Related content

- [Job scheduler in Microsoft Fabric](job-scheduler.md).
- [Manage scheduled pipeline runs](../data-factory/pipeline-runs.md#manage-scheduled-runs).
- [Monitor hub in Microsoft Fabric](../admin/monitoring-hub.md).
