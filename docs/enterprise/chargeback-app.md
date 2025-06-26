---
title: What is Microsoft Fabric Chargeback app (preview)?
description: Learn how to use the Microsoft Fabric Chargeback app.
author: kishanpujara
ms.author: kishanpujara
ms.reviewer: juliacawthra
ms.topic: conceptual
ms.date: 05/22/2025
---

# Microsoft Fabric Chargeback app (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The Microsoft Fabric Chargeback app helps you understand which teams, users, and workloads are driving capacity usage, enabling you to build chargeback processes that fairly allocate costs based on actual consumption. As a capacity admin, you can view key parameters such as metric types, dates, and operation names, and share the report with others in your organization to support transparent and informed cost management.

## Install the Fabric Chargeback app

To install the app, follow the instructions in [Install the Microsoft Fabric Chargeback app](chargeback-app-install.md).

## Visuals

Understand what the visuals in the report show.

- **Workspace and item** - Shows what percent of your capacity was utilized by either workspaces or items. Select the **Workspace** or **Item** tab to view your capacity's utilization percent by workspace or item.
- **Utilization (CU) by date** - Shows your daily utilization.
- **Utilization (CU) details** - A matrix table that shows utilization and utilization percent.

## Drill through

By right-clicking on a workspace or an item in the *Workspace and item* visual, you can drill through to see more details. For example, you can drill through to see the utilization of a specific workspace. There are two pages you can drill through to:

- **Workspace details** - Shows the utilization of a specific workspace.
- **Item details** - Shows the utilization of a specific item.

## Data export

Export the report's data by selecting **Export data**, which takes you to a page with a matrix visual that displays utilization and user details for all the available capacities. Use slicers to filter out the data. Hover over the matrix and select **More options** to export the data.

> [!NOTE]
> You might encounter this error during export: "This visual has exceeded the available resources. Try filtering to decrease the amount of data displayed."
>
> To resolve this error, either apply filters to reduce the data volume or avoid expanding multiple capacities to the lower granularity level (such as item name) during export

## Considerations and limitations

When using the Microsoft Fabric Chargeback app, be aware of the following considerations and limitations:

- The Fabric Chargeback Report data isn't real-time; it's refreshed daily. Users can manually trigger a refresh by navigating to the workspace where the app is installed.
- If an operation isn't associated with a user, or if the operation is initiated by a service principal, the report displays the username as "Power BI Service".
- When the [Show user data in the Fabric Capacity Metrics app and reports](../admin/service-admin-portal-audit-usage.md#show-user-data-in-the-fabric-capacity-metrics-app-and-reports) setting is disabled, the username is shown as "Masked user" for nonservice operations, and the user count considers all masked users as a single user.
- Visuals on the **Export** page may fail to render properly when too many drill-downs are applied due to memory limitations in Power BI. To avoid this, either apply filters to reduce the data volume or avoid expanding multiple capacities to the lower granularity level (such as item name) during export.
- Editing the semantic model of the Fabric Chargeback app using external model authoring tools isn't supported.

## Related content

- [Install the Microsoft Fabric Chargeback app](chargeback-app-install.md)
- [Chargeback Azure Reservation costs](/azure/cost-management-billing/reservations/charge-back-usage)
- [View amortized benefit costs](/azure/cost-management-billing/reservations/view-amortized-costs)
