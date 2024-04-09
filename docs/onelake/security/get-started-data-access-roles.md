---
title: Get started with OneLake data access roles (preview)
description: Learn about OneLake data access roles and how to get started using them.
ms.reviewer: yuturchi
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.custom:
ms.date: 02/21/2024
---

# Get started with OneLake data access roles (preview)

## Overview

OneLake data access roles for folders is a new feature that enables you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant read access to specific folders within a Fabric item, and assign them to users or groups. The access permissions determine what folders users see when accessing the lake view of the data, either through the lakehouse UX, notebooks, or OneLake APIs.  

Fabric users in the Admin, Member, or Contributor roles can get started by creating OneLake data access roles to grant access to only specific folders in a lakehouse. To grant access to data in a lakehouse, add users to a data access role. Users that aren't part of a data access role see no data in that lakehouse.

> [!NOTE]
> Data access role security ONLY applies to users accessing OneLake directly. Fabric items such as SQL Endpoint, Semantic models, and Warehouses have their own security models and access OneLake through a delegated identity. This means users can see different items in each experience if they are given access to multiple items.

## How to opt in

All lakehouses in Fabric have the data access roles preview feature disabled by default. The preview feature is configured on a per-lakehouse basis. The opt-in control allows for a single lakehouse to try the preview without enabling it on any other lakehouses or Fabric items.  

To enable the preview, you must be an Admin, Member, or Contributor in the workspace. Navigate to a lakehouse and select the **Manage OneLake data access (preview)** button in the ribbon to open the confirmation dialog. The data access roles preview isn't compatible with the External data sharing preview. If you're' ok with the change, select **Continue**. The manage roles UX opens and the feature is now enabled.

The preview feature can't be turned off once enabled.

