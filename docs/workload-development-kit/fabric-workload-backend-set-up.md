---
title: Build a Microsoft Fabric Workload Backend with Python and FastAPI
description: Learn how to implement Microsoft Fabric Workload APIs using Python FastAPI framework.
author: Natali Or
ms.author: natalior
ms.date: 2025
ms.topic: tutorial
ms.service: fabric
---

## Quick Start: Build a Microsoft Fabric Workload Backend in Python with FastAPI

In this tutorial, you'll learn how to set up a backend service for Microsoft Fabric workloads using Python and the FastAPI framework as example.
You'll learn how to create a Python backend for Microsoft Fabric workloads using FastAPI. You'll generate a FastAPI application from the Fabric API OpenAPI specification, implement the required endpoints, and get your service up and running quickly. This guide focuses on practical implementation steps to help you build a working Fabric-compatible backend service with minimal setup time.

## Prerequisites

- Python 3.8+ installed
- Java 8 or newer installed (required for OpenAPI Generator)
- Basic knowledge of Python
- Basic understanding of RESTful APIs
- Git (to clone the sample repository)
- Visual Studio Code or another code editor

## Step 1: Set up your development environment

First, set up your development environment with the required tools and packages.

1. **Clone the Microsoft Fabric developer sample repository**:

    ```bash
    git clone https://github.com/microsoft/Microsoft-Fabric-workload-development-sample
    cd Microsoft-Fabric-workload-development-sample
    ```bash

2. **Create a PythonBackend directory**:

    ```bash
    mkdir PythonBackend
    cd PythonBackend
    ```

3. **Create a Python virtual environment**:

    ```bash
    # Create a Python virtual environment for the project
    python -m venv .venv

    # Activate the virtual environment
    # Windows
    .venv\Scripts\activate

    # macOS/Linux
    source .venv/bin/activate
    ```bash

