---
title: Configure Gantt Layout in PowerTable
description: Configure the Gantt layout in PowerTable to visualize task durations, milestones, and dependencies. Follow this example to set up required and optional fields.
#customer intent: As a project manager, I want to configure the Gantt layout in PowerTable so that I can view my project tasks on a timeline.
ms.date: 08/18/2026
ms.topic: how-to
---

# Configure Gantt layout

Use the **Gantt** layout in PowerTable to visualize and manage project tasks on a timeline. You can track task duration and progress, manage milestones and dependencies, and monitor project schedules in a single view.

> [!NOTE]
> To learn about the concepts of Gantt, see [Gantt layout concepts](../powertable-concept-gantt.md).

## Use cases

Use the **Gantt** layout to:

* **Plan project schedules:** Organize tasks and subtasks along a timeline and track their start and end dates.
* **Track task progress:** Monitor the progress of individual tasks and the overall project.
* **Manage dependencies:** Visualize relationships between tasks and identify how changes to one task can affect others.
* **Track milestones:** Highlight important events, deadlines, and project completion points.
* **Manage resources:** Assign tasks to team members and monitor resource allocation.
* **Identify critical paths:** Identify tasks and dependencies that can affect the overall project schedule and completion date.
* **Reschedule tasks:** Adjust task dates and timelines when project schedules change.
* **Analyze dependency impacts:** Understand how changes to a task can affect dependent tasks and the overall project timeline.

In this article, you learn how to create and configure a **Gantt** layout for your table by using an example.

This example uses a **Project Tasks** table that stores project task details.

:::image type="content" source="../media/powertable-layouts/how-to-configure-gantt-layout/gantt-dataset-table.png" alt-text="Screenshot of PowerTable grid with a sample project tasks dataset for Gantt layout." lightbox="../media/powertable-layouts/how-to-configure-gantt-layout/gantt-dataset-table.png":::

## Prerequisites

To create a **Gantt** layout, ensure the table meets the following requirements:

* Include **Start Date** and **End Date** fields, along with a **primary key** field that contains unique task IDs.
* Use the **Date** data type for the **Start Date**, **End Date**, and **Milestone Date** fields during the initial table configuration.
* Configure the field that contains unique task IDs as the **primary key**.

## Create Gantt layout

In the **PowerTable** tab, go to **Layout** > **Gantt**. The **Gantt Layout Configuration** dialog box opens.

:::image type="content" source="../media/powertable-layouts/how-to-configure-gantt-layout/select-gantt.png" alt-text="Screenshot of Layout menu expanded with Gantt option highlighted." lightbox="../media/powertable-layouts/how-to-configure-gantt-layout/select-gantt.png":::

Configure the fields to create the Gantt layout:

### Necessary fields

* In **Start Date**, select the column that contains the task start dates.
* In **End Date**, select the column that contains the task end dates.
* Under **Task ID**, PowerTable automatically selects the primary key column, which is the Task ID.

:::image type="content" source="../media/powertable-layouts/how-to-configure-gantt-layout/configure-necessary-fields.png" alt-text="Screenshot of Gantt Layout Configuration dialog with start date, end date and Task ID fields filled with corresponding fields from the table." lightbox="../media/powertable-layouts/how-to-configure-gantt-layout/configure-necessary-fields.png":::

### Optional fields

Set these optional fields to use the full capabilities of the Gantt chart.

#### Hierarchy type

The hierarchy type organizes the task list into parent tasks and subtasks. Organize tasks into a parent-child hierarchy by using either **Parent ID** or **Hierarchy By**.

  * **Parent ID:** If your data has a column that identifies and maps the parent task for each task, select that column under **Parent ID**. Then, under **Task Name**, select the column that has all task names.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-gantt-layout/parent-task-configuration.png" alt-text="Screenshot of the Gantt Layout Configuration dialog with Parent ID selected as the hierarchy type.":::

  * **Multiple Column Hierarchy:** If your data doesn't have a **Parent ID** column, select this option and then select the fields that define the task hierarchy.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-gantt-layout/column-hierarchy-configuration.png" alt-text="Screenshot of the Gantt Layout Configuration dialog with Multiple Column Hierarchy selected and highlighted.":::

#### Milestone

Under **Milestone**, select the date column that identifies important events or deadlines, if available.

If your data doesn't include a separate milestone field, PowerTable identifies milestones based on the **Start Date** and **End Date** fields. PowerTable treats a task as a milestone when it has only an **End Date** without the **Start Date**.

#### Progress

Under **Progress**, select the numeric column that contains the task completion percentage.

#### Dependency

Under **Dependency**, select the column that contains task dependency information. Use the `TaskID-ConnectionType` format to define dependencies. For example, `1002FS` indicates that the current task starts after task `1002` finishes. Supported dependency types include **Finish-to-Start (FS)**, **Start-to-Start (SS)**, **Start-to-Finish (SF)**, and **Finish-to-Finish (FF)**.

:::image type="content" source="../media/powertable-layouts/how-to-configure-gantt-layout/milestone-progress-dependency-effort-filter.png" alt-text="Screenshot of the Gantt Layout Configuration dialog with Milestone, Progress, Dependency, Estimated Effort, and Filter columns fields highlighted.":::

#### Estimated Effort

In **Estimated Effort**, select the field that contains the estimated effort for each task in hours.

#### Filter Columns

Select the columns that you want to make available for filtering in the **Filter** side panel. If you don't select any columns, all columns are available for filtering.

Select **Save**.

PowerTable displays the tasks in the **Gantt** layout.

:::image type="content" source="../media/powertable-layouts/how-to-configure-gantt-layout/completed-gantt-layout.png" alt-text="Screenshot of PowerTable Gantt layout showing project tasks with quarterly timeline bars and milestones." lightbox="../media/powertable-layouts/how-to-configure-gantt-layout/completed-gantt-layout.png":::
