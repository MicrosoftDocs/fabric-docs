---
title: Understand Microsoft Fabric roles
description: This article explains the Microsoft Fabric admin roles.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.date: 12/27/2022
---

# Understand Microsoft Fabric roles

To be a Microsoft Fabric admin for your organization, you must be in one of the following roles:

* Power BI administrator

* Power Platform administrator

* Global administrator.

Microsoft 365 user admins assign users to the Power BI administrator or Power Platform administrator roles in the Microsoft 365 admin center, or by using a PowerShell script. For more information, see [Assign roles to user accounts with PowerShell](/office365/enterprise/powershell/assign-roles-to-user-accounts-with-office-365-powershell).

Users in Power BI administrator and Power Platform administrator roles have full control over org-wide Power BI settings and administrative features, except for licensing. Once a user is assigned an administrator role, they can access the [Power BI admin center](service-admin-portal.md). There, they have access to org-wide usage metrics and can control org-wide usage of Power BI features. These admin roles are ideal for users who need access to the Power BI admin center without also granting those users full Microsoft 365 administrative access.

## Assign users to an admin role in the Microsoft 365 admin center

To assign users to an admin role in the Microsoft 365 admin center, follow these steps.

1. In the [Microsoft 365 admin center](https://portal.office.com/adminportal/home#/homepage), select **Users** > **Active Users**.

2. Select the user that you want to assign the role to.

3. Under **Roles**, select **Manage roles**.

4. Expand **Show all by category**, then select **Power BI administrator** or **Power Platform administrator**.

5. Select **Save changes**.

## Assign users to the admin role with PowerShell

You can also assign users to roles by using PowerShell. Users are managed in Azure Active Directory (Azure AD). If you don't already have the Azure AD PowerShell module, [download and install the latest version](https://www.powershellgallery.com/packages/AzureAD/).

1. Connect to Azure AD:
   ```powershell
   Connect-AzureAD
   ```

1. Get the **ObjectId** for the **Power BI administrator** role. You can run [Get-AzureADDirectoryRole](/powershell/module/azuread/get-azureaddirectoryrole) to get the **ObjectId**.

    ```powershell
    Get-AzureADDirectoryRole
    ```
    
    ```output
    ObjectId                             DisplayName                        Description
    --------                             -----------                        -----------
    00f79122-c45d-436d-8d4a-2c0c6ca246bf Power BI Service Administrator     Full access in the Power BI Service.
    250d1222-4bc0-4b4b-8466-5d5765d14af9 Helpdesk Administrator             Helpdesk Administrator has access to perform..
    3ddec257-efdc-423d-9d24-b7cf29e0c86b Directory Synchronization Accounts Directory Synchronization Accounts
    50daa576-896c-4bf3-a84e-1d9d1875c7a7 Company Administrator              Company Administrator role has full access t..
    6a452384-6eb9-4793-8782-f4e7313b4dfd Device Administrators              Device Administrators
    9900b7db-35d9-4e56-a8e3-c5026cac3a11 AdHoc License Administrator        Allows access manage AdHoc license.
    a3631cce-16ce-47a3-bbe1-79b9774a0570 Directory Readers                  Allows access to various read only tasks in ..
    f727e2f3-0829-41a7-8c5c-5af83c37f57b Email Verified User Creator        Allows creation of new email verified users.
    ```

    In this case, the role's **ObjectId** is 00f79122-c45d-436d-8d4a-2c0c6ca246bf.

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
    Add-AzureADDirectoryRoleMember -ObjectId 00f79122-c45d-436d-8d4a-2c0c6ca246bf -RefObjectId 6a2bfca2-98ba-413a-be61-6e4bbb8b8a4c
    ```
To learn more about using PowerShell to assign admin roles, see [AzureAD Directory Roles](/powershell/module/azuread/#directory-roles).

## Next steps

>[!div class="nextstepaction"]
>[Admin overview](admin-overview.md)
