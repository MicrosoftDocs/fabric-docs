---
title: Power BI visuals admin settings
description: Learn how to configure Power BI visuals admin settings in Fabric.
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

# Power BI visuals tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

All the Power BI visuals admin settings, including Power BI visuals tenant settings, are described in [Manage Power BI visuals admin settings](organizational-visuals.md).

## Allow visuals created using the Power BI SDK

Users in the organization can add, view, share, and interact with visuals imported from AppSource or from a file. Visuals allowed in the *Organizational visuals* page aren't affected by this setting. 

To learn more, see [Visuals from AppSource or a file](organizational-visuals.md#visuals-from-appsource-or-a-file).

## Add and use certified visuals only (block uncertified)

Users in the organization with permissions to add and use visuals can add and use certified visuals only. Visuals allowed in the *Organizational visuals* page aren't affected by this setting, regardless of certification.

To learn more, see [Certified Power BI visuals](organizational-visuals.md#certified-power-bi-visuals).

## Allow downloads from custom visuals

Enabling this setting lets [custom visuals](/power-bi/developer/visuals/power-bi-custom-visuals) download any information available to the visual (such as summarized data and visual configuration) upon user consent. It's not affected by download restrictions applied in your organization's Export and sharing settings.

To learn more, see [Export data to file](organizational-visuals.md#export-data-to-file).

## Related content

* [About tenant settings](tenant-settings-index.md)
