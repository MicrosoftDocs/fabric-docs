---
title: CTA
description: An article
author: KesemSharabi
ms.author: kesharab
ms.topic: article
ms.date: 04/07/2025
---

# Data warehouse cross tenant access (preview)

>[!IMPORTANT]
>Cross tenant access is a private preview feature. To participate in the preview as a provider of cross tenant data, contact your Microsoft representative. To participate in the preview as a guest tenant, follow the steps listed in this document.

The cross tenant access feature allows guest tenants to access data stored in a provider tenant’s Fabric data warehouses. This feature is useful for organizations that need to access data stored on a service provider's tenant. For example, when company A stores Fabric data for company B, company B can use cross tenant access to access their data in company A's Fabric tenant.

This article is aimed at guests who want to set up cross tenant access.

## How it works

Cross tenant access allows guest tenants to access data stored in a provider's data warehouse. When the provider enables principals from the guest tenant to use this feature, Fabric creates corresponding [service principals](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) for each guest in the provider's tenant. The provider then grants permission’s on the warehouse to these service principals. Guests with permissions can access data warehouse endpoints using their own Entra ID identity credentials with tools such as SQL Server Management Studio (SSMS). To do that, guests authenticate with their home organization and are authorized to access data warehouse endpoints.

## Providing consent

To use cross-tenant access for Fabric data warehouses with a specific provider tenant, the guest tenant must consent by following the steps listed in this document. Once a guest tenant consents to use cross tenant access with a specific provider, the provider can start granting guest principals with access to warehouses. Providers can choose to grant or remove access at any point of time.

>[!WARNING]
> Before providing consent, review your agreement terms with the provider and make sure you trust the provider. Programmatically granted permissions aren't subject to review or confirmation and take effect immediately.

By providing consent, you acknowledge that certain elements of guest accounts are shared. These include email addresses, user principal names, group memberships, and directory identifiers. Provider tenant's terms and conditions  govern the use of this data.

When consent is revoked, guests lose access to warehouses in the provider tenant within a day. However, existing sessions are unaffected.

## Prerequisites

* A Microsoft [Entra ID tenant](/azure/azure-portal/get-subscription-tenant-id).

* A user with a [Global administrator](/entra/identity/role-based-access-control/permissions-reference#global-administrator) role.

* The *consent* and *revokeConsent* APIs require the *Tenant.ReadWrite.All* [scope](/entra/identity-platform/scopes-oidc).

* [PowerShell](/powershell/azure/install-azure-powershell).

* Windows PowerShell v3.0 with [Microsoft Power BI Cmdlets for Windows PowerShell and PowerShell Core](/powershell/power-bi/overview).
    * [Connect-PowerBIServiceAccount](/powershell/module/microsoftpowerbimgmt.profile/connect-powerbiserviceaccount)

## Install applications

To access the guest tenant, you need to install the first-party applications listed in the table below. You can find the application IDs of these apps in [Application IDs of commonly used Microsoft applications](/troubleshoot/entra/entra-id/governance/verify-first-party-apps-sign-in#application-ids-of-commonly-used-microsoft-applications).

| Application name   | Application ID                       |
|--------------------|--------------------------------------|
| Power BI Service   | 00000009-0000-0000-c000-000000000000 |
| Azure SQL Database | 022907d3-0f1b-48f7-badc-1ba6abab6d66 |

To install the apps, follow these steps:

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

This section shows how to enable cross tenant access using PowerShell scripts that call Fabric REST APIs. You can use other methods to call these APIs.

### Log into Fabric

Use [Connect-PowerBIServiceAccount](/powershell/module/microsoftpowerbimgmt.profile/connect-powerbiserviceaccount) to log into Fabric.

```powershell
Connect-PowerBIServiceAccount 
```

### Provide consent

Providers must participate in the private preview before a guest tenant can provide consent.

Use [Invoke-PowerBIRestMethod](/powershell/module/microsoftpowerbimgmt.profile/invoke-powerbirestmethod) to call the consent API to provide consent for cross tenant access for Fabric data warehouses with a specific provider. Provide the tenant ID of the provider in the request body. 

```powershell
$body ='{ "resourceTenantObjectId": "GUID_VAL" }'
$url = "https://api.powerbi.com/v1/ephemeral/crosstenantauth/consent"
Invoke-PowerBIRestMethod -Url $url -Method Put –Body $body –ContentType "application/json"
```

## Disable cross tenant access

This section shows how to disable cross tenant access using PowerShell scripts that call Fabric REST APIs. You can use other methods to call these APIs.

Before you run the script, [log into Fabric](#log-into-fabric).

Use [Invoke-PowerBIRestMethod](/powershell/module/microsoftpowerbimgmt.profile/invoke-powerbirestmethod) to call the revoke consent API for cross tenant access with a specific provider. Provide the tenant ID of the provider in the request body.

```powershell
$body = ‘{ “resourceTenantObjectId”: “GUID_VAL” }’
$url = “https://api.powerbi.com/v1/ephemeral/crosstenantauth/revokeConsent”
Invoke-PowerBIRestMethod -Url $url -Method Put –Body $body –ContentType “application/json”
```
