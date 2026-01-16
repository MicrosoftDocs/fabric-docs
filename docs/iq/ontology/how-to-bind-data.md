---
title: Bind data
description: Learn about the data binding process in ontology (preview).
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 11/12/2025
ms.topic: how-to
---

# Data binding

Data binding in ontology (preview) connects the schema of entity types, relationship types, and properties to concrete data sources that drive enterprise operations and analytics.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

By using data binding, you can:

* Seamlessly integrate data into a semantic layer without copying source data
* Enrich entity types with up-to-date, contextually relevant information from batch and real-time sources
* Provide a semantic backbone for AI agents and automation, supporting reasoning, decision-making, and actions across the enterprise

## Prerequisites

Before binding data to your ontology, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** [enabled on your Fabric tenant](overview-tenant-settings.md#ontology-item-preview).
* An ontology (preview) item with [entity types](how-to-create-entity-types.md) created.
* Data that you prepared according to these guidelines:
    * The data is in Microsoft Fabric, in [OneLake](../../onelake/onelake-overview.md) or an [eventhouse](../../real-time-intelligence/eventhouse.md).
    * The data is organized, and has gone through any necessary ETL required by your business.
    * Time series data is in *columnar* format, meaning it's represented in a table with a row for each timestamped observation. Columns contain time stamps and property values (like temperature or pressure).
    * The data contains all required information for it to be modeled. For more information, see [Core concept: Data binding](overview.md#data-binding).

## Key concepts

Data binding uses the following ontology (preview) concepts. For definitions of these terms, see the [Ontology (preview) glossary](resources-glossary.md).

* *Entity type*
* *Entity type key*
* *Entity instance*
* *Property*

## How-to steps

This section contains step-by-step instructions for adding and managing data bindings.

[!INCLUDE [refresh-graph-model](includes/refresh-graph-model.md)]

### Add static data

First, bind static data. Create static data bindings before creating time series data bindings.

1. Select the entity to which you want to bind data in the **Entity Types** pane. This selection opens the **Entity type configuration** pane for the entity type. In the **Bindings** tab, select **Add data to entity type**.

    :::image type="content" source="media/how-to-bind-data/bind-data-1.png" alt-text="Screenshot of the data binding tab in the entity type configuration.":::

1. The data source selection appears. Select a OneLake data source that contains the data to be bound to the entity. Select **Connect**.

    When the data source loads, choose a specific table from the data source to use as the data binding source table. Select **Next**.

    :::image type="content" source="media/how-to-bind-data/bind-data-2.png" alt-text="Screenshot of the source selection screen for lakehouse or eventhouse.":::

1. For the **Binding type**, select **Static**. Select only one type per data binding. An example of static data is a table with descriptive attributes about stores, like the store ID value, square footage, and location. 

1. Under **Bind your properties**, select the source columns from the source table that you want to model on your entity type. Then, enter a name for each property that shows on the entity type. The name can be the same as the source column name or something different.

    >[!NOTE] 
    >Custom property names must be 1–26 characters, contain only alphanumeric characters, hyphens, and underscores, and start and end with an alphanumeric character. Property names must be unique across all entity types.

    :::image type="content" source="media/how-to-bind-data/bind-data-3.png" alt-text="Screenshot of the property screen in data binding." lightbox="media/how-to-bind-data/bind-data-3.png":::

    If you already [created properties](how-to-create-entity-types.md#create-an-entity-type) on your entity type, you can select their names in the **Property name** column to map data to them. When you select an existing property name, the **Source column** options are grouped into two sections: Available and Unavailable. Available columns are columns in your source table that match the declared data type of the property you're trying to match. Unavailable columns are ones that don't match the type, so they can't be bound to that property.

    :::image type="content" source="media/how-to-bind-data/bind-data-3-availability.png" alt-text="Screenshot of available and unavailable properties during data binding.":::

1. Select **Save** to save your static data binding.

1. You see a summary of your data bindings in the **Bindings** tab, and a summary of properties (including properties added during data binding) in the **Properties** tab.

    :::image type="content" source="media/how-to-bind-data/tab-bindings.png" alt-text="Screenshot of the data bindings tab.":::  
    
    :::image type="content" source="media/how-to-bind-data/tab-properties.png" alt-text="Screenshot of the entity type properties tab.":::

1. Next, set the **Key**. The entity type key value represents a unique identifier for each record of ingested data.

    String and integer columns from your source data are available to select as the entity type key. Together, the columns you select uniquely identify a record.

    :::image type="content" source="media/how-to-bind-data/entity-type-key.png" alt-text="Screenshot of adding an entity type key.":::

    This process is done once for each entity type.

1. Optionally, select a property modeled on your entity type to use as the **Instance display name**. This step provides a friendly name for entity instances in downstream experiences.

### Add time series data

>[!IMPORTANT]
> Before you bind time series data to an entity type, make sure your static data binding is complete. The entity type must have at least one property with static data bound to it that you can use as the key to contextualize your time series data. This static data must exactly match a column in your time series data.

1. Follow the steps described earlier for [static data](#add-static-data) to start adding data to the entity type and select your data source. You can select a source from OneLake or Eventhouse.
1. For the **Binding type**, select **Timeseries**. Select the **Source data timestamp column** that contains the timestamp values.
1. Under **Bind your properties**, you see a **Static** section and a **Timeseries** section.

    In the **Static** section, bind source columns to the properties that are defined as the entity type key. If you need to update the key, you can add more static data now by selecting **+ Add static property**.

    In the **Timeseries** section, continue defining properties by selecting source columns and entering names for each one.

    :::image type="content" source="media/how-to-bind-data/bind-data-time-series.png" alt-text="Screenshot of the time series property configuration page." lightbox="media/how-to-bind-data/bind-data-time-series.png":::

### Edit or delete data binding

You can edit or delete data bindings in the **Entity type configuration** pane, in the **Bindings** tab.

Next to the data binding name, select **...** to open its options. From there, you can edit properties or delete the data binding.

:::image type="content" source="media/how-to-bind-data/edit-delete-binding.png" alt-text="Screenshot of the options in the data binding tab.":::

## Limitations

Data binding has the following limitations:

* You can't use lakehouses with OneLake security enabled as data sources for bindings. If a lakehouse has OneLake security enabled, you can't use it as a data source in ontology.
* Ontology only supports **managed** lakehouse tables (located in the same OneLake directory as the lakehouse), not **external** tables that show in the lakehouse but reside in a different location. 
* Changing the lakehouse table name after mappings are created may result in problems accessing data in the preview experience.
* The ontology graph does not support delta tables with column mapping enabled. Column mapping can be enabled manually, or is enabled automatically on lakehouse tables where column names have certain special characters, including `,`, `;`, `{}`, `()`, `\n`, `\t`, `=`, and space. It also happens automatically on the delta tables that store data for import mode semantic model tables.
* Each entity type supports one **static** data binding. You can't combine static data from multiple sources for a single entity type. 
    * You must use OneLake-backed sources for static data.
    * Entity types **do** support bindings from multiple **time series** sources. You can bind time series data from both eventhouse and lakehouse sources.

### Troubleshooting

For troubleshooting tips related to data binding, see [Troubleshoot ontology (preview)](resources-troubleshooting.md#troubleshoot-data-binding).
