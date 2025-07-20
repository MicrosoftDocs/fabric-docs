---
title: "Limitations of Fabric Mirrored Databases From Azure Database for PostgreSQL flexible server"
description: A detailed list of limitations for mirrored databases from Azure Database for PostgreSQL flexible server in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scoriani
ms.date: 07/15/2025
ms.topic: conceptual
ms.custom:
  - references_regions
---
# Limitations in Microsoft Fabric mirrored databases from Azure Database for PostgreSQL flexible server

Current limitations in the [Microsoft Fabric mirrored databases](overview.md) from Azure Database for PostgreSQL flexible server are listed in this page. This page is subject to change.

For troubleshooting, see:

- [Troubleshoot Fabric mirrored databases](troubleshooting.md)
- [Troubleshoot Fabric mirrored databases from Azure Database for PostgreSQL flexible server](azure-database-postgresql-troubleshoot.md)

## Server level limitations

- Fabric Mirroring is supported for PostgreSQL versions 14, 15, 16, and 17.
- Servers in the Burstable Compute Tier are currently not supported. 
- Servers with High Availability enabled are currently not supported.

## Database level limitations

- Fabric Mirroring for Azure Database for PostgreSQL flexible server is only supported on a writable primary database.
- Azure Database for PostgreSQL flexible server database can't be mirrored if it is already mirrored in another Fabric workspace.
- The maximum number of tables that can be mirrored into Fabric is 500 tables. Any tables above the 500 limit currently cannot be replicated.
  - If you select **Mirror all data** when configuring Mirroring, the tables to be mirrored over are the first 500 tables when all tables are sorted alphabetically based on the schema name and then the table name. The remaining set of tables at the bottom of the alphabetical list are not mirrored over.
  - If you unselect **Mirror all data** and select individual tables, you are prevented from selecting more than 500 tables.

## Permissions in the source database

<!-- Maintain similar content in docs\database\mirrored-database\azure-database-postgresql-tutorial.md -->

- Permissions defined in Azure Database for PostgreSQL flexible server are not propagated to the replicated data in Fabric OneLake.
- To successfully configure Mirroring for Azure Database for PostgreSQL flexible server, the database role used to connect to the source server must be granted the permissions needed for Fabric mirroring in the database. You must grant the `CREATEDB`, `CREATEROLE`, `LOGIN`, `REPLICATION`, and `azure_cdc_admin` permissions to a new role named `fabric_user`. For a sample script, see [Tutorial: Configure Microsoft Fabric mirrored databases from Azure Database for PostgreSQL](azure-database-postgresql-tutorial.md#use-a-database-role).
- The `fabric_user` database role also needs to be `owner` of the tables in the source database. This means that tables have been created by that user, or that the ownership of those tables has been changed using `ALTER TABLE xxx OWNER TO fabric_user;`. When switching ownership to new user, you might need to grant to that user all privileges on `public` schema before. For more information regarding user account management, see Azure Database for PostgreSQL [user management](/azure/postgresql/flexible-server/how-to-create-users) documentation, PostgreSQL product documentation for [Database Roles and Privileges](https://www.postgresql.org/docs/current/static/user-manag.html), [GRANT Syntax](https://www.postgresql.org/docs/current/static/sql-grant.html), and [Privileges](https://www.postgresql.org/docs/current/static/ddl-priv.html). 

## Network and connectivity security

- If your Flexible Server is not publicly accessible and doesn't [allow Azure services](/azure/azure-sql/database/network-access-controls-overview#allow-azure-services) to connect to it, you can [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) to mirror the data. Make sure the Azure Virtual Network or the gateway machine's network can connect to the Azure Database for PostgreSQL flexible server via a private endpoint or is allowed by the firewall rule.
- The Azure Database for PostgreSQL flexible server's [System Assigned Managed Identity (SAMI) needs to be enabled](/azure/postgresql/flexible-server/how-to-configure-managed-identities-system-assigned) and must be the primary identity.

## Table level

- DDL operations on existing mirrored tables are not supported (add/remove column, change data type, etc.). Modify existing tables with require to drop and recreate the mirrored database in Microsoft Fabric.
- `TRUNCATE TABLE` commands on mirrored tables are not supported
- Mirroring is not currently not supported for views, materialized views, foreign tables, toast tables or partitioned tables.

## Column level

- Data in a **Numeric**/**Decimal** column exceeding precision of 38 won't be replicated in the mirrored database and will appear as `NULL`.
- If the source table contains columns with one of these data types, these columns cannot be mirrored to Fabric OneLake. The following data types are currently unsupported for mirroring:
    - `bit`
    - `bit varying [ (n) ]`, `varbit`
    - `box`
    - `cidr`
    - `circle`
    - `inet`
    - `interval [ fields ] [ (p) ]`
    - `json`
    - `jsonb`
    - `line`
    - `lseg`
    - `macaddr`
    - `macaddr8`
    - `path`
    - `pg_lsn`
    - `pg_snapshot`
    - `point`
    - `polygon`
    - `tsquery`
    - `tsvector`
    - `txid_snapshot`
    - `xml`

- Mirroring supports replicating columns containing spaces or special characters in names (such as  `,` `;` `{` `}` `(` `)` `\n` `\t` `=`). For tables under replication before this feature enabled, you need to update the mirrored database settings or restart mirroring to include those columns. Learn more from [Delta column mapping support](troubleshooting.md#delta-column-mapping-support).

## Warehouse limitations

- Source schema hierarchy is replicated to the mirrored database. For mirrored databases created before this feature enabled, the source schema is flattened, and schema name is encoded into the table name. If you want to reorganize tables with schemas, recreate your mirrored database. Learn more from [Replicate source schema hierarchy](troubleshooting.md#replicate-source-schema-hierarchy).

## Mirrored item limitations

- User needs to be a member of the Admin/Member role for the workspace to create SQL Database mirroring.  
- Stopping mirroring disables mirroring completely.  
- Starting mirroring reseeds all the tables, effectively starting from scratch.  

## SQL analytics endpoint limitations

- The SQL analytics endpoint is the same as [the Lakehouse SQL analytics endpoint](../../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It's the same read-only experience. See [SQL analytics endpoint limitations](../../data-warehouse/limitations.md#limitations-of-the-sql-analytics-endpoint).

## Supported regions

[!INCLUDE [fabric-mirroredpg-supported-regions](includes/fabric-mirroredpg-supported-regions.md)]

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Configure Microsoft Fabric mirrored databases from Azure Database for PostgreSQL flexible server](azure-database-postgresql-tutorial.md)

## Related content

- [Monitor Fabric mirrored database replication](monitor.md)
- [Model data in the default Power BI semantic model in Microsoft Fabric](/fabric/data-warehouse/model-default-power-bi-dataset)
