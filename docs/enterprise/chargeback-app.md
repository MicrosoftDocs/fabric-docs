---
title: What is Microsoft Fabric Chargeback app (preview)?
description: Learn how to use the Microsoft fabric Fabric Chargeback app .
author: BalajiShewale
ms.author: BalajiShewale
ms.topic: concept
ms.date: 05/15/2025
---

# Microsoft Fabric chargeback app (preview)

The Microsoft Fabric Chargeback app helps you understand which teams, users, and workloads are driving capacity usage, enabling you to build chargeback processes that fairly allocate costs based on actual consumption. As a capacity admin, you can view key parameters such as metric types, dates, and operation names, and share the report with others in your organization to support transparent and informed cost management.

Utilization is the time it takes an activity or action to complete. Utilization is measured as Capacity Units (CU) processing time in seconds.

## Install the chargeback app

To install the app, follow the instructions in [Install the Microsoft Fabric Chargeback app](/docs/enterprise/chargeback-app-install.md).

### Visuals

Understand what the visuals in the report show.

* **Workspace and item** - Shows what percent of your capacity was utilized by either workspaces or items. Select the *Workspace* or *Item* tab to view your capacity's utilization percent by workspace or item.

* **Utilization (CU) by date** - Shows your daily utilization.

* **Utilization (CU) details** - A matrix table that shows utilization and utilization percent.

### Drill through

By right-clicking on a workspace or an item in the *Workspace and item* visual, you can drill through to see more details. For example, you can drill through to see the utilization of a specific workspace. There are two pages you can drill through to:

* **Workspace details** - Shows the utilization of a specific workspace.

* **Item details** - Shows the utilization of a specific item.

### Export Data

User can export the report's data by selecting Export Data. Selecting Export Data takes you to a page with a matrix visual that displays utilization and user details for all the available capacities. They can use slicers to filter out the data. Hover over the matrix and select 'more options' to export the data.

> **Note:**
> You might encounter this error during export: "This visual has exceeded the available resources. Try filtering to decrease the amount of data displayed."
> To resolve this, either apply filters to reduce the data volume or avoid expanding multiple capacities to the lower granularity level (such as Item name) during export

## Considerations and limitations

When using the Microsoft Fabric Chargeback app, consider the following considerations and limitations:

* The Fabric Chargeback Report data is not real-time; it is refreshed daily. Users can manually trigger a refresh by navigating to the workspace where the app is installed.
  
*  If an operation is not associated with a user, or if the operation is initiated by a service principal, the report will display the username as "Power BI Service".
  
*  When the [Show user data in the Fabric Capacity Metrics app and reports](/docs/admin/service-admin-portal-audit-usage.md#show-user-data-in-the-fabric-capacity-metrics-app-and-reports) setting is disabled, the username will be shown as 'Masked user' for non-service operations, and the user count will consider all masked users as a single user.
  
* Visuals on the Export page may fail to render properly when too many drill-downs are applied due to memory limitations in Power BI. To avoid this, either apply filters to reduce the data volume or avoid expanding multiple capacities to the lower granularity level (such as Item name) during export.

* Editing the semantic model of the Fabric Chargeback app using external model authoring tools is not supported.

## Related content

* [Install the Microsoft Fabric Chargeback app](/docs/enterprise/chargeback-app-install.md)
  
* [Chargeback Azure Reservation costs](../azure-docs/articles/cost-management-billing/reservations/charge-back-usage.md)
  
* [View amortized benefit costs](../azure-docs/articles/cost-management-billing/reservations/view-amortized-costs.md)
