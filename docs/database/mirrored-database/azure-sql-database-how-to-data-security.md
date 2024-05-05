---
title: "Secure data in Microsoft Fabric mirrored databases from Azure SQL Database (Preview)"
description: Learn about how to secure data in mirrored databases from Azure SQL Database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: roblescarlos
ms.date: 04/24/2024
ms.service: fabric
ms.topic: how-to
---

# How to: Secure data Microsoft Fabric mirrored databases from Azure SQL Database (Preview)

This guide helps you establish data security in your mirrored Azure SQL Database in Microsoft Fabric.

## Security requirements

1. The System Assigned Managed Identity (SAMI) of your Azure SQL logical server needs to be enabled. After enabling the SAMI, if the SAMI is disabled or removed, the mirroring of Azure SQL Database to Fabric OneLake will fail.

   To configure, go to your logical SQL Server in the Azure portal. Under **Security** the resource menu, select **Identity**. Under **System assigned managed identity**, select **Status** to **On**.

   <!-- :::image type="content" source="media/image2.png" alt-text="Screenshot of turning on the system assigned managed identity."::: -->

1. Fabric needs to connect to the Azure SQL database. For this purpose, create a dedicated database user with limited permissions, to follow the principle of least privilege. Create either a login with a strong password and connected user, or a contained database user with a strong password. For a tutorial, see [Tutorial: Configure Microsoft Fabric mirrored databases from Azure SQL Database (Preview)](azure-sql-database-tutorial.md).

> [!IMPORTANT]
> Any granular security established in the source database must be re-configured in the mirrored database in Microsoft Fabric.
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
