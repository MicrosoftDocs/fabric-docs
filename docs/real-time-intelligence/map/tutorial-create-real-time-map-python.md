---
title: Create a real-time map using REST APIs and Python
description: Learn how to automate the creation of a real-time map that uses an eventstream and eventhouse with Fabric REST APIs and Python.
ms.reviewer: smunk, sipa
ms.service: fabric
ms.topic: tutorial
ms.custom: mvc
ms.date: 05/29/2026
ms.search.form: Create a real-time map using REST APIs and Python
---

# Tutorial: Create a real-time map using REST APIs and Python

Fabric Maps can visualize **real-time geospatial data** by connecting to **eventhouse datasets** that are continuously updated through Eventstream ingestion.

Unlike static scenarios that use files stored in a Lakehouse, this tutorial demonstrates a **streaming, event-driven architecture** where:

- Events are ingested into an eventhouse
- Data is queried using Kusto Query Language (KQL)
- A map dynamically refreshes as new data arrives

This tutorial focuses on **automating the end-to-end workflow** using Fabric REST APIs and Python, so you can provision resources and configure a real-time map experience programmatically. For static data scenarios using Lakehouse files, see [Create a static map using REST APIs and Python](tutorial-create-fabric-map-python.md).

In this tutorial, you learn how to build and automate a real-time geospatial solution in Microsoft Fabric using Eventstream, Eventhouse, and KQL.

> [!div class="checklist"]
>
> Using the Fabric REST API, you:
>
> - Create an eventhouse and KQL database
> - Create an eventstream to ingest data into the eventhouse
> - Create a map with an inline definition that references eventhouse data
> - Configure a map layer with periodic refresh for real-time updates
> - Seed initial events so the map displays data immediately

To simulate continuous streaming and watch the map update in near real time, complete this tutorial first, then continue with the follow-up [Tutorial: Simulate real-time data ingestion for a map using REST APIs and Python](tutorial-simulate-real-time-data-ingestion.md), which builds directly on the eventhouse, eventstream, KQL function, and map you create here.

## Scenario overview: Real-time asset tracking

This tutorial is based on a **real-time asset tracking scenario**, similar to the fleet tracking scenario used in the original Fabric Maps [Tutorial: Build real-time work order routing with Fabric Maps](tutorial-real-time-work-order-routing-application.md).

In this scenario:

- Vehicles periodically emit location updates
- Location events are ingested into an eventhouse
- A map displays the latest vehicle positions and updates automatically as new events arrive

This pattern is representative of common real-time operational use cases, such as:

- Fleet tracking
- Work order dispatching
- Asset and equipment monitoring

Microsoft Fabric uses **Eventstream** and **Eventhouse** to ingest, process, and analyze streaming data in near real time, making it possible to visualize live operational data directly on a map.

This tutorial follows a common automation pattern in Fabric: create infrastructure → ingest stream → validate ingestion → render map.

## Prerequisites

- Python 3.10 or later
- Azure CLI
- Fabric workspace ID
- Permissions to call Fabric REST APIs, such as:
  - `Item.ReadWrite.All`

> [!NOTE]
> Delegated scopes such as `Item.ReadWrite.All` are granted to the signed-in identity through its **workspace role**. Make sure the identity you use with `az login` is assigned the **Contributor**, **Member**, or **Admin** role on the target Fabric workspace before running the script.

## Authentication

This tutorial uses `DefaultAzureCredential`, which can authenticate using several local/dev credentials sources. For first-time readers, the simplest approach is Azure CLI sign-in.

### Authenticate locally (recommended for first run)

1. Open a terminal.
1. Run:

```azurecli
az login
```

`DefaultAzureCredential` can use your signed-in identity to acquire access tokens for:

- Fabric REST APIs (resource: `https://api.fabric.microsoft.com/.default`)
- Kusto (KQL) data-plane queries against the eventhouse (resource: `https://api.kusto.windows.net/.default`)
- Power BI / Fabric REST endpoints used for long-running operation polling (resource: `https://analysis.windows.net/powerbi/api/.default`)

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

## Create the seed data file (initial map data)

To ensure the map displays data immediately after provisioning, the script sends a small set of seed events to the eventstream.

1. Create a new file in the same directory as your Python script: **vehicle_locations_seed.csv**
1. Paste the following content:

```csv
VehicleId,Latitude,Longitude,EventTime
V-001,47.6101,-122.3344,2026-01-01T10:00:00Z
V-002,47.6150,-122.3200,2026-01-01T10:00:00Z
V-003,47.6205,-122.3493,2026-01-01T10:00:00Z
V-004,47.6050,-122.3300,2026-01-01T10:00:00Z
```

## Step 1—Create a new Python project file

In this step, you create a blank Python file that you build up section-by-section.

Create a new file named:

```text
create_realtime_map.py
```

Open the file in your editor.

## Step 2—Install required libraries and add required import statements

In this step, you install the dependencies and add the imports your script uses.

### Install required libraries

In the terminal window you just opened, run the following command:

```bash
pip install httpx azure-identity azure-eventhub
```

#### What each library is for

- **httpx**: makes HTTP requests to the Fabric REST APIs.
- **azure-identity**: provides `DefaultAzureCredential` for Microsoft Entra authentication.
- **azure-eventhub**: sends seed events to the Eventstream's Event Hub-compatible endpoint to populate the eventhouse.

### Add import statements to your .py file

At the top of **create_realtime_map.py**, add:

```python
import base64
import csv
import json
import os
import time
import uuid

import httpx
from azure.eventhub import EventData, EventHubProducerClient
from azure.eventhub.exceptions import EventHubError
from azure.identity import DefaultAzureCredential
```

> [!NOTE]
> `EventHubError` is imported here but not used until later in the script. The `seed_eventstream_from_csv` helper catches it (alongside `ConnectionError` and `TimeoutError`) in its retry loop so that transient Event Hub send failures—such as the custom endpoint not yet being ready—trigger a retry instead of aborting the script.

## Step 3—Add a configuration section

In this step, you define the variables your application uses, including the workspace ID and resource names.

Centralizing configuration in a single `Config` class — rather than scattering hard-coded values across functions — gives you three concrete advantages:

