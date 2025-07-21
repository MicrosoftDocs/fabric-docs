---
title: "Source Control with Warehouse (Preview)"
description: "Learn how to use source control with Microsoft Fabric Warehouse."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: salilkanade, pvenkat
ms.date: 07/16/2025
ms.topic: conceptual
---

# Source control with Warehouse (preview)

This article explains how Git integration and deployment pipelines work for warehouses in Microsoft Fabric. Learn how to set up a connection to your repository, manage your warehouses, and deploy them across different environments. Source control for Fabric Warehouse is currently a preview feature.

You can use both [Git integration](#git-integration) and [Deployment pipelines](#deployment-pipelines) for different scenarios:

- Use Git and SQL database projects to manage incremental change, team collaboration, commit history in individual database objects.
- Use deployment pipelines to promote code changes to different pre-production and production environments.

## Git integration

Git integration in Microsoft Fabric enables developers to integrate their development processes, tools, and best practices directly into the Fabric platform. It allows developers who are developing in Fabric to:

- Backup and version their work
- Revert to previous stages as needed
- Collaborate with others or work alone using Git branches
- Apply the capabilities of familiar source control tools to manage Fabric items

For more information on the Git integration process, see:

- [What is Microsoft Fabric Git integration?](../cicd/git-integration/intro-to-git-integration.md)
- [Basic concepts in Git integration](../cicd/git-integration/git-integration-process.md)
- [Get started with Git integration](../cicd/git-integration/git-get-started.md)

### Set up a connection to source control

From the **Workspace settings** page, you can easily set up a connection to your repo to commit and sync changes.

1. To set up the connection, see [Get started with Git integration](../cicd/git-integration/git-get-started.md#connect-to-a-git-repo). Follow instructions to **Connect to a Git repo** to either Azure DevOps or GitHub as a Git provider.
1. Once connected, your items, including warehouses, appear in the **Source control** panel.
    :::image type="content" source="media/source-control/source-control.png" alt-text="Screenshot from the Fabric portal of the warehouse in the source control settings.":::
1. After you successfully connect the warehouse instances to the Git repo, you see the warehouse folder structure in the repo. You can now execute future operations, like creating a pull request.

## Database projects for a warehouse in Git

The following image is an example of the file structure of each warehouse item in the repo:

:::image type="content" source="media/source-control/warehouse-schema.png" alt-text="Screenshot from the Fabric portal of a sample warehouse schema." lightbox="media/source-control/warehouse-schema.png":::

When you commit the warehouse item to the Git repo, the warehouse is converted to a source code format, as a SQL database project. A SQL project is a local representation of SQL objects that comprise the schema for a single database, such as tables, stored procedures, or functions. The folder structure of the database objects is organized by **Schema/Object Type**. Each object in the warehouse is represented with a .sql file that contains its data definition language (DDL) definition. Warehouse table data and [SQL security features](security.md) are not included in the SQL database project.

Shared queries are also committed to the repo and inherit the name that they are saved as.

### Download the SQL database project of a warehouse in Fabric

With the [SQL Database Projects extension](/sql/azure-data-studio/extensions/sql-database-project-extension) available inside of [Azure Data Studio](/sql/azure-data-studio/download-azure-data-studio) and [Visual Studio Code](https://visualstudio.microsoft.com/downloads/), you can manage a warehouse schema, and handle Warehouse object changes like other SQL database projects.

To download a local copy of your warehouse's schema, select **Download SQL database project** in the ribbon.

:::image type="content" source="media/source-control/download-sql-database-project.png" alt-text="Screenshot from the Fabric portal of the query ribbon. The Download SQL database project box is highlighted." lightbox="media/source-control/download-sql-database-project.png":::

The local copy of a database project that contains the definition of the warehouse schema. The database project can be used to:

- Recreate the warehouse schema in another warehouse.
- Further develop the warehouse schema in client tools, like [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true).

### Publish SQL database project to a new warehouse

To publish the warehouse schema to a new warehouse:

1. Create a new warehouse in your Fabric workspace.
1. On the new warehouse launch page, under **Build a warehouse**, select **SQL database project**.
    :::image type="content" source="media/source-control/new-warehouse-sql-database-project.png" alt-text="Screenshot from the Fabric portal of the SQL database project button." lightbox="media/source-control/new-warehouse-sql-database-project.png":::
1. Select the .zip file that was downloaded from the existing warehouse.
1. The warehouse schema is published to the new warehouse.

## Deployment pipelines

You can also use deployment pipelines to deploy your warehouse code across different environments, such as development, test, and production. Deployment pipelines don't expose a database project.

Use the following steps to complete your warehouse deployment using the deployment pipeline.

1. Create a new deployment pipeline or open an existing deployment pipeline. For more information, see [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).
1. Assign workspaces to different stages according to your deployment goals.
1. Select, view, and compare items including warehouses between different stages, as shown in the following example.
    :::image type="content" source="media/source-control/pipeline-stages.png" alt-text="Screenshot from the Fabric portal of the Development, Test, and Production stages." lightbox="media/source-control/pipeline-stages.png":::
1. Select **Deploy** to deploy your warehouses across the **Development**, **Test**, and **Production** stages.

For more information about the Fabric deployment pipelines process, see [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md).

## Limitations in source control

- [SQL security](security.md) features must be exported/migrated using a script-based approach. Consider using a post-deployment script in a SQL database project, which you can configure by opening the project with the [SQL Database Projects extension](/azure-data-studio/extensions/sql-database-project-extension-getting-started) available in [Visual Studio Code](https://code.visualstudio.com/).

#### Limitations in Git integration

- Currently, if you use `ALTER TABLE` to add a constraint or column in the database project, the table will be dropped and recreated when deploying, resulting in data loss. Consider the following workaround to preserve the table definition and data:
    - Create a new copy of the table in the warehouse, using `CREATE TABLE` and `INSERT`, `CREATE TABLE AS SELECT`, or [Clone table](clone-table.md).
    - Modify the new table definition with new constraints or columns, as desired, using `ALTER TABLE`.
    - Delete the old table.
    - Rename the new table to the name of the old table using [sp_rename](/sql/relational-databases/system-stored-procedures/sp-rename-transact-sql?view=fabric&preserve-view=true).
    - Modify the definition of the old table in the SQL database project in the *exact* same way. The SQL database project of the warehouse in source control and the live warehouse should now match.
- Currently, do not create a Dataflow Gen2 with an output destination to the warehouse. Committing and updating from Git would be blocked by a new item named `DataflowsStagingWarehouse` that appears in the repository.
- Fabric Git integration does not support the SQL analytics endpoint item.
- Cross item dependencies, item sequencing, and synchronization gaps between the SQL analytics endpoint and warehouse impact the "branching out to a new/existing workspace" and "switching to a different branch" workflows during development and continuous integration.

#### Limitations for deployment pipelines

- Currently, if you use `ALTER TABLE` to add a constraint or column in the database project, the table will be dropped and recreated when deploying, resulting in data loss.
- Currently, do not create a Dataflow Gen2 with an output destination to the warehouse. Deployment would be blocked by a new item named `DataflowsStagingWarehouse` that appears in the deployment pipeline.
- Fabric Deployment pipelines do not support the SQL analytics endpoint item.
- Cross item dependencies, item sequencing, and synchronization gaps between the SQL analytics endpoint and warehouse impact Fabric Deployment Pipelines workflows.

## Related content

- [Get started with Git integration](../cicd/git-integration/git-get-started.md)
- [Basic concepts in Git integration](../cicd/git-integration/git-integration-process.md)
- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Set up dbt for Fabric Data Warehouse](tutorial-setup-dbt.md)
