---
title: Workspace identity
description: Learn about workspace identity in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 02/22/2024
---

# Workspace identity

## What is a workspace identity

A Fabric workspace identity is an automatically managed service principal that can be associated with Fabric workspaces. Fabric workspaces with a workspace identity can securely read or write to firewall-enabled Azure Data Lake Storage Gen2 accounts through [trusted workspace access](../security/security-trusted-workspace-access.md) for OneLake shortcuts. In the future, Fabric items will be able to use the identity when connecting to resources that support Microsoft Entra authentication. Fabric will use workspace identities to obtain Microsoft Entra tokens without the customer having to manage any credentials.

Workspace identities are created in the workspace settings of workspaces that are associated with a Fabric capacity. A workspace identity is automatically assigned the workspace contributor role and has access to workspace items.

When you create a workspace identity, Fabric creates a service principal in Microsoft Entra ID to represent the identity. An accompanying app registration is also created. The credentials associated with workspace identities are automatically managed by Fabric , thereby preventing credential leaks and downtime due to improper credential handling.

> [!NOTE]
> Fabric workspace identity is currently in public preview. You can only create a workspace identity in F64 or higher capacities.

While Fabric workspace identities share some similarities with Azure managed identities, their lifecycle, administration, and governance are different. A workspace identity has an independent lifecycle that is managed entirely in Fabric. A Fabric workspace may optionally have an identity. When the workspace is deleted, the identity gets deleted. The name of the workspace identity is always the same as the name of the workspace it is associated with.

Access control for the workspace identity with which it is associated with is also managed in Fabric.   The workspace identity can be authorized to access Azure resources by granting Azure role-based access control (RBAC) roles or permissions. 

## Create and manage a workspace identity

You must be a workspace admin to be able to create and manage a workspace identity. The workspace you are creating the identity for must be associated with a Fabric F64 capacity or higher.

1. Navigate to the workspace and open the workspace settings.
1. Select the **Workspace identity** tab.
1. Select the **+ Workspace identity** button.

When the workspace identity has been created, the tab displays the workspace identity details, the list of authorized users, and allows you to make it possible to use the identity with customer-provided endpoints and custom code.

:::image type="content" source="./media/workspace-identity/workspace-identity-details.png" alt-text="Screenshot showing workspace identity details." lightbox="./media/workspace-identity/workspace-identity-details.png":::

The sections of the workspace identity configuration are described in the following sections.

### Identity details

| Detail | Description |
|:-------|:-----|
| **Name** | Workspace identity name. The workspace identity name is the same as the workspace name.|
| **ID** | The workspace identity GUID. This is a unique identifier for the identity. |
| **Role** | The workspace role assigned to the identity. Workspace identities are automatically assigned the contributor role upon creation. |
| **State** | ? |

### Authorized users

Authorized users are users who have a role in the workspace. The workspace identity appears in the list with the contributor role that it was assigned upon creation. [QUESTION]

### Enable workspace identity to be used with customer-provided endpoints and custom code

Workspace admins can enable the use of workspace identity in connections in custom code such as Spark Notebooks and in data pipelines with customer-provided endpoints. Examples include data pipelines with web activity, and webhook activity.

### Delete a workspace identity

When an identity is deleted, Fabric items relying on the workspace identity for trusted workspace access or authentication will break. **Deleted workspace identities cannot be restored.**

> [!NOTE]
> When a workspace is deleted, the workspace identity is deleted as well. If the workspace is restored after deletion, the workspace identity cannot be restored. You can create a new workspace identity upon workspace restoration.

[PUT NOTE ABOUT WORKSPACE IDENTITY IN DOCUMENTATION ABOUT DELETING WORKSPACES]

## How to use workspace identity

BRIEF EXCERPT AND LINK TO OTHER DOC links to doc #2 'Storage firewall bypass'

## Security, Administration and Governance of the workspace identity

### Access Control

