---
title: "Monitoring hub: View and track Fabric activity"
description: Gain visibility into Microsoft Fabric activities with the monitoring hub. Track job statuses, view historical runs, and troubleshoot issues effectively.
#customer intent: As a Fabric user, I want to monitor job execution health and progress so that I can quickly identify and resolve issues.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 02/27/2026
---

# Use the monitoring hub to track Fabric activity

The Microsoft Fabric **Monitor** feature opens the monitoring hub, which provides a centralized view of job execution health, progress, and outcomes. You can quickly identify problems and take action. Use the monitoring hub to answer these questions:

- Is a job running, succeeded, or failed?
- Where did it fail and what error details are available?
- Did this job fail before in the last 30 days?

Any Fabric user can open the monitoring hub, but you only see activities for Fabric items you have permission to view.

### Key capabilities

- **Current run status:** [Open the monitoring hub](#open-the-monitor-hub) to track active and recently completed jobs from one place.
- **Historical runs:** [View activity history](#view-activity-history) to investigate failures, compare performance over time, and validate reruns.
- **Activity details and diagnostics:** [View details](#view-details) to inspect status, timing, and error details for faster troubleshooting.
- **Activity filtering and search:** Use [search and filtering](#filter-and-search-activities) to narrow the list to the activities and run windows pertaining to your investigation.

:::image type="content" source="media/monitoring-hub/monitoring-hub-table.png" alt-text="Screenshot of Fabric monitoring hub displaying activity history with filter, refresh, and column options visible." lightbox="media/monitoring-hub/monitoring-hub-table.png":::

The monitoring hub displays activities for these Fabric items:

* Copy Job
* Dataflow Gen2
* Dataflow Gen2 CI/CD
* Datamart
* Data Build Tool (dbt) Job
* Digital Twin Builder Flow
* Experiment
* Graph model
* Lakehouse
* Map
* Notebook
* Pipeline
* Semantic model
* Snowflake database
* Spark job definition
* User data function

> [!NOTE]
> For Spark Notebook jobs with jobType "NotebookInteractiveRun," all terminated notebooks display as "Stopped" in the monitoring hub. This temporary UI-only change has the following limitations:
> * You can't filter by the "Stopped" status.
> * Status might be inconsistent between the monitoring hub table, the Public Job Status API, and job events.

## Open the monitoring hub

To open the monitoring hub in Fabric, select **Monitor** from the navigation pane. The monitoring hub displays information in a table. Fabric activities appear in order of their start time, with the newest activities at the top of the table. Each Fabric item shows up to 100 activities. You can view history for 30 days through the *Historical view* option.

## Find details and history

If you have the right permissions for a Fabric item, you can perform certain actions directly from the monitoring hub. The available actions depend on the item type.

### View details

The details panel provides information about an activity, such as its status, start time, duration, and error details. To view the details of an activity, point to the activity name and select the **View details** symbol (**i**).

### View activity history

The monitoring hub shows up to 100 job history records from the past 30 days. As a result, you might not see the complete list of activity for the full 30-day period, especially for high-frequency jobs. However, you can see the full 30-day history for an individual activity by using the **Historical runs** option.

To view the history of an activity, point to the activity name, select **More options** (**...**), and then select **Historical runs**. The table displays up to 30 days of historical information for that activity. To return to the main display, select **Back to main view**.

:::image type="content" source="media/monitoring-hub/monitoring-hub-historical.png" alt-text="Screenshot of the Monitor hub displaying a table of activity history and a details panel for a selected semantic model job." lightbox="media/monitoring-hub/monitoring-hub-historical.png":::

## Search and filter activities

Use the monitoring hub to display options to find the activities you're interested in. This section describes the monitoring hub controls.

### Change the display order

Change the order of the table's display by selecting each column title. The table sorts according to your selection and the arrow next to the column header indicates the sorting order.

### Configure table columns

Use the **Column options** button to add, remove, and rearrange the columns displayed in the table.

* **Add** - Select a column from the *Column options* list.

* **Remove** - Remove the selection indicator from a column in the *Column options* list.

* **Rearrange** - In the *Column options* list, drag columns to your selected position.

### Search by keyword

Use the keyword search text box to search for specific activities by their activity name. The search is performed on the loaded data, not on all the activities in the database.

### Filter

Use **Filter** to quickly narrow results. Select your options, and then select **Apply**. The monitoring hub remembers your filter selection for the next time you access the hub.

#### Common troubleshooting combinations

When you investigate an issue, use the following filter combinations to quickly find relevant activities:

- **Find failures in the last 24 hours:** `Status = Failed` + `Start time = Last 24 hours`
- **Check one pipeline owner:** `Item type = Pipeline` + `Submitted by = <owner>`
- **Investigate one workspace:** `Location = <workspace>` + `Start time = Customize`

Each time you refresh the table, it loads the most recent 100 jobs in order, according to the filter option. By selecting **load more**, you can load 50 more jobs.

#### Filter options

When you don't select a filter, the monitoring hub displays activities for all statuses, item types, owners, and workspaces. To narrow the displayed results, select one or more options in each filter category.

* **Status** - Select the type of status you want the table to display.

    >[!NOTE]
    >Each Fabric item has a unique set of operations and statuses. To display consistent results, the monitoring hub might show a simplified version of an item's status. You can find the exact status of an item in the [details panel](#view-details).

* **Start time** - Select the time period for the table to display. You can select a predetermined period, or use *Customize* to personalize the time period.

* **Item type** - Select the Fabric item types you want the table to display.

* **Submitted by** - Select the owner of the Fabric item that the table displays activities for.

* **Location** - Select which workspaces to view item activities from.

## Limitations

Dataflow Gen1 isn't supported and isn't displayed in the table.

## Related content

* [Admin overview](microsoft-fabric-admin.md)

* [Browse the Apache Spark applications in the Fabric monitoring hub](../data-engineering/browse-spark-applications-monitoring-hub.md).

* [View refresh history and monitor your dataflows](../data-factory/dataflows-gen2-monitor.md).

* [Feature usage and adoption report](feature-usage-adoption.md).
