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

For VS Code, Microsoft Fabric has two extensions that help you both manage you fabric artifacts in VS Code and develop user data functions:

- [Microsoft Fabric (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric)
- [Fabric user data functions (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-functions)

## Microsft Fabric (Preview)
The [Microsoft Fabric (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric) extension for VS Code allows you to view, manage a Fabric workspace within VS Code. The Fabric extension is the Core extension that enables other Fabric extension to support more features and enhance your developer productivity.

### Features
The features supported are:
- Sign in and manage sign in to Fabric account with VS Code accounts.
- Create and open workspaces in your Fabric account.
- View the items in your workspace and open in Fabric, rename, and edit items. You can group them by item type or view them as a list.
- Open and edit notebooks

### Sign In
To sign in to your Fabric account, press F1 and type in `Fabric: Sign in`. You're prompted for access to your computer's secure credential storage service so you don't need to sign in every time you start VS Code. Once signed in, Select a Workspace and then view the list of items in the Fabric explorer.

### Command palette
You can access almost all Azure Services provided by these extensions through the Command palette. Press `F1`, then type in Fabric to find the available commands.

## Fabric user data functions (Preview)

[Fabric user data functions (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-functions) extension for VS Code extends the Microsoft Fabric extension with more functionality for authoring, testing, and deploying user data functions in Microsoft Fabric. 

### Requirements
In order to use all the features of this extension, you need to have the following installed:
- [Visual Studio Code](https://code.visualstudio.com/)
- [.NET 8](https://dotnet.microsoft.com/download)
- [Python](https://www.python.org/downloads/)
- [Azure Functions Core Tools v4](/azure/azure-functions/functions-run-local)

### What is user data functions?
[Microsoft Fabric user data Functions](./user-data-functions/create-user-data-functions-portal.md) is a serverless solution that enables you to quickly and easily write custom logic for your data solutions in Microsoft Fabric. Fabric Data Functions are invoked as an HTTP requests to a service-provided endpoint and they operate on your Fabric-native data sources.

### Features
The features supported are:

- Create new data functions in your Fabric workspace.
- Manage your user data function in Fabric from within Visual Studio Code. 
    - View libraries 
    - View connections 
    - View functions
- Open and edit your user data function locally.
- Add new functions, run, and debug data functions locally with breakpoints. 
- Refresh connections, libraries for your user data function. 
- Publish local changes to Fabric 


## Next Steps
- [Develop user data functions in Visual Studio Code](./user-data-functions/create-user-data-functions-vs-code.md)
- [Develop Fabric Notebooks in Visual Studio Code.md](./setup-vs-code-extension.md)