- **Environment portability**: Workspace IDs, resource names, and other settings live in one place, so you can rerun the script against a different workspace or machine by changing a few lines (or an environment variable) instead of hunting through the code.
- **Cleaner function signatures**: Step functions accept a single `cfg` object instead of long parameter lists, which keeps the orchestration in `main()` easy to read.
- **Safer secrets handling**: Sensitive values such as the workspace ID are loaded from environment variables, so they're never committed alongside the script.

Add the following below the [import](#add-import-statements-to-your-py-file) statements:

```python
# =========================================================
# Configuration (centralized)
# =========================================================

class Config:
    """
    Central configuration: workspace ID, resource display names, and
    ingestion settings. A single instance is built in main() and passed
    to each step function.
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
        self.eventstream_description = "Streams events into an eventhouse table (created via Eventstream REST API)"

        self.map_display_name = "My Real-Time Fabric Map"
        self.map_description = "Created using Fabric Maps REST API (Eventhouse + Eventstream + Kusto function)"

        # Map refresh
        self.refresh_interval_ms = 5000

        # Seed data (initial map data)
        self.seed_csv_path = os.path.join(os.path.dirname(__file__), "vehicle_locations_seed.csv")
        
        # Will be provided interactively after eventstream is created
        self.eventhub_connection_string = os.environ.get("EVENTHUB_CONNECTION_STRING", "")
```

### Set the workspace ID using an environment variable

Instead of hardcoding the workspace ID directly in the script, this tutorial reads it from an environment variable. This keeps environment-specific values out of source code and lets you reuse the script across workspaces or machines without editing it.

Before running the script, create an environment variable named `FABRIC_WORKSPACE_ID`.

> [!IMPORTANT]
> An environment variable set from a terminal exists only inside **that single terminal session**. It isn't shared with other terminal windows, with a different shell type, or with processes launched outside that terminal—including scripts started from VS Code's run button, which often spawns its own terminal. If the script can't find the variable, it fails with `Set FABRIC_WORKSPACE_ID environment variable before running the script`.
>
> To avoid this, either run the script from the **same terminal session** where you set the variable, or set it persistently (see the Windows and macOS/Linux sections that follow) so every new terminal session picks it up automatically.

#### Set the environment variable on Windows

On Windows, you can set the variable from any terminal that supports environment variables—PowerShell, Windows PowerShell, the PowerShell or Command Prompt windows built into Visual Studio and Visual Studio Code, Windows Terminal, and most other shells.

Run the following in PowerShell or the VS Code integrated terminal:

```powershell
$env:FABRIC_WORKSPACE_ID="<WORKSPACE_ID>"
```

To confirm the variable is set:

```powershell
echo $env:FABRIC_WORKSPACE_ID
```

This sets the variable for the current terminal session only.

##### Set a persistent environment variable (Windows)

To make the variable available in future sessions, use either of the following:

- **PowerShell (one-liner)**: Run `setx FABRIC_WORKSPACE_ID "<WORKSPACE_ID>"`. The `setx` command writes to the user environment but doesn't update the current terminal—close and reopen the terminal (or open a new one) before running the script.
- **GUI**:
  1. Open **System Properties**.
  1. Select **Advanced system settings**.
  1. Choose **Environment Variables**.
  1. Under **User variables**, select **New**.
  1. Enter:
     - Name: `FABRIC_WORKSPACE_ID`
     - Value: your workspace ID
  1. Select **OK** to save.
  1. Close and reopen your terminal before running the script again.

#### Set the environment variable on macOS or Linux

On macOS and Linux, you can set the variable from any shell that supports `export`—Bash, Zsh (the default on modern macOS), Fish (with a slightly different syntax), and the integrated terminals in Visual Studio Code and other editors.

Run:

```bash
export FABRIC_WORKSPACE_ID="<WORKSPACE_ID>"
```

To confirm the variable is set:

```bash
echo $FABRIC_WORKSPACE_ID
```

This sets the variable for the current shell session only.

##### Set a persistent environment variable (macOS or Linux)

To make the variable available in future sessions, add the `export` line to your shell profile:

- **Zsh** (default on macOS): `~/.zshrc`
- **Bash**: `~/.bashrc` (Linux) or `~/.bash_profile` (macOS)
- **Fish**: run `set -Ux FABRIC_WORKSPACE_ID "<WORKSPACE_ID>"` instead of editing a file

After updating the profile, either open a new terminal or run `source ~/.zshrc` (or the appropriate file) so the change takes effect.

## Step 4—Add helper functions

In this step, you factor out cross-cutting concerns—authentication, header construction, long-running operation polling, and retry logic—into a small set of reusable helpers that every step function can call.

Centralizing these concerns in helpers — rather than inlining them at every call site — gives you three concrete advantages:

- **Single source of truth for cross-cutting concerns**: Authentication, headers, and LRO polling are needed by nearly every API call. Centralizing them keeps each step function focused on its own resource instead of re-implementing token acquisition and retry logic.
- **Resilience without clutter**: Helpers absorb transient conditions—asynchronous provisioning, backend propagation delay, retryable send failures—so step functions stay short and read like a checklist.
- **Easier to teach and modify**: Each helper is introduced once and reused. If Fabric changes an LRO pattern or an auth scope, you fix it in one place.

The helpers you add in this step are:

- **Auth helpers**: build headers for Fabric REST APIs (and Power BI cluster LRO endpoints)
- **FabricClient**: lightweight wrapper for consistent API calls
- **LRO handler**: poll long-running operations using `Location` / `x-ms-operation-id` / `Retry-After`, including `200`-with-`Running` responses, Power BI cluster endpoints, and status-only completion payloads (resolves by `displayName`)
- **Definition payload helper**: base64-encode `map.json` for inline definitions
- **Eventstream connection helper**: prompts for the custom endpoint connection string
- **Seed helper**: sends initial events with retry logic to ensure ingestion succeeds
- **KQL database readiness helper**: waits for the KQL database to become available to Fabric Maps

> [!NOTE]
> This tutorial spans two planes:
>
> - **Control plane** (Fabric REST APIs): create Eventhouse, Eventstream, and Map resources
> - **Data/query plane** (Kusto management API): create and manage KQL tables and functions inside the eventhouse

### Create authentication helper functions

Every Fabric REST call this tutorial makes carries a Microsoft Entra access token (bearer token) in the `Authorization` header. Rather than acquiring tokens ad hoc, this step wraps `DefaultAzureCredential` in a small `TokenProvider` and exposes an audience-specific header builder for each endpoint family the script calls.

Centralizing token acquisition and header construction in helpers — rather than acquiring tokens at every call site — gives you three concrete advantages:

- **Centralized credential**: A single `DefaultAzureCredential` is wrapped in `TokenProvider` and reused for every API call, so identity discovery (Azure CLI, VS Code, managed identity, etc.) happens once.
- **Audience-aware tokens**: Fabric, Kusto, and Power BI cluster endpoints reject tokens issued for the wrong audience. A separate header builder per audience keeps the correct scope right next to the call site, so it's obvious which endpoint each function is targeting.
- **Fresh on every request**: Header builders construct the `Authorization` header on demand rather than caching the token themselves. The underlying credential refreshes transparently, so call sites never have to think about expiry.

This tutorial calls Fabric REST APIs using delegated scopes such as `Item.ReadWrite.All`.

Add the following after the `Config` class:

```python
# =========================================================
# Auth helpers
#
# Authentication utilities built on `DefaultAzureCredential` that acquire and
# construct Authorization headers for calling Fabric REST APIs.
# =========================================================

class TokenProvider:
    """
    Thin wrapper around `DefaultAzureCredential` that acquires Entra access
    tokens. `_fabric_headers()` and `_pbi_headers()` call `get()` per
    request so the Authorization header is always fresh; the underlying
    credential refreshes transparently.
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
    Build headers for Kusto (Eventhouse `queryServiceUri`) management and query calls.
    """
    return {
        "Authorization": f"Bearer {_tokens.get('https://api.kusto.windows.net/.default')}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }


def _pbi_headers() -> dict[str, str]:
    """
    Build headers for polling Power BI cluster LRO endpoints
    (e.g., df-*.analysis.windows.net) that require a Power BI audience token.
    """
    return {
        "Authorization": f"Bearer {_tokens.get('https://analysis.windows.net/powerbi/api/.default')}",
        "Content-Type": "application/json"
    }
```

> [!NOTE]
> Some Fabric long-running operations (LROs) are hosted on Power BI cluster endpoints (`*.analysis.windows.net`) rather than on `api.fabric.microsoft.com`. Those endpoints require a Power BI audience token, so the LRO helper switches to `_pbi_headers()` automatically when it detects that polling URL.

### Create a Fabric client wrapper

Most Fabric REST calls in this tutorial send the same `Authorization` and `Content-Type` headers. Rather than repeating them at every call site, this tutorial wraps `httpx.Client` in a small `FabricClient` that attaches the headers automatically while still returning the raw `httpx.Response` so each caller can inspect status codes (for example, to distinguish `201` from `202`).

Wrapping `httpx.Client` like this — rather than passing `headers=_fabric_headers()` at every call site — gives you two concrete advantages:

- **Headers in one place**: Every call site picks up the latest `_fabric_headers()` automatically, so a new request can't accidentally be sent without the `Authorization` header.
- **Status codes stay visible**: `request()` returns the raw `httpx.Response` instead of decoded JSON, so call sites can still branch on status (`201` vs `202`) and inspect headers like `Location` or `Retry-After` for LRO handling.

Add the following after the authentication helper functions:

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
```

### Create an LRO helper function

Several Fabric REST APIs used in this tutorial — such as Create Eventhouse, Create Eventstream, and Create Map — support **long-running operations (LROs)**.

These APIs can return responses in several patterns:

- **`201 Created`** with the resource body inline (synchronous)
- **`202 Accepted`** with a `Location` header pointing at an operation status URL (asynchronous)
- **`202 Accepted`** with an `x-ms-operation-id` header instead of `Location` (asynchronous, alternate form)
- **`200 OK`** with `status: "Running"` or `status: "NotStarted"` while polling (still in progress)
- **`200 OK`** with `status: "Succeeded"` but no resource ID in the body (succeeded; resolve by listing and matching `displayName`)

To handle all of these consistently, you create a single helper function that:

1. Returns the resource ID immediately if the initial response already contains it.
1. Otherwise polls the operation URL (built from either `Location` or `x-ms-operation-id`) using `Retry-After`.
1. Treats `200 OK` with `status: "Running"` / `"NotStarted"` as still in progress and continues polling.
1. On success, returns the resource ID from the body, or falls back to listing resources and matching by `displayName` (with retries) when the body is status-only.
1. Uses `_pbi_headers()` when the polling URL is on a Power BI cluster (`*.analysis.windows.net`), and Fabric headers otherwise.

This single helper replaces the need for per-resource "resolve by name" helpers — every `create_*` function in this tutorial calls `_handle_lro` with the appropriate `list_url` and `match_display_name`.

Add the following after the `FabricClient` class:

```python
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
    max_attempts: int = 10,
    delay: int = 5,
) -> str:
    """
    Handle a Fabric long-running operation (LRO) and return the resource id.

    Supports the response patterns used by Fabric REST APIs:
    - 200/201 with the resource body inline (synchronous).
    - 202 with a `Location` header or `x-ms-operation-id` (asynchronous).
    - 200 with `status: "Running"` / `"NotStarted"` while polling.
    - 200 with `status: "Succeeded"` but no id (resolve by listing and matching `displayName`).

    Polling uses `Retry-After` and switches to a Power BI audience token when
    the operation URL is on `*.analysis.windows.net`.
    """
    # Sync 200/201 with body: return the id immediately.
    if initial_response.status_code in (200, 201):
        try:
            body = initial_response.json() if initial_response.content else {}
        except ValueError:
            body = {}
        if isinstance(body, dict) and body.get(id_field):
            return body[id_field]

    # Location header, with x-ms-operation-id fallback.
    op_url = initial_response.headers.get("Location")
    if not op_url:
        op_id = initial_response.headers.get("x-ms-operation-id")
        if op_id:
            op_url = f"https://api.fabric.microsoft.com/v1/operations/{op_id}"
        else:
            raise RuntimeError(
                f"Missing LRO Location/x-ms-operation-id. "
                f"status={initial_response.status_code} body={initial_response.text[:500]!r}"
            )

    # Audience-aware polling: Power BI cluster endpoints need a different token.
    poll_headers = _pbi_headers() if "analysis.windows.net" in op_url else _fabric_headers()
    retry_after = int(initial_response.headers.get("Retry-After", "5"))

    while True:
        time.sleep(retry_after)
        poll = client.get(op_url, headers=poll_headers)

        if poll.status_code == 202:
            retry_after = int(poll.headers.get("Retry-After", "5"))
            continue

        poll.raise_for_status()
        body = poll.json() if poll.content else {}
        status = body.get("status") if isinstance(body, dict) else None

        if status in ("Running", "NotStarted"):
            retry_after = int(poll.headers.get("Retry-After", "5"))
            continue
        if status == "Failed":
            raise RuntimeError(f"LRO failed. Body: {body}")

        if isinstance(body, dict) and body.get(id_field):
            return body[id_field]

        # Status-only success: list and match by displayName, with retries.
        if status == "Succeeded" and list_url and match_display_name:
            for attempt in range(max_attempts):
                r = client.get(list_url, headers=_fabric_headers())
                r.raise_for_status()
                match = next(
                    (i for i in r.json().get("value", []) if i.get("displayName") == match_display_name),
                    None,
                )
                if match and match.get(id_field):
                    return match[id_field]
                time.sleep(delay)
            raise RuntimeError(
                f"LRO succeeded but resource not visible after retries. "
                f"match_display_name={match_display_name!r}"
            )

        raise RuntimeError(f"LRO completed but no resource id was returned. Body: {body}")
