---
title: Resource links in ontology (preview)
description: Learn about linking resources to an entity type in ontology (preview).
ms.date: 03/03/2026
ms.topic: how-to
---

# Resource links in ontology (preview)

In ontology (preview), *report links* let you associate [Power BI reports](/power-bi/create-reports/) with an entity type. Linking reports provides essential *provenance*, *context*, and *discoverability* for insights tied to a business concept. By linking reports directly to an entity type, you can:
* Quickly access relevant analytics without searching across workspaces
* Maintain consistent context between data, ontology, and reporting

## Prerequisites

Before adding report links, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** enabled on your tenant.
* An ontology (preview) item with [entity types](how-to-create-entity-types.md) defined.
* A Power BI report containing insights relevant to an entity type, and permission to view the report. (If you don't have view permission for a report, you can still add it as a link, but it will appear as *Report unavailable* when viewed in the list.)

## Add a report link

To add a link to an existing Power BI report on an entity type, follow these steps.

1. Open your ontology (preview) item to the contextual canvas.
1. Select the entity type from the **Entity Types** pane to open its configuration. Open the **Report links** tab.

    :::image type="content" source="media/how-to-use-resource-links/report-links-empty.png" alt-text="Screenshot of the entity type configuration with an empty report links tab.":::

1. If there are no reports linked yet, the **Report links** tab is empty with a button to **Add report link**. If you have existing report links, they appear in a list.

    :::image type="content" source="media/how-to-use-resource-links/report-links.png" alt-text="Screenshot of the report links tab with reports.":::

1. To add a report link, select the **Add report link** button (if no reports are linked yet) or the **+** button (if other reports are linked already).

    :::image type="content" source="media/how-to-use-resource-links/add-report-link.png" alt-text="Screenshot of adding a report link with the + button.":::

1. Fabric opens your OneLake catalog of resources. Choose the Power BI report you want to link to the entity type, and select **Connect**.

1. Verify that the new report appears in the list of linked reports on the **Report links** tab.

## View report links

You can view reports linked to an entity type from the following locations.

### Report links tab

To view a list of linked reports by entity, open the entity type configuration in the contextual canvas and select the **Report links** tab.

:::image type="content" source="media/how-to-use-resource-links/report-links.png" alt-text="Screenshot of the report links tab with reports.":::

### Entity type overview

Linked reports are also visible in the **Entity type overview** experience. 

1. To open the entity type overview, select the entity type from the **Entity Types** pane and select **Entity type overview** from the menu ribbon.

    :::image type="content" source="media/how-to-use-resource-links/entity-type-overview.png" alt-text="Screenshot of opening the entity type overview.":::

1. The entity type overview automatically shows a **Power BI Report links** tile when at least one link exists.

    :::image type="content" source="media/how-to-use-resource-links/report-links-tile.png" alt-text="Screenshot of the Power BI Report links tile.":::

1. You can open the reports directly from the tile by selecting their names. Reports open inside Fabric as another tab.

## Manage the Power BI Report links tile

If there's no **Power BI Report links** tile present in the entity type overview, you can add it manually.

1. In the entity type overview, select **Add tile > Power BI Report**.

    :::image type="content" source="media/how-to-use-resource-links/add-tile.png" alt-text="Screenshot of adding a Power BI Report tile.":::

1. Preview the links that will be visible on the tile and select **Create**.

    :::image type="content" source="media/how-to-use-resource-links/add-tile-2.png" alt-text="Screenshot of confirming the Power BI Report tile.":::

You might also see these messages on the tile creation step:
* If a tile already exists, you see this message: *A Power BI Report links tile already exists on this overview*.

    :::image type="content" source="media/how-to-use-resource-links/tile-already-exists.png" alt-text="Screenshot of the message when a Power BI Report links tile already exists.":::
* If there are no linked reports on the entity type, you see this message: *No links to display*, with a link to the entity type configuration.

    :::image type="content" source="media/how-to-use-resource-links/no-links-tile-2.png" alt-text="Screenshot of the empty link tile configuration.":::

    If you add the tile anyway, the tile stays empty in the overview.

    :::image type="content" source="media/how-to-use-resource-links/no-links-tile.png" alt-text="Screenshot of the empty link tile in the entity type overview.":::

## Delete a report link

>[!NOTE]
>Deleting a report link in ontology does **not** delete the report from the Power BI workspace.

To remove a linked report from an entity type:

1. Open the entity type configuration and select the **Report links** tab.
1. Hover over the report you want to delete, and select the trash icon.

    :::image type="content" source="media/how-to-use-resource-links/delete.png" alt-text="Screenshot of the trash icon next to a linked report.":::

1. Select **Delete** when prompted to confirm the deletion.

    :::image type="content" source="media/how-to-use-resource-links/delete-2.png" alt-text="Screenshot of confirming the report link deletion.":::

To remove linked reports from the entity type overview, remove the entire Power BI Report links tile. (You can't keep the tile while deleting individual links from it.)

1. Select the **...** options on the Power BI Report links tile, and select **Delete**.

    :::image type="content" source="media/how-to-use-resource-links/delete-tile.png" alt-text="Screenshot of deleting the report tile from the entity type overview.":::

1. Select **Delete** to confirm the deletion when prompted.

    :::image type="content" source="media/how-to-use-resource-links/delete-tile-2.png" alt-text="Screenshot of confirming the report tile deletion.":::