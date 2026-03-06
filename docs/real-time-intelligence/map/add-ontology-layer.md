---
title: Create a map layer from ontology entities in Fabric Maps
description: Learn how to create a map layer from ontology entities in Fabric Maps.
ms.reviewer: smunk
author: deniseatmicrosoft
ms.author: limingchen
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/9/2026
ms.search.form: Data filtering
---

# Create a map layer from ontology entities in Fabric Maps

This article shows how to create a new map layer in Fabric Maps by connecting to an ontology and visualizing ontology entities using spatial properties such as latitude and longitude.

Fabric Maps can connect directly to ontology items in your workspace and render entity instances as spatial features on a map. This allows you to visualize real-world business concepts—such as facilities, assets, vehicles, or service locations—in their geographic context and analyze them alongside other map layers.

> [!IMPORTANT]
> Ontology layers in Fabric Maps is currently in [preview](../../fundamentals/preview.md). Features and functionality may change.

## Prerequisites

Before you begin, ensure that the following requirements are met:

- You have access to a Microsoft Fabric workspace.
- An [Ontology](/../../iq/ontology/overview) item exists in the workspace.
- The ontology includes at least one entity type with spatial properties, such as latitude and longitude, or a geometry property.
- You have permission to create or edit Fabric Map items.

> [!NOTE]
> [Ontologies](/../../iq/ontology/overview) in Fabric define business concepts as entity types, properties, and relationships, and bind them to data stored in OneLake. Fabric Maps uses these bindings to visualize entity instances spatially.

## Connect a Fabric Map to an ontology

To visualize ontology entities, first connect your map to an ontology item.

1. Open an existing **Fabric Map** item.
1. In **Map Explorer**, select **Add**.
1. Select **Ontology** as the data source.

    :::image type="content" source="media/ontology/add-ontology.png" alt-text="A screenshot showing the Explorer pane in Fabric Maps showing the Fabric items tab with the Add dropdown menu expanded, listing three options: Lakehouse, KQL database, and Ontology (preview), with Ontology (preview) highlighted.":::

1. Choose the ontology item you want to connect to.
1. Select **Add**.

    :::image type="content" source="media/ontology/catalog.png" alt-text="A screenshot showing the OneLake catalog dialog titled Choose the data you want to connect with. A table lists ontology items with columns for Name, Owner, Refreshed, Location, Endorsement, and Sensitivity. An item is selected with a green checkbox. An Add button highlighted with a red border and a Cancel button appear in the bottom right corner.":::

After the connection is established, the entity types defined in the ontology appear in the explorer pane and are available for visualization.

## Configure spatial properties for an entity type

To display ontology entities on the map, you must specify which ontology properties represent spatial coordinates or geometry.

1. In the entity type list, select the entity you want to visualize.
1. Select **Show on map** to open the configuration wizard.

    :::image type="content" source="media/ontology/show-on-map.png" alt-text="A screenshot showing the Explorer pane in Fabric Maps displaying a tree view under OneLake with an expanded Ontology item listing entity types. A three-dot menu button next to the entity that is selected revealing a context menu with the option Show on map.":::

1. **Select an Ontology entity**, then select the **Next button**.
1. In the **Configure spatial properties** step, map the ontology properties to spatial fields:
    - **Latitude**: Select the property that represents the entity's latitude.
    - **Longitude**: Select the property that represents the entity's longitude.
    **OR** Select a property that contains geometry data, if your entity uses geometries instead of separate coordinate fields.

        :::image type="content" source="media/ontology/configure-spatial-properties.png" alt-text="A screenshot showing the Configure spatial properties step of the View Ontology data on map wizard, titled Visualize Ontology entity with spatial data over time on map (Preview). The form includes a Data layer section with a Name field, a Geometry data column section with Geometry column location set to Latitude and longitude data locate on separate columns, Latitude column set to Latitude, and Longitude column set to Longitude, and a Data refresh section with Data refresh interval set to Disable auto refresh. The left sidebar shows three steps: Select an Ontology entity marked complete, Configure spatial properties currently active, and Review and add to map not yet started. Back and Next buttons appear at the bottom right, with the Next button highlighted to indicate it should be selected.":::

1. Select **Next**.
1. Review the configuration, then select **Add to map**.

:::image type="content" source="media/ontology/review-add-to-map.png" alt-text="A screenshot showing the Review and add to map step of the View Ontology data on map wizard, titled Visualize Ontology entity with spatial data over time on map (Preview). The left sidebar shows three steps with green checkmarks next to Select an Ontology entity and Configure spatial properties, and a filled circle next to Review and add to map indicating it's the current step. The main panel displays a summary of the configuration organized into sections. Data source shows Ontology (preview) set to AirlineOntology and Entity set to Airport. Data layer shows Name set to Airport. Geometry data column shows Geometry column location set to Latitude and longitude data locate on separate columns, Latitude column set to Latitude, and Longitude column set to Longitude. Data refresh shows Data refresh interval set to Disable auto refresh. Back and Add to map buttons appear at the bottom right, with the Add to map button highlighted to indicate it should be selected.":::

Each entity instance is rendered on the map according to the configured spatial properties.

## Explore ontology entities on the map

After the entity layer is added, you can use standard map interactions to explore and analyze your data:

- Pan and zoom to inspect entity locations at different scales.
- Overlay ontology-based layers with other vector or imagery layers.
- Use spatial context to understand relationships between ontology entities and other mapped data.

Fabric Maps is designed to add geographic context to business data, helping you move from abstract entities to real-world spatial understanding. For more information, see [Maps in Microsoft Fabric – Geospatial Insights for Real-Time Operations](https://blog.fabric.microsoft.com/en-US/blog/introducing-maps-in-fabric-geospatial-insights-for-everyone/)

## Tips and best practices

- Ensure that latitude and longitude values are stored as numeric properties in your ontology. Invalid or non-numeric values can prevent entities from rendering correctly.
- If multiple entity types share spatial properties (for example, assets and facilities), you can add each entity type as a separate layer and control their visibility independently.
- Ontology-based layers are especially useful when combined with other Fabric Maps features, such as basemaps and imagery layers, to provide additional geographic context.

## Next steps

To learn more about Ontology:

> [!div class="nextstepaction"]
> [What is ontology (preview)?](/../../iq/ontology/overview)

<!--------------------------------------------------------
> [!div class="nextstepaction"]
> [Fabric Maps layers](about-layers.md)

Explore additional ways to add and style layers in Fabric Maps.
Combine ontology-based layers with real-time or historical data to build richer geospatial analyses.
-------------------------------------------------------->
