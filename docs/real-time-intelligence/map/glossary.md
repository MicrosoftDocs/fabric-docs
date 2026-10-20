---
title: Fabric Maps glossary
description: A glossary of terms associated with Fabric Maps, spatial data, map layers, and related Microsoft Fabric integrations.
ms.reviewer: smunk
author: sipa
ms.author: sipa
ms.topic: glossary
ms.service: fabric
ms.subservice: rti-core
ms.date: 10/05/2026
ms.search.form: Fabric Maps glossary
ai-usage: ai-assisted
---

# Fabric Maps glossary

The following list describes common terms used with Fabric Maps, spatial data, map layers, and related Microsoft Fabric integrations.

## 0-9

<a name="3d-extrusion"></a> **3D extrusion**: A visualization that extends polygons vertically to represent height, volume, or another value. For more information, see [Enable extrusion].

## A

<a name="access-token"></a> **Access token**: A short-lived credential presented to a Fabric REST API to authorize a request on behalf of a user, service principal, or managed identity. For more information, see [Access tokens].

<a name="application-lifecycle-management-alm"></a> **Application lifecycle management (ALM)**: The practices used to manage Fabric Maps items across development stages, including source control, deployment, versioning, and environment-specific configuration. For more information, see [What the Fabric Maps REST API enables].

<a name="azure-data-explorer"></a> **Azure Data Explorer**: An Azure analytics service based on Kusto that can provide queryable spatial data to Real-Time Intelligence and related map workflows. For more information, see [Kusto integration in Fabric Maps].

<a name="azure-maps"></a> **Azure Maps**: A Microsoft Azure geospatial platform that provides basemaps and REST services used with Fabric Maps for capabilities such as routing. For more information, see [What is Azure Maps?].

## B

<a name="basemap"></a> **Basemap**: The underlying geographic background that provides context for map layers. For more information, see [Map style settings]. See also [Basemap style] and [Map style].

<a name="basemap-control"></a> **Basemap control**: An on-map control that you can use to switch or interact with the geographic background. The map author enables the control. For more information, see [Map controls].

<a name="basemap-style"></a> **Basemap style**: The visual design of the map background, such as road, satellite, hybrid, grayscale, night, or blank. For more information, see [Map style settings].

<a name="boolean-filter"></a> **Boolean filter**: A map-layer filter that includes records based on a true or false property value. For more information, see [Supported filter types].

<a name="bounding-box"></a> **Bounding box**: A rectangular set of coordinates that defines a geographic extent. For more information, see [Bounding box in the Azure Maps glossary].

<a name="bubble-layer"></a> **Bubble layer**: A point layer that displays locations as configurable circles. For more information, see [Bubble layer settings].

## C

<a name="categorical-filter"></a> **Categorical filter**: A map-layer filter that includes records whose property matches one or more selected discrete values. For more information, see [Supported filter types].

<a name="cloud-optimized-geotiff-cog"></a> **Cloud Optimized GeoTIFF (COG)**: A GeoTIFF organized so applications can efficiently retrieve selected portions of raster imagery from cloud storage. For more information, see [Add a Cloud Optimized GeoTIFF].

<a name="clustering"></a> **Clustering**: Grouping nearby point features at lower zoom levels to reduce visual clutter. For more information, see [Point settings].

<a name="color-palette"></a> **Color palette**: A predefined or customized set of colors used to style map features or represent data categories and value ranges. For more information, see [Data-driven styling for map layers].

<a name="coordinate"></a> **Coordinate**: A numeric value or ordered pair that identifies a location in a coordinate reference system, commonly longitude and latitude. For more information, see [Initial map view].

<a name="coordinate-reference-system-crs"></a> **Coordinate reference system (CRS)**: A defined coordinate framework used to locate spatial data on Earth, including its projection and datum. For more information, see [Coordinate reference system in the Azure Maps glossary].

<a name="custom-marker"></a> **Custom marker**: A point marker that uses a user-selected image from a lakehouse instead of a built-in marker icon. For more information, see [Custom markers].

<a name="custom-raster-imagery"></a> **Custom raster imagery**: Raster imagery supplied from a lakehouse COG file or an external WMS or WMTS service rather than a built-in basemap. For more information, see [Raster data in lakehouses] and [External imagery sources].

## D

<a name="data-binding"></a> **Data binding**: The mapping between ontology entity properties and the spatial fields used to locate and visualize entity instances in an ontology layer. For more information, see [Ontology binds spatial data to business concepts].

<a name="data-connection-rule"></a> **Data connection rule**: A workspace outbound access protection policy that allows Fabric items to use specified cloud or gateway connections to approved destinations. For more information, see [Data connection rules for Fabric Maps].

<a name="data-driven-styling"></a> **Data-driven styling**: Assigning visual properties such as color or size based on feature property values. For more information, see [Data-driven styling for map layers].

<a name="data-filtering"></a> **Data filtering**: Restricting which records a layer renders without changing the underlying source data. For more information, see [How data filtering works].

<a name="data-label"></a> **Data label**: Text displayed on a feature using one or more of its property values. For more information, see [Data label settings].

<a name="data-layer"></a> **Data layer**: A map layer that visualizes vector or raster data from a configured source and can be ordered, styled, filtered, shown, or hidden independently. For more information, see [What is a layer?]. See also [Layer] and [Data source].

