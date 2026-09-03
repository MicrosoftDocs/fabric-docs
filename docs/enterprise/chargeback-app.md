---
title: What is the Chargeback app?
description: Learn how the Microsoft Fabric Chargeback app shows capacity admins which teams and workloads drive usage, so you can allocate costs based on actual consumption.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: kishanpujara
ms.topic: concept-article
ms.date: 08/04/2026
ai-usage: ai-assisted
#customer intent: As a capacity admin, I want to understand what the Microsoft Fabric Chargeback app does so that I can allocate capacity costs based on actual consumption.
---

# Microsoft Fabric Chargeback app

The Microsoft Fabric Chargeback app is a reporting app that helps you understand which teams, users, and workloads drive capacity usage. Use it to build chargeback processes that allocate costs based on actual consumption instead of flat estimates.

As a capacity admin, you can break down usage across workspaces, items, and domains, and share the report with stakeholders to support transparent, informed cost management.

## Install the Fabric Chargeback app

To install the app, follow the instructions in [Install the Microsoft Fabric Chargeback app](chargeback-app-install.md).

## Visuals

> [!NOTE]
> If a workspace or item isn't associated with any domain or subdomain, its usage is categorized under **No domain** or **No subdomain**.

The report includes the following visuals:

- **Workspace, item, and domain/subdomain** - Shows what percentage of your capacity each workspace, item, or domain/subdomain uses. Select the **Workspace**, **Item**, or **Domain** tab to view your capacity's utilization percentage by workspace, item, or domain/subdomain respectively.
- **Utilization (CU) by date** - Shows your daily utilization.
- **Utilization (CU) details** - A matrix table that shows utilization and user details. Point to the users column to see the breakdown of Utilization (CU) by user.

## Drill through

To see more details, select and hold (or right-click) a workspace or item in the **Workspace, item, and domain/subdomain** visual and drill through. For example, you can drill through to see the utilization of a specific workspace. Drill through to one of three pages:

- **Workspace details** - Shows the utilization of a specific workspace.
- **Item details** - Shows the utilization of a specific item.
- **Domain details** - Shows the utilization of a specific domain or subdomain.

## Data export

To export the report's data, select **Export data**. This action takes you to a page with a matrix visual that shows utilization and user details for all available capacities. Use the slicers to filter the data. Point to the matrix, select **More options**, and then export the data.

To export data for specific columns, select those columns from the **Select columns to add in hierarchy** slicer.

> [!NOTE]
> You might encounter this error during export: "This visual has exceeded the available resources. Try filtering to decrease the amount of data displayed."
>
> To resolve this error, either apply filters to reduce the data volume or avoid expanding multiple capacities to the lower granularity level (such as item name) during export.

## Considerations and limitations

When you use the Microsoft Fabric Chargeback app, be aware of the following considerations and limitations:

- The Fabric Chargeback report data isn't real-time. It refreshes daily. To trigger a refresh manually, go to the workspace where the app is installed.
- If an operation isn't associated with a user, or if a service principal initiates the operation, the report shows the username as "Power BI Service".
- When the [Show user data in the Fabric Capacity Metrics app and reports](../admin/service-admin-portal-audit-usage.md#show-user-data-in-the-microsoft-fabric-capacity-metrics-app-and-reports) setting is disabled, the report shows the username as "Masked user" for nonservice operations, and the user count considers all masked users as a single user.
- Visuals on the **Export** page might fail to render properly when you apply too many drill-downs because of memory limitations in Power BI. To avoid this problem, either apply filters to reduce the data volume or avoid expanding multiple capacities to the lower granularity level (such as item name) during export.
- The semantic model that the Microsoft Fabric Chargeback app uses is supported only for use by the reports provided in the app. Consumption from, usage of, or modification of the semantic model isn't supported.

## Related content

- [Install the Microsoft Fabric Chargeback app](chargeback-app-install.md)
- [Chargeback Azure Reservation costs](/azure/cost-management-billing/reservations/charge-back-usage)
- [View amortized benefit costs](/azure/cost-management-billing/reservations/view-amortized-costs)

