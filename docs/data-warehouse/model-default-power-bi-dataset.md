---
title: Data modeling in the default Power BI dataset
description: Learn how to model your data in the default Power BI dataset.
ms.reviewer: wiassaf
ms.author: salilkanade
author: salilkanade
ms.topic: conceptual
ms.date: 04/11/2023
ms.search.form: Model view
---

# Data modeling in the default Power BI dataset

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Access the default Power BI dataset

To access default Power BI datasets, go to your workspace and find the dataset that matches the name of the warehouse.

:::image type="content" source="media\data-modeling-defining-relationships\find-dataset.png" alt-text="Screenshot showing where to find a dataset." lightbox="media\data-modeling-defining-relationships\find-dataset.png":::

To load the dataset, select the name of the dataset.

:::image type="content" source="media\data-modeling-defining-relationships\load-dataset.png" alt-text="Screenshot showing the load dataset details." lightbox="media\data-modeling-defining-relationships\load-dataset.png":::


## Data modeling

The default Power BI dataset inherits all relationships between entities defined in the model view and infers them as Power BI dataset relationships, when objects are enabled for BI (Power BI Reports). Inheriting the warehouse's business logic allows a warehouse developer or BI analyst to decrease the time to value towards building a useful semantic model and metrics layer for analytical business intelligence (BI) reports in Power BI, Excel, or external tools like Tableau that read the XMLA format.

While all constraints are translated to relationships, currently in Power BI, only one relationship can be active at a time, whereas multiple primary and foreign key constraints can be defined for warehouse entities and are shown visually in the diagram lines. The active Power BI relationship is represented with a solid line and the rest is represented with a dotted line. We recommend choosing the primary relationship as active for BI reporting purposes.

The following table provides a description of the properties available when using the model view diagram and creating relationships:

| **Column name** | **Description** |
|---|---|
| **FromObjectName** | Table/View name "From" which relationship is defined. |
| **ToObjectName** | Table/View name "To" which a relationship is defined. |
| **TypeOfRelationship** | Relationship cardinality, the possible values are: None, OneToOne, OneToMany, ManyToOne, and ManyToMany. |
| **SecurityFilteringBehavior** | Indicates how relationships influence filtering of data when evaluating row-level security expressions and is a Power BI specific semantic. The possible values are: OneDirection, BothDirections, and None. |
| **IsActive** | A Power BI specific semantic, and a boolean value that indicates whether the relationship is marked as Active or Inactive. This defines the default relationship behavior within the semantic model |
| **RelyOnReferentialIntegrity** | A boolean value that indicates whether the relationship can rely on referential integrity or not. |
| **CrossFilteringBehavior** | Indicates how relationships influence filtering of data and is Power BI specific. The possible values are: 1 - OneDirection, 2 - BothDirections, and 3 - Automatic. |

## Using model view layouts

During the session, users may create multiple tabs in the model view to depict say, data warehouse schemas or further assist with database design. Currently the model view layouts are only persisted in session. However the database changes are persisted. Users can use the auto-layout whenever a new tab is created to visually inspect the database design and understand the modeling.

## Adding or removing objects to the default Power BI dataset

In Power BI, a dataset is always required before any reports can be built, so the default Power BI dataset enables quick reporting capabilities on top of the warehouse. Within the warehouse, a user can add warehouse objects - tables or views to their default Power BI dataset. They can also add other semantic modeling properties, such as hierarchies and descriptions. These properties are then used to create the Power BI dataset's tables. Users can also remove objects from the default Power BI dataset.

To add objects such as tables or views to the default Power BI dataset, you have options:

1. Automatically add objects to the dataset, which happens by default with no user intervention needed.

1. Manually add objects to the dataset.

The auto detect experience determines any tables or views and opportunistically adds them.

The manually detect option in the ribbon allows fine grained control of which object(s), such as tables and/or views, should be added to the default Power BI dataset:

- Select all
- Filter for tables or views
- Select specific objects

To remove objects, a user can use the manually select button in the ribbon and:

- Un-select all
- Filter for tables or views
- Un-select specific objects

> [!TIP]
> We recommend reviewing the objects enabled for BI and ensuring they have the correct logical relationships to ensure a smooth downstream reporting experience.

## Next steps

- [Create a measure](create-measure.md)
- [Define relationships in data models](model-default-power-bi-dataset.md)
- [Create reports in the Power BI service](reports-power-bi-service.md)
- [Power BI admin center](../admin/admin-power-bi.md)