<a name="data-source"></a> **Data source**: A map-definition object identifying where spatial data originates. For more information, see [Data sources used by maps].

<a name="data-source-permission"></a> **Data source permission**: Permission to read or query an underlying source used by a map, such as a lakehouse, KQL database, or eventhouse. For more information, see [Data permissions and map visibility]. See also [Underlying data source] and [Map item permission].

<a name="date-time-filter"></a> **Date/time filter**: A map-layer filter that includes records whose date or time property falls within a selected range. For more information, see [Supported filter types].

<a name="direct-access"></a> **Direct access**: Item-level access granted explicitly to selected users or groups rather than through a share link or workspace role. For more information, see [Use direct access]. See also [Share link] and [Map item permission].

## E

<a name="edit-mode"></a> **Edit mode**: The Fabric Maps mode in which an authorized map builder can add, remove, configure, filter, and style map layers and save changes. For more information, see [What is a map in Fabric Maps?].

<a name="entity-instance"></a> **Entity instance**: A specific occurrence of an ontology entity type, such as one vehicle, facility, route, or customer. For more information, see [Ontology binds spatial data to business concepts].

<a name="entity-property"></a> **Entity property**: A named value defined for an ontology entity type and populated on its entity instances. For more information, see [Ontology binds spatial data to business concepts].

<a name="entity-relationship"></a> **Entity relationship**: A defined semantic association between ontology entity types or their instances. For more information, see [Ontology supports cross-domain reasoning on maps].

<a name="entity-type"></a> **Entity type**: A governed business concept, including its properties and relationships, represented by an ontology layer. For more information, see [Ontology defines what a map layer represents]. See also [Entity instance] and [Entity property].

<a name="esri-feature-service"></a> **Esri Feature Service**: An ArcGIS REST service that publishes queryable vector feature layers and can return GeoJSON for Fabric Maps. For more information, see [Supported feature service protocols].

<a name="eventhouse"></a> **Eventhouse**: A Microsoft Fabric item that stores and serves real-time and historical event data through one or more KQL databases. For more information, see [Kusto integration in Fabric Maps].

<a name="extent"></a> **Extent**: The geographic area covered by a dataset, layer, imagery source, or current map view. For more information, see [Initial map view].

<a name="external-imagery-layer"></a> **External imagery layer**: An imagery layer rendered from a WMS or WMTS service hosted outside Microsoft Fabric. For more information, see [How WMS and WMTS imagery works].

<a name="external-imagery-source"></a> **External imagery source**: The WMS or WMTS endpoint and connection configuration from which an external imagery layer retrieves raster content. For more information, see [How WMS and WMTS imagery works].

## F

<a name="fabric-item-definition"></a> **Fabric item definition**: The serializable content and metadata that define a Fabric item for REST API, Git, or deployment operations. For more information, see [Fabric Maps item model].

<a name="fabric-maps"></a> **Fabric Maps**: A Microsoft Fabric capability for visualizing and analyzing static and real-time spatial data. For more information, see [What is Fabric Maps?]. See also [Map item] and [Layer].

<a name="fabric-maps-rest-api"></a> **Fabric Maps REST API**: The Microsoft Fabric REST API surface used to create, read, update, and manage Fabric map items and their definitions. For more information, see [What the Fabric Maps REST API enables]. See also [Map item definition] and [Access token].

<a name="fabric-maps-tile"></a> **Fabric Maps tile**: A Real-Time Dashboard tile that references a Fabric map item and renders its saved data sources, queries, layers, filters, and styling. For more information, see [Work with the Fabric Maps visual]. See also [Real-Time Dashboard] and [Map item].

<a name="feature"></a> **Feature**: A geographic object consisting of geometry and associated properties. For more information, see [Vector data layers]. See also [Geometry] and [Property].

<a name="fill-color"></a> **Fill color**: The color applied to the interior of a polygon, bubble, or supported marker feature. For more information, see [Geometry type settings].

<a name="fill-opacity"></a> **Fill opacity**: The transparency of a feature's fill, from fully transparent to fully opaque. For more information, see [Polygon settings].

<a name="filter"></a> **Filter**: A condition that limits which retrieved records are displayed in a map layer without changing the underlying source data. For more information, see [Data filtering in Fabric Maps]. See also [Data filtering] and [Filter type].

<a name="filter-persistence"></a> **Filter persistence**: The rules determining whether filter changes are saved with a map or remain temporary. For more information, see [Understand filter persistence].

<a name="filter-type"></a> **Filter type**: The kind of comparison a map-layer filter applies, such as categorical, numeric range, Boolean, or date/time. For more information, see [Supported filter types].

## G

<a name="geographic-information-system-gis"></a> **Geographic information system (GIS)**: A system for creating, managing, analyzing, and visualizing data associated with locations and shapes on Earth. For more information, see [GIS in the Azure Maps glossary].

<a name="geojson"></a> **GeoJSON**: An open format for representing geographic features and their properties in JSON. For more information, see [Add a GeoJSON file]. See also [GeoJSON Feature] and [GeoJSON FeatureCollection].

<a name="geojson-feature"></a> **GeoJSON Feature**: A GeoJSON object that combines one geometry with optional properties and an identifier. For more information, see [Feature in the Azure Maps glossary].

<a name="geojson-featurecollection"></a> **GeoJSON FeatureCollection**: A GeoJSON object that contains an array of GeoJSON Feature objects. For more information, see [Feature collection in the Azure Maps glossary].

