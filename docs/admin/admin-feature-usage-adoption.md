---
title: Feature usage and adoption report
description: Learn how to use the Microsoft feature usage and adoption report.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 12/27/2022
---

# Feature usage and adoption report

The Feature Usage and Adoption Report is a comprehensive analysis of usage and adoption of different features in your Microsoft Fabric tenant. As a Fabric admin you can share this report with others in your organization. You can also share the report's dataset, and use it to customize the report, or build a new report that relies on the same data.

To access the report you need to have one of these admin roles:

* Global Administrator

* Power Platform Administrator

* Power BI Administrator

## Navigation

The report is built to allow admins to analyze specific scenarios. Use the report date slicer to filter data for each page across the report. You can also use the filter pane to filter out information on the page, using available filters based on different scenarios.

## Report pages

The *feature usage and adoption* report has three pages:

* **Overview** - Provides a bird's eye view of the entire organization

* **Decomp** - Visualizes data across multiple activity dimensions

* **Activity Details** - Displays detailed information on specific or multiple capacity or workspace activities

## Overview

Use the Overview page to find out:

* What are the daily activities and user trends?

* Which capacities and workspaces are the most active?

* View activities in your organization by capacity and item type

* View activities in your organization by users or top active user

For example, if you're working in a large retail organization, you may want to use the overview page to find out what capacities were utilized during December. You use the *Date* fields to filter the results for December, and notice that the *sales and marketing* capacity has almost 1,000 logs, while other capacities have under 200 logs each. You decide to further investigate this, and go to the [Decomp](#decomp) page to try and understand why this is happening.

## Decomp

In the Decomp page, you can see a daily count of activities and users by date. It automatically aggregates data and enables drilling down into dimensions in any order. Use the *decomposition tree*, to decompose the activities according to *product*, *item type*, *action* and *name*.

To view the details of a specific activity, drill through to the [activity details](#activity-details):

1. Right-click the activity you want to drill through from.

2. Select *Drill through*.

3. Select *Activity Details*.

Continuing the example from the [Overview](#overview) page, you turn to the Decomp page to understand why in December, the *sales and marketing* capacity has almost five times more logs than any other capacity. Using the *Date* fields, you filter the results for December. By reviewing the *Decomposition tree*, you see that almost all of the logs are for viewing a Power BI report. You decide to drill through to the [Activity details](#activity-details) page to understand which report is being extensively viewed.

## Activity Details

The Activity Details page shows information related to specific or multiple capacity or workspaces activities. You can only get to the *activity details* page by drilling through from the [overview](#overview) or [decomp](#decomp) pages. To drill through, right-click a result and then select After drilling through, you see the following information for the selected activities:

* Capacity name

* Capacity ID

* Workspace name

* Workspace ID

* Number of logs - The number of times the activity was logged

To conclude the example given in the [overview](#overview) and [Decomp](#decomp) pages, after drilling through from the *View Reports* log, in the [Decomp](#decomp) page, you realize that a report titled *unclosed deals* has been heavily reviewed during December. After further inquiries, you learn that this is a new report and that many people in the organization reviewed in during December, to try and understand how sales could have been improved.

## Next steps

>[!div class="nextstepaction"]
>[Admin overview](admin-overview.md)
