---
title: Best practices for OneLake security
description: Best practices for securing your data in OneLake including least privilege access, workload permissions, and user permissions.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: concept-article
ms.custom:
ms.date: 09/05/2025
#customer intent: As a security engineer, I want to learn best practices for securing my data in OneLake, including least privilege access, workload permissions, and user permissions, so that I can effectively protect my data and reduce security risks.
---

# Best practices for OneLake security

In this article, we'll look at best practices around securing data in OneLake. For more information on how to implement security for specific use cases, see the how-to guides.

## Least privilege

Least privilege access is a fundamental security principle in computer science that advocates for restricting users' permissions and access rights to only those permissions necessary to perform their tasks. For OneLake, this means assigning permissions at the appropriate level to ensure that users aren't over-provisioned and reduce risk.

- If users only need access to a single lakehouse or data item, use the share feature to grant them access to only that item. Assigning a user to a workspace role should only be used if that user needs to see ALL items in that workspace.

- Use [OneLake security](../security/get-started-security.md) to restrict access to folders and tables within a lakehouse. For sensitive data, OneLake security [row](./row-level-security.md) or [column](./column-level-security.md) level security ensures that protected row and columns remain hidden.

## Secure by use case

Different users need the ability to perform different actions in Fabric in order to do their jobs. Some common use cases are identified in this section along with the necessary permissions setup in Fabric and OneLake.

**Manage workspace access**
The admin or member workspace roles are required. These roles can also manage OneLake security roles on an item.

**Create new items in Fabric**
Either Admin, Member, or Contributor roles can create or delete new items.

**Write data to OneLake**
Either Admin, Member, or Contributor roles can write data to OneLake through Spark or through uploads. They can also write data to a warehouse. Users with only read access on a warehouse can be given permissions to write data through [SQL permissions.](../../data-warehouse/sql-granular-permissions.md)

**Read data from OneLake**
A user needs to be a workspace Viewer, or have the Read permission and the ReadAll permission to read data from OneLake. For lakehouses with the OneLake security (preview) feature enabled, access to data is controlled by the user's OneLake security role permissions.

**Subscribe to OneLake events**
A user needs SubscribeOneLakeEvents to be able to subscribe to events from a Fabric item. Admin, Member, and Contributor roles have this permission by default. You can add this permission for a user with Viewer role.

## Related content

- [Fabric Security overview](../../security/security-overview.md)
- [Fabric and OneLake security overview](./fabric-onelake-security.md)
- [Data Access Control Model](../security/data-access-control-model.md)
