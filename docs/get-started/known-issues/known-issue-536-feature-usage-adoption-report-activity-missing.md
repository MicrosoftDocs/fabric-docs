---
title: Known issue - Feature Usage and Adoption report activity missing
description: A known issue is posted where the Feature Usage and Adoption report activity is missing
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 12/14/2023
ms.custom: known-issue-536
---

# Known issue - Feature Usage and Adoption report activity missing

In the Feature Usage and Adoption report, you see all usage activity for workspaces on Premium Per User (PPU) and Shared capacities filtered out. When viewing the report, you see less than expected activity levels for the affected workspaces. For workspaces not on PPU and Shared capacities, usage activity should be considered accurate.

**Status:** Fixed: December 13, 2023

**Product Experience:** Administration & Management

## Symptoms

In the Feature Usage and Adoption report, you notice gaps in audit log activity for certain workspaces that are hosted on Premium Per User (PPU) and Shared capacities. The report also shows less activity than reality for the affected workspaces.

## Solutions and workarounds

Until a fix is released, you can use the usage metrics reports for measuring usage at the workspace level or pull usage data using the activity events API.

## Related content

- [Monitor report usage metrics](/power-bi/collaborate-share/service-usage-metrics)
- [Monitor usage metrics in the workspaces (preview)](/power-bi/collaborate-share/service-modern-usage-metrics)
- [Admin - Get Activity Events](/rest/api/power-bi/admin/get-activity-events)
- [About known issues](https://support.fabric.microsoft.com/known-issues)
