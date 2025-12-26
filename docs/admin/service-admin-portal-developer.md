---
title: Developer admin settings
description: Learn how to configure developer admin settings in Fabric.
author: msmimart
ms.author: mimart
ms.reviewer: ''

ms.custom:
  - tenant-setting
ms.topic: how-to
ms.date: 05/08/2025
LocalizationGroup: Administration
---

# Developer tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

To manage Power BI developer settings, you must be a Fabric administrator. For more information about the Fabric administrator role, see [Understand Microsoft Fabric admin roles](roles.md).

>[!NOTE]
>The developer settings in the Admin portal are different from and not related to the [developer mode](/power-bi/developer/visuals/environment-setup#set-up-power-bi-service-for-developing-a-visual) setting for debugging visuals.

## Embed content in apps

Users in the organization can embed Power BI dashboards and reports in software as a service (SaaS) applications. Disabling this setting prevents users from being able to use the REST APIs to embed Power BI content within their application.

To learn more, see [What is Power BI embedded analytics?](/power-bi/developer/embedded/embedded-analytics-power-bi).

Learn about the [Embed for your customers](/power-bi/developer/embedded/embedded-analytics-power-bi#embed-for-your-customers) method to build an app that uses non-interactive authentication against Power BI.

## Service principals can use Fabric APIs

>[!NOTE]
>This setting is being rolled out and might not be available in your tenant. Once removed, these settings will replace it:
>* [Service principals can create workspaces, connections, and deployment pipelines](#service-principals-can-create-workspaces-connections-and-deployment-pipelines)
>* [Service principals can call Fabric public APIs](#service-principals-can-call-fabric-public-apis)

Web apps registered in Microsoft Entra ID use an assigned [service principal](/power-bi/developer/embedded/pbi-glossary#service-principal) to access Power BI APIs without a signed-in user. To allow an app to use service principal authentication, its service principal must be included in an allowed security group.

## Service principals can create workspaces, connections, and deployment pipelines

Use a [service principal](/power-bi/developer/embedded/pbi-glossary#service-principal) to access these Fabric APIs that aren't protected by a Fabric permission model.

* [Create Workspace](/rest/api/fabric/core/workspaces/create-workspace)

* [Create Connection](/rest/api/fabric/core/connections/create-connection)

* [Create Deployment Pipeline](/rest/api/fabric/core/deployment-pipelines/create-deployment-pipeline)

To allow an app to use service principal authentication, its service principal must be included in an allowed security group. You can control who can access service principals by creating dedicated security groups and using these groups in other tenant settings.

This setting is disabled by default for new customers.

## Service principals can call Fabric public APIs

Use a [service principal](/power-bi/developer/embedded/pbi-glossary#service-principal) to access Fabric public APIs that include create, read, update, and delete (CRUD) operations, and are protected by a Fabric permission model.

To allow an app to use service principal authentication, its service principal must be included in an allowed security group. You can control who can access service principals by creating dedicated security groups and using these groups in other tenant settings.

This setting is enabled by default for new customers.

## Allow service principals to create and use profiles

An app owner with many customers can use service principal profiles as part of a multitenancy solution to enable better customer data isolation and establish tighter security boundaries between customers.

To learn more, see [Service principal profiles for multitenancy apps](/power-bi/developer/embedded/embed-multi-tenancy).

## Block ResourceKey Authentication

For extra security, you can block the use of resource key-based authentication. The Block ResourceKey Authentication setting applies to streaming and PUSH datasets. If disabled, users will not be allowed send data to streaming and PUSH datasets using the API with a resource key.  

This setting applies to the entire organization. You can't apply it only to a select security group.

## Related content

- [About tenant settings](tenant-settings-index.md)
