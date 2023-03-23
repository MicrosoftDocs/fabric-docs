---
title: Enable Microsoft Fabric for your organization
description: Learn how to enable Microsoft Fabric for your organization.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.date: 03/12/2023
---

# Enable Microsoft Fabric for your organization

The *Microsoft Fabric* admin switch lets organizations that use Power BI opt into [Microsoft Fabric](/power-bi/developer/visuals/create-r-based-power-bi-desktop).

You can enable Microsoft Fabric for:

* **The entire organization** - Use this option to be an early adopter of Microsoft Fabric.

* **A specific capacity** - Use this option if you want advanced users in a specific capacity to try out Microsoft Fabric.

* **A specified group of users** - Use this option if you want a select number of advanced users to try out Microsoft Fabric.

>[!Tip]
>Microsoft Fabric will be turned on for all Power BI users on 1 July 2023.

## Prerequisites

To enable Microsoft Fabric, you need to have one of the following admin roles:

* [Microsoft 365 Global admin](admin-overview#microsoft-365-admin-roles)

* [Power Platform admin](admin-overview#power-platform-and-microsoft-fabric-admin-roles)

* [Power BI admin](/power-bi/admin/service-admin-administering-power-bi-in-your-organization#administrator-roles-related-to-power-bi) (similar to [Microsoft Fabric admin](admin-overview#power-platform-and-microsoft-fabric-admin-roles))

## Enable Microsoft Fabric

Navigate to the [tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings#how-to-get-to-the-tenant-settings) in the admin portal, expand **Microsoft Fabric** and enable the switch.

Depending on your admin role, Microsoft Fabric will be available to the entire organization or a specific capacity by default. You can also enable Microsoft Fabric for specific users, by using the *security groups* options. When security groups are enabled, users that don't have access to Microsoft Fabric will have view permissions for Microsoft Fabric items.

## Can I disable Microsoft Fabric?

To disable Microsoft Fabric you can turn off the Microsoft Fabric admin switch. After disabling Microsoft Fabric, users will have view permissions for Microsoft Fabric items. If you disable Microsoft Fabric for a specific capacity while Microsoft Fabric is available in your organization, your selection will only affect that capacity.

## Next steps

>[!div class="nextstepaction"]
>[Admin overview](admin-overview.md)
