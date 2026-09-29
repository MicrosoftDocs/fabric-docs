---
title: External feature services in Fabric Maps
description: Learn how to use WFS, OGC API - Features, and Esri Feature Service data in Fabric Maps.
ms.reviewer: smunk, sipa
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.date: 09/13/2026
ms.search.form: External feature services, WFS, OGC API - Features, Esri Feature Service, external vector data
---

# External feature services in Fabric Maps

Fabric Maps can connect to external feature services and render their vector data as map layers. An external feature service provides geographic features, such as points, lines, and polygons, together with attributes that describe those features.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

By connecting to an external feature service, you can visualize remotely hosted spatial data without first copying it into a lakehouse or eventhouse. Fabric Maps queries the service, retrieves the selected features and attributes, and renders the results as a vector data layer.

Fabric Maps supports the following external feature service protocols:

- **Web Feature Service (WFS)**
- **OGC API - Features**
- **Esri Feature Service**

You access these protocols through the **Geospatial Web Services** connection type, together with WMS and WMTS. Create the cloud connection in **Manage connections and gateways**, and then add the connection to a map from the **External sources** tab in the map's Explorer.

> [!NOTE]
> External feature service integration is read-only. Fabric Maps doesn't edit, ingest, or write data back to the remote service.

## What is an external feature service?

An external feature service is a web-based geospatial API that publishes individual geographic features. Each feature contains:

- **Geometry**, which defines the feature's location and shape as a point, line, or polygon.
- **Attributes**, which provide information about the feature, such as a name, category, status, measurement, or date.

For example, a feature service might publish vehicle locations as points, roads as lines, or administrative boundaries as polygons. Fabric Maps uses the geometry to draw each feature and makes selected attributes available for styling, filtering, labels, legends, and tooltips.

The service and its data remain outside the map item. The map stores a reference to the connection and the configuration needed to retrieve and display the data.

## Supported feature service protocols

The following table summarizes how Fabric Maps works with each supported protocol.

| Protocol | Description | Service behavior used by Fabric Maps |
| --- | --- | --- |
| **WFS** | An Open Geospatial Consortium (OGC) standard for retrieving geographic features. Fabric Maps supports WFS versions 1.0.0, 1.1.0, and 2.0.0. | Fabric Maps reads the service capabilities, uses the latest supported version advertised by the service, discovers available feature types, and retrieves GeoJSON responses. |
| **OGC API - Features** | A REST-oriented OGC standard for accessing geographic features organized into collections. | Fabric Maps discovers collections and uses the service's conformance information to determine available query capabilities. |
| **Esri Feature Service** | An ArcGIS REST service that publishes queryable feature layers. | Fabric Maps reads service and layer metadata and retrieves layers that support GeoJSON output. |

<!-- Confirm whether OGC API - Features supports response formats other than GeoJSON. -->

## How external feature services work in Fabric Maps

When you add an external feature service to a map, Fabric Maps:

1. Uses an existing connection or creates a connection to the remote endpoint.
1. Discovers the feature layers or collections published by the service.
1. Reads available metadata, including geometry types, fields, record limits, and supported query capabilities.
1. Lets you configure a server-side query and select the fields to retrieve.
1. Requests the matching features, including additional result pages when supported and required.
1. Renders the returned features as a vector data layer.

The default visualization is based on the geometry returned by the service:

| Geometry | Default visualization |
| --- | --- |
| Point | Bubble layer |
| Line | Line layer |
| Polygon | Polygon layer |

After the layer is added, you can configure supported vector-layer options such as styling, labels, legends, tooltips, visibility, and map-layer filters. For more information, see [Customize a map](customize-map.md) and [Data filtering in Fabric Maps](about-data-filtering.md).

For a WFS or OGC API - Features mixed-geometry response, Fabric Maps creates one data layer. The layer's reported geometry type is **Unknown** because no single type describes it. Point features use a Bubble layer, line features use a Line layer, and polygon features use a Polygon layer without extrusion. If you enable data-driven styling, Fabric Maps displays the legends for the geometry types in the data layer pane. Clustering isn't available for mixed-geometry layers.

