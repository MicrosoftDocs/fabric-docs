---
title: "Secure mirrored data in Microsoft Fabric database"
description: Learn about how to secure mirrored data in Fabric SQL database.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: nzagorac
ms.date: 10/14/2024
ms.topic: conceptual
---

# How to: Secure mirrored data in Microsoft Fabric SQL database (preview)

This guide helps you establish data security for the mirrored data of your Fabric SQL database.

Important topics to review:

- [Authorization in SQL database in Microsoft Fabric](authorization.md)
- [Authentication in SQL database in Microsoft Fabric](authentication.md)
- [Share your SQL database and manage permissions](share-sql-manage-permission.md)

## Data protection features

You can secure column filters and predicate-based row filters on tables to roles and users in Microsoft Fabric:

- [Row-level security in Fabric data warehousing](../../data-warehouse/row-level-security.md)
- [Column-level security in Fabric data warehousing](../../data-warehouse/column-level-security.md)

You can also mask sensitive data from non-admins using dynamic data masking:

- [Dynamic data masking in Fabric data warehousing](../../data-warehouse/dynamic-data-masking.md)

> [!IMPORTANT]
> Any granular security established on objects in the Fabric SQL database must be re-configured in the analytics endpoint in Microsoft Fabric.

## Related content

- [Mirroring Fabric SQL database (preview)](mirroring-overview.md)
- [Share your SQL database and manage permissions](share-sql-manage-permission.md)
