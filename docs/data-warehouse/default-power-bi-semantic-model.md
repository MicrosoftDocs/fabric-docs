---
title: Data modeling in the default Power BI semantic model
description: Learn how to model your data in the default Power BI semantic model in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: salilkanade, sosivara
ms.date: 04/24/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: conceptual
ms.custom:
  - build-2023
ms.search.form: Model view # This article's title should not change. If so, contact engineering.
---
# Model data in the default Power BI semantic model in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-and-dw-and-mirrored-db](includes/applies-to-version/fabric-se-and-dw-and-mirrored-db.md)]

The default Power BI semantic model inherits all relationships between entities defined in the model view and infers them as Power BI semantic model relationships, when objects are enabled for BI (Power BI Reports). Inheriting the warehouse's business logic allows a warehouse developer or BI analyst to decrease the time to value towards building a useful semantic model and metrics layer for analytical business intelligence (BI) reports in Power BI, Excel, or external tools like Tableau that read the XMLA format.

While all constraints are translated to relationships, currently in Power BI, only one relationship can be active at a time, whereas multiple primary and foreign key constraints can be defined for warehouse entities and are shown visually in the diagram lines. The active Power BI relationship is represented with a solid line and the rest is represented with a dotted line. We recommend choosing the primary relationship as active for BI reporting purposes.

Automatic translation of constraints to relationships in the default Power BI semantic model is only applicable for tables in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], not currently supported in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

> [!NOTE]
> Microsoft has renamed the Power BI *dataset* content type to *semantic model*. This applies to Microsoft Fabric as well. For more information, see New name for Power BI datasets.

## Data modeling properties

The following table provides a description of the properties available when using the model view diagram and creating relationships:

| **Column name** | **Description** |
|---|---|
| **FromObjectName** | Table/View name "From" which relationship is defined. |
| **ToObjectName** | Table/View name "To" which a relationship is defined. |
| **TypeOfRelationship** | Relationship cardinality, the possible values are: None, OneToOne, OneToMany, ManyToOne, and ManyToMany. |
| **SecurityFilteringBehavior** | Indicates how relationships influence filtering of data when evaluating row-level security expressions and is a Power BI specific semantic. The possible values are: OneDirection, BothDirections, and None. |
| **IsActive** | A Power BI specific semantic, and a boolean value that indicates whether the relationship is marked as Active or Inactive. This defines the default relationship behavior within the semantic model. |
| **RelyOnReferentialIntegrity** | A boolean value that indicates whether the relationship can rely on referential integrity or not. |
| **CrossFilteringBehavior** | Indicates how relationships influence filtering of data and is Power BI specific. The possible values are: 1 - OneDirection, 2 - BothDirections, and 3 - Automatic. |

## Add or remove objects to the default Power BI semantic model

In Power BI, a semantic model is always required before any reports can be built, so the default Power BI semantic model enables quick reporting capabilities on top of the warehouse. Within the warehouse, a user can add warehouse objects - tables or views to their default Power BI semantic model. They can also add other semantic modeling properties, such as hierarchies and descriptions. These properties are then used to create the Power BI semantic model's tables. Users can also remove objects from the default Power BI semantic model.

1. Open a warehouse in your Fabric workspace.
1. Navigate to **Model view** by selecting the **Model view** icon.

To add objects such as tables or views to the default Power BI semantic model, you have options:

- Manually enable the **Sync the default Power BI semantic model** setting that will automatically add objects to the semantic model. For more information, see [Sync the default Power BI semantic model](semantic-models.md#sync-the-default-power-bi-semantic-model).
- Manually add objects to the semantic model.

The auto detect experience determines any tables or views and opportunistically adds them.

The manually detect option in the ribbon allows fine grained control of which object(s), such as tables and/or views, should be added to the default Power BI semantic model:

- Select all
- Filter for tables or views
- Select specific objects

To remove objects, a user can use the manually select button in the ribbon and:

- Un-select all
- Filter for tables or views
- Un-select specific objects

> [!TIP]
> We recommend reviewing the objects enabled for BI and ensuring they have the correct logical relationships to ensure a smooth downstream reporting experience.

## Create a measure

A [measure](/power-bi/transform-model/desktop-measures) is a collection of standardized metrics. Similar to Power BI Desktop, the DAX editing experience in a warehouse presents a rich editor complete with autocomplete for formulas (IntelliSense). The DAX editor enables you to easily develop measures right in warehouse, making it a more effective single source for business logic, semantics, and business critical calculations.

1. To create a measure, select the **New Measure** button in the ribbon, as shown in the following image.

    :::image type="content" source="media/default-power-bi-semantic-model/table-explorer-ribbon.png" alt-text="Screenshot showing the table explorer and where the new measure button appears on the ribbon." lightbox="media/default-power-bi-semantic-model/table-explorer-ribbon.png":::

1. Enter the measure into the formula bar and specify the table and the column to which it applies. The formula bar lets you enter your measure. For detailed information on measures, see [Tutorial: Create your own measures in Power BI Desktop](/power-bi/transform-model/desktop-tutorial-create-measures).

1. You can expand the table to find the measure in the table.

## Hide elements from downstream reporting

You can hide elements of your warehouse from downstream reporting by right-clicking on the column or table you want to hide from the object explorer. 

Select **Hide** in **Report view** from the menu that appears to hide the item from downstream reporting.

:::image type="content" source="media/default-power-bi-semantic-model/hide-report-view-menu.png" alt-text="Screenshot showing where to find the hide option in the context menu.":::

You can also hide the entire table and individual columns by using the **Model view** canvas options, as shown in the following image.

:::image type="content" source="media/default-power-bi-semantic-model/model-view-canvas.png" alt-text="Screenshot showing the model view canvas options.":::

## Related content

- [Model data in the default Power BI semantic model in Microsoft Fabric](default-power-bi-semantic-model.md)
- [Default Power BI semantic models in Microsoft Fabric](semantic-models.md)
- [Create reports in the Power BI service in Microsoft Fabric and Power BI Desktop](reports-power-bi-service.md)
- [Share your warehouse and manage permissions](share-warehouse-manage-permissions.md)
