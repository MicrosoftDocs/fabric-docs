---
title: Manage Premium Per User
description: Learn how to manage and understand how to use Power BI Premium Per User settings in the admin portal.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-admin
ms.custom:
  - admin-portal
  - ignite-2023
ms.topic: how-to
ms.date: 11/02/2023
LocalizationGroup: Administration
---

# Manage Premium Per User

[Premium Per User (PPU)](/power-bi/enterprise/service-premium-per-user-faq) is a way to license Premium features on a per user basis. After the first user is assigned a PPU license, associated features can be turned on in any workspace. Admins can manage the auto refresh and semantic model workload settings that are shown to users and their default values. For example, access to the XMLA endpoint can be turned off, set to read only, or set to read and write.

## PPU settings

You can configure the following PPU settings in the admin portal on the **Premium Per User** tab. To learn how to access the Fabric admin portal settings, see [What is the admin portal?](admin-center.md)

   :::image type="content" source="media/service-admin-portal-premium-per-user/premium-per-user-options.png" alt-text="Screenshot of the Premium per user settings.":::

### Auto refresh

[Automatic refresh](/power-bi/create-reports/desktop-automatic-page-refresh) enables your active report page to query for new data, during predefined intervals. By default, these settings are turned on. If you turn them off, PPU reports that use automatic refresh and [change detection](/power-bi/create-reports/desktop-automatic-page-refresh#change-detection) don't get updated automatically.

Use the following settings to override the *automatic refresh* settings in individual reports that reside on the PPU capacity. For example, when the *minimum refresh interval* setting is configured to refresh every 30 minutes, if you have a report that's set to refresh every five minutes, its setting will be overridden and the report is refreshed every 30 minutes instead.

* **Minimum refresh interval** - Use to specify a minimum value for the automatic refresh for all the reports in the PPU capacity. The Power BI service overrides any automatic refresh settings that are higher than this setting.

* **Change detection measure** - Use to specify a minimum value for all the reports in the PPU capacity that use [change detection](/power-bi/create-reports/desktop-automatic-page-refresh#change-detection). The Power BI service overrides any change detection settings that are higher than this setting.

### Semantic model workload settings

[XMLA endpoints](/power-bi/enterprise/service-premium-connect-tools) allow Microsoft and third-party apps and tools to connect to Power BI semantic models. Use this setting to determine if in the PPU capacity XMLA endpoints are turned off, or configured for read only or read and write.

## Related content

- [What is the admin portal?](admin-center.md)
- [Power BI Premium Per User FAQ](/power-bi/enterprise/service-premium-per-user-faq)
- [Automatic page refresh in Power BI](/power-bi/create-reports/desktop-automatic-page-refresh)
