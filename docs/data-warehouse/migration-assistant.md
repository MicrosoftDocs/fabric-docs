---
title: Migration Assistant for Fabric Data Warehouse
description: This article explains the Migration Assistant experience for Fabric Data Warehouse.
ms.reviewer: anphil, prlangad
ms.date: 08/19/2025
ms.topic: concept-article
ai-usage: ai-assisted
---
# Fabric Migration Assistant for Data Warehouse

**Applies to**: [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

The Fabric Migration Assistant is a migration experience built natively into Fabric. It provides a guided migration experience to Microsoft Fabric. 

The Migration Assistant copies metadata and data from the source database, and it automatically converts the source schema to Fabric Data Warehouse. AI-powered assistance provides quick solutions for migration incompatibility or errors.

> [!TIP]
> For step-by-step migration guides with the Migration Assistant, see [Migrate by uploading a file](migrate-using-upload-file.md) and [Migrate by connecting to the source system](migrate-using-connection-to-source-system.md).

Use the Fabric Migration Assistant for Data Warehouse for migration:

- From Azure Synapse Analytics dedicated SQL pool 
    - [Migration planning: Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](migration-synapse-dedicated-sql-pool-planning.md)
    - [Migration methods for Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](migration-synapse-dedicated-sql-pool-methods.md)
- SQL Server and other [SQL Database Engine](/sql/database-engine/sql-database-engine) platforms 
    - [Migration planning: SQL Server to Fabric Data Warehouse](migration-sql-server-planning.md)
    - [Migration methods for SQL Server to Fabric Data Warehouse](migration-sql-server-methods.md)
- Teradata metadata (preview) 
    - [Plan a migration from Teradata to Fabric Data Warehouse](migration-teradata-planning.md)
    - [Migration methods for Teradata to Fabric Data Warehouse](migration-teradata-methods.md)
    - [Translate Teradata SQL for Fabric Data Warehouse](migration-teradata-sql-translation.md)

## Migration steps

The Migration Assistant helps you migrate to Fabric Data Warehouse. You can upload a DACPAC file or create a direct connection to the source system.

Migration with the Fabric Migration Assistant involves these steps:

1. Migrate object schemas, such as table definitions, into a new Fabric warehouse by uploading a source file or connecting to your source system.
1. Use the Migration Assistant to fix problems by updating T-SQL types and definitions for the objects that it couldn't automatically migrate.
1. Copy data by using a copy job in Fabric Data Factory.
1. Test and compare the old warehouse and new warehouse. Finally, reroute connections from applications that access the source warehouse to use the new warehouse.

## Migrated objects

The Migration Assistant helps you migrate to Fabric Data Warehouse by uploading a DACPAC file, uploading a zip archive of `.sql` or `.bteq` files, or connecting to the source system. The captured database object metadata includes:

- Tables
- Views
- Functions
- Stored procedures
- Security objects such as roles, permissions, dynamic data masking

## Fix problems with Migration Assistant

Some T-SQL scripts fail to migrate if the metadata couldn't be migrated into those that are supported in Fabric Data Warehouse, or if the code failed to apply to T-SQL. The **Fix problems** step of the Migration Assistant helps you fix these failed scripts.

For more information, see our step-by-step tutorials: [Migrate by uploading a file](migrate-using-upload-file.md) or [Migrate by connecting to the source system](migrate-using-connection-to-source-system.md).

### Primary and dependent objects

The failed scripts are split into sets:

- Primary objects don't depend on another object.
- Dependent objects depend directly or indirectly on one or more objects.

Dependent objects won't be migrated until their primary objects are fixed, so you're guided to fix the primary objects first.

For example, consider three objects: table A, view B that uses table A, and view C that uses view B. In this case, the primary object is table A. Views B and C are dependent objects.

The primary objects are sorted by priority to help you complete your migration faster. The priority is based on the number of dependencies of the object. Dependencies refer to any objects that reference or are dependent on this object, directly, or indirectly. 

For instance, table A has two dependencies on views B and C, view B has one dependency on view C, and view C has no dependencies. The priority order is table A, view B, and then view C.

### Fix migration errors

Review and fix the broken scripts by using the error information manually, or use Copilot for AI-powered assistance. ([Copilot must be enabled](copilot.md#enable-copilot).) Copilot analyzes your query and tries to find the best way to fix it. Copilot leaves comments to explain what it fixed and why. Mistakes can happen as Copilot uses AI, so verify code suggestions before running them.

When you run the query, Migration Assistant validates and migrates the object and its dependencies. After the fixed object is migrated, the **Primary objects** tab is updated with a new prioritized list of objects. Fixing a primary object could result in the count of primary objects staying the same or even going up. For example, object B is broken because of a dependency on multiple other broken objects, including object A. In this scenario, fixing object A would fix some, but not all, errors in B and result in B changing from a dependent object into a primary object.

## Security

Most types of security objects including roles, permissions (such as GRANT, REVOKE, and DENY), and dynamic data masking migrate automatically. Some objects (such as SQL authenticated users or column-level encryption) need updates to work in Fabric. The Migration Assistant flags these issues in the **Fix problems** list.

Replace SQL authenticated users with [Microsoft Entra users in Microsoft Fabric](entra-id-authentication.md#workspace-setting). Ensure they can sign in to Fabric through Microsoft Entra ID, and then use **Manage permissions** or the **Share** dialog to add them to your warehouse. To add users, an Admin or Member must have Reshare permission.

Before copying data, ensure you fix the security objects that failed to migrate and review that the security you need is set up, so that users don't have unintended access to sensitive information.

## Limitations

Currently, there isn't full T-SQL compatibility between the source warehouse and Fabric warehouse. For more information, see: 

- [Limitations of Fabric Data Warehouse](limitations.md) 
- [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md)

The following table lists workarounds for some common unsupported features:

| Issue | Workaround |
| :-- | :-- |
| SQL authentication | Replace SQL authentication users with [Microsoft Entra authentication as an alternative to SQL authentication](entra-id-authentication.md). |
| Column-level encryption | Use other methods to protect your data, such as implementing encryption at the application layer and [Dynamic data masking in Fabric data warehousing](dynamic-data-masking.md) to obfuscate sensitive data based on user permissions. |
| Identity columns | IDENTITY columns in Fabric Data Warehouse behave differently than they do in other platforms, such as SQL Server. For more details, refer to [Understanding IDENTITY columns in Fabric Data Warehouse](identity.md).|


The following unsupported features are no longer needed in Fabric Data Warehouse:

- Indexes
- Transparent data encryption (TDE): Fabric Data Warehouse doesn't need TDE because it already encrypts data through more advanced means. For more information, see [Data Encryption in Fabric Data Warehouse](encryption.md).

Other currently unsupported features you might see:

-   External tables
-   Multi-statement table-valued functions (TVF)

## Next step

> [!div class="nextstepaction"]
> [Migrate by uploading a file](migrate-using-upload-file.md) or [Migrate by connecting to the source system](migrate-using-connection-to-source-system.md)

## Related content

- [Migrate by uploading a file with source metadata](migrate-using-upload-file.md)
- [Migrate by connecting to the source system](migrate-using-connection-to-source-system.md)
- [Migration planning: Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](migration-synapse-dedicated-sql-pool-planning.md)