```

> [!NOTE]
> Newly created resources might not appear immediately when calling list APIs because of backend propagation delays. The helper function automatically retries until the resource becomes visible.

### Definition payload helper

When you create a map with a **public definition**, the Create map REST API expects each part in `definition.parts` to carry a base64-encoded payload with `"payloadType": "InlineBase64"`. The `_json_to_b64` helper encodes a Python `dict` (your `map.json`) into that format so `create_map` can drop it straight into the request body.

Add the following after the `_handle_lro` function:

```python
# =========================================================
# Definition payload helper
#
# Encodes map.json as base64 for inline Create map payloads.
# =========================================================

def _json_to_b64(obj: dict) -> str:
    """
    Convert a Python dict to base64-encoded JSON text.

    Fabric Map "Create Map with definition inline" requires:
    - definition.parts[].payloadType = InlineBase64
    - definition.parts[].payload     = base64(json(map_json))
    """
    return base64.b64encode(json.dumps(obj).encode("utf-8")).decode("utf-8")

```

### Create helper to provide eventstream connection string

To send events to the eventstream's custom endpoint, the script needs a **connection string** for that endpoint.

Unlike the Fabric REST APIs you've been calling so far (which are control-plane operations for creating and managing resources), eventstream ingestion uses an **Event Hubs-compatible data-plane endpoint**, and that endpoint authenticates with a SAS-based connection string rather than a Microsoft Entra token. The connection string is created when you add the custom endpoint source and isn't exposed by the Fabric REST API, so it has to be copied from the Fabric portal.

`get_eventhub_connection_string_interactive` either reuses a value from the `EVENTHUB_CONNECTION_STRING` environment variable (handy on repeat runs) or prompts you for it at runtime, then caches it on `cfg` so later steps can reuse it without prompting again.

Add the following after the `_json_to_b64` function:

```python
def get_eventhub_connection_string_interactive(cfg: Config) -> str:
    """
    Prompt for (or read) the eventstream custom endpoint connection string.

    The connection string is created when the custom endpoint source is added
    to the eventstream and isn't exposed by the Fabric REST API, so we read it
    from the `EVENTHUB_CONNECTION_STRING` environment variable when set, or
    prompt interactively otherwise. The value is cached on `cfg` for reuse.
    """
    if getattr(cfg, "eventhub_connection_string", None):
        return cfg.eventhub_connection_string

    print("\n=== Eventstream connection string required ===")
    print("In the Fabric portal:")
    print("  1) Open the eventstream you just created")
    print("  2) Select the custom endpoint source")
    print("  3) Select SAS Key Authentication")
    print("  4) Copy Connection string-primary key\n")

    cfg.eventhub_connection_string = input("Paste connection string here: ").strip()

    if not cfg.eventhub_connection_string:
        raise RuntimeError("Connection string cannot be empty.")

    return cfg.eventhub_connection_string

