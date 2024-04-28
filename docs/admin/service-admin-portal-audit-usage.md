---
title: Audit and usage admin settings
description: Learn how to configure Fabric audit and usage admin settings.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-admin
ms.custom:
  - tenant-setting
  - ignite-2023
ms.topic: how-to
ms.date: 11/02/2023
LocalizationGroup: Administration
---

# Audit and usage tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Usage metrics for content creators

When this setting is on, users in the organization can see usage metrics for dashboards, reports, and semantic models for which they have appropriate permissions.

To learn more, see [Monitor usage metrics in the workspaces](/power-bi/collaborate-share/service-modern-usage-metrics).

## Per-user data in usage metrics for content creators

Per-user data is enabled for usage metrics by default. Content creator account information, such as user name and email address, is included in the metrics report. If you don't wish to gather this information for all users, you can disable the feature for specified security groups or for an entire organization. Account information for the excluded users then shows in the report as *Unnamed*.

To learn more, see [Exclude user information from usage metrics reports](/power-bi/collaborate-share/service-modern-usage-metrics#exclude-user-information-from-usage-metrics-reports).

## Azure Log Analytics connections for workspace administrators

Power BI integration with [Azure Log Analytics](/power-bi/transform-model/log-analytics/desktop-log-analytics-overview) enables Fabric administrators and Premium workspace owners to connect their Premium workspaces to Azure Log Analytics to monitor the connected workspaces.

When the switch is on, administrators and Premium workspace owners can [configure **Azure Log Analytics for Power BI**](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure).

## Microsoft can store query text to aid in support investigation

*Query text* refers to the text of the queries/commands (for example, DAX, MDX, TMSL, XMLA, etc.) that Fabric executes when users use Fabric items such as reports and dashboards, as well as external applications such as Excel, SQL Server Management Studio, etc. To improve support and provide more effective troubleshooting, Microsoft might store the query text generated when users use Fabric items such as reports and dashboards. This data is sometimes necessary for debugging and resolving complex issues related to the performance and functionality of Fabric Items such as semantic models.

When this setting is enabled, Microsoft can store the query text generated when users use Fabric items such as reports and dashboards. This data is sometimes necessary for debugging and resolving complex issues related to the performance and functionality of Fabric Items such as semantic models.

## Related content

* [About tenant settings](tenant-settings-index.md)
