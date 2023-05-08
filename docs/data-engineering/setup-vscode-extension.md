---
title: VS Code extension overview
description: VS Code extension for Synapse supports pro-dev authoring experience of Notebook and Spark Job definition together with the experience of lakehouse exploring.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.date: 05/08/2023
ms.search.form: VSCodeExtension
---

# What is Synapse VS Code extension?

Synapse VS Code extension supports pro-dev authoring experience of notebook and Spark Job Definition together with the experience of lakehouse exploring in [!INCLUDE [product-name](../includes/product-name.md)]. The purpose of the doc is to give you the overview of the extension and how to get started with the needed prerequisites.

Visual Studio Code is a one of the most popular lightweight source code editor which runs on your desktop and is available for Windows, macOS and Linux.By installing the Synapse VS Code extension, you can author and run/debug your notebook and Spark Job Definition locally in VS Code, you can also post the code to the remote Spark compute in [!INCLUDE [product-name](../includes/product-name.md)] workspace to run/debug. The extension also provides the experience of lakehouse exploring, you can browse the data in your lakehouse including the tables and raw files

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisites
Below software are required to use this extension
1.	Java 1.8 (https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html)
2.	Conda (https://docs.conda.io/en/latest/miniconda.html )
3.	Jupyter extension for VSCode (https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) 
 
After all this software is installed, there are certain steps needed to update the operating system properties

Windows 
1. add JAVA_HOME to the environment variables and point it to the directory where java 1.8 in installed
2. add both %JAVA_HOME%/bin and Condabin subfolder of the Conda installation to the system path directory

macOS 
1. run the conda.sh in the terminal. Open one terminal windows, change the directory to the folder where conda is installed, then go to these sub-directory : etc/profile.d, there should be a file named conda.sh there, then execute: Source conda.sh
2. in the same terminal windows, run: sudo conda init
3. type in Java –-verison, the version should be Java 1.8 

## Install the extension and prepare the enviorment
Search "Synapse VS Code" in the VS Code extension marketplace, then install the extension. The extension is still under preview, so you need to select the "pre-release" version to install.

It is suggested that to restart the VSCode once the extension is installed. After successfully installed, the icon of the extension will be listed at the VSCode activity bar:

### Local working directory 
To develop notebook, you need to have a local copy of the notebook content for the further edition. The local working directory of the extension serves as the local root folder of all downloaded notebooks from different workspaces. By invoking the command of **Synapse:Set Local Work Folder**, you could specify a folder as the local working directory for this extension.
 
To validate the setup, you could open the extension settings and check the value there.
 :::image type="content" source="media\vscode\local-working-dir.png" alt-text="Screenshot showing local working dir.":::

### Sign in your account
The **Synapse:Sign in** command is provided to sign-in. Once this command is invoked from the VSCode command palette, a separated browser log-in page will be promoted and ask for the username and password.

After successfully sing in, the username will be displayed at the status bar to indicate the state of login.
    :::image type="content" source="media\vscode\signin-status.png" alt-text="Screenshot showing current signin status.":::

The command of **Synapse: Sign off** is used to sign out current user.

### Select workspace to work with
To select [!INCLUDE [product-name](../includes/product-name.md)] workspace, you need to have a [!INCLUDE [product-name](../includes/product-name.md)] workspace created. If you don't have one, you can create one in the [!INCLUDE [product-name](../includes/product-name.md)] portal. For more information, see [Create a workspace](https://docs.microsoft.com/azure/synapse-analytics/quickstart-create-workspace).

Once you have a workspace, you can select it by clicking the **select workspace** button. This will list all the workspaces that you have access to, and you can select one from the list.

:::image type="content" source="media\vscode\select-workspace.png" alt-text="Screenshot showing select workspace button.":::

## Next steps

In this overview, you get a basic understanding of how to install and setup the Synapse VS Code extension. Advance to the next article to learn how to develop your notebook and Spark Job Definition locally in VS Code.:

- To get started with notebook, see [Develop, execute and debug notebook in VS Code](author-notebook-with-vscode.md).
- To get started with Spark Job Definition, see [Develop, execute and debug Spark Job Definition in VS Code](author-sjd-with-vscode.md).
