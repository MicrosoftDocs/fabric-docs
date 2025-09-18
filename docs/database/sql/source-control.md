---
title: "Fabric SQL database source control integration"
description: Learn how to work with your SQL database with Fabric's git integration source control.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: antho, sukkaur, drskwier
ms.date: 02/13/2025
ms.topic: how-to
ms.custom:
ms.search.form:
---
# SQL database source control integration in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

In this tutorial, you learn how to work with your [SQL database in Fabric](overview.md) with [Fabric git integration source control](../../cicd/git-integration/intro-to-git-integration.md).

A SQL database in Microsoft Fabric has source control integration, or "git integration", allowing SQL users to track the definitions of their database objects over time. This integration enables a team to:

- Commit the database to source control, which automatically converts the live database into code in the configured source control repository (such as Azure DevOps).
- Update database objects from the contents of source control, which validates the code in the source control repository before applying a differential change to the database.

:::image type="content" source="media/source-control/git.png" alt-text="Diagram of the simple commit and update cycle between the live database and source control.":::

If you're unfamiliar with git, here are a few recommended resources:

- [What is git?](/devops/develop/git/what-is-git)
- [Training module: Intro to git](/training/paths/intro-to-vc-git/)
- [Tutorial: Lifecycle management in Fabric](../../cicd/cicd-tutorial.md)

This article presents a series of useful scenarios that can be used individually or in combination to manage your development process with SQL database in Fabric:

- [Convert the Fabric SQL database into code in source control](#add-the-fabric-sql-database-to-source-control)
- [Update the Fabric SQL database from source control](#update-the-fabric-sql-database-from-source-control)
- [Create a branch workspace](#create-a-branch-workspace)
- [Merge changes from one branch into another](#merge-changes-from-one-branch-into-another)

The scenarios in this article are covered in an episode of Data Exposed. Watch the video for an overview of the source control integration in Fabric:

> [!VIDEO https://learn-video.azurefd.net/vod/player?show=data-exposed&ep=introduction-to-the-source-control-built-in-with-sql-database-in-fabric-data-exposed]

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Make sure that you [Enable Git integration tenant settings](../../admin/git-integration-admin-settings.md).
- Create a new workspace or use an existing Fabric workspace.
- Create or use an existing SQL database in Fabric. If you don't have one already, [create a new SQL database in Fabric](create.md).
- Optional: Install [Visual Studio Code](https://visualstudio.microsoft.com/downloads/), the mssql extension, and the [SQL projects](https://aka.ms/sqlprojects) extension for VS Code.

## Setup

This repository connection applies at the workspace level, such that a single branch in the repository is associated with that workspace. The repository can have multiple branches, but only the code in the branch selected in workspace settings will directly impact the workspace.

For steps to connect your workspace to a source control repository, see [Get started with Git integration](../../cicd/git-integration/git-get-started.md#connect-a-workspace-to-a-git-repo). Your workspace can be connected to an Azure DevOps or GitHub remote repository.

## Add the Fabric SQL database to source control

In this scenario, you'll commit database objects to source control. You might be developing an application where you're creating objects directly in a test database and track that database in source control just like your application code. As a result, you have access to the history of the definitions of your database objects and can use Git concepts like branching and merging to further customize your development process.

1. [Connect to your SQL database](connect.md) in the Fabric SQL editor, [SQL Server Management Studio](https://aka.ms/ssms), [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true), or other external tools.
1. Create a new table, stored procedure, or other object in the database.
1. Select the `...` menu for the database, select **Refresh Git sync status**.
1. Select the **Source control** button to open the source control panel.
1. Select the checkbox next to the desired database. Select **Commit**. The Fabric service reads object definitions from the database and writes them to the remote repository.
1. You can now view the *history* of database objects in code repository source view.

As you continue to edit the database, including editing existing objects, you can commit those changes to source control by following the preceding steps.

## Update the Fabric SQL database from source control

In this scenario, you'll be creating database objects as code in the SQL projects extension in VS Code, then committing the files to source control before updating the Fabric SQL database from the source control integration. This scenario is targeted towards developers who prefer to work in VS Code, have existing applications using SQL projects, or have more advanced CI/CD pipeline requirements.

1. Make sure you have installed the latest release of VS Code and the mssql and SQL projects extensions for VS Code.
    - You'll use the [integrated git source control of VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview).
1. [Create a new SQL database](create.md) in your workspace and commit it to source control without adding any objects. This step adds the empty SQL project and SQL database item metadata to the repository.
1. Clone the source control repository to your local machine.
    - If you're using Azure DevOps, select the `...` context menu for the source control project. Select **Clone** to copy your Azure DevOps repository to your local machine. If you're new to Azure DevOps, see the [Code with git](/azure/devops/user-guide/code-with-git) guide for Azure DevOps.
    - If you're using GitHub, select the **Code** button in the repository and copy the URL to clone the repository to your local machine. If you're new to GitHub, see the [cloning a repository](https://docs.github.com/repositories/creating-and-managing-repositories/cloning-a-repository) guide.
1. Open the cloned folder in Visual Studio Code. The branch associated with your workspace might not be the default. You should see a folder named `<yourdatabase>.SQLDatabase` in VS Code after switching the branch.
1. Create a `.sql` file for at least one table you would like to create in the database within the folder structure for your database. The file should contain the `CREATE TABLE` statement for the table. For example, create a file named `MyTable.sql` in the folder `dbo/Tables` with the following content:
    ```sql
    CREATE TABLE dbo.MyTable
    (
        Id INT PRIMARY KEY,
        ExampleColumn NVARCHAR(50)
    );
    ```
1. To ensure the syntax is valid, we can validate the database model with the SQL project. After adding the files, use the Database Projects view in VS Code to **Build** the project.
1. After a successful build, **Commit** the files to source control with the source control view in VS Code or your preferred local git interface.
1. Push/sync your commit to the remote repository. Check that your new files have appeared in Azure DevOps or GitHub.
1. Return to the Fabric web interface and open the **Source control** panel in the workspace. You might already have an alert that "you have pending changes from git". Select the **Update (Update All)** button to apply the code from your SQL project to the database.
    - You might see the database immediately indicate it is "Uncommitted" after the update. This is because the Git Integration feature does a direct comparison of all the file content generated for an item definition, and some unintentional differences are possible. One example is inline attributes on columns. In these cases, you'll need to commit back to source control in the Fabric web interface to sync the definition with what is generated as part of a commit operation.
1. Once the update has completed, use a tool of your choice to connect to the database. The objects you added to the SQL project visible in the database.

> [!NOTE]
> When making changes to the local SQL project, if there is a syntax error or use of unsupported features in Fabric, the database update will fail. You must manually revert the change in source control before you can continue.

Updating a SQL database in Fabric from source control combines a SQL project build and SqlPackage publish operation. The SQL project build validates the syntax of the SQL files and generates a `.dacpac` file. The SqlPackage publish operation determined the changes necessary to update the database to match the `.dacpac` file. Because of the streamlined nature of the Fabric interface, the following options are applied to the SqlPackage publish operation:

- `/p:ScriptDatabaseOptions = false`
- `/p:DoNotAlterReplicatedObjects = false`
- `/p:IncludeTransactionalScripts = true`
- `/p:GenerateSmartDefaults = true`

The source controlled SQL project can also be cloned to your local machine for editing in VS Code, Visual Studio, or other SQL project tools. The SQL project should be built locally to validate changes before committing them to source control.

## Create a branch workspace

In this scenario, you'll set up a new development environment in Fabric by having Fabric create a duplicate set of resources based on the source control definition. The duplicate database will include the database objects that we have checked into source control. This scenario is targeted towards developers that are continuing their application development lifecycle in Fabric and are utilizing the source control integration from Fabric.

1. Complete the scenario [convert the Fabric SQL database into code in source control](#add-the-fabric-sql-database-to-source-control).
    - You should have a branch in a source control repository with both a SQL project and the Fabric object metadata.
1. In the Fabric workspace, open the **source control** panel. From the Branches tab of the **Source control** menu, select **Branch out to new workspace**.
1. Specify the names of the branch and workspace that will be created. The branch will be created in the source control repository and is populated with the committed contents of the branch associated with the workspace you are branching from. The workspace will be created in Fabric.
1. Navigate to the newly created workspace in Fabric. When the database creation completes, the newly created database now contains the objects specified in your code repo. If you open the Fabric query editor and navigate in **Object explorer**, your database has new (empty) tables and other objects.

## Merge changes from one branch into another

In this scenario, you'll use the source control repository to review database changes before they're available for deployment. This scenario is targeted towards developers that are working in a team environment and are using source control to manage their database changes.

Create two workspaces with associated branches in the same repository, as described [in the previous scenario](#create-a-branch-workspace).

1. With the database on the secondary branch, make changes to the database objects.
    - For example, modify an existing stored procedure or create a new table.
1. Check in these changes to source control with the **Commit** button on the source control panel in Fabric.
1. In Azure DevOps or GitHub, create a pull request from the secondary branch to the primary branch.
    - In the pull request, you can see the changes in the database code between the primary workspace and the secondary workspace.
1. Once you complete the pull request, the source control is updated, but the database in Fabric on the primary workspace isn't changed. To change the primary database, update the primary workspace from source control using the **Update** button on the source control panel in Fabric.

## Related content

- [SQL database in Microsoft Fabric](overview.md)
- [Tutorial: Lifecycle management in Fabric](../../cicd/cicd-tutorial.md)
- [SQL projects overview](/sql/tools/sql-database-projects/sql-database-projects)
- [SQL projects tools](/sql/tools/sql-database-projects/sql-projects-tools)
