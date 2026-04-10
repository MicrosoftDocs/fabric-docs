---
title: Migrate SQL Server to SQL Database in Microsoft Fabric Using Fabric Migration Assistant
description: Learn how the Fabric Migration Assistant migrates schema and data from SQL Server–based sources to a SQL database in Microsoft Fabric.
ms.reviewer: randolphwest, subasak, niball, antho
ms.date: 04/07/2026
ms.topic: concept-article
---

# Fabric Migration Assistant for SQL database (Preview)

**Applies to**: [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

The Fabric Migration Assistant for SQL database is a Fabric guided migration experience that helps you move databases from an on-premises SQL Server instance to a SQL database in Microsoft Fabric.

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

Currently, the Migration Assistant imports schema metadata from a DACPAC file generated from the source database, analyzes compatibility with SQL database in Fabric, and guides you through supported fixes before copying data into the target database. For step-by-step migration instructions, see [Migrate to SQL database in Fabric with the Migration Assistant by using DACPAC](migrate-with-migration-assistant-using-dacpac.md).

The Migration Assistant helps you:

1. Import database schema metadata
1. Identify schema incompatibilities with SQL database in Fabric
1. Apply supported fixes to incompatible objects
1. Prepare the target database for data copy
1. Copy data by using Fabric Data Factory copy jobs
1. Finalize the migration

## Supported sources

Currently, the Migration Assistant for SQL database can import the schema from a DACPAC file, and copy the data by using copy jobs in Data Factory in Microsoft Fabric.

## Migration workflow

Migration using the Fabric Migration Assistant follows a guided, multistep workflow.

1. Copy schema - Import schema metadata from the source database by using a DACPAC file.
1. Fix script errors - Review schema objects that failed compatibility checks and apply supported fixes.
1. Prepare for copy - Prepare the target database for data movement to reduce copy failures and improve performance.
1. Copy data - Use a Fabric Data Factory copy job to move data from the source SQL Server database.
1. Finalize copy - Re-enable constraints, triggers, and indexes to bring the database to its final state.

## Schema compatibility and fixes

The Migration Assistant analyzes schema objects in the DACPAC and categorizes them based on compatibility with SQL database in Fabric.

- Compatible objects are migrated as is.
- Incompatible objects are flagged with detailed reasons and suggested fixes. You're guided through resolving any incompatibility issues with objects. 
    - Dependent objects are identified and can be migrated after their primary objects. 

## Security

- You must be a **Contributor** or higher in the Fabric workspace to start a migration.
- To read from the source SQL Server instance database, you need `SELECT` permission, or membership in the `db_datareader` role.

## Gateway requirement

When you migrate data from an on-premises SQL Server instance to a SQL database in Fabric, you must configure both an on-premises data gateway and a Fabric SQL connection. The Fabric SQL connection must explicitly allow usage with gateways for migration copy operations to succeed.

## Limitations

- The maximum supported size for a DACPAC file upload is 20 MB.
- Only on-premises data gateways are supported. Virtual network data gateways aren't supported.
- Private link isn't supported.

## Troubleshooting

### Data copy using on-premises data gateways

**Issue**: When you migrate data by using Fabric Copy jobs with an on-premises data gateway, copy operations can fail in some environments if you autoselect the target SQL database in Fabric from the OneLake catalog.

This behavior occurs because of autobound target connections that can expire or become hidden. You can't edit or refresh these connections.

**Workaround**: Instead of selecting the target SQL database from the OneLake catalog, configure the target explicitly as an Azure SQL connection when you create the copy job. Data copy succeeds when you define the target explicitly.

## Next step

> [!div class="nextstepaction"]
> [Migrate using DACPAC](migrate-with-migration-assistant-using-dacpac.md)

## Related content

- [Microsoft Fabric Migration Overview](../../fundamentals/migration.md)