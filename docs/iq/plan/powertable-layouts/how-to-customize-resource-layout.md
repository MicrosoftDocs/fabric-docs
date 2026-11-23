---
title: Customize Resource Layout
description: Learn how to customize the Resource layout in PowerTable to configure task properties, timescales, summary information, layout components, and formatting rules.
#customer intent: As a PowerTable business user, I want to customize the Resource layout so that I can control how tasks, schedules, summary information, and other layout components are displayed and formatted.
ms.date: 08/18/2026
ms.topic: how-to
---

# Customize resource layout

Customize the resource layout to control how tasks and related information are displayed. You can configure task properties, navigate time periods, view summary information, customize timescales, and apply formatting to meet your requirements.

## Navigate resource layout

The time period of data currently visible in the resource layout is displayed at the top of the layout. Use the **left** and **right** arrows to navigate to the previous or next time period.

:::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/navigate.png" alt-text="Screenshot of the resource layout toolbar showing the date range selector and arrows." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/navigate.png":::

Select **Today** to quickly navigate to the time period that includes the current date.

:::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/today.png" alt-text="Screenshot of the resource layout with the Today button highlighted abd a Today line." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/today.png":::

Use **Expand All** to expand all rows and **Collapse All** to collapse all rows.

:::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/expand-collapse.png" alt-text="Screenshot of the resource layout with the Expand All and Collapse All menu options highlighted in the Assigned To column header." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/expand-collapse.png":::

## Configure task properties

Control how task information is displayed in the resource layout by using the options available under **Properties**.

1. Select **Properties**.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/properties.png" alt-text="Screenshot of the resource layout with the Properties menu open showing Data Label, Today Line, and Estimate on bar toggles." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/properties.png":::

1. Use the available toggles to show or hide the corresponding information:
   * **Data Label** - Displays labels on the task bars. This option is enabled by default.
   * **Today Line** - Displays a line indicating the current date in the timeline. This option is enabled by default.
   * **Estimate on bar** - Displays the estimated hours on the task bars. If the estimate isn't visible on the bar, hover over the task bar to view it.

    :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/estimate-on-bar.png" alt-text="Screenshot of the resource view with Estimate on bar enabled, showing hour values on bars and a tooltip on hover." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/estimate-on-bar.png":::

## View summary information

Use the **Summary Bar** to view summary information for each resource across the timeline. The **Summary Bar** provides metrics such as **Total Tasks**, **Scheduled Hours**, **Availability**, and **Utilizations %** for the selected timescale.


To display a summary bar:

1. In the resource layout, select **Summary Bar**.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/summary-bar.png" alt-text="Screenshot of the resource layout with the Summary Bar dropdown open, showing None, Total Tasks, Scheduled Hours, Availability, and Utilizations % options." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/summary-bar.png":::

1. Select the metric you want from the dropdown. You can choose from the following options:
   * **None** - Hides the summary bar.
   * **Total Tasks** - Displays the total number of tasks for each resource across each time interval.

     :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/total-tasks.png" alt-text="Screenshot of the resource layout with the Summary Bar - Total Tasks option highlighted in the toolbar and task counts displayed per day." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/total-tasks.png":::

   * **Scheduled Hours** - Displays the total scheduled hours for each resource across each time interval.

     :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/scheduled-hours.png" alt-text="Screenshot of the resource layout with the Summary Bar - Scheduled Hours option highlighted and showing scheduled hours." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/scheduled-hours.png":::

   * **Availability** - Displays the available hours for each resource across each time interval. Availability is calculated as the difference between the total allocated hours and scheduled hours.

     :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/availability.png" alt-text="Screenshot of the resource layout with Summary Bar - Availability highlighted in the toolbar and daily available hours shown per resource." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/availability.png":::

   * **Utilizations %** - Displays the percentage of utilized hours for each resource across each time interval.

     :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/utilizations.png" alt-text="Screenshot of the resource layout with Summary Bar - Utilizations % highlighted in the toolbar and daily utilization percentages per resource." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/utilizations.png":::

The selected summary metric is displayed for each resource across the corresponding time intervals in the resource layout.

## Switch and manage timescales

Use timescales to control the level of detail displayed in the Resource layout. Switch between available timescales to view task schedules at different levels of detail, or customize timescales to control the date range and timeline levels.

### Switch the timescale

View the resource layout at different timescale levels to analyze task schedules at varying levels of detail. Select a timescale from the dropdown in the layout.

:::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/timescale.png" alt-text="Screenshot of the resource layout with the timescale dropdown open showing Full Range, Year, Quarter, Month, Week, and Manage Timescale." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/timescale.png":::

The following timescales are available:

* **Full Range** - Displays the complete task timeline with year, quarter, and month levels expanded for a detailed view.

  :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/full-range.png" alt-text="Screenshot of the Resource layout with Full Range selected in the timescale dropdown, showing year, quarter, and month headers." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/full-range.png":::

* **Year** - Displays the timeline at the year level, with quarters and months shown within each year.

  :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/year.png" alt-text="Screenshot of the Resource layout with Year selected in the timescale dropdown, showing year, quarter, and month headers above task bars." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/year.png":::

