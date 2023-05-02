---
title: Compliance settings
description: Learn how to opt out of Microsoft Fabric features that don't meet the Microsoft Fabric security requirements.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 05/23/2023
---

# Compliance settings

Microsoft Fabric security is based on [Power BI security](/power-bi/enterprise/service-admin-power-bi-security). Some features aren't fully compliant with Microsoft's security requirements. By default, these features are blocked in Microsoft Fabric. You can decide whether features that don't fully comply with Microsoft Fabric's security requirements, are turned on in your organization.

## Prerequisites

You need to be a [Microsoft Fabric admin](admin-overview.md) with one of these admin roles:

* Global admin

* Power Platform admin

* Power BI admin

## Which features aren't compliant?

[Private endpoints](/power-bi/enterprise/service-security-private-links) is a feature that provides secure networking for Microsoft Fabric. Some Microsoft Fabric items aren't compliant with private endpoints and Microsoft Fabric can't provide secure data traffic for these items. If private endpoints are used in your organization, the items that don't have a secure connection are disabled by default. When you turn the *compliance settings* on, Microsoft Fabric uses unsecure network connections for these items.

The Microsoft Fabric items that belong to these features require private endpoints, and won't work unless you turn on the *compliance settings* switch:  

* Kusto

* Data engineering

* Data science

* Reflex

* SQL database

* EventStream

* Third party access to OneLake

## How to enable noncompliant features?

As a Microsoft Fabric admin, you can enable noncompliant features. When enabled, noncompliant features are available for everyone in your organization.

To enable noncompliant features, do the following:

1. Go to [tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings).

2. Expand *compliance settings*.

3. Turn on the switch titled *Users can work with content that doesn't comply with security requirements*.

    >[!NOTE]
    >When the [Block Public Internet Access](/power-bi/admin/service-admin-portal-advanced-networking) switch is enabled, noncompliant Microsoft Fabric items aren't supported even if you enabled *Users can work with content that doesn't comply with security requirements*.

## Disable noncompliant features

By default, noncompliant Microsoft Fabric items aren't enable. After you enable using these items, you may decide to disable them again. In such cases, the items will still be visible in their workspaces. When users try to open these items they'll get an error message. 

## Next steps

* [What is Microsoft Fabric admin?](admin-overview.md)

* [What is the admin center?](admin-center.md)
