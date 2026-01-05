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

This article defines key ontology (preview) terminology. The list is alphabetically organized.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

| Term | Definition |
| --- | --- |
| *Data binding* | The process that connects the schema of entity types, relationship types, and properties to concrete data sources that drive enterprise operations and analytics. |
| *Entity instance* | A specific occurrence of an entity type, representing a real-world object with its own unique values for the defined properties. For example, if *Vehicle* is an entity type, then a particular car with its own VIN, make, and model is an entity instance. |
| *Entity type* | An abstract representation of a business object (like *Vehicle* or *Sensor*). It defines a logical model of an item. |
| *Entity type key* | A unique identifier for each instance of an entity type within your ontology. This value is created from static data bound to one or more properties modeled on your entity type. <br><br>*NOTE: Due to a [known issue](https://support.fabric.microsoft.com/known-issues/?product=IQ&issueId=1615), only strings or integers should be currently used as entity type keys.* |
| *[Graph in Microsoft Fabric](../../graph/overview.md)* | A Fabric item that offers native graph storage and compute for nodes, edges, and traversals over connected data. It's good for path finding, dependency analysis, and graph algorithms. Graph in Microsoft Fabric is integrated into ontology's [preview experience](how-to-use-preview-experience.md). |
| *Property* | An attribute of an entity, like *ID*, *temperature* or *location*. Properties can be created manually or from data through data binding. <br><br>Properties can be bound to static or time series data. Static data doesn't change over time, and represents fixed characteristics about the entity type (like *ID*). Time series data contains attributes whose values vary over time (like *temperature* and *location*). |
| *Relationship instance* | A specific occurrence of a relationship type between two entity instances. |
| *Relationship type* | A definition that specifies how two entity types are connected (such as *located_at* or *monitored_by*). <br><br>You can define a relationship type without [binding data](how-to-bind-data.md) to it. If you don't bind data, the relationship type isn't visualized in the [preview experience](how-to-use-preview-experience.md). |