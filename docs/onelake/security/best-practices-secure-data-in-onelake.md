---
title: Security best practices
description: Best practices for securing your data in OneLake including least privilege access, workload permissions, and user permissions.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: concept-article
ms.custom:
ms.date: 09/05/2025
#customer intent: As a security engineer, I want to learn best practices for securing my data in OneLake, including least privilege access, workload permissions, and user permissions, so that I can effectively protect my data and reduce security risks.
---

# Best practices for data security

This article introduces best practices around securing data in OneLake.

## Least privilege

Least privilege access is a fundamental security principle that advocates for restricting users' permissions and access rights to only those permissions necessary to perform their tasks. For OneLake, least privilege access means assigning permissions at the appropriate level to reduce risk and ensure that users aren't over-provisioned.

- If users only need access to a single lakehouse or data item, use the **Share** feature to grant them access to only that item. Only assign a user to a workspace role if that user needs to see all items in that workspace.

- Use [OneLake security](./get-started-onelake-security.md) to restrict access to folders and tables within a lakehouse. For sensitive data, OneLake security [row](./row-level-security.md) or [column](./column-level-security.md) level security ensures that protected row and columns remain hidden.

## Secure by use case

Different users need the ability to perform different actions in Fabric in order to do their jobs. Some common use cases are identified in this section along with the necessary permissions setup in Fabric and OneLake.

| Use case | Permissions |
|---|---|
| Manage workspace access | Admin or Member workspace roles. These roles can also manage OneLake security roles on an item. |
| Create new items in Fabric | Admin, Member, or Contributor roles. |
| Delete Fabric items | Admin, Member, or Contributor roles. |
| Write data to OneLake | Admin, Member, or Contributor roles can write data to OneLake through Spark or through uploads. They can also write data to a warehouse. Users with only read access on a warehouse can be given permissions to write data through [SQL permissions](../../data-warehouse/sql-granular-permissions.md). |
| Read data from OneLake | Viewer workspace role, or have the Read permission and the ReadAll permission to read data from OneLake. For lakehouses with the OneLake security (preview) feature enabled, access to data is controlled by the user's OneLake security role permissions. |
| Subscribe to OneLake events | Admin, Member, and Contributor roles. Or, Viewer role with SubscribeOneLakeEvents permission added. |

## Related content

- [Fabric security overview](../../security/security-overview.md)
- [OneLake security overview](./get-started-onelake-security.md)
- [Data access control model](../security/data-access-control-model.md)
