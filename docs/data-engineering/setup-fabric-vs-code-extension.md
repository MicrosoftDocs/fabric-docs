---
title: Microsoft Fabric VS Code extensions
description: Learn about Microsoft Fabric and Fabric User data functions extensions for VS Code to support local development and debugging. 
ms.reviewer: sngun
ms.author: sumuth
author: mksuni
ms.topic: overview
ms.custom:
ms.date: 03/27/2025
ms.search.form: VSCodeExtension
---

# Microsoft Fabric extensions for VS Code

For VS Code, Microsoft Fabric has two extensions that help you both manage you fabric artifacts in VS Code and develop your APIs as part of Fabric App development: 

1. [Fabric Workspaces (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric)
2. [Fabric App development (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-functions)

## Fabric Workspaces (Preview)
The [Fabric Workspaces (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric) extension for VS Code allows you to view, manage a Fabric workspace within VS Code. The Fabric workspaces extension is the Core extension that enables Fabric App development extension to support more features to develop data function sets within your workspace. 

### Features
The features supported are:
1. Sign in and manage sign in to Fabric account with VS Code accounts.
2. Create and open workspaces in your Fabric account.
3. View the items in your workspace and open in Fabric, rename, and edit items. You can group them by item type or view them as a list.
4. Open and edit notebooks

### Sign In
To sign in to your Fabric account, press F1 and type in `Fabric: Sign in`. You're prompted for access to your computer's secure credential storage service so you don't need to sign in every time you start VS Code. Once signed in, Select a Workspace and then view the list of items in the Fabric explorer.

### Command Palette
You can access almost all Azure Services provided by these extensions through the Command Palette. Press `F1`, then type in Fabric to find the available commands.

## Fabric User data functions (Preview)

[Fabric App development (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-functions) extension for VS Code extends the Microsoft Fabric extension with more functionality for authoring, testing, and deploying User data functions in Microsoft Fabric. 

### Requirements
In order to use all the features of this extension, you need to have the following installed:
1. [Visual Studio Code](https://code.visualstudio.com/)
2. [.NET 8](https://dotnet.microsoft.com/en-us/download)
3. [Python](https://www.python.org/downloads/)
3. [Azure Functions Core Tools v4](/azure/azure-functions/functions-run-local)

### What is User data functions?
[Microsoft Fabric User data Functions](https://support.fabric.microsoft.com/en-us/blog/10474?ft=Core:category) is a serverless solution that enables you to quickly and easily write custom logic for your data solutions in Microsoft Fabric. Fabric Data Functions are invoked as an HTTP requests to a service-provided endpoint and they operate on your Fabric-native data sources.

### Features
The features supported are:

1. Create new data functions in your Fabric Workspace.
2. Manage your User data function in Fabric from within Visual Studio Code. 
    - View libraries 
    - View connections 
    - View functions
3. Open and edit your user data function locally.
4. Add new functions, run, and debug data functions locally with breakpoints. 
5. Refresh connections, libraries for your User data function. 
6. Publish local changes to Fabric 


## Next Steps
- [Develop User data functions in Visual Studio Code](./user-data-functions/create-user-data-functions-in-vs-code.md)
- [Develop Fabric Notebooks in Visual Studio Code.md](./setup-vs-code-extension.md)