---
title: Understand Microsoft Fabric admin roles
description: This article explains the Microsoft Fabric admin roles.
author: msmimart
ms.author: mimart
ms.topic: concept-article
ms.custom:
  - has-azure-ad-ps-ref
  - azure-ad-ref-level-one-done
ms.date: 04/21/2026
ai-usage: ai-assisted
---

# Understand Microsoft Fabric admin roles

Several roles work together to administer Fabric for your organization. Assign most admin roles in the Microsoft 365 admin portal or by using PowerShell. Assign capacity and domain admin roles when you create the corresponding capacity or domain. To learn more about each admin role, see [About admin roles](/microsoft-365/admin/add-users/about-admin-roles). To learn how to assign admin roles, see [Assign admin roles](/microsoft-365/admin/add-users/assign-admin-roles).

## Microsoft 365 admin roles

This section lists the Microsoft 365 admin roles and the tasks they can perform.

* **Global administrator**
  * Unlimited access to all management features for the organization
  * Assign roles to other users

* **Billing administrator**
  * Manage subscriptions
  * Purchase licenses

* **License administrator**
  * Assign or remove licenses for users

* **User administrator**
  * Create and manage users and groups
  * Reset user passwords

## Power Platform and Fabric admin roles

As a Power Platform or a Fabric admin, you have full access to all the Fabric management tasks.

* **Power Platform administrator** or **Fabric administrator**
  * Enable and disable Fabric features
  * Report on usage and performance
  * Review and manage auditing

These roles provide access to the [admin experience in Govern](admin-overview.md#what-is-the-admin-experience-in-govern) and control over organization-wide Fabric settings, usage metrics, and admin features, except for licensing. By assigning users to dedicated Fabric admin roles, organizations can grant the permissions needed to administer Fabric without granting full Microsoft 365 admin rights.

## Capacity admin roles

As a capacity admin, you can perform these tasks on the capacity you're an admin of.

* **Capacity administrator**
  * Assign workspaces to the capacity
  * Manage user permission to the capacity
  * Manage workloads to configure memory usage

## Domain admin roles

Domain administration distributes governance responsibilities to business owners or designated experts for a specific domain. Fabric administrators assign domain admins when they create or edit a domain.

* **Domain admin**
  * View and edit the domains and subdomains they're assigned to
  * Update domain descriptions and images
  * Assign and update domain contributors
  * Associate workspaces with the domain
  * Override tenant settings that a Fabric administrator delegates to the domain

Domain admins can't create or delete top-level domains, rename domains, or add or remove other domain admins. For complete permissions and procedures, see [Domain roles](../governance/domains.md#domain-roles).

## Assign users to Fabric admin roles

Microsoft 365 user admins assign users to the Fabric administrator or Power Platform administrator roles in the Microsoft 365 admin portal, or by using a PowerShell script.

### Microsoft 365 admin portal

To assign users to an admin role in the Microsoft 365 admin portal, follow the instructions in [Add an admin](/microsoft-365/admin/add-users/assign-admin-roles#steps-add-an-admin).

### PowerShell

You can also assign users to roles by using PowerShell. To assign users to an admin role using PowerShell, follow the instructions in [Assign admin roles to Microsoft 365 user accounts with PowerShell](/microsoft-365/enterprise/assign-roles-to-user-accounts-with-microsoft-365-powershell).

## Related content

* [Administration overview](admin-overview.md)
* [What is the admin monitoring workspace?](monitoring-workspace.md)
