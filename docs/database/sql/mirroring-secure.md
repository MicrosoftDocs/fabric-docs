---
title: "Secure mirrored data in Microsoft Fabric database"
description: Learn about how to secure mirrored data in Fabric SQL database.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: nzagorac
ms.date: 02/10/2025
ms.topic: conceptual
ms.custom:
---

# How to: Secure mirrored data in Microsoft Fabric SQL database (preview)

This guide helps you establish data security for the mirrored data of your Fabric SQL database.

Important topics to review:

- [Authorization in SQL database in Microsoft Fabric](authorization.md)
- [Authentication in SQL database in Microsoft Fabric](authentication.md)
- [Share your SQL database and manage permissions](share-sql-manage-permission.md)

## Data protection features

You can secure column filters and predicate-based row filters on tables to roles and users in Microsoft Fabric:

- Implement row-level security (RLS) by using the [CREATE SECURITY POLICY](/sql/t-sql/statements/create-security-policy-transact-sql?view=fabric&preserve-view=true) Transact-SQL statement, and predicates created as [inline table-valued functions](/sql/relational-databases/user-defined-functions/create-user-defined-functions-database-engine?view=fabric&preserve-view=true).
- Implement column-level security (CLS) with the [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true) T-SQL statement. For simplicity of management, assigning permissions to roles is preferred to using individuals.

You can also mask sensitive data from non-admins using dynamic data masking:

- [Dynamic data masking](/azure/azure-sql/database/dynamic-data-masking-overview?view=fabric&preserve-view=true)

> [!IMPORTANT]
> Any granular security established on objects in the Fabric SQL database must be re-configured in the SQL analytics endpoint in Microsoft Fabric.

## Related content

- [Mirroring Fabric SQL database (preview)](mirroring-overview.md)
- [Share your SQL database and manage permissions](share-sql-manage-permission.md)
