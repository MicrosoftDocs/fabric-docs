---
title: "Secure Data in Microsoft Fabric Mirrored Databases From Azure SQL Database"
description: Learn about how to secure data in mirrored databases from Azure SQL Database in Microsoft Fabric.
ms.reviewer: imotiwala, ajayj, atodalbagi
ms.date: 11/25/2025
ms.topic: how-to
ms.custom:
---

# How to: Secure data Microsoft Fabric mirrored databases from Azure SQL Database

This guide helps you establish data security in your mirrored Azure SQL Database in Microsoft Fabric.

## Security requirements

1. If your Azure SQL Database is not publicly accessible and doesn't [allow Azure services](/azure/azure-sql/database/network-access-controls-overview#allow-azure-services) to connect to it, you can [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) or [install an on-premises data gateway](/data-integration/gateway/service-gateway-install) to mirror the data. Make sure the Azure Virtual Network or the gateway machine's network can connect to the Azure SQL server via [a private endpoint](/azure/azure-sql/database/private-endpoint-overview?view=azuresql-db&preserve-view=true) or is allowed by the firewall rule.
1. Either the System Assigned Managed Identity (SAMI) or the User Assigned Managed Identity (UAMI) of your Azure SQL logical server needs to be enabled, and must be the primary identity.

   > [!NOTE]  
   > Support for User Assigned Managed Identity (UAMI) is currently in preview.

1. Fabric needs to connect to the Azure SQL database. For this purpose, create a dedicated database user with limited permissions, to follow the principle of least privilege. Create either a login with a strong password and connected user, or a contained database user with a strong password. For a tutorial, see [Tutorial: Configure Microsoft Fabric mirrored databases from Azure SQL Database](../mirroring/azure-sql-database-tutorial.md).

> [!IMPORTANT]
> If the source tables have granular security such as row-level security, column-level security, or data masking configured, the tables will be mirrored without the granular security. The granular security must be reconfigured in the mirrored database in Microsoft Fabric. For more information, see [Get started with OneLake security (preview)](../onelake/security/get-started-onelake-security.md) and [SQL granular permissions in Microsoft Fabric](../data-warehouse/sql-granular-permissions.md).

## Data protection features

You can secure column filters and predicate-based row filters on tables to roles and users in Microsoft Fabric:

- [Row-level security in Fabric data warehousing](../data-warehouse/row-level-security.md)
- [Column-level security in Fabric data warehousing](../data-warehouse/column-level-security.md)

You can also mask sensitive data from non-admins using dynamic data masking:

- [Dynamic data masking in Fabric data warehousing](../data-warehouse/dynamic-data-masking.md)

## Related content

- [What is Mirroring in Fabric?](../mirroring/overview.md)
- [SQL granular permissions in Microsoft Fabric](../data-warehouse/sql-granular-permissions.md)
