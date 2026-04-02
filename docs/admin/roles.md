---
title: Understand Microsoft Fabric admin roles
description: This article explains the Microsoft Fabric admin roles.
author: msmimart
ms.author: mimart
ms.topic: concept-article
ms.custom:
  - has-azure-ad-ps-ref
  - azure-ad-ref-level-one-done
ms.date: 08/12/2025
---

# Understand Microsoft Fabric admin roles

Microsoft Fabric administration involves managing organization-wide settings that control how Microsoft Fabric operates. To be a Microsoft Fabric admin for an organization, a user must be assigned one of the following roles:

* Power Platform administrator

* Fabric administrator

These roles provide access the [admin portal](admin-center.md) and control over organization-wide Fabric settings, usage metrics, and admin features, except for licensing. See [Microsoft 365 admin roles](/microsoft-365/admin/add-users/about-admin-roles) for details about these roles and the tasks they can perform. Assigning users to dedicated Fabric admin roles allows organizations to grant the permissions needed to administer Fabric without granting full Microsoft 365 admin rights.

## Assign users to Fabric admin roles

Microsoft 365 user admins assign users to the Fabric administrator or Power Platform administrator roles in the Microsoft 365 admin portal, or by using a PowerShell script.

### Microsoft 365 admin portal

To assign users to an admin role in the Microsoft 365 admin portal, follow the instructions in [Add an admin](/microsoft-365/admin/add-users/assign-admin-roles#steps-add-an-admin).

### PowerShell

You can also assign users to roles by using PowerShell. To assign users to an admin role using PowerShell, follow the instructions in [Assign admin roles to Microsoft 365 user accounts with PowerShell](/microsoft-365/enterprise/assign-roles-to-user-accounts-with-microsoft-365-powershell).

## Related content

* [What is the admin portal?](admin-center.md)
* [What is the admin monitoring workspace?](monitoring-workspace.md)
