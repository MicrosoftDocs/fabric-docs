---
title: Dataflow Gen2 default destination
description: Learn about default data destination configurations and settings in Dataflow Gen2.
author: miquelladeboer
ms.author: mideboer
ms.reviewer: dougklo
ms.topic: conceptual
ms.date: 3/22/2024
---

# Dataflow Gen2 default destination

When you have a Lakehouse, Warehouse or KQL Database and you want to load data into it, you can use Dataflow Gen2 as an easy, low-code way for landing your data with the right shape.

You can always create a stand-alone Dataflow Gen2 from the workspace and use the data destinations to load your data in any Fabric Lakehouse, Warehouse or KQL Database. But to speed up your development, there are some other easy ways to land your data faster.

This article describes the new experience and important changes that were made.

Within the Lakehouse, Warehouse or KQL Database experience, you can get data through various options.  

:::image type="content" source="media/dataflow-gen2-default-destination/new-dataflow-gen2.png" alt-text="Screenshot of the Warehouse experience with New Dataflow Gen2 emphasized.":::

When you choose Dataflow Gen2 from either the Lakehouse, Warehouse or KQL Database, the data destination experience is slightly different from a "standard" Dataflow Gen2 that was created from the workspace.

By default, any query that you create has the Lakehouse, Warehouse or KQL Database you started from set as the data destination. If you hover over the data destination icon in Power Query diagram view, the destination is labeled as **Default destination**. This experience is different from the standard Dataflow Gen2, where you explicitly have to assign a query with a data destination.

:::image type="content" source="media/dataflow-gen2-default-destination/destination-hover.png" alt-text="Screenshot of the data destination icon in the Power Query diagram view with the drop-down menu displaying default destination.":::

With the default destination, the settings are set to a default behavior that can't be changed. The following table lists the behaviors for both Lakehouse and Warehouse default destination:

| Behavior | Lakehouse | Warehouse | KQL Database |
| -------- | --------- | --------- | --------- |
| **Update method** |Replace | Append | Append |
| **Schema change on publish** | Dynamic | Fixed | Fixed |

> [!NOTE]
> The previous update method for Lakehouse was **append**. This method is now changed to **replace**.

To edit the settings of an individual data destination, use the gear icon in the Power Query **Data destination** pane to edit the destination. When you edit the individual data destination, this change only affects the specific query. Currently, it isn't possible to change the behavior of the default destination.
