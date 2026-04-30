---
title: Create and Configure a Fabric Map Using Python and REST API 
description: Learn how to create and configure a map item using Microsoft Fabric Maps REST API.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.date: 04/22/2026
ms.search.form: Create and Configure a Fabric Map using REST API
---

# Create and Configure a Fabric Map Using Python and REST API

This article shows how to create a Fabric map item and apply a map definition using Python. It demonstrates both supported order-of-operations patterns and includes basic error handling.

Creating a Fabric map programmatically requires two components:

- A **map definition** (`map.json`)
- A **map item** in a Fabric workspace

Depending on the pattern you choose, you can:

- Create the map item first and assign the definition later, or
- Create the map item with the definition inline in a single request

This article demonstrates both approaches.

> [!TIP]
> In most automation scenarios, the recommended approach is to **create the map with its definition inline**. This ensures the map is fully configured at creation time and avoids additional API calls.

> [!NOTE]
> This article focuses on map creation and configuration (**control plane**).
> Data referenced by the map (such as GeoJSON files or SVG icons) must already exist in OneLake or another supported data source.

## Prerequisites

- Access to a Fabric workspace
- Microsoft Entra ID application or user identity with workspace permissions
- Python 3.9 or later
- An OAuth 2.0 access token for the Fabric REST API

## Example map definition (`map.json`)

The following example shows a simplified `map.json` payload that:

- Uses the default basemap
- Reads GeoJSON data from a Lakehouse data source
- Renders the data as a vector layer

The `map.json` definition is a **declarative configuration** that describes:

- `dataSources` (for example, Lakehouse or Eventhouse resources that provide data)
- `layerSources` (the files, tables, or functions that define the data for each layer)
- `layerSettings` (the visualization settings for each layer, such as colors, icons, or styling)

The definition describes what the map should render, rather than defining procedural steps for rendering.

```json
map_json = {
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/map/definition/2.0.0/schema.json",
  "basemap": {
    "options": {
      "style": "road"
    }
  },
  "dataSources": [
    {
      "itemType": "Lakehouse",
      "workspaceId": "<workspace-id>",
      "itemId": "<lakehouse-item-id>"
    }
  ],
  "layerSources": [
    {
      "id": "points-source",
      "name": "Points-GeoJSON",
      "type": "geojson",
      "itemId": "<lakehouse-item-id>",
      "relativePath": "Files/data/points.geojson",
      "refreshIntervalMs": 0
    }
  ],
  "layerSettings": [
    {
      "id": "points-layer",
      "name": "Points",
      "sourceId": "points-source",
      "options": {
        "type": "vector",
        "visible": True,
        "color": "#0078D4",
        "pointLayerType": "bubble",
        "bubbleOptions": {
          "color": "#0078D4"
        }
      }
    }
  ]
}
```

