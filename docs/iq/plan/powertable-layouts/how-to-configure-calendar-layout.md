---
title: Configure calendar layout
description: Calendar layout in PowerTable displays your records by date so you can track deadlines, events, and schedules. Learn how to configure, customize, and manage it.
#customer intent: As a PowerTable business user, I want to map start and end date columns to a calendar view, so that I can see tasks and appointments by day, week, or month.
ms.date: 08/11/2026
ms.topic: how-to
---

# Configure calendar layout

Calendar layout displays records on a calendar based on the values in a date or date-time column. It provides a chronological view of your data, making it easier to organize, review, and update records by day, week, or month.

Use the calendar layout to visualize schedules, deadlines, events, and other time-based information without changing the underlying table data. Any updates you make in the calendar are reflected in the corresponding records in the table.

## Use cases

Calendar layout is useful for scenarios such as the following:

* Tracking project milestones and deadlines.
* Managing tasks and due dates.
* Scheduling meetings, appointments, and events.
* Planning marketing campaigns and content calendars.
* Monitoring maintenance schedules or service requests.
* Organizing employee leave, shifts, or resource bookings.
* Viewing sales activities or customer follow-ups by date.

In this article, you learn how to create and configure a calendar layout for your table by using an example.

This example uses an **Appointments** table that stores appointment details for patients and their doctors. Each record includes the **Appointment ID**, **Visit Type**, **Patient Name**, **Doctor Name**, **Start Date and Time**, and **End Date and Time**.

## Create calendar layout

To set up the calendar layout in a table:

1. In the **PowerTable** tab, select **Layout** > **Calendar**. The **Calendar Layout Configuration** window opens.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-calendar-layout/select-calendar-layout.png" alt-text="Screenshot of the PowerTable tab with the Layout menu open and the Calendar option highlighted." lightbox="../media/powertable-layouts/how-to-configure-calendar-layout/select-calendar-layout.png":::

1. Configure the following properties for the calendar layout:

    * **Display Column**: Select the column to use as the primary label for records in the calendar layout.
    * **Start Date**: Select the column that contains the start date for the task or event.
    * **End Date/ Duration**: Select the column that contains the end date. Alternatively, select a duration column to calculate the end date automatically in the calendar layout.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-calendar-layout/configure-calendar-layout.png" alt-text="Screenshot of the Calendar Layout Configuration dialog with Display Column, Start Date, and End Date/Duration fields and the Save button highlighted." lightbox="../media/powertable-layouts/how-to-configure-calendar-layout/configure-calendar-layout.png":::

1. Select **Save**.

    PowerTable displays table data in an interactive calendar layout. Similar to the table view, you can add, edit, delete, and duplicate tasks directly from the calendar.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-calendar-layout/created-calendar-layout.png" alt-text="Screenshot of PowerTable calendar layout showing a monthly view with task names listed under each date." lightbox="../media/powertable-layouts/how-to-configure-calendar-layout/created-calendar-layout.png":::

## Switch views

Use the **Month** drop-down list to switch between the **Month**, **Week**, and **Day** views. The following image shows the week view.

:::image type="content" source="../media/powertable-layouts/how-to-configure-calendar-layout/switch-views.png" alt-text="Screenshot of PowerTable calendar week view with the view drop-down list open showing Month, Week, and Day options." lightbox="../media/powertable-layouts/how-to-configure-calendar-layout/switch-views.png":::

> [!TIP]
> You can instantly access the **Day** view by selecting the date on the **Month** or the **Week** views.

## Customize the view

The calendar layout provides options to customize the display for each calendar view. Select **Properties** to configure the options for each view.

* **Month view**: In the month view, use the **Properties** option to specify the number of weeks to display. The calendar automatically adjusts to fit the current month. You can also show or hide weekends.
* **Week view**: For the week view, you have the option to choose a **12-hour** or **24-hour** time format. You can also show or hide ISO week numbers and weekends.
* **Day view**: For the day view, choose a **12-hour** or **24-hour** time format and specify the number of days to display in the timeline.

## Navigate and view tasks

* Use the **Previous** and **Next** arrows at the top to navigate through the calendar timeline.
* Select **Today** to go to the current date in the calendar.
* Hover over the label to see the appointment or task's start and end dates and times.
* Select the label to view the complete record details in a pop-up.

:::image type="content" source="../media/powertable-layouts/how-to-configure-calendar-layout/navigate-calendar.png" alt-text="Screenshot of PowerTable month calendar with Previous, Next, and Today navigation highlighted and an appointment details pop-up open." lightbox="../media/powertable-layouts/how-to-configure-calendar-layout/navigate-calendar.png":::

## Add a task or appointment

1. Select **Add Task** on the toolbar to create a new task or appointment. Alternatively, select a date directly on the calendar to create a task or appointment for that date.
1. In the form editor, enter the required details. If the table contains single-select list columns, select the appropriate values from the drop-down list.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-calendar-layout/add-task.png" alt-text="Screenshot of a new appointment being added on a calendar date with the form editor fields filled in and Apply selected." lightbox="../media/powertable-layouts/how-to-configure-calendar-layout/add-task.png":::

1. Select **Apply**. The appointment is added to the calendar.
1. Use **Preview Changes** if you want to preview the added tasks. Select **Save to Database** to save the details to the database.

> [!NOTE]
>
> * You can select and drag one or more dates to create task start and end dates.
> * You can import records in bulk by using the [**Import**](../powertable-how-to-insert-rows-import-data.md#import-bulk-data) option under the **PowerTable** tab.
> * Select **Backlog Task** to view pending tasks that aren't fully configured and have incomplete details.

## Edit a task

1. Select the task on the calendar that you want to edit.
1. On the pop-up, select the **Expand** arrow to open the form editor.
1. In the form editor, edit the task details and select **Apply**.

Alternatively, right-click on the task and select **Manage Record** to open the form editor and edit.

> [!NOTE]
> Use [**Customize Form**](../powertable-how-to-generate-forms.md#customize-form) in the form editor to customize the form.

## Duplicate or delete a task

Select the task, and then select the **Expand** arrow. In the three-dot menu, select **Duplicate** or **Delete** to duplicate or delete the selected task.

The setting in the [**Manage Access**](../powertable-how-to-set-up-access-control.md#delete) menu controls the user's delete access.

## Filter and bulk edit tasks

Use the toolbar to locate specific tasks.

* Use [**Filter by keyword**](../powertable-how-to-explore-organize-data.md#search-records) to search for tasks by using keywords.
* Use the [**Find and Replace**](../powertable-how-to-bulk-edit-data.md#find-and-replace-data) option to bulk edit.

## Modify layout

To modify the existing calendar layout and configure a new one, go to **Layout** > **Manage Layout**. Select the layout, and then reset or reconfigure the properties.

:::image type="content" source="../media/powertable-layouts/how-to-configure-calendar-layout/manage-layout.png" alt-text="Screenshot of the Layout menu with Manage Layout highlighted and the Layout Configuration dialog showing Calendar settings." lightbox="../media/powertable-layouts/how-to-configure-calendar-layout/manage-layout.png":::
