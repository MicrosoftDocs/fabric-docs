---
title: Create a Microsoft Fabric Map using the REST API with Python
description: Learn how to create a Microsoft Fabric Map programmatically using Python and Fabric Maps REST API.
author: stevemunk
ms.author: sipa
ms.service: fabric
ms.topic: tutorial
ms.custom: mvc
ms.date: 04/16/2026
---

# Tutorial: Create a map using GeoJSON as a data layer using REST API

Fabric Maps are defined by a **public definition** (a map.json payload) that describes the basemap, data sources, layer sources, and layer rendering settings. The most reliable way to automate map creation is to **create the Map with a public definition inline**, so the map is ready to render layers immediately after creation. The Map definition structure is documented in the [Map item definition](/rest/api/fabric/articles/item-management/definitions/map-definition) article.

In this tutorial, you build a Python app from scratch that:

* Creates a **Lakehouse** in your Fabric workspace using the Lakehouse REST API (supports LRO).
* Uploads a **GeoJSON** file to the Lakehouse Files/ area via OneLake DFS APIs (GUID addressing).
* Uploads a **custom SVG marker** to the same Lakehouse and references it from the map definition (iconSources).
* Creates a **Map** with a fully formed map.json definition inline using the Create Map API (supports creating with public definition and supports LRO).

> [!div class="checklist"]
>
> * Create a Lakehouse using the Fabric REST API
> * Upload a GeoJSON file to OneLake
> * Upload a custom SVG marker icon to OneLake
> * Build a map.json definition that references Lakehouse data
> * Create a Fabric Map with the definition provided inline

## Prerequisites

* Python 3.9 or later
* Azure cli
* Fabric workspace ID
* Microsoft Entra access token with:
  * `Item.ReadWrite.All`

## Authentication

This tutorial uses DefaultAzureCredential, which can authenticate using several local/dev credentials sources. For first-time readers, the simplest approach is Azure CLI sign-in.

### Authenticate locally (recommended for first run)

1. Open a terminal.
1. Run:

```azurecli
az login
```

`DefaultAzureCredential` can use your signed-in identity to acquire access tokens for:

* Fabric REST APIs (resource: `https://api.fabric.microsoft.com/.default`)
* OneLake access via ADLS-compatible endpoints (OneLake supports existing ADLS/Blob tools and SDKs). Note that OneLake supports browsing and reading/writing data using ADLS Gen2 APIs and SDKs, including GUID-based addressing for workspaces and items.

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

* You're new to Microsoft Fabric
* The workspace was recently created
* Your role assignment was added recently

> [!NOTE]
> This tutorial authenticates using Microsoft Entra ID via `DefaultAzureCredential`. Fabric REST APIs don't require a browser session, but signing in to the Fabric web experience can prevent first‑run authorization issues caused by delayed role provisioning. 

## Create the GeoJSON file

The GeoJSON file is used in the creation of the map item data layer. Once you create the file, update the `local_geojson_path` variable to reflect the correct path.

Copy the following GeoJSON and paste into a blank text file and save it as `starbucks-seattle.geojson`:

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

* **httpx**: makes HTTP requests to the Fabric REST APIs.
* **azure-identity**: provides DefaultAzureCredential for Microsoft Entra authentication.
* **azure-storage-file-datalake**: uploads files to OneLake using ADLS Gen2-compatible APIs (OneLake supports these APIs).

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

Add the following below the import statements:

```python
# ---------------------------------------------------------
# Configuration
# ---------------------------------------------------------

# Your Fabric workspace ID (GUID)
workspace_id = "YOUR-WORKSPACE-ID"

# Local GeoJSON file to upload to OneLake. Update as needed.
local_geojson_path = Path(
    r"C:\starbucks-seattle.geojson"
)

# Where the GeoJSON file will be stored inside the Lakehouse Files area
geojson_relative_path = "Files/vector/starbucks-seattle.geojson"

# Where the custom SVG icon will be stored inside the Lakehouse Files area
svg_relative_path = "Files/icons/starbucks-marker.svg"

# Toggle whether to use a custom SVG marker (recommended) or a built-in icon name (fallback)
USE_CUSTOM_SVG_MARKER = True

# If you disable custom SVG markers, the map will try to use this built-in icon name.
# Built-in icon names are environment/UI dependent, so consider this a fallback only.
BUILTIN_ICON_NAME_FALLBACK = "Coffee"
```

