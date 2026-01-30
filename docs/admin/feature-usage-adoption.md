---
title: Feature usage and adoption report
description: Learn how to use the Microsoft feature usage and adoption report.
author: msmimart
ms.author: mimart
ms.topic: concept-article
ms.custom: sfi-image-nochange
ms.date: 12/17/2025
---

# Feature usage and adoption report (preview)

The Feature Usage and Adoption Report is aimed at admins who want to understand how Fabric features are utilized across the organization. As an admin, the report insights can help you govern your Fabric tenant and take action when needed.

You can access the report from the [Admin monitoring](monitoring-workspace.md) workspace. To access the workspace, you must be a [Fabric administrator](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles).

You can also have an admin share the report or semantic model directly with you. With build permissions to the semantic model, users can design a custom report that relies on the same underlying data.

## Navigation
The report is designed for admins to analyze Fabric activity in various ways. You can filter activity data across all pages using the date range slicer to focus on a specific time period within the last 30 days. Additionally, the filter pane lets you refine your analysis based on capacity, user, item-related information, and other activity characteristics.

The following image shows an example layout. Your view is different based on activity in your tenant.

:::image type="content" source="media/feature-usage-adoption/feature-usage-adoption-report.png" alt-text="Screenshot showing the elements of the Feature Usage and Adoption report in Fabric." lightbox="media/feature-usage-adoption/feature-usage-adoption-report.png":::

The report consists of these main sections:

1. **Pages** - Navigate between report pages using this section. You can also use the tabs in the upper right of the report to move between report pages and details pages.
1. **Filters** - Specify date ranges and apply filters to analyze Fabric activity based on different characteristics.
1. **Report data and visuals** - Analyze Fabric activity across your organization. Right-click visual elements and select **Drill through** to navigate to details pages for deeper insights.

For detailed information and examples of how to use each report page, see the following sections.
   
## Report pages

The report is composed of five pages:

* **Overview** - Provides a high-level overview of Fabric activity across the organization. This page is one of the main entry points to the report.

* **Analysis** - Visualizes activity across different activity dimensions.

* **Activity Details** - Display this page by drilling through from the Overview or Analysis pages. It shows detailed information on specific activity scenarios.

* **Inventory** - Lists all Fabric items in your tenant.
 
* **Item Details page** - Display this page by drilling through from the Inventory page. It shows detailed information on specific inventory usage scenarios.

### Overview page

The Overview page helps you identify:

* Daily activities and user trends

* The most active capacities and workspaces

* Activities in your organization by your most or least active users

#### Example

In a large retail organization, you might use the [Overview](#overview-page) page to check which capacities were most utilized in a given month. You use the date range slicer to filter to the month of December. You notice the *Sales and Marketing* capacity had nearly 1,000 activities while other capacities had under 200. To understand why, you then go to the [Analysis](#analysis-page) page.

### Analysis page

On the Analysis page, you can view:

* A daily count of activity and users by date

* A decomposition tree to drill down into activity using dimensions such as operation, capacity, user, and more

#### Example

Continuing the example from the [Overview](#overview-page) page, you use the Analysis page to investigate why the *Sales and Marketing* capacity had more activity in December than all other capacities. The decomposition tree reveals the most popular activity on the *Sales and Marketing* capacity was *ViewReport*, which signifies the viewing of a Power BI report. You then drill through to the [Activity Details](#activity-details-page) page to identify which reports were most frequently viewed that month on the *Sales and Marketing* capacity.

To drill through to the [Activity Details](#activity-details-page) page:

1. Right-click the visual element (such as Operation name) you want to drill through from.

2. Select *Drill through*.

3. Select *Activity Details*.

### Activity Details page

The Activity Details page shows detailed information on specific activity scenarios. Users can access this page by drilling through from the [Overview](#overview-page) or [Analysis](#analysis-page) pages to display the following activity details:

* **Creation time** - The time the activity was registered

* **Capacity name** - The name of the capacity that the activity took place on

* **Capacity ID** - The ID of the capacity that the activity took place on

* **Workspace name** - The name of the workspace that the activity took place in

* **Workspace ID** - The ID of the workspace that the activity took place in

* **User (UPN)** - The user principal name of the user who conducted the activity

* **Operation** - The formal name of the operation

* **Total of activities** - The number of times the activity took place

#### Example
From the [Analysis](#analysis-page) page, you drill through on frequently conducted *ViewReport* actions on the *Sales and Marketing* capacity in December. Using info from the Activity Details page, you discover that a new report titled "Unclosed Deals" was heavily viewed, prompting further investigation to understand the report's relevance to your organization's sales strategy.

### Inventory page

The Inventory page displays all items in your Fabric tenant and how they're utilized. You can filter the Inventory page by:

* **Item type** - Including reports, dashboards, lakehouses, notebooks, and more

* **Workspace name** - The name of the workspace where the items are located

* **Activity status** - Indicates whether the item was recently utilized
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

* **Workspace name** - The name of the workspace that the item is located in

* **Item ID** - The unique ID of the item

* **Item name** - The display name of the item

* **Item type** - The type of item such as report, dataset, app, and so on

* **Modified by** - The ID of the user that last modified the item

* **Activity status** - The status of an item whether it's active or inactive based on recent activity

* **Items** - The total number of items

## Measures

The following measures are used in visuals throughout the report and are also available in the semantic model.

Measure calculations consider filter context, so measure values change as you apply filters or interact with other visuals.

| Measure name    | Description |
| -------- | ------- |
| Active capacities  | The number of capacities with audit activity.   |
| Active users | The number of users who generated audit activity.     |
| Active workspaces    | The number of workspaces with audit activity.    |
| Activities  | The number of audit activities generated.    |
| Items | The count of items displayed.    |
| Total activities    | The number of audit activities generated. Reflected as 0 when no audit data is returned; used exclusively in card visuals.    |
| Total items    | The count of items displayed. Reflected as 0 when no items are returned; used exclusively in card visuals.    |

## Considerations and limitations

This section lists the report's considerations and limitations.

### Display

* Condensing the zoom slider on a date trend visual to a single day displays a misleading time range, as activities aggregate by day and not by time.

* Using the *next level in the hierarchy* option on the *Most active Capacities* visual doesn't update the dynamic visual title.

* Items with the same name, or items deleted and recreated with the same name, might reflect as one item in certain visuals. To count the total number of unique items, use item identifiers or the *Total items* measure.

* *Info Not Available* represents data that isn't available. Data might not be available when an audit event doesn't have complete information, or when that information isn't applicable for the event.

* The report reflects your tenant's audit activity on a rolling 30 day basis, along with the latest snapshot of your tenant's inventory.

* Deleted inventory (including workspaces with extended retention) doesn't appear in the report after 28 days post deletion. They can be seen in the admin portal until they're permanently deleted.

* Items created and deleted within a 24 hour period could have incomplete information.
  
### Pro and Premium Per User (PPU)

Semantic models in *Pro* and *Premium Per User* (PPU) workspaces are hosted on internal logical capacities. The usage of these capacities can be seen in this report.

  * **Pro** - Appear as *Reserved Capacity for Pro Workspaces* with the capacity SKU value *Pro*.

  * **PPU** - Appear as *Reserved Capacity for Premium Per User Workspaces* with the capacity SKU value *PPU*.

### Counting logic

* All *My workspaces* are counted as separate records as part of the *Active workspaces* measure.

### Model limitations

* The semantic model is read-only and can't be used with Fabric data agents.

## Related content

* [What is the Admin monitoring workspace?](monitoring-workspace.md)

* [Admin overview](microsoft-fabric-admin.md)
