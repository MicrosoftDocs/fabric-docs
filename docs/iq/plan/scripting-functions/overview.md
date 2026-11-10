---
title: Scripting functions in planning
description: Learn about the scripting functions available in planning in Fabric and how to use them to control visuals, refresh reports, configure layouts, and manage data display.
ms.date: 11/09/2026
ms.topic: reference
---

# Scripting functions

Scripting functions let you configure and automate custom actions in planning. You can run these actions during initial load, when data changes, or when a user selects a button or toggle.

Use scripting functions while configuring action parameters to define the actions you want to execute in response to the events.

Some scripting functions operate at the ROOT level, while others operate at the planning sheet level. The function reference pages describe the scope and configuration steps for each function.

## Available scripting functions

The following table lists the scripting functions available in planning in Fabric.

| Function | Description |
| --- | --- |
| [HIDE_VISUAL](hide-visual.md) | Hides a visual or visual group in an intelligence sheet. |
| [OPEN_LINK](open-link.md) | Opens a specified URL from a planning sheet. |
| [OPEN_SHEET](open-sheet.md) | Opens a specified sheet in a planning sheet. |
| [REFRESH_REPORT](refresh-report.md) | Refreshes a report in a planning sheet. |
| [REFRESH_VISUAL](refresh-visual.md) | Refreshes a specific visual in an intelligence sheet. |
| [SETBOTTOMN](setbottomn.md) | Displays the bottom N records based on a selected category and ranking criterion. |
| [SETLAYOUT](setlayout.md) | Applies a layout to a planning sheet, including Hierarchy, Table, Tree, default, measures-on-rows, and measures-on-columns layouts. |
| [SETNUMBERFORMATTING](setnumberformatting.md) | Switches the number formatting applied to values in a planning sheet between Native, Uniform, Measure Level, and Auto modes. |
| [SETSCALING](setscaling.md) | Scales measure values in a planning sheet to a specified unit, such as thousands or millions. |
| [SETTOPBOTTOMN](settopbottomn.md) | Displays the top and bottom items in a category based on a specified count or percentage. |
| [SETTOPN](settopn.md) | Displays the top N records based on a selected category and ranking criterion. |
| [SETVISIBILITY](setvisibility.md) | Shows or hides rows, columns, and measures in a planning sheet. |
| [SHOW_MESSAGE](show-message.md) | Displays a custom message to users as a toast notification. |
| [SHOW_VISUAL](show-visual.md) | Shows a visual or visual group in an intelligence sheet. |
| [SHOWCLOSEDFORECAST](showclosedforecast.md) | Shows or hides forecast values for closed periods in a planning sheet. |
| [SHOWMEASURES](showmeasures.md) | Shows or hides all measures in a planning sheet. |

## Use scripting functions

You can use scripting functions in parameter actions to control the behavior of planning sheets and intelligence sheets. For example, configure a toggle parameter to show or hide measures, display a visual, or change the layout when a user changes the parameter state.

For details about the syntax, parameters, and configuration steps, see the individual function reference pages.
