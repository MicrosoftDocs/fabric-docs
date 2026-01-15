---
title: Content sharing report
description: Learn how to use the Microsoft content sharing report.
author: msmimart
ms.author: mimart
ms.topic: concept-article
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 08/07/2024
---

# Content sharing report (preview)

The *content sharing* report is aimed at admins who want to understand how Fabric items are distributed and shared across the organization. As an admin, the report insights can help you govern your Fabric tenant and take action if needed.

You can access the report from the [Admin monitoring](monitoring-workspace.md) workspace. To access the workspace, you must be a [Fabric administrator](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles) or a [Microsoft 365 global administrator](/microsoft-365/admin/add-users/about-admin-roles).

You can also have an admin share the report or semantic model directly with you. With build permissions to the semantic model, users can design a custom report that relies on the same underlying data.

## Navigation

The report is designed for admins to analyze their Fabric inventory in various ways.

Use the slicers pane on the left side of the report to filter inventory on key attributes such as workspace, item type, and capacity. The filters pane on the right side of the report provides more options to further manipulate the data.

To switch pages, use the navigation buttons at the top right of the report.

## Report pages

The report is composed of four pages:

* **Inventory Overview** - Provides a high-level overview of Fabric items across your organization

* **Analysis** - Visualizes inventory across different dimensions

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

On the Analysis page, you're provided with a decomposition tree visual to aggregate and drill into your inventory.

Using the toggle at the bottom left of the page, you can decide whether to break down your inventory by total items or by total access count. Definitions for these measures are provided in the [Measures](#measures) section.

You can then break down either measure across different item-related dimensions, including item type, workspace name, endorsement, and more.

The Analysis page can be accessed directly using the page navigation buttons, or by drilling through from other pages in the report.

#### Example

In a large organization, the Analysis page can be helpful for analyzing item distribution. You can also drill into specific data points for a closer look at item distribution.

To drill into the details of a specific scenario from the decomposition tree visual:

1. With the *Analyze by* toggle set to *Total items*, you select the following dimensions: *Capacity name*, *Workspace name*, and *Item type*.

2. Right-click the data point on the decomposition tree visual that you want to drill into.

3. From the *Drill through* menu, select the Workspace or Details page.

After you drill through, the target page and its visuals are prefiltered to the subset of data selected from the Analysis page.

### Workspace page

On the Workspace page, you're provided with details on how items within a specific workspace are shared. The Workspace page includes visuals that highlight certain scenarios such as:

* Most shared items by total access count

* Item distribution by endorsement and sensitivity label

* Items shared with the entire organization using links

* Item deleted within the last 28 days

#### Example

To drill into the details of a specific workspace:

1. Right-click any visual that uses the *Workspace name* field, then select the *Workspace* page from the *Drill through* menu.

2. After drilling through, you can see detailed metrics for the selected workspace, with the ability to drill through even further to the *Details* page.

3. Once on the Workspace page, users can select attributes from the available slicers or the filters pane to further manipulate the data.

In addition to drilling through, users can also access the *Workspace* page directly using the page navigation buttons.

### Details page

The Details page highlights item distribution in a tabular format.

You can also navigate to the *Details* page by drilling through from other pages in the report. To drill through, right-click a value in any visual, then select the *Details* page from the *Drill through* menu. After drilling through to the *Details* page, you can see information for the specific subset of items.

You can export data from the Details page, or any other visual, by clicking _More options_ in the visual header and selecting _Export data_.

You can also navigate directly to an item or its workspace using the hyperlinks in the data table.

> [!NOTE]
> Workspaces can only be accessed if you have a valid workspace role, else you're redirected to your *My workspace*. Item urls currently only support legacy Power BI items and some Fabric items.

## Measures

The following measures are used in visuals throughout the *content sharing* report and are also available in the semantic model.

| Measure name    | Description |
| -------- | ------- |
| Total items  | The number of Fabric items across the entire tenant.   |
| Total domains | The number of domains with items.     |
| Total capacities    | The number of capacities with items.    |
| Total workspaces  | The number of workspaces with items.    |
| User access count | The number of individual users and service principals with access to an item.    |
| Group access count    | The number of group members and service principals with access to an item. Group owners aren't included in *group access counts*. Group access counts are calculated by flattening membership of all nested groups, so users aren't double counted if they're members of multiple groups in a nest. *Group access counts* also include +1 for each nested group in a nest. |
| Total access count    | The number of individual users, service principals, and group members with access to an item. *Total access counts* for workspaces, capacities, and domains are a sum of access counts for all underlying items, not the container itself. *Total access counts* include both individual access to an item and access through a group, so users are double counted if they have access to an item in both scenarios.   |

> [!NOTE]
> Access counts include access to an item through _Manage permissions_, or access inherited through a workspace role. Access counts include service principals and sharing links for a specific persons or group. Access counts include permissions to an item through a related item, such as permissions to a semantic model through org app access.

## Considerations and limitations

This section lists the report's considerations and limitations.

### Display

* Items with the same name, or items deleted and recreated with the same name, might reflect as one item in certain visuals. To count the total number of unique items, use item IDs or the *Total items* measure.

* The report retains information for 28 days, including deleted capacities, workspaces, and other items.

* Deleted workspaces with extended retention don't appear in the report after 28 days. They can be seen in the admin portal until they're permanently deleted.

* Items created and deleted within a 24 hour period may have incomplete information.

* Reports and dashboards embedded in apps appear twice. Use the _Item ID_ value to differentiate.

### Pro and Premium Per User (PPU)

Semantic models in *Pro* and *Premium Per User* (PPU) workspaces are hosted on internal logical capacities.

  * **Pro** - Appear as *Reserved Capacity for Pro Workspaces* with the capacity SKU value *Pro*.

  * **PPU** - Appear as *Reserved Capacity for Premium Per User Workspaces* with the capacity SKU value *PPU*.

### Counting logic

* All *My workspaces* are counted as separate records as part of the _Total workspaces_ measure.
* Trial Fabric capacities are counted as separate records as part of the _Total capacities_ measure. Trial capacities can be filtered out using the Capacity SKU filter with the value _FT1_.

### Model limitations

* The semantic model is read-only and can't be used with Fabric data agents.

## Related content

* [What is the Admin monitoring workspace?](monitoring-workspace.md)

* [Admin overview](microsoft-fabric-admin.md)
