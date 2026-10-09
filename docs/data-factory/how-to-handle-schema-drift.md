---
title: How to handle schema drift in Dataflow Gen2
description: This article describes how to handle schema drift using global options and destination settings from Data Factory for Microsoft Fabric.
ms.topic: concept-article
ms.date: 07/25/2025
ms.custom: dataflows
ai-usage: ai-assisted
---

# How to handle schema drift in Dataflow Gen2

*Schema drift* happens when your data structure changes - like when someone adds a new column or removes an existing one. Dataflows give you several ways to manage these changes. You can use type detection to update your destination based on the source schema. You can also manage destination schema when you publish. Both methods work specifically with dataflows.

Let's look at how to use them.  

## Global options method

Dataflow Gen2 includes a type detection feature. You can find it in the Power Query **Options** menu.

:::image type="content" source="media/how-to-handle-schema-drift/type-detection-options.png" alt-text="Screenshot of the Power Query Options dialog with the Detect column types and headers type detection option selected.":::

## Updating a table automatically

When you load data into a new table, the automatic settings are turned on by default. With automatic settings, Dataflow Gen2 handles the mapping for you. Here's what the automatic settings do:

:::image type="content" source="media/how-to-handle-schema-drift/use-automatic-settings.png" alt-text="Screenshot of the Choose destination settings window with the Use automatic settings option selected." lightbox="media/how-to-handle-schema-drift/use-automatic-settings.png":::

* **Replace**: Data gets replaced every time the dataflow refreshes. Any existing data in the destination is removed first. Then the destination gets the new output data from the dataflow.

* **Managed mapping**: Mapping is handled automatically. When you change your data or query to add a column or change a data type, the mapping adjusts automatically when you republish your dataflow. You don't need to update the data destination settings every time you make changes to your dataflow. This makes schema changes easier when you republish the dataflow.

* **Drop and recreate table**: To allow for these schema changes, the table gets dropped and recreated every time the dataflow refreshes. Your dataflow refresh might remove relationships or measures that were added to your table before. Right now, automatic settings only work with Lakehouse and Azure SQL database as the data destination.

## Updating a table manually

Turn off **Use automatic settings** to get full control over how your data loads into the data destination. You can change the column mapping by updating the source type or excluding columns you don't need in your data destination.

:::image type="content" source="media/how-to-handle-schema-drift/use-manual-settings.png" alt-text="Screenshot of the Choose destination settings window with the Use automatic settings option unselected." lightbox="media/how-to-handle-schema-drift/use-manual-settings.png":::

Most destinations support both append and replace as update methods. However, Fabric KQL databases and Azure Data Explorer don't support replace as an update method.

* **Replace**: Every time the dataflow refreshes, your data gets dropped from the destination and replaced with the output data from the dataflow.

* **Append**: Every time the dataflow refreshes, the output data from the dataflow gets added to the existing data in the destination table.

## How to use schema options on publish

Schema options on publish only work when the update method is replace. When you append data, you can't change the schema.

* **Dynamic schema**: When you choose dynamic schema, you allow schema changes in the data destination when you republish the dataflow. Since you're not using managed mapping, you still need to update the column mapping in the dataflow destination when you make changes to your query. When the dataflow refreshes, your table gets dropped and recreated. Your dataflow refresh might remove relationships or measures that were added to your table before.

* **Fixed schema**: When you choose fixed schema, schema changes aren't allowed. When the dataflow refreshes, only the rows in the table get dropped and replaced with the output data from the dataflow. Any relationships or measures on the table stay the same. If you make changes to your query in the dataflow, the dataflow publish fails if it detects that the query schema doesn't match the data destination schema. Use this setting when you don't plan to change the schema and have relationships or measures added to your destination table.

You'll see checkboxes or dropdowns depending on the schema update type (for example, "Fixed") and whether the table already exists. If the table already exists, you get dropdowns. If you create a new table, you see checkboxes because the destination table doesn't exist yet. This way, Dataflow Gen2 lets you update your schema before creating the table.

> [!NOTE]
> When loading data into the warehouse, only fixed schema is supported. If a column isn't in your initial settings and you add it manually, "(none)" appears.  

:::image type="content" source="media/how-to-handle-schema-drift/schema-options-on-publish.png" alt-text="Screenshot of the schema options on publish dialog with fixed schema selected.":::
