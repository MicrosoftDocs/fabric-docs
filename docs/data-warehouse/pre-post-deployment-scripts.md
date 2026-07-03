---
title: Pre-deployment and post-deployment scripts for Fabric Data Warehouse (Preview)
description: Learn how to use pre-deployment and post-deployment scripts in SQL database projects to customize deployment of a warehouse in Microsoft Fabric.
ms.date: 07/02/2026
ms.reviewer: pvenkat
ms.topic: how-to
---
# Pre-deployment and post-deployment scripts for Fabric Data Warehouse (Preview)

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

Pre-deployment and post-deployment scripts let you run custom Transact-SQL commands as part of deploying a warehouse in Fabric. Use pre-deployment and post-deployment scripts to clean up data, seed reference data, or apply SQL security that isn't expressed in the schema of the warehouse. 

In a Fabric Data Warehouse, a pre-deployment or post-deployment script is a **shared SQL query**. You can author these scripts in a SQL database project and designate them from the Fabric portal. The designation is stored as warehouse-level metadata and is committed to source control as part of the warehouse's `.sqlproj` file, so it round-trips through Git and deployment pipelines without manual reapplication.

This article explains what pre-deployment and post-deployment scripts are, how to configure them in the Fabric portal, how they behave with source control and deployment pipelines, and how to author them in Visual Studio Code and SQL Server Management Studio (SSMS).

> [!IMPORTANT] 
> Always review deployment scripts and settings before publishing. Test in dev and test environments first to prevent unintended data loss.

## What are pre-deployment and post-deployment scripts?

When you connect a workspace to source control, each warehouse is represented as a SQL database project: a source-controlled script of the SQL objects that make up the warehouse schema (tables, views, stored procedures, and functions). Each object is stored as a `.sql` file that contains its data definition language (DDL) syntax, such as `CREATE TABLE`. The objects describe the *desired state* of the schema, and the deployment process compares that desired state to the target warehouse and generates a differential T-SQL script that creates, alters, or drops objects so the target matches the project.

Pre-deployment and post-deployment scripts extend this process with Transact-SQL that runs around the schema deployment:

- A **pre-deployment script** runs *before* the schema deployment plan is applied.
- A **post-deployment script** runs *after* the schema deployment plan completes.

A pre-deployment or post-deployment script is one of the **shared queries** stored under the **Queries** folder of the warehouse. A warehouse supports at most one pre-deployment script and one post-deployment script. The designation is stored as warehouse-level metadata rather than duplicating the script content, so it adds negligible storage overhead.

Because each designated script runs every time the warehouse is deployed, create the Transact-SQL to be idempotent (safe to run repeatedly).

> [!TIP]
> When a script is **idempotent**, it can be run multiple times without causing issues, and you can deploy to multiple databases without needing to predetermine their status.

### Common use cases

- **Reference and static data management**: Insert, update, or delete rows from lookup, configuration, or reference tables after the schema is deployed.
- **Data cleanup**: Remove stale or temporary data before or after schema changes are applied.
- **Environment setup**: Apply settings or initialize state that differs between development, test, and production environments.
- **Metadata-driven pipeline initialization**: Prepare the warehouse state required by downstream pipeline steps.
- **SQL security**: Warehouse table data and SQL security features such as roles, users, and `GRANT`/`DENY` permissions aren't included in the SQL database project. Use a post-deployment script to recreate these objects after deployment, including differences between test and production environments. For examples, see [Example post-deployment script for SQL security](#example-post-deployment-script-for-sql-security).

## SQL project file structure and syntax

A warehouse SQL project references the pre-deployment and post-deployment scripts in the project file (`.sqlproj`) with the `PreDeploy` and `PostDeploy` item types. Each entry points to a single shared query file in the project.

The following example designates `pre-deployment.sql` as the pre-deployment script and `post-deployment.sql` as the post-deployment script:

```xml
<ItemGroup>
  <PreDeploy Include="pre-deployment.sql" />
  <PostDeploy Include="post-deployment.sql" />
</ItemGroup>
```

> [!IMPORTANT]
> Fabric Data Warehouse supports only a **single file** for the pre-deployment script and a **single file** for the post-deployment script. Composing a script from multiple files - for example, by using the SQLCMD `:r` command to reference other files - isn't supported. If the `.sqlproj` contains multiple pre-deployment or post-deployment entries, the Git update fails.

### Example post-deployment script for SQL security

Because SQL security features aren't captured in the SQL database project, a post-deployment script is a common way to recreate them after a warehouse is deployed. Write the script so it can run on every deployment.

The following sample creates a custom database role named `DataReaders` and grants `SELECT` permissions to the `dbo` schema.

```sql
-- post-deployment.sql
-- Recreate a role and grant permissions after deployment.
IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = N'DataReaders')
BEGIN
    CREATE ROLE DataReaders;
END;
GO

GRANT SELECT ON SCHEMA::dbo TO DataReaders;
GO
```

> [!NOTE]
> Fabric Data Warehouse doesn't support every [Transact-SQL statement available in SQL Server](tsql-surface-area.md). Make sure the statements in your scripts are supported in Fabric Data Warehouse.

## Configure pre-deployment and post-deployment scripts in the Fabric portal

In the Fabric portal, designate an existing shared query as the pre-deployment or post-deployment script. You can do this from Object Explorer or from the warehouse item's **Settings**. 

You can't designate a shared query as both the pre-deployment and post-deployment script at the same time.

