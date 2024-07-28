---
title: Lineage in Fabric
description: Learn how to view the lineage of Fabric items.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/06/2023
---

# Lineage in Fabric

In modern business intelligence (BI) projects, understanding the flow of data from the data source to its destination can be a challenge. The challenge is even bigger if you've built advanced analytical projects spanning multiple data sources, data items, and dependencies. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer. They might require a team of experts or deep investigation to understand. Fabric's lineage view helps you answer these questions.

:::image type="content" source="./media/lineage/lineage-view.png" alt-text="Screenshot of the lineage view in Microsoft Fabric." lightbox="./media/lineage/lineage-view.png":::

In lineage view, you see the lineage relationships between all the items in a workspace, as well as data sources external to the workspace one-step upstream.

Every workspace automatically has a lineage view.

> [!NOTE]
> Lineage in Fabric is in preview, and not all connections between items are fully supported yet. It is possible that the lineage between some items will be incorrectly shown.

## Permissions

Any user with a [role in a workspace](../get-started/roles-workspaces.md) can access that workspace's lineage view. However, users with the *Viewer* role won't see data sources.

## Open lineage view

Lineage is accessible from multiple locations. Typically, you can get to it 

* From the workspace toolbar

    :::image type="content" source="./media/lineage/lineage-workspace.png" alt-text="Screenshot of lineage view option in workspace menu.":::

* From an item's option menu (for instance, in the OneLake data hub)

    :::image type="content" source="./media/lineage/lineage-options-menu.png" alt-text="Screenshot of lineage view option in options menu.":::

* From the menu items at the top of the item's details page

    :::image type="content" source="./media/lineage/lineage-data-details.png" alt-text="Screenshot of lineage view option on data details page.":::

## What do you see in lineage view

When you open lineage view on an item, you'll see the connections between all the items in the workspace the item is located in.

:::image type="content" source="./media/lineage/lineage-view.png" alt-text="Screenshot showing contents of lineage view in Microsoft Fabric." lightbox="./media/lineage/lineage-view.png":::

Lineage view displays:

* All the items in the workspace and how they are connected to each other.
* Upstream connections outside the workspace, one level up. You can tell if an item is outside the workspace because the name of the external workspace is indicated on the card, as illustrated by the HR Data KQL Database in the image above.

Downstream items in different workspaces aren't shown. To explore an item's downstream connections outside the workspace, open the item's [impact analysis](./impact-analysis.md).

Items are represented by cards that provide some information about the item.

:::image type="content" source="./media/lineage/lineage-item-card.png" alt-text="Screenshot of item card in lineage view.":::

**Data sources**

You see the data sources from which the semantic models and dataflows get their data. On the data source cards, you see information that can help identify the source. For example, for Azure SQL server, you also see the database name.

:::image type="content" source="./media/lineage/lineage-data-source-card.png" alt-text="Screenshot of the lineage view data source with no gateway.":::

## Highlight an item's lineage

To highlight the lineage for a specific item, select the arrow at the bottom right corner of the card.

:::image type="content" source="./media/lineage/lineage-highlight-specific-lineage.png" alt-text="Screenshot of highlighted lineage for a specific item." lightbox="./media/lineage/lineage-highlight-specific-lineage.png":::

   Fabric highlights all the items related to that item, and dims the rest.

## Zoom and full screen 

Lineage view is an interactive canvas. You can use the mouse and touchpad to navigate in the canvas, as well as to zoom in or out.

* To zoom in and out, use either the menu in the bottom-right corner or your mouse or touchpad.
* To have more room for the graph itself, use the full screen option at the bottom-right corner.

    :::image type="content" source="./media/lineage/lineage-zoom.png" alt-text="Screenshot of zoom in or out, or full screen options." border="false":::

## Considerations and limitations

* Lineage view isn't available in Internet Explorer. For more information, see [Supported browsers for Power BI](/power-bi/fundamentals/power-bi-browsers).
* Correct display of the lineage between semantic models and dataflows is guaranteed only if the **Get Data** UI is used to set up the connection to the dataflow, and the **Dataflows** connector is used. Correct display of the lineage between semantic models and dataflows isn't guaranteed if a manually created Mashup query is used to connect to the dataflow.

## Related content

* [Impact analysis](./impact-analysis.md)