* **Quarter** - Displays the timeline at the quarter level, with the corresponding months and weeks shown within each quarter.

  :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/quarter.png" alt-text="Screenshot of the Resource layout with Quarter selected in the timescale dropdown, showing quarter, month, and week headers above task bars." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/quarter.png":::

* **Month** - Displays the timeline at the month level, with the corresponding weeks and individual days shown within the month.

  :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/month.png" alt-text="Screenshot of the Resource layout with Month selected in the timescale dropdown, showing month, week, and day headers above task bars." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/month.png":::

* **Week** - Displays the timeline at the week level, with individual days shown within each week.

  :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/week.png" alt-text="Screenshot of the Resource layout with Week selected in the timescale dropdown, showing week and day headers above task bars." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/week.png":::

### Manage timescale

You can customize a timescale to control the date range and levels displayed in the resource layout.

To manage a timescale:

1. In the resource layout, select **Manage Timescale**. The **Manage Timescale** side panel opens and displays the available timescales: **Full Range**, **Year**, **Quarter**, **Month**, and **Week**.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/manage-timescale.png" alt-text="Screenshot of the Manage Timescale side panel listing Full Range, Year, Quarter, Month, and Week with Edit icons highlighted." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/manage-timescale.png":::

1. Select the **Edit** icon for the timescale that you want to customize. The **Customize Timescale** panel opens.
1. In the **Title** field, edit the name of the timescale if needed.
1. Under **Timescale**, select the **Range** and specify the **Value** for the timescale.
1. Under **Level Format**, configure the available levels and their display formats.
   For each available level, select the required time unit, interval, and display format.
1. Select **Save**.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/customize-timescale.png" alt-text="Screenshot of the Customize Timescale panel with Title, Timescale range, and Level Format options." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/customize-timescale.png":::

The customized timescale is available in the timescale dropdown and can be selected to display the **Resource** layout using the configured date range and levels.

## Customize resource layout components

Customize the appearance and display settings of components in the **Resource** layout. Use **Edit Resource** to configure timeline settings, milestone styles, data colors, and labels displayed in the layout.

To customize resource layout components:

1. In the **Format** tab, select **Edit Resource**, and then select any component that you want to customize.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/edit-resource.png" alt-text="Screenshot of the Format tab with Edit Resource selected, showing Timeline, Milestone, Data Color, and Label options.":::

1. The **Edit Resource** side panel opens with separate tabs for each component:
   * **Timeline**
   * **Milestone**
   * **Data Color**
   * **Label**
1. Select the tab you want to configure.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/edit-resource-side-panel.png" alt-text="Screenshot of the Edit Resource panel displaying Timeline, Milestone, Data Color, and Label tabs." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/edit-resource-side-panel.png":::

1. Modify the settings and view the changes in the resource layout.
1. Select **Save to Database** to save the changes.

### Configure timeline settings

Use the **Timeline** tab to configure timeline and scheduling settings for the resource layout.

* **Fiscal Year Starting Month** - Specify the month that marks the beginning of the fiscal year used in the timeline.
* **Week Start Day** - Define the first day of the week displayed in the timeline.
* **Work Week** - Specify the working days used for task scheduling and resource allocation calculations.
* **Daily Capacity** - Define the number of working hours available per day for each resource. Use this value to calculate **Scheduled Hours**, **Availability**, and **Utilizations %** in the **Summary Bar**.
* **Holidays & Exceptions** - Configure non-working days, holidays, and other exceptions that affect scheduling.
* **Color** - Set the color used to highlight non-working periods in the timeline.
* **Pattern** - Specify the fill pattern used to display non-working periods and exceptions in the timeline. Select a pattern from the available options.
* **Zoom Using Mouse Wheel** - Enable or disable zooming the timeline using the mouse wheel.

:::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/timeline.png" alt-text="Screenshot of the Edit Resource panel with the Timeline tab selected, showing fiscal year, work week, holidays, color, and pattern settings." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/timeline.png":::

### Customize milestone appearance

Use the **Milestone** tab to customize milestone appearance in the Resource layout.

* **Shape**: Select a milestone shape.
* **Fill**: Configure milestone fill color.
* You can also upload a custom milestone icon by selecting **Upload** and choosing an icon.

:::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/milestone.png" alt-text="Screenshot of the Edit Resource panel with the Milestone tab selected, showing Shape and Fill options with an open shape picker and Upload button." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/milestone.png":::

### Configure data colors

Use the **Data Color** tab to customize the colors for task bars.

* Select **All** to apply a single color to all task bars.

  :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/data-color-all.png" alt-text="Screenshot of the Edit Resource panel with the Data Color tab selected and Color by set to All, showing a single Fill color applied to all task bars." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/data-color-all.png":::

* To color task bars by column, select **Column**, and then choose a column from **Option Columns**. Only **Single Select** columns are available in **Option Columns**.
* Each task bar gets a color based on the option you select for that task in the chosen column. For example, if you select the **Status** column, tasks with different status options appear in different colors.

  :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/data-color-column.png" alt-text="Screenshot of the Edit Resource panel with Data Color tab, Color by set to Column, and Option Columns list showing Task Type, Priority, and Status." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/data-color-column.png":::

