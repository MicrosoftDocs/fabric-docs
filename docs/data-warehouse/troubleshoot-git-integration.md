---
title: Troubleshoot Git Integration for Fabric Warehouse Development
description: Learn how to troubleshoot Fabric's built-in Git integration when developing and deploying Fabric Data Warehouse.
ms.reviewer: pvenkat
ms.date: 07/30/2026
ms.topic: troubleshooting-general
---

# Troubleshoot Git integration for Fabric warehouse development

**Applies to**: [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article includes troubleshooting topics for developing and deploying Fabric Data Warehouse with Fabric's built-in Git integration. 

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## References to the warehouse's own objects by using a three-part name

An object can reference another object in the *same* warehouse by using a three-part name, `[warehouse_name].[schema_name].[object_name]`.

Three-part naming is intended for referencing a *different* warehouse. When the database part names the current warehouse, the build treats the reference as external, and the object ends up defined twice in the model.

Remove the database part from references to the warehouse's own objects:

```sql
-- Fails: the warehouse is named MyWarehouse and references itself by name
CREATE VIEW [Sales].[CustomerSummary] AS
SELECT c.[CustomerId], c.[OrderDate]
FROM [MyWarehouse].[Sales].[Customers] AS c;

-- Works
CREATE VIEW [Sales].[CustomerSummary] AS
SELECT c.[CustomerId], c.[OrderDate]
FROM [Sales].[Customers] AS c;
```

Only references to the warehouse's own objects need to change. Genuine cross-database references to other warehouses, such as `[Other_Warehouse].[Sales].[Orders]`, are supported and should stay as-is.

> [!IMPORTANT]
> Use three-part naming (`database.schema.object`) only for cross-warehouse or cross-SQL analytics endpoint references, not to reference objects within the same warehouse. Self-referencing objects in the same warehouse by using three-part naming isn't a standard modeling practice, and can create inadvertent external references.
>
> Where possible, model objects by using two-part naming (`schema.object`) instead of three-part naming, even for self-references within the same warehouse. This convention improves consistency across client tools and avoids the ambiguity introduced by three-part references.

## Out-of-date .sqlproj in the Git repository

The Git repository can contain a `.sqlproj` file that references an older `Microsoft.Build.Sql` SDK version. The older SDK doesn't recognize newer Fabric Data Warehouse syntax such as `IDENTITY` columns and `CLUSTER BY`.

This issue affects repositories whose contents were committed before the warehouse moved to the current definition format. The most common situations that result in an out-of-date .sqlproj file are:

- **Connecting a new workspace to an existing repository.** The warehouse is created from whatever is committed there.
- **Branching out to a new workspace.**
- **Restoring a deleted warehouse from Git.**
- **Syncing from Git immediately after the warehouse moved to the current definition format**, before any sync in the other direction has run.

Warehouses that aren't moved to the current definition format aren't affected, because the older project file isn't used to build.

#### How to confirm .sqlproj SDK version

Open the warehouse's `.sqlproj` file in the repository and check the SDK version in the XML:

```xml
<Sdk Name="Microsoft.Build.Sql" Version="2.2.0" />
```

A version that's behind the current [Microsoft.Build.Sql package version](https://www.nuget.org/packages/Microsoft.Build.Sql) indicates an out-of-date project file. For example, if your version starts with `0.1.`. For more information, see [Microsoft.Build.Sql and Templates Releases](https://github.com/microsoft/DacFx/tree/main/release-notes/Microsoft.Build.Sql).

#### Update .sqlproj SDK version option A: sync warehouse to Git first

If the warehouse already exists in the workspace and is healthy, commit from the workspace to Git before syncing in the other direction. This action regenerates the project file with the current SDK version, after which syncing from Git works normally.

This option is preferred where available, because it brings the whole definition up to date rather than just the SDK attribute.

The warehouse must already be on the current definition format for this option to work. If it isn't, [upgrade it first in the Fabric Git panel](upgrade-warehouse.md), and then commit to Git. Committing from a warehouse that's still on the older definition format writes the older format back to the repository and doesn't refresh the SDK version, so the next sync fails the same way. If you can't upgrade, use [fix option B](#update-sqlproj-sdk-version-option-b-update-the-sqlproj-file-in-git-directly) instead.

#### Update .sqlproj SDK version option B: update the .sqlproj file in Git directly

Use this option when the warehouse doesn't yet exist in the target workspace, such as when you're connecting a new workspace to an existing repository, branching out, or restoring a deleted warehouse. In those cases, there's no warehouse to sync from, so fix option A isn't available.

Edit the `.sqlproj` file in the repository to use the latest [Microsoft.Build.Sql package version](https://www.nuget.org/packages/Microsoft.Build.Sql) and commit the change. For example:

```xml
<!-- Before -->
<Sdk Name="Microsoft.Build.Sql" Version="0.1.19-preview" />

<!-- After -->
<Sdk Name="Microsoft.Build.Sql" Version="2.2.0" />
```

Running an export or a diff on its own doesn't update the project file. The file is only rewritten when a commit from the workspace to Git completes, or when you edit it manually.

## Unqualified columns in objects that reference two or more tables in another warehouse

Always provide and use table aliases when referencing columns in T-SQL queries. 

- When a T-SQL query references two or more tables in another warehouse, the build can't validate a column written without a table alias to a specific table. The tables don't need to share a column name for this ambiguity to exist. This ambiguity exists in the validation build.
- This ambiguity affects T-SQL queries inside objects that reference two or more tables in another warehouse within the same statement body.
- This ambiguity doesn't affect T-SQL queries inside objects that reference only one table in another warehouse, because with a single source there's nothing to be ambiguous between. 
- This ambiguity doesn't affect T-SQL queries that stay entirely within one warehouse.

In the following example, only `fieldinfo` has `finame`, so the SQL is valid and runs correctly against the warehouse, but ambiguity exists in the validation build.

```sql
-- Fails: two tables from another warehouse, and 'finame' isn't alias-qualified
CREATE PROCEDURE [dbo].[LoadFieldInfo] AS
SELECT finame
FROM   [OtherWarehouse].[halo].[fieldinfo] AS f
INNER JOIN   [OtherWarehouse].[halo].[lookup]    AS l ON f.[id] = l.[id];
```

Add a table alias to every column reference in the affected object:

```sql
-- Works: every column carries its table alias
CREATE PROCEDURE [dbo].[LoadFieldInfo] AS
SELECT f.[finame]
FROM   [OtherWarehouse].[halo].[fieldinfo] AS f
INNER JOIN   [OtherWarehouse].[halo].[lookup]    AS l ON f.[id] = l.[id];
```

## Inconsistent capitalization of schema names

Your warehouse can use a case-insensitive collation, so `sales` and `Sales` are the same schema, but your scripts might spell it both ways in different places. Case-insensitive databases have always accepted that, so the inconsistency is usually long-standing and harmless.

When your scripts reference two or more different objects in the same schema of another warehouse, and spell that schema differently in each reference, the build generates a `CREATE SCHEMA` statement for each spelling. This issue affects only warehouses that reference another warehouse and use a case-insensitive collation.

- By default, warehouses in Fabric use `Latin1_General_100_BIN2_UTF8`, a case-sensitive collation. Case-sensitive warehouses aren't affected. In those warehouses, `sales` and `Sales` are two different schemas, whether you intend this or not. 
- A case-insensitive database can't contain both `sales` and `Sales`. The duplicate comes only from the differing spellings in your SQL text.

Check the [warehouse collation](collation.md) and the `ModelCollation` specified in the `.sqlproj` file. Look for `CI` (case-insensitive) or `CS` (case-sensitive).

```xml
<ModelCollation>1033, CI</ModelCollation>   <!-- case-insensitive: affected -->
<ModelCollation>1033, CS</ModelCollation>   <!-- case-sensitive: not affected -->
```

#### Fix

To identify inconsistent schema name capitalization in your warehouse object definitions, compare the capitalization of the schema named in the error across all your scripts. Look for two cross-warehouse references to the same schema that differ only in case.

Use one consistent capitalization everywhere, matching the actual schema name in the referenced warehouse. For example, use only `Sales` or only `sales`.

```sql
-- Fails: two objects in the same schema, referenced with different capitalization
CREATE VIEW [dbo].[v_one] AS SELECT * FROM [OtherWarehouse].[sales].[Orders];
GO
CREATE VIEW [dbo].[v_two] AS SELECT * FROM [OtherWarehouse].[Sales].[Customers];

-- Works: same capitalization in both references
CREATE VIEW [dbo].[v_one] AS SELECT * FROM [OtherWarehouse].[Sales].[Orders];
GO
CREATE VIEW [dbo].[v_two] AS SELECT * FROM [OtherWarehouse].[Sales].[Customers];
```

You encounter this problem when you have two different objects with two different schema capitalizations. Two references to the *same* object with different capitalization are folded correctly and don't fail.

## Column collation

If a column's `COLLATE` clause explicitly specifies the same collation as the [warehouse's default collation](collation.md), Fabric's schema extraction (DacFx-based) treats the explicit collation as equivalent to not specifying one at all. In this case:

- The explicit `COLLATE` clause doesn't appear in the item definition extracted to the Git repository.
- The column doesn't show up as a difference in Git **Changes**, **Updates**, or deployment pipeline comparisons, because there's no effective difference from the warehouse's default collation.

Only columns whose collation differs from the warehouse's default collation retain an explicit `COLLATE` clause in source control, and only changes to those columns' collation appear as differences.

For example, consider a warehouse whose collation is `Latin1_General_100_CI_AS_KS_WS_SC_UTF8`:

```sql
CREATE TABLE dbo.MixedCollationExample
(
    CustomerId      INT             NOT NULL,
    FirstName       VARCHAR(100)    NOT NULL,                                               -- inherits warehouse collation
    LastNameBin     VARCHAR(100)    COLLATE Latin1_General_100_BIN2_UTF8 NOT NULL,          -- column override, differs from warehouse collation
    Email           VARCHAR(256)    COLLATE Latin1_General_100_CI_AS_KS_WS_SC_UTF8 NULL     -- explicit collation, matches warehouse collation
);
```

- `FirstName` has no explicit collation and inherits the warehouse's default collation.
- `LastNameBin` has an explicit collation that differs from the warehouse's default collation, so it's preserved in the extracted definition and always appears in comparisons if it changes.
- `Email` has an explicit collation that matches the warehouse's default collation. Even though the `COLLATE` clause is present in the T-SQL, it doesn't appear in the Git-extracted definition or in Git or deployment pipeline comparisons, because it's equivalent to the default.

## Ambiguous column errors with duplicate candidate objects

Committing or updating from Git can fail with an ambiguous column error whose candidate list contains a `::` separator, for example:

```output
SQL71501: View: [dbo].[SchoolSummary] contains an unresolved reference to an object.
Either the object does not exist or the reference is ambiguous because it could refer
to any of the following objects: [dbo].[SchoolSummary].[NCESID] or
[dbo].[SchoolSummary].[ss]::[NCESID].
```

The `::` separator distinguishes this error from the genuine ambiguity described in [Unqualified columns in objects that reference two or more tables in another warehouse](#unqualified-columns-in-objects-that-reference-two-or-more-tables-in-another-warehouse). Adding a table alias doesn't resolve it as the alias appears in the candidate list and the error still occurs.

1. First, rule out these two more common causes:

    - **A genuinely missing or misnamed object.** If the same commit or update also reports an unresolved reference to a specific missing object, such as `SQL71501: View: [dbo].[v_report] has an unresolved reference to object [dbo].[MissingTable]`, fix that reference first. The `::` candidates usually clear along with it.
    - **A genuinely ambiguous column.** If an unqualified column is selected over a join of two sources that both expose a column of that name, qualify the column with its table alias, for example `a.[NCESID]`. SQL Server would reject this query too, so it isn't specific to Git integration.
    
2. If every referenced object exists and no column is genuinely ambiguous, the `::` candidates are a known issue in the validation that runs during commits and updates from Git, tracked by the product team. Try these workarounds, in order:

    1. Replace `SELECT *` inside CTEs and derived tables with an explicit column list.
    1. Split the view so that each ambiguous source is defined in its own view, and reference that view instead of repeating the underlying query.
    1. Avoid joining `OPENROWSET(BULK ...)` to another dynamically shaped source in the same statement.
    
If none of these resolve the error, collect the definition of the object named in the error and [open a support request](https://support.fabric.microsoft.com/). For limitations specific to deployment pipelines, see [Limitations](deploy-pipelines.md#limitations).


## Related content

- [Get started with Git integration](../cicd/git-integration/git-get-started.md)
- [Use Git Integration for warehouse development and deployment](how-to-git-integration.md)
