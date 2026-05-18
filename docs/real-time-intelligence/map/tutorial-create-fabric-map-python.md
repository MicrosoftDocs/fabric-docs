---
title: Create a map using REST API with Python
description: Learn how to create a Microsoft Fabric Map programmatically using Python and Fabric Maps REST API.
ms.reviewer: smunk, sipa
ms.service: fabric
ms.topic: tutorial
ms.custom: mvc
ms.date: 05/19/2026
ms.search.form: Create a map using REST API with Python
---

# Tutorial: Create a map using REST API with Python

Fabric Maps are defined by a **public definition** (`map.json`) that describes the basemap, data sources, layer sources, and rendering behavior.

<!--This tutorial demonstrates a **static data scenario** using files stored in a Lakehouse. For real-time streaming scenarios using Eventstream and Eventhouse, see [Tutorial: Create a real-time map from Eventhouse data using REST APIs](tutorial-real-time-map-python.md).-->

The most reliable way to automate map creation is to create the map with its definition provided inline, so the map is fully configured and ready to render immediately after creation.

For more information about the map definition structure, see [Map item definition](/rest/api/fabric/articles/item-management/definitions/map-definition).

In this tutorial, you build a Python application that:

- Creates a **Lakehouse** in your Fabric workspace using the Lakehouse REST API (supports LRO).
- Uploads a **GeoJSON** file to the Lakehouse Files area via OneLake DFS APIs (GUID addressing).
- Uploads a **custom SVG marker** to the same Lakehouse and references it from the map definition (iconSources).
- Creates a **Map** with a fully formed map.json definition inline using the Create Map REST API (supports creating with public definition and supports LRO).

> [!div class="checklist"]
>
> - Create a Lakehouse using the Fabric REST API
> - Upload a GeoJSON file to OneLake
> - Upload a custom SVG marker icon to OneLake
> - Build a map.json definition that references Lakehouse data
> - Create a Fabric Map with the definition provided inline

This tutorial follows a common automation pattern in Fabric: create infrastructure → upload data → define visualization → render map.

## When to use this approach

This pattern is best for:

- Static geospatial datasets
- Reference layers (for example, points of interest, boundaries)
- Historical or batch-processed data

For scenarios that require continuously updating data (for example, live tracking or telemetry), see the real-time streaming tutorial.

## Prerequisites

- Python 3.9 or later
- Azure CLI
- Fabric workspace ID
- Permissions to call Fabric REST APIs, such as:
  - `Item.ReadWrite.All`

## Authentication

This tutorial uses DefaultAzureCredential, which can authenticate using several local/dev credentials sources. For first-time readers, the simplest approach is Azure CLI sign-in.

### Authenticate locally (recommended for first run)

1. Open a terminal.
1. Run:

```azurecli
az login
```

`DefaultAzureCredential` can use your signed-in identity to acquire access tokens for:

- Fabric REST APIs (resource: `https://api.fabric.microsoft.com/.default`)
- OneLake access via ADLS-compatible endpoints (OneLake supports existing ADLS/Blob tools and SDKs). OneLake supports browsing and reading/writing data using ADLS Gen2 APIs and SDKs. This includes support for GUID-based addressing for workspaces and items.

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

## Create the GeoJSON file

The GeoJSON file in this tutorial is used as the map's data layer. Once you create the file, update the `local_geojson_path` variable to reflect the correct path.

