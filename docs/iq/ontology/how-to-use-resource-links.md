---
title: Resource links in ontology (preview)
description: Learn about linking resources to an entity type in ontology (preview).
ms.date: 03/23/2026
ms.topic: how-to
---

# Resource links in ontology (preview)

In ontology (preview), *resource links* let you associate resources with an entity type. Currently, the only type of resource that's supported are [Power BI reports](/power-bi/create-reports/).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Linking reports provides essential provenance, context, and discoverability for insights tied to a business concept. By linking reports directly to an entity type, you can:
* Quickly access relevant analytics without searching across workspaces
* Maintain consistent context between data, ontology, and reporting

## Prerequisites

Before adding resource links, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** enabled on your tenant.
* An ontology (preview) item with [entity types](how-to-create-entity-types.md) defined.
* A Power BI report containing insights relevant to an entity type, and permission to view the report. (If you don't have view permission for a report, you can still add it as a link, but it will appear as *Report unavailable* when viewed in the list.)

## Add a resource link

To add a link to an existing Power BI report on an entity type, follow these steps.

1. Open your ontology (preview) item to the contextual canvas.
1. Select the entity type from the **Entity Types** pane to open its configuration. Open the **Resource links** tab.

    :::image type="content" source="media/how-to-use-resource-links/resource-links-empty.png" alt-text="Screenshot of the entity type configuration with an empty resource links tab." lightbox="media/how-to-use-resource-links/resource-links-empty.png":::

1. If there are no resources linked yet, the **Resource links** tab is empty with a button to **Add resource link**. If you have existing resource links, they appear in a list.

    :::image type="content" source="media/how-to-use-resource-links/resource-links.png" alt-text="Screenshot of the resource links tab with linked resources." lightbox="media/how-to-use-resource-links/resource-links.png":::

1. To add a resource link, select the **+** button (if some resources are linked already) or the **Add resource link** button (if no resources are linked yet).

    :::image type="content" source="media/how-to-use-resource-links/add-resource-link.png" alt-text="Screenshot of adding a resource link with the + button.":::

1. Fabric opens your OneLake catalog of resources. Choose the Power BI report you want to link to the entity type, and select **Connect**.

1. Verify that the new report appears in the list of linked resources on the **Resource links** tab.

## View resource links

You can view resources linked to an entity type from the following locations.

### Resource links tab

To view a list of linked resources by entity, open the entity type configuration in the contextual canvas and select the **Resource links** tab.

:::image type="content" source="media/how-to-use-resource-links/resource-links.png" alt-text="Screenshot of the Resource links tab with resources." lightbox="media/how-to-use-resource-links/resource-links.png":::

### Entity type overview

Linked resources are also visible in the **Entity type overview** experience. 

1. To open the entity type overview, select the entity type from the **Entity Types** pane and select **Entity type overview** from the menu ribbon.

    :::image type="content" source="media/how-to-use-resource-links/entity-type-overview.png" alt-text="Screenshot of opening the entity type overview." lightbox="media/how-to-use-resource-links/entity-type-overview.png":::

1. The entity type overview automatically shows a **Resource links** tile when at least one link exists.

    :::image type="content" source="media/how-to-use-resource-links/resource-links-tile.png" alt-text="Screenshot of the Resource links tile." lightbox="media/how-to-use-resource-links/resource-links-tile.png":::

1. You can open the resources directly from the tile by selecting their names. Reports open inside Fabric in a new tab.

## Manage the Resource links tile

If there's no **Resource links** tile present in the entity type overview, you can add it manually.

1. In the entity type overview, select **Add tile > Resource links**.

    :::image type="content" source="media/how-to-use-resource-links/add-tile.png" alt-text="Screenshot of adding a Resource links tile.":::

1. Preview the links that will be visible on the tile and select **Create**.

    :::image type="content" source="media/how-to-use-resource-links/add-tile-2.png" alt-text="Screenshot of confirming the Resource links tile." lightbox="media/how-to-use-resource-links/add-tile-2.png":::

You might also see these messages on the tile creation step:
* If a tile already exists, you see this message: *A Resource links tile already exists on this overview*.

    :::image type="content" source="media/how-to-use-resource-links/tile-already-exists.png" alt-text="Screenshot of the message when a Resource links tile already exists." lightbox="media/how-to-use-resource-links/tile-already-exists.png":::
* If there are no linked resources on the entity type, you see this message: *No links to display*, with a link to the entity type configuration.

    :::image type="content" source="media/how-to-use-resource-links/no-links-tile.png" alt-text="Screenshot of the empty link tile configuration." lightbox="media/how-to-use-resource-links/no-links-tile.png":::

    If you add the tile anyway, the tile stays empty in the overview.

    :::image type="content" source="media/how-to-use-resource-links/no-links-tile-2.png" alt-text="Screenshot of the empty link tile in the entity type overview.":::

## Delete a resource link

>[!NOTE]
>Deleting a resource link in ontology does **not** delete the report from the Power BI workspace.

To remove a linked resource from an entity type:

1. Start in the configuration canvas. Open the entity type configuration and select the **Resource links** tab.
1. Hover over the resource you want to delete, and select the trash icon.

    :::image type="content" source="media/how-to-use-resource-links/delete.png" alt-text="Screenshot of the trash icon next to a linked resource." lightbox="media/how-to-use-resource-links/delete.png":::

1. Select **Delete** when prompted to confirm the deletion.

To remove linked resources from the entity type overview, remove the entire Resource links tile. (You can't keep the tile while deleting individual links from it.)

1. Select the **...** options on the Resource links tile, and select **Delete**.

    :::image type="content" source="media/how-to-use-resource-links/delete-tile.png" alt-text="Screenshot of deleting the Resource links tile from the entity type overview.":::

1. Select **Delete** to confirm the deletion when prompted.