---
title: Manage Power BI Premium Per-User (PPU)
description: Learn how to manage and understand how to use Power BI Premium Per-User settings in the admin portal.
author: msmimart
ms.author: mimart
ms.reviewer: ''

ms.custom:
  - admin-portal
ms.topic: how-to
ms.date: 11/02/2023
LocalizationGroup: Administration
---

# Manage Power BI Premium Per-User (PPU)

[Power BI Premium Per-User (PPU)](/power-bi/enterprise/service-premium-per-user-faq) is a way to license Power BI Premium features on a per user basis. After the first user is assigned a Power BI Premium Per-User (PPU) license, associated features can be turned on in any workspace. Admins can manage the auto refresh and semantic model workload settings that are shown to users and their default values. For example, access to the XMLA endpoint can be turned off, set to read only, or set to read and write.

## PPU settings

You can configure the following PPU settings in the admin portal on the **Power BI Premium Per-User (PPU)** tab. To learn how to access the Fabric admin portal settings, see [What is the admin portal?](admin-center.md)

   :::image type="content" source="media/service-admin-portal-premium-per-user/premium-per-user-options.png" alt-text="Screenshot of the Power BI Premium Per-User (PPU) settings.":::

### Auto refresh

[Automatic refresh](/power-bi/create-reports/desktop-automatic-page-refresh) enables your active report page to query for new data, during predefined intervals. By default, these settings are turned on. If you turn them off, PPU reports that use automatic refresh and [change detection](/power-bi/create-reports/desktop-automatic-page-refresh#change-detection) don't get updated automatically.

Use the following settings to override the *automatic refresh* settings in individual reports that reside on the PPU capacity. For example, when the *minimum refresh interval* setting is configured to refresh every 30 minutes, if you have a report that's set to refresh every five minutes, its setting will be overridden and the report is refreshed every 30 minutes instead.

* **Minimum refresh interval** - Use to specify a minimum value for the automatic refresh for all the reports in the PPU capacity. The Power BI service overrides any automatic refresh settings that are higher than this setting.

* **Change detection measure** - Use to specify a minimum value for all the reports in the PPU capacity that use [change detection](/power-bi/create-reports/desktop-automatic-page-refresh#change-detection). The Power BI service overrides any change detection settings that are higher than this setting.

### Semantic model workload settings

[XMLA endpoints](/power-bi/enterprise/service-premium-connect-tools) allow Microsoft and third-party apps and tools to connect to Power BI semantic models. Use this setting to determine if in the PPU capacity XMLA endpoints are turned off, or configured for read only or read and write.

## Related content

- [What is the admin portal?](admin-center.md)
- [Power BI Premium Per-User (PPU) FAQ](/power-bi/enterprise/service-premium-per-user-faq)
- [Automatic page refresh in Power BI](/power-bi/create-reports/desktop-automatic-page-refresh)
