---
title: Using the semantic canvas
description: Understand the semantic canvas in the digital twin builder (preview).
author: baanders
ms.author: baanders
ms.date: 07/01/2025
ms.topic: concept-article
---

# Using the semantic canvas in digital twin builder (preview)

In digital twin builder (preview), the *semantic canvas* is the main view, and the centerpiece for creating your ontology. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Overview

When a new digital twin builder (preview) item is created, it opens automatically to the semantic canvas.

:::image type="content" source="media/concept-semantic-canvas/semantic-canvas-empty.png" alt-text="Screenshot of a blank semantic canvas.":::

Here are the actions you can perform in the semantic canvas:
* Create entity types
* Map data to entity instances
* Create semantic relationships between entity types
* View the status of your mapping and contextualization operations
* Select entity types or their relationship types in the canvas to see more details about them
* Select an entity type to review all entity types that are one defined relationship type away from the selected entity type

After you add entity types and relationship types to your ontology, the semantic canvas shows their details.

:::image type="content" source="media/concept-semantic-canvas/semantic-canvas-data.png" alt-text="Screenshot of the semantic canvas with data." lightbox="media/concept-semantic-canvas/semantic-canvas-data.png":::

## Sections of the semantic canvas

### Menu ribbon

The *menu ribbon* contains actions that you can perform from the semantic canvas. Actions include adding a [new entity type](model-manage-mappings.md#create-an-entity-type), adding a [new relationship type](model-perform-contextualization.md#create-a-relationship-type), managing [flow operations](concept-flows.md), and entering [Explore mode](explore-search-visualize.md) for viewing, querying, and visualizing your data.

:::image type="content" source="media/concept-semantic-canvas/menu-ribbon.png" alt-text="Screenshot of the menu ribbon.":::

### Entity list pane

The *entity list pane* is where you see a list of all the entity types in your ontology. You can search for and select an entity type to view it on the canvas. Once an entity type is selected, you can view all entity types that are one defined relationship type away from the selected entity type within the canvas.

:::image type="content" source="media/concept-semantic-canvas/entity-list-pane.png" alt-text="Screenshot of the entity list pane.":::

You can also expand the **...** next to an entity type name to [add a relationship type](model-perform-contextualization.md#create-a-relationship-type), [map data](model-manage-mappings.md) to its instances, or [deactivate the entity type](model-manage-mappings.md#deactivate-an-entity-type).

:::image type="content" source="media/concept-semantic-canvas/overflow-menu.png" alt-text="Screenshot of the overflow menu options.":::

### Entity configuration pane

The *entity configuration pane* is displayed when you select an entity type in the semantic canvas. In this pane, you can view properties modeled on the selected entity type (**Properties** tab), view and configure mappings (**Mappings** tab), and schedule mappings (**Scheduling** tab).

:::image type="content" source="media/concept-semantic-canvas/entity-configuration-pane.png" alt-text="Screenshot of the entity configuration pane.":::

## Related content

* [Mapping data to entity types in digital twin builder (preview)](concept-mapping.md)
* [Manage entity types and mapping](model-manage-mappings.md)