---
title: Tutorial - Invoke User data functions from a Python application
description: Learn how to invoke user data functions from a python web application
ms.author: sumuth
author: mksuni
ms.topic: quickstart
ms.date: 03/27/2025
ms.search.form: Fabric Data Functions
---

# Tutorial - Invoke User data functions from a Python application

To invoke User data functions(Preview) from a front-end app in python, you can send HTTP requests to the function endpoint that needs to be executed. In this quickstart you will learn how to setup a Python app using VS Code. 

## Pre-requisites
1. Install VS Code. Download Python 3.11 on your local machine.
2. Create a [Microsoft Fabric Account for free](https://www.microsoft.com/microsoft-fabric/getting-started) if yu dont have one. 
3. [Create a workspace](https://learn.microsoft.com/fabric/get-started/create-workspaces)
4. Create a user data functions item and publish. See [how to create in VS Code](./create-user-data-functions-in-vs-code.md) or [how to create in portal](./create-user-data-functions-in-portal.md). Publish the changes so its ready to be invoked. 

## Create a front-end application to invoke the function

1. Function must be publicly accessible. Select properties and enable **Public access**. Make a note of the **Public URL** to use in your python application. 

2. Create a new folder for your python app,for example **my-data-app**. Open the folder in VS Code. 
3. Setup Python virtual environment in  VS Code. To create local environments in VS Code, you can open the **Command Palette (Ctrl+Shift+P)**, search for the Python: Create Environment command, and select it.
    - The command presents a list of environment types and select **Venv**.
    - Select thePython interpreter to be **Python 3.11** version. 

3. In VS Code terminal, activate the virtual environment.  Run the following.
    ```
    venv\Scripts\activate.bat
    ```
4. Run the following to install python libraries needed for this example.

    ```python 
    pip install azure-identity, requests 
    ```
   
5. Create a `app.py` file and use the code below to invoke the User data function. 


    ```python
    from azure.identity import InteractiveBrowserCredential
    import requests
    import json

    # Acquire a token
    # DO NOT USE IN PRODUCTION.
    # Below code to acquire token is for development purpose only to test the GraphQL endpoint
    # For production, always register an application in a Microsoft Entra ID tenant and use the appropriate client_id and scopes
    # https://learn.microsoft.com/en-us/fabric/data-engineering/connect-apps-api-graphql#create-a-microsoft-entra-app

    app = InteractiveBrowserCredential()
    scp = 'https://analysis.windows.net/powerbi/api/user_impersonation'
    result = app.get_token(scp)

    if not result.token:
        print('Error:', "Could not get access token")

    # Prepare headers
    headers = {
        'Authorization': f'Bearer {result.token}',
        'Content-Type': 'application/json'
    }

    FUNCTION_URL = '<REPLACE WITH USER DATA FUNCTION URL>'

    # Prepare the request data
    data = '{"name": "John"}'  # JSON payload to send to the Azure Function
    headers = {
        #  "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
            }

    try:   
    # Call the User data function public URL 
    response = requests.post(FUNCTION_URL, json=data, headers=headers)
    response.raise_for_status()  
    print(json.dumps(response.json()))
    except Exception as e:
    print({"error": str(e)}, 500)

    if __name__ == "__main__":
        app.run(debug=True)

    ```

## Debugging and testing 
Debug the application in VS Code using python debugger. Add breakpoints if needed to debug if any issues. [Learn more](https://code.visualstudio.com/docs/languages/python#_debugging)

## Next steps
The above example is for **development only** . Update the application to use Microsoft Entra ID authentication before using the application for production use case. 