Copy the following GeoJSON into a blank text file, and save the file as `starbucks-seattle.geojson`:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 999 3rd Ave" },
      "geometry": { "type": "Point", "coordinates": [-122.334389, 47.605278] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 1201 3rd Ave" },
      "geometry": { "type": "Point", "coordinates": [-122.335167, 47.608040] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 221 Pike St" },
      "geometry": { "type": "Point", "coordinates": [-122.340057, 47.609450] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 800 5th Ave" },
      "geometry": { "type": "Point", "coordinates": [-122.330048, 47.604550] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 1420 5th Ave" },
      "geometry": { "type": "Point", "coordinates": [-122.334091, 47.610041] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 1524 7th Ave" },
      "geometry": { "type": "Point", "coordinates": [-122.334915, 47.614498] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 2011 7th Ave" },
      "geometry": { "type": "Point", "coordinates": [-122.338165, 47.616341] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 2001 8th Ave" },
      "geometry": { "type": "Point", "coordinates": [-122.338806, 47.616848] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 4147 University Way NE" },
      "geometry": { "type": "Point", "coordinates": [-122.313873, 47.658298] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 2200 NW Market St" },
      "geometry": { "type": "Point", "coordinates": [-122.384056, 47.668581] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 101 Broadway E" },
      "geometry": { "type": "Point", "coordinates": [-122.320457, 47.620480] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 824 E Pike St" },
      "geometry": { "type": "Point", "coordinates": [-122.320282, 47.614212] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 6501 California Ave SW" },
      "geometry": { "type": "Point", "coordinates": [-122.387016, 47.545376] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 1501 4th Ave" },
      "geometry": { "type": "Point", "coordinates": [-122.336212, 47.610325] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 701 5th Ave" },
      "geometry": { "type": "Point", "coordinates": [-122.330704, 47.604298] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 2344 Eastlake Ave E" },
      "geometry": { "type": "Point", "coordinates": [-122.325874, 47.640884] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 5221 15th Ave NW" },
      "geometry": { "type": "Point", "coordinates": [-122.376595, 47.668210] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 4408 Fauntleroy Way SW" },
      "geometry": { "type": "Point", "coordinates": [-122.377693, 47.564991] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 7303 35th Ave NE" },
      "geometry": { "type": "Point", "coordinates": [-122.290611, 47.682518] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Starbucks - 2742 Alki Ave SW" },
      "geometry": { "type": "Point", "coordinates": [-122.408028, 47.579311] }
    }
  ]
}
```

> [!IMPORTANT]
> Make sure the file path used in `local_geojson_path` matches where you saved the file on your machine.

## Step 1—Create a new Python project file

In this step, you create a blank Python file that you'll build up section-by-section.

Create a new file named:

```
create_map_from_geojson.py
```

Open the file in your editor.

## Step 2—Install required libraries and add required import statements

In this step, you install the dependencies and add the imports your script uses.

### Install required libraries

Run:

```
pip install httpx azure-identity azure-storage-file-datalake
```

#### What each library is for

- **httpx**: makes HTTP requests to the Fabric REST APIs.
- **azure-identity**: provides DefaultAzureCredential for Microsoft Entra authentication.
- **azure-storage-file-datalake**: uploads files to OneLake using ADLS Gen2-compatible APIs (OneLake supports these APIs).

### Add import statements to your .py file

At the top of **create_map_from_geojson.py**, add:

```python
import base64
import json
import time
import uuid
from pathlib import Path

import httpx
from azure.identity import DefaultAzureCredential
from azure.storage.filedatalake import DataLakeServiceClient
```

## Step 3—Add a configuration section

In this step, you define the variables your application uses, including workspace ID, file paths, and feature toggles.

> [!TIP]
> Using a centralized configuration object simplifies automation scenarios by keeping environment-specific values (such as workspace IDs and file paths) separate from application logic.

Add the following below the [import](#add-import-statements-to-your-py-file) statements:

```python
# =========================================================
# Configuration (centralized)
# =========================================================

class Config:
    """
    Central configuration object for the tutorial.

    Why this exists:
    - Keeps all "things you might change" in one place (workspace ID, file paths, toggles).
    - Lets step functions accept a single cfg object rather than many parameters.
    - Makes the tutorial easier to teach: you introduce Config once, then build functions.

    Tip:
    - In real projects, you might load these values from env vars or a JSON file.
    - For tutorial clarity, we keep them explicit and readable.
    """
    def __init__(self):
        # Workspace
        self.workspace_id = "YOUR-WORKSPACE-ID"

        # Local file (source) and OneLake destination paths (inside Lakehouse Files/)
        self.local_geojson_path = Path(r"C:\tutorial\starbucks-seattle.geojson")
        self.geojson_relative_path = "Files/vector/starbucks-seattle.geojson"

        # Optional SVG marker settings
        self.svg_relative_path = "Files/icons/starbucks-marker.svg"
        self.use_custom_svg_marker = True
        self.builtin_icon_name_fallback = "BuildingShop"

        # SVG content (kept < 1 MB, scales cleanly)
        self.starbucks_marker_svg = """\
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <path d="M32 2C20.4 2 11 11.4 11 23c0 15.6 18.7 36.6 19.5 37.5a2 2 0 0 0 3 0C34.3 59.6 53 38.6 53 23 53 11.4 43.6 2 32 2z"
        fill="#006241" stroke="#ffffff" stroke-width="2"/>
  <circle cx="32" cy="23" r="13" fill="#ffffff" opacity="0.95"/>
  <path d="M26 20h12v10c0 3-2.5 5-6 5s-6-2-6-5V20z" fill="#006241"/>
</svg>
"""

        # Resource display names / descriptions
        self.lakehouse_display_name = "lh_starbucks_seattle"
        self.lakehouse_description = "Stores Starbucks Seattle GeoJSON + marker icon for a Fabric Maps tutorial"

        self.map_display_name = "My Fabric Map"
        self.map_description = "Created using Fabric Maps REST API"


```

> [!NOTE]
> The `geojson_relative_path` and `svg_relative_path` values define the location inside the Lakehouse Files area. These paths are relative to the Lakehouse root and are used both for uploading files and referencing them in the map definition.

## Step 4—Add helper functions

This step adds reusable helper functions that keep the "end-to-end flow" readable:

- **Auth helpers**: build headers for Fabric REST APIs
- **FabricClient**: lightweight wrapper for consistent API calls
- **LRO handler**: poll 202 Accepted operations using Location and Retry-After
- **Definition payload helper**: base64 encode map.json for inline definitions
- **OneLake upload helpers**: upload GeoJSON and SVG files to Lakehouse Files

> [!NOTE]
> This tutorial uses two types of operations:
>
> - **Control plane** (Fabric REST APIs): create Lakehouse and Map items
> - **Data plane** (OneLake DFS): upload files into the Lakehouse
>
> Both are required to fully set up the map.

### Create auth helper functions

Fabric REST APIs require a Microsoft Entra access token (bearer token) for authentication. The Create Map and Create Lakehouse APIs require delegated scopes such as `Item.ReadWrite.All`/`Lakehouse.ReadWrite.All` (depending on the API) and authenticate via Microsoft Entra.

Add this block below your configuration section:

```python
# ---------------------------------------------------------------------------
# Auth helpers
#
# Authentication utilities built on DefaultAzureCredential that acquire and
# construct Authorization headers for calling Fabric REST APIs.
# ---------------------------------------------------------------------------

class TokenProvider:
    """Thin wrapper around DefaultAzureCredential that acquires Entra tokens."""
    def __init__(self):
        self._cred = DefaultAzureCredential()

    def get(self, scope: str) -> str:
        return self._cred.get_token(scope).token


_tokens = TokenProvider()


def _fabric_headers() -> dict[str, str]:
    """Auth headers for Fabric REST API calls."""
    return {
        "Authorization": f"Bearer {_tokens.get('https://api.fabric.microsoft.com/.default')}",
        "Content-Type": "application/json"
    }
```

### Create FabricClient helper function

A small wrapper around httpx.Client so you don't need to repeat headers everywhere.

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

### Create LRO helper function

Fabric REST APIs used in this tutorial, such as creating a Lakehouse and creating a Map, support long-running operations (LROs). 

These APIs can return a `202 Accepted` response, along with headers such as `Location` and `Retry-After`, which indicate that the request is being processed asynchronously.

To handle these responses consistently, you create a helper function that polls the operation until it completes and returns the created resource ID.

Add this block after the FabricClient helper function:

```python
# ---------------------------------------------------------
# LRO HANDLER
# ---------------------------------------------------------

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

    if not op_url:
        raise RuntimeError("Missing LRO Location header.")

    retry_after = int(initial_response.headers.get("Retry-After", "5"))

    while True:
        time.sleep(retry_after)
        poll = client.get(op_url, headers=_fabric_headers())

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
            for attempt in range(max_attempts):
                print(f"Resolving resource (attempt {attempt + 1}/{max_attempts})...")
        
                r = client.get(list_url, headers=_fabric_headers())
                r.raise_for_status()
        
                items = r.json().get("value", [])
                match = next((i for i in items if i.get("displayName") == match_display_name), None)
        
                if match and match.get(id_field):
                    print("✅ Resource found!")
                    return match[id_field]
        
                print("⏳ Resource not visible yet. Retrying...")
                time.sleep(delay)
        
            raise RuntimeError(
                f"LRO succeeded but resource not visible after retries. "
                f"match_display_name={match_display_name!r}"
            )

        # Anything else is unexpected
        raise RuntimeError(f"LRO completed but no resource id was returned. Body: {body}")


```

> [!NOTE]
> Newly created resources might not appear immediately when calling list APIs due to backend propagation delays. The helper function in this tutorial automatically retries until the resource becomes visible.

### Definition payload helper

When you create a Map with a **public definition**, you send map.json as payloadType: `InlineBase64`. The Create Map REST API examples show using `InlineBase64` in definition.parts.

Add:

```python
# ---------------------------------------------------------
# DEFINITION PAYLOAD HELPER
# - Create Map can include a public definition inline (map.json as InlineBase64). 
# ---------------------------------------------------------

def _json_to_b64(obj: dict) -> str:
    """
    Convert a Python dict to base64-encoded JSON text.

    Fabric Map "Create Map with definition inline" requires:
    - definition.parts[].payloadType = InlineBase64
    - definition.parts[].payload     = base64(json(map_json))
    """
    return base64.b64encode(json.dumps(obj).encode("utf-8")).decode("utf-8")

```

### OneLake upload helpers

OneLake supports ADLS/Blob APIs and allows GUID-based addressing for workspaces and items:

`https://onelake.dfs.fabric.microsoft.com/<workspaceGUID>/<itemGUID>/<path>/<fileName>`

Add:

```python
# -----------------------------------------------------------------------------------------------
# ONE LAKE UPLOAD HELPERS
# OneLake supports GUID-based addressing:
#   https://onelake.dfs.fabric.microsoft.com/<workspaceGUID>/<itemGUID>/<path>/<fileName> 
# We use the ADLS Gen2 SDK (DataLakeServiceClient) to upload files into the Lakehouse Files area.
# -----------------------------------------------------------------------------------------------

def _onelake_client() -> DataLakeServiceClient:
    """
    Create a DataLakeServiceClient for OneLake.

    Why this exists:
    - OneLake supports ADLS Gen2-compatible endpoints and SDKs.
    - We upload files to Lakehouse Files/ through OneLake DFS APIs.
    """
    return DataLakeServiceClient(
        account_url="https://onelake.dfs.fabric.microsoft.com",
        credential=DefaultAzureCredential()
    )


def _upload_with_retry(
    workspace_guid: str,
    item_guid: str,
    dest_relative_path: str,
    content: bytes,
    attempts: int = 6
) -> None:
    """
    Upload bytes into OneLake under the Lakehouse item.

    Why retries matter:
    - Newly created Lakehouses may take a short time before Files/ is ready.
    - Retrying avoids "first-run flakiness".

    GUID addressing model:
    - File system = workspace GUID
    - Path begins with item GUID (the lakehouse id)
    - Then the relative path under Files/
    """
    service = _onelake_client()
    fs = service.get_file_system_client(file_system=workspace_guid)

    dest_path = f"{item_guid}/{dest_relative_path}".replace("\\", "/")

    last_exc = None
    for i in range(attempts):
        try:
            fs.get_file_client(dest_path).upload_data(content, overwrite=True)
            return
        except Exception as exc:
            last_exc = exc
            time.sleep(2 + i)

    raise RuntimeError(f"Upload failed after {attempts} attempts: {last_exc}")


```

> [!TIP]
> You can verify the file was uploaded successfully by browsing to the Lakehouse Files area in the Fabric portal.

## Create primary functions

Next, create the five primary functions that define the workflow. These will all be called from main().

1. Create a Lakehouse
2. Upload GeoJSON to the Lakehouse
3. Upload a custom SVG marker (optional)
4. Build the map definition (map.json)
5. Create the map with its definition inline

### Create a Lakehouse

This step creates a Lakehouse in your Fabric workspace using the REST API. The Lakehouse stores the GeoJSON file and optional SVG marker used later by the map.

This function:

- Sends a POST request to create the Lakehouse
- Handles both synchronous (201) and asynchronous (202/LRO) responses
- Returns the Lakehouse ID for use in later steps

Add the following code next:

```python
# =========================================================
# Step 1: Create a Lakehouse
# =========================================================

def create_lakehouse(client: httpx.Client, fabric: FabricClient, cfg: Config) -> str:
    """
    Create a Lakehouse and return its item ID.
    """
    lakehouse_url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/lakehouses"
    lakehouse_payload = {
        "displayName": cfg.lakehouse_display_name,
        "description": cfg.lakehouse_description
    }

    lh_resp = fabric.request("POST", lakehouse_url, json_body=lakehouse_payload)

    if lh_resp.status_code == 201:
        lakehouse_id = lh_resp.json()["id"]
    else:
        lakehouse_id = _handle_lro(
            client,
            lh_resp,
            list_url=lakehouse_url,
            match_display_name=cfg.lakehouse_display_name
        )

    print("Lakehouse created. Lakehouse ID:", lakehouse_id)
    return lakehouse_id

```

### Upload GeoJSON to the Lakehouse

Uploads the local GeoJSON file into the Lakehouse Files area using OneLake (ADLS Gen2 API).

The uploaded file becomes the spatial data source for the map.

Add the following code next:

```python
# =========================================================
# Step 2: Upload GeoJSON to the Lakehouse
# =========================================================

def upload_geojson(cfg: Config, lakehouse_id: str) -> None:
    """
    Upload the local GeoJSON file to the Lakehouse Files area.

    Teaching note:
    - This is the first time the tutorial crosses from "control plane" (Fabric REST)
      into "data plane" (OneLake DFS upload).
    """
    _upload_with_retry(
        workspace_guid=cfg.workspace_id,
        item_guid=lakehouse_id,
        dest_relative_path=cfg.geojson_relative_path,
        content=cfg.local_geojson_path.read_bytes()
    )
    print("Uploaded GeoJSON to:", cfg.geojson_relative_path)

```

### Upload a custom SVG marker

Uploads a custom SVG marker into the Lakehouse so the map can render each point using a custom icon.

This step is optional and controlled by the `use_custom_svg_marker` configuration setting.

Add the following code next:

```python
# =========================================================
# Step 3: Upload a custom SVG marker (optional)
# =========================================================

def upload_svg_marker(cfg: Config, lakehouse_id: str) -> None:
    """
    Upload a custom SVG marker icon (if enabled).

    Teaching note:
    - Keeping this in its own function helps you document "optional customization"
      without cluttering the main workflow.
    """
    if not cfg.use_custom_svg_marker:
        return

    _upload_with_retry(
        workspace_guid=cfg.workspace_id,
        item_guid=lakehouse_id,
        dest_relative_path=cfg.svg_relative_path,
        content=cfg.starbucks_marker_svg.encode("utf-8")
    )
    print("Uploaded custom SVG marker to:", cfg.svg_relative_path)

```

> [!TIP]
> SVG is typically a strong choice for markers because it scales cleanly at different zoom levels and screen DPIs.

### Build the map definition (map.json)

Constructs the map.json definition used to configure the Fabric Map.

A map definition is declarative and describes:

- Data sources (Lakehouse)
- Layer sources (GeoJSON file)
- Rendering settings (marker configuration)

> [!TIP]
> The `map.json` definition is declarative. It describes **what the map should render**, not how to render it procedurally.

For more information on the map definition REST API, see [Map item definition](/rest/api/fabric/articles/item-management/definitions/map-definition).

For an example of a map.json, see [MapDetails example](/rest/api/fabric/articles/item-management/definitions/map-definition#mapdetails-example)

Add the following code next:

```python
# =========================================================
# Step 4: Build the map definition (map.json)
# =========================================================

def build_map_json(cfg: Config, lakehouse_id: str) -> dict:
    """
    Build the map.json payload (map public definition).

    Teaching note:
    - This function is ideal for a tutorial section where you walk readers through:
      * dataSources
      * iconSources (optional)
      * layerSources (GeoJSON file)
      * layerSettings (marker rendering)
    """
    layer_source_id = str(uuid.uuid4())
    layer_setting_id = str(uuid.uuid4())
    icon_source_id = str(uuid.uuid4())

    custom_svg_marker = f"{layer_setting_id}:{icon_source_id}"
    icon_source_name = "Starbucks Marker"

    map_json = {
        "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/map/definition/2.0.0/schema.json",
        "basemap": {},

        "dataSources": [
            {"itemType": "Lakehouse", "workspaceId": cfg.workspace_id, "itemId": lakehouse_id}
        ],

        "iconSources": (
            [
                {
                    "id": icon_source_id,
                    "name": icon_source_name,
                    "type": "svg",
                    "itemId": lakehouse_id,
                    "relativePath": cfg.svg_relative_path
                }
            ] if cfg.use_custom_svg_marker else []
        ),

        "layerSources": [
            {
                "id": layer_source_id,
                "name": "starbucks_seattle_geojson",
                "type": "geojson",
                "itemId": lakehouse_id,
                "relativePath": cfg.geojson_relative_path,
                "refreshIntervalMs": 0
            }
        ],

        "layerSettings": [
            {
                "id": layer_setting_id,
                "name": "Starbucks (Seattle)",
                "sourceId": layer_source_id,
                "options": {
                    "type": "vector",
                    "visible": True,
                    "tooltipKeys": ["name"],
                    "pointLayerType": "marker",

                    "markerOptions": (
                        {
                            "iconOptions": {
                                "image": custom_svg_marker,
                                "anchor": "bottom",
                                "opacity": 1.0,
                                "rotation": 0,
                                "allowOverlap": False,
                                "rotationAlignment": "viewport",
                                "pitchAlignment": "viewport"
                            },
                            "icon": icon_source_id
                        }
                        if cfg.use_custom_svg_marker
                        else
                        {
                            "size": 22,
                            "fillColor": "#006241",
                            "strokeColor": "#FFFFFF",
                            "strokeWidth": 2,
                            "icon": cfg.builtin_icon_name_fallback,
                            "iconOptions": {
                                "image": f"{layer_setting_id}:{cfg.builtin_icon_name_fallback}",
                                "anchor": "bottom",
                                "opacity": 1.0,
                                "rotation": 0,
                                "allowOverlap": False,
                                "rotationAlignment": "viewport",
                                "pitchAlignment": "viewport"
                            }
                        }
                    )
                }
            }
        ]
    }

    return map_json


```

> [!TIP]
> Tips related to the map definition:
>
> - The `image` property uses a composite key in the format `<layerSettingId>:<iconId>` to reference the icon for the layer. This associates the marker rendering configuration with the icon source defined earlier in the map definition.
> - Setting `refreshIntervalMs` to `0` disables automatic refresh. This is appropriate for static GeoJSON files stored in a Lakehouse.

### Create the map (with inline definition)

Create a Fabric Map by sending the map.json definition inline using base64 encoding.

In some cases, the create operation completes without returning the map ID directly. The helper function handles this by resolving the map via the List Maps API and retrying until it becomes visible.

This approach ensures the map is fully configured at creation time.

For more information on creating map items, see [Fabric Maps item model](about-rest-api.md#fabric-maps-item-model)

Add the following code next:

```python
# =========================================================
# Step 5: Create the map with its definition inline
# =========================================================

def create_map(client: httpx.Client, fabric: FabricClient, cfg: Config, map_json: dict) -> str:
    """
    Create the Fabric Map with its definition inline.

    Teaching note:
    - This step shows the "create-with-definition" pattern, which avoids
      getDefinition/updateDefinition calls.
    """
    create_map_url = f"https://api.fabric.microsoft.com/v1/workspaces/{cfg.workspace_id}/maps"

    create_map_payload = {
        "displayName": cfg.map_display_name,
        "description": cfg.map_description,
        "definition": {
            "parts": [
                {
                    "path": "map.json",
                    "payload": _json_to_b64(map_json),
                    "payloadType": "InlineBase64"
                }
            ]
        }
    }

    map_resp = fabric.request("POST", create_map_url, json_body=create_map_payload)

    if map_resp.status_code == 201:
        return map_resp.json()["id"]

    if map_resp.status_code == 202:
        print("Map creation is running asynchronously. Waiting for completion...")
        return _handle_lro(
            client,
            map_resp,
            list_url=create_map_url,
            match_display_name=cfg.map_display_name
        )

    raise RuntimeError(f"Create map failed: {map_resp.status_code} {map_resp.text}")


```

## Orchestrate the workflow

The main() function orchestrates the entire workflow by calling each step in sequence.

```python
# =========================================================
# main(): orchestrates the full workflow
# =========================================================

def main():
    """
    Orchestrate the tutorial workflow.

    1) Create a Lakehouse
    2) Upload GeoJSON to the Lakehouse
    3) Upload a custom SVG marker (optional)
    4) Build the map definition (map.json)
    5) Create the map with its definition inline

    Teaching note:
    - main() is intentionally small and readable so readers can see the full flow.
    """
    cfg = Config()

    print("Initializing clients...")
    with httpx.Client(timeout=60) as client:
        fabric = FabricClient(client)

        # Step 1
        lakehouse_id = create_lakehouse(client, fabric, cfg)

        # Step 2
        upload_geojson(cfg, lakehouse_id)

        # Step 3 (optional)
        upload_svg_marker(cfg, lakehouse_id)

        # Step 4
        map_json = build_map_json(cfg, lakehouse_id)

        # Step 5
        map_id = create_map(client, fabric, cfg, map_json)

        print("\n✅ DONE")
        print("Lakehouse ID:", lakehouse_id)
        print("Map ID:", map_id)
        print("GeoJSON layer path:", cfg.geojson_relative_path)
        if cfg.use_custom_svg_marker:
            print("Custom SVG marker path:", cfg.svg_relative_path)


if __name__ == "__main__":
    main()

```

At this point, all configuration and code has been defined.

In the next step, you run the script to create the Lakehouse, upload data, and generate the map.

## Run the application

Run the script:

```python
python create_map_from_geojson.py
```

If the script runs successfully, you see output similar to:

> ✅ DONE
> Lakehouse ID: *Lakehouse ID*
> Map ID: *Map ID*
> GeoJSON layer path: Files/vector/starbucks-seattle.geojson
> Custom SVG marker path: Files/icons/starbucks-marker.svg

In Microsoft Fabric, your map should look similar to this:

:::image type="content" source="media/tutorials/tutorial-create-fabric-map-python/map-seattle.png" lightbox="media/tutorials/tutorial-create-fabric-map-python/map-seattle.png" alt-text="A screenshot of Microsoft Fabric Maps displaying Seattle with multiple green Starbucks marker icons clustered in the downtown area. The map shows streets and water features with a light gray background. The Data layers panel on the left displays the Starbucks (Seattle) layer. The map centers on downtown Seattle including Elliott Bay waterfront with markers indicating individual Starbucks locations referenced in the tutorial GeoJSON file.":::

> [!TIP]
> If the map doesn't appear immediately, refresh the workspace or wait a few seconds for backend propagation to complete.

## Summary

In this tutorial, you built an automated geospatial solution using Microsoft Fabric Maps and Lakehouse data.

You used Fabric REST APIs and Python to provision and configure all required resources, then visualized spatial data stored in OneLake.

You accomplished the following:

- Uploaded spatial data to a **Lakehouse**  
- Configured a dataset for geospatial visualization  
- Built a **Fabric Map with an inline definition**  
- Connected the map to Lakehouse data  
- Configured map layers to render spatial features  

This architecture demonstrates a common batch and historical spatial analytics pattern in Fabric:

- Data is stored in OneLake (Lakehouse)  
- Maps query and render spatial datasets  
- Layers provide visual insights into geographic data  

By automating resource creation using Python and REST APIs, you now have a repeatable approach for building geospatial applications based on static or historical datasets.

## Next steps

Now that you understand how to visualize spatial data from a Lakehouse, you can extend this solution:

- Combine multiple datasets for richer geospatial analysis  
- Apply styling and filtering to highlight trends and patterns  
- Add reference layers such as boundaries or routes  
- Integrate data pipelines to refresh datasets automatically  
- Explore real-time streaming scenarios using Eventstream and Eventhouse  

For more information about working with spatial data and maps in Fabric, see:

> [!div class="nextstepaction"]
> [Fabric Maps overview](about-fabric-maps.md)  

> [!div class="nextstepaction"]
> [Create a map in Fabric](create-map.md)  
<!------------------------------------------------------------------------------
For a tutorial that demonstrates creating a real-time map using REST APIs, see:

> [!div class="nextstepaction"]
> [Tutorial: Create a real-time map from Eventhouse data using REST APIs](tutorial-real-time-map-python.md)
------------------------------------------------------------------------------>
