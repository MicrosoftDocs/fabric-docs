---
title: Digital twin builder (preview) glossary
description: This article defines important digital twin builder (preview) terminology.
author: baanders
ms.author: baanders
ms.date: 07/01/2025
ms.topic: concept-article
---

# Digital twin builder (preview) glossary

This article defines important digital twin builder (preview) terminology. The list is alphabetically organized.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

| Terminology | Definition |
|---|---|
| *Base layer* | Modeling concept. The *base layer* is the foundational set of delta tables designed to store both the ontology definitions and the instantiated ontology data. This layer organizes and preserves the core structures of the ontology, including the definitions of entity types, properties, relationship types, namespaces, and any metadata associated with the domain model. For more information, see [Modeling data in digital twin builder (preview)](concept-modeling.md#storage-and-access). |
| *Contextualization* | Feature. The *contextualization* feature allows you to further augment the context of your data by creating semantic relationship types between entity types in your ontology. For more information, see [Perform contextualization](model-perform-contextualization.md). |
| *Digital twin builder (preview)* | Name of the product. *Digital twin builder (preview)* is an item in the Real-Time Intelligence workload in Microsoft Fabric. It creates digital representations of real-world environments to optimize physical operations using data. For more information, see [What is digital twin builder (preview)?](overview.md) |
| *Digital twin builder flow* | Feature. *Digital twin builder flow* items are created to execute mapping and contextualization operations. For more information, see [Digital twin builder (preview) flow](concept-flows.md). |
| *Digital twin builder item* | Instance of digital twin builder created by a user. |
| *Domain layer* | Modeling concept. The *domain layer* is a structured set of normalized database views created from the base layer to present a clear representation of the instantiated ontology. This layer is built by arranging data from the base layer tables into views that directly reflect the logical structure and relationship types defined in the domain ontology. For more information, see [Modeling data in digital twin builder (preview)](concept-modeling.md#storage-and-access).|
| *Explore (mode)* | In *Explore* mode, you can view and explore your entity instances and time series data. |
| *Explorer* | Feature. The *explorer* in digital twin builder lets you identify assets from keywords, explore asset details, and visualize time series data. For more information, see [Search and visualize your modeled data](explore-search-visualize.md). |
| *Mapping* | Feature. The *mapping* feature allows you to create an ontology with semantically rich entity types, and hydrate it with data from various source systems in a simplified manner. For more information, see [Mapping data to entity types in digital twin builder (preview)](concept-mapping.md). |
| *Ontology* | Concept. An *ontology* is a formal model that defines a set of concepts, entity types, properties, and relationship types within a specific domain, creating a shared vocabulary and framework for organizing information. Namespace, entity type, entity instance, property, relationship types, and relationship instances are the core elements of an ontology. You can use these elements to consistently define and represent complex knowledge. For more information, see [Modeling data in digital twin builder (preview)](concept-modeling.md#storage-and-access). |
| *Relationship type* | Contextualization concept. A *relationship type* is a link between two entity types created as part of a contextualization job. You can have relationship instances of a relationship type between two specific entity instances. For more information, see [Contextualization](model-perform-contextualization.md). |
| *Semantic canvas* | UX component. The *semantic canvas* is the centerpiece for creating your ontology. In the canvas, you can create entity types, map data to their instances, and create semantic relationship types between entity types. For more information, see [Using the semantic canvas in digital twin builder (preview)](concept-semantic-canvas.md). |
