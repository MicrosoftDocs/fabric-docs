---
title: Known issue - Line chart value-axis zoom sliders don't work with markers enabled
description: A known issue is posted where line chart value-axis zoom sliders don't work with markers enabled.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 01/27/2025
ms.custom: known-issue-938
---

# Known issue - Line chart value-axis zoom sliders don't work with markers enabled

The vertical/Y-axis value-axis zoom controls might not work correctly for line charts or line chart varieties, such as area chart or stacked area chart. The previous issue where the issue occurred if markers, stacked totals, or anomaly markers were enabled is fixed. However, there's an ongoing issue if the minimum or maximum values are set.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

You see that the vertical zoom controls don't work correctly for line charts or line chart varieties, such as area chart or stacked area chart.

## Solutions and workarounds

To work around this issue, remove the configurations that caused the issue, such as disable the line markers, stacked totals, or anomaly markers. Alternatively, you can enable the markers and disable the minimum or maximum axis.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
