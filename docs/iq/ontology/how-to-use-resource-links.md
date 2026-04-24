---
title: Resource links in ontology (preview)
description: Learn about linking resources to an entity type in ontology (preview).
ms.date: 04/24/2026
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

1. From the Home contextual canvas, select the entity type from the **Explorer** pane. Select **View Entity Type details** from the ribbon.

    :::image type="content" source="media/how-to-use-resource-links/view-entity-type-details.png" alt-text="Screenshot of selecting View Entity Type details from the canvas." lightbox="media/how-to-use-resource-links/view-entity-type-details.png":::

    The **Configure** tab opens.

1. The **Resources** section displays any linked resources. Select **Add** to add a new resource link.

    :::image type="content" source="media/how-to-use-resource-links/add-resources.png" alt-text="Screenshot of the Resources section and the Add button." lightbox="media/how-to-use-resource-links/add-resources.png":::

1. Fabric opens your OneLake catalog of resources. Choose the Power BI report you want to link to the entity type, and select **Add**.

1. Verify that the report appears now in the **Resources** section.

    :::image type="content" source="media/how-to-use-resource-links/resources-entry.png" alt-text="Screenshot of a resource inside the Resources section." lightbox="media/how-to-use-resource-links/resources-entry.png":::

## View resource links

You can view resources linked to an entity type from the following locations.

### Configure tab

The list of resources linked to an entity type is visible in the **Configure** tab in the entity type details, in the **Resources** section.

:::image type="content" source="media/how-to-use-resource-links/resources-entry.png" alt-text="Screenshot of a resource inside the Resources section of the Configure tab." lightbox="media/how-to-use-resource-links/resources-entry.png":::

### Overview tab

Linked resources can be displayed on in a tile on the **Overview** tab of the entity type details. An entity type can only have one **Resource links** tile at a time.

:::image type="content" source="media/how-to-use-resource-links/resource-links-tile.png" alt-text="Screenshot of the Resource links tile on the Overview tab." lightbox="media/how-to-use-resource-links/resource-links-tile.png":::

You can open the resources directly from the tile by selecting their names. Reports open inside Fabric in a new tab.

#### Manage the Resource links tile

If there's no **Resource links** tile present in the entity type overview, you can add it manually.

1. In the entity type overview, select **Add tile > Resource links**.

    :::image type="content" source="media/how-to-use-resource-links/add-tile.png" alt-text="Screenshot of adding a Resource links tile." lightbox="media/how-to-use-resource-links/add-tile.png":::

1. Preview the links that will be visible on the tile and select **Create**.

    :::image type="content" source="media/how-to-use-resource-links/add-tile-2.png" alt-text="Screenshot of confirming the Resource links tile.":::

You might also see these messages on the tile creation step:
* If a tile already exists, you see this message: *A Resource links tile already exists on this overview*.

    :::image type="content" source="media/how-to-use-resource-links/tile-already-exists.png" alt-text="Screenshot of the message when a Resource links tile already exists.":::

* If there are no linked resources on the entity type, you see this message: *No links to display*, with a link to the entity type configuration.

    :::image type="content" source="media/how-to-use-resource-links/no-links-tile.png" alt-text="Screenshot of the empty link tile configuration.":::

    If you add the tile anyway, the tile stays empty in the overview.

    :::image type="content" source="media/how-to-use-resource-links/no-links-tile-2.png" alt-text="Screenshot of the empty link tile in the entity type overview." lightbox="media/how-to-use-resource-links/no-links-tile-2.png":::

## Delete a resource link

>[!NOTE]
>Deleting a resource link in ontology does **not** delete the report from the Power BI workspace.

To remove a linked resource from an entity type:

1. Start in the **Configure** tab of the entity type details.
1. In the **Resources** section, select the trash icon next to the link you want to delete.

    :::image type="content" source="media/how-to-use-resource-links/delete.png" alt-text="Screenshot of the trash icon next to a linked resource." lightbox="media/how-to-use-resource-links/delete.png":::

1. Select **Delete** when prompted to confirm the deletion.

To remove linked resources from the **Overview** tab, remove the entire Resource links tile. (You can't keep the tile while deleting individual links from it.)

1. Expand the **...** options on the Resource links tile and select **Delete**.

    :::image type="content" source="media/how-to-use-resource-links/delete-tile.png" alt-text="Screenshot of deleting the Resource links tile from the entity type overview." lightbox="media/how-to-use-resource-links/delete-tile.png":::

1. Select **Delete** to confirm the deletion when prompted.
