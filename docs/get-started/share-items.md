---
title: Share items
description: "Learn how to share an item and manage permission of an item."
author: yicw16322
ms.author: yicw
ms.reviewer: painbar, mesrivas
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: 
---

# Share items

Workspaces are the central places where you collaborate with your colleagues. Besides assigning workspace roles, you can also use item sharing to grant and manage item level permissions in scenarios:

- Collaborate with colleagues who aren't in the same workspace.
- Grant artifact level permissions for colleagues who already have workspace roles.

This document describes how to share an item and manage the permissions. 

> [!NOTE] 
> Currently, you can share Kusto databases and KQL querysets. Sharing other items will be available soon. 

## Share an item via link

1. In the list of items, or in an open item, select the **Share** button ![Screenshot of share button.](media/item-sharing/share-button.png).
1. In the **Create and send link** dialog, first configure which scope this link works in and which permission you want to grant. Select **People in your organization can view** to open the **Select permissions** dialog.

    ![Screenshot of create and send link.](media/item-sharing/create-send-link.png)

1. Select the scope where the link works.

    ![Screenshot of select permission.](media/item-sharing/select-permission.png)

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

    ![Screenshot of additional permissions.](media/item-sharing/additional-permissions.png)

    > [!TIP] 
    > Links for **People with existing access** don't have additional permission settings because these links don't give access to the item.

1. In the **Create and send link** dialog, you see the option to copy the sharing link or share it via Outlook and Teams.

    **Copy link**: This option automatically generates a shareable link. Select **Copy** to copy the link to your clipboard.

    ![Screenshot of copy link.](media/item-sharing/copy-link.png)

    **By email**: This option opens your default email client app on your computer and creates an email draft with the link in it.

    **By Teams**: This option opens your Teams and creates a new Teams message draft with the link in it. 

1. You can also choose to send the link directly to **Specific people** or groups (distribution groups or security groups). Enter their name or email address, optionally type a message, and select **Send**. An email with this link is sent to your recipients.

    ![Screenshot of directly send link.](media/item-sharing/directly-send-link.png)

1. Select **Send**.

    ![Screenshot of send link by email.](media/item-sharing/send-link-by-email.png)

1. When your recipients receive the email, they can select **Open** and automatically access the report through the shareable link.

## Manage item links

1. To manage links that give access to the item, in the upper right of the sharing dialog, select **Manage permissions** button:

    ![Screenshot of entry of manage permission pane.](media/item-sharing/manage-permission-entry-1.png)

1. The **Manage permissions** pane opens, where you can copy or modify existing links or grant users direct access. To modify a given link, select **Edit**.

    ![Screenshot of manage permission pane](media/item-sharing/manage-permission-pane.png)

1. In **Edit link** pane, you can modify the permission included in the link, people who can use this link, or delete the link. Select **Apply** after your modification.

    ![Screenshot of edit org link](media/item-sharing/edit-link-1.png)
    ![Screenshot of edit specific link](media/item-sharing/edit-link-2.png)

1. For more access management capabilities, select the **Advanced** option in the footer of the Manage permissions pane. On the management page that opens, you can:

    - View, manage, and create links.
    - View and manage who has direct access and grant people direct access.
    - Apply filters or search for specific links or people.

    [ ![Screenshot of permission management page.](media/item-sharing/permission-management-page-1.png) ](media/item-sharing/permission-management-page-1.png#lightbox)

## Grant and manage access directly

In some cases, you need to grant permission directly instead of sharing link, such as granting permission to service account, for example. 

1. Select **Manage permission** from the context menu.

    ![Screenshot of permission management entry.](media/item-sharing/permission-management-entry.png)

1. Select **Direct access**.

    [ ![Screenshot of selecting direct access tab.](media/item-sharing/select-direct-access-tab.png) ](media/item-sharing/select-direct-access-tab.png#lightbox)

1. Select **Add user**.

    [ ![Screenshot of add user.](media/item-sharing/add-user.png) ](media/item-sharing/add-user.png#lightbox)

1. Enter the names of people or accounts that you need to grant access to directly. Select the permissions that you want to grant. You can also optionally notify recipients by email. 

1. Select **Grant**.
   
    ![Screenshot of direct share dialog.](media/item-sharing/direct-share-dialog.png)

1. You can see all the people, groups, and accounts with access in the list on the permission management page. You can also see their workspace roles, permissions, and so on. By selecting the context menu, you can modify or remove the permissions.

    [ ![Screenshot of modify access.](media/item-sharing/modify-access.png) ](media/item-sharing/modify-access.png#lightbox)

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


## See also

[Workspace roles](./roles-workspaces.md)