```

> [!NOTE]
> The connection string is separate from the Microsoft Entra access token used for Fabric REST APIs.
> The REST API token is used for resource management, whereas the eventstream connection string is used for streaming data ingestion.

### Create helper to seed initial events from CSV

To ensure the map displays data immediately after it's created, the script sends a small set of **seed events** into the eventstream before creating the map.

Without this step, the Eventhouse table may not yet contain any data, and the map could appear empty on first load.

This helper function reads data from a local CSV file and sends each row as a JSON event to the eventstream using the EventHub protocol.

Because Eventstream resources are provisioned asynchronously, the custom endpoint may not be immediately ready to accept events after creation. To handle this, the helper function includes built-in retry logic that automatically attempts to send events until the endpoint is available. This ensures the initialization process is reliable and repeatable and doesn't require manual timing adjustments.

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
    Send seed events from a CSV with retries to handle eventstream readiness delay.
    """
    conn_str = get_eventhub_connection_string_interactive(cfg)

    last_error = None
    for attempt in range(1, max_attempts + 1):
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

Once the eventhouse, its KQL database, and the KQL function exist, the KQL database might still not be immediately resolvable from other Fabric REST endpoints. Fabric services run on distributed backends, so a newly created resource can take a short time to propagate across them.

If you call Create Map immediately after the KQL function is in place, Create Map might fail to resolve the data source and return an error such as *Kusto database not found*.

`wait_for_kql_database_ready` polls the Fabric REST endpoint for the KQL database and returns as soon as it responds `200 OK`. It's a best-effort gate — a successful response on this control-plane endpoint is a strong proxy that Maps can also resolve the database — and it raises `RuntimeError` after `max_attempts` if the database never becomes visible.

Add the following after the `seed_eventstream_from_csv` function:

```python
# =========================================================
# KQL database readiness helper
#
# Polls the KQL database's Fabric REST endpoint until it
# responds 200, as a best-effort gate before Create Map
# references it as a data source.
# =========================================================