### Add the SVG marker constant

In the same section, add:

```python
# A small SVG marker icon (kept < 1 MB) that can scale cleanly.
STARBUCKS_MARKER_SVG = """\
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <path d="M32 2C20.4 2 11 11.4 11 23c0 15.6 18.7 36.6 19.5 37.5a2 2 0 0 0 3 0C34.3 59.6 53 38.6 53 23 53 11.4 43.6 2 32 2z"
        fill="#006241" stroke="#ffffff" stroke-width="2"/>
  <circle cx="32" cy="23" r="13" fill="#ffffff" opacity="0.95"/>
  <path d="M26 20h12v10c0 3-2.5 5-6 5s-6-2-6-5V20z" fill="#006241"/>
</svg>
"""
```

[!TIP]
SVG is typically a strong choice for markers because it scales cleanly at different zoom levels and screen DPIs.

## Step 4—Add helper functions

This step adds reusable helper functions that keep the "end-to-end flow" readable:

* **Auth helpers**: build headers for Fabric REST calls
* **LRO handler**: poll 202 Accepted operations using Location and Retry-After
* **Definition payload helper**: base64 encode map.json for inline definitions
* **OneLake upload helpers**: upload GeoJSON/SVG to Lakehouse Files via OneLake

### Create auth helper functions

Fabric REST calls require a bearer token. The Create Map and Create Lakehouse APIs require delegated scopes such as `Item.ReadWrite.All`/`Lakehouse.ReadWrite.All` (depending on the API) and authenticate via Microsoft Entra.

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

### Create LRO helper function

Create Lakehouse and Create Map both support **long running operations** and can return **202 Accepted** with `Location` and ``Retry-After``.

Add this block:

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
) -> str:
    """
    Poll a Fabric long-running operation (LRO) until completion and return the created resource id.

    Why this function exists:
    - Many Fabric create APIs return HTTP 202 + Location header for async creation.
    - Some LRO completion payloads are status-only and do NOT include the created resource id.
      When that happens, we resolve the created resource by listing resources and matching displayName.

    Parameters:
    - list_url: The endpoint to list resources of the same type (e.g. .../maps).
    - match_display_name: The displayName used in the create call; used to locate the created item.

    Returns:
    - The created resource id as a string.
    """
    op_url = initial_response.headers.get("Location")
    if not op_url:
        raise RuntimeError("Missing LRO Location header.")

    retry_after = int(initial_response.headers.get("Retry-After", "5"))

    while True:
        time.sleep(retry_after)
        poll = client.get(op_url)

        # Still running
        if poll.status_code == 202:
            retry_after = int(poll.headers.get("Retry-After", "5"))
            continue

        poll.raise_for_status()
        body = poll.json() if poll.content else {}

        # Case A: Operation returns the created resource id directly.
        if isinstance(body, dict) and id_field in body and body[id_field]:
            return body[id_field]

        # Case B: Status-only completion payload; resolve by listing.
        status = (body.get("status") if isinstance(body, dict) else None)
        if status == "Succeeded" and list_url and match_display_name:
            r = client.get(list_url)
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

### Definition payload helper

When you create a Map with a **public definition**, you send map.json as payloadType: `InlineBase64`. The Create Map API examples show using `InlineBase64` in definition.parts.

Add:

```python
# ---------------------------------------------------------
# DEFINITION PAYLOAD HELPER
# - Create Map can include a public definition inline (map.json as InlineBase64). 
# ---------------------------------------------------------

def _json_to_b64(obj: dict) -> str:
    """Encode a JSON object as base64 string (InlineBase64 payload)."""
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
    New Lakehouses can take a short time before the Files folder is ready, so retry.
    """
    service = _onelake_client()
    fs = service.get_file_system_client(file_system=workspace_guid)

    # GUID-based addressing: item GUID is the first path segment 
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

### Create helper function to retrieve the map ID once created

When you create a map by using the Fabric REST API, the request may return a 202 Accepted response. This indicates that the map is being provisioned asynchronously as a long-running operation (LRO), rather than being created immediately. In this case, the response doesn't include the map ID, and the LRO completion endpoint may not return a usable result. Additionally, even after the operation completes, the newly created map might not appear immediately when calling the List Maps API due to backend propagation.

To reliably obtain the map ID, you must query the list of maps and retry until the new map becomes visible. The following helper function implements this retry pattern and ensures your automation flow is resilient to asynchronous provisioning delays, and is only required if you need the map ID.

Add the following code next:

```python
# ---------------------------------------------------------
# Get Map ID
# ---------------------------------------------------------

