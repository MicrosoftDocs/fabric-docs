---
title: Create layers using WMS and WMTS imagery sources in Fabric Maps
description: Learn about WMS and WMTS imagery sources and Microsoft Planetary Computer (MPC) Pro's WMTS endpoint in Fabric Maps.
ms.reviewer: smunk, sipa
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/06/2026
ms.search.form: WMS, WMTS, WMS and WMTS imagery sources, Microsoft Planetary Computer Pro imagery, MPC
---

# Create layers using WMS and WMTS imagery sources in Fabric Maps

Fabric Maps supports rendering raster imagery hosted on external OGC-compliant **Web Map Service (WMS)** and **Web Map Tile Service (WMTS)** endpoints. These services provide map images dynamically (WMS) or as pre-rendered tiles (WMTS), and are commonly used for satellite imagery, elevation models, weather overlays, and other authoritative raster datasets.

By connecting to a WMS or WMTS endpoint, you can visualize external imagery directly in Fabric Maps without copying the imagery into Fabric.

This feature also supports **Microsoft Planetary Computer (MPC) Pro** imagery through WMTS endpoints secured with Microsoft Entra ID authentication.

> [!NOTE]
> WMS and WMTS imagery sources are added as imagery layers. They behave like other imagery layers in Fabric Maps and can be combined with vector layers, basemaps, filters, and labels.

## How WMS and WMTS imagery works in Fabric Maps

When you add a WMS or WMTS source to a map, Fabric Maps:

- Connects to the external imagery endpoint through a Fabric Maps cloud connection.
- Lists the imagery layers published by the WMS or WMTS service.
- Renders selected layers as imagery layers on the map canvas.

WMS and WMTS layers behave like other imagery layers in Fabric Maps. You can:

- Toggle visibility.
- Adjust layer opacity.
- Stack them with vector layers, basemaps, and other imagery.

For more information on how to add WMS and WMTS layers to a map item, see [Add a WMS or WMTS imagery layer to a map](wms-wmts-imagery.md).

## Microsoft Planetary Computer Pro integration

Fabric Maps integrates with **Microsoft Planetary Computer Pro** by connecting directly to its WMTS endpoints. These endpoints are derived from MPC Pro geocatalog collections and allow you to render large‑scale planetary imagery in maps.
To use MPC Pro imagery:

- You connect using a WMTS endpoint generated from the MPC Pro geocatalog.
- Authentication is handled using OAuth 2.0 through Microsoft Entra ID.
- Reader access to the target MPC Pro geocatalog is required.

Once connected, MPC Pro imagery layers behave the same as other WMTS layers in Fabric Maps.

For more information on Microsoft Planetary Computer Pro integration, see [Use Microsoft Planetary Computer Pro imagery](wms-wmts-imagery.md#use-microsoft-planetary-computer-pro-imagery).

## Supported authentication methods

Fabric Maps supports the following authentication methods for WMS and WMTS connections:

- **Anonymous**: For public or open endpoints
- **Basic authentication**: Username and password
- **API key**: Key name and value passed to the service
- **OAuth 2.0 (Microsoft Entra ID)**: Required for Microsoft Planetary Computer Pro

For more information on authentication in Fabric Maps, see [About map permissions](about-map-permissions.md).

## Next steps

> [!div class="nextstepaction"]
> [Add a WMS or WMTS imagery layer to a map](wms-wmts-imagery.md)

> [!div class="nextstepaction"]
> [Use Microsoft Planetary Computer Pro imagery](wms-wmts-imagery.md#use-microsoft-planetary-computer-pro-imagery)
