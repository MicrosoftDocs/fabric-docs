---
title: Limitations in Microsoft Fabric Mirrored Databases from Azure Database for MySQL (Preview)
description: Learn about the limitations for mirrored databases from Azure Database for MySQL in Microsoft Fabric.
ms.reviewer: vamehta, jingwang, maghan
ms.date: 03/18/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Limitations in Microsoft Fabric mirrored databases from Azure Database for MySQL (preview)

This article lists current limitations in the [Microsoft Fabric mirrored databases](overview.md) from Azure Database for MySQL. This article is subject to change.

For troubleshooting, see:

[Troubleshoot Fabric mirrored databases](troubleshooting.md)

[Troubleshoot Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql-troubleshoot.md).

## Server level limitations

The following limitations apply at the MySQL server level when configuring mirroring in Microsoft Fabric.

- Mirroring in Fabric supports MySQL versions 8.0 (8.0.x, starting from 8.0.21).

- The Burstable Compute Tier isn't supported.

- Custom ports or High Availability (HA) aren't supported.

- You can't configure mirroring in Fabric on a Read Replica server.

- Entra ID Authentication isn't supported.

- Recovering a server with Mirroring in Fabric enabled through Point in Time Restore (PITR) requires Mirroring to be reconfigured on the new server.

- Before executing a Major Version Upgrade (MVU), disable Mirroring in Fabric and re-enable it once the upgrade finishes.

## Database level limitations

The following limitations apply to individual databases when using mirroring in Microsoft Fabric.

- Mirroring multiple databases on the same server isn't supported.

- After you configure a mirrored database, you can't add or remove tables.

- The maximum number of tables that you can mirror into Fabric is 1,000 tables.

- You can't replicate a database named **fabric_info** because it's reserved for system use.

## Network and connectivity security

Mirroring requires extra configuration for network-isolated servers.

- If your server isn't publicly accessible and doesn't [allow Azure services](/azure/azure-sql/database/network-access-controls-overview#allow-azure-services) to connect to it, you can [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) to mirror the data. Make sure the Azure Virtual Network or the gateway machine's network can connect to the Azure Database for MySQL flexible server when allowed by the firewall rule.

## Table level

Certain table configurations and data types have limitations when mirroring to Fabric.

- You can't mirror a table if it doesn't have a primary key.

- DDL operations (for example, ALTER TABLE, TRUNCATE, DROP TABLE) are unsupported and might disrupt replication.

- The following MySQL data types aren't supported: tinytext, text, mediumtext, longtext, tinyblob, blob, mediumblob, longblob. Tables containing unsupported data types are mirrored excluding the columns containing unsupported data types.

- Database and table names are case-sensitive. When setting up a mirrored database, ensure the input matches the MySQL settings.

## SQL analytics endpoint limitations

The SQL analytics endpoint for mirrored databases has the same limitations as the Lakehouse SQL analytics endpoint.

- The SQL analytics endpoint is the same as [the Lakehouse SQL analytics endpoint](../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It's the same read-only experience. For more information, see [SQL analytics endpoint limitations](../data-warehouse/limitations.md#limitations-of-the-sql-analytics-endpoint).

## Supported regions

All Microsoft Fabric regions support database mirroring and open mirroring. For more information, see [Fabric region availability](../admin/region-availability.md).

## Related content

- [Microsoft Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql.md)
- [Troubleshoot Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql-troubleshoot.md)
- [Microsoft Fabric mirrored databases from Azure Database for MySQL limitations](azure-database-mysql-limitations.md)
