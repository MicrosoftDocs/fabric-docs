---
title: Bind Data (Preview)
description: Learn about the data binding process in ontology (preview).
ms.date: 09/21/2026
ms.topic: how-to
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
  * Time series data is in *columnar* format, meaning it appears in a table with a row for each timestamped observation. Columns contain time stamps and property values (like temperature or pressure).
  * Lakehouse tables conform to ontology (preview)'s data binding [limitations](#limitations-and-troubleshooting): They're **managed** and don't have column mapping enabled.

## Add data binding

1. You can start a data binding from either the Home configuration canvas or the **Configure** tab of the entity type details.

    On the Home configuration canvas, select **...** next to an entity type name to open its options menu and select **Bind data**.

    :::image type="content" source="media/how-to-bind-data/bind-data-canvas.png" alt-text="Screenshot of starting a data binding from the configuration canvas." lightbox="media/how-to-bind-data/bind-data-canvas.png":::

    On the **Configure** page, select **Manage property bindings** > **Add properties** or **Add binding and properties**. You can also select the **Add properties from data** button if the entity type has no properties yet.

    :::image type="content" source="media/how-to-bind-data/bind-data-add.png" alt-text="Screenshot of adding a new data binding to the entity type." lightbox="media/how-to-bind-data/bind-data-add.png":::

1. The **Property binding** page opens. Select **Add** to add a data source.

    :::image type="content" source="media/how-to-bind-data/add-data-source.png" alt-text="Screenshot of adding a data source." lightbox="media/how-to-bind-data/add-data-source.png":::

1. Select your data source table from the OneLake catalog.

    :::image type="content" source="media/how-to-bind-data/bind-data-select-table.png" alt-text="Screenshot of the data source selection." lightbox="media/how-to-bind-data/bind-data-select-table.png":::

1. The data source loads.

    :::image type="content" source="media/how-to-bind-data/data-source-loaded.png" alt-text="Screenshot of the data source after it is loaded." lightbox="media/how-to-bind-data/data-source-loaded.png":::

1. Select **Entity type properties** to see properties of the entity type. The columns from the source table automatically populate as proposed properties.

    :::image type="content" source="media/how-to-bind-data/entity-type-properties.png" alt-text="Screenshot of the populated properties." lightbox="media/how-to-bind-data/entity-type-properties.png":::

1. In the **Properties** section, add, rename, or delete properties as needed. Property names can match the source column names or be different. If you have existing properties defined on the entity type, you can select their names from the dropdown menu.

    Custom property names must be 1–26 characters, contain only alphanumeric characters, hyphens, and underscores, and start and end with an alphanumeric character. Property names must be unique across all entity types.

1. When you finish configuring properties, select **Create** to save the data binding. You see a banner confirming that **Entity type updated successfully**.

1. Close the property binding page by selecting **Cancel**. Closing the binding page returns you to the **Configure** page.

1. In the **Configure** page, verify the bindings by reviewing the properties in the **Properties** pane and confirming that they're bound to the correct data sources.

    :::image type="content" source="media/how-to-bind-data/bind-data-complete.png" alt-text="Screenshot of the data bindings in the Configure page." lightbox="media/how-to-bind-data/bind-data-complete.png":::

### Add more data bindings

Follow these steps to add more bindings after the first binding is created.

1. In the **Configure** page, expand **Manage property bindings** and select **Add binding and properties** again to reopen the binding configuration.

1. On the **Entity type properties** page, select **Add** and select your data table from the OneLake catalog. The system adds the new data source as a secondary data source.

1. The data source loads and asks you to define the relationship between the primary and secondary data source. Select the common column from each table that allows them to relate to each other. Select **Save** to save your progress.

    :::image type="content" source="media/how-to-bind-data/bind-data-time-series-relationship.png" alt-text="Screenshot of defining the data source relationship." lightbox="media/how-to-bind-data/bind-data-time-series-relationship.png":::

1. Select **Entity type properties**. The system automatically adds all the columns from the new table to the property list, where they appear alongside any properties that you added to the entity previously. If any columns exist in both source tables with the same name, the system adds a *_2* suffix to the default property names of the columns from the new data source. Make any changes as needed and **Save** the entity type when you're done.
1. Confirm that the entity type updated successfully, then select **Cancel** to close the configuration options.
1. Back in the **Configure** page, verify the new properties and their binding to the data source.

    :::image type="content" source="media/how-to-bind-data/bind-data-time-series-complete.png" alt-text="Screenshot of all the data bindings in the Configure page." lightbox="media/how-to-bind-data/bind-data-time-series-complete.png":::

## Edit or delete data binding

To edit or delete data bindings, start in the **Configure** page. Select **Manage property bindings** > **+ Add binding and properties**.

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

## Limitations and troubleshooting

Data binding has the following limitations:

* Ontology only supports **managed** lakehouse tables (located in the same OneLake directory as the lakehouse), not **external** tables that show in the lakehouse but reside in a different location.
* Changing the lakehouse table name after you create mappings might result in problems accessing data in the entity type details.
* The ontology graph doesn't support delta tables with column mapping enabled. You can enable column mapping manually, or the system enables it automatically on lakehouse tables where column names have certain special characters, including `,`, `;`, `{}`, `()`, `\n`, `\t`, `=`, and space. It also happens automatically on the delta tables that store data for import mode semantic model tables.
* Each entity type supports one **static** data binding. You can't combine static data from multiple sources for a single entity type.
    * You must use OneLake-backed sources for static data.
    * Entity types **do** support bindings from multiple **time series** sources. You can bind time series data from both eventhouse and lakehouse sources.

### Troubleshooting

For troubleshooting tips related to data binding, see [Troubleshoot ontology (preview)](resources-troubleshooting.md#troubleshoot-data-binding).
