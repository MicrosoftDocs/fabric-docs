---
title: Set Up a Microsoft Fabric Workload Back End by Using the OpenAPI Specification
description: Learn how to generate and run a Fabric workload back end based on the Swagger file included in our sample.
author: natali0r
ms.author: natalior
ms.date: 06/10/2025
ms.topic: how-to
ms.service: fabric
---
# Set up a Microsoft Fabric workload back end by using the OpenAPI Specification (Swagger)

A Microsoft Fabric workload back end is a service that implements the Fabric API contract, which enables custom workloads to integrate seamlessly with the Microsoft Fabric platform. This back end handles the lifecycle operations for your workload items, including creation, retrieval, updates, and deletion.

This article guides you through rapidly generating a Fabric workload back end directly from an OpenAPI (Swagger) definition. This API-first approach enables you to quickly prototype and validate back-end logic independently, even before integrating it into the complete Microsoft Fabric development environment. The principles demonstrated here are broadly applicable, regardless of which specific tools or languages you choose.

By the end of this article, you'll be able to:

- Generate a Fabric workload back end based on the Swagger file included in a sample.
- Understand the basic structure and components of a Fabric workload back end.
- Run and test your generated back end locally by using Python and FastAPI.

In this article, you implement the following core operations from the item lifecycle. These operations correspond to the endpoints defined in the Fabric API Swagger file.

- **Create item**: Initialize new workload items.
- **Get item payload**: Retrieve item configuration.
- **Update item**: Modify existing items.
- **Delete item**: Remove items from the workspace.

