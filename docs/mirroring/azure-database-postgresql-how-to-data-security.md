---
title: "Secure Data in Microsoft Fabric Mirrored Databases From Azure Database for PostgreSQL flexible server"
description: Learn about how to secure data in mirrored databases from Azure Database for PostgreSQL flexible server in Microsoft Fabric.
ms.reviewer: scoriani
ms.date: 03/31/2025
ms.topic: how-to
ms.custom:
---

# How to: Secure data Microsoft Fabric mirrored databases from Azure Database for PostgreSQL flexible server

This guide helps you establish data security in your mirrored Azure Database for PostgreSQL flexible server in Microsoft Fabric.

## Security requirements

- The System Assigned Managed Identity (SAMI) of your Azure Database for PostgreSQL flexible server needs to be enabled, and must be the primary identity. To configure, go to your flexible server in the Azure portal. Under **Security** the resource menu, select **Identity**. Under **System assigned managed identity**, select **Status** to **On**.
   - After enabling the SAMI, if the SAMI is disabled or removed, the mirroring of Azure Database for PostgreSQL flexible server to Fabric OneLake will fail.
- Fabric needs to connect to the Azure Database for PostgreSQL flexible server. For this purpose, create an Entra or PostgreSQL database role with proper permissions to access source database and tables, to follow the principle of least privilege, and with a strong password. For a tutorial, see [Tutorial: Configure Microsoft Fabric mirrored databases from Azure Database for PostgreSQL flexible server](../mirroring/azure-database-postgresql-tutorial.md).

> [!IMPORTANT]
> Any granular security established in the source database must be reconfigured in the mirrored database in Microsoft Fabric.
> For more information, see [SQL granular permissions in Microsoft Fabric](../data-warehouse/sql-granular-permissions.md).

## Data protection features

You can secure column filters and predicate-based row filters on tables to roles and users in Microsoft Fabric:

- [Row-level security in Fabric data warehousing](../data-warehouse/row-level-security.md)
- [Column-level security in Fabric data warehousing](../data-warehouse/column-level-security.md)

You can also mask sensitive data from non-admins using dynamic data masking:

- [Dynamic data masking in Fabric data warehousing](../data-warehouse/dynamic-data-masking.md)

## Related content

- [What is Mirroring in Fabric?](../mirroring/overview.md)
- [SQL granular permissions in Microsoft Fabric](../data-warehouse/sql-granular-permissions.md)
