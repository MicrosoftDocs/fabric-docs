---
title: Generate invocation code for User Data Functions
description: Learn how to generate code templates for invoking your User Data Functions from external applications, Fabric Notebooks, and AI agents.
ms.author: eur
ms.reviewer: luisbosquez
author: eric-urban
ms.topic: how-to
ms.custom: freshness-kr
ms.date: 01/21/2026
---

# Generate invocation code for User Data Functions

Once you've published your User Data Functions, you can call them from Fabric items or external applications. Instead of writing the invocation code from scratch, use the **Generate invocation code** feature to automatically create ready-to-use code templates.

Choose the code generation option based on your integration scenario:

- **Fabric Notebooks code** (Python) - For invoking functions from within Fabric Notebooks, which is one way to integrate with Fabric items. For other Fabric items like Pipelines and Activator, see the [integration documentation](./user-data-functions-overview.md#invoke-from-fabric-items).
- **Client application code** (Python, C#, Node.js) - For calling your functions from external applications via the unique REST endpoint that each function exposes. This enables integration with web apps, services, or any system outside Fabric.
- **OpenAPI specification** (JSON, YAML) - For API management platforms, AI agents, or generating client SDKs. Use this to integrate your functions with Azure API Management, configure AI systems, or generate libraries for external applications.

## Prerequisites

Before you generate invocation code, you need:

- A published User Data Functions item with at least one function
- Access to the User Data Functions item in the Fabric portal
- At least **Execute** permission on the User Data Functions item to generate and use invocation code

## Generate code for Fabric Notebooks

When integrating with Fabric items, use this option to call your functions from Fabric Notebooks. The generated code uses the built-in `mssparkutils.userDataFunction` utility, which provides a simple way to invoke functions without managing authentication or endpoints. This is ideal for data processing workflows, exploratory analysis, and machine learning pipelines within the Fabric environment.

1. Open your User Data Functions item in the Fabric portal.

1. On the **Home** tab, select **Generate invocation code** > **Client code**.

1. Under **Invoke from**, select **Notebook** from the dropdown.

1. Select the function name you want to invoke.

1. The code is automatically generated in Python. (Python is the only language available for notebook invocation code.)

   :::image type="content" source="..\media\user-data-functions-portal-editor\portal-editor-notebooks-code.png" alt-text="Screenshot showing the generated Notebooks invocation code." lightbox="..\media\user-data-functions-portal-editor\portal-editor-notebooks-code.png":::

1. Copy the generated code snippet.

1. Paste it into a new cell in your Fabric Notebook.

1. Update the function parameters with your actual values. The generated code includes a comment showing where to update:
   ```python
   # UPDATE BELOW: Update the request body based on the inputs to your function
   myFunctions.hello_fabric(name = "string")
   ```

1. Run the cell to invoke your function.

For more information, see [Fabric Notebook User Data Functions utilities](../notebook-utilities.md#user-data-function-udf-utilities).

## Generate code for client applications

When integrating with external applications, use this option to call your functions via the unique REST endpoint that each function exposes. The generated code includes authentication setup using Microsoft Entra ID and handles the HTTP request/response flow. This enables you to invoke your Fabric functions from web apps, mobile apps, microservices, or any system outside the Fabric environment.

1. Open your User Data Functions item in the Fabric portal.

1. On the **Home** tab, select **Generate invocation code** > **Client code**.

1. Under **Invoke from**, select **Client application** from the dropdown.

1. Select the function name you want to invoke.

1. Choose your programming language:
   - **Python**
   - **C#** 
   - **Node.js**

   :::image type="content" source="..\media\user-data-functions-portal-editor\portal-editor-client-code.png" alt-text="Screenshot showing the client code output." lightbox="..\media\user-data-functions-portal-editor\portal-editor-client-code.png":::

1. Copy the generated code and add it to your application.

1. Review the code structure:
   - **Authentication** - Uses `InteractiveBrowserCredential` to acquire a token (for development/testing only)
   - **Endpoint URL** - The unique REST endpoint for your specific function
   - **Request body** - Contains the input parameters your function expects

1. Update the `request_body` section with your actual parameter values. The generated code includes a comment showing where to update:
   ```python
   # UPDATE HERE: Update the request body based on the inputs to your function 
   request_body = {
       "name": "string"
   }
   ```

1. For production applications, replace the authentication code with proper Microsoft Entra ID application registration. The generated code includes a warning and link to guidance for production authentication.

For a complete walkthrough including production authentication setup, see [Invoke User Data Functions from a Python application](./tutorial-invoke-from-python-app.md).

## Generate OpenAPI specification

When you need to integrate your functions with API management platforms, AI agents, or generate client SDKs for external applications, use this option to create an [OpenAPI specification](https://swagger.io/docs/specification/v3_0/about/). The OpenAPI spec provides a machine-readable description of your function's REST endpoints, making it easy for tools and systems to discover and integrate with your functions programmatically.

1. Open your User Data Functions item in the Fabric portal.

1. On the **Home** tab, select **Generate invocation code** > **OpenAPI specification**.

1. In the **Generate OpenAPI specification** dialog, select your output format:
   - **JSON**
   - **YAML**

   :::image type="content" source="..\media\user-data-functions-portal-editor\portal-editor-openapi-spec.gif" alt-text="Screenshot showing the OpenAPI spec." lightbox="..\media\user-data-functions-portal-editor\portal-editor-openapi-spec.gif":::

1. Copy the generated specification. The specification includes:
   - All published functions in the User Data Functions item
   - Request and response schemas for each function
   - Authentication requirements (bearer token)
   - Standard HTTP error responses (400, 401, 403, 408, 413, 500)
   - Function summaries and descriptions (from docstrings)

### Improve the OpenAPI output with docstrings

The quality of your OpenAPI specification depends on the documentation in your function code. When systems like Azure API Management, AI agents, or API documentation tools consume your OpenAPI spec, they rely on clear descriptions to understand what your functions do.

The OpenAPI generator automatically extracts information from your function docstrings. Add these properties to your functions to create comprehensive API documentation:

- **Summary** - One-line explanation that appears in API catalogs and high-level views
- **Description** - Detailed explanation of what the function does, what inputs it expects, and what it returns

**Example function with proper documentation:**

```python
@udf.function()
def hello_fabric(name: str) -> str:
    """
    Summary: A Python function that prints your name and the time.
    Description: This function takes a string input and concatenates it with the current time 
    to give you a warm welcome to User Data Functions. Returns a string and provides a log entry.
    """
    logging.info('Python UDF trigger function processed a request.')
    return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!"
```

When you generate the OpenAPI specification, these docstring values populate the `summary` and `description` fields in the OpenAPI schema, making it easier for developers and systems to understand how to use your functions.

## Common uses for generated code

Once you've generated your invocation code, you can use it to integrate your functions into different scenarios:

**Fabric item integrations:**
- Call functions from Notebooks for data processing, machine learning, and exploratory analysis
- Orchestrate functions in Pipelines for data transformation workflows
- Trigger functions from Activator rules in response to real-time events

**External application integrations:**
- Invoke functions from web apps, mobile apps, or microservices using client application code
- Import OpenAPI specs into Azure API Management or other API gateways for centralized management
- Generate client SDKs using OpenAPI Generator for consistent integration across multiple systems
- Configure AI agents to discover and call your functions using the OpenAPI specification
- Test and validate functions using tools like Postman or Swagger UI

## Related content

- [Invoke User Data Functions from a Python application](./tutorial-invoke-from-python-app.md) - Complete walkthrough for calling functions from external Python apps
- [Fabric Notebook utilities](../notebook-utilities.md#user-data-function-udf-utilities) - Reference for calling functions from notebooks
- [Integration with Fabric pipelines](./create-functions-activity-data-pipelines.md) - Use functions in data pipelines
- [Python programming model](./python-programming-model.md) - Learn how to write functions with proper docstrings
