---
title: Fabric chargeback report
description: Learn how to use the Microsoft fabric chargeback report.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.date: 04/04/2024
---

# Fabric chargeback report (preview)

The Fabric chargeback report lets you see how your capacities are used. You can view parameters such as metric types, dates, and operation names. As a Fabric admin, you can share this report with others in your organization. You can also share the report's semantic model, and use it to customize the report, or build a new report that relies on the same data.

You can access the report from the [admin monitoring](monitoring-workspace.md) workspace. To see this workspace you need to be a [Fabric administrator](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles).

## View the chargeback report

Access the report from the [admin monitoring](monitoring-workspace.md) workspace. To see this workspace you need to be a [Fabric administrator](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles).

* **Utilization** - The time it takes an activity or action to complete. Utilization is measured as Capacity Units (CU) processing time in seconds.

* **Item names** - Items with same name can be present across capacities and workspaces if they have unique Item IDs.

## Report pages

The Fabric chargeback report has five pages:

* **Chargeback** - A bird's eye view of utilization details for capacities, workspaces and items across a tenant.

* **Workspace Details** - Detailed analysis of a specific workspace.

* **Item Details** - Detailed analysis of a specific item.

* **Export Data** - Use to export data from the report.

### Chargeback page

In the Chargeback page, you can see utilization details of your capacities, workspaces and items. 

**$$$$$$** The term utilization % shows the ratio of utilization for selected scope or item to the tenant level utilization.

#### Slicers

The following slicers are provided at the top of the chargeback page:

* Capacity name
* Date range
* Top N
* Item kind
* Operation name 
* Billing type
* Virtualized item

_Reset filter_ feature is also included at the top right of page to clear all the slicers.

TopN slicer is used to select number of values that is to be shown out to users in supported visuals.

In addition to the filters mentioned earlier, there are three slicers available in the filter pane.

* Item Id
* Workspace Id
* Virtualized workspace
* Workload kind

#### Cards

After the Slicers section, the KPIs (Key Performance Indicators) are displayed using card visuals.

* **Capacity**: Total number of capacities

* **Workspaces**: Total number of workspaces

* **Items**: Total number of Items

#### Matrix For Utilization (CU) details
The following matrix table shows utilization and utilization %, which can be visualized over Month, Week, and Day using given buttons and according to the slicers available at the top of page expect Top N slicer. Drill-down up to Billing type is available. Hovering over user column field will showcase activities of each user associated with capacity:

* **Utilization (CU)**: This is a metric value based on CPU processing time in seconds utilized by the selected Item for processing.

* **Utilization (CU) %**: Ratio of Utilization for selected scope or Item and the total Utilization of the tenant in percentage.

* **Users**: This is number of distinct users associated with consumption for Item. Hovering over this field will showcase user level distribution of activities.

* **Users %**: Percentage ratio of distinct users associated with consumption for Item and total distinct users for selected scope.

#### Utilization (CU) by date
This stack column chart shows the daily usage of the utilization by date slicer.

#### Top N workspaces/Items by utilization (CU) %
The workspace name and utilization % are shown in this table according to the workspace and Item selections in the top bar slicers. Below that, there is a "Explore" option to explore more details about workspaces and Items.

If users want to observe how a certain workspace is being used, then they need to select that workspace and hit Explore button.

### Drill Through Page - Workspace Details
This drill-through page provides additional information for a workspace that was used to drill-through. Over the page a filter for drill-through workspace name is pre-applied.

#### Slicers
The following slicers are provided at the top of the page:

* Item name
* Date range
* Top N
* Item kind
* Operation name
* Billing type
* Workload kind
* Virtualized item

_Reset filter_ feature is also included to clear all the slicers.

TopN slicer is used to select number of values that is to be shown out to users in supported visuals

In addition to the filters mentioned earlier, there are two slicers available in the filter pane.

* Capacity name
* Virtualized workspace

#### Cards
* **Items**: Total number of items.

* **Utilization (CU)**: This is a metric value based on CU processing time in seconds used by workspace (Items within the workspace).

