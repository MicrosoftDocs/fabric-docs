---
title: Secure and manage OneLake shortcuts
description: Understand security for OneLake shortcuts and the permissions required for shortcut creation and data access.
ms.reviewer: trolson
ms.author: aamerril
author: aamerril
ms.search.form: Shortcuts
ms.topic: concept-article
ms.custom:
ms.date: 05/09/2024
#customer intent: As a security engineer, I want to understand security for OneLake shortcuts so that I can secure access to my data using roles and permissions.
---

# OneLake shortcut security

OneLake shortcuts serve as pointers to data residing in various storage accounts, whether within OneLake itself or in external systems like Azure Data Lake Storage (ADLS). This article looks at the permissions required to create shortcuts and access data using them.

To ensure clarity around the components of a shortcut this document uses the following terms:

* Target path: The location that a shortcut points to.
* Shortcut path: The location where the shortcut appears.

## Create and delete shortcuts

To create a shortcut a user needs to have Write permission on the Fabric Item where the shortcut is being created. In addition, the user needs Read access to the data the shortcut is pointing to. Shortcuts to external sources may require certain permissions in the external system. The [What are shortcuts?](./onelake-shortcuts.md) article has the full list of shortcut types and required permissions.

| **Capability** | **Permission on shortcut path** | **Permission on target path** |
|---|---|---|---|---|
| **Create a shortcut** | Write | ReadAll<sup>1</sup> |
| **Delete a shortcut** | Write | N/A |

<sup>1</sup> If [OneLake data access roles](./security/get-started-data-access-roles.md) is enabled the user needs to be in a role that grants access to the target path.

## Accessing shortcuts

A combination of the permissions in the shortcut path and the target path governs the permissions for shortcuts. When a user accesses a shortcut, the most restrictive permission of the two locations is applied. Therefore, a user that has read/write permissions in the lakehouse but only read permissions in the target path can't write to the target path. Likewise, a user that only has read permissions in the lakehouse but read/write in the target path also can't write to the target path.

The following table shows the shortcut-related permissions for each shortcut action.

| **Capability** | **Permission on shortcut path** | **Permission on target path** |
|---|---|---|---|---|
| **Read file/folder content of shortcut** | ReadAll<sup>1</sup> | ReadAll<sup>1</sup> |
| **Write to shortcut target location** | Write | Write |
| **Read data from shortcuts in table section of the lakehouse via TDS endpoint** | Read | ReadAll<sup>2</sup> |

<sup>1</sup> If [OneLake data access roles](./security/get-started-data-access-roles.md) is enabled the user needs to be in a role that grants access to the data.

> [!IMPORTANT]
> <sup>2</sup> When accessing shortcuts through Power BI semantic models or T-SQL, **the calling user’s identity is not passed through to the shortcut target path.** The calling item owner’s identity is passed instead, delegating access to the calling user.

## OneLake data access roles

[OneLake data access roles](./security/get-started-data-access-roles.md) is a new feature that enables you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant read access to specific folders within a Fabric item, and assign them to users or groups. The access permissions determine what folders users see when accessing the lake view of the data, either through the lakehouse UX, notebooks, or OneLake APIs. For items with the preview feature enabled, OneLake data access roles also determine a user's access to a shortcut.

Users in the Admin, Member, and Contributor roles have full access to read data from a shortcut regardless of the OneLake data access roles defined. However they still need access on both the shortcut path and target path as mentioned in [Workspace roles](./security/get-started-security.md#workspace-permissions).

Users in the Viewer role or that had a lakehouse shared with them directly have access restricted based on if the user has access through a OneLake data access role. For more information on the access control model with shortcuts, see [Data Access Control Model in OneLake.](./security/data-access-control-model.md#shortcuts)

## Related content

* [What are shortcuts?](./onelake-shortcuts.md)
* [Create a OneLake shortcut](create-onelake-shortcut.md)
* [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
* [Data Access Control Model in OneLake.](./security/data-access-control-model.md#shortcuts)