External feature service layers support category and value-range data-driven styling.

## Layer and collection discovery

Fabric Maps lists eligible feature layers or collections under the connection in the **External sources** section of the Explorer. The available hierarchy depends on the protocol and metadata exposed by the service.

Refreshing the connection retrieves the latest service metadata, including newly added fields, layers, or collections. These changes might not appear automatically. To use a newly added field, refresh the connection, and then add the source layer again and select the field.

The metadata returned by the service can include:

- Display names and identifiers
- Geometry types
- Attribute fields and data types
- Spatial extents
- Maximum record counts
- Supported filtering, sorting, paging, and temporal capabilities

The available configuration options can vary between services because Fabric Maps uses the capabilities advertised by each endpoint.

## Source queries

Before adding a feature layer to a map, you can configure a source query that limits the records and fields retrieved from the remote service. Processing a query on the server can reduce the amount of data transferred to Fabric Maps and focus the layer on the features relevant to your scenario.

The fields and operators available in a source query depend on the selected protocol and the capabilities advertised by the service. Source queries support output-field selection and can support temporal filtering. Fabric Maps interprets date/time values as UTC in RFC 3339 format.

Fabric Maps validates the query against the selected service. If a field, value, or operator isn't supported, the configuration experience displays an error that you can use to revise the query.

You can't return to the source-query UI to edit the query after adding the layer. To use different source-query conditions, add the source layer again and configure a new query.

<!-- Confirm the exact source-query operators and data types supported for each protocol. -->

Fabric Maps automatically derives a bounding box from the map viewport when it requests features. The bounding box isn't visible or configurable in the source-query UI. Users can't enter coordinates or select an area as a spatial query condition.

### Source queries and map-layer filters

Source queries and map-layer filters limit data at different stages:

| Behavior | Source query | Map-layer filter |
| --- | --- | --- |
| Where it's evaluated | By the remote feature service | By the Fabric Maps layer experience |
| What it controls | The records and fields retrieved from the service | Which retrieved features are displayed on the map |
| Available conditions | Depends on the protocol and service capabilities | Depends on the field type and Fabric Maps filtering support |
| How changes are applied | Configure the query when adding the feature layer | Apply the filter from the layer filtering experience |

Use a source query to reduce the data requested from the remote service. Use a map-layer filter when map builders or viewers need to interactively refine the returned data. For more information about map-layer filters, see [Data filtering in Fabric Maps](about-data-filtering.md).

External feature service layers support categorical, numeric range, Boolean, and date/time map-layer filters. Multiple filters use `AND` logic. Locked filters, edit- and view-mode behavior, and filter persistence work the same across WFS, OGC API - Features, and Esri Feature Service layers.

## Pagination and result limits

Feature services can limit how many records they return in a single response. Fabric Maps automatically uses the paging configuration advertised by the service to retrieve subsequent results. Paging is transparent, and builders can't configure page size or paging behavior.

Fabric Maps renders up to 100,000 features per layer. If a source query returns more features, Fabric Maps renders the first 100,000 and displays a warning in the **Layer settings** pane. Refine the source query to reduce the result set.

If a page request fails, Fabric retries it up to three times. If the request still fails, Fabric Maps displays the message **A request failed; some features are missing. Refresh to retry.**

## Saved configuration

When you save a map, Fabric Maps preserves the external layer configuration, including:

- Connection reference
- Selected feature layer or collection
- Source query
- Selected output fields
- Layer styling and legend
- Visibility
- Layer order

When you reopen the map, Fabric Maps uses the saved configuration to retrieve and render the layer.

Duplicated layers reference the same data source, connection, source query, and selected output fields. Map-layer filters and visual settings are independent for each duplicate. You can't edit the source query or output fields after you add the layer in this release.

## Refresh external feature services