To ensure a smooth opt-in experience, all users with read permission to data in the lakehouse continue to have read access. Migrating access is done through the creation of a default data access role called "DefaultReader." Using [virtualized role memberships](#assign-virtual-members) all users that had the necessary permissions to view data in the lakehouse (the ReadAll permission) are included as members of this default role. To start restricting access to those users, ensure that the DefaultReader role is deleted or that the ReadAll permission is removed from the accessing users.  

> [!IMPORTANT]
> Make sure that any users that are included in a data access role are not also part of the DefaultReader role. Otherwise they will maintain full access to the data.

## What types of data can be secured?

OneLake data access roles can be used to manage OneLake read access to folders in a lakehouse. Read access can be given to any folder in a lakehouse, and no access to a folder is the default state. The security set by data access roles applies exclusively to access against OneLake or OneLake specific APIs. For more information, see the [data access control model.](../security/data-access-control-model.md)

## Prerequisites

In order to configure security for a lakehouse, you must be an Admin, Member, or Contributor for the workspace. Role creation and membership assignment take effect as soon as the role is saved, so make sure you want to grant access before adding someone to a role.  

OneLake data access roles are only supported for lakehouse items.  

## Create a role

1. Open the lakehouse where you want to define security.
2. In the right side of the lakehouse ribbon, select on **Manage OneLake data access (preview)**.
3. On the top left of the **Manage OneLake data access** pane, select **New Role**, and type the role name you want. The role name has certain restrictions:
    1. The role name can only contain alphanumeric characters.
    2. The role name must start with a letter.
    3. Names are case insensitive and must be unique.
    4. The maximum name length is 128 characters.
4. Select the **All folders** toggle if you want to have this role apply to all the folders in this lakehouse.
    1. This selection includes any folders that are added in the future.
5. Select the **Selected folders** if you want to only have this role apply to selected folders.
    1. Check the boxes next to the folders you want the role to apply to.
    1. Roles grant access to folders. To allow a user to access a folder, check the box next to it. If a user shouldn’t see a folder, don't check the box.
    1. In the bottom left, select **Save** to create your role.
6. In the top left, select **Assign role** to open the role membership pane.
7. Add people, groups, or email addresses to the **Add people or groups** control. For more information, see [Assign a member or group.](#assign-a-member-or-group)
8. Select **Add** to move your selection to **Assigned people and groups** list. Selecting **Add** doesn't save your selection yet.
9. Select **Save** and wait for the notification that the roles are successfully published.
10. Select the **X** in the top right to exit the pane.

## Edit a role

1. Open the lakehouse where you want to define security.
2. In the right side of the lakehouse ribbon, select on **Manage OneLake data access (preview)**.
3. On the **Manage OneLake data access** pane, hover over the role you want to edit and select it.
4. You can change which folders are being granted access to by selecting or deselecting the checkboxes next to each folder.
5. To change the people, select **Assign role**. For more information, see [Assign a member or group.](#assign-a-member-or-group)
6. To add more people, type names in the **Add people or groups** box and select **Add**.  
7. To remove people, select their name under **Assigned people and groups** and select **Remove**.
8. Select **Save** and wait for the notification that the roles are successfully published.
9. Select the **X** in the top right to exit the pane.

## Delete a role

1. Open the lakehouse where you want to define security.
2. In the right side of the lakehouse ribbon, select on **Manage OneLake data access (preview)**.
3. On the **Manage OneLake data access** pane, check the box next to the roles you want to delete.
4. Select **Delete** and wait for the notification that the roles are successfully deleted.
5. Select the **X** in the top right to exit the pane.

## Assign a member or group

OneLake data access roles supports two different methods of adding users to a role. The main method is by adding users or groups directly to a role using the **Add people or group** box on the Assign role page. The second is using virtual memberships with the **Automatically add users with all these permissions** control.  

Adding users directly to a role with the **Add people or group** box adds the users as explicit members of the role. These users show up with just their name and picture shown in the **Assigned people and groups** list.  

The virtual members allow for the membership of the role to be dynamically adjusted based on the Fabric item permissions of the users. By selecting **Automatically add users with all these permissions** box and selecting a permission, you're adding any user in the Fabric workspace who has all of the selected permissions as an implicit member of the role. For example, if you chose **ReadAll, Write** then any user of the Fabric workspace that has ReadAll AND Write permissions to the lakehouse would be included as a member of the role. You can see which users are being added as virtual members by looking for the "Assigned by workspace permissions" text under their name in the **Assigned people and groups** list. These members can't be manually removed and need to have their corresponding Fabric permission revoked in order to be unassigned.  

Regardless of which membership type, data access roles support adding individual users, Microsoft Entra groups, and security principals.  

### Assigning members

To get to the assign members page there are two ways:

#### Method 1

1. Select the name of the role you want to assign members to.
2. At the top of the role details page, select **Assign role**.

#### Method 2

1. From the role list, select the checkbox next to the role you want to assign members to.
2. Select **Assign**.

#### Assign users directly

From the **Assign role** page, you can add members or groups by typing their name or email address in the **Add people or groups** box. Select on the result you want to select that user. You can repeat this step for as many users as you want. If you selected the wrong users, you can select the **X** next to their entry to remove them from the box, or select **Clear** to remove all entries. Once you're done, select **Add** to move the selected users to the access list. Adding them to the list doesn't save yet. It's a preview of the role membership list once those users are added.

To publish the access changes, select **Save** at the bottom of the pane.

#### Assign virtual members

To add virtual members, use the **Automatically add users with all these permissions** box. Select the box to open the dropdown picker to choose the Fabric permissions to virtualize. Users are virtualized if they have **all** of the checked permissions.  

The permissions that can be used for virtualization are:

- Read
- Write
- Reshare
- Execute
- ReadAll
- ViewOutput
- ViewLogs

Once a permission is selected, any virtualized members show in the **Assigned people and groups** list. The users have text beside their name indicating that they were assigned by the workspace permissions. These users can't be manually removed from the role assignment. Instead, remove the corresponding permissions from the virtualization control or remove the Fabric permission.

## Known issues

The external data sharing preview feature (link) isn't compatible with the data access roles preview. When you enable the data access roles preview on a lakehouse, any existing external data shares may stop working.

## Related content

- [Fabric Security overview](../../security/security-overview.md)

- [Fabric and OneLake security overview](./fabric-onelake-security.md)

- [Data Access Control Model](../security/data-access-control-model.md)