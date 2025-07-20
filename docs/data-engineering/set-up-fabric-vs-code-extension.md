---
title: Microsoft Fabric VS Code extensions
description: Learn about the Microsoft Fabric and Fabric User data functions extensions for Visual Studio Code to support local development and debugging. 
ms.reviewer: sngun
ms.author: sumuth
author: mksuni
ms.topic: overview
ms.custom:
ms.date: 06/17/2025
ms.search.form: VS Code extension
---

# Microsoft Fabric extensions for Visual Studio Code

Microsoft Fabric has two extensions for Visual Studio (VS) Code that help you manage your Fabric artifacts in VS Code and develop user data functions:

- [Microsoft Fabric (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric)
- [Fabric User data functions (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-functions)

## Microsoft Fabric (Preview)

The [Microsoft Fabric (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric) extension for VS Code allows you to access, view, and manage a Fabric workspace within VS Code. The Fabric extension is the core extension that enables other Fabric extensions to support more features and enhance your developer productivity.

### Features

The supported features are:

- Sign in and manage access to a Fabric account with VS Code accounts.
- Create and open workspaces in your Fabric account.
- View the items in your workspace and open, rename, or edit them in Fabric. You can group them by item type or view them as a list.
- Open and edit notebooks.

### Sign in

To sign in to your Fabric account, press F1 and type `Fabric: Sign in`. You're prompted for access to your computer's secure credential storage service so you don't need to sign in every time you start VS Code. Once signed in, select a workspace to view the list of items in the Fabric explorer.


### Switch tenants

You can enable Microsoft Fabric for your tenant  such that everyone in the tenant has access to Microsoft Fabric. You may have access to more than one tenant; you can switch between tenants using the tenant switcher.

1. Sign in to Microsoft Fabric.
2. Select **Workspace actions**.

  :::image type="content" source="media\vscode\view-workspace-actions.png" alt-text="Screenshot of the viewing workspace actions.":::
  
3. Select **Switch tenant** and  then choose the tenant you want to navigate to.

  :::image type="content" source="media\vscode\switch-tenants.png" alt-text="Screenshot of selecting switch tenant to change the default tenant.":::

### Create any Fabric item in VS Code

With the Microsoft Fabric Extension, you can now create, delete, and rename any Fabric item directly within VS Code, streamlining your workflow without ever leaving VS Code. You can also view the newly created items in [Fabric portal](https://app.fabric.microsoft.com).

1. Select Create item.
   :::image type="content" source="media\vscode\create-item.png" alt-text="Screenshot of creating an item in Fabric.":::
2. Select the item type and provide a name to create the item in Fabric. 
   :::image type="content" source="media\vscode\select-item-type.png" alt-text="Screenshot of selecting the item type to create in Fabric.":::

### Command palette

You can access almost all Azure services provided by these extensions through the Command palette in VS Code. Press **F1**, then type in `Fabric` to find the available commands.

## Fabric User data functions (Preview)

The [Fabric User data functions (Preview)](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-functions) extension supplies additional functionality for authoring, testing, and deploying user data functions in Fabric.

### Requirements

In order to use all the features of this extension, you need to have the following installed:

- [Visual Studio Code](https://code.visualstudio.com/)
- [.NET 8](https://dotnet.microsoft.com/download)
- [Python](https://www.python.org/downloads/)
- [Azure Functions Core Tools v4](/azure/azure-functions/functions-run-local)

### What is User data functions?

[Microsoft Fabric User data functions](./user-data-functions/create-user-data-functions-portal.md) is a serverless solution that enables you to quickly and easily write custom logic for your data solutions in Microsoft Fabric. User data functions are invoked as HTTP requests to a service-provided endpoint and they operate on your Fabric-native data sources.

### Features

The supported features are:

- Create user data functions item.
- Manage your user data functions in Fabric from within VS Code.
- Open and edit your user data functions locally.
- Add new functions, run, and debug data functions locally with breakpoints.
- Refresh connections, and libraries for your user data functions item.
- Publish local changes to Fabric.
- Work with workspaces in different tenant


## Next steps

- [Develop user data functions in Visual Studio Code](./user-data-functions/create-user-data-functions-vs-code.md)
- [Develop Fabric notebooks in Visual Studio Code](./setup-vs-code-extension.md)
