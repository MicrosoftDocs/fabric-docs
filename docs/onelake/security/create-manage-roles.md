---
title: Create roles 
description: Learn how to create and manage roles with OneLake security (preview) to control access to items within OneLake.
ms.reviewer: aamerril
ms.author: kgremban
author: kgremban
ms.topic: how-to
ms.custom:
ms.date: 01/29/2026
#customer intent: As a Fabric user, I want to learn how to create and manage OneLake security roles so that I can control access to specific folders in my lakehouse and ensure data security.
---

# Create and manage OneLake security roles (preview)

By using OneLake security roles, you can control who can access specific tables and folders in your Fabric data items. This article shows you how to create, edit, and delete security roles, and how to assign members to those roles. For an overview of OneLake security concepts and permissions, see [OneLake security overview](get-started-security.md).

The following data items support OneLake security:

| Fabric item | Status | Supported permissions |
| ---- | --- | --- |
| Lakehouse | Preview | Read, ReadWrite |
| Azure Databricks Mirrored Catalog | Preview | Read |

Role creation and membership assignment take effect as soon as you save the role, so make sure you want to grant access before adding someone to a role.

## Prerequisites

* Fabric Write or Reshare permissions (generally included for Admin or Member workspace users)
* While in preview OneLake security is disabled by default and needs to be enabled on a per-item basis. For more information, see [Get started with OneLake security](get-started-onelake-security.md).

## Create a role

Use the following steps to create a OneLake security role.

1. Open the Fabric item where you want to define security.

1. Select **Manage OneLake security (preview)** from the item menu.

1. On the **OneLake security (preview)** pane, select **New**.

