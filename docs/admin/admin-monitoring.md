---
title: What is the admin monitoring workspace?
description: Understand the Microsoft Fabric monitoring workspace and the reports it holds.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.date: 05/23/2023
---

# What is the admin monitoring workspace?

The *Admin monitoring* workspace is designed to provide admins with monitoring capabilities for their organization. Using the Admin monitoring workspace resources, admins can perform security and governance tasks such as audits and usage checks.

## Prerequisites

Verify that the [new workspace experience](/power-bi/admin/service-admin-portal-workspace#create-workspaces-new-workspace-experience) is enabled.

## Access the admin monitoring workspace

The Admin monitoring workspace is enabled for [Microsoft Fabric admins](admin-overview.md) that have the *Power BI admin* role. Admins can also share its content with other users.

The admin monitoring workspace is automatically installed during the first time any Microsoft Fabric admin accesses it. To access the admin monitoring workspace, follow these steps:

1. Log into Microsoft Fabric with your account.

2. From the left pane, select **Workspaces**.

3. Select **Admin monitoring**. When you select this option for the first time, the required items are automatically installed.

## Reports and datasets

In the monitoring workspace, you can use the [Feature Usage and Adoption](/power-bi/developer/visuals/create-r-based-power-bi-desktop) report as is. You can also connect to this report's dataset, and create a solution that's optimized for your organization.

### Manage access

There are several ways you can manage access to content of the admin monitoring workspace.

* **Workspace** - Learn how to to give users access to the workspace in [manage workspace](../admin/admin-portal-workspaces.md). You can only grant other users a viewer role. Once a viewer role is provided, it can't be taken away.

* **Report** - You can [share a report](/power-bi/connect-data/service-datasets-share) with other users.

* **Dataset** - You can [share access to a dataset](/power-bi/connect-data/service-datasets-share) with other users. Once a dataset is shared, you can't unshare it.

## Next steps

* [Admin overview](admin-overview.md)

* [Feature usage and adoption report](admin-feature-usage-adoption.md)
