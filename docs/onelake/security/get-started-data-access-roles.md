---
title: Get started with OneLake data access roles (preview)
description: Learn about OneLake data access role security and how you can get started using them in your lakehouse.
ms.reviewer: yuturchi
ms.author: aamerril
author: aamerril
ms.topic: how-to
ms.custom:
ms.date: 03/17/2025
#customer intent: As a Fabric user, I want to learn how to create and manage OneLake data access roles so that I can control access to specific folders in my lakehouse and ensure data security.
---

# Get started with OneLake data access roles (preview)

OneLake data access roles enable you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant read access to specific folders within a Fabric item, then assign these roles to users or groups. The access permissions determine the folders that users see when accessing the lake view of the data, either through the lakehouse UX, notebooks, or OneLake APIs.  

> [!IMPORTANT]
> Starting in August 2025, Contributors will no longer have sufficient permissions to view or manage OneLake data access roles. 

Fabric users in the Admin, Member, or Contributor roles can get started by creating OneLake data access roles to grant access to only specific folders in a lakehouse. To grant access to data in a lakehouse, add users to a data access role. Users that aren't part of a data access role see no data in that lakehouse.

> [!NOTE]
> Data access role security only applies to users that access OneLake directly. Fabric items such as SQL analytics endpoints, semantic models, and warehouses have their own security models and access OneLake through a delegated identity. This means users can see different items in each workload if they're given access to multiple items.

## Prerequisites

To configure security for a lakehouse, you must be an Admin, Member, or Contributor for the workspace. Role creation and membership assignment take effect as soon as the role is saved, so make sure you want to grant access before adding someone to a role.

OneLake data access roles are only supported for lakehouse items.  

## How to opt in

The data access roles preview feature is disabled by default. The preview feature is configured on a per-lakehouse basis. The opt-in control allows for a single lakehouse to try the preview without enabling it on any other lakehouses or Fabric items.

To enable the preview, you must be an Admin, Member, or Contributor in the workspace.

The preview feature can't be turned off once enabled.

1. Navigate to a lakehouse and select **Manage OneLake data access (preview)**.
1. Review the confirmation dialog. The data access roles preview isn't compatible with the External data sharing preview. If you're ok with the change, select **Continue**.

