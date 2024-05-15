---
title: "Data security in Microsoft Fabric mirrored databases from Snowflake (Preview)"
description: Learn about data security in mirrored databases from Snowflake in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, maprycem
ms.date: 04/24/2024
ms.service: fabric
ms.topic: how-to
---

# How to: Secure data Microsoft Fabric mirrored databases from Snowflake (Preview)

This guide helps you establish data security in your mirrored Snowflake in Microsoft Fabric.

## Security considerations

To enable Fabric mirroring, you will need user permissions for your Snowflake database that contains the following permissions:

  - `CREATE STREAM`
  - `SELECT table`
  - `SHOW tables`
  - `DESCRIBE tables`

For more information, see Snowflake documentation on [Access Control Privileges for Streaming tables](https://docs.snowflake.com/user-guide/security-access-control-privileges#stream-privileges) and [Required Permissions for Streams](https://docs.snowflake.com/user-guide/streams-intro#required-access-privileges).

> [!IMPORTANT]
> Any granular security established in the source Snowflake database must be re-configured in the mirrored database in Microsoft Fabric.
> For more information, see [SQL granular permissions in Microsoft Fabric](../../data-warehouse/sql-granular-permissions.md).

## Data protection features

You can secure column filters and predicate-based row filters on tables to roles and users in Microsoft Fabric:

- [Row-level security in Fabric data warehousing](../../data-warehouse/row-level-security.md)
- [Column-level security in Fabric data warehousing](../../data-warehouse/column-level-security.md)

You can also mask sensitive data from non-admins using dynamic data masking:

- [Dynamic data masking in Fabric data warehousing](../../data-warehouse/dynamic-data-masking.md)

## Related content

- [What is Mirroring in Fabric?](overview.md)
- [SQL granular permissions in Microsoft Fabric](../../data-warehouse/sql-granular-permissions.md)
