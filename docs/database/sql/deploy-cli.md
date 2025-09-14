---
title: Create a SQL database with the Fabric CLI"
description: Learn how to deploy a new SQL database in Microsoft Fabric using Fabric CLI.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sukkaur
ms.date: 07/02/2025
ms.topic: how-to
ms.search.form: Develop and run queries in SQL editor
---
# Create a SQL database with the Fabric CLI

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

You can use the [Fabric Command Line Interface](https://microsoft.github.io/fabric-cli/) (CLI) to create SQL databases in Fabric. The Fabric CLI (`fab`) is a fast, file‑system‑inspired command‑line interface for Microsoft Fabric.

This article and sample scripts demonstrate the basic Fabric CLI commands that can be used to deploy a Fabric SQL database.

## Prerequisites

Before you begin:

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- You can use an existing workspace or [create a new Fabric workspace](../../fundamentals/workspaces.md).
- You must be a member of the [Admin or Member roles for the workspace](../../fundamentals/give-access-workspaces.md) to create a SQL database.
- Make sure [Python version 3.10, 3.11, or 3.12](https://www.python.org/downloads/) is installed on your machine. Python should be accessible from your terminal, via the `PATH` environment variable.
- Install Fabric CLI on your machine with the following command. If you see a message about updating the `PATH` in the output of the installer, fix that before proceeding or subsequent steps can fail.

   ```python
   pip install ms-fabric-cli
   ```

## Create a new SQL database with Fabric CLI

1. Sign in to Microsoft Fabric. Open a command prompt and run the following command:

   ```cli
   fab auth login 
   ```

1. Follow the prompts to authenticate using your Microsoft account with access to your Fabric workspace.
1. Run the following command to create a new SQL database:
   - Replace `<workspacename>` with the name of the workspace where you want to create the SQL database.
   - Replace `<databasename>` with the name that you want to use for your new SQL database.

    ```cli
    fab create <workspacename>.Workspace/<databasename>.SQLDatabase
    ```

1. Verify the new SQL database in your workspace with the following command:
   - Replace `<workspacename>` with the name of the workspace where you want to create the SQL database.

   ```cli
   fab ls <workspacename>.Workspace 
   ```

   The `fab ls` command displays a list of all items in the workspace, including your new SQL database.

## Related content

- [Fabric CLI](https://microsoft.github.io/fabric-cli/)
- [Options to create a SQL database in the Fabric portal](create-options.md)