---
title: Admin API admin settings
description: Learn how to configure Admin API settings in Fabric.
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

# Admin API tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Service principals can access read-only admin APIs

Web apps registered in Microsoft Entra ID use an assigned service principal to access read-only admin APIs without a signed-in user. To allow an app to use service principal authentication, its service principal must be included in an allowed security group. By including the service principal in the allowed security group, you're giving the service principal read-only access to all the information available through admin APIs (current and future). For example, user names and emails, semantic model, and report detailed metadata.

:::image type="content" source="media/tenant-settings/allow-service-principals-tenant-setting.png" alt-text="Screenshot of allow service principals tenant setting.":::

To learn more, see [Allow service principals to use read-only admin APIs](/power-bi/enterprise/read-only-apis-service-principal-authentication)

## Enhance admin APIs responses with detailed metadata

Users and service principals allowed to call Power BI admin APIs might get detailed metadata about Power BI items. For example, responses from GetScanResult APIs contain the names of semantic model tables and columns.

:::image type="content" source="media/tenant-settings/enhance-admin-apis-metadata-tenant-setting.png" alt-text="Screenshot of enhance admin API response with detailed metadata tenant setting.":::

To learn more, see [Metadata scanning](/power-bi/enterprise/service-admin-metadata-scanning#enabling-enhanced-metadata-scanning).

> [!NOTE]
> For this setting to apply to service principals, make sure the tenant setting **Allow service principals to use read-only admin APIs** is enabled. To learn more, see [Set up metadata scanning](metadata-scanning-setup.md).

## Enhance admin APIs responses with DAX and mashup expressions

Users and service principals eligible to call Power BI admin APIs get detailed metadata about queries and expressions comprising Power BI items. For example, responses from GetScanResult API contain DAX and mashup expressions.

:::image type="content" source="media/tenant-settings/enhance-admin-apis-mashup-tenant-setting.png" alt-text="Screenshot of enhance admin API response with DAX and mashup expressions tenant setting.":::

To learn more, see [Metadata scanning](/power-bi/enterprise/service-admin-metadata-scanning#enabling-enhanced-metadata-scanning).

> [!NOTE]
> For this setting to apply to service principals, make sure the tenant setting **Allow service principals to use read-only admin APIs** is enabled. To learn more, see [Set up metadata scanning](metadata-scanning-setup.md).

## Related content

* [About tenant settings](tenant-settings-index.md)
