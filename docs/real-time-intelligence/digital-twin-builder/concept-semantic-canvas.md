---
title: Using the semantic canvas
description: Understand the semantic canvas in the digital twin builder (preview).
author: baanders
ms.author: baanders
ms.date: 04/25/2025
ms.topic: concept-article
---

# Using the semantic canvas in digital twin builder (preview)

In digital twin builder (preview), the *semantic canvas* is the main view, and the centerpiece for creating your ontology. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Overview

When a new digital twin builder (preview) item is created, it opens automatically to the semantic canvas.

:::image type="content" source="media/concept-semantic-canvas/semantic-canvas-empty.png" alt-text="Screenshot of a blank semantic canvas.":::

Here are the actions you can perform in the semantic canvas:
* Create entities
* Map data to entities
* Create semantic relationships between entities
* View the status of your mapping and contextualization operations
* Select entities or their relationships in the canvas to see more details about them
* Select an entity to review all entities that are one relationship away from the selected entity

After you add entities and relationships to your ontology, the semantic canvas shows their details.

:::image type="content" source="media/concept-semantic-canvas/semantic-canvas-data.png" alt-text="Screenshot of the semantic canvas with data." lightbox="media/concept-semantic-canvas/semantic-canvas-data.png":::

## Sections of the semantic canvas

### Menu ribbon

The *menu ribbon* contains actions that you can perform from the semantic canvas. Actions include adding a [new entity](model-manage-mappings.md#create-an-entity), adding a [new relationship](model-perform-contextualization.md#create-a-relationship), and managing [flow operations](concept-flows.md).

:::image type="content" source="media/concept-semantic-canvas/menu-ribbon.png" alt-text="Screenshot of the menu ribbon.":::

### Entity list pane

The *entity list pane* is where you see a list of all the entities in your ontology. You can search for and select an entity to view it on the canvas. Once an entity is selected, you can view all entities that are one relationship away from the selected entity within the canvas.

:::image type="content" source="media/concept-semantic-canvas/entity-list-pane.png" alt-text="Screenshot of the entity list pane.":::

You can also expand the **...** next to an entity name to [add a relationship](model-perform-contextualization.md#create-a-relationship), [map data](model-manage-mappings.md) to it, or [deactivate the entity](model-manage-mappings.md#deactivate-an-entity).

:::image type="content" source="media/concept-semantic-canvas/overflow-menu.png" alt-text="Screenshot of the overflow menu options.":::

### Entity configuration pane

The *entity configuration pane* is displayed when you select an entity in the semantic canvas. In this pane, you can view properties modeled on the selected entity (**Properties** tab), view and configure mappings (**Mappings** tab), and schedule mappings (**Scheduling** tab).

:::image type="content" source="media/concept-semantic-canvas/entity-configuration-pane.png" alt-text="Screenshot of the entity configuration pane.":::

### View selector

The *view selector* allows you to toggle between the **Configure** mode for editing and the **Explore** mode for [viewing, querying, and visualizing your data](explore-search-visualize.md).

:::image type="content" source="media/concept-semantic-canvas/view-selector.png" alt-text="Screenshot of the view selector.":::

## Related content

* [Mapping data to entities in digital twin builder (preview)](concept-mapping.md)
* [Manage entities and mapping](model-manage-mappings.md)