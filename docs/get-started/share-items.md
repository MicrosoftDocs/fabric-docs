---
title: Share items in Microsoft Fabric
description: "Learn how to share an item and manage permission of an item in Microsoft Fabric."
author: paulinbar
ms.author: painbar
ms.reviewer: yicw, mesrivas
ms.topic: how-to
ms.date: 07/07/2023
ms.custom: 
---

# Share items in Microsoft Fabric

Workspaces are the central places where you collaborate with your colleagues in Microsoft Fabric. Besides assigning workspace roles, you can also use item sharing to grant and manage item level permissions in scenarios:

- Collaborate with colleagues who aren't in the same workspace.
- Grant item level permissions for colleagues who already have workspace roles.

This document describes how to share an item and manage the permissions. 

## Share an item via link

1. In the list of items, or in an open item, select the **Share** button ![Screenshot of share button.](media/share-items/share-button.png).
1. In the **Create and send link** dialog, first configure which scope this link works in and which permission you want to grant. Select **People in your organization can view** to open the **Select permissions** dialog.

    :::image type="content" source="./media/share-items/create-send-link.png" alt-text="Screenshot of create and send link.":::

1. Select the scope where the link works.

    :::image type="content" source="./media/share-items/select-permission.png" alt-text="Screenshot of select permission.":::

    **People in your organization** This type of link allows people in your organization to access this item. This link doesn't work for external users nor guest users. Use this link type when:

    - You want to share with someone in your organization.
    - You're comfortable with the link being shared with other people inside your organization.
    - You want to ensure that the link doesn't work for external or guest users.

    **People with existing access** This type of link generates a URL to the item, but it doesn't give any access to the item. Use this link type if you just want to send a link to somebody who already has access.

    **Specific people** This type of link allows specific people or groups to access the report. If you select this option, enter the names or email addresses of the people you wish to share with. This link type lets you share to guest users in your organization’s Azure Active Directory (Azure AD). You can't share to external users who aren't guests in your organization.

1. Configure the permissions included in the link.

    Links that give access to **People in your organization** or **Specific people** always include at least read access. However, you can also specify if you want the link to include the additional permissions as well. Select **Apply**.

    > [!NOTE] 
    > The **Additional permissions** settings vary for different items. Learn more about the [item permission model](#item-permission-model).

    :::image type="content" source="./media/share-items/additional-permissions.png" alt-text="Screenshot of additional permissions.":::

    > [!TIP] 
    > Links for **People with existing access** don't have additional permission settings because these links don't give access to the item.

1. In the **Create and send link** dialog, you see the option to copy the sharing link or share it via Outlook and Teams.

    **Copy link**: This option automatically generates a shareable link. Select **Copy** to copy the link to your clipboard.

    :::image type="content" source="./media/share-items/copy-link.png" alt-text="Screenshot of copy link.":::

    **By email**: This option opens your default email client app on your computer and creates an email draft with the link in it.

    **By Teams**: This option opens your Teams and creates a new Teams message draft with the link in it. 

1. You can also choose to send the link directly to **Specific people** or groups (distribution groups or security groups). Enter their name or email address, optionally type a message, and select **Send**. An email with this link is sent to your recipients.

    :::image type="content" source="./media/share-items/directly-send-link.png" alt-text="Screenshot of directly send link.":::

1. Select **OK**.

    :::image type="content" source="./media/share-items/send-link-by-email.png" alt-text="Screenshot of send link by email.":::

1. When your recipients receive the email, they can select **Open** and automatically access the report through the shareable link.

## Manage item links

1. To manage links that give access to the item, in the upper right of the sharing dialog, select **Manage permissions** button:

    :::image type="content" source="./media/share-items/manage-permission-entry-1.png" alt-text="Screenshot of entry of manage permission pane.":::

1. The **Manage permissions** pane opens, where you can copy or modify existing links or grant users direct access. To modify a given link, select **Edit**.

    :::image type="content" source="./media/share-items/manage-permission-pane.png" alt-text="Screenshot of manage permission pane.":::

1. In the **Edit link** pane, you can modify the permission included in the link, people who can use this link, or delete the link. Select **Apply** after your modification.

    :::image type="content" source="./media/share-items/edit-link-1.png" alt-text="Screenshot of edit org link.":::
    :::image type="content" source="./media/share-items/edit-link-2.png" alt-text="Screenshot of edit specific link.":::

1. For more access management capabilities, select the **Advanced** option in the footer of the Manage permissions pane. On the management page that opens, you can:

    - View, manage, and create links.
    - View and manage who has direct access and grant people direct access.
    - Apply filters or search for specific links or people.

    :::image type="content" source="./media/share-items/permission-management-page-1.png" alt-text="Screenshot of permission management page." lightbox="./media/share-items/permission-management-page-1.png":::

## Grant and manage access directly

In some cases, you need to grant permission directly instead of sharing link, such as granting permission to service account, for example. 

1. Select **Manage permission** from the context menu.

    :::image type="content" source="./media/share-items/permission-management-entry.png" alt-text="Screenshot of permission management entry.":::

1. Select **Direct access**.

    :::image type="content" source="./media/share-items/select-direct-access-tab.png" alt-text="Screenshot of selecting direct access tab." lightbox="./media/share-items/select-direct-access-tab.png":::

1. Select **Add user**.

    :::image type="content" source="./media/share-items/add-user.png" alt-text="Screenshot of add user." lightbox="./media/share-items/add-user.png":::

1. Enter the names of people or accounts that you need to grant access to directly. Select the permissions that you want to grant. You can also optionally notify recipients by email. 

1. Select **Grant**.
   
    :::image type="content" source="./media/share-items/direct-share-dialog.png" alt-text="Screenshot of direct share dialog.":::

1. You can see all the people, groups, and accounts with access in the list on the permission management page. You can also see their workspace roles, permissions, and so on. By selecting the context menu, you can modify or remove the permissions.

    :::image type="content" source="./media/share-items/modify-access.png" alt-text="Screenshot of modify access." lightbox="./media/share-items/modify-access.png":::

    > [!NOTE] 
    > You can't modify or remove permissions that are inherited from a workspace role, here in the permission management page. Learn more about [workspace roles](./roles-workspaces.md) and the [item permission model](#item-permission-model).

## Item permission model

Depending on the item being shared, you may find a different set of permissions that you can grant to recipients when you share. Read permission is always granted during sharing, so the recipient can discover the shared item in Data Hub and open it. 

|Permission granted while sharing|Effect|
|--- | --- |
|Read|Recipient can discover the item in Data Hub and open it. Connect to SQL endpoints of Lakehouse and Data warehouse.|
|Edit|Recipient can edit the item or its content.|
|Share|Recipient can share the item and grant permissions up to the permissions that they have. For example, if the original recipient has Share, Edit, and Read permissions, they can at most grant Share, Edit, and Read permissions to the next recipient.|
|Read All with SQL endpoint|Read Lakehouse or Data warehouse data through SQL endpoints.|
|Read all with Apache Spark|Read Lakehouse or Data warehouse data through OneLake APIs and Spark. Read Lakehouse data through Lakehouse explorer.|
|Build|build new content on the dataset.|
|Execute|Execute or cancel execution of the item.|


## Next steps

[Workspace roles](./roles-workspaces.md)
