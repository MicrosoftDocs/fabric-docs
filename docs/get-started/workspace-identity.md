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

A Fabric workspace identity is an automatically managed service principal that can be optionally associated with Fabric workspaces. When you create a workspace identity, Fabric creates a service principal in Microsoft Entra ID to represent the identity. An accompanying app registration is also created.

Fabric workspaces with a workspace identity can securely read or write to firewall-enabled Azure Data Lake Storage Gen2 accounts through trusted workspace access. In the future, Fabric items will be able to use the identity when connecting to resources that support Microsoft Entra authentication. Fabric will use workspace identities to obtain Microsoft Entra tokens without having to manage any credentials. The credentials associated with workspace identities are automatically managed and rotated, thereby preventing credential leaks and downtime due to improper credential rotation.

While Fabric workspace identities share some similarities with Azure managed identities, their lifecycle, administration, and governance are different. A workspace identity has an independent lifecycle that is managed entirely in Fabric. A workspace identity can be optionally created for a Fabric workspace. When the workspace is deleted, the identity gets deleted. The name of the workspace identity is always the same as the name of the workspace it is associated with.

Access control for the workspace identity is also managed in Fabric. The workspace identity can be authorized to access Azure resources by granting Azure role-based access control (RBAC) roles or permissions.

Workspace identities can be created in the workspace settings of workspaces that are associated with a Fabric capacity (F64 or higher). The name of a workspace identity is always the same as the name of the workspace it is associated with. Workspace identities are automatically assigned the workspace contributor role in the workspace.

> [!NOTE]
> Fabric workspace identity is currently in public preview.

## Create a workspace identity

1. Navigate to the workspace and open the workspace settings.
1. Select the **Workspace identity** tab.
1. Select the **+ Workspace identity** button.

When the workspace identity has been created, the tab displays the workspace identity details, the list of authorized users, and allows you to make it possible to use the identity to be used with customer-provided endpoints and custom code.

:::image type="content" source="./media/workspace-identity/workspace-identity-details.png" alt-text="Screenshot showing workspace identity details." lightbox="./media/workspace-identity/workspace-identity-details.png":::

## Identity details

| Detail | Description |
|:-------|:-----|
| **Name** | Workspace identity name. The workspace identity name is the same as the workspace name.|
| **ID** | The workspace identity GUID. This is a unique identifier for the identity. |
| **Role** | The workspace role assigned to the identity. Workspace identities are automatically assigned the contributor role upon creation. |
| **State** | ? |

### Authorized users

Authorized users are users who have a role in the workspace. The workspace identity appears in the list with the contributor role that it was assigned upon creation. [QUESTION]

### Enable workspace identity to be used with customer-provided endpoints and custom code

## How to use workspace identity

(links to doc #2 'Storage firewall bypass')
brief excerpt and link to other doc (links to doc #2 'Storage firewall bypass')

## Security, Administration and Governance of the workspace identity

BRIEF INTRO

### Role-based access control (RBAC)

Workspace identity can be created and deleted by workspace admins. Admins, members, and contributors in the workspace can use the identity for trusted workspace access and authentication in connections (a future scenario). Workspace admins can also enable the use of workspace identity in connections in custom code such as Spark Notebooks and in data pipelines with customer-provided endpoints. Examples include data pipelines with web activity, and webhook activity.

Azure App Administrators or users with higher roles can view, modify, and delete the service principal and app registration associated with the workspace identity. Note that modifying or deleting the service principal or app registration in Azure is not recommended, as it may cause Fabric items relying on workspace identity to stop working.

### How to administer the identity in Fabric

You can view the audit events generated upon the creation and deletion of workspace identity in Purview Audit Log. To access the log

1. Navigate to the [Microsoft Purview hub](../governance/use-microsoft-purview-hub.md).
1. Select the **Audit** tile.
1. In the audit search form that appears, use the **Activities - friendly names** field to search for *fabric identity* to find the activities related to workspace identities. Currently, the following activities related to workspace identities are
    * Created Fabric Identity for Workspace
    * Retrieved Fabric Identity for Workspace
    * Deleted Fabric Identity for Workspace
    * Retrieved Fabric Identity Token for Workspace

To prevent workspace identity from being created, you can limit the users in workspace admin role

### How to administer the identity in Azure

#### Enterprise Applications

The service principal of the workspace identity can be seen in **Enterprise Applications** in the Azure portal. The Fabric Identity Management app is its configuration owner. [QUESTION]

To view the audit logs and sign-in logs for this identity:

Sign in to the Azure portal.
Navgate to **Microsoft Entra ID > Enterprise Applications**.
Select either **Audit logs** or **Sign in logs**, as desired.

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
