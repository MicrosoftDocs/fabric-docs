---
title: Compliance settings
description: Learn how to opt out of Microsoft Fabric features that don't meet the Microsoft Fabric security requirements.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 03/29/2023
---

# Compliance settings

Microsoft Fabric security is based on [Power BI security](/power-bi/enterprise/service-admin-power-bi-security). Some features are not fully compliant with Microsoft's security requirements. By default, these features are blocked in Microsoft Fabric. You can decide whether features that don't fully comply with Microsoft Fabric's security requirements, are turned on in your organization.

## Prerequisites

You'll need to be a [Microsoft Fabric admin](admin-overview.md) with one of these admin roles:

* Global admin

* Power Platform admin

* Power BI admin

## Which features are not compliant?

This section lists features that aren't compliant with Microsoft's security resources.

### Private endpoints

[Private endpoints](/power-bi/enterprise/service-security-private-links) - Private endpoints is a feature that provides secure networking for Microsoft Fabric. Some Microsoft Fabric items are not compliant with private endpoints and Microsoft Fabric can't provide secure data traffic for these items. If private endpoints are used in your organization, the items that don't have a secure connection are disabled by default. When you turn the *compliance settings* on, Microsoft Fabric will use unsecure network connections for these items.

The features listed below require private endpoints and will not work unless you turn on the *compliance settings*.  

* Kusto

* Data engineering

* Data science

* Reflex

* SQL database

* EventStream

* Third party access to Onelake

### Customer-managed keys

[Customer-managed keys](power-bi/enterprise/service-encryption-customer-managed-keys) - Customer-managed keys lets you use your own organization's keys for encryption, instead of Microsoft-managed keys. Customer-managed keys are not supported in Microsoft Fabric. Turn on the *compliance settings* if you want to use customer-managed keys in Microsoft Fabric. If you're already using customer-managed keys and the *compliance settings* isn't turned on, Microsoft Fabric will not work as expected.

## How to enable non-compliant features?

As a Microsoft Fabric admin, you can enable non-compliant features. When enabled, non-compliant features will be available for everyone in your organization.

To enable non-compliant features, do the following:

1. Go to [tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings).

2. Turn on the *compliance settings* switch.

## Next steps

>[!div class="nextstepaction"]
>[Admin overview](admin-overview.md)
