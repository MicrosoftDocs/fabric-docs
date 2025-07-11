---
title: Audit and usage admin settings
description: Learn how to configure Fabric audit and usage admin settings.
author: msmimart
ms.author: mimart
ms.service: fabric
ms.custom:
  - tenant-setting
ms.topic: how-to
ms.date: 05/01/2025
---

# Audit and usage tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Usage metrics for content creators

When this setting is enabled, users in the organization can see usage metrics for dashboards, reports and semantic models that they have appropriate permissions to.

To learn more, see [Monitor usage metrics in the workspaces](/power-bi/collaborate-share/service-modern-usage-metrics).

## Per-user data in usage metrics for content creators

When this setting is enabled, content creator account information (such as user name and email address) will be exposed in the metrics report. If you don't wish to gather this information for all users, you can disable the feature for specified security groups or for an entire organization. Account information for the excluded users then shows in the report as *Unnamed*.

Per-user data is enabled for usage metrics by default. 

## Show user data in the Fabric Capacity Metrics app and reports

When this setting is enabled, active user data, including names and email addresses, is displayed in the [Microsoft Fabric Capacity Metrics app and reports](../enterprise/metrics-app.md). This setting is enabled by default.

## Azure Log Analytics connections for workspace administrators

Power BI integration with [Azure Log Analytics](/power-bi/transform-model/log-analytics/desktop-log-analytics-overview) enables Fabric administrators and Premium workspace owners to connect their Premium workspaces to Azure Log Analytics to monitor the connected workspaces.

When the setting is enabled, administrators and Premium workspace owners can [configure **Azure Log Analytics for Power BI**](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure).

## Workspace admins can turn on monitoring for their workspaces

When this setting is enabled, workspace admins can turn on monitoring for their workspaces. When a workspace admin turns on monitoring, a read-only Eventhouse that includes a KQL database is created. After the Eventhouse and KQL database are added to the workspace, logging is turned on and data is sent to the database.
Enable [workspace monitoring](../fundamentals/workspace-monitoring-overview.md), a feature that allows workspace admins to monitor their workspace.

## Microsoft can store query text to aid in support investigation

When this setting is enabled, Microsoft can store the query text generated when users use Fabric items such as reports and dashboards. This data is sometimes necessary for debugging and resolving complex issues related to the performance and functionality of Fabric Items such as semantic models. The setting is enabled by default.

Storing and retaining query text data can have implications for data security and privacy. While it is recommended to leave the setting on to facilitate support, if there are organizational requirements that don't permit storing query text, or if you wish to opt out of this feature for any other reason, you can turn off the feature as follows:

1. [Go to the tenant settings tab in the admin portal](./about-tenant-settings.md#how-to-get-to-the-tenant-settings).
1. Find the setting **Microsoft can store query text to aid in support investigation**. It is in the Audit and usage section. You can use the search box on the tenant settings tab to help find it.
1. Set the toggle to **Disabled**.

For more information about the diagnostic query text storage feature, see [Diagnostic query text storage](./query-text-storage.md).

## Related content

* [About tenant settings](tenant-settings-index.md)
