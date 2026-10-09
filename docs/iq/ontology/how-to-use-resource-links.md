---
title: Resource Links in Ontology (Preview)
description: Learn about linking resources to an entity type in ontology (preview).
ms.date: 09/04/2026
ms.topic: how-to
---

# Link external resources in ontology (preview)

In ontology (preview), *resource links* let you associate resources with an entity type. Currently, the only supported resource type is [Power BI reports](/power-bi/create-reports).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Linking reports provides essential provenance, context, and discoverability for insights tied to a business concept. By linking reports directly to an entity type, you can:

* Quickly access relevant analytics without searching across workspaces
* Maintain consistent context between data, ontology, and reporting

## Prerequisites

Before adding resource links, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** enabled on your tenant.
* An ontology (preview) item with [entity types](how-to-create-entity-types.md) defined.
* A Power BI report containing insights relevant to an entity type, and permission to view the report. (If you don't have view permission for a report, you can still add it as a link, but it appears as *Report unavailable* when you view it in the list.)

## Add a resource link

To add a link to an existing Power BI report on an entity type, follow these steps.

1. In the Home contextual canvas, select the entity type in the **Explorer** pane. Select **View Entity Type details** from the ribbon.

    :::image type="content" source="media/how-to-use-resource-links/view-entity-type-details.png" alt-text="Screenshot of selecting View Entity Type details from the canvas." lightbox="media/how-to-use-resource-links/view-entity-type-details.png":::

    The entity type details view opens to the **Configure** tab.

1. Scroll down to the **Resources** section, which shows any linked resources. Select **Add** to add a new resource link.

    :::image type="content" source="media/how-to-use-resource-links/add-resources.png" alt-text="Screenshot of the Resources section and the Add button." lightbox="media/how-to-use-resource-links/add-resources.png":::

1. Fabric opens your OneLake catalog of resources. Choose the Power BI report you want to link to the entity type, and select **Add**.

1. Verify that the report appears in the **Resources** section.

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