<a name="geometry"></a> **Geometry**: The spatial representation of a feature, such as a point, line, or polygon. For more information, see [Vector data layers]. See also [Geometry type] and [Feature].

<a name="geometry-type"></a> **Geometry type**: Point, line, polygon, and multigeometry representations used to display spatial objects. For more information, see [Vector data layers].

<a name="geometrycollection"></a> **GeometryCollection**: A GeoJSON geometry object that contains a collection of geometry objects, which can have different geometry types. For more information, see [GeometryCollection in the Azure Maps glossary].

<a name="geospatial-web-services-connection"></a> **Geospatial Web Services connection**: A reusable Fabric connection containing the endpoint and authentication configuration for an external imagery service. For more information, see [Create a Geospatial Web Services connection]. See also [Web Map Service (WMS)] and [Web Map Tile Service (WMTS)].

## H

<a name="heatmap"></a> **Heatmap**: A visualization that represents the density or intensity of point data using color. For more information, see [Heatmap layer settings]. See also [Point layer] and [Clustering].

<a name="historical-data"></a> **Historical data**: Stored observations or spatial records representing past conditions or events, often used as reference or trend context. For more information, see [Working with real-time and historical spatial data].

<a name="hybrid-map-style"></a> **Hybrid map style**: A basemap style that combines satellite imagery with roads, borders, and place labels. For more information, see [Map style settings].

## I

<a name="icon-source"></a> **Icon source**: A map-definition object referencing custom symbols used by marker layers. For more information, see [The map definition].

<a name="imagery-layer"></a> **Imagery layer**: A raster layer that provides satellite, elevation, weather, or other image-based geographic context. For more information, see [Imagery layers]. See also [Raster imagery] and [External imagery layer].

<a name="item-id"></a> **Item ID**: The unique identifier Fabric assigns to an item; a Fabric Maps tile uses the source map item ID to maintain its reference. For more information, see [Fabric Maps item model].

## K

<a name="kql-database"></a> **KQL database**: A database in an eventhouse that stores data queried by using Kusto Query Language and can supply data to Fabric Maps layers. For more information, see [Supported Kusto entities].

<a name="kql-function"></a> **KQL function**: A reusable KQL expression; Fabric Maps can use a stored tabular function as the query source for a Kusto-backed layer. For more information, see [Supported Kusto entities].

<a name="kql-table"></a> **KQL table**: A named tabular data structure in a KQL database that can provide query results for a Fabric Maps layer. For more information, see [Supported Kusto entities].

<a name="kusto"></a> **Kusto**: The query and analytics technology underlying Azure Data Explorer, eventhouses, and KQL databases. For more information, see [Kusto integration in Fabric Maps].

<a name="kusto-backed-layer"></a> **Kusto-backed layer**: A vector layer created from a KQL table, stored function, or materialized view. For more information, see [How Kusto data becomes a map layer]. See also [KQL database] and [KQL function].

<a name="kusto-query-language-kql"></a> **Kusto Query Language (KQL)**: A read-only query language used to explore and transform data in Kusto-based services and to define results for Kusto-backed map layers. For more information, see [Kusto Query Language overview].

## L

<a name="lakehouse"></a> **Lakehouse**: A Microsoft Fabric item that combines data-lake storage and analytics capabilities and can store GeoJSON, PMTiles, COG, and related map assets. For more information, see [How lakehouse data is used in maps].

<a name="lakehouse-layer"></a> **Lakehouse layer**: A Fabric Maps layer whose vector or raster content is read from files stored in a lakehouse. For more information, see [How lakehouse data is used in maps].

<a name="latitude"></a> **Latitude**: The angular distance north or south of the equator, expressed in degrees from -90 to 90. For more information, see [Initial map view].

<a name="latitude-column"></a> **Latitude column**: The data column selected to provide latitude values for point locations. For more information, see [Create a data layer from a KQL database].

<a name="layer"></a> **Layer**: A logical set of spatial information independently rendered, styled, filtered, and controlled on a map. For more information, see [What is a layer?]. See also [Data layer] and [Layer source].

<a name="layer-control"></a> **Layer control**: An on-map or side-pane control used to show, hide, select, or manage map layers. For more information, see [Manage data layers].

<a name="layer-order"></a> **Layer order**: The front-to-back rendering sequence of layers on a map. For more information, see [Reorder data layers].

<a name="layer-scoped-filter"></a> **Layer-scoped filter**: A filter that applies independently to one map layer. For more information, see [How data filtering works].

<a name="layer-setting"></a> **Layer setting**: A map-definition object describing how a layer is rendered and styled. For more information, see [The map definition].

<a name="layer-source"></a> **Layer source**: A map-definition object describing what data a layer reads and how it is refreshed. For more information, see [The map definition].

<a name="layer-visibility"></a> **Layer visibility**: The shown or hidden state of an individual map layer. For more information, see [Show or hide data layers].

<a name="legend"></a> **Legend**: A visual key that explains the colors, symbols, sizes, or value ranges used to represent data in a layer. For more information, see [Data-driven styling for map layers].

<a name="line-geometry"></a> **Line geometry**: A spatial geometry representing a path or boundary as one or more connected line segments. For more information, see [Vector data layers].

<a name="line-layer"></a> **Line layer**: A vector layer that renders line or multiline geometries using stroke color, width, and opacity settings. For more information, see [Line settings].

