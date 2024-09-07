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

The admin monitoring workspace is a specialized environment designed for Fabric administrators to monitor and manage workloads, usage, and governance within their tenant. Using the resources available within the workspace, admins can perform tasks such as security audits, performance monitoring, capacity management, and more.

:::image type="content" source="./media/admin-monitoring/workspace-overview.png" alt-text="Image shows landing page for the admin monitoring workspace.":::

## Prerequisites

To setup the admin monitoring workspace, one of the following roles is required:

* [Microsoft 365 global administator](/microsoft-365/admin/add-users/about-admin-roles)

* [Fabric administrator](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

Once set up, admins can share the workspace with non-admins using a workspace viewer role to providing access to _all_ reports in the workspace in a read-only format. Admins can also share _individual_ [reports](/power-bi/collaborate-share/service-share-dashboards) or [semantic models](/power-bi/connect-data/service-datasets-share) with non-admins through the links or direct access.

:::image type="content" source="./media/admin-monitoring/share-link.png" alt-text="Image shows how to share reports in the admin monitoring workspace.":::

Only admins can see the admin monitoring workspace at the top of the workspaces menu. Non-admins can access the workspace indirectly through the _Browse_ or _OneLake data hub_ pages, or by bookmarking the workspace URL.

## Installing the admin monitoring workspace

The admin monitoring workspace is automatically installed upon the first time an admin accesses it. To trigger the installation of the admin monitoring workspace, follow these steps:

1. Log into Fabric as an admin.

2. From the navigation menu, select **Workspaces**.

:::image type="content" source="./media/admin-monitoring/workspace-menu.png" alt-text="Image shows the admin monitoring workspace in the workspaces menu.":::

3. Select **Admin monitoring**. When selected for the first time, the workspace installation will begin automatically and usually completes within a few minutes.

:::image type="content" source="./media/admin-monitoring/workspace-installing.png" alt-text="Image shows the admin monitoring workspace being installed.":::
  
4. Reports in the workspace will initially appear as blank until the first data refresh.

:::image type="content" source="./media/admin-monitoring/empty-report.png" alt-text="Image shows a blank report in the workspace before data refresh.":::

5. The first data refresh will begin around 5 minutes after the workspace is installed, and usually completes within a few minutes.

:::image type="content" source="./media/admin-monitoring/data-refresh.png" alt-text="Image shows the first refresh in the workspace.":::

## Reports and semantic models

You can use the reports in the admin monitoring workspace for getting insights about user activity, content sharing, capacity performance, and more in your Fabric tenant. You can also connect to the semantic models in the workspace to create a custom reporting solution that's optimized for your organization.

## Refreshes

The semantic models in the workspace are automatically refreshed once per day, about 10 minutes after the workspace was installed for the first time.

:::image type="content" source="./media/admin-monitoring/second-data-refresh.png" alt-text="Image shows a scheduled refresh in the workspace.":::

For the scheduled refresh to continue working, the admin that accessed the workspace for the first time has to:

* Retain their *Global administrator* or *Fabric administrator* role. If the user who first accessed the workspace is no longer an admin, data refreshes in the workspace will fail. This issue can be mitigated by having any other admin log into Fabric, as their credentials will automatically be assigned to all semantic models in the workspace to maintain any future data refreshes.

* If the admin who first accessed the workspace uses [Privileged Identity Management (PIM)](/entra/id-governance/privileged-identity-management/pim-configure), their PIM access must be active during the time of data refresh, else the refresh will fail.

## Considerations and limitations

* The admin monitoring workspace can only be set up by a user whose admin role is assigned directly. If the workspace is set up by a user whose admin role is assigned via a group, data refreshes in the workspace fail.

* The admin monitoring workspace is a read-only workspace. [Workspace roles](/power-bi/collaborate-share/service-roles-new-workspaces#workspace-roles) don't have the same capabilities as they do in other workspaces. Workspace users, including admins, aren't able to edit or view properties of items such as semantic models and reports in the workspace.

* Users granted *build* permissions to a semantic model in the admin monitoring workspace show as having *read* permissions.

* [Granular delegated admin privileges (GDAP)](/partner-center/gdap-introduction) aren't supported.

* Once access is provided to the workspace or individual content, it cannot be removed without reinitializing the workspace. However, sharing links can be modified as with a typical workspace.

## Reinitializing the workspace

Occasionally, administrators may need to reinitialize the workspace due to transient bugs or to reset access to the workspace or individual content.

To reinitialize the workspace, admins can execute the below API - replacing the 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' with the ID of their respective admin monitoring workspace.

`
api.powerbi.com/v1/admin/workspaces/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
`

## Related content

* [Admin overview](microsoft-fabric-admin.md)

* [Feature usage and adoption report](feature-usage-adoption.md)
