---
title: Tutorial - Invoke user data functions from a Python application
description: Learn how to invoke user data functions from a Python console application.
ms.author: eur
ms.reviewer: sumuth
author: eric-urban
ms.topic: tutorial
ms.custom: freshness-kr
ms.date: 01/21/2026
ms.search.form: Fabric User data functions
---

# Tutorial: Invoke user data functions from a Python console application

You can invoke Fabric user data functions from external applications by sending HTTP requests to the function's public endpoint. This enables you to integrate your Fabric business logic into web apps, automation scripts, microservices, or any system outside the Fabric environment.

In this tutorial, you:

> [!div class="checklist"]
> - Register a Microsoft Entra application for authentication
> - Get the function's public URL and enable public access
> - Create a Python console application that calls the function
> - Understand the response schema and HTTP status codes

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/download) installed on your local machine.
- [Python 3.11](https://www.python.org/downloads/release/python-3110/) installed on your local machine.
- A [Microsoft Fabric account](https://www.microsoft.com/microsoft-fabric/getting-started). You can sign up for a free trial.
- A [Fabric workspace](../../fundamentals/create-workspaces.md).
- A published user data functions item. For instructions, see [Create user data functions in Visual Studio Code](./create-user-data-functions-vs-code.md) or [Create user data functions in the portal](./create-user-data-functions-portal.md).

## Create a Microsoft Entra app

To call user data functions from an external application, you need to register an application in Microsoft Entra ID. This app registration provides the credentials your Python application uses to authenticate.

1. Go to the [Microsoft Entra admin center](https://entra.microsoft.com/) and register an application using the steps described in [Quickstart: Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app).

1. The Microsoft Entra app **Application (client) ID** and **Directory (tenant) ID** values appear in the Summary box. Record these values because they're required later.

1. Under the *Manage* list, select **API permissions**, then **Add permission**.

1. Add the **PowerBI Service**, select **Delegated permissions**, and select **UserDataFunction.Execute.All** or **item.Execute.All** permissions. Confirm that admin consent isn't required.

1. Go back to the *Manage* setting and select **Authentication** > **Add a platform** > **Single-page application**.

1. For local development purposes, add `http://localhost:3000` under **Redirect URIs** and confirm that the application is enabled for the [authorization code flow with Proof Key for Code Exchange (PKCE)](/azure/active-directory/develop/v2-oauth2-auth-code-flow). Select the **Configure** button to save your changes. If the application encounters an error related to cross-origin requests, add the **Mobile and desktop applications** platform in the previous step with the same redirect URI.

1. Back to **Authentication**, scroll down to **Advanced Settings** and, under **Allow public client flows**, select **Yes** for *Enable the following mobile and desktop flows*.

## Create a console application

Now that you have an app registration, create a Python console application that authenticates and calls your user data function.

### Get the function URL to invoke

Each user data function has a unique public URL that serves as its REST API endpoint. Before you can call the function from an external application, you need to enable public access and get the URL.

To get the function URL:

1. In the Fabric portal, open your user data functions item.
1. Make sure you're in **Run only** mode, not **Develop** mode.
1. In the **Functions explorer**, hover over the name of the function and select the ellipsis (**...**).
1. Select **Properties**.
1. In the Properties pane, make sure **Public access** is enabled. If not, select the toggle to enable it.
1. Copy the **Public URL** for use in your Python application.

    :::image type="content" source="..\media\user-data-functions-python-programming-model\python-programming-model.png" alt-text="Screenshot showing the Properties pane with Public access enabled and the Public URL field." lightbox="..\media\user-data-functions-python-programming-model\python-programming-model.png":::

    > [!TIP]
    > If public access is already enabled, you can skip the Properties pane. In the **Functions explorer**, select the ellipsis (**...**) next to the function name and select **Copy Function URL**. This copies the same URL as the **Public URL** in the Properties pane.

1. In your application code, replace the `FUNCTION_URL` placeholder with the URL you copied.

### Set up your Python project

Create a Python project with a virtual environment and install the required dependencies.

1. Create a new folder for your Python app, for example `my-data-app`.
1. Open the folder in Visual Studio Code.
1. Open the **Command Palette** (**Ctrl+Shift+P**) and search for **Python: Create Environment**.
1. Select **venv** as the environment type.
1. Select **Python 3.11** as the interpreter version.
1. Open a new terminal in Visual Studio Code (**Ctrl+`**).
1. Activate the Python virtual environment:

    **Windows:**

    ```cmd
    .venv\Scripts\activate
    ```

    **macOS/Linux:**

    ```bash
    source .venv/bin/activate
    ```

1. Install the required Python libraries:

    ```bash
    pip install azure-identity requests
    ```

### Add the application code

Add the Python code that authenticates with Microsoft Entra ID and calls your user data function.

1. Create a file named `app.py` in your project folder.
1. Add the following code. Replace `<REPLACE WITH USER DATA FUNCTION URL>` with the public URL you copied earlier.

    ```python
    from azure.identity import InteractiveBrowserCredential
    import requests
    import json

    # Acquire a token using interactive browser authentication
    # This opens a browser window for the user to sign in with their Microsoft account
    credential = InteractiveBrowserCredential()
    scope = "https://analysis.windows.net/powerbi/api/user_impersonation"
    token = credential.get_token(scope)

    if not token.token:
        print("Error: Could not get access token")
        exit(1)

    # Prepare headers with the access token
    headers = {
        "Authorization": f"Bearer {token.token}",
        "Content-Type": "application/json"
    }

    FUNCTION_URL = "<REPLACE WITH USER DATA FUNCTION URL>"

    # Prepare the request data (modify to match your function's expected input)
    data = {"name": "John"}

    try:
        # Call the user data function public URL
        response = requests.post(FUNCTION_URL, json=data, headers=headers)
        response.raise_for_status()
        print(json.dumps(response.json(), indent=2))
    except Exception as e:
        print(f"Error: {e}")
    ```

    > [!NOTE]
    > This example uses `InteractiveBrowserCredential` for simplicity, which opens a browser for interactive sign-in. For production applications, pass the `client_id` and `tenant_id` from your registered Microsoft Entra application to `InteractiveBrowserCredential`, or use a different credential type such as `ClientSecretCredential` for service-to-service authentication. For more information, see [Azure Identity client library for Python](/python/api/overview/azure/identity-readme). 

## Run the application

To run the application, use the following command in the terminal:

```bash
python app.py
```

A browser window opens for you to sign in with your Microsoft account. After authentication, the application calls your user data function and prints the response.

To debug the application in Visual Studio Code, set breakpoints by clicking in the gutter next to the line numbers, then press **F5** to start debugging. For more information, see [Python debugging in Visual Studio Code](https://code.visualstudio.com/docs/languages/python#_debugging).

## Output schema

When you invoke a user data function from an external application, the response body follows this JSON schema:

```json
{
  "functionName": "hello_fabric",
  "invocationId": "1234567890",
  "status": "Succeeded",
  "output": "Hello, John!",
  "errors": []
}
```

The response includes these properties:

- **functionName**: The name of the function that was executed.
- **invocationId**: A unique identifier for this specific function execution. Useful for troubleshooting and correlating logs.
- **status**: The outcome of the function's execution. Possible values are `Succeeded`, `BadRequest`, `Failed`, `Timeout`, and `ResponseTooLarge`.
- **output**: The return value of your function. The data type and structure depend on what your function returns. For example, if your function returns a string, `output` is a string. If your function returns a dictionary, `output` is a JSON object.
- **errors**: A list of errors captured during execution. Each error includes a `name`, `message`, and optional `properties` object containing key-value pairs with more details. Empty when the function succeeds.

## Response codes

The function returns the following HTTP codes as a result of the execution.

| **Response code**| **Message** | **Description** |
| ------------------- | ------------------------ |--|
| 200 | Success | The request was successful. |
| 400 | Bad Request | The request wasn't valid. This response could be due to missing or incorrect input parameter values, data types, or names. This response could also be caused by public access being turned off for a function. |
| 403 | Forbidden | The response was too large and the invocation failed.|
| 408 | Request Timeout | The request failed due to the execution taking longer than the maximum allowed time. |
| 409 | Conflict | The request couldn't be completed due to a conflicting state. This error could be caused by an unhandled exception or an error with user credentials. |
| 422 | Bad Request | The request failed due to a UserThrownError raised in the function.|
| 500 | Internal Server Error | The request failed due to an internal error in the service.|

## Related content

- [User data functions overview](./user-data-functions-overview.md)
- [Create user data functions in the portal](./create-user-data-functions-portal.md)
- [User data functions programming model](./python-programming-model.md)
- [User data functions samples on GitHub](https://github.com/microsoft/fabric-user-data-functions-samples)