This article specifically demonstrates the process by using Python and FastAPI with the OpenAPI Generator tool. However, OpenAPI Generator itself supports [numerous programming languages and frameworks](https://openapi-generator.tech/docs/generators#server-generators). You're free to choose any OpenAPI-compatible code generation tool or method that suits your team's expertise and project needs to create your back-end skeleton.

## Prerequisites

Before you start the procedures in this article, ensure that you have the following items.

### Required knowledge

- Understanding of the Microsoft Fabric item lifecycle. Read [Item lifecycle management](item-lifecycle.md).

  This understanding is crucial for this article. The generated back end implements the lifecycle operations (create, read, update, delete) for Fabric items, as defined in the [item lifecycle documentation](item-lifecycle.md).
- Basic knowledge of Python and RESTful APIs.
- Familiarity with Microsoft Fabric workload concepts.

### Required software

- Python 3.8+. [Download Python](https://www.python.org/downloads/).
- Node.js, which is required if you want to install the OpenAPI Generator CLI via npm. [Download Node.js](https://nodejs.org/).
- Git, to clone the sample repository. [Download Git](https://git-scm.com/downloads).
- A code editor, such as Visual Studio Code, PyCharm, or your preferred integrated development environment (IDE).

#### Java for OpenAPI Generator

The OpenAPI Generator CLI requires Java as a runtime environment. You don't need to write Java code. You need it only to run the generator tool.

The minimum Java version required is Java 8. We recommend that you use a supported long-term support (LTS) version, such as Java 17 or Java 21.

To install Java:

1. Install the Microsoft build of OpenJDK (recommended). Follow the instructions for your operating system in [Install the Microsoft Build of OpenJDK](/java/openjdk/install).

2. Verify your installation. Open a terminal or command prompt and run:

   ```bash
   java -version
   ```

   You should see output similar to this example:

   ```bash
   openjdk version "17.0.12" 2024-07-16 LTS
   OpenJDK Runtime Environment Microsoft-10377968 (build 17.0.12+7-LTS)
   OpenJDK 64-Bit Server VM Microsoft-10377968 (build 17.0.12+7-LTS, mixed mode, sharing)
   ```

If you already have Java installed from another vendor (for example, Oracle, Eclipse Temurin, or Amazon Corretto) with version 8 or later, you can use your existing installation.

## Step 1: Set up your development environment

First, set up your development environment with the required tools and packages:

1. Clone the Microsoft Fabric developer sample repository:

   ```bash
   git clone https://github.com/microsoft/Microsoft-Fabric-workload-development-sample
   cd Microsoft-Fabric-workload-development-sample
   ```

2. Create a `PythonBackend` directory:

   ```bash
   mkdir PythonBackend
   cd PythonBackend
   ```

3. Create a Python virtual environment:

   ```bash
   # Create a Python virtual environment for the project
   python -m venv .venv

   # Activate the virtual environment
   # Windows
   .venv\Scripts\activate

   # macOS/Linux
   source .venv/bin/activate
   ```

4. Install the OpenAPI Generator CLI:

   ```bash
   npm install @openapitools/openapi-generator-cli -g
   ```

   For alternative installation methods, see the [OpenAPI Generator installation documentation](https://openapi-generator.tech/docs/installation).

## Step 2: Verify that your Python virtual environment is active

After you create your virtual environment, it's crucial to ensure that you're using the correct Python interpreter. This approach keeps your project dependencies isolated and properly managed.

### Verify activation of the virtual environment

Confirm that your virtual environment is activated. You should see `(.venv)` at the beginning of your terminal prompt.

If the virtual environment isn't activated, run:

```bash
# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate
```

### Verify that your virtual environment's Python interpreter is active

Confirm that your terminal is using the Python interpreter from your virtual environment, not your system's global Python installation.

Run the following command:

```bash
# Display the path to the active Python interpreter
python -c "import sys; print(sys.executable)"
```

Expected output should point to your virtual environment:

```bash
- Windows: C:\path\to\project\PythonBackend\.venv\Scripts\python.exe
- macOS/Linux: /path/to/project/PythonBackend/.venv/bin/python
```

> [!IMPORTANT]
> If the output points to a different location (such as your system-wide Python installation), your virtual environment isn't activated correctly. Revisit [the activation task](#verify-activation-of-the-virtual-environment) and ensure that your terminal prompt appears with `(.venv)`.

### Configure your IDE (optional)

Most modern IDEs automatically detect Python virtual environments. However, you might need to manually select the interpreter within your IDE settings.

<details>
<summary><b>Example: Visual Studio Code configuration</b></summary>

1. Open your project folder in Visual Studio Code.

2. Open the command palette:

   - Windows or Linux: `Ctrl+Shift+P`
   - macOS: `Cmd+Shift+P`
3. Search for and select `Python: Select Interpreter`.

4. Choose the interpreter located in your virtual environment:

   - Windows: `.venv\Scripts\python.exe`
   - macOS or Linux: `.venv/bin/python`
5. Verify your selection on the status bar at the bottom of Visual Studio Code. It should display something like:

   ```
   Python 3.x.x ('.venv': venv)
   ```

6. Open a new integrated terminal (**Terminal** > **New Terminal**). Your virtual environment should be activated automatically, as indicated by `(.venv)` in the prompt.

</details>

### Troubleshoot your virtual environment

Always ensure that your virtual environment is activated before you install dependencies or run your application. The `(.venv)` prefix in your terminal confirms the activation status. If you encounter import errors or missing packages, verify that you're using the correct Python interpreter by running the previously mentioned verification commands.

> [!TIP]
> If your IDE doesn't automatically detect your virtual environment, or if the interpreter path doesn't match your virtual environment, try these solutions:
>
> - Ensure that you open your IDE from the correct project directory.
> - Restart your IDE and try selecting the interpreter again.
> - Confirm that your virtual environment is activated in your terminal.

## Step 3: Generate the FastAPI project from the OpenAPI specification

Use the OpenAPI Generator CLI to create a Python FastAPI project from the Fabric API's Swagger specification.

### Run the generation command

Run the following command from your `PythonBackend` directory:

```bash
openapi-generator-cli generate -i ../Backend/src/Contracts/FabricAPI/Workload/swagger.json -g python-fastapi -o . --additional-properties=packageName=fabric_api
```

This command instructs the OpenAPI Generator CLI to perform the following actions:

| Parameter | Value | Description | Required | Purpose | Reference |
|---|---|---|---|---|---|
| `-i` | `[InputSpecPath]`<sup>1</sup> | **Input specification**:<br>Specifies the path to the source OpenAPI (Swagger) definition file | Required | Points to the Fabric API contract that defines all endpoints, models, and operations | [OpenAPI Specification](https://swagger.io/specification/) |
| `-g` | `python-fastapi`<sup>2</sup> | **Generator name**:<br>Tells the tool to use the `python-fastapi` generator to create server-side Python code | Required | Determines the output framework and language for the generated back-end code | [Python FastAPI Generator](https://openapi-generator.tech/docs/generators/python-fastapi)<br>[Explore all available server generators](https://openapi-generator.tech/docs/generators#server-generators) |
| `-o` | `.` | **Output directory**:<br>Instructs the generator to place the output files in the current directory | Required | Specifies where the generated project structure is created | Not applicable |
| `--additional-properties` | `packageName=fabric_api` | **Generator-specific options**:<br>Sets the Python package name for the generated code to `fabric_api` | Optional | Customizes the generated code structure and naming conventions | [Generator options](https://openapi-generator.tech/docs/generators/python-fastapi#config-options) |

<sup>1</sup> For `[InputSpecPath]`, the path is `../Backend/src/Contracts/FabricAPI/Workload/swagger.json`.

<sup>2</sup> For the generator (`-g`) parameter, this article uses the value `python-fastapi` as an example. OpenAPI Generator supports numerous server-side code generators for various languages and frameworks. You can replace `python-fastapi` with your desired generator. For a comprehensive list, refer to the [OpenAPI Server Generators documentation](https://openapi-generator.tech/docs/generators#server-generators).

### Install the required dependencies

To install dependencies, use this command:

```bash
pip install -r requirements.txt
```

On Windows, you might encounter an error with the `uvloop` package. If that happens:

1. Open your `requirements.txt` file.

2. Find the `uvloop` entry, which might look similar to `uvloop==0.17.0`. Add the platform conditional to the end:

   ```
   uvloop==<existing version>; sys_platform != 'win32'
   ```

   For example, if your file has `uvloop==0.17.0`, change it to `uvloop==0.17.0; sys_platform != 'win32'`.

3. Run `pip install -r requirements.txt` again.

This change ensures that `uvloop` is installed only on non-Windows platforms.

## Step 4: Understand the generated code structure

OpenAPI Generator creates a structured FastAPI project with the following key directories:

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

- The `apis` directory contains the router definitions for each API endpoint.
- The `models` directory contains Pydantic models for request and response objects.
- The `impl` directory is where you implement your controller logic.
- The `main.py` file sets up the FastAPI application.

## Step 5: Implement the ItemLifecycle controller

Create a controller implementation that handles Fabric API requests. The controller inherits from the generated base class.

Create `item_lifecycle_controller.py` in the `impl` directory:

```python
# file path: src/fabric_api/impl/item_lifecycle_controller.py

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

## Step 6: Configure and run the FastAPI application

Before you run your FastAPI application, ensure that the port configuration aligns with the Microsoft Fabric development environment. This step is crucial for proper integration with the Fabric development gateway.

### Understand the port configuration

When you're developing a Microsoft Fabric workload, the development gateway routes API requests to your back end. This configuration requires:

- Your back end to run on a specific port (default: 5000).
- The port to match the `WorkloadEndpointURL` value in your workload configuration.
- All Fabric API calls to be routed through the development gateway to this endpoint.

### Configure the workload endpoint (for Fabric integration)

When you integrate with the full Microsoft Fabric development environment, you need to configure the workload endpoint URL. This configuration tells the development gateway where to forward API requests.

1. Locate or create your workload configuration file (`workload-dev-mode.json`):

   - The default location is `C:\workload-dev-mode.json`.
   - You can create this file later, when you're setting up the full Fabric development environment.

2. Ensure that the `WorkloadEndpointURL` value matches your back-end port:

   ```json
   {
       "WorkloadEndpointURL": "http://localhost:5000",
       // ... other configuration settings
   }
   ```

For complete workload configuration details, see the [documentation for getting started with the extensibility back end](extensibility-back-end.md#get-started).

### Run the FastAPI application

Start your FastAPI application on port 5000 (or your chosen port that matches the configuration).

For Windows PowerShell:

```powershell
$env:PYTHONPATH="src"
uvicorn fabric_api.main:app --host 0.0.0.0 --port 5000
```

For a Windows command prompt:

```cmd
set PYTHONPATH=src
uvicorn fabric_api.main:app --host 0.0.0.0 --port 5000
```

For macOS or Linux:

```bash
PYTHONPATH=src uvicorn fabric_api.main:app --host 0.0.0.0 --port 5000
```

> [!IMPORTANT]
> Setting `PYTHONPATH` is crucial for Python to find the modules correctly. This environment variable affects only the current terminal session.

Alternatively, you can run the command from the `src` directory:

```bash
cd src
python -m uvicorn fabric_api.main:app --host 0.0.0.0 --port 5000
```

> [!NOTE]
> Port 5000 is often used as a default in Microsoft Fabric workload development samples. If you need to use a different port:
>
> 1. Change the `--port` value in your `uvicorn` command (for example, `--port 5001`).
> 2. To match this new port, update the `WorkloadEndpointURL` value in your `workload-dev-mode.json` file (for example, `"http://localhost:5001"`).
>
> Ensure that another application in your system isn't already using your chosen port.

### Verify that your back end is accessible

After you start the application, verify that it's running correctly:

1. Check the console output. It should be similar to this example:

   ```bash
   INFO:     Uvicorn running on http://0.0.0.0:5000 (Press CTRL+C to quit)
   INFO:     Started reloader process [xxxx]
   INFO:     Started server process [xxxx]
   INFO:     Waiting for application startup.
   INFO:     Application startup complete.
   ```

2. Test the API documentation:

   1. Open your browser and go to `http://localhost:5000/docs`.
   1. Confirm that the Swagger UI displays all available endpoints.

## Step 7: Test the API

You can test your API by using either Curl commands or the built-in Swagger UI that FastAPI provides.

### Curl

Run the following command in your terminal:

```bash
curl -X POST "http://localhost:5000/workspaces/test-workspace/items/TestItemType/test-item-123" \
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

### Swagger UI

FastAPI automatically generates interactive API documentation, so you can test your endpoints directly from your browser:

1. Open your browser and go to `http://localhost:5000/docs`.

2. In the `ItemLifecycle` section, locate the `POST` endpoint:

   ```http
   POST /workspaces/{workspaceId}/items/{itemType}/{itemId}
   ```

3. Select the **Try it out** button.

4. Fill in the required parameters:

   - `workspaceId`: `test-workspace`
   - `itemType`: `TestItemType`
   - `itemId`: `test-item-123`
   - `activity-id`: `test-activity-id`
   - `request-id`: `test-request-123`
   - `authorization`: `SubjectAndAppToken1.0 subjectToken="dummy-token", appToken="dummy-app-token"`
   - `x-ms-client-tenant-id`: `test-tenant-456`

   For the request body, use the following code:

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

5. Select the **Execute** button to send the request.

   Your server console displays output similar to the following messages:

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

   The response details also appear directly in the Swagger UI.

   > [!TIP]
   > Using the Swagger UI is often easier and faster during development, because it provides a user-friendly interface for testing API endpoints without manually crafting Curl commands.

## Step 8: Explore the API documentation

FastAPI automatically generates interactive API documentation:

1. Open your browser and go to `http://localhost:5000/docs`.

2. On the Swagger UI that appears, you can explore and test all endpoints.

3. To see the create, get, update, and delete endpoints, select the `ItemLifecycle` section.

The following image shows an example of the Swagger UI with the Fabric API endpoints.

:::image type="content" source="./media/back-end-set-up/fabric-api-swagger-ui.png" alt-text="Screenshot of parameters on the Swagger interface." lightbox="./media/back-end-set-up/fabric-api-swagger-ui.png":::

## Step 9: Implement more advanced functionality

The previous steps provided a basic example of how to implement the `ItemLifecycle` API by using Python with FastAPI. Remember, this article is a foundational example that demonstrates only the core concepts. For a robust, production-quality back end, you typically implement more functionality, such as:

- Create service classes to handle business logic, database operations, and other elements of a service layer:

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

- Use dependency injection in your controller:

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

- Add error handling:

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

Here are more considerations for a robust back end:

- **Implementation of the remaining controllers**: For example, implement the Jobs API and the Endpoint Resolution API.
- **Authentication and authorization**: Help secure your endpoints by validating tokens and permissions. For more information, see [Back-end authentication and authorization overview](back-end-authentication.md).
- **Persistent storage**: Integrate with databases or other storage solutions for data persistence.
- **Logging and monitoring**: Implement comprehensive logging and monitoring to track application health and performance.
- **Testing**: Write unit and integration tests to help ensure reliability and correctness.

## Conclusion

You now successfully set up a Microsoft Fabric workload API back end by using Python with FastAPI. This implementation:

- Uses the OpenAPI Generator tool to create a FastAPI project.
- Implements the necessary controllers for handling Fabric API requests.

This article is a basic example that demonstrates how to implement an API for `ItemLifecycle` by using Python. More enhancements and considerations, such as those outlined in [Step 9: Implement more advanced functionality](#step-9-implement-more-advanced-functionality), are necessary to build a high-quality, robust, and secure back end that's suitable for a production environment.

A complete integration with Microsoft Fabric requires implementing proper authentication handling, persistent storage, comprehensive error handling, and custom business logic that's specific to your workload.

## Related content

- [Microsoft Fabric documentation](/fabric/)
- [Workload Development Kit documentation](/fabric/workload-development-kit/)
- [FastAPI documentation](https://fastapi.tiangolo.com/)
- [OpenAPI Generator documentation](https://openapi-generator.tech/)
- [Python asyncio documentation](https://docs.python.org/3/library/asyncio.html)
