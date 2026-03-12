---
title: Create layers using Lakehouse data sources in Fabric Maps
description: Learn about layers created from Lakehouse data sources in Fabric Maps.
ms.reviewer: smunk, sipa
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/12/2026
ms.search.form: Create layers using Lakehouse data sources
---

# Use lakehouse data in Fabric Maps

Fabric Maps can visualize spatial data stored in a Microsoft Fabric lakehouse. By connecting a map to a lakehouse, you can create map layers from files and tables stored in OneLake without copying data or standing up external GIS services. This approach lets you keep geospatial data centrally governed in the lakehouse while using Fabric Maps for interactive visualization and analysis.

Fabric Maps supports connecting to lakehouses directly from the map explorer and browsing items through the OneLake catalog.

## How lakehouse data is used in maps

A lakehouse stores data in OneLake and exposes it in two primary ways:

- **Tables** – Managed Delta Lake tables that can be queried and refreshed.
- **Files** – Unmanaged files stored in OneLake, including geospatial file formats.

When you add a lakehouse item to a map, Fabric Maps reads the data directly from OneLake and renders it as a map layer. The lakehouse remains the system of record, and changes to the underlying data are reflected in the map based on refresh behavior.

## Supported lakehouse data types

Fabric Maps supports creating layers from the following lakehouse‑based geospatial data types:

### Vector data

- **GeoJSON files** – Feature collections containing point, line, or polygon geometries with associated properties.
- **PMTiles** – Cloud‑optimized, single‑file vector tile archives designed for efficient map rendering at scale. For more information on PMTiles, see [PMTiles](about-tile-sets.md).

Vector data is rendered as interactive layers that support styling, labeling, filtering, and clustering.

### Raster data

A Cloud Optimized GeoTIFF (COG) is a standard GeoTIFF file (.tiff) designed for cloud hosting. Its internal structure allows efficient access by enabling clients to retrieve only the portions of the file they need, rather than downloading the entire file. For more information, see [cogeo.org](https://cogeo.org/).

> [!IMPORTANT]
> Fabric Maps currently supports Cloud Optimized GeoTIFF (COG) files that meet the following requirements:
>
> - **Projection:** Only files using the EPSG:3857 (Web Mercator) projection system are supported.
> - **Bands:** Supported formats include 3-band RGB (Red, Green, Blue) and 4-band RGBA (Red, Green, Blue, Alpha for transparency). Single-band and other multi-band configurations aren't supported.
>
> Ensure your imagery is correctly formatted before uploading. Files that don't meet these requirements won't render and can trigger an error message.

Raster data is rendered as imagery layers and can be combined with basemaps and vector layers to provide geographic context.

## Why use a lakehouse for map layers

Using a lakehouse as a data source for Fabric Maps provides several benefits:

- Centralized storage and governance in OneLake.
- No data duplication between analytics and visualization workloads.
- Compatibility with other Fabric engines such as Spark, Warehouse, and Power BI.
- Support for both vector and raster geospatial formats.

## Relationship to other data sources

Fabric Maps also supports other data sources, such as Eventhouses (KQL databases). Lakehouse‑based layers are file‑ or table‑backed, while Eventhouse‑based layers can be created from adding KQL data from Kusto tables, functions, and materialized views. For more information on layers created from KQL databases, see [Kusto integration in Fabric Maps](about-kusto-integration.md). Both can be combined in the same map to enrich spatial analysis.

## Next steps

> [!div class="nextstepaction"]
> [Create layers using Lakehouse data sources](about-external-sourced-imagery.md)
