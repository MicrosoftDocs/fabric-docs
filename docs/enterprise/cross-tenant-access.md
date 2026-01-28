---
title: CTA
description: An article
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.date: 05/26/2025
---

# What is cross-tenant access for guests?

> [!IMPORTANT]
> * Cross-tenant access for Fabric data-warehouses is a generally available feature for guest tenants, however it's currently only available to a limited set of providers.
> * To use cross-tenant access as a guest, work with a trusted provider that has already onboarded to this feature, and follow the steps in this document. Check with your provider to confirm support.
> * To participate as a provider of cross tenant data, see [Cross-tenant access for providers](cross-tenant-access-for-providers.md).

The cross tenant access feature allows guest tenants to access data stored in a provider tenant’s Fabric data warehouses. This feature is useful for organizations that need to access data stored on a service provider's tenant. For example, when company A stores data in Fabric for company B, company B can use cross tenant access to access their data in company A's Fabric tenant.

This article is aimed at guests who want to set up cross tenant access.

## How does it work?

Cross tenant access allows guest tenants to access data stored in a provider's data warehouse. When the provider enables principals from the guest tenant to use this feature, Fabric creates corresponding [service principals](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) for each guest in the provider's tenant. The provider then grants permission’s on the warehouse to these service principals. Guests with permissions can access data warehouse endpoints using their own Entra ID identity credentials with tools such as SQL Server Management Studio (SSMS). To do that, guests authenticate with their home organization and are authorized to access data warehouse endpoints.

## Providing consent

To use cross-tenant access for Fabric data warehouses with a specific provider tenant, the guest tenant must consent by following the steps listed in this document. Once a guest tenant consents to use cross tenant access with a specific provider, the provider can start granting guest principals with access to warehouses. Providers can choose to grant or remove access at any point of time.

> [!WARNING]
> Before providing consent, review your agreement terms with the provider and make sure you trust the provider. Programmatically granted permissions aren't subject to review or confirmation and take effect immediately.

By providing consent, you acknowledge that certain elements of guest accounts are shared. These include email addresses, user principal names, group memberships, and directory identifiers. Provider tenant's terms and conditions govern the use of this data.

When consent is revoked, guests lose access to warehouses in the provider tenant within a day. However, existing sessions are unaffected.

## Responsibilities of the guest

* Ensure that you trust the provider before consenting to use the cross-tenant access feature of Fabric data warehouses. Guest tenants must follow the steps listed in this document to consent.

* The guest tenant is responsible for creating and managing Microsoft Entra groups and principals that are configured for cross-tenant access.

* The guest tenant is responsible for managing conditional access or multifactor authentication (MFA) policies for their users. These policies are applied when then guest users attempt to access cross-tenant data warehouses.

## Prerequisites for the guest

* A Microsoft [Entra ID tenant](/azure/azure-portal/get-subscription-tenant-id).

* The provider must be enabled for cross-tenant access in Fabric data warehouses by Microsoft.
  
* A user with a [Global administrator](/entra/identity/role-based-access-control/permissions-reference#global-administrator) role.

* The *consent* and *revokeConsent* APIs require the *Tenant.ReadWrite.All* [scope](/entra/identity-platform/scopes-oidc).

* [Azure PowerShell](/powershell/azure/install-azure-powershell).

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

Providers must participate in the preview before a guest tenant can provide consent.

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

## Access the cross-tenant data warehouse

Guest users can use SQL Server Management Studio or other clients to connect to the cross-tenant data warehouse by using the connection string provided by the provider. If the guest tenant has conditional access or MFA policies, these are applied on the guest principals. Guests should choose Microsoft Entra MFA or Azure Active Directory MFA option for authentication in such cases.

## Known issues

In certain circumstances, guest principals may not be able to access cross-tenant data warehouses upon their first sign in attempt, and may need to retry after several minutes to successfully access the cross-tenant warehouse. 
