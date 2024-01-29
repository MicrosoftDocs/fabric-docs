---
title: Use the Monitoring hub
description: Understand the Microsoft Fabric Monitoring hub and the information it provides.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.date: 01/29/2024
---

# Use the Monitoring hub

The Microsoft Fabric *Monitoring hub* enables users to monitor Microsoft Fabric activities from a central location. Any Fabric user can use the monitoring hub, however, the monitoring hub displays activities only for Fabric items you have permission to view.

The monitoring hub displays activities for these Fabric items:

* Data pipelines

* Dataflows

* Datamarts

* Lakehouses

* Notebooks

* Semantic models

* Spark job definitions

## View the monitoring hub display

To open the Monitoring hub, Select **Monitoring hub** from the navigation pane. The monitoring hub displays information in a table form. Fabric activities are displayed according to their start time, with the newest activities at the top of the table. Each Fabric item displays a maximum of 100 activities. History is kept for 30 days and can be viewed using the *Historical view* option.

## Interact with the monitoring hub

You can use the monitoring hub display options to find the activities you're interested in. This section describes the monitoring hub controls.

### Change the display order

You can change the order of the table's display by selecting each column title. The table is sorted according to your selection and the arrow next to the coumn header indicates the sorting order.

### Configure table columns

Use the **Column options** button to add, remove and rearrange the columns displayed in the table.

* **Add** - Select a column from the *Column options* list.

* **Remove** - Remove the selection indicator from a column in the *Column options* list.

* **Rearrange** - In the *Column options* list, drag columns to your selected position.

### Filter

Use the **Filter** button to filter the monitoring hub table results. You can use a combination of any of the options listed below. Once you selected the options you want to filter for, select **Apply**. The monitoring hub remembers your filter selection. If you leave the monitoring hub, you'll see your selection when you next go to the hub.

* **Status** - Select the type of status you want the table to display. When no status is selected, item activities for all statuses are displayed.

    >[!NOTE]
    >Each Fabric item has a unique set of operations and statuses. To display consistent results, the monitoring hub might show a simplified version of an item's status. The exact status of an item, can be found in the [details panel](#view-details).

* **Item type** - Select the Fabric item types you want to table to display. When no item type is selected, item activities for all the item types are displayed.

* **Submitted by** - Select the owner of the Fabric item that the table displays activities for. When no owner is selected, activities for all item owners are displayed.

* **Location** - Select which workspaces to view item activities from. When no workspace is selected, item activities from all workspaces are displayed.

### Take action

Providing you have the right permissions for the Fabric item displayed in the monitoring hub table, you might be able to perform certain actions. The actions you can take depend on the type of item you're reviewing. To take action, select *More options* (**...**) next to the activity name, and from the menu, select the action you want to take.

### View details

To view the details of an activity, hover over it's activity name and select the *View detail* symbol (**i**).

## Limitation

Dataflow Gen1 is not supported and isn't displayed in the table.

## Related content

* [Admin overview](microsoft-fabric-admin.md)

* [Browse the Apache Spark applications in the Fabric monitoring hub](../data-engineering/browse-spark-applications-monitoring-hub.md)

* [View refresh history and monitor your dataflows](../data-factory/dataflows-gen2-monitor.md)

* [Feature usage and adoption report](feature-usage-adoption.md)
