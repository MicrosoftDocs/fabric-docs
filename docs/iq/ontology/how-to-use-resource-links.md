---
title: Resource Links in Ontology (Preview)
description: Learn about linking resources to an entity type in ontology (preview).
ms.date: 10/20/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Link external resources in ontology (preview)

In ontology (preview), *resource links* let you associate Fabric items, such as [Power BI reports](/power-bi/create-reports) and semantic models, with an entity type. Resource links can also reference compatible item-reference variables.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Linking resources provides provenance, context, and discoverability for insights tied to a business concept. By linking resources directly to an entity type, you can:

* Quickly access relevant analytics without searching across workspaces
* Maintain consistent context between data, ontology, and reporting

A resource link is a reference, not a [data binding](how-to-bind-data.md). Adding a link doesn't import the linked item's data or grant permission to access it. Access to the linked item is controlled separately by that item's permissions.

## Prerequisites

Before adding resource links, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** enabled on your tenant.
* An ontology (preview) item with [entity types](how-to-create-entity-types.md) defined.
* A Fabric item relevant to an entity type, and permission to access that item. A linked item might be unavailable if you don't have access to it.

## Add a resource link

To add a link to an existing Fabric item on an entity type, follow these steps.

1. In the Home contextual canvas, select the entity type in the **Explorer** pane. Select **View Entity Type details** from the ribbon.

    :::image type="content" source="media/how-to-use-resource-links/view-entity-type-details.png" alt-text="Screenshot of selecting View Entity Type details from the canvas." lightbox="media/how-to-use-resource-links/view-entity-type-details.png":::

    The entity type details view opens to the **Configure** tab.

1. Scroll down to the **Resources** section, which shows any linked resources. Select **Add** to add a new resource link.

    :::image type="content" source="media/how-to-use-resource-links/add-resources.png" alt-text="Screenshot of the Resources section and the Add button." lightbox="media/how-to-use-resource-links/add-resources.png":::

1. Fabric opens your OneLake catalog of resources. Choose the Fabric item you want to link to the entity type, and select **Add**.

1. Verify that the item appears in the **Resources** section.

    :::image type="content" source="media/how-to-use-resource-links/resources-entry-crop.png" alt-text="Screenshot of a resource inside the Resources section." lightbox="media/how-to-use-resource-links/resources-entry-crop.png":::

## View resource links

View resources linked to an entity type from the **Configure** tab.

The list of resources linked to an entity type is visible in the **Configure** tab of the entity type details, in the **Resources** section.

:::image type="content" source="media/how-to-use-resource-links/resources-entry.png" alt-text="Screenshot of a resource inside the Resources section of the Configure tab." lightbox="media/how-to-use-resource-links/resources-entry.png":::

## Delete a resource link

>[!NOTE]
> Deleting a resource link in ontology does **not** delete the actual linked item from the workspace.

To remove a linked resource from an entity type:

1. Start in the **Configure** tab of the entity type details.
1. In the **Resources** section, hover over the link to reveal the trash icon. Select the icon.

    :::image type="content" source="media/how-to-use-resource-links/delete.png" alt-text="Screenshot of the trash icon next to a linked resource." lightbox="media/how-to-use-resource-links/delete.png":::

1. Select **Delete** when prompted to confirm the deletion.
