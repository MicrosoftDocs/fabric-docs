---
title: Migration Assistant for Fabric Data Warehouse
description: This article explains the Migration Assistant experience for Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: anphil, prlangad
ms.date: 06/23/2025
ms.topic: concept-article
ms.search.form: Migration Assistant
---
# Fabric Migration Assistant for Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

The Fabric Migration Assistant is a migration experience built natively into Fabric, providing a guided migration experience to Microsoft Fabric. 

The Migration Assistant copies metadata and data from the source database, automatically converting the source schema to Fabric Data Warehouse. AI-powered assistance provides quick solutions for migration incompatibility or errors.

> [!TIP]
> For a step-by-step guide to migrate with the Migration Assistant, see [Migrate with the Fabric Migration Assistant for Data Warehouse](migrate-with-migration-assistant.md).
>
> For more information on strategy and planning your migration, see [Migration​ planning: ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](migration-synapse-dedicated-sql-pool-warehouse.md).

## Migration steps

Migration with the Fabric Migration Assistant involves these steps at a high level:

1. Migrate the schema of objects (such as the definition for a table) from your source into a new Fabric warehouse using a DACPAC file.
1. Use the Migration Assistant to fix problems by updating T-SQL types and definitions for the objects that couldn't automatically migrate.
1. Copy data using copy job in Fabric Data Factory.
1. Testing and parallel comparison of the old warehouse and new warehouse. Finally, reroute connections from applications that access the source warehouse to use the new warehouse.

## Migrated objects

The Migration Assistant helps users migrate to Fabric warehouse using DACPAC files. The database object metadata captured within the DACPAC are:

-   Tables
-   Views
-   Functions
-   Stored procedures
-   Security objects such as roles, permissions, dynamic data masking

## Fix problems with Migration Assistant

Some T-SQL scripts fail to migrate if the metadata couldn't be migrated into those that are supported in Fabric warehouse, or if the code failed to apply to T-SQL. The **Fix problems** step of the migration assistant helps you fix these failed scripts.

### Primary and dependent objects

The failed scripts are split into sets:

-   Primary objects are ones that aren't dependent on another object.
-   Dependent objects are ones that are dependent on one or more objects either directly or indirectly.

Dependent objects won't be migrated until their primary objects are fixed, so you're guided to fix the primary objects first.

For example, there are three objects: table A, view B that uses table A, view C that uses view B. In this case, the primary object is Table A. Views B and C are dependent objects. 

The primary objects are sorted by priority to help you complete your migration faster. The priority is based on the number of dependencies of the object. Dependencies refer to any objects that reference or are dependent on this object, directly, or indirectly. 

For instance, table A has two dependencies on views B and C, view B has one dependency on view C, and view C has no dependencies. So, they are sorted in priority starting with Table A, View B, View C.

### Fix migration errors

Review and fix the broken scripts using the error information manually, or use Copilot for AI-powered assistance. ([Copilot must be enabled](copilot.md#enable-copilot).) Copilot analyzes your query and tries to find the best way to fix it. Copilot leaves comments to explain what it fixed and why. Mistakes can happen as Copilot uses AI, so verify code suggestions before running them.

Once you have made any adjustments you need to run the query, Migration Assistant validates and migrates the object and its dependencies. After the fixed object is migrated, the **Primary objects** tab is updated with a new prioritized list of objects. Fixing a primary object could result in the count of primary objects staying the same or even going up. For example, object B is broken because of a dependency on multiple other broken objects, including object A. In this scenario, fixing object A would fix some, but not all, errors in B and result in B changing from a dependent object into a primary object.

## Security

Most types of security objects including roles, permissions (such as GRANT/REVOKE/DENY), and dynamic data masking are expected to migrate automatically. Some objects (such as SQL authenticated users or column-level encryption) will need updates to work in Fabric. These issues are flagged in the **Fix problems** list in the Migration Assistant.

SQL authenticated users need to be replaced with [Microsoft Entra users in Microsoft Fabric](entra-id-authentication.md#workspace-setting). Make sure they can sign into Fabric via Microsoft Entra ID, then use **Manage permissions** or **Share dialog** to add them to your warehouse in Fabric. To add users, an Admin/Member must have "Reshare" permissions.

Before copying data, make sure to fix the security objects that failed to migrate and review that the security you need is set up, so that users don't have unintended access to sensitive information.

## Limitations

Currently, there isn't full T-SQL compatibility between the source warehouse and Fabric warehouse. For more information, see: 

- [Limitations of Fabric Data Warehouse](limitations.md) 
- [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md)

The workarounds for some of the common unsupported features:

| Issue | Workaround |
| :-- | :-- |
| SQL authentication | Replace SQL authentication users with [Microsoft Entra authentication as an alternative to SQL authentication](entra-id-authentication.md). |
| Column-level encryption | Use alternative ways to protect your data such as implementing encryption at the application layer and [Dynamic data masking in Fabric data warehousing](dynamic-data-masking.md) for obfuscating sensitive data. |
| Scalar functions | Scalar user-defined functions (UDFs) are not currently migrated by the Migration Assistant. Scalar UDFs are supported in Fabric Data Warehouse, but only when inlineable (currently in preview). For more information, see [CREATE FUNCTION](/sql/t-sql/statements/create-function-sql-data-warehouse?view=fabric&preserve-view=true) and [Scalar UDF inlining](/sql/relational-databases/user-defined-functions/scalar-udf-inlining?view=fabric&preserve-view=true). |
| Identity columns | Use alternative methods to assign a unique identifier. For examples, see [Generate unique identifiers in a warehouse table in Microsoft Fabric](generate-unique-identifiers.md) |
| Temp tables | Use regular tables. |

The following unsupported features are no longer needed in Microsoft Fabric Data Warehouse:

- Indexes
- Transparent data encryption (TDE): Not needed in Fabric because Fabric already encrypts data through more advanced means.

Other currently unsupported features you might see:

-   External tables
-   Multi-statement table-valued functions (TVF)

## Next step

> [!div class="nextstepaction"]
> [Migrate Data with the Fabric Migration Assistant for Data Warehouse](migrate-with-migration-assistant.md)

## Related content

- [Migrate with the Fabric Migration Assistant for Data Warehouse](migrate-with-migration-assistant.md)
- [Migration​ planning: ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](migration-synapse-dedicated-sql-pool-warehouse.md)