### From Object Explorer

1. In the warehouse editor, expand the **Queries** folder in **Object Explorer**.
1. Right-click the shared query you want to use.
1. Select **Set deployment scripts**. This action takes you to the item settings pane.

### From Item settings

1. Open the warehouse's **Item settings**.
1. Go to the **CI-CD** section.
1. Use the **Pre-deployment script** and **Post-deployment script** dropdowns to select a shared query for each. Each dropdown lists all shared queries in the warehouse, plus a **(none)** option to leave the designation unset.

The selections you make are stored as warehouse-level metadata and are kept in sync between **Object Explorer** and item **Settings**.

## How pre-deployment and post-deployment scripts behave with deployment

### With Git integration

When you connect a workspace to a Git repo, the pre-deployment and post-deployment designations are serialized into the warehouse's `.sqlproj` file on commit. When you update the warehouse from Git, Fabric applies the changes to the live warehouse and runs the scripts in order:

1. The pre-deployment script runs before the schema changes are applied.
1. The schema deployment plan is applied.
1. The post-deployment script runs after the schema changes complete.

Designations round-trip through Git: configuring a script in the portal and committing it, or authoring it in the `.sqlproj` and updating the workspace, produces a consistent result. Repeated commits and updates don't duplicate or lose the configuration. Because only one pre-deployment and one post-deployment script are allowed, a configuration authored in Git replaces any existing designation in the warehouse on update.

### With deployment pipelines

Deployment pipelines carry the pre-deployment and post-deployment designations when promoting a warehouse across the **Development**, **Test**, and **Production** stages. The designated scripts execute deterministically in each target environment, so you can use them to apply environment setup or to reapply SQL security as content moves between stages.

### In workspaces without source control

The warehouse item definition includes the pre-deployment and post-deployment designations even when the workspace isn't connected to source control. Exporting the warehouse includes the configuration, and importing it restores the configuration intact.

## Author pre-deployment and post-deployment scripts in a SQL database project

Instead of the Fabric portal, you can author pre-deployment and post-deployment scripts directly in the warehouse's SQL database project by using the SQL Database Projects extension in Visual Studio Code or the integrated SQL projects experience in SQL Server Management Studio. The configuration appears in the Fabric portal - in both **Object Explorer** and item **Settings** - after the next Git update.

### Visual Studio Code

1. Install the SQL Database Projects extension in Visual Studio Code.
1. Open the SQL database project for your warehouse. If your workspace is connected to Git, clone the repo, then open the warehouse project folder.
1. In the **Database Projects** view, right-click the project node and select **Add Pre-Deployment Script** or **Add Post-Deployment Script**.
1. Provide a script name without the file extension. The script file is added to the project and opened in the editor.
1. Add your Transact-SQL to the script and save the file. Make sure the file is saved in the `.sharedqueries` folder for the next Git update.
1. Commit and push the changes to your Git repo, then update the workspace from source control to apply the configuration.

### SQL Server Management Studio

1. Use SQL Server Management Studio 22 or later, which includes the SQL Database Projects experience.
1. Open the SQL database project for your warehouse.
1. In **Solution Explorer**, right-click the project node and select **Add** > **Script**. Select **Pre-Deployment Script** or **Post-Deployment Script**.
1. The script file is added to the project and opened in the query editor.
1. Add your Transact-SQL to the script and save the file. Make sure you save the file in the `.sharedqueries` folder for the next Git update.
1. Commit and push the changes to your Git repo, then update the workspace from source control to apply the configuration.

### Edit the project file directly

In any tool, you can designate a script by editing the `.sqlproj` file and adding a single `PreDeploy` or `PostDeploy` item to an `ItemGroup`:

```xml
<ItemGroup>
  <PreDeploy Include="./sharedqueries/pre-deployment.sql" />
  <PostDeploy Include="./sharedqueries/post-deployment.sql" />
</ItemGroup>
```

### Migrate from existing SQL projects

If you migrate a `.sqlproj` from SQL Server Data Tools (SSDT) or Visual Studio that already contains `<PreDeploy>` and `<PostDeploy>` entries, those entries are recognized and mapped to the Fabric pre-deployment and post-deployment configuration when you import the project through Git. Because Fabric supports only one pre-deployment and one post-deployment script, ensure the project contains at most one entry of each type before importing.

## Considerations and limitations

- A warehouse supports only a single pre-deployment script and a single post-deployment script. It doesn't support multiple files per script.
- You can't designate the same shared query as both the pre-deployment and post-deployment script.
- If you delete a shared query that's designated as a pre-deployment or post-deployment script, the corresponding designation is automatically cleared.
- If you change a shared query that's designated as a pre-deployment or post-deployment script into a user query, the corresponding designation is automatically cleared.
- Pre- and post-deployment scripts run on every warehouse deployment. The Transact-SQL scripts should be idempotent, so that repeated runs don't fail or create duplicate objects.
- Pre-deployment and post-deployment scripts aren't validated against the database model at build time. Errors in the scripts surface at deployment time, and a script failure halts the deployment.
- You can only use [Transact-SQL that's supported in Fabric Data Warehouse](tsql-surface-area.md).
- The identity that runs the deployment must have the permissions required to execute the script content.

## Related content

- [Development and deployment workflows](development-deployment.md)
- [Develop and deploy cross-warehouse dependencies](cross-warehouse-development-database-projects.md)
- [Get started using Fabric deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md)
