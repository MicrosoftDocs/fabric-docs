---
title: Bind data
description: Learn about the data binding process in ontology (preview).
ms.date: 04/21/2026
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
* **Ontology item (preview)** [enabled on your Fabric tenant](overview-tenant-settings.md#ontology-item-preview).
* An ontology (preview) item with [entity types](how-to-bind-data.md) created.
* Data that you prepared according to these guidelines:
    * The data is organized, and has gone through any necessary ETL required by your business.
    * The data contains all required information for it to be modeled. For more information, see [Core concept: Data binding](overview.md#data-binding).
    * The data is in Microsoft Fabric—static data in [OneLake](../../onelake/onelake-overview.md), time series data in OneLake or an [eventhouse](../../real-time-intelligence/eventhouse.md).
    * Time series data is in *columnar* format, meaning it's represented in a table with a row for each timestamped observation. Columns contain time stamps and property values (like temperature or pressure).
    * Lakehouse tables conform to ontology (preview)'s data binding [limitations](#limitations-and-troubleshooting): They are **managed**, do not have OneLake security enabled, and do not have column mapping enabled.

## Key concepts

Data binding uses the following ontology (preview) concepts. For definitions of these terms, see the [Ontology (preview) glossary](resources-glossary.md).

* *Entity type*
* *Entity type key*
* *Entity instance*
* *Property*

## Add static data

First, bind static data to entity types in your ontology (preview) item. This non-timeseries binding defines the unique entity type instances.

1. From the Home configuration canvas, select the entity type name in the **Explorer** and select **View entity type details** from the top ribbon.

    :::image type="content" source="media/how-to-bind-data/view-entity-type-details.png" alt-text="Screenshot of the View Entity Type details button." lightbox="media/how-to-bind-data/view-entity-type-details.png":::

1. The **Configure** page opens. This page surfaces important information about the entity type, including its properties and data bindings. Add a new binding by selecting **Manage property bindings > Add binding and properties**, or **Add properties from data** in the **Properties** pane if the entity type has no properties yet.

    :::image type="content" source="media/how-to-bind-data/bind-data-1.png" alt-text="Screenshot of adding a new data binding to the entity type." lightbox="media/how-to-bind-data/bind-data-1.png":::

1. On the binding page, select **Add data binding** and choose the type of OneLake data source that contains the data for the entity.

    :::image type="content" source="media/how-to-bind-data/bind-data-2.png" alt-text="Screenshot of the data binding page and data source selection.":::

1. Choose your data source and table from the OneLake catalog.

    :::image type="content" source="media/how-to-bind-data/bind-data-3.png" alt-text="Screenshot of the data source selection." lightbox="media/how-to-bind-data/bind-data-3.png":::

1. Fields from the source table populate the data binding configuration. Observe the sections of the configuration page:
    * **Entity type key**: Identifies the field (or fields) that can be used to uniquely identify each record of ingested data.
    * **Binding selection**: Identifies the source table that holds the data for the binding.
    * **Entity type key mapping**: Identifies the column(s) in the source data table that maps to the entity type key property. You can select string and integer columns from your source data as the entity type key. Together, the columns you select uniquely identify a record.
    * **Properties**: Lists the columns from the source data and corresponding properties on the entity type. The **Source column** side populates automatically with the columns from the table, and the **Property name** side lists their corresponding property names on the entity type within ontology. 

    :::image type="content" source="media/how-to-bind-data/bind-data-4.png" alt-text="Screenshot of the configuration." lightbox="media/how-to-bind-data/bind-data-4.png":::

1. In the **Properties** section, add, rename, or delete properties as needed. Property names can match the source column names or be different. If you have existing properties defined on the entity type, you can select their names from the dropdown menu.

    Custom property names must be 1–26 characters, contain only alphanumeric characters, hyphens, and underscores, and start and end with an alphanumeric character. Property names must be unique across all entity types.

1. Select **Define entity type key** at the top of the configuration. Select the property or set of properties that uniquely identifies each record in your data and **Save**.

    :::image type="content" source="media/how-to-bind-data/bind-data-5-key.png" alt-text="Screenshot of adding an entity type key." lightbox="media/how-to-bind-data/bind-data-5-key.png":::

1. Select **Save** to save your static data binding. You see a confirmation message indicating that the entity type was updated successfully.
1. From here, you can continue on to [add a time series binding](#add-time-series-data-after-binding-static-data) on this page, or you can close the binding page by selecting **Cancel**. Closing the binding page returns you to the **Configure** page.

1. In the **Configure** page, verify the bindings by reviewing the properties in the **Properties** pane and confirming that they're bound to the correct data sources.

    :::image type="content" source="media/how-to-bind-data/bind-data-6.png" alt-text="Screenshot of the data bindings in the Configure page." lightbox="media/how-to-bind-data/bind-data-6.png":::

1. Optionally, select a property modeled on your entity type to use as the **display name**. This step provides a friendly name for entity instances in downstream experiences.

    :::image type="content" source="media/how-to-bind-data/display-name.png" alt-text="Screenshot of the option to choose a property as a display name." lightbox="media/how-to-bind-data/display-name.png":::

## Add time series data (after binding static data)

Next, bind time series data to entity types in your ontology (preview) item.

>[!IMPORTANT]
> Before you bind time series data to an entity type, make sure your static data binding is complete. The entity type must have at least one property with static data bound to it that you can use as the key to contextualize your time series data. This static data must exactly match a column in your time series data.

1. In the **Configure** page, expand **Manage property bindings** and select **Add binding and properties** again to reopen the binding configuration.

    >[!TIP]
    >Though this article shows adding static and time series data in separate visits to the configuration page, you could also bind all the data in the first visit to this configuration page, as long as you complete the static binding before the time series one.

1. On the binding page, select **Add data binding** and choose the type of OneLake data source that contains the time series data for the entity. Choose your data source and table from the OneLake catalog and select **Add**.

1. A **Timeseries data** section appears in the configuration. Select the source data **Timestamp column** that contains the timestamp values.

    :::image type="content" source="media/how-to-bind-data/bind-data-time-series-1.png" alt-text="Screenshot of selecting the timestamp column." lightbox="media/how-to-bind-data/bind-data-time-series-1.png":::

1. In the **Properties** section, add, rename, or delete properties as needed. 
1. **Save** the data binding. Confirm that the entity type updated successfully, then select **Cancel** to close the configuration options.
1. Back in the **Configure** page, verify the new properties and their binding to thedata source.

    :::image type="content" source="media/how-to-bind-data/bind-data-time-series-2.png" alt-text="Screenshot of all the data bindings in the Configure page." lightbox="media/how-to-bind-data/bind-data-time-series-2.png":::

## Edit or delete data binding

To edit or delete data bindings, start in the **Configure** page. Select **Manage property bindings > Manage bindings**.

:::image type="content" source="media/how-to-bind-data/manage-bindings.png" alt-text="Screenshot of the manage bindings options." lightbox="media/how-to-bind-data/manage-bindings.png":::

The configuration page reopens, where you can edit binding details or delete binding data sources.

[!INCLUDE [refresh-graph-model](includes/refresh-graph-model.md)]

[!INCLUDE [supported property types](includes/supported-property-types.md)]

## Limitations and troubleshooting

Data binding has the following limitations:

* You can't use lakehouses with OneLake security enabled as data sources for bindings. If a lakehouse has OneLake security enabled, you can't use it as a data source in ontology.
* Ontology only supports **managed** lakehouse tables (located in the same OneLake directory as the lakehouse), not **external** tables that show in the lakehouse but reside in a different location. 
* Changing the lakehouse table name after mappings are created may result in problems accessing data in the entity type details.
* The ontology graph does not support delta tables with column mapping enabled. Column mapping can be enabled manually, or is enabled automatically on lakehouse tables where column names have certain special characters, including `,`, `;`, `{}`, `()`, `\n`, `\t`, `=`, and space. It also happens automatically on the delta tables that store data for import mode semantic model tables.
* Each entity type supports one **static** data binding. You can't combine static data from multiple sources for a single entity type. 
    * You must use OneLake-backed sources for static data.
    * Entity types **do** support bindings from multiple **time series** sources. You can bind time series data from both eventhouse and lakehouse sources.

### Troubleshooting

For troubleshooting tips related to data binding, see [Troubleshoot ontology (preview)](resources-troubleshooting.md#troubleshoot-data-binding).