* **Utilization (CU) %**: Ratio of Utilization for selected scope and the total Utilization within the tenant in precentage.

* **Workspace Name**: Workspace used to drill-through.

#### Top N Items by utilization (CU) % and date
Utilization for the Top N Item names are displayed in this line chart by date.

#### Top N Items by utilization (CU) %
The following Bar Chart displays the Top N Items by utilization % for various Item kind as legends. select an item to be able to explore more details using button available at bottom right corner of visual.

#### Utilization (CU) details by Items
The following matrix table shows utilization and utilization %, which can be visualized over Month, Week, and Day using given buttons and according to the slicers available at the top of page expect Top N slicer. Drill-down up to Billing type is available. Hovering over user column field will showcase activities of each user associated with Item:

* **Utilization (CU)**: This is a metric value based on CU processing time in seconds utilized by the selected Item for processing.

* **Utilization (CU) %**: Ratio of Utilization for selected scope or Item and the total Utilization of the Workspace used in percentage.

* **Users**: This is number of distinct users associated with consumption for Item. Hovering over this field will showcase user level distribution of activities.

* **Users %**: Percentage ratio of distinct users associated with consumption for Item and total distinct users for selected scope and workspace.

### Drill Through Page - Item Details

This drill-through page provides additional information for a workspace that was used to drill-through. Over the page a filter for drill-through workspace name is pre-applied.

#### Slicers
The following slicers are provided at the top of the page:

* Capacity name
* Date range
* Item kind
* Operation name
* Billing type
* Workload kind
* Virtualized item

In addition to the filters mentioned earlier, there is one more slicer available in the filter pane.

* Virtualized workspace
_Reset filter_ feature is also included to clear all the slicers.

#### Cards
* **Items**: Total number of Items.
* **Utilization (CU)**: This is a metric value based on CU processing time in seconds used by Item.
* **Utilization (CU) %**: Ratio of Utilization for selected scope and the total Utilization within the tenant in percentage.
* **Item Name**: Item used to drill-through.

#### Item by utilization (CU) % and date
Utilization for the Item names are displayed in this line chart by date.

#### Item by utilization (CU) %
The following Bar Chart displays the Item by utilization % for various Item kind as legends.

#### Utilization (CU) details by Items
The following matrix table shows utilization and utilization %, which can be visualized over Month, Week, and Day using given buttons and according to the item kind, operation name and Billing type. Hovering over user column field will showcase activities of each user associated with Item:

* **Utilization**: This is a metric value based on CU processing time in seconds utilized by the selected Item for processing.

* **Utilization %**: Ratio of Utilization for selected scope and the total Utilization of the tenant by Item in precentage.

* **Users**: This is number of distinct users associated with consumption for Item.

* **Users %**: Percentage ratio of distinct users associated with consumption for Item and total distinct users for selected scope and Item.

### Export Data

By clicking the Export Data button available at the top right corner of chargeback page, the user can export the data from the table visual.

#### Slicers
The following slicers are provided at the top of the Export Data page:

* Capacity name
* Date range
* Operation name 
* Billing type
* Workspace name
* Workspace Id
* Virtualized item
_Reset filter_ feature is also included to clear all the slicers.

In addition to the filters mentioned earlier, there are two slicers available in the filter pane.

* Virtualized workspace
* Workload kind
#### Cards
After the Slicers section, the KPIs (Key Performance Indicators) are displayed using card visuals.

* **Capacity**: Total number of capacities.

* **Workspaces**: Total number of workspaces.

* **Items**: Total number of Items.

#### Exporting data
Use the option to export data from the table visual to export all or selected filtered data from the export page.

## Considerations and limitations

To avoid hitting the "Memory limit error" when exporting data, please avoid expanding multiple capacities to the item name level simultaneously. Alternatively, you can minimize the displayed data by using filters from the slicer found in the top row of the page.


## Related content

* [What is the admin monitoring workspace?](monitoring-workspace.md)

* [Admin overview](microsoft-fabric-admin.md)


