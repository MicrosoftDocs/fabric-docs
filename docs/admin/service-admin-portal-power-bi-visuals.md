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
ms.date: 12/20/2023
LocalizationGroup: Administration
---

# Power BI visuals tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

All the Power BI visuals admin settings, including Power BI visuals tenant settings, are described in [Manage Power BI visuals admin settings](organizational-visuals.md).

* [Allow visuals created using the Power BI SDK](#allow-visuals-created-using-the-power-bi-sdk)
* [Add and use certified visuals only (block uncertified)](#add-and-use-certified-visuals-only-block-uncertified)
* [Allow downloads from custom visuals](#allow-downloads-from-custom-visuals)
* [Allow custom visuals to get user Microsoft Entra ID access tokens](#allow-custom-visuals-to-get-user-microsoft-entra-id-access-tokens)

## Allow visuals created using the Power BI SDK

Users in the organization can add, view, share, and interact with visuals imported from AppSource or from a file. Visuals allowed in the *Organizational visuals* page aren't affected by this setting.

To learn more, see [Visuals from AppSource or a file](organizational-visuals.md#visuals-from-appsource-or-a-file).

## Add and use certified visuals only (block uncertified)

Users in the organization with permissions to add and use visuals can add and use certified visuals only. Visuals allowed in the *Organizational visuals* page aren't affected by this setting, regardless of certification.

To learn more, see [Certified Power BI visuals](organizational-visuals.md#certified-power-bi-visuals).

## Allow downloads from custom visuals

Enabling this setting lets [custom visuals](/power-bi/developer/visuals/power-bi-custom-visuals) download any information available to the visual (such as summarized data and visual configuration) upon user consent. It's not affected by download restrictions applied in your organization's Export and sharing settings.

To learn more, see [Export data to file](organizational-visuals.md#export-data-to-file).

## Allow custom visuals to get user Microsoft Entra ID access tokens

Enabling this setting lets [custom visuals](/power-bi/developer/visuals/power-bi-custom-visuals) obtain Microsoft Entra ID (formerly known as Azure AD) access tokens for signed-in users, facilitating single sign-on authentication.

To learn more, see [Obtain Microsoft Entra access token](organizational-visuals.md#appsource-custom-visuals-sso).

## Related content

* [About tenant settings](tenant-settings-index.md)
