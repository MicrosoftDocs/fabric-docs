---
title: "Secure Data in Microsoft Fabric Mirrored Databases From SQL Server"
description: Learn about how to secure data in mirrored databases From SQL Server in Microsoft Fabric.
ms.reviewer: ajayj
ms.date: 11/18/2025
ms.topic: how-to
ms.custom:
---

# How to: Secure data Microsoft Fabric mirrored databases from SQL Server

This guide helps you establish data security in your mirrored SQL Server in Microsoft Fabric.

## Security requirements

1. Check the networking requirements to access your SQL Server instance data source. [Install an on-premises data gateway](/data-integration/gateway/service-gateway-install) or [create a virtual network data gateway](/data-integration/vnet/create-data-gateways). The data gateway's network must connect to the SQL Server instance via a private endpoint or be allowed by the firewall rule.
    - Resources for data gateways:
        - [Plan, scale, and maintain a business-critical gateway solution](/data-integration/gateway/plan-scale-maintain)
        - [Monitor and optimize on-premises data gateway performance](/data-integration/gateway/service-gateway-performance)
        - [Troubleshoot the on-premises data gateway](/data-integration/gateway/service-gateway-tshoot)
        - [Manage virtual network data gateway high availability and load balancing](/data-integration/vnet/high-availability-load-balancing)
        - [Troubleshoot a virtual network data gateway](/data-integration/vnet/troubleshoot-data-gateway)
        - [Azure Arc-enabled SQL Server instance: Troubleshoot Azure Connected Machine agent connection issues](/azure/azure-arc/servers/troubleshoot-agent-onboard)
1. Fabric needs to authenticate to the SQL Server instance. For this purpose, create a dedicated database user with limited permissions, to follow the principle of least privilege. Create either a login with a strong password and connected user in the source database, or a contained database user with a strong password. For a tutorial, see [Tutorial: Configure Microsoft Fabric mirrored databases From SQL Server](../mirroring/sql-server-tutorial.md).

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
