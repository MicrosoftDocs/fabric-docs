---
title: Mapping data to entity types
description: Understand the mapping feature in digital twin builder (preview).
author: baanders
ms.author: baanders
ms.date: 07/28/2025
ms.topic: concept-article
---

# Mapping data to entity types in digital twin builder (preview)

The *mapping* feature within digital twin builder (preview) allows users to begin creating an ontology with semantically rich entity types, and hydrate its instances with data from various source systems in a simplified manner.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

With mapping, you can:
* Build your ontology by creating semantically rich entity types
* Map data from various systems through a Fabric lakehouse to entity instances modeled by the entity types from your ontology
* Link and contextualize time series data directly to your entity instances
* Enable a unified semantic layer

>[!TIP]
> Before you begin mapping your data, read [Modeling](concept-modeling.md) to understand how data modeling works in digital twin builder.

## Mapping features

Here are the key concepts for mapping in digital twin builder (preview).

* *Mapping*: Mapping in digital twin builder creates the entity type that models entity instances, and hydrates instances of that entity type with data from your Fabric lakehouse. When configuring a mapping, you must select a source table and the property type of the data you're bringing. Depending on the property type you select, you need to set certain configuration details. Mappings can be edited, deleted, and scheduled. Each mapping has its own card in the **Mappings** tab of the entity configuration pane, and an associated schedule that's visible from the **Scheduling** tab.

    :::image type="content" source="media/concept-mapping/mappings-scheduling-tab.png" alt-text="Screenshot of the Mappings tab." lightbox="media/concept-mapping/mappings-scheduling-tab.png":::

* *Semantic canvas*: The semantic canvas is the main view in digital twin builder (preview) where you can create your ontology. For more information, see [Using the semantic canvas in digital twin builder (preview)](concept-semantic-canvas.md).

* *Non-time series properties*: Non-time series properties are static or slow-moving attributes found in your source data, like `manufacturerId` or `assetId`. At least one non-time series property must be mapped before you can map time series properties.

    * *Unique identifier (ID)*: A unique identifier is a combination of one or more columns from your source data that can distinctively identify each record of ingested data. This identifier is utilized internally within digital twin builder for change tracking and accurate identification of records requiring updates. It's only required for non-time series mappings.

* *Time series properties*: Time series properties are specific measurements or observations recorded with a timestamp over an interval of time. These columns usually contain numerical values corresponding to the property being tracked over time.

    * *Time series link property*: A time series link property is one column from your time series data whose values **exactly match** a property type that was defined in the entity type. It can be used to contextualize your time series data with your existing entity instance data.

    * *Incremental processing*: Incremental processing maps data incrementally as it becomes available. This approach helps save processing time and improve overall workflow efficiency. This option is recommended for time series data.

* *Digital twin builder flow*: Digital twin builder flow items can be used to schedule and view operations within digital twin builder, including mappings and contextualization jobs, both independently and in groups. To view all digital twin builder flows, select the **Manage operations** button in the semantic canvas ribbon. For more information about digital twin builder flow items, see [Digital twin builder (preview) flow](concept-flows.md).

* *Filter*: A filter can be applied to a source table while mapping to select a subset of rows from the source table to map to the entity instance, based on specified column criteria. The following operators are available: 
    * *Is greater than or equal to (>=)*
    * *Is less than or equal to (<=)*
    * *Is greater than (>)*
    * *Is less than (<)*
    * *Is equal to (=)*
    * *Is not equal to (≠)*
    * *Contains*
    * *Does not contain*
    * *Is empty*
    * *Is not empty*

    Depending on the data type of the selected column, a subset of operators are available for use. Multiple filtering conditions can be applied using *and/or* relationships between conditions. Conditions are case sensitive, and time-based columns are treated as strings.

## About the mapping process

Mapping allows you to add an entity type to your digital twin builder (preview) ontology and hydrate instances of it with data. Here are the steps involved in this process:

