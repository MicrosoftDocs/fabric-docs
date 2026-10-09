---
title: Manage Permissions and Share Ontology (Preview) Items
description: Learn how to manage permissions for an ontology (preview) item and share it.
ms.date: 09/21/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Manage permissions and share an ontology (preview) item

When you share an ontology (preview), you give users read access so they can use it downstream. The recipient gets item-level access and doesn't need a workspace role. You can customize the permissions the recipient gets.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you start, verify that you have permission to share the ontology. Valid permissions include being an Admin or Member in the workspace that contains the ontology, or having item-level **Reshare** permission on the ontology.

## Share an ontology

1. In your [Microsoft Fabric workspace](https://fabric.microsoft.com/), locate the ontology you want to share.
1. Select the ellipsis (**...**) next to the ontology, and then select **Share**.

   :::image type="content" source="media/how-to-share-permissions/share-ontology-menu.jpg" alt-text="Screenshot of an ontology context menu with Share highlighted." lightbox="media/how-to-share-permissions/share-ontology-menu.jpg":::

1. In the sharing dialog, enter the name or email address of the person or group you want to share with.
1. Select the permissions you want to grant. Read permission is always included by default.
1. Optionally, add a message and choose whether to notify the recipient by email.
1. Select **Grant**.

   :::image type="content" source="media/how-to-share-permissions/grant-ontology-access.png" alt-text="Screenshot of the Grant people access dialog with Share and Edit permissions selected." lightbox="media/how-to-share-permissions/grant-ontology-access.png":::

If you selected the email notification option, the recipient receives an email notification that they can find and open the ontology. The level of access depends on the permissions you granted. In the preceding screenshot, the recipient has Share and Edit permissions, so they can edit the ontology and share it with other users.

## Permission levels

When you share an ontology, you can grant the following permissions. Read permission is always included by default.

| Permission | Sharing dialog label | What it grants |
| --- | --- | --- |
| **Read** | Read | The recipient can discover the item, open it, and view the ontology model structure. |
| **Write** | Edit | The recipient can modify the ontology. |
| **Reshare** | Share | The recipient can share the ontology with other users and grant permissions up to the permissions they have. |

## Manage permissions

Use the **Manage permissions** page to view who has access to your ontology and to modify or revoke permissions.

1. In your workspace, select the ellipsis (**...**) next to the ontology.
1. Select **Manage permissions**.

On this page, you can see:

- Users who have access through workspace roles, along with their role and permissions.
- Users who received access through item sharing, along with the specific permissions granted.

### Modify or remove access

- To remove all item permissions for a user, select the ellipsis (**...**) next to their name, and then select **Remove access**.
- To change specific permissions, select the ellipsis (**...**), and then select the appropriate option to add or remove an individual permission.

:::image type="content" source="media/how-to-share-permissions/manage-ontology-permissions.jpg" alt-text="Screenshot of the Manage permissions menu with options to remove write, reshare, or all access." lightbox="media/how-to-share-permissions/manage-ontology-permissions.jpg":::

You can't modify or remove permissions inherited from a workspace role on this page. To change workspace role assignments, see [Roles in workspaces in Microsoft Fabric](../../fundamentals/roles-workspaces.md).

## Limitations

- Permission changes can take up to two hours to take effect if the user is currently signed in. The changes appear in **Manage permissions** immediately.
- Sharing is available through the Fabric user experience only. Ontology doesn't currently support programmatic sharing through APIs.
- Shared recipients receive access only to the specific ontology you shared, not to other items in the workspace.

## Related content

- [Share items in Microsoft Fabric](../../fundamentals/share-items.md)
- [Permission model in Microsoft Fabric](../../security/permission-model.md)