def resolve_map_id(client, list_url, headers, map_name, max_attempts=10, delay=5):
    """
    Resolve the ID of a newly created Fabric map.

    Why this function is needed:
    - Creating a map may return HTTP 202 (Accepted), indicating an asynchronous
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

        match = next(
            (m for m in items if m.get("displayName") == map_name),
            None
        )

        if match:
            print("✅ Map found!")
            return match["id"]

        print("⏳ Map not visible yet. Retrying...")
        time.sleep(delay)

    raise RuntimeError("Map created but still not visible after retries")
```

## Create the end to end flow

In this step, you add the application logic that runs the workflow end-to-end. You build it in steps:

1. Create the Lakehouse
1. Upload GeoJSON
1. Upload custom SVG (optional)
1. Build map.json
1. Create the Map with the definition inline

Add this block at the bottom of your file:

```python
# ---------------------------------------------------------
# END-TO-END FLOW
# ---------------------------------------------------------
with httpx.Client(timeout=60) as client:
    # Code will be added in the following sections

    pass
```

In the next section, you'll replace `pass`.

### Create Lakehouse

The Lakehouse is used as the durable storage layer (OneLake Files). The Lakehouse create API supports LRO responses.

Replace `pass` with:

```python
# 1) Create Lakehouse (201 or 202/LRO)
    lakehouse_url = f"https://api.fabric.microsoft.com/v1/workspaces/{workspace_id}/lakehouses"
    lakehouse_payload = {
        "displayName": "lh_starbucks_seattle",
        "description": "Stores Starbucks Seattle GeoJSON + marker icon for a Fabric Maps tutorial"
    }

    lh_resp = client.post(lakehouse_url, headers=_fabric_headers(), json=lakehouse_payload)

    if lh_resp.status_code == 201:
        lakehouse_id = lh_resp.json()["id"]
    elif lh_resp.status_code == 202:
        lakehouse_id = _handle_lro(client, lh_resp)
    else:
        raise RuntimeError(f"Failed to create lakehouse: {lh_resp.status_code} {lh_resp.text}")

    print("Lakehouse created. Lakehouse ID:", lakehouse_id)

```

### Upload GeoJSON into the Lakehouse Files area (OneLake)

Fabric Maps can reference files stored in OneLake via a Lakehouse data source in dataSources, and a file-backed layer source in `layerSources` (for example, geojson).

Add this code immediately after the Lakehouse creation block:

```python
# 2) Upload GeoJSON into the Lakehouse Files area (OneLake)
    _upload_with_retry(
        workspace_guid=workspace_id,
        item_guid=lakehouse_id,
        dest_relative_path=geojson_relative_path,
        content=local_geojson_path.read_bytes()
    )
    print("Uploaded GeoJSON to:", geojson_relative_path)
```

### Upload custom SVG marker icon (OneLake) if enabled

Marker layers can use custom icons; the map definition schema includes an `IconSource` object (`iconSources`) that points at a file.

Add:

```python
# 3) Upload custom SVG marker icon (OneLake) if enabled
    if USE_CUSTOM_SVG_MARKER:
        _upload_with_retry(
            workspace_guid=workspace_id,
            item_guid=lakehouse_id,
            dest_relative_path=svg_relative_path,
            content=STARBUCKS_MARKER_SVG.encode("utf-8")
        )
        print("Uploaded custom SVG marker to:", svg_relative_path)
```

### Build map.json

`map.json` is the required part of a **Map public definition**. It contains arrays for `dataSources`, `iconSources`, `layerSources`, and `layerSettings`.

Add the following code next:

```python
# 4) Build map.json with:
    #    - dataSources includes the lakehouse
    #    - iconSources references the SVG (custom marker icon source)
    #    - layerSources references the GeoJSON file in the lakehouse
    #    - layerSettings renders points as markers via pointLayerType + markerOptions
    layer_source_id = str(uuid.uuid4())
    layer_setting_id = str(uuid.uuid4())
    icon_source_id = str(uuid.uuid4())
    custom_svg_marker = f"{layer_setting_id}:{icon_source_id}"
    icon_source_name = "Starbucks Marker"

    map_json = {
        "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/map/definition/2.0.0/schema.json",
        "basemap": {},

        "dataSources": [
            {"itemType": "Lakehouse", "workspaceId": workspace_id, "itemId": lakehouse_id}
        ],

        "iconSources": (
            [
                {
                    "id": icon_source_id,
                    "name": icon_source_name,
                    "type": "svg",
                    "itemId": lakehouse_id,
                    "relativePath": svg_relative_path
                }
            ] if USE_CUSTOM_SVG_MARKER else []
        ),

        "layerSources": [
            {
                "id": layer_source_id,
                "name": "starbucks_seattle_geojson",
                "type": "geojson",
                "itemId": lakehouse_id,
                "relativePath": geojson_relative_path,
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

                    # Render as marker layer
                    "pointLayerType": "marker",

                    "markerOptions": (
                        # Custom SVG marker path:
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
                        if USE_CUSTOM_SVG_MARKER
                        # Built-in fallback path:
                        else
                        {
                            "size": 22,
                            "fillColor": "#006241",
                            "strokeColor": "#FFFFFF",
                            "strokeWidth": 2,
                            "icon": BUILTIN_ICON_NAME_FALLBACK,
                            "iconOptions": {
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

```

> [!NOTE]
> The map definition schema describes `IconSource`, `LayerSource`, and `LayerSettingOptions` (including marker layer settings) as part of the `map.json` structure.

### Create the Map WITH definition inline

The Create Map API supports sending a public definition inline (`definition.parts`) and returns `201` or `202` (LRO).

Add:

```python
    # 5) Create the Map WITH definition inline (so no getDefinition/updateDefinition needed)
    map_name = "My Fabric Map"
    create_map_url = f"https://api.fabric.microsoft.com/v1/workspaces/{workspace_id}/maps"
    create_map_payload = {
        "displayName": map_name,
        "description": "Created using Fabric Maps REST API",
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
    
    map_resp = client.post(create_map_url, headers=_fabric_headers(), json=create_map_payload)
    
    if map_resp.status_code == 201:
        map_id = map_resp.json()["id"]
    elif map_resp.status_code == 202:
        print("LRO completed via 202. Resolving map by name...")
        map_id = resolve_map_id(
            client,
            create_map_url,
            _fabric_headers(),
            map_name
        )  
    else:
        raise RuntimeError(f"Create map failed: {map_resp.status_code} {map_resp.text}")

    print("Map created successfully. Map ID:", map_id)
    print("GeoJSON layer path:", geojson_relative_path)
    if USE_CUSTOM_SVG_MARKER:
        print("Custom SVG marker path:", svg_relative_path)

```

## Run the application

Run the script:

```python
python create_map_from_geojson.py
```

If successful, you see output similar to:

* Lakehouse created. Lakehouse ID: `<Lakehouse ID>`
* Uploaded GeoJSON to: Files/vector/starbucks-seattle.geojson
* Uploaded custom SVG marker to: Files/icons/starbucks-marker.svg
* Map created successfully. Map ID: `<Map ID>`
* GeoJSON layer path: Files/vector/starbucks-seattle.geojson
* Custom SVG marker path: Files/icons/starbucks-marker.svg

In Microsoft Fabric, your map should look similar to this:

:::image type="content" source="media/tutorials/tutorial-create-fabric-map-python/map-seattle.png" lightbox="media/tutorials/tutorial-create-fabric-map-python/map-seattle.png" alt-text="A screenshot of Microsoft Fabric Maps displaying Seattle with multiple green Starbucks marker icons clustered in the downtown area. The map shows streets and water features with a light gray background. The Data layers panel on the left displays the Starbucks (Seattle) layer. The map centers on downtown Seattle including Elliott Bay waterfront with markers indicating individual Starbucks locations referenced in the tutorial GeoJSON file.":::

## Next steps

Learn how the Map public definition is structured (map.json, optional .platform, and optional query parts).

> [!div class="nextstepaction"]
> [Create a map](create-map.md)

> [!div class="nextstepaction"]
> [Change Map settings](customize-map.md#change-map-settings)