<a name="linestring"></a> **LineString**: A GeoJSON geometry type defined by an ordered array of two or more positions forming a line. For more information, see [LineString in the Azure Maps glossary].

<a name="locked-filter"></a> **Locked filter**: A saved filter that map consumers can't remove in view mode. For more information, see [Lock filters]. See also [Unlocked filter] and [Filter persistence].

<a name="long-running-operation-lro"></a> **Long-running operation (LRO)**: An asynchronous REST operation that can return a `Location` header or an `x-ms-operation-id` header that a client uses to poll for completion. After an operation succeeds, the client might need to retry listing maps until the new map becomes visible. For more information, see [Create an LRO helper function].

<a name="longitude"></a> **Longitude**: The angular distance east or west of the prime meridian, expressed in degrees from -180 to 180. For more information, see [Initial map view].

<a name="longitude-column"></a> **Longitude column**: The data column selected to provide longitude values for point locations. For more information, see [Create a data layer from a KQL database].

## M

<a name="map"></a> **Map**: An interactive spatial visualization composed of a basemap and one or more independently configured layers. For more information, see [What is a map in Fabric Maps?]. See also [Map item] and [Map canvas].

<a name="map-canvas"></a> **Map canvas**: The interactive area where basemaps, layers, and geographic features are rendered. For more information, see [What is Fabric Maps?].

<a name="map-control"></a> **Map control**: An interactive map element, such as zoom, compass, pitch, scale, or traffic, that the map author can show or hide. For more information, see [Map controls].

<a name="map-definition"></a><a name="map-definition-map-json"></a> **Map definition (map.json)**: The declarative JSON content that describes a map's basemap, data sources, layer sources, rendering settings, and icon sources. For more information, see [The map definition]. See also [Map item definition] and [Layer setting].

<a name="map-item"></a> **Map item**: A Fabric item that references spatial data sources and displays their data as interactive geographic layers. For more information, see [What is a map item?]. See also [Map definition].

<a name="map-item-definition"></a> **Map item definition**: The Fabric item-definition payload for a map, including the map definition and platform metadata used by item APIs and lifecycle operations. For more information, see [Fabric Maps item model].

<a name="map-item-permission"></a> **Map item permission**: An item-level permission, such as Read, Edit, or Share, granted for a Fabric map. For more information, see [Map item permissions].

<a name="map-layer"></a> **Map layer**: A logical set of spatial information rendered and managed independently on a map; commonly shortened to layer. For more information, see [What is a layer?].

<a name="map-style"></a> **Map style**: The selected visual style of the basemap, including road, satellite, hybrid, grayscale, night, high-contrast, or blank styles. For more information, see [Map style settings].

<a name="map-view"></a> **Map view**: The currently visible geographic area and camera state of a map, including center, zoom, pitch, and rotation. For more information, see [Initial map view].

<a name="marker"></a> **Marker**: A symbol placed at a point location to represent an object, event, or observation. For more information, see [Marker layer settings].

<a name="marker-anchor"></a> **Marker anchor**: The point on a marker image that is aligned to the feature's geographic coordinate. For more information, see [Marker layer settings].

<a name="marker-icon"></a> **Marker icon**: A built-in or custom image used by a marker layer to represent point features. For more information, see [Marker layer settings].

<a name="marker-layer"></a> **Marker layer**: A point layer that displays locations using built-in or custom symbols. For more information, see [Marker layer settings]. See also [Marker icon] and [Point layer].

<a name="materialized-view"></a> **Materialized view**: A persisted Kusto query result maintained for efficient repeated access and usable as a source for a Kusto-backed layer. For more information, see [Kusto integration in Fabric Maps].

<a name="microsoft-planetary-computer-pro-mpc-pro"></a> **Microsoft Planetary Computer Pro (MPC Pro)**: A Microsoft service providing geospatial datasets that Fabric Maps can consume through WMTS endpoints. For more information, see [Get an MPC Pro WMTS endpoint].

<a name="multilinestring"></a> **MultiLineString**: A GeoJSON geometry type containing an array of LineString coordinate arrays. For more information, see [MultiLineString in the Azure Maps glossary].

<a name="multipoint"></a> **MultiPoint**: A GeoJSON geometry type containing an array of point positions. For more information, see [MultiPoint in the Azure Maps glossary].

<a name="multipolygon"></a> **MultiPolygon**: A GeoJSON geometry type containing an array of Polygon coordinate arrays. For more information, see [MultiPolygon in the Azure Maps glossary].

## N

<a name="near-real-time-data"></a> **Near-real-time data**: Data made available for analysis and visualization shortly after it's generated, with a small processing delay. For more information, see [Working with real-time and historical spatial data].

<a name="numeric-range-filter"></a> **Numeric range filter**: A map-layer filter that includes records whose numeric property falls between minimum and maximum values. For more information, see [Supported filter types].

## O

<a name="oauth-2-0"></a> **OAuth 2.0**: An authorization framework used to obtain access tokens for supported APIs and external geospatial services. For more information, see [OAuth 2.0 authorization code flow].

<a name="ogc-api-features"></a> **OGC API - Features**: A REST-oriented OGC standard for discovering and retrieving geographic feature collections. For more information, see [Supported feature service protocols].

<a name="onelake"></a> **OneLake**: The unified logical data lake for Microsoft Fabric, used by lakehouses and other Fabric items to store files and tables. For more information, see [How lakehouse data is used in maps].

