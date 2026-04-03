---
title: Get started with OneLake security
description: Learn about OneLake security and how you can get started using it to secure your data in OneLake.
ms.reviewer: eloldag, aamerril
ms.topic: how-to
ms.date: 01/12/2026
#customer intent: As a Fabric user, I want to learn how to create and manage OneLake security so that I can control access to specific folders in my lakehouse and ensure data security.
---

# Get started with OneLake security

OneLake security enables you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant access to specific folders within a Fabric item, then assign these roles to users or groups. Roles can also contain row or column level security to further limit access. The OneLake security permissions determine what data that user can see across all experiences in Fabric.

Fabric users with Write and Reshare permissions (generally Admin and Member workspace users) can get started by creating OneLake security roles to grant access to only specific folders or tables in a Fabric data item. To grant access to data in an item, add users to a data access role. Users that aren't part of a data access role see no data in that item.

## What types of data can be secured?

Use OneLake security roles to manage OneLake read access to any tables or folders in a supported data item. Access to tables can be further restricted using row and/or column level security. Any security set applies to access from all engines in Fabric. For more information, see the [data access control model.](../security/data-access-control-model.md)

For specific item types, ReadWrite access can also be configured. This permission gives users the ability to edit data in a lakehouse on specified tables or folders without giving them access to create or manage Fabric items. ReadWrite access enables users to perform write operations through Spark notebooks, the OneLake file explorer, or OneLake APIs. Write operations through the Lakehouse UX for viewers is not supported.

The following data items support OneLake security:

| Fabric item | Status | Supported permissions |
| ---- | --- | --- |
| Lakehouse | GA | Read, ReadWrite |
| Azure Databricks Mirrored Catalog | GA | Read |
| Mirrored Database | GA | Read |

### Default settings

When a new item is created, it will come with a set of default roles. Default roles ensure that privileged users are able to see and interact with data in the newly created item. Each item will have a different set of default roles depending on that item's use cases, however most will contain a **DefaultReader** role. With [virtualized role memberships](./create-manage-roles.md#assign-virtual-members), all users that had the necessary permissions to view data in the item (the ReadAll permission, for example) are included as members of this default role. To start restricting access to those users, delete the DefaultReader role or remove the ReadAll permission from the accessing users.  

Newly created items that have a corresponding [SQL Analytics Endpoint item]() will start in **User's identity mode** by default. Admins and Members can change the mode at any time in the Endpoint's settings.

> [!IMPORTANT]
> Make sure that any users that are included in a data access role are removed from the DefaultReader role. Otherwise they maintain full access to the data.

## Enable OneLake security for SQL analytics endpoint

Before you can use OneLake security with SQL analytics endpoint, you must enable its **User's identity mode**. Newly created SQL analytics endpoints will default to user's identity mode, so these steps must be followed for existing SQL analytics endpoints.

> [!NOTE]
> Switching to **User's identity** mode only needs to be done once per SQL analytics endpoint. Endpoints that are not switched to user's identity mode will continue to use a delegated identity to evaluate permissions.

1. Navigate to SQL analytics endpoint.

1. In the SQL analytics endpoint experience, select the **Security** tab in the top ribbon.

1. Select **View data access mode** then **Data access mode settings**.

   :::image type="content" source="./media/row-level-security/sqlaep-enable-userid.png" alt-text="Screenshot that shows selecting 'user identity' to enable OneLake security for SQL analytics endpoint.":::

1. Select the **Use OneLake security for tables (User's identity access mode)**. 

   :::image type="content" source="./media/row-level-security/sqlaep-prompt.png" alt-text="Screenshot that shows user prompt which must be accepted to enable OneLake security for table read access.":::

1. Select **Apply**.

1. Select **Continue**.

Now the SQL analytics endpoint is ready to use with OneLake security.

## Related content

* [Create and manage OneLake security roles](./create-manage-roles.md)
* [OneLake security data access control model](./data-access-control-model.md)