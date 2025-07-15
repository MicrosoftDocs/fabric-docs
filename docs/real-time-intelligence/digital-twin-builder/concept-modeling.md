---
title: Modeling data in digital twin builder (preview)
description: Understand how data modeling works in digital twin builder (preview).
author: baanders
ms.author: baanders
ms.date: 06/27/2025
ms.topic: concept-article
---

# Modeling data in digital twin builder (preview)

*Modeling* is the practice of creating structured representations of real-world systems or domains to better understand, analyze, and work with complex information. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

In the context of data and knowledge management, an *ontology* is a formal model that defines a set of concepts, entity types, properties, and relationship types within a specific domain, creating a shared vocabulary and framework for organizing information. Ontologies go beyond simple data structures by embedding semantic meaning into the data, enabling a deeper understanding of how different pieces of information relate to one another.

Modeling with ontologies is especially valuable for industrial scenarios, where data comes from multiple interconnected sources such as equipment, control systems, and business applications. Ontology-based modeling allows companies to create a standardized view of all relevant entity types (like machinery, materials, or processes) and their relationship types, ensuring consistency and interoperability across systems. For example, in a manufacturing plant, an ontology can help unify data from IoT sensors, production systems, and maintenance logs. This process makes it easier to analyze performance, predict maintenance needs, or optimize resource usage. Ontology-based modeling captures the complexity of industrial environments in a structured, interpretable model. This model supports smarter decision-making, efficient operations, and adaptability, driving value in complex industrial ecosystems.

There are two main categories of ontology:

* *Upper ontology*: A high-level, abstract framework of fundamental concepts that provides a common vocabulary to support interoperability across various domains
* *Domain ontology*: A detailed, specific model that captures the concepts, relationships, and rules unique to a particular field or area of expertise

Digital twin builder ontologies span both of these concepts.

## Concepts

The key metamodel constructs in a digital twin builder (preview) item are *namespace*, *entity type*, *entity instance*, *property*, *relationship type*, and *relationship instance*, and they provide a flexible foundation for building rich, useful ontologies for specific business needs. These constructs are the core elements of an ontology, helping users consistently define and represent complex knowledge. With these capabilities, you can create standard representations of concepts and meaningful connections between them, which is essential for developing data models that are interoperable, scalable, and adaptable in industrial applications.

Here are the construct descriptions in more detail:
* *Namespace*: A namespace is a grouping with a unique identifier, used to organize and distinguish sets of entity types, properties, and relationship types within an ontology. It helps avoid conflicts by ensuring that elements with the same name but in different contexts remain distinct. Namespaces are useful for managing large or multi-domain ontologies where consistent identification is crucial.
* *Entity type*: An entity type is a category that defines a concept within an ontology (including upper ontologies and domain ontologies). It serves as a blueprint for individual entity instances of that type, and specifies common characteristics shared across all entity instances within that category. Some examples of entity types are *Equipment* and *Process* (from an upper ontology), and *Centrifugal Pump* and *Distillation Process* (from a domain ontology).
    * In digital twin builder, you can select one of the predefined *system types*, or define your own entity types. For more information about system types, see [Mapping data to entity types in digital twin builder (preview) - System types](concept-mapping.md#system-types).
* *Entity instance*: An entity instance is a unique, identifiable object of an entity type, representing a specific object within the domain. For instance, if *Pump* is an entity type in a manufacturing domain ontology, then *Pump-001*, a particular pump installed on the production line, is an entity instance.
* *Property*: A property is a characteristic that provides additional information about an entity type. Properties help to describe qualities, measurements, or other details, like *Operating Temperature* for a machine or *Material Type* for a product. They are defined generally on the entity type and have specific values on each entity instance.
* *Relationship type*: A relationship type defines a connection between entity types, establishing how they're related to one another. relationship types might represent hierarchical links (like *part of*) or associative links (like *used in*). They help structure an ontology by clarifying dependencies, interactions, and associations within the model.
* *Relationship instance*: A relationship instance is a specific occurrence of a relationship type. For instance, if there is a relationship type called *hasPart* that connects the *Pump* entity type to the *Bearing* entity type, then a relationship instance might be *Pump-001 hasPart Bearing-001*, which indicates that a certain pump instance has a certain bearing as a part.

To learn about how these concepts are implemented during mapping in digital twin builder, see [Mapping data to entity types in digital twin builder (preview)](concept-mapping.md).

## Storage and access

The ontology data for a digital twin builder (preview) item is stored in a Fabric lakehouse associated with the digital twin builder item. The lakehouse is located in the root folder of your workspace, with a name that looks like your digital twin builder item name followed by *dtdm*.

:::image type="content" source="media/concept-modeling/fabric-lakehouse-item.png" alt-text="Screenshot of the digital twin builder data lakehouse in Fabric workspace.":::

The lakehouse has two logical layers:

* *Base layer*: The base layer is the foundational set of delta tables designed to store both the ontology definitions and the instantiated ontology data. This layer organizes and preserves the core structures of the ontology, including the definitions of entity types, properties, relationship types, namespaces, and any metadata associated with the domain model.
* *Domain layer*: The domain layer is a structured set of normalized database views created from the base layer to present a clear representation of the instantiated ontology. This layer is built by transforming and arranging data from the base layer tables into views that directly reflect the logical structure and relationship types in the domain ontology.

:::image type="content" source="media/concept-modeling/data-layers.png" alt-text="Diagram showing the base layer and domain layer.":::

>[!NOTE]
>We don't recommend accessing the base layer directly. Instead, use the domain layer for querying and analytics on the instantiated ontology data.

### Viewing data in the lakehouse

Both the base and domain data layers can be viewed in the SQL endpoint of the digital twin builder data lakehouse. You can find the endpoint as a child item of your lakehouse in your Fabric workspace.

:::image type="content" source="media/concept-modeling/fabric-sql-endpoint.png" alt-text="Screenshot of the SQL endpoint under the digital twin builder data lakehouse in Fabric workspace.":::

In the navigation pane under **Schemas**, the base layer is represented under **dbo > Tables**, and the domain layer is represented under **dom > Views**.

:::image type="content" source="media/concept-modeling/sql-endpoint-schemas.png" alt-text="Screenshot of the SQL endpoint schemas.":::

## Related content

* [Mapping data to entity types in digital twin builder (preview)](concept-mapping.md)