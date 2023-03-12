---
title: What is Microsoft Fabric administration?
description: This article provides an overview of the admin role in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.date: 12/27/2022
---

# What is Microsoft Fabric admin?

Microsoft Fabric admin is the management of the organization-wide settings that control how Microsoft Fabric works. Users that are assigned to admin roles configure, monitor, and provision organizational resources. This article provides an overview of admin roles, tasks, and tools to help you get started.

## Admin roles related to Microsoft Fabric

There are several roles that work together to administer Microsoft Fabric for your organization. Most admin roles are assigned in the Microsoft 365 admin center or by using PowerShell. The capacity admin roles are assigned when the capacity is created. To learn more about each of the admin roles, see [About admin roles](/microsoft-365/admin/add-users/about-admin-roles). To learn how to assign admin roles, see [Assign admin roles](/microsoft-365/admin/add-users/assign-admin-roles).

### Microsoft 365 admin roles

This section lists the Microsoft 365 admin roles and the tasks they can perform.

* **Global admin**
    * Unlimited access to all management features for the organization
    * Assign roles to other users

* **Billing admin**
    * Manage subscriptions
    * Purchase licenses

* **License admin**
    * Assign or remove licenses for users

* **User admin**
    * Create and manage users and groups
    * Reset user passwords

### Power Platform and Microsoft Fabric admin roles

As a Power Platform or a Microsoft Fabric admin, you have full access to all the Microsoft Fabric management tasks.

* **Power Platform admin** or **Microsoft Fabric admin**
    * Enable and disable Power BI features
    * Report on usage and performance
    * Review and manage auditing

### Capacity admin roles

As a Microsoft Fabric capacity admin, you can perform these tasks on the capacity you're an admin of.

* **Capacity admin**
    * Assign workspaces to the capacity
    * Manage user permission to the capacity
    * Manage workloads to configure memory usage

## Admin tasks and tools

Microsoft Fabric admins work mostly in the Microsoft Fabric [admin portal](/power-bi/developer/visuals/create-r-based-power-bi-desktop), but you should still be familiar with related tools and admin centers. To find out which role is required to perform the tasks listed here, cross reference them with the admin roles listed in [Admin roles related to Microsoft Fabric](#admin-roles-related-to-microsoft-fabric).    

* **[Microsoft Fabric admin portal](https://app.powerbi.com/admin-portal)** <!--- Change link to fabric --->
    * Acquire and work with capacities
    * Ensure quality of service
    * Manage workspaces
    * Publish visuals
    * Verify codes used to embed Microsoft Fabric in other applications
    * Troubleshoot data access and other issues

* **[Microsoft 365 admin center](https://admin.microsoft.com)**
    * Manage users and groups
    * Purchase and assign licenses
    * Block users from accessing Microsoft Fabric

* **[Microsoft 365 Security & Microsoft Purview compliance portal](https://protection.office.com)**
    * Review and manage auditing
    * Data classification and tracking
    * Data loss prevention policies
    * Microsoft Purview Data Lifecycle Management

* **[Azure Active Directory in the Azure portal](https://aad.portal.azure.com)**
    * Configure conditional access to Microsoft Fabric resources

* **[PowerShell cmdlets](/powershell/power-bi/overview)**
    * Manage workspaces and other aspects of Microsoft Fabric using scripts

* **[Administrative APIs and SDK](/power-bi/developer/visuals/create-r-based-power-bi-desktop)** <!--- Link to admin REST APIs --->
    * Build custom admin tools.

## Admin center overview

TBD with info from PMs

## Next steps

>[!div class="nextstepaction"]
>[Admin overview](admin-roles.md)