def wait_for_kql_database_ready(
    client: httpx.Client,
    cfg: Config,
    kql_database_item_id: str,
    max_attempts: int = 10,
    delay: int = 3,
) -> None:
    """
    Poll the Fabric REST endpoint for a KQL database until it returns 200.

    Acts as a best-effort readiness gate before calling Create Map with the
    KQL database as a data source. Retries `max_attempts` times with `delay`
    seconds between attempts, then raises `RuntimeError` if the database
    never becomes visible.
    """
    url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/kqlDatabases/{kql_database_item_id}"
    for attempt in range(1, max_attempts + 1):
        resp = client.get(url, headers=_fabric_headers())
        if resp.status_code == 200:
            print("KQL database is available to Fabric Maps")
            return
        print(
            f"Waiting for KQL database availability "
            f"(attempt {attempt}/{max_attempts}, status={resp.status_code})..."
        )
        time.sleep(delay)

    raise RuntimeError(
        f"KQL database {kql_database_item_id!r} did not become available after {max_attempts} attempts."
    )
```

## Create primary functions

Next, you add the primary functions that define the workflow. These are all called from `main()`.

The functions are added in the order they're defined in code. `main()` calls them in a slightly different order so the KQL table exists before the eventstream binds to it, and so seeded data is available before verification runs.

- Create an eventhouse
- Create the KQL table
- Verify ingestion (called after seeding)
- Create an eventstream
- Create a KQL function
- Build the map definition (`map.json`)
- Build the platform metadata (`.platform`)
- Create the map

### Create an eventhouse

`create_eventhouse` creates an eventhouse in the workspace and returns its item ID. The Create Eventhouse REST API can answer the same call in three different ways:

- **`201 Created`** with the eventhouse ID inline (synchronous).
- **`202 Accepted`** with an LRO operation URL (asynchronous).
- **`409 Conflict`** with `x-ms-public-api-error-code` set to either `ItemDisplayNameNotAvailableYet` (the previous name is still reserved on the backend) or `ItemDisplayNameAlreadyInUse` (an eventhouse with that name already exists in the workspace).

To handle all three reliably, `create_eventhouse`:

- Delegates `201` and `202` responses to `_handle_lro`, which already covers synchronous and asynchronous completion uniformly.
- Honors `Retry-After` and retries (up to five attempts) on `ItemDisplayNameNotAvailableYet`.
- Reuses the existing eventhouse on `ItemDisplayNameAlreadyInUse` by listing eventhouses in the workspace and matching by `displayName`.
- Falls back to a uniquified display name (suffixed with a short UUID) if the name never becomes available after the retry budget is exhausted, so the script can still make forward progress.

Add the following after the `wait_for_kql_database_ready` function:

```python
# =========================================================
# Create an eventhouse
# =========================================================

def create_eventhouse(client: httpx.Client, fabric: FabricClient, cfg: Config) -> str:
    """
    Create an eventhouse in the workspace and return its item ID.

    Handles the three response patterns Create Eventhouse can return:
    - 201/202: delegate to `_handle_lro` (synchronous body or LRO completion).
    - 409 `ItemDisplayNameNotAvailableYet`: honor `Retry-After` and retry.
    - 409 `ItemDisplayNameAlreadyInUse`: list eventhouses and reuse the one
      whose `displayName` matches `cfg.eventhouse_display_name`.

    If the name remains unavailable after the retry budget, falls back to a
    uniquified display name (suffixed with a short UUID) so the script can
    still make forward progress.
    """
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

        # 201/202: success or LRO — _handle_lro handles both.
        if eh_resp.status_code in (201, 202):
            eventhouse_id = _handle_lro(
                client, eh_resp,
                list_url=eventhouse_url,
                match_display_name=cfg.eventhouse_display_name,
            )
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
                r = client.get(eventhouse_url, headers=_fabric_headers())
                r.raise_for_status()
                match = next(
                    (i for i in r.json().get("value", []) if i.get("displayName") == cfg.eventhouse_display_name),
                    None,
                )
                if match and match.get("id"):
                    return match["id"]
                raise RuntimeError(
                    f"Eventhouse {cfg.eventhouse_display_name!r} reported as existing but not found in list."
                )

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

### Create KQL table

`create_kql_table_if_missing` ensures the destination table exists in the KQL database before the eventstream starts writing to it. The eventstream destination you create later is configured with `ProcessedIngestion` and a fixed `tableName`, so the table must already exist when events arrive — otherwise ingestion fails.

The function issues a `.create-merge table` command against the eventhouse's Kusto management endpoint (`queryServiceUri` + `/v1/rest/mgmt`). `.create-merge` is idempotent: it creates the table if it doesn't exist, and merges the schema if it does. That makes it safe to call on every run.

Before issuing the command, the function reads the eventhouse properties to get `queryServiceUri` and the KQL database item ID, then resolves the database's `displayName` so the `mgmt` payload references it by name rather than by ID.

Add the following after the `create_eventhouse` function:

