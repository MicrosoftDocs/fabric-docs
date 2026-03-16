---
title: Dataflow Gen2 default destination
description: Learn about default data destination configurations and settings in Dataflow Gen2.
ms.reviewer: jeluitwi
ms.topic: concept-article
ms.date: 02/26/2025
ms.custom: dataflows
---

# Dataflow Gen2 default destination

When you have a Lakehouse, Warehouse, or KQL Database and you want to load data into it, you can use Dataflow Gen2 as an easy, low-code way for landing your data with the right shape.

We have made it easier to get data into your Lakehouse, Warehouse, or KQL Database by creating a Dataflow Gen2 directly from the Lakehouse, Warehouse, or KQL Database experience. This is a great way to get started with Dataflow Gen2 and load data into your workspace. Additionally, you can use the new default destination experience within the editor to quickly set a default destination for your dataflow. This article describes the two ways to create a Dataflow Gen2 and set a default destination to speed up your dataflow creation process.

## Set a default destination in Dataflow Gen2

When you create a Dataflow Gen2, you can set a default destination for your dataflow. This helps you get started quickly by loading all queries to the same destination. You can set the default destination from the ribbon or the status bar in the editor. This speeds up your dataflow creation process.

In the editor, you can find the default destination settings in the ribbon and the status bar.

:::image type="content" source="media/dataflow-gen2-default-destination/default-destination-ribbon.png" alt-text="Screenshot of the Dataflow Gen2 editor with the default destination settings in the ribbon.":::

:::image type="content" source="media/dataflow-gen2-default-destination/default-destination-status-bar.png" alt-text="Screenshot of the Dataflow Gen2 editor with the default destination entry point in the status bar.":::

When you set a default destination, you will be prompted to choose a destination and select which queries to bind to it. You can set the default destination for all queries or only the selected ones.

:::image type="content" source="media/dataflow-gen2-default-destination/default-destination-bind-queries.png" alt-text="Screenshot of the Dataflow Gen2 editor with the prompt to bind the default destination to all queries or selected queries.":::

Once finished, your query will have the default destination set as the data destination.

:::image type="content" source="media/dataflow-gen2-default-destination/default-destination-completed.png" alt-text="Screenshot of the Dataflow Gen2 editor with the default destination set as the data destination.":::

If you later decide to set a default destination for a specific query, you can do so by selecting the query and then choosing the default destination as the data destination.

:::image type="content" source="media/dataflow-gen2-default-destination/default-destination-bind-in-query-settings.png" alt-text="Screenshot of the Dataflow Gen2 editor with the option to bind the default destination in the query settings.":::

:::image type="content" source="media/dataflow-gen2-default-destination/default-destination-bind-in-diagram-view.png" alt-text="Screenshot of the Dataflow Gen2 editor with the option to bind the default destination in the diagram view.":::

To update the default destination, delete the current default destination and set a new one.

## Create a Dataflow Gen2 from the Lakehouse, Warehouse, or KQL Database experience

Within the Lakehouse, Warehouse, or KQL Database experience, you can get data through various options.  

:::image type="content" source="media/dataflow-gen2-default-destination/new-dataflow-gen2.png" alt-text="Screenshot of the Warehouse experience with New Dataflow Gen2 emphasized.":::

When you choose Dataflow Gen2 from either the Lakehouse, Warehouse or KQL Database, the data destination experience is slightly different from a "standard" Dataflow Gen2 that was created from the workspace.

By default, any query that you create has the Lakehouse, Warehouse, or KQL Database you started from set as the data destination. If you hover over the data destination icon in Power Query diagram view, the destination is labeled as **Default destination**. This experience is different from the standard Dataflow Gen2, where you explicitly have to assign a query with a data destination.

:::image type="content" source="media/dataflow-gen2-default-destination/destination-hover.png" alt-text="Screenshot of the data destination icon in the Power Query diagram view with the drop-down menu displaying default destination.":::

With the default destination, the settings are set to a default behavior that can't be changed. The following table lists the behaviors for Lakehouse, Warehouse, or KQL Database default destination:

| Behavior | Lakehouse | Warehouse | KQL Database |
| -------- | --------- | --------- | --------- |
| **Update method** |Replace | Append | Append |
| **Schema change on publish** | Dynamic | Fixed | Fixed |

To edit the settings of an individual data destination, use the gear icon in the Power Query **Data destination** pane to edit the destination. When you edit the individual data destination, this change only affects the specific query. Currently, it isn't possible to change the behavior of the default destination.
