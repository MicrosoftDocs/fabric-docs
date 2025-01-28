---
title: Content sharing report
description: Learn how to use the Microsoft content sharing report.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 08/07/2024
---

# Content sharing report (preview)

The Content sharing report is designed for admins to understand how Fabric items are distributed and shared across their organization. Using insights gained from the report, admins can better govern their tenant and take action on items if needed.

You can access the report from the [Admin monitoring](monitoring-workspace.md) workspace. To access the workspace, you must be a [Fabric administrator](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles) or [Microsoft 365 global administrator](/microsoft-365/admin/add-users/about-admin-roles).

You can also have an admin share the report or semantic model directly with you. With build permissions to the semantic model, users can design a custom report that relies on the same underlying data.

## Navigation

The report is designed for admins to analyze their Fabric inventory in various ways.

Use the slicers pane on the left side of the report to filter inventory on key attributes such as workspace, item type, and capacity. The filters pane on the right side of the report provides more options to further manipulate the data.

To switch pages, use the navigation buttons at the top right of the report. Some buttons enable only after a certain action is taken. For example, the Details page button enables once any visual element is selected, allowing users to drill through for a tabular view of their data. The Workspace page button enables only when a  _Workspace name_ value is selected on a visual.

## Report pages

The report is composed of four pages:

* **Inventory Overview** - Provides a high-level overview of Fabric items across your organization

* **Analysis** - Visualizes inventory across different dimensions in a highly flexible format

* **Workspace** - Shows detailed inventory information for one or multiple workspaces

* **Details** - Lists all Fabric items in a tabular view

### Inventory Overview page

The Inventory Overview page provides a high-level summary of how items are distributed in your organization.

Use the Inventory Overview page to quickly answer questions such as:

* Which workspaces in my tenant have the most items?

* Which Fabric item types are most commonly used in my organization?

* How are my items distributed by endorsement and sensitivity label?

* Is my organization effectively using domains to organize its Fabric inventory?

### Analysis page

On the Analysis page, you're provided with a decomposition tree visual to aggregate and drill into your inventory in a highly flexible format.

Users can decide whether to break down their inventory by total items or total access count by using the toggle at the top of the page. Definitions for these measures are provided in the _Measures_ section.

You can break down either measure across different item-related dimensions - including item type, workspace name, endorsement, and more.

#### Example

In a large organization, the Analysis page can be helpful to quickly analyze item distribution. You can also drill into specific data points for a closer look at item distribution.

To drill into the details of a specific scenario from the decomposition tree visual:

1. Right-click the data point on the decomposition tree visual that you want to drill into.

2. From the *Drill through* menu, select the appropriate page - either the Workspace or Details page - where you'd like to navigate to.

After drilling through, the target page and its visuals will be prefiltered to the specific subset of data selected from the previous page.

### Workspace page

On the Workspace page, you're provided with details on how items within a specific workspace are shared. The Workspace page includes visuals that highlight certain scenarios such as:

* Most shared items by total access count

* Item distribution by endorsement and sensitivity label

* Items shared with the entire organization using links

* Item deleted within the last 30 days

#### Example

To drill into the details of a specific workspace:

1. Right-click any visual that uses the *Workspace name* field, then select the *Workspace* page from the "Drill through" menu.

2. After drilling through, you can see detailed metrics for the selected workspace, with the ability to drill through even further to the *Details* page.

3. Once on the Workspace page, users can select the _Reset filters_ button to reflect visuals for other workspaces or for the entire tenant.

You can only get to the *Workspace* page by drilling through from another page. In the next release, the Workspace page will also be enabled as a summary page for easier access.

### Details page

The Details page provides a table that highlights inventory in a tabular format.

You can only navigate to the *Details* page by drilling through from other pages in the report. To drill through, right-click a value in any visual, then select the *Details* page from the "Drill through" menu. After drilling through to the *Details* page, you can see information for the specific subset of items.

You can export data from the Details page, or any other visual, by clicking _More options_ in the visual header and selecting _Export data_.

## Measures

| Measure name    | Description |
| -------- | ------- |
| Total items  | The number of Fabric items across the entire tenant, or based on the filters you apply.   |
| Total domains | The number of domains across the entire tenant, or based on the filters you apply.     |
| Total capacities    | The number of capacities across the entire tenant, or based on the filters you apply.    |
| Total workspaces  | The number of workspaces across the entire tenant, or based on the filters you apply.    |
| User access count | The number of individual users with access to an item or workspace.    |
| Group access count    | The number of group members with access to an item or workspace. Group owners aren't included, but service principals are (as long as they're a group member). Group access counts are calculated by flattening nested groups, so users are deduped if they're members of multiple groups in a nest.   |
| Total access count    | The number of individual users and group members with access to an item or workspace; the sum of user and access count. Users aren't deduped if they have access to an item or workspace through a group and individual access.   |

Access counts for an item include both direct access through _Manage permissions_, or access inherited through a workspace role. Access counts also include sharing links if created for a specific persons or group.

## Upcoming fixes and enhancements

* To drill through from the Analysis page decomp visual, you must right-click a node and select the desired drill through target page. The page navigation buttons don't always enable even when decomp visual elements are selected.

* In the next release of the report, the Workspace page will always be enabled, and its drill through fields will be extended to other workspace-related fields such as *Workspace type*. The Analysis page will be enabled as a drill through page.

* More fields will be added to the Analysis page decomp visual. 

## Considerations and limitations

This section lists the report's considerations and limitations.

### Display

* Items with the same name, or items deleted and recreated with the same name, may reflect as one item in certain visuals. To count the total number of unique items, use item IDs or the *Total items* measure.

* The report retains information for 30 days, including deleted capacities, workspaces, and other items.

* Workspaces with retention periods longer than 30 days don't appear in the report, but can be seen in the admin portal workspaces menu.

* Inventory created and deleted within a 24 hour period may have incomplete information.

* Reports and dashboards embedded in apps appear twice; use the _Item ID_ value to differentiate.

### Pro and PPU capacities

Semantic models in *Pro* and *Premium Per User* (PPU) workspaces are hosted on internal logical capacities.

  * **Pro logical capacities** - Appear as *Reserved Capacity for Pro Workspaces* with the capacity SKU value *Pro* or *SharedOnPremium*.

  * **Premium Per User logical capacities** - Appear as *Reserved Capacity for Premium Per User Workspaces* with the capacity SKU value *PPU*.

### Counting logic

* All *My workspaces* are counted as separate records as part of the _Total workspaces_ measure.
* Trial Fabric capacities are counted as separate records as part of the _Total capacities_ measure. Trial capacities can be filtered out using the Capacity SKU filter with the value _FT1_.

## Related content

* [What is the Admin monitoring workspace?](monitoring-workspace.md)

* [Admin overview](microsoft-fabric-admin.md)
