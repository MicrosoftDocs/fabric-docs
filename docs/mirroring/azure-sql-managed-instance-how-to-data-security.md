---
title: "Secure Data in Mirrored Databases From Azure SQL Managed Instance"
description: Learn about how to secure data in mirrored databases from Azure SQL Managed Instance in Microsoft Fabric.
ms.reviewer: lazartimotic, jingwang, nzagorac, ajayj
ms.date: 11/18/2025
ms.topic: how-to
---

# How to: Secure data in Microsoft Fabric mirrored databases from Azure SQL Managed Instance

This guide helps you establish data security in your mirrored Azure SQL Managed Instance database in Microsoft Fabric.

## Security requirements

1. If your Azure SQL Managed Instance is not publicly accessible, [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) or [on-premises data gateway](/data-integration/gateway/service-gateway-onprem) to mirror the data. Make sure the Azure Virtual Network or gateway server's network can connect to the Azure SQL Managed Instance via [a private endpoint](/azure/azure-sql/managed-instance/private-endpoint-overview?view=azuresql-mi&preserve-view=true).
1. The System Assigned Managed Identity (SAMI) of your Azure SQL Managed Instance needs to be enabled, and must be the primary identity. To configure or verify that the SAMI is enabled, go to your SQL Managed Instance in the Azure portal. Under **Security** in the resource menu, select **Identity**. Under **System assigned managed identity**, select **Status** to **On**.
   - After you enable the SAMI, if the SAMI is disabled or removed, the mirroring of Azure SQL Managed Instance to Fabric OneLake will fail.
   - After you enable the SAMI, if you add a user assigned managed identity (UAMI), it will become the primary identity, replacing the SAMI as primary. This will cause replication to fail. To resolve, remove the UAMI.

1. Fabric needs to connect to the Azure SQL Managed Instance. For this purpose, create a dedicated database user with limited permissions, to follow the principle of least privilege. For a tutorial, see [Tutorial: Configure Microsoft Fabric mirrored databases from Azure SQL Managed Instance](../mirroring/azure-sql-managed-instance-tutorial.md).

> [!IMPORTANT]
> If the source tables have granular security such as row-level security, column-level security, or data masking configured, the tables will be mirrored without the granular security. The granular security must be reconfigured in the mirrored database in Microsoft Fabric. For more information, see [Get started with OneLake security (preview)](../onelake/security/get-started-onelake-security.md) and [SQL granular permissions in Microsoft Fabric](../data-warehouse/sql-granular-permissions.md).

## Data protection features in Microsoft Fabric

You can secure column filters and predicate-based row filters on tables to roles and users in Microsoft Fabric:

- [Row-level security in Fabric data warehousing](../data-warehouse/row-level-security.md)
- [Column-level security in Fabric data warehousing](../data-warehouse/column-level-security.md)

You can also mask sensitive data from non-admins using dynamic data masking:

- [Dynamic data masking in Fabric data warehousing](../data-warehouse/dynamic-data-masking.md)

## Related content

- [What is Mirroring in Fabric?](../mirroring/overview.md)
- [SQL granular permissions in Microsoft Fabric](../data-warehouse/sql-granular-permissions.md)
