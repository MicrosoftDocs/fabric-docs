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

:::image type="content" source="media/monitoring-hub/monitoring-hub-table.png" alt-text="Screenshot of Fabric monitoring hub displaying activity history with filter, refresh, and column options visible." lightbox="media/monitoring-hub/monitoring-hub-table.png":::

### Key features

The monitoring hub provides the following features to help you track and investigate your Fabric activities:

- **Current run status:** [Open the monitoring hub](#open-the-monitoring-hub) to track active and recently completed jobs from one place.
- **Historical runs:** [View activity history](#view-activity-history) to investigate failures, compare performance over time, and validate reruns.
- **Activity details and diagnostics:** [View details](#get-activity-details) to inspect status, timing, and error details for faster troubleshooting.
- **Activity filtering and search:** [Use search and filtering](#search-and-filter-activities) to narrow the list to the activities and run windows pertaining to your investigation.
- **Item types:** The monitoring hub displays activities for these Fabric items:

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

To open the monitoring hub in Fabric, select **Monitor** from the navigation pane. The **Monitor** page displays Fabric activities from the past 30 days, ordered by start time with the newest activities at the top. The table shows up to 100 activities per Fabric item.

If you have the appropriate permissions for a Fabric item, you can perform certain actions directly from the monitoring hub. The available actions depend on the item type.

## Get activity details

The details panel provides information about an activity, such as its status, start time, duration, and error details. To view the details of an activity, point to the activity name and select the **View details** symbol (**i**). The details panel opens on the right side of the page.

## View activity history

The **Monitor** page displays up to 100 recent activities from the past 30 days. For high-frequency jobs, this table might not show all activities in that period. To view the complete 30-day history for a specific activity, use the **Historical runs** option.

To view the history of an activity, point to the activity name, select **More options** (**...**), and then select **Historical runs**. The table displays up to 30 days of historical information for that activity. To return to the main display, select **Back to main view**.

:::image type="content" source="media/monitoring-hub/monitoring-hub-historical.png" alt-text="Screenshot of the Monitor hub displaying a table of activity history and a details panel." lightbox="media/monitoring-hub/monitoring-hub-historical.png":::

## Change columns and display order

Use the following controls to find Fabric activities and items or change how they're displayed in the monitoring hub or historical table:

- **Sort** - Select a column header to change the sort order. The arrow next to the column header indicates the sorting order.
- **Change the columns displayed** - Use the **Column Options** button to add, remove, or rearrange columns by dragging them to a different position in the list.

## Search and filter

To find specific activities or items in the monitoring hub, use the following search and filter options:

* **Keyword search** - Use the **Filter by keyword** search box to quickly find activities or items by name or keyword. The search queries only the loaded data, not all the activities in the database.

* **Filter** - Use **Filter** to narrow results by properties like status, start time, and owner. For example, to find failed jobs in a specific workspace from the last 24 hours, select `Status = Failed`, `Location = <workspace>`, and `Start time = Last 24 hours`, and then select **Apply**. The monitoring hub remembers your filter selection for the next time you access the hub. Use the following filter options to customize the displayed results (filter options vary by item type):

   * **Status** - Select the type of status you want the table to display.

      >[!NOTE]
      >Each Fabric item has a unique set of operations and statuses. To display consistent results, the monitoring hub might show a simplified version of an item's status. You can find the exact status of an item in the [details panel](#get-activity-details).

   * **Start time** - Select the time period for the table to display. You can select a predetermined period, or use *Customize* to personalize the time period.

   * **Item type** - Select the Fabric item types you want the table to display.

   * **Submitted by** - Select the owner of the Fabric item that the table displays activities for.

   * **Location** - Select which workspaces to view item activities from.

## Limitations

Dataflow Gen1 isn't supported and isn't displayed in the table.

## Related content

* [Admin overview](microsoft-fabric-admin.md).

* [Browse the Apache Spark applications in the Fabric monitoring hub](../data-engineering/browse-spark-applications-monitoring-hub.md).

* [View refresh history and monitor your dataflows](../data-factory/dataflows-gen2-monitor.md).

* [Feature usage and adoption report](feature-usage-adoption.md).
