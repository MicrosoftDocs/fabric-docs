---
title: Automate the creation of a real-time map using REST APIs
description: Learn how to automate the creation of a real-time map that uses an Eventstream and Eventhouse with the Fabric REST API and Python.
ms.reviewer: smunk, sipa
ms.service: fabric
ms.topic: tutorial
ms.custom: mvc
ms.date: 05/25/2026
---

# Tutorial: Automate the creation of a real-time map using REST APIs

Fabric Maps can visualize **real-time geospatial data** by connecting to **Eventhouse datasets** that are continuously updated through Eventstream ingestion.

Unlike static scenarios that use files stored in a Lakehouse, this tutorial demonstrates a **streaming, event-driven architecture** where:

- Events are ingested into an Eventhouse  
- Data is queried using Kusto Query Language (KQL)  
- A map dynamically refreshes as new data arrives  

This tutorial focuses on **automating the end-to-end workflow** using Fabric REST APIs and Python, allowing you to provision resources and configure a real-time map experience programmatically. For static data scenarios using Lakehouse files, see [Create a map using REST API with Python](tutorial-create-fabric-map-python.md).

In this tutorial, you learn how to build and automate a real-time geospatial solution in Microsoft Fabric using Eventstream, Eventhouse, and KQL.

> [!div class="checklist"]
>
> Using the Fabric REST API, you:
>
> - Create an Eventhouse and KQL database
> - Create an Eventstream to ingest data into the Eventhouse
> - Create a map with an inline definition that references Eventhouse data
> - Configure a map layer with periodic refresh for real-time updates
> - Seed initial events so the map displays data immediately

To simulate continuous streaming and watch the map update in near real time, complete this tutorial first, then continue with the follow-up [Tutorial: Simulate real-time data ingestion into a Fabric map](tutorial-simulate-real-time-data-ingestion.md), which builds directly on the Eventhouse, Eventstream, KQL function, and Map you create here.

## Scenario overview: Real-time asset tracking

This tutorial is based on a **real-time asset tracking scenario**, similar to the fleet tracking scenario used in the original Fabric Maps [Tutorial: Build real-time work order routing with Fabric Maps](tutorial-real-time-work-order-routing-application.md).

In this scenario:

- Vehicles periodically emit location updates
- Location events are ingested into an Eventhouse
- A map displays the latest vehicle positions and updates automatically as new events arrive

This pattern is representative of common real-time operational use cases, such as:

- Fleet tracking  
- Work order dispatching  
- Asset and equipment monitoring  

Microsoft Fabric uses **Eventstream** and **Eventhouse** to ingest, process, and analyze streaming data in near real time, making it possible to visualize live operational data directly on a map.

This tutorial focuses on automating this scenario using REST APIs rather than configuring it manually in the Fabric user interface.

## Prerequisites

- Python 3.9+
- A Fabric workspace ID
- Permissions to call Fabric REST APIs (for example, `Item.ReadWrite.All`)  

## Create the seed data file (initial map data)

To ensure the map displays data immediately after provisioning, the script sends a small set of seed events to the Eventstream.

1. Create a new file in the same directory as your Python script: **vehicle_locations_seed.csv**
1. Paste the following content:

```
VehicleId,Latitude,Longitude,EventTime
V-001,47.6101,-122.3344,2026-01-01T10:00:00Z
V-002,47.6150,-122.3200,2026-01-01T10:00:00Z
V-003,47.6205,-122.3493,2026-01-01T10:00:00Z
V-004,47.6050,-122.3300,2026-01-01T10:00:00Z
```

## Authentication

This tutorial uses DefaultAzureCredential, which can authenticate using several local/dev credentials sources. For first-time readers, the simplest approach is Azure CLI sign-in.

### Authenticate locally (recommended for first run)

1. Open a terminal.
1. Run:

```azurecli
az login
```

`DefaultAzureCredential` can use your signed-in identity to acquire access tokens for Fabric REST APIs.

> [!TIP]
> About `https://api.fabric.microsoft.com/.default`
> This value is a **token request scope**, not a URL that you call directly. It tells Microsoft Entra that the access token should be issued for the **Microsoft Fabric REST API** and should include **all Fabric permissions that are already granted** to the authenticated identity (such as Item.ReadWrite.All or Workspace.ReadWrite.All).
>
> The `.default` scope is used only during token acquisition and is never sent to Fabric REST API endpoints.
>
> For more information about how the `.default` scope works in the Microsoft identity platform, see [Scopes and permissions in the Microsoft identity platform](/entra/identity-platform/scopes-oidc).

### Sign in to Microsoft Fabric (recommended)

Before you run this tutorial, we recommend signing in to Microsoft Fabric at least once:

```http
https://app.fabric.microsoft.com
```

Signing in ensures that your Fabric identity, workspace role membership, and capacity assignments are fully provisioned before acquiring a Microsoft Entra access token programmatically.

This step is especially helpful if:

- You're new to Microsoft Fabric
- The workspace was recently created
- Your role assignment was added recently

> [!NOTE]
> This tutorial authenticates using Microsoft Entra ID via `DefaultAzureCredential`. Fabric REST APIs don't require a browser session, but signing in to the Fabric web experience can prevent first‑run authorization issues caused by delayed role provisioning. 

## Step 1—Create a new Python project file

In this step, you create a blank Python file that you build up section-by-section.

Create a new file named:

```
create_realtime_map.py
```

Open the file in your editor.

## Step 2—Install required libraries and add required import statements

In this step, you install the dependencies and add the imports your script uses.

### Install required libraries

Run:

```
pip install httpx azure-identity azure-eventhub
```

#### What each library is for

- **httpx**: makes HTTP requests to the Fabric REST APIs.
- **azure-identity**: provides DefaultAzureCredential for Microsoft Entra authentication.
- **azure-eventhub**: enables sending events to Azure Event Hubs for real-time data streaming.

### Add import statements to your .py file

At the top of **create_realtime_map.py**, add:

```python
import csv
import os
import base64
import json
import time
import uuid
import httpx
from azure.identity import DefaultAzureCredential
from azure.eventhub import EventHubProducerClient, EventData
from azure.eventhub.exceptions import EventHubError
```

> [!NOTE]
> `EventHubError` is used later by the seeding helper to narrow exception handling around Event Hub send operations.

## Step 3—Add a configuration section

In this step, you define the variables your application uses, including workspace ID and resource names.

