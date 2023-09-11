---
title: Admin API admin settings
description: Learn how to configure Power BI Admin API admin settings.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-admin
ms.custom: tenant-setting
ms.topic: how-to
ms.date: 03/10/2022
LocalizationGroup: Administration
---

# Admin API tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings).

## Allow service principals to use read-only admin APIs

:::image type="content" source="media/tenant-settings/allow-service-principals-tenant-setting.png" alt-text="Screenshot of allow service principals tenant setting.":::

Web apps registered in Azure Active Directory (Azure AD) will use an assigned service principal to access read-only admin APIs without a signed in user. To allow an app to use service principal authentication, its service principal must be included in an allowed security group. By including the service principal in the allowed security group, you're giving the service principal read-only access to all the information available through admin APIs (current and future). For example, user names and emails, dataset and report detailed metadata.

## Enhance admin APIs responses with detailed metadata

:::image type="content" source="media/tenant-settings/enhance-admin-apis-metadata-tenant-setting.png" alt-text="Screenshot of enhance admin API response with detailed metadata tenant setting.":::

Users and service principals allowed to call Power BI admin APIs may get detailed metadata about Power BI items. For example, responses from GetScanResult APIs will contain the names of dataset tables and columns.

Note: For this setting to apply to service principals, make sure the tenant setting allowing service principals to use read-only admin APIs is enabled.

## Enhance admin APIs responses with DAX and mashup expressions

:::image type="content" source="media/tenant-settings/enhance-admin-apis-mashup-tenant-setting.png" alt-text="Screenshot of enhance admin API response with DAX and mashup expressions tenant setting.":::

Users and service principals eligible to call Power BI admin APIs will get detailed metadata about queries and expressions comprising Power BI items. For example, responses from GetScanResult API will contain DAX and mashup expressions.

Note: For this setting to apply to service principals, make sure the tenant setting allowing service principals to use read-only admin APIs is enabled.

## Next steps

* [About tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings)