---
title: Develop Warehouse Projects in Visual Studio Code
description: Learn how to develop warehouse projects for Fabric Data Warehouse in Visual Studio Code.
ms.reviewer: pvenkat, randolphwest
ms.date: 11/12/2025
ms.topic: how-to
---
# Develop warehouse projects in Visual Studio Code

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Learn how to set up a database project for Fabric Data Warehouse in Visual Studio Code. You'll create a new project, define schema objects, build and validate the project, and publish it to your warehouse.

## Prerequisites

Before you begin, make sure you:

- Have access to an existing [!INCLUDE [fabric-dw](includes/fabric-dw.md)] item within a Fabric workspace with Contributor or higher permissions.
    - To create a new sample warehouse, see [Create a sample Warehouse in Microsoft Fabric](create-warehouse-sample.md).
- Install [Visual Studio Code](https://code.visualstudio.com/download) on your workstation. 
- Install the [.NET](https://dotnet.microsoft.com/download/dotnet) SDK to build and publish database projects.
- Install two Visual Studio Code extensions: [SQL Database Projects](https://marketplace.visualstudio.com/items?itemName=ms-mssql.sql-database-projects-vscode) and [SQL Server (mssql)](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql).
    - You can install the required extensions directly from within Visual Studio Code marketplace by searching for "SQL Database Projects" or "SQL Server (mssql)".

## Create a new database project

You can create a database project from scratch or existing warehouse.

### Option 1: Create a new database project from the Command Palette in Visual Studio Code

1. Open **Visual Studio Code**.  
1. Open the **Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).  
1. Search for **Database Projects: New**.
1. Select **Database Project Type** as **SQL Server Database**.  
1. Choose a project name and select the local folder location.
1. Choose **Synapse Data Warehouse in Microsoft Fabric** as the target platform.  
1. When prompted, select **Yes (recommended)** for an SDK-style project.  

   > [!IMPORTANT]  
   > Only **SDK-style** projects are supported for Fabric Data Warehouse.  

1. Select **Yes** to the question **Do you want to configure SQL project build as the default build configuration for this folder?**
1. Select **Yes** to trust the authors of the files in this folder.

### Option 2: Create a new database project from the Database Projects extension

1. In Visual Studio Code, choose the **Database Projects** extension icon from the [Activity Bar](https://code.visualstudio.com/docs/getstarted/userinterface#_basic-layout).
1. In the **Database Projects** pane, select **Create new**.
   
    :::image type="content" source="media/develop-warehouse-project/create-new.png" alt-text="Screenshot from Visual Studio Code showing the Database Projects extension pane and the Create new button.":::

1. Select **Database Project Type** as **SQL Server Database**.  
1. Choose a project name and select the local folder location.
1. Choose **Synapse Data Warehouse in Microsoft Fabric** as the target platform.  
1. When prompted, select **Yes (recommended)** for an SDK-style project. Only **SDK-style** projects are supported for Fabric Data Warehouse.
1. Select **Yes** to the question **Do you want to configure SQL project build as the default build configuration for this folder?**
1. Select **Yes** to trust the authors of the files in this folder.

### Option 3: Create a database project from an existing warehouse

1. First, create a new connection profile for your warehouse in Visual Studio Code.
    1. Select the **SQL Server** extension in Visual Studio Code from the [Activity Bar](https://code.visualstudio.com/docs/getstarted/userinterface#_basic-layout).
    1. Provide a **Profile Name**. Choose **Parameters**.
    1. Provide the **Server name**. In the Fabric portal, in the **Settings** of your warehouse, retrieve the **SQL Endpoint** string. (This is different from the SQL analytics endpoint.) It looks like `<server unique ID>.datawarehouse.fabric.microsoft.com`. This is the **Server name**.
    1. For **Authentication type**, use **Microsoft Entra ID - Universal with MFA support**. Authenticate with your Microsoft Entra ID.
    1. Provide other information as default, or desired, and select **Connect**.

1. In Visual Studio Code, choose the **Database Projects** extension icon from the Activity Bar.
1. Select the options button `...` from the **Database Projects** pane and choose **Create Project From Database** option.

    :::image type="content" source="media/develop-warehouse-project/create-project-from-database.png" alt-text="Screenshot from Visual Studio Code showing the Create Project from Database option.":::

1. Choose your warehouse from the existing connection profiles.
1. Provide a project name and choose a project folder on your workstation.
1. For folder structure, select **Schema/Object Type** (recommended).
1. For **Include permissions in project**, select **No** (default).
1. For SDK-style project, select **Yes (recommended)**.
1. Select **Yes** to the question **Do you want to configure SQL project build as the default build configuration for this folder?**
1. Visual Studio Code extracts project files from warehouse project.

   :::image type="content" source="media/develop-warehouse-project/extract-project-file.png" alt-text="Screenshot from Visual Studio Code showing the extract project files progress notification.":::
   
1. Upon successful extract, you'll see the following notification: "Extract project files: Succeeded. Completed".
1. Select **Yes** to trust the authors of the files in this folder.

### New database project for your warehouse

The new database project for your warehouse displays in the SQL Database Projects menu. 

:::image type="content" source="media/develop-warehouse-project/new-database-project-warehouse.png" alt-text="Screenshot from Visual Studio Code showing the new database project for AdventureWorksDW2022.":::

Your project structure looks like this:

```outline
 | Project Name
 ├── Database References
 ├── SQLCMD Variables
 ├── .vscode/
 └── schema/
     ├── Functions
     ├── Tables
     └── Views
```

## Configure the database project

1. Right-click on the project and select **Edit .sqlproj File**.

   :::image type="content" source="media/develop-warehouse-project/edit-sqlproj-file.png" alt-text="Screenshot from Visual Studio Code and the context menu of a database project. The Edit sqlproj File option is highlighted." lightbox="media/develop-warehouse-project/edit-sqlproj-file.png":::

1. Verify the latest version of [Microsoft.Build.Sql](https://www.nuget.org/packages/Microsoft.Build.Sql) SDK is in the file. For example, in the `.sqlproj` file, change the version for `Microsoft.Build.Sql` to `2.0.0`.

   ```xml
      <Sdk Name="Microsoft.Build.Sql" Version="2.0.0" />
   ```

1. Verify the latest version of [Microsoft.SqlServer.Dacpacs.FabricDw](https://www.nuget.org/packages/Microsoft.SqlServer.Dacpacs.FabricDw), and add a reference inside the `Project/ItemGroup` XML node. For example:

   ```xml
      <PackageReference Include="Microsoft.SqlServer.Dacpacs.FabricDw" Version="170.0.2" />
   ```

   This is how your database project for a warehouse should look like after the updates.

   ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <Project DefaultTargets="Build">
      <Sdk Name="Microsoft.Build.Sql" Version="2.0.0" />
      <PropertyGroup>
        <Name>DatabaseProject715wh</Name>
        <ProjectGuid>{2E278BCC-F118-4DDB-9255-94697F2930B4}</ProjectGuid>
        <DSP>Microsoft.Data.Tools.Schema.Sql.SqlDwUnifiedDatabaseSchemaProvider</DSP>
        <ModelCollation>1033, CI</ModelCollation>
      </PropertyGroup>
      <ItemGroup>
        <None Include=".vscode\tasks.json" />
        <PackageReference Include="Microsoft.SqlServer.Dacpacs.FabricDw" Version="170.0.2" />
      </ItemGroup>
      <Target Name="BeforeBuild">
        <Delete Files="$(BaseIntermediateOutputPath)\project.assets.json" />
      </Target>
    </Project>
   ```

1. Save your `.sqlproj` file. On the prompt to reload your database project, select **Yes**.

> [!IMPORTANT] 
> The Fabric Data Warehouse team frequently releases new versions of NuGet packages. Since the default version values in the `.sqlproj` file can change over time, be sure to update them in your local project to stay aligned with the latest versions available from the NuGet for [Microsoft.SqlServer.Dacpacs.FabricDw](https://www.nuget.org/packages/Microsoft.SqlServer.Dacpacs.FabricDw).

## Add or update database objects

You can define or modify database objects such as tables, views, stored procedures, and functions within your warehouse project.

Under the folder for a schema, for example `dbo`, add or delete or make changes to the T-SQL definitions of objects in your warehouse. To modify an existing object, open its corresponding `.sql` file and update the definition as needed.  

When you build the project, all new and updated objects are validated and included in the generated dacpac file in `{project folder location}/bin/debug/{project name}.dacpac` file.

Changes made here are only to the database project, and aren't reflected in Microsoft Fabric until you **Build** and **Publish** your project.

## Build and validate the project

1. Open the database project if not already opened.
1. Right-click on the project and select **Build** to build the database project.

   :::image type="content" source="media/develop-warehouse-project/build.png" alt-text="Screenshot from Visual Studio Code showing the option to Build the database project.":::

1. The build should be successful. Fix any errors based on messages provided in the output of build event.

> [!NOTE]
> Currently, your Visual Studio Code default terminal must be **PowerShell** for the Build process in the Database Projects extension to succeed. In the **Command Palette**, choose **Terminal: Select Default Profile**, then select **PowerShell**.

## Publish to Fabric Data Warehouse

After building your project, publish it to your target warehouse. Publishing creates a script to resolve the difference between the database project and the actual warehouse, and executes a script to make the warehouse match the project. The compiled model of the warehouse schema in a .dacpac file can be deployed to a target warehouse.

1. Right-click on the project and select **Publish**.
1. Choose **Publish to an existing SQL server**.
1. For **Select publish profile to load**, the first time you publish, choose **Don't use profile**.
   - You can save options for publishing your warehouse into a *publish profile*. When you're completed, you're given the option in a Visual Studio Code notification to save the publishing options you just used to a publish profile file. 
   - You can re-use the publish profile in the future when you publish your project to your warehouse. You might have different profile options for different warehouses, or for different environments in your dev/test/acceptance/production development environments.
1. Choose the Fabric Data Warehouse connection profile from the list.
1. Choose the name of the target warehouse.
1. In the **Choose action** option, you can either **Generate Script** to review the script before publishing, or publish project to a warehouse. 
   - The first time you want to deploy changes, you should carefully **Generate Script** and review the resulting T-SQL to be applied to the target warehouse. No changes are made to the target warehouse.
   - If you choose **Publish**, changes will be written to your target warehouse. 
      
   :::image type="content" source="media/develop-warehouse-project/deploy-in-progress.png" alt-text="Screenshot from Visual Studio Code showing the Deploy dacpac: In progress notification.":::
   
1. On the notification **Would you like to save the settings in a profile (.publish.xml)?**, choose **Yes** and save your publish profile choices for the next time you need to publish.

### Important deployment settings for warehouse projects

When deploying database projects to Fabric Data Warehouse, several settings control schema changes and can impact data safety. **Use with caution**.

 -  `BlockOnPossibleDataLoss`
    
    - **What it does:** Prevents deployment if there's a risk of data loss (for example, dropping a column or table that contains data).
    - **Recommendation:** Always set to `True` in production to protect critical data.
    - **Caution:** Setting it to `False` allows deployment even if data can be lost. Use only in controlled environments (for example, dev/test).
    
 - `DropObjectsNotInSource`
    
    - **What it does:** Drops objects in the target database that are **not present** in the project source.
    - **Recommendation:** Use in dev/test environments to clean up leftover objects.
    - **Caution:** Using `DropObjectsNotInSource` in production can **delete important objects and data**. Double-check before enabling.
    
 -  `Pre-Deployment Scripts`
    
    - **What it does:** Executes custom SQL scripts **before** the schema deployment.  
    - **Common uses:**  
      - Archive or backup data before dropping tables
      - Disable constraints or triggers temporarily
      - Cleanup legacy objects  
    - **Caution:** Ensure scripts are **idempotent** and don't introduce schema changes that conflict with deployment.

> [!TIP]
> When a deployment process is **idempotent**, it can be run multiple times without causing issues, and you can deploy to multiple databases without needing to predetermine their status.

 -  `Post-Deployment Scripts`
    
    - **What it does:** Executes custom SQL scripts **after** the schema deployment.  
    - **Common uses:**  
      - Seed lookup or reference data
      - Re-enable constraints or triggers
      - Log deployment history  
    - **Caution:** Avoid heavy operations on large tables in production; ensure scripts can safely run multiple times if needed.

> [!IMPORTANT] 
> Always review deployment scripts and settings before publishing. Test in dev/test environments first to prevent unintended data loss.
    
## Verify publish

Connect to your warehouse and script objects that were changed or verify by running system catalog objects.

## Related Articles

- [Development and deployment workflows](development-deployment.md)
- [Develop and deploy cross-warehouse dependencies](cross-warehouse-development-database-projects.md)
- [Get started using Fabric deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md)