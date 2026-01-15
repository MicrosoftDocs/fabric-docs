---
title: Deactivate an Activity
description: Steps to deactivate an activity to exclude it from pipeline run and validation.
ms.reviewer: whhender
ms.author: whhender
author: whhender
ms.topic: include
ms.date: 12/17/2025
---

There are two ways to deactivate an activity: [deactivate a single activity from its **General** tab](#deactivate-a-single-activity), or [deactivate multiple activities with right click](#deactivate-multiple-activities).

Save the changes to deactivate the activities during the next scheduled pipeline run.

### Deactivate a single activity

1. Select the activity you want to deactivate
1. Under **General** tab, select **Deactivated** for _Activity state_
1. Pick a state for _Mark activity as_. Choose from _Succeeded_, _Failed_ or _Skipped_

:::image type="content" source="../media/deactivate-activity/deactivate-03-deactivate-single.png" alt-text="Screenshot of Fabric Data Factory pipeline editor with ActivityDeactivated web activity set to Inactive in the General settings pane." lightbox="../media/deactivate-activity/deactivate-03-deactivate-single.png":::

### Deactivate multiple activities

1. Press down _Ctrl_ key to multi-select. Using your mouse, left click on all activities you want to deactivate
1. Right click to bring up the drop down menu
1. Select _Deactivate_ to deactivate them all
1. To fine tune the settings for _Mark activity as_, go to **General** tab of the activity, and make appropriate changes

:::image type="content" source="../media/deactivate-activity/deactivate-04-setup-multiple.png" alt-text="Screenshot of how to deactivate multiple activities all at once.":::