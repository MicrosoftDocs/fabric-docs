---
title: Simulate real-time data ingestion for a Fabric map using REST APIs
description: Learn how to create a Fabric notebook programmatically that continuously streams vehicle location updates into Eventstream, driving real-time refreshes of a Fabric Map.
ms.reviewer: smunk, sipa
ms.service: fabric
ms.topic: tutorial
ms.custom: mvc
ms.date: 05/15/2026
---

# Tutorial: Simulate real-time data ingestion into a Fabric map

In the previous tutorial, you provisioned an Eventhouse, Eventstream, KQL function, and Map. The provisioning script also sent a small set of **seed events** so the map wasn't empty on first open.

In this tutorial, you build on that by creating a **real-time simulator notebook** programmatically using the Fabric REST API. When run, the notebook continuously sends updated vehicle locations into the Eventstream Custom endpoint. As events flow into Eventhouse, the map refreshes automatically.

> [!div class="checklist"]
>
> - Create a Fabric notebook programmatically using the Fabric REST API
> - Embed a continuous data simulator inside the notebook as an `ipynb` definition
> - Run the notebook in Fabric to stream vehicle location updates into Eventstream
> - Observe the Map refresh in near real time as new events are ingested

## Prerequisites

- Complete [Tutorial: Create a real-time map from Eventhouse data using REST APIs](tutorial-create-real-time-map-python.md). This tutorial reuses the Eventhouse, Eventstream, KQL function, and Map that the provisioning tutorial created.
- The `FABRIC_WORKSPACE_ID` environment variable set to the same workspace ID you used in the previous tutorial.
- A working Python environment with `httpx` and `azure-identity` installed (the same environment from the previous tutorial works).
- The **Eventstream Custom endpoint connection string** from the previous tutorial. To retrieve it, see [Run the application](tutorial-create-real-time-map-python.md#run-the-application).
- You're signed in for `DefaultAzureCredential`. If your session has expired, run:

  ```bash
  az login
  ```

## How the simulator fits the architecture

The simulator slots into the same pipeline you built in tutorial 1:

```
Simulator notebook  -->  Eventstream Custom endpoint  -->  Eventhouse table
                                                                |
                                                                v
                                                  KQL function (latest per vehicle)
                                                                |
                                                                v
                                                       Fabric Map (auto-refresh)
```

> [!IMPORTANT]
> The field names used by the **seed events**, **simulator events**, **KQL function output**, and **map layer bindings** must match exactly, including casing.
>
> The map layer created in tutorial 1 expects these columns from the KQL function:
>
> - `Latitude` — map latitude binding
> - `Longitude` — map longitude binding
> - `VehicleId` — tooltips and grouping
> - `EventTime` — used for the `arg_max(EventTime, *)` "latest location" query
>
> If any of these names differ between events you send, the KQL function, and the map definition, the map can appear empty even though data is being ingested.

> [!NOTE]
> Fabric notebooks can be created and managed through public REST APIs. In this tutorial, you call the **Create Notebook** API and supply the notebook content as an **ipynb definition** encoded as Base64.

## Create the notebook-creation script

### Create the file

In the same folder you used for the provisioning script, create a new file named:

```
create_simulator_notebook.py
```

### Install dependencies

If you reuse the virtual environment from the previous tutorial, the required packages are already installed. Otherwise:

```bash
pip install httpx azure-identity
```

### Add the code

Copy the following code into `create_simulator_notebook.py`. The helper names (`_fabric_headers`, `_pbi_headers`, `_handle_lro`, `_json_to_b64`) match the conventions used in the provisioning script so the two scripts feel like one project.

```python
import base64
import json
import os
import time
import httpx
from azure.identity import DefaultAzureCredential

# Reuse the same workspace as the provisioning tutorial
WORKSPACE_ID = os.environ["FABRIC_WORKSPACE_ID"]
NOTEBOOK_DISPLAY_NAME = "Real-time vehicle simulator (Eventstream)"

# Vehicles seeded by the provisioning script.
# Keep these IDs and base coordinates in sync with vehicle_locations_seed.csv.
VEHICLES = {
    "V-001": (47.6101, -122.3344),
    "V-002": (47.6150, -122.3200),
    "V-003": (47.6205, -122.3493),
    "V-004": (47.6050, -122.3300),
}


def _fabric_headers() -> dict:
    token = DefaultAzureCredential().get_token("https://api.fabric.microsoft.com/.default").token
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


def _pbi_headers() -> dict:
    token = DefaultAzureCredential().get_token("https://analysis.windows.net/powerbi/api/.default").token
    return {"Authorization": f"Bearer {token}"}


def _headers_for_url(url: str) -> dict:
    if "analysis.windows.net" in url:
        return _pbi_headers()
    return _fabric_headers()


def _json_to_b64(obj: dict) -> str:
    return base64.b64encode(json.dumps(obj).encode("utf-8")).decode("utf-8")


def _handle_lro(client: httpx.Client, resp: httpx.Response) -> str:
    """
    Poll a long-running operation until it completes, handling 201/202,
    Location vs x-ms-operation-id, Retry-After, and status:Running payloads.
    """
    if resp.status_code == 201:
        return resp.json()["id"]

    if resp.status_code != 202:
        raise RuntimeError(f"Unexpected status: {resp.status_code} {resp.text}")

    op_url = (
        resp.headers.get("Location")
        or f"https://api.fabric.microsoft.com/v1/operations/{resp.headers.get('x-ms-operation-id')}"
    )
    retry_after = int(resp.headers.get("Retry-After", "5"))

    while True:
        time.sleep(retry_after)
        poll = client.get(op_url, headers=_headers_for_url(op_url))
        if poll.status_code == 202:
            retry_after = int(poll.headers.get("Retry-After", "5"))
            continue
        poll.raise_for_status()
        body = poll.json() if poll.content else {}
        if isinstance(body, dict) and body.get("status") in ("Running", "NotStarted"):
            retry_after = int(poll.headers.get("Retry-After", "5"))
            continue
        if isinstance(body, dict) and body.get("status") == "Failed":
            raise RuntimeError(f"LRO failed: {body}")
        if isinstance(body, dict) and body.get("id"):
            return body["id"]
        raise RuntimeError(f"LRO succeeded but no id returned: {body}")

def build_simulator_ipynb() -> dict:
    """
    Build an ipynb that continuously emits vehicle location updates.

    The notebook prompts for EVENTHUB_CONNECTION_STRING unless it's already
    set as an environment variable inside the Fabric notebook session.
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
                    "import os\n",
                    "import json\n",
                    "import random\n",
                    "import time\n",
                    "from datetime import datetime, timezone\n",
                    "from azure.eventhub import EventHubProducerClient, EventData\n",
                    "\n",
                    "# Vehicles seeded by the provisioning script.\n",
                    "# Keep these in sync with vehicle_locations_seed.csv.\n",
                    f"VEHICLES = {vehicles_literal}\n",
                    "\n",
                    "# Update cadence (seconds)\n",
                    "SLEEP_SECONDS = 1.0\n",
                    "\n",
                    "conn_str = os.environ.get(\"EVENTHUB_CONNECTION_STRING\", \"\").strip()\n",
                    "if not conn_str:\n",
                    "    print(\"Paste the Eventstream Connection string-primary key (SAS Key Authentication):\")\n",
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


def main():
    ipynb = build_simulator_ipynb()

    payload = {
        "displayName": NOTEBOOK_DISPLAY_NAME,
        "description": "Continuously sends vehicle location updates to Eventstream",
        "definition": {
            "format": "ipynb",
            "parts": [
                {
                    "path": "artifact.content.ipynb",
                    "payloadType": "InlineBase64",
                    "payload": _json_to_b64(ipynb)
                }
            ]
        }
    }

    url = f"https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/notebooks"

    with httpx.Client(timeout=60) as client:
        resp = client.post(url, headers=_fabric_headers(), json=payload)
        notebook_id = _handle_lro(client, resp)
        print("\nDONE")
        print("Notebook ID:", notebook_id)


if __name__ == "__main__":
    main()
```

> [!NOTE]
> Notebook content is supplied as a single definition part in `ipynb` format using an `InlineBase64` payload. The `parts[].path` value must be exactly `artifact.content.ipynb` — any other path causes the Create Notebook call to fail. The Notebook create API supports long-running operations (LRO).

### Run the script

```
python create_simulator_notebook.py
```

When the script completes, it prints the new notebook's ID. The notebook is now visible in your Fabric workspace.

## Run the simulator notebook in Fabric

### Open the notebook

1. Open your Fabric workspace.
1. Select the notebook named **Real-time vehicle simulator (Eventstream)**.

### Provide the connection string

The notebook reads `EVENTHUB_CONNECTION_STRING` from the environment. If it isn't set, the second code cell prompts you to paste it.

Use the **same connection string** you pasted when running the provisioning script. To retrieve it again, see [Run the application](tutorial-create-real-time-map-python.md#run-the-application).

> [!NOTE]
> After the `%pip install azure-eventhub` cell runs, Fabric may require you to restart the Python kernel before the `from azure.eventhub import …` cell can resolve the package. If you see an `ImportError`, restart the kernel and run the import cell again.

### Start the simulator

Run all cells. The final cell enters an infinite loop that sends a batch of vehicle updates roughly every second.

## Verify the map updates

1. Open the Map created by the provisioning tutorial (**My Real-Time Fabric Map**).
1. Confirm the seed points are already visible.
1. With the simulator notebook still running, watch the markers move as the map auto-refreshes on the interval defined by `refresh_interval_ms` in `map.json`.

## Stop the simulator

To stop streaming, interrupt the notebook kernel (**Stop** in the notebook toolbar). The `finally` block closes the `EventHubProducerClient` cleanly so connections aren't leaked.

## Troubleshooting

- **Map appears empty after running the simulator.** Open the Eventstream in Fabric and check the **Data preview** to confirm events are arriving. Then run `eh_realtime_locations | take 10` in the KQL queryset to confirm rows reached Eventhouse.
- **`EVENTHUB_CONNECTION_STRING` errors or `Unauthorized`.** Re-copy the connection string from the Eventstream's **Custom endpoint → SAS Key Authentication → Connection string-primary key**, then paste it again when prompted.
- **Map markers don't update visibly.** Confirm `refreshIntervalMs` in the layer source of `map.json` is set (the provisioning tutorial uses `Config.refresh_interval_ms`). Lower values refresh more often.
- **`ImportError: azure.eventhub` after `%pip install`.** Restart the notebook kernel and rerun the import cell.
- **Create Notebook returns 400.** Verify `parts[].path` is exactly `artifact.content.ipynb` and `format` is `ipynb`.

## Summary

In this tutorial, you extended the resources created in the previous tutorial by:

- Creating a Fabric notebook **programmatically** through the Fabric REST API, with the notebook content supplied as an inline `ipynb` definition
- Embedding a continuous data generator that sends per-vehicle location updates to the Eventstream Custom endpoint
- Running the notebook in Fabric and observing the Map refresh in near real time as new events flowed through Eventstream and Eventhouse

Combined with the provisioning tutorial, you now have a fully automated, end-to-end real-time geospatial scenario in Microsoft Fabric.

## Next steps

You can extend this solution toward real-world scenarios:

- Replace the simulator with live data sources (IoT devices, APIs, or application telemetry)
- Enhance the KQL function to compute aggregates, trends, or geospatial joins
- Add more layers to the map for richer context and analysis
- Integrate alerts or downstream workflows based on streaming events
- Explore building static or historical spatial views using Lakehouse data
