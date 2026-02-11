---
title: Workspace identity
description: Learn about workspace identity in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.custom:
ms.date: 01/26/2026
---

# Workspace identity

A Fabric workspace identity is an automatically managed service principal that can be associated with a Fabric workspace. Fabric workspaces with a workspace identity can securely read or write to firewall-enabled Azure Data Lake Storage Gen2 accounts through [trusted workspace access](../security/security-trusted-workspace-access.md) for OneLake shortcuts. Fabric items can use the identity when connecting to resources that support Microsoft Entra authentication. Fabric uses workspace identities to obtain Microsoft Entra tokens without the customer having to manage any credentials.

Workspace identities can be created in the workspace settings of any workspace except My workspaces.

When you create a workspace identity, Fabric creates a service principal in Microsoft Entra ID to represent the identity. An accompanying app registration is also created. Fabric automatically manages the credentials associated with workspace identities, thereby preventing credential leaks and downtime due to improper credential handling.

> [!NOTE]
> Fabric workspace identity is **generally available**. You can create a workspace identity in any workspace except **My workspace**.

While Fabric workspace identities share some similarities with Azure managed identities, their lifecycle, administration, and governance are different. A workspace identity has an independent lifecycle that is managed entirely in Fabric. A Fabric workspace can optionally be associated with an identity. When the workspace is deleted, the identity gets deleted. The name of the workspace identity is always the same as the name of the workspace it's associated with.

## Create and manage a workspace identity

You must be a workspace admin to be able to create and manage a workspace identity. The workspace you're creating the identity for can't be a **My Workspace**.

1. Sign in to the [Microsoft Fabric portal](https://app.fabric.microsoft.com).
1. Select **Workspaces**, and then select the workspace you want to create a workspace identity for.
1. In the workspace, select the **Workspace settings** (gear) icon.
1. Select the **Workspace identity** tab.
1. Select the **+ Workspace identity** button.

When the workspace identity has been created, the tab displays the workspace identity details and the list of authorized users.

:::image type="content" source="./media/workspace-identity/workspace-identity-details.png" alt-text="Screenshot showing workspace identity details." lightbox="./media/workspace-identity/workspace-identity-details.png":::

The sections of the workspace identity configuration are described in the following sections.

### Identity details

| Detail | Description |
|:-------|:-----|
| **Name** | Workspace identity name. The workspace identity name is the same as the workspace name.|
| **ID** | The workspace identity GUID. This is a unique identifier for the identity. |
| **Role** | The workspace role assigned to the identity. |
| **State** | The state of the workspace. Possible values: *Active*, *Inactive*, *Deleting*, *Unusable*, *Failed*, *DeleteFailed* |

### Authorized users

For information, see [Access control](#access-control).

### Delete a workspace identity

When an identity is deleted, Fabric items relying on the workspace identity for trusted workspace access or authentication will break. **Deleted workspace identities cannot be restored.**

> [!NOTE]
> When a workspace is deleted, its workspace identity is deleted as well. If the workspace is restored after deletion, the workspace identity is not restored. If you want the restored workspace to have a workspace identity, you must create a new one.

## How to use workspace identity

 Workspace identity currently can be used in two ways:

* For authentication: See [Authenticate with workspace identity](./workspace-identity-authenticate.md)

* For trusted workspace access: Shortcuts in a workspace that has a workspace identity can be used for trusted service access. For more information, see [trusted workspace access](../security/security-trusted-workspace-access.md).

## Security, administration, and governance of the workspace identity

The following sections describe who can use the workspace identity, and how you can monitor it in Microsoft Purview  and Azure.

### Access control

Workspace identity can be [created and deleted by workspace admins](#create-and-manage-a-workspace-identity). By default, the workspace identity is not granted any workspace role.

> [!WARNING]
> Workspace identity is an automatically managed service principal created by Fabric users. Access to this identity should be carefully managed and monitored, as any individual given access to the identity is allowed to assume it.

Workspace identity is supported for authentication to target resources in connections. Only users with an admin, member, or contributor role in the workspace can configure the workspace identity for authentication in connections.

[Application Administrators](/entra/identity/role-based-access-control/permissions-reference#application-administrator) or users with higher roles can view, modify, and delete the service principal and app registration associated with the workspace identity in Azure.

> [!WARNING]
> Modifying or deleting the service principal or app registration in Azure is not recommended, as it will cause Fabric items relying on workspace identity to stop working. Such changes may be reverted.
> Additionally, adhere to the principle of least privilege when managing Application Administrator roles. Ensure that only appropriate users are assigned this role. For more details, refer to [Application Administrators](/entra/identity/role-based-access-control/permissions-reference#application-administrator)

### Administer the workspace identity in Fabric

Fabric administrators can administer the workspace identities created in their tenant on the [Fabric identities tab](../admin/fabric-identities-manage.md) in the admin portal.

1. Navigate to the **Fabric identities** tab in the Admin portal.
1. Select a workspace identity, and then select **Details**.
1. In the Details tab, you can view additional information related to the workspace identity.
1. You can also delete a workspace identity.
   > [!NOTE]
   > Workspace identities cannot be restored after deletion. Be sure to review the consequences of deleting a workspace identity described in [Delete a workspace identity](#delete-a-workspace-identity).

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
> Modifications to the application made here will cause the workspace identity to stop working, and such changes may be reverted.
> Additionally, adhere to the principle of least privilege when managing Application Administrator roles. Ensure that only appropriate users are assigned this role. For more details, refer to [Application Administrators](/entra/identity/role-based-access-control/permissions-reference#application-administrator)

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

When a workspace gets renamed, the workspace identity is also renamed to match the workspace name. However its Microsoft Entra application and service principal remain the same. Note that there can be multiple application and app registration objects with same name in a tenant.

## Considerations and limitations

* A workspace identity can be created in any workspace except a My Workspace.

* If a workspace with a workspace identity is migrated to a non-Fabric capacity or to a non-F SKU Fabric capacity, the identity won't be disabled or deleted, but Fabric items relying on trusted workspace access will stop working.

* A default of 10,000 workspace identities can be created in a tenant. You can also specify your own maximum in the tenant settings, which becomes the upper limit for Fabric identity creation across your tenant. For more information, see [Define maximum number of Fabric identities in a tenant](../admin/service-admin-portal-developer.md#define-maximum-number-of-fabric-identities-in-a-tenant).

* Azure Data Lake Storage Gen2 shortcuts in a workspace that has a workspace identity will be capable of trusted service access.

## Troubleshooting issues with creating a workspace identity

* If you can't create a workspace identity because the creation button is disabled, make sure you have the workspace administrator role.

* If you run into issues the first time you create a workspace identity in your tenant, try the following steps:
    1. If the workspace identity state is *failed*, wait for an hour and then delete the identity.
    2. After the identity has been deleted, wait 5 minutes and then create the identity again.

## Related content

* [Authenticate with workspace identity](./workspace-identity-authenticate.md)
* [Trusted workspace access](security-trusted-workspace-access.md)
* [Fabric identities](../admin/fabric-identities-manage.md)
