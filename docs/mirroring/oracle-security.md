---
title: "Secure Data in Microsoft Fabric Mirrored Databases From Oracle"
description: Learn about how to secure data in mirrored databases From Oracle in Microsoft Fabric.
ms.reviewer: sbahadur
ms.date: 08/22/2025
ms.topic: how-to
ms.custom:
---

# How to: Secure data Microsoft Fabric mirrored databases from Oracle (Preview)

This guide helps you establish data security in your mirrored Oracle in Microsoft Fabric.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Security requirements

1. Check the networking requirements to access your Oracle instance data source. [Install an on-premises data gateway](/data-integration/gateway/service-gateway-install). The gateway machine's network must connect to the Oracle instance via a private endpoint or be allowed by the firewall rule.
    - Resources for data gateways:
        - [Plan, scale, and maintain a business-critical gateway solution](/data-integration/gateway/plan-scale-maintain)
        - [Monitor and optimize on-premises data gateway performance](/data-integration/gateway/service-gateway-performance)
        - [Troubleshoot the on-premises data gateway](/data-integration/gateway/service-gateway-tshoot)
1. Fabric needs to authenticate to the Oracle instance. For information about the required permissions, see [Required Permissions](oracle-limitations.md#required-permissions).
1. To configure mirroring for an Oracle database:
    * Ensure the database is in **ARCHIVELOG** mode and keep it enabled.
    *  Enable **supplemental logging** at the database level, including **primary key supplemental logging**.
    * For every table selected for mirroring, enable **all-columns supplemental logging** at the table level.

    Our system will attempt to apply these settings automatically. If the Oracle user lacks the **ALTER DATABASE** and **ALTER TABLE** privileges, a DBA must enable supplemental logging at both the database and table levels—adding supplemental log data for the database and enabling full column logging on each table to be mirrored.
    
    For more information, see the [requirements for setting up Oracle mirroring](oracle-limitations.md#required-permissions).


## Data protection features

You can secure column filters and predicate-based row filters on tables to roles and users in Microsoft Fabric:

- [Row-level security in Fabric data warehousing](../data-warehouse/row-level-security.md)
- [Column-level security in Fabric data warehousing](../data-warehouse/column-level-security.md)

You can also mask sensitive data from non-admins using dynamic data masking:

- [Dynamic data masking in Fabric data warehousing](../data-warehouse/dynamic-data-masking.md)

## Related content

- [What is Mirroring in Fabric?](../mirroring/overview.md)
- [Set up Oracle database mirroring](oracle.md)
