---
title: Use the Monitor hub
description: Understand the Microsoft Fabric monitor hub and the information it provides.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 01/12/2026
---

# Use the Monitor hub

The Microsoft Fabric *Monitor* hub enables users to monitor Microsoft Fabric activities from a central location. Any Fabric user can use the monitor hub, however, the monitor hub displays activities only for Fabric items you have permission to view.

The monitor hub displays activities for these Fabric items:

* Copy Job
* Dataflow Gen2
* Dataflow Gen2 CI/CD
* Datamart
* DBT Job
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
> For Spark Notebook jobs with jobType "NotebookInteractiveRun," all terminated notebooks display as "Stopped" in the Monitor hub. This is a temporary UI-only change and has the following limitations:
> * The "Stopped" status can't be filtered.
> * Status may be inconsistent between the Monitor hub table, the Public Job Status API, and job events.

## View the monitor hub display

To open the monitor hub, In Fabric, select **Monitoring** from the navigation pane. The monitor hub displays information in a table form. Fabric activities are displayed according to their start time, with the newest activities at the top of the table. Each Fabric item displays a maximum of 100 activities. History is kept for 30 days and can be viewed using the *Historical view* option.

## Interact with the monitor hub

You can use the monitor hub display options to find the activities you're interested in. This section describes the monitor hub controls.

### Change the display order

You can change the order of the table's display by selecting each column title. The table is sorted according to your selection and the arrow next to the column header indicates the sorting order.

### Configure table columns

Use the **Column options** button to add, remove and rearrange the columns displayed in the table.

* **Add** - Select a column from the *Column options* list.

* **Remove** - Remove the selection indicator from a column in the *Column options* list.

* **Rearrange** - In the *Column options* list, drag columns to your selected position.

### Keyword search

Use the keyword search text box to search for specific activities according to their activity name. The search is performed on the loaded data, not on all the activities in the database.

### Filter

Use the **Filter** button to filter the monitor hub table results. You can use a combination of any of the options listed below. Once you selected the options you want to filter for, select **Apply**. The monitor hub remembers your filter selection. If you leave the monitor hub, you'll see your selection when you next go to the hub.

Each time the table is refreshed, the recent 100 jobs are loaded in order, according to the filter option. By selecting *load more* you can load 50 more jobs.

* **Status** - Select the type of status you want the table to display. When no status is selected, item activities for all statuses are displayed.

    >[!NOTE]
    >Each Fabric item has a unique set of operations and statuses. To display consistent results, the monitor hub might show a simplified version of an item's status. The exact status of an item can be found in the [details panel](#view-details).

* **Start time** - Select the time period for the table to display. You can select a predetermined period, or use *Customize* to personalize the time period.

* **Item type** - Select the Fabric item types you want to table to display. When no item type is selected, item activities for all the item types are displayed.

* **Submitted by** - Select the owner of the Fabric item that the table displays activities for. When no owner is selected, activities for all item owners are displayed.

* **Location** - Select which workspaces to view item activities from. When no workspace is selected, item activities from all workspaces are displayed.

### Take action

Providing you have the right permissions for the Fabric item displayed in the monitor hub table, you might be able to perform certain actions. The actions you can take depend on the type of item you're reviewing. To take action, select *More options* (**...**) next to the activity name, and from the menu, select the action you want to take.

#### Historical runs

You can view the history of a single Fabric item using the *Historical runs* option.

Select *More options* (**...**) next to the activity name of the item you're interested in, and from the menu, select *Historical runs*. The table displays up to 30 days of historical information for that item.

To return to the main display, select *Back to main view*.

### View details

To view the details of an activity, hover over its activity name and select the *View detail* symbol (**i**).

## Limitation

Dataflow Gen1 is not supported and isn't displayed in the table.

## Related content

* [Admin overview](microsoft-fabric-admin.md)

* [Browse the Apache Spark applications in the Fabric monitoring hub](../data-engineering/browse-spark-applications-monitoring-hub.md)

* [View refresh history and monitor your dataflows](../data-factory/dataflows-gen2-monitor.md)

* [Feature usage and adoption report](feature-usage-adoption.md)
