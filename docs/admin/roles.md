---
title: Understand Microsoft Fabric admin roles
description: This article explains the Microsoft Fabric admin roles.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
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

You can also assign users to roles by using PowerShell. Users are managed in Microsoft Entra ID. If you don't already have the Azure AD PowerShell module, [download and install the latest version](https://www.powershellgallery.com/packages/AzureAD/).

1. Connect to Microsoft Entra ID:
   ```powershell
   Connect-AzureAD
   ```

1. Get the **ObjectId** for the **Fabric administrator** role. You can run [Get-AzureADDirectoryRole](/powershell/module/azuread/get-azureaddirectoryrole) to get the **ObjectId**.

    ```powershell
    Get-AzureADDirectoryRole
    ```
    
    ```output
    ObjectId                             DisplayName                                Description
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

    In this case, the role's **ObjectId** is 6ebd1a24-c502-446f-94e5-fa2997fd26c3.

1. Next, get the user's **ObjectId**. You can find that by running [Get-AzureADUser](/powershell/module/azuread/get-azureaduser).

    ```powershell
    Get-AzureADUser -ObjectId 'tim@contoso.com'
    ```
    
    ```output
    ObjectId                             DisplayName UserPrincipalName      UserType
    --------                             ----------- -----------------      --------
    6a2bfca2-98ba-413a-be61-6e4bbb8b8a4c Tim         tim@contoso.com        Member
    ```

1. To add the member to the role, run [Add-AzureADDirectoryRoleMember](/powershell/module/azuread/add-azureaddirectoryrolemember).

    | Parameter | Description |
    | --- | --- |
    | ObjectId |The Role ObjectId. |
    | RefObjectId |The members ObjectId. |

    ```powershell
    Add-AzureADDirectoryRoleMember -ObjectId 6ebd1a24-c502-446f-94e5-fa2997fd26c3 -RefObjectId 6a2bfca2-98ba-413a-be61-6e4bbb8b8a4c
    ```
To learn more about using PowerShell to assign admin roles, see [AzureAD Directory Roles](/powershell/module/azuread/#directory-roles).

## Related content

* [What is the admin portal?](admin-center.md)
* [What is the admin monitoring workspace?](monitoring-workspace.md)
