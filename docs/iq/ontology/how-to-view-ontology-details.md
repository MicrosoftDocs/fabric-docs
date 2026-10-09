---
title: View Ontology Details (Preview)
description: Learn about the configuration canvas and entity type details view in ontology (preview).
ms.date: 09/14/2026
ms.topic: how-to
---

# View ontology details in ontology (preview)

To view and explore your ontology, start with the multiple view formats on the home configuration canvas. To drill down into entity type details, use the *entity type details* view. There, you can configure an entity type and explore its instance data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before viewing entity type details, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** enabled on your tenant.
* An ontology (preview) item with [data binding](how-to-bind-data.md) completed.

[!INCLUDE [Explore canvas views](includes/explore-canvas-views.md)]

## View entity type details

Follow these steps to access the entity type details in your ontology (preview) item.

1. In the **Explorer** pane of the Home configuration canvas, select the entity type that you want to view. Select **View Entity Type details** from the top ribbon, or select the arrow icon next to the entity name on the canvas.

    :::image type="content" source="media/how-to-view-ontology-details/view-entity-type-details.png" alt-text="Screenshot of opening the experience from the menu ribbon." lightbox="media/how-to-view-ontology-details/view-entity-type-details.png":::

1. The entity type details view opens to the **Configure** page. Use the tabs across the top of the page to switch between the **Configure** and **Instances** pages.

    :::image type="content" source="media/how-to-view-ontology-details/entity-type-details-tabs.png" alt-text="Screenshot of the entity type details configure page. The Configure and Instances tabs are highlighted." lightbox="media/how-to-view-ontology-details/entity-type-details-tabs.png":::

### Configure tab

On the **Configure** page, you can manage properties, data bindings, relationship types, metrics, metadata, and resource links for the entity type.

:::image type="content" source="media/how-to-view-ontology-details/entity-type-details-configure.png" alt-text="Screenshot of the entity type details configure page." lightbox="media/how-to-view-ontology-details/entity-type-details-configure.png":::

For more information about these features, see the following documents:

* [Add properties](how-to-create-entity-types.md#add-properties)
* [Bind data](how-to-bind-data.md)
* [Add relationship types](how-to-create-relationship-types.md)
* [Use resource links](how-to-use-resource-links.md)

### Instances tab

In the **Instances** page, you can view the instances associated with the entity type and their static property values.

:::image type="content" source="media/how-to-view-ontology-details/entity-type-details-instances.png" alt-text="Screenshot of the entity type details instances page." lightbox="media/how-to-view-ontology-details/entity-type-details-instances.png":::

## Troubleshooting

For troubleshooting tips related to the entity type details in ontology (preview), see [Troubleshoot ontology (preview)](resources-troubleshooting.md).