1. Create an entity type. In this step, you create an entity type from either the *Generic* entity type, or one of the provided [system types](#system-types). Add a name to the entity type that fits your use case.

    >[!TIP]
    > Entity type names must be 1–26 characters, contain only alphanumeric characters, hyphens, and underscores, and start and end with an alphanumeric character.

1. Map and model data for this entity type. In this step, you define how data maps from a Fabric lakehouse to properties on the instances of this entity type. If you're creating an entity type for the first time, the columns mapped from your source table become modeled properties on your entity instances after a mapping is saved or run. If your entity type already has properties, you can hydrate the entity instances with data from a source table.

    >[!NOTE]
    > Decimal type precision in the source data isn't perfectly conserved when the data's imported into digital twin builder.

1. (Optional) Define time series properties in the entity type, and link time series data to the entity instances. If you have time series data to link to your entity instances, you can directly map that time series data to the entity instance and digital twin builder contextualizes it with the rest of the entity instance's data. Your time series data is modeled as time series properties on your entity type.

    >[!IMPORTANT]
    >Before mapping your time series data, make sure that you modeled at least one non-time series property that exactly matches a column in your time series data. 

During mapping, here are the actions that are supported and not supported.

| Component | Supported actions | Unsupported actions |
|---|---|---|
| Entity types | - Create an entity type | - Rename an entity type after data is mapped |
| Properties | - Create non-time series and time series properties<br>- Map a source column to a property<br>- Unmap a source column from a property <br>- Filter your source table during mapping | - Delete a modeled property<br> - Rename a modeled property<br> - Map a source column of a different data type than originally defined |

## System types

*System types* are predefined entity types that you can select when defining your entity type in order to quickly associate it with a set of relevant properties. When you don't have specific models you want to import or create, system types offer built-in options that are automatically included with digital twin builder (preview).

System type options range across a series of concepts with built-in properties common to objects of this type. These properties are optional and can be extended with your own custom properties if needed. System types are a quick way to get started in building out ontological concepts, easing the challenge of conceptualizing an initial flow of how a system might function.

System types allow you to get building faster by providing built-in properties to help you define models and map data, and providing a base set of common ontological models to build out your digital twins.

### System type list 

The following table shows the system types available in digital twin builder (preview), along with a basic description and some examples for each.

| Concept | Built-in properties | Description | Examples |
|---|---|---|---|
| Equipment | - `DisplayName`: The name of the equipment <br>- `SerialNumber`: A serial number related to the equipment <br>- `Manufacturer`: The model and manufacturer of the equipment | A physical piece of equipment, typically used as part of a process or system to fulfill a role. | - Cutting machine <br>- Screwdriver <br>- Truck <br>- Pump | 
| Material | - `DisplayName`: The name of the material <br>- `Type`: Specifies what kind of material | Individual objects used as reagents and typically refined into products. | - Steel <br>- Raw ore (to be used) <br>- Water <br>- Hydrogen | 
| Sensor | - `DisplayName`: The name of the sensor <br>- `Type`: Specifies what kind of sensor <br>- `Frequency`: Specifies how often this measurement is taken | A reader that collects measurement associated with another entity type (like equipment) | - Lat/Long <br>- Temperature <br>- Pressure |
| Process | - `DisplayName`: The name of the process <br>- `Type`: Specifies what kind of process | An act of doing something. | - Boiling water <br>- Assembling a product with the help of equipment <br>- Producing an item <br>- Booking an appointment <br>- Buying an item |
| Product | - `DisplayName`: The name of the product <br>- `SKU`: A unique identifier or product number related to the product. | A manufactured good, normally the final product of a process, using materials created from equipment. | - Tissue paper <br>- Raw ore (to be sold) <br>- Manufactured widgets |
| Site | - `DisplayName`: The name of the site <br>- `Location`: A locale of the site | A location or place, normally housing physical objects such as equipment, materials, and products. | - A factory building <br>- An office in a building <br>- 47°38'31"N 122°07'38"W |
| System | - `DisplayName`: The name of the system <br>- `Type`: Specifies what kind of system | A collection of objects, such as equipment, that can form a singular system. | - A train, made up of locomotives and cars <br>- A computer system, made up of a motherboard, CPU, RAM, and case |

### Choosing a system type

System types are accessible when [creating a new entity type](model-manage-mappings.md#create-an-entity-type) in digital twin builder (preview).

While adding an entity type, you see a dialogue with the *Generic* type and a list of the other system types.  

:::image type="content" source="media/concept-mapping/system-types-list.png" alt-text="Screenshot of the system types list.":::

### Mapping data with a system type

After an entity type is created using a system type, it's accessible from the semantic canvas for mapping. The mapping process is the same whether you're using a system type or a generic entity type, except that system types have more built-in properties available for use within the mapping step.

:::image type="content" source="media/concept-mapping/system-types-properties.png" alt-text="Screenshot of the entity type with a system type." lightbox="media/concept-mapping/system-types-properties.png":::

## Example ontology 

By building out entity types with mapping and relationship types, you can create a series of ontological links like the ones in the following example. 

:::image type="content" source="media/concept-mapping/example.png" alt-text="Screenshot of an example ontology." lightbox="media/concept-mapping/example-zoom.png":::

The semantic canvas contains three system types: Process, Equipment, and Sensor. They're related as follows:
* The Equipment entity type has a relationship type of *hasProcess* that points to the relevant Process. 
* The Equipment entity type shares a *hasSensor* relationship type with the Sensor. 

This scenario represents a basic ontological map of a process, involving a single piece of equipment and a sensor attached to this equipment. 

## Related content

* [Modeling data in digital twin builder (preview)](concept-modeling.md)
* [Manage entity types and mapping](model-manage-mappings.md)