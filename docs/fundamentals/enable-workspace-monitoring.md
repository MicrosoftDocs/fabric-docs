---
title: Enable workspace monitoring
description: Enable workspace monitoring in Microsoft Fabric and create an Eventhouse database to gain insights into the usage and performance of your workspace.
author: SnehaGunda
ms.author: sngun
ms.topic: how-to
ms.date: 09/04/2026
ai-usage: ai-assisted
#customer intent: As a workspace admin I want to enable the workspace monitoring feature in my workspace
---

# Enable monitoring in your workspace

This article explains how to enable [monitoring](../fundamentals/workspace-monitoring-overview.md) in a Microsoft Fabric workspace.

## Prerequisites

To enable workspace monitoring, meet all the following conditions:

* You must have a Power BI Premium or a Fabric capacity.

* The [Workspace admins can turn on monitoring for their workspaces](../admin/service-admin-portal-audit-usage.md#workspace-admins-can-turn-on-monitoring-for-their-workspaces) tenant setting is enabled. To enable the setting, you need to be a Fabric administrator. If you're not a Fabric administrator, ask the Fabric administrator in your organization to enable the setting.

* The [Users can create Fabric items](../admin/fabric-switch.md) tenant setting is enabled for you. If this setting is disabled at the tenant level, workspace admins can't enable workspace monitoring. The **Monitoring** option appears unavailable in **Workspace settings**. You won't see any error, but as the prerequisites aren't met, the monitoring eventhouse database isn't created, and monitoring remains inactive.

* You have the **admin** role in the workspace.

## Enable monitoring

Follow these steps to enable monitoring in your workspace:

1. Go to the workspace you want to enable monitoring for, and select **Workspace settings** (&#9881;).

2. In **Workspace settings**, select **Monitoring**.

3. Select **+Eventhouse** and wait for Fabric to create the database.

## Related content

* [What is workspace monitoring?](../fundamentals/workspace-monitoring-overview.md)
* [Enable Microsoft Fabric for your organization](../admin/fabric-switch.md)
