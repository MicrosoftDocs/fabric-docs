---
title: Bind Data (Preview)
description: Learn about the data binding process in ontology (preview).
ms.date: 11/09/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Data binding in ontology (preview)

Data binding in ontology (preview) connects the schema of entity types, relationship types, and properties to concrete data sources that drive enterprise operations and analytics.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

By using data binding, you can:

* Integrate data into a semantic layer without copying source data
* Enrich entity types with up-to-date contextual information from batch and real-time sources
* Provide a semantic backbone for AI agents and automation to support reasoning, decision-making, and actions across the enterprise

## Prerequisites

Before binding data to your ontology, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Users can create ontology (preview) items** and **Users can create Fabric items** [enabled on your Fabric tenant](overview-tenant-settings.md).
* An ontology (preview) item with [entity types](how-to-bind-data.md) created.
* Data that you prepared according to these guidelines:
  * The data is organized and has gone through any necessary ETL required by your business. It contains all the information required to model it. For more information, see [Core concept: Data binding](overview.md#data-binding).
  * The data is in Microsoft Fabric. Supported sources include eventhouse, KQL database, lakehouse, mirrored database, semantic model, SQL database, or warehouse.
    * For semantic models, you need both [Read and Build permissions](/power-bi/connect-data/service-datasets-permissions#what-are-the-semantic-model-permissions) to bind the data to an ontology.
  
## Add data binding

1. You can start a data binding from either the Home configuration canvas or the **Configure** tab of the entity type details.

    On the Home configuration canvas, select **...** next to an entity type name to open its options menu and select **Bind data**.

    :::image type="content" source="media/how-to-bind-data/bind-data-canvas.png" alt-text="Screenshot of starting a data binding from the configuration canvas." lightbox="media/how-to-bind-data/bind-data-canvas.png":::

    On the **Configure** page, select **Bind data**. You can also select **Add properties from data** if the entity type has no properties yet.

    :::image type="content" source="media/how-to-bind-data/bind-data-add.png" alt-text="Screenshot of adding a new data binding to the entity type." lightbox="media/how-to-bind-data/bind-data-add.png":::

1. The **Bind data** page opens. Select the plus (**+**) button next to **Data sources**, and then select **OneLake catalog**.

    :::image type="content" source="media/how-to-bind-data/add-data-source.png" alt-text="Screenshot of adding a data source." lightbox="media/how-to-bind-data/add-data-source.png":::

1.  Select your data source table from the OneLake catalog, and then select **Select**. For a schema-enabled lakehouse, expand the lakehouse, **Schemas**, and the schema that contains your table.

    :::image type="content" source="media/how-to-bind-data/bind-data-select-table.png" alt-text="Screenshot of the data source selection." lightbox="media/how-to-bind-data/bind-data-select-table.png":::

1. The data source loads.

    :::image type="content" source="media/how-to-bind-data/data-source-loaded.png" alt-text="Screenshot of the data source after it is loaded." lightbox="media/how-to-bind-data/data-source-loaded.png":::

1. Select **Properties** under **Entity type**. The columns from the source table automatically populate as proposed properties on the **Bind data: Properties** page.

    :::image type="content" source="media/how-to-bind-data/entity-type-properties.png" alt-text="Screenshot of the populated properties." lightbox="media/how-to-bind-data/entity-type-properties.png":::

1. Add, rename, or delete properties as needed. Property names can match the source column names or be different. To reuse an existing property, select its name from the property name dropdown menu.

1. When you finish configuring properties, select **Create** to save the data binding and return to the **Configure** page.

1. In the **Configure** page, verify the bindings by reviewing the properties in the **Properties** pane and confirming that they're bound to the correct data sources.

    :::image type="content" source="media/how-to-bind-data/bind-data-complete.png" alt-text="Screenshot of the data bindings in the Configure page." lightbox="media/how-to-bind-data/bind-data-complete.png":::

### Add more data bindings

Follow these steps to add more bindings after the first binding is created.

1. On the **Configure** page, select **Bind data** to reopen the binding configuration.

1. Select the plus (**+**) button next to **Data sources**, and then select **OneLake catalog**. Choose your data table, and then select **Select**. The system adds the new data source as a secondary data source.

1. In **Relationship with primary data source**, select the common column from each table to link the secondary source to the primary source.

    :::image type="content" source="media/how-to-bind-data/bind-data-time-series-relationship.png" alt-text="Screenshot of defining the data source relationship." lightbox="media/how-to-bind-data/bind-data-time-series-relationship.png":::

1. Select **Properties** to review the proposed properties from the new source alongside the existing properties. Check the property names, source columns, and property types, and make any changes you need.

    :::image type="content" source="media/how-to-bind-data/bind-data-time-series-complete.png" alt-text="Screenshot of reviewing properties from primary and secondary data sources before saving." lightbox="media/how-to-bind-data/bind-data-time-series-complete.png":::

1. Select **Save**. On the **Configure** page, verify the properties and their data source bindings.

## Edit or delete data binding

To edit or delete data bindings, start on the **Configure** page and select **Bind data**.

:::image type="content" source="media/how-to-bind-data/manage-bindings.png" alt-text="Screenshot of the manage bindings options." lightbox="media/how-to-bind-data/manage-bindings.png":::

The configuration page reopens, where you can edit binding details or delete binding data sources.

[!INCLUDE [Refresh graph model](includes/refresh-graph-model.md)]

## Supported data source types

The following data source types support data binding in ontology (preview):

* Eventhouse
* KQL database
* Lakehouse
* Mirrored database
* Semantic model
* SQL database
* Warehouse

:::image type="content" source="media/how-to-bind-data/source-types.png" alt-text="Screenshot of the data source types in the OneLake catalog." lightbox="media/how-to-bind-data/source-types.png":::

[!INCLUDE [Supported property types](includes/supported-property-types.md)]