Workspace identity can be [created and deleted by workspace admins](#create-and-manage-a-workspace-identity). The workspace identity has the workspace contributor role on the workspace.

Currently, workspace identity is not supported for authentication to target resources in connections, this will be supported in the future. Admins, members, and contributors will be able to use workspace identity in authentication in connections in the future. In the future, workspace admins will be able to enable the use of workspace identity in connections in custom code such as Spark Notebooks and in data pipelines with customer-provided endpoints. Examples include data pipelines with web activity, and webhook activity.

[Application Administrators](/entra/identity/role-based-access-control/permissions-reference#application-administrator) or users with higher roles can view, modify, and delete the service principal and app registration associated with the workspace identity. For more information, see [Administer the workspace identity in Azure](#administer-the-workspace-identity-in-azure).

> [!WARNING]
> Modifying or deleting the service principal or app registration in Azure is not recommended, as it will cause Fabric items relying on workspace identity to stop working.

### Administer the workspace identity in Purview

You can view the audit events generated upon the creation and deletion of workspace identity in Purview Audit Log. To access the log

1. Navigate to the [Microsoft Purview hub](../governance/use-microsoft-purview-hub.md).
1. Select the **Audit** tile.
1. In the audit search form that appears, use the **Activities - friendly names** field to search for *fabric identity* to find the activities related to workspace identities. Currently, the following activities related to workspace identities are
    * Created Fabric Identity for Workspace
    * Retrieved Fabric Identity for Workspace
    * Deleted Fabric Identity for Workspace
    * Retrieved Fabric Identity Token for Workspace

:::image type="content" source="./media/workspace-identity/workspace-identity-purview-audit-log.png" alt-text="Screenshot showing the Purview Audit Log." lightbox="./media/workspace-identity/workspace-identity-purview-audit-log.png":::

To prevent a workspace identity from being created for a workspace, limit the number of users who have the workspace admin role in the workspace and make sure they are aware of the implications of creating a workspace identity.

### Administer the workspace identity in Azure

#### Enterprise Applications

The service principal of the workspace identity can be seen in **Enterprise Applications** in the Azure portal. The Fabric Identity Management app is its configuration owner. [QUESTION]

To view the audit logs and sign-in logs for this identity:

1. Sign in to the Azure portal.
1. Navgate to **Microsoft Entra ID > Enterprise Applications**.
1. Select either **Audit logs** or **Sign in logs**, as desired.

:::image type="content" source="./media/workspace-identity/workspace-identity-enterprise-applications.png" alt-text="Screenshot showing the All Applications page in the Enterprise Application management app." lightbox="./media/workspace-identity/workspace-identity-enterprise-applications.png":::

:::image type="content" source="./media/workspace-identity/workspace-identity-enterprise-applications-management-overview.png" alt-text="Screenshot showing the workspace identity overview page in the Enterprise Application management app." lightbox="./media/workspace-identity/workspace-identity-enterprise-applications-management-overview.png":::

:::image type="content" source="./media/workspace-identity/workspace-identity-enterprise-applications-management-owners.png" alt-text="Screenshot showing the workspace identity owners page in the Enterprise Application management app." lightbox="./media/workspace-identity/workspace-identity-enterprise-applications-management-owners.png":::

[NEED DESCRIPTION OF WHAT IS BEING SHOWN - DO WE NEED MORE DESCRIPTION OF THE AUDIT LOG AND SIGN-IN LOG]

#### App registrations

[TEXT TO BE ADDED] 

:::image type="content" source="./media/workspace-identity/workspace-identity-app-registrations.png" alt-text="Screenshot showing the App registrations app search page." lightbox="./media/workspace-identity/workspace-identity-app-registrations.png":::

:::image type="content" source="./media/workspace-identity/workspace-identity-app-registrations-overview.png" alt-text="Screenshot showing the workspace identity overview page in the App registrations app." lightbox="./media/workspace-identity/workspace-identity-app-registrations-overview.png":::
 
## Advanced scenarios

### Deleting the identity

Workspace identity can be deleted in workspace settings. When an identity is deleted, Fabric items relying on the workspace identity for trusted workspace access or authentication will break. Deleted workspace identities cannot be restored. 

When a workspace is deleted, the workspace identity is deleted as well. If the workspace is restored after deletion, the workspace identity cannot be restored. You can create a new workspace identity upon workspace restoration.

### Renaming the workspace

When a workspace is renamed, the workspace identity is also renamed to match the workspace name. However its  Entra application and service principal remain the same. Note that there can be multiple workspace identity objects with same name.

[QUESTION - DOES ANYTHING GET BROKEN?]

## Considerations and limitations

* A workspace identity can only be created in workspaces associated with a Fabric F64+ capacity. For information about buying a Fabric subscription, see [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription).
* If a workspace with a workspace identity is migrated to a non-Fabric or something lower than F64 capacity, the identity will not be disabled or deleted, but Fabric items relying on the workspace identity will stop working.
* A maximum of 1000 workspace identities can be created in a tenant. Once this limit is reached, workspace identities must be deleted to enable newer ones to be created.

## Related content

* Trusted workspace access
