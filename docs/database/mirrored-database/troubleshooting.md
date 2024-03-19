---
title: "Troubleshoot Fabric mirrored databases"
description: Troubleshooting scenarios, workarounds, and links for mirrored databases in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, roblescarlos, maprycem, cynotebo
ms.service: fabric
ms.date: 03/17/2024
ms.topic: troubleshooting
ms.search.form: Troubleshoot mirrored databases
---

# Troubleshoot Fabric mirrored databases

Scenarios, resolutions, and workarounds for Microsoft Fabric mirrored databases.

## Resources

Review the troubleshooting section of frequently asked questions for each data source:

- [Troubleshoot Mirroring Azure SQL Database (Preview)](azure-sql-database-mirroring-faq.yml#troubleshoot-mirroring-azure-sql-database-in-microsoft-fabric)
- [Troubleshoot Mirroring Snowflake (Preview)](snowflake-mirroring-faq.yml#troubleshoot-mirroring-snowflake-in-microsoft-fabric)
- [Troubleshoot Mirroring Azure Cosmos DB (Preview)](azure-cosmos-db-troubleshooting.yml)

Review limitations documentation for each data source:

- [Limitations in Microsoft Fabric mirrored databases from Snowflake (Preview)](snowflake-limitations.md)
- [Limitations in Microsoft Fabric mirrored databases from Azure SQL Database (Preview)](azure-sql-database-limitations.md)
- [Limitations in Microsoft Fabric mirrored databases from Azure Cosmos DB (Preview)](azure-cosmos-db-limitations.md)

## Stop replication

When you select **Stop replication**, OneLake files remain as is, but incremental replication stops. You can restart the replication at any time by selecting **Start replication**.  

You might want to do this when resetting the state of replication, after source database changes, or as a troubleshooting tool.  

## Troubleshoot

This section contains general Mirroring troubleshooting steps.

#### Why am I getting "trial capacity" or "internal server" errors when I try to create a mirrored database"?

You must enable mirroring for your workspace or tenant. For more information, see [enable mirroring](enable-mirroring.md). If you observe persistent errors, [open a support ticket](/power-bi/support/service-support-options).

#### I can't connect to a source database

1. Check your connection details are correct, server name, database name, username, and password.
1. Check the server is not behind a firewall or private virtual network. Open the appropriate firewall ports.

#### No views are replicated

Currently, views are not supported. Only replicating regular tables are supported.

#### No tables are being replicated

1. Check the monitoring status to check the status of the tables. For more information, see [Monitor Fabric mirrored database replication](monitor.md).
1. Select the **Configure replication** button. Check to see if the tables are present in the list of tables, or if any Alerts on each table detail are present.

#### Columns are missing from the destination table

1. Select the **Configure replication** button.
1. Select the Alert icon next to the table detail if any columns are not being replicated.

#### Some of the data in my column appears to be truncated

The Fabric warehouse does not support VARCHAR(max) it only currently supports VARCHAR(8000).

#### Data doesn't appear to be replicating

In the **Monitoring** page, the date shown is the last time data was successfully replicated.

#### I can't change the source database

Changing the source database is not supported. Create a new mirrored database.

## Related content

- [What is Mirroring in Fabric?](overview.md)
- [Monitor Fabric mirrored database replication](monitor.md)
- [Enable Mirroring](enable-mirroring.md)