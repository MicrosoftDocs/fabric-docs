---
title: "Source Control with Fabric Data Warehouse (Preview)"
description: "Learn how to use source control with Microsoft Fabric Warehouse."
ms.reviewer: salilkanade, pvenkat
ms.date: 04/10/2026
ms.topic: concept-article
---

# Source control (preview)

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article explains how Git integration and deployment pipelines work for warehouses in Microsoft Fabric. Learn how to set up a connection to your repository, manage your warehouses, and deploy them across different environments. Source control for Fabric Warehouse is currently a preview feature.

You can use both [Git integration](#git-integration) and [Deployment pipelines](#deployment-pipelines) for different scenarios:

- Use Git and SQL database projects to manage incremental change, team collaboration, and commit history in individual database objects.
- Use deployment pipelines to promote code changes to different pre-production and production environments.

## Git integration

Git integration in Microsoft Fabric enables developers to integrate their development processes, tools, and best practices directly into the Fabric platform. It allows developers who are developing in Fabric to:

- Backup and version their work
- Revert to previous stages as needed
- Collaborate with others or work alone by using Git branches
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

When you commit the warehouse item to the Git repo, the warehouse is converted to a source code format, as a SQL database project. A SQL project is a local representation of SQL objects that comprise the schema for a single database, such as tables, stored procedures, or functions. The folder structure of the database objects is organized by **Schema/Object Type**. Each object in the warehouse is represented with a .sql file that contains its data definition language (DDL) definition. Warehouse table data and [SQL security features](security.md) aren't included in the SQL database project.

Shared queries are also committed to the repo and inherit the name that they are saved as.

## Deployment pipelines

You can also use deployment pipelines to deploy your warehouse code across different environments, such as development, test, and production. Deployment pipelines don't expose a database project.

Use the following steps to complete your warehouse deployment by using the deployment pipeline.

1. Create a new deployment pipeline or open an existing deployment pipeline. For more information, see [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).
1. Assign workspaces to different stages according to your deployment goals.
1. Select, view, and compare items, including warehouses, between different stages, as shown in the following example.
    :::image type="content" source="media/source-control/pipeline-stages.png" alt-text="Screenshot from the Fabric portal of the Development, Test, and Production stages." lightbox="media/source-control/pipeline-stages.png":::
1. Select **Deploy** to deploy your warehouses across the **Development**, **Test**, and **Production** stages.

For more information about the Fabric deployment pipelines process, see [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md).

## Limitations in source control

- You must export or migrate [SQL security](security.md) features by using a script-based approach. Consider using a post-deployment script in a SQL database project. You can configure this script by opening the project with the [SQL Database Projects extension](/sql/tools/visual-studio-code-extensions/sql-database-projects/sql-database-projects-extension) available in [Visual Studio Code](https://code.visualstudio.com/).

#### Limitations in Git integration

- Currently, if you use `ALTER TABLE` to add a constraint or column in the database project, the deployment process drops and recreates the table, which results in data loss. To preserve the table definition and data, consider the following workaround:
    - Create a new copy of the table in the warehouse by using `CREATE TABLE` and `INSERT`, `CREATE TABLE AS SELECT`, or [Clone table](clone-table.md).
    - Modify the new table definition with new constraints or columns, as desired, by using `ALTER TABLE`.
    - Delete the old table.
    - Rename the new table to the name of the old table by using [sp_rename](/sql/relational-databases/system-stored-procedures/sp-rename-transact-sql?view=fabric&preserve-view=true).
    - Modify the definition of the old table in the SQL database project in the *exact* same way. The SQL database project of the warehouse in source control and the live warehouse should now match.
- Currently, don't create a Dataflow Gen2 with an output destination to the warehouse. A new item named `DataflowsStagingWarehouse` appears in the repository and blocks committing and updating from Git.
- Fabric Git integration doesn't support the SQL analytics endpoint item.
- Cross item dependencies, item sequencing, and synchronization gaps between the SQL analytics endpoint and warehouse impact the "branching out to a new or existing workspace" and "switching to a different branch" workflows during development and continuous integration.

#### Limitations for deployment pipelines

- Currently, if you use `ALTER TABLE` to add a constraint or column in the database project, the deployment process drops and recreates the table, which results in data loss.
- Currently, don't create a Dataflow Gen2 with an output destination to the warehouse. A new item named `DataflowsStagingWarehouse` appears in the deployment pipeline and blocks deployment.
- Fabric Deployment pipelines don't support the SQL analytics endpoint item.
- Cross item dependencies, item sequencing, and synchronization gaps between the SQL analytics endpoint and warehouse impact Fabric Deployment Pipelines workflows.

#### Unsupported scenarios

The following CI/CD workflows aren't officially supported when warehouses in different workspaces have different collations. Even though these operations might succeed without errors, they can result in metadata errors.

In all of these scenarios, if a collation mismatch occurs, use the Python script [scripts/dw-collation-error-update-tmsl/pbi_interactive.py in the Fabric toolbox](https://github.com/microsoft/fabric-toolbox/tree/main/scripts/dw-collation-error-update-tmsl/pbi_interactive.py) GitHub repository to update the dataset (TMSL) collation to match the warehouse collation.

 | Scenario | Description | Risk |
 |---|---|---|
 | **Deployment pipelines** | Promoting warehouse content through pipeline stages (for example, Dev → Test → Prod) where the target warehouse was created with a different collation than the source isn't supported. | Deployment might succeed, but the dataset collation isn't updated to match the target warehouse collation. |
 | **Branching out to a new or existing workspace** | Using Git integration to branch out from an existing workspace to a new or existing workspace where the warehouse has a different collation isn't supported. | Warehouse content is synced, but the collation metadata isn't reconciled. |
 | **Switching branches on a workspace** | Switching to a branch that was associated with a warehouse of a different collation on a Git-connected workspace isn't supported. | Synced content might carry over collation assumptions that don't match the current warehouse. |
 | **Merging changes between workspaces through branches** | Merging Git branches across workspaces where the warehouses have different collations isn't supported. | Merge might succeed at the Git level, but the resulting dataset collation doesn't reflect the target warehouse's collation. |

## Related content

- [Development and Deployment](development-deployment.md)
- [Get started with Git integration](../cicd/git-integration/git-get-started.md)