To ensure a smooth opt-in experience, all users with read permission to data in the lakehouse continue to have read access through a default data access role called **DefaultReader**. Using [virtualized role memberships](#assign-virtual-members), all users that had the necessary permissions to view data in the lakehouse (the ReadAll permission) are included as members of this default role. To start restricting access to those users, delete the DefaultReader role or remove the ReadAll permission from the accessing users.  

> [!IMPORTANT]
> Make sure that any users that are included in a data access role are removed from the DefaultReader role. Otherwise they maintain full access to the data.

## What types of data can be secured?

Use OneLake data access roles to manage OneLake read access to folders in a lakehouse. Read access can be given to any folder in a lakehouse, and the default state is no access to a folder. The security set by data access roles applies exclusively to access against OneLake or OneLake specific APIs. For more information, see the [data access control model.](../security/data-access-control-model.md)

## Create a role

Use the following steps to create a data access role in OneLake.

1. Open the lakehouse where you want to define security.

1. Select **Manage OneLake data access (preview)** from the Lakehouse menu.

1. On the **Manage OneLake data access** pane, select **New**.

1. Provide a name for the new role that meets the following guidelines:

   * The role name can only contain alphanumeric characters.
   * The role name must start with a letter.
   * Names are case insensitive and must be unique.
   * The maximum name length is 128 characters.

1. If you want this role to apply to all of the tables and files in this lakehouse, select the **All data** toggle.

    This selection also provides access to any folders that are added in the future.

1. If you want this role to apply only to a selected group of tables and folders, select the **Selected data** toggle. Then, use the following steps to define the approved data for this role.

   1. Select **Browse Lakehouse**.

      :::image type="content" source="./media/get-started-data-access-roles/browse-lakehouse.png" alt-text="Screenshot that shows the 'browse lakehouse' option to select data.":::
   
   1. Expand the **Tables** and **Files** directories to view data in your lakehouse. 
   1. Check the boxes next to the tables and files that you want the role to apply to.
   1. Select **Add data** to add the selected items to your role.

1. Use the **Add members to your role** textbox to manually enter the names or email addresses of users that you want to include in the role. Or, select **Advanced configuration** and follow the guidance in [Assign virtual members](#assign-virtual-members).

   To add members manually:

   1. Enter the name or email address of a user.
   1. Select the correct name from the suggested list.
   1. Select the check icon to confirm your selection, or the **X** icon to clear the selection.

1. Review the **Preview role** summaries.

   1. To edit the data preview, select **Browse Lakehouse** and update the selected tables and folders.
   1. To remove a user from the members preview, select more options (**...**) next to their name, then **Remove from role**.

1. Select **Create role** and wait for the notification that the role was successfully published.

## Edit a role

Use the following steps to edit an existing data access role in OneLake.

1. Open the lakehouse where you want to define security.

1. Select **Manage OneLake data access (preview)** from the Lakehouse menu.

1. On the **Manage OneLake data access** pane, select the role that you want to edit.

   This action opens the role details page, which includes two tabs: **Data in role** and **Members in role**.

1. Review the information in the **Data in role** tab:

   This tab shows all of the data that is members of the role can access.

   The **Data** column shows the name of the tables or folders that are part of the role access. You can expand and collapse schemas to view the items underneath. Hovering over an entry shows the full path of the table or folder. 

   The **Type** column tells you the type of item that was selected. The values are either: **Schema**, **Table**, or **Folder**. 

   The **Permissions** column shows what permission is granted by the role to each item. Currently, only **Read** is supported.

   The **Data access** column indicates whether any row or column level restrictions are applied to the item. An icon with a lock and horizontal lines indicates row level security is applied, while an icon with a lock and vertical lines indicates column level security is applied. 

1. To edit the data included in the role, select **Add data**.   

   This action opens the table and folder selection dialog. 

1. Check and uncheck tables or folders to add or remove them from the role. 

1. Select **Add data** to confirm your selections. 

1. Select the Members in role tab to view the members of the role.

   The **Members** column shows the profile picture and name of the member. 

   The **Type** column indicates whether the member is a User or Group. 

   The **Added using** column denotes whether a user was added via their Email as a member of the role, or included as part of a lakehouse permissions group. For more information about adding users using lakehouse permissions, see [Assign virtual members](#assign-virtual-members). 

1. To edit the members of the role, select **Add members**.

1. To add members manually, enter a name or email in the **Add members to your role** textbox. Select the correct name from the suggested list. Then, select the check icon to confirm your selection, or select the **X** icon to clear the selection. 

1. To remove users from the role, select more options (**...**) next to their name and select **Remove from role**.

Making any changes to role membership updates the role immediately. A notification notes the success or failure of any changes. 

## Delete a role

Use the following steps to delete a OneLake data access role.

1. Open the lakehouse where you want to define security.

1. Select **Manage OneLake data access (preview)** from the Lakehouse menu.

1. On the **Manage OneLake data access** pane, check the box next to the roles you want to delete.

1. Select **Delete** and wait for the notification that the roles are successfully deleted.

## Assign a member or group

OneLake data access roles supports two methods of adding users to a role. The main method is by adding users or groups directly to a role using the **Add people or groups** box on the **Assign role** page. The second is by creating virtual memberships with permission groups using the **Advanced configuration** control.

Adding users directly to a role adds the users as explicit members of the role. These users show up with their name and picture shown in the **Members** list.  

The virtual members allow for the membership of the role to be dynamically adjusted based on the [Fabric item permissions](../../security/permission-model.md#item-permissions) of the users. By selecting **Advanced configuration** and selecting a permission, you add any user in the Fabric workspace who has all of the selected permissions as an implicit member of the role. For example, if you chose **ReadAll, Write** then any user of the Fabric workspace that has ReadAll *and* Write permissions to the item would be included as a member of the role. You can see which users are being added by a permission group by looking at the **Added using** column in the **Members in role** tab. These members can't be manually removed directly. To remove a member that was added through a permission group, remove the permission group from the role. 

Regardless of which membership type you use, data access roles support adding individual users, Microsoft Entra groups, and security principals.  

### Assign virtual members

The permissions that can be used for virtual members are:

* Read
* Write
* Reshare
* Execute
* ReadAll

To assign users with permission groups, use the following steps: 

1. Select the name of the role you want to assign members to. 

1. On the role details page, select the **Members in role** tab.

1. Select **Add members**.

1. Select **Advanced configuration**. 

   :::image type="content" source="./media/get-started-data-access-roles/members-advanced-configuration.png" alt-text="Screenshot that shows selecting 'advanced configuration' to add members using permission groups.":::

1. In the **Permission groups** box, select the checkbox next to each permission that you want to include users for. 

   Each permission group shows a count of how many users are included in that group. 

   Selecting multiple permission groups includes users with all of the selected required permissions. 

1. Select **Add** to include the groups and save the role.                

## Known issues

The [external data sharing preview](../../governance/external-data-sharing-overview.md) feature isn't compatible with the data access roles preview. When you enable the data access roles preview on a lakehouse, any existing external data shares might stop working.

OneLake security doesn't work with cross-region OneLake shortcuts.  

## Related content

* [Fabric Security overview](../../security/security-overview.md)
* [Fabric and OneLake security overview](./get-started-security.md)
* [Data access control model](../security/data-access-control-model.md)
