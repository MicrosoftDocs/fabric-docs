---
title: Quickstart - Create a Fabric User data functions item in Visual Studio Code
description: Add a Fabric User data functions item in VS Code 
ms.author: eur
ms.reviewer: sumuth
author: eric-urban
ms.topic: quickstart
ms.date: 03/31/2025
ms.search.form: Fabric User data functions, VS Code
---

# Create a Fabric User data functions item in Visual Studio Code

Fabric User data functions is a serverless solution that enables you to quickly and easily develop applications on top of Fabric-native data sources. The advantages are increased flexibility and cost-effectiveness of serverless computing in Fabric. User data functions are invoked as HTTP requests to a service-provided endpoint and they operate on your Fabric-native data sources.

In this quickstart, you learn how to create a user data functions item in Visual Studio (VS) Code.

## Prerequisites

- A [Fabric workspace](../../get-started/create-workspaces.md)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Python](https://www.python.org/downloads/release/python-3110/)
- [Azure Functions Core Tools v4](/azure/azure-functions/functions-run-local)
- [Microsoft Fabric extension](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric)
- [User data functions extension](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-functions)

## Select your workspace

1. Open VS Code and **sign in to Fabric**.
1. In Fabric, **open your Fabric workspace** or **create a new workspace**.
1. Select **+ New item** to open the New item pane.
1. In the New item pane, under **Develop data**, select the **User data functions** item type.
1. Provide a name for the new user data functions item and select **Create**. The new user data functions item is created.
1. In the ribbon, select **Python** as the runtime language.
1. Create a virtual environment for this user data functions item.
1. Select the Python runtime version. User data functions requires Python Version 3.11.
1. Set the virtual environment for the folder by selecting **Yes**.
1. Open `function_app.py` to add more than one function.

    :::image type="content" source="..\media\user-data-functions-create-in-vs-code\open-fabric-udf.png" alt-text="Screenshot showing a user data functions item opened in VS Code." lightbox="..\media\user-data-functions-create-in-vs-code\open-fabric-udf.png":::

## Write your first function

Write a user data functions item with the `@udf.function()` decorator to define the start of function. You can pass an input for the function such as primitive data types like str, int, float, etc. Within the function, you can write your custom business logic.

Here's an example of `hello_fabric` function.

```python
@udf.function()
def hello_fabric(name: str) -> str:
    # Use logging to write custom logs to help trace and debug issues 
    logging.info('Python UDF trigger function processed a request.')
    logging.info('Executing hello fabric function.')
    
    return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!" 

```

## Manage user data functions in VS Code

You can view the user data functions item in the Fabric explorer in VS Code within the currently opened workspace.

:::image type="content" source="..\media\user-data-functions-create-in-vs-code\fabric-explorer-local-folder-views.png" alt-text="Screenshot showing fabric explorer view and local folder view." lightbox="..\media\user-data-functions-create-in-vs-code\fabric-explorer-local-folder-views.png":::

All the functions in the Fabric workspace can be opened in the Explorer in VS Code to start editing. Choose the function you want to open, then select **Open in Explorer**. You can see connections, libraries, and all the functions written within the user data functions item.


### Manage connections and libraries 
- **Connections**: All the data connections added for your user data function can be viewed from Fabric explorer. Right-click and select **Manage connections in Fabric** for the user data functions items.

- **Libraries**: All the libraries added for your user data functions item can be viewed from Fabric explorer. Right-click and select **Manage libraries in Fabric** to add new libraries for the user data functions items.

- **Functions**: You can view all the published functions here. Select a function and perform these actions:
    - **Run and test** to test the function in VS Code without having to use API testing tools.
    - **Copy public URL** if this function is publicly accessible invoke from external application.

## Local folder to manage your user data functions

The user data functions item opened in VS Code explorer is visible in the Local folder view. The local folder allows you test and see the local changes made to the user data function item.

- **Functions**: You can view all the functions that are in your local `function_app.py` file. To start with a sample, right-click on **Functions** and select **Add a function** to add a sample function.

    :::image type="content" source="..\media\user-data-functions-create-in-vs-code\add-a-new-function-sample.png" alt-text="Screenshot showing how to add a new function in a user data functions item for local development." lightbox="..\media\user-data-functions-create-in-vs-code\add-a-new-function-sample.png":::

    To test your function locally, press **F5** to start debugging. You can also select the function item and select **Run and debug**.

- **View connections and libraries for local function**: You can view all the connections that are present in `local.settings.json` and the libraries in `requirements.txt` file on your local environment.
    - **Sync connections from local.settings** to show the current list of connections on your local environment.
    - **Sync requirements.txt** to show the current list of libraries on your local environment.

### Publish the User data function

Once you test your changes, publish the user data function to Fabric. It can take a few minutes to publish any changes.

:::image type="content" source="..\media\user-data-functions-create-in-vs-code\publish-user-data-function.png" alt-text="Screenshot showing how to publish your changes or newly added functions in a user data functions item for local development." lightbox="..\media\user-data-functions-create-in-vs-code\publish-user-data-function.png":::

## Local debugging with breakpoints

Select **F5** to debug your Fabric functions. You can add a breakpoint anywhere in your code. In debug mode, your breakpoints are hit as expected and test your code as you would test a deployed function.

:::image type="content" source="..\media\user-data-functions-create-in-vs-code\local-debugging.png" alt-text="Screenshot showing how to debug locally with breakpoints." lightbox="..\media\user-data-functions-create-in-vs-code\local-debugging.png":::

## Next steps

- [Learn about the User data functions programming model](./python-programming-model.md)
- [Tutorial: Invoke user data functions from a Python application](./tutorial-invoke-from-python-app.md)
