---
title: Known issue - Reports that use functions with RLS don't work
description: A known issue is posted where reports that use functions with RLS don't work.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 01/28/2025
ms.custom: known-issue-1002
---

# Known issue - Reports that use functions with RLS don't work

You can define row-level security (RLS) for a table that contains measures. `USERELATIONSHIP()` and `CROSSFILTER()` functions can't be used in the measures. A change was recently made to enforce this requirement.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

When viewing a report, you see an error message. The error message is similar to: "`Error fetching data for this Visual. The UseRelationship() and Crossfilter() functions may not be used when querying <dataset> because it is constrained by row level security`" or "`The USERELATIONSHIP() and CROSSFILTER() functions may not be used when querying 'T' because it is constrained by row-level security`."

## Solutions and workarounds

The change is to enforce a security requirement. To prevent your reports from failing, you can remove `USERELATIONSHIP()` and `CROSSFILTER()` from your measures. Alternatively, you can modify the relationships using [recommendations for RLS models](/power-bi/guidance/relationships-active-inactive).

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
