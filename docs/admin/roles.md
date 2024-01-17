---
title: Understand Microsoft Fabric admin roles
description: This article explains the Microsoft Fabric admin roles.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
  - has-azure-ad-ps-ref
  - azure-ad-ref-level-one-done
ms.date: 11/02/2023
---

# Understand Microsoft Fabric admin roles

To be a Microsoft Fabric admin for your organization, you must be in one of the following roles:

* Global administrator

* Power Platform administrator

* Fabric administrator

Microsoft 365 user admins assign users to the Fabric administrator or Power Platform administrator roles in the Microsoft 365 admin portal, or by using a PowerShell script. For more information, see [Assign roles to user accounts with PowerShell](/office365/enterprise/powershell/assign-roles-to-user-accounts-with-office-365-powershell).

Users in Fabric administrator and Power Platform administrator roles have full control over org-wide Microsoft Fabric settings and admin features, except for licensing. Once a user is assigned an admin role, they can access the [admin portal](admin-center.md). There, they have access to org-wide usage metrics and can control org-wide usage of Microsoft Fabric features. These admin roles are ideal for users who need access to the Fabric admin portal without also granting those users full Microsoft 365 administrative access.

## Assign users to an admin role in the Microsoft 365 admin portal

To assign users to an admin role in the Microsoft 365 admin portal, follow these steps.

1. In the [Microsoft 365 admin portal](https://portal.office.com/adminportal/home#/homepage), select **Users** > **Active Users**.

2. Select the user that you want to assign the role to.

3. Under **Roles**, select **Manage roles**.

4. Expand **Show all by category**, then select **Fabric administrator** or **Power Platform administrator**.

5. Select **Save changes**.

## Assign users to the admin role with PowerShell

You can also assign users to roles by using PowerShell. Users are managed in Microsoft Graph PowerShell. If you don't already have the Microsoft Graph PowerShell SDK, [download and install the latest version](/powershell/microsoftgraph/installation).

1. Connect to your tenant:

   ```powershell
   Connect-MgGraph -Scopes "RoleManagement.Read.Directory","User.Read.All","RoleManagement.ReadWrite.Directory"
   ```

1. Get the **Id** for the **Fabric administrator** role. You can run [Get-MgDirectoryRole](/powershell/module/microsoft.graph.identity.directorymanagement/get-mgdirectoryrole) to get the **Id**.

    ```powershell
    Get-MgDirectoryRole
    ```

    ```output
    Id                                   DisplayName                                Description
    --------                             -----------                                -----------
    6ebd1a24-c502-446f-94e5-fa2997fd26c3 Fabric Administrator                       Manages all aspects of Microsoft Fabric.
    70fd9723-a627-48ef-8b2c-82c22b65211e SharePoint Administrator                   Can manage all aspects of the SharePoint service.
    727aeffc-89db-4d43-a680-8b36f56b38c5 Windows Update Deployment Administrator    Can create and manage all aspects of Windows Update deployments through the Windows Update for Business deployment service.
    7297504b-c536-41f6-af7c-d742d59b2541 Security Operator                          Creates and manages security events.
    738e1e1e-f7ec-4d99-b6b4-1c190d880b4d Application Administrator                  Can create and manage all aspects of app registrations and enterprise apps.
    782450d2-5aae-468e-a4fb-1103e1be6833 Service Support Administrator              Can read service health information and manage support tickets.
    80f7e906-2e72-4db0-bd50-3b40545685a5 Attribute Assignment Administrator         Assign custom security attribute keys and values to supported Azure AD objects.
    831d152c-42b8-4dc9-826e-42f8419afc9c Partner Tier2 Support                      Do not use - not intended for general use.
    ```

    In this case, the role's **Id** is 6ebd1a24-c502-446f-94e5-fa2997fd26c3.

1. Next, get the user's **Id**. You can find that by running [Get-MgUser](/powershell/module/microsoft.graph.users/get-mguser).

    ```powershell
    Get-MgUser -ConsistencyLevel eventual -Search '"UserPrincipalName:Casey@contoso.com"'
    ```

    ```output
    DisplayName   Id                                   Mail              UserPrincipalName
    -----------   --                                   ----              -----------------
    Casey Jensen  6a2bfca2-98ba-413a-be61-6e4bbb8b8a4c Casey@contoso.com Casey@contoso.com
    ```

1. To add the member to the role, run [New-MgDirectoryRoleMemberByRef](/powershell/module/microsoft.graph.identity.directorymanagement/new-mgdirectoryrolememberbyref).

    ```powershell
    $DirectoryRoleId = "6ebd1a24-c502-446f-94e5-fa2997fd26c3"
    $UserId = "6a2bfca2-98ba-413a-be61-6e4bbb8b8a4c"
    New-MgDirectoryRoleMemberByRef -DirectoryRoleId $DirectoryRoleId `
       -OdataId "https://graph.microsoft.com/v1.0/directoryObjects/$UserId"
    ```

To learn more about using PowerShell to assign admin roles, see [Microsoft.Graph.Identity.DirectoryManagement](/powershell/module/microsoft.graph.identity.directorymanagement/).

## Related content

* [What is the admin portal?](admin-center.md)
* [What is the admin monitoring workspace?](monitoring-workspace.md)
