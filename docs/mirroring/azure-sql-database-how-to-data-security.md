---
title: "Secure Data in Microsoft Fabric Mirrored Databases From Azure SQL Database"
description: Learn about how to secure data in mirrored databases from Azure SQL Database in Microsoft Fabric.
ms.reviewer: sbahadur, nanikolic, atodalbagi, wiassaf
ms.date: 10/28/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# How to: Secure data Microsoft Fabric mirrored databases from Azure SQL Database

This guide helps you establish data security in your mirrored Azure SQL Database in Microsoft Fabric.

## Security requirements

1. If your Azure SQL Database is not publicly accessible and doesn't [allow Azure services](/azure/azure-sql/database/network-access-controls-overview#allow-azure-services) to connect to it, you can [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) or [install an on-premises data gateway](/data-integration/gateway/service-gateway-install) to mirror the data. Make sure the Azure Virtual Network or the gateway machine's network can connect to the Azure SQL server via [a private endpoint](/azure/azure-sql/database/private-endpoint-overview?view=azuresql-db&preserve-view=true) or is allowed by the firewall rule.
1. Either the System Assigned Managed Identity (SAMI) or the User Assigned Managed Identity (UAMI) of your Azure SQL logical server needs to be enabled, and must be the primary identity.

   > [!NOTE]  
   > Support for User Assigned Managed Identity (UAMI) is currently in preview.

1. If inbound access to OneLake is restricted for your workspace, a workspace admin must add the Azure resource ID of your Azure SQL server to the workspace's Resource Instance Rules. This configuration allows OneLake to verify the server's identity without relying on dynamic or shared outbound IP addresses. For more information, see [Manage inbound access to OneLake with Resource Instance Rules](../onelake/onelake-manage-inbound-access-trusted-resources.md).

1. Fabric needs to connect to the Azure SQL database. For this purpose, create a dedicated database user with limited permissions, to follow the principle of least privilege. Create either a login with a strong password and connected user, or a contained database user with a strong password. For a tutorial, see [Tutorial: Configure Microsoft Fabric mirrored databases from Azure SQL Database](../mirroring/azure-sql-database-tutorial.md).

> [!IMPORTANT]
> If the source tables have granular security such as row-level security, column-level security, or data masking configured, the tables will be mirrored without the granular security. The granular security must be reconfigured in the mirrored database in Microsoft Fabric. For more information, see [Get started with OneLake security (preview)](../onelake/security/get-started-onelake-security.md) and [SQL granular permissions in Fabric Data Warehouse](../data-warehouse/sql-granular-permissions.md).

## Network security perimeter (preview)