Fabric Maps provides two refresh actions in edit mode:

- Refresh a connection in **External sources** to retrieve the latest service metadata, including newly added fields, layers, or collections. To use a newly added field, add the source layer again and select the field.
- Refresh the map item to query the saved layers for current data. This action doesn't change the saved source query.

Viewers can't refresh external feature service data in this release. Saved output fields, styling, legends, visibility, and layer order persist after a refresh.

## Authentication and access

External feature services can require credentials in addition to the permissions needed to open or edit a Fabric map.

| Authentication method | WFS | OGC API - Features | Esri Feature Service |
| --- | --- | --- | --- |
| Anonymous | Supported | Supported | Supported |
| Basic authentication | Supported | Supported | Not supported |
| API key | Supported | Supported | Supported |
| OAuth 2.0 / Microsoft Entra ID | Not supported | Not supported | Not supported |

For Esri Feature Service API key authentication, use `token` as the API key parameter name.

Fabric stores credentials in the cloud connection. Viewers don't need the connection shared with them separately to render the external data. If Fabric Maps can't retrieve valid connection credentials or reach the service, it displays an error indicating that the service couldn't be reached.

## External feature services and imagery services

External feature services return vector geometries and attributes. WMS and WMTS services return rendered raster images or tiles. Choose the source type that matches the data and interactions your map requires.

| External feature services | WMS and WMTS imagery services |
| --- | --- |
| Return individual vector features and attributes | Return rendered images or image tiles |
| Support feature and attribute queries | Render imagery for a requested area |
| Support vector styling, labels, tooltips, and data-driven interactions | Support imagery visibility, order, and opacity |
| Represent points, lines, and polygons | Represent raster imagery |

For information about external imagery, see [Create layers using WMS and WMTS imagery sources in Fabric Maps](about-external-sourced-imagery.md).

## Protocol-specific considerations

### WFS

- Discover available layers from the service capabilities.
- Use WFS version 1.0.0, 1.1.0, or 2.0.0.
- When the service advertises multiple supported versions, Fabric Maps uses the latest version.
- The WFS service must support GeoJSON responses.
- Support mixed-geometry responses in one layer.

### OGC API - Features

- Organize available data into collections.
- Advanced attribute and temporal operations depend on the conformance classes advertised by the service.
- Support mixed-geometry responses in one layer.
- Fabric Maps uses only capabilities supported by the selected endpoint.

### Esri Feature Service

- The selected layer must support GeoJSON output.
- Don't support mixed-geometry responses.
- Fabric Maps accepts geometry with M or Z coordinate values and ignores the extra dimensions.

## Limitations and considerations

- External feature service integration is read-only. Ingestion, feature editing, and writeback aren't supported.
- Query features depend on the capabilities advertised by the remote service.
- Fabric Maps requests features in EPSG:4326, with coordinates in longitude, latitude order. Services that publish data in another coordinate reference system are supported if the service can reproject the data to EPSG:4326. If the service can't reproject the data, such as when the layer's coordinate system is missing an EPSG authority code, the layer fails to load.
- Bounding boxes that cross the antimeridian aren't supported.
- Features whose geometry is a geometry collection aren't rendered. Other supported features in the same layer render normally.
- Clustering isn't available for mixed-geometry layers.
- WFS and Esri Feature Service layers must support GeoJSON output.
- GML response formats aren't supported in this release.
- Fabric Maps ignores M and Z dimensions in Esri Feature Service geometry.
- A layer can render up to 100,000 features.
- A map item can reference up to 100 external connections across WMS, WMTS, WFS, OGC API - Features, and Esri Feature Service.
- Only services reachable through the public internet are supported. Private endpoints, on-premises data gateways, virtual network data gateways, and other managed private network options aren't supported.
- Availability and query response time depend on the remote service and network connection.

## Next steps

> [!div class="nextstepaction"]
> [Add an external feature service layer to a map](add-external-feature-service-layer.md)

For styling options, see [Customize a map](customize-map.md).
