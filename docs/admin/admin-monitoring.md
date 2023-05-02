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

The Admin monitoring workspace is enabled for [Microsoft Fabric admins](admin-overview.md) that have one of these admin roles:

* Global admin

* Power Platform admin

* Power BI admin

Admins can also share its content with other users.

The admin monitoring workspace is automatically installed during the first time any Microsoft Fabric admin accesses it. To access the admin monitoring workspace, follow these steps:

1. Log into Microsoft Fabric with your account.

2. From the left pane, select **Workspaces**.

3. Select **Admin monitoring**. When you select this option for the first time, the required items are automatically installed.

## Reports and datasets

In the monitoring workspace, you can use the [Feature Usage and Adoption](/power-bi/developer/visuals/create-r-based-power-bi-desktop) report as is. You can also connect to this report's dataset, and create a solution that's optimized for your organization.

### Sharing

You can share the entire *Admin monitoring* workspace, or a report or dataset in the workspace.

* **Admin monitoring workspace** - When you share the monitoring workspace, the users you share it with are granted a viewer role. Once a viewer role is provided, it can't be taken away.

* **Report or a dataset** - To build on an existing report or dataset, you need to share the report or the dataset. You can manage the permissions for the monitoring reports and datasets at any time.



## Next steps

* [Admin overview](admin-overview.md)

* [Feature usage and adoption report](admin-feature-usage-adoption.md)
