---
title: Enable Microsoft Fabric for your organization
description: Learn how to enable Microsoft Fabric for your organization.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.date: 03/12/2023
---

# Enable Microsoft Fabric for your organization

The **Microsoft Fabric** admin switch lets organizations that use Power BI opt into [Microsoft Fabric](/power-bi/developer/visuals/create-r-based-power-bi-desktop). You can enable Microsoft Fabric for the entire organization, a specific capacity, or for a specified group of users.

>[!Tip]
>Microsoft Fabric will be turned on for all Power BI users on 1 July 2023.

## Prerequisites

To enable Microsoft Fabric, you need to have one of the admin roles listed in the table below. The *applicable to* column specifies the scope of the change per admin role.

| **Admin role**                           | **Admin scope**            | **Applicable to**       |
|------------------------------------------|----------------------------|-------------------------|
| Global Administrator                     | Microsoft 365              | The entire organization |
| Billing Administrator                    | Microsoft 365              | The entire organization |
| License Administrator                    | Microsoft 365              | The entire organization |
| User admin                               | Microsoft 365              | The entire organization |
| Power Platform Administrator             | Power Platform             | The entire organization |
| Power BI Administrator                   | Power BI service           | The entire organization |
| Power BI Premium Capacity Administrator  | A single Premium capacity  | A specific capacity     |
| Power BI Embedded Capacity Administrator | A single Embedded capacity | A specific capacity     |

## Enable Microsoft Fabric

Navigate to the [tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings#how-to-get-to-the-tenant-settings) in the admin center, expand **Microsoft Fabric** and enable the switch.

Depending on your admin role, Microsoft Fabric will be available to the entire organization or a specific capacity by default. You can also enable Microsoft Fabric for specific users, by using the *security groups* options. When security groups are enabled, users that don't have access to Microsoft Fabric will have view permissions for Microsoft Fabric items.

## Can I disable Microsoft Fabric?

To disable Microsoft Fabric you can turn off the Microsoft Fabric admin switch. After disabling Microsoft Fabric, users will have view permissions for Microsoft Fabric items. If you disable Microsoft Fabric for a specific capacity while Microsoft Fabric is available in your organization, your selection will only affect that capacity.

## Next steps

>[!div class="nextstepaction"]
>[Admin overview](admin-overview.md)