Add the following below the [import](#add-import-statements-to-your-py-file) statements:

```python
# =========================================================
# Configuration (centralized)
# =========================================================

class Config:
    """
    Central configuration object for the tutorial.

    Why this exists:
    - Keeps all "things you might change" in one place (workspace ID, names, toggles).
    - Lets step functions accept a single cfg object rather than many parameters.
    - Makes the tutorial easier to teach: you introduce Config once, then build functions.

    Tip:
    - In real projects, you might load these values from env vars or a JSON file.
    - For tutorial clarity, we keep them explicit and readable.
    """
    def __init__(self):
        # Workspace
        self.workspace_id = os.environ.get("FABRIC_WORKSPACE_ID", "")
        if not self.workspace_id:
            raise RuntimeError("Set FABRIC_WORKSPACE_ID environment variable before running the script.")

        # Resource display names / descriptions
        self.eventhouse_display_name = "eh_realtime_locations"
        self.eventhouse_description = "Stores streaming location events for a Fabric Maps real-time tutorial"

        self.eventhouse_table_name = "VehicleLocations"
        self.kql_function_name = "LatestVehicleLocations"

        self.eventstream_display_name = "es_realtime_locations"
        self.eventstream_description = "Streams events into an Eventhouse table (created via Eventstream REST API)"

        self.map_display_name = "My Real-Time Fabric Map"
        self.map_description = "Created using Fabric Maps REST API (Eventhouse + Eventstream + Kusto function)"

        # Map refresh
        self.refresh_interval_ms = 5000

        # Seed data (initial map data)
        self.seed_csv_path = os.path.join(os.path.dirname(__file__), "vehicle_locations_seed.csv")
        
        # Will be provided interactively after Eventstream is created
        self.eventhub_connection_string = os.environ.get("EVENTHUB_CONNECTION_STRING", "")
```

### Set the workspace ID using an environment variable

Instead of hardcoding the workspace ID directly in the script, this tutorial uses an environment variable. This approach improves security and makes it easier to reuse the script across environments without modifying the code.

Prior to running this script, you'll need to create an environment variable named `FABRIC_WORKSPACE_ID`.

#### Set the environment variable using Windows PowerShell

Run the following in PowerShell:

```powershell
$env:FABRIC_WORKSPACE_ID="<WORKSPACE_ID>"
```

To confirm the variable is set:

```powershell
echo $env:FABRIC_WORKSPACE_ID
```

This sets the variable for the current terminal session only. 

##### Set a persistent environment variable (Windows)

To make the variable available in future sessions:

1. Open **System Properties**
1. Select **Advanced system settings**
1. Choose **Environment Variables**
1. Under **User variables**, select **New**
1. Enter:
    - Name: FABRIC_WORKSPACE_ID
    -Value: your workspace ID
1. Select OK to save
1. Close and reopen your terminal before running the script again.

#### Set the environment variable in macOS or Linux

Run:

```
export FABRIC_WORKSPACE_ID="<WORKSPACE_ID>"
```

To make it persistent, add the same line to your shell profile (for example, ~/.bashrc or ~/.zshrc).

To confirm the variable is set:

```
echo $FABRIC_WORKSPACE_ID
```

## Step 4—Add helper functions

This step adds reusable helper functions that keep the "end-to-end flow" readable:

- **Auth helpers**: build headers for Fabric REST APIs
- **FabricClient**: lightweight wrapper for consistent API calls
- **LRO handler**: poll long-running operations using `Location` / `x-ms-operation-id` / `Retry-After`, including 200-with-Running responses and Power BI cluster endpoints
- **Definition payload helper**: base64 encode map.json for inline definitions
- **Resolve Eventhouse ID**: retrieves or reuses an Eventhouse resource
- **Resolve Eventstream ID**: retrieves an Eventstream ID after asynchronous creation
- **Eventstream connection helper**: prompts for the Custom endpoint connection string
- **Seed helper**: sends initial events with retry logic to ensure ingestion succeeds
- **KQL database readiness helper**: waits for the KQL database to become available to Fabric Maps
- **Map ID resolver**: resolves the map ID after asynchronous creation

> [!NOTE]
> This tutorial uses two types of APIs:
>
> - **Fabric REST APIs (control plane)**: used to create Eventhouse, Eventstream, and Map resources
> - **Kusto management API (data/query plane)**: used to create and manage KQL functions inside the Eventhouse

### Create authentication helper functions

Fabric REST APIs require a Microsoft Entra access token (bearer token) for authentication.  

In this tutorial, you authenticate your Python application and pass the token with each request when interacting with Fabric resources, such as Eventhouse, Eventstream, and Map APIs.

To call these APIs, your application must be granted delegated permissions such as `Item.ReadWrite.All`, and authenticate against Microsoft Entra to obtain an access token.

```python
# =========================================================
# Auth helpers 
# =========================================================

class TokenProvider:
    """
    Thin wrapper around DefaultAzureCredential that acquires Entra tokens.

    Why this exists:
    - Keeps token acquisition in one place.
    - Lets _fabric_headers() build a fresh Authorization header when needed.

    Note:
    - DefaultAzureCredential can use several sources (Azure CLI login, VS Code login, etc.).
    """
    def __init__(self):
        self._cred = DefaultAzureCredential()

    def get(self, scope: str) -> str:
        return self._cred.get_token(scope).token


_tokens = TokenProvider()


def _fabric_headers() -> dict[str, str]:
    """
    Build headers for Fabric REST API calls.

    This function is called each time we make a Fabric REST call so the token is fresh.
    """
    return {
        "Authorization": f"Bearer {_tokens.get('https://api.fabric.microsoft.com/.default')}",
        "Content-Type": "application/json"
    }


def _kusto_headers() -> dict[str, str]:
    """
    Build headers for Kusto (Eventhouse queryServiceUri) management calls.
    """
    return {
        "Authorization": f"Bearer {_tokens.get('https://api.kusto.windows.net/.default')}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

def _pbi_headers() -> dict[str, str]:
    """
    Build headers for polling Trident/Power BI cluster LRO endpoints
    (e.g., df-*.analysis.windows.net) that require a Power BI audience token.
    """
    return {
        "Authorization": f"Bearer {_tokens.get('https://analysis.windows.net/powerbi/api/.default')}",
        "Content-Type": "application/json"
    }

```

### Create an LRO helper function

Several Fabric REST APIs used in this tutorial, such as creating an Eventhouse and creating a Map, support **long-running operations (LROs)**.

These APIs can return a **`202 Accepted`** response, along with headers such as `Location`, `x-ms-operation-id`, and `Retry-After`, which indicate that the request is being processed asynchronously.

To handle these responses consistently, you create a helper function that polls the operation status until it completes.

Add this helper function after the _authentication_ helper functions:

```python
# =========================================================
# FabricClient (minimal wrapper so call sites stay clean)
# =========================================================

class FabricClient:
    """
    Small wrapper around httpx.Client so we don't repeat headers everywhere.

    Keeps the tutorial behavior:
    - request() returns the raw httpx.Response so the caller can handle 201 vs 202.
    """
    def __init__(self, http_client: httpx.Client):
        self._http = http_client

    def request(self, method: str, url: str, *, json_body=None) -> httpx.Response:
        return self._http.request(method, url, headers=_fabric_headers(), json=json_body)


# =========================================================
# LRO handler 
# =========================================================

def _handle_lro(
    client: httpx.Client,
    initial_response: httpx.Response,
    *,
    list_url: str | None = None,
    match_display_name: str | None = None,
    id_field: str = "id",
) -> str:
    """
    Poll a Fabric long-running operation (LRO) until completion and return the created resource id.

    Why this function exists:
    - Many Fabric create APIs return HTTP 202 + Location header for async creation.
    - Some LRO completion payloads are status-only and do NOT include the created resource id.
      When that happens, we resolve the created resource by listing resources and matching displayName.

    FIX included:
    - The operation endpoint can return HTTP 200 while still "Running".
      In that case, continue polling instead of treating it as complete.
    """
    op_url = initial_response.headers.get("Location")

    # Some Fabric LRO responses may omit Location.
    # Fall back to x-ms-operation-id to construct the polling URL.
    if not op_url:
        op_id = initial_response.headers.get("x-ms-operation-id")
        if op_id:
            op_url = f"https://api.fabric.microsoft.com/v1/operations/{op_id}"
        else:
            raise RuntimeError(
                "Missing LRO Location header and x-ms-operation-id header. "
                f"Status={initial_response.status_code}, Headers={dict(initial_response.headers)}"
            )

    retry_after = int(initial_response.headers.get("Retry-After", "5"))

    
    # choose headers based on where the LRO is hosted
    poll_headers = _pbi_headers() if "analysis.windows.net" in op_url else _fabric_headers()

    while True:
        time.sleep(retry_after)
        poll = client.get(op_url, headers=poll_headers)

        # Still running (202 pattern)
        if poll.status_code == 202:
            retry_after = int(poll.headers.get("Retry-After", "5"))
            continue

        poll.raise_for_status()
        body = poll.json() if poll.content else {}

        # --- FIX: handle 200 with status=Running ---
        status = (body.get("status") if isinstance(body, dict) else None)

        if status in ("Running", "NotStarted"):
            retry_after = int(poll.headers.get("Retry-After", "5"))
            continue

        if status == "Failed":
            raise RuntimeError(f"LRO failed. Body: {body}")
        # --- END FIX ---

        # Case A: Operation returns the created resource id directly.
        if isinstance(body, dict) and id_field in body and body[id_field]:
            return body[id_field]

        # Case B: Status-only completion payload; resolve by listing.
        if status == "Succeeded" and list_url and match_display_name:
            r = client.get(list_url, headers=_fabric_headers())
            r.raise_for_status()

            items = r.json().get("value", [])
            match = next((i for i in items if i.get("displayName") == match_display_name), None)
            if match and match.get(id_field):
                return match[id_field]

            raise RuntimeError(
                f"LRO succeeded but could not resolve created resource by name. "
                f"match_display_name={match_display_name!r}"
            )

        # Anything else is unexpected
        raise RuntimeError(f"LRO completed but no resource id was returned. Body: {body}")

```

> [!TIP]
> Fabric APIs use multiple long-running operation (LRO) patterns. Some responses return:
>
> - a `Location` header  
> - an `x-ms-operation-id`  
> - or complete immediately with `201`  
>
> This tutorial uses a unified LRO helper function to handle all patterns consistently.

### Definition payload helper

When you create a Map with a **public definition**, you send map.json as payloadType: `InlineBase64`. The Create Map API examples show using `InlineBase64` in definition.parts.

Add beneath the _LRO_ helper functions:

```python
# ================================================================================
# DEFINITION PAYLOAD HELPER
# - Create Map can include a public definition inline (map.json as InlineBase64). 
# ================================================================================

def _json_to_b64(obj: dict) -> str:
    """
    Convert a Python dict to base64-encoded JSON text.

    Fabric Map "Create Map with definition inline" requires:
    - definition.parts[].payloadType = InlineBase64
    - definition.parts[].payload     = base64(json(map_json))
    """
    return base64.b64encode(json.dumps(obj).encode("utf-8")).decode("utf-8")

```

### Create helper function to retrieve the Eventhouse ID once created

When you create an Eventhouse by using the Fabric REST API, the API can return a response that doesn't immediately include the Eventhouse ID. This can occur when:

- The creation request is processed asynchronously as a long-running operation (LRO)  
- The requested display name already exists and the API returns a conflict response (`ItemDisplayNameAlreadyInUse`)  

In these cases, your script must determine whether an Eventhouse already exists or wait until the newly created Eventhouse becomes available.

This helper function retrieves the Eventhouse ID by querying the list of Eventhouses and matching the `displayName`. It retries multiple times to account for propagation delays and ensures that a valid Eventhouse ID is returned before the workflow continues.

This approach enables more resilient and repeatable automation by:

- Supporting idempotent script execution (reusing existing resources when present)  
- Handling asynchronous provisioning behavior  
- Avoiding failures caused by temporary unavailability of newly created resources  

Add the following code after the _definition payload_ helper function (`_json_to_b64()`):

```python
# ===============================================================================
# Helper: Resolve Eventhouse ID (when create Eventhouse returns 202 without id)
# ===============================================================================

def resolve_eventhouse_id(client, list_url, headers, eventhouse_name, max_attempts=10, delay=3):
    """
    Resolve an Eventhouse ID by listing eventhouses and matching displayName.

    Used when:
    - Create fails with ItemDisplayNameAlreadyInUse
    - Or when you want idempotent re-runs (reuse existing resources)
    """
    for attempt in range(max_attempts):
        resp = client.get(list_url, headers=headers)
        resp.raise_for_status()

        items = resp.json().get("value", [])
        match = next((m for m in items if m.get("displayName") == eventhouse_name), None)

        if match:
            return match["id"]

        time.sleep(delay)

    raise RuntimeError(f"Eventhouse named {eventhouse_name!r} was not found after retries.")
```

### Create helper function to retrieve the Eventstream ID once created

When you create an Eventstream by using the Fabric REST API, the resource may not be immediately discoverable. Even if the creation request succeeds, the Eventstream might not appear right away when calling the List Eventstreams API due to backend propagation delays.

As a result, the Eventstream ID may not be returned directly during creation, or it may not be reliably available for immediate use in subsequent API calls.

To reliably obtain the Eventstream ID, you must query the list of Eventstreams and retry until the newly created Eventstream becomes visible. The following helper function implements this retry pattern and ensures your automation flow is resilient to asynchronous provisioning and consistency delays, and is only required if you need the Eventstream ID.

Add the following code after the `resolve_eventhouse_id()` function:

```python
# ===============================================================================
# Helper: Resolve Eventstream ID (when create Eventstream returns 202 without id)
# ===============================================================================

def resolve_eventstream_id(client, list_url, headers, eventstream_name, max_attempts=10, delay=5):
    """
    Resolve a newly created Eventstream ID by listing eventstreams and matching displayName.

    Why this exists:
    - Eventstream creation can return 202 Accepted (async provisioning).
    - Some LRO completion payloads don't contain an id.
    - The newly created eventstream may not appear immediately in list results.
    """
    for attempt in range(max_attempts):
        print(f"Resolving eventstream (attempt {attempt + 1}/{max_attempts})...")

        resp = client.get(list_url, headers=headers)
        resp.raise_for_status()

        items = resp.json().get("value", [])
        match = next((m for m in items if m.get("displayName") == eventstream_name), None)

        if match:
            print("Eventstream found!")
            return match["id"]

        print("Eventstream not visible yet. Retrying...")
        time.sleep(delay)

    raise RuntimeError("Eventstream created but still not visible after retries")

```

### Create helper to provide Eventstream connection string

To send events into Eventstream, you need a **connection string** for the Custom endpoint.

Unlike Fabric REST APIs (used to create and manage resources), Eventstream ingestion uses a **data-plane endpoint** based on the Event Hub protocol. This endpoint requires a connection string for authentication.

The connection string is generated when the Eventstream is created and published, and must be retrieved from the Fabric portal.

This helper function prompts you to provide the connection string at runtime, ensuring that the script remains fully automated up to that point without requiring preconfigured values.

Add the following code after the `resolve_eventstream_id()` function:

```python
def get_eventhub_connection_string_interactive(cfg: Config) -> str:
    """
    Prompt for Eventstream Custom endpoint connection string.

    Why this function is needed:
    - The Eventstream connection string is generated only after the Eventstream is created.
    - It is not available via the Fabric REST API.
    - It is required to send events using the EventHub protocol.

    What this function does:
    - Prompts the user to copy the connection string from the Fabric portal
    - Stores it in the Config object for reuse by other functions
    """

    if getattr(cfg, "eventhub_connection_string", None):
        return cfg.eventhub_connection_string

    print("\n=== Eventstream connection string required ===")
    print("In the Fabric portal:")
    print("  1) Open the Eventstream you just created")
    print("  2) Select the Custom endpoint source")
    print("  3) Select 'SAS Key Authentication'")
    print("  4) Copy 'Connection string-primary key'\n")

    cfg.eventhub_connection_string = input("Paste connection string here: ").strip()

    if not cfg.eventhub_connection_string:
        raise RuntimeError("Connection string cannot be empty.")

    return cfg.eventhub_connection_string

```

> [!NOTE]
> The connection string is separate from the Microsoft Entra access token used for Fabric REST APIs.
> The REST API token is used for resource management, whereas the Eventstream connection string is used for streaming data ingestion.

### Create helper to seed initial events from CSV

To ensure the map displays data immediately after it's created, the script sends a small set of **seed events** into the Eventstream before creating the map.

Without this step, the Eventhouse table may not yet contain any data, and the map could appear empty on first load.

This helper function reads data from a local CSV file and sends each row as a JSON event to the Eventstream using the EventHub protocol.

Because Eventstream resources are provisioned asynchronously, the Custom endpoint may not be immediately ready to accept events after creation. To handle this, the helper function includes built-in retry logic that automatically attempts to send events until the endpoint is available. This ensures the initialization process is reliable and repeatable and doesn't require manual timing adjustments.

This approach mirrors real-world ingestion patterns:

- Data is produced externally (for example, IoT devices or applications)
- Events are streamed into Eventstream
- Eventstream delivers data to Eventhouse for querying and visualization

By seeding initial events, you simulate this ingestion flow and ensure that:

- The destination table is populated
- The KQL function has data to return
- The map renders immediately after creation

Add the following code after the `get_eventhub_connection_string_interactive()` function:

```python
def seed_eventstream_from_csv(cfg: Config, max_attempts: int = 10, delay: int = 3) -> int:
    """
    Send seed events with retry logic to handle Eventstream readiness delay.

    Why this exists:
    - Eventstream Custom endpoint may not be immediately ready after creation.
    - Initial sends can fail or silently drop.
    - This function retries until ingestion succeeds.
    """
    conn_str = get_eventhub_connection_string_interactive(cfg)

    attempt = 0
    last_error = None

    while attempt < max_attempts:
        attempt += 1
        print(f"Seeding attempt {attempt}/{max_attempts}...")

        try:
            sent = 0
            producer = EventHubProducerClient.from_connection_string(conn_str=conn_str)

            try:
                with open(cfg.seed_csv_path, newline="", encoding="utf-8") as f:
                    reader = csv.DictReader(f)

                    batch = producer.create_batch()
                    batch_count = 0

                    for row in reader:
                        event = {
                            "VehicleId": row["VehicleId"],
                            "Latitude": float(row["Latitude"]),
                            "Longitude": float(row["Longitude"]),
                            "EventTime": row["EventTime"],
                        }

                        data = EventData(json.dumps(event))

                        try:
                            batch.add(data)
                            batch_count += 1
                        except ValueError:
                            producer.send_batch(batch)
                            sent += batch_count
                            batch = producer.create_batch()
                            batch.add(data)
                            batch_count = 1

                    if batch_count > 0:
                        producer.send_batch(batch)
                        sent += batch_count

                print(f"Seed events sent: {sent}")
                return sent

            finally:
                producer.close()

        except (EventHubError, ConnectionError, TimeoutError) as exc:
            last_error = exc
            print(f"Seeding failed (attempt {attempt}): {exc}. Retrying in {delay}s...")
            time.sleep(delay)

    raise RuntimeError(f"Seeding failed after {max_attempts} attempts. Last error: {last_error}")
```

> [!NOTE]
> This step introduces a small amount of static data into the streaming pipeline.  
> In a production scenario, events would typically be generated continuously by external systems rather than loaded from a file.

### Wait for KQL database availability

After creating the KQL database and function, the database may not be immediately available to other Fabric services such as Maps. This is because Fabric services operate on distributed backends, and newly created resources can take a short time to propagate across all services.

If you create a map immediately after creating the KQL database, the map might fail to resolve the data source and display an error such as "_Kusto database not found_"

To prevent this issue, add a helper function that checks whether the KQL database is available before creating the map. This ensures that the map is created only after the database can be successfully resolved.

Add the following code after the `seed_eventstream_from_csv()` function:

```python
def wait_for_kql_database_ready(client, cfg: Config, kql_database_item_id: str, max_attempts: int = 10, delay: int = 3) -> None:
    """
    Wait until the KQL database is available to other Fabric services.

    Why this exists:
    - Newly created KQL databases may not be immediately visible to Fabric Maps.
    - Creating a map too early can result in missing or broken data sources.

    What this function does:
    - Polls the KQL database endpoint until it becomes available.
    - Retries for a configurable number of attempts with a short delay between checks.
    """
    url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/kqlDatabases/{kql_database_item_id}"

    for attempt in range(max_attempts):
        resp = client.get(url, headers=_fabric_headers())

        if resp.status_code == 200:
            print("KQL database is available to Fabric Maps")
            return

        print(f"Waiting for KQL database availability (attempt {attempt + 1}/{max_attempts})...")
        time.sleep(delay)

    raise RuntimeError("KQL database did not become available after retries.")
```

### Create helper function to retrieve the map ID once created

When you create a map by using the Fabric REST API, the request can return a 202 Accepted response. This indicates that the map is being provisioned asynchronously as a long-running operation (LRO), rather than being created immediately. In this case, the response doesn't include the map ID, and the LRO completion endpoint may not return a usable result. Additionally, even after the operation completes, the newly created map might not appear immediately when calling the List Maps API due to backend propagation.

To reliably obtain the map ID, you must query the list of maps and retry until the new map becomes visible. The following helper function implements this retry pattern and ensures your automation flow is resilient to asynchronous provisioning delays, and is only required if you need the map ID.

Add the following code after the `wait_for_kql_database_ready()` function:

```python
# ---------------------------------------------------------
# Get Map ID
# ---------------------------------------------------------

def resolve_map_id(client, list_url, headers, map_name, max_attempts=10, delay=5):
    """
    Resolve the ID of a newly created Fabric map.

    Why this function is needed:
    - Creating a map can return HTTP 202 (Accepted), indicating an asynchronous
      long-running operation (LRO) rather than immediate creation.
    - LRO responses for map creation don't always return a resource ID.
    - Even after the operation completes, the new map may not be immediately
      visible in the List Maps API due to backend propagation delays.

    What this function does:
    - Repeatedly calls the List Maps API.
    - Searches for a map matching the provided display name.
    - Retries for a configurable number of attempts with a delay between calls.

    Parameters:
        client        : Authenticated HTTP client
        list_url      : Maps list endpoint
        headers       : Authorization headers for Fabric API
        map_name      : Display name of the map to locate
        max_attempts  : Maximum number of retry attempts
        delay         : Delay (seconds) between retries

    Returns:
        The map ID (string) once the map becomes visible.

    Raises:
        RuntimeError if the map is not found after all retry attempts.
    """

    for attempt in range(max_attempts):
        print(f"Resolving map (attempt {attempt + 1}/{max_attempts})...")

        resp = client.get(list_url, headers=headers)
        resp.raise_for_status()

        items = resp.json().get("value", [])
        match = next((m for m in items if m.get("displayName") == map_name), None)

        if match:
            print("Map found!")
            return match["id"]

        print("Map not visible yet. Retrying...")
        time.sleep(delay)

    raise RuntimeError("Map created but still not visible after retries")

```

## Create primary functions

Next, create the primary functions that define the workflow. These will all be called from `main()`.

The primary functions are added in the order they're defined in code. `main()` calls them in a slightly different order so the table exists before the Eventstream binds to it and so seeded data is available before verification runs.

1. Create an Eventhouse
1. Create the Eventhouse table
1. Verify ingestion (called after seeding)
1. Create an Eventstream
1. Create a KQL function
1. Build map definition (map.json)
1. Build platform metadata (.platform)
1. Create the map

### Create an Eventhouse

When you create an Eventhouse by using the Fabric REST API, the request can return different response patterns depending on the state of the request and the availability of the resource.

In some cases, the API returns a `201 Created` response with the Eventhouse ID immediately available. In other cases, it can return a `202 Accepted`, indicating that the Eventhouse is being provisioned asynchronously as a long-running operation (LRO). Additionally, the API can return a `409` response with an error such as `ItemDisplayNameNotAvailableYet` if the requested name is temporarily reserved.

To handle these variations reliably, the helper function implements logic to:

- Detect whether the Eventhouse was created synchronously or requires LRO polling  
- Handle transient name availability conflicts using the `Retry-After` header  
- Ensure a valid Eventhouse ID is returned regardless of the response pattern  

This approach ensures your automation flow is resilient to asynchronous provisioning behavior and temporary service conditions when creating Eventhouse resources.

Add the following after the `resolve_map_id()` function:

```python
# =========================================================
# Step 1: Create Eventhouse
# =========================================================

def create_eventhouse(client: httpx.Client, fabric: FabricClient, cfg: Config) -> str:
    eventhouse_url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/eventhouses"
    eventhouse_payload = {
        "displayName": cfg.eventhouse_display_name,
        "description": cfg.eventhouse_description
    }

    # Retry loop to handle transient "name not available yet"
    for attempt in range(1, 6):
        eh_resp = fabric.request("POST", eventhouse_url, json_body=eventhouse_payload)

        print("Create eventhouse status:", eh_resp.status_code)
        print("Create eventhouse headers:", dict(eh_resp.headers))

        # 201: created immediately
        if eh_resp.status_code == 201:
            eventhouse_id = eh_resp.json()["id"]
            print("Eventhouse created. Eventhouse ID:", eventhouse_id)
            return eventhouse_id

        # 202: LRO
        if eh_resp.status_code == 202:
            eventhouse_id = _handle_lro(client, eh_resp)
            print("Eventhouse created. Eventhouse ID:", eventhouse_id)
            return eventhouse_id

        # 409: name issues
        if eh_resp.status_code == 409:
            api_code = eh_resp.headers.get("x-ms-public-api-error-code")

            # Name reserved temporarily: wait and retry
            if api_code == "ItemDisplayNameNotAvailableYet":
                wait_s = int(eh_resp.headers.get("retry-after", "20"))
                print(f"Name not available yet (attempt {attempt}/5). Waiting {wait_s}s then retrying...")
                time.sleep(wait_s)
                continue

            # Name already exists: reuse existing eventhouse by displayName
            if api_code == "ItemDisplayNameAlreadyInUse":
                print(f"Eventhouse {cfg.eventhouse_display_name!r} already exists. Reusing it...")
                return resolve_eventhouse_id(client, eventhouse_url, _fabric_headers(), cfg.eventhouse_display_name)

        # Anything else: fail fast with details
        raise RuntimeError(f"Create eventhouse failed: {eh_resp.status_code} {eh_resp.text}")

    # If the name never becomes available, last-resort: pick a unique name and try once
    cfg.eventhouse_display_name = f"{cfg.eventhouse_display_name}-{uuid.uuid4().hex[:8]}"
    print(f"Name still not available; switching to unique name: {cfg.eventhouse_display_name}")
    eh_resp = fabric.request("POST", eventhouse_url, json_body={
        "displayName": cfg.eventhouse_display_name,
        "description": cfg.eventhouse_description
    })
    eh_resp.raise_for_status()
    return eh_resp.json()["id"]

```

#### Create KQL table

Before sending events into Eventstream, ensure that the destination table exists in the Eventhouse.

Although Eventhouse can create tables automatically during ingestion in some scenarios, this behavior isn't guaranteed when using REST APIs. If the destination table doesn't exist, ingestion can fail silently or events may not be written as expected.

To ensure reliable and repeatable automation, this step explicitly creates (or merges) the table schema using the Kusto management API. This guarantees that:

- The Eventstream destination can bind to a valid table
- Ingestion succeeds consistently
- Downstream queries and map layers return data as expected

Add the following after the `create_eventhouse()` function:

```python
# =========================================================
# Step 1b: Create KQL table if missing (idempotent)
# =========================================================

def create_kql_table_if_missing(client: httpx.Client, fabric: FabricClient, cfg: Config, eventhouse_id: str) -> None:
    # Get queryServiceUri + KQL database item id
    get_eventhouse_url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/eventhouses/{eventhouse_id}"
    eh = fabric.request("GET", get_eventhouse_url)
    eh.raise_for_status()

    props = eh.json().get("properties") or {}
    query_service_uri = props.get("queryServiceUri")
    databases_item_ids = props.get("databasesItemIds") or []
    if not query_service_uri or not databases_item_ids:
        raise RuntimeError("Eventhouse missing queryServiceUri or databasesItemIds")

    kql_database_item_id = databases_item_ids[0]

    # Resolve actual DB displayName (don't rely on cfg.kql_database_name)
    get_db_url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/kqlDatabases/{kql_database_item_id}"
    db_resp = fabric.request("GET", get_db_url)
    db_resp.raise_for_status()
    kql_database_name = db_resp.json().get("displayName")
    if not kql_database_name:
        raise RuntimeError("KQL database response did not include displayName")

    # Create (or merge) the table schema
    # (Schema matches what your CSV sends: VehicleId, Latitude, Longitude, EventTime)
    csl = f""".create-merge table {cfg.eventhouse_table_name} (
        VehicleId: string,
        Latitude: real,
        Longitude: real,
        EventTime: datetime
    )"""

    mgmt_url = f"{query_service_uri}/v1/rest/mgmt"
    mgmt_payload = {"db": kql_database_name, "csl": csl}
    resp = client.post(mgmt_url, headers=_kusto_headers(), json=mgmt_payload)
    if resp.status_code >= 400:
        raise RuntimeError(f"Create table failed: {resp.status_code}\n{resp.text}")

    print(f"Ensured table exists: {cfg.eventhouse_table_name}")
```

#### Verify data ingestion

After the seeding step (run later from `main()` once the Eventstream exists), this helper verifies that data has been successfully ingested into the Eventhouse table.

It's defined here, next to the table-creation helper, because both operate on the same Eventhouse and KQL database. It's called from `main()` *after* `seed_eventstream_from_csv` to confirm the pipeline is working.

This step executes a simple count query against the table and returns the result. It helps validate that:

- The Eventstream is correctly configured
- Events are being written to the table
- The ingestion pipeline is functioning end-to-end

This step is especially useful for troubleshooting, as ingestion issues can otherwise appear later as empty map results or missing data in KQL queries.

Add the following after the `create_kql_table_if_missing()` function:

```python
# =========================================================
# Step 3b: Verify data ingestion (called after seeding)
# =========================================================

def verify_eventhouse_data(client: httpx.Client, fabric: FabricClient, cfg: Config, eventhouse_id: str):
    """
    Verify that data has been ingested into the Eventhouse table.

    Why this exists:
    - Eventstream ingestion can silently fail if misconfigured
    - This provides an early, clear validation step in the tutorial
    """

    # Reuse your existing pattern to get KQL DB info
    eh = fabric.request("GET", f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/eventhouses/{eventhouse_id}")
    eh.raise_for_status()

    props = eh.json().get("properties") or {}
    db_ids = props.get("databasesItemIds") or []
    query_service_uri = props.get("queryServiceUri")

    if not db_ids or not query_service_uri:
        raise RuntimeError("Missing Eventhouse properties for verification")

    db_id = db_ids[0]

    db_resp = fabric.request("GET", f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/kqlDatabases/{db_id}")
    db_resp.raise_for_status()

    db_name = db_resp.json().get("displayName")

    # Simple count query
    csl = f"{cfg.eventhouse_table_name} | count"

    resp = client.post(
        f"{query_service_uri}/v1/rest/query",
        headers=_kusto_headers(),
        json={"db": db_name, "csl": csl}
    )

    if resp.status_code >= 400:
        raise RuntimeError(f"Verification query failed: {resp.text}")

    print("Data verification result:", resp.text)
```

### Create Eventstream with definition

When you create an Eventstream by using the Fabric REST API with a definition payload, the request provisions both the Eventstream resource and its associated configuration. Depending on the request and backend processing, the API can return different response patterns.

In many cases, the API returns a `202 Accepted` response, indicating that the Eventstream is being created asynchronously as a long-running operation (LRO). The response may not include the Eventstream ID directly, and the LRO completion endpoint might not return a usable result. Additionally, even after the operation completes, the newly created Eventstream might not be immediately available when calling the List Eventstreams API due to backend propagation delays.

To handle this behavior reliably, the helper function implements logic to:

- Handle asynchronous provisioning using LRO polling when required  
- Retrieve the Eventstream ID after creation by querying the list of Eventstreams  
- Retry until the Eventstream becomes available for downstream operations  

This approach ensures your automation flow is resilient to asynchronous provisioning and eventual consistency delays when creating Eventstream resources with definitions.

Add the following after the `verify_eventhouse_data()` function:

```python
# =========================================================
# Step 2: Create Eventstream (with definition)
# =========================================================

def create_eventstream_with_definition(client: httpx.Client, fabric: FabricClient, cfg: Config, eventhouse_id: str) -> str:
    """
    Create an Eventstream using a public definition and return its item ID.

    Teaching note:
    - Eventstream definition is graph-like (sources, destinations, operators, streams).
    - We create: CustomEndpoint source -> DefaultStream -> Eventhouse destination.
    """
    eventstream_url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/eventstreams"

    source_name = "CustomEndpointSource"
    stream_name = "DefaultStream"
    destination_name = "EventhouseDestination"

    # Resolve the KQL database item ID from the Eventhouse
    get_eventhouse_url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/eventhouses/{eventhouse_id}"
    eh = fabric.request("GET", get_eventhouse_url)
    eh.raise_for_status()

    props = (eh.json().get("properties") or {})
    databases_item_ids = props.get("databasesItemIds") or []
    if not databases_item_ids:
        raise RuntimeError("Eventhouse properties did not include databasesItemIds.")

    kql_database_item_id = databases_item_ids[0]

    # Resolve the actual KQL database *name* (displayName) to avoid name drift
    get_db_url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/kqlDatabases/{kql_database_item_id}"
    db_resp = fabric.request("GET", get_db_url)
    db_resp.raise_for_status()
    kql_database_name = db_resp.json().get("displayName")
    if not kql_database_name:
        raise RuntimeError("KQL database response did not include displayName.")

    print("Eventhouse ID:", eventhouse_id)
    print("KQL database item ID:", kql_database_item_id)
    print("KQL database name:", kql_database_name)

    eventstream_json = {
        "sources": [
            {
                "name": source_name,
                "type": "CustomEndpoint",
                "properties": {
                    "inputSerialization": {"type": "Json", "properties": {"encoding": "UTF8"}}
                }
            }
        ],
        "streams": [
            {
                "name": stream_name,
                "type": "DefaultStream",
                "properties": {},
                "inputNodes": [{"name": source_name}]
            }
        ],
        "operators": [],
        "destinations": [
            {
                "name": destination_name,
                "type": "Eventhouse",
                "properties": {
                    "dataIngestionMode": "ProcessedIngestion",
                    "workspaceId": cfg.workspace_id,
                    "itemId": kql_database_item_id,
                    "databaseName": kql_database_name,
                    "tableName": cfg.eventhouse_table_name,
                    "inputSerialization": {"type": "Json", "properties": {"encoding": "UTF8"}}
                },
                "inputNodes": [{"name": stream_name}]
            }
        ],
        "compatibilityLevel": "1.1"
    }

    eventstream_payload = {
        "displayName": cfg.eventstream_display_name,
        "description": cfg.eventstream_description,
        "definition": {
            "parts": [
                {
                    "path": "eventstream.json",
                    "payload": _json_to_b64(eventstream_json),
                    "payloadType": "InlineBase64"
                }
            ]
        }
    }

    es_resp = fabric.request("POST", eventstream_url, json_body=eventstream_payload)

    if es_resp.status_code == 201:
        eventstream_id = es_resp.json()["id"]
    else:
        try:
            eventstream_id = _handle_lro(client, es_resp)
        except RuntimeError as exc:
            # If the LRO succeeded but returned no id, resolve by listing eventstreams (same pattern as resolve_map_id).
            msg = str(exc)
            if "no resource id was returned" in msg or "LRO completed but no resource id was returned" in msg:
                eventstream_id = resolve_eventstream_id(
                    client,
                    eventstream_url,
                    _fabric_headers(),
                    cfg.eventstream_display_name
                )
            else:
                raise

    print("Eventstream created. Eventstream ID:", eventstream_id)
    return eventstream_id
```

### Create KQL function

When you create a KQL function in an Eventhouse by using the Kusto management REST API, the request executes a control command against the KQL database rather than a standard Fabric item API. As a result, the call behaves differently from other resource creation operations.

The request is sent to the Kusto management endpoint (`/v1/rest/mgmt`) and typically returns a `200 OK` response when successful. However, the command can fail if the referenced table or schema isn't yet available, which is common in streaming scenarios where tables are created automatically upon first data ingestion.

To handle this behavior reliably, the helper function implements logic to:

- Execute the `.create-or-alter function` command against the KQL database  
- Use the `skipvalidation=true` option to reduce validation errors during function creation  
- Use the `table("TableName")` pattern to defer table resolution until runtime  
- Surface detailed error messages if the command fails, to aid in debugging  

This approach ensures the KQL function can be created successfully even before data has been ingested, making the automation flow resilient to schema-on-ingest behavior in Eventhouse.

Add the following after the `create_eventstream_with_definition()` function:

```python
# =========================================================
# Step 4: Create KQL function (required for Maps layer)
# =========================================================

def create_kql_function(client: httpx.Client, fabric: FabricClient, cfg: Config, eventhouse_id: str) -> str:
    """
    Create or update a stored Kusto function in the Eventhouse-backed KQL database.

    Teaching note:
    - Map layers must be backed by supported Kusto entities (functions).
    - We use the Eventhouse queryServiceUri + Kusto mgmt endpoint to run a .create-or-alter command.
    """
    # Get Eventhouse properties (queryServiceUri + databasesItemIds)
    get_eventhouse_url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/eventhouses/{eventhouse_id}"
    eh = fabric.request("GET", get_eventhouse_url)
    eh.raise_for_status()

    props = (eh.json().get("properties") or {})
    query_service_uri = props.get("queryServiceUri")
    databases_item_ids = props.get("databasesItemIds") or []

    if not query_service_uri:
        raise RuntimeError("Eventhouse properties did not include queryServiceUri.")
    if not databases_item_ids:
        raise RuntimeError("Eventhouse properties did not include databasesItemIds.")

    # We'll return this so the caller can wire the map to the correct KQL database item id.
    kql_database_item_id = databases_item_ids[0]

    # Resolve actual KQL database name (displayName)
    get_db_url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/kqlDatabases/{kql_database_item_id}"
    db_resp = fabric.request("GET", get_db_url)
    db_resp.raise_for_status()

    kql_database_name = db_resp.json().get("displayName")
    if not kql_database_name:
        raise RuntimeError("KQL database response did not include displayName.")

    # Create the function that returns the latest location per vehicle.
    # Keep columns explicit so the map config can bind Latitude/Longitude.
    kql = f""".create-or-alter function with (skipvalidation=true) {cfg.kql_function_name}() {{
    table("{cfg.eventhouse_table_name}")
    | summarize arg_max(EventTime, *) by VehicleId
    | project Latitude, Longitude, VehicleId, EventTime
    }}"""

    mgmt_url = f"{query_service_uri}/v1/rest/mgmt"
    mgmt_payload = {"db": kql_database_name, "csl": kql}

    mgmt_resp = client.post(mgmt_url, headers=_kusto_headers(), json=mgmt_payload)

    if mgmt_resp.status_code >= 400:
        # Kusto usually returns a detailed JSON error body on 400s.
        raise RuntimeError(
            "Kusto mgmt call failed.\n"
            f"URL: {mgmt_url}\n"
            f"DB: {mgmt_payload.get('db')}\n"
            f"Status: {mgmt_resp.status_code}\n"
            f"Body: {mgmt_resp.text}"
        )

    print("KQL function created/updated:", cfg.kql_function_name)
    return kql_database_item_id

```

> [!NOTE]
> The field names returned by your KQL function must match the column names used in your map definition (`Latitude` and `Longitude` in this tutorial).

### Build map.json

When you create a Map by using the Fabric REST API with an inline definition, the map configuration is provided as a JSON payload (commonly referred to as `map.json`). This definition includes details such as data sources, layers, styling, and refresh behavior.

In this tutorial, the map definition includes a **Kusto function–based data layer** that queries the Eventhouse and returns geospatial data to be visualized on the map. This layer must reference the correct Eventhouse item, KQL database, and function name, and be structured according to the Fabric Maps schema.

To ensure the definition is generated correctly and consistently, the helper function builds the `map.json` payload dynamically. It implements logic to:

- Define a data layer that references a KQL function as its data source  
- Configure the layer with appropriate fields for latitude and longitude  
- Enable periodic refresh to support real-time updates  
- Inject the correct resource identifiers (such as Eventhouse ID and function name)  

This approach ensures the map definition is valid, reusable, and aligned with the resources created earlier in the automation flow, allowing the map to visualize streaming data from the Eventhouse.

Add the following after the `create_kql_function()` function:

```python
# =========================================================
# Step 6: Build map.json (Kusto function layer)
# =========================================================

def build_map_json(cfg: Config, kql_database_item_id: str) -> dict:
    """
    Build the map.json payload (map public definition).

    Teaching note:
    - Map layer sources must reference supported Kusto entities (functions).
    - The map points to the KQL database as a data source and uses a kusto layer source.
    """
    layer_source_id = str(uuid.uuid4())
    layer_setting_id = str(uuid.uuid4())
    data_source_name = "kqlConnection"

    map_json = {
        "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/map/definition/2.0.0/schema.json",
        "basemap": {},

        "dataSources": [
            {
                "name": data_source_name,
                "itemType": "KqlDatabase",
                "workspaceId": cfg.workspace_id,
                "itemId": kql_database_item_id
            }
        ],

        "iconSources": [],

        "layerSources": [
            {
                "id": layer_source_id,
                "name": cfg.kql_function_name,
                "type": "kusto",
                "dataSourceName": data_source_name,
                "workspaceId": cfg.workspace_id,
                "itemId": kql_database_item_id,
                "refreshIntervalMs": cfg.refresh_interval_ms,
                "queryType": "function",
                "query": f"{cfg.kql_function_name}()"
            }
        ],
        "layerSettings": [
            {
                "id": layer_setting_id,
                "name": "Live Locations",
                "sourceId": layer_source_id,
                "options": {
                    "type": "vector",
                    "visible": True,
                    "pointLayerType": "bubble",
                    "tooltipKeys": ["VehicleId", "EventTime"],
                    "bubbleOptions": {
                        "color": "#0078D4"
                    }
                },
                "latitudeColumnName": "Latitude",
                "longitudeColumnName": "Longitude"

            }
        ]
    }

    
    print("Map definition (map.json):", json.dumps(map_json, indent=2))
    return map_json
```

### Build .platform (platform metadata)

When creating a Fabric Map with an inline definition, you must include a `.platform` definition that describes the item metadata.

This metadata includes:

- The item type (`Map`)
- Display name and description
- Configuration properties such as a logical identifier

Including the `.platform` definition ensures that the map is fully registered and correctly integrated within Fabric. Without it, the map may be created without proper metadata or exhibit inconsistent behavior across services.

Add the following after the `build_map_json()` function:

```python
# =========================================================
# Step 6b: Build .platform (platform metadata)
# =========================================================

def build_platform_json(cfg: Config) -> dict:
    """
    Build the .platform payload for a Fabric Map item definition.

    The Map definition supports including a .platform part alongside map.json.
    """
    return {
        "$schema": "https://developer.microsoft.com/json-schemas/fabric/gitIntegration/platformProperties/2.0.0/schema.json",
        "metadata": {
            "type": "Map",
            "displayName": cfg.map_display_name,
            "description": cfg.map_description
        },
        "config": {
            "version": "2.0",
            # Use a stable logicalId if you want deterministic updates; UUID is fine for create.
            "logicalId": str(uuid.uuid4())
        }
    }
```

### Create Map with inline definition

When creating a map with an inline definition, the definition must include multiple parts to fully configure the map and its data layers.

In addition to the map configuration (`map.json`), the definition includes:

- A `.platform` definition that describes the map metadata
- A KQL query file associated with the layer source

The query file binds the map layer to the KQL function and ensures that the layer can execute the function at runtime.

By including all required definition parts in a single request, this step provisions the map and its data layer atomically, eliminating the need for follow-up update operations.

Depending on the request and backend processing, the API can return different response patterns. In many cases, the API returns a `202 Accepted` response, indicating that the Map is being provisioned asynchronously as a long-running operation (LRO). The response may not include the Map ID directly, and the LRO completion endpoint might not return a usable result. Additionally, even after the operation completes, the newly created Map might not be immediately visible when calling the List Maps API due to backend propagation delays.

To handle this behavior reliably, the helper function implements logic to:

- Submit an inline Map definition that references Eventhouse data  
- Handle asynchronous provisioning using LRO polling when required  
- Retrieve the Map ID after creation by querying the list of Maps  
- Retry until the Map becomes available for downstream operations  

This approach ensures your automation flow is resilient to asynchronous provisioning and eventual consistency delays when creating Maps with inline definitions.

Add the following after the `build_platform_json()` function:

```python
# =========================================================
# Step 7: Create Map with inline definition
# =========================================================


def create_map(client: httpx.Client, fabric: FabricClient, cfg: Config, map_json: dict, platform_json: dict) -> str:
    """
    Create the Fabric Map with its definition inline.

    Teaching note:
    - Includes map.json, platform metadata (.platform), and a KQL query file.
    - The query file binds the Kusto function to the map layer at runtime.
    - This approach avoids separate getDefinition/updateDefinition calls.
    """

    create_map_url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/maps"

    # Extract the layer source id so we can name the query file correctly
    layer_source_id = map_json["layerSources"][0]["id"]

    # Kusto query content (bind to the stored function)
    query_text = f"{cfg.kql_function_name}()"
    query_b64 = base64.b64encode(query_text.encode("utf-8")).decode("utf-8")

    create_map_payload = {
        "displayName": cfg.map_display_name,
        "description": cfg.map_description,
        "definition": {
            "parts": [
                {
                    "path": "map.json",
                    "payload": _json_to_b64(map_json),
                    "payloadType": "InlineBase64"
                },
                {
                    "path": ".platform",
                    "payload": _json_to_b64(platform_json),
                    "payloadType": "InlineBase64"
                },
                {
                    # Kusto layer query file naming convention
                    "path": f"queries/layerSource-{layer_source_id}.kql",
                    "payload": query_b64,
                    "payloadType": "InlineBase64"
                }
            ]
        }
    }

    map_resp = fabric.request("POST", create_map_url, json_body=create_map_payload)

    if map_resp.status_code == 201:
        return map_resp.json()["id"]

    if map_resp.status_code == 202:
        print("LRO completed via 202. Resolving map by name...")
        return resolve_map_id(client, create_map_url, _fabric_headers(), cfg.map_display_name)

    raise RuntimeError(f"Create map failed: {map_resp.status_code} {map_resp.text}")
```

## Orchestrate the workflow

The main (orchestration) function coordinates the end-to-end workflow for creating and configuring a real-time map solution in Microsoft Fabric.

Rather than performing a single operation, this function executes the full sequence of steps required to provision resources, configure dependencies, and enable real-time visualization. These steps must occur in a specific order, as later operations depend on resources created earlier in the process.

To manage this workflow reliably, the orchestration function implements logic to:

- Create an Eventhouse and associated KQL database with a table
- Create and resolve an Eventstream for data ingestion
- Seed initial events into Eventstream and validate ingestion works
- Create a KQL function to transform and query streaming data
- Build the map definition (`map.json` and `.platform`)
- Create the Map using an inline definition and a Kusto function–based layer
- Ensure all resources are available before proceeding to the next step  

By coordinating these operations, the orchestration function provides a single entry point for the automation flow and ensures that dependencies are handled correctly, enabling a complete, repeatable, and end-to-end real-time mapping scenario.

Add the following after the `create_map` function:

```python
# =========================================================
# main(): orchestrates the full workflow
# =========================================================

def main():
    """
    Orchestrate the tutorial workflow.

    1) Create Eventhouse
    1b) Create KQL table (required for ingestion)
    2) Create Eventstream (definition-based)
    3) Seed initial data so the map is not empty on first open
    3b) Validate ingestion BEFORE moving on
    4) Create KQL function (required for Maps layer)
    5) Ensure KQL database is available to Maps
    6) Build map.json
    6b) Build .platform metadata
    7) Create Map with inline definition
    """
    cfg = Config()

    print("Initializing clients...")
    with httpx.Client(timeout=60) as client:
        fabric = FabricClient(client)

        # Step 1
        eventhouse_id = create_eventhouse(client, fabric, cfg)

        # Step 1b: Ensure table exists BEFORE Eventstream binds to it
        create_kql_table_if_missing(client, fabric, cfg, eventhouse_id)

        # Step 2
        eventstream_id = create_eventstream_with_definition(client, fabric, cfg, eventhouse_id)

        # Step 3
        seed_count = seed_eventstream_from_csv(cfg)

        # Step 3b: Validate ingestion BEFORE moving on
        verify_eventhouse_data(client, fabric, cfg, eventhouse_id)

        # Step 4
        kql_database_item_id = create_kql_function(client, fabric, cfg, eventhouse_id)

        # Step 5: Ensure KQL database is available to Maps
        wait_for_kql_database_ready(client, cfg, kql_database_item_id)

        # Step 6
        map_json = build_map_json(cfg, kql_database_item_id)

        # Step 6b
        platform_json = build_platform_json(cfg)

        # Step 7
        map_id = create_map(client, fabric, cfg, map_json, platform_json)

        print("\nDONE")
        print("Eventhouse ID:", eventhouse_id)
        print("Eventstream ID:", eventstream_id)
        print(f"Seed events sent: {seed_count}")
        print("KQL database item ID:", kql_database_item_id)
        print("KQL function:", cfg.kql_function_name)
        print("Map ID:", map_id)

if __name__ == "__main__":
    main()
```

## Run the application

During script execution, you are prompted to paste the Eventstream connection string.

To retrieve this value:

1. Open your Fabric workspace  
2. Open the Eventstream created by the script  
3. Select the **Custom endpoint source**  
4. Open **SAS Key Authentication**  
5. Copy **Connection string-primary key**

:::image type="content" source="media/tutorials/create-real-time-map-using-rest-apis/connection-string-primary-key.png" alt-text="A screenshot of a Microsoft Fabric workspace with SAS Key Authentication panel open. The panel displays the Connection string-primary key field ready to be copied for Eventstream authentication.":::

Paste the value into the console when prompted.

> [!IMPORTANT]
> The script pauses execution until this value is provided.

**Run the script:**

```
python create_realtime_map.py
```

Verify that all items were created:

:::image type="content" source="media/tutorials/create-real-time-map-using-rest-apis/real-time-map.png" alt-text="A screenshot of a Seattle street map with multiple blue location markers clustered in downtown and surrounding neighborhoods. A data layers panel on the left shows Live Locations layer enabled. The map displays streets, neighborhood names, and control buttons on the right side for navigation and layer management.":::

At this point, all resources are created and configured.

To simulate continuous streaming and watch the map update in near real time, continue with the follow-up [Tutorial: Simulate real-time data ingestion into a Fabric map](tutorial-simulate-real-time-data-ingestion.md). It builds directly on this tutorial and reuses the Eventhouse, Eventstream, KQL function, and Map you created.

## Summary

In this tutorial, you provisioned the resources needed for a real-time geospatial solution in Microsoft Fabric, using Fabric REST APIs and Python.

You accomplished the following:

- Created an **Eventhouse and KQL database** using the Fabric REST API
- Created an **Eventstream with a Custom endpoint** for ingesting streaming events
- Defined a **KQL function** to query and shape real-time data for map visualization
- Built and deployed a **Fabric Map with an inline definition** referencing Eventhouse data
- Seeded the Eventstream with initial events so the map displayed data immediately

This architecture demonstrates a common real-time analytics pattern in Fabric:

- External producers send events into Eventstream
- Eventstream routes and ingests data into Eventhouse
- KQL functions transform the data
- Maps query Eventhouse and refresh automatically to reflect new events

By automating resource creation using Python and REST APIs, you now have a repeatable approach for building real-time spatial applications without manual configuration. To drive continuous data into the map, continue with the follow-up simulator tutorial.

## Next steps

Now that you understand the end-to-end flow, you can extend this solution to incorporate a real-time simulator.

For a tutorial that demonstrates creating a real-time simulator for the map you just created using REST APIs, see:

> [!div class="nextstepaction"]
> [Tutorial: Create a real-time data simulator using REST API with Python](tutorial-simulate-real-time-data-ingestion.md)
