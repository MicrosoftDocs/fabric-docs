---
title: Audit and usage admin settings
description: Learn how to configure Power BI audit and usage admin settings.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-admin
ms.custom: tenant-setting
ms.topic: how-to
ms.date: 10/23/2022
LocalizationGroup: Administration
---

# Audit and usage tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings).

## Usage metrics for content creators

When this setting is on, users in the organization can see usage metrics for dashboards, reports, and datasets that they have appropriate permissions for. Learn more about [usage metrics](/power-bi/collaborate-share/service-modern-usage-metrics).

To turn on this setting, go to **Admin portal > Tenant settings > Audit and usage settings** and turn on the **Usage metrics for content creators** setting.

## Per-user data in usage metrics for content creators

Usage metrics for content creators will expose display names and email addresses of users who are accessing content. Learn more about [usage metrics](/power-bi/collaborate-share/service-modern-usage-metrics).

Per-user data is enabled for usage metrics by default, and content creator account information is included in the metrics report. If you do not wish to gather this information for all users, you can disable the feature for specified security groups or for an entire organization. Account information for the excluded users will then show in the report as *Unnamed*.

## Azure Log Analytics connections for workspace administrators

Power BI integration with [Azure Log Analytics](/power-bi/transform-model/log-analytics/desktop-log-analytics-overview) enables [Power BI administrators](/training/modules/power-bi-admin-intro/4-administrator) and Premium Workspace owners to connect their Premium Workspaces to Azure Log Analytics to monitor the connected workspaces. Power BI administrators can enable this feature by going to **Admin Portal > Tenant settings > Audit and usage settings** and turning on the **Azure Log Analytics connections for workspace administrators** setting. When the switch is on, administrators and Premium Workspace owners can [configure **Azure Log Analytics for Power BI**](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure).

## Next steps

* [About tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings)