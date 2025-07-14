---
title: How to handle schema drift in Dataflow Gen2
description: This article describes how to handle schema drift using global options and destination settings from Data Factory for Microsoft Fabric.
author: whhender
ms.author: whhender
ms.topic: concept-article
ms.date: 9/19/2024
ms.custom: dataflows
---

# How to handle schema drift in Dataflow Gen2

*Schema drift* is defined as any change that occurs to the structure of the data, such as when a new column is added or a column is removed. Dataflows allow schema drift management in several ways. Using type detection to change the destination according to the source schema is possible. Destination schema management on publish is also available. Each of these methods is specific to dataflows.

Let's explore how it's achieved.  

## Global options method

Dataflow Gen2 provides a type detection mechanism. You can set it in the Power Query **Options** menu.

:::image type="content" source="media/how-to-handle-schema-drift/type-detection-options.png" alt-text="Screenshot of the Power Query Options dialog with the Detect column types and headers type detection option selected.":::

## Updating a table automatically

When you load into a new table, the automatic settings are on by default. If you use the automatic settings, Dataflow Gen2 manages the mapping for you. The automatic settings provide the following behavior:

:::image type="content" source="media/how-to-handle-schema-drift/use-automatic-settings.png" alt-text="Screenshot of the Choose destination settings window with the Use automatic settings option selected." lightbox="media/how-to-handle-schema-drift/use-automatic-settings.png":::

* **Replace**: Data is replaced at every dataflow refresh. Any data in the destination is removed. The data in the destination is replaced with the output data of the dataflow.

* **Managed mapping**: Mapping is managed for you. When you need to make changes to your data/query to add another column or change a data type, mapping is automatically adjusted for this change when you republish your dataflow. You don't have to go into the data destination experience every time you make changes to your dataflow, allowing for easy schema changes when you republish the dataflow.

* **Drop and recreate table**: To allow for these schema changes, on every dataflow refresh the table is dropped and recreated. Your dataflow refresh might cause the removal of relationships or measures that were added previously to your table. Currently, automatic settings are only supported for Lakehouse and Azure SQL database as the data destination.

## Updating a table manually

By untoggling **Use automatic settings**, you get full control over how to load your data into the data destination. You can make any changes to the column mapping by changing the source type or excluding any column that you don't need in your data destination.

:::image type="content" source="media/how-to-handle-schema-drift/use-manual-settings.png" alt-text="Screenshot of the Choose destination settings window with the Use automatic settings option unselected." lightbox="media/how-to-handle-schema-drift/use-manual-settings.png":::

Most destinations support both append and replace as update methods. However, Fabric KQL databases and Azure Data Explorer don't support replace as an update method.

* **Replace**: On every dataflow refresh, your data is dropped from the destination and replaced by the output data of the dataflow.

* **Append**: On every dataflow refresh, the output data from the dataflow is appended to the existing data in the data destination table.

## How to use schema options on publish

Schema options on publish only apply when the update method is replace. When you append data, changes to the schema aren't possible.

* **Dynamic schema**: When choosing dynamic schema, you allow for schema changes in the data destination when you republish the dataflow. Because you aren't using managed mapping, you still need to update the column mapping in the dataflow destination flow when you make any changes to your query. When the dataflow is refreshed, your table is dropped and recreated. Your dataflow refresh might cause the removal of relationships or measures that were added previously to your table.

* **Fixed schema**: When you choose fixed schema, schema changes aren't possible. When the dataflow gets refreshed, only the rows in the table are dropped and replaced with the output data from the dataflow. Any relationships or measures on the table stay intact. If you make any changes to your query in the dataflow, the dataflow publish fails if it detects that the query schema doesn't match the data destination schema. Use this setting when you don't plan to change the schema and have relationships or measure added to your destination table.

You see checkboxes or dropdowns depending on the schema update type (for example, for "Fixed") and if the table is already created. If the table is already created, you get dropdowns. If you create a new table, you're shown checkboxes because the destination table doesn't exist. Thus, Dataflow Gen2 allows you to update your schema before table creation.

> [!NOTE]
> When loading data into the warehouse, only fixed schema is supported. If a column isn't present in your initial settings and you add manually, "(none)" is displayed.  

:::image type="content" source="media/how-to-handle-schema-drift/schema-options-on-publish.png" alt-text="Screenshot of the schema options on publish dialog with fixed schema selected.":::