1. Provide the following information for the new role:

   | Parameter | Value |
   | --------- | ----- |
   | **Role name** | Provide a name that meets the following guidelines:<br><br>* The role name only contains alphanumeric characters.<br>* The role name starts with a letter.<br>* Names are case insensitive and must be unique.<br>* The maximum name length is 128 characters. |
   | **Type of role** | Select **Grant**. |
   | **Select Grant permissions** | Choose the permissions you want to grant. **Read** is selected at a minimum, and you can optionally add **ReadWrite**. |
   | **Add data to your role** | If you want this role to apply to all of the tables and files in this lakehouse, select the **All data** toggle. This selection also provides access to any folders that are added in the future.<br><br>If you want this role to apply only to a selected group of tables and folders, select the **Selected data** toggle. Then, use the following steps to define the approved data for this role. |
   | **Add members to your role** | Manually enter the names or email addresses of the users that you want to include in the role. Or, select **Advanced configuration** and follow the steps in [Assign virtual members](#assign-virtual-members) |

1. If you chose to add **Selected data** to your role, configure that selection:

   1. Select **Browse Lakehouse** or the equivalent for the item that you're working with.

      :::image type="content" source="./media/create-manage-roles/browse-lakehouse.png" alt-text="Screenshot that highlights the 'Browse Lakehouse' option to select data.":::

   1. Expand the **Tables** and **Files** directories to view data in your lakehouse.
   1. Check the boxes next to the tables and files that you want the role to apply to.
   1. Select **Add data** to add the selected items to your role.

1. Review the **Preview role** summaries.

   1. To edit the **Data preview**, select **Browse Lakehouse** and update the selected tables and folders.
   1. To remove a user from the **Members preview**, select more options (**...**) next to their name, then **Remove from role**.

1. Select **Create role** and wait for the notification that the role was successfully published.

## Edit a role

Use the following steps to edit an existing OneLake security role.

1. Open the item where you want to define security.

1. Select **Manage OneLake security (preview)** from the item menu.

1. On the **OneLake security** pane, select the role that you want to edit.

   This action opens the role details page, which includes two tabs: **Data in role** and **Members in role**.

1. Review the information in the **Data in role** tab:

   This tab shows all of the data that the members of the role can access.

   :::image type="content" source="./media/create-manage-roles/data-in-role.png" alt-text="Screenshot that shows the details visible in the 'Data in role' tab.":::

      The role name tells you which role you are looking at. To edit the role name, select the **Edit** dropdown. Select **Update role name**, enter a new name, and then confirm by selecting the check mark. You can discard your changes by selecting the **X**.

      The **Permissions** item tells you what permissions the role grants. To change the role permissions, select the **Edit** dropdown. Select **Edit role permissions**, edit the selected permissions by using the dropdown, and then confirm by selecting the check mark. You can discard your changes by selecting the **X**.

   The **Data** column shows the name of the tables or folders that are part of the role access. You can expand and collapse schemas to view the items underneath. Hover over an entry to view the full path of the table or folder. Hover over the **...** to see options to configure **Row-level security** or **Column-level security**. The [row level security](./row-level-security.md) and [column level security](./column-level-security.md) guides provide more information on how that works.

   The **Type** column tells you the type of item that you selected. The values are either: **Schema**, **Table**, or **Folder**.

   The **Data access** column indicates whether any row or column level restrictions are applied to the item. An icon with a lock and horizontal lines indicates row level security is applied, while an icon with a lock and vertical lines indicates column level security is applied.

1. To edit the data included in the role, select **Edit data**.

   This action opens the table and folder selection dialog.

1. Check and uncheck tables or folders to add or remove them from the role.

1. Select **Add data** to confirm your selections.

1. Select the **Members in role** tab to view the members of the role.

   The **Members** column shows the profile picture and name of the member.

   The **Type** column indicates whether the member is a User or Group.

   The **Added using** column denotes whether a user was added via their email address as a member of the role, or included as part of a lakehouse permissions group. For more information about adding users by using item permissions, see [Assign virtual members](#assign-virtual-members).

1. To edit the members of the role, select **Add members**.

1. To add members manually, enter a name or email in the **Add members to your role** textbox. Select the correct name from the suggested list. Then, select the check icon to confirm your selection, or select the **X** icon to clear the selection.

1. To remove users from the role, select more options (**...**) next to their name and select **Remove from role**.

If you make any changes to role membership, the role updates immediately. A notification shows the success or failure of any changes.

## Delete a role

Use the following steps to delete a OneLake data access role.

1. Open the lakehouse where you want to define security.

1. Select **Manage OneLake security (preview)** from the Lakehouse menu.

1. On the **OneLake security** pane, check the box next to the roles you want to delete.

1. Select **Delete** and wait for the notification that the roles are successfully deleted.

## Assign a member or group

OneLake security role supports two methods of adding users to a role. The main method is by adding users or groups directly to a role using the **Add people or groups** box on the **Assign role** page. The second method is by creating virtual memberships with permission groups using the **Advanced configuration** control.

When you add users directly to a role, you make them explicit members of the role. These users appear with their name and picture in the **Members** list.  

By using virtual members, the membership of the role is dynamically adjusted based on the [Fabric item permissions](../../security/permission-model.md#item-permissions) of the users. By selecting **Advanced configuration** and selecting a permission, you add any user in the Fabric workspace who has all of the selected permissions as an implicit member of the role. For example, if you choose **ReadAll, Write**, any user of the Fabric workspace that has ReadAll *and* Write permissions to the item is included as a member of the role. You can see which users are included in a permission group by looking at the **Added using** column in the **Members in role** tab. You can't manually remove these members directly. To remove a member that you added through a permission group, remove the permission group from the role.

Regardless of which membership type you use, OneLake security roles support adding individual users, Microsoft Entra groups, and security principals.  

### Assign virtual members

You can use the following permissions to identify virtual members:

* Read
* Write
* Reshare
* Execute
* ReadAll

To assign users to permission groups, use the following steps:

1. Select the name of the role you want to assign members to.

1. On the role details page, select the **Members in role** tab.

1. Select **Add members**.

1. Select **Advanced configuration**.

   :::image type="content" source="./media/get-started-data-access-roles/members-advanced-configuration.png" alt-text="Screenshot that shows selecting 'advanced configuration' to add members using permission groups.":::

1. In the **Permission groups** box, select the check box next to each permission that you want to include users for.

   Each permission group shows a count of how many users are included in that group.

   Selecting multiple permission groups includes users with all of the selected required permissions.

1. Select **Add** to include the groups and save the role.
