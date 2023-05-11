---
title: Compliance settings
description: Learn how to opt out of Microsoft Fabric features that don't meet the Microsoft Fabric security requirements.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.service: azure
ms.date: 05/23/2023
---

# Compliance settings

[!INCLUDE [preview-note](../includes/preview-note.md)]

Microsoft Fabric security is based on [Power BI security](/power-bi/enterprise/service-admin-power-bi-security). Some features aren't fully compliant with Microsoft's security requirements. By default, these features are blocked in Microsoft Fabric.

## Which features aren't compliant?

This section lists the features that aren't compliant with Microsoft Fabric.

### Private endpoints

[Private endpoints](/power-bi/enterprise/service-security-private-links) is a feature that provides secure incoming connections to Microsoft Fabric. Some Microsoft Fabric items aren't compliant with private endpoints and Microsoft Fabric can't provide secure private link traffic for these items.

The Microsoft Fabric items that belong to these features require private endpoints, and don't work unless you turn on the *compliance settings* switch:  

* Real-time Analytics

* Data engineering

* Data science

* Eventstream

* Third party access to OneLake

Part of the process of enabling private endpoints, involves [disabling public access](/power-bi/enterprise/service-security-private-links#disable-public-access-for-power-bi) to  Microsoft Fabric. Public access is disabled using the [Block Public Internet Access](/power-bi/admin/service-admin-portal-advanced-networking) switch. This table shows the impact of private endpoints and the Block Public Internet Access switch, on Microsoft Fabric items.

|Private endpoints  |Block Public Internet Access  |Behavior  |
|---------|---------|---------|
|:::image type="icon" source="../media/yes-icon.svg" border="false":::    |:::image type="icon" source="../media/yes-icon.svg" border="false":::        |Fabric items are disabled. The compliance setting is only applicable for this scenario. If turned on, all Microsoft Fabric items are enabled and items that belong to the noncompliant features might use nonsecure internet connections.         |
|:::image type="icon" source="../media/yes-icon.svg" border="false":::    |:::image type="icon" source="../media/no-icon.svg" border="false":::         |The private endpoints feature doesn't work without enabling the Block Public Internet Access switch. Fabric items remain enabled regardless of whether you turn the compliance setting on or off.         |
|:::image type="icon" source="../media/no-icon.svg" border="false":::     |:::image type="icon" source="../media/yes-icon.svg" border="false":::         |Not a valid scenario. The Block Public Internet Access switch can't be used if you don't enable private endpoints.         |
|:::image type="icon" source="../media/no-icon.svg" border="false":::     |:::image type="icon" source="../media/no-icon.svg" border="false":::         |Fabric items are enabled.         |

## How to enable noncompliant features?

As a Microsoft Fabric admin, you can enable noncompliant features. When you turn the *compliance settings* on, Microsoft Fabric uses unsecure network connections for these items, and noncompliant features are available for everyone in your organization.

You need to be a [Microsoft Fabric admin](microsoft-fabric-admin.md) with one of these admin roles:

* Global admin

* Power Platform admin

* Power BI admin

To enable noncompliant features, follow these steps:

1. Go to [tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings).

2. Expand *compliance settings*.

3. Turn on the switch titled *Users can work with content that doesn't comply with security requirements*.

## Disable noncompliant features

By default, noncompliant Microsoft Fabric items aren't enabled. After you enable using these items, you may decide to disable them again. In such cases, the items will still be visible in their workspaces. When users try to open these items they get an error message, for example *PowerBIFeatureDisabled*.

## Next steps

* [What is Microsoft Fabric admin?](microsoft-fabric-admin.md)

* [What is the admin center?](admin-center.md)
