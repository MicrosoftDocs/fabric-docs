---
title: Lakehouse sharing and permission management
description: Learn how to share a lakehouse and manage permissions, including how to remove permissions and create data access roles.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 04/19/2024
ms.search.form: Lakehouse Sharing Permissions
---

# How lakehouse sharing works

When you share a lakehouse, you grant other users or groups access to a lakehouse without giving access to the workspace and the rest of its items. To see the list of items that others shared with you, select **Browse** in the Fabric navigation bar, and then select **Shared with me**. You can also see lakehouses that others shared with you in your OneLake data hub.

Sharing a lakehouse also grants access to the SQL endpoint and the associated default semantic model.

To share a lakehouse, navigate to your workspace, and select the ellipsis (**...**) next to the lakehouse name. From the **More options** menu, select **Share**. Complete the fields in the **Grant people access** screen and select **Grant**.

To edit or remove permissions, see [Managing permissions](#managing-permissions).

## Sharing and permissions

By default, sharing a lakehouse grants users read permission to the lakehouse, the associated SQL endpoint, and the default semantic model. In addition to these default permissions, you can grant:

- ReadData permission on SQL endpoint to access data without SQL policy.
- ReadAll permission on the lakehouse to access all data using Apache Spark.
- Build permission on the default semantic model to allow building Power BI reports on top of the semantic model.

## Managing permissions

After you share an item, you can edit or remove permissions in the **Direct access** screen for that item. To manage permissions for the lakehouse you shared, navigate to your workspace and select the ellipsis (**...**) next to the lakehouse name. From the **More options** menu, select **Manage permissions**. In the **Direct access** screen, you can see the access you granted, add custom permissions, and remove access and custom permissions.

## Folder level access control

OneLake data access permissions (preview) allow you to create custom roles within a lakehouse and to grant read permissions only to specific folders in OneLake. OneLake folder security is inheritable for all subfolders. For each OneLake role, you can assign users and security groups, or grant an automatic assignment based on the workspace role.

Learn more about OneLake [Role-based access control (RBAC)](../onelake/security/data-access-control-model.md).

### OneLake data access roles

To create a new data access role:

1. Open the lakehouse where you want to define the new role.
1. Select **Manage OneLake data access (preview)** from the ribbon, and confirm that you want to enable data access roles (preview) for the lakehouse.
1. Next select **New role** and enter a name for the role.
1. If you want the role to apply to all folders in the lakehouse, select **All folders**. If you want the role to only apply to selected folders, choose **Selected folders** and select the relevant folders.
1. Select **Save**. A notification appears that confirms the creation of the new role. 
1. From the **Edit \<role name>** pane, grant the new role Read permissions. To do so, select **Assign role**. 
1. Choose the permissions you would like to assign, enter names or email addresses in the **Add people or groups** field and select **Add**.
1. Review the assignee list under **Assigned people and groups**, remove any that you don't want on the list, and select **Save**.

For more information, see [Get started with OneLake data access roles](../onelake/security/get-started-data-access-roles.md).

## Related content

- [Workspace roles in Lakehouse](workspace-roles-lakehouse.md)
- [Share items in Microsoft Fabric](../get-started/share-items.md)
- [Role-based access control (RBAC)](../onelake/security/data-access-control-model.md)
