---
title: Data filtering in Fabric Maps
description: Learn about data filtering in Fabric Maps.
ms.reviewer: smunk
author: deniseatmicrosoft
ms.author: limingchen
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.date: 09/13/2026
ms.search.form: Data filtering
---

# Data filtering in Fabric Maps

Data filtering in Fabric Maps lets you limit which records are rendered in a **map layer** based on attribute values. Filtering applies **per layer**, not at the map level, and affects only how data is visualized, not the underlying data source.

Filtering is available for vector data layers created from supported data sources, including GeoJSON, PMTiles, Kusto, Ontology (preview), and external feature services.

External feature service layers can also have a **source query** that limits which records and fields the remote service returns. A source query is evaluated by the remote service before Fabric Maps retrieves the data. The map-layer filters described in this article apply only to the retrieved features. For more information, see [Source queries and map-layer filters](about-external-feature-services.md#source-queries-and-map-layer-filters).

External feature service layers support the same builder- and viewer-mode filtering behavior as other vector layers, including locked filters and filter persistence. Date/time values are interpreted as UTC in RFC 3339 format.

## How data filtering works

Each map layer evaluates its own filter conditions independently. When filters are applied, only the records that match all conditions are rendered for that layer.

Key characteristics:

- Filters are **layer-scoped**
- Filters do **not** affect other layers on the map
- Multiple filters on the same layer are combined using **AND** logic
- Filtering changes the visualized subset of data, not the source data

## Supported filter types

The available filter types depend on the data source and field type.

| Filter type   | Description                                                 | Supported sources                                            |
|---------------|-------------------------------------------------------------|--------------------------------------------------------------|
| Categorical   | Filters text-based fields using one or more selected values | GeoJSON, PMTiles, Kusto, Ontology, external feature services |
| Numeric range | Filters numeric fields using a minimum and maximum range    | GeoJSON, PMTiles, Kusto, Ontology, external feature services |
| Boolean       | Filters true/false fields                                   | GeoJSON, PMTiles, Kusto, Ontology, external feature services |
| Date/time     | Filters records within a time range                         | Kusto, Ontology, external feature services                   |

> [!NOTE]
> Date/time filtering isn't available for GeoJSON or PMTiles layers.

## Builder and consumer behavior

Filtering behavior differs depending on whether a map is opened in **edit mode** or **view mode**.

### Map builders (edit mode)

Map builders can:

- Add, modify, and remove filters on a layer
- Save filters with the map
- Lock specific filters to prevent removal in view mode

Locked filters define a baseline data scope that applies whenever the
map is opened.

### Map consumers (view mode)

Map consumers can:

- Add, remove, or modify **unlocked** filters during runtime
- Interact with filtered data without altering the saved map

Consumer filter changes are **temporary** and aren't saved.

Locked filters:

- Are applied automatically
- Can't be removed in view mode

## Filter persistence

- Filters configured and saved by a map builder persist with the map.
- Consumer changes are reset when the map is reopened.
- Locked filters persist until explicitly removed by a builder in edit mode.

## Interaction with other layer features

Filtering integrates with other layer-level capabilities:

- **Zoom to fit** adjusts the map view to the filtered dataset.
- **Data-driven styling** and **data labels** operate on the filtered results.
- **Custom marker layers** respect active filters.

## Limitations and design considerations

Data filters have the following limitations and design considerations:

- If a GeoJSON or PMTiles source has no properties, the filter can't access any fields.
- Numeric range controls abbreviate large values (for example, 4.2B) to improve readability. Hover over the number to see the exact value.
- Filtering works only on vector layers. You can't filter imagery layers.

## Next steps

> [!div class="nextstepaction"]
> [Data filtering](filter-data.md)