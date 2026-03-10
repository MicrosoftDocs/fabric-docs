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

This how-to article shows you how to add external raster imagery to Fabric Maps using Web Map Service (WMS) and Web Map Tile Service (WMTS) endpoints. Learn how to create and manage Fabric Maps cloud connections, authenticate to external imagery services, and render WMS or WMTS layers—including Microsoft Planetary Computer Pro imagery—directly on a map. By connecting to external imagery sources, you can enrich your maps with authoritative raster data such as satellite imagery, elevation models, or thematic overlays without copying or storing the imagery in Fabric.

For more information on WMS or WMTS imagery, see [Create layers using WMS and WMTS imagery sources in Fabric Maps](about-external-sourced-imagery.md)

> [!IMPORTANT]
> Fabric Maps is currently in [preview](../../fundamentals/preview.md). Features and functionality may change.

## Prerequisites

Before you begin, make sure you have:

- Access to a WMS or WMTS endpoint
- Permission to create or use Fabric Maps cloud connections
- Credentials for the service, if authentication is required

## Use WMS or WMTS imagery

To use a WMS or WMTS service in Fabric Maps, first create a **Fabric Maps cloud connection** and then add the imagery layer to your map.

### Step 1: Create a Fabric Maps cloud connection

> [!TIP]
> Create one connection per imagery service and reuse it across multiple maps to avoid reentering credentials.

1. In Fabric, open **User settings**.

    :::image type="content" source="media/layers/user-settings.png" alt-text="A screenshot of the User settings menu in Microsoft Fabric Maps with Settings selected in the dropdown.":::

1. Select **Manage connections and gateways**.
1. Select **New**, and then choose **Cloud connection**.

    :::image type="content" source="media/layers/new-connection.png" alt-text="A screenshot of the Microsoft Fabric Maps interface showing the Manage Connections and Gateways page. The New button in the upper left is highlighted.":::

1. For **Connection type**, select **Fabric Maps**.

    :::image type="content" source="media/layers/fabric-maps-connection-type.png" alt-text="Screenshot of the New connection dialog in Microsoft Fabric Maps. The Cloud option is selected among connection types, and the Connection type dropdown is expanded, highlighting Fabric Maps as an option.":::

1. Enter a descriptive name for the connection.
1. Configure the connection:
    - **Base URL**: The root URL of the WMS or WMTS service.
    - **Protocol**: WMS or WMTS.
    - **Authentication method**: Anonymous, Basic authentication, or API key.
    - **Privacy level**: None, Private, Organizational, Public.

    :::image type="content" source="media/layers/fabric-maps-connection-settings.png" alt-text="A screenshot that shows the New connection dialog in Microsoft Fabric Maps showing fields for configuring a Fabric Maps cloud connection. The form includes dropdowns and input fields for connection type set to Fabric Maps, base URL, protocol, API key name, authentication method, and privacy level set to Organizational. There are checkboxes for allowing code-first artifacts and gateway utilization.":::

1. Select **Create**.

The connection becomes available for use in Fabric Maps.

> [!NOTE]
> The Base URL must use the **HTTPS** protocol.
>
> Fabric Maps supports the following WMS/WMTS base URL formats:
>
> - **KVP binding**: `https://example.com/geoserver/wmts`
> - **RESTful binding**: `https://example.com/geoserver/wmts/WMTSCapabilities.xml`

### Step 2: Share the connection (optional)

If other users need access to the same imagery source, you can share the connection.

1. Open **Manage connections and gateways**.
1. Locate the Fabric Maps connection.
1. Select **More options**, and then choose **Manage users**.

    :::image type="content" source="media/layers/manage-users.png" alt-text="A screenshot showing the Manage Connections and Gateways interface in Microsoft Fabric Maps with the context menu open showing options: Settings, Manage users (highlighted), and Remove. The wider environment displays a list of connections with columns for Name, Connection type, Users, Status, and Gateway cluster name.":::

1. Add users and assign the appropriate access level.
1. Select **Share**.

Shared connections allow teams to use the same imagery source without embedding credentials in maps.

### Step 3: Add the imagery layer to a map

Once Fabric Maps cloud connections are created, you can add one or more to your map instance as an external source for a new map layer.

1. Open an existing map or create a new map in Fabric Maps.
1. Open the **External sources** tab.
1. Select **Add sources**.

    :::image type="content" source="media/layers/add-source.png" alt-text="A screenshot of the Microsoft Fabric Maps interface showing the External sources tab selected in the Explorer panel. The Add source button is visible, allowing users to add a new external data source. The wider environment displays a map preview on the right and a navigation bar at the top with options for Home, New tileset, Tileset activity, and Map settings.":::

