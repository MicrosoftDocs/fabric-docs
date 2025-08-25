---
title: Using the portal editor - User Data Functions
description: Learn how to use the portal editor in User Data Functions
ms.author: luisbosquez
author: luisbosquez
ms.topic: overview
ms.date: 08/21/2025
ms.search.form: Use the portal editor
---

# Use the portal editor to write and publish your User Data Functions (preview)

You can develop your Fabric User data functions directly from your browser using the portal editor. The portal allows you to create, modify, test, and publish your functions from your browser. In this article, you'll learn the following topics:
- Overview of the portal editor.
- User Data Functions properties and metadata.
- Features of the portal editor.

## Overview of the portal editor

The portal editor is the web-based interface that you access when you open your User Data Functions items. The following are the elements of the portal editor:

   :::image type="content" source="..\media\user-data-functions-portal-editor\portal-editor-overview.png" alt-text="Screenshot showing the elements of the portal editor." lightbox="..\media\user-data-functions-portal-editor\portal-editor-overview.png":::

1. **Home / Edit tab:** Use these tabs to switch the top toolbar between the Home tools to the Edit tools.
1. **Settings:** This button opens the User Data Functions item settings. The settings include item description, sensitivity label, endorsement, manage connections, and library management settings. The settings in this menu are applicable to all functions in this item.
1. **Functions list:** This list contains the functions inside of this User Data Functions item. If you are in **Develop mode**, this list may include new and unpublished functions. If you are in **Run/View only modes**, this list only includes published functions. Hovering over a list item reveals Run or Test functionality along with more options. 
1. **Code viewer/editor:** The code editor contains the code for all the functions in this User Data Functions item. If you are in **Develop mode**, this code is editable and it may include functions that have not been published yet. If you are in **Run/View only modes**, this code is read-only and shows only functions that were published.
1. **Status bar:** This bar contains two elements: 
    1. **Test session indicator:** Used in Develop mode, this indicator shows if your test session is running. Learn more about testing functions in the [Develop mode documentation](./test-user-data-functions.md).
    1. **Publish process indicator:** This indicator shows if your functions are currently being published, or the timestamp of the last time they were successfully published. 
1. **Mode switcher:** This drop-down menu allows you to switch between Develop mode and Run/View only mode. Learn more in the [Develop mode documentation](./test-user-data-functions.md).
1. **Share button:** This feature allows you to share this User Data Functions item with other users and assign permissions to them (Share, Edit and/or Execute permissions).
1. **Publish button:** This button starts the publish process for your User Data Functions item. This process publishes all functions in your item. After your functions are published, other users and Fabric items can run your functions.

## Home toolbar
This toolbar provides features that are applicable to all functions in the User Data Functions items. Some of these features are only available in **Develop mode**.

   :::image type="content" source="..\media\user-data-functions-portal-editor\portal-editor-home-toolbar.png" alt-text="Screenshot showing the elements of the home toolbar." lightbox="..\media\user-data-functions-portal-editor\portal-editor-home-toolbar.png":::

