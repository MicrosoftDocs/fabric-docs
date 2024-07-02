---
title: Feature usage and adoption report
description: Learn how to use the Microsoft feature usage and adoption report.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 03/24/2024
---

# Feature Usage and Adoption report (preview)

The Feature Usage and Adoption report provides an in-depth analysis of how different features are utilized and adopted across your Microsoft Fabric tenant.

You can access the report from the [Admin monitoring](monitoring-workspace.md) workspace. To see this workspace, you must be a [Fabric administrator](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles) or have an admin share the report or semantic model directly with you. With build permissions to the semantic model, users can design a custom report that relies on the same underlying data.

## Navigation

The report is designed for admins to analyze a variety of Fabric usage scenarios. Use the Date range slicer to filter activity data across all pages for a specific range of time over the last 30 days.

![image](https://github.com/MicrosoftDocs/fabric-docs-pr/assets/88405519/7813c7e3-12e6-4eda-ab73-b340868e4360)

Additionally, use the filter pane to filter activity data based on the desired analysis. Filters are available across different characteristics of usage - including capacity, user, and item-related info.

![image](https://github.com/MicrosoftDocs/fabric-docs-pr/assets/88405519/a957cbe2-9535-4d4c-b3be-1f96a930ba3d)

## Report pages

The Feature Usage and Adoption report is comprised of five pages:

* **Activity Overview** - Provides a high-level overview of Fabric usage across the organization

* **Analysis** - Visualizes usage across different activity dimensions in a highly-flexible format

* **Activity Details** - Shows detailed information on specific activity scenarios targeted via drill-through

* **Inventory** - Lists all Fabric items in your tenant
 
* **Item Details page** - Shows detailed information on specific inventory usage scenarios targeted via drill-through

### Activity Overview page

![image](https://github.com/MicrosoftDocs/fabric-docs-pr/assets/88405519/0ab75a4f-c705-4000-ac96-83e06aeb3585)

The Activity Overview page helps you identify:

* Daily activities and user trends

* The most active capacities and workspaces

* Activities in your organization by your most or least active users

**Example**: In a large retail organization, you might use the [Activity Overview](#activity-overview-page) page to check which capacities were most utilized in a given month. Using the Date range slicer to filter for the month of December, you notice the *Sales and Marketing* capacity had nearly 1,000 activities, while other capacities had under 200. To understand this disparity, you then proceed to the [Analysis](#analysis-page) page.

### Analysis page

![image](https://github.com/MicrosoftDocs/fabric-docs-pr/assets/88405519/6f3a0fb4-bf7a-4496-8a44-cadd60d85f54)

On the Analysis page, you can view:

* A daily count of activities and users by date

* A decomposition tree to drill down into activity using dimensions such as operation, capacity, user, and more

**Example**: Continuing from the [Activity Overview](#activity-overview-page) page, you use the Analysis page to investigate why the *Sales and Marketing* capacity had significantly more activities in December. The decomposition tree reveals the most popular activity was *ViewReport* - which signifies the viewing of a Power BI report. You then drill through to the [Activity Details](#activity-details-page) page to identify which reports reports were most frequently viewed that month on the *Sales and Marketing* capacity.

To drill through to the [Activity Details](#activity-details-page) page:

1. Right-click the visual element (e.g. Operation name) you want to drill through from

2. Select *Drill through*

3. Select *Activity Details*

:::image type="content" source="./media/feature-usage-adoption/analysis-drill-through-option.gif" alt-text="Image shows how to drill through from the Analysis page to the Activity Details page.":::

### Activity Details page

The Activity Details page shows detailed information on specific usage scenarios targeted via drill through. Users can access this page by drilling through from the [Activity Overview](#activity-overview-page) or [Analysis](#analysis-page) pages to display the following activity details:

* **Creation time** - The time the activity was registered

* **Capacity name** - The name of the capacity that the activity took place on

* **Capacity ID** - The ID of the capacity that the activity took place on

* **Workspace name** - The name of the workspace that the activity took place in

* **Workspace ID** - The ID of the workspace that the activity took place in

* **User (UPN)** - The user principal name (UPN) of the user who conducted the activity

* **Operation** - The formal name of the operation

* **Total of activities** - The number of times the activity was conducted

**Example:** From the [Analysis](#analysis-page) page, you drill through on frequently conducted *ViewReport* actions on the *Sales and Marketing* capacity in December. Using info from the Activity Details page, you discover that a new report titled "Unclosed Deals" was heavily viewed, prompting further investigation to understand the report's impact on your organization's sales strategy.

### Inventory page

![image](https://github.com/MicrosoftDocs/fabric-docs-pr/assets/88405519/65c5db30-a6a2-4068-83e7-e90fefc11557)

The Inventory page displays all items in your Fabric tenant and how they are utilized. You can filter inventory by:

* **Item type** - Including reports, dashboards, lakehouses, notebooks, and more

* **Workspace name** - The name of the workspace where the items are located

* **Activity status** - Indicates whether the item has been recently utilized
    * *Active* - At least one audit log activity was generated related to the item over the last 30 days
    * *Inactive* - No audit log activity was generated related to the item over the last 30 days

The Inventory page also provides a decomposition tree visual to visual inventory by different item characteristics including capacity, user, and workspace-related info.

**Example:** You can use the decomposition tree visual to decompose items by activity status; for example, displaying all inactive items by item name, helping you to decide whether any of these items can be deleted.

### Item Details page

The Item Details page shows information related to specific inventory usage scenarios targeted via drill through.

Users can navigate to the Item Details page by drilling through from the [Inventory](#inventory-page) page. To drill through, right-click a visual element (e.g. Item type) and then select the Item Details page from the *Drill through* menu.

After drilling through, you see the following information for the selected item types:

* **Capacity ID** - The ID of the capacity that the item is hosted on

* **Workspace ID** - The ID of the workspace that the item is located in

* **Workspace name** - The name of the workspace that the items is located in

* **Item ID** - The unique ID of the item

* **Item name** - The display name of the item

* **Item type** - The type of item such as report, dataset, app, etc.

* **Modified by** - The ID of the user that last modified the item

* **Activity status** - The status of an item whether it is active or inactive based on recent activity

* **Items** - The total number of items

## Considerations and limitations

This section lists the report's considerations and limitations.

### Display

* Condensing the zoom slider on a date trend visual to a single day displays a misleading time range, as activities are aggregated by day and not by time.

* Using the *next level in the hierarchy* option on the *Most active Capacities* visual does not update the dynamic title.

* Items with the same name, or those deleted and recreated with the same name, are displayed as one item - so it is important to consider the unique item ID.

* *NA* represents data that isn't available on an audit event. This can happen when an audit event doesn't have complete information, or when that information isn't applicable for the event.

* The report retains audit information for 30 days.

### Counting logic

* All personal workspaces are counted as separate records as part of the *Active workspaces* total.

* Capacities with the same name but different IDs are counted as separate records as part of the *Active capacities* total.

* Activities of deleted capacities, workspaces, or items are retained in the report for 28 days past deletion.

## Related content

* [What is the Admin monitoring workspace?](monitoring-workspace.md)

* [Admin overview](microsoft-fabric-admin.md)
