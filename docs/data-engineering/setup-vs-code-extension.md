---
title: VS Code extension overview
description: Explore lakehouses, Fabric notebooks, Spark job definitions with the Fabric Data Engineering VS Code extension. Learn about the prerequisites and installation.
ms.reviewer: sngun
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.custom:
ms.date: 05/13/2024
ms.search.form: VSCodeExtension
---

# What is the Fabric Data Engineering VS Code extension?

The Fabric Data Engineering VS Code extension supports a pro-developer experience for exploring Microsoft Fabric lakehouses, and authoring Fabric notebooks and Spark job definitions. Learn more about the extension, including how to get started with the necessary prerequisites.

Visual Studio (VS) Code is a one of the most popular lightweight source code editors; it runs on your desktop and is available for Windows, macOS, and Linux. By installing the Fabric Data Engineering VS Code extension, you can author, run, and debug your notebook and Spark job definition locally in VS Code. You can also post the code to the remote Spark compute in your Fabric workspace to run or debug. The extension also allows you to browse your lakehouse data, including tables and raw files, in VS Code.

## Prerequisites

Prerequisites for the VS Code extension:

- Install Java Development Kit(JDK) from the [OpenJDK8](https://adoptium.net/temurin/releases/?version=8) website. Ensure to use the JDK link and not the JRE.
- Install [Conda](https://docs.conda.io/en/latest/miniconda.html).
- Install the [Jupyter extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)

After you have installed the required software, you must update the operating system properties.

### Windows

1. Open the Windows Settings and search for the setting "Edit the system environment variables".

2. Under **System variables** look for the variable **JAVA_HOME**. If it does not exist, click the **New** button, enter the variable name **JAVA_HOME** and and add the directory where Java is installed in the variable value field.

   For example, if you install JDK at this path `C:\Program Files\Java\jdk-1.8`, set the *JAVA_HOME* variable value to that path.

4. Under **System variables** look for the variable **Path** and double click that row. Add the following folder paths to the **Path** variable, by clicking the **New** button and adding the folder path:
    - `%JAVA_HOME%\bin`
   
   *For Conda add the following subfolders of the Conda installation. Add the full folder paths for theese subfolders*
    - `\miniconda3\condabin`
    - `\miniconda3\Scripts`

    For example: `C:\Users\john.doe\AppData\Local\miniconda3\condabin`

### macOS

Run the **conda.sh** in the terminal:

1. Open the terminal window, change the directory to the folder where conda is installed, then change to the subdirectory **etc/profile.d**. The subdirectory should contain a file named **conda.sh**.

1. Execute `source conda.sh`.

1. In the same terminal window, run `sudo conda init`.

1. Type in `Java --version`. The version should be Java 1.8.

## Install the extension and prepare your environment

1. Search for **Fabric Data Engineering VS Code** in the VS Code extension marketplace and install the extension.

1. After the extension installation is complete, restart VS Code. The icon for the extension is listed at the VS Code activity bar.

### Local working directory

To edit a notebook, you must have a local copy of the notebook content. The local working directory of the extension serves as the local root folder for all downloaded notebooks, even notebooks from different workspaces. By invoking the command `Fabric Data Engineering: Set Local Work Folder`, you can specify a folder as the local working directory for the extension.

To validate the setup, open the extension settings and check the details there:

 :::image type="content" source="media\vscode\local-working-dir.png" alt-text="Screenshot of the Settings screen, showing the selected local working directory.":::

### Sign in and out of your account

1. From the VS Code command palette, enter the `Fabric Data Engineering: Sign In` command to sign in to the extension. A separate browser sign-in page appears.

1. Enter your username and password.

1. After you successfully sign in, your username will be displayed in the VS Code status bar to indicate that you're signed in.

   :::image type="content" source="media\vscode\signin-status.png" alt-text="Screenshot of the VS Code status bar, showing where to find your sign-in status.":::

1. To sign out of the extension, enter the command `Fabric Data Engineering: Sign Out`.

### Choose a workspace to work with

To select a Fabric workspace, you must have a workspace created. If you don't have one, you can create one in the Fabric portal. For more information, see [Create a workspace](../fundamentals/create-workspaces.md).

Once you have a workspace, choose it by selecting the **Select Workspace** option. A list appears of all workspaces that you have access to; select the one you want from the list.

:::image type="content" source="media\vscode\select-workspace.png" alt-text="Screenshot of VS Code Explorer, showing where to find the Select Workspace option.":::

### Current Limitations

- The extension under the desktop mode doesn't support the [Microsoft Spark Utilities](/azure/synapse-analytics/spark/microsoft-spark-utilities?pivots=programming-language-python) yet
- Shell command start with "!" is not supported.

## Related content

In this overview, you get a basic understanding of how to install and set up the Fabric Data Engineering VS Code extension. The next articles explain how to develop your notebooks and Spark job definitions locally in VS Code.

- To get started with notebooks, see [Create and manage Microsoft Fabric notebooks in Visual Studio Code](author-notebook-with-vs-code.md).
- To get started with Spark job definitions, see [Create and manage Apache Spark job definitions in Visual Studio Code](author-sjd-with-vs-code.md).
