---
title: Ontology (preview) glossary
description: This article defines key ontology (preview) terminology.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 01/05/2025
ms.topic: concept-article
---

# Ontology (preview) glossary

This article defines key ontology (preview) terminology. The terms are organized conceptually.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

| Term | Definition |
| --- | --- | 
| *Entity type* | An abstract representation of a business object (like *Vehicle* or *Sensor*). It defines a logical model of an item. |
| *Entity type key* | A unique identifier for each instance of an entity type within your ontology. You create this value from static data bound to one or more properties modeled on your entity type. Only string and integer properties can be used as keys. |
| *Entity instance* | A specific occurrence of an entity type, representing a real-world object with its own unique values for the defined properties. For example, if *Vehicle* is an entity type, then a particular car with its own VIN, make, and model is an entity instance. |
| *Relationship type* | A definition that specifies how two entity types are connected (such as *located_at* or *monitored_by*). <br><br>You can define a relationship type without [binding data](how-to-bind-data.md) to it. If you don't bind data, the relationship type isn't visualized in the [preview experience](how-to-use-preview-experience.md). |
| *Relationship instance* | A specific occurrence of a relationship type between two entity instances. |
| *Property* | An attribute of an entity, like *ID*, *temperature*, or *location*. You can create properties manually or from data through data binding. <br><br>You can bind properties to static or time series data. Static data doesn't change over time, and represents fixed characteristics about the entity type (like *ID*). Time series data contains attributes whose values vary over time (like *temperature* and *location*). <br><br>Property names can only be duplicated across entities for properties of the same type. For example, you can't have one entity type with a string `ID` property and another entity type with an integer `ID` property, but you can have two entity types that both have a string `ID` property. |
| *Data binding* | The process that connects the schema of entity types, relationship types, and properties to concrete data sources that drive enterprise operations and analytics. |
| *Configuration canvas* | The main view in the ontology (preview) item where you create and manage your ontology's entity types, relationship types, properties, and data bindings. |
| *Preview experience* | The view in the ontology (preview) item where you can view and explore your instantiated ontology data. The experience includes basic data previews, instance data, and a graph view. |
| *[Graph in Microsoft Fabric](../../graph/overview.md)* | A Fabric item that offers native graph storage and compute for nodes, edges, and traversals over connected data. It's good for path finding, dependency analysis, and graph algorithms. When you create an ontology item, a managed Graph item is created automatically. That Graph is integrated into ontology's [preview experience](how-to-use-preview-experience.md) and can be accessed independently in the Fabric workspace where the ontology item is located. |
| *[Power BI semantic model in Fabric](../../data-warehouse/semantic-models.md)* | A logical description of an analytical domain (like a business). They hold information about your data and the relationships among that data. You can create them from lakehouse tables, and you can [generate an ontology](concepts-generate.md) directly from your data in a semantic model. |