For more information on the key components in a `map.json`, see [MapDetails](/rest/api/fabric/articles/item-management/definitions/map-definition#mapdetails).

## Pattern 1: Create a map, then assign the definition

Use this pattern when you need to **create a Fabric map item first and apply the map definition later**. This approach is useful when the map definition is generated dynamically, sourced from multiple files, or updated incrementally after the map item already exists. In this pattern, the initial API call creates the map item with metadata only, and a subsequent call assigns a schema‑valid **map.json** definition to configure the basemap, data sources, and layers.

>[!NOTE]
> This pattern is typically used for advanced scenarios where the definition evolves over time or is assembled dynamically.

### Step 1: Create the map item (metadata only)

This call doesn't include a map definition:

```python
import httpx

BASE_URL = "https://api.fabric.microsoft.com"
TOKEN = "<access-token>"
WORKSPACE_ID = "<workspace-id>"
map_name = "Automated Map (Pattern 1)"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# Metadata only – NOT map.json
create_map_payload = {
    "displayName": map_name
}

response = httpx.post(
    f"{BASE_URL}/workspaces/{WORKSPACE_ID}/items/maps",
    headers=headers,
    json=create_map_payload,
    timeout=30
)

response.raise_for_status()

map_item = response.json()
map_id = map_item["id"]
```

At this point, the map item exists but has no definition applied.

### Step 2: Define the map (map.json)

Prepare a valid map_json payload, such as the [example](#example-map-definition-mapjson) shown earlier.

### Step 3: Assign the definition to the map

```python
response = httpx.put(
    f"{BASE_URL}/workspaces/{WORKSPACE_ID}/items/maps/{map_id}/definition",
    headers=headers,
    json={
        "definition": {
            "parts": [
                {
                    "path": "map.json",
                    "payload": map_json,
                    "payloadType": "InlineJson"
                }
            ]
        }
    },
    timeout=30
)

response.raise_for_status()
```

## Pattern 2: Create the map with the definition (recommended)

Use this pattern to create and configure the map in a single operation.

This approach is well suited for declarative deployments such as CI/CD pipelines or infrastructure-as-code workflows.

### Base64 requirement

When including a definition in REST calls, the payload must be Base64-encoded and provided as a definition part.

> [!IMPORTANT]
> If map.json is included in any REST request, it must be included as a Base64-encoded payload in `definition.parts[]` with `payloadType: "InlineBase64"`.

### Base64 helper

Use this helper to turn a **map.json** Python `dict` into the `Base64` string required by `definition.parts[].payload`.

```python
import base64
import json

def to_inline_base64(obj: dict) -> str:
    """
    Serialize a JSON-compatible dict and return a Base64-encoded UTF-8 string.
    Use this for definition.parts[].payload when payloadType is InlineBase64.
    """
    raw = json.dumps(obj, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    return base64.b64encode(raw).decode("utf-8")
```

### Create map with inline definition

The request includes:

* `displayName` (map item metadata)
* `definition.parts[]` where **map.json** is `Base64-encoded` and marked as `InlineBase64`

```python
import httpx

BASE_URL = "https://api.fabric.microsoft.com/v1"
TOKEN = "<access-token>"
WORKSPACE_ID = "<workspace-id>"
map_name = "Automated Map (Pattern 2)"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}

# Schema-valid map.json (example fields abbreviated here)
map_json = {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/map/definition/2.0.0/schema.json",
    "basemap": {"options": {"style": "road"}},
    "dataSources": [
        {
            "itemType": "KqlDatabase",
            "workspaceId": "<workspace-id>",
            "itemId": "<eventhouse-or-kql-db-item-id>"
        }
    ],
    "layerSources": [
        {
            "id": "work-orders-src",
            "name": "Work orders (Eventhouse)",
            "type": "kusto",
            "itemId": "<eventhouse-or-kql-db-item-id>",
            "refreshIntervalMs": 5000
        }
    ],
    "layerSettings": [
        {
            "id": "work-orders-layer",
            "name": "Work orders",
            "sourceId": "work-orders-src",
            "options": {"type": "vector", "visible": True, "color": "#0078D4"}
        }
    ]
}

payload = {
    "displayName": map_name,
    "definition": {
        "parts": [
            {
                "path": "map.json",
                "payload": to_inline_base64(map_json),
                "payloadType": "InlineBase64"
            }
        ]
    }
}
with httpx.Client(timeout=60) as client:

response = client.post(
    f"{BASE_URL}/workspaces/{WORKSPACE_ID}/maps",
    headers=headers,
    json=payload,
    timeout=30
)
response.raise_for_status()
created = response.json()
map_id = created["id"]
```

## Recap: Pattern 1 vs Pattern 2 (Base64 rule)

Both map‑creation patterns ultimately rely on the same map definition contract, but they differ in when the definition is supplied and when Base64 encoding is required. This section re‑examines Pattern 1 and Pattern 2 side by side to clarify a common source of confusion: Anytime **map.json** is included in a REST call—whether during creation or update—it must be provided as a Base64‑encoded definition part. Understanding this distinction helps ensure that map automation workflows apply the correct payload format at each step and avoid subtle request‑format errors.

### Pattern 1: Create map → then assign definition

- **Create Map call**: metadata only (no definition, so no Base64 at creation time).
- **Assign definition**: use Update Map Definition with definition.parts[] and payloadType: "InlineBase64" (so Base64 is required at update time).

### Pattern 2: Create map with definition included

- **Create Map call includes definition**: You must provide `definition.parts[]` and Base64-encode **map.json** using `payloadType: "InlineBase64"`.

> **Rule of thumb:**
> If **map.json** is included in any REST request/response, it is carried as a **Base64 payload** in a `definition.parts[]` entry with `payloadType: "InlineBase64"`.

## Create helper function to retrieve the map ID

When you create a map by using the Fabric REST API, the request can return a 202 Accepted response. This indicates that the map is being provisioned asynchronously as a long-running operation (LRO), rather than being created immediately. In this case, the response doesn't include the map ID, and the LRO completion endpoint may not return a usable result. Additionally, even after the operation completes, the newly created map might not appear immediately when calling the List Maps API due to backend propagation.

To reliably obtain the map ID, you must query the list of maps and retry until the new map becomes visible. The following helper function implements this retry pattern and ensures your automation flow is resilient to asynchronous provisioning delays.

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

Then instead of getting your map ID as in the previous sample (`map_id = created["id"]`), try:

```python
    if response.status_code == 201:
        map_id = response.json()["id"]
    elif response.status_code == 202:
        print("LRO completed via 202. Resolving map by name...")
        map_id = resolve_map_id(
            client,
            create_map_url,
            _fabric_headers(),
            map_name
        )  
```

## Next steps

> [!div class="nextstepaction"]
> [Handle errors when automating with the Fabric Maps REST API](rest-api-error-handling-best-practices.md)