> [!NOTE]  
> A [network security perimeter](/azure/azure-sql/database/network-security-perimeter) (preview) applies to Azure SQL Database only. Azure SQL Managed Instance isn't an onboarded resource, so this section doesn't apply to [mirroring from Azure SQL Managed Instance](azure-sql-managed-instance.md). For the current list, see [Onboarded private link resources](/azure/private-link/network-security-perimeter-concepts#onboarded-private-link-resources).

A [network security perimeter](/azure/azure-sql/database/network-security-perimeter) (preview) controls inbound and outbound network traffic for an Azure SQL logical server. Mirroring crosses that boundary in both directions. Fabric connects inbound to the logical server to configure and monitor mirroring, and the database connects outbound to OneLake to publish data. A perimeter evaluates both.

Fabric isn't an Azure resource and has no perimeter of its own, so you configure every perimeter access rule on the Azure SQL Database side.

### Supported configurations

Mirroring works in both transition mode and enforced mode. In transition mode, the perimeter logs traffic without blocking it, so replication keeps working even when no access rules exist. In enforced mode, the perimeter blocks any traffic that no rule allows. Use transition mode while this feature is in preview, and configure the inbound and outbound rules before you switch.

- **If public network access on the logical server is set to `Secured by Perimeter`, transition mode isn't honored.** Mirroring defers to the outbound access rules to allow or block publishing, whatever mode the perimeter reports.

What breaks, and when, depends on the order you configure things in:

| Scenario | Transition mode | Enforced mode |
| --- | --- | --- |
| Mirroring is already enabled and you add the logical server to a perimeter | Add the outbound rule now, so that replication keeps working when you switch to enforced mode. | Mirroring fails until you configure the rule. Take the FQDN from the error 22651 entry in `sys.dm_change_feed_errors` and add the outbound rule. |
| The logical server is already in a perimeter and you create a new mirror | Setup succeeds, even with no outbound rules. Add the outbound rule anyway. | Setup fails while no valid rule exists. Take the FQDN from the error 22651 entry and add the outbound rule. |

Unlike most operations that a perimeter guards, mirroring needs a managed identity. Either the SAMI or the UAMI of the logical server must be enabled and must be the primary identity, as described in [Security requirements](#security-requirements).

### Configure access rules for mirroring

Mirroring needs two access rules: an inbound rule that lets Fabric reach the logical server, and an outbound rule that lets the database publish to OneLake. The database publishes to OneLake and only to OneLake, so a single outbound rule covers replication.

1. [Associate the logical server with the perimeter](/azure/azure-sql/database/network-security-perimeter). A newly associated server starts in transition mode.
1. On the perimeter profile associated with the logical server, add an inbound access rule. Set **Source type** to **Service tags** and select `DataFactory` or `DataFactory.<region>`, `PowerBI` or `PowerBI.<region>`, and `PowerQueryOnline`.

   If you use the regional tags, add them for your Fabric [home region](../admin/find-fabric-home-region.md), your capacity region if it's different, and the paired region of each. For example, if your home region is East US and your capacity is in East US 2, add the regional tags for East US, East US 2, West US, and Central US. For more information, see [Service tags](../security/security-service-tags.md#use-service-tags).

1. Get the destination FQDN. Run `EXEC sp_help_change_feed;` on the source database and read the `destination_fqdn` column, which has the form `<item-id>.<workspace-id>.<onelake-domain>`. For more information, see [sys.sp_help_change_feed](/sql/relational-databases/system-stored-procedures/sp-help-change-feed?view=azuresqldb-current&preserve-view=true).

   `sp_help_change_feed` reports the change feed configuration, so it returns a destination only after you configure mirroring. If you're setting up a new mirror, create it first, and then run the procedure. If setup fails with error 22651, take the FQDN from the error message instead, and retry setup after you add the outbound rule.

1. On the perimeter profile associated with the logical server, add an outbound access rule. Set **Destination type** to **FQDN** and use that value.
1. Leave the perimeter in transition mode, then confirm replication is current in [Monitor Fabric mirrored database replication](monitor.md). Review the [network security perimeter diagnostic logs](/azure/private-link/network-security-perimeter-diagnostic-logs) to confirm there are no unexpected denials.
1. Switch the perimeter to enforced mode only after replication is current and the logs are clean.

That item-level FQDN is the most restrictive option, so prefer it. To cover every mirrored database in one workspace with a single rule, use `<workspace-id>.<onelake-domain>` instead, which names the Fabric workspace that receives the mirrored data. Don't use a wildcard destination, because it allows outbound access to every endpoint and defeats the perimeter you configured.

### Limitations and behavior differences

- Mirroring behind a network security perimeter is in preview. Use transition mode while you validate your access rules, and limit validation to development or test environments that mimic production.
- In enforced mode, both the inbound and the outbound access rules are required on the logical server's perimeter profile for mirroring to work. Transition mode doesn't require them, but configure them anyway to prepare for enforced mode.
- A perimeter doesn't change any of the other [limitations in mirrored databases from Azure SQL Database](azure-sql-database-limitations.md).

### Errors when a perimeter blocks mirroring

A perimeter that blocks the outbound connection to OneLake produces one of the following errors.

| Error code | Message |
| ---: | :--- |
| 22651 | Public Network Access for logical server '*server*' is configured as SECURED_BY_PERIMETER but the destination FQDN '*fqdn*' is not in the allowed outbound rules. Update the Network Security Perimeter (NSP) configuration to include this FQDN and try again. |
| 22652 | Public Network Access for logical server '*server*' is configured as SECURED_BY_PERIMETER, but no Network Security Perimeter (NSP) is associated. All outbound access is denied until an NSP is attached. |

The placeholders are replaced with the logical server name and, for error 22651, the destination FQDN that was evaluated. If you configure mirroring while a perimeter blocks it, the error returns to whoever runs setup. If mirroring is already replicating, the snapshot, capture, and publish tasks report it instead, so check [sys.dm_change_feed_errors](/sql/relational-databases/system-dynamic-management-views/sys-dm-change-feed-errors?view=azuresqldb-current&preserve-view=true).

For error 22651, compare the FQDN in the message against the outbound rules on the perimeter profile. That value is exactly what the perimeter evaluated, so it's the fastest way to confirm whether the rule you added matches. For error 22652, either associate the logical server with a perimeter, or change public network access so that it isn't `Secured by Perimeter`.

A perimeter can also deny Fabric's inbound connection, which makes mirroring setup or a configuration change fail even when your outbound rule is correct. In that case, connecting to the logical server from the Fabric portal fails with an error that includes `Login failed because the network security perimeter denied inbound access.` Add the inbound access rule described in [Configure access rules for mirroring](#configure-access-rules-for-mirroring).

## Data protection features

You can secure column filters and predicate-based row filters on tables to roles and users in Microsoft Fabric:

- [Row-level security in Fabric data warehousing](../data-warehouse/row-level-security.md)
- [Column-level security in Fabric data warehousing](../data-warehouse/column-level-security.md)

You can also mask sensitive data from non-admins using dynamic data masking:

- [Dynamic data masking in Fabric data warehousing](../data-warehouse/dynamic-data-masking.md)

## Related content

- [What is Mirroring in Fabric?](../mirroring/overview.md)
- [SQL granular permissions in Fabric Data Warehouse](../data-warehouse/sql-granular-permissions.md)
- [Network security perimeter for Azure SQL Database (preview)](/azure/azure-sql/database/network-security-perimeter)
