---
title: Simulate real-time data ingestion for a map using REST APIs
description: Learn how to create a Fabric notebook programmatically that continuously streams vehicle location updates into the eventstream, driving real-time refreshes of a Fabric map.
ms.reviewer: smunk, sipa
ms.service: fabric
ms.topic: tutorial
ms.custom: mvc
ms.date: 05/29/2026
ms.search.form: Stream real-time data into a map using REST APIs and Python
---

# Tutorial: Simulate real-time data ingestion for a map using REST APIs and Python

In the previous tutorial, you provisioned an eventhouse, eventstream, KQL function, and map. The provisioning script also sent a small set of **seed events** so the map wasn't empty on first open.

In this tutorial, you build on that by creating a **real-time simulator notebook** programmatically using the Fabric REST API. When run, the notebook continuously sends updated vehicle locations into the eventstream custom endpoint. As events flow into the eventhouse, the map refreshes automatically.

> [!div class="checklist"]
>
> In this tutorial, you:
>
> - Create a Fabric notebook programmatically using the Fabric REST API
> - Embed a continuous data simulator inside the notebook as an inline `ipynb` definition
> - Run the notebook in Fabric to stream vehicle location updates into the eventstream
> - Observe the map refresh in near real time as new events are ingested

## Prerequisites

- Complete [Tutorial: Create a real-time map using REST APIs and Python](tutorial-create-real-time-map-python.md). This tutorial reuses the eventhouse, eventstream, KQL function, and map that the provisioning tutorial created.
- Python 3.10 or later, with `httpx` and `azure-identity` installed. The same environment from the previous tutorial works.
- The `FABRIC_WORKSPACE_ID` environment variable set to the same workspace ID you used in the previous tutorial.
- The **eventstream custom endpoint connection string** from the previous tutorial. To retrieve it, see [Run the application](tutorial-create-real-time-map-python.md#run-the-application).
- A valid `DefaultAzureCredential` sign-in. If your session has expired, run:

  ```azurecli
  az login
  ```

## How the simulator fits the architecture

The simulator slots into the same pipeline you built in the previous tutorial:

```
Simulator notebook  -->  eventstream custom endpoint  -->  eventhouse table
                                                                |
                                                                v
                                                  KQL function (latest per vehicle)
                                                                |
                                                                v
                                                       Fabric map (auto-refresh)
```

> [!IMPORTANT]
> The field names used by the **seed events**, **simulator events**, **KQL function output**, and **map layer bindings** must match exactly, including casing.
>
> The map layer created in the previous tutorial expects these columns from the KQL function:
>
> - `Latitude` — map latitude binding
> - `Longitude` — map longitude binding
> - `VehicleId` — tooltips and grouping
> - `EventTime` — used for the `arg_max(EventTime, *)` "latest location" query
>
> If any of these names differ between the events you send, the KQL function, and the map definition, the map might appear empty even though data is being ingested.

> [!NOTE]
> Fabric notebooks can be created and managed through public REST APIs. In this tutorial, you call the **Create Notebook** endpoint and supply the notebook content inline through `definition.parts[]` using `payloadType: "InlineBase64"`.

## Create the notebook-creation script

### Create the file

In the same folder you used for the provisioning script, create a new file named:

```
create_simulator_notebook.py
```

### Install dependencies

If you reuse the virtual environment from the previous tutorial, the required packages are already installed. Otherwise, run:

```
pip install httpx azure-identity
```

#### What each library is for

- **httpx**: makes HTTP requests to the Fabric REST APIs.
- **azure-identity**: provides `DefaultAzureCredential` for Microsoft Entra authentication.

The notebook itself uses **azure-eventhub** to send events to the eventstream custom endpoint. That package is installed inside the notebook with `%pip install azure-eventhub`, so you don't need it in your local environment.

### Add the code

Copy the following code into `create_simulator_notebook.py`. The script reuses the helper conventions from the provisioning tutorial (`_fabric_headers`, `_pbi_headers`, `_handle_lro`, `_json_to_b64`) so the two scripts share a single mental model — including the same long-running operation handler, audience-aware token acquisition, and `InlineBase64` definition payload encoding.

```python
import base64
import json
import os
import time

import httpx
from azure.identity import DefaultAzureCredential

# =========================================================
# Config
# =========================================================

# Reuse the same workspace as the provisioning tutorial.
WORKSPACE_ID = os.environ.get("FABRIC_WORKSPACE_ID")
if not WORKSPACE_ID:
    raise SystemExit("Set FABRIC_WORKSPACE_ID to your Fabric workspace GUID before running.")

NOTEBOOK_DISPLAY_NAME = "Real-time vehicle simulator (Eventstream)"

# Vehicles seeded by the provisioning script.
# Keep these IDs and base coordinates in sync with vehicle_locations_seed.csv
# so simulator updates align with rows already in the eventhouse.
VEHICLES = {
    "V-001": (47.6101, -122.3344),
    "V-002": (47.6150, -122.3200),
    "V-003": (47.6205, -122.3493),
    "V-004": (47.6050, -122.3300),
}


# =========================================================
# Authentication helpers
# =========================================================

def _fabric_headers() -> dict:
    """
    Return Authorization + Content-Type headers for Fabric REST API calls.
    Acquires a token for the `https://api.fabric.microsoft.com/.default` scope.
    """
    token = DefaultAzureCredential().get_token("https://api.fabric.microsoft.com/.default").token
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


def _pbi_headers() -> dict:
    """
    Return Authorization headers for the Power BI / Fabric audience used by
    long-running operation poll URLs hosted on *.analysis.windows.net.
    """
    token = DefaultAzureCredential().get_token("https://analysis.windows.net/powerbi/api/.default").token
    return {"Authorization": f"Bearer {token}"}


def _headers_for_url(url: str) -> dict:
    """
    Pick the correct audience headers based on the host of `url`.
    LRO operation URLs sometimes land on the Power BI cluster and need a
    different token than the Fabric public endpoint.
    """
    if "analysis.windows.net" in url:
        return _pbi_headers()
    return _fabric_headers()


# =========================================================
# Definition payload helper
# =========================================================

def _json_to_b64(obj: dict) -> str:
    """
    Serialize a dict to JSON and Base64-encode it, producing the string
    expected by Fabric item-definition `parts[].payload` when
    `payloadType` is `InlineBase64`.
    """
    return base64.b64encode(json.dumps(obj).encode("utf-8")).decode("utf-8")


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

    # Locate the operation URL (Location header, with x-ms-operation-id fallback).
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
    poll_headers = _headers_for_url(op_url)
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

# =========================================================
# Build the simulator ipynb
# =========================================================

def build_simulator_ipynb() -> dict:
    """
    Build and return the nbformat-4 notebook dict for the simulator.

    The notebook contains three cells:
    1. A markdown cell that documents what the simulator does.
    2. A code cell that runs `%pip install azure-eventhub`.
    3. A code cell that sets `EVENTHUB_CONNECTION_STRING` from a literal
       you paste in, then enters an infinite loop that sends a batch of
       per-vehicle location updates to the eventstream every
       `SLEEP_SECONDS` until the kernel is interrupted.
    """
    vehicles_literal = json.dumps(VEHICLES)
    return {
        "nbformat": 4,
        "nbformat_minor": 5,
        "cells": [
            {
                "cell_type": "markdown",
                "metadata": {},
                "source": [
                    "# Real-time vehicle simulator (Eventstream)\n",
                    "\n",
                    "This notebook continuously sends vehicle location updates to an Eventstream Custom endpoint.\n",
                    "If `EVENTHUB_CONNECTION_STRING` isn't set, the notebook prompts you to paste it.\n",
                    "\n",
                    "To stop, interrupt the kernel. The `finally` block closes the producer cleanly.\n"
                ]
            },
            {
                "cell_type": "code",
                "metadata": {},
                "execution_count": None,
                "outputs": [],
                "source": [
                    "%pip install azure-eventhub\n"
                ]
            },
            {
                "cell_type": "code",
                "metadata": {},
                "execution_count": None,
                "outputs": [],
                "source": [
                    "# Replace <PASTE_CONNECTION_STRING_HERE> with the eventstream\n",
                    "# connection string-primary key.\n",
                    "import os\n",
                    "os.environ[\"EVENTHUB_CONNECTION_STRING\"] = \"<PASTE_CONNECTION_STRING_HERE>\"\n"
                ]
            },
            {
                "cell_type": "code",
                "metadata": {},
                "execution_count": None,
                "outputs": [],
                "source": [
                    "import os\n",
                    "import json\n",
                    "import random\n",
                    "import time\n",
                    "from datetime import datetime, timezone\n",
                    "from azure.eventhub import EventHubProducerClient, EventData\n",
                    "\n",
                    "# Vehicles seeded by the provisioning script.\n",
                    "# Keep these IDs and base coordinates in sync with vehicle_locations_seed.csv.\n",
                    f"VEHICLES = {vehicles_literal}\n",
                    "\n",
                    "# Update cadence (seconds)\n",
                    "SLEEP_SECONDS = 1.0\n",
                    "\n",
                    "conn_str = os.environ.get(\"EVENTHUB_CONNECTION_STRING\", \"\").strip()\n",
                    "if not conn_str:\n",
                    "    print(\"Paste the eventstream connection string-primary key:\")\n",
                    "    conn_str = input(\"EVENTHUB_CONNECTION_STRING: \").strip()\n",
                    "\n",
                    "producer = EventHubProducerClient.from_connection_string(conn_str=conn_str)\n",
                    "print(\"Starting real-time simulation... (interrupt the kernel to stop)\")\n",
                    "\n",
                    "try:\n",
                    "    while True:\n",
                    "        batch = producer.create_batch()\n",
                    "        now = datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')\n",
                    "\n",
                    "        for vid, (lat0, lon0) in VEHICLES.items():\n",
                    "            # jitter around the base point to simulate movement\n",
                    "            lat = lat0 + random.uniform(-0.0008, 0.0008)\n",
                    "            lon = lon0 + random.uniform(-0.0008, 0.0008)\n",
                    "\n",
                    "            evt = {\n",
                    "                \"VehicleId\": vid,\n",
                    "                \"Latitude\": round(lat, 6),\n",
                    "                \"Longitude\": round(lon, 6),\n",
                    "                \"EventTime\": now\n",
                    "            }\n",
                    "\n",
                    "            batch.add(EventData(json.dumps(evt)))\n",
                    "\n",
                    "        producer.send_batch(batch)\n",
                    "        time.sleep(SLEEP_SECONDS)\n",
                    "\n",
                    "finally:\n",
                    "    producer.close()\n"
                ]
            }
        ],
        "metadata": {
            "language_info": {"name": "python"}
        }
    }


# =========================================================
# Find an existing notebook by name
# =========================================================

def _find_notebook_id_by_name(client: httpx.Client, display_name: str) -> str | None:
    """
    Page through the workspace's notebooks list and return the id of the
    notebook matching `display_name`, or `None` if no match is found.

    Used by the 409 retry path in `main()` to locate the existing notebook
    so its definition can be updated in place via `updateDefinition`.
    """
    url = f"https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/notebooks"
    while url:
        resp = client.get(url, headers=_fabric_headers())
        resp.raise_for_status()
        body = resp.json()
        for item in body.get("value", []):
            if item.get("displayName") == display_name:
                return item.get("id")
        url = body.get("continuationUri")
    return None


# =========================================================
# Orchestrate the workflow
# =========================================================

def main():
    """
    Build the simulator ipynb, then create the notebook in Fabric.

    The initial POST to the Create Notebook endpoint can return:
    - 201 / 202 / status-only 200 Succeeded — all handled by `_handle_lro`,
      which resolves the notebook id (falling back to a list+match on
      `displayName` for status-only responses).
    - 409 `ItemDisplayNameAlreadyInUse` — a notebook with this name already
      exists. In that case, look it up, call `updateDefinition` to replace
      its content, and return the existing notebook id.
    """
    ipynb = build_simulator_ipynb()
    definition = {
        "format": "ipynb",
        "parts": [
            {
                "path": "artifact.content.ipynb",
                "payloadType": "InlineBase64",
                "payload": _json_to_b64(ipynb),
            }
        ],
    }

    create_url = f"https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/notebooks"
    create_payload = {
        "displayName": NOTEBOOK_DISPLAY_NAME,
        "description": "Continuously sends vehicle location updates to the eventstream",
        "definition": definition,
    }

    with httpx.Client(timeout=60) as client:
        resp = client.post(create_url, headers=_fabric_headers(), json=create_payload)

        # 409 path: notebook already exists — update its definition in place.
        if resp.status_code == 409 and "ItemDisplayNameAlreadyInUse" in resp.text:
            print(f"Notebook '{NOTEBOOK_DISPLAY_NAME}' already exists; updating its definition...")
            notebook_id = _find_notebook_id_by_name(client, NOTEBOOK_DISPLAY_NAME)
            if not notebook_id:
                raise RuntimeError(
                    f"Got 409 for '{NOTEBOOK_DISPLAY_NAME}' but couldn't find it via list."
                )
            update_url = (
                f"https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}"
                f"/notebooks/{notebook_id}/updateDefinition"
            )
            upd = client.post(update_url, headers=_fabric_headers(), json={"definition": definition})
            if upd.status_code not in (200, 202):
                raise RuntimeError(f"updateDefinition failed: {upd.status_code} {upd.text}")
            if upd.status_code == 202:
                _handle_lro(client, upd)
            print("\nDONE (updated existing notebook)")
            print("Notebook ID:", notebook_id)
            return

        # 201 / 202 / status-only 200 paths: delegate to _handle_lro.
        notebook_id = _handle_lro(
            client,
            resp,
            list_url=create_url,
            match_display_name=NOTEBOOK_DISPLAY_NAME,
        )
        print("\nDONE")
        print("Notebook ID:", notebook_id)


if __name__ == "__main__":
    main()
```

> [!NOTE]
> Notebook content is supplied as a single `definition.parts[]` entry with `format: "ipynb"` and `payloadType: "InlineBase64"`. The `path` value must be exactly `artifact.content.ipynb` — any other path causes the Create Notebook call to fail. The Create Notebook endpoint supports long-running operations (LRO), which `_handle_lro` resolves uniformly.

### Run the script

```
python create_simulator_notebook.py
```

When the script completes successfully, you see output similar to:

```
DONE
Notebook ID: 11111111-2222-3333-4444-555555555555
```

The notebook is now visible in your Fabric workspace. If you rerun the script, the existing notebook is updated in place (its definition is replaced) and you see `DONE (updated existing notebook)` instead.

## Run the simulator notebook in Fabric

### Open the notebook

1. Open your Fabric workspace.
1. Select the notebook named **Real-time vehicle simulator (Eventstream)**.

### Provide the connection string

The notebook includes a dedicated cell that sets the `EVENTHUB_CONNECTION_STRING` environment variable for the running notebook session. The simulator cell below it reads that variable and skips the `input()` prompt entirely.

Use the **same connection string** you pasted when running the provisioning script. To retrieve it again, see [Run the application](tutorial-create-real-time-map-python.md#run-the-application).

1. In the open notebook, locate the cell that contains:

    ```python
    os.environ["EVENTHUB_CONNECTION_STRING"] = "<PASTE_CONNECTION_STRING_HERE>"
    ```

1. Replace `<PASTE_CONNECTION_STRING_HERE>` with the connection string you copied from the eventstream **Custom endpoint → SAS Key Authentication → Connection string-primary key**.

> [!IMPORTANT]
> Don't save the notebook with your real connection string pasted into the cell. Before you commit or share the notebook, clear the value (for example, set it back to `<PASTE_CONNECTION_STRING_HERE>`) so the secret isn't persisted in the `.ipynb` file. For long-term use, store the connection string in **Azure Key Vault** and load it with `notebookutils.credentials.getSecret(...)` instead of hardcoding it.

> [!NOTE]
> After the `%pip install azure-eventhub` cell runs, Fabric might require you to restart the Python kernel before the `from azure.eventhub import …` cell can resolve the package. If you see an `ImportError`, restart the kernel and run the import cell again.

### Start the simulator

Run all cells. The final cell prints `Starting real-time simulation... (interrupt the kernel to stop)` and then enters an infinite loop that sends a batch of vehicle updates roughly every second. There's no per-iteration output — open the map (next step) to watch updates arrive.

## Verify the map updates

1. Open the map created by the provisioning tutorial (**My Real-Time Fabric Map**).
1. Confirm the seed points are already visible.
1. With the simulator notebook still running, watch the markers move as the map auto-refreshes on the interval defined by `Config.refresh_interval_ms` in the provisioning script (rendered as `refreshIntervalMs` in the embedded map definition).

## Stop the simulator

To stop streaming, interrupt the notebook kernel (**Stop** in the notebook toolbar). The `finally` block closes the `EventHubProducerClient` cleanly so connections aren't leaked.

## Troubleshooting

- **Map appears empty after running the simulator.** Open the eventstream in Fabric and check the **Data preview** to confirm events are arriving. Then run `VehicleLocations | take 10` in the KQL queryset of the `eh_realtime_locations` eventhouse to confirm rows reached the eventhouse.
- **`EVENTHUB_CONNECTION_STRING` errors or `Unauthorized`.** Re-copy the connection string from the eventstream's **Custom endpoint → SAS Key Authentication → Connection string-primary key**, then update the assignment cell with the new value and rerun the simulator cell.
- **Map markers don't update visibly.** Confirm `Config.refresh_interval_ms` in the provisioning script is set to a small enough value (rendered as `refreshIntervalMs` in the embedded map definition). Lower values refresh more often.
- **`ImportError: azure.eventhub` after `%pip install`.** Restart the notebook kernel and rerun the import cell.
- **Create Notebook returns 400.** Verify `parts[].path` is exactly `artifact.content.ipynb` and `format` is `ipynb`.

## Summary

In this tutorial, you extended the resources created in the previous tutorial by:

- Creating a Fabric notebook **programmatically** through the Fabric REST API, with the notebook content supplied as an inline `ipynb` definition
- Embedding a continuous data generator that sends per-vehicle location updates to the eventstream custom endpoint
- Running the notebook in Fabric and observing the map refresh in near real time as new events flowed through eventstream and eventhouse

Combined with the provisioning tutorial, you now have a fully automated, end-to-end real-time geospatial scenario in Microsoft Fabric.

## Next steps

You can extend this solution toward real-world scenarios:

- Replace the simulator with live data sources (IoT devices, APIs, or application telemetry)
- Enhance the KQL function to compute aggregates, trends, or geospatial joins
- Add more layers to the map for richer context and analysis
- Integrate alerts or downstream workflows based on streaming events
- Explore building static or historical spatial views using lakehouse data
