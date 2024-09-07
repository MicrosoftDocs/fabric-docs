---
title: What is the admin monitoring workspace?
description: Understand the Microsoft Fabric monitoring workspace and the reports it holds.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/18/2024
---

# What is the admin monitoring workspace? (Preview)

The admin monitoring workspace is a specialized environment designed for Fabric administrators to monitor and manage Fabric workloads, usage, and governance within their tenant. Using the resources availabile within the workspace, admins can perform tasks such as audits, performance monitoring, capacity management, and more.

## Prerequisites

To setup the admin monitoring workspace, one of the following roles is required:

* [Microsoft 365 global administator](/microsoft-365/admin/add-users/about-admin-roles)

* [Fabric administrator](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

Once set up, admins can share the workspace with other non-admins through a workspace viewer role, providing access to _all_ of the workspace's reports in a read-only format. Admins can also share _individual_ [reports](/power-bi/collaborate-share/service-share-dashboards) or [semantic models](/power-bi/connect-data/service-datasets-share) within the workspace through the use of links or direct access.

Only admins can see the admin monitoring workspace at the top of workspaces menu. Non-admins can either access the workspace indirectly through the _Browse_ or _OneLake data hub_ pages, or by bookmarking the workspace URL.

## Installing the Admin monitoring workspace

The admin monitoring workspace is automatically installed the first time an admin accesses it. To trigger the installation of the admin monitoring workspace, follow these steps:

1. Log into Microsoft Fabric as an admin.

2. From the navigation menu, select **Workspaces**.

3. Select **Admin monitoring**. When selected for the first time, the workspace installation will begin automatically and usually completes after a few minutes.
  
4. Reports in the workspace will initially appear as blank until the first automated data refresh is completed, which begins around 5 minutes after the workspace is installed.

:::image type="content" source="./media/monitoring-workspace/install-admin-monitoring-workspace.gif" alt-text="Image shows process of installing and opening the admin monitoring workspace.":::

## Reports and semantic models

You can use the reports in the admin monitoring workspace for getting insights about performance and sharing in your organization. You can also connect to the semantic models of the reports to create a custom solution that's optimized for your organization.

## Refreshes

The Admin monitoring workspace is automatically refreshed once a day, about 10 minutes after the workspace was accessed for the first time.

For the refresh to continue working, the admin that accessed the workspace for the first time has to:

* Retain their *Global administrator* or *Fabric administrator* role. If the user who who first accessed the workspace is no longer an admin, the admin monitoring workspace will fail. This issue can be mitigated by having any other admin log into Fabric, as their credentials will automatically be assigned to all semantic models in the workspace in order to preserve any future data refreshes.

* If the admin who first accessed the workspace uses [Privileged Identity Management (PIM)](/entra/id-governance/privileged-identity-management/pim-configure), their PIM access must be enabled during the time of data refresh, else the refresh will fail.

## Considerations and limitations

* The admin monitoring workspace can only be set up by an admin whose admin role is assigned directly. If the workspace is set up by an admin whose admin role is assigned via a group, data refreshes in the workspace fail.

* The admin monitoring workspace is a read-only workspace. [Workspace roles](/power-bi/collaborate-share/service-roles-new-workspaces#workspace-roles) don't have the same capabilities as they do in other workspaces. Users, including admins, aren't able to edit or view properties of items such as semantic models and reports in the workspace.

* Users granted *build* permissions to a semantic model in the admin monitoring workspace show as having *read* permissions.

* [Granular delegated admin privileges (GDAP)](/partner-center/gdap-introduction) aren't supported.

* Once a viewer role to the workspace, or direct access to a report or semantic model is provided, it cannot be removed without reinitializing the workspace. Sharing links can be adjusted as in a typical workspace.

## Deleting the workspace

## Related content

* [Admin overview](microsoft-fabric-admin.md)

* [Feature usage and adoption report](feature-usage-adoption.md)
