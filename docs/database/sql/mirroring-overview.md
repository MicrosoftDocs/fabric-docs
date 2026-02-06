---
title: Overview of Mirroring for SQL database
description: "Learn more about automatic mirroring to OneLake for SQL database in Fabric."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: nzagorac
ms.date: 07/02/2025
ms.topic: concept-article
ms.search.form: SQL database replication to OneLake, Databases replication to OneLake
---
# Mirroring Fabric SQL database in Microsoft Fabric

Database mirroring is a feature of Microsoft Fabric to continuously replicate data from your operational database into Fabric OneLake. With your data mirrored automatically into Fabric, you can query and perform analytics combined with other data. Fabric a one stop shop for your analytics needs with minimal data integration effort in an all-in-one solution.

## Overview of mirroring for SQL database in Fabric

SQL database in Microsoft Fabric, which uses the same SQL Database Engine as Microsoft SQL Server and is similar to Azure SQL Database, inherits most of the Fabric mirroring capabilities from Azure SQL Database. For more information, see [Mirroring Azure SQL Database to Fabric](../../mirroring/azure-sql-database.md), but this page focuses on mirroring data from SQL database in Fabric and **differences from** Azure SQL Database mirroring.

When you create a SQL database in Microsoft Fabric, these are provisioned in your Fabric workspace:

- The SQL database itself
- The SQL analytics endpoint

To facilitate analytics scenarios, SQL database in Fabric automatically mirrors its data into Fabric OneLake, to the same workspace where the database itself resides. Mirroring starts upon creation of your SQL database in Fabric with **no user action required**. There are no settings to configure mirroring: **all** supported tables and their supported columns are mirrored as soon as they're created.

- SQL database in Fabric stores its data in .mdf files, just like Azure SQL Database.
- Mirrored data is stored as delta parquet files in OneLake.
    - The SQL analytics endpoint points to those files - so you can query the mirrored data without incurring performance penalty to the primary workload from analytics queries.
    - The data accessed via the SQL analytics endpoint is read only, protecting the operational data source from accidental writes or deletes as well.

You can create views in your SQL analytics endpoint to shape the data presentation to better suit your analytics queries. You can also join to connect mirrored tables or other tables in different warehouses or lakehouses in the workspace. Similarly, with appropriate permissions, the mirrored data in OneLake follows data access patterns of other Fabric data like notebooks, shortcuts, etc.

:::image type="content" source="media/mirroring-overview/sql-database-in-fabric-mirroring.svg" alt-text="Diagram of how mirroring works for SQL database in Fabric.":::

## Differences between mirroring for SQL database in Fabric and Azure SQL Database

Mirroring largely remains the same between [mirroring Azure SQL Database](../../mirroring/azure-sql-database.md) and mirroring a SQL database in Fabric.

| Function | Azure SQL Database | SQL database in Fabric |
|:--|:--|:--|
| Mirroring setup | User takes care of authentication, network connectivity, and sets up mirroring manually. | Mirroring is automatic upon creation. |
| Authentication while setting up | Mirroring requires a login with CONTROL database permission. | Authentication is Fabric managed identities. |
| Mirroring control          | Full control by user  | Mirroring is always on and can't be turned off.  |
| Choice of tables to mirror | Full control by user  | All supported tables are mirrored with no option to skip tables. |
| Point in time restore (PITR) | PITR creates a new database and mirroring must be manually reconfigured. | PITR creates a new database in Fabric. Continuous mirroring is automatically started with a snapshot. |
| [Stored procedures for control and monitoring](/sql/relational-databases/system-stored-procedures/sp-change-feed-enable-db?view=fabric-sqldb&preserve-view=true) | Allowed | Only allowed for monitoring, not for configuration |
| [Fabric Capacity pausing / resuming / deletion / deletion of workspace](/sql/relational-databases/system-stored-procedures/sp-change-feed-enable-db?view=fabric-sqldb&preserve-view=true) | Manual intervention to remove or resume mirroring | Automatic. Fabric will pause/resume/delete the mirror and data. |
| Drop table | If "automatically mirror all data" is selected, Fabric replica of the table will be dropped.<br/>If tables manually chosen, table won't be dropped from Fabric, and the missing source table shows an error on the [monitor mirroring screen](../../mirroring/monitor.md). | Drops the mirrored table data from Fabric OneLake. |

### Effects of mirroring on transactions and workloads

The replicator engine involves the following behaviors:

- Fabric SQL database is a serverless product and will automatically pause if there is no user activity for a while. Mirroring activity will not prevent database from pausing. If the database goes to pause, any mirroring activity that is still pending, will also be paused. Mirroring resumes where it stopped once the database is resumed.
- Active transactions continue to hold the transaction log truncation until the transaction commits. Long-running transactions might result in the transaction log capacity utilization more than usual.
- Each user workload varies. Table updates/delete operations can lead to increased log generation.
- For more information, see [Limitations and behaviors for Fabric SQL database mirroring](mirroring-limitations.md).

## Authentication and authorization to SQL database in Fabric

Connect to the replicated copy of your SQL database data in OneLake via the SQL analytics endpoint of the SQL database. You can query this as a live, read-only copy of your data. For more information on authentication, authorization, and connectivity to SQL database in Fabric, see:

- [Authentication in SQL database in Microsoft Fabric](authentication.md)
- [Authorization in SQL database in Microsoft Fabric](authorization.md)
- [Connect to your SQL database in Microsoft Fabric](connect.md)
- [Private links in Microsoft Fabric](../../security/security-private-links-overview.md)

## Related content

- [Frequently asked questions for Mirroring Fabric SQL database](mirroring-faq.yml)
- [How to: Secure mirrored data in Microsoft Fabric SQL database](mirroring-secure.md)
- [Monitor Fabric mirrored Fabric SQL database replication](mirroring-monitor.md)
