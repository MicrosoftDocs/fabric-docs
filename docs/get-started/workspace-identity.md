---
title: Workspace identity
description: Learn about workspace identity in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 02/21/2024
---

# Workspace identity

A Fabric workspace identity is an automatically managed service principal that can be optionally associated with Fabric workspaces. When you create a workspace identity, Fabric creates a  service principal in Microsoft Entra ID to represent the identity. An accompanying app registration is also created. Workspace identities are created in the workspace settings of workspaces that are associated with a Fabric capacity (F64 or higher). A workspace identity is automatically assigned the workspace contributor role.

Fabric workspaces with a workspace identity can securely read or write to firewall-enabled Azure Data Lake Storage Gen2 accounts through trusted workspace access. In the future, Fabric items will be able to use the identity when connecting to resources that support Microsoft Entra authentication. Fabric will use workspace identities to obtain Microsoft Entra tokens without having to manage any credentials. The credentials associated with workspace identities are automatically managed and rotated, thereby preventing credential leaks and downtime due to improper credential rotation.

> [!NOTE]
> Fabric workspace identity is currently in public preview.

While Fabric workspace identities share some similarities with Azure managed identities, their lifecycle, administration, and governance are different. A workspace identity has an independent lifecycle that is managed entirely in Fabric. A workspace identity can be optionally created for a Fabric workspace. When the workspace is deleted, the identity gets deleted. The name of the workspace identity is always the same as the name of the workspace it is associated with.
Access control for the workspace identity is also managed in Fabric. The workspace identity can be authorized to access Azure resources by granting Azure role-based access control (RBAC) roles or permissions. 

## How to create the workspace identity.

DESCRIBE PROCESS

## How to use workspace identity

(links to doc #2 'Storage firewall bypass')
brief excerpt and link to other doc (links to doc #2 'Storage firewall bypass')

## Security, Administration and Governance of the workspace identity

BRIEF INTRO

### RBAC

Workspace identity can be created and deleted by workspace admins. Admins, members, and contributors in the workspace can use the identity for trusted workspace access and authentication in connections (a future scenario). Workspace admins can also enable the use of workspace identity in connections in custom code such as Spark Notebooks and in data pipelines with customer-provided endpoints. Examples include data pipelines with web activity, and webhook activity.
Azure App Administrators or users with higher roles can view, modify, and delete the service principal and app registration associated with the workspace identity. Note that modifying or deleting the service principal or app registration in Azure is not recommended, as it may cause Fabric items relying on workspace identity to stop working. 
How to administer the identity in Fabric
You can view the audit events generated upon creation, and deletion of workspace identity in Purview Audit Log. Go to Microsoft Purview Hub (preview) -> Audit -> New Search. You can search by Activity – friendly name “Created Fabric Identity” or “Retrieved Fabric Identity Token”.

To prevent workspace identity from being created, you can limit the users in workspace admin role

### How to administer the identity in Azure

#### Enterprise Applications

The service principal of the workspace identity can be seen in Enterprise Applications. Fabric Identity Management app is its configuration owner. Audit logs and Sign in logs for this identity can be seen in Microsoft Entra ID -> Enterprise Applications -> Audit Logs and Sign in logs.
 
 
 
 
#### App registrations
 


 


To prevent workspace identity from being created, you can disable the creation of Fabric capacity through Azure Policy, or alternately limit the number of users that can purchase Fabric capacity in Azure. 

## Advanced scenarios

### Deleting the identity

Workspace identity can be deleted in workspace settings. When an identity is deleted, Fabric items relying on the workspace identity for trusted workspace access or authentication may break. Deleted workspace identities cannot be restored. 
When a workspace is deleted, the workspace identity is deleted as well. If the workspace is restored after deletion, the workspace identity is not restored. 

### Rename of workspace

When a workspace gets renamed, the workspace identity is also renamed to match the workspace name. 
Use the workspace identity with custom endpoints and code 
Workspace admins can enable the workspace identity to be used in custom code such as Spark notebooks, and with data pipelines that have customer-provided endpoints. Examples include data pipelines with web activity and webhook activity. These scenarios will be supported soon.

## Considerations and limitations

* A workspace identity can only be created in workspaces associated with a Fabric F64+ capacity. <Link to buying F SKU in Azure>

* If a workspace with a workspace identity is migrated to a non-Fabric or something lower than F64 capacity, the identity will not be disabled or deleted, but Fabric items relying on the workspace identity may stop working.

* A maximum of 1000 workspace identities can be created in a tenant. Once this limit is reached, workspace identities must be deleted to enable newer ones to be created. 

## Related content

* [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/)
