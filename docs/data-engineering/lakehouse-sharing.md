---
title: Lakehouse sharing and permission management
description: Learn how to share a lakehouse and assign permissions.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: Lakehouse Sharing Permissions
---

# How lakehouse sharing works

By sharing, users grant other users or a group of users access to a lakehouse without giving access to the workspace and the rest of its items. Shared lakehouse can be found through Data Hub or the Shared with Me section in Microsoft Fabrics.

When someone shares a lakehouse, they also grant access to the SQL endpoint and associated default semantic model.

Sharing dialog can be started by clicking the Share button next to the lakehouse name in the Workspace view.

## Sharing and permissions

Lakehouse sharing by default grants users Read permission on shared lakehouse, associated SQL endpoint, and default semantic model. In addition to default permission, the users can receive:

- ReadData permission on SQL endpoint to access data without SQL policy.
- ReadAll permission on the lakehouse to access all data using Apache Spark.
- Build permission on the default semantic model to allow building Power BI reports on top of the semantic model.

## Managing permissions

Once the item is shared or users get a role assigned in the workspace, they appear in permission management. The permission management dialog can be started by clicking More(...) next to the item in the workspace view and selecting Permission Management. The users can get:

- access granted;
- access removed;
- custom permissions added;
- custom permissions removed.

## Folder level access control

OneLake data access permissions (Preview) allow users to create custom roles within a lakehouse and to grant read permissions only to the specified folders when accessing OneLake. OneLake folder security is inheritable for all subfolders. For each OneLake role, users can assign users, security groups or grant an automatic assignment based on the workspace role.

Learn more about [OneLake Data Access Control Model](../onelake/security/data-access-control-model.md) and [Get Started with Data Access](../onelake/security/get-started-data-access-roles.md).

### Creating OneLake Data Access Roles

Open the lakehouse where you want to define the roles. Select **Manage OneLake data access (preview)** and confirm enabling OneLake Data Access (Preview) for this lakehouse.

- Step 1. Create a new role by selecting **New Role**. If you want to have this role apply to all the folders in this lakehouse, Select the **All folders**. if you want to only have this role apply to selected folders, select **Selected Folders** along with the Folders you need.
- Step 2: Assign the Role membership by selecting "Assign Role". Add people, groups, or email addresses to the **Add people or groups** control.

## Related content

- [Workspace roles and permissions in lakehouse](workspace-roles-lakehouse.md)
- [Share items in Microsoft Fabric](../get-started/share-items.md)
- [Learn more about OneLake Data Access Control Model](../onelake/security/data-access-control-model.md)
