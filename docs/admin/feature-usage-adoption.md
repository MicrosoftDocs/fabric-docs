---
title: Feature usage and adoption report
description: Learn how to use the Microsoft feature usage and adoption report.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 08/07/2024
---

# Feature Usage and Adoption report (preview)

The Feature Usage and Adoption report provides an in-depth analysis of how different features are utilized and adopted across your Microsoft Fabric tenant.

You can access the report from the [Admin monitoring](monitoring-workspace.md) workspace. To see this workspace, you must be a [Fabric administrator](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles) or [Microsoft 365 global administator]([url](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide)). Conversely, you can have one of these roles share the Adoption report or semantic model directly with you. With build permissions to the semantic model, users can also design a custom report that relies on the same underlying data.

## Navigation

The report is designed for admins to analyze a variety of Fabric usage scenarios. Use the Date range slicer to filter activity data across all pages for a specific range of time over the last 30 days.

:::image type="content" source="./media/admin-monitoring/date-slicer.png" alt-text="Screenshot of the date range slicer on the Adoption report.":::

Additionally, use the filter pane to filter activity data based on the desired analysis. Filters are available across different characteristics of usage, including capacity, user, and item-related info.

:::image type="content" source="./media/admin-monitoring/filter-pane.png" alt-text="Screenshot of the filter pane on the Adoption report.":::
    
## Report pages

The Feature Usage and Adoption report is comprised of five pages:

* **Activity Overview** - Provides a high-level overview of Fabric usage across the organization

* **Analysis** - Visualizes usage across different activity dimensions in a highly flexible format

* **Activity Details** - Shows detailed information on specific activity scenarios

* **Inventory** - Lists all Fabric items in your tenant
 
* **Item Details page** - Shows detailed information on specific inventory usage scenarios

### Activity Overview page

The Activity Overview page helps you identify:

* Daily activities and user trends

* The most active capacities and workspaces

* Activities in your organization by your most or least active users

#### Example