<a name="onelake-catalog"></a> **OneLake catalog**: The Fabric discovery experience used to find and select supported data items across OneLake. For more information, see [Use lakehouse data in Fabric Maps].

<a name="ontology"></a> **Ontology**: A governed semantic model that defines business entity types, properties, and relationships over organizational data. For more information, see [How ontology applies to Fabric Maps].

<a name="ontology-item"></a> **Ontology item**: A Fabric item that stores an ontology's entity types, properties, relationships, and data bindings. For more information, see [How ontology applies to Fabric Maps].

<a name="ontology-layer"></a> **Ontology layer**: A layer whose spatial data is bound to a business entity type defined by an ontology. For more information, see [Ontology defines what a map layer represents]. See also [Ontology] and [Entity type].

<a name="opacity"></a> **Opacity**: The degree to which a layer or feature is opaque rather than transparent. For more information, see [Configure layer settings].

<a name="open-geospatial-consortium-ogc"></a> **Open Geospatial Consortium (OGC)**: An international standards organization that develops interoperable geospatial specifications, including WMS, WMTS, WFS, and OGC API - Features. For more information, see [External imagery sources].

<a name="org-app"></a> **Org app**: A governed Fabric application used to package and distribute maps and other Fabric items to an organizational audience. For more information, see [Share maps with org apps].

<a name="outbound-access-protection"></a> **Outbound access protection**: A Fabric security capability that restricts outbound connections from a workspace to approved destinations. For more information, see [Workspace outbound access protection for Fabric Maps].

## P

<a name="pmtiles"></a> **PMTiles**: A portable archive format that stores tiles for multiple zoom levels in one file. For more information, see [About PMTiles]. See also [Tileset] and [Vector tile].

<a name="point-geometry"></a> **Point geometry**: A spatial geometry representing one or more discrete locations. For more information, see [Vector data layers].

<a name="point-layer"></a> **Point layer**: A vector layer that visualizes point locations as bubbles, markers, or a heatmap. For more information, see [Point settings]. See also [Bubble layer] and [Marker layer].

<a name="polygon-geometry"></a> **Polygon geometry**: A spatial geometry representing an enclosed area as one or more closed coordinate rings. For more information, see [Vector data layers].

<a name="polygon-layer"></a> **Polygon layer**: A vector layer that renders polygon or multipolygon features using fill, stroke, opacity, and optional extrusion settings. For more information, see [Polygon settings].

<a name="property"></a> **Property**: A named value associated with a feature and used for labels, filtering, styling, tooltips, or other map behavior. For more information, see [Fabric Maps layers].

## Q

<a name="query-result"></a> **Query result**: The rows and columns returned by a query and made available for visualization as a map layer. For more information, see [How Kusto data becomes a map layer].

## R

<a name="raster-data"></a> **Raster data**: Spatial data represented as a grid of cells or pixels, often used for imagery, elevation, or environmental measurements. For more information, see [Imagery layers].

<a name="raster-imagery"></a> **Raster imagery**: Georeferenced image data rendered as pixels, such as satellite, weather, or elevation imagery. For more information, see [Imagery layers].

<a name="raster-layer"></a> **Raster layer**: A map layer that displays georeferenced pixel or image content rather than individual vector features. For more information, see [Imagery layers]. See also [Raster data] and [Imagery layer].

<a name="raster-tile"></a> **Raster tile**: A prerendered image tile with fixed visual styling. For more information, see [Map tile types].

<a name="real-time-dashboard"></a> **Real-Time Dashboard**: A Microsoft Fabric item for monitoring and exploring continuously updating operational data through dashboard tiles. For more information, see [Add a Fabric Maps tile]. See also [Fabric Maps tile] and [Map].

<a name="real-time-data"></a> **Real-time data**: Data that is ingested, processed, and made available with minimal delay as events occur. For more information, see [Working with real-time and historical spatial data].

<a name="real-time-intelligence"></a> **Real-Time Intelligence**: The Microsoft Fabric workload for ingesting, processing, analyzing, visualizing, and acting on data in motion. For more information, see [How maps fit into Real-Time Intelligence].

<a name="real-time-layer"></a> **Real-time layer**: A Kusto-backed layer that polls its source for updated data at a configured refresh interval. For more information, see [Data refresh behavior]. See also [Refresh interval] and [Real-time data].

<a name="refresh-interval"></a> **Refresh interval**: The configured frequency at which a Kusto-backed layer retrieves updated data. For more information, see [Data refresh behavior].

<a name="rest-api"></a> **REST API**: An HTTP-based programming interface used to automate Fabric Maps and related Fabric operations. For more information, see [What the Fabric Maps REST API enables].

<a name="rotation-alignment"></a> **Rotation alignment**: A marker setting that determines whether its rotation is aligned to the map orientation or to the screen viewport. For more information, see [Marker layer settings].

## S

<a name="satellite-map-style"></a> **Satellite map style**: A basemap style that displays satellite or aerial imagery without the road and label overlay used by the hybrid style. For more information, see [Map style settings].

<a name="scheduled-refresh"></a> **Scheduled refresh (preview)**: A configured schedule that periodically regenerates a tileset from its source data. For more information, see [Data refresh and scheduling].

<a name="semantic-visualization"></a> **Semantic visualization**: A visualization that represents governed business entities rather than anonymous spatial records. For more information, see [Ontology layers in Fabric Maps].

