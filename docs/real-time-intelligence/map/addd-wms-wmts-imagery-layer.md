---
title: Add a WMS or WMTS imagery layer to a map
description: Learn how to create layers using WMS and WMTS imagery sources and Microsoft Planetary Computer (MPC) Pro's WMTS endpoint in Fabric Maps.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/06/2026
ms.search.form: WMS, WMTS, WMS and WMTS imagery sources, Microsoft Planetary Computer Pro imagery, MPC
---

# Add a WMS or WMTS imagery layer to a map

This how-to article shows you how to add external raster imagery to Fabric Maps using Web Map Service (WMS) and Web Map Tile Service (WMTS) endpoints. You'll learn how to create and manage Fabric Maps cloud connections, authenticate to external imagery services, and render WMS or WMTS layers— including Microsoft Planetary Computer Pro imagery—directly on a map. By connecting to external imagery sources, you can enrich your maps with authoritative raster data such as satellite imagery, elevation models, or thematic overlays without copying or storing the imagery in Fabric.

For more information on WMS or WMTS imagery, see [Create layers using WMS and WMTS imagery sources in Fabric Maps](about-wms-wmts-imagery.md)

## Prerequisites

Before you begin, make sure you have:

- Access to a WMS or WMTS endpoint
- Permission to create or use Fabric Maps cloud connections
- Credentials for the service, if authentication is required

## Use WMS or WMTS imagery

To use a WMS or WMTS service in Fabric Maps, first create a **Fabric Maps cloud connection** and then add the imagery layer to your map.

### Step 1: Create a Fabric Maps cloud connection

1. In Fabric, open **User settings**.
1. Select **Manage connections and gateways**.
1. Select **New**, and then choose **Cloud connection**.
1. For **Connection type**, select **Fabric Maps**.
1. Enter a descriptive name for the connection.
1. Configure the connection:
    - **Base URL**: The root URL of the WMS or WMTS service
    - **Protocol**: WMS or WMTS
    - **Authentication**: Anonymous, Basic authentication, or API key
1. Select **Create**.

The connection becomes available for use in Fabric Maps.

> [!TIP]
> Create one connection per imagery service and reuse it across multiple maps to avoid re‑entering credentials.

### Step 2: Share the connection (optional)

If other users need access to the same imagery source, you can share the connection.

1. Open **Manage connections and gateways**.
1. Locate the Fabric Maps connection.
1. Select **More options**, and then choose **Manage users**.
1. Add users and assign the appropriate access level.

Shared connections allow teams to use the same imagery source without embedding credentials in maps.

### Step 3: Add the imagery layer to a map

1. Open an existing map or create a new map in Fabric Maps.
1. Open the **External sources** tab.
1. Select **Add sources**.
1. Choose the Fabric Maps connection.
1. Expand the connection to view available imagery layers.
1. Right‑click a layer and select **Show on map**.

The imagery layer is rendered on the map canvas.

### Step 4: Adjust imagery layer appearance

After adding the imagery layer, you can:

- Adjust opacity to blend with other layers
- Reorder layers to control visual stacking
- Toggle layer visibility

External imagery layers behave like other imagery layers in Fabric Maps and can be combined with vector layers, labels, and filters.

## Use Microsoft Planetary Computer Pro imagery

Fabric Maps integrates with **Microsoft Planetary Computer (MPC) Pro** by connecting to WMTS endpoints exposed through the MPC Pro geocatalog. **Authentication uses OAuth 2.0 with Microsoft Entra ID**.

> [!IMPORTANT]
> Reader access to the MPC Pro geocatalog is required to connect to MPC Pro imagery.

### Step 1: Obtain the MPC Pro WMTS endpoint

To connect to MPC Pro, you must construct a WMTS endpoint URL from a geocatalog collection.

1. Identify the target MPC Pro geocatalog collection.
1. Retrieve the **Search ID** and **render configuration** parameters.
1. Use these values to construct the WMTS capabilities URL.

Access to the MPC Pro geocatalog is required to retrieve this information.

### Step 2: Create the MPC Pro connection in Fabric

1. Open **Manage connections and gateways**.
1. Select **New**, and then choose **Cloud connection**.
1. For **Connection type**, select **Microsoft Planetary Computer**.
1. Enter the WMTS endpoint URL.
1. Select **OAuth 2.0** as the authentication method.
1. Select **Edit credential**, and complete Microsoft Entra ID authentication.

### Step 3: Add MPC Pro imagery to a map

1. Open a map in Fabric Maps.
1. In **External sources**, add the MPC Pro connection.
1. Select an imagery layer and choose **Show on map**.

MPC Pro imagery layers behave like other WMTS imagery layers and can be reordered, styled, and combined with other map content.

## Limitations and considerations

- A Fabric Maps item can reference up to 100 external connections.
- Some WMS services may not expose complete metadata, which can affect zoom‑to‑fit behavior.
- Rendering performance and availability depend on the external imagery service.
- External imagery is not cached or stored by Fabric Maps.
