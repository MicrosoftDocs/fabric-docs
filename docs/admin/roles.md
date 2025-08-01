---
title: Understand Microsoft Fabric admin roles
description: This article explains the Microsoft Fabric admin roles.
author: msmimart
ms.author: mimart
ms.topic: conceptual
ms.custom:
  - has-azure-ad-ps-ref
  - azure-ad-ref-level-one-done
ms.date: 02/27/2025
---

# Understand Microsoft Fabric admin roles

To be a Microsoft Fabric admin for your organization, you must be in one of the following roles:

* Power Platform administrator

* Fabric administrator

Microsoft 365 user admins assign users to the Fabric administrator or Power Platform administrator roles in the Microsoft 365 admin portal, or by using a PowerShell script. For more information, see [Assign roles to user accounts with PowerShell](/office365/enterprise/powershell/assign-roles-to-user-accounts-with-office-365-powershell).

Users in Fabric administrator and Power Platform administrator roles have full control over org-wide Microsoft Fabric settings and admin features, except for licensing. Once a user is assigned an admin role, they can access the [admin portal](admin-center.md). There, they have access to org-wide usage metrics and can control org-wide usage of Microsoft Fabric features. These admin roles are ideal for users who need access to the Fabric admin portal without also granting those users full Microsoft 365 administrative access.

## Assign users to an admin role in the Microsoft 365 admin portal

To assign users to an admin role in the Microsoft 365 admin portal, follow the instructions in [Add an admin](/microsoft-365/admin/add-users/assign-admin-roles#steps-add-an-admin).

## Assign users to the admin role with PowerShell

You can also assign users to roles by using PowerShell. To assign users to an admin role using PowerShell, follow the instructions in [Assign admin roles to Microsoft 365 user accounts with PowerShell](/microsoft-365/enterprise/assign-roles-to-user-accounts-with-microsoft-365-powershell).

## Related content

* [What is the admin portal?](admin-center.md)
* [What is the admin monitoring workspace?](monitoring-workspace.md)