<a name="service-principal"></a> **Service principal**: An application identity in Microsoft Entra ID used for unattended authentication and automation. For more information, see [Authentication and authorization].

<a name="share-link"></a> **Share link**: A link that grants the configured map-item access to recipients, subject to their access to underlying data. For more information, see [Create a share link].

<a name="spatial-data"></a> **Spatial data**: Data that describes the geographic location, shape, or extent of an object or event. For more information, see [What is a layer?].

<a name="spatial-property"></a> **Spatial property**: An ontology entity property mapped to location or geometry data for visualization in an ontology layer. For more information, see [Ontology layers in Fabric Maps].

<a name="static-data"></a> **Static data**: Data that changes infrequently and is commonly used for boundaries, reference locations, or historical context. For more information, see [Static and real-time mapping].

<a name="static-layer"></a> **Static layer**: A map layer backed by data that changes infrequently, commonly a lakehouse file or tileset. For more information, see [Static and real-time mapping].

<a name="streaming-data"></a> **Streaming data**: A continuous sequence of events or records processed as they arrive. For more information, see [Kusto integration in Fabric Maps].

<a name="stroke-color"></a> **Stroke color**: The color used for a line or the outline of a polygon, bubble, or marker. For more information, see [Configure layer settings].

<a name="stroke-width"></a> **Stroke width**: The thickness, usually in pixels, of a line or feature outline. For more information, see [Configure layer settings].

## T

<a name="tile"></a> **Tile**: A small section of geographic data for a particular area and zoom level. For more information, see [Tiles].

<a name="tile-generation"></a> **Tile generation**: The process of converting source spatial data into map tiles organized by zoom level and location. For more information, see [Create a tileset].

<a name="tileset"></a> **Tileset**: A structured collection of tiles organized by location and zoom level. For more information, see [Tilesets]. See also [Tile] and [PMTiles].

<a name="tileset-refresh-schedule"></a> **Tileset refresh schedule (preview)**: The schedule that controls when Fabric Maps regenerates a tileset from changed source data. For more information, see [Data refresh and scheduling].

<a name="tooltip"></a> **Tooltip**: An interactive display of feature properties when a user hovers over a feature. For more information, see [Visibility settings].

## U

<a name="underlying-data-source"></a> **Underlying data source**: A lakehouse, KQL database, eventhouse, ontology, or external service that supplies data displayed by a map. For more information, see [Data sources used by maps].

<a name="unlocked-filter"></a> **Unlocked filter**: A saved or temporary layer filter that a map consumer can modify or remove in view mode. For more information, see [Remove filters in view mode].

<a name="user-identity"></a> **User identity**: The Microsoft Entra identity of the person viewing or editing a map, used to evaluate applicable permissions. For more information, see [Permissions in Fabric Maps].

## V

<a name="vector-data"></a> **Vector data**: Spatial data represented as discrete features with point, line, or polygon geometries and associated properties. For more information, see [Vector data layers].

<a name="vector-layer"></a> **Vector layer**: A layer containing discrete points, lines, or polygons and their associated properties. For more information, see [Vector data layers]. See also [Vector data] and [Feature].

<a name="vector-tile"></a> **Vector tile**: A tile containing geometry and properties that can be styled dynamically by the map. For more information, see [Map tile types].

<a name="view-mode"></a><a name="map-view-mode"></a> **View mode**: The read-oriented Fabric Maps experience in which a user explores a saved map without changing its authored configuration. For more information, see [What is a map in Fabric Maps?]. See also [Edit mode].

## W

<a name="web-feature-service-wfs"></a> **Web Feature Service (WFS)**: An OGC standard for discovering and retrieving queryable geographic vector features over the web. For more information, see [Supported feature service protocols].

<a name="web-map-service-wms"></a> **Web Map Service (WMS)**: An Open Geospatial Consortium standard for dynamically delivering raster map images. For more information, see [How WMS and WMTS imagery works]. See also [WMS endpoint] and [WMS layer].

<a name="web-map-tile-service-wmts"></a> **Web Map Tile Service (WMTS)**: An Open Geospatial Consortium standard for delivering prerendered map tiles. For more information, see [How WMS and WMTS imagery works]. See also [WMTS endpoint] and [WMTS layer].

<a name="web-mercator"></a><a name="web-mercator-epsg-3857"></a> **Web Mercator (EPSG:3857)**: The projected coordinate reference system commonly used by web maps and required for supported Fabric Maps COG files. For more information, see [Web Mercator in the Azure Maps glossary].

<a name="wms-endpoint"></a> **WMS endpoint**: The service URL used to request maps and capabilities from a Web Map Service. For more information, see [How WMS and WMTS imagery works].

<a name="wms-layer"></a> **WMS layer**: An external imagery layer rendered from a named layer exposed by a Web Map Service. For more information, see [How WMS and WMTS imagery works].

<a name="wmts-endpoint"></a> **WMTS endpoint**: The service URL used to request capabilities and tiles from a Web Map Tile Service. For more information, see [How WMS and WMTS imagery works].

<a name="wmts-layer"></a> **WMTS layer**: An external imagery layer rendered from a named tile layer exposed by a Web Map Tile Service. For more information, see [How WMS and WMTS imagery works].

<a name="workspace"></a> **Workspace**: A collaborative Fabric container that holds and governs items, permissions, and capacity assignment. For more information, see [Workspaces in Microsoft Fabric].

