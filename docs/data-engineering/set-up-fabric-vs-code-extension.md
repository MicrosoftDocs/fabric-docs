---
title: Microsoft Fabric VS Code extensions
description: Learn about the Microsoft Fabric and Fabric User data functions extensions for Visual Studio Code to support local development and debugging. 
ms.reviewer: sumuth
ms.topic: overview
ms.date: 04/25/2026
ms.search.form: VS Code extension
ai-usage: ai-assisted
---

# Microsoft Fabric extensions for Visual Studio Code

Microsoft Fabric has two extensions for Visual Studio (VS) Code that help you manage your Fabric artifacts in VS Code and develop user data functions:

- [Microsoft Fabric](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric)
- [Fabric User data functions](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-functions)

## Microsoft Fabric 

The [Microsoft Fabric](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric) extension for VS Code allows you to access, view, and manage a Fabric workspace within VS Code. The Fabric extension is the core extension that enables other Fabric extensions to support more features and enhance your developer productivity.

### Features

The supported features are:

- Sign in and manage access to a Fabric account with VS Code accounts.
- Create and open workspaces in your Fabric account.
- View the items in your workspace and open, rename, or edit them in Fabric. You can group them by item type or view them as a list.
- Open and edit items in your workspace ([supported items](/rest/api/fabric/articles/item-management/definitions/item-definition-overview)).
- Clone Git enabled workspaces.
- Support for version control for your items.
- Open Fabric SQL Databases in [MSSQL extension](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql).
- Explore and edit item definitions in VS Code for Fabric items.
- Fabric MCP support: install the Fabric MCP server alongside the Microsoft Fabric extension and GitHub Copilot Chat in VS Code to enable Fabric MCP tools and a tailored chat experience for working with Fabric artifacts directly from the chat interface.
- Browse workspace folders and view their contents. 

### Sign in

To sign in to your Fabric account, press F1 and type `Fabric: Sign in`. You're prompted for access to your computer's secure credential storage service so you don't need to sign in every time you start VS Code. Once signed in, select a workspace to view the list of items in the Fabric explorer.

## Manage your workspaces and item
View all your workspaces in Fabric explorer. You can filter the workspaces you want to work with in VS Code. 

:::image type="content" source="media\vs-code\manage-workspace.png" alt-text="Screenshot of viewing workspaces and filter them." lightbox="media\vs-code\manage-workspace.png" :::

### Switch tenants

You can enable Microsoft Fabric for your tenant  such that everyone in the tenant has access to Microsoft Fabric. You may have access to more than one tenant; you can switch between tenants using the tenant switcher.

1. Sign in to Microsoft Fabric.
2. Select **Switch tenant** and  then choose the tenant you want to navigate to.

   :::image type="content" source="media\vs-code\switch-tenant.png" alt-text="Screenshot of selecting switch tenant to change the default tenant." lightbox="media\vs-code\switch-tenant.png":::

### Create a Fabric item in VS Code

With the Microsoft Fabric Extension, you can now create, delete, and rename any Fabric item directly within VS Code, streamlining your workflow without ever leaving VS Code. You can also view the newly created items in [Fabric portal](https://app.fabric.microsoft.com).

1. Select the workspace of your choice.
2. Select **+** to create an item in the workspace.   
3. Select the item type and provide a name to create the item in Fabric. 
   :::image type="content" source="media\vs-code\select-item-type.png" alt-text="Screenshot of selecting the item type to create in Fabric." lightbox="media\vs-code\select-item-type.png":::
3. Select **Open in Explorer** to open an item definition to edit in Visual Studio Code. Here is a list of ([supported items](/rest/api/fabric/articles/item-management/definitions/item-definition-overview)).
   :::image type="content" source="media\vs-code\open-pbi-report.png" alt-text="Screenshot showing how to open a Power BI report." lightbox="media\vs-code\open-pbi-report.png":::

> [!NOTE]
> Items are created at the workspace level. Creating items inside workspace folders is currently not supported.

### Use Fabric tools in VS Code Chat

When you install the Fabric MCP server alongside the Microsoft Fabric extension and GitHub Copilot Chat, a Fabric agent mode becomes available in VS Code Chat. The Fabric agent provides tools for:

- Understanding and navigating [item definitions](/rest/api/fabric/articles/item-management/definitions/item-definition-overview)
- Invoking Fabric REST APIs
- Accessing Fabric documentation
- Performing create, update, delete, and list operations on tenant items

For example, you can use Fabric tools in VS Code Chat to perform basic OneLake file operations, create a Fabric Lakehouse, upload CSV files to OneLake, and create and run Fabric notebooks—all without leaving VS Code.

## Fabric User data functions

The [Fabric User data functions](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-functions) extension supplies additional functionality for authoring, testing, and deploying user data functions in Fabric.

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
- Support for Git enabled User data functions 


## Next steps

- [Develop user data functions in Visual Studio Code](./user-data-functions/create-user-data-functions-vs-code.md)
- [Develop Fabric notebooks in Visual Studio Code](./setup-vs-code-extension.md)