### Configure task labels

Use the **Label** tab to configure the labels that appear on task bars.

You can:

* Turn data labels on or off.
* Select the field for the label.
* Set the font size.
* Change the text and background colors.
* Turn on **Adaptive label** to adjust the label based on available space.

:::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/label.png" alt-text="Screenshot of Label tab settings including Enable Data Label, Based On, Font Size, Text Color, and Adaptive label toggles." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/label.png":::

> [!NOTE]
> Changes you make in the **Edit Resource** panel affect the appearance and display settings of the Resource layout. Use **Reset to Default Styling** to restore the default component settings.

## Create formatting rules

Use format rules to highlight task bars, summary bars, and milestones based on specified conditions. Format rules help you visually identify tasks and summary information that meet defined criteria.


To create a format rule:

1. In the **Format** tab, select **Format Rules** > **Create Rule**.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/create-rule.png" alt-text="Screenshot of the Format tab with Format Rules menu open and Create Rule highlighted.":::

1. In the **Create Formatting Rule** side panel, enter a name in the **Title** field.
1. In **Impacts On**, select one or more components to which the rule should apply. They include:
   * **Bar**
   * **Summary Bar**
   * **Milestone**
1. Configure the condition in the **Condition If** section.
1. Under **Rule Highlight**, specify the formatting to apply when the condition is met.
1. Select **Apply**.

### Configure conditions for task bars

When you select **Bar** in **Impacts On**, define the condition by using a table column.

1. Select a column from the first dropdown.
1. Select a comparison operator.
1. Select or enter a value for the selected column.
1. Configure the highlight settings for the task bar.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/create-rule-bar.png" alt-text="Screenshot of the Create Formatting Rule panel with Bar impact, condition Status is Done, and green bar highlight color." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/create-rule-bar.png":::

In this example, task bars with the **Status** value **Done** are displayed in green.

:::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/formatted-task-bars.png" alt-text="Screenshot of a resource layout where tasks with Status Done appear as green bars." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/formatted-task-bars.png":::

### Configure conditions for summary bars

When you select **Summary Bar** in **Impacts On**, specify the summary bar elements to format.

1. In **Apply To**, select one or more summary bar components, such as:
   * **Bar**
   * **Data Label**
1. In **Condition If**, select a summary metric and define the condition.
1. Configure the highlight settings for the selected summary bar components.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/create-rule-summary-bar.png" alt-text="Screenshot of Rule Highlight settings with red Bar color and black Data Label for a summary bar rule." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/create-rule-summary-bar.png":::

In this example, summary bars where **Scheduled Hours** is greater than **8** are displayed in red.

:::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/formatted-summary-bars.png" alt-text="Screenshot of a resource layout where scheduled hours over 8 appear as red cells and lower values appear in purple." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/formatted-summary-bars.png":::

> [!NOTE]
> Select **Scheduled Hours** from the **Summary Bar** dropdown to view the applied formatting.

### Add multiple conditions

You can define multiple conditions within a single format rule.

1. Select **Add Rule**.
1. Configure the additional condition.
1. Connect conditions using **AND** or **OR** operators.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/create-rule-multiple-conditions.png" alt-text="Screenshot of the Create Formatting Rule panel with Add Rule and AND/OR operator options highlighted." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/create-rule-multiple-conditions.png":::

Use multiple conditions to create more specific formatting scenarios based on different field values. In this example, tasks with the **Task Type** value **Story** and the **Status** value **Completed** are highlighted in pink.

:::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/formatted-multiple-conditions.png" alt-text="Screenshot of the resource layout where taskbars with task type story and status completed are highlighted in pink." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/formatted-multiple-conditions.png":::

> [!NOTE]
> You can apply a single format rule to multiple components by selecting **Bar**, **Summary Bar**, and **Milestone** in **Impacts On**. This approach lets you reuse the same condition across components without creating separate rules for each one.

### Manage format rules

Use **Manage Rule** to modify and organize existing format rules in the resource layout.

To manage format rules:

1. In the **Format** tab, select **Format Rules** > **Manage Rule**.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/manage-rules.png" alt-text="Screenshot of the Format tab with Format Rules menu open and Manage Rules highlighted.":::

1. In the **Manage Rule** side panel, view all available format rules.
1. Use the available actions to manage rules:
   * **Edit** - Modify the rule conditions, affected components, or highlight settings.
   * **Duplicate** - Create a copy of an existing rule to use as a starting point for a new rule.
   * **Delete** - Remove a rule from the resource layout.
   * **Show/Hide** - Enable or disable a rule without deleting it.
   * **Drag and reorder** - Change the order of rules by dragging them to the required position.
1. Select **Create New Rule** to add a new format rule from the **Manage Rule** panel.

   :::image type="content" source="../media/powertable-layouts/how-to-customize-resource-layout/manage-rule-side-panel.png" alt-text="Screenshot of the Manage Rule side panel listing format rules with edit, duplicate, delete, and toggle actions highlighted." lightbox="../media/powertable-layouts/how-to-customize-resource-layout/manage-rule-side-panel.png":::