In a large retail organization, you might use the [Activity Overview](#activity-overview-page) page to check which capacities were most utilized at a given month. Using the Date range slicer to filter to the month of December, you notice the *Sales and Marketing* capacity had nearly 1,000 activities while other capacities had under 200. To understand why this is happening, you then go to the [Analysis](#analysis-page) page.

### Analysis page

On the Analysis page, you can view:

* A daily count of activity and users by date

* A decomposition tree to drill down into activity using dimensions such as operation, capacity, user, and more

#### Example

Continuing the example from the [Activity Overview](#activity-overview-page) page, you use the Analysis page to investigate why the *Sales and Marketing* capacity had significantly more activities in December. The decomposition tree reveals the most popular activity was *ViewReport*, which signifies the viewing of a Power BI report. You then drill through to the [Activity Details](#activity-details-page) page to identify which reports were most frequently viewed that month on the *Sales and Marketing* capacity.

To drill through to the [Activity Details](#activity-details-page) page:

1. Right-click the visual element (such as Operation name) you want to drill through from.

2. Select *Drill through*.

3. Select *Activity Details*.

:::image type="content" source="./media/feature-usage-adoption/analysis-drill-through-option.gif" alt-text="Animation that shows how to drill through from the Analysis page to the Activity Details page.":::

### Activity Details page

The Activity Details page shows detailed information on specific usage scenarios. Users can access this page by drilling through from the [Activity Overview](#activity-overview-page) or [Analysis](#analysis-page) pages to display the following activity details:

* **Creation time** - The time the activity was registered

* **Capacity name** - The name of the capacity that the activity took place on

* **Capacity ID** - The ID of the capacity that the activity took place on

* **Workspace name** - The name of the workspace that the activity took place in

* **Workspace ID** - The ID of the workspace that the activity took place in

* **User (UPN)** - The user principal name (UPN) of the user who conducted the activity

* **Operation** - The formal name of the operation

* **Total of activities** - The number of times the activity took place

#### Example

From the [Analysis](#analysis-page) page, you drill through on frequently conducted *ViewReport* actions on the *Sales and Marketing* capacity in December. Using info from the Activity Details page, you discover that a new report titled "Unclosed Deals" was heavily viewed, prompting further investigation to understand the report's impact on your organization's sales strategy.

### Inventory page

The Inventory page displays all items in your Fabric tenant and how they are utilized. You can filter the Inventory page by:

* **Item type** - Including reports, dashboards, lakehouses, notebooks, and more

* **Workspace name** - The name of the workspace where the items are located

* **Activity status** - Indicates whether the item has been recently utilized
    * *Active* - At least one audit log activity was generated related to the item over the last 30 days
    * *Inactive* - No audit log activity was generated related to the item over the last 30 days

#### Example

The Inventory page also includes a decomposition tree visual to breakdown inventory by different factors such as capacity, user, workspace, and more. You can use the decomposition tree to decompose items by activity status; for example, displaying all inactive items by item name so that you can decide whether any of these items can be deleted.

### Item Details page

The Item Details page shows information related to specific inventory usage scenarios.

Users can navigate to the Item Details page by drilling through from the [Inventory](#inventory-page) page. To drill through, right-click a visual element (such as Item type) and then select the Item Details page from the *Drill through* menu.

After drilling through, you see the following information for the selected item types:

* **Capacity ID** - The ID of the capacity that the item is hosted on

* **Workspace ID** - The ID of the workspace that the item is located in

* **Workspace name** - The name of the workspace that the items is located in

* **Item ID** - The unique ID of the item

* **Item name** - The display name of the item

* **Item type** - The type of item such as report, dataset, app, and so on

* **Modified by** - The ID of the user that last modified the item

* **Activity status** - The status of an item whether it is active or inactive based on recent activity

* **Items** - The total number of items

## Measures

| Measure name    | Description |
| -------- | ------- |
| Active capacities  | The number of unique capacities with auditable activity over the last 30 days, or based on the Date slicer and any other filtering. For more information on capacities, see the [Pro and PPU capacities](#pro-and-ppu-capacities) section.   |
| Active users | The number of unique users with auditable activity over the last 30 days, or based on the Date slicer and any other filtering.     |
| Active workspaces    | The number of unique workspaces with auditable activity over the last 30 days, or based on the Date slicer and any other filtering.    |
| Activities  | The number of unique audit activities over the last 30 days, or based on the Date slicer and any other filtering. Used in chart-related visuals.    |
| Items | The count of items displayed, specifically used on the Item Details drill through table. Used in chart-related visuals.     |
| Total activities    | Same as _Activities_, but reverts to 0 if no audit data is displayed; used specifically in card visuals.    |
| Total items    | Same as _Items_, but reverts to 0 if no items are displayed; used specifically in card visuals.    |

## Considerations and limitations

This section lists the report's considerations and limitations.

### Display

* Condensing the zoom slider on a date trend visual to a single day displays a misleading time range, as activities are aggregated by day and not by time.

* Using the *next level in the hierarchy* option on the *Most active Capacities* visual doesn't update the dynamic title.

* Items with the same name, or those deleted and recreated with the same name, may reflect as one item in certain visuals. To count the total number of unique items, use item IDs or the *Total items* measure.

* *NA* represents data that isn't available on an audit event. This can happen when an audit event doesn't have complete information, or when that information isn't applicable for the event.

* The report retains information for 30 days, including the activities and metadata of deleted capacities, workspaces, and other items.
  
### Pro and PPU capacities

Semantic models in *Pro* and *Premium Per User* (PPU) workspaces are hosted on internal logical capacities. The usage of these capacities can be seen in this report and as operations in the audit logs.

  * **Pro logical capacities** - Appear as *Reserved Capacity for Pro Workspaces* with the capacity SKU value *Pro* or *SharedOnPremium*.

  * **Premium Per User logical capacities** - Appear as *Reserved Capacity for Premium Per User Workspaces* with the capacity SKU value *PPU*.

### Counting logic

* All *My workspaces* are counted as separate records as part of the *Active workspaces* total.

## Related content

* [What is the Admin monitoring workspace?](monitoring-workspace.md)

* [Admin overview](microsoft-fabric-admin.md)
