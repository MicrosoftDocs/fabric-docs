---
title: Add an external feature service layer to a map
description: Learn how to add vector data from WFS, OGC API - Features, and Esri Feature Service endpoints to Fabric Maps.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 09/13/2026
ms.search.form: External feature service, WFS, OGC API - Features, Esri Feature Service, external vector layer
---

# Add an external feature service layer to a map

This article shows you how to connect Fabric Maps to an external feature service and render its vector data as a map layer. You can discover available feature layers or collections, configure a source query, select the fields to retrieve, and display the returned points, lines, or polygons without first copying the data into Fabric.

Fabric Maps supports the following external feature service protocols:

- Web Feature Service (WFS)
- OGC API - Features
- Esri Feature Service

For conceptual information and protocol-specific considerations, see [External feature services in Fabric Maps](about-external-feature-services.md).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

> [!NOTE]
> External feature service connections are read-only. Fabric Maps doesn't edit, ingest, or write features back to the remote service.

## Prerequisites

Before you begin, ensure you have:

- A Fabric workspace with a [Fabric-enabled capacity](../../enterprise/licenses.md).
- Permission to create or edit a map in the workspace.
- A reachable WFS, OGC API - Features, or Esri Feature Service endpoint.
- The endpoint URL and credentials required by the remote service.
- A service that publishes at least one supported point, line, or polygon layer or collection.
- A WFS or Esri Feature Service layer that supports GeoJSON output, if you use either protocol.

The endpoint must use HTTPS and be reachable through the public internet. Private endpoints, on-premises data gateways, virtual network data gateways, and other managed private network options aren't supported.

## Add an external feature service layer

To add an external feature service layer, create or reuse a connection, add it to the map as an external source, and configure the feature query.

### Step 1: Create an external feature service connection

Create a reusable connection from **Manage connections and gateways**.

Any Fabric user can create a cloud connection. You need permission to create or edit the map where you add the external source.

> [!TIP]
> Create one connection for each service endpoint and reuse it across maps. Reuse connections to keep endpoint and credential management consistent.

1. In the Fabric top bar, select **Settings** (gear icon). If **Settings** isn't visible, select **More options** (**...**), and then select **Settings**.

    :::image type="content" source="media/layers/external/user-settings.png" alt-text="A screenshot of the User settings menu in Microsoft Fabric Maps with Settings selected in the dropdown.":::

1. Select **Manage connections and gateways**.
1. Select **New**, and then choose **Cloud connection**.

    :::image type="content" source="media/layers/external/new-connection.png" alt-text="A screenshot of the Microsoft Fabric Maps interface showing the Manage Connections and Gateways page. The New button in the upper left is highlighted.":::

1. For **Connection type**, select **Geospatial Web Services**.

    :::image type="content" source="media/layers/external/fabric-maps-connection-type.png" alt-text="Screenshot of the New connection dialog in Microsoft Fabric Maps. The Cloud option is selected among connection types, and the Connection type dropdown is expanded, highlighting Geospatial Web Services as an option.":::

1. Enter the highest-level service endpoint URL. The URL must use HTTPS. Fabric Maps doesn't use query parameters included in the connection URL.
1. Select the service protocol:
   - **WFS**
   - **OGC API - Features**
   - **Esri Feature Service**
1. Select an authentication method and enter the required credentials.
1. Select the appropriate privacy level.
1. Select **Create**.

The connection becomes available in Fabric Maps and in **Manage connections and gateways**.

Supported authentication methods depend on the selected protocol:

| Authentication method | WFS | OGC API - Features | Esri Feature Service |
| --- | --- | --- | --- |
| Anonymous | Supported | Supported | Supported |
| Basic authentication | Supported | Supported | Not supported |
| API key | Supported | Supported | Supported |
| OAuth 2.0 / Microsoft Entra ID | Not supported | Not supported | Not supported |

For Esri Feature Service API-key authentication, enter `token` as the API-key parameter name.

### Step 2: Understand connection access

Fabric stores credentials in the cloud connection. Viewers don't need the connection shared with them separately to render the external data in a map.

If the credentials expire or Fabric Maps can't reach the service, the map displays an error indicating that the service couldn't be reached. Update the credentials in **Manage connections and gateways**, and then try again.

### Step 3: Add the connection to a map

