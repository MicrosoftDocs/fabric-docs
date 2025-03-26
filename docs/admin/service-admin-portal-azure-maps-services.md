---
title: Azure Maps tenant admin settings
description: Learn how tenant administrators can configure Azure Maps services admin settings in Fabric.
author: sipa
ms.author: sipa
ms.reviewer: ''
ms.custom:
  - tenant-setting
ms.topic: how-to
ms.date: 03/28/2025
LocalizationGroup: Administration
---

# Azure Maps services tenant settings

Azure Maps services and related features are managed through settings in the **Azure Maps services** tenant settings group. There are various settings that govern user access and data processing policies. Some of these settings are enabled by default, while others need to be activated by the Fabric tenant administrator.

For information about how to get to the Fabric tenant settings, see [How to get to the tenant settings](./about-tenant-settings.md#how-to-get-to-the-tenant-settings).

## Users can use Azure Maps services

Enabling this setting allows users to access features powered by Azure Maps. For more information on Azure Maps, see [What is Azure Maps](./azure/azure-maps/about-azure-maps).

:::image type="content" source="./media/service-admin-azure-maps/fabric-azure-maps-enabled.jpg" alt-text="Screenshot showing the tenant setting where Azure Maps services can be enabled and disabled." lightbox="./media/service-admin-azure-maps/fabric-azure-maps-enabled.jpg":::

Default: Enabled

## Data sent to Azure Maps services can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance

This setting is relevant only for customers using Azure Maps services in Fabric, whose capacity's geographic region is outside the EU data boundary and the US.

:::image type="content" source="./media/service-admin-azure-maps/fabric-azure-maps-cross-data-processing-enabled.png" alt-text="Screenshot showing the tenant setting for data processing outside the capacity's region." lightbox="./media/service-admin-azure-maps/fabric-azure-maps-cross-data-processing-enabled.png":::

For more information, see [Geographic Scope of Azure Maps services](https://go.microsoft.com/fwlink/?linkid=2289253).

Default: Disabled

## Related content

- [About tenant settings](about-tenant-settings.md)
