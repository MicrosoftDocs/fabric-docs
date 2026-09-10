---
title: Gantt Layout Concept in PowerTable
description: Gantt charts in PowerTable show task duration, progress, and dependencies at a glance. Explore the components of the Gantt layout and start planning smarter.
ms.date: 08/14/2026
ms.topic: concept-article
---

# Gantt layout

A **Gantt layout** is a timeline-based way to plan and track project work. It displays tasks against a time scale, with each task represented by a bar that shows its planned duration. You can use the layout to understand task schedules, relationships, progress, milestones, and resource assignments in a single view.

A Gantt layout is useful for projects that contain multiple tasks, phases, dependencies, or deadlines. It helps you understand how work is sequenced, identify tasks that can affect the overall schedule, and track progress against the planned timeline.

## Common Gantt concepts

A Gantt layout typically includes the following components:

- **Task list:** Lists the tasks, subtasks, or work items that make up the project. You can organize tasks into phases or other hierarchical groups.
- **Timeline:** Displays a time scale across the top of the layout. Depending on the project, the timeline can show days, weeks, months, or other time periods.
- **Task bars:** Represent the duration of a task. The position of the bar indicates the start and end dates, while its length represents the task duration.
- **Task hierarchy:** Organizes related work into parent tasks and subtasks. A hierarchy helps you break a large project into manageable units and view work at different levels.
- **Progress:** Indicates how much of a task is complete. Progress information helps you compare the current state of a task with its planned schedule.
- **Milestones:** Represent significant points in a project, such as approvals, deadlines, phase completions, or launch dates. Unlike regular tasks, milestones represent a specific point in time.
- **Resources:** Identify the people or resources responsible for completing tasks. Resource information helps teams understand how work is distributed.
- **Dependencies:** Define relationships between tasks and indicate the order or timing in which related tasks should occur.
- **Critical path:** Represents the sequence of dependent tasks that can determine the overall project duration. A delay in a task on the critical path can affect the project completion date.

## Task dependencies

Dependencies describe how the schedule of one task relates to another task. They help you understand which tasks can start or finish only after another task reaches a particular point.

Common dependency types include:

- **Finish-to-Start (FS):** The successor task starts after the predecessor task finishes.
- **Start-to-Start (SS):** The successor task starts after the predecessor task starts.
- **Finish-to-Finish (FF):** The successor task finishes after the predecessor task finishes.
- **Start-to-Finish (SF):** The successor task finishes after the predecessor task starts.

For example, if **Build application** must finish before **Deploy application** can start, the tasks have a **Finish-to-Start** dependency.

Dependencies are particularly useful when a project contains parallel or sequential work. They help you identify downstream tasks that might be affected when a task is delayed or rescheduled.

## Critical path

The **critical path** is the sequence of dependent tasks that determines the minimum time required to complete a project. Tasks on this path have a direct effect on the project completion date.

For example, if testing can't start until development finishes, and deployment can't start until testing finishes, these tasks can form part of the project's critical path. Delaying one of them can delay the subsequent tasks and the overall project.

Use task dependencies and task durations to understand which activities have the greatest impact on the project schedule.

## Gantt layout in PowerTable

PowerTable uses your table data to create an interactive Gantt layout. You configure the fields that provide task information, dates, progress, milestones, dependencies, and resources.

The Gantt layout supports the following capabilities:

- **Task identification:** Use a unique task ID to identify each task in the layout.
- **Task hierarchy:** Use parent-child relationships to organize tasks and subtasks.
- **Task duration:** Use start and end date fields to determine the duration and position of each task on the timeline.
- **Progress tracking:** Configure a progress field to display task completion on the Gantt bar.
- **Milestones:** Configure tasks with only the the end date without the start date to represent milestones that indicate important events or deadlines.
- **Dependencies:** Configure task relationships and display them as connector lines between tasks.
- **Resource assignment:** Configure resource or assignee fields to identify who is responsible for each task.
- **Estimated effort:** Select the column that contains the estimated effort in hours. Use this information to track the expected work for each task.
- **Filtering:** Under **Filter Columns**, select the columns that you want to make available in the **Filter** side panel. If you don't select any columns, all columns are available for filtering.
- **Direct editing:** Edit task information, dates, progress, and other configured fields directly in the Gantt layout.
- **Rescheduling:** Update task dates when project schedules change and review the effect on related tasks and dependencies.
- **Adding tasks:** Add new tasks and subtasks directly from the Gantt layout as the project evolves.

### Gantt bars

PowerTable displays each task as a horizontal bar across the timeline. The position of the bar corresponds to the task's start date, and its end corresponds to the task's end date.

Use the bars to understand:

- When a task starts and ends.
- How long the task is scheduled to run.
- Which tasks overlap.
- Where tasks occur in relation to project milestones.
- How tasks are distributed across the project timeline.

### Progress tracking

You can configure a progress field to indicate the percentage of work completed for a task. The progress indicator provides a visual representation of completion within the task bar.

Tracking progress alongside task duration helps you identify tasks that are behind schedule and require attention.

### Milestones

Use milestones to represent events that don't require a duration, such as an approval, review, phase completion, or project launch.

In PowerTable, you can configure a milestone date field to identify these events. A task can also represent a milestone when it has an end date but no start date.

### Dependencies and rescheduling

PowerTable displays configured dependencies as connector lines between related tasks. The connector direction shows the relationship between the predecessor and successor tasks.

When project dates change, review the affected dependencies and reschedule related tasks as needed. This helps keep the project timeline aligned with the current schedule.

### Resource and effort tracking

Use resource or assignee fields to identify the person responsible for each task. You can also configure **Estimated Effort** to record the expected effort in hours.

Together, resource assignments and estimated effort help you understand who is responsible for the work and how much effort the project requires.

### Filtering Gantt data

Use **Filter Columns** to control which fields users can use in the **Filter** side panel. Select specific columns when you want to limit the available filtering options.

If you don't select any columns, PowerTable makes all columns available in the **Filter** side panel.

## When to use the Gantt layout

Use the Gantt layout when you need to:

- Plan a project with multiple tasks or phases.
- Track tasks against start and end dates.
- Manage relationships between dependent tasks.
- Monitor progress against a project schedule.
- Track important milestones and deadlines.
- Assign and monitor work across resources.
- Identify tasks that can affect the overall project timeline.
- Reschedule work when project dates or dependencies change.

The Gantt layout brings task information, timelines, dependencies, progress, and resource assignments together so you can plan and monitor project work from a single view.
