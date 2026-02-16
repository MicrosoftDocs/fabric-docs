---
title: Cross-Tenant Access (CTA) for Providers
description: What is cross-tenant access for providers?
author: meenalsri
ms.author: mesrivas
ms.reviewer: juliacawthra, prlangad, wiassaf
ms.topic: concept-article
ms.date: 07/21/2025
---

# What is cross-tenant access for providers?

The cross-tenant access feature allows provider tenants to share data stored in their Fabric warehouse items and SQL analytics endpoints with guest tenants. This feature is useful for organizations that need to share data with guest tenants. For example, when company A stores Fabric data for company B, company B can use cross tenant access to access their data in company A's Fabric tenant. This article is aimed at providers who want to set up cross-tenant access.

> [!IMPORTANT]
> * Cross-tenant access for Fabric Data Warehouse is in a limited preview for providers. To register as a provider of cross tenant data, fill out the [Cross-tenant access in Fabric DW Limited Preview Form](https://forms.office.com/r/2AafhkikqQ).
> * To use cross tenant access as a guest, you need to follow the steps listed in [Cross-tenant access for guests](cross-tenant-access.md) and work with a trusted provider.

## How it works

Cross tenant access allows guest tenants to access data stored in a provider's warehouse item and SQL analytics endpoint. When the provider enables principals from the guest tenant to use this feature, Fabric creates corresponding service principals for each guest in the provider's tenant. The provider then grants permission’s on the warehouse to these service principals. Guests with permissions can access [warehouse TDS endpoints](../data-warehouse/connectivity.md) using their own Entra ID identity credentials with tools such as SQL Server Management Studio (SSMS). To do that, guests authenticate with their home organization and are authorized to access a warehouse.

Unlike B2B, use of cross-tenant access in Fabric warehouse items doesn't grant guests access to the providers directory. Providers don't need to manage individual guest users, when providers configure a group for cross-tenant access, the group membership is managed by the guest tenant.  

Unlike the external data sharing feature in Fabric, which allows providers to share OneLake data in-place with another Fabric tenant, this feature allows providers to share warehouse items with guests that don't have Fabric.

## Responsibilities of the provider

1. Ensure the guest tenant consents to use cross-tenant access feature with your (provider) tenant. Guest tenants must follow the steps listed in [Cross-tenant access for guests](cross-tenant-access.md).

1. Configure the guest principals for cross-tenant access.

1. When you enable guest principals for cross-tenant access, Fabric creates corresponding service principals for each guest in the provider's tenant, and groups for each guest group. The provider must grant a workspace role or permissions on the warehouse to these service principals.

1. Guest principals will access the cross-tenant warehouse item by using a TDS endpoint and will need a connection string to the warehouse. The provider must provide this connection string to the guests. The connection string for cross-tenant access differs from the connection string used for access within a tenant.

## Configure the guest principals for cross-tenant access

### Configure guest principals for cross-tenant access

`POST https://api.fabric.microsoft.com/v1/admin/crosstenantauth/mappings`

* Supported identities: User and service principal
* Permissions required: Users calling this API must be in the Fabric administrator role.
* To ensure that a service principal can create, list, and delete any cross-tenant mappings that are created in a provider tenant, the Fabric application must have the Group.Create Microsoft Graph permission. Refer to the following articles to grant the Group.Create permission to the Fabric application.

   * [Grant or revoke API permissions programmatically](/graph/permissions-grant-via-msgraph?tabs=http)
   * [Microsoft Graph permissions reference](/graph/permissions-reference)
* Service principals must be enabled to call Fabric public APIs, Fabric read APIs, and update APIs.
  
#### Request body

| Name | In | Required | Type | Description |
|--|--|--|--|--|
| denyUserAccess| Path | No | String | Disable cross-tenant access for a guest user |
| ID | Body | Yes | String | Object ID of guest application or group |
| tenantId | Body | Yes | String | Guest tenant ID |
| type | Body | Yes | String | User or Group |
| userDetails | Body | Yes | JSON or Complex | Details of the guest tenant user |
| userPrincipalName | Body | Yes | String | Guest users’ principal name |
| groupDetails | Body | Yes | JSON or Complex | Details of the guest tenant group |
| groupType | Body | Yes | String | Type of guest tenant group, send "Unknown" if not available |
| email | Body | Yes | String | Guest tenant group’s email |

#### Sample request body

Request body for User mapping

```json
{  
        "id": "00000000-0000-0000-0000-000000000000", 
        "tenantId": "{guest tenant id}",  
        "type": "User",  
        "userDetails": {  
            "userPrincipalName": "user@contoso.com"  
         }  
}
```

Request body for service principal mapping

```json
{  
        "id": "{object id of the Enterprise application}",  
        "tenantId": " {guest tenant id} ",   
        "type": "User" 
}
```

Request body for group mapping

```json
{  
        "id": "00000000-0000-0000-0000-000000000000", 
        "tenantId": "{guest tenant id}",  
        "type": "Group",  
        "groupDetails": {  
               "groupType": "Unknown", 
               "email": "groupemail@contoso.com"  
         }  
}
```

Request body for group mapping, when the group doesn't have email

```json
{ 
  "id": "{object id of the group}", 
  "tenantId": "{guest tenant id}", 
  "type": "Group" 
}
```

#### Response codes

| Response code | Note |
|--|--|
| 200 OK | Guest group or principal was configured for cross-tenant access |
| 400 Bad request | Guest principal is unresolvable |
| 401 Unauthorized | Guest tenant hasn't consented |
| 429 Too many requests | Too many requests, expected 50/minute |

### Get the list of guest principals that are enabled for cross-tenant access

`GET https://api.fabric.microsoft.com/v1/admin/crosstenantauth/mappings`

* Supported identities: User and service principal
* Permissions required: Users calling this API must be in the Fabric administrator role.
* To ensure that a service principal can create, list, and delete any cross-tenant mappings that are created in a provider tenant, the Fabric application must have the Group.Create Microsoft Graph permission. Refer to the following articles to grant the Group.Create permission to the Fabric application.

   * [Grant or revoke API permissions programmatically](/graph/permissions-grant-via-msgraph?tabs=http)
   * [Microsoft Graph permissions reference](/graph/permissions-reference)
* Service principals must be enabled to call Fabric public APIs, Fabric read APIs, and update APIs.

#### Response codes

|Response code          |	Note                                                            |
|-----------------------|-----------------------------------------------------------------|
|200 OK	                |If no mappings exist, the API returns an empty list              |
|404 Not found  	      |                                                                 |
|401 Unauthorized	      |                                                                 |
|429 Too many requests	|Too many requests, expected 50/minute                            |

### Remove guest principals that are enabled for cross-tenant access

`DELETE https://api.fabric.microsoft.com/v1/admin/crosstenantauth/mappings/{mappingId}`

* Supported identities: User and service principal
* Permissions required: Users calling this API must be in the Fabric administrator role.
* To ensure that a service principal can create, list, and delete any cross-tenant mappings that are created in a provider tenant, the Fabric application must have the Group.Create Graph permission. Refer to the following articles to grant the Group.Create permission to the Fabric application.

   * [Grant or revoke API permissions programmatically](/graph/permissions-grant-via-msgraph?tabs=http)
   * [Microsoft Graph permissions reference](/graph/permissions-reference)
* Service principals must be enabled to call Fabric public APIs, Fabric read APIs, and update APIs.
  
When this API is called, the groups and service principals created for guest principals stop working immediately, however the mapping remains in the database for more than a day and will be seen in the GET mapping API response.  

#### Request body

| Name | In | Required | Type | Description |
|--|--|--|--|--|
| mappingId | Path | Yes | String | Mapping ID |

#### Response codes

| Response Code | Note |
|--|--|
| 200 OK |  |
| 404 Not found |  |
| 401 Unauthorized |  |
| 429 Too many requests | Too many requests, expected 50/minute |

## Grant workspace role or permission’s to service principals

Permitted users from the provider tenant can grant a workspace role to the groups or service principals created to represent the guest principals by using the Add workspace role assignment REST API or Fabric UI. They can also share the warehouse item with groups and service principals.

## Get SQL connection string that can be used by guest principals

Permitted users from the provider tenant can call this API to get the SQL connection string of the specified workspace for a specific guest tenant.
* Supported identities: User, Service Principal, and Managed Identities
* Permissions required: the caller must have Viewer or higher workspace role

`GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/warehouses/{warehouseId}/connectionString?guestTenantId={guestTenantId}&privateLinkType={privateLinkType}` 

#### Request body

| Name | In | Required | Type | Description |
|--|--|--|--|--|
| warehouseId | Path | True | String | The warehouse ID |
| workspaceId | Path | True | String | The workspace ID |
| guestTenantId | Query |  | String | The guest tenant ID if the end user's tenant is different from the warehouse tenant |
| privateLinkType | Query |  | String | None (No private link or Tenant level private link) or Workspace (Workspace private link) |

#### Response codes

| Response Code | Note |
|--|--|
| 200 OK | Returns connection string in response |
| 404 Not found | ItemNotFound - The requested item wasn't found. InvalidGuestTenantId - The provided guest tenant ID doesn't exist |

#### Sample response body

```json
{ 
  "connectionString": "DW connection string" 
}
```

## Governance of cross-tenant access

 - **Use the Get cross tenant auth mapping API** - You can use the GET cross tenant auth mappings API to review the guest tenant users and groups that can potentially access warehouses and SQL endpoints in your tenant. These users also need to be granted permissions on the items.

 - **Use audit logs in Purview** - Navigate to the Microsoft Purview hub, where you can search for the following event types to get detailed information about mapping CRUD and token generation activities as a provider.

   * Created cross tenant auth mapping
   * Listed cross tenant auth mapping
   * Deleted cross tenant auth mapping
   * Created cross tenant auth token  
   * Clear Guest Tenant Data Cross Tenant Auth (generated when mappings are deleted after the revocation of consent by guest tenant)
   
   Guest tenants can see the following event-types:
   * Consent Cross Tenant Auth
   * Revoke Consent Cross Tenant Auth

 - **Govern the service principals and groups created in Microsoft Entra** (Global Admin, App admin, or other high privilege users only) - You can also review the service principals and groups created in Microsoft Entra to enable guest tenant principals to access cross tenant data. Other Azure experiences such as Sign-in logs (Service principal sign-ins) will show the service principal sign-in details corresponding to guest tenant users’ sign-in activities. Microsoft Entra Audit logs will also provide information about group creation activity performed by Fabric. The Fabric Identity applications and app-registrations created by Fabric for cross-tenant access shouldn't be modified or deleted. Providers should delete the mappings if they want to remove a FabricIdentity created for cross-tenant access.
 - **Disable access for a guest user** - You can disable cross-tenant access for a guest user that has been granted access through a group by calling the `POST https://api.fabric.microsoft.com/v1/admin/crosstenantauth/mappings` API with the query parameter denyUserAccess set to true. The guest user will be unable to login to cross-tenant data warehouses within an hour, however existing sessions will be unaffected. You can reenable access for a user that was previously denied access by calling the `POST https://api.fabric.microsoft.com/v1/admin/crosstenantauth/mappings` API with the query parameter denyUserAccess set to false. The guest user will be able to login to cross-tenant data warehouses within an hour.

## Responsibilities of the guest

 - Ensure you trust the provider before consenting to use the cross-tenant access feature of Fabric Data Warehouse with the provider. Guest tenants must follow the steps listed in [cross-tenant access for guests](cross-tenant-access.md) article.

 - The guest tenant is responsible for creating and managing Microsoft Entra groups that are configured for cross-tenant access.

 - The guest tenant is responsible for managing conditional access or MFA policies for their users. These policies are applied when then guest users attempt to access cross-tenant warehouse items.

## Restrictions and considerations

 - The Fabric application has the the Group.Create Graph permission to ensure it can create, list, and delete any cross-tenant mappings that are created in a provider tenant. If you remove this permission, cross-tenant access will stop working.
   
 - The guest tenants' conditional access or MFA policies are enforced upon sign in by guest users.

 - The guest tenant is responsible for creating and managing Microsoft Entra groups that are configured for cross-tenant access.

 - Fabric performs group expansion for the guest groups that were configured for cross-tenant access every hour. This means that if a user is added to a group in the guest tenant and the group is already configured for cross-tenant access, it may take up to 1 hour for this user to be able to access the cross-tenant warehouse item.

 - If a guest derives their permissions via membership of a group, it may take up to 1 hour for permission changes to be reflected on the warehouse. If users are directly granted permissions (that is, not through a group), the permission changes on the warehouse item are reflected immediately.

 - Resource limits and recycling of SPNs - The service-principals and groups created for cross-tenant users impact resource limits in the provider tenant. Refer to Microsoft Entra ID limits for more details. Fabric allows you to create up to 100,000 service principals for cross tenant access, but it's possible that your resource limits are exhausted before this. If a guest doesn't log in to a warehouse over a period of five days, we remove the service principal associated with this guest principal to control resource limits.

 - Guests can't run public facing APIs. The service-principals and groups created for cross tenant users can't currently run public-facing APIs. This applies to auditing, snapshots, and SQL pools. For example, only users from the provider tenant can create a snapshot; the guest user can’t run the API to create it, however they can query the snapshot. Similarly, for auditing the guest user can only run the auditing TVF but not the APIs to enable/disable the logs.

 - When a guest tenant revokes consent, guests lose access to warehouses in the provider tenant within a day. However, existing sessions are unaffected.

 - In certain circumstances, guest principals may not be able to access cross-tenant warehouse items for several hours after the guest principal is configured for cross-tenant access.

 - If cross-tenant mapping exceeds a 113 character limit, authentication to the warehouse does not succeed. This is due to [Self-service password reset policies in Microsoft Entra ID](/entra/identity/authentication/concept-sspr-policy#password-policies-that-only-apply-to-cloud-user-accounts).

