---
title: Developer admin settings
description: Learn how to configure developer admin settings in Fabric.
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

# Developer tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

To manage Power BI developer settings, you must be a Global Admin in Office 365, or have been assigned the Fabric administrator role. For more information about the Fabric administrator role, see [Understand Microsoft Fabric admin roles](roles.md).

>[!NOTE]
>The developer settings in the Admin portal are different from and not related to the [developer mode](/power-bi/developer/visuals/environment-setup#set-up-power-bi-service-for-developing-a-visual) setting for debugging visuals.

## Embed content in apps

Users in the organization can embed Power BI dashboards and reports in software as a service (SaaS) applications. Disabling this setting prevents users from being able to use the REST APIs to embed Power BI content within their application.

To learn more, see [What is Power BI embedded analytics?](/power-bi/developer/embedded/embedded-analytics-power-bi).

Learn about the [Embed for your customers](/power-bi/developer/embedded/embedded-analytics-power-bi#embed-for-your-customers) method to build an app that uses non-interactive authentication against Power BI.

## Allow service principals to use Power BI APIs

Web apps registered in Microsoft Entra ID use an assigned [service principal](/power-bi/developer/embedded/pbi-glossary#service-principal) to access Power BI APIs without a signed-in user. To allow an app to use service principal authentication, its service principal must be included in an allowed security group.

You can control who can access service principals by creating dedicated security groups and using these groups in any Power BI tenant level-settings.

To learn more, see [Embed Power BI content with service principal and an application secret](/power-bi/developer/embedded/embed-service-principal).

## Allow service principals to create and use profiles

An app owner with many customers can use service principal profiles as part of a multitenancy solution to enable better customer data isolation and establish tighter security boundaries between customers.

To learn more, see [Service principal profiles for multitenancy apps](/power-bi/developer/embedded/embed-multi-tenancy).

## Block ResourceKey Authentication

For extra security, you can block the use of resource key-based authentication. The Block ResourceKey Authentication setting applies to streaming and PUSH datasets. If disabled, users will not be allowed send data to streaming and PUSH datasets using the API with a resource key.  

This setting applies to the entire organization. You can't apply it only to a select security group.

## Related content

- [About tenant settings](tenant-settings-index.md)
