---
title: Known issue - Semantic model refresh fails due to circular dependency in calendar table
description: A known issue is posted where Semantic model refresh fails due to circular dependency in calendar table.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 10/25/2024
ms.custom: known-issue-887
---

# Known issue - Semantic model refresh fails due to circular dependency in calendar table

You can have a calendar table in your semantic model. Even if you made no changes, the semantic model refresh now fails with a circular dependency error.

**Status:** Fixed: October 25, 2024

**Product Experience:** Power BI

## Symptoms

Your semantic model refresh fails with an error message. The error message is similar to: `A circular dependency was detected`.

## Solutions and workarounds

You can mitigate the issue by changing the `CALENDARAUTO` function to the `CALENDAR` function.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