1. Choose the desired source from the **Connection** drop-down list.
1. Once the connection is selected, select the **Add** button.

    :::image type="content" source="media/layers/add-connection.png" alt-text="A screenshot of the Dialog box titled Choose data source, centered on the Microsoft Fabric Maps interface. The dialog prompts the user to select a connection from a dropdown, and provides Add and Cancel buttons, with Add highlighted. Above the dialog, a message states you can create up to 100 connections and advises managing or deleting unused ones.":::

1. Expand the connection to view available imagery layers.
1. Right‑click a layer and select **Show on map**.

:::image type="content" source="media/layers/show-on-map.png" alt-text="A screenshot showing the Explorer panel in Microsoft Fabric Maps with the External sources tab selected. A list of layers is shown with the More options menu for Registre parcellaire graphique 2017 expanded, displaying the option Show on map highlighted.":::

The imagery layer is rendered on the map canvas.

### Step 4: Adjust imagery layer appearance

After adding the imagery layer, you can:

- Adjust opacity to blend with other layers
- Reorder layers to control visual stacking
- Toggle layer visibility

External imagery layers behave like other imagery layers in Fabric Maps and can be combined with other imagery layers or vector layers.

> [!NOTE]
> Fabric Maps currently supports rendering WMS and WMTS imagery using the EPSG:3857 (Web Mercator) projection and JPEG or PNG image formats.

## Use Microsoft Planetary Computer Pro imagery

Fabric Maps integrates with **Microsoft Planetary Computer (MPC) Pro** by connecting to WMTS endpoints exposed through the MPC Pro geocatalog. **Authentication uses OAuth 2.0 with Microsoft Entra ID**.

> [!IMPORTANT]
> Creating an MPC Pro imagery connection requires **Reader** access to the Microsoft Planetary Computer (MPC) Pro geocatalog.

### Step 1: Obtain the MPC Pro WMTS endpoint

To connect to MPC Pro, you must construct a WMTS endpoint URL from a geocatalog collection.

The following steps are summary level instructions for how to obtain the MPC Pro WMTS endpoint. For detailed instructions, see [Get the WMTS endpoint URL from the MPC Pro geocatalog](get-mpc-pro-wmts-endpoint.md).

1. Identify the target MPC Pro geocatalog collection.
1. Retrieve the **Search ID** and **render configuration** parameters.
1. To ensure correct WMTS rendering in MPC Pro, the bounding box (bbox) and associated metadata must be registered through the [registration API](/rest/api/planetarycomputer/data-plane/mosaics-register-search/register?view=rest-planetarycomputer-data-plane-2025-04-30-preview&tabs=HTTP).
1. Use these values to construct the WMTS capabilities URL.

Access to the MPC Pro geocatalog is required to retrieve this information.

### Step 2: Create the MPC Pro connection in Fabric

Once you have the WMTS endpoint URL from the previous section, you're ready to create a connection to a  _Microsoft Planetary Computer_.

1. Open **Manage connections and gateways**.
1. Select **New**, and then choose **Cloud**.
1. Enter a **Connection name**.
1. For **Connection type**, select **Microsoft Planetary Computer**.
1. Enter the WMTS endpoint URL for the **Base URL**.
1. Select **WMTS** as the **Protocol**.
1. Select **OAuth 2.0** as the authentication method.
1. Select **Create**.

:::image type="content" source="media/layers/microsoft-planetary-computer-connection.png" alt-text="A screenshot of the Microsoft Fabric Maps interface showing the External sources tab in the Explorer panel. A list of imagery layers is displayed, with one layer's More options menu expanded and the Show on map option highlighted.":::

> [!IMPORTANT]
> Creating an MPC Pro connection requires **Reader** access to the MPC Pro geocatalog and a non‑guest account in the Azure tenant.

### Step 3: Add MPC Pro imagery to a map

1. Open a map in Fabric Maps.
1. In **External sources**, add the MPC Pro connection.
1. Select an imagery layer and choose **Show on map**.

MPC Pro imagery layers behave like other WMTS imagery layers and can be reordered, styled, and combined with other map content.

## Limitations and considerations

- A Fabric Maps item can reference up to 100 external connections.
- Some WMS services don't provide complete metadata (such as bounding boxes or minimum zoom levels), which can cause **Zoom to fit** to behave unexpectedly.
- Rendering performance and availability depend on the external imagery service.
- External imagery isn't cached or stored by Fabric Maps.
