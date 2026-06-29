---
title: Get started with OneLake security
description: Learn about OneLake security and how you can get started using it to secure your data in OneLake.
ms.reviewer: aamerril # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: how-to
ms.date: 01/12/2026
#customer intent: As a Fabric user, I want to learn how to create and manage OneLake security so that I can control access to specific folders in my lakehouse and ensure data security.
---

# Get started with OneLake security

OneLake security enables you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant access to specific folders within a Fabric item, then assign these roles to users or groups. Roles can also contain row or column level security to further limit access. The OneLake security permissions determine what data that user can see across all experiences in Fabric.

Fabric users with Write and Reshare permissions (generally Admin and Member workspace users) can get started by creating OneLake security roles to grant access to only specific folders or tables in a Fabric data item. To grant access to data in an item, add users to a data access role. Users that aren't part of a data access role see no data in that item.

## What types of data can be secured?

Use OneLake security roles to manage OneLake read access to any tables or folders in a supported data item. Access to tables can be further restricted using row and/or column level security. Any security set applies to access from all engines in Fabric. For more information, see the [data access control model](../security/data-access-control-model.md).

For specific item types, you can also configure ReadWrite access. This permission gives users the ability to edit data in a lakehouse on specified tables or folders without giving them access to create or manage Fabric items. ReadWrite access enables users to perform write operations through Spark notebooks, the OneLake file explorer, or OneLake APIs. Write operations through the Lakehouse UX for viewers isn't supported.

The following data items support OneLake security:

[!INCLUDE [onelake-security-supported-items](../../includes/onelake-security-supported-items.md)]

### Default settings

When you create a new item, it comes with a set of default roles. Default roles ensure that privileged users can see and interact with data in the newly created item. Different items have different default roles depending on that item's use cases, but most contain a **DefaultReader** role. By using [virtualized role memberships](./create-manage-roles.md#assign-virtual-members), all users that have the necessary permissions to view data in the item (the ReadAll permission, for example) are included as members of this default role. To restrict access to those users, delete the DefaultReader role or remove the ReadAll permission from the accessing users.  

Newly created items that have a corresponding [SQL analytics endpoint](../../data-engineering/lakehouse-sql-analytics-endpoint.md) start in **User's identity mode** by default. Admins and Members can change the mode at any time in the Endpoint's settings.

> [!IMPORTANT]
> When you add a user to a data access role, make sure that you remove them from the DefaultReader role. Otherwise, they maintain full access to the data.

## Enable OneLake security for SQL analytics endpoint

Before you can use OneLake security with SQL analytics endpoint, you must configure it to use **User's identity access mode**.

> [!NOTE]
> You only need to switch to **User's identity access mode** once per SQL analytics endpoint. Endpoints that aren't switched to user's identity mode continue to use a delegated identity to evaluate permissions.

1. Go to SQL analytics endpoint.

1. In the SQL analytics endpoint experience, select the **Security** tab.

1. Select **View data access mode** > **Data access mode settings**.

   :::image type="content" source="./media/get-started-onelake-security/data-access-mode-settings.png" alt-text="Screenshot that shows navigating to the data access mode settings for a SQL analytics endpoint.":::

1. Select **Use OneLake security for tables (User's identity access mode)**, then select **Apply**.

   :::image type="content" source="./media/get-started-onelake-security/use-onelake-security.png" alt-text="Screenshot that shows selecting OneLake security (user's identity access mode) as the data access mode.":::

1. Select **Continue** to confirm your choice.

Now the SQL analytics endpoint is ready to use with OneLake security.

## Related content

* [Create and manage OneLake security roles](./create-manage-roles.md)
* [OneLake security data access control model](./data-access-control-model.md)