4. **Install the OpenAPI Generator CLI**:

    ```bash
    npm install @openapitools/openapi-generator-cli -g
    ```

    [Visit openapi documentation website for other install install options](https://openapi-generator.tech/docs/installation)

5. **Verify Java installation** (required for OpenAPI Generator):

    ```bash
    java -version
    ```

    Make sure you have Java 8 or newer installed. If not, download and install it from [Oracle's website](https://www.oracle.com/java/technologies/javase-downloads.html) or use OpenJDK.

## Step 2: Ensure Visual Studio Code uses your Python virtual environment

It's important to verify that Visual Studio Code is configured to use the Python interpreter from your virtual environment. This ensures all dependencies and packages are correctly isolated and available for your project.

Follow these steps to select the correct Python interpreter:

1. **Open your project in Visual Studio Code**.

2. **Open the Command Palette**:
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS).

3. **Select the Python interpreter**:
   - Type `Python: Select Interpreter` and select it from the list.
   - Choose the interpreter located in your virtual environment:
     - On Windows, select `.venv\Scripts\python.exe`.
     - On macOS/Linux, select `.venv/bin/python`.

4. **Verify your selection**:
   - After selecting, the active interpreter will appear in the status bar at the bottom of Visual Studio Code, showing something like:
     ```
     Python 3.10.x 64-bit ('.venv': venv)
     ```

5. **Open a new integrated terminal**:
   - Select `Terminal > New Terminal` from the menu.
   - The terminal should automatically activate your virtual environment, indicated by the environment name in parentheses:
     ```
     (.venv) C:\path\to\your\project>
     ```

> [!TIP]
> If your virtual environment doesn't appear in the interpreter list, restart Visual Studio Code and try again. Ensure you've opened Visual Studio Code from the correct project directory.

## Step 3: Generate the FastAPI project from OpenAPI specification

1. **Generate the FastAPI project**:

    ```bash
    openapi-generator-cli generate \
      -i ../Backend/src/Contracts/FabricAPI/Workload/swagger.json \
      -g python-fastapi \
      -o . \
      --additional-properties=packageName=fabric_api
    ```

2. **Install the required dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

> [!IMPORTANT]
    > On Windows, you may encounter an error with the `uvloop` package. If this happens:
    > 1. Edit your `requirements.txt` file
    > 2. Find the `uvloop` entry (which might look like `uvloop==0.17.0` or similar) and add the platform conditional to the end:
    > ```
    >uvloop==<existing version>; sys_platform != 'win32'
    > ```
    >    For example, if your file has `uvloop==0.17.0`, change it to `uvloop==0.17.0; sys_platform != 'win32'`
    > 3. Run `pip install -r requirements.txt` again
    >
    > This change ensures uvloop is only installed on non-Windows platforms.

## Step 4: Understand the generated code structure

The OpenAPI Generator creates a structured FastAPI project with the following key directories:

```
PythonBackend/
├── src/
│   └── fabric_api/
│       ├── apis/              # Generated API route definitions
│       │   ├── item_lifecycle_api.py
│       │   ├── jobs_api.py
│       │   └── endpoint_resolution_api.py
│       ├── impl/              # Where you'll implement controllers
│       │   └── __init__.py
│       ├── models/            # Data models for requests/responses
│       │   ├── create_item_request.py
│       │   └── ...
│       └── main.py            # FastAPI application entry point
├── tests/                     # Generated test files
└── requirements.txt           # Dependencies
```

- The `apis` directory contains the router definitions for each API endpoint
- The `models` directory contains Pydantic models for request and response objects
- The `impl` directory is where you'll implement your controller logic
- The `main.py` file sets up the FastAPI application

> [!NOTE]
> The generator creates stub files that need to be implemented with your business logic.

## Step 5: Implement the ItemLifecycle controller

Create a controller implementation that handles Fabric API requests. The controller inherits from the generated base class:

1. **Create `item_lifecycle_controller.py` in the `impl` directory**:

    ```python
    # filepath: src/fabric_api/impl/item_lifecycle_controller.py

    from fabric_api.apis.item_lifecycle_api_base import BaseItemLifecycleApi
    from fabric_api.models.get_item_payload_response import GetItemPayloadResponse
    from pydantic import Field, StrictStr
    from typing_extensions import Annotated
    from fastapi import HTTPException

    class ItemLifecycleController(BaseItemLifecycleApi):
        """
        Implementation of Item Lifecycle API methods.
        """
        
        async def item_lifecycle_create_item(
            self,
            workspaceId,
            itemType,
            itemId,
            activity_id,
            request_id,
            authorization,
            x_ms_client_tenant_id,
            create_item_request,
        ) -> None:
            """
            Implementation for creating a new item.
            """
            print(f"\n=== CREATE ITEM CALLED ===")
            print(f"Workspace ID: {workspaceId}")
            print(f"Item Type: {itemType}")
            print(f"Item ID: {itemId}")
            print(f"Display Name: {create_item_request.display_name}")
            print(f"Description: {create_item_request.description}")
            if create_item_request.creation_payload:
                print(f"Creation Payload: {create_item_request.creation_payload}")
            print("===========================\n")
            return
        
        async def item_lifecycle_delete_item(
            self,
            workspaceId,
            itemType,
            itemId,
            activity_id,
            request_id,
            authorization,
            x_ms_client_tenant_id,
        ) -> None:
            """
            Implementation for deleting an existing item.
            """
            print(f"Delete item called for itemId: {itemId}")
            return
        
        async def item_lifecycle_get_item_payload(
            self,
            workspaceId,
            itemType,
            itemId,
            activity_id,
            request_id,
            authorization,
            x_ms_client_tenant_id,
        ) -> GetItemPayloadResponse:
            """
            Implementation for retrieving the payload for an item.
            """
            print(f"Get item payload called for itemId: {itemId}")
            # Return a simple payload
            return GetItemPayloadResponse(item_payload={"sample": "data"})
        
        async def item_lifecycle_update_item(
            self,
            workspaceId,
            itemType,
            itemId,
            activity_id,
            request_id,
            authorization,
            x_ms_client_tenant_id,
            update_item_request,
        ) -> None:
            """
            Implementation for updating an existing item.
            """
            print(f"Update item called for itemId: {itemId}")
            return
    ```

## Step 6: Run the FastAPI application

Now you can run your FastAPI application. The recommended way to run it is:

### Windows PowerShell

```powershell
$env:PYTHONPATH="src"
uvicorn fabric_api.main:app --host 0.0.0.0 --port 8080
```

### Windows Command Prompt

```cmd
set PYTHONPATH=src
uvicorn fabric_api.main:app --host 0.0.0.0 --port 8080
```

### macOS/Linux

```bash
PYTHONPATH=src uvicorn fabric_api.main:app --host 0.0.0.0 --port 8080
```

---

Alternatively, you can run from the `src` directory:

```bash
cd src
python -m uvicorn fabric_api.main:app --host 0.0.0.0 --port 8000
```

> [!IMPORTANT]
> Setting `PYTHONPATH` is crucial for Python to find the modules correctly. This environment variable only affects the current terminal session.

## Step 7: Test the API

You can test your API using either curl commands or the built-in Swagger UI provided by FastAPI.

### Option 1: Using curl commands

Run the following command in your terminal:

```bash
curl -X POST "http://localhost:8080/workspaces/test-workspace/items/TestItemType/test-item-123" \
  -H "Content-Type: application/json" \
  -H "activity-id: test-activity-id" \
  -H "request-id: test-request-123" \
  -H "authorization: SubjectAndAppToken1.0 subjectToken=\"dummy-token\", appToken=\"dummy-app-token\"" \
  -H "x-ms-client-tenant-id: test-tenant-456" \
  -d '{
    "display_name": "Test Item",
    "description": "This is a test item created via curl",
    "creation_payload": {
      "key1": "value1",
      "key2": "value2",
      "nested": {
        "data": "example"
      }
    }
  }'
```

### Option 2: Using Swagger UI (Interactive Documentation)

FastAPI automatically generates interactive API documentation, allowing you to test your endpoints directly from your browser:

1. Open your browser and navigate to [`http://127.0.0.1:8080/docs`](http://127.0.0.1:8080/docs).
2. Locate the **POST** endpoint under the **ItemLifecycle** section:

   ```http
   POST /workspaces/{workspaceId}/items/{itemType}/{itemId}
   ```

3. Select the **Try it out** button.
4. Fill in the required parameters:
   - **workspaceId**: `test-workspace`
   - **itemType**: `TestItemType`
   - **itemId**: `test-item-123`
   - **activity-id**: `test-activity-id`
   - **request-id**: `test-request-123`
   - **authorization**: `SubjectAndAppToken1.0 subjectToken="dummy-token", appToken="dummy-app-token"`
   - **x-ms-client-tenant-id**: `test-tenant-456`
   - **Request body**:

     ```json

     {
       "display_name": "Test Item",
       "description": "This is a test item created via Swagger UI",
       "creation_payload": {
         "key1": "value1",
         "key2": "value2",
         "nested": {
           "data": "example"
         }
       }
     }

     ```

5. Click the **Execute** button to send the request.

You should see output in your server console similar to this:

```bash
=== CREATE ITEM CALLED ===
Workspace ID: test-workspace
Item Type: TestItemType
Item ID: test-item-123
Display Name: Test Item
Description: This is a test item created via Swagger UI
Creation Payload: {'key1': 'value1', 'key2': 'value2', 'nested': {'data': 'example'}}
===========================
```

You will also see the response details directly in the Swagger UI interface.

> [!TIP]
> Using Swagger UI is often easier and faster during development, as it provides a user-friendly interface for testing API endpoints without manually crafting curl commands.

## Step 8: Explore the API documentation

FastAPI automatically generates interactive API documentation:

1. Open your browser and navigate to `http://localhost:8080/docs`
2. You'll see a Swagger UI interface where you can explore and test all endpoints
3. Click on the "ItemLifecycle" section to see the create, get, update, and delete endpoints

![Swagger UI interface showing the Fabric API endpoints](media/fabric-api-swagger-ui.png)

## Step 8: Implement more advanced functionality

For a complete implementation, you would typically:

1. **Add service layer**: Create service classes to handle business logic, database operations, etc.

    ```python
    # src/fabric_api/services/storage_service.py
    class StorageService:
        async def create_item(self, workspace_id, item_type, item_id, item_data):
            """
            Store the item in a database or other persistent storage
            """
            # Implementation here
            pass

        async def get_item(self, workspace_id, item_type, item_id):
            """
            Retrieve an item from storage
            """
            # Implementation here
            pass
    ```

2. **Use dependency injection** in your controller:

    ```python
    # src/fabric_api/impl/item_lifecycle_controller.py
    from fabric_api.services.storage_service import StorageService

    class ItemLifecycleController(BaseItemLifecycleApi):
        def __init__(self):
            self.storage_service = StorageService()
        
        async def item_lifecycle_create_item(self, workspaceId, ...):
            # Use the service
            await self.storage_service.create_item(workspaceId, itemType, itemId, create_item_request)
    ```

3. **Add error handling**:

    ```python
    async def item_lifecycle_create_item(self, ...):
        try:
            # Your implementation
            await self.storage_service.create_item(...)
            return None
        except ValueError as e:
            # Client error
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            # Server error
            raise HTTPException(status_code=500, detail="Internal server error")
    ```

## Step 10: Run with Docker (optional)

For production deployments, you can use Docker:

```bash
# Build and run with docker-compose
docker-compose up --build
```

> [!TIP]
> Using Docker ensures consistent environment configuration across development and production.

## Conclusion

You've successfully created a Microsoft Fabric Workload API backend using Python with FastAPI. This implementation:

- Uses the OpenAPI Generator to create a FastAPI project
- Implements the necessary controllers for handling Fabric API requests

For a complete integration with Microsoft Fabric, you'll need to implement proper authentication handling, storage service, and additional business logic specific to your workload.

## Next steps

- Implement the remaining controllers (Jobs API, Endpoint Resolution API)
- Add proper authentication and authorization
- Connect to a database for persistent storage
- Set up logging and monitoring
- Implement unit and integration tests

## Related content

- [FastAPI documentation](https://fastapi.tiangolo.com/)
- [OpenAPI Generator documentation](https://openapi-generator.tech/)
- [Microsoft Fabric documentation](https://docs.microsoft.com/en-us/fabric/)
- [Python asyncio documentation](https://docs.python.org/3/library/asyncio.html)