```python
# =========================================================
# Create the KQL table (idempotent)
# =========================================================

def create_kql_table_if_missing(client: httpx.Client, fabric: FabricClient, cfg: Config, eventhouse_id: str) -> None:
    """
    Create or merge the destination table in the eventhouse's KQL database.

    Reads the eventhouse properties to discover `queryServiceUri` and the KQL
    database item ID, resolves the database's `displayName`, then issues a
    `.create-merge table` command against the Kusto management endpoint.
    `.create-merge` is idempotent: it creates the table if missing and merges
    the schema if it already exists.
    """
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

### Verify data ingestion

`verify_eventhouse_data` confirms that events seeded into the eventstream actually landed in the eventhouse table. It polls a `<table> | count` query against the eventhouse's Kusto **query** endpoint (`queryServiceUri` + `/v1/rest/query`) until the returned count is greater than zero, or fails after a timeout. Eventstream ingestion takes a few seconds to flow from the custom endpoint into the table, so polling — rather than a single query — is what gives a confident pass/fail signal.

It's defined next to `create_kql_table_if_missing` because both helpers look up the same eventhouse properties (`queryServiceUri`, `databasesItemIds`) and resolve the KQL database's `displayName`. It's called from `main()` *after* `seed_eventstream_from_csv` so the seeded events have a chance to flow through the eventstream and reach the table before the count runs.

Running this check up front catches ingestion misconfiguration early — for example, an eventstream destination wired to the wrong table name — instead of letting it surface later as an empty map.

Add the following after the `create_kql_table_if_missing` function:

```python
# =========================================================
# Verify data ingestion (called after seeding)
# =========================================================

