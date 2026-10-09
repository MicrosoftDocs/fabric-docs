---
title: Create layers using WMS and WMTS imagery sources in Fabric Maps
description: Learn about WMS and WMTS imagery sources and Microsoft Planetary Computer (MPC) Pro's WMTS endpoint in Fabric Maps.
ms.reviewer: smunk, sipa
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.date: 09/13/2026
ms.search.form: Create layers using WMS and WMTS imagery sources
---

# Create layers using WMS and WMTS imagery sources in Fabric Maps

Fabric Maps supports rendering raster imagery hosted on external OGC-compliant **Web Map Service (WMS)** and **Web Map Tile Service (WMTS)** endpoints. These services provide map images dynamically (WMS) or as prerendered tiles (WMTS), and are commonly used for satellite imagery, elevation models, weather overlays, and other authoritative raster datasets.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

By connecting to a WMS or WMTS endpoint, you can visualize external imagery directly in Fabric Maps without copying the imagery into Fabric.

This feature also supports **Microsoft Planetary Computer (MPC) Pro** imagery through WMTS endpoints secured with Microsoft Entra ID authentication.

> [!NOTE]
> WMS and WMTS sources are added as imagery layers and can be combined with basemaps and vector layers.

WMS and WMTS services return rendered raster images or tiles. To connect to a service that returns individual vector features and attributes, see [External feature services in Fabric Maps](about-external-feature-services.md).

## How WMS and WMTS imagery works in Fabric Maps

When you add a WMS or WMTS source to a map in Fabric:

- Fabric connects to an external imagery endpoint by using a **Geospatial Web Services** connection.
- You see a list of the imagery layers that the WMS or WMTS service publishes.
- Fabric renders the selected layers as imagery layers on the map canvas.

WMS and WMTS layers behave like other imagery layers in Fabric Maps. You can:

- Toggle visibility.
- Adjust layer opacity.
- Stack them with vector layers, basemaps, and other imagery.

For more information about how to add WMS and WMTS layers to a map item, see [Add a WMS or WMTS imagery layer to a map](add-external-sourced-imagery-layer.md).

## Microsoft Planetary Computer Pro integration

Fabric Maps integrates with **Microsoft Planetary Computer Pro** by connecting directly to its WMTS endpoints. These endpoints come from MPC Pro geocatalog collections and you can use them to render large‑scale planetary imagery in maps.
To use MPC Pro imagery:

- Connect by using a WMTS endpoint generated from the MPC Pro geocatalog.
- Authenticate by using OAuth 2.0 through Microsoft Entra ID.
- You need reader access to the target MPC Pro geocatalog when you create the connection.

After you connect, MPC Pro imagery layers behave the same as other WMTS layers in Fabric Maps.

For more information about Microsoft Planetary Computer Pro integration, see [Use Microsoft Planetary Computer Pro imagery](add-external-sourced-imagery-layer.md#use-microsoft-planetary-computer-pro-imagery).

## Supported authentication methods

Fabric Maps supports the following authentication methods for WMS and WMTS connections:

- **Anonymous**: For public or open endpoints
- **Basic authentication**: Username and password
- **API key**: Key name and value passed to the service
- **OAuth 2.0 (Microsoft Entra ID)**: Required for Microsoft Planetary Computer Pro

## Next steps

> [!div class="nextstepaction"]
> [Add a WMS or WMTS imagery layer to a map](add-external-sourced-imagery-layer.md)

> [!div class="nextstepaction"]
> [Use Microsoft Planetary Computer Pro imagery](add-external-sourced-imagery-layer.md#use-microsoft-planetary-computer-pro-imagery)
