---
title: "Secure Data in Microsoft Fabric Mirrored Databases From SQL Server"
description: Learn about how to secure data in mirrored databases From SQL Server in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajayj
ms.date: 05/19/2025
ms.topic: how-to
ms.custom:
---

# How to: Secure data Microsoft Fabric mirrored databases from SQL Server

This guide helps you establish data security in your mirrored SQL Server in Microsoft Fabric.

[!INCLUDE [preview-note](../../includes/feature-preview-note.md)]

## Security requirements

1. Check the networking requirements to access your SQL Server instance data source. [Install an on-premises data gateway](/data-integration/gateway/service-gateway-install). The gateway machine's network must connect to the SQL Server instance via a private endpoint or be allowed by the firewall rule.
    - Resources for data gateways:
        - [Plan, scale, and maintain a business-critical gateway solution](/data-integration/gateway/plan-scale-maintain)
        - [Monitor and optimize on-premises data gateway performance](/data-integration/gateway/service-gateway-performance)
        - [Troubleshoot the on-premises data gateway](/data-integration/gateway/service-gateway-tshoot)
        - [Azure Arc-enabled SQL Server instance: Troubleshoot Azure Connected Machine agent connection issues](/azure/azure-arc/servers/troubleshoot-agent-onboard)
1. Fabric needs to authenticate to the SQL Server instance. For this purpose, create a dedicated database user with limited permissions, to follow the principle of least privilege. Create either a login with a strong password and connected user in the source database, or a contained database user with a strong password. For a tutorial, see [Tutorial: Configure Microsoft Fabric mirrored databases From SQL Server](sql-server-tutorial.md).

> [!IMPORTANT]
> Any granular security established in the source SQL Server database must be re-configured in the mirrored database in Microsoft Fabric.
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
