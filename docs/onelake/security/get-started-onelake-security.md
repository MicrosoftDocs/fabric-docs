---
title: Get started with OneLake security (preview)
description: Learn about OneLake security and how you can get started using it to secure your data in OneLake.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: how-to
ms.custom:
ms.date: 01/12/2026
#customer intent: As a Fabric user, I want to learn how to create and manage OneLake security so that I can control access to specific folders in my lakehouse and ensure data security.
---

# Get started with OneLake security (preview)

OneLake security enables you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant access to specific folders within a Fabric item, then assign these roles to users or groups. Roles can also contain row or column level security to further limit access. The OneLake security permissions determine what data that user can see across all experiences in Fabric.

Fabric users with Write and Reshare permissions (generally Admin and Member workspace users) can get started by creating OneLake security roles to grant access to only specific folders or tables in a Fabric data item. To grant access to data in an item, add users to a data access role. Users that aren't part of a data access role see no data in that item.

## What types of data can be secured?

Use OneLake security roles to manage OneLake read access to any tables or folders in a supported data item. Access to tables can be further restricted using row and/or column level security. Any security set applies to access from all engines in Fabric. For more information, see the [data access control model.](../security/data-access-control-model.md)

For specific item types, ReadWrite access can also be configured. This permission gives users the ability to edit data in a lakehouse on specified tables or folders without giving them access to create or manage Fabric items. ReadWrite access enables users to perform write operations through Spark notebooks, the OneLake file explorer, or OneLake APIs. Write operations through the Lakehouse UX for viewers is not supported.

The following data items support OneLake security:

| Fabric item | Status | Supported permissions |
| ---- | --- | --- |
| Lakehouse | Preview | Read, ReadWrite |
| Azure Databricks Mirrored Catalog | Preview | Read |
| Mirrored Database | Preview | Read |

## Enable OneLake security

OneLake security is currently in preview and as a result is disabled by default. The preview feature is configured on a per-item basis. The opt-in control allows for a single item to try the preview without enabling it on any other Fabric items.

The preview feature can't be turned off once enabled.

1. Navigate to a lakehouse and select **Manage OneLake security (preview)**.
1. Review the confirmation dialog. The data access roles preview isn't compatible with the External data sharing preview. If you're ok with the change, select **Continue**.
1. Once you enable OneLake security, you can [Create and manage OneLake security roles](./create-manage-roles.md) to secure data access to your OneLake items.

To ensure a smooth opt-in experience, all users with read permission to data in the item continue to have read access through a default data access role called **DefaultReader**. With [virtualized role memberships](./create-manage-roles.md#assign-virtual-members), all users that had the necessary permissions to view data in the lakehouse (the ReadAll permission) are included as members of this default role. To start restricting access to those users, delete the DefaultReader role or remove the ReadAll permission from the accessing users.  

> [!IMPORTANT]
> Make sure that any users that are included in a data access role are removed from the DefaultReader role. Otherwise they maintain full access to the data.


## Related content

* [Create and manage OneLake security roles](./create-manage-roles.md)
* [OneLake security data access control model](./data-access-control-model.md)
