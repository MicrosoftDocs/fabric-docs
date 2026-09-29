---
title: Ontology (Preview) Glossary
description: This article defines key ontology (preview) terminology.
ms.date: 09/15/2026
ms.topic: concept-article
---

# Ontology (preview) glossary

This article defines key ontology (preview) terminology, organized conceptually.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

| Term | Definition |
| --- | --- |
| *Entity type* | An abstract representation of a business object (like *Vehicle* or *Sensor*). It defines a logical model of an item. |
| *Entity type key* | A unique identifier for each instance of an entity type within your ontology. You create this value from static data bound to one or more properties modeled on your entity type. You can use only string and integer properties as keys. |
| *Entity instance* | A specific occurrence of an entity type, representing a real-world object with its own unique values for the defined properties. For example, if *Vehicle* is an entity type, then a particular car with its own VIN, make, and model is an entity instance. |
| *Relationship type* | A definition that specifies how two entity types connect (such as *located_at* or *monitored_by*). <br><br>You can define a relationship type without [binding data](how-to-bind-data.md) to it. If you don't bind data, the relationship type isn't visualized in the [entity type details](how-to-view-ontology-details.md#view-entity-type-details). |
| *Relationship instance* | A specific occurrence of a relationship type between two entity instances. |
| *Property* | An attribute of an entity, like *ID*, *temperature*, or *location*. You can create properties manually or from data through data binding. <br><br>You can bind properties to static or time series data. Static data doesn't change over time, and represents fixed characteristics about the entity type (like *ID*). Time series data contains attributes whose values vary over time (like *temperature* and *location*). <br><br>You can duplicate property names across entities only for properties of the same type. For example, you can't have one entity type with a string `ID` property and another entity type with an integer `ID` property, but you can have two entity types that both have a string `ID` property. |
| *Data binding* | The process that connects the schema of entity types, relationship types, and properties to concrete data sources that drive enterprise operations and analytics. |
| *Metadata* | Optional structured metadata that you can add to entity types, properties, and relationships to improve discoverability and agent understanding. Metadata might include descriptions, synonyms, and custom key-value attributes. |
| *Metrics* | DAX measures imported from a Power BI semantic model that appear under the corresponding ontology entities. A metric keeps a link to its source semantic model and retrieves the original DAX expression on demand. |
| *Configuration canvas* | The main view in the ontology (preview) item where you create and manage your ontology's entity types, relationship types, properties, and data bindings. |
| *Ontology agent* | An AI-powered Copilot that uses a chat interface and natural language to help you create and operate ontologies over data in your Microsoft Fabric workspace. |
| *Entity type details* | The view in the ontology (preview) item where you can view and explore your instantiated ontology data. The experience includes basic data previews, instance data, and a **Ontology (preview) item** view. |
| *[Graph in Microsoft Fabric](../../graph/overview.md)* | A Fabric item that offers native graph storage and compute for nodes, edges, and traversals over connected data. It's good for path finding, dependency analysis, and graph algorithms. When you create an ontology item, Fabric automatically creates a managed graph item. That graph integrates into ontology's [entity type details](how-to-view-ontology-details.md#view-entity-type-details), and you can access it independently in the Fabric workspace that contains the ontology item. |
| *[Power BI semantic model in Fabric](../../data-warehouse/semantic-models.md)* | A logical description of an analytical domain (like a business). It holds information about your data and the relationships among that data. One way to create an ontology is to [generate it directly from one or multiple semantic models](how-to-generate-from-semantic-models.md). |
| *Business rule* | A description of a natural-language business requirement that you can link to entity types, properties, and relationship types. Ontology consumers, including AI agents, can use rules to ground their responses. |
