---
title: Set up dbt for Fabric Data Warehouse
description: In this tutorial, learn how to use the dbt adapter for Fabric Data Warehouse. dbt (Data Build Tool) is an open-source framework for SQL-first transformation.
author: MarkPryceMaherMSFT
ms.author: maprycem
ms.reviewer: wiassaf
ms.date: 11/15/2023
ms.topic: tutorial
ms.custom:
  - ignite-2023
---

# Tutorial: Set up dbt for Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This tutorial guides you through setting up dbt and deploying your first project to a Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

## Introduction

The [dbt](https://www.getdbt.com/product/what-is-dbt/) (Data Build Tool) open-source framework simplifies data transformation and analytics engineering. It focuses on SQL-based transformations within the analytics layer, treating SQL as code. dbt supports version control, modularization, testing, and documentation.

The dbt adapter for Microsoft Fabric can be used to create dbt projects, which can then be deployed to a Fabric Synapse Data Warehouse.

You can also change the target platform for the dbt project by simply changing the adapter, for example; a project built for [Azure Synapse dedicated SQL pool](https://docs.getdbt.com/docs/core/connect-data-platform/azuresynapse-setup) can be upgraded in a few seconds to a [Fabric Synapse Data Warehouse](https://docs.getdbt.com/docs/core/connect-data-platform/fabric-setup).

## Prerequisites for the dbt adapter for Microsoft Fabric

Follow this list to install and set up the dbt prerequisites:

1. [Python version 3.7 (or higher)](https://www.python.org/downloads/).

1. The [Microsoft ODBC Driver for SQL Server](/sql/connect/odbc/download-odbc-driver-for-sql-server#download-for-windows).

1. Latest version of the dbt-fabric adapter from the [PyPI (Python Package Index) repository](https://pypi.org/project/dbt-fabric) using `pip install dbt-fabric`.

    ```powershell
    pip install dbt-fabric
    ```

    > [!NOTE] 
    > By changing `pip install dbt-fabric` to `pip install dbt-synapse` and using the following instructions, you can [install the dbt adapter for Synapse dedicated SQL pool](https://docs.getdbt.com/docs/core/connect-data-platform/azuresynapse-setup).

1. Make sure to verify that dbt-fabric and its dependencies are installed by using `pip list` command:

    ```powershell
    pip list
    ```

    A long list of the packages and current versions should be returned from this command.

1. If you don't already have one, create a [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. You can use the trial capacity for this exercise: [sign up for the Microsoft Fabric free trial](https://aka.ms/try-fabric), [create a workspace](../get-started/create-workspaces.md), and then [create a warehouse](create-warehouse.md).

## Get started with dbt-fabric adapter

This tutorial uses [Visual Studio Code](https://code.visualstudio.com/download), but you can use your preferred tool of your choice.

1. Clone the demo dbt project from <https://github.com/dbt-labs/jaffle_shop> onto your machine.

    - You can [clone a repo with Visual Studio Code's built-in source control](/azure/developer/javascript/how-to/with-visual-studio-code/clone-github-repository). 
    - Or, for example, you can use the `git clone` command:

    ```powershell
    git clone https://github.com/dbt-labs/jaffle_shop.git
    ```

1. Open the `jaffle_shop` project folder in Visual Studio Code.

    :::image type="content" source="media/tutorial-setup-dbt\jaffle-project-vscode.png" alt-text="A screenshot from the Visual Studio Code, showing the open project.":::

1. You can skip the sign-up if you have created a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] already.
1. Create a `profiles.yml` file. Add the following configuration to `profiles.yml`. This file configures the connection to your warehouse in Microsoft Fabric using the dbt-fabric adapter.

    ```yml
    config:
      partial_parse: true
    jaffle_shop:
      target: fabric-dev
      outputs:    
        fabric-dev:
          authentication: CLI
          database: <put the database name here>
          driver: ODBC Driver 18 for SQL Server
          host: <enter your SQL analytics endpoint here>
          schema: dbo
          threads: 4
          type: fabric
    ```

    > [!NOTE] 
    > Change the `type` from `fabric` to `synapse` to switch the database adapter to Azure Synapse Analytics, if desired. Any existing [dbt project's data platform](https://docs.getdbt.com/docs/supported-data-platforms) can be updated by changing the database adapter. For more information, see [the dbt list of supported data platforms](https://docs.getdbt.com/docs/supported-data-platforms).

1. Authenticate yourself to Azure in the Visual Studio Code terminal. 

    - Run `az login` in Visual Studio Code terminal if you're using Azure CLI authentication.
    - For Service Principal or other Microsoft Entra ID (formerly Azure Active Directory) authentication in Microsoft Fabric, refer to [dbt (Data Build Tool) setup](https://docs.getdbt.com/docs/core/connect-data-platform/fabric-setup) and [dbt Resource Configurations](https://docs.getdbt.com/reference/resource-configs/fabric-configs).

1. Now you're ready to test the connectivity. Run `dbt debug` in the Visual Studio Code terminal to test the connectivity to your warehouse.
  
    ```powershell
    dbt debug
    ```

    :::image type="content" source="media/tutorial-setup-dbt\dbt-debug.png" alt-text="A screenshot from the Visual Studio Code, showing the dbt debug command." lightbox="media/tutorial-setup-dbt\dbt-debug.png":::

    All checks are passed, which means you can connect your warehouse using dbt-fabric adapter from the jaffle_shop dbt project. 

1. Now, it's time to test if the adapter is working or not. First run `dbt seed` to insert sample data into the warehouse.

    :::image type="content" source="media/tutorial-setup-dbt\dbt-seed.png" alt-text="A screenshot from the Visual Studio Code, showing a dbt seed command." lightbox="media/tutorial-setup-dbt\dbt-seed.png":::
  
1. Run `dbt run` to validate data against some tests.

    ```powershell
    dbt run
    ```

    :::image type="content" source="media/tutorial-setup-dbt\dbt-run.png" alt-text="A screenshot from the Visual Studio Code, showing a dbt run command." lightbox="media/tutorial-setup-dbt\dbt-run.png":::

1. Run `dbt test` to run the models defined in the demo dbt project.
   
    ```powershell
    dbt test
    ```
     
    :::image type="content" source="media/tutorial-setup-dbt\dbt-test.png" alt-text="A screenshot from the Visual Studio Code, showing a dbt test command." lightbox="media/tutorial-setup-dbt\dbt-test.png":::

That's it! You have now deployed a dbt project to Synapse Data Warehouse in Fabric.

## Move between different warehouses

It's simple move the dbt project between different warehouses. A dbt project on any supported warehouse can be quickly migrated with this three step process:

1. Install the new adapter. For more information and full installation instructions, see [dbt adapters](https://docs.getdbt.com/docs/core/connect-data-platform/about-core-connections).

1. Update the `type` property in the `profiles.yml` file.

1. Build the project.

## Considerations

Important things to consider when using dbt-fabric adapter:

- Review [the current limitations in Microsoft Fabric data warehousing](limitations.md).

- Fabric supports Microsoft Entra ID (formerly Azure Active Directory) authentication for user principals, user identities and service principals. The recommended authentication mode to interactively work on warehouse is CLI (command-line interfaces) and use service principals for automation.

- Review the [T-SQL (Transact-SQL) commands](tsql-surface-area.md#limitations) not supported in Synapse Data Warehouse in Microsoft Fabric.

- Some T-SQL commands, such as `ALTER TABLE ADD/ALTER/DROP COLUMN`, `MERGE`, `TRUNCATE`, `sp_rename`, are supported by dbt-fabric adapter using `Create Table as Select` (CTAS), `DROP` and `CREATE` commands.

- Review [Unsupported data types](data-types.md#unsupported-data-types) to learn about the supported and unsupported data types.

- You can log issues on the dbt-fabric adapter by visiting [Issues · microsoft/dbt-fabric · GitHub](https://github.com/microsoft/dbt-fabric/issues).

## Related content

- [What is data warehousing in Microsoft Fabric?](data-warehousing.md)
- [Tutorial: Create a Warehouse in Microsoft Fabric](tutorial-create-warehouse.md)
- [Tutorial: Transform data using a stored procedure](tutorial-transform-data.md)
