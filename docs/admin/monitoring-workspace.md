---
title: What is the admin monitoring workspace?
description: Understand the Microsoft Fabric monitoring workspace and the reports it holds.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.custom:
ms.date: 09/17/2024
---

# What is the admin monitoring workspace? (Preview)

The admin monitoring workspace is a specialized environment designed for Fabric administrators to monitor and manage workloads, usage, and governance within their tenant. Using the resources available within the workspace, admins can perform tasks such as security audits, performance monitoring, capacity management, and more.

## Prerequisites

To set up the admin monitoring workspace, a [Fabric administrator](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles) role is required.

## Installing the admin monitoring workspace

The admin monitoring workspace is automatically installed the first time an admin accesses it. Reports in the workspace appear as blank until the first data refresh. The first data refresh begins around five minutes after the workspace is installed, and usually completes within a few minutes.

To trigger the installation of the admin monitoring workspace, follow these steps:

1. Log into Fabric as an admin.

2. From the navigation menu, select **Workspaces**.

3. Select **Admin monitoring**. When selected for the first time, the workspace installation begins automatically and usually completes within a few minutes.

## Sharing the admin monitoring workspace

Once set up, admins can share all reports in the workspace with users that aren't admins through a workspace viewer role. Admins can also share individual [reports](/power-bi/collaborate-share/service-share-dashboards) or [semantic models](/power-bi/connect-data/service-datasets-share) with users that aren't admins through links or direct access.

Only admins can see the admin monitoring workspace at the top of the workspaces menu. Users that aren't admins can access the workspace's contents indirectly by using the _Browse_ or _OneLake data hub_ pages, or by bookmarking the workspace URL.

## Managing the admin monitoring workspace

By default, the admin monitoring workspace is a Pro-licensed workspace. To take advantage of capacity benefits such as unlimited content sharing for the admin monitoring workspace, follow these steps:

1. Navigate to the **Admin portal**.
   
2. Navigate to the **Workspaces** page in the Admin portal.
   
3. Using the **Name** column filter, search for **Admin monitoring**.
   
4. Select the **Actions** button, then select **Reassign workspace**.
   
5. Select the desired **Workspace type**, then click **Save**.

## Reports and semantic models

You can use the reports in the admin monitoring workspace for getting insights about user activity, content sharing, capacity performance, and more in your Fabric tenant. You can also connect to the semantic models in the workspace to create reporting solutions optimized for your organization's needs.

## Considerations and limitations

* Private links aren't supported.

* Only users whose admin roles are assigned directly can set up the admin monitoring workspace. If the workspace creator's admin role is assigned through a group, data refreshes in the workspace fail.

* The admin monitoring workspace is a read-only workspace. [Workspace roles](/power-bi/collaborate-share/service-roles-new-workspaces#workspace-roles) don't have the same capabilities as they do in other workspaces. Workspace users, including admins, aren't able to edit or view properties of items such as semantic models and reports in the workspace.

* Users with _build_ permissions for a semantic model in the admin monitoring workspace are shown as having _read_ permissions.

* [Granular delegated admin privileges (GDAP)](/partner-center/gdap-introduction) aren't supported.

* Once access is provided to the admin monitoring workspace or its underlying content, access can't be removed without reinitializing the workspace. However, sharing links can be modified as with a typical workspace.

* Semantic models in the admin monitoring workspace are read-only and can't be used with Fabric data agents.

### Refreshes

The semantic models in the workspace are automatically refreshed once per day, around the same time that the workspace was installed for the first time.

To maintain the scheduled refresh process, consider the following limitations:

* If the user who first accessed the workspace is no longer an admin, scheduled refreshes in the workspace fail. This issue can be mitigated by having any other admin log into Fabric, as their credentials will automatically be assigned to all semantic models in the workspace to support any future data refreshes.

* If the admin who first accessed the workspace uses [Privileged Identity Management (PIM)](/entra/id-governance/privileged-identity-management/pim-configure), their PIM access must be active during the time of scheduled data refresh, otherwise the refresh fails.

## Reinitializing the workspace

Occasionally, administrators may need to reinitialize the workspace, including to reset access to the workspace or its underlying content.

Admins can execute an API to reinitialize the workspace using the following steps:

1) Retrieve the ID of the admin monitoring workspace from the URL when viewing the workspace.

2) Execute the semantic model deletion API, first replacing the 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' with the ID of your admin monitoring workspace.
   
    `api.powerbi.com/v1/admin/workspaces/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx -Method Delete`

3) Click the **Workspaces** menu and select **Admin monitoring** to trigger the reinitialization of the workspace, similar to the process of the first installation. On occasion, refreshing the page is also required.

## Related content

* [Admin overview](microsoft-fabric-admin.md)

* [Feature usage and adoption report](feature-usage-adoption.md)
