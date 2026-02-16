---
title: What is the Microsoft Fabric admin portal?
description: This article provides an overview of the admin Microsoft Fabric admin portal.
author: msmimart
ms.author: mimart
ms.topic: concept-article
ms.custom:
ms.date: 10/30/2025
---

# What is the admin portal?

The Microsoft Fabric admin portal includes settings that govern Microsoft Fabric. For example, you can make changes to [tenant settings](tenant-settings-index.md), access the Microsoft 365 admin portal, and control how users interact with Microsoft Fabric.

To access the admin portal, you need a [Fabric license](../enterprise/licenses.md#per-user-licenses) and the *Fabric administrator* role. 

If you're not in one of these roles, you only see *Capacity settings* in the admin portal.

## What can I do in the admin portal

The many controls in the admin portal are listed in the following table, with links to relevant documentation for each one.

| Feature | Description  |
| :---    | :---         |
| [Tenant settings](tenant-settings-index.md) | Enable, disable, and configure Microsoft Fabric. |
| [Users](service-admin-portal-users.md) | Manage users in the Microsoft 365 admin portal. |
| [Power BI Premium Per-User (PPU)](service-admin-portal-premium-per-user.md) | Configure auto refresh and semantic model workload settings. |
| [Audit logs](service-admin-portal-audit-logs.md) | Audit Microsoft Fabric activities in the Microsoft Purview portal. |
| [Domains](/fabric/governance/domains) | Manage and organize business data using custom domains in Fabric. |
| [Workloads](/fabric/fundamentals/fabric-home#create-items-and-explore-workloads) | Manage workloads and their settings. |
| [Tags](/fabric/governance/tags-overview) | Manage tags for organizing content. |
| [Capacity settings](capacity-settings.md) | Manage Microsoft Fabric F, Power BI Premium P, and Power BI Embedded EM and A capacities. |
| [Refresh summary](service-admin-portal-refresh-summary.md) | Schedule refresh on a capacity and view the details of refreshes that occurred. |
| [Embed codes](service-admin-portal-embed-codes.md) | View and manage the embed codes that have been generated for your organization to share reports publicly. |
| [Organizational visuals](organizational-visuals.md#organizational-visuals) | View, add, and manage which type of Power BI visuals users can access across the organization. |
| [Organizational themes (preview)](/power-bi/create-reports/desktop-organizational-themes) | Manage and distribute custom report themes across the organization. |
| [Azure connections](service-admin-portal-azure-connections.md) | Configure and manage connections to Azure resources. |
| [Workspaces](portal-workspaces.md) | View and manage the workspaces that exist in your organization. |
| [Custom branding](service-admin-custom-branding.md) |  Change the look and feel of the Microsoft Fabric to match your organization's own branding. |
| [Fabric identities](fabric-identities-manage.md) | Govern the Fabric identities that exist in your organization. |
| [Featured content](service-admin-portal-featured-content.md) |  Manage the reports, dashboards, and apps that were promoted to the Featured section on your Home page. |

## How to get to the admin portal

To get to the admin portal, follow these steps:

1. Sign in to [Microsoft Fabric](https://app.fabric.microsoft.com/?pbi_source=learn-admin-admin-center) using your admin account credentials.

2. Select the **Settings** (gear) icon, and then select **Admin portal**.

    :::image type="content" source="./media/admin-center/admin-portal-option-settings-menu.png" alt-text="Screenshot showing Admin portal option on the Fabric settings menu.":::

## Related content

* Microsoft Fabric is currently available in [Azure public cloud regions](https://azure.microsoft.com/explore/global-infrastructure/geographies/). For more information, see [Fabric region availability](region-availability.md).
* [What is the admin monitoring workspace?](monitoring-workspace.md)
* [Workspace tenant settings](portal-workspace.md).
* [Manage workspaces](portal-workspaces.md).