1. **Settings:** This button opens the User Data Functions item settings. The settings include item description, sensitivity label, endorsement, manage connections and library management settings. The settings in this menu are applicable to all functions in this item.
1. **Refresh button:** This button refreshes the User Data Functions item with the latest published functions and metadata. You can use this feature to ensure you are working with the latest version of your code.
1. **Language selector:** For now, this read-only button shows Python as the default option.
1. **Generate invocation code:** This feature automatically generates code based on your published functions. Learn more about the [Generate invocation code feature](#generate-invocation-code-feature).
1. **Manage connections:** This feature allows you to create connections to other Fabric items using the OneLake data catalog. Learn more about the [Manage connections feature](./connect-to-data-sources.md). 
1. **Library management:** This feature allows you to install public and private libraries for your function code to use. Learn more about the [Library management feature](./how-to-manage-libraries.md).
1. **Open in VS Code button:** This button allows you to open your functions in the VS Code editor by using the [Fabric User Data Functions VS Code extension](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-functions&ssr=false). Learn more about using [the VS Code extension](./create-user-data-functions-vs-code.md).
1. **Publish button:** This button starts the publish process for your User Data Functions item. This process publishes all functions in your item. This button is only enabled in **Develop mode**.

## Edit toolbar

This toolbar provides features to help you edit your functions code. Some of these features are only available in **Develop mode**.

   :::image type="content" source="..\media\user-data-functions-portal-editor\portal-editor-edit-toolbar.png" alt-text="Screenshot showing the elements of the edit toolbar." lightbox="..\media\user-data-functions-portal-editor\portal-editor-edit-toolbar.png":::

1. **Reset code button:** This button resets all your functions to the published version of the code. This feature undoes any code changes that are different from the published functions. This button is only enabled in **Develop mode**.
1. **Edit buttons:** These buttons provide the following functionality for the code editor: Undo, Redo, Copy, and Paste. This button is only enabled in **Develop mode**.
1. **Insert sample:** This feature provides code templates that help you get started for a given scenario. Once you select a code template, it is inserted at the bottom of your functions. Make sure you install the necessary libraries and add the necessary connections according to the [programming model](./python-programming-model.md) guidelines. This feature is only enabled in **Develop mode**.
1. **Manage connections:** This feature allows you to create connections to other Fabric items using the OneLake data catalog. Learn more about the [Manage connections feature](./connect-to-data-sources.md). 
1. **Library management:** This feature allows you to install public and private libraries for your function code to use. Learn more about the [Library management feature](./how-to-manage-libraries.md).
1. **Find and replace:** This feature allows you to search for keywords in the code editor and replace them as needed. This feature is only enabled in **Develop mode**.
1. **Publish button:** This button starts the publish process for your User Data Functions item. This process will publish all functions in your item. This button is only enabled in **Develop mode**.

## Generate invocation code feature 
You can use this feature to automatically generate different types of code templates based on your functions. There are two types of code: 
    1. Client code 
    1. OpenAPI specification

### Client code
This feature allows you to generate code for the following scenarios:
1. **Client application:** This feature generates code to run in a application using the public endpoint of your User Data Functions item in your language of choice.
1. **Fabric Notebooks:** This feature generates code to run from your [Fabric Notebooks](../how-to-use-notebook.md) in your language of choice.

#### Client application
This feature generates a code snippet to invoke your functions from a client application. You can choose between Python, C# or Node.js in the code options.

:::image type="content" source="..\media\user-data-functions-portal-editor\portal-editor-client-code.png" alt-text="Screenshot showing the client code output." lightbox="..\media\user-data-functions-portal-editor\portal-editor-client-code.png":::

This article contains an example for [how to use this invocation code in a Python client application](./tutorial-invoke-from-python-app.md).

#### Fabric Notebooks
This feature generates a code snippet you can use to invoke your functions from a [Fabric Notebook](../notebook-utilities.md#user-data-function-udf-utilities).

```python
# Get the User Data Functions item from the same workspace
myFunctions = notebookutils.udf.getFunctions('UDFItemName')

# Get the User Data Functions item from a given workspace
myFunctions = notebookutils.udf.getFunctions('UDFItemName', 'workspaceId')

# Display the metadata of a User Data Functions item
display([myFunctions.itemDetails])

# Invoke a function from the User Data Functions item with parameters
myFunctions.functionName('value1', 'value2'...)

```

For more examples in different languages, visit the [Fabric Notebooks User Data Functions](../notebook-utilities.md#user-data-function-udf-utilities) utilities documentation article.

### OpenAPI specification
The [Open API specification](https://swagger.io/docs/specification/v3_0/about/), formerly Swagger Specification, is a widely used, language-agnostic description format for REST APIs. This specification allows humans and computers alike to discover and understand the capabilities of a service in a standardized format. This specification is useful for creating integrations with external systems, AI agents and code generators.

This feature generates an OpenAPI specification in JSON or YAML format for all your functions. This feature uses the DOCSTRING property of your functions in addition to the function parameters, error messages, and endpoints.

:::image type="content" source="..\media\user-data-functions-portal-editor\portal-editor-openapi-spec.gif" alt-text="Screenshot showing the openAPI spec." lightbox="..\media\user-data-functions-portal-editor\portal-editor-openapi-spec.gif":::

To define the content for your API documentation, use the following properties in the DOCSTRING of your functions:

- **Summary:** This field provides a one-line explanation of the function. The summary is often displayed in a high-level view of a library or API that consumes the specification. In the OpenAPI schema, this property corresponds to the "summary" field in the OpenAPI specification.
- **Description:** This field is used for a detailed explanation of the purpose and behavior of the function. You can use multiple lines to describe the function outputs, input, and any potential side effects or exceptions it raises. This property corresponds to the "description" field in the OpenAPI specification.

This is an example function with a DOCSTRING:

```python
@udf.function()
def hello_fabric(name: str) -> str:
    """
    Summary: A Python function that prints your name and the time.
    Description: This functions takes a string input and concatenates it with the current time 
    to give you a warm welcome to User Data Functions. This function returns a string and 
    provides a log entry.
    """
    
    logging.info('Python UDF trigger function processed a request.')

    return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!"
```

## Next steps

- Learn more about the [service limitations](./user-data-functions-service-limits.md).
- [Create a Fabric User data functions item](./create-user-data-functions-portal.md) from within Fabric or [use the Visual Studio Code extension](./create-user-data-functions-vs-code.md)
- [Learn about the User data functions programming model](./python-programming-model.md)
