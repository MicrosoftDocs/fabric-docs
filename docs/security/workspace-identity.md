---
title: Workspace identity
description: Learn about workspace identity in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 02/29/2024
---

# Workspace identity

A Fabric workspace identity is an automatically managed service principal that can be associated with a Fabric workspace. Fabric workspaces with a workspace identity can securely read or write to firewall-enabled Azure Data Lake Storage Gen2 accounts through [trusted workspace access](../security/security-trusted-workspace-access.md) for OneLake shortcuts. In the future, Fabric items will be able to use the identity when connecting to resources that support Microsoft Entra authentication. Fabric will use workspace identities to obtain Microsoft Entra tokens without the customer having to manage any credentials.

Workspace identities can be created in the workspace settings of workspaces that are associated with a Fabric capacity. A workspace identity is automatically assigned the workspace contributor role and has access to workspace items.

When you create a workspace identity, Fabric creates a service principal in Microsoft Entra ID to represent the identity. An accompanying app registration is also created. Fabric automatically manages the credentials associated with workspace identities, thereby preventing credential leaks and downtime due to improper credential handling.

> [!NOTE]
> Fabric workspace identity is currently in public preview. You can only create a workspace identity in F64 or higher capacities. For information about buying a Fabric subscription, see [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md).

While Fabric workspace identities share some similarities with Azure managed identities, their lifecycle, administration, and governance are different. A workspace identity has an independent lifecycle that is managed entirely in Fabric. A Fabric workspace can optionally be associated with an identity. When the workspace is deleted, the identity gets deleted. The name of the workspace identity is always the same as the name of the workspace it's associated with.

## Create and manage a workspace identity

You must be a workspace admin to be able to create and manage a workspace identity. The workspace you're creating the identity for must be associated with a Fabric F64 capacity or higher.

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
| **State** | The state of the workspace. Possible values: *Active*, *Inactive*, *Deleting*, *Unusable*, *Failed*, *DeleteFailed* |

### Authorized users

For information, see [Access control](#access-control).

### Enable workspace identity to be used with customer-provided endpoints and custom code

Workspace admins can enable the use of workspace identity in connections in custom code such as Spark Notebooks and in data pipelines with customer-provided endpoints. Examples include data pipelines with web activity, and webhook activity.

### Delete a workspace identity

When an identity is deleted, Fabric items relying on the workspace identity for trusted workspace access or authentication will break. **Deleted workspace identities cannot be restored.**

> [!NOTE]
> When a workspace is deleted, the workspace identity is deleted as well. its workspace identity is deleted as well. If the workspace is restored after deletion, the workspace identity is not restored. If you want the restored workspace to have a workspace identity, you must create a new one.

## How to use workspace identity

 Shortcuts in a workspace that has a workspace identity can be used for trusted service access. For more information, see [trusted workspace access](../security/security-trusted-workspace-access.md).

## Security, administration, and governance of the workspace identity

The following sections describe who can use the workspace identity, and how you can monitor it in Microsoft Purview  and Azure.

### Access control

Workspace identity can be [created and deleted by workspace admins](#create-and-manage-a-workspace-identity). The workspace identity has the workspace contributor role on the workspace.

Currently, workspace identity isn't supported for authentication to target resources in connections. Authentication to target resources in connections will be supported in the future. Admins, members, and contributors will be able to use workspace identity in authentication in connections in the future.

In the future, workspace admins will be able to enable the use of workspace identity in connections in custom code such as Spark notebooks and in data pipelines with customer-provided endpoints. Examples include data pipelines with web activity, and webhook activity.

[Application Administrators](/entra/identity/role-based-access-control/permissions-reference#application-administrator) or users with higher roles can view, modify, and delete the service principal and app registration associated with the workspace identity in Azure.

> [!WARNING]
> Modifying or deleting the service principal or app registration in Azure is not recommended, as it will cause Fabric items relying on workspace identity to stop working.

### Administer the workspace identity in Purview

You can view the audit events generated upon the creation and deletion of workspace identity in Purview Audit Log. To access the log

1. Navigate to the [Microsoft Purview hub](../governance/use-microsoft-purview-hub.md).
1. Select the **Audit** tile.
1. In the audit search form that appears, use the **Activities - friendly names** field to search for *fabric identity* to find the activities related to workspace identities. Currently, the following activities related to workspace identities are:
    * Created Fabric Identity for Workspace
    * Retrieved Fabric Identity for Workspace
    * Deleted Fabric Identity for Workspace
    * Retrieved Fabric Identity Token for Workspace

### Administer the workspace identity in Azure

The application associated with the workspace identity can be viewed under both **Enterprise applications and App registrations** in the Azure portal.

#### Enterprise applications

The application associated with the workspace identity can be seen in **Enterprise Applications** in the Azure portal. Fabric Identity Management app is its configuration owner.

> [!WARNING]
> Modifications to the application made here will cause the workspace identity to stop working.

To view the audit logs and sign-in logs for this identity:

1. Sign in to the Azure portal.
1. Navigate to **Microsoft Entra ID > Enterprise Applications**.
1. Select either **Audit logs** or **Sign in logs**, as desired.

#### App registrations

The application associated with the workspace identity can be seen under **App registrations** in the Azure portal. No modifications should be made there, as this will cause the workspace identity to stop working.
 
## Advanced scenarios

The following sections describe scenarios involving workspace identities that might occur.

### Deleting the identity

The workspace identity can be deleted in the workspace settings. When an identity is deleted, Fabric items relying on the workspace identity for trusted workspace access or authentication will break. Deleted workspace identities can't be restored.

When a workspace is deleted, its workspace identity is deleted as well. If the workspace is restored after deletion, the workspace identity **is not** restored. If you want the restored workspace to have a workspace identity, you must create a new one.

### Renaming the workspace

WWhen a workspace gets renamed, the workspace identity is also renamed to match the workspace name. However its Entra application and service principal remain the same. Note that there can be multiple application and app registration objects with same name in a tenant.

## Considerations and limitations

* A workspace identity can only be created in workspaces associated with a Fabric F64+ capacity. For information about buying a Fabric subscription, see [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md).
* If a workspace with a workspace identity is migrated to a non-Fabric or a capacity lower than F64, the identity won't be disabled or deleted, but Fabric items relying on the workspace identity will stop working.
* A maximum of 1,000 workspace identities can be created in a tenant. Once this limit is reached, workspace identities must be deleted to enable newer ones to be created.
* Azure Data Lake Storage Gen2 shortcuts in a workspace that has a workspace identity will be capable of trusted service access.

## Related content

* [Trusted workspace access](../security/security-trusted-workspace-access.md)