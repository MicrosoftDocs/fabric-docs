---
title: CTA
description: An article
author: KesemSharabi
ms.author: kesharab
ms.topic: article
ms.date: 02/10/2025
---

# Cross tenant access (preview)

>[!IMPORTANT]
>Cross tenant access is a private preview feature. To participate in the preview, contact your Microsoft representative.

Cross tenant access allows third parties, also known as gusts, to access data hosted on a provider's Microsoft Fabric tenant. Guests give concent for providers to manage their data, and use cross tenant access to get to it. This feature is useful for organizations that need to access data that is managed by a service provider. For example, when company A manages Fabric data for company B, company B can use cross tenant access to access their data in company A's Fabric tenant.

This article is aimed at gusts who want to set up cross tenant access.

## How it works

Cross tenant access allows guest tenants to access data stored in a provider's data warehouse. When the provider enables principals from the guest tenant to use this feature, Fabric creates corresponding [service principals](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) for each guest in the provider's tenant. The provider then grants permission’s on the warehouse to these service principals. Guests with permissions can access data warehouse endpoints using their own Entra ID identity credentials with tools such as SQL Server Management Studio (SSMS). To do that, guests authenticate with their home organization and are authorized to access data warehouse endpoints.

## Providing concent

To use cross-tenant access for Fabric data warehouses with a specific provider tenant, the guest tenant must consent by following the steps listed in this document. Once a guest tenant consents to use cross tenant access with a specific provider, the provider can start granting guest principals with access to warehouses. Providers can choose to grant or remove access at any point of time.

>[!WARNING]
> Before providing consent, review your agreement terms with the provider and make sure you trust the provider. Programmatically granted permissions are not subject to review or confirmation and take effect immediately.

By providing consent, you acknowledge that certain elements of guest accounts are be shared. These include email addresses, user principal names, group memberships and directory identifiers. Provider tenant's terms and conditions  govern the use of this data.

When consent is revoked, guests lose access to warehouses in the provider tenant within a day. However, existing sessions are unaffected.

## Prerequisites

* A Microsoft [Entra ID tenant](/azure/azure-portal/get-subscription-tenant-id).

* A user with a [Global administrator](/entra/identity/role-based-access-control/permissions-reference#global-administrator) role.

* [PowerShell](/powershell/azure/install-azure-powershell).

* MISSING LINK TO POWERSHELL CMDLETS

## Install applications

To access the guest tenant, you need to install the first-party applications listed in the table below. You can find the application IDs of these apps in [Application IDs of commonly used Microsoft applications](/troubleshoot/entra/entra-id/governance/verify-first-party-apps-sign-in#application-ids-of-commonly-used-microsoft-applications).

| Application name   | Application ID                       |
|--------------------|--------------------------------------|
| Power BI Service   | 00000009-0000-0000-c000-000000000000 |
| Azure SQL Database | 022907d3-0f1b-48f7-badc-1ba6abab6d66 |

Follow these steps to install the apps:

1. Open [Graph explorer](https://aka.ms/ge).

2. Select **Sign in** (the profile icon button).

3. Sign in with an account that is an administrator of the tenant. <!-- how do they have an admin on the tenant? -->

4. In the request field, select **POST** and enter the following URL:

    ```http
    POST https://graph.microsoft.com/v1.0/servicePrincipals
    ```

5. In the request body, enter the following JSON:

    ```json
    { 
        "appId" : "<Application ID>"
    }
    ```

6. Select **Run query**.

## Enable cross tenant access

This article shows how to enable cross tenant access using PowerShell scripts that call Fabric REST APIs. You can use other methods to call these APIs.

### WHAT DOES SCRIP 1 DO?

```powershell
PowerShell | API 
Connect-PowerBIServiceAccount 
$body = ‘{ “resourceTenantObjectId”: “GUID_VAL” }’ 
$url = “https://api.powerbi.com/v1/ephemeral/crosstenantauth/consent” 
Invoke-PowerBIRestMethod -Url $url -Method Put –Body $body –ContentType “application/json” 
```

### WHAT DOES SCRIP 2 DO?

```powershell
PowerShell | API 
PUT https://api.powerbi.com/v1/ephemeral/crosstenantauth/consent 
Request body 
{ 
    "resourceTenantObjectId”: “GUID_VAL"
} 
```

## Disable cross tenant access

This article shows how to disable cross tenant access using PowerShell scripts that call Fabric REST APIs. You can use other methods to call these APIs.

### WHAT DOES SCRIP 3 DO?

```powershell
PowerShell | API 

Connect-PowerBIServiceAccount 

$body = ‘{ “resourceTenantObjectId”: “GUID_VAL” }’ 
$url = “https://api.powerbi.com/v1/ephemeral/crosstenantauth/revokeConsent” 
Invoke-PowerBIRestMethod -Url $url -Method Put –Body $body –ContentType “application/json” 
```

### WHAT DOES SCRIP 4 DO?

```powershell
PowerShell | API 
PUT https://api.powerbi.com/v1/ephemeral/crosstenantauth/revokeConsent 
Request body 
{ 
    "resourceTenantObjectId”: “GUID_VAL”
} 
```
