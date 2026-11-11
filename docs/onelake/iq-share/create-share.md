---
title: Create a Share with IQ Sharing
description: Learn how to use IQ Sharing to create a Share, select a supported Fabric item, add recipients, and distribute an invitation.
ms.reviewer: shivnarayanan
ms.topic: how-to
ms.date: 10/28/2026
ai-usage: ai-assisted
#customer intent: As a data producer, I want to create a Share with IQ Sharing so that users in another Fabric tenant can access a supported item.
---

# Create a Share with IQ Sharing (preview)

As a data producer, use IQ Sharing to share data with another tenant. Create a **Share**, select the source items, add recipients, and set the required expiration date.

> [!NOTE]
> IQ Sharing is currently in preview. This preview is provided without a service-level agreement and isn't recommended for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).

## Prerequisites

Complete these prerequisites before you create a Share.

| Persona | Requirement |
| --- | --- |
| Fabric administrator | In the Fabric admin portal tenant settings, enable **Enable Share Item (preview)** in the data producer's tenant. |
| Fabric administrator | In the Fabric admin portal tenant settings, enable **External data sharing** in the data producer's tenant. |
| Fabric administrator (optional) | In the Fabric admin portal tenant settings, enable **Enable Share Subscription Item (preview)** in the data producer's tenant. This setting allows the tenant to accept Shares through IQ Sharing. It's optional for a tenant that only produces Shares. |
| Data producer | Use a workspace that contains the supported Fabric item you want to share. |
| Data producer | Have the required [item permissions](#item-permissions). |
| Data producer | Identify the intended recipients. Recipients can be users identified by email address or service principals. |

## Create a Share

> [!NOTE]
> To use IQ Sharing, create a **Share (preview)** item from **+ New item**. This is different from selecting **Share** on an existing lakehouse, warehouse, or other Fabric item.

1. Open the workspace where you want to create the Share, and select **+ New item**.

1. Search for and select **Share (preview)**.

   :::image type="content" source="media/create-share/new-item-share-preview.png" alt-text="Screenshot of the New item window with Share preview shown in the search results." lightbox="media/create-share/new-item-share-preview.png":::

1. In **New Share**, enter a value for **Name** and confirm the destination under **Location**.

   :::image type="content" source="media/create-share/new-share-empty.png" alt-text="Screenshot of the New Share window showing empty Name and selected Location fields." lightbox="media/create-share/new-share-empty.png":::

1. Select **Create**.

   :::image type="content" source="media/create-share/new-share-details.png" alt-text="Screenshot of the New Share window with a Share name and workspace location entered." lightbox="media/create-share/new-share-details.png":::

1. On **Select data**, select **Select data**.

   :::image type="content" source="media/create-share/select-data-empty.png" alt-text="Screenshot of the Select data step with the Select data button." lightbox="media/create-share/select-data-empty.png":::

   > [!IMPORTANT]
   > Select an item listed under [Supported item types](onelake-share-overview.md#supported-item-types).

   :::image type="content" source="media/create-share/select-data-supported-types.png" alt-text="Screenshot of a prerelease Select data step showing the Select data button and an expanded list of item types." lightbox="media/create-share/select-data-supported-types.png":::

1. In the OneLake catalog, select the item you want to share, and then select **Select**.

   :::image type="content" source="media/create-share/select-data-item.png" alt-text="Screenshot of the OneLake catalog showing a selected lakehouse and the Select button." lightbox="media/create-share/select-data-item.png":::

1. Confirm the item under **Selected items**, and then select **Next**. To change the selection, select **Modify selection**.

   :::image type="content" source="media/create-share/selected-data.png" alt-text="Screenshot of the Select data step showing one selected lakehouse, Modify selection, and Next." lightbox="media/create-share/selected-data.png":::

1. On **Recipients**, add recipients by entering email addresses or service principals. You can enter multiple recipients.

1. Under **Configurations**, set the expiration date. Then select **Next**.

   :::image type="content" source="media/create-share/share-recipients-expiration.png" alt-text="Screenshot of the Recipients step showing a recipient email and an enabled Share expiration date." lightbox="media/create-share/share-recipients-expiration.png":::

1. On **Preview**, review the Share summary, source workspace, selected item, recipients, and configurations. Select **Share**.

   :::image type="content" source="media/create-share/share-preview.png" alt-text="Screenshot of the Preview step showing the Share summary, source workspace, shared lakehouse, recipients, expiration, and Share button." lightbox="media/create-share/share-preview.png":::

1. Wait while Fabric prepares the item, shares it with recipients, applies configurations, and finalizes the Share.

   :::image type="content" source="media/create-share/sharing-progress.png" alt-text="Screenshot of the Sharing your data progress page." lightbox="media/create-share/sharing-progress.png":::

1. Verify that the confirmation says **Share created**. The Share page displays the shared item, recipients, acceptance status, expiration configuration, and Share URL.

   :::image type="content" source="media/manage-share/created-share.png" alt-text="Screenshot of a created Share showing its Share URL, shared item, recipient count, acceptance status, expiration, and active status." lightbox="media/manage-share/created-share.png":::

## Distribute the invitation

IQ Sharing doesn't send email notifications when you create a Share. After you create the Share, copy the **Share URL** from the Share page and send it to the intended recipients. Recipients use this invitation URL to review the shared content and accept the Share into a workspace in their Fabric tenant.

> [!IMPORTANT]
> Send the URL only to intended recipients.

## Permissions and security

Review the tenant settings, item permissions, and recipient controls before you create a Share.

### Tenant settings

Fabric administrators can control who creates Shares by scoping the **External data sharing** tenant setting to specific security groups. Under **Apply to**, select **Specific security groups**, add the permitted groups, and select **Apply**. Only users in those groups can create Shares, subject to the required item permissions.

:::image type="content" source="media/create-share/external-data-sharing-tenant-setting.png" alt-text="Screenshot of the External data sharing tenant setting with Specific security groups selected and the admin group added." lightbox="media/create-share/external-data-sharing-tenant-setting.png":::

### Item permissions

The permissions required on each source item depend on whether OneLake security is enabled:

- **Without OneLake security:** The producer needs **Read** and **Reshare** permissions.
- **With OneLake security:** The producer needs **Write** and **Reshare** permissions.

**Write** permission grants access to all data in the item without evaluating OneLake security role assignments. This is the current OneLake security behavior and might change. OneLake security rules on the source item aren't honored when consumers access shared data through IQ Sharing.

Consumer access depends on the Share creator's permissions. If the creator loses a permission required for sharing, or loses access to the source item or workspace, consumers of that Share also lose access.

### Permissions at a glance

| Action | Required permissions |
| --- | --- |
| Create a Share with OneLake security disabled | **Read** and **Reshare** on the item. |
| Create a Share with OneLake security enabled | **Write** and **Reshare** on the item. |

### Limit recipients and access duration

Add only the intended users or service principals as recipients. Recipients must sign in with the invited identity; the invitation URL alone doesn't grant access. Consumers receive read-only access and don't need a guest identity in your tenant.

Every Share requires an expiration date. Access ends automatically when the Share expires. You can revoke a recipient or delete the Share to end access earlier.

## Related content

- [IQ Sharing overview](onelake-share-overview.md)
- [Accept an IQ Sharing invitation](accept-share.md)
- [Manage a Share with IQ Sharing](manage-share.md)
