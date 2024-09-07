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

:::image type="content" source="./media/admin-monitoring/workspace-overview.png" alt-text="Image shows the landing page of the admin monitoring workspace.":::

## Prerequisites

To set up the admin monitoring workspace, one of the following roles is required:

* [Microsoft 365 global administator](/microsoft-365/admin/add-users/about-admin-roles)

* [Fabric administrator](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

Once set up, admins can share all reports in the workspace with non-admins through a workspace viewer role. Admins can also share individual [reports](/power-bi/collaborate-share/service-share-dashboards) or [semantic models](/power-bi/connect-data/service-datasets-share) with non-admins through links or direct access.

:::image type="content" source="./media/admin-monitoring/share-link.png" alt-text="Image shows how to share reports in the admin monitoring workspace.":::

Only admins can see the admin monitoring workspace at the top of the workspaces menu. Non-admins can access the workspace's contents indirectly by using the _Browse_ or _OneLake data hub_ pages, or by bookmarking the workspace URL.

## Installing the admin monitoring workspace

The admin monitoring workspace is automatically installed the first time an admin accesses it. To trigger the installation of the admin monitoring workspace, follow these steps:

1. Log into Fabric as an admin.

2. From the navigation menu, select **Workspaces**.

:::image type="content" source="./media/admin-monitoring/workspace-menu.png" alt-text="Image shows the admin monitoring workspace listed in the workspaces menu.":::

3. Select **Admin monitoring**. When selected for the first time, the workspace installation will begin automatically and usually completes within a few minutes.

:::image type="content" source="./media/admin-monitoring/workspace-installed.png" alt-text="Image shows the admin monitoring workspace notifcation after being installed.":::
  
4. Reports in the workspace will initially appear as blank until the first data refresh.

:::image type="content" source="./media/admin-monitoring/empty-report.png" alt-text="Image shows a blank report in the workspace before data refresh.":::

5. The first data refresh will begin around 5 minutes after the workspace is installed, and usually completes within a few minutes.

:::image type="content" source="./media/admin-monitoring/data-refresh.png" alt-text="Image shows the first refresh in the workspace.":::

## Reports and semantic models

You can use the reports in the admin monitoring workspace for getting insights about user activity, content sharing, capacity performance, and more in your Fabric tenant. You can also connect to the semantic models in the workspace to create reporting solutions optimized for your organization's needs.

## Refreshes

The semantic models in the workspace are automatically refreshed once per day, around the same time that the workspace was installed for the first time.

:::image type="content" source="./media/admin-monitoring/second-data-refresh.png" alt-text="Image shows a scheduled refresh in the workspace.":::

To maintain the scheduled refresh process, the admin that first accessed the workspace has to:

* Retain their *Global administrator* or *Fabric administrator* role. If the user who first accessed the workspace is no longer an admin, scheduled refreshes in the workspace will fail. This issue can be mitigated by having any other admin log into Fabric, as their credentials will automatically be assigned to all semantic models in the workspace to support any future data refreshes.

* If the admin who first accessed the workspace uses [Privileged Identity Management (PIM)](/entra/id-governance/privileged-identity-management/pim-configure), their PIM access must be active during the time of scheduled data refresh, else the refresh will fail.

## Considerations and limitations

* The admin monitoring workspace can only be set up by a user whose admin role is assigned directly. If the workspace is set up by a user whose admin role is assigned via a group, data refreshes in the workspace fail.

* The admin monitoring workspace is a read-only workspace. [Workspace roles](/power-bi/collaborate-share/service-roles-new-workspaces#workspace-roles) don't have the same capabilities as they do in other workspaces. Workspace users, including admins, aren't able to edit or view properties of items such as semantic models and reports in the workspace.

* Users granted *build* permissions to a semantic model in the admin monitoring workspace show as having *read* permissions.

* [Granular delegated admin privileges (GDAP)](/partner-center/gdap-introduction) aren't supported.

* Once access is provided to the admin monitoring workspace or its underlying content, access cannot be removed without reinitializing the workspace. However, sharing links can be modified as with a typical workspace.

## Reinitializing the workspace

Occasionally, administrators may need to reinitialize the workspace, including to reset access to the workspace or its underlying content.

Admins can execute an API to reinitialize the workspace using the following steps:

1) Retrieve the ID of the admin monitoring workspace from the URL.
   
:::image type="content" source="./media/admin-monitoring/workspace-url.png" alt-text="Image shows how to retrieve the URL for the admin monitoring workspace.":::

2) Execute the below API, first replacing the 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' with the ID of your admin monitoring workspace.
   
`
api.powerbi.com/v1/admin/workspaces/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
`

3) Refresh the page, and the reinitialization of the workspace will begin, similar to the process of the first installation.

:::image type="content" source="./media/admin-monitoring/workspace-installing.png" alt-text="Image shows the admin monitoring workspace being installed.":::

## Related content

* [Admin overview](microsoft-fabric-admin.md)

* [Feature usage and adoption report](feature-usage-adoption.md)