def verify_eventhouse_data(client: httpx.Client, fabric: FabricClient, cfg: Config, eventhouse_id: str):
    """
    Poll a count query against the eventhouse table until rows arrive.

    Reads the eventhouse properties to get `queryServiceUri` and the KQL
    database item ID, resolves the database's `displayName`, then polls
    `<table> | count` against the Kusto query endpoint
    (`queryServiceUri` + `/v1/rest/query`) until the count is greater than
    zero or the timeout elapses. Eventstream ingestion is asynchronous, so
    polling avoids a false negative when the query runs before seeded
    events have landed in the table.
    """

    # Reuse your existing pattern to get KQL DB info
    eh = fabric.request("GET", f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/eventhouses/{eventhouse_id}")
    eh.raise_for_status()

    props = eh.json().get("properties") or {}
    db_ids = props.get("databasesItemIds") or []
    query_service_uri = props.get("queryServiceUri")

    if not db_ids or not query_service_uri:
        raise RuntimeError("Missing eventhouse properties for verification")

    db_id = db_ids[0]

    db_resp = fabric.request("GET", f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/kqlDatabases/{db_id}")
    db_resp.raise_for_status()

    db_name = db_resp.json().get("displayName")

    # Simple count query
    csl = f"{cfg.eventhouse_table_name} | count"
    query_url = f"{query_service_uri}/v1/rest/query"

    max_attempts = 12
    delay_seconds = 5

    for attempt in range(1, max_attempts + 1):
        resp = client.post(
            query_url,
            headers=_kusto_headers(),
            json={"db": db_name, "csl": csl}
        )

        if resp.status_code >= 400:
            raise RuntimeError(f"Verification query failed: {resp.text}")

        # Kusto v1 query response: Tables[0].Rows[0][0] holds the count.
        count = resp.json()["Tables"][0]["Rows"][0][0]
        print(f"Data verification attempt {attempt}/{max_attempts}: count = {count}")

        if count > 0:
            print(f"Data ingestion verified: {count} row(s) in {cfg.eventhouse_table_name}")
            return

        if attempt < max_attempts:
            time.sleep(delay_seconds)

    raise RuntimeError(
        f"Data verification failed: no rows in {cfg.eventhouse_table_name} after "
        f"{max_attempts * delay_seconds}s"
    )
```

### Create eventstream with definition

`create_eventstream_with_definition` creates an eventstream in the workspace with its full topology baked into the request, then returns the eventstream's item ID. Using a public definition lets you provision the eventstream and wire up its sources, streams, and destinations in a single call, instead of creating the eventstream first and then patching its definition.

Before sending the request, the function reads the eventhouse properties to get the KQL database item ID and resolves the database's `displayName` so the destination references it by name rather than by ID. It then builds an eventstream graph with a `CustomEndpoint` source, a `DefaultStream`, and an `Eventhouse` destination configured with `ProcessedIngestion` and the fixed `tableName` from `cfg`, base64-encodes the graph as the `eventstream.json` part, and POSTs it to Create Eventstream.

The Create Eventstream REST API can answer with `201 Created` (synchronous, body inline), `202 Accepted` (asynchronous LRO via `Location` or `x-ms-operation-id`), or `200 OK` with a status-only completion payload where the eventstream isn't yet visible in the List Eventstreams response because of backend propagation delay. `_handle_lro` covers all of these cases — including listing and matching by `displayName` — so this function delegates the full response handling to it in a single call.

Add the following after the `verify_eventhouse_data` function:

```python
# =========================================================
# Create eventstream with definition
# =========================================================

def create_eventstream_with_definition(client: httpx.Client, fabric: FabricClient, cfg: Config, eventhouse_id: str) -> str:
    """
    Create an eventstream with a public definition and return its item ID.

    Reads the eventhouse properties to discover the KQL database item ID and
    resolves the database's `displayName`, then builds an eventstream graph
    with a `CustomEndpoint` source, a `DefaultStream`, and an `Eventhouse`
    destination configured with `ProcessedIngestion` and the table name from
    `cfg`. Base64-encodes the graph as the `eventstream.json` part, POSTs it
    to Create Eventstream, and delegates response handling to `_handle_lro`.
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

    eventstream_id = _handle_lro(
        client,
        es_resp,
        list_url=eventstream_url,
        match_display_name=cfg.eventstream_display_name,
    )

    print("Eventstream created. Eventstream ID:", eventstream_id)
    return eventstream_id
```

### Create KQL function

`create_kql_function` creates (or updates) a stored Kusto function in the eventhouse's KQL database and returns the KQL database's item ID so the caller can wire the map's data source to it. The function — `LatestVehicleLocations` by default — returns the most recent row per `VehicleId` via `arg_max(EventTime, *)`, projecting `Latitude`, `Longitude`, `VehicleId`, and `EventTime` so Fabric Maps can bind the layer's latitude and longitude columns.

Like `create_kql_table_if_missing`, this helper runs against the eventhouse's Kusto management endpoint (`queryServiceUri` + `/v1/rest/mgmt`) and is idempotent: `.create-or-alter function` creates the function if it doesn't exist and replaces its body if it does, so the helper is safe to call on every run.

The command is sent with `skipvalidation=true` because the function body references the destination table through `table("<name>")` rather than as a bare identifier. The `table()` form defers name resolution to query time, so validation at creation time would otherwise fail if the table hasn't yet received any data and its schema isn't fully visible to the validator. Pairing `skipvalidation=true` with `table("...")` lets the function be created before ingestion has populated the table, which is the order this tutorial runs in.

Add the following after the `create_eventstream_with_definition` function:

```python
# =========================================================
# Create KQL function
# =========================================================

def create_kql_function(client: httpx.Client, fabric: FabricClient, cfg: Config, eventhouse_id: str) -> str:
    """
    Create or update the stored Kusto function used by the map layer.

    Reads the eventhouse properties to discover `queryServiceUri` and the
    KQL database item ID, resolves the database's `displayName`, then
    issues a `.create-or-alter function` command against the Kusto
    management endpoint with `skipvalidation=true` and a `table("...")`
    reference so the function can be created before the destination table
    has any data. Returns the KQL database item ID so the caller can wire
    the map's data source to it.
    """
    # Get eventhouse properties (queryServiceUri + databasesItemIds)
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

`build_map_json` builds and returns the `map.json` payload that defines the Fabric Map's contents. The payload follows the map item definition schema and is composed of four sections: `dataSources` (where data comes from), `iconSources` (optional custom markers), `layerSources` (what is queried and how often), and `layerSettings` (how the result is rendered on the map).

For this tutorial, `dataSources` points at the KQL database (`itemType: "KqlDatabase"`) created earlier, and the single entry in `layerSources` is a Kusto-backed layer (`type: "kusto"`, `queryType: "function"`) whose `query` calls the stored function `LatestVehicleLocations()`. `refreshIntervalMs` is read from `cfg.refresh_interval_ms` (5000 ms by default), so the layer re-runs the function on a timer and the map reflects new ingestion in near real time.

The matching `layerSettings` entry binds the layer's result columns to the map via `latitudeColumnName: "Latitude"` and `longitudeColumnName: "Longitude"`, renders each row as a `bubble` point, and surfaces `VehicleId` and `EventTime` in tooltips. The function prints the assembled payload so you can inspect the exact JSON the Create Map call sends.

For more information on the map definition REST API, see [Map item definition](/rest/api/fabric/articles/item-management/definitions/map-definition).

Add the following after the `create_kql_function` function:

```python
# =========================================================
# Build map.json
# =========================================================

def build_map_json(cfg: Config, kql_database_item_id: str) -> dict:
    """
    Build and return the map.json payload for the Fabric Map.

    Wires `dataSources` to the KQL database created earlier, defines a
    single Kusto-backed layer in `layerSources` that calls the stored
    function `cfg.kql_function_name` and re-runs it every
    `cfg.refresh_interval_ms` milliseconds, and configures `layerSettings`
    to bind the `Latitude` / `Longitude` columns and render each row as a
    bubble point. Prints the assembled payload for inspection.
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

`build_platform_json` builds and returns an optional `.platform` part that the Create Map call can include alongside `map.json` when you want to set non-default item metadata on the Map. Including a `.platform` part isn't required — Fabric applies default metadata when the part is omitted — but this tutorial shows how to author one so you can reuse the pattern when you do need explicit control over the item type, display name, description, or a stable logical identifier.

The payload follows the platform-properties schema and has two sections: `metadata` (`type: "Map"`, `displayName`, `description`) and `config` (`version`, `logicalId`). The `logicalId` is generated as a fresh UUID here, which is fine for a one-shot create; if you plan to redeploy the same map through Git integration or repeated runs, pin `logicalId` to a stable value so updates target the same item.

For more information, see [Map item definition](/rest/api/fabric/articles/item-management/definitions/map-definition) and [Item definition overview](/rest/api/fabric/articles/item-management/definitions/item-definition-overview).

Add the following after the `build_map_json` function:

```python
# =========================================================
# Build .platform (platform metadata)
# =========================================================

def build_platform_json(cfg: Config) -> dict:
    """
    Build and return the optional .platform payload for a Fabric Map item.

    The map definition supports an optional .platform part alongside
    map.json that carries non-default item metadata: the item type,
    display name and description, and a `logicalId` used for
    deterministic updates. Fabric applies defaults when the part is
    omitted, so this payload is only needed when you want explicit
    control over those fields. A fresh UUID is used for `logicalId`
    here; pin it to a stable value if repeat runs should target the
    same item.
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

### Create a map with inline definition

`create_map` creates the map by POSTing the inline definition you've assembled and returns the new Map's item ID. The request carries three base64-encoded parts under `payloadType: "InlineBase64"`: `map.json` (the required core definition), the optional `.platform` metadata you built in the previous step, and a Kusto query file named `queries/layerSource-<layerSourceId>.kql` that contains the call to the stored KQL function. Bundling all three parts in a single call provisions the map and wires its data layer to the KQL function atomically, so no follow-up `getDefinition` / `updateDefinition` round trip is needed.

The query file's name matters: Fabric resolves a layer's query by matching `queries/layerSource-<layerSourceId>.kql` against the `id` of the corresponding entry in `layerSources`, so the function pulls the layer source ID out of `map_json["layerSources"][0]["id"]` to construct the path. `map.json` and `.platform` are base64-encoded through `_json_to_b64`; the query text is base64-encoded directly because it's a string rather than a `dict`.

The Create Map REST API can answer with `201 Created` (synchronous, ID inline), `202 Accepted` (asynchronous LRO via `Location` or `x-ms-operation-id`), or `200 OK` with a status-only completion payload where the map isn't yet visible in List Maps because of backend propagation delay. `_handle_lro` covers all of these cases — including listing and matching by `displayName` — so this function delegates the full response handling to it in a single call.

For more information, see [Map item definition](/rest/api/fabric/articles/item-management/definitions/map-definition).

Add the following after the `build_platform_json` function:

```python
# =========================================================
# Create a map with inline definition
# =========================================================


def create_map(client: httpx.Client, fabric: FabricClient, cfg: Config, map_json: dict, platform_json: dict) -> str:
    """
    Create the Fabric Map with its definition inline and return its item ID.

    Sends a single Create Map request whose `parts` array carries three
    base64-encoded payloads: `map.json` (the required core definition),
    the optional `.platform` metadata, and a Kusto query file named
    `queries/layerSource-<layerSourceId>.kql` whose `<layerSourceId>`
    matches `map_json["layerSources"][0]["id"]` so Fabric can bind the
    query to the layer. Delegates response handling to `_handle_lro`,
    which covers synchronous, asynchronous, and status-only completions.
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

    return _handle_lro(
        client, map_resp,
        list_url=create_map_url,
        match_display_name=cfg.map_display_name,
    )
```

## Orchestrate the workflow

`main` is the single entry point that runs the tutorial end-to-end. It instantiates `Config`, opens one `httpx.Client` reused across every helper, wraps it in a `FabricClient`, then calls each step function in dependency order: `create_eventhouse` → `create_kql_table_if_missing` (must exist before the eventstream binds to it) → `create_eventstream_with_definition` → `seed_eventstream_from_csv` → `verify_eventhouse_data` (catches ingestion misconfiguration before any map work) → `create_kql_function` → `wait_for_kql_database_ready` (best-effort gate so Create Map can resolve the KQL database) → `build_map_json` → `build_platform_json` → `create_map`.

Ordering matters because most steps consume something created by an earlier step — `create_eventstream_with_definition` needs the eventhouse's `databasesItemIds`, and `create_map` needs the KQL function name and the KQL database item ID. The final `print` block surfaces the IDs of every resource created so you can find them in the Fabric portal.

Add the following after the `create_map` function:

```python
# =========================================================
# main(): orchestrates the full workflow
# =========================================================

def main():
    """
    Orchestrate the tutorial workflow.

    1) Create eventhouse
    2) Create KQL table (required for ingestion)
    3) Create Eventstream (definition-based)
    4) Seed initial data so the map is not empty on first open
    5) Validate ingestion BEFORE moving on
    6) Create KQL function (required for Maps layer)
    7) Ensure KQL database is available to Maps
    8) Build map.json
    9) Build .platform metadata
    10) Create map with inline definition
    """
    cfg = Config()

    print("Initializing clients...")
    with httpx.Client(timeout=60) as client:
        fabric = FabricClient(client)

        # Step 1: Create eventhouse
        eventhouse_id = create_eventhouse(client, fabric, cfg)

        # Step 2: Ensure table exists BEFORE Eventstream binds to it
        create_kql_table_if_missing(client, fabric, cfg, eventhouse_id)

        # Step 3: Create Eventstream (definition-based)
        eventstream_id = create_eventstream_with_definition(client, fabric, cfg, eventhouse_id)

        # Step 4: Seed initial data so the map is not empty on first open
        seed_count = seed_eventstream_from_csv(cfg)

        # Step 5: Validate ingestion BEFORE moving on
        verify_eventhouse_data(client, fabric, cfg, eventhouse_id)

        # Step 6: Create KQL function (required for Maps layer)
        kql_database_item_id = create_kql_function(client, fabric, cfg, eventhouse_id)

        # Step 7: Ensure KQL database is available to Maps
        wait_for_kql_database_ready(client, cfg, kql_database_item_id)

        # Step 8: Build map.json (Kusto function layer)
        map_json = build_map_json(cfg, kql_database_item_id)

        # Step 9: Build .platform metadata
        platform_json = build_platform_json(cfg)

        # Step 10: Create map with inline definition
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

> [!NOTE]
> Eventhouse, eventstream, KQL database, and map display names must be unique within a workspace. Before re-running the script, either delete the items created on the previous run from the Fabric workspace, or change the corresponding display names in `Config`. Otherwise the create calls fail with `409 ItemDisplayNameAlreadyInUse`.

During script execution, you are prompted to paste the eventstream connection string.

To retrieve this value:

1. Open your Fabric workspace  
1. Open the eventstream created by the script  
1. Select the **Custom endpoint source**  
1. Open **SAS Key Authentication**  
1. Copy **Connection string-primary key**

:::image type="content" source="media/tutorials/create-real-time-map-using-rest-apis/connection-string-primary-key.png" lightbox="media/tutorials/create-real-time-map-using-rest-apis/connection-string-primary-key.png" alt-text="A screenshot of a Microsoft Fabric workspace with SAS Key Authentication panel open. The panel displays the Connection string-primary key field ready to be copied for eventstream authentication.":::

Paste the value into the console when prompted.

> [!IMPORTANT]
> The script pauses execution until this value is provided.

**Run the script:**

```bash
python create_realtime_map.py
```

Verify that all items were created:

:::image type="content" source="media/tutorials/create-real-time-map-using-rest-apis/real-time-map.png" lightbox="media/tutorials/create-real-time-map-using-rest-apis/real-time-map.png" alt-text="A screenshot of a Seattle street map with multiple blue location markers clustered in downtown and surrounding neighborhoods. A data layers panel on the left shows Live Locations layer enabled. The map displays streets, neighborhood names, and control buttons on the right side for navigation and layer management.":::

At this point, all resources are created and configured.

To simulate continuous streaming and watch the map update in near real time, continue with the follow-up [Tutorial: Simulate real-time data ingestion for a map using REST APIs and Python](tutorial-simulate-real-time-data-ingestion.md). It builds directly on this tutorial and reuses the eventhouse, eventstream, KQL function, and map you created.

## Summary

In this tutorial, you provisioned the resources needed for a real-time geospatial solution in Microsoft Fabric, using Fabric REST APIs and Python.

You accomplished the following:

- Created an **eventhouse and KQL database** using the Fabric REST API
- Created an **eventstream with a custom endpoint** for ingesting streaming events
- Defined a **KQL function** to query and shape real-time data for map visualization
- Built and deployed a **Fabric map with an inline definition** referencing eventhouse data
- Seeded the eventstream with initial events so the map displayed data immediately

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
> [Tutorial: Simulate real-time data ingestion for a map using REST APIs and Python](tutorial-simulate-real-time-data-ingestion.md)
