---
title: Microsoft Fabric Workload Development Kit user permissions
description: Learn about the Microsoft Fabric Workload Development Kit user permissions and review a list of permissions for internal and external users.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.custom:
ms.date: 05/27/2024
---

# User permissions

User permissions are used to control which user can access data in Microsoft Fabric. When you create your workload, use permissions to secure your workload, and to add functionality to your workload. This article lists the permissions for internal and external users in the Microsoft Fabric Workload Development Kit.

## Internal user permissions

This table lists the permissions for internal users in the Microsoft Fabric Workload Development Kit.

|  | Viewer | Contributor | Member | Admin |
|--|--|--|--|--|
| See the workload list | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| Create a New item | N/A | &#x2705; | &#x2705; | &#x2705; |
| Read item | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| Update item | N/A | &#x2705; | &#x2705; | &#x2705; |
| Delete item | N/A | &#x2705; | &#x2705; | &#x2705; |
| Run jobs | &#x274C; | &#x2705; | &#x2705; | &#x2705; |
| Job succeeded | &#x274C; | &#x2705; | &#x2705; | &#x2705; |
| Give access to a workspace | N/A | N/A | &#x2705; | &#x2705; |
| Edit item | &#x274C; | &#x2705; | &#x2705; | &#x2705; |
| Share item | &#x274C; | &#x274C; | &#x274C; | &#x274C; |

## External user permissions

This table lists the permissions for external users in the Microsoft Fabric Workload Development Kit.

|  | Viewer | Contributor | Member | Admin |
|--|--|--|--|--|
| See the workload list |&#x2705;|&#x2705;|&#x2705;|&#x2705;|
| Create a New item |N/A|&#x2705;|&#x2705;|&#x2705;|
| Read item (Open item) |&#x2705;|&#x2705;|&#x2705;|&#x2705;|
| Update item |N/A|&#x2705;|&#x2705;|&#x2705;|
| Delete item |N/A|&#x2705;|&#x2705;|&#x2705;|
| Run jobs |&#x274C;|&#x2705;|&#x2705;|&#x2705;|
| Job succeeded |&#x274C;|&#x274C;|&#x274C;|&#x274C;|
| Give access to a workspace for other users |N/A|N/A|&#x2705;|&#x2705;|
| Edit item |&#x274C;|&#x2705;|&#x2705;|&#x2705;|
| Share item |&#x274C;|&#x274C;|&#x274C;|&#x274C;|

## Considerations and limitations

* Opening the [admin portal](../admin/admin-center.md) isn't supported. A user with admin permissions that opens the admin portal, will view it as if he is a non-admin user.

* You can't assign these roles to a user:
    * Capacity admin
    * Contributor

* Item sharing isn't supported.

## Related content

* [Microsoft Fabric Workload Development Kit](development-kit-overview.md)
