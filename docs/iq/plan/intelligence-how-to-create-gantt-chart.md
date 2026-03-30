---
title: Plan projects with Gantt charts
description: Learn how to plan and track projects with the Gantt charts in Intelligence. Break work into tasks, manage dependencies, assign resources, and monitor milestones and deliverables.
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a user, I want to optimize project management and tracking with Gantt.
---

# Plan projects with Gantt charts

The Intelligence sheet features a best-in-class Gantt chart for Fabric that helps visualize, communicate, and track project progress. The fully customizable Gantt chart enables you to:

* Plan projects by breaking work into tasks with defined start and end dates.
* Identify task dependencies and anticipate potential delays.
* Assign resources to tasks and balance workloads across teams.
* Track key deliverables, approvals, and project milestones.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Sample data

The data used to plot the Gantt chart in this article can be found in the Fabric Samples GitHub repository: [gantt-data.csv](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/iq/plan/gantt-data.csv).

## Configure Gantt charts

Follow these steps to build a Gantt chart:

1. Add the Gantt visual to the canvas.
1. Assign data to the **Task**, **Start Date**, **End Date**, and **Progress** fields.
1. Select the drill down icon to display the task breakdown.

    :::image type="content" source="media/intelligence-how-to-create-gantt-chart/drill-down.png" alt-text="Screenshot of the drill down icon and task breakdown." lightbox="media/intelligence-how-to-create-gantt-chart/drill-down.png":::

1. Assign the field that captures dependencies to the **Connect to** bucket. You see connector lines rendered between tasks that have dependencies.

    :::image type="content" source="media/intelligence-how-to-create-gantt-chart/connect-to.png" alt-text="Screenshot of dependencies in the chart." lightbox="media/intelligence-how-to-create-gantt-chart/connect-to.png":::

1. Select the **Analytics** option and **Add new reference**. Capture phases or project sprints with reference lines or reference bands.
1. Set **Date(s)** to *first-of-date*. Change the **Name** and **Label** to *Project kick off*.
1. Change the line format to a dashed line. Select **Apply**. The chart should look like the following image:

    :::image type="content" source="media/intelligence-how-to-create-gantt-chart/analytics.png" alt-text="Screenshot of selecting Analytics from the menu ribbon." lightbox="media/intelligence-how-to-create-gantt-chart/analytics.png":::

1. Select **Gantt Options > Data colors** to customize the colors, style, and border of the progress bars. You can also change the appearance of the connector lines.

    :::image type="content" source="media/intelligence-how-to-create-gantt-chart/customize.png" alt-text="Screenshot of the Gantt customization options." lightbox="media/intelligence-how-to-create-gantt-chart/customize.png":::