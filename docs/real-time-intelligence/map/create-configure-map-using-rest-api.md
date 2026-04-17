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

## Prerequisites

* Access to a Fabric workspace
* Microsoft Entra ID application or user identity with workspace permissions
* Python 3.9 or later
* An OAuth 2.0 access token for the Fabric REST API

## Example map definition (map.json)

The following example shows a simplified **map.json** payload, assigned to the `map_json` variable, that:

* Uses the default basemap
* Reads GeoJSON from a Lakehouse
* Renders the data as a visible vector layer

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
      "name": "Points GeoJSON",
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
        "visible": true,
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

### Step 1: Create the map item (metadata only)

This call doesn't include a map definition:

```python
import httpx

BASE_URL = "https://api.fabric.microsoft.com"
TOKEN = "<access-token>"
WORKSPACE_ID = "<workspace-id>"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# Metadata only – NOT map.json
create_map_payload = {
    "displayName": "Automated Map (Pattern 1)"
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

At this point:

* The map exists
* It has no definition yet
* You now have a valid map_id

### Step 2: Define the map (map.json, schema‑valid)

For more information on the **map.json**, see the previous section [Example map definition (map.json)](#example-map-definition-mapjson). In this example, uses the `map_json` variable created in that sample.

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

## Pattern 2: Create the map with the definition (Base64-encoded map.json)

Use this pattern when you want to **create a Fabric map and apply its full definition in a single, atomic operation**. This approach is well suited for declarative deployments, such as CI/CD pipelines or infrastructure‑as‑code workflows, where the complete **map.json** definition is known ahead of time. In this pattern, the map item metadata and the map definition are submitted together during creation, eliminating the need for a follow‑up definition update.

> [!NOTE]
> When you include a map definition in a REST call (create or update), you send it as definition parts. Each part's payload is a Base64-encoded string and must specify `payloadType: "InlineBase64"`. This is the format used by the map definition contract and by map definition operations such as update and get definition.

### Why map.json must be Base64-encoded in REST calls

A Fabric map "definition" is modeled as a set of file-like parts (for example, **map.json**, optional .platform, optional KQL files under queries/). The map item definition reference shows the definition as `definition.parts[]` where **map.json** is provided as a Base64 payload with `payloadType: "InlineBase64"`.

The same format is used by **Update Map Definition** ([request example](/rest/api/fabric/map/items/update-map-definition?tabs=HTTP#update-a-map-public-definition-example)) and **Get Map Definition** ([response example](/rest/api/fabric/map/items/get-map-definition?tabs=HTTP#get-a-map-public-definition-example)), which both show `payloadType: "InlineBase64"`.

### Base64 helper (Python)

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

### Create a map with a public definition (Pattern 2)

The request includes:

* `displayName` (map item metadata)
* `definition.parts[]` where **map.json** is `Base64-encoded` and marked as `InlineBase64`

```python
import httpx

BASE_URL = "https://api.fabric.microsoft.com/v1"
TOKEN = "<access-token>"
WORKSPACE_ID = "<workspace-id>"

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
    "displayName": "Work Order Map (Pattern 2)",
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

response = httpx.post(
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

* **Create Map call**: metadata only (no definition, so no Base64 at creation time).
* **Assign definition**: use Update Map Definition with definition.parts[] and payloadType: "InlineBase64" (so Base64 is required at update time).

### Pattern 2: Create map with definition included

* **Create Map call includes definition**: You must provide `definition.parts[]` and Base64-encode **map.json** using `payloadType: "InlineBase64"`.

> **Rule of thumb:**
> If **map.json** is included in any REST request/response, it is carried as a **Base64 payload** in a `definition.parts[]` entry with `payloadType: "InlineBase64"`.

<!-- ### Error handling best practices

When automating Fabric Maps using the REST API, it's important to handle errors explicitly and consistently. REST calls can fail for a variety of reasons, including authentication issues, insufficient permissions, invalid map definitions, or transient service conditions. Robust error handling ensures that automation workflows fail predictably, surface actionable diagnostics, and can safely retry operations when appropriate. This section outlines recommended practices for detecting, logging, and responding to errors when creating or updating map items programmatically.

Wrap API calls in structured error handling to surface useful diagnostics:

```python
try:
    response = httpx.post(
        "...",
        headers=headers,
        json=payload,
        timeout=30
    )
    response.raise_for_status()
except httpx.HTTPStatusError as ex:
    print("Request failed")
    print("Status:", ex.response.status_code)
    print("Details:", ex.response.text)
    raise
except httpx.RequestError as ex:
    print("Network error:", str(ex))
    raise
```

This pattern helps distinguish:

* Authentication or authorization failures
* Invalid map definitions
* Transient connectivity issues
-->

## Next steps

> [!div class="nextstepaction"]
> [Handle errors when automating with the Fabric Maps REST API](rest-api-error-handling-best-practices.md)