<a name="workspace-outbound-access-protection"></a> **Workspace outbound access protection**: Outbound access protection configured at the Fabric workspace level to restrict connections to external destinations. For more information, see [Workspace outbound access protection for Fabric Maps].

<a name="workspace-role"></a> **Workspace role**: A predefined role, such as Admin, Member, Contributor, or Viewer, that controls a user's capabilities across a workspace. For more information, see [Roles in workspaces].

## Z

<a name="zoom-level"></a> **Zoom level**: A numeric camera scale that controls how much geographic area is visible and how much detail the map displays. For more information, see [Initial map view].

<a name="zoom-to-fit"></a> **Zoom to fit**: A map action that adjusts the view to contain the geographic extent of a selected layer. For more information, see [Manage data layers].

[Access token]: #access-token
[Basemap style]: #basemap-style
[Bubble layer]: #bubble-layer
[Clustering]: #clustering
[Data filtering]: #data-filtering
[Data layer]: #data-layer
[Data source]: #data-source
[Edit mode]: #edit-mode
[Entity instance]: #entity-instance
[Entity property]: #entity-property
[Entity type]: #entity-type
[External imagery layer]: #external-imagery-layer
[Fabric Maps tile]: #fabric-maps-tile
[Feature]: #feature
[Filter persistence]: #filter-persistence
[Filter type]: #filter-type
[GeoJSON Feature]: #geojson-feature
[GeoJSON FeatureCollection]: #geojson-featurecollection
[Geometry]: #geometry
[Geometry type]: #geometry-type
[Imagery layer]: #imagery-layer
[KQL database]: #kql-database
[KQL function]: #kql-function
[Layer]: #layer
[Layer setting]: #layer-setting
[Layer source]: #layer-source
[Map]: #map
[Map canvas]: #map-canvas
[Map definition]: #map-definition
[Map item]: #map-item
[Map item definition]: #map-item-definition
[Map item permission]: #map-item-permission
[Map style]: #map-style
[Marker icon]: #marker-icon
[Marker layer]: #marker-layer
[Ontology]: #ontology
[PMTiles]: #pmtiles
[Point layer]: #point-layer
[Property]: #property
[Raster data]: #raster-data
[Raster imagery]: #raster-imagery
[Real-Time Dashboard]: #real-time-dashboard
[Real-time data]: #real-time-data
[Refresh interval]: #refresh-interval
[Share link]: #share-link
[Tile]: #tile
[Tileset]: #tileset
[Underlying data source]: #underlying-data-source
[Unlocked filter]: #unlocked-filter
[Vector data]: #vector-data
[Vector tile]: #vector-tile
[Web Map Service (WMS)]: #web-map-service-wms
[Web Map Tile Service (WMTS)]: #web-map-tile-service-wmts
[WMS endpoint]: #wms-endpoint
[WMS layer]: #wms-layer
[WMTS endpoint]: #wmts-endpoint
[WMTS layer]: #wmts-layer
[Access tokens]: about-rest-api.md#access-tokens
[Add a Cloud Optimized GeoTIFF]: add-lakehouse-layer.md#add-a-cloud-optimized-geotiff-cog
[Add a Fabric Maps tile]: ../dashboard-real-time-create.md#add-a-fabric-maps-tile-preview
[Add a GeoJSON file]: add-lakehouse-layer.md#add-a-geojson-file
[Authentication and authorization]: about-rest-api.md#authentication-and-authorization
[Bounding box in the Azure Maps glossary]: /azure/azure-maps/glossary#bounding-box
[Bubble layer settings]: customize-map.md#bubble-layer
[Configure layer settings]: customize-map.md
[Coordinate reference system in the Azure Maps glossary]: /azure/azure-maps/glossary#coordinate-reference-system-crs
[Create a data layer from a KQL database]: create-layers-using-kusto-data.md#create-a-data-layer-from-a-kql-database
[Create a Geospatial Web Services connection]: add-external-sourced-imagery-layer.md#step-1-create-a-geospatial-web-services-connection
[Create an LRO helper function]: tutorial-create-fabric-map-python.md#create-an-lro-helper-function
[Create a tileset]: create-tile-sets.md#create-a-tileset
[Custom markers]: customize-map.md#custom-markers
[Data connection rules for Fabric Maps]: ../../security/workspace-outbound-access-protection-fabric-maps.md#configure-outbound-access-protection-for-fabric-maps
[Data filtering in Fabric Maps]: about-data-filtering.md
[Data label settings]: customize-map.md#data-label-settings
[Data permissions and map visibility]: about-map-permissions.md#data-permissions-and-map-visibility
[Data refresh and scheduling]: about-tile-sets.md#data-refresh-and-scheduling-preview
[Data refresh behavior]: about-kusto-integration.md#data-refresh-behavior
[Data sources used by maps]: about-maps.md#data-sources-used-by-maps
[Data-driven styling for map layers]: customize-map.md#data-driven-styling-for-map-layers
[Enable extrusion]: customize-map.md#enable-extrusion
[External imagery sources]: about-external-sourced-imagery.md
[Fabric Maps item model]: about-rest-api.md#fabric-maps-item-model
[Fabric Maps layers]: about-layers.md
[Feature collection in the Azure Maps glossary]: /azure/azure-maps/glossary#feature-collection
[Feature in the Azure Maps glossary]: /azure/azure-maps/glossary#feature
[Geometry type settings]: customize-map.md#geometry-type-settings
[GeometryCollection in the Azure Maps glossary]: /azure/azure-maps/glossary#geometrycollection
[Get an MPC Pro WMTS endpoint]: get-mpc-pro-wmts-endpoint.md
[GIS in the Azure Maps glossary]: /azure/azure-maps/glossary#gis
[Heatmap layer settings]: customize-map.md#heatmap-layer
[How data filtering works]: about-data-filtering.md#how-data-filtering-works
[How Kusto data becomes a map layer]: about-kusto-integration.md#how-kusto-data-becomes-a-map-layer
[How lakehouse data is used in maps]: about-lakehouse-layers.md#how-lakehouse-data-is-used-in-maps
[How maps fit into Real-Time Intelligence]: about-fabric-maps.md#how-maps-fit-into-real-time-intelligence
[How ontology applies to Fabric Maps]: about-ontology-layers.md#how-ontology-applies-to-fabric-maps
[How WMS and WMTS imagery works]: about-external-sourced-imagery.md#how-wms-and-wmts-imagery-works-in-fabric-maps
[Imagery layers]: about-layers.md#imagery-layers
[Initial map view]: configure-map-settings.md#initial-map-view
[Kusto integration in Fabric Maps]: about-kusto-integration.md
[Kusto Query Language overview]: /kusto/query/?view=microsoft-fabric&preserve-view=true
[Line settings]: customize-map.md#line-settings
[LineString in the Azure Maps glossary]: /azure/azure-maps/glossary#linestring
[Lock filters]: filter-data.md#lock-filters
[Manage data layers]: data-layer-management.md#zoom-to-fit
[Map controls]: configure-map-settings.md#controls
[Map item permissions]: about-map-permissions.md#map-item-permissions
[Map style settings]: configure-map-settings.md#style
[Map tile types]: about-tile-sets.md#map-tile-types
[Marker layer settings]: customize-map.md#marker-layer
[MultiLineString in the Azure Maps glossary]: /azure/azure-maps/glossary#multilinestring
[MultiPoint in the Azure Maps glossary]: /azure/azure-maps/glossary#multipoint
[MultiPolygon in the Azure Maps glossary]: /azure/azure-maps/glossary#multipolygon
[OAuth 2.0 authorization code flow]: /entra/identity-platform/v2-oauth2-auth-code-flow
[Ontology binds spatial data to business concepts]: about-ontology-layers.md#ontology-binds-spatial-data-to-business-concepts
[Ontology defines what a map layer represents]: about-ontology-layers.md#ontology-defines-what-a-map-layer-represents
[Ontology layers in Fabric Maps]: about-ontology-layers.md
[Ontology supports cross-domain reasoning on maps]: about-ontology-layers.md#ontology-supports-cross-domain-reasoning-on-maps
[Permissions in Fabric Maps]: about-map-permissions.md
[Point settings]: customize-map.md#point-settings
[Polygon settings]: customize-map.md#polygon-settings
[Raster data in lakehouses]: about-lakehouse-layers.md#raster-data
[Remove filters in view mode]: filter-data.md#remove-filters-view-mode
[Reorder data layers]: data-layer-management.md#reorder-data-layers
[Roles in workspaces]: ../../fundamentals/roles-workspaces.md
[About PMTiles]: about-tile-sets.md#pmtiles
[Create a share link]: share-map-direct.md#share-link
[Use direct access]: share-map-direct.md#direct-access
[Understand filter persistence]: about-data-filtering.md#filter-persistence
[Share maps with org apps]: share-map-org-apps.md
[Show or hide data layers]: data-layer-management.md#show-or-hide-data-layers
[Static and real-time mapping]: about-maps.md#static-and-realtime-mapping
[Supported feature service protocols]: about-external-feature-services.md#supported-feature-service-protocols
[Supported filter types]: about-data-filtering.md#supported-filter-types
[Supported Kusto entities]: about-kusto-integration.md#supported-kusto-entities
[The map definition]: about-rest-api.md#the-map-definition-mapjson
[Tiles]: about-tile-sets.md#tiles
[Tilesets]: about-tile-sets.md#tilesets
[Use lakehouse data in Fabric Maps]: about-lakehouse-layers.md
[Vector data layers]: about-layers.md#vector-data-layers
[Visibility settings]: customize-map.md#visibility-settings
[Web Mercator in the Azure Maps glossary]: /azure/azure-maps/glossary#web-mercator
[What is a layer?]: about-layers.md#what-is-a-layer
[What is a map in Fabric Maps?]: about-maps.md
[What is a map item?]: about-maps.md#what-is-a-map-item
[What is Azure Maps?]: /azure/azure-maps/about-azure-maps
[What is Fabric Maps?]: about-fabric-maps.md
[What the Fabric Maps REST API enables]: about-rest-api.md#what-the-fabric-maps-rest-api-enables
[Work with the Fabric Maps visual]: pin-map-to-real-time-dashboard.md#work-with-the-fabric-maps-visual
[Working with real-time and historical spatial data]: about-fabric-maps.md#working-with-real-time-and-historical-spatial-data
[Workspace outbound access protection for Fabric Maps]: ../../security/workspace-outbound-access-protection-fabric-maps.md
[Workspaces in Microsoft Fabric]: ../../fundamentals/workspaces.md
