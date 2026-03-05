---
title: Create layers using ontology entities in Fabric Maps
description: Learn about layers created from ontology entities in Fabric Maps.
ms.reviewer: smunk
author: deniseatmicrosoft
ms.author: limingchen
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/9/2026
ms.search.form: ontology, ontology entities, ontology layers
---

# Ontology layers in Fabric Maps

Fabric Maps uses ontology to add semantic meaning to map layers, so maps visualize governed business entities and relationships—not just raw spatial data.

> [!IMPORTANT]
> Ontology layers in Fabric Maps is currently in [preview](../../fundamentals/preview.md). Features and functionality can change.

## How ontology applies to Fabric Maps

In Fabric Maps, ontology provides the semantic layer that defines what spatial data represents. Instead of building maps directly from anonymous geometry files or tables, maps are built and reasoned about using business concepts.
The design intent is that maps are semantic visualizations, not raw spatial renderers.

> [!IMPORTANT]
> Fabric Maps renders semantic visualizations, not raw spatial data.
>
> A map layer represents a business entity defined in the ontology, not just a GeoJSON file, tileset, or query result. The ontology defines what the layer means; Fabric Maps defines how it appears spatially.

## Ontology defines what a map layer represents

In Fabric Maps, a map layer isn't simply a GeoJSON file, tileset, or query result.
Through ontology, each layer represents an entity type with defined business meaning.

Conceptually, for example:

- A point layer can represent a Customer entity
- A line layer can represent a Route entity
- A polygon layer can represent a Service area entity

The ontology defines:

- The entity type name
- The entity's properties (such as status, category, or risk level)
- The relationships between entities

Fabric Maps then renders the spatial expression of those entities, rather than treating geometry as anonymous shapes.

### Why this matters

Because the entity definition lives in the ontology, the same semantic layer can be reused consistently across maps, reports, and AI experiences—without redefining meaning in each visualization.

## Ontology binds spatial data to business concepts

Fabric Maps consumes spatial data stored in OneLake, such as GeoJSON, vector tiles, or query results.
Ontology binds that spatial data to entity types.

In this model:

- Spatial datasets remain the source of geometry
- Ontology provides the semantic contract that explains what the geometry represents

This means a dataset is never "just tiles" or "just features."
It's tiles or features that represent a specific entity type.

That binding enables:

- Consistent labeling across maps
- Property-driven styling and filtering
- Reuse of the same semantic layer in multiple map experiences

## Ontology enables consistent styling, filtering, and interaction

Because map layers are backed by entity definitions, interactions in Fabric Maps are expressed in business terms rather than technical column names.

For example, at a conceptual level:

- Style features by Customer.status
- Filter features where Order.priority = High
- Explore relationships such as Customer → Order → Location

Fabric Maps doesn't invent these meanings.
It inherits them directly from the ontology, ensuring consistency across experiences.

## Ontology supports cross-domain reasoning on maps

Fabric Maps is designed to participate in a broader semantic analytics experience—not operate as an isolated visualization tool.

Because ontology connects entities across domains:

- A single map can visualize entities originating from different sources
- Relationships defined in the ontology can be explored visually
- AI agents can reason about what the map represents, not just what it looks like

In this way, the map becomes a semantic surface, not just a spatial one.

This is especially important for:

- Operational monitoring
- Decision support scenarios
- AI-assisted exploration and analysis

## What ontology isn't in Fabric Maps

Ontology and Fabric Maps were designed with clearly separated responsibilities:

- Ontology doesn't store geometry
- Ontology doesn't replace GeoJSON, tilesets, or query results
- Ontology doesn't control rendering engines

Instead:

- Ontology defines meaning
- Fabric Maps renders spatial form
- OneLake stores data

This separation keeps the system composable, governable, and scalable—while allowing maps to remain both technically flexible and semantically grounded.

## Next steps

To learn how to create and configure a map:

> [!div class="nextstepaction"]
> [What is ontology (preview)?](/../../iq/ontology/overview)

<!--------------------------------------------------------
> [!div class="nextstepaction"]
> [Fabric Maps layers](about-layers.md)

Explore additional ways to add and style layers in Fabric Maps.
Combine ontology-based layers with real-time or historical data to build richer geospatial analyses.
-------------------------------------------------------->
