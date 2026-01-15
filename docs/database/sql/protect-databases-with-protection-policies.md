---
title: "Protect sensitive data in SQL database in Fabric with Microsoft Purview protection policies"
description: Learn about how Microsoft Purview protection policies work together with workspace roles/permissiosn and SQL native access control in SQL database in Microsoft Fabric.
author: jaszymas
ms.author: jaszymas
ms.reviewer: wiassaf
ms.date: 11/20/2024
ms.topic: conceptual
ms.custom: sfi-image-nochange
---
# Protect sensitive data in SQL database with Microsoft Purview protection policies

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Microsoft Purview is a family of data governance, risk, and compliance solutions that can help your organization govern, protect, and manage your entire data estate. Among other benefits, Microsoft Purview allows you to label your SQL database items with sensitivity labels and define protection policies that control access based on sensitivity labels.

This article explains how Microsoft Purview protection policies work together with [Microsoft Fabric access controls](authorization.md#fabric-access-controls) and [SQL access controls](authorization.md#sql-access-controls) in SQL database in Microsoft Fabric.

For general information about Microsoft Purview capabilities for Microsoft Fabric, including SQL database, see the articles listed in [Related content](#related-content).

## How protection policies work in SQL database

Each protection policy for Microsoft Fabric is associated with a sensitivity label. A protection policy controls access to items that have the associated label via two access controls:

- **Allow users to retain read access** - When enabled, allows the specified users (or the users belonging to the specified groups) to retain the Read item permission on labeled items if the specified users already have the permission. Any other permissions the specified users have on the item get removed. In SQL database, the Read item permission is required for a user to connect to a database. Therefore, if a user isn't specified in this access control, the user can't connect to the database.

- **Allow users to retain full control** - When enabled, allows the specified users (or the users belonging to the specified groups) to retain full control on the labeled item if the specified users already have it, or any other permissions they might have. For SQL database items, this control allows users to retain the Write item permission, which means the user retains full administrative access inside the database. If a user isn't specified in this access control, the Write item permission is effectively removed from the user. This control has no effect on user's SQL native permissions in the database - for more information, see [Example 4](#example-4) and [Limitations](#limitations).

 :::image type="content" source="../../governance/media/protection-policies-create/define-access-control.png" alt-text="Screenshot of define access controls page in protection policy configuration.":::

## Examples

The examples in this section share the following configuration:

- An organization has a Microsoft Fabric workspace, called Production.
- The workspace contains a SQL database item, named Sales, that has the Confidential sensitivity label.
- In Microsoft Purview, there's a protection policy applicable to Microsoft Fabric. The policy is associated with the Confidential sensitivity label.

### Example 1

- A user is a member of the Contributor role for the Production workspace.
- The **Allow users to retain read access** access control is enabled, but it doesn't include the user.
- The **Allow users to retain full control** access control is disabled/inactive.

The policy removes user's Read item permission, therefore the user can't connect to the Sales database. So, the user can't read or access any data in the database.

### Example 2

- A user has the Read item permission for the Sales database.
- The user is a member of the db_owner SQL native database-level role in the database.
- The **Allow users to retain read access** access control is enabled, but it doesn't include the user.
- The **Allow users to retain full control** access control is disabled/inactive.

The policy removes user's Read item permission, therefore the user can't connect to the Sales database, irrespective of user's SQL native permissions (granted via user's membership in the db_owner role) in the database. So, the user can't read or access any data in the database.

### Example 3

- A user is a member of the Contributor role for the Production workspace.
- The user has no SQL native permissions granted in the database.
- The **Allow users to retain read access** access control is enabled and it includes the user.
- The **Allow users to retain full control** access control is enabled, but it doesn't include the user.

As a member of the Contributor role, the user initially has all permissions on the Sales database, including Read, ReadData, and Write. The **Allow users to retain read access** access control in the policy allows the user to retain the Read and ReadData permissions, however the **Allow users to retain full control** access control removes user's Write permission. As a result, the user can connect to the database and read data, but the user looses the administrative access to the database, including the ability to write/edit data.

### Example 4

- A user has the Read item permission for the Sales database.
- The user is a member of the db_owner SQL native database-level role in the database.
- The **Allow users to retain read access** access control is enabled and it includes the user.
- The **Allow users to retain full control** access control is enabled, but it doesn't include the user.

The **Allow users to retain read access** access control in the policy allows the user to retain Read permission. As the user doesn't initially have full control access (the Write item permission), the **Allow users to retain full control** access control doesn't have any effect on user's permission granted in Microsoft Fabric. The **Allow users to retain full control** access control doesn't impact user's SQL native permission in the database. As a member of the db_owner role, the user continues to have administrative access to the database. See [Limitations](#limitations).

## Limitations

- The **Allow users to retain full control** access control in Microsoft Purview protection policies has no impact on SQL native permissions, granted to users in a database.

## Related content

- [Use Microsoft Purview to govern Microsoft Fabric](../../governance/microsoft-purview-fabric.md)
- [Information protection in Microsoft Fabric](../../governance/information-protection.md)
- [Protection policies in Microsoft Fabric](../../governance/protection-policies-overview.md)
- [Create and manage protection policies for Fabric](../../governance/protection-policies-create.md)
- [Authorization in SQL database in Microsoft Fabric](authorization.md)