1. Open an existing map or [create a map](create-map.md).
1. In the Explorer, select the **External sources** tab.
1. Select **Add sources**.

    :::image type="content" source="media/layers/external/add-source.png" lightbox="media/layers/external/add-source.png" alt-text="A screenshot of the Microsoft Fabric Maps interface showing the External sources tab selected in the Explorer panel. The Add source button is visible, allowing users to add a new external data source. The wider environment displays a map preview on the right and a navigation bar at the top with options for Home, New tileset, Tileset activity, and Map settings.":::

1. Select the external feature service connection from the **Connection** list.
1. Select **Add**.

    :::image type="content" source="media/layers/external/choose-data-source.png" lightbox="media/layers/external/choose-data-source.png" alt-text="A screenshot of the Dialog box titled Choose data source, centered on the Microsoft Fabric Maps interface. The dialog prompts the user to select a connection from a dropdown, and provides Add and Cancel buttons, with Add highlighted. Above the dialog, a message states you can create up to 100 connections and advises managing or deleting unused ones.":::

The connection appears under **External sources**. Expand it to discover the feature layers or collections published by the service.

The displayed hierarchy varies by protocol:

- WFS connections list eligible feature types from the service capabilities.
- OGC API - Features connections list eligible collections.
- Esri Feature Service connections list eligible feature layers.

> [!NOTE]
> Fabric Maps lists only the layers or collections that the service publishes with supported geometry, fields, query capabilities, and response formats. If an expected item doesn't appear, confirm with the service owner that the item is queryable and available in a supported format, and then refresh the connection. For more information, see [Verify service metadata](#verify-service-metadata).

### Step 4: Select a feature layer or collection

1. Expand the external feature service connection.
1. Locate the feature layer or collection to add.
1. Open its context menu, and then select **Show on map**.

    :::image type="content" source="media/layers/external/show-on-map.png" lightbox="media/layers/external/show-on-map.png" alt-text="A screenshot showing the Explorer panel in Microsoft Fabric Maps with the External sources tab selected. A list of layers is shown with the More options menu displaying the option Show on map highlighted..":::

1. In the **Preview data** screen, select **Pull all data** if you want all columns and rows from the data source.

    :::image type="content" source="media/layers/external/preview-pull-all-data.png" lightbox="media/layers/external/preview-pull-all-data.png" alt-text="A screenshot of the Dialog box titled preview data, centered on the Microsoft Fabric Maps interface. The dialog prompts the user to select either pull all data for filter data, with pull all data selected.":::

   Or select **Filter data** if you want to determine which columns and rows appear from the data source. For more information, see [Filtering data](#filtering-data).

    :::image type="content" source="media/layers/external/preview-filter-data.png" lightbox="media/layers/external/preview-filter-data.png" alt-text="A screenshot of the Dialog box titled preview data, centered on the Microsoft Fabric Maps interface. The dialog prompts the user to select either pull all data for filter data, with filter data selected.":::

1. For a point-only layer, select **Enable clustering** if desired, and then select **Add**.

    :::image type="content" source="media/layers/external/external-feature-service-map-layer.png" lightbox="media/layers/external/external-feature-service-map-layer.png" alt-text="Screenshot of a Service Requests point layer from an external feature service displayed in Fabric Maps.":::

> [!NOTE]
> The screenshots use an Esri Feature Service connection as an example. Fabric Maps also supports WFS and OGC API - Features connections through the same general workflow.

#### Filtering data

Use the source query to limit the features retrieved from the remote service. The available fields and conditions depend on the selected protocol and the capabilities advertised by the endpoint.

1. Review the selected service, feature layer or collection, geometry type, and available fields.
1. Add one or more query conditions.
1. Select a field, operator, and value for each condition.
1. Combine conditions by using the options available for the selected service.
1. Configure a time range or temporal condition when advertised by the service. Fabric Maps interprets date/time values as UTC in RFC 3339 format.
1. Select the output fields to retrieve.
1. Review the query, and then select **Add**.

Fabric Maps requests the matching features from the remote service. If the query contains an unsupported operator, invalid value, or incompatible field, revise it based on the message shown in the configuration experience.

Fabric Maps automatically derives a bounding box from the current map viewport when it requests features. The bounding box isn't visible or configurable in the query UI. You can't enter coordinates or select an area as a spatial query condition.

> [!NOTE]
> Bounding boxes that cross the antimeridian aren't supported.

If the service can't return features in EPSG:4326, Fabric Maps displays an error after you select **Add**.

<!-- Add the exact unsupported-coordinate-reference-system error text when available. -->

> [!IMPORTANT]
> When using a filter, a source query runs on the remote service and controls which records and fields Fabric Maps retrieves. You can't edit a layer's source query after you add the layer. To use different source-query conditions, add the source layer again and configure a new filter.
>
> A [map-layer filter](filter-data.md) controls which retrieved features are displayed. The operators available in source queries and map-layer filters can differ.

### Step 6: Review the layer

After the query finishes, Fabric Maps adds a vector data layer and selects a default visualization based on the geometry.

| Geometry | Default visualization |
| -------- | --------------------- |
| Point    | Bubble layer          |
| Line     | Line layer            |
| Polygon  | Polygon layer         |

Confirm that:

- The map shows the expected feature locations and shapes.
- Layer attributes match the remote service response.
- The number of features matches the source query and service limits.
- Tooltips and fields include only the selected output fields.

Fabric Maps automatically retrieves more result pages based on the remote service's paging configuration. Paging is transparent, and builders can't configure page size, result count, or paging behavior.

A layer can render up to 100,000 features. If the query returns more features, Fabric Maps renders the first 100,000 and displays a warning in the **Layer settings** pane. Refine the source query to reduce the result set.

If a page request fails, Fabric retries it up to three times. If the request still fails, Fabric Maps displays **A request failed; some features are missing. Refresh to retry.**

## Configure the layer

After adding the layer, use the standard vector-layer experiences to:

- Rename, duplicate, reorder, hide, or delete the layer.
- Change the visualization supported by its geometry.
- Configure colors, opacity, size, stroke, labels, and tooltips.
- Apply data-driven styling and display a legend.
- Add map-layer filters to interactively refine the retrieved features.
- Use **Zoom to fit** to focus the map on the layer extent.

For more information, see:

- [Manage data layers in Fabric Maps](data-layer-management.md)
- [Customize a map](customize-map.md)
- [Filter data in a map layer](filter-data.md)

External feature service layers support category and value-range styling. They also support categorical, numeric range, Boolean, and date/time filters. The standard layer actions and map-layer filter behavior are the same for WFS, OGC API - Features, and Esri Feature Service.

## Duplicate an external feature service layer

When you duplicate an external feature service layer, both layers reference the same data source, connection, source query, and output fields. Map-layer filters and visual settings are independent, so you can filter and style each layer differently. You can't edit the source query or output fields after you add the layer in this release.

## Refresh external feature services

Editors can refresh an individual connection or the entire map:

- In **External sources**, open the connection context menu and select **Refresh** to retrieve the latest service metadata, including newly added fields, layers, or collections. To use a newly added field, add the source layer again and select the field.
- Select **Refresh** for the map item to query the saved layers for current data. This action doesn't change the saved source query.

Saved output fields, styling, legends, visibility, and layer order persist after either refresh action. Changes to the map configuration persist only after you save the map. Viewers can't refresh external feature service data in this release.

## Save and verify the map

1. Save the map.
1. Close and reopen it.
1. Verify that the following settings persist:
   - Connection and selected feature layer or collection
   - Source query and output fields
   - Styling and legend
   - Layer visibility and order
1. Open the map in view mode.
1. Confirm that the layer and legend render without edit-only controls. Viewers can modify unlocked map-layer filters temporarily; locked filters can't be removed.

## Protocol-specific query behavior

### WFS

Fabric Maps supports WFS versions 1.0.0, 1.1.0, and 2.0.0. When the service advertises multiple supported versions, Fabric Maps uses the latest version. It discovers feature types from the WFS capabilities and retrieves GeoJSON responses.

WFS supports mixed-geometry responses in one layer. The layer's reported geometry type is **Unknown**, and clustering isn't available.

<!-- Confirm whether OGC API - Features accepts formats other than GeoJSON. -->

### OGC API - Features

Fabric Maps discovers collections and reads the endpoint's conformance metadata. Attribute, spatial, and temporal query options appear only when the service advertises the corresponding capability. OGC API - Features can return mixed geometries in one layer.

### Esri Feature Service

Fabric Maps reads the service and layer metadata and retrieves GeoJSON output. Depending on layer capabilities, queries can use field conditions, selected output fields, and time parameters. Mixed-geometry responses aren't supported.

Fabric Maps accepts Esri Feature Service geometry with M or Z coordinate values and ignores the extra dimensions.

## Troubleshooting

| Issue | Suggested action |
| ----- | ---------------- |
| The connection can't be created | Verify that the endpoint uses HTTPS, is reachable through the public internet, and uses the selected protocol. Fabric Maps doesn't use query parameters included in the connection URL. Confirm that the authentication method and credentials are valid. For an HTTP URL, Fabric Maps displays **Connection adding failed** and **The provided URL format is invalid. Verify that the URL is a valid HTTPS address and try again.** |
| The endpoint isn't recognized as the selected protocol | Enter the highest-level service endpoint instead of a layer-level URL. Fabric Maps displays **Connection adding failed** and **The connection did not respond as a valid expected protocol provider** when the endpoint doesn't provide the expected protocol metadata. |
| The connection opens, but no layers or collections appear | Confirm that the endpoint publishes a supported, queryable feature layer or collection. Refresh the connection to retrieve updated service metadata. |
| An expected query option isn't available | Fabric Maps displays only fields, operators, and values advertised as queryable in the service metadata. Confirm with the service owner that the expected option is published and supported. |
| The query returns no features | Remove the query conditions one at a time to identify the condition that excludes the features. After each change, refresh the preview. |
| Some features aren't displayed and the layer shows a result-limit badge | Fabric Maps renders up to 100,000 features per layer. Refreshing doesn't retrieve features beyond this limit. Add the source layer again with a more restrictive query. |
| **A request failed; some features are missing. Refresh to retry.** appears | One or more requests failed, and Fabric Maps skipped part of the result. This issue is usually temporary. Refresh the map. If the issue continues, remove and re-add the layer. |
| Some features are missing, but no request-failure notification or result-limit badge appears | Check whether the source contains geometry collections. Fabric Maps doesn't render geometry collections, but other supported features in the layer render normally. |
| Features appear in an unexpected location or the layer fails to load | Verify that the service can return features in EPSG:4326 and that the layer's coordinate system includes a valid EPSG authority code. |
| A saved layer doesn't render for another user | Verify that the remote service is reachable and that the cloud connection contains valid credentials. Viewers don't need separate access to the connection. |
| The service can't be reached | Verify that the public endpoint is available. If the credentials expired, update them in **Manage connections and gateways**, and then try again. |

### Verify service metadata

If an expected layer or collection doesn't appear under the connection, ask the service owner to verify the service metadata. You can inspect public metadata in a browser or API client. For an authenticated service, use a client that can send the required credentials.

The metadata checks depend on the protocol:

- **WFS**: Request the `GetCapabilities` document and confirm that it lists the feature type. Use `DescribeFeatureType` to verify its geometry and fields. Check the advertised output formats or run a small `GetFeature` request that returns GeoJSON.
- **OGC API - Features**: Open the service landing page and `/collections`, and confirm that the collection is listed and includes an items link. Check `/conformance`, and request a small GeoJSON response from `/collections/{collection-id}/items`.
- **Esri Feature Service**: Open the `FeatureServer` endpoint with `?f=pjson` and confirm that it lists the layer. Open `FeatureServer/{layer-id}?f=pjson`, and verify that the layer has supported geometry and fields, includes `Query` in its capabilities, and lists GeoJSON in `supportedQueryFormats`.

> [!NOTE]
> Use these metadata requests only to troubleshoot the service. In the Fabric connection form, enter the highest-level service endpoint. Fabric Maps doesn't use query parameters included in the connection URL.

## Limitations and considerations

- External feature services are read-only. They don't support feature editing, ingestion, or writeback.
- Query options depend on the capabilities that the remote service advertises.
- Fabric Maps requests features in EPSG:4326, with coordinates in longitude, latitude order. Services that publish data in another coordinate reference system are supported if the service can reproject the data to EPSG:4326. If the service can't reproject the data, such as when the layer's coordinate system is missing an EPSG authority code, the layer fails to load.
- Bounding boxes that cross the antimeridian aren't supported.
- Features whose geometry is a geometry collection aren't rendered. Other supported features in the same layer render normally.
- Clustering isn't available for mixed-geometry layers.
- WFS and Esri Feature Service layers must support GeoJSON output.
- GML response formats aren't supported in this release.
- Fabric Maps ignores M and Z dimensions in Esri Feature Service geometry.
- A layer can render up to 100,000 features.
- A map item can reference up to 100 external connections across WMS, WMTS, WFS, OGC API - Features, and Esri Feature Service.
- Only services reachable through the public internet are supported. Private endpoints and gateways aren't supported.
- Remote service processing, availability, and network latency can affect query and rendering times.

## Next steps

> [!div class="nextstepaction"]
> [External feature services in Fabric Maps](about-external-feature-services.md)

For styling and filtering, see [Customize a map](customize-map.md) and [Filter data in a map layer](filter-data.md).
